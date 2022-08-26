import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {Get, Post} from '@/services/api/axios'
import {IPaginate, IUseList} from "@/types/fetch";
import {ITask, ITaskPaginate} from "@/types/task";
import {ITaskChannel, ITaskChannelPaginate, TTaskChannel} from "@/types/taskChannels";

@Module({dynamic: true, store, namespaced: true, name: 'StoreTaskChannels'})
class TaskChannelsStore extends VuexModule {


    public taskChannels: ITaskChannel[] = []

    @Mutation setTaskChannels(payload: ITaskChannel[]) {
        this.taskChannels = payload
    }


    public taskChannel: TTaskChannel = null

    @Mutation setTaskChannel(payload: TTaskChannel) {
        this.taskChannel = payload
    }


    public taskChannelsPaginate: ITaskChannelPaginate = {}

    @Mutation setTaskChannelsPaginate(payload: ITaskChannelPaginate) {
        this.taskChannelsPaginate = payload
    }



    public selectedTaskChannels: any[] = []
    @Mutation selectTaskChannels(payload: any[]) {
        this.selectedTaskChannels = payload
    }


// Actions

    @Action({commit: 'setTaskChannels'})
    async fetchTaskChannels(params: any, prompt: boolean = true): Promise<ITaskChannel[]> {
        return Post('/api/task-channels/index', params, prompt)
    }

    @Action({commit: 'setTaskChannelsPaginate'})
    async fetchTaskChannelsPaginate(params: any, prompt: boolean = true): Promise<ITaskChannelPaginate> {
        return Post('/api/task-channels/paginate', params, prompt)
    }


    @Action({commit: 'setTaskChannel'})
    async fetchTaskChannel(params: any, prompt: boolean = true): Promise<TTaskChannel> {
        return Get('/api/task-channels/show', params, prompt)
    }


    @Action({commit: 'setTaskChannel'})
    async updateTaskChannel(params: any, prompt: boolean = true): Promise<TTaskChannel> {
        return Post('/api/task-channels/update', params, prompt)
    }



}

const TaskChannelsModule = getModule(TaskChannelsStore)
export default TaskChannelsModule
