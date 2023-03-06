# deleteUser()

This method deletes a user in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.deleteUser(DeleteUserReq);
```

### DeleteUserReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| username  | The existing username in Milvus to delete                                              | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.deleteUser({
  username: "milvus",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
