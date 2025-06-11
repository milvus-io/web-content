---
id: import-data.md
order: 1
title: Import Data
summary: This page demonstrates the procedure to import the prepared data.
---

# Import data

This page demonstrates the procedure to import the prepared data.

## Before you start

- You have already prepared your data and placed it into the Milvus bucket. 

    If not, you should use **RemoteBulkWriter** to prepare your data first, and ensure that the prepared data has already been transferred to the Milvus bucket on the MinIO instance started along with your Milvus instance. For details, refer to [Prepare Source Data](prepare-source-data.md).

- You have already created a collection with the schema you use to prepare your data. If not, refer to [Manage Collections](manage-collections.md). 

<div class="language-python">

The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) and [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) in the SDK reference.

</div>

<div class="language-java">

The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md) in the SDK reference.

</div>

## Import data

To import the prepared data, you have to create an import job as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
</div>

```python
from pymilvus.bulk_writer import bulk_import

url = f"http://127.0.0.1:19530"

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
```

```java
private static String bulkImport(List<List<String>> batchFiles) throws InterruptedException {
    MilvusImportRequest milvusImportRequest = MilvusImportRequest.builder()
            .collectionName("quick_setup")
            .files(batchFiles)
            .build();
    String bulkImportResult = BulkImport.bulkImport("http://localhost:19530", milvusImportRequest);
    System.out.println(bulkImportResult);

    JsonObject bulkImportObject = new Gson().fromJson(bulkImportResult, JsonObject.class);
    String jobId = bulkImportObject.getAsJsonObject("data").get("jobId").getAsString();
    System.out.println("Create a bulkInert task, job id: " + jobId);
    return jobId;
}

public static void main(String[] args) throws Exception {
    List<List<String>> batchFiles = uploadData();
    String jobId = bulkImport(batchFiles);
}
```

```shell
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "files": [
        [
            "/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet"
        ],
        [
            "/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet"
        ]
    ],
    "collectionName": "quick_setup"
}'
```

The request body contains two fields:

- `collectionName`

    The name of the target collection.

- `files`

    A list of lists of file paths relative to the root path of the Milvus bucket on the MioIO instance started along with your Milvus instance. Possible sub-lists are as follows:

    - **JSON files**

        If the prepared file is in JSON format, **each sub-list should contain the path to a single prepared JSON file**.

        ```
        [
            "/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json"
        ],
        ```

    - **Parquet files**

        If the prepared file is in Parquet format, **each sub-list should contain the path to a single prepared parquet file**.

        ```
        [
            "/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet"
        ]

The possible return is as follows:

```json
{
    "code": 200,
    "data": {
        "jobId": "448707763884413158"
    }
}
```

## Check import progress

Once you get an import job ID, you can check the import progress as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
</div>

```python
import json
from pymilvus.bulk_writer import get_import_progress

url = f"http://127.0.0.1:19530"

# Get bulk-insert job progress
resp = get_import_progress(
    url=url,
    job_id="453265736269038336",
)

print(json.dumps(resp.json(), indent=4))
```

```java
private static void getImportProgress(String jobId) {
    while (true) {
        System.out.println("Wait 5 second to check bulkInsert job state...");
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            break;
        }

        MilvusDescribeImportRequest request = MilvusDescribeImportRequest.builder()
                .jobId(jobId)
                .build();
        String getImportProgressResult = BulkImport.getImportProgress("http://localhost:19530", request);

        JsonObject getImportProgressObject = new Gson().fromJson(getImportProgressResult, JsonObject.class);
        String state = getImportProgressObject.getAsJsonObject("data").get("state").getAsString();
        String progress = getImportProgressObject.getAsJsonObject("data").get("progress").getAsString();
        if ("Failed".equals(state)) {
            String reason = getImportProgressObject.getAsJsonObject("data").get("reason").getAsString();
            System.out.printf("The job %s failed, reason: %s%n", jobId, reason);
            break;
        } else if ("Completed".equals(state)) {
            System.out.printf("The job %s completed%n", jobId);
            break;
        } else {
            System.out.printf("The job %s is running, state:%s progress:%s%n", jobId, state, progress);
        }
    }
}

