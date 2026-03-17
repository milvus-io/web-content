# FieldData

This is the template class that represents column-based data for a single field. Concrete aliases cover every supported data type. Instances of the concrete types are used when inserting data via `InsertRequest::WithRowsData()` or reading query/search results via `QueryResults::OutputField()` and `SingleResult::OutputField()`.

```cpp
// Base abstract interface (not instantiated directly)
class Field {
    const std::string& Name() const;
    DataType Type() const;
    DataType ElementType() const;   // for ARRAY fields only
    virtual size_t Count() const = 0;
    virtual void Reserve(size_t count) = 0;
};

using FieldDataPtr = std::shared_ptr<Field>;

// Template class
template <typename T, DataType Dt>
class FieldData : public Field {
    explicit FieldData(std::string name);
    FieldData(std::string name, const std::vector<T>& data);
    FieldData(std::string name, const std::vector<T>& data, const std::vector<bool>& valid_data);

    StatusCode Add(const T& element);
    StatusCode AddNull();
    StatusCode Append(const std::vector<T>& elements);
    size_t Count() const;
    void Reserve(size_t count);
    virtual const std::vector<T>& Data() const;
    virtual T Value(size_t i) const;
    virtual bool IsNull(size_t i) const;
    virtual const std::vector<bool>& ValidData() const;
};
```

## Scalar type aliases

```cpp
using BoolFieldData        = FieldData<bool,             DataType::BOOL>;
using Int8FieldData        = FieldData<int8_t,           DataType::INT8>;
using Int16FieldData       = FieldData<int16_t,          DataType::INT16>;
using Int32FieldData       = FieldData<int32_t,          DataType::INT32>;
using Int64FieldData       = FieldData<int64_t,          DataType::INT64>;
using FloatFieldData       = FieldData<float,            DataType::FLOAT>;
using DoubleFieldData      = FieldData<double,           DataType::DOUBLE>;
using VarCharFieldData     = FieldData<std::string,      DataType::VARCHAR>;
using JSONFieldData        = FieldData<nlohmann::json,   DataType::JSON>;
using GeometryFieldData    = VarCharFieldData;   // geometry passed as WKT string
using TimestamptzFieldData = VarCharFieldData;   // timestamptz passed as ISO-8601 string
```

## Vector type aliases

```cpp
using FloatVecFieldData       = FieldData<std::vector<float>,                  DataType::FLOAT_VECTOR>;
using Float16VecFieldData     = FieldData<std::vector<uint16_t>,               DataType::FLOAT16_VECTOR>;
using BFloat16VecFieldData    = FieldData<std::vector<uint16_t>,               DataType::BFLOAT16_VECTOR>;
using Int8VecFieldData        = FieldData<std::vector<int8_t>,                 DataType::INT8_VECTOR>;
using SparseFloatVecFieldData = FieldData<std::map<uint32_t, float>,           DataType::SPARSE_FLOAT_VECTOR>;
// BinaryVecFieldData is a derived class (not a plain alias) with extra helpers
```

`BinaryVecFieldData` extends `FieldData<std::vector<uint8_t>, DataType::BINARY_VECTOR>` and adds string-based convenience methods: `AddAsString()`, `DataAsString()`, and static helpers `ToBinaryStrings()` / `ToBinaryString()` / `ToUnsignedChars()`.

## Array type aliases

```cpp
using ArrayBoolFieldData   = ArrayFieldData<bool,        DataType::BOOL>;
using ArrayInt8FieldData   = ArrayFieldData<int8_t,      DataType::INT8>;
using ArrayInt16FieldData  = ArrayFieldData<int16_t,     DataType::INT16>;
using ArrayInt32FieldData  = ArrayFieldData<int32_t,     DataType::INT32>;
using ArrayInt64FieldData  = ArrayFieldData<int64_t,     DataType::INT64>;
using ArrayFloatFieldData  = ArrayFieldData<float,       DataType::FLOAT>;
using ArrayDoubleFieldData = ArrayFieldData<double,      DataType::DOUBLE>;
using ArrayVarCharFieldData= ArrayFieldData<std::string, DataType::VARCHAR>;
using StructFieldData      = ArrayFieldData<nlohmann::json, DataType::STRUCT>;
```

`ArrayFieldData<T, Et>` extends `FieldData<std::vector<T>, DataType::ARRAY>` and stores each entity row as a `std::vector<T>`.

## Shared-pointer aliases

Every concrete type has a corresponding `*Ptr` alias, e.g.:

```cpp
using BoolFieldDataPtr    = std::shared_ptr<BoolFieldData>;
using Int64FieldDataPtr   = std::shared_ptr<Int64FieldData>;
using FloatVecFieldDataPtr= std::shared_ptr<FloatVecFieldData>;
// ... and so on for all types above
```

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Build column-based data and insert
auto id_col  = std::make_shared<Int64FieldData>("id");
auto vec_col = std::make_shared<FloatVecFieldData>("vec");
for (int64_t i = 0; i < 100; ++i) {
    id_col->Add(i);
    vec_col->Add(std::vector<float>(128, static_cast<float>(i) / 100.0f));
}

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

InsertResponse resp;
client->Insert(
    InsertRequest()
        .WithCollectionName("my_collection")
        .WithColumnsData({id_col, vec_col}),
    resp);

// Read field data from query results
QueryResponse qresp;
client->Query(
    QueryRequest()
        .WithCollectionName("my_collection")
        .WithFilter("id < 10")
        .AddOutputField("id")
        .AddOutputField("vec"),
    qresp);

auto id_data  = std::dynamic_pointer_cast<Int64FieldData>(
    qresp.Results().OutputField("id"));
auto vec_data = std::dynamic_pointer_cast<FloatVecFieldData>(
    qresp.Results().OutputField("vec"));
for (size_t i = 0; i < id_data->Count(); ++i) {
    std::cout << "id=" << id_data->Value(i)
              << " vec[0]=" << vec_data->Value(i)[0] << "\n";
}
```
