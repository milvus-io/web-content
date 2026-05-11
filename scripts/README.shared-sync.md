# Shared scripts sync

## Source of truth

Shared script content is sourced from the `milvus-io/milvus-docs` repository and synced into this repo according to `scripts/shared-sync-manifest.json`.

## Commands

- Apply sync updates:

  ```bash
  npm --prefix scripts run sync:shared-scripts
  ```

- Check for drift without writing files (CI-safe):

  ```bash
  npm --prefix scripts run check:shared-scripts
  ```
