import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {Get, Post} from '@/services/api/axios'
import {IPaginate, IUseList} from "@/types/fetch";
import {ITask, ITaskPaginate, TTask} from "@/types/task";

@Module({dynamic: true, store, namespaced: true, name: 'StoreTask'})
class TaskStore extends VuexModule {


    public task: TTask = null

    @Mutation setTask(payload: TTask) {
        this.task = payload
    }

    public tasks: IPaginate = {}
    @Mutation setTasks(payload: IPaginate) {
        this.tasks = payload
    }

    public selectedTasks: ITask[] = []

    @Mutation setSelectedTasks(payload: ITask[]) {
        this.selectedTasks = []
        this.selectedTasks = payload
    }

    public taskCheckboxes:number[] = []
    @Mutation setTaskCheckboxes(payload: number[]) {
        // this.selectedTasks = []
        this.taskCheckboxes = payload
    }



// Actions

    @Action({commit: ''})
    async saveTask(payload: any) {
        return Post('/api/task/create', payload)
    }

    @Action({commit: 'setTasks'})
    async fetchTasks(params: IUseList, prompt: boolean = true): Promise<ITaskPaginate> {
        return Get('/api/task/get', params, prompt)
    }

    @Action({commit: 'setTasks'})
    async fetchTasksIndex(params: IUseList, prompt: boolean = true): Promise<ITaskPaginate> {
        return Post('/api/task/index', params, prompt)
    }


    @Action({commit: 'setTask'})
    async fetchTask(params: any, prompt: boolean = true): Promise<TTask> {
        return Get('/api/task/show', params, prompt)
    }

    @Action({commit: 'setTask'})
    async destroyTask(params: any, prompt: boolean = true): Promise<ITask> {
        return Get('/api/task/destroy', params, prompt)
    }


    @Action({commit: 'setTask'})
    async updateTask(params: any, prompt: boolean = true): Promise<ITask> {
        return Post('/api/task/update', params, prompt)
    }

    @Action({commit: 'setTasks'})
    async userTasks(params: any, prompt: boolean = true): Promise<ITask> {
        return Get('/api/task/userTasks', params, prompt)
    }

    @Action({commit: 'setTasks'})
    async allTasks(params: any, prompt: boolean = true): Promise<ITask> {
        return Get('/api/task/allTasks', params, prompt)
    }



}

const TaskModule = getModule(TaskStore)
export default TaskModule
