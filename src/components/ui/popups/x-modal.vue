<template>

  <div class="modal" v-if="syncedValue">
    <div class="modal-wrapper">
      <button class="modal-close re-set" @click="closeModal()">✕</button>
      <div class="modal-heading">
        <h2>{{title}}</h2>
      </div>
      <div class="modal-content">

        <perfect-scrollbar class="scrollbar">

          <slot></slot>

        </perfect-scrollbar>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {ModelSync, Prop} from "vue-property-decorator";
import UIModule from "@/store/modules/ui";

@Options({})
export default class XModal extends Vue {
  @Prop() title!: string
  @ModelSync('modelValue','update') syncedValue!: boolean

  closeModal(){
    UIModule.setModalState(false)
  }

}
</script>
