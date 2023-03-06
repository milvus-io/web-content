# selectRole()

This method recieve a role information from milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.selectRole(SelectRoleReq);
```

### SelectRoleReq

| Parameters       | Description                                                                            | Type    |
| ---------------- | -------------------------------------------------------------------------------------- | ------- |
| roleName         | The role name                                                                          | String  |
| includeUserInfo? | should result including user info, by default: true                                    | boolean |
| timeout?         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number  |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.selectRole({
  username: "my-username",
  includeUserInfo: true,
});
```

### Response
