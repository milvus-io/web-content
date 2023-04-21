# getLoadState()

Get the loading state of a collection.

```javascript
new milvusClient(MILUVS_ADDRESS).getLoadState(GetLoadStateReq);
```

### GetLoadStateReq

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to load                                                                                                                                                    | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).getLoadState({
  collection_name: "my_collection",
});
```

### Response

```javascript
// state should be one of LoadState
// enum LoadState {
//   LoadStateNotExist = 'LoadStateNotExist',
//   LoadStateNotLoad = 'LoadStateNotLoad',
//   LoadStateLoading = 'LoadStateLoading',
//   LoadStateLoaded = 'LoadStateLoaded',
// }
{
  status: { error_code: 'Success', reason: '' },
  state: 'LoadStateLoaded'
}
```
