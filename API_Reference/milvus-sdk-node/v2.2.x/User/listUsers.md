# listUsers()

This method lists all users in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

### Parameters

| Parameters | Description                                                                            | Type   |
| ---------- | -------------------------------------------------------------------------------------- | ------ |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  usernames: [ 'root','milvus' ],
}
```
