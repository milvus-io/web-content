# ListCompactionTasks()

Lists detailed server-side compaction tasks for a collection.

```cpp
Status ListCompactionTasks(const ListCompactionTasksRequest& request, GetCompactionPlansResponse& response)
```

## Request Syntax

```cpp
auto request = ListCompactionTasksRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose compaction tasks are listed.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection whose compaction tasks are listed.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The response is the same `GetCompactionPlansResponse` envelope used by `GetCompactionPlans()`; its `Plans()` members are documented on [CompactionPlan](CompactionPlan.md).

- **response** (*GetCompactionPlansResponse*) -

    - **CollectionName** (*const std::string&*) -

        Returns the collection name to which the tasks belong.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::ListCompactionTasksRequest().WithCollectionName("demo");
milvus::GetCompactionPlansResponse response;
status = client->ListCompactionTasks(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (const auto& task : response.Plans()) {
    std::cout << "task " << task.PlanId() << " state "
              << static_cast<int>(task.State()) << '\n';
}
```
