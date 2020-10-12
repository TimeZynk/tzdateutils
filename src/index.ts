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

export function isValidDate(date: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNaN' does not exist on type 'NumberCon... Remove this comment to see the full error message
    return date && date instanceof Date && !Number.isNaN(date.getTime());
}

export function getWeek(date: Date) {
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
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    // @ts-expect-error ts-migrate(2363) FIXME: The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

export function getWeekYear(date: Date) {
    // Create a new date object for the thursday of this week
    const target = new Date(date.valueOf());
    target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);
    return target.getFullYear();
}

export function getISODateString(date: Date, separator: any) {
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

export function getTimeString(date: Date) {
    let str = '';
    const h = date.getHours();
    const m = date.getMinutes();

    if (h < 10) { str += '0'; }
    str += `${h}:`;

    if (m < 10) { str += '0'; }
    str += m;
    return str;
}

export function getISODay(date: Date) {
    return (date.getDay() + 6) % 7;
}

export function getDaysFrom(date: Date, from: Date) {
    const dateMidDay = (new Date(date.valueOf())).setHours(12, 0, 0);
    const fromMidDay = (new Date(from.valueOf())).setHours(12, 0, 0);
    return Math.round((dateMidDay - fromMidDay) / 86400000);
}

export function getTotalDaysInMonth(date: Date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

export function withParsedISODate(date: Date, str: string) {
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

export function getEpoch(date: Date) {
    return Math.floor(date.getTime() / 1000);
}

export function addSeconds(date: Date, seconds: any) {
    const d = new Date(date.valueOf());
    d.setSeconds(d.getSeconds() + seconds, d.getMilliseconds());
    return d;
}

export function addDays(date: Date, days: any) {
    const d = new Date(date.valueOf());
    d.setDate(date.getDate() + days);
    return d;
}

export function addMonths(date: Date, months: any) {
    const d = new Date(date.valueOf());
    d.setMonth(date.getMonth() + months);
    return d;
}

export function addYears(date: Date, years: any) {
    const d = new Date(date.valueOf());
    d.setFullYear(date.getFullYear() + years);
    return d;
}

export function addHours(date: Date, h: any) {
    const d = new Date(date.valueOf());
    d.setHours(date.getHours() + h);
    return d;
}

export function addMinutes(date: Date, m: any) {
    const d = new Date(date.valueOf());
    d.setMinutes(date.getMinutes() + m);
    return d;
}

export function toStartOfDay(date: Date) {
    const d = new Date(date.valueOf());
    d.setHours(0, 0, 0, 0);
    return d;
}

export function toEndOfDay(date: Date) {
    const d = new Date(date.valueOf());
    d.setHours(23, 59, 59, 999);
    return d;
}

export function firstDayOfWeek(date: Date) {
    return addDays(date, -getISODay(date)); // Subtract current weekday to get to monday
}

export function lastDayOfWeek(date: Date) {
    return addDays(date, 6 - getISODay(date)); // Subtract current weekday to get to monday
}

export function firstDayOfMonth(date: Date) {
    const d = new Date(date.valueOf());
    d.setDate(1);
    return d;
}

export function lastDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Copy time from `other` date to date while
 * preserving year, month and day.
 */
export function withTime(date: Date, other: any) {
    const d = new Date(date.valueOf());
    if (isValidDate(other)) {
        d.setHours(other.getHours(), other.getMinutes(), other.getSeconds(), other.getMilliseconds());
    }
    return d;
}

export function withSeconds(date: Date, seconds: any) {
    const d = new Date(date.valueOf());
    d.setSeconds(seconds, 0);
    return d;
}

export function withParsedTime(date: Date, time: any) {
    const hours = [0, 0, 0, 0];
    const d = new Date(date.valueOf());

    const times = time.split(':');
    for (let i = 0; i < times.length; i++) {
        hours[i] = parseInt(times[i], 10);
    }

    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-4 arguments, but got 0 or more.
    d.setHours(...hours);
    return d;
}

export function firstTimeAfter(date: Date, other: any) {
    let d = withTime(other, date);

    while (d < other) {
        d = addDays(d, 1);
    }

    return d;
}

/**
 * Prints a duration in HH:MM from a timestamp in seconds
 */
export function print_duration(timestamp: any) {
    let result = '';
    let hours;
    let minutes;

    if (timestamp === null || typeof (timestamp) === 'undefined') {
        return null;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    hours = Math.floor(timestamp / 60);
    if (hours < 10) {
        result += '0';
    }
    result += `${hours}:`;

    minutes = timestamp - hours * 60;
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
export function print_duration_long(timestamp: any) {
    let result = '';
    let hours;
    let minutes;

    if (timestamp === null || typeof (timestamp) === 'undefined') {
        return null;
    }

    if (timestamp < 0) {
        timestamp = 0 - timestamp;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    hours = Math.floor(timestamp / 60);
    if (hours > 0) {
        result += `${hours} h`;
    }

    minutes = timestamp - hours * 60;

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
export function print_duration_full(timestamp: any) {
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

export function parseISODateTime(t: any) {
    if (t === null || typeof (t) === 'undefined') {
        return null;
    }

    if (typeof (t.getTime) === 'function') {
        // Already a date, just return a copy
        return new Date(t.getTime());
    }

    if (typeof (t) === 'number') {
        // Interpret numeric argument as timestamp
        return new Date(t);
    }

    const fields = ISO_DATE_TIME_FORMAT.exec(t);

    if (!fields) {
        return null;
    }

    for (let i = 1; i < fields.length; i++) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        fields[i] = parseInt(fields[i] || 0, 10);
    }
    const date = fields.slice(1, 4);
    // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    date[1] -= 1;
    const time = fields.slice(4);

    const d = new Date();
    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-3 arguments, but got 0 or more.
    d.setFullYear(...date);
    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-4 arguments, but got 0 or more.
    d.setHours(...time);
    return d;
}

export function parseISODate(d: any) {
    if (d === null || typeof (d) === 'undefined') {
        return null;
    }

    if (typeof (d.getTime) === 'function') {
        // Already a date, just return a copy
        return toStartOfDay(d);
    }

    if (typeof (d) === 'number') {
        // Interpret numeric argument as timestamp
        return toStartOfDay(new Date(d));
    }

    return parseISODateTime(`${d}T00:00:00.000`);
}

/**
 * Adds extra utility functions to the date object
 */
export default function installDateExtensions(scope: any) {
    (function extendDatePrototype(prototype) {
        /**
         * Returns the ISO 8601 week number for this date
         * Courtesy of http://techblog.procurios.nl/k/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
         *
         * @return int
         */
        prototype.getWeek = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getWeekYear()');
            }
            return getWeekYear(this);
        };

        prototype.getISODateString = function (separator: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getISODateString()');
            }
            return getISODateString(this, separator);
        };

        prototype.getTimeString = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getISODay()');
            }
            return getISODay(this);
        };

        prototype.getDaysFrom = function (from: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getDaysFrom()');
            }
            return getDaysFrom(this, from);
        };

        prototype.getTotalDaysInMonth = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getTotalDaysInMonth()');
            }
            return getTotalDaysInMonth(this);
        };

        prototype.parseISODate = function (str: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.parseISODate()');
            }
            return withParsedISODate(this, str);
        };

        prototype.getEpoch = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.getEpoch()');
            }
            return getEpoch(this);
        };

        prototype.addSeconds = function (seconds: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addSeconds()');
            }
            return addSeconds(this, seconds);
        };

        prototype.addDays = function (days: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addDays()');
            }
            return addDays(this, days);
        };

        prototype.addMonths = function (months: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addMonths()');
            }
            return addMonths(this, months);
        };

        prototype.addYears = function (years: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addYears()');
            }
            return addYears(this, years);
        };

        prototype.addHours = function (h: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addHours()');
            }
            return addHours(this, h);
        };

        prototype.addMinutes = function (m: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.addMinutes()');
            }
            return addMinutes(this, m);
        };

        prototype.toStartOfDay = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.toStartOfDay()');
            }
            return toStartOfDay(this);
        };

        prototype.toEndOfDay = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.toEndOfDay()');
            }
            return toEndOfDay(this);
        };

        prototype.firstDayOfWeek = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstDayOfWeek()');
            }
            return firstDayOfWeek(this);
        };

        prototype.lastDayOfWeek = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.lastDayOfWeek()');
            }
            return lastDayOfWeek(this);
        };

        prototype.firstDayOfMonth = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstDayOfMonth()');
            }
            return firstDayOfMonth(this);
        };

        prototype.lastDayOfMonth = function () {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.lastDayOfMonth()');
            }
            return lastDayOfMonth(this);
        };

        prototype.withTime = function (date: Date) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.withTime()');
            }
            return withTime(this, date);
        };

        prototype.parseISOTime = function (time: any) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.parseISOTime()');
            }
            return withParsedTime(this, time);
        };

        prototype.firstTimeAfter = function (date: Date) {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function Date.prototype.firstTimeAfter()');
            }
            return firstTimeAfter(this, date);
        };
    }(scope.Date.prototype));

    (function installDateFunctions(window) {
        // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        window.print_duration = (...args) => {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.print_duration()');
            }
            // @ts-expect-error ts-migrate(2556) FIXME: Expected 1 arguments, but got 0 or more.
            return print_duration(...args);
        };

        // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        window.print_duration_long = (...args) => {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.print_duration_long()');
            }
            // @ts-expect-error ts-migrate(2556) FIXME: Expected 1 arguments, but got 0 or more.
            return print_duration_long(...args);
        };

        // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        window.parseISODateTime = (...args) => {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.parseISODateTime()');
            }
            // @ts-expect-error ts-migrate(2556) FIXME: Expected 1 arguments, but got 0 or more.
            return parseISODateTime(...args);
        };

        // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        window.parseISODate = (...args) => {
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Use of deprecated function window.parseISODate()');
            }
            // @ts-expect-error ts-migrate(2556) FIXME: Expected 1 arguments, but got 0 or more.
            return parseISODate(...args);
        };
    }(scope));
}
