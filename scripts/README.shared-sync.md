# Shared scripts sync

## Source of truth

Shared script content is sourced from:
- `milvus-io/milvus-docs` (default branch) -> `scripts/lib`
- `zilliztech/zdoc` (`master`) -> `scripts/apifox-docs`

Sync mappings are defined in `scripts/sync-shared-scripts.manifest.js`.

## Commands

- Apply sync updates:

  ```bash
  npm --prefix scripts run sync:shared-scripts
  ```

- Check for drift without writing files (CI-safe):

  ```bash
  npm --prefix scripts run check:shared-scripts
  ```
