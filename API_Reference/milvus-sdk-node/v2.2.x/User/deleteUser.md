# deleteUser()

This method deletes a user in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.deleteUser(DeleteUserReq);
```

### DeleteUserReq

| Parameters | Description                                                                            | Type   |
| ---------- | -------------------------------------------------------------------------------------- | ------ |
| username   | The existing username in Milvus to delete                                              | String |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.deleteUser({
  username: "milvus",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```
