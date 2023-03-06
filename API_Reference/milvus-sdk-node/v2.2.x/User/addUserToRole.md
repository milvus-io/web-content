# addUserToRole()

This method add a user to role in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.addUserToRole(AddUserToRoleReq);
```

### AddUserToRoleReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| username  | The user name                                                                          | String |
| roleName  | The role name                                                                          | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.addUserToRole({
  username: "my-username",
  roleName: "my-milvus-role-name",
});
```

## Response

```javascript
{ error_code: 'Success', reason: '' }
```
