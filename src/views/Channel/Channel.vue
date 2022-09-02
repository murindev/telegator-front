<template>
  <x-section>

    <div class="channel-info">

      <div class="channel-info-name">
        <p>
          <span class="channel-avatar"><img src="@/assets/img/ava.png" alt="alt"/></span>
          <b v-text="channel?.title"/>
          <a target="_blank" :href="channel?.tg_link" class="channel-link" v-text="channel?.tg_link"/>
        </p>
        <p v-text="channel?.tgstat_common_info.about"/>
      </div>

      <div class="channel-info-stat">
        <span>
          <b v-text="channel?.tgstat_stat?.p_total_publications.toLocaleString()"/> Публикаций
        </span>
        <span>
          <b class="channel-info-subscribers">
            {{ channel?.tgstat_stat?.participants_count.toLocaleString() }}
            <em v-cloak>{{ channel?.tgstat_subscribers_last.new_subscribers }}</em></b> Подписчиков
        </span>
      </div>

    </div>
    <div class="channel-info">
      <div class="channel-contact">
        <span>Контактное лицо:<b v-if="channel?.contact_tg" v-text="channel?.contact_tg"/></span>
        <p v-if="channel?.contact">
          <a target="_blank" :href="`tg://resolve?domain=${channel?.contact}`" v-text="channel?.contact"/>
        </p>
        <div v-if="channel?.is_public"><em>Зарегистрирован</em></div>
      </div>
      <div class="channel-media">
<!--        <p><span>Фотопост</span><span class="red">789 890</span></p>-->
<!--        <p><span>Видеопост</span><span class="red">789 890</span></p>-->
<!--        <p><span>Фото</span><span class="red">789 890</span></p>-->
<!--        <p><span>Опрос</span><span class="red">789 890</span></p>-->
      </div>
    </div>
  </x-section>

  <x-nav>
    <router-link :to="{name: 'ChannelStats', params:{id: $route.params.id}}">Статистика</router-link>
    <router-link :to="{name: 'ChannelPosts'}">Публикации</router-link>
    <router-link :to="{name: 'ChannelCampaigns'}">Участие в кампаниях</router-link>
  </x-nav>

  <router-view/>

</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, Ref, ref} from "vue"
import XSection from "@/components/ui/layouts/x-section.vue";
import ChannelModule from "@/store/modules/channel";
import {TChannel} from "@/types/channel";
import XNav from "@/components/ui/layouts/x-nav.vue";
import router from "@/router";

const channel: Ref<TChannel> = ref(null)

onBeforeMount(async () => {
  await ChannelModule.fetchChannel(Number(router.currentRoute.value.params.id))
  channel.value = await ChannelModule.getChannel
})
</script>
