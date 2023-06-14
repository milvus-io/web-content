# selectRole()

This method recieve a role information from milvus.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).selectRole({
  username: "my-username",
  includeUserInfo: true,
});
```

### Response

### Parameters

| Parameters       | Description                                                                                                                                                                       | Type    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| roleName         | The role name                                                                                                                                                                     | String  |
| includeUserInfo? | should result including user info, by default: true                                                                                                                               | boolean |
| timeout?         | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number  |
