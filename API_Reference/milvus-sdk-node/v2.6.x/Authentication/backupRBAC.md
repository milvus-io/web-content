# backupRBAC()

This operation backs up the current RBAC configurations.

```javascript
await milvusClient.backupRBAC(data?)
```

## Request Syntax

```javascript
await milvusClient.backupRBAC({
   timeout?: number
 })
```

**PARAMETERS:**

- **timeout** (*number*) -  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise<BackupRBACResponse>*

This method returns a promise that resolves to a **BackupRBACResponse** object.

```javascript
{
    RBAC_meta: RBACMeta,
    status:  ResStatus
}
```

**PARAMETERS:**

- **RBAC_meta** ([RBACMeta](RBACMeta.md)) -

A snapshot of all RBAC metadata in the current Milvus instance. Pass this value to `restoreRBAC()` to recreate the same users, roles, grants, and privilege groups in another instance. See [RBACMeta](RBACMeta.md) for the field reference.

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
milvusClient.backupRBAC();
```

