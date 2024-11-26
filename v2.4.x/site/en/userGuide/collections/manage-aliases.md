---
id: manage-aliases.md
title: Manage Aliases​
---

# Manage Aliases​

Milvus provides alias management capabilities. This page demonstrates the procedures to create, list, alter, and drop aliases.​

## Overview​

You can create aliases for your collections. A collection can have several aliases, but collections cannot share an alias. ​

Upon receiving a request against a collection, Milvus locates the collection based on the provided name. If the collection by the provided name does not exist, Milvus continues locating the provided name as an alias. You can use collection aliases to adapt your code to different scenarios.​

## Create Alias​

The following code snippet demonstrates how to create an alias for a collection.​

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
# 9. Manage aliases​
# 9.1. Create aliases​
client.create_alias(​
    collection_name="customized_setup_2",​
    alias="bob"​
)​
​
client.create_alias(​
    collection_name="customized_setup_2",​
    alias="alice"​
)​

```

```java
import io.milvus.v2.service.utility.request.CreateAliasReq;​
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
// 9. Manage aliases​
​
// 9.1 Create alias​
CreateAliasReq createAliasReq = CreateAliasReq.builder()​
        .collectionName("customized_setup_2")​
        .alias("bob")​
        .build();​
​
client.createAlias(createAliasReq);​
​
createAliasReq = CreateAliasReq.builder()​
        .collectionName("customized_setup_2")​
        .alias("alice")​
        .build();​
​
client.createAlias(createAliasReq);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
// 9. Manage aliases​
// 9.1 Create aliases​
res = await client.createAlias({​
    collection_name: "customized_setup_2",​
    alias: "bob"​
})​
​
console.log(res.error_code)​
​
// Output​
// ​
// Success​
// ​
​
res = await client.createAlias({​
    collection_name: "customized_setup_2",​
    alias: "alice"​
})​
​
console.log(res.error_code)​
​
// Output​
// ​
// Success​
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/create" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "bob",​
    "collectionName": "customized_setup_2"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/create" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "alice",​
    "collectionName": "customized_setup_2"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​

```

## List Aliases​

The following code snippet demonstrates the procedure to list the aliases allocated to a specific collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 9.2. List aliases​
res = client.list_aliases(​
    collection_name="customized_setup_2"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "aliases": [​
#         "bob",​
#         "alice"​
#     ],​
#     "collection_name": "customized_setup_2",​
#     "db_name": "default"​
# }​

```

```java
import io.milvus.v2.service.utility.request.ListAliasesReq;​
import io.milvus.v2.service.utility.response.ListAliasResp;​
​
// 9.2 List alises​
ListAliasesReq listAliasesReq = ListAliasesReq.builder()​
    .collectionName("customized_setup_2")​
    .build();​
​
ListAliasResp listAliasRes = client.listAliases(listAliasesReq);​
​
System.out.println(listAliasRes.getAlias());​
​
// Output:​
// [bob, alice]​

```

```javascript
// 9.2 List aliases​
res = await client.listAliases({​
    collection_name: "customized_setup_2"​
})​
​
console.log(res.aliases)​
​
// Output​
// ​
// [ 'bob', 'alice' ]​
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/list" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         "bob",​
#         "alice"​
#     ]​
# }​

```

## Describe Alias​

The following code snippet describes a specific alias in detail, including the name of the collection to which it has been allocated.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 9.3. Describe aliases​
res = client.describe_alias(​
    alias="bob"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "alias": "bob",​
#     "collection_name": "customized_setup_2",​
#     "db_name": "default"​
# }​

```

```java
import io.milvus.v2.service.utility.request.DescribeAliasReq;​
import io.milvus.v2.service.utility.response.DescribeAliasResp;​
​
// 9.3 Describe alias​
DescribeAliasReq describeAliasReq = DescribeAliasReq.builder()​
    .alias("bob")​
    .build();​
​
DescribeAliasResp describeAliasRes = client.describeAlias(describeAliasReq);​
​
System.out.println(describeAliasRes);​
​
// Output:​
// DescribeAliasResp(collectionName=customized_setup_2, alias=bob)​

```

```javascript
// 9.3 Describe aliases​
res = await client.describeAlias({​
    collection_name: "customized_setup_2",​
    alias: "bob"​
})​
​
console.log(res)​
​
// Output​
// ​
// {​
//   status: {​
//     extra_info: {},​
//     error_code: 'Success',​
//     reason: '',​
//     code: 0,​
//     retriable: false,​
//     detail: ''​
//   },​
//   db_name: 'default',​
//   alias: 'bob',​
//   collection: 'customized_setup_2'​
// }​
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/describe" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "bob"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "aliasName": "bob",​
#         "collectionName": "customized_setup_2",​
#         "dbName": "default"​
#     }​
# }​

```

## Alter Alias​

You can reallocate the alias already allocated to a specific collection to another.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 9.4 Reassign aliases to other collections​
client.alter_alias(​
    collection_name="customized_setup_1",​
    alias="alice"​
)​
​
res = client.list_aliases(​
    collection_name="customized_setup_1"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "aliases": [​
#         "alice"​
#     ],​
#     "collection_name": "customized_setup_1",​
#     "db_name": "default"​
# }​
​
res = client.list_aliases(​
    collection_name="customized_setup_2"​
)​
​
print(res)​
​
# Output​
#​
# {​
#     "aliases": [​
#         "bob"​
#     ],​
#     "collection_name": "customized_setup_2",​
#     "db_name": "default"​
# }​

```

```java
import io.milvus.v2.service.utility.request.AlterAliasReq;​
​
// 9.4 Reassign alias to other collections​
AlterAliasReq alterAliasReq = AlterAliasReq.builder()​
        .collectionName("customized_setup_1")​
        .alias("alice")​
        .build();​
​
client.alterAlias(alterAliasReq);​
​
ListAliasesReq listAliasesReq = ListAliasesReq.builder()​
        .collectionName("customized_setup_1")​
        .build();​
​
ListAliasResp listAliasRes = client.listAliases(listAliasesReq);​
​
System.out.println(listAliasRes.getAlias());​
​
listAliasesReq = ListAliasesReq.builder()​
        .collectionName("customized_setup_2")​
        .build();​
​
listAliasRes = client.listAliases(listAliasesReq);​
​
System.out.println(listAliasRes.getAlias());​
​
// Output:​
// [bob]​

```

```javascript
// 9.4 Reassign aliases to other collections​
res = await client.alterAlias({​
    collection_name: "customized_setup_1",​
    alias: "alice"​
})​
​
console.log(res.error_code)​
​
// Output​
// ​
// Success​
// ​
​
res = await client.listAliases({​
    collection_name: "customized_setup_1"​
})​
​
console.log(res.aliases)​
​
// Output​
// ​
// [ 'alice' ]​
// ​
​
res = await client.listAliases({​
    collection_name: "customized_setup_2"​
})​
​
console.log(res.aliases)​
​
// Output​
// ​
// [ 'bob' ]​
// ​
​

```

```go
// Go 缺失​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/alter" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "alice",​
    "collectionName": "customized_setup_1"​
}'​
​
# {​
#     "code": 0,​
#     "data": {}​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/describe" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "bob"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "aliasName": "bob",​
#         "collectionName": "customized_setup_2",​
#         "dbName": "default"​
#     }​
# }​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/aliases/describe" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "aliasName": "alice"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "aliasName": "alice",​
#         "collectionName": "customized_setup_1",​
#         "dbName": "default"​
#     }​
# }​

```

