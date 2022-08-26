import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {ITgstatPostsPaginate, TTgstatPost} from "@/types/stat";
import {IUseList} from "@/types/fetch";
import {Get} from "@/services/api/axios";

@Module({dynamic: true, store, namespaced: true, name: 'StoreTgstat'})
class TgstatStore extends VuexModule {

    public posts: ITgstatPostsPaginate = {}

    @Mutation setPosts(payload: ITgstatPostsPaginate) { this.posts = payload }

    @Action({commit:'setPosts'}) async fetchPosts(payload:IUseList): Promise<ITgstatPostsPaginate> {
       return await Get('/api/tgstat/posts',payload)
    }

    // post
    public post: TTgstatPost = null

    @Mutation setPost(payload: TTgstatPost) {this.post = payload }

    @Action({commit:'setPost'}) async fetchPost(payload:number) {
        return await Get('/api/tgstat/post/'+payload,)
    }

}

const TgstatModule = getModule(TgstatStore)
export default TgstatModule
