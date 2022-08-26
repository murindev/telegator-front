<template>
  <div class="channel-stat-charts column">
    {{title}}
    <div class="legend-items">
      <slot></slot>
      <template v-for="(i,key) in data">
        <a class="legend-item" @click.self="toggleDataset(barChart, key)">
          <p><em :style="`background: ${i.backgroundColor}`"></em>{{i.label}}</p>
          <b>{{i.data[0]}}</b>
        </a>
      </template>
    </div>

  </div>
  <div style="height:  60px; margin-bottom: 36px;">
    <canvas ref="barChartRef"/>
  </div>


</template>

<script lang="ts" setup>
import {Chart, registerables} from "chart.js";
import barOptions from "@/services/charts/bar.options";
import {onMounted, PropType, Ref, ref} from "vue";
import {IChartItem} from "@/types/any";
Chart.register(...registerables);

const props = defineProps({
  data: Object as PropType<IChartItem[]>,
  title: String
})

const barChartRef = ref('')
const barChart = ref({})

const toggleDataset = (chart: any, dataset: any) => {
  if (chart.getDatasetMeta(dataset).visible) {
    chart.hide(dataset);
  } else {
    chart.show(dataset);
  }
}

onMounted(() => {
  barChart.value = new Chart(barChartRef.value, {
    type: 'bar',
    data: {
      labels: [''],
      // @ts-ignore
      datasets: props.data,
    },
    // @ts-ignore
    options: barOptions})
})
</script>
