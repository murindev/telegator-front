export default {
    install:(app: any) => {
        app.config.globalProperties.$events = {
            loading : {
                start: 'start-loading',
                stop: 'stop-loading',
            }
        }
    }
}
