<template>
  <div>
    <table border="1">
        <thead>
        <tr>
            <th>#</th>
            <th>#</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td>Статистика</td>
            <td><a href="javascript:" @click="getResult">getResult</a></td>
        </tr>
<!--        <tr>-->
<!--          <td>Test</td>-->
<!--          <td><a href="javascript:" @click="getTest">Test</a></td>-->
<!--        </tr>-->
        </tbody>

    </table>

    <a href="javascript:" @click="getList()">getList</a>

<!--    {{getChannels()}}-->


  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ParseModule from "@/store/modules/parse";
import axios from "axios";
import {$axios, emitError, emitSuccessLoad} from "@/services/api/axios";
import ChannelModule from '@/store/modules/channel';
import {IChannel} from "@/types/channel";
@Options({})
export default class ParseTgStat extends Vue {


  public current: number = 0
  public channels = null

  getChannels() {
    // @ts-ignore
    return ChannelModule.channels
  }

  yy() {
    // @ts-ignore
    this.channels?.data.map(i => {
      let t = i.tg_link.split('/').pop()
      if(t.length) {
        ParseModule.getResult(t,i.tg_link)
      }
    })

  }

  getResult() {
    ParseModule.getResult('lentachold','https://t.me/lentachold')
  }

  getList(){
    this.current++

    // @ts-ignore
    ChannelModule.fetchChannels(this.current)
        .then(() => this.channels = JSON.parse(JSON.stringify(ChannelModule.channels)))
        .then(() => this.yy())

  }


  created(){
    // this.getList(this.current)
  }


}
</script>
