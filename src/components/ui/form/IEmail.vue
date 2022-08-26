<template>
  <label class="square">

    <transition name="fade">
      <span :class="{error: !isValid}" v-if="syncedValue">{{ ph }}</span>
    </transition>

    <input
        :name="name"
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
        :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    />
    <em class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </em>

  </label>
</template>

<script lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
export default {
  name: "IEmail",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props: any) {
    // use `toRef` to create reactive references to `name` prop which is passed to `useField`
    // this is important because vee-validte needs to know if the field name changes
    // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
    const name = toRef(props, "name");

    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
}
</script>
