import {getModule, Module, Mutation, Action, VuexModule, MutationAction} from "vuex-module-decorators"
import store from '@/store'
import {Get, Post} from '@/services/api/axios'
import {ICampaign, ICampaignPaginate} from "@/types/campaign";
import {IPaginate, IUseList} from "@/types/fetch";

@Module({dynamic: true, store, namespaced: true, name: 'StoreCampaign'})
class CampaignStore extends VuexModule {


    public campaign: ICampaign = {}

    @Mutation setCampaign(payload: ICampaign) {
        this.campaign = payload
    }

    public campaigns: IPaginate = {}
    @Mutation setCampaigns(payload: IPaginate) {
        this.campaigns = payload
    }

    public userCampaigns: ICampaign[] = []
    @Mutation setUserCampaigns(payload: ICampaign[]) {
        this.userCampaigns = payload
    }

// Actions

    @Action({commit: 'setCampaign'})
    async saveCampaign(payload: object) {
        // return Post('/api/campaign/save', payload)
        console.log(Post('/api/campaign/save', payload));
    }

    @Action({commit: 'setCampaigns'})
    async fetchCampaigns(params: IUseList, prompt: boolean = true): Promise<ICampaignPaginate> {
        return Get('/api/campaign/get', params, prompt)
    }

    @Action({commit: 'setCampaign'})
    async fetchCampaign(params: any, prompt: boolean = true): Promise<ICampaign> {
        return Get('/api/campaign/show', params, prompt)
    }

    @Action({commit: 'setCampaign'})
    async destroyCampaign(params: any, prompt: boolean = true): Promise<ICampaign> {
        return Get('/api/campaign/destroy', params, prompt)
    }

    @Action({commit: 'setCampaign'})
    async updateCampaign(params: any, prompt: boolean = true): Promise<ICampaign> {
        return Post('/api/campaign/update', params, prompt)
    }

    @Action({commit: 'setUserCampaigns'})
    async fetchUserCampaigns(prompt: boolean = false): Promise<ICampaign[]> {
        return Get('/api/campaign/user-campaigns', {}, prompt)
    }


}

const CampaignModule = getModule(CampaignStore)
export default CampaignModule
