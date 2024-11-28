# describeUser()

This is a method template.

```javascript
describeUser(data): Promise<SelectUserResponse>
```

## Request Syntax

```javascript
milvusClient.describeUser({
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

**RETURNS** *Promise\<SelectUserResponse>*

This method returns a promise that resolves to a **SelectUserResponse** object.

```javascript
{
    result: UserResult[],
    status: ResStatus
}
```

**PARAMETERS:**

- **UserResult**

    A **UserResult** type.

    - **roles** (*RoleEntity[]*) -

        - **name** (*string*) - 

            The roles that have been granted to the user.

    - **user** (*User*) -

        - **name** (*string*) - 

            The roles that have been granted to the user.

- **ResStatus**

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
milvusClient.describeUser({username: 'name'})
```

