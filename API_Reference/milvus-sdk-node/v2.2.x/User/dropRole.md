# dropRole()

This method drops a user role in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.dropRole(DropUserReq);
```

### DropUserReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| roleName  | The role name                                                                          | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.dropRole({
  roleName: "my-milvus-role",
});
```

## Response

```javascript
{ error_code: 'Success', reason: '' }
```
