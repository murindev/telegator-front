<template>
  <FormKit type="form" ref="taskCreate" v-model="formData" @submit="submitHandler" :actions="false">

    <x-section class="task">
      <div class="task-createAttr">
        <h2>Создание задания</h2>
        <div class="task-wpr">
          <FormKit type="text" name="title" label="Название" placeholder="Название" validation="required"
                   :sections-schema="$schema.text" :value="taskValues.title"/>

<!--          <FormKit
              type="select"
              name="campaign_id"
              validation="required"
              label="Кампания" placeholder="Кампания"
          >
            <option value="" disabled selected>Выберите кампанию</option>
            <option v-for="option in userCampaigns" :value="option.id" :key="option.id">{{ option.label }}</option>
          </FormKit>-->

          <x-inner-row>

            <FormKit type="date" name="date_start" label="Начало публикации" placeholder="Начало публикации"
                     :validation="dateBetween" v-model="minDateStart" :sections-schema="$schema.text"/>

            <FormKit type="time" name="time_start" label="Время" placeholder="Время" validation="required"
                     :sections-schema="$schema.text" v-model="minTimeStart"/>

            <FormKit type="number" name="silence" label="Продолжительность тишины"
                     placeholder="Продолжительность тишины" validation="required"
                     :sections-schema="$schema.always" :value="channelFields.silence.value"/>

          </x-inner-row>
        </div>

        <div class="task-wpr">
          <h2>Варианты размещения</h2>
          <br/>
          <div class="task-placement">
            <h4>Пост с рекламой телеграм-канала</h4>
            <div class="triple">

              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="1"/>
                <span></span>
                1/24
              </label>
              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="2"/>
                <span></span>
                2/48
              </label>
              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="3"/>
                <span></span>
                Без удаления
              </label>

            </div>
          </div>

          <div class="task-placement">
            <h4>Пост с рекламой бренда</h4>
            <div class="triple">


              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="4"/>
                <span></span>
                1/24
              </label>
              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="5"/>
                <span></span>
                2/48
              </label>
              <label class="radio">

                <input type="radio" v-model="pricesModel" :value="6"/>
                <span></span>
                Без удаления
              </label>

            </div>
          </div>

          <div class="task-placement">
            <h4>


              Создание авторского поста (текст)</h4>
            <label class="radio">

              <input type="radio" v-model="pricesModel" :value="7"/>
              <span></span>
              Договорная цена
            </label>
          </div>
        </div>


        <div class="task-invited" v-show="checkedList.length">
          <h2>Каналы для приглашения</h2>
          <template v-for="channel in checkedList" :key="`invite-${channel.id}`">
            <x-box-avatar :avatar="channel.avatar" :title="channel.title" :price="currentPrice(channel)"
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
                multiple
            />

          </fieldset>

        </div>
      </div>
    </x-section>

    <x-section class="task" v-show="balance < 0">
      <div class="task-sbt">
        <span
            class="red">Ваш баланс не достаточен для данной операции. Вам необходимо ещё {{ $price.format(balance * -1) }}</span>
      </div>
    </x-section>

    <x-section class="task">
      <div class="task-sbt">
        <button class="sbt" @click="$router.back()">Отменить</button>
        <button :disabled="balance < 0 || checkedList.length === 0" class="dark" @click="submitForm">Создать</button>
        <!--!pricesModel && -->
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
            :name="channelFields.title.name"
            v-model.lazy="channelFields.title.value"
            :delay="1000"
            id="search"
            placeholder="Имя канала"/>

        <FormKit
            type="select"
            name="categories"
            v-model="channelFields.categories.value"
        >
          <option value="" disabled selected>Категории каналов</option>
          <option v-for="option in categories" :value="option.id">{{ option.label }}</option>
        </FormKit>


      </div>

      <div class="campaign-filter-body">

        <x-inner-row class="campaign-filter-row">

          <fieldset>
            <legend>Количество подписчиков</legend>
            <FormKit type="number" placeholder="от" name="subscribers_from" :delay="1000"
                     v-model="channelFields.subscribers_from.value"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" name="subscribers_to" :delay="1000"
                     v-model.lazy="channelFields.subscribers_to.value"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость публикации</legend>
            <FormKit type="number" placeholder="от" :disabled="pricesModel === null || pricesModel === 7" :delay="1000"
                     name="price_from" v-model="channelFields.price_from.value"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :disabled="pricesModel === null || pricesModel === 7" :delay="1000"
                     name="price_to" v-model="channelFields.price_to.value"/>
          </fieldset>

          <fieldset>
            <legend>Охват</legend>
            <FormKit type="number" placeholder="от" :delay="1000" name="avg_post_view_from"
                     v-model="channelFields.avg_post_view_from.value"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :delay="1000" name="avg_post_view_to"
                     v-model="channelFields.avg_post_view_to.value"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость единицы охвата</legend>
            <FormKit type="number" placeholder="от" :delay="1000"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до" :delay="1000"/>
          </fieldset>

          <!--          <button class="dark">Применить</button>-->

        </x-inner-row>

      </div>

    </div>

  </x-section>


  <x-section class="task">
    <div class="table">

      <table>

        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :rowspan="2">
          <th-checkbox v-show="pricesModel" :rowspan="2" id="row-th" v-model="thCheckbox"/>
          <th :rowspan="2" v-show="!pricesModel"/>
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
        <tr v-for="channel in channels.data"  :key="`tbl-${channel.id}`">

