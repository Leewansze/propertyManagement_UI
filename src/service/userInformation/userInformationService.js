import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

export default {
    async selectUserById(userId) {
        let res;
        await that.$get(api.user.url.selectUserById, {
                id: userId,
            })
            .then(response => {
                res = response;
            })
        return res;
    },
    async sendEmailConfirm(userId, emailAddress) {
        let res
        await that.$get(api.user.url.sendEmailConfirm, {
                userId: userId,
                emailAddress: emailAddress
            })
            .then(response => {
                res = response
            })
        return res
    },
    async emailConfirm(userId, emailAddress, token) {
        let res
        await that.$get(api.user.url.emailConfirm, {
                userId: userId,
                emailAddress: emailAddress,
                token: token
            })
            .then(response => {
                res = response
            })
        return res
    },
    async emailTest(email) {
        let res
        let url = 'https://www.emailcamel.com/api/single/validate/?usr=hovees&pwd=123456&email=' + email
        await that.$get(url, {})
            .then(response => {
               res = response
            })
        return res
    }
}