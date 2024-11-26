---
id: load-and-release.md
title: Load & Release
---

# Load & Release​

Loading a collection is the prerequisite to conducting similarity searches and queries in collections. This page focuses on the procedures for loading and releasing a collection.​

## Load Collection​

When you load a collection, Zilliz Cloud loads the index files and the raw data of all fields into memory for rapid response to searches and queries. Entities inserted after a collection load are automatically indexed and loaded.​

The following code snippets demonstrate how to load a collection.​

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
# 7. Load the collection​
client.load_collection(​
    collection_name="customized_setup_1"​
)​
​
res = client.get_load_state(​
    collection_name="customized_setup_1"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "state": "<LoadState: Loaded>"​
# }​

```

```java
import io.milvus.v2.service.collection.request.LoadCollectionReq;​
import io.milvus.v2.service.collection.request.GetLoadStateReq;​
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
// 6. Load the collection​
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()​
        .collectionName("customized_setup_1")​
        .build();​
​
client.loadCollection(loadCollectionReq);​
​
// 7. Get load state of the collection​
GetLoadStateReq loadStateReq = GetLoadStateReq.builder()​
        .collectionName("customized_setup_1")​
        .build();​
​
Boolean res = client.getLoadState(loadStateReq);​
System.out.println(res);​
​
// Output:​
// true​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
// 7. Load the collection​
res = await client.loadCollection({​
    collection_name: "customized_setup_1"​
})​
​
console.log(res.error_code)​
​
// Output​
// ​
// Success​
// ​
​
res = await client.getLoadState({​
    collection_name: "customized_setup_1"​
})​
​
console.log(res.state)​
​
// Output​
// ​
// LoadStateLoaded​
// ​

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
defer cli.Close(ctx)​
​
loadTask, err := cli.LoadCollection(ctx, client.NewLoadCollectionOption("customized_setup_1"))​
if err != nil {​
    // handle error​
}​
​
// sync wait collection to be loaded​
err = loadTask.Await(ctx)​
if err != nil {​
    // handle error​
}​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "customized_setup_1"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "customized_setup_1"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "loadProgress": 100,​
#         "loadState": "LoadStateLoaded",​
#         "message": ""​
#     }​
# }​

```

## Load Specific Fields​

Zilliz Cloud can load only the fields involved in searches and queries, reducing memory usage and improving search performance.​

The following code snippet assumes that you have created a collection named **customized_setup_2**, and there are two fields named **my_id** and **my_vector** in the collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.load_collection(​
    collection_name="customized_setup_1",​
    # highlight-next-line​
    load_fields=["my_id", "my_vector"] # Load only the specified fields​
    skip_load_dynamic_field=True # Skip loading the dynamic field​
)​
​
res = client.get_load_state(​
    collection_name="customized_setup_1"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "state": "<LoadState: Loaded>"​
# }​

```

```java
// 6. Load the collection​
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()​
        .collectionName("customized_setup_1")​
        .loadFields(Arrays.asList("my_id", "my_vector"))​
        .build();​
​
client.loadCollection(loadCollectionReq);​
​
// 7. Get load state of the collection​
GetLoadStateReq loadStateReq = GetLoadStateReq.builder()​
        .collectionName("customized_setup_1")​
        .build();​
​
Boolean res = client.getLoadState(loadStateReq);​
System.out.println(res);​

```

```javascript
await client.load_collection({​
  collection_name: "customized_setup_1",​
  load_fields: ["my_id", "my_vector"], // Load only the specified fields​
  skip_load_dynamic_field: true //Skip loading the dynamic field​
});​
​
const loadState = client.getCollectionLoadState({​
    collection_name: "customized_setup_1",​
})​
​
console.log(loadState);​

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
loadTask, err := cli.LoadCollection(ctx, client.NewLoadCollectionOption("customized_setup_1").​
    WithLoadFields("my_id", "my_vector"))​
if err != nil {​
    // handle error​
}​
​
// sync wait collection to be loaded​
err = loadTask.Await(ctx)​
if err != nil {​
    // handle error​
}​

```

```curl
# REST 缺失​

```

If you choose to load specific fields, it is worth noting that only the fields included in `load_fields` can be used as filters and output fields in searches and queries. You should always include the names of the primary field and at least one vector field in `load_fields`.​

You can also use `skip_load_dynamic_field` to determine whether to load the dynamic field. The dynamic field is a reserved JSON field named **$meta** and saves all non-schema-defined fields and their values in key-value pairs. When loading the dynamic field, all keys in the fields are loaded and available for filtering and output. If all keys in the dynamic field are not involved in metadata filtering and output, set `skip_load_dynamic_field` to `True`.​

To load more fields after the collection load, you need to release the collection first to avoid possible errors prompted because of index changes.​

## Release Collection​

Searches and queries are memory-intensive operations. To save the cost, you are advised to release the collections that are currently not in use.​

The following code snippet demonstrates how to release a collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 8. Release the collection​
client.release_collection(​
    collection_name="custom_quick_setup"​
)​
​
res = client.get_load_state(​
    collection_name="custom_quick_setup"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "state": "<LoadState: NotLoad>"​
# }​

```

```java
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;​
​
​
// 8. Release the collection​
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()​
        .collectionName("custom_quick_setup")​
        .build();​
​
client.releaseCollection(releaseCollectionReq);​
​
GetLoadStateReq loadStateReq = GetLoadStateReq.builder()​
        .collectionName("custom_quick_setup")​
        .build();​
Boolean res = client.getLoadState(loadStateReq);​
System.out.println(res);​
​
// Output:​
// false​

```

```javascript
// 8. Release the collection​
res = await client.releaseCollection({​
    collection_name: "custom_quick_setup"​
})​
​
console.log(res.error_code)​
​
// Output​
// ​
// Success​
// ​
​
res = await client.getLoadState({​
    collection_name: "custom_quick_setup"​
})​
​
console.log(res.state)​
​
// Output​
// ​
// LoadStateNotLoad​
// ​

```

```go
import (​
    "context"​
​
    "github.com/milvus-io/milvus/client/v2"​
)​
​
err := cli.ReleaseCollection(ctx, client.NewReleaseCollectionOption("custom_quick_setup"))​
if err != nil {​
    // handle error​
}​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/release" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "custom_quick_setup"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "custom_quick_setup"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "loadProgress": 0,​
#         "loadState": "LoadStateNotLoaded",​
#         "message": ""​
#     }​
# }​

```
