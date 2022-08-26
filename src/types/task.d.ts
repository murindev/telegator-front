import {IPaginate} from "@/types/fetch";
import {ITaskChannel} from "@/types/taskChannels";
export type TTask = ITask | null
export interface ITask {
    id:number
    post_nr: number
    user_id:number
    campaign_id:number
    title:string
    text:string
    status:number
    execution_status:number
    version:number
    range_start_at:string
    range_end_at:string
    duration:number
    silence:number
    cost:number
    fine:number
    author_post:boolean
    media: ITaskMedia[],
    channels: ITaskChannel[]
}

export interface ITaskStatus {
    id: number
    name: string
    title: string
    description: string
}

export interface ITaskPaginate extends IPaginate{
    data?: ITask[]
}


export interface ITaskMedia {
    id:number
    src: string
    task_id: number
    type:string
}
