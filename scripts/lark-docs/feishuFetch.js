const fetch = require('node-fetch')

const FEISHU_RETRY_ATTEMPTS = parseInt(process.env.FEISHU_RETRY_ATTEMPTS || '5', 10)
const FEISHU_RETRY_DELAY_MS = parseInt(process.env.FEISHU_RETRY_DELAY_MS || '1000', 10)

function shortError(err) {
    return err?.stack || err?.message || String(err)
}

function isRetryableFetchError(err) {
    return [
        'ECONNRESET',
        'ETIMEDOUT',
        'ERR_STREAM_PREMATURE_CLOSE',
        'ERR_INVALID_CHAR',
    ].includes(err?.code) || ['system', 'request-timeout', 'body-timeout'].includes(err?.type)
}

function shouldRetryJsonResponse(res, json) {
    return res.status === 429 || res.status >= 500 || json?.code === 99991400 || json?.status === 429
}

function retryAfterMs(res, attempt) {
    const reset = res?.headers?.get?.('x-ogw-ratelimit-reset')
    const retryAfter = res?.headers?.get?.('retry-after')
    const parsed = Number(reset || retryAfter)

    if (Number.isFinite(parsed) && parsed > 0) {
        return parsed * 1000
    }

    return FEISHU_RETRY_DELAY_MS * attempt
}

async function wait(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

async function fetchFeishuJsonWithRetry(url, options={}, label=url) {
    let lastError

    for (let attempt = 1; attempt <= FEISHU_RETRY_ATTEMPTS; attempt++) {
        try {
            const res = await fetch(url, {
                compress: false,
                ...options,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    // Avoid node-fetch Gunzip failures from truncated compressed Feishu responses.
                    'Accept-Encoding': 'identity',
                    ...options.headers,
                },
            })
            const text = await res.text()
            let json = {}

            if (text) {
                try {
                    json = JSON.parse(text)
                } catch (parseError) {
                    if (!shouldRetryJsonResponse(res, null)) {
                        throw parseError
                    }
                }
            }

            if (shouldRetryJsonResponse(res, json)) {
                const err = new Error(`retryable Feishu response ${res.status}: ${text.slice(0, 300)}`)
                err.retryDelayMs = retryAfterMs(res, attempt)
                throw err
            }

            return json
        } catch (err) {
            lastError = err
            const retryable = err.retryDelayMs || isRetryableFetchError(err)

            if (!retryable || attempt === FEISHU_RETRY_ATTEMPTS) {
                break
            }

            const delay = err.retryDelayMs || (FEISHU_RETRY_DELAY_MS * attempt)
            process.stderr.write(
                `[fetch-lark-docs] ${label} failed on attempt ${attempt}/${FEISHU_RETRY_ATTEMPTS}: ${shortError(err)}\n`
            )
            await wait(delay)
        }
    }

    throw lastError
}

module.exports = {
    fetchFeishuJsonWithRetry,
    isRetryableFetchError,
}
