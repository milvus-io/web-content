const { S3Client, HeadObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('node:fs')
const crypto = require('node:crypto')

class S3Uploader {
  constructor(options) {
    this.options = options
    this.client = new S3Client({ region: process.env.AWS_REGION })
    this.bucket = process.env.AWS_BUCKET
    this.prefix = process.env.S3_PREFIX || ''
  }

  mergeSpecsByTargetAndVersion(specifications) {
    const targets = ['zilliz', 'milvus']
    const results = {}

    for (const target of targets) {
      results[target] = {}

      // Filter tags
      const filteredTags = (specifications.tags || []).filter(tag => {
        if (tag['x-include-target']) {
          return tag['x-include-target'].includes(target)
        }
        return true
      })

      // Filter paths
      const filteredPaths = {}
      for (const [pathUrl, methods] of Object.entries(specifications.paths || {})) {
        const filteredMethods = {}
        for (const [method, operation] of Object.entries(methods)) {
          if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue

          const tagObj = filteredTags.find(t => t.name === operation.tags?.[0])
          if (!tagObj) continue

          if (operation['x-include-target'] && !operation['x-include-target'].includes(target)) {
            continue
          }

          filteredMethods[method] = operation
        }
        if (Object.keys(filteredMethods).length > 0) {
          filteredPaths[pathUrl] = filteredMethods
        }
      }

      // Split by version
      const versions = { v1: { tags: [], paths: {} }, v2: { tags: [], paths: {} } }
      for (const tag of filteredTags) {
        const version = tag.name.includes('(V2)') || tag.name.includes('v2') ? 'v2' : 'v1'
        versions[version].tags.push(tag)
      }

      for (const [pathUrl, methods] of Object.entries(filteredPaths)) {
        for (const [method, operation] of Object.entries(methods)) {
          const tagName = operation.tags?.[0]
          const tagObj = versions.v2.tags.find(t => t.name === tagName)
          const version = tagObj ? 'v2' : 'v1'
          if (!versions[version].paths[pathUrl]) {
            versions[version].paths[pathUrl] = {}
          }
          versions[version].paths[pathUrl][method] = operation
        }
      }

      for (const version of ['v1', 'v2']) {
        if (versions[version].tags.length > 0) {
          results[target][version] = {
            openapi: '3.0.1',
            info: specifications.info || { title: 'API', version: '1.0.0' },
            tags: versions[version].tags,
            paths: versions[version].paths,
          }
        }
      }
    }

    return results
  }

  localizeAndCleanSpec(spec, lang) {
    const clean = JSON.parse(JSON.stringify(spec))

    const localizeObj = (obj) => {
      if (!obj || typeof obj !== 'object') return obj

      if (Array.isArray(obj)) {
        return obj.map(item => localizeObj(item))
      }

      const result = {}
      for (const [key, value] of Object.entries(obj)) {
        // Strip all x-* keys
        if (key.startsWith('x-')) {
          // For zh-CN, use x-i18n to replace localizable fields before stripping
          if (lang === 'zh-CN' && key === 'x-i18n' && value && typeof value === 'object') {
            const zhContent = value['zh-CN']
            if (zhContent && typeof zhContent === 'object') {
              for (const [field, translated] of Object.entries(zhContent)) {
                if (result[field] !== undefined) {
                  result[field] = translated
                }
              }
            }
          }
          continue
        }

        result[key] = localizeObj(value)
      }
      return result
    }

    return localizeObj(clean)
  }

  async uploadIfChanged(key, content) {
    const s3Key = this.prefix ? `${this.prefix}/${key}` : key
    const md5 = crypto.createHash('md5').update(content).digest('hex')

    try {
      const head = await this.client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: s3Key,
      }))
      const etag = head.ETag?.replace(/"/g, '')
      if (etag === md5) {
        console.log(`Skipping ${key} - unchanged`)
        return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
      }
    } catch (err) {
      if (err.name !== 'NotFound') {
        throw err
      }
    }

    console.log(`Uploading ${key}...`)
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: s3Key,
      Body: content,
      ContentType: 'application/json',
      ACL: 'public-read',
    }))

    return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
  }

  updateAboutPage(urls) {
    const aboutPath = 'reference/api/restful/restful/restful.md'
    if (!fs.existsSync(aboutPath)) {
      console.warn(`About page not found at ${aboutPath}`)
      return
    }

    let content = fs.readFileSync(aboutPath, 'utf-8')

    const downloadSection = `
## OpenAPI Specifications

Download the OpenAPI specifications:

${Object.entries(urls).map(([key, url]) => {
      const [target, version] = key.split('-')
      const label = target === 'zilliz' ? 'Zilliz Cloud' : 'Milvus'
      return `- [${label} ${version.toUpperCase()}](${url})`
    }).join('\n')}
`

    const marker = '<!-- openapi-downloads -->'
    if (content.includes(marker)) {
      const before = content.split(marker)[0]
      content = before + marker + downloadSection
    } else {
      content = content + '\n' + marker + downloadSection
    }

    fs.writeFileSync(aboutPath, content)
    console.log('Updated about page with download links')
  }

  async upload(specifications, lang) {
    if (!this.bucket) {
      throw new Error('AWS_BUCKET environment variable is required')
    }
    if (!process.env.AWS_REGION) {
      throw new Error('AWS_REGION environment variable is required')
    }

    const merged = this.mergeSpecsByTargetAndVersion(specifications)
    const urls = {}

    for (const [target, versions] of Object.entries(merged)) {
      for (const [version, spec] of Object.entries(versions)) {
        const cleaned = this.localizeAndCleanSpec(spec, lang)
        const content = JSON.stringify(cleaned, null, 2)
        const key = `openapi-${target}-${version}.json`
        urls[`${target}-${version}`] = await this.uploadIfChanged(key, content)
      }
    }

    this.updateAboutPage(urls)
    return urls
  }
}

module.exports = S3Uploader
