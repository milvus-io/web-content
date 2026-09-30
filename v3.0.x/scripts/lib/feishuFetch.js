const fetch = require('node-fetch')

const DEFAULT_RETRIES = parseInt(process.env.FEISHU_FETCH_RETRIES || '5', 10)
const DEFAULT_BASE_DELAY_MS = parseInt(process.env.FEISHU_FETCH_BASE_DELAY_MS || '1000', 10)
const DEFAULT_TIMEOUT_MS = parseInt(process.env.FEISHU_FETCH_TIMEOUT_MS || '60000', 10)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function retryAfterMs(res) {
    const value = res.headers?.get?.('retry-after')
    if (!value) return null

    const seconds = Number(value)
    if (Number.isFinite(seconds)) return seconds * 1000

    const date = Date.parse(value)
    if (Number.isFinite(date)) return Math.max(0, date - Date.now())

    return null
}

function retryDelayMs(attempt, res) {
    const retryAfter = res ? retryAfterMs(res) : null
    if (retryAfter !== null) return retryAfter

    const jitter = Math.floor(Math.random() * 250)
    return DEFAULT_BASE_DELAY_MS * Math.pow(2, attempt - 1) + jitter
}

function shouldRetryStatus(status) {
    return status === 408 || status === 425 || status === 429 || status >= 500
}

async function fetchFeishuJsonWithRetry(url, options = {}, label = url) {
    const retries = Number.isInteger(options.retries) ? options.retries : DEFAULT_RETRIES
    const timeoutMs = Number.isInteger(options.timeoutMs) ? options.timeoutMs : DEFAULT_TIMEOUT_MS
    const fetchOptions = { ...options }
    delete fetchOptions.retries
    delete fetchOptions.timeoutMs

    let lastError = null

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), timeoutMs)

        try {
            const res = await fetch(url, { ...fetchOptions, signal: fetchOptions.signal || controller.signal })
            const text = await res.text()
            let json

            try {
                json = text ? JSON.parse(text) : {}
            } catch (error) {
                error.message = `[feishu] ${label} returned invalid JSON: ${error.message}`
                throw error
            }

            if (!res.ok && shouldRetryStatus(res.status) && attempt <= retries + 1) {
                lastError = new Error(`[feishu] ${label} HTTP ${res.status}: ${text.slice(0, 500)}`)
                if (attempt <= retries) {
                    await sleep(retryDelayMs(attempt, res))
                    continue
                }
            }

            return json
        } catch (error) {
            lastError = error
            if (attempt > retries) break
            await sleep(retryDelayMs(attempt))
        } finally {
            clearTimeout(timeout)
        }
    }

    throw lastError || new Error(`[feishu] ${label} failed`)
}

module.exports = {
    fetchFeishuJsonWithRetry,
}
