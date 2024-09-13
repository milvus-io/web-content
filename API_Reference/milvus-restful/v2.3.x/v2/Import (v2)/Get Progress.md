# Get Import Job Progress

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/jobs/import/get_progress</span>
    </div>
</div>

This operation gets the progress of the specified bulk-import job.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/get_progress" \
--header "Content-Type: application/json" \
--data-raw '{
    "jobId": 44870776388440916
}'
```

Possible response is similar to the following
.
```json
{
    "code": 200,
    "data": {
        "collectionName": "quick_setup",
        "completeTime": "2024-04-01T06:17:55Z",
        "details": [
            {
                "completeTime": "2024-04-01T06:17:53Z",
                "fileName": "id:448761313698322012 paths:\"a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet\" ",
                "fileSize": 3279917,
                "importedRows": 100000,
                "progress": 100,
                "state": "Completed",
                "totalRows": 100000
            }
        ],
        "fileSize": 3279917,
        "importedRows": 100000,
        "jobId": "448761313698322011",
        "progress": 100,
        "state": "Completed",
        "totalRows": 100000
    }
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation.<br/>Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "jobId": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the target database of this operation..  |
| `jobId` <span style="color:red">*</span> | __string__<br/>The ID of the bulk-import job of your interest. <br/>The **Create import Jobs** operation usually returns a job ID. You can also call **List Import Jobs** to get the IDs of all bulk-import jobs related to the specific cluster.  |

## Response

Possible response bodies are as follows:

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "collectionName": "string",
        "completeTime": "string",
        "details": [
            {
                "completeTime": "string",
                "fileName": "string",
                "fileSize": "string",
                "progress": "string",
                "state": "string",
                "reason": "string",
                "importedRows": "string",
                "totalRows": "string"
            }
        ],
        "fileSize": "integer",
        "jobId": "integer",
        "progress": "integer",
        "state": "string",
        "reason": "string",
        "importedRows": "integer",
        "totalRows": "integer"
    }
}
```

- Response body if we failed to process your request

```json
{
    "code": integer,
    "message": string
}
```

### Properties

The properties in the returned response are listed in the following table.

| Property | Description                                                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data` | __object__<br/> |
| `data.collectionName`  | __string__<br/>The name of the target collection of this bulk-import job.  |
| `data.completeTime`  | __string__<br/>The timestamp indicating when the bulk-import job is complete.  |
| `data[].details` | __array__<br/>Statistics on data import oriented to data files. |
| `data[].details[]` | __object__<br/>Statistics on data import from a file. |
| `data[].details[].completeTime`  | __string__<br/>The timestamp at which the file is processed.  |
| `data[].details[].fileName`  | __string__<br/>The name of a data file.  |
| `data[].details[].fileSize`  | __string__<br/>The size of the data file.  |
| `data[].details[].progress`  | __string__<br/>The progress in percentage.  |
| `data[].details[].state`  | __string__<br/>The processing state of the data file. Possible values are __Pending__, __InProgress__, __Completed__, and __Failed__.  |
| `data[].details[].reason`  | __string__<br/>The reason for the failure to bulk import data.  |
| `data[].details[].importedRows`  | __string__<br/>The number of rows imported from this file.  |
| `data[].details[].totalRows`  | __string__<br/>The number of rows in the specified collection upon the import from this file is complete.  |
| `data.fileSize`  | __integer__<br/>The uploaded file size in bytes.  |
| `data.jobId`  | __integer__<br/>The ID of this bulk-import job.  |
| `data.progress`  | __integer__<br/>The progress in percentage of the current bulk-import job.  |
| `data.state`  | __string__<br/>The state of this bulk-import job. Possible values are __Pending__, __InProgress__, __Completed__, and __Failed__.  |
| `data.reason`  | __string__<br/>The reason for the failure to bulk import data.  |
| `data.importedRows`  | __integer__<br/>The number of rows inserted into the specified collection upon this import.  |
| `data.totalRows`  | __integer__<br/>The number of rows in the specified collection.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
