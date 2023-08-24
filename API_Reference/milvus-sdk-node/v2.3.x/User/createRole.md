# createRole()

This method creates a new role in Milvus.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createRole({
  roleName: "my-milvus-role",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters | Description                                                                                                                                                                       | Type   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| roleName   | The role name                                                                                                                                                                     | String |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
