const _ = require('lodash');

export function getWeek(date) {
    // Create a copy of date object
    var target = new Date(date.valueOf());

    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr = (date.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);

    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();

    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

export function getWeekYear(date) {
    // Create a new date object for the thursday of this week
    var target  = new Date(date.valueOf());
    target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);

    return target.getFullYear();
};

export function getISODateString(date, separator) {
    var str = String(date.getFullYear());
    var m = date.getMonth() + 1;
    var d = date.getDate();

    if(separator !== undefined) {
        str += separator;
    }

    if (m < 10) {
        str += '0';
    }
    str += m;

    if(separator !== undefined) {
        str += separator;
    }

    if (d < 10) {
        str += '0';
    }
    str += d;

    return str;
};

export function getTimeString(date) {
    var str = '',
        h = date.getHours(),
        m = date.getMinutes();

    if (h < 10){str += '0';}
    str += h + ':';

    if (m < 10){str += '0';}
    str += m;
    return str;
}

export function getISODay(date) {
    return (date.getDay() + 6) % 7;
}

export function getDaysFrom(date, from) {
    return Math.round(((new Date(date)).setHours(12,0,0) - (new Date(from)).setHours(12,0,0))/86400000);
}

export function getTotalDaysInMonth(date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
};

export function withParsedISODate(date, str) {
    var year = str.substr(0, 4);
    var month = str.substr(4, 2);
    var dayOfMonth = str.substr(6, 2);

    // Parse into integers
    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    dayOfMonth = parseInt(dayOfMonth, 10);

    date.setFullYear(year, month, dayOfMonth);
    return date;
};

export function getEpoch(date) {
    return Math.floor(date.getTime() / 1000);
};

export function addSeconds(date, seconds) {
    var d = new Date(date);
    d.setSeconds(d.getSeconds() + seconds, d.getMilliseconds());
    return d;
};

export function addDays(date, days) {
    var d = new Date(date);
    d.setDate(date.getDate() + days);
    return d;
};

export function addMonths(date, months) {
    var d = new Date(date);
    d.setMonth(date.getMonth() + months);
    return d;
};

export function addYears(date, years) {
    var d = new Date(date);
    d.setFullYear(date.getFullYear() + years);
    return d;
};

export function addHours(date, h){
    var d = new Date(date);
    d.setHours(date.getHours()+h);
    return d;
};

export function addMinutes(date, m){
    var d = new Date(date);
    d.setMinutes(date.getMinutes() + m);
    return d;
};

export function toStartOfDay(date) {
    var d = new Date(date);
    d.setHours(0,0,0,0);
    return d;
};

export function toEndOfDay(date) {
    var d = new Date(date);
    d.setHours(23,59,59,999);
    return d;
};

export function firstDayOfWeek(date) {
    var d = new Date(date),
        day = d.addDays(-d.getISODay()); // Subtract current weekday to get to monday
    return day;
};

export function lastDayOfWeek(date) {
    var d = new Date(date),
        day = d.addDays(6 - d.getISODay()); // Subtract current weekday to get to monday
    return day;
};

export function firstDayOfMonth(date) {
    var d = new Date(date);
    d.setDate(1);
    return d;
};

export function lastDayOfMonth(date) {
    var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d;
};

export function withTime(date, other) {
    var d = new Date(date);
    if (other instanceof Date) {
        d.setHours(other.getHours(), other.getMinutes(), other.getSeconds(), other.getMilliseconds());
    }
    return d;
};

export function withParsedTime(date, time) {
    var hours = [0,0,0,0];
    var d = new Date(date);
    var i;

    time = time.split(':');
    for (i = 0; i < time.length; i++) {
        hours[i] = parseInt(time[i], 10);
    }

    d.setHours.apply(d, hours);
    return d;
};

export function firstTimeAfter(date, other) {
    var d = other.withTime(date);

    while (d < other) {
        d = d.addDays(1);
    }

    return d;
};

/**
 * Prints a duration in HH:MM from a timestamp in seconds
 */
export function print_duration(timestamp) {
    var result = '',
        hours,
        minutes;

    if (_.isUndefined(timestamp) || _.isNull(timestamp)) {
        return null;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    hours = Math.floor(timestamp / 60);
    if (hours < 10) {
        result += '0';
    }
    result += hours + ':';

    minutes = timestamp - hours * 60;
    if (minutes < 10) {
        result += '0';
    }
    result += minutes;

    return result;
};

/**
 * return a duration as HH h MM min
 * @param timestamp timestamp to print
 * @return duration as HH h MM min
 */
export function print_duration_long(timestamp) {
    var result = '',
        hours,
        minutes;

    if (_.isUndefined(timestamp) || _.isNull(timestamp)) {
        return null;
    }

    if (timestamp < 0) {
        timestamp = 0 - timestamp;
    }

    // Change to minutes
    timestamp = Math.round(timestamp / 60000);
    hours = Math.floor(timestamp / 60);
    if (hours > 0) {
        result += hours + ' h';
    }

    minutes = timestamp - hours * 60;

    if (result.length === 0 || minutes > 0) {
        if (result.length > 0) {
            result += ' ';
        }
        result += minutes + ' min';
    }

    return result;
};

var iso_date_time_format = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})/;

