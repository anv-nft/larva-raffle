function secondToTime(seconds) {
    let hour = parseInt(seconds / 3600);
    let min = parseInt((seconds % 3600) / 60);
    let sec = seconds % 60;
    if (hour.toString().length === 1) hour = "0" + hour;
    if (min.toString().length === 1) min = "0" + min;
    if (sec.toString().length === 1) sec = "0" + sec;
    return hour + ":" + min + ":" + sec;
}

function timeToSecond(time) {
    const array = time.split(':')
    const h = parseInt(array[0]) * 60 * 60;
    const m = parseInt(array[1]) * 60;
    const s = parseInt(array[2]);
    return h+m+s;
}
function drawTime() {
    const element = document.getElementsByClassName("countTimer");
    for (let index = 0; index < element.length; index++) {
        const sec = timeToSecond(element[index].innerHTML);
        if (sec <= 0) {
            continue;
        }
        element[index].innerHTML = secondToTime(sec - 1);
    }
    return true;
}
function YYYYMMDDHIS(orgDate){
    let date = new Date(orgDate);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);
    let dateString = year + '-' + month  + '-' + day;
    let timeString = hours + ':' + minutes  + ':' + seconds;
    return dateString + ' ' + timeString;
}
module.exports = {
    secondToTime, timeToSecond, drawTime , YYYYMMDDHIS
}
