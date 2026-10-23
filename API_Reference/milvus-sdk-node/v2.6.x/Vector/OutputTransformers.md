# OutputTransformers

Describes the per-datatype transformer functions applied to search results before they are returned.

```typescript
export type OutputTransformers = {
  [DataType.BFloat16Vector]?: (bf16bytes: Uint8Array) => BFloat16Vector;
  [DataType.Float16Vector]?: (f16: Uint8Array) => Float16Vector;
  [DataType.SparseFloatVector]?: (sparse: SparseVectorDic) => SparseFloatVector;
  [DataType.Int8Vector]?: (int8Vector: Int8Array) => Int8Vector;
};
```

**FIELDS:**

- **[DataType.BFloat16Vector]** (*(bf16bytes: Uint8Array) => BFloat16Vector*) -

    Transforms BFloat16 vector bytes.

- **[DataType.Float16Vector]** (*(f16: Uint8Array) => Float16Vector*) -

    Transforms Float16 vector bytes.

- **[DataType.SparseFloatVector]** (*(sparse: SparseVectorDic) => SparseFloatVector*) -

    Transforms sparse vector dictionaries.

- **[DataType.Int8Vector]** (*(int8Vector: Int8Array) => Int8Vector*) -

    Transforms Int8 vector arrays.
