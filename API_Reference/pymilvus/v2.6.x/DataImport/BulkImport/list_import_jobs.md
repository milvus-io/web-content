# list_import_jobs()

This operation lists all bulk-import jobs of a specific cluster.

## Request syntax

```python
list_import_jobs(
    url: str,
    collection_name: str
) -> requests.Response
```

**PARAMETERS:**

- **url** (*string*) -

    **[REQUIRED]**

    The URI of your Milvus instance.

- **collection_name** (*string*) -

    The name of a collection.

**RETURN TYPE:**

*dict*

**RETURNS:**

- Response syntax

    ```python
    # {
    #     "code": 0,
    #     "data": {
    #         "records": [
    #             {
    #                 "collectionName": "quick_setup",
    #                 "jobId": "453240863839750922",
    #                 "progress": 100,
    #                 "state": "Completed"
    #             }
    #         ]
    #     }
    # }
    ```

- Response structure

    - **records** (*list*) -

        The list of import jobs.

        - **collectionName** (*string*) -

            The name of the target collection of this bulk-import job.

        - **jobId** (*string*) -

            The ID of this bulk-import job.

        - **progress** (*string*) - 

            The progress of the job.

        - **state** (*string*) -

            The state of this bulk-import job. Possible values are as follows:

            - **Pending**: The tasks are awaiting scheduling and execution;

            - **Importing**: The tasks are currently being executed;

            - **Completed**: The tasks have been successfully completed;

            - **Failed**: The tasks encountered a failure.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus.bulk_writer import list_import_jobs
import json

url = f"http://127.0.0.1:19530"

# List bulk-insert jobs
resp = list_import_jobs(
    url=url,
    collection_name="quick_setup",
)

print(json.dumps(resp.json(), indent=4, sort_keys=True))
# {
#     "code": 0,
#     "data": {
#         "records": [
#             {
#                 "collectionName": "quick_setup",
#                 "jobId": "453240863839750922",
#                 "progress": 100,
#                 "state": "Completed"
#             }
#         ]
#     }
# }
```

## Related methods

- [bulk_import()](bulk_import.md)

- [get_import_progress()](get_import_progress.md)

