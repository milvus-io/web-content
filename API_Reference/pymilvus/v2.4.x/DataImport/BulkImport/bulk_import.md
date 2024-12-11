# bulk_import()

This operation imports the prepared data files to Milvus. To learn how to prepare your data files, read [Prepare Source Data](https://milvus.io/docs/prepare-source-data.md).

## Request syntax

```python
bulk_import(
    url: str,
    collection_name: str,
    files: list
)
```

**PARAMETERS:**

- **url** (*string*) -

    **[REQUIRED]**

    The URI of your Milvus instance.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of a collection in the target cluster of this operation.

- **files** (*list*) -

    **[REQUIRED]**

    The list of string lists, each string list contains a singular row-based file path or multiple column-based file paths.

**RETURN TYPE:**

*dict*

**RETURNS:**

- Response syntax

    ```python
    # {
    #     "code": 200,
    #     "data": {
    #         "jobId": "string"
    #     }
    # }
    ```

- Response structure

    - **jobId** (*string*) -

        If present, indicates that a bulk-import job has been created successfully and is currently running.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus.bulk_writer import bulk_import

url = f"http://localhost:19530"

# Bulk-insert data from a set of JSON files already uploaded to the MinIO server
resp = bulk_import(
    url=url,
    collection_name="quick_setup",
    files=[['a1e18323-a658-4d1b-95a7-9907a4391bcf/1.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/2.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/3.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/4.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/5.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/6.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/7.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/8.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/9.parquet'],
           ['a1e18323-a658-4d1b-95a7-9907a4391bcf/10.parquet']],
)

job_id = resp.json()['data']['jobId']
print(job_id)

# {
#     "code": 200,
#     "data": {
#         "jobId": "453240863839750922"
#     }
# }
```

## Related methods

- [get_import_progress()](get_import_progress.md)

- [list_import_jobs()](list_import_jobs.md)

