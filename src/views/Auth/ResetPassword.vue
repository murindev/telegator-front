<template>
  <auth-wrapper>

    <div v-if="message" v-html="message" style="margin-bottom: 20px"></div>

    <FormKit v-else type="form" v-model="formData" :actions="false" @submit="submitHandler(this)">

      <FormKit type="email"
               name="email"
               label="Ваш email"
               placeholder="Ваш email"
               validation="required|email"
               :value="this.$route.query.email"
               :sections-schema="schema"/>

      <FormKit type="password"
               name="password"
               label="Пароль"
               placeholder="Пароль"
               validation="required|length:6|matches:/[^a-zA-Z]/"
               :sections-schema="schema"/>

      <FormKit type="password"
               name="password_confirmation"
               label="Подтверждение пароля"
               placeholder="Подтверждение пароля"
               validation="required"
               :sections-schema="schema"/>

      <FormKit type="hidden"
               name="token"
               :value="this.$route.query.token"/>

      <div class="sign-submit">
        <button type="submit" class="sbt full">Обновить пароль</button>
      </div>

    </FormKit>

    <div class="sign-wpr">
      <router-link class="sign-register" :to="{name: 'SignIn'}">Войти</router-link>
    </div>
    <router-link class="sign-register" :to="{name: 'SignUp'}">Регистрация</router-link>

  </auth-wrapper>

</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component';
import AuthModule from "@/store/modules/auth";
import AuthWrapper from "@/components/wrappers/AuthWrapper.vue";
import {IFormKit, IToaster} from "@/types/any.d";
import FormServiceMixin from "@/mixins/formServiceMixin";


@Options({
  components: {AuthWrapper},
})
export default class ResetPassword extends mixins(FormServiceMixin) {

  public message: string = ''

  start() {
    this.$bus.emit(this.$events.loading.start)
  }

  stop() {
    this.$bus.emit(this.$events.loading.stop)
  }

  submitHandler = async (that: any) => {
    that.start()
    await AuthModule.reset(this.formData)
        .then(response => this.message = response?.data.message)
        .catch((e) => {
          if (e.response.status === 422 && e.response.data.errors.email[0]) {

            /*            this.$bus.$emit('toast', <IToaster>{
                          title: 'что-то пошло не так',
                          text: 'Такой емайл не зарегистрирован.',
                          type: 'error'
                        })*/
          } else {
            throw e;
          }
        }).finally(() => {
          that.stop()
        })
    this.submitted = true
  }

}
</script>
