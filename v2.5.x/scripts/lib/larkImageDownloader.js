const utils = require('./larkUtils.js')
const tokenFetcher = require('./larkTokenFetcher.js')
const fs = require('node:fs')
const https = require('node:https')
const fetch = require('node-fetch')
const Bottleneck = require('bottleneck')
const process = require('node:process')
const { method } = require('lodash')
require('dotenv/config')

class larkImageDownloader {
    constructor(docs, target_path) {
        this.docs = docs;
        this.images = new utils(this.docs, 'image');
        this.iframes = new utils(this.docs, 'iframe');
        this.target_path = target_path;   
        this.limiter = new Bottleneck({
            maxConcurrent: 1,
            minTime: 52,
        });
    }    

    async downloadImages() {
        const images = this.images.instances;
        const image_keys = this.images.instance_keys;

        const throttled_downloader = this.limiter.wrap(this.__downloadImage)

        const image_promises = images.map((image) => {
            return throttled_downloader(image.token)
        })

        try {
            const results = await Promise.all(image_promises)
            results.forEach((result, index) => {
                const writer = fs.createWriteStream(`${this.target_path}/${images[index].token}.png`)
                result.body.pipe(writer)
            })
            images.forEach((image, index) => {
                eval(`this.docs${image_keys[index]}.path = '${this.target_path}/${image.token}.png'`)
            })
        } 
        catch (error) {
            console.log(error)
        }

        return this.docs
    }

    async downloadIframes() {
        const iframe_keys = this.iframes.instance_keys;
        const iframes = this.iframes.instances.filter((iframe) => iframe.component.iframe_type === 8).map((iframe) => {
            const url = new URL(decodeURIComponent(iframe.component.url))
            const key = url.pathname.split('/')[2]
            const node = url.searchParams.get('node-id').split('-').join(":")

            return {key, node}
        })

        const throttled_fetcher = this.limiter.wrap(this.__fetchCaption)
        const throttled_downloader = this.limiter.wrap(this.__downloadIframe)

        const caption_promises = iframes.map((iframe) => {
            return throttled_fetcher(iframe.key, iframe.node)
        })

        const image_promises = iframes.map((iframe) => {
            return throttled_downloader(iframe.key, iframe.node)
        })

        try {
            let captions = await Promise.all(caption_promises)
            captions = captions.map((caption, index) => {
                return caption.nodes[iframes[index].node].document.name
            })
            
            let images = await Promise.all(image_promises)
            images = images.map((image, index) => {
                const writer = fs.createWriteStream(`${this.target_path}/${captions[index]}.png`)
                image.body.pipe(writer)
                eval(`this.docs${iframe_keys[index]}.caption = '${captions[index]}'`)
                eval(`this.docs${iframe_keys[index]}.path = '${this.target_path}/${captions[index]}.png'`)
            })
        } catch (error) {
            console.log(error)
        }

        return this.docs
    }

    async __downloadImage(image_token) {
        console.log(`ImageToken: ${image_token}`)
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token() 

        const req = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let res = await fetch(`${process.env.FEISHU_HOST}/open-apis/drive/v1/medias/${image_token}/download`, req)

        return res
    }

    async __downloadBoardPreview(board_token) {
        console.log(`BoardToken: ${board_token}`)
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token() 

        const req = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let res = await fetch(`${process.env.FEISHU_HOST}/open-apis/board/v1/whiteboards/${board_token}/download_as_image`, req)

        return res
    }

    async __fetchCaption(key, node) {
        console.log(`CaptionReq: ${key} ${node}`)
        const req = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            },
        }

        const res = await fetch(`https://api.figma.com/v1/files/${key}/nodes?ids=${node}`, req)
        return res.json()
    }

    async __downloadIframe(key, node) {
        console.log(`ImageReq: ${key} ${node}`)
        let res = await fetch(`https://api.figma.com/v1/images/${key}?ids=${node}&format=png&scale=3`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            }
        })

        let url = (await res.json()).images[node]
        res = await fetch(url, {
            method: 'GET',
            headers: {
                'Connection': 'keep-alive',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            },
            agent: new https.Agent({ keepAlive: true, maxSockets: 10 })
        })

        return res
    }

}

module.exports = larkImageDownloader;