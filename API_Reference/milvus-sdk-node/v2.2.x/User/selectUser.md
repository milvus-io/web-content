# selectUser()

This method gets all roles that belong to a specified user.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.selectUser(SelectUserReq);
```

## Parameters

### SelectUserReq

| Parameter        | Description                                                                            | Type    |
| ---------------- | -------------------------------------------------------------------------------------- | ------- |
| userName         | The user name                                                                          | String  |
| includeUserInfo? | should result including user info, by default: true                                    | boolean |
| timeout?         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number  |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.selectUser({
  username: "my-username",
  includeUserInfo: true,
});
```

## Return
