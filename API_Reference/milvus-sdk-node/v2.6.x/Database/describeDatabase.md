# describeDatabase()

This operation describes a database, returning details such as the database name, ID, creation timestamp, and properties.

```javascript
await milvusClient.describeDatabase(data: DescribeDatabaseRequest)
```

## Request Syntax

```javascript
await milvusClient.describeDatabase({
    db_name: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    The name of the database to describe.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<DescribeDatabaseResponse\>*

The response contains `db_name`, `dbID`, `created_timestamp`, and `properties`.

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
const res = await client.describeDatabase({ db_name: 'default' });
console.log(res.db_name, res.dbID, res.properties);
```
