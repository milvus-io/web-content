# Custom Attributes Reference — apifox-docs

This document catalogs every custom attribute, frontmatter field, meta configuration file, and inline tag supported by the `apifox-docs` plugin. Use it as the single source of truth when authoring or editing OpenAPI specifications and plugin metadata.

---

## 1. OpenAPI `x-` Extensions

These attributes live inside the OpenAPI JSON files (`meta/openapi/*.json`) and are consumed at **build time** (by `refGen.js` and `s3Uploader.js`) and/or **runtime** (by the `RestSpecs` React component).

| Attribute | Scope | Build | Runtime | Description |
|-----------|-------|-------|---------|-------------|
| `x-i18n` | tags, operations, parameters, schemas, properties, examples | Yes | Yes | Provides localized translations for `summary`, `description`, and `example`. |
| `x-include-target` | tags, operations, parameters, schema properties, examples | Yes | Yes | Filters content by publication target (`zilliz` or `milvus`). |
| `x-include-langs` | tags, operations | Yes | — | Filters generated pages by language (`en-US`, `zh-CN`). |
| `x-beta` | operations, tags | Yes | — | Controls the beta/visibility badge (`DEPRECATED`, `FALSE`, `PRIVATE`). |
| `x-admonition` | operations, parameters, schema properties | Yes | Yes | Injects admonition (callout) blocks into generated docs and UI. |
| `x-tab-label` | `anyOf` / `oneOf` schema items | — | Yes | Overrides the default tab label when multiple request/response options are shown. |
| `x-target-response` | response examples | — | Yes | Links a response example to a specific selected response option. |
| `x-target-request` | request examples | — | Yes | Links a request example to a specific selected request option. |
| `x-target-lang` | request/response examples, parameter examples | Yes* | Yes | Filters examples by language (`en-US` or `zh-CN`). |
| `x-base-urls` | operation | — | Yes | Provides custom base URL configurations for an endpoint. **Honored only when `target === 'zilliz'`.** |
| `x-base-url-target` | parameters, schema properties, examples | — | Yes | Filters content by selected base URL `key`. Companion to `x-base-urls`. |
| `x-i18n-langs` | examples | No | No | Lists available i18n languages for an example block (data-only, not processed). |

*Build-time stripping in `s3Uploader.js` preserves `x-i18n` only when generating the `zh-CN` S3 artifact.

### 1.1 `x-i18n`

Provides translations for Chinese (`zh-CN`) documentation. At build time, `refGen.js` reads `x-i18n["zh-CN"].summary` and `x-i18n["zh-CN"].description` to generate Chinese pages. At runtime, `RestSpecs` reads `x-i18n` for property/parameter descriptions and examples.

```json
{
  "summary": "List Cloud Providers",
  "x-i18n": {
    "zh-CN": {
      "summary": "查看云服务提供商",
      "description": "本接口可列出所有可用的云服务商相关信息。"
    }
  }
}
```

### 1.2 `x-include-target`

Conditionally includes or excludes an item based on the publication target (`zilliz` or `milvus`). If the attribute is present and the current target is **not** in the array, the item is skipped.

```json
{
  "name": "Cloud Meta",
  "x-include-target": ["zilliz"]
}
```

Usage locations:
- **Tags**: Skip entire API groups.
- **Operations**: Skip individual endpoints.
- **Parameters / Properties**: Hide fields in the `RestSpecs` UI.
- **Examples**: Hide request/response examples.

### 1.2.1 `x-include-langs`

Conditionally includes tags or operations by documentation language at build time. If this attribute is present and the current language is not in the list, the page is not generated.

```json
{
  "summary": "Upgrade Project",
  "x-include-langs": ["en-US"]
}
```

Usage locations:
- **Tags**: Hide entire API groups for selected languages.
- **Operations**: Hide individual endpoints for selected languages.

### 1.3 `x-beta`

Controls the visibility badge shown on API reference pages. The effective value is resolved in this order:

