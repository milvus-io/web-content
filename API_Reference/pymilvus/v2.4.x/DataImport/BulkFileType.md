# BulkFileType

This is an enumeration that provides the following constants.

## Constants

- **JSON** = 2
Sets the file type to **JSON** (*.json*).

- **PARQUET** = 3
Sets the file type to [Parquet](https://parquet.apache.org/) (*.parquet*).

## Examples

```python
from pymilvus.bulk_writer import LocalBulkWriter, BulkFileType

local_writer = LocalBulkWriter(
    schema=schema,
    local_path=Path(OUTPUT_PATH).joinpath('json'),
    chunk_size=4*1024*1024,
    # highlight-next
    file_type=BulkFileType.JSON
)
```
