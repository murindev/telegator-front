<template>
  <x-section>
    <div class="table">
      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort" :center="true"/>

        <tbody>
        <tr v-for="post in tgstatPosts.data" :key="post.id">
          <td-text class="ta-c" >{{ post.post_id }}</td-text>
          <td-text>
            <router-link class="thin"
                :to="{name: 'ChannelPost', params: {post: post.post_id}}"
                v-html="post.text.substr(0,60) + '...'"
            />
          </td-text>
          <td-text class="ta-c" v-html="post.date ? $helper.dateTime(post.date*1000) : ''"/>
          <td-text class="ta-c" v-text="post.views ? post.views.toLocaleString() : ''"/>
          <td-text class="ta-c" v-html="post.stat.forwards_count"/>
          <td-text class="ta-c">Нет</td-text>
        </tr>
        </tbody>
      </table>
    </div>
  </x-section>
  <x-paginate :links="tgstatPosts.links" :current="tgstatPosts.current_page" @paginate="paginate"/>
</template>

<script lang="ts" setup>
import {ref, Ref} from "vue";
import TdText from "@/components/ui/table/td-text.vue";
import TgstatModule from "@/store/modules/tgstat";
import {useTable} from "@/hooks/useTable";
import {tgstatPostModel} from "@/hooks/models/tgstatPost";
import XThead from "@/components/ui/table/x-thead.vue";
import {ITgstatPostsPaginate} from "@/types/stat";
import XPaginate from "@/components/ui/table/x-paginate.vue";
import router from "@/router";

const tgstatPosts: Ref<ITgstatPostsPaginate> = ref({})

const {fieldsSet} = tgstatPostModel(['channel_id', 'text', 'date', 'views', 'forwards_count','is_advert'])

// model preset
fieldsSet.value.channel_id.value = router.currentRoute.value.params.id
delete fieldsSet.value.channel_id.sort

const {
  thCheckbox,
  checkboxes,
  direction,
  orderBy,
  fetchResult,
  fields,
  selected,
  paginate,
  sort,
} = useTable(TgstatModule.fetchPosts, fieldsSet, 330, tgstatPosts)
</script>
