# listUsers()

This method lists all users in Milvus.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

## Parameters

| Parameter | Description                                                                            | Type   | Required |
| --------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| timeout   | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

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
