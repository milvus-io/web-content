---
id: view-collections.md
title: "View Collections"
summary: "You can obtain the name list of all the collections in the currently connected database, and check the details of a specific collection."
---

# View Collections

You can obtain the name list of all the collections in the currently connected database, and check the details of a specific collection.

## List Collections

The following example demonstrates how to obtain the name list of all collections in the currently connected database.

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
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

res = client.list_collections()

print(res)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.response.ListCollectionsResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

ListCollectionsResp resp = client.listCollections();
System.out.println(resp.getCollectionNames());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://localhost:19530"
token := "root:Milvus"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
defer client.Close(ctx)

collectionNames, err := client.ListCollections(ctx, milvusclient.NewListCollectionOption())
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(collectionNames)
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let collections = client
    .list_collections(ListCollectionsRequest::builder().build()?)
    .await?;
println!("{:?}", collections.collection_names());
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

milvus::ListCollectionsResponse response;
status = client->ListCollections(milvus::ListCollectionsRequest(), response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& name : response.CollectionNames()) {
    std::cout << "\t" << name << std::endl;
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'http://localhost:19530',
    token: 'root:Milvus'
});

const collections = await client.listCollections();
console.log(collections);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var res = await client.ListCollectionsAsync(new ListCollectionsReq());
foreach (var name in res.CollectionNames)
{
    Console.WriteLine(name);
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{}'
```

If you have already created a collection named `quick_setup`, the result of the above example should be similar to the following.

```json
["quick_setup"]
```

<div class="alert note">

`list_collections()` returns the names of all collections in the currently connected database and is not intended for existence checks. To check whether a specific collection exists, use `has_collection()` instead (e.g. `client.has_collection("quick_setup")` returns a boolean), or its equivalent in other SDKs.

</div>

## Describe Collection

You can also obtain the details of a specific collection. The following example assumes that you have already created a collection named quick_setup.

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
res = client.describe_collection(
    collection_name="quick_setup"
)

print(res)
```

```java
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

DescribeCollectionReq request = DescribeCollectionReq.builder()
        .collectionName("quick_setup")
        .build();
DescribeCollectionResp resp = client.describeCollection(request);
System.out.println(resp);
```

```go
collection, err := client.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption("quick_setup"))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

fmt.Println(collection)
```

```rust
use milvus::v2::prelude::*;

let description = client
    .describe_collection(
        DescribeCollectionRequest::builder()
            .collection_name("quick_setup")
            .build()?,
    )
    .await?;

println!("{:?}", description.description());
```

```cpp
#include <iostream>

milvus::DescribeCollectionResponse response;
auto status = client->DescribeCollection(milvus::DescribeCollectionRequest()
                                            .WithCollectionName("quick_setup"),
                                         response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "Collection name: " << response.Desc().CollectionName() << std::endl;
std::cout << "Collection ID: " << response.Desc().ID() << std::endl;
```

```javascript
const res = await client.describeCollection({
    collection_name: "quick_setup"
});

console.log(res);
```

```csharp
using Milvus.Client.V2.Requests.Collection;

var res = await client.DescribeCollectionAsync(new DescribeCollectionReq
{
    CollectionName = "quick_setup"
});
Console.WriteLine(res.CollectionName);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup"
}'
```

The result of the above example should be similar to the following.

```plaintext
{
    'collection_name': 'quick_setup', 
    'auto_id': False, 
    'num_shards': 1, 
    'description': '', 
    'fields': [
        {
            'field_id': 100, 
            'name': 'id', 
            'description': '', 
            'type': <DataType.INT64: 5>, 
            'params': {}, 
            'is_primary': True
        }, 
        {
            'field_id': 101, 
            'name': 'vector', 
            'description': '', 
            'type': <DataType.FLOAT_VECTOR: 101>, 
            'params': {'dim': 768}
        }
    ], 
    'functions': [], 
    'aliases': [], 
    'collection_id': 456909630285026300, 
    'consistency_level': 2, 
    'properties': {}, 
    'num_partitions': 1, 
    'enable_dynamic_field': True
}
```

