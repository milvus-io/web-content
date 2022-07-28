# flush()
Milvus temporarily buffers newly inserted vectors in cache. This method is asynchronous and persists inserted entities to object storage. After calling this method, you need to wait for a period of time for the data to be flushed.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flush(FlushReq);
```

## Parameters
### FlushReq
| Parameter        | Description                 | Type     | Required |
| ---------------- | --------------------------- | -------- | -------- |
| collection_names | An array of the names of collections that contain the data to flush | String array | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flush({
  collection_names: ['my_collection'],
});
```

## Return
```javascript
// flush return
{
  status: { error_code: 'Success', reason: '' },
  coll_segIDs: { my_collection: { data: [] } }
}
```
