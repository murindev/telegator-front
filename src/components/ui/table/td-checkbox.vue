<template>
  <td>
    <div class="td-col">
      <input class="hidden" :id="id" type="checkbox" :value="value" v-model="syncedValue"/>
      <label :for="id" class="chb"></label>
    </div>
  </td>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";
export default class TdCheckbox extends Vue {
  @Prop() id!: number
  @Prop() value!: number
  @PropSync('modelValue') syncedValue!:boolean
}
</script>
