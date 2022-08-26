import {computed, onBeforeMount, onMounted, Ref, ref} from "vue";
import {IFormKitObject} from "@/types/any";


export default (fieldsArray:string[] = []) => {

    const model: Ref<IFormKitObject> = ref({
        id: {
            type: 'number',
            title: 'ID',
            name: 'id',
            sort: 'byId',
            value: null,
            default: null,
            show: true,
            width: '60px'
        },
        post_nr: {
            type: 'number',
            title: 'post_nr',
            name: 'post_nr',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        user_id: {
            type: 'number',
            title: 'user_id',
            name: 'user_id',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        campaign_id: {
            type: 'number',
            title: 'campaign_id',
            name: 'campaign_id',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        title: {
            type: 'text',
            title: 'Название задания',
            name: 'title',
            sort: 'byId',
            value: null,
            default: null,
            show: true,
        },
        channels_cnt: {
            type: 'number',
            title: 'Количество каналов',
            name: 'channels_cnt',
            show: true,
            value: null,
            default: null,
        },
        fulfilled_tasks: {
            type: 'number',
            title: 'Выполненных заданий',
            name: 'fulfilled_tasks',
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
        text: {
            type: 'text',
            title: 'text',
            name: 'text',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        status: {
            type: 'number',
            title: 'status',
            name: 'status',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        execution_status: {
            type: 'number',
            title: 'execution_status',
            name: 'execution_status',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        version: {
            type: 'number',
            title: 'version',
            name: 'version',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        range_start_at: {
            type: 'text',
            title: 'Начало публикации',
            name: 'range_start_at',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        range_end_at: {
            type: 'text',
            title: 'Окончание публикации',
            name: 'range_end_at',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        duration: {
            type: 'number',
            title: 'duration',
            name: 'duration',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        silence: {
            type: 'number',
            title: 'silence',
            name: 'silence',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        cost: {
            type: 'number',
            title: 'cost',
            name: 'cost',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        fine: {
            type: 'number',
            title: 'fine',
            name: 'fine',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
        author_post: {
            type: 'number',
            title: 'author_post',
            name: 'author_post',
            sort: 'byId',
            value: null,
            default: null,
            show: true,

        },
    })

    let test = computed(() => localStorage.getItem('test-data') == '1')


    const taskValues = {
        title: test.value ? 'Заголовок поста' : '',
        date_start: test.value ? '2022-07-23' : '',
        time_start: test.value ? '12:00' : '',
        duration: test.value ? '30' : '',
        date_end: test.value ? '2022-08-10' : '',
        time_end: test.value ? '12:00' : '',
        silence: test.value ? '10' : '',
        text: test.value ? 'Производство в принципе масштабирует убывающий инвестиционный продукт. ' : '',

    }

    const pricesValues = {
        channelAdvertPosts: test.value,
        channelAdvertPostOnce: test.value ? 5000 : '',
        channelAdvertPostTwice: test.value ? 10000 : '',
        channelAdvertPostForever: test.value ? 15000 : '',
        brandAdvertPosts: test.value,
        brandAdvertPostOnce: test.value ? 5500 : '',
        brandAdvertPostTwice: test.value ? 10500 : '',
        brandAdvertPostForever: test.value ? 15500 : '',
        creatingAuthorsPost: test.value,
    }


    // dates
    const now =  new  Date()
    const before =  new  Date()

    const nowNeedle = now.setSeconds(now.getSeconds() + 36000)
    const nowBefore = before.setHours(before.getHours() + 24*30)

    const dateStart = now.toISOString().substr(0,10)
    const timeStart = now.toISOString().substr(11,5)

    const dateEnd = before.toISOString().substr(0,10)
    const timeEnd = before.toISOString().substr(11,5)

    const dateBetween = ['required',['date_between', dateStart, '2300-01-01']].join('|')


    const fieldsSet = computed(() => {
        let obj:IFormKitObject = {}
        fieldsArray.map((k:string) => obj[k] = model.value[k])
        return obj
    })



    return {
        test,
        taskValues,
        pricesValues,
        ////
        dateBetween,

        fieldsSet
    }

}
