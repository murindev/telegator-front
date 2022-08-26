import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'

@Module({dynamic: true, store, namespaced: true, name: 'StoreUI'})
class UIStore extends VuexModule {

    // addChanel modal state

    public modalState: boolean = false

    @Mutation setModalState(payload: boolean) {
        this.modalState = payload
    }

}

const UIModule = getModule(UIStore)
export default UIModule
