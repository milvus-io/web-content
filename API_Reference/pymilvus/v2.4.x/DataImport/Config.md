# Config

The configuration of the **CSV** format is a dict type,  which includes two fields: **sep** and **nullkey**.

## Fields

 **sep** (*string*)

The delimiter of CSV file.

The value must be a string of length 1, which defaults to ```","```.

And the following strings are not allowed: ```"\0"```, ```"\n"```, ```"\r"```, ```"""```, ```0xFFFD```.

- **nullkey** (*string*)

Special string representing null value.

The value defaults to empty string: ```""```.

## Examples

```python
from pymilvus import LocalBulkWriter, BulkFileType

local_writer = LocalBulkWriter(
    schema=schema,
    local_path=Path(OUTPUT_PATH).joinpath('csv'),
    segment_size=4*1024*1024,
    file_type=BulkFileType.CSV,
    # highlight-next
    config={
      "sep": "\t",
      "nullkey": "NULL"
    }
)
```