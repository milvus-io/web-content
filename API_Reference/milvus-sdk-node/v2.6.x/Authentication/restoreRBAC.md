# restoreRBAC()

This operation restores RBAC configurations from a backup.

```javascript
await milvusClient.restoreRBAC(data)
```

## Request Syntax

```javascript
await milvusClient.backupRBAC({
    RBAC_meta: RBACMeta,
    timeout?: number
})
```

**PARAMETERS:**

- **RBAC_meta** ([RBACMeta](RBACMeta.md)) -

    **[REQUIRED]**

    The full RBAC meta to restore, including users, roles, grants, and privilege groups.

- **timeout** (*number*) -  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise\<ResStatus\>*

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


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const rbacMeta = {
    users: [],
    roles: [],
    grants: [],
    privilege_groups: []
}

await milvusClient.restoreRBAC({
  RBAC_meta: rbacMeta,
});
```

