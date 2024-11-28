# listDatabases()

This operation lists all existing databases.

```javascript
listDatabases(data?): Promise<ListDatabasesResponse>
```

## Request Syntax

```javascript
milvusClient.listDatabases({
    timeout?: number
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |\<ListDatabaseResponse>*

This method returns a promise that resolves to a **ListDatabaseResponse** object.

```javascript
{
    db_names: string[],
    status: {
        code: number,
        error_code: string | number,
        reason: string
    }
}
```

**PARAMETERS:**

- **db_names** (*string[]*) -

    A list of database names.

- **status** (**ResStatus**) -

    The operation status.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const res = await milvusClient.listDatabases();
```
