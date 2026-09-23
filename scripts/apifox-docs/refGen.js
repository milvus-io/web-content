const nunjucks = require("nunjucks")
const fs = require('node:fs')
const path = require('node:path')
const { resolveRefs } = require('./specLoader')

const META_DIR = path.join(__dirname, 'meta')
const TEMPLATES_DIR = path.join(__dirname, 'templates')
const I18N_LOCALE = /^[a-z]{2}(?:-[A-Z]{2})?$/
const I18N_FIELDS = new Set([
  'content',
  'description',
  'enum',
  'example',
  'label',
  'name',
  'prompt',
  'summary',
  'title',
  'url',
])

const planeConfig = JSON.parse(fs.readFileSync(path.join(META_DIR, 'plane-config.json'), 'utf-8'))

const CONFIG = {
  dataPlaneKeywords: planeConfig.dataPlaneKeywords || {},
  controlPlaneKeywords: planeConfig.controlPlaneKeywords,
  betaDefaults: { v1: 'DEPRECATED', v2: 'FALSE' },
  betaOverrides: { extract: 'PRIVATE', merge: 'PRIVATE' },
  maxRefDepth: 20,
}

class refGen {
  constructor(options) {
    this.options = options
    this.options.parents = []
    this.routeRegistry = new Map()

    this.validateSpec(options.specifications)

    for (const x of Object.keys(this.options.specifications.tags)) {
      this.options.parents.push(this.options.specifications.tags[x].name)
    }

    this.descriptions = JSON.parse(fs.readFileSync(path.join(META_DIR, 'descriptions.json'), 'utf-8'))

    this.positions = { tags: {}, endpoints: {} }
    try {
      this.positions = JSON.parse(fs.readFileSync(path.join(META_DIR, 'positions.json'), 'utf-8'))
    } catch (err) {
      // Optional file — leave defaults empty
    }

    this.admonitions = {}
    try {
      this.admonitions = JSON.parse(fs.readFileSync(path.join(META_DIR, 'admonitions.json'), 'utf-8'))
    } catch (err) {
      // Optional file — leave defaults empty
    }
  }

  validateSpec(spec) {
    const validateI18n = (value, jsonPath) => {
      if (!value || typeof value !== 'object') {
        return
      }
      if (Object.hasOwn(value, 'x-i18n')) {
        const i18n = value['x-i18n']
        if (!i18n || typeof i18n !== 'object' || Array.isArray(i18n)) {
          throw new Error(`Invalid x-i18n at ${jsonPath}["x-i18n"]: expected an object keyed by locale`)
        }
        for (const [locale, localized] of Object.entries(i18n)) {
          const localePath = `${jsonPath}["x-i18n"][${JSON.stringify(locale)}]`
          if (!I18N_LOCALE.test(locale)) {
            throw new Error(`Invalid x-i18n locale at ${localePath}: expected a language tag such as zh-CN`)
          }
          if (!localized || typeof localized !== 'object' || Array.isArray(localized)) {
            throw new Error(`Invalid x-i18n value at ${localePath}: expected an object of localized fields`)
          }
          for (const field of Object.keys(localized)) {
            if (!I18N_FIELDS.has(field)) {
              throw new Error(`Invalid x-i18n field at ${localePath}[${JSON.stringify(field)}]: unsupported localized field`)
            }
          }
        }
      }
      if (Array.isArray(value)) {
        value.forEach((child, index) => validateI18n(child, `${jsonPath}[${index}]`))
        return
      }
      for (const [key, child] of Object.entries(value)) {
        if (key !== 'x-i18n') validateI18n(child, `${jsonPath}[${JSON.stringify(key)}]`)
      }
    }

    validateI18n(spec, '$')
    if (!spec.tags || !Array.isArray(spec.tags) || spec.tags.length === 0) {
      throw new Error('OpenAPI spec must have a non-empty "tags" array')
    }
    for (let i = 0; i < spec.tags.length; i++) {
      if (!spec.tags[i].name || typeof spec.tags[i].name !== 'string') {
        throw new Error(`Tag at index ${i} is missing a "name" string`)
      }
    }
    if (!spec.paths || typeof spec.paths !== 'object' || Object.keys(spec.paths).length === 0) {
      throw new Error('OpenAPI spec must have a non-empty "paths" object')
    }
    for (const [path, methods] of Object.entries(spec.paths)) {
      const httpMethods = Object.keys(methods).filter(m => ['get', 'post', 'put', 'delete', 'patch'].includes(m))
      if (httpMethods.length === 0) {
        console.warn(`Warning: Path "${path}" has no HTTP methods`)
      }
      for (const method of httpMethods) {
        if (!methods[method].summary) {
          console.warn(`Warning: ${method.toUpperCase()} ${path} is missing a "summary"`)
        }
      }
    }
  }

