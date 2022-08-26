import {computed, ref, Ref} from "vue";
import {IFormKitObject} from "@/types/any";
import UserModule from "@/store/modules/user";

export function campaignModel(fieldsArray:string[] = []) {

    const model: Ref<IFormKitObject> = ref({
        id: {
            type: 'number',
            title: 'ID',
            name: 'id',
            sort: 'byId',
            value: null,
            default: null,
            width: '60px'
        },
        title: {
            title: 'Название',
            name: 'title',
            type: 'text',
            sort: 'byTitle',
            value: '',
            default: '',
            show: true,
        },
        channels_cnt: {
            type: 'number',
            title: 'Количество каналов',
            name: 'title',
            show: true,
            value: null,
            default: null,
        },
        fulfilled_tasks: {
            type: 'number',
            title: 'Выполненных заданий',
            name: 'title',
            show: true,
            value: null,
            default: null,
        },
        budget: {
            type: 'number',
            title: ' Бюджет, ₽',
            name: 'title',
            show: true,
            value: null,
            default: null,
        },
        paid: {
            type: 'number',
            title: 'Выплачено, ₽',
            name: 'title',
            show: true,
            value: null,
            default: null,
        },
        range_start_at: {
            type: 'date',
            title: 'Начало публикации',
            name: 'range_start_at',
            sort: 'byRangeStartAt',
            value: '',
            default: '',
            show: true,
            width: '20%'
        },
        range_end_at: {
            type: 'date',
            title: 'Окончание публикации',
            name: 'range_end_at',
            sort: 'byRangeEndAt',
            value: null,
            default: null,
            show: true,
            width: '20%'
        },
        user_id: {
            type:'hidden',
            name: 'user_id',
            value: UserModule.user.id,
            default: UserModule.user.id,
            show: true
        },
        status: {
            type: 'select',
            title: 'Статус',
            name: 'status',
            sort: 'byStatus',
            value: 'new',
            default: 'new',
            show: true,
            options: [
                {value: 'active', label: 'Активные'},
                {value: 'new', label: 'Новые'},
                {value: 'finished', label: 'Неактивные'},
            ]
        }
    })

    const fieldsSet = computed(() => {
        let obj:IFormKitObject = {}
        fieldsArray.map((k:string) => obj[k] = model.value[k])
        return obj
    })

    return {
        fieldsSet,
    }
}
