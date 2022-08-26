<template>

  <FormKit type="form" ref="taskCreate" v-model="formData" @submit="submitHandler" :actions="false">

    <x-section class="task">
      <div class="task-createAttr">
        <h2>Создание задания</h2>
        <div class="task-wpr">
          <FormKit type="text" name="title" label="Название" placeholder="Название" validation="required"
                   :sections-schema="$schema.text" :value="taskValues.title"/>

          <FormKit
              type="select"
              name="campaign_id"
              validation="required"
              label="Кампания" placeholder="Кампания"
          >
            <option value="" disabled selected>Выберите кампанию</option>
            <option v-for="option in userCampaigns" :value="option.id" :key="option.id">{{ option.label }}</option>
          </FormKit>
          <!--          v-model="obChannelsList.categories.value"-->
          <x-inner-row>
            <FormKit type="date" name="date_start" label="Начало публикации" placeholder="Начало публикации"
                     :validation="dateBetween"
                     :sections-schema="$schema.text" :value="taskValues.date_start"/>

            <FormKit type="time" name="time_start" label="Время" placeholder="Время" validation="required"
                     :sections-schema="$schema.text"  :value="taskValues.time_start"/>

            <FormKit type="number" name="duration" label="Длительность размещения" placeholder="Длительность размещения"
                     validation="required"
                     :sections-schema="$schema.text" :value="taskValues.duration"/>

            <FormKit type="date" name="date_end" label="Конец публикации" placeholder="Конец публикации"
                     validation="required"
                     :sections-schema="$schema.text" :value="taskValues.date_end"/>

            <FormKit type="time" name="time_end" label="Время" placeholder="Время" validation="required"
                     :sections-schema="$schema.text" :value="taskValues.time_end"/>

            <FormKit type="number" name="silence" label="Продолжительность тишины"
                     placeholder="Продолжительность тишины"
                     validation="required"
                     :sections-schema="$schema.text" :value="taskValues.silence"/>

          </x-inner-row>
        </div>

        <div class="task-wpr">
          <h2>Варианты размещения</h2>
          <br/>
          <div class="task-placement">
            <h4>Пост с рекламой телеграм-канала</h4>
            <div class="triple">
            <FormKit type="checkbox" label="1/24" name="channelAdvertPosts" :value="pricesValues.channelAdvertPosts"/>
            <FormKit type="checkbox" label="2/48" name="channelAdvertPostTwice" :value="pricesValues.channelAdvertPostTwice"/>
            <FormKit type="checkbox" label="Без удаления" name="channelAdvertPostForever" :value="pricesValues.channelAdvertPostForever"/>
            </div>
          </div>

          <div class="task-placement">
            <h4>Пост с рекламой бренда</h4>
            <div class="triple">
              <FormKit type="checkbox" label="1/24" name="brandAdvertPostOnce" :value="pricesValues.brandAdvertPostOnce"/>
              <FormKit type="checkbox" label="2/48" name="brandAdvertPostTwice" :value="pricesValues.brandAdvertPostTwice"/>
              <FormKit type="checkbox" label="Без удаления" name="brandAdvertPostForever" :value="pricesValues.brandAdvertPostForever"/>
            </div>
          </div>

          <div class="task-placement">
            <h4>
            <FormKit type="checkbox"
                     name="creatingAuthorsPost" :value="pricesValues.creatingAuthorsPost"/>
              Создание авторского поста (текст)</h4>
          </div>
        </div>


