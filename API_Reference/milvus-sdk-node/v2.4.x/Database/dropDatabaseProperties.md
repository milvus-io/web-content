# dropDatabaseProperties()

This operation resets the specified database properties to their defaults.

```javascript
dropDatabaseProperties(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.dropDatabaseProperties({
    db_name: string,
    properties: string[]
    timeout?: number
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database whose properties are to be modified.

    There should be no database that has the specified name. Otherwise, exceptions will occur.

- **properties** (*string&#91;&#93;*) -

    A list of the names of the database properties to reset. Possible values are as follows:

    - **database.replica.number** (*int*) -

        Number of replicas for the database.

    - **database.resource_groups** (*&#91;&#93;str*) -

        Resource groups dedicated to the database.

    - **database.diskQuota.mb** (*int*) -

        Disk quota allocated to the database in megabytes (**MB**).

    - **database.max.collections** (*int*) -

        Maximum number of collections allowed in the database.

    - **database.force.deny.writing** (*bool*) -

        Whether to deny all write operations in the database.

    - **database.force.deny.reading** (*bool*) -

        Whether to deny all read operations in the database.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |&lt;ResStatus&gt;*

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
const resStatus = await milvusClient.dropDatabaseProperties({
    db_name: 'my-db',
    delete_properties: ["database.replica.number"]
});
```

