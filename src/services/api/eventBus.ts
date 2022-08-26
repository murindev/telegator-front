// @ts-ignore
import emitter from 'tiny-emitter/instance'

export default {
    install: (app:any) => {
        app.config.globalProperties.$bus = {
            on: (...args:any) => emitter.on(...args),
            once: (...args:any) => emitter.once(...args),
            off: (...args:any) => emitter.off(...args),
            emit: (event: string, payload?: any) => emitter.emit(event, payload)
        }
    }
}
