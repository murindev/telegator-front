<template>

  <div class="balance-sections">


    <div class="balance-filter">
      <div class="balance-filter-header">
        <h4>Поиск каналов</h4>
        <button class="blank-12 i-throw">Сбросить</button>
      </div>
      <x-inner-row class="balance-filter-row">
        <fieldset>
          <FormKit
              type="select"
              label="Which country is the smallest?"
              name="small_country"
              :options="[ 'Monaco', 'Maldives', 'Tuvalu', ]"
          />
        </fieldset>
        <fieldset>
          <FormKit
              type="select"
              label="Which country is the smallest?"
              name="small_country"
              :options="[ 'Monaco', 'Maldives', 'Tuvalu', ]"
          />
        </fieldset>
        <fieldset>
          <FormKit type="number" placeholder="от"/>
          <span class="minus"/>
          <FormKit type="number" placeholder="до"/>
        </fieldset>

        <button class="dark">Применить</button>

      </x-inner-row>
    </div>

    <table>
      <thead>
      <tr>
        <th></th>
        <x-th colspan="3"><b>Декабрь 2020</b></x-th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in 5">
        <td></td>
        <td-text>25 декабря 2020 23:30</td-text>
        <td-text>Пополнение баланса</td-text>
        <td-text>+10 ₽</td-text>
      </tr>
      </tbody>
    </table>

    <table>
      <thead>
      <tr>
        <th></th>
        <x-th colspan="3"><b>Декабрь 2020</b></x-th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in 5">
        <td></td>
        <td-text>25 декабря 2020 23:30</td-text>
        <td-text>Пополнение баланса</td-text>
        <td-text>+10 ₽</td-text>
      </tr>
      </tbody>
    </table>

  </div>


</template>

<script>
import {defineComponent} from "vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row";
import TdText from "@/components/ui/table/td-text";

export default defineComponent({
  name: "TransactionsHistory",
  components: {TdText, XInnerRow}
})
</script>
