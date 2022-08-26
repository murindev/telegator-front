<template>
  <x-section class="pagination" v-show="showPagination">
    <ul>

      <template v-for="(link,key) in links" :key="`paginate-${key}`">
        <li v-if="isLink(link)" :class="isActive(link, current)">
          <button class="cover" v-html="link.label" @click="this.$emit('paginate',Number(link.label))"/>
        </li>
        <li v-else-if="isNotLink(link)" class="dots">
          <span>{{ link.label }}</span>
        </li>
      </template>

    </ul>
  </x-section>
</template>

<script lang="ts">
import {IChannelLink} from "@/types/channel";
import {defineComponent} from "vue";

export default defineComponent({
  name: "x-paginate",
  props: ['links', 'current'],
  data() {
    return {
      showPagination: true
    }
  },
  methods: {
    isLink(link: IChannelLink) {
      return !link.label.includes('Previous') && !link.label.includes('Next') && link.url
    },
    isNotLink(link: IChannelLink) {
      return !link.label.includes('Previous') && !link.label.includes('Next')
    },
    isActive(link: IChannelLink, current: number) {
      return current === Number(link.label) ? 'active' : ''
    },
  },
  watch: {
    links (val) {
      this.showPagination = val.length > 3
    }
  }

})
</script>
