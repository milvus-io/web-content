# RoleEntity

Describes a role: its name and optional description.

```typescript
export type RoleEntity = { name: string; description?: string };
```

**FIELDS:**

- **name** (*string*) -

    The role name.

- **description** (*string*) -

    Optional description of the role.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.listGrants({
    roleName: 'exampleRole',
});

console.log(res.entities.map(entity => entity.role)); // RoleEntity[]
```

