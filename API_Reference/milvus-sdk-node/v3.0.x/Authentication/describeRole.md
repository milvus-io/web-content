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
A list of **RoleResult** objects. For `describeRole()`, this list contains a single entry describing the requested role.

    - **role** (*RoleEntity*) -

        A **RoleEntity** object describing the role.

        - **name** (*string*) -

        The role name.

        - **name** (*string*) -

            The role name.

    - **users** (*User[]*) -

        A list of users that hold this role.

        - **name** (*string*) -

        The username.

        - **name** (*string*) -

            The username.

    - **entities** (*GrantEntity[]*) -

        A list of grants attached to this role. Each entry includes the granted privilege, the target object, and the user who granted it.

        - **role** (*RoleEntity*) -

        The role to which the privilege is granted.

        - **object** (*ObjectEntity*) -

        The object type the privilege applies to (for example, **Collection**, **Global**, **User**).

        - **object_name** (*string*) -

        The specific object name to which the privilege applies. Use `*` for all objects.

        - **grantor** (*Grantor*) -

        The principal that granted this privilege.

          - **user** (*User*) -

          The user who granted the privilege.

          - **privilege** (*PrivilegeEntity*) -

          The privilege that was granted.

        - **db_name** (*string*) -

        The database the grant applies to. Use `*` for all databases.

        - **role** (*RoleEntity*) -

            The role to which the privilege is granted.

        - **object** (*ObjectEntity*) -

            The object type the privilege applies to (for example, **Collection**, **Global**, **User**).

        - **object_name** (*string*) -

            The specific object name to which the privilege applies. Use `*` for all objects.

        - **grantor** (*Grantor*) -

            The principal that granted this privilege.

            - **user** (*User*) -

            The user who granted the privilege.

            - **privilege** (*PrivilegeEntity*) -

            The privilege that was granted.

            - **user** (*User*) -

                The user who granted the privilege.

            - **privilege** (*PrivilegeEntity*) -

                The privilege that was granted.

        - **db_name** (*string*) -

            The database the grant applies to. Use `*` for all databases.

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
milvusClient.describeRole({roleName: 'myrole'});
```

