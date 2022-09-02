import {IPaginate} from "@/types/fetch";

export interface IAvgSubscriber {
    channel_id: number
    total: number
    day: string
    week: string
    month: string
}

export interface IAvgDailySubscription {
    channel_id: number
    total: string
    plus: string
    minus: string
}

export interface IAvgCiting {
    channel_id: number
    total: string
    channel_mentions: string
    mentions: string
    reposts: string
}

export interface IAvgPostView {
    total: number
    err: string
    err_daily: string
}

export interface IAvgAdvertView {
    channel_id: number
    total: number
    half_day: string
    day: string
    two_day: string
}

export interface IAvgPostCount {
    channel_id: number
    total: number
    day: number
    week: number
    month: number
}

export interface IAvgSex {
    channel_id: number
    male: string
    female: string
}

// TGStatAPI

export interface ITgstatAvgPostsReaches {
    id: number
    channel_id: number
    avg_posts_reach_json: {
        period: string
        avg_posts_reach: number
    }[]
    avg_posts_reach: number
}

export interface ITgstatSubscribers {
    id: number
    channel_id: number
    subscribers_json: {
        period: string
        participants_count: string
    }[]
    new_subscribers: number
}

export interface ITgstatCommonInfos {
    id: number
    channel_id: number
    tg_id: number
    link: string
    username: string
    title: string
    about: string
    category: string
    country: string
    language: string
    image100: string
    image640: string
    participants_count: number
    tgstat_restrictions: {
        red_label: boolean
        black_label: boolean
    }
}


export interface ITgstatForwards {
    id: number
    channel_id: number
    forwardId: number
    postId: number
    postLink: string
    postDate: number
    channelId: number
    channels?: ITgstatCommonInfos[]
}


export interface ITgstatMentions {
    id: number
    channel_id: number
    mentionId: number
    mentionType: string
    postId: number
    postLink: string
    postDate: number
    channelId: number
    channels?: ITgstatCommonInfos[]
}

export type TTgstatPost = ITgstatPost | null

export interface ITgstatPost {
    id: number
    channel_id: number
    post_id: number
    date: number
    views: number
    link: string
    forwarded_from: number
    is_deleted: string
    deleted_at: string
    text: string
    media_json: {
        size: number
        duration: number
        file_url: string
        file_name: string
        file_size: number
        mime_type: string
        media_type: string
        file_thumbnail_url: string
        embed_url?: string
    }
    stat?: ITgstatPostStat
    channel?: ITgstatCommonInfos
    channel_stat?: ITgstatStat
    views_by_hours?:ITgstatPostsViewsByHours[]
    tgstat_post_stat?: ITgstatPostStat
}

export interface ITgstatPostStat {
    id: number
    channel_id: number
    post_id: number
    forwards_count: number
    forward_json: {
        postId: number
        postDate: number
        postLink: string
        channelId: number
    }[]
    mentions_count: number
    mentions_json: {
        postId: number
        postDate: number
        postLink: string
        channelId: number
    }[]
}

export interface ITgstatPostsViewsByHours {
    id: number
    channel_id: number
    post_id: number
    hour: number
    views: number
}

export interface ITgstatStat {
    id: number
    channel_id: number
    title: string
    username: string
    participants_count: number
    avg_post_reach: number
    err_percent: number
    daily_reach: number
    ci_index: number
    p_total_publications?: number
    p_yesterday_publications?: number
    p_registered_date?: string
    p_live_days?: number
    p_avg_pubs_per_day?: number
    p_avg_forward_per_day?: number
    p_cpu?: number
    p_male_demography?: number
    p_female_demography?: number
}


export interface ITgstatViews {
    id: number
    channel_id: number
    views_json: {
        period: string
        views_count: number
    }[]
    avg_views: number
}


export interface ITgstatSubscribers {
    id: number
    channel_id: number
    new_subscribers: number
}


export interface ITgstatPostsPaginate extends IPaginate {
    data?: ITgstatPost[]
}