<!--          <template v-if="channel.owner_id != UserModule.user.id">-->
            <td-checkbox v-show="pricesModel" :id="channel.id" :value="channel.id" v-model="checkboxes"/>
          <td  v-show="!pricesModel"></td>
            <td-channel :avatar="channel.avatar" :title="channel.title" :id="channel.id" :blank="true"/>
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
            <td-text class="ta-c" v-text="channel?.author_post ? '✓' : ''"/>
<!--          </template>-->


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
import {channelModel} from "@/hooks/models/channel";
import UserModule from "@/store/modules/user";


// table filter
const channels: Ref<IChannelsPaginate> = ref({})

const {
  fieldsSet,
  model: channelFields
} = channelModel(['title', 'categories', 'participants_count', 'avg_post_reach', 'cpu', 'err_percent', 'prices', 'subscribers_from', 'subscribers_to', 'avg_post_view_from', 'avg_post_view_to', 'price_from', 'price_to', 'silence','not_owner_id'])

// default form values
fieldsSet.value['not_owner_id'].value = UserModule.user.id

const {
  thCheckbox, checkboxes, direction, orderBy, fetchResult, fields, queryState, checkedList,
  paginate, sort, clearQuery, checkboxSplice
} = useTable(ChannelModule.fetchChannelsIndex, fieldsSet, 100, channels)



// eof table filter

// form
const {formData, submitted} = useForm()
const taskCreate: Ref<boolean> = ref(false)
const {taskValues, dateBetween} = task()
const txt = ref(taskValues.text)
let image: Ref<any[]> = ref([])





const catchFile = (e: HTMLFormElement) => {

  // @ts-ignore
  for(let i = 0, len = e.target.files.length; i < len; i++) {
    // @ts-ignore
    writeFiles(e.target.files[i])

/*    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      image.value.push(reader.result);
    }
    // @ts-ignore
    reader.readAsDataURL(e.target.files[i]);*/

    // @ts-ignore
    // console.log(e.target.files[i]);

  }


/*  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result;
  }
  // @ts-ignore
  console.log(e.target.files);
  // @ts-ignore
  reader.readAsDataURL(e.target.files[0]);*/
}

const writeFiles = (file: any) => {
  let reader = new FileReader()
  reader.onload = function () {
    image.value.push(reader.result)
  }
  reader.readAsDataURL(file)
}



