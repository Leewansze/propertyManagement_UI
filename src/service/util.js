/*
 * @Author: Harry 
 * @Date: 2019-09-18 03:39:07 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 11:55:19
 */
import sha1 from "sha1";

export default {
    /**
     * 使用 SHA1算法进行加密
     * @param {string} password 
     */
    SHA1(password) {
        return sha1(password);
    },

    /**
     *  sleep睡眠工具 time 1000为1秒
     * @param {number} time 
     */
    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    },

    /**
     * 获取窗体宽度
     */
    getWinWidth() {
        let winWidth;
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;

        return winWidth;
    },

    /**
     * 获取窗体高度
     */
    getWinHeight() {
        let winHeight;
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        
        return winHeight;
    },

    /**
     * Element message提示窗口
     */
    message(that,mes,_type){
        that.$message({
            message: mes,
            type: _type
        });
    },

    /**
     * base64转换成图片
     * @param {string} base64 
     */
    base64ToImageUrl(base64){
        return "data:image/jpeg;base64," + base64;
    }
}
