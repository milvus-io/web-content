---
id: get-and-scalar-query.md
summary: In addition to ANN searches, Milvus also supports metadata filtering through queries. This page introduces how to use Query, Get, and QueryIterators to perform metadata filtering.​
title: Query
---

# Query​

In addition to ANN searches, Milvus also supports metadata filtering through queries. This page introduces how to use Query, Get, and QueryIterators to perform metadata filtering.​

## Overview​

A Collection can store various types of scalar fields. You can have Milvus filter Entities based on one or more scalar fields. Milvus offers three types of queries: Query, Get, and QueryIterator. The table below compares these three query types.​

<table data-block-token="DGeudDgTNo94IUxh4JpcSQuinMe"><thead><tr><th data-block-token="JomTdgqcwoeufXx8zBDcRGJwnXg" colspan="1" rowspan="1"><p data-block-token="QwjYdtBzUoPD7txs3IEc3xTWnIg">​</p>

</th><th data-block-token="XjpqdFHvfo4iWOxpBYrcKshZnse" colspan="1" rowspan="1"><p data-block-token="IeTFdFRa4ogyd8x99i4c1fRAnWf">Get​</p>

</th><th data-block-token="FTqrdhAPXowYTFxQusCcHMConse" colspan="1" rowspan="1"><p data-block-token="HstgdVh8eoLS4yxt6FWcVObCnte">Query​</p>

</th><th data-block-token="GKPBdkPuSowroJxhQUXcjWzpnyf" colspan="1" rowspan="1"><p data-block-token="K5Ztdh0YfobsHqxIumLcNe6qnkh">QueryIterator​</p>

</th></tr></thead><tbody><tr><td data-block-token="LgpCd46wWoj17kxyWWJc7re6nif" colspan="1" rowspan="1"><p data-block-token="X0yldaUHEoYWCBxVX2dcqVCon8c">Applicable scenarios​</p>

</td><td data-block-token="Hg3kdotuJoHIEJxAt7ecZULbnhd" colspan="1" rowspan="1"><p data-block-token="U3xtdrQBqoemt6xtM27cXwoEnUc">To find entities that hold the specified primary keys.​</p>

<p data-block-token="NEZkdIH0ponBzHxIX2fclJsNnQW">​</p>

</td><td data-block-token="ItBjdFLS3o4dtVxelAqc5kycnx7" colspan="1" rowspan="1"><p data-block-token="RNdudJ6wNo4RexxBfSjct1kCnHb">To find all or a specified number of entities that meet the custom filtering conditions​</p>

</td><td data-block-token="KWVzd15x5oJsO8xcEUechuM1n5d" colspan="1" rowspan="1"><p data-block-token="IEmzdCnYEoQeH5xnfafcPeITnkh">To find all entities that meet the custom filtering conditions in paginated queries.​</p>

</td></tr><tr><td data-block-token="McafdUcFUoyIlrxw147cL3BQnxf" colspan="1" rowspan="1"><p data-block-token="XajHdq8XToVoaAxsgXxcU1LInmh">Filtering method​</p>

</td><td data-block-token="JNWQd10C8ohTKox2cYUcGdalnrv" colspan="1" rowspan="1"><p data-block-token="XxVhdDCmVogQmXx3zshcy13enQe">By primary keys​</p>

</td><td data-block-token="PaMId2WSxoiTW8xJ6bAcPJbsntd" colspan="1" rowspan="1"><p data-block-token="Rl3GdtB08oiqFZxhm00cK9l4nh0">By filtering expressions.​</p>

</td><td data-block-token="JktodwnRbo1H9vxZehkcMMf6nMg" colspan="1" rowspan="1"><p data-block-token="R7rrdcMuQo4xKcxm3rMc8jT6nS4">By filtering expressions.​</p>

</td></tr><tr><td data-block-token="XHXndNykJo9T24xWY0mcg7Lsn5c" colspan="1" rowspan="1"><p data-block-token="HZGEdb7asoynmWxmHgGcUEiSnSe">Mandatory parameters​</p>

</td><td data-block-token="RnXDdSiWRoVMLsxKp7ycelbanrc" colspan="1" rowspan="1"><ul data-block-token="VTBwdCwDsoI99TxJDRtcu33YnH0"><li><p>Collection name​</p></li>

