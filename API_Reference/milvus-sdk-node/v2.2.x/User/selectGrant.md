# selectGrant()

This method retrieves the list of privileges granted to a role in Milvus.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILVUS_ADDRESS).selectGrant({
  roleName: "roleName",
  object: "*",
  objectName: "Collection",
  privilegeName: "CreateIndex",
});
```

### Response

### Parameters

| Parameters    | Description                                                                                                                                                                       | Type    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| roleName      | The user role name                                                                                                                                                                | String  |
| object        | Type of the operational object to which the specified privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive.                             | boolean |
| objectName    | Name of the object to which the role is granted the specified prvilege.                                                                                                           | string  |
| privilegeName | Name of the privilege to be granted to the role. This parameter is case-sensitive.                                                                                                | string  |
| timeout?      | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number  |
