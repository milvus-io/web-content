# revokeRolePrivilege()

This method revokes privileges to a role.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.RevokeRolePrivilegeReq(
  revokeRolePrivilegeReq
);
```

### RevokeRolePrivilegeReq

| Parameters    | Description                                                                                                                                           | Type    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| roleName      | The user role name                                                                                                                                    | String  |
| object        | Type of the operational object to which the specified privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive. | boolean |
| objectName    | Name of the object to which the role is granted the specified prvilege.                                                                               | string  |
| privilegeName | Name of the privilege to be granted to the role. This parameter is case-sensitive.                                                                    | string  |
| timeout?      | An optional duration of time in millisecond to allow for the RPC. Default is undefined                                                                | Number  |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILVUS_ADDRESS).userManager.revokeRolePrivilege({
  roleName: "roleName",
  object: "*",
  objectName: "Collection",
  privilegeName: "CreateIndex",
});
```

### Response
