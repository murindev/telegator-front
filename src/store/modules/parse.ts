import {getModule, Module, Mutation, Action, VuexModule} from "vuex-module-decorators"
import store from '@/store'
import {Get, Post} from '@/services/api/axios'

@Module({dynamic: true, store, namespaced: true, name: 'ParseUser'})
class ParseStore extends VuexModule {

    public result = null

    @Mutation setResult(payload: any) {
        this.result = payload;
    }

    @Action({commit: 'setResult'})
    async getResult(name: string, link: string) {
        return Post(`/api/parse/stat`, {
            name: name,
            link: link,
        })
    }

    // @Action({commit:'setResult'}) async getTest(link: string, payload: any) {
    //     return Post(`/api/parse/stat/${link}`,payload)
    // }

}

const ParseModule = getModule(ParseStore)
export default ParseModule
