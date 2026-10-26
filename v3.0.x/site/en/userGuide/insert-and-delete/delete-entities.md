---
id: delete-entities.md
title: "Delete Entities"
summary: "You can delete the entities that are no longer needed by filtering conditions or their primary keys."
---

# Delete Entities

You can delete the entities that are no longer needed by filtering conditions or their primary keys.

## Delete Entities by Filtering Conditions

When deleting multiple entities that share some attributes in a batch, you can use filter expressions. The example code below uses the **in** operator to bulk delete all entities with their **color** field set to the values of **red_7025** and **purple_4976**. You can also use other operators to construct filter expressions that meet your requirements. For more information about filter expressions, please refer to [Filtering Explained](boolean.md).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

res = client.delete(
    collection_name="quick_setup",
    # highlight-next-line
    filter="color in ['red_7025', 'purple_4976']"
)

print(res)

# Output
# {'delete_count': 2}
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.DeleteReq;
import io.milvus.v2.service.vector.response.DeleteResp;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

DeleteResp deleteResp = client.delete(DeleteReq.builder()
        .collectionName("quick_setup")
        .filter("color in ['red_7025', 'purple_4976']")
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

_, err = client.Delete(ctx, milvusclient.NewDeleteOption("quick_setup").WithExpr("color in ['red_7025', 'purple_4976']"))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let request = DeleteRequest::builder()
    .collection_name("quick_setup")
    .filter("color in ['red_7025', 'purple_4976']")
    .build()?;
let response = client.delete(request).await?;
println!("{:?}", response.delete_count());
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DeleteResponse response;
status = client->Delete(milvus::DeleteRequest()
                            .WithCollectionName("quick_setup")
                            .WithFilter("color in ['red_7025', 'purple_4976']"),
                        response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 7. Delete entities
res = await client.delete({
    collection_name: "quick_setup",
    // highlight-next-line
    filter: "color in ['red_7025', 'purple_4976']"
})

console.log(res.delete_cnt)

// Output
//
// 2
//
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

MutationResp res = await client.DeleteAsync(new DeleteReq
{
    CollectionName = "quick_setup",
    Expression = "color in [\"red_7025\", \"purple_4976\"]"
});
Console.WriteLine(res.DeleteCount);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "filter": "color in [\"red_7025\", \"purple_4976\"]"
}'
```

## Delete Entities by Primary Keys

In most cases, a primary key uniquely identifies an entity. You can delete entities by setting their primary keys in the delete request. The example code below demonstrates how to delete two entities with primary keys **18** and **19**.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.delete(
    collection_name="quick_setup",
    # highlight-next-line
    ids=[18, 19]
)

print(res)

# Output
# {'delete_count': 2}
```

```java
import io.milvus.v2.service.vector.request.DeleteReq;
import io.milvus.v2.service.vector.response.DeleteResp;

import java.util.Arrays;

DeleteResp deleteResp = client.delete(DeleteReq.builder()
        .collectionName("quick_setup")
        .ids(Arrays.asList(18, 19))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = client.Delete(ctx, milvusclient.NewDeleteOption("quick_setup").
    WithInt64IDs("id", []int64{18, 19}))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

    let request = DeleteRequest::builder()
        .collection_name("quick_setup")
        .ids(Ids::Int64(vec![18, 19]))
        .build()?;
    let response = client.delete(request).await?;
    println!("{:?}", response.delete_count());
```

```cpp
milvus::DeleteResponse response;
auto status = client->Delete(milvus::DeleteRequest()
                                .WithCollectionName("quick_setup")
                                .WithIDs(std::vector<int64_t>{18, 19}),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

res = await client.delete({
    collection_name: "quick_setup",
    ids: [18, 19]
})

console.log(res.delete_cnt)

// Output
//
// 2
//
```

```csharp
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;

MutationResp res = await client.DeleteAsync(new DeleteReq
{
    CollectionName = "quick_setup",
    Ids = [18, 19]
});
Console.WriteLine(res.DeleteCount);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "filter": "id in [18, 19]"
}'
## {"code":0,"cost":0,"data":{}}
```

## Delete Entities from Partitions

You can also delete entities stored in specific partitions. The following code snippets assume that you have a partition named **partitionA** in your collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.delete(
    collection_name="quick_setup",
    ids=[18, 19],
    partition_name="partitionA"
)

print(res)

# Output
# {'delete_count': 2}
```

```java
import io.milvus.v2.service.vector.request.DeleteReq;
import io.milvus.v2.service.vector.response.DeleteResp;

import java.util.Arrays;

DeleteResp deleteResp = client.delete(DeleteReq.builder()
        .collectionName("quick_setup")
        .ids(Arrays.asList(18, 19))
        .partitionName("partitionA")
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = client.Delete(ctx, milvusclient.NewDeleteOption("quick_setup").
    WithInt64IDs("id", []int64{18, 19}).
    WithPartition("partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

    let request = DeleteRequest::builder()
        .collection_name("quick_setup")
        .ids(Ids::Int64(vec![18, 19]))
        .partition_name("partitionA")
        .build()?;
    let response = client.delete(request).await?;
    println!("{:?}", response.delete_count());
```

```cpp
milvus::DeleteResponse response;
auto status = client->Delete(milvus::DeleteRequest()
                                .WithCollectionName("quick_setup")
                                .WithPartitionName("partitionA")
                                .WithIDs(std::vector<int64_t>{18, 19}),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

res = await client.delete({
    collection_name: "quick_setup",
    ids: [18, 19],
    partition_name: "partitionA"
})

console.log(res.delete_cnt)

// Output
//
// 2
//
```

```csharp
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;

MutationResp res = await client.DeleteAsync(new DeleteReq
{
    CollectionName = "quick_setup",
    Ids = [18, 19],
    PartitionName = "partitionA"
});
Console.WriteLine(res.DeleteCount);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "partitionName": "partitionA",
    "filter": "id in [18, 19]"
}'

# {
#     "code": 0,
#     "cost": 0,
#     "data": {}
# }
```
