# RemoteBulkWriter

A **RemoteBulkWriter** instance writes your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.

```python
class pymilvus.RemoteBulkWriter
```

## Constructor

Constructs a **RemoteBulkWriter** object with a set of parameters, such as **schema**, **remote_path**, **connect_param** etc.

<div class="admonition note">

<p><b>notes</b></p>

<p>A <strong>RemoteBulkWriter</strong> object intends to rewrite your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.</p>

</div>

```python
from pymilvus import CollectionSchema
from pymilvus.bulk_writer import RemoteBulkWriter, BulkFileType

writer = RemoteBulkWriter(
    schema=CollectionSchema(),
    remote_path="string",
    connect_param=RemoteBulkWriter.ConnectParam()
    chunk_size=512*1024*1024,
    file_type=BulkFileType.PARQUET
)
```

**PARAMETERS:**

- **schema** (*[CollectionSchema](../../ORM/CollectionSchema/CollectionSchema.md)*) -

    **[REQUIRED]**

    The schema of a target collection to which the rewritten data is to be imported.

- **remote_path** (*str*) -

    **[REQUIRED]**

    The path to the directory that is to hold the rewritten data.

- **connect_param** (*[ConnectParam](S3ConnectParam.md)*) -

    The parameters used to connect to a remote bucket.

- **chunk_size** (*int*) -

    The maximum size of a file segment.

    While rewriting your raw data, Milvus splits your raw data into segments.

    The value defaults to 536,870,912 in bytes, which is 512 MB.

    <div class="admonition note">

    <p><b>how does bulkwriter segment my data?</b></p>

    <p>The way <strong>BulkWriter</strong> segments your data varies with the target file type.</p>
    <p>If the generated file exceeds the specified segment size, <strong>BulkWriter</strong> creates multiple files and names them in sequence numbers, each no larger than the segment size.</p>

    </div>

- **file_type** (*BulkFileType*) -

    The type of the output file.

    The value defaults to **BulkFileType.PARQUET**. 

    Possible options are **BulkFileType.JSON**, **BulkFileType.PARQUET**, **BulkFileType.CSV**.

- **config** (*dict*)

    A dictionary specifying optional configurations for processing CSV files. This parameter is available only when **file_type** is set to **BulkFileType.CSV**. Example configuration:

    ```python
    config={
        "sep": "\t",
        "nullkey": "NULL"
    }
    ```

    -  **sep** (*string*)

        The delimiter of CSV file. The value must be a string of length 1, which defaults to `","`. The following strings are not allowed: `"\0"`, `"\n"`, `"\r"`, `"""`.

    - **nullkey** (*string*)

        Special string representing null value. The value defaults to empty string: `""`.

**RETURN TYPE:**

*RemoteBulkWriter*

**RETURNS:**

A **RemoteBulkWriter** object.

**EXCEPTIONS:**

- **SchemaNotReadyException**

    This exception will be raised when the provided schema is invalid.

## Properties

- **data_path** (*pathlib.PosixPath*) -

    The path to the output directory.

- **batch_files** (*str*) -

    A list of the generated file names.

## Classes

The following are the classes of the `RemoteBulkWriter` class:

- ConnectParam

## Methods

The following are the methods of the `RemoteBulkWriter` class: