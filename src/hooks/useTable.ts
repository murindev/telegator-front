import {computed, onMounted, Ref, ref, WritableComputedRef, onUpdated, watch, ComputedRef} from "vue";
import {IPaginate} from "@/types/fetch";
import {indexOf, isEqual} from "lodash";


export function useTable(vuexModule: any, fields: any, space: number = 0, objectLink: any = null, immediate: boolean = true) {

    const fetchResult: Ref<IPaginate> = ref(objectLink ?? {})

    const page: Ref<number> = ref(1)
    const thCheckbox: Ref<boolean> = ref(false)
    const checkboxes: Ref<number[] | undefined> = ref([])

    /*кол-во строк из остатка высоты экрана*/

    const orderBy: Ref<string> = ref('byId')
    const direction: Ref<string> = ref('asc')

    const selected: Ref<any[] | undefined> = ref([])

    const checkedList: Ref<any[]> = ref([])

    const queryObjectDefault: Ref<object> = ref({})
    const queryObject: Ref<object> = ref({})

    const queryState: ComputedRef<boolean> = computed(() => !isEqual(queryObjectDefault.value, queryObject.value))

    /*Приведение к начальному состоянию*/
    const clearQuery = () => Object.keys(fields.value).map(key => fields.value[key].value = fields.value[key].default)

    /*Объект поиска*/
    const listQueryObject = (keyName: string = 'value') => Object.keys(fields.value).reduce((acc: object, key: any) => {
        if (!['', null,0].includes(fields.value[key][keyName]))
            Object.assign(acc, {[key]: fields.value[key].value})
        queryObject.value = acc
        return acc
    }, {})

    /*собственно запрос*/
    const fetcher = async (prompt: boolean = true) => {
        let obj = Object.assign({
            page: page.value,
            rows: Math.floor((window.innerHeight - (56 + space)) / 45),
            orderBy: orderBy.value,
            direction: direction.value
        }, {...listQueryObject()})

        await vuexModule(obj, prompt).then((response: IPaginate) => fetchResult.value = response)
    }

    /*Сортировка*/
    const sort = async (order: string) => {
        orderBy.value === order
            ? direction.value = direction.value === 'asc' ? 'desc' : 'asc'
            : direction.value = 'asc'
        orderBy.value = order
        await fetcher()
    }

    /*Переход на страницу*/
    const paginate = async (newPage: number) => {
        page.value = newPage
        await fetcher()
    }

    /*выборка строк по одному*/
    watch(checkboxes, (newValue, oldValue) => {
        selected.value = fetchResult.value.data?.reduce((acc: any[], item) => {
            if (checkboxes.value?.includes(item.id)) {
                acc.push(item)
            }
            return acc
        }, [])
    })

    /*выборка всех строк*/
    watch(thCheckbox, (newValue, oldValue) => {
        checkboxes.value = newValue ? fetchResult.value.data?.map(i => i.id) : []
    })

    /*Фильтрация*/
    watch(fields, async (newValue, oldValue) => {
        await fetcher()
    }, {deep: true})

    const checkedListAdd = (i:number) => {
        let item = selected.value?.find((f: any) => f.id === i)
        if (item !== -1) checkedList.value.push(item)
    }

    const checkedListRemove = (i:number) => {
        let index = checkedList.value.findIndex((f: any) => f.id === i)
        if (index !== -1) checkedList.value.splice(index, 1)
    }

    const checkboxSplice = (i:number) => {
        checkboxes.value?.splice(checkboxes.value.indexOf(i),1)
        checkedListRemove(i)
    }
    const checkboxAdd = (i:number) => {
        checkboxes.value?.push(i)
        checkedListAdd(i)
    }

    watch(checkboxes, (n: number[] | undefined, o: number[] | undefined) => {

        let added = n?.filter(x => !o?.includes(x))
        let removed = o?.filter(x => !n?.includes(x))

        if (added?.length) added.map(i => checkedListAdd(i))
        if (removed?.length) removed.map(i => checkedListRemove(i))

    },{deep: true})


    onMounted(async () => {
        /*фильтры по дефолту*/
        queryObjectDefault.value = listQueryObject('default')
        /* Жадная загрузка - по умолчанию, включена*/
        if (immediate) {
            await fetcher()
            await fetchResult
        }
    })

    return {
        thCheckbox,     // Модель выбора всех строк
        checkboxes,     // Модель выбора строк
        // rowsCnt,        // Количество строк на странице
        orderBy,        // Поле сортировки
        direction,      // Направление сортировки
        // queryParams,
        fields,         // Объект обработанных полей полученный из компонента
        fetchResult,    // Массив объектов из базы - собственно результат
        selected,       // Массив выбранных строк
        queryState,     // Состояние выборки - отфильтровано ?? не отфильтровано
        checkedList,    // Массив выборки невзирая на пэджинацию
        checkboxSplice,
        checkboxAdd,
        paginate,
        sort,
        fetcher,
        clearQuery,

    }

}


