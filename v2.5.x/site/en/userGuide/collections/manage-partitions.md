---
id: manage-partitions.md
title: Manage Partitions
---

# Manage Partitions​

A partition is a subset of a collection. Each partition shares the same data structure with its parent collection but contains only a subset of the data in the collection. This page helps you understand how to manage partitions.​

## Overview​

When creating a collection, Zilliz Cloud also creates a partition named **_default** in the collection. If you are not going to add any other partitions, all entities inserted into the collection go into the default partition, and all searches and queries are also carried out within the default partition.​

You can add more partitions and insert entities into them based on certain criteria. Then you can restrict your searches and queries within certain partitions, improving search performance.​

A collection can have a maximum of 1,024 partitions.​

<div class="alert note">

The **Partition Key** feature is a search optimization based on partitions and allows Zilliz Cloud to distribute entities into different partitions based on the values in a specific scalar field. This feature helps implement partition-oriented multi-tenancy and improves search performance.​

This feature will not be discussed on this page. To find more, refer to [​Use Partition Key](use-partition-key.md).​

</div>

## List Partitions​

When creating a collection, Zilliz Cloud also creates a partition named **_default** in the collection. You can list the partitions in a collection as follows.​

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
res = client.list_partitions(​
    collection_name="quick_setup"​
)​
​
print(res)​
​
# Output​
#​
# ["_default"]​

```

```java
import io.milvus.v2.service.partition.request.ListPartitionsReq;​
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
​
import java.util.*;​
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
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()​
        .collectionName("quick_setup")​
        .build();​
​
List<String> partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
// Output:​
// [_default]​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
let res = await client.listPartitions({​
    collection_name: "quick_setup"​
})​
​
console.log(res);​
​
// Output​
// ["_default"]​

```

```go
import (​
    "context"​
    ​
    client "github.com/milvus-io/milvus/client/v2/milvucclient"​
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
    // handle error​
}​
​
defer cli.Close(ctx)​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption("quick_setup"))​
if err != nil {​
    // handle error​
}​
​
fmt.Println(partitionNames)​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup"​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         "_default"​
#     ]​
# }​

```

## Create Partition​

You can add more partitions to the collection and insert entities into these partitions based on certain criteria.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.create_partition(​
    collection_name="quick_setup",​
    partition_name="partitionA"​
)​
​
res = client.list_partitions(​
    collection_name="quick_setup"​
)​
​
print(res)​
​
# Output​
#​
# ["_default", "partitionA"]​

```

```java
import io.milvus.v2.service.partition.request.CreatePartitionReq;​
​
CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()​
        .collectionName("quick_setup")​
        .partitionName("partitionA")​
        .build();​
​
client.createPartition(createPartitionReq);​
​
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()​
        .collectionName("quick_setup")​
        .build();​
​
List<String> partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
// Output:​
// [_default, partitionA]​

```

```javascript
await client.createPartition({​
    collection_name: "quick_setup",​
    partition_name: "partitionA"​
})​
​
res = await client.listPartitions({​
    collection_name: "quick_setup"​
})​
​
console.log(res)​
​
// Output​
// ["_default", "partitionA"]​

```

```go
import (​
    "fmt"​
    ​
    client "github.com/milvus-io/milvus/client/v2/milvusclient"​
)​
​
err = cli.CreatePartition(ctx, client.NewCreatePartitionOption("quick_setup", "partitionA"))​
if err != nil {​
    // handle error​
}​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption("quick_setup"))​
if err != nil {​
    // handle error​
}​
​
fmt.Println(partitionNames)​
// Output​
// ["_default", "partitionA"]​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/create" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionName": "partitionA"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup"​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         "_default",​
#         "partitionA"​
#     ]​
# }​

```

## Check for a Specific Partition​

The following code snippets demonstrate how to check whether a partition exists in a specific collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
res = client.has_partition(​
    collection_name="quick_setup",​
    partition_name="partitionA"​
)​
​
print(res)​
​
# Output​
#​
# True​

```

```java
import io.milvus.v2.service.partition.request.HasPartitionReq;​
​
HasPartitionReq hasPartitionReq = HasPartitionReq.builder()​
        .collectionName("quick_setup")​
        .partitionName("partitionA")​
        .build();​
​
Boolean hasPartitionRes = client.hasPartition(hasPartitionReq);​
System.out.println(hasPartitionRes);​
​
// Output:​
// true​

```

```javascript
res = await client.hasPartition({​
    collection_name: "quick_setup",​
    partition_name: "partitionA"​
})​
​
console.log(res.value)​
​
// Output​
// true​

