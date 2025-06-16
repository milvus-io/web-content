# do_bulk_insert()

This operation bulk-inserts data from specified files.

## Request Syntax

```python
do_bulk_insert(
    collection_name: str,
    files: list,
    partition_name: str | None,
    timeout: float | None,
    using: str = "default",
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the target collection of this operation.

- **files** (*list[str]*) -

    **[REQUIRED]**

    A list of paths to the files that contain the source data. 

    <div class="admonition note">

    <p><b>how can i prepare the source data files?</b></p>

    <ul>
    <li><p>You can include a JSON file (<em>.json</em>) or a set of NumPy files (<em>.npy</em>) as the source data files.</p></li>
    <li><p>A valid JSON file has a root key named <strong>rows</strong>, which is a list of dictionaries with each representing an entity that matches the schema of the target collection.</p></li>
    </ul>
    <p>If the target collection allows dynamic fields, include the dynamic fields and their values in each entity dictionary.</p>
    <ul>
    <li>A valid set of NumPy files should be named after the fields in the schema of the target collection, and the data in them should match the corresponding field definitions. </li>
    </ul>
    <p>If the target collection allows dynamic fields, create an extra file named <strong>$meta.npy</strong> to include the dynamic fields and their values.</p>
    <p>For details on preparing the source data files, refer to <a href="https://milvus.io/docs/bulk_insert.md">Insert Entities from Files</a>.</p>
    <ul>
    <li>You have to upload the source data files to the bucket defined by <code>minio.bucketname</code> in your Milvus configuration before running this operation. </li>
    </ul>
    <p>Let's take a Milvus instance set up using Docker Compose as an example, and the bucket name is <code>a-bucket</code>.</p>
    <ul>
    <li><p>If you upload the source data files to this bucket, you should include only the file names with extensions in the <strong>files</strong> list. For example, <code>files=["id.npy", "vector.npy"]</code> or <code>files=["data.json"]</code>.</p></li>
    <li><p>If you upload the source data files to a sub-directory in this bucket, you should include the file paths relative to the bucket. For example, if the sub-directory is <code>data</code>, the parameter settings should be <code>files=["data/id.npy", "data/vector.py"]</code> or <code>files=["data.json"]</code>.</p></li>
    <li><p>To find the name of the MinIO bucket your Milvus instance uses, simply log into the MinIO server and find out. </p></li>
    </ul>

    </div>

- **partition_name** (*str*) -

    The name of a partition in the specified collection.

    Setting this makes Milvus bulk-insert the data into the specified partition.

    Setting this to the name of a partition that does not exist results in a **MilvusException**.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*int*

**RETURNS:**
A bulk-insert task ID.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Bulk-insert data from a set of NumPy files already uploaded to the MioIO server
utility.do_bulk_insert(
    collection_name="test_collection",
    files=["data/id.npy", "data/vector.npy"],
)

# 446781855410073001

# Bulk-insert data from a JSON file already uploaded to the MioIO server
utility.do_bulk_insert(
    collection_name="test_collection",
    files=["data/data.json"],
) 

# 446781855410077319
```

## Related operations

The following operations are related to `do_bulk_insert()`:

- [BulkInsertState](BulkInsertState.md)

- [get_bulk_insert_state()](get_bulk_insert_state.md)

- [list_bulk_insert_tasks()](list_bulk_insert_tasks.md)

