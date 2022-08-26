
import {ITaskChannel} from "@/types/taskChannels";
import {IPaginate} from "@/types/fetch";

type TCampaignStatus = ['new', 'active', 'finished'];
type TCampaign = ICampaign | {};

export interface ICampaign {
    id?: number
    user_id?: number
    range_start_at?: string
    range_end_at?: string
    title?: string
    description?: string
    task_channels?: ITaskChannel[]
    range?: {

    }

    // status?: TCampaignStatus
    // version?: number
    // publication?: number
    // silence?: number
}

type TCampaignForm = {
    title?: string
    date_start?: string
    time_start?: string
    date_end?: string
    time_end?: string
    description?: string
}


interface ICampaignPaginate extends IPaginate {
    data?: ICampaign[]
}

/*campaign_id
message
message_raw
with_video
with_image
link*/

/*
Название

Выполненных заданий
Кол-во выполненых заданий из данной кампании

Бюджет, ₽
Бюджет который выплачивает кампания

Выплачено, ₽
Сколько денег в общем выплачено кампанией

Начало публикации
Первая публикация в этой кампании

Окончание публикации
окончание публикации в кампании

channel_id
*/
