# DmlResults

This class carries the outcome of a data-mutation operation (insert, upsert, or delete). It is accessed via `Results()` on `InsertResponse`, `UpsertResponse`, or `DeleteResponse`.

```cpp
const DmlResults& results = response.Results();
```

**METHODS:**

- `const IDArray& IdArray() const`

    The IDs of the entities that were inserted, upserted, or deleted. For auto-ID collections the server fills this in after insert. See IDArray for how to read integer or string IDs.

- `uint64_t Timestamp() const`

    Server-side operation timestamp. Can be passed as the `guarantee_timestamp` in subsequent search or query calls to ensure read-your-writes consistency.

- `uint64_t InsertCount() const`

    Number of rows that were inserted. Populated for `InsertResponse` and `UpsertResponse`.

- `uint64_t DeleteCount() const`

    Number of rows that were deleted. Populated for `DeleteResponse` and `UpsertResponse`.

- `uint64_t UpsertCount() const`

    Number of rows that were upserted (inserted as new or replaced existing). Populated for `UpsertResponse`.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

auto id_col  = std::make_shared<Int64FieldData>("id");
auto vec_col = std::make_shared<FloatVecFieldData>("vec");
for (int64_t i = 0; i < 10; ++i) {
    id_col->Add(i);
    vec_col->Add(std::vector<float>(128, 0.1f));
}

InsertResponse resp;
auto status = client->Insert(
    InsertRequest()
        .WithCollectionName("my_collection")
        .WithColumnsData({id_col, vec_col}),
    resp);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const DmlResults& r = resp.Results();
std::cout << "Inserted: " << r.InsertCount() << " rows\n";
std::cout << "Timestamp: " << r.Timestamp() << "\n";
if (r.IdArray().IsIntegerID()) {
    for (auto id : r.IdArray().IntIDArray()) {
        std::cout << "  id=" << id << "\n";
    }
}
```
