<template>
  <div class="box-avatar">
    <button class="blank" @click="$emit('remove-invited', id)">×</button>
    <div class="avatar">
      <img v-if="avatarUrl()" :src="avatarUrl()" alt="avatar"/>
    </div>
    <div class="box-avatar-link">
      <router-link v-if="blank" :to="{name:'ChannelStats',params:{id: id}}" v-text="title" target="_blank"/>
      <router-link v-else :to="{name:'ChannelStats',params:{id: id}}" v-text="title" :target="blank"/>
      <span>{{$price.format(price)}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "x-box-avatar",
  props: ['avatar', 'title', 'price', 'id', 'blank'],
  methods: {
    avatarUrl() {
      return this.avatar ? this.$env.baseUrl + this.avatar : '';
    }
  }
}
</script>

<style scoped>

</style>
