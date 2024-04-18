# grantPrivilege()

This operation assigns a privilege to a role.

```javascript
grantPrivilege(data): Promise<ResStatus>
```

## Request Syntax{#request-syntax}

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

    The type of the privilege object to assign. 

    Possible values are **Global**, **Collection**, and **User**.

- **objectName** (*string*) -

    **[REQUIRED]**

    The name of the API to assign.  For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

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

## Example{#example}

```java
milvusClient.grantPrivilege({
   roleName: 'roleName',
   object: '*',
   objectName: 'Collection',
   privilegeName: 'CreateIndex'
 })
```

