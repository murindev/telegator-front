<template>
  <td class="td-channel">
    <div class="td-col">
      <div class="avatar">
        <img v-if="avatarUrl()" :src="avatarUrl()" alt="avatar"/>
      </div>
      <router-link v-if="blank" target='_blank' :to="{name:'ChannelStats',params:{id: id}}" v-text="title"/>
      <router-link v-else :to="{name:'ChannelStats',params:{id: id}}" v-text="title"/>

    </div>
  </td>
</template>

<script>
export default {
  name: "td-channel",
  props: ['avatar', 'title', 'id','blank'],
  methods: {
    avatarUrl() {
      return this.avatar ? this.$env.baseUrl + this.avatar : '';
    }
  }

}
</script>
