<template>
  <div class="balance-sections">
    <div class="balance-filter">
      <div class="balance-filter-header">
        <h4 class="bold">Вывод средств</h4>
        <button class="blank-12 i-plus">Добавить карту</button>
      </div>
      <div class="balance-page-column">
         <FormKit type="select" name="name" label="label" placeholder="Карта **56"
                  :options="['Карта **56','Карта **57','Карта **59']"
         />

        <FormKit type="number" name="name" label="0 ₽" placeholder="placeholder"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row";

export default defineComponent({
  name: "FundsWithdrawal",
  components: {XInnerRow}
})
</script>

<style scoped>

</style>
