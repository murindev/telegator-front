<template>
  <label class="square">

    <transition name="fade">
      <span :class="{error: !isValid}" v-if="syncedValue">{{ ph }}</span>
    </transition>

    <input type="email" v-model="syncedValue" @input="checkIsValid()" @focusout="checkIsEmpty()"
           :class="{error: !isValid}" :placeholder="ph"/>
    <em v-if="!isValid && !isNotEmpty">Пустой или неправильный формат email</em>

  </label>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";

export default class XInputEmail extends Vue {

  @Prop() readonly ph: string | undefined
  @Prop({default: false}) validate!: boolean;
  @Prop({default: false}) required!: boolean;
  @PropSync('modelValue', {type: String}) syncedValue!: string

  public isValid: boolean = true;
  public isNotEmpty: boolean = true;

  checkIsValid() {
    if (!this.validate) return false
    if (this.syncedValue?.length) {
      this.isValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.syncedValue)
    }
  }

  checkIsEmpty() {
    if (this.required && this.syncedValue?.length === 0) {
      this.isNotEmpty = false;
    }
  }

  mounted() {
    this.checkIsValid()
    this.checkIsEmpty()
  }

}
</script>

