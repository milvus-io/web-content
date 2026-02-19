# get_import_progress()

This operation gets the progress of the specified bulk-import job.

## Request syntax

**PARAMETERS:**

- **url** (*string*) -

    **[REQUIRED]**

    The URI of your Milvus instance.

- **job_id** (*string*) -

    **[REQUIRED]**

    The ID of the bulk-import job of your interest. 

    The **bulk_import()** operation usually returns a job ID. You can also call **list-import-jobs()** to get the IDs of all bulk-import jobs related to the specific cluster.

**RETURN TYPE:**

*dict*

**RETURNS:**

- Response syntax

    ```python
    # {
    #     "code": "integer",
    #     "data": {
    #         "collectionName": "string",
    #         "fileSize": "interger",
    #         "jobId": "string",
    #         "state": "string",
    #         "progress": "integer",
    #         "reason": "string",
    #         "importedRows": "integer",
    #         "totalRows": "integer",
    #         "completeTime": "string",
    #         "details":[
    #             {
    #                 "fileName": "string",
    #                 "fileSize": "integer",
    #                 "state": "string",
    #                 "progress": "integer",
    #                 "reason": "string",
    #                 "importedRows": "integer",
    #                 "totalRows": "integer",
    #                 "completeTime": "string"
    #             },
    #             ...
    #         ]
    #     }
    # }
    ```

- Response structure

    - **collectionName** (*string*) -

        The name of the target collection.

    - **fileSize** (*string*) -

        The size of the currently processed data file in bytes.

    - **jobId** (*string*) -

        The ID of the current bulk-import job of your interests.

    - **state** (*string*) - 

        The current state of this job. Possible values are as follows:

        - **Pending**: The tasks are awaiting scheduling and execution;

        - **Importing**: The tasks are currently being executed;

        - **Completed**: The tasks have been successfully completed;

        - **Failed**: The tasks encountered a failure.

    - **progress** (*int*) -

        The progress of the current operation in floats. 

        The value ranges from `0` to `1`, and stays at `1` when this operation completes.

    - **reason** (*string*) -

        The reason for any errors that occur.

    - **importRows** (*int*) -

        The number of entities already imported. 

    - **totalRows** (*int*) -

        The total number of entities to import. 

    - **completeTime** (*string*) -

        The time at which this operation is completed.

        The time is displayed in the format of `XXXX-XX-XXTXX:XX:XXZ`.

    - **details** (*array*) -

        - **fileName** (*string*) -

            The name of a data file.

        - **fileSize** (*int*) -

            The size of this data file.

        - **state** (*string*) - 

            The current state of importing this file. Possible values are as follows:

            - **Pending**: The tasks are awaiting scheduling and execution;

            - **Importing**: The tasks are currently being executed;

            - **Completed**: The tasks have been successfully completed;

            - **Failed**: The tasks encountered a failure.

        - **progress** (*int*) -

            The bulk-import progress of this data file.

        - **reason** (*string*) -

            The reason for any errors that occur during importing this file.

        - **importRows** (*int*) -

            The number of entities already imported from this file. 

        - **totalRows** (*int*) -

            The total number of entities to import from this file. 

        - **completeTime** (*string*) -

            The time at which this data file has been imported.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus.bulk_writer import get_import_progress
import json

url = f"http://127.0.0.1:19530"

# Get bulk-insert job progress
resp = get_import_progress(
    url=url,
    job_id="453240863839750922",
)

print(json.dumps(resp.json(), indent=4, sort_keys=True))
# {
#     "code": 0,
#     "data": {
#         "collectionName": "quick_setup",
#         "completeTime": "2024-10-15T15:27:41+08:00",
#         "details": [
#             {
#                 "completeTime": "2024-10-15T15:27:33+08:00",
#                 "fileName": "[8db36d4f-4ad6-4306-9f8c-7cfa985c0bbe/1.parquet]",
#                 "fileSize": 31567773,
#                 "importedRows": 10000,
#                 "progress": 100,
#                 "state": "Completed",
#                 "totalRows": 10000
#             }
#         ],
#         "fileSize": 31567773,
#         "importedRows": 10000,
#         "jobId": "453240863839750922",
#         "progress": 100,
#         "state": "Completed",
#         "totalRows": 10000
#     }
# }
```

## Related methods

- [bulk_import()](bulk_import.md)

- [list_import_jobs()](list_import_jobs.md)

