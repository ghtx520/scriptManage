import Vue from "vue"
/**
 * 图片预览方法
 * 注入所有Vue实例
 * template模板里调用 $imgPreview(src)
 * 组件方法里调用 this.$imgPreview(src)
 */
const imgPreview = (src) => {
    let div = documnet.createElement('div')
    let img = document.createElement('img')
    let close = document.createElement('i')
    div.clssName = 'body_img_preview'
    img.src = src
    close.className = 'body_img_close'
    close.onclick = () => {
        document.body.removeChild(div)
    }
    div.appendChild(img)
    div.appendChild(close)
    document.body.appendChild(div)
}

/**
* 格式化日期方法
* 注入所有Vue实例，
* template模板里调用 $dateFormat(date)
* 组件方法里调用 this.$dateFormat(date)
* 例：this.$dateFormat('Dec 27, 2017 3:18:14 PM') 得到 '2017-12-27 15:18:14'
*/
const dateFormat = (date) => {
    if (!date) return ''
    let date_format = new Date(date)
    let year = date_format.getFullYear()
    let month = date_format.getMonth() + 1
    if (month < 10) month = '0' + month
    let mydate = date_format.getDate()
    if (mydate < 10) mydate = '0' + mydate
    let hours = date_format.getHours()
    if (hours < 10) hours = '0' + hours
    let minutes = date_format.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = date_format.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
    let time = `${year}-${month}-${mydate} ${hours}:${minutes}:${seconds}`
    return time
}

/**
* 时间戳转换
* 注入所有Vue实例，
* template模板里调用 $timestampToTime
* 组件方法里调用 this.$timestampToTime
* 例：this.$timestampToTime(1523440865000) 得到 '2018-04-11 18:1:5'
*/
const timestampToTime = (timestamp) => {
    var date = new Date(timestamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s
}

/**
* url参数处理(获取参数)
* 注入所有Vue实例，
* template模板里调用 $getUrlParams
* 组件方法里调用 this.$getUrlParams
* 例：this.$getUrlParams(id) 得到 '28'
*/
const getUrlParams = (key, url) => {
        let reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
        let url = url ? url : location.href;
        let result = reg.exec(url);
        if (result) {
            return result[2];
        } else {
            return '';
        }
    }
}

//注入所有Vue实例
Vue.prototype.$imgPreview = imgPreview
Vue.prototype.$dateFormat = dateFormat
Vue.prototype.$timestampToTime = timestampToTime
Vue.prototype.$getUrlParams = getUrlParams