# dropDatabase()

`milvus v2.2.9+` & `node v2.2.12+`

This method drops a databases.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

await milvusClient.dropDatabase({
  db_name: DB_NAME,
});
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
}
```

### Parameters

| Parameters | Description                                                                                                                                                                       | Type   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| db_name    | Database name                                                                                                                                                                     | String |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
