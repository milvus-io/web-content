# getVersion()

This method get milvus version.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).getVersion();
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  version: 'v2.2.8'
}
```
