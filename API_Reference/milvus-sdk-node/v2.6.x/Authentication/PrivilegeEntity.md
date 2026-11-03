# PrivilegeEntity

Describes one privilege by name.

```typescript
export type PrivilegeEntity = { name: PrivilegesTypes };
```

**FIELDS:**

- **name** (*string*) -

    The privilege name (a `PrivilegesTypes` value, e.g. `Insert`, `Query`).

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.listPrivilegeGroups();

console.log(res.privilege_groups[0]?.privileges); // PrivilegeEntity[]
```

