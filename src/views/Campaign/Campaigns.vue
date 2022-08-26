<template>
  <x-section class="campaign">
    <div class="campaign-new">
      <button class="sbt i-circle-plus" @click="$router.push({name:'NewCampaignTasks'})">Создать кампанию</button>
    </div>
    <div class="campaign-filter">
      <div class="campaign-filter-header">
        <h4>Поиск кампании</h4>
        <button class="blank-12 i-throw" v-if="queryState" @click="clearQuery()">Сбросить</button>

      </div>
      <div class="campaign-filter-body">
        <FormKit type="text"
                 id="search"
                 placeholder="Поиск"
                 :hh="$helper.dateTime"
                 label="Поиск"
                 v-model="fields.title.value"/>

        <FormKit type="select"
                 :name="fields.status.name"
                 v-model="fields.status.value"
                 :options="fields.status.options"/>

        <!--         <FormKit type="hidden"
                              :name="fields.user_id.name"
              />-->

        <button class="dark">Все фильтры</button>

      </div>

    </div>

    <div class="table">
      <table v-if="campaigns.data && campaigns.data.length">
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort">
          <th-checkbox id="row-th" v-model="thCheckbox"/>
        </x-thead>

        <tbody>
        <tr v-for="campaign in campaigns.data">

          <td-checkbox :id="campaign.id" :value="campaign.id" v-model="checkboxes"></td-checkbox>
          <td-text>
            <router-link :to="{name:'CampaignTasks', params: {id: campaign.id}}">{{ campaign.title }}</router-link>
          </td-text>
          <td-text :text="countChannels(campaign?.task_channels)"/>
          <td-text :text="fulfilled(campaign?.task_channels).length"></td-text>
          <td-text :text="countPrices(campaign?.task_channels)"></td-text>
          <td-text :text="countPaid(campaign?.task_channels)"></td-text>
          <td-text :text="campaign.range_start_at.substr(0,10)"></td-text>
          <td-text :text="campaign.range_end_at.substr(0,10)"></td-text>

        </tr>
        </tbody>

      </table>

      <div v-else class="nope">
        <p>Список кампаний пуст</p>
      </div>

    </div>

  </x-section>

  <x-paginate :links="campaigns.links" :current="campaigns.current_page" @paginate="paginate"/>
</template>

<script lang="ts" setup>
import {Ref, ref, toRaw, unref, watch} from "vue";

import XSection from "@/components/ui/layouts/x-section.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import TdText from "@/components/ui/table/td-text.vue";
import CampaignModule from "@/store/modules/campaign";
import {useTable} from "@/hooks/useTable";
import {ICampaign, ICampaignPaginate} from "@/types/campaign";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import XThead from "@/components/ui/table/x-thead.vue";
import {campaignModel} from "@/hooks/models/campaign";
import {ITaskChannel} from "@/types/taskChannels";
import {ITask} from "@/types/task";


const campaigns: Ref<ICampaignPaginate> = ref({})

const {fieldsSet} = campaignModel(['title', 'channels_cnt', 'fulfilled_tasks', 'budget', 'paid', 'range_start_at', 'range_end_at', 'status', 'user_id'])

// preset
fieldsSet.value['status'].show = false
fieldsSet.value['user_id'].show = false

const {
  thCheckbox,
  checkboxes,
  direction,
  orderBy,
  fetchResult,
  fields,
  queryState,
  selected,
  paginate,
  sort,
  clearQuery,

} = useTable(CampaignModule.fetchCampaigns, fieldsSet, 250, campaigns)


const fulfilled = (taskChannels: ITaskChannel[]) => {
  return taskChannels.reduce((acc: ITaskChannel[], i: ITaskChannel) => {
    if (i.state && [5, 6].includes(i.state)) {
      acc.push(i)
    }
    return acc
  }, [])
}


const countChannels = (task_channels: ITaskChannel[]) => {
  let channels: number[] = task_channels.reduce((acc: number[], i: ITaskChannel) => {
    if (!acc.includes(i.channel_id))  acc.push(i.channel_id)
    return acc
  }, [])
  return channels.length
}

const countPrices = (task_channels: ITaskChannel[]) => {
  return  task_channels.reduce((acc: number, i: ITaskChannel) => {
    acc = acc + Number(i.price)
    return acc
  }, 0)
}

const countPaid = (task_channels: ITaskChannel[]) => {
  return  task_channels.reduce((acc: number, i: ITaskChannel) => {
    acc = acc + Number(i.paid)
    return acc
  }, 0)
}

</script>
