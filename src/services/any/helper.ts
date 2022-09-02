import UserModule from "@/store/modules/user";

export default {
    install: (app:any) => {
        app.config.globalProperties.$helper = {
            dateTime: (dateTimeStr:string) => {
                let d = new Date(dateTimeStr)

                return d ? (d.getDate()) + '.' + (d.getMonth()+1) + '.' + (d.getFullYear()) + ' ' + (d.getHours()) + ':' + (d.getMinutes()) + ' ' : ''
                // return dateTimeStr ? new Date(dateTimeStr).toLocaleDateString() + ' ' + new Date(dateTimeStr).toLocaleTimeString().substr(0,5) : ''
            },
            ruBool:(int: any) => Number(int) ? 'Да' : 'Нет',
            fromPercent:(percent:any, total:any) => (toInt(total)/100 * toInt(percent)),
            toPercent:(percent:any, total:any) => (100 - toInt(percent)) / 100 * toInt(total),
            toInt: (str: string|number) => toInt(str),

            date: (datetime: string) => datetime ? datetime.substr(0,10) : '',
            dateDotted: (datetime: string) => datetime ? new Date(datetime).toLocaleString().substr(0,10) : '',
            time: (datetime: string) => datetime ? datetime.substr(11,5) : '',
            fromTimestamp: (timestamp:number) => {
                return timestamp ? new Date(timestamp*1000).toLocaleDateString() + ' ' + new Date(timestamp*1000).toLocaleTimeString().substr(0,5) : ''
            },
            timeDiffHoursNow: (start:number) => new Date(Date.now() - start * 1000).toISOString().substring(11, 16),
            timeDiffHours: (start:number, end:number) => new Date(end * 1000 - start * 1000).toISOString().substring(11, 16),
        }
    }
}


const toInt = (str: any) : number => Number(str.toString().replace(/[^\d.]/ig, ''))
