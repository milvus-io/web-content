# closeConnection()

It is recommended to use this method to close the connection to Milvus only when all the required tasks have been completed to avoid any potential data loss or system errors.

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
// grpc client returns closed -> 4, connected -> 0
4;
```
