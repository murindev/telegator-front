<template>
  <x-section class="notices" v-if="props.data.length">
    <div class="notices-item" v-for="item in props.data">
      <p>{{item.heading}}</p>
      <a :href="item.link">{{item.linkTitle}}</a>
      <div class="notice-fixed-sbt">
        <button class="blank" @click="refuse(item.id)">{{props.btnCansel}}</button>
        <button class="dark" @click="confirm(item.id)">{{props.btnSubmit}}</button>
      </div>
    </div>
  </x-section>
</template>

<script lang="ts" setup>

import {defineProps, Ref, ref} from "vue";
import useConfirm from "@/hooks/useConfirm";
import TaskChannelsModule from "@/store/modules/taskChannels";

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  btnCansel: {
    type: String,
    default: 'Отклонить'
  },
  btnSubmit: {
    type: String,
    default: 'Принять'
  }
})

const id: Ref<number|null> = ref(null)
const makeConfirm = () => updateTaskChannel(2)
const makeRefuse = () => updateTaskChannel(7)
const updateTaskChannel = async (state: number) => {
  await TaskChannelsModule.updateTaskChannel({
    id: id.value,
    state: state
  })
  await TaskChannelsModule.fetchTaskChannels({offers: true})
}

const refuse = (i:number) => {
  id.value = i
  useConfirm(
      makeRefuse,
      {content: `Вы собираетесь отказаться от задания. <br> Подтверждаете действие?`}
  )
}
const confirm = (i:number) => {
  id.value = i
  useConfirm(
      makeConfirm,
      {content: `Вы собираетесь подтвердить размещение задания. <br> Подтверждаете действие?`}
  )
}
</script>
