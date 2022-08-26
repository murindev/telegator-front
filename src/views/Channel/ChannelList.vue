<template>
  <x-section>
    <div class="add-channel">
      <span>У вас нет добавленных каналов?</span>
      <button class="a icon" @click="UIModule.setModalState(true)">
        <font-awesome-icon icon="plus"/>
        Добавить канал
      </button>
    </div>
  </x-section>

  <x-section>
    <div class="table">
      <table v-if="channels.data && channels.data.length">

        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" rowspan="2">
          <th-checkbox id="row-th" rowspan="2" v-model="thCheckbox"/>
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

        <tr v-for="channel in channels.data">
          <td-checkbox :id="channel.id" v-model="checkboxes" :value="channel.id" /> <!--@change="calculatePrice"-->
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
        <tfoot class="small">
        <tr>
          <th colspan="6">
            <span>Количество выделенных каналов: {{ checkboxes.length }}</span>
            <span>Суммарная стоимость {{ $price.format(pricesSum) }}</span>
          </th>
          <th colspan="8" class="align-right">
            <button class="a icon" v-show="checkboxes.length" @click="confirmInvite">
              <font-awesome-icon icon="plus"/>
              Пригласить
            </button>
          </th>
        </tr>
        </tfoot>
      </table>
      <div v-else class="nope">
        <p>Список каналов пуст</p>
      </div>
    </div>
  </x-section>

  <x-paginate :links="channels.links" :current="channels.current_page" @paginate="paginate"/>

  <x-modal title="Добавление канала" class="addChannel" v-model="UIModule.modalState">
    <add-channel/>
  </x-modal>

</template>

<script lang="ts" setup>
import TdChannel from "@/components/ui/table/td-channel.vue";
import XModal from "@/components/ui/popups/x-modal.vue";
import AddChannel from "@/components/channel/AddChannel.vue";
import ChannelModule from "@/store/modules/channel";
import {IChannel, IChannelCategory, IChannelPrice, IChannelsPaginate} from "@/types/channel";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import TdCategories from "@/components/ui/table/td-categories.vue";
import TdText from "@/components/ui/table/td-text.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import {useTable} from "@/hooks/useTable";
import {useChannels} from "@/hooks/models/channels";
import {onMounted, ref, Ref, watch} from "vue";
import XThead from "@/components/ui/table/x-thead.vue";
import useConfirm from "@/hooks/useConfirm";
import UIModule from "@/store/modules/ui";
import UserModule from "@/store/modules/user";


const {fieldsSet} = useChannels()
const pricesSum = ref(0)

const channelsFields = ref(fieldsSet([
  'title','categories','participants_count','avg_post_reach','cpu','err_percent'
]))


const {
  thCheckbox,
  checkboxes,
  direction,
  orderBy,
  fetchResult,
  fields,
  selected,
  paginate,
  sort,
} = useTable(UserModule.role == 'channel' ? ChannelModule.fetchChannelsOwner : ChannelModule.fetchChannelsIndex,channelsFields,200)

const channels: Ref<IChannelsPaginate> = ref(fetchResult)

const invite = () => {
  console.log(`Вы собираетесь пригласить ${checkboxes.value?.length} Каналов участников`);
}

const confirmInvite = () => {
  useConfirm(invite,{
    confirmBtn: 'Пригласить',
    content: `Вы собираетесь пригласить ${checkboxes.value?.length} Каналов участников`
  })
}

const pricesDefine = (prices: IChannelPrice[], typeId: number) => {
  let price = prices.find((i: IChannelPrice) => i.post_price_type_id === typeId)
  return price ? price.post_price_type_id === 7 ? '✓' :price.price : ''
}


watch(selected, () => {
  pricesSum.value = selected.value?.reduce((sum: number, i: IChannel) => sum + parseFloat(i.price), 0)
}, {deep: true})
//  @TODO-uretral:   суммарная стоимость

onMounted(() => {
  console.log('ffffffffffffffff');
  UserModule.getChatId()
})


</script>
