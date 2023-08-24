# showCollections()

List all collections or get collection loading status.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).showCollections();
```

### Response

```javascript
// showCollections returns
{
  status: { error_code: 'Success', reason: '' },
  data: [
    {
      name: 'my_collection',
      id: '434826867399720961',
      timestamp: '1658732862090',
      loadedPercentage: undefined
    }
  ]，
  created_timestamps: [ '434826867399720964' ],
  created_utc_timestamps: [ '1658732862090' ],
}
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | type                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| collection_name | Name of the collections to check for their loading status                                                                                                                         | String[]            |
| type            | ShowCollectionsType                                                                                                                                                               | ShowCollectionsType |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number              |

#### ShowCollectionsType

| value | Description | type   |
| ----- | ----------- | ------ |
| 0     | All         | number |
| 1     | Loaded      | number |
