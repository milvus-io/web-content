# List Import Jobs

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/jobs/import/list</span>
    </div>
</div>

This operation lists all bulk-import jobs of a specific cluster.

## Example
```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/list" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup"
}'
```
Possible response is similart to the following.
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

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `request-timeout`  | **integer**<br/>The timeout duration for this operation.<br/>Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "collectionName": "string",
    "dbName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | __string__<br/>The name of the target collection.<br/>Setting this to a non-existing collection results in an error.  |
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.<br/>Setting this to a non-existing database results in an error.  |

## Response

A dictionary of all existing import jobs.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "records": [
            {
                "collectionName": "string",
                "jobId": "integer",
                "state": "string",
                "progress": "integer",
                "reason": "string"
            }
        ]
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
| `data[].records` | __array__<br/>A list of import jobs. |
| `data[].records[]` | __object__<br/> |
| `data[].records[].collectionName`  | __string__<br/>The name of the target collection of this bulk-import job.  |
| `data[].records[].jobId`  | __integer__<br/>The ID of this bulk-import job.  |
| `data[].records[].state`  | __string__<br/>The state of this bulk-import job. Possible values are __Pending__, __InProgress__, __Completed__, and __Failed__.  |
| `data[].records[].progress`  | __integer__<br/>The progress in percentage of the current bulk-import job.  |
| `data[].records[].reason`  | __string__<br/>The reason for the failure to bulk import data.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
