# grantRole()

This operation grants a role to a user.

```javascript
grantRole(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.grantRole({
   username: string,
   roleName: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **username** (*str*) -

    **[REQUIRED]**

    The name of an existing user.

- **roleName** (*str*) -

    **[REQUIRED]**

    The name of the role to assign.

- **timeout** (number)  

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
milvusClient.grantRole({
   username: 'my',
   roleName: 'myrole'
 })
```

