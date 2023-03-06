# hasRole()

This method checks if the role is existing.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.hasRole(HasRoleReq);
```

## Parameters

### HasRoleReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| roleName  | The role name                                                                          | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.hasRole({
  roleName: "my-role",
});
```

## Return
