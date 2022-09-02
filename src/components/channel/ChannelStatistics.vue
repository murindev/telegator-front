<template>

  <x-section>
    <div class="channel-stat">
      <h3>Публикаций по дням</h3>

      <div class="channel-stat-items">

        <!--        <div class="channel-stat-item" v-for="item in postsStatistics" :key="item.title">
                  <span>{{ item.title }}</span>
                  <b><img class="icon" v-if="item.icon" :src="item.icon" alt="icon"/> {{ item.content }}</b>
                </div>-->

        <div class="channel-stat-item">
          <span>Публикаций на канале</span>
          <b><img class="icon" :src="require('@/assets/img/icons/u_upload.png')" alt="icon"/>
            {{ channel?.tgstat_stat?.p_total_publications.toLocaleString() }}</b>
        </div>

        <div class="channel-stat-item">
          <span>Публикаций в день</span> <b>
          <img class="icon" :src="require('@/assets/img/icons/u_sigma.svg')" alt="icon"/>
          {{ channel?.tgstat_stat?.p_avg_pubs_per_day.toLocaleString() }}</b>
        </div>

        <div class="channel-stat-item">
          <span>Интенсивное время публикаций</span> <b>
          <img class="icon" :src="require('@/assets/img/icons/u_clock.svg')" alt="icon"/> {{ intervals() }}</b>
        </div>

        <div class="channel-stat-item">
          <span>Среднее кол-во просмотра постов</span>
          <b v-text="channel?.avg_posts_views?.views ? Math.ceil(channel?.avg_posts_views?.views).toLocaleString() : '?'"/>
        </div>

        <div class="channel-stat-item">
          <span>Среднее кол-во шэров постов</span> <b> {{
            channel?.tgstat_stat?.p_avg_forward_per_day.toLocaleString()
          }}</b>
        </div>

        <div class="channel-stat-item">
          <span>Средний охват</span> <b> {{ channel?.tgstat_stat?.avg_post_reach.toLocaleString() }} </b>

        </div>

        <div class="channel-stat-item">
          <span>Стоимость поста, руб.</span> <b v-html="prices()"/>

        </div>

        <div class="channel-stat-item">
          <span>Динамика изменения охвата за неделю.</span>
          <b v-text="channel?.tgstat_subscribers_last.new_subscribers ?? '?'"/>
        </div>

        <div class="channel-stat-item">
          <span>Стоимость единицы охвата (CPU)</span>
          <b v-text="channel?.tgstat_stat.p_cpu"/>
        </div>


      </div>

      <chart-line v-if="avg_post_by_hour_last_week.length && avg_post_by_hour_this_week.length" :data="{
    type: 'line',
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [
        {
          label: 'Предыдущая неделя',
          backgroundColor: '#A469CD',
          borderColor: '#A469CD',
          data: avg_post_by_hour_last_week,
          borderWidth: 1,
        },
        {
          label: 'Текущая неделя',
          backgroundColor: '#3E72D8',
          borderColor: '#3E72D8',
          data: avg_post_by_hour_this_week,
          borderWidth: 1,
        },
      ],
    },
    options: lineOptions,
  }" title="Просмотры по времени, часы"/>


      <chart-bar v-if="female_demography.length && male_demography.length" title="Демография аудитории канала" :data="[
      { label: 'Женщины', data: female_demography, backgroundColor: '#F1505A', borderWidth: 0, },
      { label: 'Мужчины', data: male_demography, backgroundColor: '#3E72D8', borderWidth: 0, },
    ]"/>

    </div>
  </x-section>


</template>

<script lang="ts" setup>
import {Options, Vue} from 'vue-class-component';
import ChartLine from "@/components/ui/charts/ChartLine.vue";
import ChartBar from "@/components/ui/charts/ChartBar.vue";
import PostModule from "@/store/modules/post";
import ChannelModule from "@/store/modules/channel";
import {IAvgViews, IChannel, IChannelPrice, TChannel} from "@/types/channel";
import lineOptions from "@/services/charts/line.options.by.hour";
import barOptions from "@/services/charts/bar.options";
import {onMounted, ref, Ref} from "vue";
import router from "@/router";
import {ITgstatPost} from "@/types/stat";


const channel: Ref<TChannel> = ref(null)


const maxValue = (arr: any[]) => {
  let counts = arr.reduce((a: any, c: any) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});
  // @ts-ignore
  let maxCount = Math.max(...Object.values(counts));
  return Object.keys(counts).filter(k => counts[k] === maxCount)[0];
}

const intervals = () => {
  let arr = []
  if (channel.value?.tgstat_posts?.length) {
    for (let i = 0, len = channel.value.tgstat_posts.length; i < len; i++) {
      arr.push(new Date(channel.value.tgstat_posts[i].date * 1000).getHours())
    }
    return maxValue(arr) + ':00'
  } else {
    return '?'
  }
}

const prices = () => {
  if (channel.value?.prices?.length) {
    let index = channel.value.prices.findIndex((i: IChannelPrice) => i.post_price_type_id === 7)
    if (index !== -1) channel.value?.prices.splice(index, 1)

    let min = channel.value?.prices.reduce((prev, current) => (prev.price < current.price) ? prev : current)
    let max = channel.value?.prices.reduce((prev, current) => (prev.price > current.price) ? prev : current)

    if (min.price === max.price) {
      return max.price.toLocaleString()
    } else {
      return `${min.price.toLocaleString()}~${max.price.toLocaleString()} `
    }
  } else {
    return '?'
  }
}

const avg_post_by_hour_last_week: Ref<number[]> = ref([])
const avg_post_by_hour_this_week: Ref<number[]> = ref([])
const male_demography: Ref<number[]> = ref([])
const female_demography: Ref<number[]> = ref([])

onMounted(async () => {
  await ChannelModule.fetchChannel(Number(router.currentRoute.value.params.id))
      .then(() => channel.value = ChannelModule.getChannel)
      .then(() => {
        // @ts-ignore
        avg_post_by_hour_last_week.value = channel.value?.avg_post_by_hour_last_week?.map((i: IAvgViews) => Number(i.views))
        // @ts-ignore
        avg_post_by_hour_this_week.value = channel.value?.avg_post_by_hour_this_week?.map((i: IAvgViews) => Number(i.views))
        // @ts-ignore
        male_demography.value = channel.value?.tgstat_stat?.p_male_demography ? [channel.value?.tgstat_stat?.p_male_demography] : []
        // @ts-ignore
        female_demography.value = channel.value?.tgstat_stat?.p_female_demography ? [channel.value?.tgstat_stat?.p_female_demography] : []
      })
})
</script>
