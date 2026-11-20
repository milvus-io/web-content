# describeRole()

This operation describes a specific role.

```javascript
await milvusClient.describeRole(data)
```

## Request Syntax

```javascript
await milvusClient.describeRole({
    includeUserInfo?: boolean,
    roleName: string,
    timeout?: number
})
```

**PARAMETERS:**

- **roleName** (*string*) -

    **[REQUIRED]**

    The name of the role to describe.

- **includeUserInfo** (*boolean*) -

    A boolean value indicating whether to include user information.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise<SelectRoleResponse>*

This method returns a promise that resolves to a **SelectRoleResponse** object.

```javascript
{
    results: RoleResult[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **results** (*[RoleResult](RoleResult.md)[]*) -
A list of **RoleResult** objects. For `describeRole()`, this list contains a single entry describing the requested role. See [RoleResult](RoleResult.md).

- **status** (*ResStatus*) -
A **ResStatus** object with the following members.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
milvusClient.describeRole({roleName: 'myrole'});
```

