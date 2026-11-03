# ObjectEntity

Describes the protected object type a privilege applies to.

```typescript
export type ObjectEntity = { name: RbacObjects };
```

**FIELDS:**

- **name** (*string*) -

    The object type (an `RbacObjects` value, e.g. `Collection`, `Index`, `Global»).

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

res.entities.forEach(entity => console.log(entity.object)); // ObjectEntity
```

