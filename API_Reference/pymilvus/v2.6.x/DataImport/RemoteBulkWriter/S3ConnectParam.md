# S3ConnectParam

An **S3ConnectParam** instance sets connection parameters for a **[RemoteBulkWriter](RemoteBulkWriter.md)** instance.

```python
class pymilvus.RemoteBulkWriter.S3ConnectParam
```

## Constructor

Constructs an **S3ConnectParam** object by a set of parameters, such as **bucket_name**, **access_key**, **secret_key**, etc.

<div class="alert note">

An **S3ConnectParam** object defines the parameters necessary for Milvus to connect to an AWS-S3-compatible bucket.

You need to create this object before initializing a **[RemoteBulkWriter](RemoteBulkWriter.md)** object.

</div>

```python
from urllib3.poolmanager import PoolManager
from minio.credentials import Provider
from pymilvus.bulk_writer import RemoteBulkWriter

connect_param = RemoteBulkWriter.S3ConnectParam(
    bucket_name="string",
    endpoint="string",
    access_key="string",
    secret_key="string",
    secure=False,
    session_token="string",
    region="str",
    http_client=PoolManager(),
    credentials=Provider()
)
```

**PARAMETERS:**

- **bucket_name** (*str*)

    The name of the remote bucket to connect to.

- **endpoint** (*str*)

    The URL of the AWS-S3-compatible service.

    The value can be the URL of a MinIO service or that of any AWS S3 compatible public service.

    <table>
       <tr>
         <th><p><strong>Service Name</strong></p></th>
         <th><p><strong>Endpoint</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>AWS S3</strong></p></td>
         <td><p>s3.amazonaws.com</p></td>
       </tr>
       <tr>
         <td><p><strong>GCS</strong></p></td>
         <td><p>storage.googleapis.com</p></td>
       </tr>
    </table>

- **access_key** (*str*)

    The access key (user ID) used to authenticate access to the specified bucket.

- **secret_key** (*str*)

    The secret_key (password) used to authenticate access to the specified bucket.

- **secure** (*bool*)

    Whether to use secure (TLS) connection to the AWS S3 compatible service. 

- **session_token** (*str*)

    A session token of your account in the AWS S3 compatible service.

- **region** (*str*)

    The name or ID of the region where the bucket resides.

- **http_client** (*urllib3.poolmanager.PoolManager*)

    A customized HTTP client.

- **credentials** (*minio.credentials.Provider*)    

    A credentials provider of your account in the AWS S3 compatible service.

**RETURN TYPE:**

*[RemoteBulkWriter](RemoteBulkWriter.md)*

**RETURNS:**

A **[RemoteBulkWriter](RemoteBulkWriter.md)** object.

**EXCEPTIONS:**

- **Exception**

    This exception will be raised if the connection fails.

## Example

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus.bulk_writer import RemoteBulkWriter

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
    ]
)

# Set up AWS-S3-compatible connection parameters
connect_param = RemoteBulkWriter.S3ConnectParam(
    bucket_name="my-bucket",
    endpoint="s3.amazonaws.com",
    access_key="ACCESS_KEY",
    secret_key="SECRET_KEY",
    secure=True,
)

# Set up a remote bulk writer
writer = RemoteBulkWriter(
    schema=schema,
    remote_path="/path/to/bucket/prefix",
    connect_param=connect_param,
)

# Append a row to the writer
writer.append_row(
    {"id": 0, "vector": [0.1, 0.4, -0.8, -0.2, 0.4]}
)

# Commit the appended data
writer.commit()
```

