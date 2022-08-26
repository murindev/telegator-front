<template>
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
            <th rowspan="2" class="ta-c">добавить</th>
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
          <td-text :text="channel.avg_subscribers?.total"/>
          <td-text :text="channel.avg_post_view?.total"/>
          <td></td>
          <td-text :text="channel.avg_post_view?.err"/>

          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 1)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 2)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 3)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 4)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 5)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 6)"/>
          <td-text class="ta-c" v-text="pricesDefine(channel?.prices, 7)"/>

          <td-arr-checkbox :id="channel.id" v-model="checkboxes" :value="channel.id"></td-arr-checkbox>
        </tr>
        </tbody>

      </table>

    </div>
  </x-section>

  <x-paginate :links="channels.links" :current="channels.current_page" @paginate="paginate"/>
</template>

<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import {useTable} from "@/hooks/useTable";
import ChannelModule from "@/store/modules/channel";
import XThead from "@/components/ui/table/x-thead.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import TdText from "@/components/ui/table/td-text.vue";
import {useChannels} from "@/hooks/models/channels";
import {onMounted, ref, Ref, watch} from "vue";
import {IChannel, IChannelCategory, IChannelPrice, IChannelsPaginate} from "@/types/channel";
import TdChannel from "@/components/ui/table/td-channel.vue";
import TdCategories from "@/components/ui/table/td-categories.vue";
import CampaignModule from "@/store/modules/campaign";
import {ICampaign} from "@/types/campaign";
import {IFormKit} from "@/types/any";
import {ITask} from "@/types/task";
import TaskModule from "@/store/modules/task";
import TdArrCheckbox from "@/components/ui/table/td-arr-checkbox.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";



const {obChannelsList} = useChannels();

const {
  thCheckbox, checkboxes, direction, orderBy, fetchResult, fields, queryState, checkedList,
  paginate, sort, clearQuery, checkboxSplice, selected
} = useTable(ChannelModule.fetchChannelsIndex, obChannelsList, 100)


const channels: Ref<IChannelsPaginate> = ref(fetchResult)
const categories: Ref<IChannelCategory[]> = ref([])
const userCampaigns: Ref<IFormKit[]> = ref([])
const pricesDefine = (prices: IChannelPrice[], typeId: number) => {
  let obPrice = prices.find((i: IChannelPrice) => i.post_price_type_id === typeId)
  return obPrice ? obPrice.price : ''
}

watch(checkboxes,(n:any,o:any) => {
  selected.value = []
  checkboxes.value?.map((i:number) => selected.value?.push(channels.value.data?.find((f:IChannel) => i === f.id)))
  ChannelModule.setSelectedChannels(selected.value)
} )

onMounted(() => {
  ChannelModule.fetchCategories().then((response) => categories.value = response)
  CampaignModule.fetchUserCampaigns()
      .then(() => userCampaigns.value = CampaignModule.userCampaigns.map((i: ICampaign) => {
        return {
          id: i.id,
          label: i.title,
        }
      }))


  ChannelModule.selectedChannels.map((i:IChannel) => {
    checkboxes.value?.push(i.id)
  })

})

</script>
