---
id: drop-collection.md
title: "Drop Collection"
summary: "You can drop a collection if it is no longer needed."
---

# Drop Collection

You can drop a collection if it is no longer needed.

<div class="alert note">

Unlike dropping a managed collection, which removes both the collection and the data, dropping an external collection only removes the collection and keeps the data intact.

</div>

## Examples

The following code snippets assume that you have a collection named **my_collection**.

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

client.drop_collection(
    collection_name="my_collection"
)
```

```java
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

DropCollectionReq dropCollectionParam = DropCollectionReq.builder()
        .collectionName("my_collection")
        .build();

client.dropCollection(dropCollectionParam);
```

```go
import (
    "context"
    "fmt"

    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
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
    // handle error
}
defer client.Close(ctx)

err = client.DropCollection(ctx, milvusclient.NewDropCollectionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

client
    .drop_collection(
        DropCollectionRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
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

status = client->DropCollection(milvus::DropCollectionRequest()
                                    .WithCollectionName("my_collection"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

const res = await client.dropCollection({
    collection_name: "my_collection"
});

console.log(res.error_code);

// Output
//
// Success
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;
using Milvus.Client.V2.Requests.Collection;

const string CLUSTER_ENDPOINT = "http://localhost:19530";

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = CLUSTER_ENDPOINT,
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

await client.DropCollectionAsync(new DropCollectionReq { CollectionName = "my_collection" });
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": {}
# }
```
