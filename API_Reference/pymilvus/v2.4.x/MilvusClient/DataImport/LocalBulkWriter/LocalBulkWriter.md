# LocalBulkWriter

A LocalBulkWriter instance rewrites your raw data locally in a format that Milvus understands.

```python
class pymilvus.LocalBulkWriter
```

## Constructor

Constructs a LocalBulkWriter object by schema, output path, segment size, and file type.

<div class="admonition note">

<p><b>notes</b></p>

<p>A <strong>LocalBulkWriter</strong> object intends to rewrite your raw data locally in a format that Milvus understands.</p>

</div>

```python
from pymilvus import CollectionSchema, LocalBulkWriter, BulkFileType

writer = LocalBulkWriter(
    schema=CollectionSchema(),
    local_path="string",
    segment_size=512*1024*1024,
    file_type=BulkFileType.NPY
)
```

__PARAMETERS:__

- __schema__ (_[CollectionSchema](../../../ORM/CollectionSchema/CollectionSchema.md)_) -

    __[REQUIRED]__

    The schema of a target collection to which the rewritten data is to be imported.

- __local_path__ (_str_) -

    __[REQUIRED]__

    The path to the directory that is to hold the rewritten data.

- __segment_size__ (_int_) -

    The maximum size of a file segment.

    While rewriting your raw data, Milvus splits your raw data into segments.

    The value defaults to __536,870,912__ in bytes, which is __512__ MB.

    <div class="admonition note">

    <p><b>how does bulkwriter segment my data?</b></p>

    <p>The way <strong>BulkWriter</strong> segments your data varies with the target file type.</p>
    <ul>
    <li><strong>JSON_RB</strong> or <strong>Parquet</strong></li>
    </ul>
    <p>If the generated file exceeds the specified segment size, <strong>BulkWriter</strong> creates multiple files and names them in sequence numbers, each no larger than the segment size.</p>
    <ul>
    <li><strong>NPY</strong></li>
    </ul>
    <p>If the generated file exceeds the specified segment size, <strong>BulkWriter</strong> creates multiple subdirectories and names them in sequence numbers. Each subdirectory contains all the necessary NumPy files that are no larger than the segment size.</p>

    </div>

- __file_type__ (_[BulkFileType](./DataImport-BulkFileType)_) -

    The type of the output file.

    The value defaults to __BulkFileType.NPY__. 

    Possible options are __BulkFileType.NPY__, __BulkFileType.JSON_RB__ and __BulkFileType.PARQUET__.

__RETURN TYPE:__

_LocalBulkWriter_

__RETURNS:__

A __LocalBulkWriter__ object.

__EXCEPTIONS:__

- __SchemaNotReadyException__

    This exception will be raised when the provided schema is invalid.

## Properties

- __uuid__ (_str_) -

    A randomly generated UUID, used to name the output file or directory, with JSON, Parquet, and NumPy formats supported.

- __data_path__ (_pathlib.PosixPath_) -

    The path to the output directory.

- __batch_files__ (_str_) -

    A list of the generated file names.
