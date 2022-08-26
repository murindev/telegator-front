<template>
  <div class="toaster" :class="params.type">
    <div class="toaster-header">
      <b v-text="params.title"></b>
    </div>
    <div class="toaster-body" v-html="params.text"></div>
    <div v-if="params.footer" class="toaster-footer" v-html="params.footer"></div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import emitter from "@/services/api/eventBus"
import {IToaster} from "@/types/any"

@Options({})
export default class Toaster extends Vue {

  public params: IToaster = {}

  toast(params: IToaster) {
    this.params = {...params}
    setTimeout(() => {
      this.params.type = ''
      this.params.title = ''
      this.params.text = ''
      this.params.footer = ''
    }, this.params.timeout ?? 3000)
  }

  created() {
    this.$bus.on('toast', (params: IToaster) => {
      this.toast(params)
    })
  }
}
</script>
