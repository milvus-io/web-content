const { S3Client, HeadObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('node:fs')
const crypto = require('node:crypto')

class S3Uploader {
  constructor(options = {}) {
    this.options = options
    this.region = options.region || process.env.AWS_REGION
    this.client = options.client || new S3Client({ region: this.region })
    this.bucket = options.bucket || process.env.AWS_BUCKET
    this.prefix = ((options.prefix ?? process.env.S3_PREFIX) || '').replace(/\/+$/, '')
  }

  resolveKey(filename, key) {
    const relative = key || filename
    return this.prefix ? `${this.prefix}/${relative}` : relative
  }

  async uploadArtifact({filename, key, bytes, sha256}) {
    if (!this.bucket) {
      throw new Error('AWS_BUCKET environment variable is required')
    }
    if (!this.region) {
      throw new Error('AWS_REGION environment variable is required')
    }

    const s3Key = this.resolveKey(filename, key)
    const md5 = crypto.createHash('md5').update(bytes).digest('hex')
    const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${s3Key}`

    try {
      const head = await this.client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: s3Key,
      }))
      const etag = head.ETag?.replace(/"/g, '')
      if (etag === md5) {
        return url
      }
    } catch (err) {
      if (err.name !== 'NotFound') {
        throw err
      }
    }

    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: s3Key,
      Body: bytes,
      ContentType: 'application/json',
      ACL: 'public-read',
      Metadata: {sha256},
    }))

    return url
  }

  async promoteArtifact({filename, key, bytes, sha256, expectedCurrentSha256 = null}) {
    const s3Key = this.resolveKey(filename, key)
    let currentSha256 = null
    try {
      const head = await this.client.send(new HeadObjectCommand({Bucket: this.bucket, Key: s3Key}))
      currentSha256 = head.Metadata?.sha256 || null
    } catch (err) {
      if (err.name !== 'NotFound') throw err
    }
    if (expectedCurrentSha256 !== null && currentSha256 !== expectedCurrentSha256) {
      throw new Error(`REST_STALE_LATEST_REJECTED: expected ${expectedCurrentSha256}, found ${currentSha256}`)
    }
    return this.uploadArtifact({filename, key, bytes, sha256})
  }

  mergeSpecsByTargetAndVersion(specifications) {
    const results = {}
    for (const target of ['zilliz', 'milvus']) {
      const tags = (specifications.tags || []).filter(tag => !tag['x-include-target'] || tag['x-include-target'].includes(target))
      const paths = {}
      for (const [pathUrl, methods] of Object.entries(specifications.paths || {})) {
        const selected = {}
        for (const [method, operation] of Object.entries(methods)) {
          if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue
          if (!tags.some(tag => tag.name === operation.tags?.[0])) continue
          if (operation['x-include-target'] && !operation['x-include-target'].includes(target)) continue
          selected[method] = operation
        }
        if (Object.keys(selected).length) paths[pathUrl] = selected
      }
      const versions = {v1: {tags: [], paths: {}}, v2: {tags: [], paths: {}}}
      for (const tag of tags) {
        const version = tag.name.includes('(V2)') || tag.name.includes('v2') ? 'v2' : 'v1'
        versions[version].tags.push(tag)
      }
      for (const [pathUrl, methods] of Object.entries(paths)) {
        for (const [method, operation] of Object.entries(methods)) {
          const version = versions.v2.tags.some(tag => tag.name === operation.tags?.[0]) ? 'v2' : 'v1'
          versions[version].paths[pathUrl] ||= {}
          versions[version].paths[pathUrl][method] = operation
        }
      }
      results[target] = {}
      for (const version of ['v1', 'v2']) {
        if (!versions[version].tags.length) continue
        results[target][version] = {
          openapi: '3.0.1', info: specifications.info || {title: 'API', version: '1.0.0'},
          tags: versions[version].tags, paths: versions[version].paths,
        }
      }
    }
    return results
  }

  localizeAndCleanSpec(spec, lang) {
    const visit = value => {
      if (Array.isArray(value)) return value.map(visit)
      if (!value || typeof value !== 'object') return value
      const result = {}
      for (const [key, child] of Object.entries(value)) {
        if (key.startsWith('x-')) {
          if (lang === 'zh-CN' && key === 'x-i18n' && child?.['zh-CN']) Object.assign(result, child['zh-CN'])
          continue
        }
        result[key] = visit(child)
      }
      return result
    }
    return visit(structuredClone(spec))
  }

  async uploadIfChanged(key, content) {
    const bytes = Buffer.from(content)
    return this.uploadArtifact({filename: key, bytes, sha256: crypto.createHash('sha256').update(bytes).digest('hex')})
  }

  updateAboutPage(urls) {
    const aboutPath = 'content/en/reference/api/restful/restful/restful.md'
    if (!fs.existsSync(aboutPath)) return
    let content = fs.readFileSync(aboutPath, 'utf8')
    const links = Object.entries(urls).map(([key, url]) => {
      const [target, version] = key.split('-')
      return `- [${target === 'zilliz' ? 'Zilliz Cloud' : 'Milvus'} ${version.toUpperCase()}](${url})`
    }).join('\n')
    const section = `\n## OpenAPI Specifications\n\nDownload the OpenAPI specifications:\n\n${links}\n`
    const marker = '<!-- openapi-downloads -->'
    content = content.includes(marker) ? `${content.split(marker)[0]}${marker}${section}` : `${content}\n${marker}${section}`
    fs.writeFileSync(aboutPath, content)
  }

  async upload(specifications, lang) {
    if (!this.bucket) throw new Error('AWS_BUCKET environment variable is required')
    if (!this.region) throw new Error('AWS_REGION environment variable is required')
    const urls = {}
    for (const [target, versions] of Object.entries(this.mergeSpecsByTargetAndVersion(specifications))) {
      for (const [version, spec] of Object.entries(versions)) {
        const key = `openapi-${target}-${version}.json`
        urls[`${target}-${version}`] = await this.uploadIfChanged(key, JSON.stringify(this.localizeAndCleanSpec(spec, lang), null, 2))
      }
    }
    this.updateAboutPage(urls)
    return urls
  }
}

module.exports = S3Uploader
