<template>
<div class="loading" v-if="active">
  <img src="@/assets/img/icons/loading.svg" alt="loading"/>
</div>
</template>

<script>
import eventBus from "@/services/api/eventBus";

export default {
  name: "loading",
  data() {
    return {
      active: false
    }
  },
  mounted() {
    this.$bus.on('start-loading', () => this.active = true)
    this.$bus.on('stop-loading', () => this.active = false)

  }
}
</script>