<!--

        <div class="task-wpr">

          <div class="task-wpr-triple">

            <FormKit type="checkbox" label="Пост с рекламой телеграм-канала"
                     name="channelAdvertPosts" :value="pricesValues.brandAdvertPosts"/>

            <div class="triple">
              <FormKit
                  type="group"
                  name="prices"
              >

                <FormKit type="number"
                         name="channelAdvertPostOnce"
                         :value="pricesValues.channelAdvertPostOnce"
                         label="1/24"
                         placeholder="1/24"
                         :sections-schema="$schema.text"/>

                <FormKit type="number"
                         name="channelAdvertPostTwice"
                         :value="pricesValues.channelAdvertPostTwice"
                         label="2/48"
                         placeholder="2/48"

                         :sections-schema="$schema.text"/>

                <FormKit type="number"
                         name="channelAdvertPostForever"
                         :value="pricesValues.channelAdvertPostForever"
                         label="Без удаления"
                         placeholder="Без удаления"

                         :sections-schema="$schema.text"/>

              </FormKit>

            </div>

            <FormKit type="checkbox" label="Пост с рекламой бренда"
                     name="brandAdvertPosts" :value="pricesValues.brandAdvertPosts"/>

            <div class="triple">
              <FormKit
                  type="group"
                  name="prices"
              >
                <FormKit type="number"
                         name="brandAdvertPostOnce"

                         label="1/24"
                         placeholder="1/24"
                         :value="pricesValues.brandAdvertPostOnce"
                         :sections-schema="$schema.text"/>

                <FormKit type="number"
                         name="brandAdvertPostTwice"
                         label="2/48"
                         placeholder="2/48"
                         :value="pricesValues.brandAdvertPostTwice"
                         :sections-schema="$schema.text"/>

                <FormKit type="number"
                         name="brandAdvertPostForever"
                         label="Без удаления"
                         placeholder="Без удаления"
                         :value="pricesValues.brandAdvertPostForever"
                         :sections-schema="$schema.text"/>
              </FormKit>
            </div>

            <FormKit type="checkbox" label="Создание авторского поста (текст)"
                     name="creatingAuthorsPost" :value="pricesValues.creatingAuthorsPost"/>


          </div>

          &lt;!&ndash;        <FormKit
                      type="radio"
                      label="Контент предоставляется"
                      :options="[ { label: 'Рекламодателем', value: 'shawshank' }, { label: 'Админом канала', value: 'godfather' }, ]"/>&ndash;&gt;
        </div>

        -->
        <div class="task-invited" v-show="checkedList.length">
          <h2>Каналы для приглашения</h2>
          <template v-for="channel in checkedList" :key="`invite-${channel.id}`">
            <x-box-avatar :avatar="channel.avatar" :title="channel.title"
                          :id="channel.id" :blank="true" @remove-invited="checkboxSplice"/>
          </template>

        </div>


      </div>
      <div class="task-createContent">
        <h2>Контент для публикации</h2>
        <div class="task-wpr">

          <div class="textarea-wpr">
            <perfect-scrollbar class="scrollbar">
              <textarea @input="autosize($event.target)" v-model="txt" name="text"/>
            </perfect-scrollbar>
          </div>

          <fieldset class="file-load">

            <FormKit
                type="file"
                name="imaged"
                label="Выберите файл"
                accept=".png,.jpeg,.jpg"
                @change="catchFile"
                help="Прикрепите файлы которые должен разместить у себя в задании админ канала"
            />

          </fieldset>

        </div>
      </div>
    </x-section>


    <x-section class="task">
      <div class="task-sbt">
        <button class="sbt" @click="$router.back()">Отменить</button>
        <button class="dark" @click="submitForm">Создать</button>
      </div>
    </x-section>

  </FormKit>

  <x-section class="task">

    <div class="task-filter">
      <div class="campaign-filter-header">
        <h4>Поиск каналов</h4>
        <button v-if="queryState" class="blank-12 i-throw" @click="clearQuery">Сбросить</button>
      </div>
      <div class="campaign-filter-body">

        <FormKit
            type="text"
            :name="obChannelsList.title.name"
            v-model.lazy="obChannelsList.title.value"
            :delay="1000"
            id="search"
            placeholder="Имя канала"/>

        <FormKit
            type="select"
            name="categories"
            v-model="obChannelsList.categories.value"
        >
          <option value="" disabled selected>Категории каналов</option>
          <option v-for="option in categories" :value="option.id">{{ option.label }}</option>
        </FormKit>


        <div class="checkbox-group">
          <FormKit
              v-model="obChannelsList.prices.value"
              type="checkbox"
              :options="obChannelsList.prices.options"
          />

        </div>

        <!--

                <FormKit
                    v-model="value"
                    type="checkbox"
                    label="Indian food"
                    :options="[
            {
              value: 'item-2',
              label: 'Bhajji',
              help: 'Fried chickpea batter — spicy.',
            },
            {
              value: 'item-55',
              label: 'Vada Pav (out of stock)',
              help: 'Fried vegetarian dumplings.',
              attrs: { disabled: true }
            },
            {
              value: 'item-22',
              label: 'Paratha',
              help: 'Flatbread layered and pan friend.',
            },
            {
              value: 'item-44',
              label: 'Halwa',
              help: 'Pudding made with flour.',
            }
          ]"
                    help="Select your favorite Indian dishes."
                />

        -->

      </div>

      <div class="campaign-filter-body">

        <x-inner-row class="campaign-filter-row">
          <fieldset>
            <legend>Количество подписчиков</legend>
            <FormKit type="number" placeholder="от" name="subscribers_from" :delay="1000"
                     v-model="obChannelsList.subscribers_from.value"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" name="subscribers_to" :delay="1000"
                     v-model.lazy="obChannelsList.subscribers_to.value"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость публикации</legend>
            <FormKit type="number" placeholder="от" :delay="1000"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :delay="1000"/>
          </fieldset>

          <fieldset>
            <legend>Охват</legend>
            <FormKit type="number" placeholder="от" :delay="1000" name="avg_post_view_from"
                     v-model="obChannelsList.avg_post_view_from.value"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :delay="1000" name="avg_post_view_to"
                     v-model="obChannelsList.avg_post_view_to.value"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость единицы охвата</legend>
            <FormKit type="number" placeholder="от" :delay="1000"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :delay="1000"/>
          </fieldset>

          <button class="dark">Применить</button>

        </x-inner-row>

      </div>

    </div>

  </x-section>

  <x-section class="task">
    <div class="table">

      <table>

        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :rowspan="2">
          <th-checkbox :rowspan="2" id="row-th" v-model="thCheckbox"/>
          <template v-slot:after>
            <th colspan="3" class="ta-c"><b>реклама канала</b></th>
            <th colspan="3" class="ta-c"><b>реклама бренда</b></th>
            <th rowspan="2" class="ta-c">авторский <br/> пост</th>
          </template>
          <template v-slot:rows>
            <tr>
              <th class="ta-c">1/24</th>
              <th class="ta-c">2/48</th>
              <th class="ta-c" style="font-size:18px;">∞</th>

              <th class="ta-c">1/24</th>
              <th class="ta-c">2/48</th>
              <th class="ta-c" style="font-size:18px;">∞</th>
            </tr>
          </template>
        </x-thead>


        <tbody>
        <tr v-for="channel in channels.data" :key="`tbl-${channel.id}`">
          <td-checkbox :id="channel.id" :value="channel.id" v-model="checkboxes"/>
          <td-channel :avatar="channel.avatar" :title="channel.title" :id="channel.id"/>
          <td-categories :categories="channel.categories"/>


          <td-text :text="channel?.tgstat_stat?.participants_count"/>
          <td-text :text="channel?.tgstat_stat?.avg_post_reach"/>

          <td-text :text="channel?.tgstat_stat?.p_cpu"/>
          <td-text :text="channel?.tgstat_stat?.err_percent"/>

          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 1)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 2)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 3)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 4)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 5)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 6)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 7)"/>

        </tr>
        </tbody>

      </table>

    </div>
  </x-section>

  <x-paginate :links="channels.links" :current="channels.current_page" @paginate="paginate"/>

