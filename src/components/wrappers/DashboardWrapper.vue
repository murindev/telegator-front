<template>
  <x-header/>
  <slot></slot>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

export default class DashboardWrapper extends Vue {}
</script>
