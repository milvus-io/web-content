# useDatabase()

This operation sets the active database for the gRPC client.

```javascript
await milvusClient.useDatabase(data?)
```

## Request Syntax

```javascript
await milvusClient.useDatabase({
    db_name: string
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database to use.

    There should be a database with the specified name. Otherwise, exceptions will occur.

**RETURNS:**

*Promise<{ error_code: string, reason: string }>*

This method returns a promise that resolves to an object carrying the result status.

```javascript
{
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const resStatus = await milvusClient.useDatabase({ db_name: 'new_db' });
```
