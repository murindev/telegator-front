import {Ref, ref} from "vue";
import {IFormKitObject} from "@/types/any";

export function useChannels(fieldsArray:string[] = []) {
    const obChannelsList: Ref<IFormKitObject> = ref({
        title: {
            title: 'Канал',
            name: 'title',
            type: 'text',
            value: '',
            default: '',
            sort: 'byTitle',
            show: true,
        },
        categories: {
            title: 'Тематики',
            name: 'categories',
            type: 'text',
            value: null,
            default: null,
            sort: 'byCategories',
            show: true,
        },
        avg_subscribersTotal: {
            title: 'Подписчики',
            name: 'avg_subscribers.total',
            type: 'text',
            value: null,
            default: null,
            sort: 'bySubscribers',
            width: '100px',
            show: true,
        },
        avg_post_viewTotal: {
            title: 'Средний охват',
            name: 'avg_post_view.total',
            type: 'text',
            value: null,
            default: null,
            sort: 'byPostViewTotal',
            show: true,
        },
        UN_1: {
            title: 'Стоимость ед.охвата',
            name: '',
            type: 'text',
            value: null,
            default: null,
            sort: 'byTitle',
            show: true,
        },
/*        UN_PRICE: {
            title: 'Стоимость',
            name: 'price',
            type: 'text',
            value: null,
            default: null,
            sort: 'byPrice',
            show: true,
        },*/
        avg_post_viewErr: {
            title: 'ER, %',
            name: 'avg_post_view.err',
            type: 'text',
            value: null,
            default: null,
            sort: 'byPostViewEr',
            show: true,
        },
        subscribers_from: {
            title: 'Количество подписчиков от',
            name: 'subscribers_from',
            type: 'number',
            value: null,
            default: null,
            sort: 'byPrice',
            show: false,
        },
        subscribers_to: {
            title: 'Количество подписчиков до',
            name: 'subscribers_to',
            type: 'number',
            value: null,
            default: null,
            sort: 'byPrice',
            show: false,
        },
        avg_post_view_from: {
            title: 'Охват от',
            name: 'avg_post_view_from',
            type: 'number',
            value: null,
            default: null,
            show: false,
        },
        avg_post_view_to: {
            title: 'Охват до',
            name: 'avg_post_view_to',
            type: 'number',
            value: null,
            default: null,
            show: false,
        },
        prices: {
            title: 'Тип цен',
            name: 'prices',
            type: 'radio',
            value: '',
            default: null,
            show: false,
            // options: ['1/24','2/48','Без удаления']
        },
    })

    const channelsList: Ref<IFormKitObject> = ref({
        title: {
            title: 'Канал',
            name: 'title',
            type: 'text',
            value: '',
            default: '',
            sort: 'byTitle',
            show: true,
        },
        categories: {
            title: 'Тематики',
            name: 'categories',
            type: 'text',
            value: null,
            default: null,
            sort: 'byCategories',
            show: true,
        },
        //tgstat_stat
        /*title*/
        username: {
            title: 'Контактное лицо',
            name: 'tgstat_stat.username',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_tgstat_username',
        },
        participants_count: {
            title: 'Подписчики',
            name: 'tgstat_stat.participants_count',
            type: 'number',
            value: 0,
            default: 0,
            sort: 'by_tgstat_participants_count',
            show: true,
        },
        avg_post_reach: {
            title: 'Средний охват',
            name: 'tgstat_stat.avg_post_reach',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_avg_post_reach',
            show: true,
        },
        err_percent: {
            title: 'ER, %',
            name: 'tgstat_stat.err_percent',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_err_percent',
            show: true,
        },
/*      daily_reach
        ci_index
        p_total_publications
        p_yesterday_publications
        p_registered_date
        p_live_days
        p_avg_pubs_per_day
        p_avg_forward_per_day
        p_cpu
        p_male_demography
        p_female_demography*/
        cpu: {
            title: 'Стоимость ед.охвата',
            name: 'tgstat_stat.p_cpu',
            type: 'text',
            value: null,
            default: null,
            sort: 'byTitle',
            show: true,
        },
        UN_PRICE: {
            title: 'Стоимость',
            name: 'price',
            type: 'text',
            value: null,
            default: null,
            sort: 'byPrice',
            show: false,
        },

        /*        subscribers_from: {
                    title: 'Количество подписчиков от',
                    name: 'subscribers_from',
                    type: 'number',
                    value: null,
                    default: null,
                    sort: 'byPrice',
                    show: false,
                },
                subscribers_to: {
                    title: 'Количество подписчиков до',
                    name: 'subscribers_to',
                    type: 'number',
                    value: null,
                    default: null,
                    sort: 'byPrice',
                    show: false,
                },
                avg_post_view_from: {
                    title: 'Охват от',
                    name: 'avg_post_view_from',
                    type: 'number',
                    value: null,
                    default: null,
                    show: false,
                },
                avg_post_view_to: {
                    title: 'Охват до',
                    name: 'avg_post_view_to',
                    type: 'number',
                    value: null,
                    default: null,
                    show: false,
                }*/

        // tgstat_subscribers_last
        new_subscribers: {
            title: 'Новых подписчиков',
            name: 'tgstat_subscribers_last.new_subscribers',
            type: 'number',
            value: null,
            default: null,
            sort: 'byTitle',
            show: true,
        },



    })




    const fieldsSet = (fieldsArray: string[]) => {
        let obj:IFormKitObject = {}
        return fieldsArray.map((k:string) => obj[k] = channelsList.value[k])
    }

    return {
        obChannelsList,
        channelsList,
        fieldsSet
    }
}
