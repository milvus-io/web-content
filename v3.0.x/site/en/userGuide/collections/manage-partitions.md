---
id: manage-partitions.md
title: "Manage Partitions"
summary: "A partition is a subset of a collection. Each partition shares the same data structure with its parent collection but contains only a subset of the data in the collection. This page helps you understand how to manage partitions."
---

# Manage Partitions

A partition is a subset of a collection. Each partition shares the same data structure with its parent collection but contains only a subset of the data in the collection. This page helps you understand how to manage partitions.

## Overview

When creating a collection, Milvus also creates a partition named **_default** in the collection. If you are not going to add any other partitions, all entities inserted into the collection go into the default partition, and all searches and queries are also carried out within the default partition.

You can add more partitions and insert entities into them based on certain criteria. Then you can restrict your searches and queries within certain partitions, improving search performance.

A collection can have a maximum of 1,024 partitions.

<div class="alert note">

The **Partition Key** feature is a search optimization based on partitions and allows Milvus to distribute entities into different partitions based on the values in a specific scalar field. This feature helps implement partition-oriented multi-tenancy and improves search performance.

This feature will not be discussed on this page. To find more, refer to [Use Partition Key](use-partition-key.md).

</div>

## List Partitions

When creating a collection, Milvus also creates a partition named **_default** in the collection. You can list the partitions in a collection as follows.

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

res = client.list_partitions(
    collection_name="my_collection"
)

print(res)

# Output
#
# ["_default"]
```

```java
import io.milvus.v2.service.partition.request.ListPartitionsReq;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

import java.util.*;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
        .collectionName("my_collection")
        .build();

List<String> partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

