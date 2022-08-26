<template>
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

</template>


<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

export default class ChartLine extends Vue {
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

}
</script>
