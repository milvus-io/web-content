# listRoles()

This operation lists all custom roles.

```javascript
await milvusClient.listRoles(data)
```

## Request Syntax

```javascript
await milvusClient.listRoles(
    includeUserInfo?: boolean,
    timeout?: number
)
```

**PARAMETERS:**

- **includeUserInfo** (*boolean*) -

    A boolean value indicating whether to include user information.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<SelectRoleResponse>*

This method returns a promise that resolves to a **SelectRoleResponse** object.

```javascript
{
    results: RoleResult[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **results** (*RoleResult[]*) -
A list of **RoleResult** objects, one per role defined in the current Milvus instance. For the full **RoleResult** field reference, refer to the `describeRole()` doc.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript

```

