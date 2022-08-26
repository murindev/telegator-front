<template>

  <x-section class="campaign">

    <div class="table">

      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort">
          <th-checkbox id="row-th" v-model="thCheckbox"/>
        </x-thead>

        <tbody>
        <tr v-for="taskChannel in taskChannels.data">

<!--          <td-checkbox :id="taskChannel.id" v-model="checkboxes" :value="taskChannel.id" />-->
          <td-text :text="`#${taskChannel?.id}`"/>

          <td class="td-channel">
            <div class="td-col">
              <div class="avatar">
                <img v-if="taskChannel.channel.avatar" :src="$env.baseUrl+taskChannel.channel.avatar" alt="avatar"/>
              </div>
              <router-link :to="{name:'CampaignTask',params:{id: taskChannel.task_id, task_channel:taskChannel.id}}" v-text="taskChannel.channel.title"/>
            </div>
          </td>

          <td-text :text="taskChannel?.channel?.tgstat_stat?.participants_count"/>
          <td-text :text="taskChannel?.channel?.tgstat_stat?.err_percent"/>
          <td-text :text="taskChannel?.price"/>
          <td-text :text="$helper.dateTime(taskChannel?.task.range_start_at)"/>
          <td-text :text="$helper.dateTime(taskChannel?.task.range_end_at)"/>
          <td-text :text="taskChannel?.task?.post_nr"/>
          <td-text :text="taskChannel?.task?.silence"/>
          <td-text><span :class="taskChannel?.status?.name">{{taskChannel.status.title}}</span></td-text>


        </tr>
        </tbody>

      </table>

    </div>

  </x-section>

  <x-paginate :links="taskChannels.links" :current="taskChannels.current_page" @paginate="paginate"/>
</template>


<script lang="ts" setup>
import XSection from "@/components/ui/layouts/x-section.vue";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdText from "@/components/ui/table/td-text.vue";
import {useTable} from "@/hooks/useTable";
import {Ref, ref} from "vue";
import XThead from "@/components/ui/table/x-thead.vue";
import TdChannel from "@/components/ui/table/td-channel.vue";
import {ITaskChannelPaginate} from "@/types/taskChannels";
import {taskChannelModel} from "@/hooks/models/taskChannel";
import router from "@/router";
import TaskChannelsModule from "@/store/modules/taskChannels";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import UserModule from "@/store/modules/user";




const taskChannels: Ref<ITaskChannelPaginate> = ref({})

const {fieldsSet} = taskChannelModel(['channel_title','channel_participants_count','channel_err_percent','channel_PRICE','range_start_at','range_end_at','post_nr','silence','state','campaign_id','task_id','user_id'])

fieldsSet.value['campaign_id'].show = false
// fieldsSet.value['campaign_id'].value = router.currentRoute.value.params.id
fieldsSet.value['channel_title'].title = 'Канал'

fieldsSet.value['task_id'].show = false
fieldsSet.value['task_id'].value = router.currentRoute.value.params.id

fieldsSet.value['user_id'].show = false
if(UserModule.role == 'advert') {
  fieldsSet.value['user_id'].value = UserModule.user.id
}



const {direction,orderBy,fields,paginate, sort, checkboxes} = useTable(TaskChannelsModule.fetchTaskChannelsPaginate, fieldsSet, 200, taskChannels)

</script>
