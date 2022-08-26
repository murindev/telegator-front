<template>
  <x-header/>
  <popups-list :data="state_1"/>
  <router-view></router-view>
  <DialogsWrapper/>
</template>

<script lang="ts" setup>
import XHeader from "@/components/ui/layouts/x-header.vue";
import {DialogsWrapper} from "vuejs-confirm-dialog";
import {computed, onMounted, Ref, ref} from "vue";
import TaskChannelsModule from "@/store/modules/taskChannels";
import {ITaskChannel} from "@/types/taskChannels";
import PopupsList from "@/components/ui/popups/popups-list.vue";
import UserModule from "@/store/modules/user";



const state_1 = computed(() => {

  return TaskChannelsModule.taskChannels.reduce((acc: any[], i: ITaskChannel) => {

    if (i.state == 1 && i.channel.owner_id == UserModule.user.id) {
      acc.push({
        heading: `Ваш канал "${i.channel.title}" получил задачу`,
        link: `/dashboard/tasks/${i.id}`,
        linkTitle: `задача "${i.task.title}"`,
        id:i.id
      })
    }
    return acc
  }, [])
})


onMounted(async () => {
  await TaskChannelsModule.fetchTaskChannels({offers: true})
})
</script>

