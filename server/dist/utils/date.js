"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dueDateMillisecond = exports.birthdayYear = exports.getTime = exports.getDay = exports.formatDate = void 0;
const dayjs = require("dayjs");
const formatDate = (dateNum, isDue = false) => {
    if (isDue) {
        return dayjs(dateNum).format('YYYY-MM-DD HH:mm:ss');
    }
    else {
        return dayjs(dateNum).format('YYYY-MM-DD HH:mm:ss');
    }
};
exports.formatDate = formatDate;
const getDay = (date = new Date()) => {
    return dayjs(date).format('YYYYMMDD');
};
exports.getDay = getDay;
const getTime = () => {
    return new Date().getTime();
};
exports.getTime = getTime;
const birthdayYear = (date) => {
    try {
        return date ? `${dayjs().diff(date, 'years')}` : null;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
exports.birthdayYear = birthdayYear;
const dueDateMillisecond = (date) => {
    const currentTime = Number.parseInt(String(new Date().getTime() / 1000));
    const futureTime = Number.parseInt(String(new Date(date).getTime() / 1000));
    if (futureTime <= currentTime) {
        return 0;
    }
    else {
        return (futureTime - currentTime) * 1000;
    }
};
exports.dueDateMillisecond = dueDateMillisecond;
//# sourceMappingURL=date.js.map