# listUsers()

This operation lists currently available users.

```javascript
listUsers(data): Promise<ListCredUsersResponse>
```

## Request Syntax

```javascript
milvusClient.listUsers()
```

**PARAMETERS:**

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

*Returns Promise\<ListCredUsersResponse>*

This method returns a promise that resolves to a **ListCredUsersResponse** object.

```javascript
{
    usernames: string
    status: ResStatus
}
```

**PARAMETERS:**

- **usernames** (*string[]*) -

    A list of user names.

- **ResStatus**

    A **ResStatus object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
milvusClient.listUsers()
```

