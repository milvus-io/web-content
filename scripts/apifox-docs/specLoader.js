const fs = require('node:fs')
const path = require('node:path')

const CONFIG = {
    maxRefDepth: 20,
}

function resolveRefs(obj, spec, visited = new Set(), depth = 0, options = {}) {
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    if (depth > CONFIG.maxRefDepth) {
        if (!options.silentUnresolved) {
            console.warn(`Warning: Max $ref resolution depth (${CONFIG.maxRefDepth}) exceeded, returning as-is`)
        }
        return obj
    }

    if (visited.has(obj)) {
        return obj
    }
    visited.add(obj)

    if (Array.isArray(obj)) {
        return obj.map(item => resolveRefs(item, spec, visited, depth, options))
    }

    if (obj.$ref) {
        const refPath = obj.$ref
        if (refPath.startsWith('#/')) {
            const pathParts = refPath.substring(2).split('/').map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'))
            let resolved = spec

            for (const part of pathParts) {
                if (resolved && typeof resolved === 'object' && part in resolved) {
                    resolved = resolved[part]
                } else {
                    if (!options.silentUnresolved) {
                        console.warn(`Could not resolve reference: ${refPath}`)
                    }
                    return obj
                }
            }

            return resolveRefs(resolved, spec, new Set(), depth + 1, options)
        }
        return obj
    }

    const resolved = {}
    for (const [key, value] of Object.entries(obj)) {
        if (key === 'description' && typeof value === 'object') {
            if (value.type && (value.description || value.value)) {
                resolved[key] = value
            } else if (typeof value === 'object' && (value.description !== undefined || value.value !== undefined)) {
                resolved[key] = value
            } else if (typeof value === 'object') {
                resolved[key] = JSON.stringify(value)
            } else {
                resolved[key] = value
            }
        } else {
            resolved[key] = resolveRefs(value, spec, visited, depth, options)
        }
    }

    return resolved
}

function resolveLocalPathRefs(spec) {
    return {
        ...spec,
        paths: resolveRefs(spec.paths || {}, spec, new Set(), 0, { silentUnresolved: true }),
    }
}

function mergeSpecification(spec, content) {
    if (content.tags) {
        spec.tags = [...(spec.tags || []), ...content.tags]
    }
    if (content.paths) {
        spec.paths = { ...(spec.paths || {}), ...content.paths }
    }
    if (content.components) {
        spec.components = spec.components || {}
        for (const key of Object.keys(content.components)) {
            spec.components[key] = {
                ...(spec.components[key] || {}),
                ...content.components[key]
            }
        }
    }
    if (content.servers) {
        spec.servers = content.servers
    }
}

function loadSpecifications(inputPath) {
    const stat = fs.statSync(inputPath)
    if (stat.isFile()) {
        return JSON.parse(fs.readFileSync(inputPath, 'utf-8'))
    }

    if (!stat.isDirectory()) {
        throw new Error(`Path "${inputPath}" is neither a file nor a directory`)
    }

    const files = fs.readdirSync(inputPath)
        .filter(f => f.endsWith('.json'))
        .sort()

    if (files.length === 0) {
        throw new Error(`No .json files found in directory "${inputPath}"`)
    }

    let spec = null

    for (const file of files) {
        const content = resolveLocalPathRefs(JSON.parse(fs.readFileSync(path.join(inputPath, file), 'utf-8')))

        if (!spec) {
            spec = { ...content }
            continue
        }

        mergeSpecification(spec, content)
    }

    return spec
}

module.exports = {
    loadSpecifications,
    resolveRefs,
}
