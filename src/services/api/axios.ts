import axios, {AxiosRequestConfig} from "axios";
import router from "@/router";
import {IEmitResponse} from "@/types/any";
import {Vue} from "vue-class-component";


// @ts-ignore
import emitter from 'tiny-emitter/instance'


const loaderStart = () => {
    emitter.emit('start-loading')
}

const loaderStop = () => {
    emitter.emit('stop-loading')
}

export const $axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});


$axios.interceptors.response.use((config) => config, (error) => {
    if (error.response.status === 401 && error.config) {
        router.push('/sign-in').then(r => '');
    }

    throw error;
});

// export $axios;

export const emitSuccessSave = (response: any, prompt: any) => {
    if (prompt) {
        // toaster
    }
    return response.data
}

export const emitSuccessLoad = (response: any, prompt: any) => {
    if (prompt) {
        // toaster
    }
    return response.data
}

export const emitError = (error: any) => {

    emitter.emit('toast', {
        type: 'error',
        title: 'Возникла ошибка',
        text: error.response.data.errors ? Object.keys(error.response.data.errors).reduce((acc: string, key: string) => {
            acc += error.response.data.errors[key].join('<br/>')
            acc += '<br/>'
            return acc
        }, '') : error.response.data.message, //
        timeout: 5000
    })

    return false
}

export const emitResponseSave = async (data: IEmitResponse, prompt: boolean = true) => {
    try {
        const response = await $axios.post(data.url, data.payload);
        if (await response) {
            return emitSuccessSave(await response, prompt)
        }
    } catch (error) {
        return emitError(error)
    }

}

export const emitResponseLoad = async (data: IEmitResponse, prompt: boolean = true) => {
    try {
        if (prompt) {
            // toaster
        }
        const response = await $axios.post(data.url, data.payload);
        if (await response) {
            return emitSuccessLoad(await response, prompt)
        }
    } catch (error) {
        return emitError(error)
    }

}


export const Get = async (url: string, params: any = {}, prompt: boolean = true) => {
    try {

        if (prompt) {
            loaderStart()
        }
        const response = await $axios.get(url, {params});
        if (await response) {
            return emitSuccessLoad(await response, prompt)
        }
    } catch (error) {
        if (prompt) {
            loaderStop()
        }
        return emitError(error)
    } finally {
        if (prompt) {
            loaderStop()
        }
    }

}

export const Post = async (url: string, data: any, prompt: boolean = true) => {
    try {

        if (prompt) {
            loaderStart()
        }
        const response = await $axios.post(url, data);
        if (await response) {
            return emitSuccessLoad(await response, prompt)
        }
    } catch (error) {
        loaderStop()
        return emitError(error)
    } finally {
        loaderStop()
    }

}
