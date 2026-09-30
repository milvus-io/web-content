# get_refresh_external_collection_progress()

This operation returns the progress of a specified external collection refresh job.

## Request Syntax

```python
def get_refresh_external_collection_progress(
    job_id: int,
    timeout: Optional[float] = None,
    **kwargs,
) -> RefreshExternalCollectionJobInfo:
```

**PARAMETERS:**

- **job_id** (*int*) -

    **[REQUIRED]**

    The job ID returned by `refresh_external_collection()`.

- **timeout** (*float*) - 

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*RefreshExternalCollectionJobInfo*

**RETURNS:**

A **RefreshExternalCollectionJobInfo** object that records the details of the specified external collection refresh job.

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

## Example

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

