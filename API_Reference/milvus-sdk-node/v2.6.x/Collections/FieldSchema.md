# FieldSchema

Describes the schema of one field as returned by the Milvus server, for example from `describeCollection()` or `getPkField()`.

```typescript
export type FieldSchema = {
  type_params: KeyValuePair<TypeParamKey, TypeParam>[];
  index_params: KeyValuePair[];
  fieldID: string | number;
  name: string;
  is_primary_key: boolean;
  description: string;
  data_type: keyof typeof DataType;
  autoID: boolean;
  state: string;
  element_type?: keyof typeof DataType;
  default_value?: number | string | null;
  dataType: DataType;
  is_partition_key?: boolean;
  is_dynamic?: boolean;
  is_clustering_key?: boolean;
  nullable?: boolean;
  is_function_output: boolean;
  fields?: FieldSchema[];
} & Partial<Record<TypeParamKey, TypeParam>>;
```

**FIELDS:**

- **type_params** (*KeyValuePair[]*) -

    The type parameters of the field.

- **index_params** (*KeyValuePair[]*) -

    The index parameters of the field.

- **fieldID** (*string* | *number*) -

    The ID of the field.

- **name** (*string*) -

    The name of the field.

- **is_primary_key** (*boolean*) -

    Whether the field serves as the primary key.

- **description** (*string*) -

    The description of the field.

- **data_type** (*keyof typeof DataType*) -

    The data type of the field, expressed as the key of the **DataType** enum.

- **autoID** (*boolean*) -

    Whether the primary field automatically increments upon data insertions.

- **state** (*string*) -

    The state of the field.

- **element_type** (*keyof typeof DataType*) -

    The element type of the field, set when the field is an **Array** field.

- **default_value** (*number* | *string* | *null*) -

    The default value of the field, when one is declared.

- **dataType** (*DataType*) -

    The data type of the field, expressed as a **DataType** enum value.

- **is_partition_key** (*boolean*) -

    Whether the field serves as the partition key.

- **is_dynamic** (*boolean*) -

    Whether the field is a dynamic field.

- **is_clustering_key** (*boolean*) -

    Whether the field serves as the clustering key.

- **nullable** (*boolean*) -

    Whether the field allows NULL values.

- **is_function_output** (*boolean*) -

    Whether the field is the output of a function.

- **fields** (*FieldSchema[]*) -

    The nested fields of the field, set when the field is a **Struct** field.

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

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const desc = await milvusClient.describeCollection({ collection_name: 'my_collection' });

// Each entry describes one field of the collection.
const fields = desc.schema.fields;
console.log(fields);
```
