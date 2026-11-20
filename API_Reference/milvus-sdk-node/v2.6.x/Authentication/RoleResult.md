# RoleResult

Describes one role and its associated users and grants, as returned by `describeRole()` and `listRoles()`.

```typescript
export type RoleResult = {
  users: User[];
  role: RoleEntity;
  entities: GrantEntity[];
};
```

**FIELDS:**

- **users** ([User](User.md)[]) -

    The users assigned to the role.

- **role** ([RoleEntity](RoleEntity.md)) -

    The role.

- **entities** ([GrantEntity](GrantEntity.md)[]) -

    The grants attached to the role, each describing a granted privilege on an object.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.listRoles();
console.log(res.results); // RoleResult[]
```
