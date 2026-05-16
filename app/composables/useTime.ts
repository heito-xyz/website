import { useI18n } from 'vue-i18n';


function pad(num: number): string {
    return num.toString().padStart(2, '0');
}


export const useTime = () => {
    const { t, te, locale } = useI18n();

    const plural = (count: number, key: string): string => {
        return t(key, { count });
    }

    const getMonthName = (monthIndex: number, short: boolean = false): string => {
        const suffix = short ? 'short' : 'full';
        const key = `months.${suffix}.${monthIndex}`;
        
        return te(key) ? t(key) : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][monthIndex]!;
    }

    const unix = (dateInput: number | string | Date = Date.now()) => {
        const date = new Date(dateInput);
        const year = date.getFullYear();
        const monthIdx = date.getMonth();

        return {
            year,
            day: pad(date.getDate()),
            month: pad(monthIdx + 1),
            monthIdx,
            hours: pad(date.getHours()),
            minutes: pad(date.getMinutes()),
            seconds: pad(date.getSeconds())
        }
    }

    const format = (time: number | string = Date.now(), formatStr = 'dd MMM YYYY'): string => {
        const { year, day, monthIdx, hours, minutes, seconds } = unix(time);
        const fullMonth = getMonthName(monthIdx, false);
        const shortMonth = getMonthName(monthIdx, true);

        const replacements: Record<string, string | number> = {
            YYYY: year,
            YY: year.toString().slice(-2),
            mmmm: fullMonth.toLowerCase(),
            MMMM: fullMonth.charAt(0).toUpperCase() + fullMonth.slice(1),
            mmm: shortMonth.toLowerCase(),
            MMM: shortMonth.charAt(0).toUpperCase() + shortMonth.slice(1),
            dd: day,
            d: parseInt(day, 10),
            hh: hours,
            h: parseInt(hours, 10),
            mm: minutes,
            m: parseInt(minutes, 10),
            ss: seconds,
            s: parseInt(seconds, 10)
        }

        let result = formatStr;

        for (const [token, value] of Object.entries(replacements)) {
            result = result.split(token).join(value.toString());
        }

        return result;
    }

    const timeago = (time: number | string | Date = Date.now()): string => {
        const elapsed = Date.now() - new Date(time).getTime();
        const absElapsed = Math.abs(elapsed);

        if (absElapsed < 3000) return t('time.just_now');

        const seconds = Math.round(absElapsed / 1000);
        if (seconds < 60) return plural(seconds, 'time.seconds_ago');

        const minutes = Math.round(seconds / 60);
        if (minutes < 60) return plural(minutes, 'time.minutes_ago');

        const hours = Math.round(minutes / 60);
        if (hours < 24) return plural(hours, 'time.hours_ago');

        const { day, monthIdx, year } = unix(time);
        const fullMonth = getMonthName(monthIdx, false);

        return `${parseInt(day, 10)} ${fullMonth} ${year}`
    }

    return { format, timeago }
}