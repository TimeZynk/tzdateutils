/*!
Copyright 2020 Timezynk AB

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export function isValidDate(date: unknown): boolean {
    if (date && date instanceof Date) {
        return !Number.isNaN(date.getTime());
    }
    return false;
}

export function getWeek(date: Date): number {
    // Create a copy of date object
    const target = new Date(date.valueOf());

    // ISO week date weeks start on monday
    // so correct the day number
    const dayNr = (date.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);

    // Store the millisecond value of the target date
    const firstThursday = target.valueOf();

    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

export function getWeekYear(date: Date): number {
    // Create a new date object for the thursday of this week
    const target = new Date(date.valueOf());
    target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);
    return target.getFullYear();
}

export function getISODateString(date: Date, separator: string): string {
    let str = String(date.getFullYear());
    const m = date.getMonth() + 1;
    const d = date.getDate();

    if (separator !== undefined) {
        str += separator;
    }

    if (m < 10) {
        str += '0';
    }
    str += m;

    if (separator !== undefined) {
        str += separator;
    }

    if (d < 10) {
        str += '0';
    }
    str += d;

    return str;
}

export function getTimeString(date: Date): string {
    let str = '';
    const h = date.getHours();
    const m = date.getMinutes();

    if (h < 10) {
        str += '0';
    }
    str += `${h}:`;

    if (m < 10) {
        str += '0';
    }
    str += m;
    return str;
}

export function getISODay(date: Date): number {
    return (date.getDay() + 6) % 7;
}

export function getDaysFrom(date: Date, from: Date): number {
    const dateMidDay = new Date(date.valueOf()).setHours(12, 0, 0);
    const fromMidDay = new Date(from.valueOf()).setHours(12, 0, 0);
    return Math.round((dateMidDay - fromMidDay) / 86400000);
}

export function getTotalDaysInMonth(date: Date): number {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

export function withParsedISODate(date: Date, str: string): Date {
    const year = str.substr(0, 4);
    const month = str.substr(4, 2);
    const dayOfMonth = str.substr(6, 2);

    // Parse into integers
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10) - 1;
    const parsedDayOfMonth = parseInt(dayOfMonth, 10);

    date.setFullYear(parsedYear, parsedMonth, parsedDayOfMonth);
    return date;
}

export function getEpoch(date: Date): number {
    return Math.floor(date.getTime() / 1000);
}

export function addSeconds(date: Date, seconds: number): Date {
    const d = new Date(date.valueOf());
    d.setSeconds(d.getSeconds() + seconds, d.getMilliseconds());
    return d;
}

export function addDays(date: Date, days: number): Date {
    const d = new Date(date.valueOf());
    d.setDate(date.getDate() + days);
    return d;
}

export function addMonths(date: Date, months: number): Date {
    const d = new Date(date.valueOf());
    d.setMonth(date.getMonth() + months);
    return d;
}

export function addYears(date: Date, years: number): Date {
    const d = new Date(date.valueOf());
    d.setFullYear(date.getFullYear() + years);
    return d;
}

export function addHours(date: Date, hours: number): Date {
    const d = new Date(date.valueOf());
    d.setHours(date.getHours() + hours);
    return d;
}

export function addMinutes(date: Date, minutes: number): Date {
    const d = new Date(date.valueOf());
    d.setMinutes(date.getMinutes() + minutes);
    return d;
}

export function toStartOfDay(date: Date): Date {
    const d = new Date(date.valueOf());
    d.setHours(0, 0, 0, 0);
    return d;
}

export function toEndOfDay(date: Date): Date {
    const d = new Date(date.valueOf());
    d.setHours(23, 59, 59, 999);
    return d;
}

export function firstDayOfWeek(date: Date): Date {
    return addDays(date, -getISODay(date)); // Subtract current weekday to get to monday
}

export function lastDayOfWeek(date: Date): Date {
    return addDays(date, 6 - getISODay(date)); // Subtract current weekday to get to monday
}

export function firstDayOfMonth(date: Date): Date {
    const d = new Date(date.valueOf());
    d.setDate(1);
    return d;
}

export function lastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Copy time from `other` date to date while
 * preserving year, month and day.
 */