1. Operation-level `x-beta`
2. Tag-level `x-beta`
3. `CONFIG.betaOverrides` in `refGen.js` (slug-based rules: `extract` and `merge` default to `PRIVATE`)
4. `CONFIG.betaDefaults` (`v1` → `DEPRECATED`, `v2` → `FALSE`)

```json
{
  "x-beta": "PRIVATE"
}
```

Valid values: `DEPRECATED`, `FALSE`, `PRIVATE`, `PUBLIC`.

### 1.4 `x-admonition`

Injects callout blocks (admonitions) into the documentation. Can be defined in the OpenAPI spec directly or merged from `meta/admonitions.json`.

```json
{
  "x-admonition": [
    {
      "type": "info",
      "title": "Note",
      "content": "This endpoint requires a Control Plane API key."
    }
  ]
}
```

The `RestSpecs` component renders these as `<Admonition>` components.

**Per-item i18n.** Each admonition entry supports a nested `x-i18n` for `title` and `content`. The `<Admonitions>` component resolves translations at runtime against the active `lang`, falling back to the default values when no translation is present. `type` is a semantic category (`info`, `warning`, `caution`, `danger`, `tip`) and is **not** translated.

```json
{
  "x-admonition": [
    {
      "type": "info",
      "title": "Note",
      "content": "This applies only to serving clusters on Zilliz Cloud.",
      "x-i18n": {
        "zh-CN": {
          "title": "注意",
          "content": "此项仅适用于 Zilliz Cloud 上的服务集群。"
        }
      }
    }
  ]
}
```

The same shape is honored for admonitions defined in `meta/admonitions.json`, since both sources are concatenated into a single array before runtime resolution.

### 1.5 `x-tab-label`

Used inside `anyOf` or `oneOf` schemas to give human-readable names to tabs that represent alternative request/response shapes.

```json
{
  "oneOf": [
    {
      "x-tab-label": "success",
      "type": "object"
    },
    {
      "x-tab-label": "failure",
      "type": "object"
    }
  ]
}
```

### 1.6 `x-target-response` and `x-target-request`

Links an example to a specific response or request option tab. The `RestSpecs` component filters examples by matching these values to the currently selected tab.

```json
{
  "examples": {
    "success": {
      "value": { "code": 0 },
      "x-target-response": "OPTION 1"
    }
  }
}
```

### 1.7 `x-target-lang`

Filters examples by language. Used in `ExampleResponses`, `ExampleRequests`, and `chooseParamExample` in `utils.js`.

```json
{
  "examples": {
    "en": {
      "value": { "name": "cluster-1" },
      "x-target-lang": "en-US"
    }
  }
}
```

### 1.8 `x-base-urls`

Provides one or more custom base URLs for an endpoint. When present and the publication target is `zilliz`, the `RestSpecs` component renders a tabbed base URL selector in place of the auto-detected default. Implemented in `src/components/RestSpecs/index.js` (`BaseURL` component).

**Schema** — either an inline array of objects or a `$ref` to a reusable definition stored under `components/x-base-urls/`:

**Inline (per operation):**

```json
{
  "x-base-urls": [
    {
      "key": "cluster",
      "label": "Cluster Endpoint",
      "url": "https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530",
      "prompt": "Use the cluster endpoint if you are using serving clusters.",
      "x-i18n": {
        "zh-CN": {
          "label": "集群端点",
          "prompt": "如果您使用的是服务集群，请使用集群端点。"
        }
      },
      "shell": "export CLUSTER_ENDPOINT=\"https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530\""
    },
    {
      "key": "on-demand-compute",
      "label": "On-Demand Compute Endpoint",
      "url": "https://{project-id}.{region}.api.zillizcloud.com",
      "prompt": "Use the on-demand compute endpoint if you are using on-demand clusters.",
      "x-i18n": {
        "zh-CN": {
          "label": "按需计算端点",
          "prompt": "如果您使用的是按需集群，请使用按需计算端点。"
        }
      },
      "shell": "export ON_DEMAND_COMPUTE_ENDPOINT=\"https://{project-id}.{region}.api.zillizcloud.com\""
    }
  ]
}
```

