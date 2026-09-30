const fs = require('node:fs')
const path = require('node:path')
const { isDeepStrictEqual } = require('node:util')

const CONFIG = {
    maxRefDepth: 20,
}

const SINGLETON_FIELDS = new Set(['openapi', 'info', 'externalDocs', 'jsonSchemaDialect'])
const KEYED_MAP_FIELDS = new Set(['paths', 'webhooks', 'callbacks'])

function clone(value) {
    return structuredClone(value)
}

function topLevelConflict(field, left, right) {
    return new Error(
        `REST_SPEC_TOP_LEVEL_CONFLICT ${field}: incompatible values ${JSON.stringify(left)} and ${JSON.stringify(right)}`
    )
}

function mergeSingleton(spec, content, field) {
    if (!Object.hasOwn(content, field) || content[field] === undefined) return

    if (!Object.hasOwn(spec, field) || spec[field] === undefined) {
        spec[field] = clone(content[field])
        return
    }

    if (isDeepStrictEqual(spec[field], content[field])) return

    if (field === 'info') {
        const compatibleInfo =
            spec.info?.version === content.info?.version &&
            isDeepStrictEqual(
                Object.fromEntries(Object.entries(spec.info || {}).filter(([key]) => key !== 'title' && key !== 'description')),
                Object.fromEntries(Object.entries(content.info || {}).filter(([key]) => key !== 'title' && key !== 'description')),
            )
        if (compatibleInfo) return
    }

    throw topLevelConflict(field, spec[field], content[field])
}

function mergeKeyedMap(spec, content, field) {
    if (!content[field] || typeof content[field] !== 'object' || Array.isArray(content[field])) return
    if (!spec[field] || typeof spec[field] !== 'object' || Array.isArray(spec[field])) {
        spec[field] = clone(content[field])
        return
    }

    for (const [key, value] of Object.entries(content[field])) {
        if (!Object.hasOwn(spec[field], key)) {
            spec[field][key] = clone(value)
            continue
        }
        if (!isDeepStrictEqual(spec[field][key], value)) {
            throw topLevelConflict(`${field}/${key}`, spec[field][key], value)
        }
    }
}

function mergeTags(spec, content) {
    if (!Array.isArray(content.tags)) return
    if (!Array.isArray(spec.tags)) {
        spec.tags = clone(content.tags)
        return
    }

    const byName = new Map()
    for (const tag of spec.tags) byName.set(tag.name, tag)
    for (const tag of content.tags) {
        if (!tag || typeof tag.name !== 'string') continue
        if (!byName.has(tag.name)) {
            byName.set(tag.name, tag)
            spec.tags.push(clone(tag))
            continue
        }
        if (!isDeepStrictEqual(byName.get(tag.name), tag)) {
            throw topLevelConflict(`tags/${tag.name}`, byName.get(tag.name), tag)
        }
    }
}

function mergeSecurity(spec, content) {
    if (!Array.isArray(content.security)) return
    if (!Array.isArray(spec.security)) {
        spec.security = clone(content.security)
        return
    }

    for (const requirement of content.security) {
        if (!spec.security.some(existing => isDeepStrictEqual(existing, requirement))) {
            spec.security.push(clone(requirement))
        }
    }
}

function mergeServers(spec, content) {
    if (!Array.isArray(content.servers)) return
    if (!Array.isArray(spec.servers)) {
        spec.servers = clone(content.servers)
        return
    }
    if (!isDeepStrictEqual(spec.servers, content.servers)) {
        throw topLevelConflict('servers', spec.servers, content.servers)
    }
}

function mergeComponents(spec, content) {
    if (!content.components || typeof content.components !== 'object' || Array.isArray(content.components)) return
    if (!spec.components || typeof spec.components !== 'object' || Array.isArray(spec.components)) {
        spec.components = clone(content.components)
        return
    }

    for (const [category, entries] of Object.entries(content.components)) {
        if (!Object.hasOwn(spec.components, category)) {
            spec.components[category] = clone(entries)
            continue
        }

        if (category.startsWith('x-') || !entries || typeof entries !== 'object' || Array.isArray(entries)) {
            if (!isDeepStrictEqual(spec.components[category], entries)) {
                throw topLevelConflict(`components/${category}`, spec.components[category], entries)
            }
            continue
        }

        if (!spec.components[category] || typeof spec.components[category] !== 'object' || Array.isArray(spec.components[category])) {
            spec.components[category] = clone(entries)
            continue
        }

        for (const [name, value] of Object.entries(entries)) {
            if (!Object.hasOwn(spec.components[category], name)) {
                spec.components[category][name] = clone(value)
                continue
            }
            if (!isDeepStrictEqual(spec.components[category][name], value)) {
                spec.components[category][name] = clone(value)
            }
        }
    }
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

            const resolvedRef = resolveRefs(resolved, spec, new Set(), depth + 1, options)
            const siblingEntries = Object.entries(obj).filter(([key]) => key !== '$ref')

            if (siblingEntries.length === 0 || !resolvedRef || typeof resolvedRef !== 'object' || Array.isArray(resolvedRef)) {
                return resolvedRef
            }

            const resolvedSiblings = {}
            for (const [key, value] of siblingEntries) {
                resolvedSiblings[key] = resolveRefs(value, spec, visited, depth, options)
            }

            return {
                ...resolvedRef,
                ...resolvedSiblings,
            }
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
    for (const field of Object.keys(content)) {
        if (content[field] === undefined) continue
        if (field === 'x-zdoc-fragment') continue

        if (field === 'components') {
            mergeComponents(spec, content)
        } else if (field === 'tags') {
            mergeTags(spec, content)
        } else if (field === 'security') {
            mergeSecurity(spec, content)
        } else if (field === 'servers') {
            mergeServers(spec, content)
        } else if (KEYED_MAP_FIELDS.has(field)) {
            mergeKeyedMap(spec, content, field)
        } else if (SINGLETON_FIELDS.has(field) || field.startsWith('x-')) {
            mergeSingleton(spec, content, field)
        }
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
            spec = clone(content)
            continue
        }

        mergeSpecification(spec, content)
    }

    return spec
}

module.exports = {
    loadSpecifications,
    mergeSpecification,
    resolveRefs,
}
