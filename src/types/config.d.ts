import events from "@/services/api/events";
import eventBus from "@/services/api/eventBus";
import env from "@/services/api/env";
import helper from "@/services/any/helper";
import schema from "@/services/any/schema";
import priceFormat from "@/services/any/priceFormat";



declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $events: events,
        $bus: eventBus,
        $env: env,
        $helper: THelper<helper>,
        $schema: TScheme<schema>,
        $price: TPrice<priceFormat>
    }
}


type THelper = {
    dateTime
    ruBool
    fromPercent
    toPercent
    toInt
    date
    dateDotted
    time
    fromTimestamp
    timeDiffHours
    timeDiffHoursNow
}

type TScheme = {
    text
    multiselect
    always
}

type TPrice = {
    format
}


export {}