**Reusable `$ref` (recommended for shared endpoints):**

Define once in any spec file:

```json
{
  "components": {
    "x-base-urls": {
      "ZillizVectorV2": [
        {
          "key": "cluster",
          "label": "Cluster Endpoint",
          ...
        }
      ]
    }
  }
}
```

Reference in any operation:

```json
{
  "x-base-urls": {
    "$ref": "#/components/x-base-urls/ZillizVectorV2"
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `key` | No | Stable identifier referenced by `x-base-url-target` filters on parameters and properties. Required if you plan to gate any content by base URL. |
| `label` | Yes | Text shown on the radio tab. The tabs row is rendered only when there are 2+ entries. |
| `url` | Yes | Displayed as the base URL value and substituted into the curl example when the user selects this tab. |
| `prompt` | No | HTML rendered as a bullet (`<li>`) at the top of the info admonition, above the default base URL content. Supports i18n via `x-i18n`. |
| `shell` | Yes | Shell snippet rendered in the code block beneath the panel (e.g. `export FOO=""`). |

**Behavior:**

- **Target gate:** Only applied when `target === 'zilliz'`. For `target === 'milvus'`, the array is ignored (`index.js:637` forces `baseUrls` to `null`) and the build falls back to `getBaseUrl()` in `utils.js`, which returns the global `http://localhost:19530`. There is no per-endpoint Milvus override mechanism today.
- **Default selection:** The first entry (index 0) is the default selection on first paint, in both the header panel and the curl example. `RestSpecs` initializes its `selectedBaseUrl` state to `baseUrls[0]` when `target === 'zilliz'`, so the curl URL and the header panel agree from the very first render.
- **Prompt composition:** The default base URL admonition (e.g. `admonition.cluster.endpoint.v2`, resolved by `getBaseUrl()`) is **not replaced** by the per-entry `prompt`. Both are rendered inside a single info admonition — the per-tab `prompt` rendered at the top as a bullet (`<ul><li>…</li></ul>`), the default content below it — so the spec author can highlight tab-specific context without losing the generic guidance. If the entry omits `prompt`, only the default appears.
- **I18n per entry:** Each `x-base-urls` entry supports `x-i18n` translations for `label`, `prompt`, and `url`. The `BaseURL` component resolves these at runtime using the active language (`lang`), e.g. `current["x-i18n"]["zh-CN"]["label"]` takes precedence over the default `label`.
- **No fallback:** If `x-base-urls` is missing or empty, the component falls through to `getBaseUrl()` exactly as if the attribute were absent.

**S3 stripping:** Like all `x-*` keys, `x-base-urls` is removed by `s3Uploader.js` before upload, so it never appears in the public S3 specs.

### 1.9 `x-base-url-target`

Filters parameters and schema properties by the currently selected base URL. Companion to `x-base-urls` — only meaningful on operations that also define `x-base-urls` with `key` fields.

