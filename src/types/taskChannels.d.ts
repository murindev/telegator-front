import {ICampaign} from "@/types/campaign";
import {IChannel} from "@/types/channel";
import {ITask, ITaskStatus} from "@/types/task";
import {IPaginate} from "@/types/fetch";
import {ITgstatPost} from "@/types/stat";

export type TTaskChannel = ITaskChannel | null
export interface ITaskChannel {
    id: number
    user_id: number
    campaign_id: number
    task_id: number
    channel_id: number
    state: number,
    penalty?: number,
    campaign: ICampaign,
    channel: IChannel,
    task: ITask,
    status?: ITaskStatus
    price?: number
    paid?: number
    price_type?: number
    post_link?: string
    tgstat_post?: ITgstatPost
}

export interface ITaskChannelPaginate extends IPaginate {
    data?: ITaskChannel[]
}
