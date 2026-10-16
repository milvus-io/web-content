# BulkFileType

This is an enumeration that provides the following constants.

## Constants

- **NPY** = 1

    Sets the file type to **NumPy** (*.npy*).

- **JSON** = 2

    Sets the file type to **JSON** (*.json*). 

- **PARQUET** = 3

    Sets the file type to [Parquet](https://parquet.apache.org/) (*.parquet*).

- **CSV** = 4

    Sets the file type to **CSV** (*.csv*).

## Examples

```python
from pathlib import Path
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus.bulk_writer import LocalBulkWriter, BulkFileType

OUTPUT_PATH = "/tmp/output"

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
])

local_writer = LocalBulkWriter(
    schema=schema,
    local_path=Path(OUTPUT_PATH).joinpath('json'),
    segment_size=4*1024*1024,
    # highlight-next
    file_type=BulkFileType.PARQUET
)
```
