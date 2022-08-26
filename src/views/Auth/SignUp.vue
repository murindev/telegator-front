<template>

  <auth-wrapper>

    <FormKit type="form" v-model="formData" :actions="false" @submit="submitHandler">

        <FormKit v-for="prop in form"
                 :key="prop.name"
                 :type="prop.type"
                 :name="prop.name"
                 :label="prop.label"
                 :placeholder="prop.placeholder"
                 :validation="prop.validation"
                 :sections-schema="prop.schema"/>

      <div class="sign-submit">
        <button type="submit" class="sbt full">Зарегистрироваться</button>
      </div>

    </FormKit>

<!--    <button class="link">Войти через Telegram</button>-->

    <telegram-auth
        mode='callback'
        :telegramLogin='$env.tgLogin'
        requestAccess='write'
        size='medium'
        radius='2'
        @callback='telegramAuth'
    ></telegram-auth>


    <router-link class="sign-register" :to="{name: 'SignIn'}">Войти</router-link>

  </auth-wrapper>

</template>

<script lang="ts">
import {mixins, Options, Vue} from 'vue-class-component';
import AuthModule from "@/store/modules/auth";
import {IFormKit} from "@/types/any";
import FormServiceMixin from "@/mixins/formServiceMixin";
import AuthWrapper from "@/components/wrappers/AuthWrapper.vue";
import TelegramAuth from "@/components/auth/TelegramAuth.vue";
import router from "@/router";
import messages from "@/services/messages";

@Options({
  components: {TelegramAuth, AuthWrapper},
})
export default class SignUp extends mixins(FormServiceMixin) {
  public loginFail: string = ''
  public formData = {}
  public submitted = false
  public schema = {
    label: {
      if: '$value',
      attrs: {
        style: {display: 'inline-block'},
      },
    },
  }

  private form: IFormKit[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Ваш логин',
      schema: this.schema,
      placeholder: 'Ваш логин',
      validation: 'required',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Ваш email',
      schema: this.schema,
      placeholder: 'Ваш email',
      validation: 'required|email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Пароль',
      schema: this.schema,
      placeholder: 'Пароль',
      validation: 'required|length:6|matches:/[^a-zA-Z]/',
    },
    {
      name: 'password_confirm',
      type: 'password',
      label: 'Подтверждение пароля',
      schema: this.schema,
      placeholder: 'Подтверждение пароля',
      validation: 'required|confirm',
    }
  ]

  submitHandler = async () => {
    await AuthModule.registration(this.formData)
        .then(() => this.$router.push({ name: 'campaigns' }))
    this.submitted = true
  }

  async telegramAuth(tgAuthData: any) {
    this.$bus.emit(this.$events.loading.start)
    const result = await AuthModule.telegramAuth(tgAuthData)

    if (await result === 2) {
      await router.push({name: "Channels"});
    } else {
      if (result.response?.status === 422 && result.response?.data?.errors?.email[0]) {
        this.loginFail = result.response?.data?.errors?.email[0]
      } else {
        this.loginFail = messages.somethingWentWrong
      }
      this.$bus.emit(this.$events.loading.stop)
    }
  }
}
</script>
