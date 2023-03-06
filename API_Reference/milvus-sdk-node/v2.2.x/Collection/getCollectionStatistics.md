# getCollectionStatistics()

This method checks the row count of a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics(
  GetCollectionStatisticsReq
);
```

### GetCollectionStatisticsReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics({
  collection_name: "my_collection",
});
```

## Response

```javascript
// getCollectionStatistics return
{
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' }
  stats: [ { key: 'row_count', value: '0' } ],
}
```
