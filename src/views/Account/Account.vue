<template>
  <x-section class="settings">
    <div class="settings-menu">
      <a href="javascript:" v-for="tab in tabs" :key="tab.class" @click="currentComponent = tab.component"
         :class="[tab.class,{active: tab.component === currentComponent}]">
        <font-awesome-icon :icon="tab.icon"/>
        {{ tab.title }}
      </a>
    </div>

    <component :is="currentComponent"/>

  </x-section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import XSection from "@/components/ui/layouts/x-section.vue";
import AccountPassword from "@/components/account/AccountPassword.vue";
import AccountBanking from "@/components/account/AccountBanking.vue";
import AccountNotifications from "@/components/account/AccountNotifications.vue";
import {IIsComponentListItem} from "@/types/any";

export default defineComponent({
  name: "Account",
  components: {XSection, AccountPassword, AccountBanking, AccountNotifications},
  data() {
    return {
      currentComponent: 'AccountPassword',
      tabs: [
        {icon: 'qrcode', title: 'Смена пароля', component: 'AccountPassword', hash: '#pass'},
        {icon: 'dollar-sign', title: 'Банковские реквизиты', component: 'AccountBanking', hash: '#banking'},
        {icon: 'gear', title: 'Уведомления', component: 'AccountNotifications', hash: '#notices'},
      ] as IIsComponentListItem[]

    }
  },
  methods: {
    tabHash() {
      const tab = this.tabs.find((i) => i.hash === this.$route.hash)
      if(tab) this.currentComponent = tab.component
    }
  },
  mounted() {
    this.tabHash()
  }
})
</script>
