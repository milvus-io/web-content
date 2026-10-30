# DataType

This is an enumeration that provides the following constants.

```python
class DataType(IntEnum):
    BOOL = 1
    INT8 = 2
    INT16 = 3
    INT32 = 4
    INT64 = 5
    FLOAT = 10
    DOUBLE = 11
    VARCHAR = 21
    ARRAY = 22
    JSON = 23
    GEOMETRY = 24
    TIMESTAMPTZ = 26
    STRUCT = 201
    BINARY_VECTOR = 100
    FLOAT_VECTOR = 101
    FLOAT16_VECTOR = 102
    BFLOAT16_VECTOR = 103
    INT8_VECTOR = 105
    SPARSE_FLOAT_VECTOR = 104
```

**Constants:**

- **BOOL** (1)

    Sets the data type to **Boolean**.

- **INT8** (2)

    Sets the data type to **Int8**.

- **INT16** (3)

    Sets the data type to **Int16**.

- **INT32** (4)

    Sets the data type to **Int32**.

- **INT64** (5)

    Sets the data type to **Int64**.

- **FLOAT** (10)

    Sets the data type to **Float**.

- **DOUBLE** (11)

    Sets the data type to **Double**.

- **VARCHAR** (21)

    Sets the data type to **Varchar**.

- **ARRAY** (22)

    Sets the data type to **Array**.

- **JSON** (23)

    Sets the data type to **JSON**.

- **GEOMETRY** (24)

    Sets the datatype to **Geometry**.

- **TIMESTAMPTZ** (26)

    Sets the datatype to **TIMESTAMPTZ**.

- **STRUCT** (201)

    Sets the data type of the elements in an Array field to **Struct**.

- **BINARY_VECTOR** (100)

    Sets the data type to **Binary Vector**.

- **FLOAT_VECTOR** (101)

    Sets the data type to **Float Vector**.

- **FLOAT16_VECTOR** (102)

    Sets the data type to **Float16 Vector**.

- **BFLOAT16_VECTOR** (103)

    Sets the data type to **BFloat16 Vector**.

- **INT8_VECTOR** (105)

    Sets the data type to **Int8 Vector**. This data type is designed for quantized deep learning models (e.g., ResNet, EfficientNet), which reduces model size and speeds up inference with minimal precision loss.

- **SPARSE_FLOAT_VECTOR** (104)

    Sets the data type to **Sparse Vector**.
