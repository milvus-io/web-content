# listUsers()

This method lists all users in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

### Parameters

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

## Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  usernames: [ 'root','milvus' ],
}
```
