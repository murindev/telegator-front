<template>
  <x-section>

    <div class="campaign-filter">
      <div class="campaign-filter-header">
        <h4>Поиск каналов</h4>
        <button class="blank-12 i-throw">Сбросить 555</button>
        <button class="blank-12 i-apply">Применить</button>


      </div>
      <div class="campaign-filter-body">

        <FormKit
            type="text"
            id="search"
            placeholder="Поиск"
            label="Поиск"
        />

        <FormKit
            type="select"
            label="Which country is the smallest?"
            name="small_country"
            :options="[ 'Monaco', 'Maldives', 'Tuvalu', ]"
        />

      </div>

      <div class="campaign-filter-body">

        <x-inner-row class="campaign-filter-row">
          <fieldset>
            <legend>Количество подписчиков</legend>
            <FormKit type="number" placeholder="от"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость публикации</legend>
            <FormKit type="number" placeholder="от"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до"/>
          </fieldset>

          <fieldset>
            <legend>Охват</legend>
            <FormKit type="number" placeholder="от"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до"/>
          </fieldset>

          <fieldset>
            <legend>Стоимость единицы охвата</legend>
            <FormKit type="number" placeholder="от"/>
            <span class="minus"/>
            <FormKit type="number" placeholder="до"/>
          </fieldset>

          <button class="dark">Применить</button>

        </x-inner-row>

      </div>

    </div>

  </x-section>

  <x-section class="campaign">

    <div class="table">

      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort">
          <th-checkbox id="row-th" v-model="thCheckbox"/>
          <template v-slot:after>
            <th>+ Добавить</th>
          </template>
        </x-thead>

        <tbody>
        <tr v-for="channel in channels.data">

          <td-checkbox :id="channel.id" v-model="checkboxes" :value="channel.id" /> <!--@change="calculatePrice"-->
          <td-channel :avatar="channel.avatar" :title="channel.title" :id="channel.id"/>
          <td-categories :categories="channel.categories"/>
          <td-text :text="channel?.tgstat_stat?.participants_count"/>
          <td-text :text="channel?.tgstat_stat?.avg_post_reach"/>
          <td>888</td>
          <td>888</td>
          <td-text :text="channel?.tgstat_stat?.err_percent"/>

          <td>
            <span @click="addInvitation(channel.id)">+ Добавить</span>
          </td>

        </tr>
        </tbody>

      </table>

    </div>

  </x-section>
</template>


<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import TdText from "@/components/ui/table/td-text.vue";
import {useTable} from "@/hooks/useTable";
import ChannelModule from "@/store/modules/channel";
import {useChannels} from "@/hooks/models/channels";
import {Ref, ref} from "vue";
import {IChannelsPaginate} from "@/types/channel";
import XThead from "@/components/ui/table/x-thead.vue";
import TdChannel from "@/components/ui/table/td-channel.vue";
import TdCategories from "@/components/ui/table/td-categories.vue";





const invitedChannels: Ref<number[]> = ref([])
const {channelsList} = useChannels()
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
} = useTable(ChannelModule.fetchChannelsIndex, channelsList, 200)

const channels: Ref<IChannelsPaginate> = ref(fetchResult)
const addInvitation = (id:number) => {

}

</script>
