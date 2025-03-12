# listPrivilegeGroups()

This operation lists all privilege groups.

```javascript
listPrivilegeGroups(data?): Promise<ListPrivilegeGroupsResponse>
```

## Request Syntax

```javascript
 milvusClient.listPrivilegeGroups({
   timeout?: number
 })
```

**PARAMETERS:**

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ListPrivilegeGroupsResponse>*

This method returns a promise that resolves to a **ListPrivilegeGroupsResponse** object.

```javascript
{
    privilege_groups: [
        {
            group_name: string,
            privileges: PrivilegeEntity[]
        },
        ...
    ],
    status: {
        code: number,
        error_code: string | number,
        reason: string    
    }
}
```

**PARAMETERS:**

- **privilege_groups** (*PrivelegeGroup[]*) -

    A list of all privilege groups in the form of a **PrivelegeGroup** object.

    - **group_name** (*string*) -

        The name of a privilege group.

    - **privileges** (*PrivilegeEntity[]*) -

        A list of privileges.

        - **name** (*string*) -

            The name of a privilege. 

- **status** (*ResStatus*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
await milvusClient.listPrivilegeGroups();
```

