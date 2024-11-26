---
id: delete-entities.md
title: Delete Entities
---

# Delete Entities​

You can delete the entities that are no longer needed by filtering conditions or their primary keys.​

## Delete Entities by Filtering Conditions​

When deleting multiple entities that share some attributes in a batch, you can use filter expressions. The example code below uses the **in** operator to bulk delete all Entities with thier **color** field set to the values of **red** and **green**. You can also use other operators to construct filter expressions that meet your requirements. For more information about filter expressions, please refer to [​Metadata Filtering](boolean.md).​

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
res = client.delete(​
    collection_name="quick_setup",​
    # highlight-next-line​
    filter="color in ['red_3314', 'purple_7392']"​
)​
​
print(res)​
​
# Output​
# {'delete_count': 2}​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.vector.request.DeleteReq;​
import io.milvus.v2.service.vector.response.DeleteResp;​
​
ilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .token("root:Milvus")​
        .build());​
​
DeleteResp deleteResp = client.delete(DeleteReq.builder()​
        .collectionName("quick_setup")​
        .filter("color in ['red_3314', 'purple_7392']")​
        .build());​
​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
// 7. Delete entities​
res = await client.delete({​
    collection_name: "quick_setup",​
    // highlight-next-line​
    filter: "color in ['red', 'green']"​
})​
​
console.log(res.delete_cnt)​
​
// Output​
// ​
// 3​
// ​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "filter": "color in [\"red_3314\", \"purple_7392\"]"​
}'​

```


## Delete Entities by Primary Keys​

In most cases, a primary key uniquely identifies an Entity. You can delete Entities by setting their primary keys in the delete request. The example code below demonstrates how to delete two entities with primary keys **18** and **19**.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>


```python
res = client.delete(​
    collection_name="quick_setup",​
    # highlight-next-line​
    ids=[18, 19]​
)​
​
print(res)​
​
# Output​
# {'delete_count': 2}​

```

```java
import io.milvus.v2.service.vector.request.DeleteReq;​
import io.milvus.v2.service.vector.response.DeleteResp;​
​
import java.util.Arrays;​
​
​
DeleteResp deleteResp = client.delete(DeleteReq.builder()​
        .collectionName("quick_setup")​
        .ids(Arrays.asList(18, 19))​
        .build());​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
res = await client.delete({​
    collection_name: "quick_setup",​
    ids: [18, 19]​
})​
​
console.log(res.delete_cnt)​
​
// Output​
// ​
// 2​
// ​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "filter": "id in [18, 19]"​
}'​
## {"code":0,"cost":0,"data":{}}​

```


## Delete Entities from Partitions​

You can also delete entities stored in specific partitions. The following code snippets assume that you have a partition named **PartitionA** in your collection. 

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>


```python
res = client.delete(​
    collection_name="quick_setup",​
    ids=[18, 19],​
    partition_name="partitionA"​
)​
​
print(res)​
​
# Output​
# {'delete_count': 2}​

```

```java
import io.milvus.v2.service.vector.request.DeleteReq;​
import io.milvus.v2.service.vector.response.DeleteResp;​
​
import java.util.Arrays;​
​
DeleteResp deleteResp = client.delete(DeleteReq.builder()​
        .collectionName("quick_setup")​
        .ids(Arrays.asList(18, 19))​
        .partitionName("partitionA")​
        .build());​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
res = await client.delete({​
    collection_name: "quick_setup",​
    ids: [18, 19],​
    partition_name: "partitionA"​
})​
​
console.log(res.delete_cnt)​
​
// Output​
// ​
// 2​
// ​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionName": "partitionA",​
    "filter": "id in [18, 19]"​
}'​
​
# {​
#     "code": 0,​
#     "cost": 0,​
#     "data": {}​
# }​

```
