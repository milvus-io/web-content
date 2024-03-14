
# BulkFileType

This is an enumeration that provides the following constants.

## Constants

- __NPY__ = 1
Sets the file type to __NumPy__ (_.npy_).

- __JSON_RB__ = 2
Sets the file type to __JSON__ (_.json_).

- __PARQUET__ = 3
Sets the file type to [Parquet](https://parquet.apache.org/) (_.parquet_).

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
