import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

@Module({
    namespaced: true
})
class ExStore extends VuexModule {
    public text: string = 'inside module store'

    @Mutation
    setText (newString: string) {
        this.text = newString
    }
    get textUpper (): string {
        return this.text.toUpperCase()
    }
}
export default ExStore
