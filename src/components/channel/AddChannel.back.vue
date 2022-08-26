<template>
  <FormKit type="form" v-model="formData" :actions="false" @submit="submitHandler">

    <FormKit type="text"
             name="contact_tg"
             label="Ссылка на канал"
             placeholder="Ссылка на канал"
             validation="required|matches:/^https:\/\/t\.me\/(?:joinchat\/)?\w+$/"
             help="Ссылка должна выглядеть таким образом https://t.me/name"
             :sections-schema="this.schema"/>


    <FormKit type="text"
             name="contact"
             label="Контактное лицо"
             placeholder="Контактное лицо"
             validation="required"
             help="Контактное лицо канала"
             :sections-schema="this.schema"/>

    <FormKit type="text"
             name="tg_link"
             label="Ссылка на телеграм"
             placeholder="Ссылка на телеграм"
             validation="required|matches:/^https:\/\/t\.me\/(?:joinchat\/)?\w+$/"
             help="Ссылка должна выглядеть таким образом https://t.me/name"
             :sections-schema="this.schema"/>

    <div class="multiselect-wrapper" v-click-outside="onClickOutside">

      <label for="FormKit-5" class="multiselect">
        <span rel="Тематика канала"></span>

        <em v-html="showArray()"></em>

      </label>
      <input id="FormKit-5" v-model="toggleMultiSelect" type="checkbox" class="hidden"/>

      <FormKit v-if="categories.length" type="checkbox"
               :name="cat.name"
               :label="cat.label"
               :placeholder="cat.placeholder"
               :validation="cat.validation"
               :help="cat.help"
               :sections-schema="cat.schema"
               :options="JSON.parse(JSON.stringify(categories))"/>
    </div>

    <p>
      Вам нужно выбрать не менее одного направления:
    </p>

    <FormKit type="checkbox" label="Пост с рекламой телеграм-канала" name="channelAdvertPosts"/>

    <div class="triple">
      <FormKit
          type="group"
          name="prices"
      >

        <FormKit type="number"
                 name="channelAdvertPostOnce"
                 :disabled="!formData.channelAdvertPosts"
                 label="1/24"
                 placeholder="1/24"
                 :help="numberInputHelp('channelAdvertPostOnce')"
                 :sections-schema="this.schema"/>

        <FormKit type="number"
                 name="channelAdvertPostTwice"
                 :disabled="!formData.channelAdvertPosts"
                 label="2/48"
                 placeholder="2/48"
                 :help="numberInputHelp('channelAdvertPostTwice')"
                 :sections-schema="this.schema"/>

        <FormKit type="number"
                 name="channelAdvertPostForever"
                 :disabled="!formData.channelAdvertPosts"
                 label="Без удаления"
                 placeholder="Без удаления"
                 :help="numberInputHelp('channelAdvertPostForever')"
                 :sections-schema="this.schema"/>

      </FormKit>

    </div>

    <FormKit type="checkbox" label="Пост с рекламой бренда" name="brandAdvertPosts"/>

    <div class="triple">
      <FormKit
          type="group"
          name="prices"
      >
        <FormKit type="number"
                 name="brandAdvertPostOnce"
                 :disabled="!formData.brandAdvertPosts"
                 label="1/24"
                 placeholder="1/24"
                 :help="numberInputHelp('brandAdvertPostOnce')"
                 :sections-schema="this.schema"/>

        <FormKit type="number"
                 name="brandAdvertPostTwice"
                 :disabled="!formData.brandAdvertPosts"
                 label="2/48"
                 placeholder="2/48"
                 :help="numberInputHelp('brandAdvertPostTwice')"
                 :sections-schema="this.schema"/>

        <FormKit type="number"
                 name="brandAdvertPostForever"
                 :disabled="!formData.brandAdvertPosts"
                 label="Без удаления"
                 placeholder="Без удаления"
                 :help="numberInputHelp('brandAdvertPostForever')"
                 :sections-schema="this.schema"/>
      </FormKit>
    </div>

    <FormKit type="checkbox" label="Создание авторского поста (текст)" name="creatingAuthorsPost"/>


    <p class="warn">
      Внимание! Цены, которые вы указываете будут фигурировать в качестве вашего прайса на платформе. Платформа
      удерживает комиссию в размере 15% от указанного вами прайса.
    </p>

    <div class="addChannel-submit">
      <a href="javascript:" @click="$bus.emit('close-modal')" class="text">Отмена</a>
      <button type="submit"
              @click="submitForm"
              class="link"
              :disabled="!disableForm()"
      >Добавить
      </button>
    </div>

  </FormKit>
</template>

<script lang="ts">
import {mixins, Options, Vue} from 'vue-class-component';
import {IFormKit, IKeyValue} from "@/types/any";
import AuthModule from "@/store/modules/auth";
import FormServiceMixin from "@/mixins/formServiceMixin";
// @ts-ignore
import vClickOutside from "click-outside-vue3"
import {Prop, PropSync} from "vue-property-decorator";
import ChannelModule from "@/store/modules/channel";
import {toRaw} from "vue";

@Options({
  directives: {
    clickOutside: vClickOutside.directive
  }
})
export default class AddChannel extends mixins(FormServiceMixin) {

  @PropSync('categories') categories!: any[]

  public formData: IKeyValue = {}

  public toggleMultiSelect: boolean = false

  onClickOutside(event: any) {
    this.toggleMultiSelect = false
  }

  showArray() {
    if (this.formData.hasOwnProperty('categories') && this.formData.categories.length) {
      return this.categories.reduce((acc: string[], i: any) => {
        if (this.formData.categories.includes(i.value)) {
          acc.push(i.label)
        }
        return acc
      }, [])
    } else {
      return 'Выберите хоть одну тематику';
    }
  }

  numberInputHelp(name: string) {
    return this.formData[name] ? `Вы получите: ${this.formData[name]} RUB` : 0
  }

  public cat = {
    name: 'categories',
    type: 'multi-select',
    label: 'Тематика канала',
    schema: this.schemaMultiselect,
    placeholder: 'Тематика канала',
    validation: 'required',
    help: 'Выберите хоть одну тематику',
    options: this.categories
  }

  disableForm() {
    let form = toRaw(this.formData)
    let sum = form.prices?.channelAdvertPostOnce ||
        form.prices?.channelAdvertPostTwice ||
        form.prices?.channelAdvertPostForever ||
        form.prices?.brandAdvertPostOnce ||
        form.prices?.brandAdvertPostTwice ||
        form.prices?.brandAdvertPostForever ||
        form.prices?.creatingAuthorsPost

    console.log('sdasdasd', sum);

    return Number(sum) > 0

  }

  /*  closeModal(){  https://t.me/montenikolas
      this.$bus.emit('close-modal')
    }*/

  submitHandler = async () => {
    await ChannelModule.addChannel(this.formData)
  }
}
</script>
