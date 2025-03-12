# revokePrivilegeV2()

This operation revokes a privilege already assigned to a role.

```javascript
revokePrivilegeV2(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.revokePrivilege({
   role: string,
   privilege: string,
   db_name: string,
   collection_name: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **role** (*string*) -

    **[REQUIRED]**

    The name of the role from which to revoke the specified privileges.

- **privilege** (*string*) -

    **[REQUIRED]**

    The name of the privilege or privilege group to assign. 

    For details, refer to [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **db_name** (*string*) -

    **[REQUIRED]**

    The name of the target database of this operation. 

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the target collection of this operation. 

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
await milvusClient.revokePrivilegeV2({
    role: 'exampleRole',
    privilege: 'CreateCollection',
    db_name: 'exampleDB',
    collection_name: 'exampleCollection',
});
```

