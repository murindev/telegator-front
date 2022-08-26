import {computed, Ref, ref} from "vue";
import {IFormKitObject} from "@/types/any";

export function tgstatPostModel(fieldsArray:string[] = []) {
    const model: Ref<IFormKitObject> = ref({
        channel_id: {
            title: 'id поста',
            name: 'channel_id',
            type: 'number',
            value: null,
            default: null,
            sort: 'sort',
            show: true,
            width: '120px'
        },
        text: {
            title: 'Название/Пост',
            name: 'text',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_text',
            show: true,
        },
        date: {
            title: 'Начало публикации',
            name: 'date',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_date',
            show: true,
        },
        views: {
            title: 'Кол-во просмотров',
            name: 'views',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_views',
            show: true,
        },
        forwards_count: {
            title: 'Количество forward',
            name: 'stat.forwards_count',
            type: 'text',
            value: null,
            default: null,
            sort: 'by_forwards',
            show: true,
        },
        is_advert: {
            title: 'Рекламный пост',
            name: 'is_advert',
            type: 'text',
            value: null,
            default: null,
            show: true,
        },


/*        id
        channel_id
        post_id

        views
        link
        forwarded_from
        is_deleted
        deleted_at

        media_json

        stat => {
            id
            channel_id
            post_id
            forwards_count
            forward_json
            mentions_count
            mentions_json
        }


        */
    })

    const fieldsSet = computed(() => {
        let obj:IFormKitObject = {}
        fieldsArray.map((k:string) => obj[k] = model.value[k])
        return obj
    })

/*    const fieldsSetGet = (fieldsArray: string[]) => {
        let obj:IFormKitObject = {}
        return fieldsArray.map((k:string) => obj[k] = model.value[k])
    }*/

/*    const fieldsSet: Ref<IFormKitObject> = ref({})

    const fieldsSet = (fieldsArray: string[]) => {
        let obj:IFormKitObject = {}
        return fieldsArray.map((k:string) => obj[k] = model.value[k])
    }*/

    return {
        fieldsSet,
        // fieldsSetGet
    }
}
