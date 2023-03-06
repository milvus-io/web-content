# checkHealth()

This method verifies the current status of Milvus to ensure its optimal functioning.

```javascript
new milvusClient(MILUVS_ADDRESS).checkHealth();
```

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).checkHealth();
```

### Response

```javascript
{
  isHealth: true,
}
```
