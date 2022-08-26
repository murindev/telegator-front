import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {path: '/', redirect: {name: 'SignIn'}},
    {
        path: '/sign-in',
        name: 'SignIn',
        meta: {requiresAuth: false},
        component: () => import('@/views/Auth/SignIn.vue'),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        meta: {requiresAuth: false},
        component: () => import('@/views/Auth/SignUp.vue'),
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        meta: {requiresAuth: false},
        component: () => import('@/views/Auth/ForgotPassword.vue'),
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        meta: {requiresAuth: false},
        component: () => import('@/views/Auth/ResetPassword.vue'),
    },
    {
        path: '/dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {requiresAuth: true},
        children: [
            // Channel
            {
                path: 'channels',
                name: 'Channels',
                meta: {title: 'Каналы', requiresAuth: true},
                component: () => import('@/views/Channel/ChannelList.vue'),
                children: [
                    {
                        path: 'parse-tg-stat',
                        name: 'ParseTgStat',
                        meta: {title: 'Парсинг статистики', requiresAuth: true},
                        component: () => import('@/views/Channel/ParseTgStat.vue'),
                    },
                ]
            },
            {
                path: 'channels/:id',
                name: 'Channel',
                meta: {title: 'Канал', requiresAuth: true},
                component: () => import('@/views/Channel/Channel.vue'),
                children: [
                    {
                        alias: '',
                        path: 'stats',
                        name: 'ChannelStats',
                        meta: {title: 'Статистика канала', requiresAuth: true},
                        component: () => import('@/components/channel/ChannelStatistics.vue'),
                    },
                    {
                        path: 'posts',
                        name: 'ChannelPosts',
                        meta: {title: 'Публикации канала', requiresAuth: true},
                        component: () => import('@/components/channel/ChannelPublications.vue'),
                    },
                    {
                        path: 'campaigns',
                        name: 'ChannelCampaigns',
                        meta: {title: 'Участие в кампаниях', requiresAuth: true},
                        component: () => import('@/components/channel/ChannelCampaigns.vue'),
                    },
                ]
            },
            {
                path: 'channels/:id/posts/:post',
                name: 'ChannelPost',
                meta: {title: 'Пост', requiresAuth: true},
                component: () => import('@/views/Channel/ChannelPost.vue'),
            },

            // Campaign
            {
                path: 'campaigns',
                name: 'Campaigns',
                meta: {title: 'Подбор кампании', requiresAuth: true},
                component: () => import('@/views/Campaign/CampaignsTask.vue'),
                children: [
                    {
                        path: '',
                        name: 'CampaignTasks',
                        meta: {title: 'Задачи кампании', requiresAuth: true},
                        component: () => import('@/components/campaign/CampaignTasks.vue')
                    },
                ]
            },
            {
                path: 'campaigns/:id',
                name: 'Campaign',
                meta: {title: 'Кампания', requiresAuth: true},
                component: () => import('@/views/Campaign/Campaign.vue'),
                children: [
                    {
                        path: '',
                        name: 'CampaignChannels',
                        meta: {title: 'Каналы кампании', requiresAuth: true},
                        component: () => import('@/components/campaign/CampaignChannels.vue')
                    }

                ]
            },
            {
                path:'campaigns/:id/:task_channel',
                name:'CampaignTask',
                meta: {title: 'Кампания для канала', requiresAuth: true},
                component: () => import('@/views/Campaign/CampaignTaskChannel.vue'),
            },
            {
                path: 'campaigns/new',
                name: 'CampaignNew',
                meta: {title: 'Создание кампании', requiresAuth: true},
                component: () => import('@/views/Task/TaskNew.vue'),
                // component: () => import('@/views/Campaign/CampaignNew.vue'),
                children: [
                    {
                        path: '',
                        name: 'NewCampaignTasks',
                        meta: {title: 'Подбор задачи для новой кампании', requiresAuth: true},
                        component: () => import('@/components/campaign/NewCampaignTasks.vue')
                    },
                    {
                        path: 'channels',
                        name: 'NewCampaignChannels',
                        meta: {title: 'Подбор канала для новой кампании', requiresAuth: true},
                        component: () => import('@/components/campaign/NewCampaignChannels.vue')
                    }

                ]
            },

            // Tasks
            {
                path: 'tasks',
                name: 'TasksList',
                meta: {title: 'Список заданий', requiresAuth: true},
                component: () => import('@/views/Task/TasksList.vue'),
            },
            {
                path: 'tasks/:id',
                name: 'Task',
                meta: {title: 'Задание', requiresAuth: true},
                component: () => import('@/views/Task/Task.vue'),
            },
            {
                path: 'tasks/new',
                name: 'TaskNew',
                meta: {title: 'Создание задания', requiresAuth: true},
                component: () => import('@/views/Task/TaskNew.vue'),
            },
            // Account
            {
                path: 'account',
                name: 'Account',
                meta: {title: 'Настройки', requiresAuth: true},
                component: () => import('@/views/Account/Account.vue'),
            },
            // Balance
            {
                path: 'balance',
                name: 'Balance',
                meta: {title: 'Баланс', requiresAuth: true},
                component: () => import('@/views/Balance/Balance.vue'),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (
        to.name !== 'SignIn' &&
        to.name !== 'SignUp' &&
        to.name !== 'ForgotPassword' &&
        to.name !== 'ResetPassword' &&
        !localStorage.getItem('token')
    ) {
        next({name: 'SignIn'});
    } else {
        next();
    }
});

export default router
