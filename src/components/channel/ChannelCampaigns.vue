<template>

  <x-section>
    <div class="table">
      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :center="false">
          <th/>
        </x-thead>

        <tbody>
        <tr v-for="taskChannel in taskChannels.data" :key="taskChannel.campaign_id"> <!--taskChannels.data-->
          <td/>

          <td-text>

            <router-link v-if="UserModule.role == 'advert'" :to="{name:'Task', params:{id:taskChannel.id}}">{{taskChannel?.task.title}}</router-link>
            <router-link v-else :to="{name:'Task', params:{id:taskChannel.id}}">{{taskChannel?.task.title}}</router-link>
          </td-text>
          <td-text v-text="taskChannel?.price"/>
          <td-text v-text="taskChannel.paid"/>
          <td-text v-text="$helper.dateTime(taskChannel.task.range_start_at)"/>
          <td-text v-text="$helper.dateTime(taskChannel.task.range_end_at)"/>

        </tr>
        </tbody>
      </table>
    </div>
  </x-section>

  <x-paginate :links="taskChannels.links" :current="taskChannels.current_page" @paginate="paginate"/>

</template>

<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import {computed, ref, Ref} from "vue";
import {ITaskChannel, ITaskChannelPaginate} from "@/types/taskChannels";
import {useTable} from "@/hooks/useTable";
import TaskChannelsModule from "@/store/modules/taskChannels";
import XThead from "@/components/ui/table/x-thead.vue";
import TdText from "@/components/ui/table/td-text.vue";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import {taskChannelModel} from "@/hooks/models/taskChannel";
import router from "@/router";
import UserModule from "@/store/modules/user";

interface ICampaignsReduce {
  campaign_id: number
  campaign_title: string
  task_price: number
  paid: number
  range_start_at: string
  range_end_at: string
}


const taskChannels: Ref<ITaskChannelPaginate> = ref({})

const {fieldsSet} = taskChannelModel(['campaign_title', 'task_price', 'paid', 'range_start_at', 'range_end_at', 'channel_id', 'user_id'])

fieldsSet.value.channel_id.value = Number(router.currentRoute.value.params.id)
fieldsSet.value.channel_id.show = false
if(UserModule.role == 'advert') {
  fieldsSet.value.user_id.value = UserModule.user.id
}

fieldsSet.value.user_id.show = false

const {
  fields,
  orderBy,
  sort,
  direction,
  paginate,
  fetchResult
} = useTable(TaskChannelsModule.fetchTaskChannelsPaginate, fieldsSet, 0, taskChannels)


const campaigns = computed(() => {
  return taskChannels.value.data?.reduce((acc: ICampaignsReduce[], i: ITaskChannel) => {

    let index = acc.findIndex(a => a.campaign_id === i.campaign_id)
    console.log(`${i.task.id} - ${i.task.range_start_at} - ${i.task.range_end_at}`);

    if (index !== -1) {
      acc[index].task_price = Number(acc[index].task_price) + Number(i.price ?? 0)
      acc[index].paid = Number(acc[index].paid) + Number(i.paid ?? 0)
      acc[index].range_start_at = new Date(acc[index].range_start_at) < new Date(i.task.range_start_at) ? acc[index].range_start_at : i.task.range_start_at
      acc[index].range_end_at = new Date(acc[index].range_end_at) > new Date(i.task.range_end_at) ? acc[index].range_end_at : i.task.range_end_at
    } else {
      acc.push({
        campaign_id: i.campaign_id,
        campaign_title: i.campaign.title ?? '',
        task_price: i.price ?? 0,
        paid: i.paid ?? 0,
        range_start_at: i.task.range_start_at,
        range_end_at: i.task.range_end_at
      })
    }

    return acc

  }, [])
})

</script>
