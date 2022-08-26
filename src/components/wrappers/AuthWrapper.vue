<template>
  <x-main class="sign">
    <div class="sign-container">

      <logo/>

      <slot></slot>

    </div>
    <loading/>
  </x-main>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Loading from "@/components/ui/popups/loading.vue";

@Options({
  components: {Loading}
})
    export default class AuthWrapper extends Vue {

    }
</script>
