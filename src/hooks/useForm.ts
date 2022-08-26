import {ref, Ref} from "vue";
import {IKeyValue} from "@/types/any";


const useForm = () => {

    const formData: Ref<IKeyValue> = ref({})

    const submitted: Ref<boolean> = ref(false)

    const schemaTxt = {
        label: {
            if: '$value',
            attrs: {
                style: { display: 'inline-block' },
            },
        },
    }

    const schemaMultiSelect = {
        fieldset: {},
    }

/*
    const submitForm = () => {
        // @ts-ignore
        const node = formData.value.node
        node.submit()
    }
*/

    return {
        formData,
        schemaTxt,
        schemaMultiSelect,
        submitted,
        // submitForm
    }
}

export default useForm
