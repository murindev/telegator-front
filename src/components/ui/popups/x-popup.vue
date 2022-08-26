<template>

  <div class="popup">
    <div class="popup-wrapper">

      <div class="popup-heading">
        <h2 v-if="heading" v-html="heading"/>
      </div>

      <div class="popup-content">
        <p v-html="content" v-if="content"/>
          <slot></slot>
      </div>

      <div class="popup-footer">
        <button :class="type === 'alert' ? 'sbt' : 'blank'" @click="emit('cancel')" v-text="cancelBtn"/>
        <button v-if="type === 'confirm'" class="dark"  @click="emit('confirm')" v-text="confirmBtn"/>
      </div>

    </div>
  </div>

</template>


<script lang="ts" setup>

const props = defineProps({
  cancelBtn: {
    type: String,
    default: 'Отмена'
  },
  confirmBtn: {
    type: String,
    default: 'Да'
  },
  type: {
    type: String,
    default: 'confirm'
  },
  content: {
    type: String,
    default: ''
  },
  heading: {
    type: String,
    default: ''
  },
  opened: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>
