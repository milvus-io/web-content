# Create import Jobs

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/jobs/import/create</span>
    </div>
</div>

This operation imports the prepared data files to a Milvus instance. To learn how to prepare your data files, read [Prepare Data Import](https://milvus.io/docs/prepare-source-data.md).

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "files": [
        [
            "/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json"
        ],
        [
            "/2a12dea7-2eff-4b34-97b6-9554063fd791/1/id.npy",
            "/2a12dea7-2eff-4b34-97b6-9554063fd791/1/vector.npy",
            "/2a12dea7-2eff-4b34-97b6-9554063fd791/1/$meta.npy"
        ],
        [
            "/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet"
        ]
    ],
    "collectionName": "quick_setup"
}'
```
Possible response is similar to the following
```json
{
    "code": 0,
    "data": {
        "jobId": "448707763884413158"
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
    "collectionName": "string",
    "dbName": "string",
    "files": [],
    "options": {
        "timeout": "string"
    }
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the target collection.<br/>Setting this to a non-existing collection results in an error.  |
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.<br/>Setting this to a non-existing database results in an error.  |
| `files` | __array__<br/>The files that contain the data to import. The files should reside within the Milvus bucket on the MinIO instance deployed along with your Milvus instance. |
| `files[]` | __array__<br/>A sub-list that contains a single JSON or Parquet file, or a set of NumPy files. |
| `files[][]`  | __string__<br/>A list of file paths, relative to the root of your Milvus bucket on the MinIO instance shipped along with the Milvus instance.  |
| `options` | __object__<br/>Bulk-import options. |
| `options.timeout`  | __string__<br/>The timeout duration of the created import jobs. The value should be a positive number suffixed by __s__ (seconds), __m__ (minutes), and __h__(hours). For example, _300s_, _1.5h_, and _1h45_ are all valid values.  |

## Response

The ID of the bulk-import job.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": [
        {
            "jobID": "string"
        }
    ]
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
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
| `data` | __array__<br/> |
| `data[]` | __object__<br/> |
| `data[].jobID`  | __string__<br/>The ID of the current bulk-import job.  |
