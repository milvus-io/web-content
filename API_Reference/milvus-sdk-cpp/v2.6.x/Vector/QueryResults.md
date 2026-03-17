# QueryResults

This class holds the column-based result data returned by a `Query()` call. Access it via `Results()` on a `QueryResponse` object.

```cpp
const QueryResults& results = response.Results();
```

**METHODS:**

- `FieldDataPtr OutputField(const std::string& name) const`

    Returns the named output field as a `FieldDataPtr`. Cast to the concrete type with `std::dynamic_pointer_cast<Int64FieldData>(results.OutputField("id"))`.

- `const std::vector<FieldDataPtr>& OutputFields() const`

    Returns all output fields in the order they were returned by the server.

- `const std::set<std::string>& OutputFieldNames() const`

    Returns the set of output field names that were requested in the query.

- `Status OutputRows(EntityRows& rows) const`

    Converts all result rows to a vector of JSON-like row maps and stores them in `rows`.

- `Status OutputRow(int i, EntityRow& row) const`

    Converts the row at index `i` to a JSON-like row map.

- `uint64_t GetRowCount() const`

    Number of rows returned. When the query uses `count(*)`, this returns the aggregate count.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

QueryResponse response;
auto status = client->Query(
    QueryRequest()
        .WithCollectionName("my_collection")
        .WithFilter("age > 20")
        .AddOutputField("id")
        .AddOutputField("age")
        .AddOutputField("vec"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const QueryResults& results = response.Results();
auto id_field  = std::dynamic_pointer_cast<Int64FieldData>(results.OutputField("id"));
auto age_field = std::dynamic_pointer_cast<Int32FieldData>(results.OutputField("age"));
std::cout << "Rows: " << results.GetRowCount() << "\n";
for (size_t i = 0; i < results.GetRowCount(); ++i) {
    std::cout << "  id=" << id_field->Value(i)
              << " age=" << age_field->Value(i) << "\n";
}
```
