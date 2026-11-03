# Grantor

Describes who granted a privilege and which privilege was granted.

```typescript
export type Grantor = { user: User; privilege: PrivilegeEntity };
```

**FIELDS:**

- **user** (*[User](User.md)*) -

    The grantor. See [User](User.md).

- **privilege** (*[PrivilegeEntity](PrivilegeEntity.md)*) -

    The granted privilege. See [PrivilegeEntity](PrivilegeEntity.md).

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

console.log(res.entities[0]?.grantor); // Grantor
```

