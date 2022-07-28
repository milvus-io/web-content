# deleteUser()

This method deletes a user in Milvus.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.deleteUser({
  username: your_username,
});
```

## Parameters

### DeleteUserReq

| Parameter | Description                        | Type   | Required |
| --------- | ---------------------------------- | ------ | -------- |
| username  | The existing username in Milvus to delete    | String | True     |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.deleteUser({
  username: "milvus",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
