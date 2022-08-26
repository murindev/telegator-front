import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {$axios, Get, Post} from '@/services/api/axios'
import {IUser} from "@/types/any";

@Module({dynamic: true, store, namespaced: true, name: 'StoreUser'})
class StoreUser extends VuexModule {

    public user: IUser = {}

    public balance: number = 0
    public hold: number = 0
    public role: string = ''
    public chat_id: number = 0

    @Mutation setUser(payload: any) {
        this.user = payload;
        this.balance = payload?.balance ?? 0
        this.hold = payload?.hold ?? 0

        if (payload?.is_admin === 1) {
            this.role = 'admin'
        } else if (payload?.is_telegram_connected) {
            this.role = 'channel'
        } else {
            this.role = 'advert'
        }

        localStorage.setItem('user', JSON.stringify(this.user))
    }

    @Mutation setChatId(payload: any) {

        if(payload.result && payload.result.length) {
            console.log('payload2', payload.result[0].message.chat.id);
        }
    }

    @Action({commit: 'setUser'})
    async getUser() {
        return Get('/api/user/info')
    }

    @MutationAction({mutate: ['balance', 'hold']})
    async getBalance() {
        return await Post('/api/user/balance', {})
    }

    @Action({commit: 'setChatId'}) async getChatId() {
        // return await Post('/api/user/balance', {})
        const response = await $axios.get('https://api.telegram.org/bot5344600531:AAFyxRbXaYYachsT4c1k5k_lY8RGRvzkGas/getUpdates', {});
        if(await response) {
            console.log('sdasd', response);
            return response.data
        } else {
            return 0
        }
    }


}

const UserModule = getModule(StoreUser)

export default UserModule
