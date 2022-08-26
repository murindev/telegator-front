<template>
  <div class="settings-pages">
    <h2>Уведомления</h2>
    <label class="switcher column">
      <input type="checkbox"/><span>Получать рассылку на указанный e-mail</span>
    </label>

    <label class="switcher column">
      <input type="checkbox" checked/><span>Уведомлять о изменениях статуса кампаний</span>
    </label>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "AccountNotifications"
})
</script>
