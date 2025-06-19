# removePrivilegesFromGroup()

This operation removes privileges from a specific privilege group in Milvus.

```javascript
removePrivilegesFromGroup(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.removePrivilegesFromGroup({
   group_name: string,
   privileges: string[],
   timeout?: number
 })
```

**PARAMETERS:**

- **group_name** (*string*) -

    **[REQUIRED]**

    The name of a privilege group.

- **privileges** (*string[]*) -

    **[REQUIRED]**

    The list of privileges to remove from the above group.

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
await milvusClient.removePrivilegesFromGroup({
    group_name: 'exampleGroup',
    privileges: ['CreateCollection', 'DropCollection'],
});
```

