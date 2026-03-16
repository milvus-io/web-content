# DataType

This Enum specifies the data type of a collection field. Pass a `DataType` value when constructing a `FieldSchema` or calling `FieldSchema::WithDataType()`.

**VALUES:**

*Scalar types:*

- **BOOL** (1) - Boolean value (`true` / `false`).

- **INT8** (2) - 8-bit signed integer (−128 to 127).

- **INT16** (3) - 16-bit signed integer.

- **INT32** (4) - 32-bit signed integer.

- **INT64** (5) - 64-bit signed integer. The only scalar type supported as a primary key.

- **FLOAT** (10) - 32-bit single-precision floating-point number.

- **DOUBLE** (11) - 64-bit double-precision floating-point number.

- **VARCHAR** (21) - Variable-length UTF-8 string. Requires `WithMaxLength()` (max 65535 bytes).

- **ARRAY** (22) - Array of scalar elements of a single type. Requires `WithElementType()` and `WithMaxCapacity()`.

- **JSON** (23) - Unstructured JSON document. Supports dynamic filtering on any nested key path.

- **GEOMETRY** (24) - Geometric/spatial data stored in Well-Known Binary (WKB) format.

- **TIMESTAMPTZ** (26) - Timestamp with timezone (RFC 3339 string).

*Vector types:*

- **BINARY_VECTOR** (100) - Bit-packed binary vector. Dimension must be a multiple of 8. Requires `WithDimension()`. Typically paired with `MetricType::HAMMING` or `MetricType::JACCARD`.

- **FLOAT_VECTOR** (101) - 32-bit float dense vector. Requires `WithDimension()`. The most common vector type.

- **FLOAT16_VECTOR** (102) - 16-bit half-precision (FP16) float vector. Requires `WithDimension()`. Uses half the memory of `FLOAT_VECTOR` with minimal recall loss.

- **BFLOAT16_VECTOR** (103) - Brain Float 16 (BF16) vector. Requires `WithDimension()`. Better numeric range than FP16; popular for ML model outputs.

- **SPARSE_FLOAT_VECTOR** (104) - Sparse float vector where most dimensions are zero. No fixed dimension. Used for keyword search with `MetricType::BM25`.

- **INT8_VECTOR** (105) - INT8 quantized dense vector. Requires `WithDimension()`. Smallest memory footprint among dense vector types.

*Multi-vector type:*

- **STRUCT** (201) - Multi-vector struct field containing several named sub-vectors. Used with `StructFieldSchema`.

*Internal:*

- **UNKNOWN** (0) - Uninitialized or unrecognized type. Do not use directly.

## Example

