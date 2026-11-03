# RBACMeta

Describes the full RBAC state carried by privilege backup and restore operations.

```typescript
export type RBACMeta = {
  users: User[];
  roles: RoleEntity[];
  grants: GrantEntity[];
  privilege_groups: PrivelegeGroup[];
};
```

**FIELDS:**

- **users** (*[User](User.md)[]*) -

    All users. See [User](User.md).

- **roles** (*[RoleEntity](RoleEntity.md)[]*) -

    All roles. See [RoleEntity](RoleEntity.md).

- **grants** (*[GrantEntity](GrantEntity.md)[]*) -

    All privilege grants. See [GrantEntity](GrantEntity.md).

- **privilege_groups** (*[PrivelegeGroup](PrivelegeGroup.md)[]*) -

    All privilege groups. See [PrivelegeGroup](PrivelegeGroup.md).

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.backupRBAC();

await milvusClient.restoreRBAC({
    RBAC_meta: res.RBAC_meta, // RBACMeta
});
```

