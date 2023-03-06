# createRole()

This method create a user role in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createRole(CreateRoleReq);
```

### CreateRoleReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| roleName  | The role name                                                                          | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.createRole({
  roleName: "my-milvus-role",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
