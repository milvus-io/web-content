# Scripts

This folder contains the generation tools used to import documentation from
Feishu/Lark and Apifox into this repository.

Run commands from this directory unless a command says otherwise:

```bash
cd scripts
npm ci
```

## Configuration

The main configuration file is `config.json`.

### Manual entries

Feishu/Lark manuals are configured under `milvus.manuals`:

```json
{
  "milvus": {
    "manuals": {
      "pymilvus-v2.6.x": {
        "base": "BASE_TOKEN:TABLE_ID",
        "sourceType": "drive",
        "language": "python",
        "targets": {
          "outputDir": "API_Reference/pymilvus/v2.6.x",
          "imageDir": "assets"
        },
        "images": {
          "alt_texts": []
        }
      }
    }
  }
}
```

Fields:

- `base`: Feishu bitable app token and table ID, separated by `:`.
- `sourceType`: `wiki` for Milvus guide content, or `drive` for SDK reference manuals.
- `language`: SDK language hint. Used by SDK manuals.
- `targets.outputDir`: output directory relative to the repository root.
- `targets.menuStructure`: menu JSON to update. Used by guide manuals.
- `targets.imageDir`: image output directory used in generated Markdown links.
- `images.alt_texts`: image alt text cache. The generator updates this field when it runs.

To add or change a manual:

1. Edit or add an entry under `milvus.manuals`.
2. Use a stable manual name such as `pymilvus-v2.6.x` or `java-v3.0.x`.
3. Point `base` to the Feishu bitable that contains the manual records.
4. Set `targets.outputDir` to the generated docs destination.
5. Run the manual publish command and review both generated docs and `config.json`.

### REST API entries

REST API reference generation is configured under `apifox.restful`:

```json
{
  "apifox": {
    "restful": {
      "milvus-v3.0.x": {
        "specifications": "scripts/apifox-docs/meta/openapi",
        "lang": "en-US",
        "target": "milvus",
        "targets": {
          "outputDir": "API_Reference_MDX/milvus-restful/v3.0.x"
        }
      }
    }
  }
}
```

Use `node fetch-restful-docs.js -e <entry>` to generate one configured entry.
CLI flags override values from `config.json`.

## Environment

Feishu/Lark publishing requires API credentials. In local runs, put them in
`scripts/.env` or export them in the shell:

```bash
FEISHU_HOST=https://open.feishu.cn
APP_ID=...
APP_SECRET=...
IMAGE_BED_URL=https://zdoc-images.s3.us-west-2.amazonaws.com
```

Optional variables used by image and OpenAPI uploads:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_BUCKET`
- `S3_PREFIX`
- `FIGMA_API_KEY`
- `SPACE_ID`
- `API_COMPOSE_BLOCK_TYPE_ID`

## Publish Manuals

Manual publishing is handled by `lark-docs/index.js`.

Publish every document in a manual:

```bash
node lark-docs/index.js -c config.json -m pymilvus-v2.6.x --all
```

Publish a single document by title:

```bash
node lark-docs/index.js -c config.json -m guides -d "Install Milvus" -o getstarted/install_milvus.md
```

Publish all children under a parent document:

```bash
node lark-docs/index.js -c config.json -m guides -d "Get Started" --recursive
```

Useful options:

- `-m, --manual <manual>`: manual name from `config.json`.
- `-d, --doc <doc>`: document title or parent node title.
- `-o, --output <output>`: output path relative to `targets.outputDir`.
- `-p, --position <position>`: sidebar position when adding a new guide page.
- `-r, --recursive`: publish all child documents under `--doc`.
- `-a, --all`: publish all top-level categories.
- `--skipImageDown`: keep existing image links and skip image download.
- `--dry-run`: scan SDK manuals for stale links without writing files.

Package shortcuts are available for common SDK manuals:

```bash
npm run fetch-sdk-docs:pymilvus:v2.6
npm run fetch-sdk-docs:java:v2.6
npm run fetch-sdk-docs:node:v2.6
npm run fetch-sdk-docs:go:v2.6
npm run fetch-sdk-docs:cpp:v2.6
```

The weekly GitHub Action in `.github/workflows/publish-ref-docs.yml` publishes
SDK reference manuals for the selected version and opens a PR. To run it
manually, use the `workflow_dispatch` input `version`, for example `v2.6.x`.

After publishing, review:

- generated Markdown files under the configured `targets.outputDir`;
- downloaded or linked assets;
- changes to `scripts/config.json`, especially `images.alt_texts`;
- menu changes for guide manuals.

## Generate REST API Reference

Generate the default REST entry:

```bash
node fetch-restful-docs.js
```

Generate a named entry:

```bash
node fetch-restful-docs.js -e milvus-v3.0.x
```

Override config values from the CLI:

```bash
node fetch-restful-docs.js \
  -s scripts/apifox-docs/meta/openapi \
  -l en-US \
  -t milvus \
  -o API_Reference_MDX/milvus-restful/v3.0.x
```

Use `--upload-s3` only when AWS credentials and bucket settings are available.

## Tests and Maintenance

Run focused tests from this directory:

```bash
npm run test:shared-sync
npm run test:sdk-docs-gen
node --test test/*.test.js apifox-docs/*.test.js
```

Shared script copies are managed by `sync-shared-scripts.js`:

```bash
npm run check:shared-scripts
npm run sync:shared-scripts
```

`sync:shared-scripts` may need access to adjacent local repositories or GitHub,
depending on the entries in `sync-shared-scripts.manifest.js`.
