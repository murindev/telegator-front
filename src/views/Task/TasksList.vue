<template>

  <x-section>
    <div class="add-channel">
      <button class="sbt i-circle-plus mr-auto" @click="$router.push({name:'TaskNew'})">Создать задание</button>
      <button class="blank i-coffee">Мои каналы</button>
      <span>Вы админ канала?</span>
      <button class="a icon">
        <font-awesome-icon icon="plus"/>
        Добавить канал
      </button>
    </div>
  </x-section>


  <x-section class="task">
    <div class="table">
      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :center="false">
          <th/>
        </x-thead>

        <tbody>
        <tr v-for="taskChannel in taskChannels.data" :key="taskChannel.id"
            :class="{tr_warn: taskChannel.channel.owner_id === UserModule.user.id}">
          <td/>
          <td-text><router-link :to="{name:'Task',params: {id: taskChannel.id}}">{{taskChannel?.task?.title}}</router-link></td-text>
          <td-text><router-link :to="{name:'ChannelStats',params: {id: taskChannel.channel_id}}">{{taskChannel?.channel?.title}}</router-link></td-text>
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
import UserModule from "@/store/modules/user";

const taskChannels: Ref<ITaskChannelPaginate> = ref({})

const {fieldsSet} = taskChannelModel(['title','channel_title','range_start_at','range_end_at','post_nr','penalty','state', 'own'])

const {direction,orderBy,fields,paginate, sort} = useTable(TaskChannelsModule.fetchTaskChannelsPaginate, fieldsSet, 200, taskChannels)

</script>