public static void main(String[] args) throws Exception {
    List<List<String>> batchFiles = uploadData();
    String jobId = bulkImport(batchFiles);
    getImportProgress(jobId);
}
```

```shell
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/describe" \
--header "Content-Type: application/json" \
--data-raw '{
    "jobId": "449839014328146739"
}'
```

The possible response is as follows:

```
{
    "code": 200,
    "data": {
        "collectionName": "quick_setup",
        "completeTime": "2024-05-18T02:57:13Z",
        "details": [
            {
                "completeTime": "2024-05-18T02:57:11Z",
                "fileName": "id:449839014328146740 paths:\"/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet\" ",
                "fileSize": 31567874,
                "importedRows": 100000,
                "progress": 100,
                "state": "Completed",
                "totalRows": 100000
            },
            {
                "completeTime": "2024-05-18T02:57:11Z",
                "fileName": "id:449839014328146741 paths:\"/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet\" ",
                "fileSize": 31517224,
                "importedRows": 100000,
                "progress": 100,
                "state": "Completed",
                "totalRows": 200000            
            }
        ],
        "fileSize": 63085098,
        "importedRows": 200000,
        "jobId": "449839014328146739",
        "progress": 100,
        "state": "Completed",
        "totalRows": 200000
    }
}
```

## List Import Jobs

You can list all import jobs relative to a specific collection as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
</div>

```python
import json
from pymilvus.bulk_writer import list_import_jobs

url = f"http://127.0.0.1:19530"

# List bulk-insert jobs
resp = list_import_jobs(
    url=url,
    collection_name="quick_setup",
)

print(json.dumps(resp.json(), indent=4))
```

```java
private static void listImportJobs() {
    MilvusListImportJobsRequest listImportJobsRequest = MilvusListImportJobsRequest.builder().collectionName("quick_setup").build();
    String listImportJobsResult = BulkImport.listImportJobs("http://localhost:19530", listImportJobsRequest);
    System.out.println(listImportJobsResult);
}

public static void main(String[] args) throws Exception {
    listImportJobs();
}
```

```shell
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/list" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup"
}'
```

The possible values are as follows:

```json
{
    "code": 200,
    "data": {
        "records": [
            {
                "collectionName": "quick_setup",
                "jobId": "448761313698322011",
                "progress": 50,
                "state": "Importing"
            }
        ]
    }
}
```

## Limitations

- Each import file size should not exceed **16 GB**.

- The maximum number of files per import request should not exceed **1024**. Each import request can have at most 16GB per file * 1024 files = 16TB of data.

- The maximum number of concurrent import requests is limited to **1024**.



- Only one partition name can be specified in an import request. If no partition name is specified, the data will be inserted into the default partition. Additionally, you cannot set a partition name in the import request if you have set the Partition Key in the target collection.

## Constraints

Before importing data, ensure that you have acknowledged the constaints in terms of the following Milvus behaviors:

- Constraints regarding the Load behavior:

    - If a collection has already been loaded before an import, you can use the `refresh_load` function to load the newly imported data after the import is complete.

- Constraints regarding the query & search behaviors:

    - Before the import job status is **Completed**, the newly import data is guaranteed to be invisible to queries and searches.

    - Once the job status is **Completed**,

        - If the collection is not loaded, you can use the `load` function to load the newly imported data.

        - If the collection is already loaded, you can call `load(is_refresh=True)` to load the imported data.

- Constraints regarding the delete behavior:

    - Before the import job status is **Completed**, deletion is not guaranteed and may or may not succeed.

    - Deletion after the job status is **Completed** is guaranted to succeed.

## Recommendations

We highly recommend utilizing the multi-file import feature, which allows you to upload several files in a single request. This method not only simplifies the import process but also significantly boosts import performance. Meanwhile, by consolidating your uploads, you can reduce the time spent on data management and make your workflow more efficient.
