import {computed, ref, Ref} from "vue";
import {IFormKitObject} from "@/types/any";
import UserModule from "@/store/modules/user";

export function taskChannelModel(fieldsArray:string[] = []) {

    const model: Ref<IFormKitObject> = ref({
        title: {
            title: 'Название задания',
            name: 'task.title',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_task_title',
            show: true,
        },

        range_start_at: {
            title: 'Начало публикации',
            name: 'task.range_start_at',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_task_range_start_at',
            show: true,
        },
        range_end_at: {
            title: 'Окончание публикации',
            name: 'range_end_at',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_task_range_end_at',
            show: true,
        },
        post_nr: {
            title: 'Пост в ленте',
            name: 'post_nr',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_post_nr',
            show: true,
        },
        penalty: {
            title: 'Штраф, ₽',
            name: 'penalty',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_penalty',
            show: true,
        },
        state: {
            title: 'Статус',
            name: 'state',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_state',
            show: true,
        },
        campaign_id: {
            title: '# кампании',
            name: 'campaign_id',
            type: 'number',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },

        campaign_title: {
            title: 'Кампания',
            name: 'campaign_title',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },

        task_id: {
            title: '# задачи',
            name: 'task_id',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },

        silence: {
            title: 'Тишина',
            name: 'silence',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_task_silence',
            show: true,
        },

        channel: {
            title: '',
            name: 'channel',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },
        channel_id: {
            title: 'id канала',
            name: 'channel_id',
            type: 'number',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },
        channel_title: {
            title: 'Кому выдано',
            name: 'channel.title',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_channel_title',
            show: true,
        },
        channel_participants_count: {
            title: 'Подписчики',
            name: 'channel.tgstat_stat.participants_count',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_channel_title',
            show: true,
        },
        channel_err_percent: {
            title: 'Средний охват',
            name: 'channel.tgstat_stat.err_percent',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_channel_title',
            show: true,
        },
        channel_PRICE: {
            title: 'Стоимость',
            name: 'channel.price',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_channel_title',
            show: true,
        },
        // filter

        own: {
            title: 'Выбор заданий принадлежащих только конкретному пользователю',
            name: 'own',
            type: 'text',
            value: UserModule.role === 'admin' ? null : UserModule.user.id,
            default: null,
            sort: 'by_channel_title',
            show: false,
        },
        user_id: {
            title: 'id создавшего задачу',
            name: 'user_id',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },
        task_price: {
            title: 'Бюджет, ₽',
            name: 'task_price',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },
        paid: {
            title: 'Выплачено, ₽',
            name: 'paid',
            type: 'text',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
        },


    })

    const fieldsSet = computed(() => {
        let obj:IFormKitObject = {}
        fieldsArray.map((k:string) => obj[k] = model.value[k])
        return obj
    })

    return {
        fieldsSet,
        // fieldsSetGet
    }
}
