# addUserToRole()

This operation adds a user to a specific role.

```javascript
addUserToRole(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.addUserToRole({
   username: string,
   rolename: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **username** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of a user.

- **rolename** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of a role

- **timeout** (*number*) -  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;ResStatus&gt;*

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
milvusClient.addUserToRole({
    username: 'myUser',
    roleName: 'myRole'
});
```

