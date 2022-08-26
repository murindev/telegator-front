<template>
  <th style="width: 50px" :rowspan="rowspan">
    <div class="th-col">
      <input class="hidden" :id="id" type="checkbox" :value="value" v-model="syncedValue"/>
      <label :for="id" class="chb"/>
    </div>
  </th>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";

@Options({})
export default class ThCheckbox extends Vue {
  @Prop() id!: string
  @Prop() value!: boolean
  @Prop() rowspan!: 1
  @PropSync('modelValue') syncedValue!: boolean
}
</script>
