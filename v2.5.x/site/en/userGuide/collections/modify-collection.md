---
id: modify-collection.md
title: Modify Collection​
---

# Modify Collection​

You can rename a collection or change its settings. This page focuses on how to modify a collection.​

## Rename Collection​

You can rename a collection as follows.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
client.rename_collection(​
    old_name="my_collection",​
    new_name="my_new_collection"​
)​

```

```java
import io.milvus.v2.service.collection.request.RenameCollectionReq;​
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
​
String CLUSTER_ENDPOINT = "http://localhost:19530";​
String TOKEN = "root:Milvus";​
​
// 1. Connect to Milvus server​
ConnectConfig connectConfig = ConnectConfig.builder()​
    .uri(CLUSTER_ENDPOINT)​
    .token(TOKEN)​
    .build();​
    ​
MilvusClientV2 client = new MilvusClientV2(connectConfig);​
​
RenameCollectionReq renameCollectionReq = RenameCollectionReq.builder()​
        .collectionName("my_collection")​
        .newCollectionName("my_new_collection")​
        .build();​
​
client.renameCollection(renameCollectionReq);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
const res = await client.renameCollection({​
    oldName: "my_collection",​
    newName: "my_new_collection"​
});​

```

```go
import (​
    "context"​
    "fmt"​
    "log"​
​
    "github.com/milvus-io/milvus/client/v2"​
)​
​
ctx, cancel := context.WithCancel(context.Background())​
defer cancel()​
​
milvusAddr := "127.0.0.1:19530"​
token := "root:Milvus"​
​
cli, err := client.New(ctx, &client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
if err != nil {​
    log.Fatal("failed to connect to milvus server: ", err.Error())​
}​
​
defer cli.Close(ctx)​
​
err = cli.RenameCollection(ctx, client.NewRenameCollectionOption("my_collection", "my_new_collection"))​
if err != nil {​
    // handle error​
}​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "newCollectionName": "my_new_collection"​
}'​

```

## Set Collection TTL​

If the data of a collection needs to be cleaned after a specific period, consider setting its Time-To-Live (TTL) in seconds. Once the TTL times out, Milvus deletes all entities from the collection. The deletion is asynchronous, indicating that searches and queries are still possible before the deletion is complete.​

The following code snippet demonstrates how to change the TTL of a collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.alter_collection_properties(
  collection_name="collection_name",
  properties = {"collection.ttl.seconds": 500}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionReq;​
import java.util.HashMap;​
import java.util.Map;​
​
Map<String, String> properties = new HashMap<>();​
properties.put("collection.ttl.seconds", "60");​
​
AlterCollectionReq alterCollectionReq = AlterCollectionReq.builder()​
        .collectionName("my_collection")​
        .properties(properties)​
        .build();​
​
client.alterCollection(alterCollectionReq);​

```

```javascript
res = await client.alterCollection({​
    collection_name: "my_collection",​
    properties: {​
        "collection.ttl.seconds": 60​
    }​
})​

```

```go
import (​
    "context"​
    "fmt"​
    "log"​
​
    "github.com/milvus-io/milvus/client/v2"​
    "github.com/milvus-io/milvus/pkg/common"​
)​
​
​
ctx, cancel := context.WithCancel(context.Background())​
defer cancel()​
​
milvusAddr := "127.0.0.1:19530"​
token := "root:Milvus"​
​
cli, err := client.New(ctx, &client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
if err != nil {​
    log.Fatal("failed to connect to milvus server: ", err.Error())​
}​
​
defer cli.Close(ctx)​
​
err = cli.AlterCollection(ctx, client.NewAlterCollectionOption("my_collection").WithProperty(common.CollectionTTLConfigKey, 60))​
if err != nil {​
    // handle error​
}​

```

```curl
# Currently not available for REST

```
