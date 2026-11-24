# OrderByFields

The order-by specification of a query: either a single field name or a list of order-by fields.

```typescript
export type OrderByFields = string | OrderByField[];
```

**FIELDS:**

- **OrderByField** (*OrderByField*) -

    One order-by field entry. It can be either a field name string or an object with the following members:

    - **field** (*string*) -

        The name of the field to sort by.

    - **order** (*OrderByOrder*) -

        The sort order. Possible values are `asc`, `desc`, `ascending`, and `descending`.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.search({
    collection_name: 'my_collection',
    vector: [0.1, 0.2, 0.3, 0.4],
    limit: 5,
    order_by_fields: [{ field: 'age', order: 'desc' }], // OrderByFields
});
```

