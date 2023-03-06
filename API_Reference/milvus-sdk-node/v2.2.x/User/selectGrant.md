# selectGrant()

This method recieve a grant information from milvus.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).userManager.selectGrant(SelectGrantReq);
```

## Parameters

### SelectGrantReq

| Parameter     | Description                                                                                                                                           | Type    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| roleName      | The user role name                                                                                                                                    | String  |
| object        | Type of the operational object to which the specified privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive. | boolean |
| objectName    | Name of the object to which the role is granted the specified prvilege.                                                                               | string  |
| privilegeName | Name of the privilege to be granted to the role. This parameter is case-sensitive.                                                                    | string  |
| timeout?      | An optional duration of time in millisecond to allow for the RPC. Default is undefined                                                                | Number  |

## Example

```javascript
new milvusClient.userManager.selectGrant({
  roleName: "roleName",
  object: "*",
  objectName: "Collection",
  privilegeName: "CreateIndex",
});
```

## Return
