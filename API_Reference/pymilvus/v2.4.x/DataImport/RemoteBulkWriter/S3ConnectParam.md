# S3ConnectParam

An **S3ConnectParam** instance sets connection parameters for a **RemoteBulkWriter** instance.

```python
class pymilvus.RemoteBulkWriter.S3ConnectParam
```

## Constructor

Constructs an **S3ConnectParam** object by a set of parameters, such as **bucket_name**, **access_key**, **secret_key**, etc.

<div class="admonition note">

<p><b>notes</b></p>

<p>An <strong>S3ConnectParam</strong> object defines the parameters necessary for Milvus to connect to an AWS-S3-compatible bucket.</p>
<p>You need to create this object before initializing a <strong>RemoteBulkWriter</strong> object.</p>

</div>

```python
from urllib3.poolmanager import PoolManager
from minio.credentials import Provider
from pymilvus.RemoteBulkWriter import S3ConnectParam

connect_param = S3ConnectParam(
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
         <th><strong>Service Name</strong></th>
         <th><strong>Endpoint</strong></th>
       </tr>
       <tr>
         <td><strong>AWS S3</strong></td>
         <td>s3.amazonaws.com</td>
       </tr>
       <tr>
         <td><strong>GCS</strong></td>
         <td>storage.googleapis.com</td>
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

*RemoteBulkWriter*

**RETURNS:**

A **RemoteBulkWriter** object.

**EXCEPTIONS:**

- **Exception**

    This exception will be raised if the connection fails.

