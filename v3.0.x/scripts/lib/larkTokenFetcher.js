const fetch = require('node-fetch')
const process = require('node:process')
require('dotenv').config()

const APP_ID = process.env.APP_ID
const APP_SECRET = process.env.APP_SECRET
const FEISHU_HOST = process.env.FEISHU_HOST

class larkTokenFetcher {

    constructor () {
        this.tenantAccessToken = undefined
        this.tenantAccessTokenExpireTime = undefined
    }

    async fetchToken() {

        const req = {
            method: 'post',
            body: JSON.stringify({
                "app_id": APP_ID,
                "app_secret": APP_SECRET
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = await fetch(`${FEISHU_HOST}/open-apis/auth/v3/tenant_access_token/internal/`, req)

        res = await res.json()

        if (res.code == 0) {
            this.tenantAccessToken = res.tenant_access_token
            this.tenantAccessTokenExpireTime = Date.now() + res.expire
        }
    }

    async token () {
        if (!this.tenantAccessToken || this.tenantAccessTokenExpireTime - Date.now() < 30) {
            await this.fetchToken()
        }

        return this.tenantAccessToken
    }
}

module.exports = larkTokenFetcher