export function parseISODateTime(t) {
    var fields,
        date,
        time,
        i,
        d;

    if (_.isUndefined(t) || _.isNull(t)) {
        return null;
    }

    if (_.isDate(t)) {
        return new Date(t);
    }

    fields = t.match(iso_date_time_format);

    if (!fields) {
        return null;
    }

    for (i = 1; i < fields.length; i++) {
        fields[i] = parseInt(fields[i], 10);
    }
    date = fields.slice(1, 4);
    date[1] -= 1;
    time = fields.slice(4);

    d = new Date();
    d.setFullYear.apply(d, date);
    d.setHours.apply(d, time);
    return d;
};

export function parseISODate(d) {
    if (_.isUndefined(d) || _.isNull(d)) {
        return null;
    }

    return parseISODateTime(d + "T00:00:00.000");
};

export default function installDateExtensions(scope) {
    /**
     * Adds extra utility functions to the date object
     */
    (function extendDatePrototype(prototype) {
        /**
         * Returns the ISO 8601 week number for this date
         * Courtesy of http://techblog.procurios.nl/k/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
         *
         * @return int
         */
        prototype.getWeek = function() {
            console.warn('Use of deprecated function Date.prototype.getWeek()');
            return getWeek(this);
        };

        /**
        * Get the ISO week date year number
        * Courtesy of http://techblog.procurios.nl/k/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
        *
        * @return int
        */
        prototype.getWeekYear = function () {
            console.warn('Use of deprecated function Date.prototype.getWeekYear()');
            return getWeekYear(this);
        };

        prototype.getISODateString = function(separator) {
            console.warn('Use of deprecated function Date.prototype.getISODateString()');
            return getISODateString(this, separator);
        };

        prototype.getTimeString = function() {
            console.warn('Use of deprecated function Date.prototype.getTimeString()');
            return getTimeString(this);
        };

        /**
         * Return the day of week according to the ISO standard. Will use 0 for monday
         * and 6 for sunday.
         */
        prototype.getISODay = function() {
            console.warn('Use of deprecated function Date.prototype.getISODay()');
            return getISODay(this);
        };

        prototype.getDaysFrom = function(from) {
            console.warn('Use of deprecated function Date.prototype.getDaysFrom()');
            return getDaysFrom(this, from);
        };

        prototype.getTotalDaysInMonth = function() {
            console.warn('Use of deprecated function Date.prototype.getTotalDaysInMonth()');
            return getTotalDaysInMonth(this);
        };

        prototype.parseISODate = function(str) {
            console.warn('Use of deprecated function Date.prototype.parseISODate()');
            return withParsedISODate(this, str);
        };

        prototype.getEpoch = function() {
            console.warn('Use of deprecated function Date.prototype.getEpoch()');
            return getEpoch(this);
        };

        prototype.addSeconds = function(seconds) {
            console.warn('Use of deprecated function Date.prototype.addSeconds()');
            return addSeconds(this, seconds);
        };

        prototype.addDays = function(days) {
            console.warn('Use of deprecated function Date.prototype.addDays()');
            return addDays(this, days);
        };

        prototype.addMonths = function(months) {
            console.warn('Use of deprecated function Date.prototype.addMonths()');
            return addMonths(this, months);
        };

        prototype.addYears = function(years) {
            console.warn('Use of deprecated function Date.prototype.addYears()');
            return addYears(this, years);
        };

        prototype.addHours = function(h){
            console.warn('Use of deprecated function Date.prototype.addHours()');
            return addHours(this, h);
        };

        prototype.addMinutes = function(m){
            console.warn('Use of deprecated function Date.prototype.addMinutes()');
            return addMinutes(this, m);
        };

        prototype.toStartOfDay = function() {
            console.warn('Use of deprecated function Date.prototype.toStartOfDay()');
            return toStartOfDay(this);
        };

        prototype.toEndOfDay = function() {
            console.warn('Use of deprecated function Date.prototype.toEndOfDay()');
            return toEndOfDay(this);
        };

        prototype.firstDayOfWeek = function() {
            console.warn('Use of deprecated function Date.prototype.firstDayOfWeek()');
            return firstDayOfWeek(this);
        };

        prototype.lastDayOfWeek = function() {
            console.warn('Use of deprecated function Date.prototype.lastDayOfWeek()');
            return lastDayOfWeek(this);
        };

        prototype.firstDayOfMonth = function() {
            console.warn('Use of deprecated function Date.prototype.firstDayOfMonth()');
            return firstDayOfMonth(this);
        };

        prototype.lastDayOfMonth = function() {
            console.warn('Use of deprecated function Date.prototype.lastDayOfMonth()');
            return lastDayOfMonth(this);
        };

        prototype.withTime = function(date) {
            console.warn('Use of deprecated function Date.prototype.withTime()');
            return withTime(this, date);
        };

        prototype.parseISOTime = function(time) {
            console.warn('Use of deprecated function Date.prototype.parseISOTime()');
            return withParsedTime(this, time);
        };

        prototype.firstTimeAfter = function(date) {
            console.warn('Use of deprecated function Date.prototype.firstTimeAfter()');
            return firstTimeAfter(this, date);
        };

    }(scope.Date.prototype));

    (function installDateFunctions(window) {
        window.print_duration = print_duration;
        window.print_duration_long = print_duration_long;
        window.parseISODateTime = parseISODateTime;
        window.parseISODate = parseISODate;
    }(scope));
};