```json
{
  "name": "clusterId",
  "in": "query",
  "x-base-url-target": ["on-demand-compute"]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| value | Yes | Array of `key` strings drawn from the operation's `x-base-urls` entries. |

**Behavior:**

- **Match check:** A parameter or property with `x-base-url-target: ["on-demand-compute"]` is shown only when the user has the `on-demand-compute` tab selected. Switching tabs re-renders the parameter list.
- **Default selection:** The parent `RestSpecs` initializes to `baseUrls[0]` when `target === 'zilliz'`, so the first base URL's gated content is the default.
- **Hidden when no base URL is selected:** If the operation has no `x-base-urls` (or `target === 'milvus'`), the selected base URL is `null` and any parameter with this attribute is hidden. Use `x-include-target` instead when you need a parameter that is unconditional within a target.
- **Combines with `x-include-target`:** Both filters are applied — a parameter with `x-include-target: ["zilliz"]` and `x-base-url-target: ["on-demand-compute"]` is shown only when the target is zilliz **and** the selected base URL key is `on-demand-compute`.
- **Curl example reflection:** The gated parameter follows normal `required` semantics. A query parameter with `required: true` and a `x-base-url-target` match is appended to the curl URL (e.g., `?clusterId=<example>`) only when its base-url tab is selected; switching tabs removes it again. Since the `required` flag is interpreted as "required *when shown*", you can reasonably mark a parameter `required: true` even though it is logically optional from the API's perspective — the gate ensures it is shown only in the context where it is actually needed.
- **Scope:** Implemented for top-level `parameters` (`header`, `path`, `query`) in `validParams`. Request-body schema property gating is not yet implemented.

---

## 2. Generated MDX Frontmatter

These fields are written into every generated `.mdx` file by the Nunjucks templates (`templates/reference.mdx` and `templates/group.mdx`). They control Docusaurus sidebar behavior, SEO metadata, and page layout.

| Field | Template | Description |
|-------|----------|-------------|
| `beta` | `reference.mdx`, `group.mdx` | Beta/visibility badge (`DEPRECATED`, `FALSE`, `PRIVATE`). |
| `notebook` | `group.mdx` | Static flag, always `FALSE`. |
| `sidebar_position` | `reference.mdx`, `group.mdx` | Controls Docusaurus sidebar ordering. |
| `sidebar_label` | `reference.mdx` | Custom sidebar text for the endpoint page. |
| `sidebar_custom_props` | `reference.mdx` | Injects `{ badges: ['<method>'] }` to show the HTTP method badge. |
| `hide_table_of_contents` | `reference.mdx` | Hides the Docusaurus TOC on REST reference pages (`true`). |
| `displayed_sidebar` | `reference.mdx`, `group.mdx` | Selects the sidebar config (`restfulSidebar` for EN, `referenceSidebar` for ZH). |
| `slug` | `reference.mdx`, `group.mdx` | Custom URL path (e.g., `/restful/{{page_slug}}`). |
| `description` | `reference.mdx`, `group.mdx` | SEO meta description. |
| `keywords` | `reference.mdx`, `group.mdx` | SEO keywords injected into page metadata. |
| `title` | `reference.mdx` | Page title (`{{ page_title }} \| RESTful`). |

### 2.1 Sidebar Position Resolution

For **endpoints**, `sidebar_position` is resolved in this order:
1. `meta/positions.json` → `endpoints[page_slug]`
2. Auto-incremented counter per tag (fallback)

For **groups (tags)**, `sidebar_position` is resolved in this order:
1. `meta/positions.json` → `tags[slug]`
2. Index of the tag in the `tags` array (fallback)

---

## 3. Meta Configuration Files

The `meta/` directory contains JSON files that override or augment OpenAPI spec behavior without modifying the spec files themselves.

### 3.1 `meta/descriptions.json`

Provides custom descriptions for tag groups and supports Milvus name overrides.

```json
[
  {
    "name": "cloud-meta",
    "description": "Endpoints for retrieving cloud provider and region metadata.",
    "milvus": {
      "name": "cloud-meta"
    }
  }
]
```

| Field | Description |
|-------|-------------|
| `name` | Slug of the tag group. |
| `description` | Custom description text used in the group MDX page. |
| `milvus.name` | Overrides the folder name when `target === 'milvus'`. |

### 3.2 `meta/positions.json`

Overrides sidebar positions for tags and endpoints.

```json
{
  "tags": {
    "cloud-meta": 1,
    "cluster-operations": 2
  },
  "endpoints": {
    "list-cloud-providers": 1,
    "list-cloud-regions": 2
  }
}
```

### 3.3 `meta/admonitions.json`

Injects admonitions by endpoint slug. Supports page-level, parameter-level, and property-level admonitions.

```json
{
  "create-cluster": {
    "admonitions": [
      { "type": "warning", "title": "Quota", "content": "You can create up to 10 clusters per project." }
    ],
    "parameters": {
      "projectId": [
        { "type": "info", "title": "Tip", "content": "Find your project ID in the console." }
      ]
    },
    "properties": {
      "requestBody.clusterName": [
        { "type": "caution", "title": "Naming", "content": "Must be unique within the project." }
      ]
    }
  }
}
```

Admonitions from `meta/admonitions.json` are **merged** with spec-level `x-admonition` attributes.

### 3.4 `meta/titles.json`

Maps Chinese page titles to URL slugs. Required when generating Chinese docs (`lang === 'zh-CN'`).

```json
{
  "查看云服务提供商": "list-cloud-providers",
  "查看云区域": "list-cloud-regions"
}
```

### 3.5 `meta/fileNameRuleSet.json`

Rules for transforming page slugs when the publication target is `milvus`.

```json
[
  {
    "match": "endsWith",
    "path": "-clusters",
    "name": "clusters"
  },
  {
    "match": "contains",
    "path": "project",
    "name": "projects"
  },
  {
    "match": "removeAndCapitalize",
    "path": "-v2",
    "name": ""
  }
]
```

| Match Type | Behavior |
|------------|----------|
| `endsWith` | If slug ends with `path`, replace entire slug with `name`. |
| `contains` | If slug contains `path`, replace entire slug with `name`. |
| `removeAndCapitalize` | If slug contains `path`, remove it and convert the rest to Title Case. |

---

## 4. Inline Conditional Tags

These HTML-like tags can be used inside description strings in OpenAPI specs to conditionally include or exclude text based on the publication target.

### 4.1 `<include>`

Includes the wrapped text **only if** the current target matches.

```markdown
<include target="zilliz">This feature is available on Zilliz Cloud.</include>
```

### 4.2 `<exclude>`

Includes the wrapped text **only if** the current target does **not** match.

```markdown
<exclude target="milvus">This feature is not available in Milvus standalone.</exclude>
```

### Processing

- Build time: `refGen.js` → `__filter_content()` → `__match_filter_tags()`
- Runtime: `RestSpecs/utils.js` → `textFilter()`

Both processors strip the tags and return the inner text if the condition is satisfied, or remove the entire block if it is not.

---

## 5. CLI Options

The plugin exposes a CLI command with the following options:

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--specifications` | `-s` | — | Path to OpenAPI spec file(s). Can be a single `.json` file or a directory of `.json` files that will be merged. |
| `--lang` | `-l` | `en-US` | Language of the generated docs (`en-US` or `zh-CN`). |
| `--output_path` | `-o` | `reference/api/restful/restful` | Target directory for generated `.mdx` files. |
| `--strings` | `-i` | — | Localization strings file for Chinese docs (required when `lang === 'zh-CN'`). |
| `--target` | `-t` | `zilliz` | Publication target (`zilliz` or `milvus`). |
| `--upload-s3` | — | `false` | Upload merged OpenAPI specs to S3 and update the about page. |

---

## 6. Attribute Resolution Quick Reference

### Beta Tag Resolution Order

1. Operation `x-beta`
2. Tag `x-beta`
3. `CONFIG.betaOverrides` (slug match)
4. `CONFIG.betaDefaults` (API version)

### Sidebar Position Resolution Order

**Endpoints:**
1. `meta/positions.json` → `endpoints[slug]`
2. Auto-increment per tag

**Groups:**
1. `meta/positions.json` → `tags[slug]`
2. Tag array index

### Admonition Merge Order

1. Spec-level `x-admonition` (operation, parameter, or property)
2. Meta-level `meta/admonitions.json` (merged after spec-level)

---

## 7. Known Caveats

- **`x-18n` (typo)**: A handful of places in `25-metrics-and-alerts-v2.json` use `x-18n` instead of `x-i18n`. This is **not** processed by the plugin and should be corrected to `x-i18n`.
- **V1 Auto-Deprecation**: All `v1` endpoints are automatically marked as `deprecated: true` in `refGen.js` regardless of the `x-beta` value.
- **S3 Stripping**: `s3Uploader.js` strips **all** `x-*` keys before upload, except that `x-i18n` is used to inline Chinese translations when `lang === 'zh-CN'`.
