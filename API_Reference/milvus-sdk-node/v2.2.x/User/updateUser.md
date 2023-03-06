# updateUser()

This method update user info in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createUser(UpdateUserReq);
```

### UpdateUserReq

| Parameter   | Description                                                                            | Type   |
| ----------- | -------------------------------------------------------------------------------------- | ------ |
| username    | The username used to log into Milvus                                                   | String |
| newPassword | The new password used to log into Milvus.                                              | String |
| oldPassword | The old password used to log into Milvus.                                              | String |
| timeout?    | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.createUser({
  username: "milvus",
  oldPassword: "oldMilvusPass",
  newPassword: "newMilvusPass",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```
