# releaseCollection()

With this method, you can release a specified collection from memory, freeing up resources and potentially improving system performance.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection(
  ReleaseCollectionReq
);
```

### ReleaseCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to release                                                      | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// releaseCollection returns
{ error_code: 'Success', reason: '' }
```
