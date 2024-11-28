# get_import_progress()

This operation gets the progress of the specified bulk-import job.

## Request syntax

```python
pymilvus.get_import_progress(
    url: str,
    api_key: str,
    job_id: str,
    cluster_id: str,
)
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

    A valid Zilliz Cloud API key with sufficient permissions to manipulate the cluster.

- **job_id** (*string*) -

    **[REQUIRED]**

    The ID of the bulk-import job of your interest. 

    The **bulk_import()** operation usually returns a job ID. You can also call **list-import-jobs()** to get the IDs of all bulk-import jobs related to the specific cluster.

- **cluster_id** (*string*) -

    **[REQUIRED]**

    The instance ID of the target cluster of this operation.

    You can get the instance ID of a cluster on its details page from the Zilliz Cloud console.

**RETURN TYPE:**

*dict*

**RETURNS:**

- Response syntax

    ```python
    # {
    #     "code": 200,
    #     "data": {
    #         "collectionName": "string",
    #         "fileName": "string",
    #         "fileSize": int,
    #         "readyPercentage": int,
    #         "completeTime": "string",
    #         "errorMessage": null,
    #         "jobId": "string",
    #         "details": [
    #             {
    #                 "fileName": "string",
    #                 "fileSize": int,
    #                 "readyPercentage": int,
    #                 "completeTime": "string",
    #                 "errorMessage": null
    #             }
    #         ]
    #     }
    # }
    ```

- Response structure

    - **collectionName** (*string*) -

        The name of the target collection.

    - **fileName** (*string*) -

        The name of the currently processed data file.

    - **fileSize** (*string*) -

        The size of the currently processed data file in bytes.

    - **readyPercentage** (*int*) -

        The progress of the current operation in floats. 

        The value ranges from `0` to `1`, and stays at `1` when this operation completes.

    - **completeTime** (*string*) -

        The time at which this operation is completed.

        The time is displayed in the format of `XXXX-XX-XXTXX:XX:XXZ`.

    - **errorMessage** (*string* / *null*) -

        An error message explaining any errors during this operation. It should always be **null** if no error occurs.

    - **jobId** (*string*) -

        The ID of the current bulk-import job of your interests.

    - **details** (*array*) -

        - **fileName** (*string*) -

            The name of a data file.

        - **fileSize** (*int*) -

            The size of this data file.

        - **readyPercentage** (*int*) -

            The bulk-import progress of this data file.

        - **completeTime** (*string*) -

            The time at which this data file has been imported.

        - **errorMessage** (*string* / *null*) - 

            An error message explaining any errors during this data file has been uploaded. It should always be **null** if no error occurs.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import bulk_import, get_import_progress

CLOUD_REGION = ""    # Cloud region ID of the target Zilliz Cloud cluster
API_KEY = ""         # A Zilliz Cloud API Key with sufficient permissions
OBJECT_URL = ""      # URL of the data file to import in a remote bucket
ACCESS_KEY = ""      # Access key used to access the remote bucket
SECRET_KEY = ""      # Secure keys used to access the remote bucket
CLUSTER_ID = ""      # ID of the Zilliz Cloud target cluster
COLLECTION_NAME = "" # Name of the target collection in the specified Zilliz Cloud cluster

res = bulk_import(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    object_url=OBJECT_URL,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    cluster_id=CLUSTER_ID,
    collection_name=COLLECTION_NAME
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a"
#     }
# }

job_id = res.json()['data']['jobId']
res = get_import_progress(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    job_id=job_id,
    cluster_id=CLUSTER_ID
)

# Output
#
# {
#     "code": 200,
#     "data": {
#         "collectionName": "medium_articles",
#         "fileName": "folder/1/",
#         "fileSize": 26571700,
#         "readyPercentage": 1,
#         "completeTime": "2023-10-28T06:51:49Z",
#         "errorMessage": null,
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#         "details": [
#             {
#                 "fileName": "folder/1/",
#                 "fileSize": 26571700,
#                 "readyPercentage": 1,
#                 "completeTime": "2023-10-28T06:51:49Z",
#                 "errorMessage": null
#             }
#         ]
#     }
# }
```

For details, refer to [Import Data (SDK)]() in our user guides.

## Related methods

- [bulk_import()](bulk_import.md)

- [list_import_jobs()](list_import_jobs.md)

