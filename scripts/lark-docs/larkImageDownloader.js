const utils = require('./larkUtils.js')
const tokenFetcher = require('./larkTokenFetcher.js')
const https = require('node:https')
const fetch = require('node-fetch')
const Bottleneck = require('bottleneck')
const process = require('node:process')
const crypto = require('node:crypto')
const { S3Client, PutObjectCommand, HeadObjectCommand, PutObjectAclCommand } = require('@aws-sdk/client-s3');

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
        this.s3 = new S3Client({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        })
    }    

    async __uploadToS3(buffer, key) {
        const get_params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
        }

        const put_params = {
            ...get_params,
            Body: buffer,
            ContentType: 'image/png',
            ACL: 'public-read',
            Metadata: {
                hash: crypto.createHash('md5').update(buffer).digest('hex'),
            }
        }

        try {
            const headObjectCommand = new HeadObjectCommand(get_params);
            console.log(`S3 HEAD: ${key}`)
            const response = await this.s3.send(headObjectCommand);
            if (response.Metadata?.hash === crypto.createHash('md5').update(buffer).digest('hex')) {
                console.log(`Image already exists in S3: ${key}`);
                const aclCommand = new PutObjectAclCommand({ Bucket: process.env.AWS_BUCKET, Key: key, ACL: 'public-read' });
                await this.s3.send(aclCommand);
                console.log(`Image ${key} ACL ensured public-read`);
                return
            }

            const putObjectCommand = new PutObjectCommand(put_params);
            await this.s3.send(putObjectCommand);
            console.log(`Successfully uploaded image to ${key}`);
        } catch (err) {
            console.log(`S3 error for ${key}: name=${err.name} Code=${err.Code}`)
            const isMissingObjectError = err.name === 'NoSuchKey'
                || err.name === 'NotFound'
                || err.Code === 'NoSuchKey'
                || err.Code === 'NotFound'
                || err.$metadata?.httpStatusCode === 404
            if (isMissingObjectError) {
                console.log(`S3 PUT (new): ${key}`)
                const putObjectCommand = new PutObjectCommand(put_params);
                try {
                    await this.s3.send(putObjectCommand);
                    console.log(`Successfully uploaded image to ${key}`);
                } catch (putErr) {
                    console.error(`S3 PUT failed for ${key}: ${putErr.message}`);
                }
            } else {
                console.error(`Error uploading image ${key}: ${err.message}`);
            }
        }
    }

    async __downloadImage(image_token, retries=3) {
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

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const res = await fetch(`${process.env.FEISHU_HOST}/open-apis/drive/v1/medias/${image_token}/download`, req)
                console.log(`ImageToken: ${image_token} HTTP ${res.status}`)
                const buffer = await res.buffer()
                console.log(`ImageToken: ${image_token} buffer size: ${buffer.length} bytes`)
                return { buffer }
            } catch (err) {
                if (attempt === retries) throw err
                const delay = attempt * 5000
                console.log(`ImageToken ${image_token} download failed (attempt ${attempt}/${retries}), retrying in ${delay/1000}s: ${err.message}`)
                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
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
        console.log(`BoardToken: ${board_token} HTTP ${res.status} content-type: ${res.headers.get('content-type')}`)

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

        if (res.status === 429) {
            await this.__wait(60000)
            return await this.__fetchCaption(key, node)
        }

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

        if (res.status === 429) {
            await this.__wait(60000) 
            return await this.__fetchCaption(key, node)
        }

        return res
    }

    async __wait(duration) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve()
            }, duration)
        })
    }

}

module.exports = larkImageDownloader;