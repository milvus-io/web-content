# deleteUser()

This operation drops a user.

```javascript
deleteUser(data): Promise<ResStatus>
```

## Request Syntax

This method has the following alternatives.

```javascript
milvusClient.deleteUser({
    username: string,
    timeout?: number
})
```

**PARAMETERS:**

- **username** (*string*) -

    **[REQUIRED]**

    The name of the user to drop.

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
milvusClient.deleteUser({
    username: 'exampleUser'
})
```

