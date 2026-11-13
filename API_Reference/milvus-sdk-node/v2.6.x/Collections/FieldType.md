# FieldType

Describes one field of a collection schema.

```typescript
export type FieldType = {
  name: string;
  description?: string;
  data_type: DataType | keyof typeof DataTypeMap;
  element_type?: DataType | keyof typeof DataTypeMap;
  is_primary_key?: boolean;
  is_partition_key?: boolean;
  is_function_output?: boolean;
  is_clustering_key?: boolean;
  type_params?: Partial<Record<TypeParamKey, TypeParam>>;
  autoID?: boolean;
  default_value?: number | string;
  nullable?: boolean;
  fields?: FieldType[];
} & Partial<Record<TypeParamKey, TypeParam>>;
```

**FIELDS:**

- **name** (*string*) -

    The field name.

- **description** (*string*) -

    Optional description of the field.

- **data_type** (*DataType | keyof typeof DataTypeMap*) -

    The field data type.

- **element_type** (*DataType | keyof typeof DataTypeMap*) -

    The element type, for array fields.

- **is_primary_key** (*boolean*) -

    Whether the field is the primary key.

- **is_partition_key** (*boolean*) -

    Whether the field is the partition key.

- **is_function_output** (*boolean*) -

    Whether the field is populated by a function (e.g. a text-embedding output).

- **is_clustering_key** (*boolean*) -

    Whether the field is the clustering key.

- **type_params** (*Partial<Record<TypeParamKey, TypeParam>>*) -

    Type parameters such as dimension or max length.

- **dim** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **max_length** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **max_capacity** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **analyzer_params** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **enable_analyzer** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **enable_match** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **multi_analyzer_params** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **mmap.enabled** (*TypeParam*) -

    Shorthand type_params key accepted directly on the field.

- **autoID** (*boolean*) -

    Whether the primary key values are auto-generated.

- **default_value** (*number | string*) -

    The default value of the field.

- **nullable** (*boolean*) -

    Whether the field accepts null values.

- **fields** (FieldType[])

    Nested fields, for struct fields.

## Example

```javascript
import { MilvusClient, DataType, FieldType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const fields = [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
    { name: 'text', data_type: DataType.VarChar, type_params: { max_length: 512 } },
    { name: 'vector', data_type: DataType.FloatVector, type_params: { dim: 8 } },
];

await milvusClient.createCollection({
    collection_name: 'my_collection',
    fields,
});
```

