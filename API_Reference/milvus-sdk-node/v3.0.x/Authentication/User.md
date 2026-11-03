# User

Describes a user by name. This is the plain data type from `milvus/types/User.ts` — not to be confused with the gRPC `User` resource client.

```typescript
export type User = { name: string };
```

**FIELDS:**

- **name** (*string*) -

    The user name.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.describeUser({
    username: 'root',
});

console.log(res.results[0]?.user); // User
```

