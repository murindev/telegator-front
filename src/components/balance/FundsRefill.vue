<template>
  <div class="balance-page">

    <h2>Способ оплаты</h2>

    <div class="balance-page-row">

      <label class="radioBtn">
        <input type="radio" v-model="payMethod" value="online" />
        <span>Онлайн-платеж</span>
      </label>

      <label class="radioBtn">
        <input type="radio" v-model="payMethod" value="bank"/>
        <span>Банковский перевод</span>
      </label>

    </div>


    <div v-if="payMethod === 'online'" class="balance-page-row">
      <img src="../../assets/img/yapay.png" alt="ya-pay"/>
    </div>

    <div v-if="payMethod === 'bank'" class="balance-page-column">

      <h3>УСЛОВИЯ ФОРМИРОВАНИЯ СЧЕТА</h3>

       <FormKit type="number" name="name" label="label" placeholder="0 ₽" validation="validation"/>
      <router-link :to="{name:'Account', hash: '#banking'}">
        <font-awesome-icon icon="file-alt"/>
        Не заполнены реквизиты?
      </router-link>

      <button class="dark">Пополнить</button>

    </div>


  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "FundsRefill",
  data() {
    return {
      payMethod: 'bank',
    }
  }
})
</script>

<style scoped>

</style>