// Output:
// [_default]
```

```go
import (
    "context"
    
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://localhost:19530"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(partitionNames)
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let partitions = client
    .list_partitions(
        ListPartitionsRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
println!("{:?}", partitions.partition_names());

// Output
//
// ["_default"]
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListPartitionsResponse response;
status = client->ListPartitions(milvus::ListPartitionsRequest()
                                    .WithCollectionName("my_collection"),
                                response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& info : response.PartitionInfos()) {
    std::cout << "\t" << info.Name() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

let res = await client.listPartitions({
    collection_name: "my_collection"
})

console.log(res);

// Output
// ["_default"]
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Partition;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var res = await client.ListPartitionsAsync(new ListPartitionsReq
{
    CollectionName = "my_collection"
});
foreach (var name in res.PartitionNames)
{
    Console.WriteLine(name);
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": [
#         "_default"
#     ]
# }
```


## Create Partition

You can add more partitions to the collection and insert entities into these partitions based on certain criteria.

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
client.create_partition(
    collection_name="my_collection",
    partition_name="partitionA"
)

res = client.list_partitions(
    collection_name="my_collection"
)

print(res)

# Output
#
# ["_default", "partitionA"]
```

```java
import io.milvus.v2.service.partition.request.CreatePartitionReq;

CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .build();

client.createPartition(createPartitionReq);

ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
        .collectionName("my_collection")
        .build();

List<String> partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

// Output:
// [_default, partitionA]
```

```go
import (
    "fmt"
    
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

err = client.CreatePartition(ctx, milvusclient.NewCreatePartitionOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(partitionNames)
// Output
// ["_default", "partitionA"]
```

```rust
use milvus::v2::prelude::*;

client
    .create_partition(
        CreatePartitionRequest::builder()
            .collection_name("my_collection")
            .partition_name("partitionA")
            .build()?,
    )
    .await?;

let partitions = client
    .list_partitions(
        ListPartitionsRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
println!("{:?}", partitions.partition_names());

// Output
//
// ["_default", "partitionA"]
```

```cpp
auto status = client->CreatePartition(milvus::CreatePartitionRequest()
                                         .WithCollectionName("my_collection")
                                         .WithPartitionName("partitionA"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListPartitionsResponse response;
status = client->ListPartitions(milvus::ListPartitionsRequest().WithCollectionName("my_collection"), response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& info : response.PartitionInfos()) {
    std::cout << "\t" << info.Name() << std::endl;
}
```

```javascript
await client.createPartition({
    collection_name: "my_collection",
    partition_name: "partitionA"
})

res = await client.listPartitions({
    collection_name: "my_collection"
})

console.log(res)

// Output
// ["_default", "partitionA"]
```

```csharp
using Milvus.Client.V2.Requests.Partition;

await client.CreatePartitionAsync(new CreatePartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "partitionA"
});

var res = await client.ListPartitionsAsync(new ListPartitionsReq
{
    CollectionName = "my_collection"
});
foreach (var name in res.PartitionNames)
{
    Console.WriteLine(name);
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {}
# }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": [
#         "_default",
#         "partitionA"
#     ]
# }
```


## Check for a Specific Partition

The following code snippets demonstrate how to check whether a partition exists in a specific collection.

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
res = client.has_partition(
    collection_name="my_collection",
    partition_name="partitionA"
)

print(res)

# Output
#
# True
```

```java
import io.milvus.v2.service.partition.request.HasPartitionReq;

HasPartitionReq hasPartitionReq = HasPartitionReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .build();

Boolean hasPartitionRes = client.hasPartition(hasPartitionReq);
System.out.println(hasPartitionRes);

// Output:
// true
```

```go
result, err := client.HasPartition(ctx, milvusclient.NewHasPartitionOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(result)

// Output:
// true
```

```rust
use milvus::v2::prelude::*;

let has = client
    .has_partition(
        HasPartitionRequest::builder()
            .collection_name("my_collection")
            .partition_name("partitionA")
            .build()?,
    )
    .await?;
println!("{}", has.exists());

// Output
//
// true
```

```cpp
milvus::HasPartitionResponse response;
auto status = client->HasPartition(milvus::HasPartitionRequest()
                                    .WithCollectionName("my_collection")
                                    .WithPartitionName("partitionA"),
                                   response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Has() << std::endl;
```

```javascript
res = await client.hasPartition({
    collection_name: "my_collection",
    partition_name: "partitionA"
})

console.log(res.value)

// Output
// true
```

```csharp
using Milvus.Client.V2.Requests.Partition;

var hasResp = await client.HasPartitionAsync(new HasPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "partitionA"
});
Console.WriteLine(hasResp.Has);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/has" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {
#        "has": true
#     }
# }
```


## Load and Release Partitions

You can separately load or release one or certain partitions.

### Load Partitions

You can separately load specific partitions in a collection. It is worth noting that the load status of a collection stays unloaded if there is an unloaded partition in the collection.

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
client.load_partitions(
    collection_name="my_collection",
    partition_names=["partitionA"]
)

res = client.get_load_state(
    collection_name="my_collection",
    partition_name="partitionA"
)

print(res)
# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.service.partition.request.LoadPartitionsReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;

LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
        .collectionName("my_collection")
        .partitionNames(Collections.singletonList("partitionA"))
        .build();

client.loadPartitions(loadPartitionsReq);

GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .build();

Boolean getLoadStateRes = client.getLoadState(getLoadStateReq);
System.out.println(getLoadStateRes);

// True
```

```go
task, err := client.LoadPartitions(ctx, milvusclient.NewLoadPartitionsOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

// sync wait collection to be loaded
err = task.Await(ctx)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(state)
```

```rust
use milvus::v2::prelude::*;

client
    .load_partitions(
        LoadPartitionsRequest::builder()
            .collection_name("my_collection")
            .partition_names(["partitionA"])
            .build()?,
    )
    .await?;

let state = client
    .get_load_state(
        GetLoadStateRequest::builder()
            .collection_name("my_collection")
            .partition_names(["partitionA"])
            .build()?,
    )
    .await?;
println!("{:?}", state.state());

// Output
//
// Loaded
```

```cpp
auto status = client->LoadPartitions(milvus::LoadPartitionsRequest()
                                        .WithCollectionName("my_collection")
                                        .AddPartitionName("partitionA"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetLoadStateResponse response;
status = client->GetLoadState(milvus::GetLoadStateRequest()
                                .WithCollectionName("my_collection")
                                .AddPartitionName("partitionA"),
                              response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << milvus::to_string(response.State()) << std::endl;
```

```javascript
await client.loadPartitions({
    collection_name: "my_collection",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "my_collection",
    partition_name: "partitionA"
})

console.log(res)

// Output
//
// LoadStateLoaded
//
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Partition;

await client.LoadPartitionsAsync(new LoadPartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = new[] { "partitionA" }
});

var loadStateResp = await client.GetLoadStateAsync(new GetLoadStateReq
{
    CollectionName = "my_collection",
    PartitionNames = new[] { "partitionA" }
});
Console.WriteLine(loadStateResp.State);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/load" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionNames": ["partitionA"]
}'

# {
#     "code": 0,
#     "data": {}
# }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionNames": ["partitionA"]
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 100,
#         "loadState": "LoadStateLoaded",
#         "message": ""
#     }
# }
```


### Release Partitions

You can also release specific partitions.

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
client.release_partitions(
    collection_name="my_collection",
    partition_names=["partitionA"]
)

res = client.get_load_state(
    collection_name="my_collection",
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoaded>"
# }
```

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
        .collectionName("my_collection")
        .partitionNames(Collections.singletonList("partitionA"))
        .build();

client.releasePartitions(releasePartitionsReq);

GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .build();

Boolean getLoadStateRes = client.getLoadState(getLoadStateReq);
System.out.println(getLoadStateRes);

// False
```

```go
err = client.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(state)
```

```rust
use milvus::v2::prelude::*;

client
    .release_partitions(
        ReleasePartitionsRequest::builder()
            .collection_name("my_collection")
            .partition_names(["partitionA"])
            .build()?,
    )
    .await?;

let state = client
    .get_load_state(
        GetLoadStateRequest::builder()
            .collection_name("my_collection")
            .partition_names(["partitionA"])
            .build()?,
    )
    .await?;
println!("{:?}", state.state());

// Output
//
// NotLoad
```

```cpp
auto status = client->ReleasePartitions(milvus::ReleasePartitionsRequest()
                                .WithCollectionName("my_collection")
                                .AddPartitionName("partitionA"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetLoadStateResponse response;
status = client->GetLoadState(milvus::GetLoadStateRequest()
                                .WithCollectionName("my_collection")
                                .AddPartitionName("partitionA"),
                              response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << milvus::to_string(response.State()) << std::endl;
```

```javascript
await client.releasePartitions({
    collection_name: "my_collection",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "my_collection",
    partition_name: "partitionA"
})

console.log(res)

// Output
// 
// LoadStateNotLoaded
// 
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Partition;

await client.ReleasePartitionsAsync(new ReleasePartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = new[] { "partitionA" }
});

var loadStateResp = await client.GetLoadStateAsync(new GetLoadStateReq
{
    CollectionName = "my_collection",
    PartitionNames = new[] { "partitionA" }
});
Console.WriteLine(loadStateResp.State);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/release" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionNames": ["partitionA"]
}'

# {
#     "code": 0,
#     "data": {}
# }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionNames": ["partitionA"]
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 0,
#         "loadState": "LoadStateNotLoaded",
#         "message": ""
#     }
# }
```


## Data Operations Within Partitions

### Insert and Delete Entities

You can perform insert, upsert, and delete operations in specific operations. For details, refer to

- [Insert Entities into Partition](insert-update-delete.md#Insert-Entities-into-a-Partition)

- [Upsert Entities into Partition](upsert-entities.md#Upsert-Entities-in-a-Partition)

- [Delete Entities from Partition](delete-entities.md#Delete-Entities-from-Partitions)

### Search and Query

You can conduct searches and queries within specific partitions. For details, refer to 

- [Conduct ANN Searches within Partitions](single-vector-search.md#ANN-Search-in-Partition)

- [Conduct Metadata Filtering within Partitions](get-and-scalar-query.md#Queries-in-Partitions)

## Drop Partition

You can drop partitions that are no longer needed. Before dropping a partition, ensure that the partition has been released.

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
client.release_partitions(
    collection_name="my_collection",
    partition_names=["partitionA"]
)

client.drop_partition(
    collection_name="my_collection",
    partition_name="partitionA"
)

res = client.list_partitions(
    collection_name="my_collection"
)

print(res)

# ["_default"]
```

```java
import io.milvus.v2.service.partition.request.DropPartitionReq;
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;
import io.milvus.v2.service.partition.request.ListPartitionsReq;

ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
        .collectionName("my_collection")
        .partitionNames(Collections.singletonList("partitionA"))
        .build();

client.releasePartitions(releasePartitionsReq);

DropPartitionReq dropPartitionReq = DropPartitionReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .build();

client.dropPartition(dropPartitionReq);

ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
        .collectionName("my_collection")
        .build();

List<String> partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

// Output:
// [_default]
```

```go
err = client.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.DropPartition(ctx, milvusclient.NewDropPartitionOption("my_collection", "partitionA"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(partitionNames)
```

```rust
use milvus::v2::prelude::*;

client
    .release_partitions(
        ReleasePartitionsRequest::builder()
            .collection_name("my_collection")
            .partition_names(["partitionA"])
            .build()?,
    )
    .await?;

client
    .drop_partition(
        DropPartitionRequest::builder()
            .collection_name("my_collection")
            .partition_name("partitionA")
            .build()?,
    )
    .await?;

let partitions = client
    .list_partitions(
        ListPartitionsRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
println!("{:?}", partitions.partition_names());

// Output
//
// ["_default"]
```

```cpp
auto status = client->ReleasePartitions(milvus::ReleasePartitionsRequest()
                                            .WithCollectionName("my_collection")
                                            .AddPartitionName("partitionA"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropPartition(milvus::DropPartitionRequest()
                                .WithCollectionName("my_collection")
                                .WithPartitionName("partitionA"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListPartitionsResponse response;
status = client->ListPartitions(milvus::ListPartitionsRequest()
                                    .WithCollectionName("my_collection"),
                                response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& info : response.PartitionInfos()) {
    std::cout << "\t" << info.Name() << std::endl;
}
```

```javascript
await client.releasePartitions({
    collection_name: "my_collection",
    partition_names: ["partitionA"]
})

await client.dropPartition({
    collection_name: "my_collection",
    partition_name: "partitionA"
})

res = await client.listPartitions({
    collection_name: "my_collection"
})

console.log(res)

// Output
// ["_default"]
```

```csharp
using Milvus.Client.V2.Requests.Partition;

await client.ReleasePartitionsAsync(new ReleasePartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = new[] { "partitionA" }
});

await client.DropPartitionAsync(new DropPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "partitionA"
});

var res = await client.ListPartitionsAsync(new ListPartitionsReq
{
    CollectionName = "my_collection"
});
foreach (var name in res.PartitionNames)
{
    Console.WriteLine(name);
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/release" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionNames": ["partitionA"]
}'

# {
#     "code": 0,
#     "data": {}
# }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {}
# }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": [
#         "_default"
#     ]
# }
```
