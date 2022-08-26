<template>
  <FormKit type="form" ref="campaignCreate" v-model="formData" @submit="submitHandler()" :actions="false">

    <x-section class="campaign-add">
      <div class="campaign-add-form">
        <h2>Создание кампании</h2>


        <FormKit type="text" name="title" label="Название" placeholder="Название"
                 validation="required" :sections-schema="$schema.text" value="Название"
        />

        <x-inner-row>

          <FormKit type="text" name="date_start" label="Начало кампании" placeholder="Начало кампании"
                   :sections-schema="$schema.text"
                   :validation="dateBetween"
                   onfocus="(this.type='date')" onfocusout="(this.value ? this.type='date' : this.type='text')"
                   :value="dateStart"
          />
          <FormKit type="text" name="time_start" label="Время" placeholder="Время"
                   :sections-schema="$schema.text" validation="required" :value="timeStart"
                   onfocus="(this.type='time')" onfocusout="(this.value ? this.type='time' : this.type='text')"
          />

        </x-inner-row>

        <x-inner-row>

          <FormKit type="text" name="date_end" label="Конец кампании" placeholder="Конец кампании"
                   :sections-schema="$schema.text" validation="required|date_before:2300-12-31" :value="dateEnd"
                   onfocus="(this.type='date')" onfocusout="(this.value ? this.type='date' : this.type='text')"
          />
          <FormKit type="text" name="time_end" label="Время" placeholder="Время"
                   :sections-schema="$schema.text" validation="required" :value="timeEnd"
                   onfocus="(this.type='time')" onfocusout="(this.value ? this.type='time' : this.type='text')"
          />

        </x-inner-row>

        <x-inner-row v-show="ChannelModule.selectedChannels.length">
          <div class="selected-col">
            <h2>Выбранные каналы</h2>
            <div v-for="C in ChannelModule.selectedChannels" class="selected-item">
              {{ C.title }}
            </div>
          </div>
        </x-inner-row>

        <x-inner-row v-show="TaskModule.selectedTasks.length">
          <div class="selected-col">
            <h2>Выбранные задачи</h2>
            <div v-for="T in TaskModule.selectedTasks" class="selected-item">
              {{ T.title }}
            </div>
          </div>
        </x-inner-row>


      </div>

      <div class="campaign-add-description">
        <h2>Описание кампании</h2>

        <div class="textarea-wpr">
          <perfect-scrollbar class="scrollbar">

            <FormKit type="textarea" name="description" label="Описание кампании"
                     value="Производство в принципе масштабирует убывающий инвестиционный продукт. Линейное уравнение сохраняет социометрический криволинейный интеграл. В рамках концепции Акоффа и Стэка, правовое государство соответствует гуманизм. Ряд Тейлора неестественно тормозит потребительский коллапс.Теорема представляет собой  культ  личности."
                     validation="required"
                     oninput="this.style.cssText = 'height:' + this.scrollHeight + 'px'" style="min-height: 100%"
            />
          </perfect-scrollbar>
        </div>


      </div>
      <div class="campaign-add-sbt">
        <button class="sbt">Отменить</button>
        <button class="dark" type="submit" @click="submitForm">Создать</button>
      </div>
    </x-section>

  </FormKit>

  <x-nav>
    <router-link :to="{name: 'NewCampaignTasks'}">Задания</router-link>
    <router-link :to="{name: 'NewCampaignChannels'}">Каналы</router-link>

    <div class="to-tight">
      <p>Выбрано заданий <b v-text="TaskModule.selectedTasks.length"/></p>
      <p>Выбрано каналов <b v-text="ChannelModule.selectedChannels.length"/></p>
    </div>
  </x-nav>

  <router-view/>


</template>


<script lang="ts" setup>
import {ref, Ref} from 'vue'
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import XNav from "@/components/ui/layouts/x-nav.vue";
import UserModule from "@/store/modules/user";
import CampaignModule from "@/store/modules/campaign";
import {ICampaign, TCampaign, TCampaignForm} from "@/types/campaign";
import router from "@/router";
import TaskModule from "@/store/modules/task";
import ChannelModule from "@/store/modules/channel";
import {IChannel} from "@/types/channel";
import {ITask} from "@/types/task";

// data
const submitted = ref(false)
const formData: Ref<TCampaignForm> = ref({})
const campaignCreate = ref(false)
let currentTab = ref(null)


// dates
const now = new Date()
const before = new Date()

const nowNeedle = now.setSeconds(now.getSeconds() + 36000)
const nowBefore = before.setHours(before.getHours() + 24 * 30)

const dateStart = now.toISOString().substr(0, 10)
const timeStart = now.toISOString().substr(11, 5)

const dateEnd = before.toISOString().substr(0, 10)
const timeEnd = before.toISOString().substr(11, 5)


const dateBetween = ['required', ['date_between', dateStart, '2300-01-01']].join('|')

const orderBy: string = 'byId'
const direction: string = 'asc'
let rowsCnt: number = 0

const user = ref(UserModule.user)

const submitHandler = async () => {
  if (!submitted.value) {
    submitted.value = true
    await CampaignModule.saveCampaign({
      title: formData.value.title,
      description: formData.value.description,
      range: {
        start_dts: new Date(formData.value.date_start + ' ' + formData.value.time_start),
        end_dts: new Date(formData.value.date_end + ' ' + formData.value.time_end),
      },
      channels: ChannelModule.selectedChannels?.map((i: IChannel) => i.id),
      tasks: TaskModule.selectedTasks?.map((i: ITask) => i.id)
    })
        .then(() => router.push({name: 'Campaigns'}))
  }
}

function submitForm() {
  // @ts-ignore
  const node = campaignCreate.value.node
  node.submit()
}


</script>

