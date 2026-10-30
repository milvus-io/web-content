# list_refresh_external_collection_jobs()

This operation lists the external collection refresh jobs of all or specified collections.

## Request Syntax

```python
def list_refresh_external_collection_jobs(
    collection_name: str = "",
    timeout: Optional[float] = None,
    **kwargs,
) -> List:
```

**PARAMETERS:**

- **collection_name** (*string*) -

    The name of the target collection. If this parameter is left unspecified, the refresh jobs of all external collections are turned.

- **timeout** (*float*) - 

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*List*

**RETURNS:**

A list of **RefreshExternalCollectionJobInfo** objects, each recording the details of the an external collection refresh job.

```python
{
    'job_id': 4325693842392,
    'collection_name': 'test_collection',
    'state': 'RefreshPending',
    'progress': 67,
    'reason': ''
    'external_source': 's3://s3.<region-id>.amazonaws.com/<bucket>/' 
    'start_time': 1776470400000
    'end_time': 1776470434567    
}
```

```python
{
    'job_id': 4325693842392,
    'collection_name': 'test_collection',
    'state': 'RefreshPending',
    'progress': 67,
    'reason': ''
    'external_source': 'volume://<my_volume>/<bucket>/' 
    'start_time': 1776470400000
    'end_time': 1776470434567    
}
```

**PARAMETERS:**

- **job_id** (*int*) -

    The job ID specified in the current request.

- **collection_name** (*string*) -

    The name of the external collection specified in `refresh_external_collection()`.

- **state** (*string*) -

    The current state of the specified job. Possible values are:

    - RefreshPending

    - RefreshInProgress

    - RefreshFailed

    - RefreshCompleted

- **progress** (*int*) -

    The current progress of the specified job. The value is an integer ranging from 0 to 100.

- **external_source** (*str*) -

    The external source URI specified in `refresh_external_collection()`.

- **external_specs** (*str*) -

    The external specs specified in `refresh_external_collection()`.

- **reason** (*str*) -

    The error prompt if the refresh operation failed. It is an empty string in normal cases.

- **start_time** (*int*) -

    The timestamp in milliseconds at which the specified job starts.

- **end_time** (*int*) -  

    The timestamp in milliseconds at which the specified job ends.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. List the refresh jobs of all external collections
jobs = client.list_refresh_external_collection_jobs()
print(jobs)

# 3. List the refresh jobs of a specific external collection
jobs = client.list_refresh_external_collection_jobs(
    collection_name="test_collection"
)
for job in jobs:
    print(job)
```

