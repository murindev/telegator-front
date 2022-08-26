<template>
  <x-section class="balance">
    <div class="balance-menu">
      <a href="javascript:" v-for="tab in tabs" :key="tab.class"
         @click="currentComponent = tab.component"
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
import TransactionsHistory from "@/components/balance/TransactionsHistory.vue";
import FundsRefill from "@/components/balance/FundsRefill.vue";
import FundsWithdrawal from "@/components/balance/FundsWithdrawal.vue";

export default defineComponent({
  name: "Balance",
  components: {XSection, TransactionsHistory, FundsRefill, FundsWithdrawal},
  data() {
    return {
      currentComponent: 'TransactionsHistory',
      tabs: [
        {icon: 'qrcode', title: 'История операций', component: 'TransactionsHistory', hash: '#transactions'},
        {icon: 'dollar-sign', title: 'Пополнение', component: 'FundsRefill', hash: '#refill'},
        {icon: 'gear', title: 'Вывод средств', component: 'FundsWithdrawal', hash: '#withdrawal'},
      ]

    }
  },
  methods: {
    tabHash() {
      const tab = this.tabs.find((i) => i.hash === this.$route.hash)
      if (tab) this.currentComponent = tab.component
    }
  },
  mounted() {
    this.tabHash()
  }
})
</script>
