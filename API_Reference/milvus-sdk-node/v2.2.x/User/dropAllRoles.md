# dropAllRoles()

This method iterate throught all roles, then revoke all granted privileges, then drop all roles.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.dropAllRoles();
```

### Parameters

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.dropAllRoles();
```

## Return
