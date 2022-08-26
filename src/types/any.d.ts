import busEvents from "@/services/api/events";
import {IChannel, IChannelLink} from "@/types/channel";
import barOptions from "@/services/charts/bar.options";

export interface IFormKitObject {
    [key: string]: IFormKit
}

export interface IFormKit {
    id?: number,
    type?: TInputType<string>
    name?: any
    title?: string
    label?: any
    placeholder?: string
    validation?: any
    schema?: any
    description?: string
    help?: any
    options?: any[]
    heading?: string
    value?: any
    sortable?: boolean
    sort?: string
    default?: any
    show?: boolean // участие в построении таблицы
    width?: string
}

// export interface IInputTypes

export type TInputType = 'number' | 'date'

export interface IKeyValue {
    [key: string]: any;
}


export interface IEmitResponse {
    url: string
    payload: any
}


export interface IToaster {
    type?: string
    title?: string
    text?: string
    footer?: string
    timeout?: number
}

declare module '@vue/runtime-core' {
    interface busEvents {
        $config: typeof busEvents;
    }

    // interface helper {
    //     $config: typeof helper
    // }
}

export interface IUser {
    id?: number
    name?: string
    email?: string
    balance?: number
    hold?: number
    email_verified_at?: null
    avatar?: string | null
    api_token?: string | null
    real_email?: string
    is_telegram_connected?: boolean
    telegram?: string | null
    is_admin?: number
    fee?: number
}


export interface IIsComponentListItem {
    icon?: string
    title: string
    component: string
    hash?: string
}

export interface IChartOptions {
    type?: string,
    data?: {
        labels?: []
        datasets?: IChartItem[],
    },
    options?: any
}

export interface IChartItem {
    label?: string
    data?: any[]
    backgroundColor?: string
    borderWidth?: number
}