</template>

<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import TdText from "@/components/ui/table/td-text.vue";
import {computed, onMounted, ref, Ref, watch} from "vue";
import task from "@/hooks/models/task";
import {useTable} from "@/hooks/useTable";
import ChannelModule from "@/store/modules/channel";
import {useChannels} from "@/hooks/models/channels";
import XThead from "@/components/ui/table/x-thead.vue";
import {IChannel, IChannelCategory, IChannelPrice, IChannelsPaginate} from "@/types/channel";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import TdChannel from "@/components/ui/table/td-channel.vue";
import TdCategories from "@/components/ui/table/td-categories.vue";
import XTh from "@/components/ui/table/x-th.vue";
import XBoxAvatar from "@/components/ui/element/x-box-avatar.vue";
import useForm from "@/hooks/useForm";
import useConfirm from "@/hooks/useConfirm";
import {ICampaign} from "@/types/campaign";
import CampaignModule from "@/store/modules/campaign";
import {IFormKit} from "@/types/any";
import TaskModule from "@/store/modules/task";
import router from "@/router";


const {obChannelsList} = useChannels();

const {formData, submitted} = useForm()


const {
  thCheckbox, checkboxes, direction, orderBy, fetchResult, fields, queryState, checkedList,
  paginate, sort, clearQuery, checkboxSplice
} = useTable(ChannelModule.fetchChannelsIndex, obChannelsList, 100)


const channels: Ref<IChannelsPaginate> = ref(fetchResult)
const categories: Ref<IChannelCategory[]> = ref([])
const userCampaigns: Ref<IFormKit[]> = ref([])


const autosize = (el: HTMLFormElement) => {
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
}


const pricesDefine = (prices: IChannelPrice[], typeId: number) =>
    prices.find((i: IChannelPrice) => i.post_price_type_id === typeId) ? '✓' : ''

// -> form data
const taskCreate: Ref<boolean> = ref(false)
const {test, taskValues, pricesValues, dateBetween} = task()
const txt = ref(taskValues.text)
let image: any = ref('')


const catchFile = (e: HTMLFormElement) => {
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result;
  }
  // @ts-ignore
  reader.readAsDataURL(e.target.files[0]);
}


const submitHandler = async (data: any) => {

  if (!checkedList.value.length) {
    useConfirm(() => false, {type: 'alert', cancelBtn: 'OK', content: 'Вы не выбрали хотя бы один канал участник'})
    return false
  }

  if (!submitted.value) {
  formData.value['channels'] = checkedList.value.map((i: IChannel) => i.id)
  formData.value['text'] = txt.value
  formData.value['image'] = image.value

  const response = await TaskModule.saveTask(formData.value)
  response ? await router.push({name: 'TasksList'}) : submitted.value = false
  }
}

/////////// PRICES CNT

const minDateStart = ref(new Date())



const duration = () => {

}




///////////

onMounted(() => {
  ChannelModule.fetchCategories().then((response) => categories.value = response)
  CampaignModule.fetchUserCampaigns()
      .then(() => userCampaigns.value = CampaignModule.userCampaigns.map((i: ICampaign) => {
        return {
          id: i.id,
          label: i.title,
        }
      }))

})

</script>
