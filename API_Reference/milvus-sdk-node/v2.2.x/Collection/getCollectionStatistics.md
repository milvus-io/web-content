# getCollectionStatistics()

With this method, you can check the number of entities that exist within a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics(
  GetCollectionStatisticsReq
);
```

### GetCollectionStatisticsReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics({
  collection_name: "my_collection",
});
```

### Response

```javascript
// getCollectionStatistics returns
{
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' }
  stats: [ { key: 'row_count', value: '0' } ],
}
```
