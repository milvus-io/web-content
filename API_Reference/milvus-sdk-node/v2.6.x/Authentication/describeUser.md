# describeUser()

This is a method template.

```javascript
await milvusClient.describeUser(data)
```

## Request Syntax

```javascript
await milvusClient.describeUser({
    includeRoleInfo?: boolean,
    timeout?: number,
    username: string
})
```

**PARAMETERS:**

- **username** (*string*) -

    **[REQUIRED]**

    The name of the user to describe.

- **includeRoleInfo** (*boolean*) -

    A boolean value indicating whether to include role information.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<SelectUserResponse>*

This method returns a promise that resolves to a **SelectUserResponse** object.

```javascript
{
    results: UserResult[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **results** (*UserResult[]*) -
A list of **UserResult** objects. For `describeUser()`, this list contains a single entry describing the requested user.

    - **user** (*User*) -

        A **User** object identifying the user.

        - **name** (*string*) -

        The username.

        - **name** (*string*) -

            The username.

    - **roles** (*RoleEntity[]*) -

        A list of roles assigned to this user.

        - **name** (*string*) -

        The role name.

        - **name** (*string*) -

            The role name.

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
milvusClient.describeUser({username: 'name'})
```

