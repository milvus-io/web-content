# describeRole()

This operation describes a specific role.

```javascript
describeRole(data): Promise<SelectRoleResponse>
```

## Request Syntax

```javascript
milvusClient.describeRole({
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

**Returns** *Promise\<SelectRoleResponse>*

This method returns a promise that resolves to a **SelectRoleResponse** object.

```javascript
{
    results: RoleResult[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **RoleResult** *(RoleResult[]) -*

    - **entities** (*GrantEntity[]*) -

        - **db_name** (*string*) -

            The name of the database(s) that the current role can access.

        - **grantor** (*Grantor*) -

            - **privilege** (*string*) -

                The privileges of the grantor

            - **user** (*string*) -

                The name of grantor.

        - **object** (*ObjectEntity*) -

            - **name** (*RbacObjects*) -

                The object of the role. Possible values include *Collection, Global, and User.*

        - **object_name** (*string*) -

            The name of the object.

        - **role** (*RoleEntity*) -

            - **name** (*string*) -

                The name of the current role.

    - **role** (*RoleEntity*) -

        - **name** (*string*) -

            The name of the current role.

    - **users** (*User[]*) -

        - **name** (*string*) -

            The name(s) of the user(s) with the specified role.

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
milvusClient.describeRole({roleName: 'myrole'});
```

