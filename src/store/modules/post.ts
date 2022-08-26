import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {$axios, emitError, emitSuccessLoad, Get, Post} from '@/services/api/axios'
import {IChannel, IChannelCategory, IChannelsPaginate} from "@/types/channel";
import {IPost} from "@/types/post";

@Module({dynamic: true, store, namespaced: true, name: 'StorePost'})
class StorePost extends VuexModule {

    public post!: IPost
    public posts!: IPost[]
    public postWithViews!: IPost

    // posts
    @Mutation setPosts(payload: any) {
        this.posts = payload;
    }

    get getPosts(){
        return this.posts
    }

    @Action({commit: 'setPosts'}) async fetchPosts(params: any){
        return Get(`/api/channel/post/index`, params)
    }

    // post
    @Mutation setPost(payload: any) {
        this.post = payload;
    }

    get getPost(){
        return this.post
    }

    @Action({commit: 'setPost'}) async fetchPost(params: any){
        return Get(`/api/channel/post/show/`,params)
    }

    // postWithViews

    @Mutation setPostsWithViews(payload: any) {
        this.postWithViews = payload;
    }

    get getPostWithViews(){
        return this.postWithViews
    }

    @Action({commit: 'setPost'}) async fetchPostWithViews(params: any){
        return Get(`/api/channel/post/with-views/`,params)
    }

}

const PostModule: StorePost = getModule(StorePost)
export default PostModule
