
export type TPost = IPost | null;

export interface IPost {
    id:number
    channel_id:number
    title?:string
    content?:string
    views_cnt?:number
    forwards_cnt?:number
    is_advert?:number
    engagement_rate?:number
    comments_cnt?:number
    reactions_cnt?:number
    duration?:number
    purity_duration?:number
    created_at?:string
    updated_at?:string
    media?: IPostMedia[]
    post_views_last?: IPostView[]
}
export interface IPostView {
    id:number
    channel_id:number
    post_id:number
    post_nr?:number
    hour:number
    percentage?:number
    views_cnt?:number
    tg_stat_created_at?:string
    created_at?:string
    updated_at?:string
}
export interface IPostMedia {
    id:number
    channel_id:number
    post_id:number
    media?:string
}
