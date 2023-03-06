# createUser()

This method creates a user in Milvus.

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.createUser(CreateUserReq);
```

### CreateUserReq

| Parameter | Description                                                                            | Type   |
| --------- | -------------------------------------------------------------------------------------- | ------ |
| username  | The username used to log into Milvus                                                   | String |
| password  | The password used to log into Milvus.                                                  | String |
| timeout?  | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).userManager.createUser({
  username: "milvus",
  password: "milvus",
});
```

## Response

```javascript
{ error_code: 'Success', reason: '' }
```
