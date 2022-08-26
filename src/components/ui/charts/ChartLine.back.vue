<!--<template>
  <div class="channel-stat-charts">
   {{syncedTitle}}
    <slot></slot>
    <template v-for="(i,key) in syncedChart.data.datasets">
      <a class="legend-item" @click.self="toggleDataset(lineChart, key)">
        <em :style="`background: ${i.backgroundColor}`"></em>{{i.label}}</a>
    </template>
  </div>

  <div class="chart-wrapper">
    <canvas ref="lineChart"/>
  </div>

</template>-->

<template>
  <div class="channel-stat-charts">
    {{title}}
    <slot></slot>
    <template v-for="(i,key) in data.data.datasets">
      <a class="legend-item" @click.self="toggleDataset(lineChart, key)">
        <em :style="`background: ${i.backgroundColor}`"></em>{{i.label}}</a>
    </template>
  </div>

  <div class="chart-wrapper">
    <canvas ref="lineChartRef"/>
  </div>

</template>

<script lang="ts" setup>
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";
import {Chart, registerables} from "chart.js";
import {onMounted, PropType, ref} from "vue";
import {IChartItem} from "@/types/any";
Chart.register(...registerables);

const lineChartRef = ref('')
const lineChart = ref({})

const props = defineProps({
  data: Object,
  title: String
})

const toggleDataset = ref((chart: any, dataset: any) => {
      if (chart.getDatasetMeta(dataset).visible) {
        chart.hide(dataset);
      } else {
        chart.show(dataset);
      }
    }
)
onMounted(() => {
  // @ts-ignore
  lineChart.value = new Chart(lineChartRef.value, props.data)
})

/*export default class ChartLine extends Vue {
  @PropSync('data') syncedChart!: any
  @PropSync('title') syncedTitle!: any

  $refs!: {
    lineChart: HTMLCanvasElement,
    barChart: HTMLCanvasElement,
  }

  public lineChart!: any

  mounted() {
    this.lineChart = new Chart(this.$refs.lineChart, this.syncedChart)
  }

  toggleDataset(chart: any, dataset: any) {
    if (chart.getDatasetMeta(dataset).visible) {
      chart.hide(dataset);
    } else {
      chart.show(dataset);
    }
  }

}*/
</script>
