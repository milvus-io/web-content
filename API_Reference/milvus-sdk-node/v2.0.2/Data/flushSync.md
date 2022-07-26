# flushSync()
This synchronous method is the same as the asynchronous method `flush()`. The difference is that this method ensures that data is flushed when the function result is returned. 

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.flushSync(FlushReq);
```

## Parameters
### FlushReq
| Parameter        | Description                 | type     | required |
| ---------------- | --------------------------- | -------- | -------- |
| collection_names | An array of the names of the collections to flush | String[] | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flushSync({
  collection_names: ['my_collection'],
});
```
## Return
```javascript
// flushSync return
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```
