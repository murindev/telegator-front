export default {
    install: (app: any) => {
        app.config.globalProperties.$schema = {
            text: {
                label: {
                    if: '$value',
                    attrs: {
                        style: {display: 'inline-block'},
                    },
                },
            },
            multiselect: {
                fieldset: {},
            },
            always: {
                label: {
                    attrs: {
                        style: {display: 'inline-block'},
                    },
                },
            },

        }
    }
}
