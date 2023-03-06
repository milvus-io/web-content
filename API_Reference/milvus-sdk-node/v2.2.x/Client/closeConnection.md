# closeConnection()

This method closes the connection to Milvus. Make sure you close the connection only when you are done.

```javascript
new milvusClient(MILUVS_ADDRESS).closeConnection();
```

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).closeConnection();
```

### Response

```javascript
// grpc client return closed -> 4, connected -> 0
4;
```
