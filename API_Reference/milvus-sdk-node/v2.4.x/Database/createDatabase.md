# createDatabase()

This operation creates a database.

```javascript
createDatabase(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.createDatabase({
    db_name: string,
    timeout?: number
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database to create.

    There should be no database that has the specified name. Otherwise, exceptions will occur.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const resStatus = await milvusClient.createDatabase({ db_name: 'new_db' });
```
