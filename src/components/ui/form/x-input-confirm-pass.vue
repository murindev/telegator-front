<template>

  <label class="square">

    <transition name="fade">
      <span :class="{error: !isValid}" v-if="syncedValue">{{ ph }}</span>
    </transition>

    <input :type="type" v-model="syncedValue" @input="checkIsValid()"
           :class="{error: !isValid}" :placeholder="ph"/>

    <em v-if="!isValid">Пароли не совпадают</em>

    <a href="javascript:" class="square-see" @click="changeType()"/>

  </label>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, PropSync} from "vue-property-decorator";

export default class XInputConfirmPass extends Vue {

  @Prop() readonly ph: string | undefined
  @Prop() pass!: string
  @PropSync('modelValue', {type: String}) syncedValue!: string

  public type: string = 'password';
  public isValid: boolean = true;

  changeType(){
    this.type = this.type === 'password' ? 'text' : 'password'
  }

  checkIsValid() {
    this.isValid = this.syncedValue === this.pass
  }

}
</script>

