# grantRolePrivilege()

This method grants privileges to a role.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.grantRolePrivilege(
  GrantRolePrivilegeReq
);
```

## Parameters

### GrantRolePrivilegeReq

| Parameter     | Description                                                                                                                                           | Type    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| roleName      | The user role name                                                                                                                                    | String  |
| object        | Type of the operational object to which the specified privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive. | boolean |
| objectName    | Name of the object to which the role is granted the specified prvilege.                                                                               | string  |
| privilegeName | Name of the privilege to be granted to the role. This parameter is case-sensitive.                                                                    | string  |
| timeout?      | An optional duration of time in millisecond to allow for the RPC. Default is undefined                                                                | Number  |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILVUS_ADDRESS).userManager.grantRolePrivilege({
  roleName: "roleName",
  object: "*",
  objectName: "Collection",
  privilegeName: "CreateIndex",
});
```

## Return
