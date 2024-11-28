# updatePassword()

This operation updates the password of a specific user.

```javascript
updatePassword(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.updateUser({
   username: string,
   newPassword: string,
   oldPassword: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **username** (*str*) -

    **[REQUIRED]**

    The name of an existing user.

- **oldPassword** (*str*) -

    **[REQUIRED]**

    The original password of the user.

- **newPassword** (*str*) -

    **[REQUIRED]**

    The new password of the user.

- **timeout** (*number*) -  

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
milvusClient.updateUser({
   username: 'exampleUser',
   newPassword: 'newPassword',
   oldPassword: 'oldPassword',
 })
```

