# FieldData

Base type for a single field's data within an insert/upsert row set.

```csharp
public abstract class FieldData
{
    public string FieldName { get; }
    public DataType DataType { get; }
    public bool IsDynamic { get; }
    public IReadOnlyList<bool>? ValidData { get; set; }
    public abstract int RowCount { get; }

    public static FieldData<TData> Create<TData>(string fieldName, IReadOnlyList<TData> data, bool isDynamic = false) { ... }
    public static FieldData<string> CreateVarChar(string fieldName, IReadOnlyList<string> data, bool isDynamic = false) { ... }
    public static FloatVectorFieldData CreateFloatVector(string fieldName, IReadOnlyList<ReadOnlyMemory<float>> data) { ... }
    public static Float16VectorFieldData CreateFloat16Vector(string fieldName, IReadOnlyList<ReadOnlyMemory<ushort>> data) { ... }
    public static BFloat16VectorFieldData CreateBFloat16Vector(string fieldName, IReadOnlyList<ReadOnlyMemory<ushort>> data) { ... }
    public static BinaryVectorFieldData CreateBinaryVectors(string fieldName, IReadOnlyList<ReadOnlyMemory<byte>> data) { ... }
    public static SparseFloatVectorFieldData CreateSparseFloatVector(string fieldName, IReadOnlyList<SparseVector<float>> data) { ... }
    public static FieldData<string> CreateJson(string fieldName, IReadOnlyList<string> json, bool isDynamic = false) { ... }
}

public class FieldData<TData> : FieldData
{
    public IReadOnlyList<TData> Data { get; }
}
```

**PARAMETERS:**

- `FieldName` (*string*) -

    The name of the field this data belongs to.

- `DataType` (*DataType*) -

    The Milvus data type of the field. See [DataType](../Collections/DataType.md).

- `IsDynamic` (*bool*) -

    Whether this is a dynamic (undefined) field.

- `ValidData` (*IReadOnlyList\<bool\>?*) -

    Optional per-row validity flags for nullable fields; rows whose flag is `false` are treated as `null`. When `null` (the default), all rows are considered valid. The mask length must equal `RowCount`.

- `RowCount` (*int*) -

    The number of rows in this field's data.

- `Data` (*IReadOnlyList\<TData\>*) -

    The field data values, one element per row.

**METHODS:**

- `Create<TData>(...)` (*static*) -

    Creates a scalar field data for the given values.

- `CreateVarChar(...)` (*static*) -

    Creates a `VarChar` field data.

- `CreateFloatVector(...)` (*static*) -

    Creates a `FloatVector` field data.

- `CreateFloat16Vector(...)` (*static*) -

    Creates a `Float16Vector` field data; each row is a list of FP16 bit patterns.

- `CreateBFloat16Vector(...)` (*static*) -

    Creates a `BFloat16Vector` field data; each row is a list of BFloat16 bit patterns.

- `CreateBinaryVectors(...)` (*static*) -

    Creates a `BinaryVector` field data.

- `CreateSparseFloatVector(...)` (*static*) -

    Creates a `SparseFloatVector` field data. See [SparseVector](SparseVector.md).

- `CreateJson(...)` (*static*) -

    Creates a `Json` field data; each row is a JSON string.
