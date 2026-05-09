---
id: drop-collection.md
title: "Drop Collection"
summary: "You can drop a collection if it is no longer needed."
---

# Drop Collection

You can drop a collection if it is no longer needed.

## Examples

The following code snippets assume that you have a collection named **my_collection**.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
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

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

DropCollectionReq dropQuickSetupParam = DropCollectionReq.builder()
        .collectionName("my_collection")
        .build();

client.dropCollection(dropQuickSetupParam);
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 10. Drop the collection
res = await client.dropCollection({
    collection_name: "my_collection"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"
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

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": {}
# }
```

