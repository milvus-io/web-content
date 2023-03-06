# listRoles()

This method lists all roles in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.listRoles(ListGrantsReq);
```

### ListGrantsReq

| Parameters | Description                                                                            | Type   |
| ---------- | -------------------------------------------------------------------------------------- | ------ |
| timeout?   | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.listRoles();
```

### Response
