# BulkFileType

This is an enumeration that provides the following constants.

## Constants

- **NPY** = 1

    Sets the file type to **NumPy** (*.npy*).

- **JSON_RB** = 2
Sets the file type to **JSON** (*.json*).

- **PARQUET** = 3
Sets the file type to [Parquet](https://parquet.apache.org/) (*.parquet*).

- **CSV** = 4

    Sets the file type to **CSV** (*.csv*).

## Examples

```python
from pymilvus import LocalBulkWriter, BulkFileType

local_writer = LocalBulkWriter(
    schema=schema,
    local_path=Path(OUTPUT_PATH).joinpath('json'),
    segment_size=4*1024*1024,
    # highlight-next
    file_type=BulkFileType.JSON_RB
)
```