<li><p>Primary keys​</p></li></ul>

<p data-block-token="B11AdDUZXozgKtx99r5cVG6snOg">​</p>

</td><td data-block-token="Xl9zdzNlUodUr1xtimTcMktln4e" colspan="1" rowspan="1"><ul data-block-token="TKZvdWyOuofnedxNWjdcw81Angf"><li><p>Collection name​</p></li>

<li><p>Filtering expressions​</p></li></ul>

</td><td data-block-token="SqwLddWV7oi5mjxR4Xuc0BsGn6f" colspan="1" rowspan="1"><ul data-block-token="YHfLdqkKLo1MAjxAPpFc1NtvnVh"><li><p>Collection name​</p></li>

<li><p>Filtering expressions​</p></li>

<li><p>Number of entities to return per query​</p></li></ul>

</td></tr><tr><td data-block-token="M7LQdU83DoDar3xjRIBcYRktncb" colspan="1" rowspan="1"><p data-block-token="RegYdilQZojQ9Fxkk0McxoM9nld">Optional parameters​</p>

</td><td data-block-token="LGpddK4o2oKYYuxBVdKcyZZanQf" colspan="1" rowspan="1"><ul data-block-token="C9AFdJXuro04F0xoRj4cx4UenXb"><li><p>Partition name​</p></li>

<li><p>Output fields​</p></li></ul>

</td><td data-block-token="GkCydoTh8o5eRBxfnGQc7niInhe" colspan="1" rowspan="1"><ul data-block-token="XD71d6CwJof3LKxtlR2c9ATZnWh"><li><p>Partition name​</p></li>

<li><p>Number of entities to return​</p></li>

<li><p>Output fields​</p></li></ul>

</td><td data-block-token="RPnPd40mqoFTRzxapogc2BmunOu" colspan="1" rowspan="1"><ul data-block-token="Lf8fdvZWiot1xhxg6X7cuecmn1c"><li><p>Partition name​</p></li>

<li><p>Number of entities to return in total​</p></li>

<li><p>Output fields​</p></li></ul>

</td></tr><tr><td data-block-token="H3ohd3dh5oJNWYx0uOHcQ3DDnmh" colspan="1" rowspan="1"><p data-block-token="VvYJd824VozDaGxi6azcsLQCnre">Returns​</p>

</td><td data-block-token="HeoXdfD0Voa4U3xXRNFcaxHDnFe" colspan="1" rowspan="1"><p data-block-token="UU4GdhaPEo11xOxHmvJcbaaFnPb">Returns entities that hold the specified primary keys in the specified collection or partition.​</p>

</td><td data-block-token="UtcOd7eiToNUsMxRR3hcwzCFnNe" colspan="1" rowspan="1"><p data-block-token="CWukdkCxfo5P9WxTLkecEETpnAe">Returns all or a specified number of entities that meet the custom filtering conditions in the specified collection or partition.​</p>

</td><td data-block-token="VNI6denKyobe8JxUNbRcEL96ncb" colspan="1" rowspan="1"><p data-block-token="GsmPdjuddoZACcxnLPicOyYdnac">Returns all entities that meet the custom filtering conditions in the specified collection or partition through paginated queries.​</p>

</td></tr></tbody></table>

For more on metadata filtering, refer to [​Metadata Filtering](boolean.md).​

## Use Get​

When you need to find entities by their primary keys, you can use the **Get** method. The following code examples assume that there are three fields named `id`, `vector`, and `color` in your collection and return the entities with primary keys `1`, `2`, and `3`.​

```json
[​
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},​
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},​
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},​
        {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},​
        {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},​
        {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},​
        {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},​
        {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},​
        {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},​
        {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"},​
]​

```

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
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
res = client.get(​
    collection_name="query_collection",​
    ids=[0, 1, 2],​
    output_fields=["vector", "color"]​
)​
​
print(res)​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.vector.request.GetReq​
import io.milvus.v2.service.vector.request.GetResp​
import java.util.*;​
​
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .token("root:Milvus")​
        .build());​
        ​
GetReq getReq = GetReq.builder()​
        .collectionName("query_collection")​
        .ids(Arrays.asList(0, 1, 2))​
        .outputFields(Arrays.asList("vector", "color"))​
        .build();​
