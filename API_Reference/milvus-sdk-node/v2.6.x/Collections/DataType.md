# DataType

Defines the logical data types supported by Milvus fields.

```typescript
export enum DataType {
  None = 0,
  Bool = 1,
  Int8 = 2,
  Int16 = 3,
  Int32 = 4,
  Int64 = 5,

  Float = 10,
  Double = 11,

  VarChar = 21, // variable-length strings with a specified maximum length
  Array = 22,
  JSON = 23,
  Geometry = 24,
  Timestamptz = 26,

  BinaryVector = 100,
  FloatVector = 101,
  Float16Vector = 102,
  BFloat16Vector = 103,
  SparseFloatVector = 104,
  Int8Vector = 105,

  Struct = 201,
}
```

**Constants:**

- **None** (0)

    Sets the data type to **None**.

- **Bool** (1)

    Sets the data type to **Boolean**.

- **Int8** (2)

    Sets the data type to **Int8**.

- **Int16** (3)

    Sets the data type to **Int16**.

- **Int32** (4)

    Sets the data type to **Int32**.

- **Int64** (5)

    Sets the data type to **Int64**.

- **Float** (10)

    Sets the data type to **Float**.

- **Double** (11)

    Sets the data type to **Double**.

- **VarChar** (21)

    Sets the data type to **VarChar**, a variable-length string with a specified maximum length.

- **Array** (22)

    Sets the data type to **Array**.

- **JSON** (23)

    Sets the data type to **JSON**.

- **Geometry** (24)

    Sets the data type to **Geometry**.

- **Timestamptz** (26)

    Sets the data type to **Timestamptz**.

- **BinaryVector** (100)

    Sets the data type to **BinaryVector**.

- **FloatVector** (101)

    Sets the data type to **FloatVector**.

- **Float16Vector** (102)

    Sets the data type to **Float16Vector**.

- **BFloat16Vector** (103)

    Sets the data type to **BFloat16Vector**.

- **SparseFloatVector** (104)

    Sets the data type to **SparseFloatVector**.

- **Int8Vector** (105)

    Sets the data type to **Int8Vector**.

- **Struct** (201)

    Sets the data type to **Struct**. Note that this only applies to the elements in an **Array** field.
