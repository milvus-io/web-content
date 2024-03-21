# RemoteBulkWriter

A __RemoteBulkWriter__ instance writes your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.

```python
class pymilvus.RemoteBulkWriter
```

## Constructor

Constructs a __RemoteBulkWriter__ object with a set of parameters, such as __schema__, __remote_path__, __connect_param__ etc.

<div class="admonition note">

<p><b>notes</b></p>

<p>A <strong>RemoteBulkWriter</strong> object intends to rewrite your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.</p>

</div>

```python
from pymilvus import CollectionSchema, RemoteBulkWriter, BulkFileType

writer = RemoteBulkWriter(
    schema=CollectionSchema(),
    remote_path="string",
    connect_param=RemoteBulkWriter.ConnectParam()
    segment_size=512*1024*1024,
    file_type=BulkFileType.NPY
)
```

__PARAMETERS:__

- __schema__ (_[CollectionSchema](../../../ORM/CollectionSchema/CollectionSchema.md)_) -

    __[REQUIRED]__

    The schema of a target collection to which the rewritten data is to be imported.

- __remote_path__ (_str_) -

    __[REQUIRED]__

    The path to the directory that is to hold the rewritten data.

- __connect_param__ (_[ConnectParam](./RemoteBulkWriter-S3ConnectParam)_) -

    The parameters used to connect to a remote bucket.

- __segment_size__ (_int_) -

    The maximum size of a file segment.

    While rewriting your raw data, Milvus splits your raw data into segments.

    The value defaults to 536,870,912 in bytes, which is 512 MB.

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

- __file_type__ (_BulkFileType_) -

    The type of the output file.

    The value defaults to __BulkFileType.NPY__. 

__RETURN TYPE:__

_RemoteBulkWriter_

__RETURNS:__

A __RemoteBulkWriter__ object.

__EXCEPTIONS:__

- __SchemaNotReadyException__

    This exception will be raised when the provided schema is invalid.

## Properties

- __data_path__ (_pathlib.PosixPath_) -

    The path to the output directory.

- __batch_files__ (_str_) -

    A list of the generated file names.
