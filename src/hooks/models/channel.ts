import {computed, ref, Ref} from "vue";
import {IFormKitObject} from "@/types/any";

export function channelModel(fieldsArray:string[] = []) {
    const model: Ref<IFormKitObject> = ref({
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
        author_post: {
            title: 'Создание авторского поста (текст)',
            name: 'author_post',
            type: 'checkbox',
            value: null,
            default: null,
            sort: 'sort',
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
        cpu: {
            title: 'Стоимость ед.охвата',
            name: 'tgstat_stat.p_cpu',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_avg_p_cpu',
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
        prices: {
            title: 'Тип цен',
            name: 'prices',
            type: 'checkbox',
            value: null,
            default: null,
            show: false,
            // options: ['1/24','2/48','Без удаления']
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
        price_from: {
            title: 'Стоимость публикации до',
            name: 'price_from',
            type: 'number',
            value: null,
            default: null,
            show: false,
        },
        price_to: {
            title: 'Стоимость публикации от',
            name: 'price_to',
            type: 'number',
            value: null,
            default: null,
            show: false,
        },
        silence: {
            title: 'Продолжительность тишины',
            name: 'silence',
            type: 'number',
            value: 0,
            default: 0,
            show: false,
        },
        owner_id: {
            title: 'id владельца канала',
            name: 'owner_id',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },
        not_owner_id: {
            title: 'id владельца канала',
            name: 'owner_id',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: false,
        },
    })

    const fieldsSet = computed(() => {
        let obj:IFormKitObject = {}
        fieldsArray.map((k:string) => obj[k] = model.value[k])
        return obj
    })

    return {
        fieldsSet,
        model
    }
}
