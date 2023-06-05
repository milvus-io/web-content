# listDatabases()

This method lists all databases.

## Example

````javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

await milvusClient.listDatabases();

```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
}
````

### Parameters

| Parameters | Description                                                                                                                                                                       | Type   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
