<template>
  <x-section class="post">
    <div class="post-stat">
      <a href="javascript:" @click="$router.go(-1)"> &lt; вернуться</a>
      <br/>
      <br/>
      <h2>Подробнее о посте </h2>
      <x-inner-row class="post-stat-data">
        <p><span>Начало публикации</span>{{ $helper.dateTime(post?.date * 1000) }}</p>
        <p><span>Кол-во просмотров</span>{{ post?.views.toLocaleString() }}</p>
        <p><span>Engagement Rate, %</span>{{ post?.channel_stat?.err_percent }}</p>
        <p><span >Дата изменения</span>-</p>
        <p><span>Количество forward</span>{{ post?.stat.forwards_count.toLocaleString() }}</p>
        <p><span >Комментарии</span>-</p>
        <p><span >Продолжительность публикации</span>-</p>
        <p><span class="blue">Рекламный пост</span>-</p>
        <p><span >Количество реакций</span>-</p>
        <p><span class="blue">Продолжительность “чистоты” <br/>ленты после публикации рекламного поста</span>-</p>

      </x-inner-row>

      <div class="post-stat-graph">

        <chart-line v-if="post !== null" :data="{
    type: 'line',
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [
        {
          backgroundColor: '#3E72D8',
          borderColor: '#3E72D8',
          data: post?.views_by_hours.map(i => i.views),
          borderWidth: 1,
        }
      ],
    },
    options: lineOptionsByHour,
  }" title="Просмотры по времени, часы"/>

      </div>

    </div>
    <div class="post-content">
      <!--      <h2>{{ post?.title }}</h2>-->
      <div class="content">

        <p v-html="post?.text"/>


        <div class="content-img">

          <img v-if="post?.media_json.media_type === 'mediaPhoto'" :src="post?.media_json.file_url" alt="post"/>

          <video v-if="post?.media_json.mime_type === 'video/mp4'" width="400" height="300" controls="controls" :poster="post?.media_json.file_thumbnail_url">
            <source :src="post?.media_json.file_url" :type='`${post?.media_json.mime_type}  `'>
          </video>

          <iframe style="width:100%;" v-if="post?.media_json.media_type === 'mediaWebPage'" :src="post?.media_json.embed_url"/>

        </div>

      </div>

    </div>
  </x-section>
</template>


<script lang="ts" setup>
import {Options, Vue} from 'vue-class-component';
import XSection from "@/components/ui/layouts/x-section.vue";
import XInnerRow from "@/components/ui/layouts/x-inner-row.vue";
import PostModule from "@/store/modules/post";
import {TPost} from "@/types/post";
import ChartLine from "@/components/ui/charts/ChartLine.vue";
import {onBeforeMount, Ref, ref} from "vue";
import TgstatModule from "@/store/modules/tgstat";
import router from "@/router";
import {TTgstatPost} from "@/types/stat";
import lineOptionsByHour from "@/services/charts/line.options.by.hour";


const post: Ref<TTgstatPost> = ref(null)


onBeforeMount(() => {
  TgstatModule.fetchPost(Number(router.currentRoute.value.params.post))
      .then(() => post.value = TgstatModule.post)
})

/*const   getConfig = () => {
  return {
    type: 'line',
    data: {
      labels: this.post?.post_views_last?.map(i => i.hour),
      datasets: [
        {
          backgroundColor: '#3E72D8',
          borderColor: '#3E72D8',
          data: this.post?.post_views_last?.map(i => i.views_cnt),
          borderWidth: 1,
        }
      ],
    },
    options: lineOptionsByHour,
  }
}*/

/*

ERR = (Средний охват одного поста / Количество подписчиков) * 100%
Средний охват одного поста в Телеграмм — это охват постов за какое-то время, делённый на количество постов.
Зачастую достаточно взять последнюю неделю и вывести средний показатель.


@Options({
  components: {XInnerRow, XSection, ChartLine}
})
export default class ChannelPost extends Vue {

  public post: TPost = null



  async mounted() {
    await PostModule.fetchPostWithViews({
      id: Number(this.$route.params.post)
    }).then(() => this.post = PostModule.getPost)
  }
}
*/
</script>
