// 全局的工具方法提取出工具类
export default class myUtils {
    /**
     * 判断字符串是否为空
     * @param str
     * @returns {boolean}
     */
    static isNull(str) {
        return str == null || str.length === 0 || str === "";
    }

    /**
     * 判断是否为手机号
     * @param {String|Number} str
     * @return {Boolean}
     */
    static isPhoneNumber(str) {
        return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
    }
}