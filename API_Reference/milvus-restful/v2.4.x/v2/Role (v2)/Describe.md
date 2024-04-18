# Describe Role

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/roles/describe</span>
    </div>
</div>

This operation describes the details of a specified role.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/roles/describe" \
--header "Content-Type: application/json" \
--data-raw '{
    "roleName": "readOnly"
}'
```
Possible response is similar to the following.
```json
{
    "code": 200,
    "data": [
        {
             "objectType": "Collection",
             "objectName": "*",
             "privilege": "Search",
             "roleName": "readOnly"
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
    "roleName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `roleName` <span style="color:red">*</span> | __string__<br/>The name of the role.  |

## Response

An object that contains the detailed desription of a role.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": [
        {
            "object_type": "string",
            "privilege": "string",
            "object_name": "string",
            "db_name": "string",
            "grantor": "string"
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
| `data` | __array__<br/>A list of privilege items. |
| `data[]` | __object__<br/> |
| `data[].object_type`  | __string__<br/>The type of the object to which the privilege belongs.  |
| `data[].privilege`  | __string__<br/>The privilege that is granted to the role.  |
| `data[].object_name`  | __string__<br/>The name of the object to which the role is granted the specified privilege.  |
| `data[].db_name`  | __string__<br/>The name of the database in which this operation has been executed.  |
| `data[].grantor`  | __string__<br/>The name of the user who granted a specific role to a user.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