  getPlane(slug, target) {
    if (this.options.apiSurface) return this.options.apiSurface
    const normalizedSlug = slug.toLowerCase()
    const dataKeywords = CONFIG.dataPlaneKeywords[target] || CONFIG.dataPlaneKeywords.zilliz || []
    if (dataKeywords.some(k => normalizedSlug.includes(k.toLowerCase()))) {
      return 'data-plane'
    }

    const controlKeywords = CONFIG.controlPlaneKeywords[target] || CONFIG.controlPlaneKeywords.zilliz || []
    return controlKeywords.some(k => normalizedSlug.includes(k.toLowerCase())) ? 'control-plane' : 'data-plane'
  }

  getBetaTag(slug, version) {
    for (const [keyword, tag] of Object.entries(CONFIG.betaOverrides)) {
      if (slug.includes(keyword)) return tag
    }
    return CONFIG.betaDefaults[version] || 'FALSE'
  }

  shouldIncludeByLang(entity) {
    const includeLangs = entity?.['x-include-langs']
    if (!includeLangs) {
      return true
    }

    const langs = Array.isArray(includeLangs) ? includeLangs : [includeLangs]
    return langs.includes(this.options.lang)
  }

  lookupDescription(slug, specDescription) {
    const entry = this.descriptions.find(x => x.name === slug)
    if (!entry) {
      console.warn(`Warning: No description entry for slug "${slug}", falling back to spec description`)
      return specDescription || ''
    }
    return entry?.["x-i18n"]?.[this.options.lang]?.description || entry.description
  }

  lookupMilvusName(slug) {
    const entry = this.descriptions.find(x => x.name === slug)
    return entry?.milvus?.name || null
  }

  toSlug(name) {
    return name.replace("&", "and").split(' ').join('-').replace(/\(|\)|,/g, '').toLowerCase()
  }

  async write_refs() {
    const { lang, target, parents, specifications } = this.options

    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(TEMPLATES_DIR),
      {
        autoescape: false,
      }
    )

