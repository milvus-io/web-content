# listUsers()

Show all user informations in Milvus

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

## Parameters

### ListUserReq

| Parameter | Description | Type | Required |
| --------- | ----------- | ---- | -------- |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

## Return

```javascript
{
  status: { error_code: 'Success', reason: '' },
  usernames: [ 'root','milvus' ],
}
```
