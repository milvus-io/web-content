# listUsers()

This method lists all users in Milvus.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listUsers();
```

## Parameters
None.

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
