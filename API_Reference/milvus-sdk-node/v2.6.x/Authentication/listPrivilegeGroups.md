# listPrivilegeGroups()

This operation lists all privilege groups.

```javascript
await milvusClient.listPrivilegeGroups(data?)
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

**RETURNS** *Promise<ListPrivilegeGroupsResponse>*

This method returns a promise that resolves to a **ListPrivilegeGroupsResponse** object.

```javascript
{
    privilege_groups: PrivelegeGroup[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **privilege_groups** (*PrivelegeGroup[]*) -
A list of privilege groups defined in the current Milvus instance.

    - **group_name** (*string*) -

        The name of the privilege group.

    - **privileges** (*PrivilegeEntity[]*) -

        The privileges contained in the group.

        - **name** (*string*) -

        The privilege name (for example, **Insert**, **Search**, **CreateCollection**).

        - **name** (*string*) -

            The privilege name (for example, **Insert**, **Search**, **CreateCollection**).

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
await milvusClient.listPrivilegeGroups();
```

