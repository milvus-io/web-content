# getQuerySegmentInfo()
Notifies Proxy to return segments information from query nodes.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo(getQuerySegmentInfoReq);
```

## Parameter
### getQuerySegmentInfoReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collectionName  | Collection name | String | true     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo({
  collectionName: 'my_collection',
});
```
## Return
```javascript
// getQuerySegmentInfo return
{ status: { error_code: 'Success', reason: '' }, infos: [] }
```
