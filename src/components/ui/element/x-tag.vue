<template>
  <span class="tag">
    {{title}}
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "x-tag",
  props: ['title']
}
</script>
