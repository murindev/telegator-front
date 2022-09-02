<template>
  <x-section class="task">
    <div class="task-attr">
      <h2>Основные настройки</h2>
      <x-inner-row class="task-attr-wpr">

        <p><span>Название</span>{{ taskChannel?.task?.title }}</p>
        <p><span>Какому каналу выдано</span>
<!--          <router-link :to="{name:'ChannelStats', param: {id: taskChannel?.channel_id}}">
            {{ taskChannel?.channel.title }}
          </router-link>-->
          <a :href="`/dashboard/channels/${taskChannel?.channel_id}/stats`">{{ taskChannel?.channel.title }}</a>
        </p>
        <p><span>Тип поста</span>{{ postType() }}</p>
<!--        <p><span>Начало публикации</span>{{ $helper.dateTime(taskChannel?.task?.range_start_at) }}</p>-->
<!--        <p><span>Конец публикации</span>{{ $helper.dateTime(taskChannel?.task?.range_end_at) }}</p>-->

        <template v-if="taskChannel?.tgstat_post">
          <p><span>Начало публикации</span>
            {{ $helper.dateTime(taskChannel.tgstat_post.date*1000) }}
          </p>
          <p><span>Конец публикации</span>
            <template v-if="taskChannel.tgstat_post.is_deleted !== '0'">
              {{ $helper.dateTime(taskChannel.tgstat_post.deleted_at*1000) }}
            </template>
            <template v-else>
              Пост не удален
            </template>
          </p>
        </template>

        <template v-else>
          <p><span>Предполагаемое начало публикации</span>
            {{ $helper.dateTime(taskChannel?.task?.range_start_at) }}
          </p>
          <p><span>Предполагаемый конец публикации</span>{{ $helper.dateTime(taskChannel?.task?.range_end_at) }}</p>
        </template>

<!--        <p><span>Длительность размещения</span>{{ taskChannel?.task?.duration }}</p>-->


        <template v-if="taskChannel?.tgstat_post && taskChannel?.tgstat_post.deleted_at">
          <p><span>Итоговая длительность размещения</span>{{ $helper.timeDiffHours(taskChannel?.tgstat_post.date, taskChannel?.tgstat_post.deleted_at) }}</p>
        </template>
        <template v-else-if="taskChannel?.tgstat_post">
          <p><span>Текущая длительность размещения</span>{{ $helper.timeDiffHoursNow(taskChannel.tgstat_post.date) }}</p>
        </template>
        <template v-else>
          <p><span>Предполагаемая длительность размещения</span>
            <template v-if="[1,4].includes(taskChannel?.price_type)">
              24 часа
            </template>
            <template v-else-if="[2,5].includes(taskChannel?.price_type)">
              48 часов
            </template>
            <template v-else-if="[3].includes(taskChannel?.price_type)">
              Постоянная
            </template>
            <template v-else>
              По договорённости
            </template>
          </p>
        </template>


        <p><span>Продолжительность тишины</span>{{ taskChannel?.task?.silence }} часа</p>

        <p><span>Предполагаемое вознаграждение</span>{{ $price.format(priceFact()) }}</p>
        <p><span>Статус задания</span>{{ taskChannel?.status.title }}</p>
        <p><span>Минимальное время нахождения поста в ленте</span>{{ priceType() }}</p>
<!--        <p class="red"><span>Фактическое вознаграждение</span>888 9999</p>-->


        <p><span>Контактная информация</span>{{ taskChannel?.channel.contact }}</p>

<!--        <p class="red"><span>Фактическое время тишины в ленте после публикации</span>888</p>-->
        <p><span>Штраф в ходе кампании</span>{{ taskChannel?.penalty ?? 'нет' }}</p>
        <p><span>Был заблокирован</span>{{ $helper.ruBool(taskChannel?.channel.is_deleted) }}</p>

      </x-inner-row>

      <div class="task-attr-sbt"
           v-show="taskChannel?.state === 1 && taskChannel?.channel.owner_id === UserModule.user.id ">
        <!--   && taskChannel?.task.user_id === UserModule.user     -->
        <button class="sbt" @click="refuse()">Отклонить</button>
        <button class="dark" @click="confirm()">Принять</button>
      </div>

      <template v-show="[3,4].includes(taskChannel?.state)">
        <h2>Подтвердить публикацию</h2>

        <x-inner-row class="task-attr-wpr">
          <FormKit style="width: 400px;" type="text"
                   name="name"
                   label="label"
                   placeholder="placeholder"
                   validation="validation"
                   help="Сохраните ссылку на опубликованное задание"/>

          <button class="dark ml-auto" style="margin-right: 10px">Сохранить</button>
        </x-inner-row>
      </template>


    </div>
    <div class="task-content">
      <h2>Контент для публикации</h2>
      <div class="task-content-wpr">
        <div v-html="taskChannel?.task.text"/>
        <div class="task-content-img" v-if="taskChannel?.task?.media.length">
          <img v-for="img in taskChannel?.task?.media" :src="$env.baseUrl+img.src" alt="img"/>
        </div>
      </div>
    </div>
  </x-section>

  <x-section class="task-result">
    <div>
      <b>{{ taskChannel?.status.title }}</b>
    </div>
  </x-section>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import router from "@/router";
import TaskChannelsModule from "@/store/modules/taskChannels";
import {TTaskChannel} from "@/types/taskChannels";
import useConfirm from "@/hooks/useConfirm";
import UserModule from "@/store/modules/user";

const taskChannel: Ref<TTaskChannel> = ref(null)

const priceFact = () => {

  return UserModule.role == 'channel' ? (100 - Number(UserModule.user.fee)) / 100 * Number(taskChannel.value?.price) : taskChannel.value?.price
}

const postType = () => {
  let type = []

  if (taskChannel.value?.task.text) {
    type.push('Пост')

  }

  if (taskChannel.value?.task.text.includes('href="')) {
    type.push('ссылка')
  }

  if (taskChannel.value?.task?.media.length) {
    type.push('картинка')
  }

  return type.join(' + ')

}

const updateTaskChannel = async (state: number) => {
  await TaskChannelsModule.updateTaskChannel({
    id: taskChannel.value?.id,
    state: state
  })
  await TaskChannelsModule.fetchTaskChannels({offers: true})
}

const priceType = () => {
  if ([1, 4].includes(Number(taskChannel.value?.price_type))) {
    return '24 часа'
  }
  if ([2, 5].includes(Number(taskChannel.value?.price_type))) {
    return '48 часов'
  }
  if ([3, 6, 7].includes(Number(taskChannel.value?.price_type))) {
    return 'бессрочно'
  }
}

const makeConfirm = () => updateTaskChannel(2)
const makeRefuse = () => updateTaskChannel(7)

const refuse = () => {
  useConfirm(
      makeRefuse,
      {content: `Вы собираетесь отказаться от задания. <br> Подтверждаете действие?`}
  )
}
const confirm = () => {
  useConfirm(
      makeConfirm,
      {content: `Вы собираетесь подтвердить размещение задания. <br> Подтверждаете действие?`}
  )
}


onMounted(async () => {
  /*  await TaskModule.fetchTask({
      id: router.currentRoute.value.params.id
    })
    task.value = TaskModule.task*/

  await TaskChannelsModule.fetchTaskChannel({
    id: router.currentRoute.value.params.task_channel
  })

  taskChannel.value = TaskChannelsModule.taskChannel
})

</script>
