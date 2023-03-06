# createRole()

This method create a user role in Milvus.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createRole({
  roleName: your_role_nname,
});
```

## Parameters

### CreateRoleReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| roleName  | The role name                                                                          | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createRole({
  roleName: "my-milvus-role",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
