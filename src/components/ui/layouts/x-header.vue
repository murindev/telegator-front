<template>
  <header>
    <div>
      <div class="header">
        <div class="header-nav">
          <logo/>
          <nav>
<!--            <router-link  :to="{name:'Channels'}" :class="activeClass('dashboard/channels')">Каналы</router-link>
            <router-link  :to="{name:'Campaigns'}" :class="activeClass('dashboard/campaigns')">Кампании</router-link>
            <router-link  :to="{name:'TasksList'}" :class="activeClass('dashboard/tasks')">Задания</router-link>-->
            <router-link v-show="role !== 'advert'" :to="{name:'Channels'}" :class="activeClass('dashboard/channels')">Каналы</router-link>
            <router-link v-show="role !== 'channel'" :to="{name:'Campaigns'}" :class="activeClass('dashboard/campaigns')">Кампании</router-link>
            <router-link v-show="role !== 'advert'" :to="{name:'TasksList'}" :class="activeClass('dashboard/tasks')">Задания</router-link>
          </nav>
        </div>
        <div class="header-personal">
          <div class="header-balance">
            <span>Баланс</span>
            <p>{{ user.balance }} <em>₽</em></p>
          </div>
          <div class="header-user" v-click-outside="onClickOut">
            <div class="header-user-avatar"><!--@/assets/img/ava.png-->
              <img v-if="user.avatar" :src="$env.baseUrl+user.avatar" alt="user"/>
            </div>
            <input type="checkbox" id="settings" class="hidden" v-model="select"/>
            <label for="settings">
              <span>{{ user.name }}</span>
              <font-awesome-icon icon="angle-up"/>
            </label>

            <ul>
              <li>
                <router-link :to="{name:'Balance'}" @click="select = false">
                  <font-awesome-icon icon="dollar"/>
                  <span>Баланс</span></router-link>
              </li>
              <li>
                <router-link :to="{name:'Account'}"  @click="select = false">
                  <font-awesome-icon icon="gear"/>
                  <span>Настройки</span></router-link>
              </li>
              <li class="line-top">
                <a href="javascript:" @click="logout()">
                  <font-awesome-icon icon="arrow-right-to-bracket"/>
                  <span>Выход</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </header>

  <toaster/>
  <loading/>

</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import AuthModule from "@/store/modules/auth";
import UserModule from "@/store/modules/user";
import Toaster from "@/components/ui/layouts/Toaster.vue";
import Loading from "@/components/ui/popups/loading.vue";
import router from "@/router";


const user = computed(() => {
  return UserModule.user
})

const role = computed(() => {
  return UserModule.role
})


const logout = () => {
  AuthModule.logout().then(() => router.push({name: 'SignIn'}))
}

const activeClass = (name: string) => {
  return router.currentRoute.value.path.includes(name) ? 'active' : ''
}


const select = ref(false)

const onClickOut = () => {
  select.value = false
}


/*@Options({
  components: {Loading, Toaster}
})
export default class XHeader extends Vue {

  public user: IUser = {}



  activeClass(name:string){
    return this.$route.path.includes(name)? 'active' : ''
  }




  mounted(){
    this.user = UserModule.user
  }

}*/
</script>
