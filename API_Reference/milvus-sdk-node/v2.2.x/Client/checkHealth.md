# checkHealth()

This method check if Milvus is healthy at the moment.

# Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).checkHealth();
```

# Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).checkHealth();
```

# Return

```javascript
{
  isHealth: true,
}
```
