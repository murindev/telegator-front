import {getModule, Module, Mutation, Action, VuexModule} from "vuex-module-decorators"
import store from '@/store'
import {$axios, emitError, emitSuccessLoad} from '@/services/api/axios'
import UserModule from "@/store/modules/user";

@Module({dynamic: true, store, namespaced: true, name: 'StoreAuth'})
class StoreAuth extends VuexModule {

    public appState: number = 0

    @Mutation setAppState(id: number) {
        this.appState = id;
    }


    @Action({commit: 'setAppState'}) async login(payload: any) {
        try {
            const response = await $axios.post('/api/auth/login', payload)
            if (await response) {
                await localStorage.setItem('token', response.data.token);
                await UserModule.getUser();
                return 2
            }
        } catch (error) {
            return error
        }
    }

    @Action({commit: 'setAppState'})
    async logout() {
        try {
            await UserModule.setUser(null)
            await localStorage.removeItem('token')
            return 1
        } catch (error) {
            return emitError(error)
        }
    }

    @Action({commit: 'setAppState'})
    async registration(payload: any) {
        payload['password_confirmation'] = payload.password_confirm
        try {
            const response = await $axios.post('/api/auth/signup', payload)
            if (await response) {
                await UserModule.getUser();
                await localStorage.setItem('token', response.data.token);
                return 2
            }
        } catch (error) {
            return error
        }
    }

    @Action({commit: ''})
    async forgot(payload: any) {
        payload['password_confirmation'] = payload.password_confirm
        return await $axios.post('/api/auth/forgot-password', payload)
    }

    @Action({commit: ''}) async reset(payload: any) {
        return $axios.post('/api/auth/reset', payload)
    }


    @Action({commit: 'setAppState'}) async telegramAuth(payload: any) {
        try {
            const response = await $axios.post('/api/auth/tg-auth', payload)
            if (await response) {
                await localStorage.setItem('token', response.data.token);
                await UserModule.getUser();
                return 2
            }
        } catch (error) {
            return error
        }
    }
}

const AuthModule = getModule(StoreAuth)
export default AuthModule
