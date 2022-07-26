# createUser()

This method creates a user in Milvus

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createUser({
  username: your_username,
  password: your_password,
});
```

## Parameters

### CreateUserReq

| Parameter | Description                                | Type   | Required |
| --------- | ------------------------------------------ | ------ | -------- |
| username  | The username of user can log in Mivlus     | String | True     |
| password  | The username of password can log in Mivlus | String | True     |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createUser({
  username: "milvus",
  password: "milvus",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
