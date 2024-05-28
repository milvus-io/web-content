# Hybrid Search

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/entities/hybrid_search</span>
    </div>
</div>

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/entities/search" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3,
    "outputFields": [
        "color"
    ]
}'
```
Possible response is similar to the following.
```json
{
    "code": 0,
    "data": [
        {
            "color": "pink_8682",
            "distance": 1,
            "id": 0
        },
        {
            "color": "red_7025",
            "distance": 0.6290165,
            "id": 1
        },
        {
            "color": "red_4794",
            "distance": 0.5975797,
            "id": 4
        }
    ]
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
    "collectionName": "string",
    "partitionNames": [],
    "search": [
        {
            "data": [],
            "annsField": "string",
            "filter": "string",
            "groupingField": "string",
            "metricType": "string",
            "limit": "integer",
            "offset": "integer",
            "ignoreGrowing": "boolean",
            "params": {
                "radius": "integer",
                "range_filter": "integer"
            }
        }
    ],
    "rerank": "string",
    "limit": "integer",
    "outputFields": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the collection to which this operation applies.  |
| `partitionNames` | __array__<br/>The name of the partitions to which this operation applies. |
| `partitionNames[]`  | __string__<br/>PartitionName  |
| `search` | __array__<br/> |
| `search[]` | __object__<br/>The parameter settings specific to this operation. |
| `search[][].data` | __array__<br/>A list of vector embeddings.<include target="milvus">Milvus</include><include target="zilliz">Zilliz Cloud</include> searches for the most similar vector embeddings to the specified ones. |
| `search[][].data[]`  | __number<float32>__<br/>A vector embedding  |
| `search[].annsField`  | __string__<br/>  |
| `search[].filter`  | __string__<br/>  |
| `search[].groupingField`  | __string__<br/>  |
| `search[].metricType`  | __string__<br/>The name of the metric type that applies to the current search. The value should be the same as the metric type of the target collection.<br/>The value defaults to COSINE  |
| `search[].limit`  | __integer__<br/>  |
| `search[].offset`  | __integer__<br/>  |
| `search[].ignoreGrowing`  | __boolean__<br/>  |
| `search[].params` | __object__<br/>Extra search parameters. |
| `search[].params.radius`  | __integer__<br/>Determines the threshold of least similarity. When setting metric_type to L2, ensure that this value is greater than that of range_filter. Otherwise, this value should be lower than that of range_filter.  |
| `search[].params.range_filter`  | __integer__<br/>Refines the search to vectors within a specific similarity range. When setting metric_type to IP or COSINE, ensure that this value is greater than that of radius. Otherwise, this value should be lower than that of radius.  |
| `rerank` <span style="color:red">*</span> | __string__<br/>  |
| `limit`  | __integer__<br/>The total number of entities to return.<br/>You can use this parameter in combination with **offset** in **param** to enable pagination.<br/>The sum of this value and **offset** in **param** should be less than 16,384.  |
| `outputFields` | __array__<br/>An array of fields to return along with the search results. |
| `outputFields[]`  | __string__<br/>A field name  |

## Response

Returns the search results.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": [
        {}
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
