<template>
  <td>
    <x-tag v-for="i in categories" v-text="i.label"/>
  </td>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import XTag from "@/components/ui/element/x-tag.vue";
import {Prop} from "vue-property-decorator";
import {IChannelCategory} from "@/types/channel";

@Options({
  components: {XTag}
})
export default class TdCategories extends Vue {

  @Prop() categories!: IChannelCategory[]
}
</script>
