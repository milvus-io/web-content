# list_import_jobs()

This operation lists all bulk-import jobs of a specific cluster.

## Request syntax

```python
list_import_jobs(
    url: str,
    api_key: str,
    cluster_id: str,
    page_size: int,
    current_page: int,
    **kwargs,
) -> requests.Response
```

**PARAMETERS:**

- **url** (*string*) -

    **[REQUIRED]**

    The endpoint URL of your Zilliz Cloud cluster. 

    For example, the endpoint URL should be in the following format:

    ```python
    controller.api.${cloud-region}.zillizcloud.com[:${port-number}] 
    ```

    Replace `cloud-region` with the ID of the region that accommodates your cluster. You can get the cloud region ID from the endpoint URL of your cluster.

- **api_key** (*string*) -

    **[REQUIRED]**

    Possible values are:

    - A valid Zilliz Cloud API key with sufficient permissions to manipulate the cluster, or

    - A pair of username and password of the target cluster joined by a colon(:).

- **cluster_id** (*string*) -

    **[REQUIRED]**

    The instance ID of the target cluster of this operation.

    You can get the instance ID of a cluster on its details page from the Zilliz Cloud console.

- **page_size** (*int*) -

    **[REQUIRED]**

    The maximum number of bulk-import jobs returned per call.

- **current_page** (*int*) -

    **[REQUIRED]**

    The specific page in the returned list of bulk-import jobs. 

    You can use this to offset certain records in combination with `page_size`.

**RETURN TYPE:**

*dict*

**RETURNS:**

- Response syntax

    ```python
    # {
    #     "code": 200,
    #     "data": {
    #         "tasks": [
    #             {
    #                 "collectionName": "medium_articles",
    #                 "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
    #                 "state": "ImportCompleted"
    #             }
    #         ],
    #         "count": 1,
    #         "currentPage": 1,
    #         "pageSize": 10
    #     }
    # }
    ```

- Response structure

    - **tasks** (*array*)

        - **collectionName** (*string*)

            The name of the target collection of this bulk-import job.

        - **jobId** (*string*)

            The ID of this bulk-import job.

        - **state** (*string*)

            The state of this bulk-import job. Possible values are as follows:

            - **ImportPending**

            - **ImportFailed**

            - **ImportStarted**

            - **ImportPersisted**

            - **ImportFlushed**

            - **ImportCompleted**

            - **ImportFailedAndCleaned**

    - **count** (*int*)

        The number of bulk-import jobs in the tasks list.

    - **currentPage** (*int*)

        The maximum number of records in the tasks list.

    - **pageSize** (*int*)  

        The current page of the tasks list.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import list_import_jobs

res = list_import_jobs(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    cluster_id=CLUSTER_ID,
    page_size=10,
    current_page=1,
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "tasks": [
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#                 "state": "ImportCompleted"
#             },
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "53632e6c-c078-4476-b840-10c4793d9c08",
#                 "state": "ImportCompleted"
#             },
#         ],
#         "count": 2,
#         "currentPage": 1,
#         "pageSize": 10
#     }
# }
```

For details, refer to [Import Data (SDK)]() in our user guides.

## Related methods

- [bulk_import()](bulk_import.md)

- [get_import_progress()](get_import_progress.md)

