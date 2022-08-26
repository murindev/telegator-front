export default {
    install: (app:any) => {
        app.config.globalProperties.$env = {
            baseUrl: process.env.VUE_APP_API_URL,
            tgLogin: 'JsGuruBot',
        }
    }
}
