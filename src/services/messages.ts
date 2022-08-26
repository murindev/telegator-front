export default {
    auth: {
        loginFail: 'С этими данными не получается войти. Либо такой емайл не зарегистрирован.',
        registrationFail: 'Такой емайл уже зарегистрированн в системе, попробуйте "Войти".',
        telegramAuthFail: 'Вот не задача (по идее этого не может произойти)' // impossible situation
    },
    campaign: {
        settingsValidation: {
            endRangeDateInPast: 'Дата конца публикации не должна быть в прошлом',
            endRangeDateIsEarlierThanStartRangeDate: 'Конец публикации раньше начала',
            endRangeDateIsUndefined: 'Дата конца публикации не указанна',
            endRangeInPast: 'Конец публикации в прошлом.',
            endRangeIsEarlierThanStartRangeDate: 'Конец публикации раньше начала',
            endRangeIsUndefined: 'Конец публикации не указан',
            endRangeTimeInPast: 'Время конца публикации не должно быть в прошлом',
            endRangeTimeIsEarlierThanStartRange: 'Время конца публикации раньше начала.',
            endRangeTimeIsUndefined: 'Время конца публикации не указанно',

            startRangeDateInPast: 'Дата начала публикации не должна быть в прошлом',
            startRangeDateIsUndefined: 'Дата начала публикации не указанна',
            startRangeInPast: 'Начало публикации в прошлом.',
            startRangeIsUndefined: 'Начало публикации не указанно',
            startRangeTimeInPast: 'Время начала публикации не должно быть в прошлом',
            startRangeTimeIsUndefined: 'Время начала публикации не указанно',

            titleIsUndefined: 'Название не должно быть пустым',
            titleTooShort: 'Название должно содержать хотя бы 4 символа',

            onSave: 'Кампания сохранена.',
            onDelete: 'Кампания удаленна.'
        },
        contentValidation: {
            messageIsUndefined: 'Контент задания не должен быть пустым',
            campaignIsUndefined: 'Сохраните настройки кампании',
            onSave: 'Задание сохранено.'
        },
        assignTask: {
            invalidCampaignSettings: 'Настройки проведения кампании не позволяют добавить каналы для участия. Измените настройки.',
            prepare: 'Канал добавлен в предварительный список участников кампании.',
            prepareMany: 'Каналы добавлены в предварительный список',
            invite: 'Приглашение об участии в кампании высланно',
            inviteMany: 'Приглашения об участии в кампании высланны'
        }
    },
    task: {
        addChannel: {
            dontHaveTelegram: 'Только пользователи с привязанным телеграм аккаунтом могут добавлять канал. Это можно сделать в настройках.',
            categories: 'Выберете хотябы одну тематику или укажите "другое"',
            invalidChannelLink: 'Неправильная ссылка на телеграм канал',
            invalidPrice: 'Неправильная стоимость публикации',
            textAfterLinkInput: 'Укажите ссылку на ваш канал, ссылка должна выглядеть таким образом https://t.me/name или https://t.me/joinchat/name',
            textAfterPriceInput: 'Введите желаемую стоимость публикации',
            textAfterCategoriesSelect: 'Укажите тематики канала (не более 5)',
            textAfterContactInput: 'Необязательно, укажите контакт для связи с вами (телеграм или, например, емайл)'
        }
    },
    settings: {
        setEmail: {
            fail: 'Такой емайл уже есть в нашей базе.',
            success: 'Вы успешно задали емайл и пароль'
        },
        changeEmail: {
            fail: 'Такой емайл уже есть в нашей базе.',
            success: 'Емайл успешно изменен'
        },
        telegramAuthSuccess: 'Телеграм аккаунт привязан.',
        telegramDeleteSuccess: 'Привязка телеграм аккаунта удалена'
    },
    somethingWentWrong: 'что-то пошло не так',
    iAmTeapot: 'критическая ошибка' // only for dev
};
