# Upsert

Inserts one or more entities into a collection.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://${MILVUS_URI}/v1/vector/upsert</span>
</div>

## Example

None

## Request

### Parameters

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
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which entities will be inserted.|
| `data`  | **object**(required)<br>An entity object. Note that the keys in the entity should match the collection schema.|

```json
{
    "collectionName": "string",
    "data": [],
    "dbName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which entities will be inserted.|
| `data`  | **array**(required)<br>An array of entity objects. Note that the keys in an entity object should match the collection schema|

## Response

Returns the number of inserted entities and an array of their IDs.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": 200,
    "data": {
        "upsertCount": "integer"
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
| `code`   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data`    | **object**<br>A data object. |
| `data.upsertCount`   | **integer**<br>The number of inserted entities. |
| `data.upsertIds`   | **array**<br>An array of the IDs of inserted entities. |
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

None