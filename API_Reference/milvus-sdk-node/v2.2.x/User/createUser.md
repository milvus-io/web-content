# createUser()

This is a method for creating a user identity in Milvus.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createUser({
  username: "milvus",
  password: "milvus",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters | Description                                                                                                                                                                       | Type   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| username   | The username used to log into Milvus                                                                                                                                              | String |
| password   | The password used to log into Milvus.                                                                                                                                             | String |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
