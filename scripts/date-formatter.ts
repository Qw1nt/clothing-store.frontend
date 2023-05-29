import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import utcPlugin from 'dayjs/plugin/utc'
import localizeFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(CustomParseFormat);
dayjs.extend(utcPlugin);
dayjs.extend(localizeFormat);
dayjs.extend(timezone);


export function formatData(date: Date){
    return dayjs(date).utc(false).tz('Asia/Yekaterinburg').format('DD.MM.YYYY')
}