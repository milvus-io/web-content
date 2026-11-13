# RoleEntity

Describes a role.

```typescript
export type RoleEntity = { name: string };
```

**FIELDS:**

- **name** (*string*) -

    The role name.

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

