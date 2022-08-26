import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {$axios, emitError, emitSuccessLoad, Get, Post} from '@/services/api/axios'
import {IChannel, IChannelCategory, IChannelsPaginate} from "@/types/channel";
import {ITask} from "@/types/task";

@Module({dynamic: true, store, namespaced: true, name: 'StoreChannel'})
class ChannelStore extends VuexModule {

    // channels
    public channels: IChannelsPaginate = {}
    @Mutation setChannels(payload: any) {
        this.channels = payload;
    }

    public channel!: IChannel
    @Mutation setChannel(payload: any) {
        this.channel = payload;
    }
    get getChannel(){
        return this.channel
    }


    public selectedChannels: IChannel[] = []

    @Mutation setSelectedChannels(payload: IChannel[]) {
        this.selectedChannels = []
        this.selectedChannels = payload
    }

    // categories

    public categories: IChannelCategory[] = []

    get formKitCategories(){
        return this.categories.map((i) => ({label: i.label, value: i.id}))
    }

    @Mutation setCategories(payload: any) {
        this.categories = payload;
    }

// Actions


    @MutationAction({mutate: ['channels', 'categories']}) //
    async fetchChannels(params: any) {
        return Get(`/api/channels`, params)
    }

    @Action({commit: 'setChannels'}) async fetchChannelsIndex(props:any){
        return Get(`/api/channel/index`, props)
    }
    @Action({commit: 'setChannels'}) async fetchChannelsOwner(props:any){
        return Get(`/api/channel/byOwner`, props)
    }

    @Action({commit: 'setChannel'}) async fetchChannel(channelId: number){
        return Get(`/api/channel/${channelId}`)
    }

    @Action({commit: ''})
    async addChannel(params: any) {
        return Post(`/api/channels`, params)
    }


    @Action({commit: 'setCategories'}) async fetchCategories(){
        return Get(`/api/channel/categories`)
    }

}

const ChannelModule = getModule(ChannelStore)
export default ChannelModule
