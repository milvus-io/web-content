# alterDatabase()

This operation modifies database properties, such as setting or deleting configuration key-value pairs.

```javascript
await milvusClient.alterDatabase(data: AlterDatabaseRequest)
```

## Request Syntax

```javascript
await milvusClient.alterDatabase({
    db_name: string,
    db_id?: string,
    properties: object,
    delete_keys?: string[],
    timeout?: number,
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    The name of the database.

- **db_id** (*string*) -

    The ID of the database to modify. Optional.

- **properties** (*object*) -

    **[REQUIRED]**

    An object of properties to set (e.g., `{ "database.resource_groups": "rg1" }` to set database resource groups).

- **delete_keys** (*string[]*) -

    Property keys to delete. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<ResStatus\>*

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
await client.alterDatabase({
    db_name: 'my_database',
    properties: { 'database.resource_groups': 'rg1' },
});
```
