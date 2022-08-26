<template>

  <x-section class="campaign">
    <div class="campaign-attr">
      <h2>{{ task?.title }}</h2>

      <div class="campaign-attr-date">
        <x-inner-row>
          <div class="date-view">
            <span>Начало публикации</span>
            <p>{{ $helper.dateDotted(task?.range_start_at) }} {{ $helper.time(task?.range_start_at) }}</p>
          </div>
          <div class="date-view">
            <span>Конец публикации</span>
            <p>{{ $helper.dateDotted(task?.range_end_at) }} {{ $helper.time(task?.range_end_at) }}</p>
          </div>
        </x-inner-row>
      </div>
    </div>
    <div class="campaign-content">
      <h2>Контент для публикации</h2>

      <div class="task-content-wpr">
        <div v-html="task?.text"/>
        <div class="task-content-img" v-if="task?.media.length">
          <img v-for="img in task?.media" :src="$env.baseUrl+img.src" alt="img"/>
        </div>
      </div>

    </div>

    <div class="campaign-add-sbt" v-show="UserModule.user.id === task?.user_id">
      <button class="blank mr-auto" @click="$router.push({name:'Campaigns'})">В список компаний</button>
      <button class="sbt" @click="destroyConfirm">Удалить</button>
      <button class="dark" @click="finishConfirm">Завершить</button>
    </div>

  </x-section>


<!--  <x-nav>
    <router-link :to="{name: 'CampaignTasks', params:{id: $route.params.id}}">Задания</router-link>
    <router-link :to="{name: 'CampaignChannels', params:{id: $route.params.id}}">Каналы</router-link>

    <div class="to-tight">
      <button class="dark">Создать задание</button>
    </div>

  </x-nav>-->

  <router-view/>
</template>

<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import {ICampaign} from "@/types/campaign";
import CampaignModule from "@/store/modules/campaign";
import router from "@/router";
import {onMounted, Ref, ref} from "vue";
import useConfirm from "@/hooks/useConfirm";
import XNav from "@/components/ui/layouts/x-nav.vue";
import TaskModule from "@/store/modules/task";
import {ITask, TTask} from "@/types/task";
import UserModule from "@/store/modules/user";

const id = router.currentRoute.value.params.id
let task: Ref<TTask> = ref(null)

const finishConfirm = () => {
  useConfirm(
      finishCampaign,
      {content: `Вы собираетесь завершить кампанию. <br> Подтверждаете действие?`}
  )
}

const destroyConfirm = () => {
  useConfirm(
      destroyCampaign,
      {content: `Вы собираетесь удалить кампанию. <br> Подтверждаете действие?`}
  )
}

const campaignChangePermit = ref(false)

const destroyCampaign = () => CampaignModule.destroyCampaign({id})
    .then(() => router.push({name: 'Campaigns'}))
    .catch((error) => console.log(error))


const finishCampaign = () => CampaignModule.updateCampaign({id, status: 'finished'})
    .then(() => router.push({name: 'Campaigns'}))
    .catch((error) => console.log(error))


onMounted(() => {
/*  CampaignModule.fetchCampaign({id})
      .then(() => campaign.value = CampaignModule.campaign)*/
  TaskModule.fetchTask({id}).then(() => task.value = TaskModule.task)

  campaignChangePermit.value = UserModule.user.id === task.value?.user_id
})

</script>
