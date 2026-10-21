# FieldData

`FieldData` is the template class for column-based field payloads. It stores the values of one field for insert, upsert, query, search, and iterator operations. `FieldDataPtr` is a `std::shared_ptr` to the base `Field` interface and is the type accepted by APIs that carry one or more field columns.

```cpp
class Field {
public:
    const std::string& Name() const;
    DataType Type() const;
    DataType ElementType() const;  // ARRAY fields only
    virtual size_t Count() const = 0;
    virtual void Reserve(size_t count) = 0;
};

using FieldDataPtr = std::shared_ptr<Field>;

template <typename T, DataType Dt>
class FieldData : public Field {
public:
    using ElementT = T;

    FieldData();
    explicit FieldData(std::string name);
    FieldData(std::string name, const std::vector<T>& data);
    FieldData(std::string name, const std::vector<T>& data,
              const std::vector<bool>& valid_data);
    FieldData(std::string name, std::vector<T>&& data);
    FieldData(std::string name, std::vector<T>&& data,
              std::vector<bool>&& valid_data);

    StatusCode Add(const T& element);
    StatusCode Add(T&& element);
    StatusCode AddNull();
    StatusCode Append(const std::vector<T>& elements);
    StatusCode Append(const std::vector<T>& elements,
                      const std::vector<bool>& valid_data);

    size_t Count() const final;
    void Reserve(size_t count) final;

    virtual const std::vector<T>& Data() const;
    virtual T Value(size_t i) const;
    virtual bool IsNull(size_t i) const;
    virtual const std::vector<bool>& ValidData() const;
};
```

**TEMPLATE PARAMETERS:**

- **T** (*C++ value type*)

    The C++ type used to store one element. For array and vector fields, this is itself a container type, as shown in the alias tables below.

- **Dt** (*[DataType](../Collections/DataType.md)*)

    The logical Milvus data type represented by this field payload.

**METHODS:**

- `StatusCode Add(const T& element)` / `StatusCode Add(T&& element)`

    Appends one element. Returns a non-success status if the element is invalid for the field type.

- `StatusCode AddNull()`

    Appends a null value to a nullable field.

- `StatusCode Append(const std::vector<T>& elements)`

    Appends all elements in one call.

- `StatusCode Append(const std::vector<T>& elements, const std::vector<bool>& valid_data)`

    Appends elements and validity metadata. An empty `valid_data` means every element is valid; otherwise, its size must equal `elements.size()` and `false` marks a null value.

- `size_t Count() const`

    Returns the number of elements in the column.

- `void Reserve(size_t count)`

    Pre-allocates storage for `count` elements.

- `const std::vector<T>& Data() const`

    Returns the stored elements.

- `T Value(size_t i) const`

    Returns the element at `i`.

- `bool IsNull(size_t i) const`

    Returns whether the element at `i` is null.

- `const std::vector<bool>& ValidData() const`

    Returns validity metadata for all elements.

*Inherited `Field` methods:*

- `Name()` returns the field name.
- `Type()` returns the field `DataType`.
- `ElementType()` returns the element `DataType` for an `ARRAY` field.

## Scalar and JSON aliases

| Alias | `DataType` | ElementT |
|---|---|---|
| `BoolFieldData` | `BOOL` | `bool` |
| `Int8FieldData` | `INT8` | `int8_t` |
| `Int16FieldData` | `INT16` | `int16_t` |
| `Int32FieldData` | `INT32` | `int32_t` |
| `Int64FieldData` | `INT64` | `int64_t` |
| `FloatFieldData` | `FLOAT` | `float` |
| `DoubleFieldData` | `DOUBLE` | `double` |
| `VarCharFieldData` | `VARCHAR` | `std::string` |
| `GeometryFieldData` | `GEOMETRY` | `std::string` (WKT) |
| `TimestamptzFieldData` | `TIMESTAMPTZ` | `std::string` (RFC 3339) |
| `JSONFieldData` | `JSON` | `nlohmann::json` |

## Vector aliases

| Alias | `DataType` | ElementT |
|---|---|---|
| `BinaryVecFieldData` | `BINARY_VECTOR` | `std::vector<uint8_t>` |
| `FloatVecFieldData` | `FLOAT_VECTOR` | `std::vector<float>` |
| `SparseFloatVecFieldData` | `SPARSE_FLOAT_VECTOR` | `std::map<uint32_t, float>` |
| `Float16VecFieldData` | `FLOAT16_VECTOR` | `std::vector<uint16_t>` |
| `BFloat16VecFieldData` | `BFLOAT16_VECTOR` | `std::vector<uint16_t>` |
| `Int8VecFieldData` | `INT8_VECTOR` | `std::vector<int8_t>` |

`BinaryVecFieldData` is a specialized class, not a simple `using` alias. It also supports binary strings:

```cpp
std::vector<std::string> DataAsString() const;
StatusCode AddAsString(const std::string& element);
StatusCode AddAsString(std::string&& element);
```

## Array aliases

Array fields use `ArrayFieldData<T, Et>`, which derives from `FieldData<std::vector<T>, DataType::ARRAY>`. Its `ElementT` is `std::vector<T>`.

| Alias | Element type |
|---|---|
| `ArrayBoolFieldData` | `bool` |
| `ArrayInt8FieldData` | `int8_t` |
| `ArrayInt16FieldData` | `int16_t` |
| `ArrayInt32FieldData` | `int32_t` |
| `ArrayInt64FieldData` | `int64_t` |
| `ArrayFloatFieldData` | `float` |
| `ArrayDoubleFieldData` | `double` |
| `ArrayVarCharFieldData` | `std::string` |
| `StructFieldData` | `nlohmann::json` (struct field) |

`ArrayFieldData` provides `Add(const ElementT&)` and `Add(ElementT&&)` to append one array value. Other element, count, validity, and reserve behavior is inherited from `FieldData`.

Each concrete alias also has a corresponding `XxxFieldDataPtr` alias, such as `Int64FieldDataPtr` and `FloatVecFieldDataPtr`.

## Example

```cpp
#include <milvus/types/FieldData.h>
using namespace milvus;

auto id = Int64FieldData("id");
id.Add(1001);

auto vector = FloatVecFieldData("vector");
vector.Add({0.1f, 0.2f, 0.3f});

FieldDataPtr id_ptr = std::make_shared<Int64FieldData>(id);
```
