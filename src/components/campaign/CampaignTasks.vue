<template>

  <x-section class="task">
    <div class="table">
      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :center="true">
        <th/>
        </x-thead>
        <tbody>

        <tr v-for="taskChannel in taskChannels.data" :key="taskChannel.id">
          <td/>
          <td-text>
            <router-link :to="{name:'Campaign', params: {id: taskChannel.id}}">
              {{taskChannel?.task?.title}}
            </router-link>
          </td-text>
          <td-text>
            <router-link :to="{name:'ChannelStats', params: {id:taskChannel?.channel_id}}">
              {{taskChannel?.channel?.title}}
            </router-link>
          </td-text>
          <td-text :text="$helper.dateTime(taskChannel?.task?.range_start_at)"/>
          <td-text :text="$helper.dateTime(taskChannel?.task?.range_end_at)"/>
          <td-text :text="taskChannel?.task?.post_nr"></td-text>
          <td-text :text="taskChannel?.penalty"></td-text>
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
import TdText from "@/components/ui/table/td-text.vue";
import {Ref, ref} from "vue";
import {useTable} from "@/hooks/useTable";
import TaskChannelsModule from "@/store/modules/taskChannels";
import {ITaskChannelPaginate} from "@/types/taskChannels";
import {taskChannelModel} from "@/hooks/models/taskChannel";
import XThead from "@/components/ui/table/x-thead.vue";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import router from "@/router";


const taskChannels: Ref<ITaskChannelPaginate> = ref({})

const {fieldsSet} = taskChannelModel(['title','channel_title','range_start_at','range_end_at','post_nr','penalty','state','campaign_id'])

fieldsSet.value['campaign_id'].show = false
fieldsSet.value['campaign_id'].value = router.currentRoute.value.params.id


const {direction,orderBy,fields,paginate, sort} = useTable(TaskChannelsModule.fetchTaskChannelsPaginate, fieldsSet, 200, taskChannels)

</script>

















<!--
<template>
  <x-section>
     <div class="table">

         <table>

           <thead>
           <tr>
             <th-checkbox></th-checkbox>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
             <x-th>dasdasdsd </x-th>
           </tr>
           </thead>


           <tbody>
           <tr v-for="i in 12">
             <td-checkbox></td-checkbox>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
             <td-text>asdadasd</td-text>
           </tr>
           </tbody>

         </table>

       </div>
  </x-section>
</template>

<script>

import {defineComponent} from "vue";
import XSection from "@/components/ui/layouts/x-section";
import ThCheckbox from "@/components/ui/table/th-checkbox";
import TdCheckbox from "@/components/ui/table/td-checkbox";
import TdText from "@/components/ui/table/td-text";

export default defineComponent({
  name: "CampaignsTasks",
  components: {TdText, TdCheckbox, ThCheckbox, XSection}
})
</script>
-->
