# refresh_external_collection()

This operation scans the data files in the schema-defined external storage and generates metadata files that record their mapping relationship to those data files.

## Request Syntax

```python
refresh_external_collection(
    collection_name: str,
    external_source: str = "",
    external_spec: str = "",
    timeout: Optional[float] = None,
    **kwargs,    
) -> int
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing external collection.

- **external_source** (*str*) -

    The external source URI, which is similar to an AWS S3 object path.

- **external_spec** (*str*) -

    The external source specifications, which are a set of secondary parameters:

    - **format** (*str*) - 

        The format of the target source data files.

        Possible values are `parquet`, `vortex`, `lance-table`, and `iceberg-table`.

    - **snapshot_id** (*str*) -

        The ID of an Iceberg table. This applies only when `format` is `iceberg-table`.

    - **extfs** (*string*) -  

        External file system settings in a stringified JSON structure.

        Possible options are as follows:

        - **access_key_id** (*string*) -

            The access key ID of your object storage service.

        - **access_key_val** (*string*) -

            The access key value of your object storage service.

        - **cloud_provider** (*string*) -

            The cloud provider of your object storage service.

        - **region** (*string*) -

            The region of your object storage service.

        - **use_iam** (*string*) -

            Whether to use AWS IAM for bucket access authentication. 

            Possible values are `"true"` or `"false"`.

        - **iam_endpoint** (*string*) -

            The AWS IAM STS endpoint.

        - **use_ssl** (*string*) -

            Whether to use SSL to access your object storage bucket.

            Possible values are `"true"` or `"false"`.

        - **use_virtual_host** (*string*) -

            Whether to use virtual hosting for bucket access. 

            For details, refer to [this article](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html).

        - **storage_type** (*string*) -

            The storage type. Possible values is `remote`.

        - **role_arn** (*string*) -

            The AWS IAM Role ARN that is obtained from the bucket owner.

        - **external_id** (*string*) -

            The external ID obtained from the bucket owner.

        - **load_frequency** (*string*) -

            The interval at which Milvus retrieves temporary authentication credentials in seconds.

- **timeout** (*float*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*int*

**RETURNS:**

An integer that indicates an asynchronous job that has been created.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

job_id = client.refresh_external_collection(
    collection_name="test_collection"
)

while True:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    print(f"  {progress.state}: {progress.progress}%")

    if progress.state == "RefreshCompleted":
        elapsed = progress.end_time - progress.start_time
        print(f"  Completed in {elapsed}ms")
        return job_id
    elif progress.state == "RefreshFailed":
        print(f"  Failed: {progress.reason}")
        return job_id

    time.sleep(2)
```

