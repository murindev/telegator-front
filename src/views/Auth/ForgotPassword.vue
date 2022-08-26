<template>
  <auth-wrapper>

    <div v-if="message" v-html="message"></div>

    <template v-else>

      <FormKit type="form" v-model="formData" :actions="false" @submit="submitHandler">

        <template v-for="prop in signIn" :key="prop.name">
          <FormKit :type="prop.type"
                   :name="prop.name"
                   :label="prop.label"
                   :placeholder="prop.placeholder"
                   :validation="prop.validation"
                   :sections-schema="prop.schema"/>
        </template>

        <div class="sign-submit">
          <button type="submit" class="sbt full">Восстановить пароль</button>
        </div>

      </FormKit>

      <div class="error-messages" v-if="fail && fail.length">
        <p class="error" v-html="fail"></p>
      </div>

      <div class="sign-wpr">
        <router-link class="sign-register" :to="{name: 'SignIn'}">Войти</router-link>
      </div>
      <router-link class="sign-register" :to="{name: 'SignUp'}">Регистрация</router-link>

    </template>



  </auth-wrapper>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component';
import AuthModule from "@/store/modules/auth";
import AuthWrapper from "@/components/wrappers/AuthWrapper.vue";
import {IFormKit, IToaster} from "@/types/any.d";
import FormServiceMixin from "@/mixins/formServiceMixin";
import eventBus from "@/services/api/eventBus";
import messages from "@/services/messages";

@Options({
  components: {AuthWrapper},
})
export default class ForgotPassword extends mixins(FormServiceMixin) {

  public message: string = ''
  public fail: string = ''

  private signIn: IFormKit[] = [
    {
      name: 'email',
      type: 'text',
      label: 'Ваш email',
      schema: this.schema,
      placeholder: 'Ваш email',
      validation: 'required|email',
    }
  ]

  submitHandler = async () => {
    // eventBus.$emit(this.$events.loading)

    await AuthModule.forgot(this.formData)
        .then(response => this.message = response?.data.message)
        .catch((e) => {
          if (e.response.status === 422 && e.response.data.errors.email[0]) {
            this.fail = e.response.data.errors.email[0]
          } else {
            this.fail = messages.somethingWentWrong
          }
        })
        .finally(() => {

        })
    this.submitted = true
  }

}
</script>
