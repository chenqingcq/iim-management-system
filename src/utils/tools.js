export function getURLParameters(url) { //获取路由参数
    const params = url.match(/([^?=&]+)(=([^&]*))/g);
    return params ? params.reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    ) : []
};
export function fomateDate(date, sign = '-') { //获取日期
    date = date ? new Date(date) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let mins = date.getMinutes();
    let seconds = date.getSeconds();
    year = year >= 10 ? year : `0${year}`;
    month = month >= 10 ? month : `0${month}`;
    day = day >= 10 ? day : `0${day}`;
    hour = hour >= 10 ? hour : `0${hour}`;
    mins = mins >= 10 ? mins : `0${mins}`;
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    let time = `${year}${sign}${month}${sign}${day} ${hour}:${mins}:${seconds}`;
    return time;
};
export function sort(arr) { //数组排序
    if (Array.isArray(arr)) {
        return arr.sort((a, b) => {
            return a - b;
        })
    }
}
export function getRandomNumber(min = 0, max = 1) {
    return parseInt(Math.random() * (max - min) + min);
}
export function formateDate(date) {
    let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    date = date ? new Date(date) : new Date();
    return weeks[date.getDay()];
}
export function debounce(fn, delay = 1000) {
    fn = fn || function() {};
    //首先设定一个变量，在没有执行我们的定时器时为null
    let timer = null;
    return function() {
        //当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}