<template>
  <FormKit type="form" v-model="formData" :actions="false" @submit="submitHandler"> <!---->

    <FormKit type="text"
             name="tg_link"
             label="Ссылка на канал"
             placeholder="Ссылка на канал"
             validation="required|matches:/^https:\/\/t\.me\/(?:joinchat\/)?[a-zA-Z0-9+-_]+$/"
             help="Ссылка должна выглядеть таким образом https://t.me/channel"
             :sections-schema="$schema"/>

    <FormKit type="text"
             name="contact"
             label="Контактное лицо"
             placeholder="Контактное лицо"
             validation="required"
             help="Контактное лицо канала - @username"

             :sections-schema="$schema"/>
<!--// .*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*-->
    <FormKit type="text"
             name="contact_tg"
             label="Ссылка на телеграм аккаунт"
             placeholder="Ссылка на телеграм аккаунт"
             validation="required|matches:/[a-zA-Z0-9+-_@]+$/"
             help="Ссылка должна выглядеть таким образом  https://t.me/username"
             :sections-schema="$schema"/>

    <div class="multiselect-wrapper" v-click-outside="onClickOutside">

      <label for="FormKit-5" class="multiselect">
        <span rel="Тематика канала"></span>

        <em v-html="showArray()"></em>

      </label>
      <input id="FormKit-5" v-model="toggleMultiSelect" type="checkbox" class="hidden"/>

      <FormKit v-if="categories.length" type="checkbox"
               name="categories"
               label="Тематика канала"
               placeholder="Тематика канала"
               validation="required"
               help="Выберите хоть одну тематику"
               :sections-schema="schemaMultiSelect"
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
                 :sections-schema="$schema"/>

        <FormKit type="number"
                 name="channelAdvertPostTwice"
                 :disabled="!formData.channelAdvertPosts"
                 label="2/48"
                 placeholder="2/48"
                 :help="numberInputHelp('channelAdvertPostTwice')"
                 :sections-schema="$schema"/>

        <FormKit type="number"
                 name="channelAdvertPostForever"
                 :disabled="!formData.channelAdvertPosts"
                 label="Без удаления"
                 placeholder="Без удаления"
                 :help="numberInputHelp('channelAdvertPostForever')"
                 :sections-schema="$schema"/>

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
                 :sections-schema="$schema"/>

        <FormKit type="number"
                 name="brandAdvertPostTwice"
                 :disabled="!formData.brandAdvertPosts"
                 label="2/48"
                 placeholder="2/48"
                 :help="numberInputHelp('brandAdvertPostTwice')"
                 :sections-schema="$schema"/>

        <FormKit type="number"
                 name="brandAdvertPostForever"
                 :disabled="!formData.brandAdvertPosts"
                 label="Без удаления"
                 placeholder="Без удаления"
                 :help="numberInputHelp('brandAdvertPostForever')"
                 :sections-schema="$schema"/>
      </FormKit>
    </div>

    <FormKit type="checkbox" label="Создание авторского поста (текст)" name="creatingAuthorsPost"/>

    <p class="warn">
      Внимание! Цены, которые вы указываете будут фигурировать в качестве вашего прайса на платформе. Платформа
      удерживает комиссию в размере 15% от указанного вами прайса.
    </p>

    <div class="addChannel-submit">
      <a href="javascript:" @click="UIModule.setModalState(false)" class="text">Отмена</a>

      <button type="submit" class="link" :disabled="!canSubmitting">Добавить</button>
    </div>

  </FormKit>
</template>

<script lang="ts" setup>
import ChannelModule from "@/store/modules/channel";
import UIModule from "@/store/modules/ui";

import {ref, Ref, onMounted, watch, computed} from "vue";
import useForm from "@/hooks/useForm";


const categories: Ref<any[]> = ref([])

// form
const {formData, submitted, schemaMultiSelect} = useForm()

// multiselect form input
const toggleMultiSelect: Ref<boolean> = ref(false)

const onClickOutside = (event: any) => {
  toggleMultiSelect.value = false
}

const showArray = () => {
  if (formData.value.hasOwnProperty('categories') && formData.value?.categories.length) {
    return categories.value?.reduce((acc: string[], i: any) => {
      if (formData.value?.categories.includes(i.value)) {
        acc.push(i.label)
      }
      return acc
    }, [])
  } else {
    return 'Выберите хоть одну тематику';
  }
}

// check prices
let canSubmitting = ref(false)

const canSubmit = () => {
  let sum = 0

  if (!formData.value.channelAdvertPosts) {
    formData.value.prices.channelAdvertPostOnce = null
    formData.value.prices.channelAdvertPostTwice = null
    formData.value.prices.channelAdvertPostForever = null
  }

  if (!formData.value.brandAdvertPosts) {
    formData.value.prices.brandAdvertPostOnce = null
    formData.value.prices.brandAdvertPostTwice = null
    formData.value.prices.brandAdvertPostForever = null
  }

  sum += Number(formData.value.prices?.channelAdvertPostOnce)
  sum += Number(formData.value.prices?.channelAdvertPostTwice)
  sum += Number(formData.value.prices?.channelAdvertPostForever)
  sum += Number(formData.value.prices?.brandAdvertPostOnce)
  sum += Number(formData.value.prices?.brandAdvertPostTwice)
  sum += Number(formData.value.prices?.brandAdvertPostForever)
  sum += formData.value.creatingAuthorsPost ? 1 : 0

  canSubmitting.value = sum > 0
}

const numberInputHelp = (name: any) => {
  return formData.value[name] ? `Вы получите: ${formData.value[name]} RUB` : 0
}

watch(formData, (n, o) => {
  canSubmit()
}, {deep: true})

const submitHandler = async () => {
  if (!submitted.value) {
    await ChannelModule.addChannel(formData.value).then(response => {
      if (response.status === 'success') UIModule.setModalState(false)
    })
  }
}

onMounted(async () => {
  await ChannelModule.fetchCategories()
  categories.value = ChannelModule.formKitCategories
})


</script>
