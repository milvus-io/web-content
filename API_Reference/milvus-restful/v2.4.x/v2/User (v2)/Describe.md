# Describe User

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/users/describe</span>
    </div>
</div>

This operation describes the detailed information of a specific user.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/users/describe" \
--header "Content-Type: application/json" \
--data-raw '{
    "userName": "milvusAdmin"
}'
```
Possible response is similar to the following.
```json
{
    "code": 0,
    "data": [
        "admin"
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
    "userName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `userName` <span style="color:red">*</span> | __string__<br/>The name of the user to describe.  |

## Response

Returns the name of the roles assigned to the specified user.

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
| `data` | __array__<br/>A list of roles already assigned to the user. |
| `data[]`  | __string__<br/>A list of item objects.  |
