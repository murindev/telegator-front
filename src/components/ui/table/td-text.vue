<template>
  <td>
    {{text}}
    <slot></slot>
  </td>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";

@Options({})
export default class TdText extends Vue {
  @Prop() text!: string | number

}
</script>