export function withTime(date: Date, other: Date): Date {
    const d = new Date(date.valueOf());
    if (isValidDate(other)) {
        d.setHours(other.getHours(), other.getMinutes(), other.getSeconds(), other.getMilliseconds());
    }
    return d;
}

export function withSeconds(date: Date, seconds: number): Date {
    const d = new Date(date.valueOf());
    d.setSeconds(seconds, 0);
    return d;
}

export function withParsedTime(date: Date, time: string): Date {
    const hours = [0, 0, 0, 0];
    const d = new Date(date.valueOf());

    const times = time.split(':');
    for (let i = 0; i < times.length; i++) {
        hours[i] = parseInt(times[i], 10);
    }

    d.setHours(hours[0], hours[1], hours[2], hours[3]);
    return d;
}

export function firstTimeAfter(date: Date, other: Date): Date {
    let d = withTime(other, date);

    while (d < other) {
        d = addDays(d, 1);
    }

    return d;
}

/**
 * Prints a duration in HH:MM from a timestamp in seconds
 */
export function print_duration(timestamp: number): string | null {
    let result = '';

    if (timestamp === null || typeof timestamp === 'undefined') {
        return null;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    const hours = Math.floor(timestamp / 60);
    if (hours < 10) {
        result += '0';
    }
    result += `${hours}:`;

    const minutes = timestamp - hours * 60;
    if (minutes < 10) {
        result += '0';
    }
    result += minutes;

    return result;
}

/**
 * return a duration as HH h MM min
 * @param timestamp timestamp to print
 * @return duration as HH h MM min
 */
export function print_duration_long(timestamp: number | null): string | null {
    let result = '';

    if (timestamp === null || typeof timestamp === 'undefined') {
        return null;
    }

    if (timestamp < 0) {
        timestamp = 0 - timestamp;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    const hours = Math.floor(timestamp / 60);
    if (hours > 0) {
        result += `${hours} h`;
    }

    const minutes = timestamp - hours * 60;

    if (result.length === 0 || minutes > 0) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `${minutes} min`;
    }

    return result;
}

/**
 * return duration with seconds
 */
export function print_duration_full(timestamp: number): string {
    const total = Math.round(timestamp / 1000);
    const seconds = total % 60;
    const minutes = (total - seconds) % 3600;
    const hours = total - minutes - seconds;
    const output = [];

    if (hours > 0) {
        output.push(`${hours / 3600} h`);
    }

    if (minutes > 0 || hours > 0) {
        output.push(`${minutes / 60} m`);
    }

    output.push(`${seconds} s`);

    return output.join(' ');
}

const ISO_DATE_TIME_FORMAT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?/;
const DATE_FORMAT = /^(\d{4})-([0]\d|1[0-2])-([0-2]\d|3[01])$/;
export function parseISODateTime(t: Date | number | string | null | undefined): Date | null {
    if (t === null || typeof t === 'undefined') {
        return null;
    }

    if (typeof (t as Date).getTime === 'function') {
        // Already a date, just return a copy
        return new Date((t as Date).getTime());
    }

    if (typeof t === 'number') {
        // Interpret numeric argument as timestamp
        return new Date(t);
    }

    const fields = ISO_DATE_TIME_FORMAT.exec(t as string) || DATE_FORMAT.exec(t as string);

    if (!fields) {
        return null;
    }

    const parsedFields: number[] = [];
    for (let i = 1; i < fields.length; i++) {
        parsedFields[i] = parseInt(fields[i] || '0', 10);
    }
    const date = parsedFields.slice(1, 4);
    date[1] -= 1;
    const time = parsedFields.slice(4);

    const d = new Date();
    d.setFullYear(date[0], date[1], date[2]);
    d.setHours(time[0] || 0, time[1] || 0, time[2] || 0, time[3] || 0);
    return d;
}

export function parseISODate(d: unknown): Date | null {
    if (d === null || typeof d === 'undefined') {
        return null;
    }

    if (typeof (d as Date).getTime === 'function') {
        // Already a date, just return a copy
        return toStartOfDay(d as Date);
    }

    if (typeof d === 'number') {
        // Interpret numeric argument as timestamp
        return toStartOfDay(new Date(d));
    }

    return parseISODateTime(`${d}T00:00:00.000`);
}

/**
 * Adds extra utility functions to the date object
 * @deprecated
 */
export default function installDateExtensions(scope: any): void {
    (function extendDatePrototype(prototype) {
        /**
         * Returns the ISO 8601 week number for this date
         * Courtesy of http://techblog.procurios.nl/k/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
         *
         * @return int
         */
        prototype.getWeek = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getWeek()');
            }
            return getWeek(this);
        };

        /**
         * Get the ISO week date year number
         * Courtesy of http://techblog.procurios.nl/k/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
         *
         * @return int
         */
        prototype.getWeekYear = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getWeekYear()');
            }
            return getWeekYear(this);
        };

        prototype.getISODateString = function (separator: string) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getISODateString()');
            }
            return getISODateString(this, separator);
        };

        prototype.getTimeString = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getTimeString()');
            }
            return getTimeString(this);
        };

        /**
         * Return the day of week according to the ISO standard. Will use 0 for monday
         * and 6 for sunday.
         */
        prototype.getISODay = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getISODay()');
            }
            return getISODay(this);
        };

        prototype.getDaysFrom = function (from: Date) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getDaysFrom()');
            }
            return getDaysFrom(this, from);
        };

        prototype.getTotalDaysInMonth = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getTotalDaysInMonth()');
            }
            return getTotalDaysInMonth(this);
        };

        prototype.parseISODate = function (str: string) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.parseISODate()');
            }
            return withParsedISODate(this, str);
        };

        prototype.getEpoch = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getEpoch()');
            }
            return getEpoch(this);
        };

        prototype.addSeconds = function (seconds: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addSeconds()');
            }
            return addSeconds(this, seconds);
        };

        prototype.addDays = function (days: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addDays()');
            }
            return addDays(this, days);
        };

        prototype.addMonths = function (months: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addMonths()');
            }
            return addMonths(this, months);
        };

        prototype.addYears = function (years: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addYears()');
            }
            return addYears(this, years);
        };

        prototype.addHours = function (h: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addHours()');
            }
            return addHours(this, h);
        };

        prototype.addMinutes = function (m: number) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addMinutes()');
            }
            return addMinutes(this, m);
        };

        prototype.toStartOfDay = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.toStartOfDay()');
            }
            return toStartOfDay(this);
        };

        prototype.toEndOfDay = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.toEndOfDay()');
            }
            return toEndOfDay(this);
        };

        prototype.firstDayOfWeek = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstDayOfWeek()');
            }
            return firstDayOfWeek(this);
        };

        prototype.lastDayOfWeek = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.lastDayOfWeek()');
            }
            return lastDayOfWeek(this);
        };

        prototype.firstDayOfMonth = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstDayOfMonth()');
            }
            return firstDayOfMonth(this);
        };

        prototype.lastDayOfMonth = function () {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.lastDayOfMonth()');
            }
            return lastDayOfMonth(this);
        };

        prototype.withTime = function (date: Date) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.withTime()');
            }
            return withTime(this, date);
        };

        prototype.parseISOTime = function (time: string) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.parseISOTime()');
            }
            return withParsedTime(this, time);
        };

        prototype.firstTimeAfter = function (date: Date) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstTimeAfter()');
            }
            return firstTimeAfter(this, date);
        };
    })(scope.Date.prototype);

    (function installDateFunctions(window) {
        window.print_duration = (ts: number) => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.print_duration()');
            }
            return print_duration(ts);
        };

        window.print_duration_long = (ts: number) => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.print_duration_long()');
            }
            return print_duration_long(ts);
        };

        window.parseISODateTime = (str: any) => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.parseISODateTime()');
            }
            return parseISODateTime(str);
        };

        window.parseISODate = (str: any) => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.parseISODate()');
            }
            return parseISODate(str);
        };
    })(scope);
}