​
GetResp getResp = client.get(getReq);​
​
List<QueryResp.QueryResult> results = getResp.getGetResults();​
for (QueryResp.QueryResult result : results) {​
    System.out.println(result.getEntity());​
}​
​
// Output​
// {color=pink_8682, vector=[0.35803765, -0.6023496, 0.18414013, -0.26286206, 0.90294385], id=0}​
// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}​
// {color=orange_6781, vector=[0.43742132, -0.55975026, 0.6457888, 0.7894059, 0.20785794], id=2}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
const res = client.get({​
    collection_name="query_collection",​
    ids=[0,1,2],​
    output_fields=["vector", "color"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/get" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "id": [0, 1, 2],​
    "outputFields": ["vector", "color"]​
}'​
​
# {"code":0,"cost":0,"data":[{"color":"pink_8682","id":0,"vector":[0.35803765,-0.6023496,0.18414013,-0.26286206,0.90294385]},{"color":"red_7025","id":1,"vector":[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{"color":"orange_6781","id":2,"vector":[0.43742132,-0.55975026,0.6457888,0.7894059,0.20785794]}]}​

```

## Use Query​

When you need to find entities by custom filtering conditions, use the Query method. The following code examples assume there are three fields named `id`, `vector`, and `color` and return the specified number of entities that hold a `color` value starting with `red`.​

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
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
res = client.query(​
    collection_name="query_collection",​
    filter="color like \"red%\"",​
    output_fields=["vector", "color"],​
    limit=3​
)​

```

```java
​
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("query_collection")​
        .filter("color like \"red%\"")​
        .outputFields(Arrays.asList("vector", "color"))​
        .limit(3)​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
List<QueryResp.QueryResult> results = getResp.getQueryResults();​
for (QueryResp.QueryResult result : results) {​
    System.out.println(result.getEntity());​
}​
​
// Output​
// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}​
// {color=red_4794, vector=[0.44523495, -0.8757027, 0.82207793, 0.4640629, 0.3033748], id=4}​
// {color=red_9392, vector=[0.8371978, -0.015764369, -0.31062937, -0.56266695, -0.8984948], id=6}​

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
func ExampleClient_Query_basic() {​
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
    resultSet, err := cli.Query(ctx, client.NewQueryOption("query_collection").​
        WithFilter(`color like "red%"`).​
        WithOutputFields("vector", "color").​
        WithLimit(3))​
​
    fmt.Println(resultSet.GetColumn("color"))​
}​
​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
const res = client.query({​
    collection_name="quick_setup",​
    filter='color like "red%"',​
    output_fields=["vector", "color"],​
    limit(3)​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "filter": "color like \"red%\"",​
    "limit": 3,​
    "outputFields": ["vector", "color"]​
}'​
#{"code":0,"cost":0,"data":[{"color":"red_7025","id":1,"vector":[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{"color":"red_4794","id":4,"vector":[0.44523495,-0.8757027,0.82207793,0.4640629,0.3033748]},{"color":"red_9392","id":6,"vector":[0.8371978,-0.015764369,-0.31062937,-0.56266695,-0.8984948]}]}​

```

## Use QueryIterator​

When you need to find entities by custom filtering conditions through paginated queries, create a **QueryIterator** and use its **next()** method to iterate over all entities to find those meeting the filtering conditions. The following code examples assume that there are three fields named `id`, `vector`, and `color` and return all entities that hold a `color` value starting with `red`.​

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>

```python
from pymilvus import connections, Collection​
​
connections.connect(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
collection = Collection("query_collection")​
​
iterator = collection.query_iterator(​
    batch_size=10,​
    expr="color like \"red%\"",​
    output_fields=["color"]​
)​
​
results = []​
​
while True:​
    result = iterator.next()​
    if not result:​
        iterator.close()​
        break​
​
    print(result)​
    results += result​

```

```java
import io.milvus.orm.iterator.QueryIterator;​
import io.milvus.response.QueryResultsWrapper;​
import io.milvus.v2.common.ConsistencyLevel;​
import io.milvus.v2.service.vector.request.QueryIteratorReq;​
​
​
QueryIteratorReq req = QueryIteratorReq.builder()​
        .collectionName("query_collection")​
        .expr("color like \"red%\"")​
        .batchSize(50L)​
        .outputFields(Collections.singletonList("color"))​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
QueryIterator queryIterator = client.queryIterator(req);​
​
while (true) {​
    List<QueryResultsWrapper.RowRecord> res = queryIterator.next();​
    if (res.isEmpty()) {​
        queryIterator.close();​
        break;​
    }​
​
    for (QueryResultsWrapper.RowRecord record : res) {​
        System.out.println(record);​
    }​
}​
​
// Output​
// [color:red_7025, id:1]​
// [color:red_4794, id:4]​
// [color:red_9392, id:6]​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const iterator = await milvusClient.queryIterator({​
  collection_name: 'query_collection',​
  batchSize: 10,​
  expr: 'color like "red%"',​
  output_fields: ['color'],​
});​
​
const results = [];​
for await (const value of iterator) {​
  results.push(...value);​
  page += 1;​
}​

```

```curl
# Currently not available

```

## Queries in Partitions​

You can also perform queries within one or multiple partitions by including the partition names in the Get, Query, or QueryIterator request. The following code examples assume that there is a partition named **PartitionA** in the collection.​

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
res = client.get(​
    collection_name="query_collection",​
    # highlight-next-line​
    partitionNames=["partitionA"],​
    ids=[0, 1, 2],​
    output_fields=["vector", "color"]​
)​
​
from pymilvus import MilvusClient​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
res = client.query(​
    collection_name="query_collection",​
    # highlight-next-line​
    partitionNames=["partitionA"],​
    filter="color like \"red%\"",​
    output_fields=["vector", "color"],​
    limit=3​
)​
​
# 使用 QueryIterator​
from pymilvus import connections, Collection​
​
connections.connect(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
collection = Collection("query_collection")​
​
iterator = collection.query_iterator(​
    # highlight-next-line​
    partition_names=["partitionA"],​
    batch_size=10,​
    expr="color like \"red%\"",​
    output_fields=["color"]​
)​
​
results = []​
​
while True:​
    result = iterator.next()​
    if not result:​
        iterator.close()​
        break​
​
    print(result)​
    results += result​

```

```java
GetReq getReq = GetReq.builder()​
        .collectionName("query_collection")​
        .partitionName("partitionA")​
        .ids(Arrays.asList(10, 11, 12))​
        .outputFields(Collections.singletonList("color"))​
        .build();​
​
GetResp getResp = client.get(getReq);​
​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("query_collection")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .filter("color like \"red%\"")​
        .outputFields(Collections.singletonList("color"))​
        .limit(3)​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
​
QueryIteratorReq req = QueryIteratorReq.builder()​
        .collectionName("query_collection")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .expr("color like \"red%\"")​
        .batchSize(50L)​
        .outputFields(Collections.singletonList("color"))​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
QueryIterator queryIterator = client.queryIterator(req);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
// 使用 Get 方法​
var res = client.query({​
    collection_name="query_collection",​
    // highlight-next-line​
    partition_names=["partitionA"],​
    filter='color like "red%"',​
    output_fields=["vector", "color"],​
    limit(3)​
})​
​
// 使用 Query 方法​
res = client.query({​
    collection_name="query_collection",​
    // highlight-next-line​
    partition_names=["partitionA"],​
    filter="color like \"red%\"",​
    output_fields=["vector", "color"],​
    limit(3)​
})​
​
// 暂不支持使用 QueryIterator​
const iterator = await milvusClient.queryIterator({​
  collection_name: 'query_collection',​
  partition_names: ['partitionA'],​
  batchSize: 10,​
  expr: 'color like "red%"',​
  output_fields: ['vector', 'color'],​
});​
​
const results = [];​
for await (const value of iterator) {​
  results.push(...value);​
  page += 1;​
}​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
# 使用 Get 方法​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/get" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "query_collection",​
    "partitionNames": ["partitionA"],​
    "id": [0, 1, 2],​
    "outputFields": ["vector", "color"]​
}'​
​
# 使用 Query 方法​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/get" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "query_collection",​
    "partitionNames": ["partitionA"],​
    "filter": "color like \"red%\"",​
    "limit": 3,​
    "outputFields": ["vector", "color"],​
    "id": [0, 1, 2]​
}'​

```

​

    
