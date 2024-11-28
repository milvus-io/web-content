# grantPrivilege()

This operation assigns a privilege to a role.

```javascript
grantPrivilege(data): Promise<ResStatus>
```

## Request Syntax

```javascript
 milvusClient.grantPrivilege({
   roleName: string,
   object: string,
   objectName: string,
   privilegeName: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **roleName** (*string*) -

    **[REQUIRED]**

    The name of the role to assign privileges to.

- **object** (*string*) -

    **[REQUIRED]**

    The type of object for which the privilege is to be assigned.

    Possible values are as follows:

    - **Global**

        System-wide objects that allow the user to perform actions that affect all collections, users, or system-wide settings. When **object** is set to **Global**, set **objectName** to the wildcard (*****), indicating all objects of the specified type.

    - **Collection**

        Collection-specific objects that allow the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**

        Objects related to user management that allow the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- **objectName** (*string*) -

    **[REQUIRED]**

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object** is set to **Global**, set **objectName** to the wildcard (*****), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **privilegeName** (*string*) -

    **[REQUIRED]**

    The name of the privilege to assign. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **timeout** (*number*)  

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
milvusClient.grantPrivilege({
   roleName: 'roleName',
   object: 'Collection', // Valid value: Global, Collection or User.
   objectName: 'CollectionName', // The name of the collection to grant access to. Use "*" to grant access to all collections.
   privilegeName: 'CreateIndex'
 })
```

