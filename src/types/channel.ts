import {
    IAvgAdvertView,
    IAvgCiting,
    IAvgDailySubscription,
    IAvgPostView,
    IAvgSex,
    IAvgSubscriber,
    IAvgPostCount, ITgstatCommonInfos, ITgstatStat, ITgstatSubscribers, ITgstatPost
} from "@/types/stat";

export type TChannel = IChannel|null

export interface IChannelsPaginate {
    current_page?: number
    data?: IChannel[]
    first_page_url?: string
    from?: number
    last_page?: number
    last_page_url?: string
    links?: IChannelLink[]
    next_page_url?: string | null
    path?: string
    per_page?: number
    prev_page_url?: string | null
    to?: number
    total?: number
}
export interface IChannelPrice {
    channel_id:number
    id:number
    post_price_type_id:number
    price:number
}
export interface IChannel {
    id: number
    avatar: string
    price: string
    prices?: IChannelPrice[]
    title: string
    contact?:string
    contact_tg?:string
    description?:string
    is_deleted?:number
    is_public?:number
    channel_stats?:string
    owner_id?:number
    parsed_at?:string
    status?:number
    tg_link?:string
    author_post?:boolean

    // relations
    tgstat_common_info?: ITgstatCommonInfos
    tgstat_stat?: ITgstatStat
    tgstat_subscribers_last?: ITgstatSubscribers
    tgstat_posts?: ITgstatPost[]
    avg_posts_views?: IAvgViews
    avg_post_by_hour_this_week?: IAvgViews[]
    avg_post_by_hour_last_week?: IAvgViews[]
    // relations old => to delete
    categories?: IChannelCategory[]
    actual_subscribers_count?: IChannelActualSubscribersCount[]
    avg_advert_views?: IAvgAdvertView
    avg_citing?: IAvgCiting
    avg_daily_subscription?: IAvgDailySubscription
    avg_post_view?: IAvgPostView
    avg_sex?: IAvgSex
    avg_subscribers?: IAvgSubscriber
    avg_post_count?: IAvgPostCount

}

export interface IAvgViews {
    channel_id: number
    views: number
}

export interface IChannelLink {
    active: boolean
    label: string
    url: string
}

export interface IChannelCategory {
    id: number
    label: string
    name: string
    value?: number
}

export interface IChannelActualSubscribersCount {
    some?: number
}
