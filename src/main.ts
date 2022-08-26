import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import {plugin, defaultConfig} from '@formkit/vue'
import {ru} from '@formkit/i18n'
import {library} from "@fortawesome/fontawesome-svg-core"
import {
    faPhone,
    faGear,
    faAngleUp,
    faArrowRightToBracket,
    faDollar,
    faDollarSign,
    faPlus,
    faQrcode,
    faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import hlp from "@/services/any/helper";
import events from '@/services/api/events'
import bus from '@/services/api/eventBus'
import env from "@/services/api/env";
import UserModule from "@/store/modules/user";
import schema from "@/services/any/schema";
// @ts-ignore
import vClickOutside from "click-outside-vue3"
library.add(faPhone, faGear, faAngleUp, faArrowRightToBracket, faDollar, faPlus, faQrcode, faDollarSign, faFileAlt);


const app = createApp(App)
    .use(store)
    .use(router)
    .use(PerfectScrollbar)
    .use(hlp)
    .use(events)
    .use(bus)
    .use(env)
    .use(priceFormat)
    .use(schema)
    .use(vClickOutside)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(plugin, defaultConfig({locales: {ru}, locale: 'ru'}))



// main wrapper components
import logo from "@/components/ui/layouts/logo.vue";
import XMain from "@/components/ui/layouts/x-main.vue";
import XSection from "@/components/ui/layouts/x-section.vue"
import XRow from "@/components/ui/layouts/x-row.vue"
import XHeader from "@/components/ui/layouts/x-header.vue"
import priceFormat from "@/services/any/priceFormat";
import XTh from "@/components/ui/table/x-th.vue";


const user = localStorage.getItem('user')
if (user) {
    UserModule.setUser(JSON.parse(user))
}

app
    .component('x-main', XMain)
    .component('x-section', XSection)
    .component('x-row', XRow)
    .component('x-header', XHeader)
    .component('logo', logo)
    .component('x-th', XTh)

app.mount('#app')
