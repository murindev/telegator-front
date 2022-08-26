<template>
  <auth-wrapper>
    <FormKit type="form" v-model="formData" :actions="false" @submit="submitHandler(this)">

      <FormKit v-for="prop in signIn"
               :key="prop.name"
               :type="prop.type"
               :name="prop.name"
               :label="prop.label"
               :placeholder="prop.placeholder"
               :validation="prop.validation"
               :sections-schema="prop.schema"/>

      <div class="sign-submit">
        <router-link :to="{name: 'ForgotPassword'}">Забыли пароль?</router-link>
        <button type="submit" class="sbt">Войти</button>
      </div>

    </FormKit>


    <div class="error-messages" v-if="loginFail && loginFail.length">
      <p class="error" v-html="loginFail"></p>
    </div>

    <telegram-auth
        mode='callback'
        :telegramLogin='$env.tgLogin'
        requestAccess='write'
        size='medium'
        radius='2'
        @callback='telegramAuth'
    ></telegram-auth>

<!--    <button class="link">Войти через Telegram</button>-->
    <router-link class="sign-register" :to="{name: 'SignUp'}">Регистрация</router-link>

  </auth-wrapper>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component';
import AuthModule from "@/store/modules/auth";
import AuthWrapper from "@/components/wrappers/AuthWrapper.vue";
import {IFormKit} from "@/types/any.d";
import FormServiceMixin from "@/mixins/formServiceMixin";
import messages from "@/services/messages";
import router from "@/router";
import TelegramAuth from "@/components/auth/TelegramAuth.vue";
import UserModule from "@/store/modules/user";

@Options({
  components: {TelegramAuth, AuthWrapper},
})
export default class SignIn extends mixins(FormServiceMixin) {

  public loginFail: string = ''

  private signIn: IFormKit[] = [
    {
      name: 'email',
      type: 'text',
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
  ]

  submitHandler = async (that: any) => {
    that.$bus.emit(that.$events.loading.start)
    const result = await AuthModule.login(this.formData)
    if (await result === 2) {
      console.log('UserModule.role', UserModule.role);
      if(UserModule.role === 'advert') {
        await router.push({name: "Campaigns"});
      } else {
        await router.push({name: "Channels"});
      }
    } else {
      if (result.response?.status === 422 && result.response?.data?.errors?.email[0]) {
        this.loginFail = result.response?.data?.errors?.email[0]
      } else {
        this.loginFail = messages.somethingWentWrong
      }
      that.$bus.emit(that.$events.loading.stop)
    }
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