/*const catchFile = (e: HTMLFormElement) => {
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result;
  }
  // @ts-ignore
  console.log(e.target.files);
  // @ts-ignore
  reader.readAsDataURL(e.target.files[0]);
}*/
const submitHandler = async (data: any) => {

  if (!checkedList.value.length) {
    useConfirm(() => false, {type: 'alert', cancelBtn: 'OK', content: 'Вы не выбрали хотя бы один канал участник'})
    return false
  }

  if (!submitted.value) {
    formData.value['channels'] = checkedList.value.map((i: IChannel) => {
      return {
        id: i.id,
        price: currentPrice(i),
        price_type: channelFields.value.prices.value
      }
    })
    formData.value['text'] = txt.value
    formData.value['image'] = image.value
    formData.value['time_end'] = formData.value['time_start']

    const response = await TaskModule.saveTask(formData.value)
    if(response) {
      await UserModule.setUser(response)
      await router.push({name: 'Campaigns'})
    } else  {
      submitted.value = false
    }
  }
}


const autosize = (el: HTMLFormElement) => {
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
}


const days = (nrOfDays: number) => {
  let now = new Date()
  let x = now.setTime(now.getTime() + (nrOfDays * 24 + 3) * 60 * 60 * 1000)
  let y = new Date(x).toISOString()
  return {date: y.slice(0, 10), time: y.slice(11, 16)}
}

const minDateStart = ref(days(1).date)
const minTimeStart = ref(days(1).time)


const pricesModel = ref(null)

watch(pricesModel, () => {

  if (pricesModel.value == 7) {
    channelFields.value.price_from.value = null
    channelFields.value.price_to.value = null
    channelFields.value.prices.value = pricesModel
    formData.value['author_post'] = 1
    formData.value['date_end'] = days(365).date
  } else {

    channelFields.value.prices.value = pricesModel

    if ([3, 6, 7].includes(channelFields.value.prices.value)) {
      formData.value['silence'] = 0
      formData.value['date_end'] = days(0).date
      formData.value['author_post'] = 0
    }

    if ([1, 4].includes(channelFields.value.prices.value)) {
      formData.value['silence'] = 1
      formData.value['date_end'] = days(2).date
      formData.value['author_post'] = 0
    }

    if ([2, 5].includes(channelFields.value.prices.value)) {
      formData.value['silence'] = 2
      formData.value['date_end'] = days(3).date
      formData.value['author_post'] = 0
    }

    if (channelFields.value.prices.value === 7) {
      formData.value['silence'] = 0
      formData.value['date_end'] = days(365).date
      formData.value['author_post'] = 1
    }
  }

  checkedList.value = []
  checkboxes.value = []


})

const balance: Ref<number | undefined> = ref(0)

const currentPrice = (i: IChannel) => {
  let currentPrice = i.prices?.find((f: IChannelPrice) => f.post_price_type_id === channelFields.value.prices.value)
  return currentPrice ? currentPrice.price : 0
}

watch(checkedList, () => {
  balance.value = UserModule.balance

  checkedList.value.map((i: IChannel) => {
    let price = currentPrice(i)
    if (price && balance.value) {
      balance.value = balance.value - price
    }
  })

}, {deep: true})

// eof form


const categories: Ref<IChannelCategory[]> = ref([])
const userCampaigns: Ref<IFormKit[]> = ref([])

const pricesDefine = (prices: IChannelPrice[], typeId: number) => {
  let price = prices.find((i: IChannelPrice) => i.post_price_type_id === typeId)
  if (price) {
    return price.post_price_type_id === 7 ? '✓' : price.price
  } else {
    return ''
  }
}

onMounted(() => {
  ChannelModule.fetchCategories().then((response) => categories.value = response)
  CampaignModule.fetchUserCampaigns()
      .then(() => userCampaigns.value = CampaignModule.userCampaigns.map((i: ICampaign) => {
        return {
          id: i.id,
          label: i.title,
        }
      }))

  UserModule.getBalance()
})


</script>
