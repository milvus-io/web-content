# backupRBAC()

This operation backs up the current RBAC configurations.

```javascript
backupRBAC(data?): Promise<BackupRBACResponse>
```

## Request Syntax

```javascript
milvusClient.backupRBAC({
   timeout?: number
 })
```

**PARAMETERS:**

- **timeout** (*number*) -  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<BackupRBACResponse>*

This method returns a promise that resolves to a **BackupRBACResponse** object.

```javascript
{
    RBAC_meta: {
        users: User[],
        roles: RoleEntity[],
        grants: GrantEntity[],
        privilege_groups: PrivelegeGroup[],
    },
    status: {
        code: number,
        error_code: string | number,
        reason: string
    }
}
```

**PARAMETERS:**

- **RBAC_meta** (RBACMeta) -

    - **users** (*User[]*) -

        A list of user entities.

        - **name** (*string*) - 

            The name of a user.

    - **roles** (*RoleEntity[]*) -

        A list of role entities.

        - **name** (*string*) - 

            The name of a role.

    - **grants** (*GrantEntity[]*) -

        A list of grant entities.

        - **db_name** (*string*) -

            The database to which the object specified in the current grant belongs.

        - **grantor** (*Grantor*) -

            The user who performs the current grant and the granted privileges.

            - **user** (*User*) -

                The name of the grantor.

            - **privilege** （*PrivilegeEntity*) -   

                The privilege that has been granted.

        - **object** (*ObjectEntity*) -

            The type of the object that the current grant affects.

            - **name** (*RbacObjects*) - 

                The type of the affected object. Possible values are:

                - Collection

                - Global

                - User

        - **object_name** (string) -

            The name of the affected object.

        - **role** (*RoleEntity*) -   

            The name of the role affected in the current grant.

            - **name** (*string*) - 

                The name of the affected role.

    - **privilege_groups** (*PrivelegeGroup[]*) - 

        A list of privilege-group entities.

        - **group_name** (*string*) -

            The name of a privilege group.

        - **privileges** (*PrivilegeEntity[]*) -

            A list of privileges.

            - **name** (*string*) -

                The name of a privilege. 

- **status** (*ResStatus*) 

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
milvusClient.backupRBAC();
```

