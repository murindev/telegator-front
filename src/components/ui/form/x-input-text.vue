<script src="../../../router/index.ts"></script>
<template>

  <label class="square">

    <transition name="fade">
      <span :class="{error: !isValid}" v-if="syncedValue">{{ ph }}</span>
    </transition>

    <input :type="type" v-model="syncedValue" @input="checkIsValid()" @focusout="checkIsEmpty()"
           :class="{error: !isValid}" :placeholder="ph"/>

    <em v-if="!isValid && !isNotEmpty">Поле обязательно</em>

  </label>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";

export default class XInputText extends Vue {

  @Prop() readonly ph: string | undefined
  @Prop({default: false}) validate!: boolean;
  @Prop({default: false}) required!: boolean;
  @PropSync('modelValue', {type: String}) syncedValue!: string

  public type: string = 'password';
  public isValid: boolean = true;
  public isNotEmpty: boolean = true;

  changeType(){
    this.type = this.type === 'password' ? 'text' : 'password'
  }

  checkIsValid() {
    if (!this.validate) return false
    this.isValid = this.syncedValue.length >= 1
  }

  checkIsEmpty() {
    if (this.required && this.syncedValue.length === 0) {
      this.isNotEmpty = false;
    }
  }

  mounted() {
    // this.checkIsValid()
    // this.checkIsEmpty()
  }

}
</script>

