# updateUser()

This method update user info in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createUser(UpdateUserReq);
```

### UpdateUserReq

| Parameters  | Description                                                                            | Type   |
| ----------- | -------------------------------------------------------------------------------------- | ------ |
| username    | The username used to log into Milvus                                                   | String |
| newPassword | The new password used to log into Milvus.                                              | String |
| oldPassword | The old password used to log into Milvus.                                              | String |
| timeout?    | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

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
