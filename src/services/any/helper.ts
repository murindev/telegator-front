export default {
    install: (app:any) => {
        app.config.globalProperties.$helper = {
            dateTime: (dateTimeStr:string) => {
                return dateTimeStr ? new Date(dateTimeStr).toLocaleDateString() + ' ' + new Date(dateTimeStr).toLocaleTimeString().substr(0,5) : ''
            },
            ruBool:(int: any) => Number(int) ? 'Да' : 'Нет',
            fromPercent:(percent:any, total:any) => (toInt(total)/100 * toInt(percent)),
            toInt: (str: string|number) => toInt(str),

            date: (datetime: string) => datetime ? datetime.substr(0,10) : '',
            dateDotted: (datetime: string) => datetime ? new Date(datetime).toLocaleString().substr(0,10) : '',
            time: (datetime: string) => datetime ? datetime.substr(11,5) : '',

        }
    }
}


const toInt = (str: any) : number => Number(str.toString().replace(/[^\d.]/ig, ''))
