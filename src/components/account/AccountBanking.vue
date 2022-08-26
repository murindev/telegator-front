<template>
  <div class="settings-sections">

    <div class="settings-section">

      <template v-for="section in form">

        <h2>{{ section.title }}</h2>


        <x-inner-row class="settings-banking">
          <template v-for="input in section.items">
            <div class="settings-banking-title">{{ input.label }}</div>
            <FormKit :type="input.type" name="name" label="label" :placeholder="input.label" :sections-schema="input.schema"/>
          </template>

        </x-inner-row>
      </template>

    </div>

    <div class="settings-section">
      <h2>Уведомления</h2>

        <label class="switcher column">
          <input type="checkbox" checked/><span>Получать рассылку на указанный e-mail</span>
        </label>

        <label class="switcher column">
          <input type="checkbox" checked/><span>Уведомлять о изменениях статуса кампаний</span>
        </label>



    </div>



  </div>
</template>


<script>
import {defineComponent} from "vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row";

export default defineComponent({
  name: "AccountBanking",
  components: {XInnerRow},
  data() {
    return {
      form: [
        {
          title: 'Банковские реквизиты',
          items: [
            {
              name: 'name',
              type: 'text',
              label: 'Форма организации',
              // schema: this.$schema.text,
              placeholder: 'ООО',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Название организации',
              // schema: this.$schema.text,
              placeholder: 'Название организации',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'ИНН',
              schema: this?.$schema.text,
              placeholder: 'ИНН',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'ОГРН',
              schema: this?.$schema.text,
              placeholder: '89004567898',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'КПП',
              schema: this?.$schema.text,
              placeholder: '5678908765434567',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Уполномоченное лицо',
              schema: this?.$schema.text,
              placeholder: 'Уполномоченное лицо',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Должность',
              schema: this?.$schema.text,
              placeholder: 'Должность',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Уполномочен на основании',
              schema: this?.$schema.text,
              placeholder: 'Уполномочен на основании',
              validation: 'required',
              help: '',
            },
          ]
        },
        {
          title: 'Банковские реквизиты',
          items: [
            {
              name: 'name',
              type: 'text',
              label: 'БИК',
              schema: this?.$schema.text,
              placeholder: '678908765',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Банк',
              schema: this?.$schema.text,
              placeholder: 'Банк',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Корреспондентский счет',
              schema: this?.$schema.text,
              placeholder: '8900567898',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Расчетный счет',
              schema: this?.$schema.text,
              placeholder: '5678908765434567',
              validation: 'required',
              help: '',
            },
          ]
        },
        {
          title: 'Адрес и телефон',
          items: [
            {
              name: 'name',
              type: 'text',
              label: 'Юридический адрес',
              schema: this?.$schema.text,
              placeholder: 'Адрес',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Фактический адрес',
              schema: this?.$schema.text,
              placeholder: 'Адрес',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Телефон',
              schema: this?.$schema.text,
              placeholder: '8900567898',
              validation: 'required',
              help: '',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Факс',
              schema: this?.$schema.text,
              placeholder: '56789087654',
              validation: 'required',
              help: '',
            }]
        }
      ]
    }
  },
})
</script>
