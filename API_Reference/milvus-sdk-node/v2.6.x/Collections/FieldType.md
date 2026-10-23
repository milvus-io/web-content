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

- **autoID** (*boolean*) -

    Whether the primary key values are auto-generated.

- **default_value** (*number | string*) -

    The default value of the field.

- **nullable** (*boolean*) -

    Whether the field accepts null values.

- **external_field** (*string*) -

    The external field mapping name.

- **fields** (FieldType[])

    Nested fields, for struct fields.
