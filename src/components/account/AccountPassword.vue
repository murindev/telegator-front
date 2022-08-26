<template>
  <div class="settings-pages">
    <h2>Смена пароля</h2>
    <x-inner-row class="settings-pass">

      <FormKit type="password" name="name" label="label" placeholder="placeholder" :sections-schema="$schema.text"/>
      <FormKit type="password" name="name" label="label" placeholder="placeholder" :sections-schema="$schema.text"/>
      <FormKit type="password" name="name" label="label" placeholder="placeholder" :sections-schema="$schema.text"/>
      <div class="settings-pass_btn">
        <button class="dark">Изменить пароль</button>
      </div>


    </x-inner-row>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row";

export default defineComponent({
  name: "AccountPassword",
  components: {XInnerRow}
})
</script>
