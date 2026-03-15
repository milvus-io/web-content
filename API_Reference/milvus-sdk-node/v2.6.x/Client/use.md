# use()

This operation sets the active database for the gRPC client. After calling this method, all subsequent operations will target the specified database.

```javascript
await milvusClient.use({ db_name: string })
```

## Request Syntax

```javascript
await milvusClient.use({
    db_name: string,
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database to use.

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
await client.use({ db_name: 'my_database' });
```