    const template = env.getTemplate("reference.mdx")
    const autoPositions = {}
    for (const page_url of Object.keys(specifications.paths)) {
      for (const method of Object.keys(specifications.paths[page_url])) {
        const specification = resolveRefs(specifications.paths[page_url][method], specifications)

        if (specification?.["x-include-target"] && !specification["x-include-target"].includes(target)) {
          continue
        }
        if (!this.shouldIncludeByLang(specification)) {
          continue
        }

        const tagObj = specifications.tags.find(t => t.name === specification.tags?.[0])
        if (tagObj?.["x-include-target"] && !tagObj["x-include-target"].includes(target)) {
          continue
        }
        if (!this.shouldIncludeByLang(tagObj)) {
          continue
        }

        const i18n = specification?.["x-i18n"]?.[lang]
        const localized = lang === "zh-CN" || lang === "ja-JP"
        const page_title = localized ? (i18n?.summary || specification.summary) : specification.summary
        const rawDescription = localized ? (i18n?.description || specification.description) : specification.description
        const page_excerpt = this.__filter_content(rawDescription ?? '', target).split('<')[0]
        var page_parent = parents.filter(x => x === specification.tags[0])[0]
        if (!page_parent) {
          console.warn(`Warning: No matching parent tag for "${specification.tags?.[0]}" in ${method.toUpperCase()} ${page_url}, skipping`)
          continue
        }
        const tag = page_parent

        page_parent = this.toSlug(page_parent)
        if (target === 'milvus') {
          const name = this.lookupMilvusName(page_parent)
          if (name) {
            page_parent = name
          }
        }
        const version = page_parent.includes('v2') ? 'v2' : 'v1'
        var slug_suffix = version === 'v2' ? '-v2' : ''
        if (target === 'milvus') {
          slug_suffix = ''
        }
        var upper_folder = this.getPlane(page_parent, target)

        const slug_title = lang === "zh-CN" ? page_title : specification.summary
        var page_slug = (this.get_slug(slug_title, target)) + slug_suffix
        const page_route = `/restful/${page_slug}`
        // zdoc sites publish every page under a flat /restful/<slug> URL, so
        // slug uniqueness is enforced there. milvus.io namespaces pages by
        // version and group folder — its slug convention drops the -v2 suffix
        // on purpose, so same-verb v1/v2 pages (List, Get, Insert, ...) are
        // expected, and its real URL space is the physical page path. Only
        // collisions within that path would overwrite an actual file.
        const route_key = target === 'milvus'
            ? `${version}/${upper_folder}/${page_parent}/${page_slug}`
            : page_route
        const existingRoute = this.routeRegistry.get(route_key)
        if (existingRoute) throw new Error(`REST_PAGE_ROUTE_CONFLICT: ${route_key} for ${existingRoute} and ${method}`)
        this.routeRegistry.set(route_key, `${method.toUpperCase()} ${page_url}`)

        // Check x-beta on operation, then tag, then fall back to defaults
        let beta_tag = specification['x-beta']
        if (!beta_tag && tagObj?.['x-beta']) {
          beta_tag = tagObj['x-beta']
        }
        if (!beta_tag) {
          beta_tag = this.getBetaTag(page_slug, version)
        }

        // Auto-deprecate all v1 endpoints
        if (version === 'v1') {
          specification.deprecated = true
        }

        let sidebar_position
        const metaPos = this.positions.endpoints?.[page_slug]
        if (metaPos !== undefined) {
          sidebar_position = metaPos
        } else {
          if (!autoPositions[tag]) {
            autoPositions[tag] = 0
          }
          sidebar_position = autoPositions[tag]
          autoPositions[tag]++
        }

        const page_method = method.toLowerCase()

        const meta = this.admonitions[page_slug] || {}

        // 1. Page-level admonitions
        const specAdmonitions = specification['x-admonition'] || []
        const pageMetaAdmonitions = meta.admonitions || []
        const mergedPage = [...specAdmonitions, ...pageMetaAdmonitions]
        if (mergedPage.length > 0) {
          specification['x-admonition'] = mergedPage
        }

        // 2. Parameter-level admonitions
        if (specification.parameters && meta.parameters) {
          for (const param of specification.parameters) {
            const paramMeta = meta.parameters[param.name]
            if (paramMeta && paramMeta.length > 0) {
              param['x-admonition'] = [...(param['x-admonition'] || []), ...paramMeta]
            }
          }
        }

        // 3. Property-level admonitions
        const injectPropertyAdmonitions = (schema, propertyMap) => {
          if (!schema || !propertyMap) return
          for (const [path, admonitions] of Object.entries(propertyMap)) {
            const parts = path.split('.')
            let current = schema
            for (let i = 0; i < parts.length; i++) {
              if (!current) break
              if (i === parts.length - 1) {
                if (current.properties && current.properties[parts[i]]) {
                  const prop = current.properties[parts[i]]
                  prop['x-admonition'] = [...(prop['x-admonition'] || []), ...admonitions]
                }
              } else {
                if (current.properties && current.properties[parts[i]]) {
                  current = current.properties[parts[i]]
                } else if (current.items) {
                  current = current.items
                } else {
                  break
                }
              }
            }
          }
        }

        if (meta.properties) {
          if (specification.requestBody?.content?.['application/json']?.schema) {
            injectPropertyAdmonitions(
              specification.requestBody.content['application/json'].schema,
              meta.properties.requestBody
            )
          }
          if (specification.responses?.['200']?.content?.['application/json']?.schema) {
            injectPropertyAdmonitions(
              specification.responses['200'].content['application/json'].schema,
              meta.properties.responses
            )
          }
        }

        const specs = JSON.stringify(specification)

        const t = template.render({
          page_title: page_title + (version === 'v2' ? ' (V2)' : ' (V1)'),
          page_excerpt,
          page_slug,
          page_route,
          beta_tag,
          page_url,
          page_method,
          specs,
          sidebar_position,
          target,
          lang,
        }).replaceAll(/<br>/g, '<br/>')

        fs.writeFileSync(`${this.options.target_path}/${version}/${upper_folder}/${page_parent}/${page_slug}.mdx`, t)
      }
    }
  }

  make_groups() {
    const { specifications, target, target_path } = this.options
    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(TEMPLATES_DIR),
      { autoescape: false }
    )

    const template = env.getTemplate("group.mdx")

    for (const group of Object.keys(specifications.tags)) {
      if (specifications.tags[group]['x-include-target'] && !(specifications.tags[group]['x-include-target']?.includes(target))) continue;
      if (!this.shouldIncludeByLang(specifications.tags[group])) continue;

      const slug = this.toSlug(specifications.tags[group].name)
      const version = slug.includes('v2') ? 'v2' : 'v1'
      var upper_folder = this.getPlane(slug, target)

      console.log(slug)
      const group_name = version === 'v2' ? specifications.tags[group].name.slice(0, -5) : specifications.tags[group].name
      const description = this.lookupDescription(slug, specifications.tags[group].description)

      const tagName = specifications.tags[group].name
      let position
      const metaPos = this.positions.tags?.[slug]
      if (metaPos !== undefined) {
        position = metaPos
      } else {
        position = specifications.tags.map(x => x.name).indexOf(tagName)
      }

      // Check x-beta on tag, then fall back to defaults
      let beta_tag = specifications.tags[group]?.['x-beta']
      if (!beta_tag) {
        beta_tag = this.getBetaTag(slug, version)
      }

      const t = template.render({
        group_name: group_name + (version === 'v2' ? ' (V2)' : ' (V1)'),
        position,
        slug,
        beta_tag,
        description,
        group_route: `/restful/${slug}`
      })

      var folder_path = `${target_path}/${version}/${upper_folder}/${slug}`

      if (target === 'milvus') {
        const name = this.lookupMilvusName(slug)
        if (name) {
          folder_path = `${target_path}/${version}/${upper_folder}/${name}`
        }
      }

      if (!fs.existsSync(folder_path)) {
        fs.mkdirSync(folder_path, { recursive: true })
      }

      if (target === 'zilliz') {
        if (!fs.existsSync(`${target_path}/${version}/${version}.mdx`)) {
          fs.writeFileSync(`${target_path}/${version}/${version}.mdx`, template.render({
            group_name: version === 'v2' ? 'V2' : 'V1',
            position: version === 'v2' ? 1 : 2,
            slug: version,
            group_route: `/restful/${version}`,
            beta_tag: CONFIG.betaDefaults[version],
            description: this.lookupDescription(version)
          }))
        }

        if (!fs.existsSync(`${target_path}/${version}/${upper_folder}/${upper_folder}.mdx`)) {
          const title = upper_folder.startsWith('control') ? 'Control Plane' : 'Data Plane'
          const pos = upper_folder.startsWith('control') ? 1 : 2
          const desc = upper_folder.startsWith('control') ? 'This provide API endpoints for managing Zilliz Cloud clusters and resources.' : 'This provide API endpoints for managing data stored in Zilliz Cloud clusters.'

          fs.writeFileSync(`${target_path}/${version}/${upper_folder}/${upper_folder}.mdx`, template.render({
            group_name: title + (version === 'v2' ? ' (V2)' : ' (V1)'),
            position: pos,
            slug: `${upper_folder}-${version}`,
            group_route: `/restful/${upper_folder}-${version}`,
            beta_tag: CONFIG.betaDefaults[version],
            description: desc
          }))
        }

        fs.writeFileSync(`${folder_path}/${slug}.mdx`, t)
      }
    }
  }

  get_slug(page_title, target) {
    console.log(page_title)
    var page_slug = 0
    const { lang } = this.options
    if (lang == 'zh-CN') {
      const titles = JSON.parse(fs.readFileSync(path.join(META_DIR, 'titles.json'), 'utf-8'))
      page_slug = titles[page_title]
      if (!page_slug) {
        throw new Error(`Missing Chinese title mapping for: "${page_title}" in titles.json`)
      }
    } else {
      page_slug = page_title.replace("&", "and").split(' ').join('-').replace(/\(|\)/g, '').toLowerCase()
    }

    if (target === 'milvus') {
      const ruleSet = JSON.parse(fs.readFileSync(path.join(META_DIR, 'fileNameRuleSet.json'), 'utf-8'))
      var slug = undefined
      for (let rule of ruleSet) {
        switch (rule.match) {
          case 'endsWith':
            if (page_slug.endsWith(rule.path)) {
              slug = rule.name
            }
            break;
          case 'contains':
            if (page_slug.includes(rule.path)) {
              slug = rule.name
            }
            break;
          case 'removeAndCapitalize':
            if (page_slug.includes(rule.path)) {
              slug = page_slug.replace(rule.path, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            }
            break;
        }

        if (slug) {
          page_slug = slug;
          break;
        }
      }
    }

    return page_slug
  }

  __filter_content (markdown, targets) {
    if (typeof markdown !== 'string') {
      return ''
    }

    const matches = this.__match_filter_tags(markdown)

    if (matches.length > 0) {
        var preText = markdown.slice(0, matches[0].startIndex)
        var matchText = markdown.slice(matches[0].startIndex, matches[0].endIndex)
        var postText = markdown.slice(matches[0].endIndex)
        var isTargetValid = targets.split('.').includes(matches[0].target.trim())
        var startTagLength = `<${matches[0].tag} target="${matches[0].target}">`.length
        var endTagLength = `</${matches[0].tag}>`.length

        if (matches[0].tag == 'include' && isTargetValid || matches[0].tag == 'exclude' && !isTargetValid) {
            matchText = matchText.slice(startTagLength, -endTagLength)
        }

        if (matches[0].tag == 'include' && !isTargetValid || matches[0].tag == 'exclude' &&  isTargetValid) {
            matchText = ""
        }

        markdown = this.__filter_content(preText + matchText + postText, targets)
    }

    return markdown.replace(/(\s*\n){3,}/g, '\n\n')
        .replace(/<br>/g, '<br/>')
        .replace(/(<br\/>){2,}/, "<br/>")
        .replace("<br\/></p>", "</p>")
        .replace(/\n\s*<tr>\n(\s*<td.*><p><\/p><\/td>\n)*\s*<\/tr>/g, '');
  }

  __match_filter_tags(markdown) {
      const startTagRegex = /<(include|exclude) target="(.+?)"/gm
      const endTagRegex = /<\/(include|exclude)>/gm
      const matches = [... markdown.matchAll(startTagRegex)]
      var returns = []

      matches.forEach(match => {
          var tag = match[1]
          var rest = markdown.slice(match.index)

          var closeTagRegex = new RegExp(`</${tag}>`, 'gm')
          var closeTagMatch = [... rest.matchAll(closeTagRegex)]

          var startIndex = match.index
          var endIndex = 0

          for (let i = 0; i < closeTagMatch.length; i++) {
              var t = markdown.slice(startIndex, startIndex+closeTagMatch[i].index+closeTagMatch[i][0].length)

              var startCount = t.match(startTagRegex) ? t.match(startTagRegex).length : 0
              var endCount = t.match(endTagRegex) ? t.match(endTagRegex).length : 0

              if (startCount === endCount) {
                  endIndex = startIndex + closeTagMatch[i].index + closeTagMatch[i][0].length
                  break
              }
          }

          returns.push({
              tag: tag,
              target: match[2],
              startIndex: startIndex,
              endIndex: endIndex
          })
      })

      return returns
  }

}

module.exports = refGen
