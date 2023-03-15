# dropAllRoles()

This method iterates through all roles, revokes any granted privileges, and drops all roles.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.dropAllRoles();
```

### Parameters

| Parameters | Description                                                                            | Type   |
| ---------- | -------------------------------------------------------------------------------------- | ------ |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.dropAllRoles();
```

### Response