```

```go
import (​
    "fmt"​
    ​
    "github.com/milvus-io/milvus/client/v2/milvusclient"​
)​
​
result, err := cli.HasPartition(ctx, milvusclient.NewHasPartitionOption("quick_setup", "partitionA"))​
if err != nil {​
    // handle error​
}​
​
fmt.Println(result)​
​
// Output:​
// true​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/has" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionName": "partitionA"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#        "has": true​
#     }​
# }​

```

## Load and Release Partitions​

You can separately load or release one or certain partitions.​

### Load Partitions​

You can separately load specific partitions in a collection. It is worth noting that the load status of a collection stays unloaded if there is an unloaded partition in the collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.load_partitions(​
    collection_name="quick_setup",​
    partition_names=["partitionA"]​
)​
​
res = client.get_load_state(​
    collection_name="quick_setup",​
    partition_name="partitionA"​
)​
​
print(res)​
# Output​
#​
# {​
#     "state": "<LoadState: Loaded>"​
# }​

```

```java
import io.milvus.v2.service.partition.request.LoadPartitionsReq;​
import io.milvus.v2.service.collection.request.GetLoadStateReq;​
​
​
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()​
        .collectionName("quick_setup")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .build();​
​
client.loadPartitions(loadPartitionsReq);​
​
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()​
        .collectionName("quick_setup")​
        .partitionName("partitionA")​
        .build();​
​
Boolean getLoadStateRes = client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
// True​

```

```javascript
await client.loadPartitions({​
    collection_name: "quick_setup",​
    partition_names: ["partitionA"]​
})​
​
res = await client.getLoadState({​
    collection_name: "quick_setup",​
    partition_name: "partitionA"​
})​
​
console.log(res)​
​
// Output​
// ​
// LoadStateLoaded​
// ​

```

```go
// Go 缺失​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/load" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"]​
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
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"]​
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

### Release Partitions​

You can also release specific partitions.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.release_partitions(​
    collection_name="quick_setup",​
    partition_names=["partitionA"]​
)​
​
res = client.get_load_state(​
    collection_name="quick_setup",​
    partition_name="partitionA"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "state": "<LoadState: NotLoaded>"​
# }​

```

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
​
ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()​
        .collectionName("quick_setup")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()​
        .collectionName("quick_setup")​
        .partitionName("partitionA")​
        .build();​
​
Boolean getLoadStateRes = client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
// False​

```

```javascript
await client.releasePartitions({​
    collection_name: "quick_setup",​
    partition_names: ["partitionA"]​
})​
​
res = await client.getLoadState({​
    collection_name: "quick_setup",​
    partition_name: "partitionA"​
})​
​
console.log(res)​
​
// Output​
// ​
// LoadStateNotLoaded​
// ​

```

```go
// Go 缺失​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/release" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"]​
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
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"]​
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

## Data Operations Within Partitions​

### Insert and Delete Entities​

You can perform insert, upsert, and delete operations in specific operations. For details, refer to​

- Insert Entities into Partition​

- Upsert Entities into Partition​

- Delete Entities from Partition​

### Search and Query​

You can conduct searches and queries within specific partitions. For details, refer to ​

- Conduct ANN Searches within Partitions​

- Conduct Metadata Filtering within Partitions​

## Drop Partition​

You can drop partitions that are no longer needed. Before dropping a partition, ensure that the partition has been released.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.release_partitions(​
    collection_name="quick_setup",​
    partition_names=["partitionA"]​
)​
​
client.drop_partition(​
    collection_name="quick_setup",​
    partition_name="partitionA"​
)​
​
res = client.list_partitions(​
    collection_name="quick_setup"​
)​
​
print(res)​
​
# ["_default"]​

```

```java
import io.milvus.v2.service.partition.request.DropPartitionReq;​
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
import io.milvus.v2.service.partition.request.ListPartitionsReq;​
​
ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()​
        .collectionName("quick_setup")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
DropPartitionReq dropPartitionReq = DropPartitionReq.builder()​
        .collectionName("quick_setup")​
        .partitionName("partitionA")​
        .build();​
​
client.dropPartition(dropPartitionReq);​
​
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()​
        .collectionName("quick_setup")​
        .build();​
​
List<String> partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
// Output:​
// [_default]​

```

```javascript
await client.releasePartitions({​
    collection_name: "quick_setup",​
    partition_names: ["partitionA"]​
})​
​
await client.dropPartition({​
    collection_name: "quick_setup",​
    partition_name: "partitionA"​
})​
​
res = await client.listPartitions({​
    collection_name: "quick_setup"​
})​
​
console.log(res)​
​
// Output​
// ["_default"]​

```

```go
// Go 缺失​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/release" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"]​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/drop" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionName": "partitionA"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/partitions/list" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup"​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         "_default"​
#     ]​
# }​

```
