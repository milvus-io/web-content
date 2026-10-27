---
id: tune_consistency.md
title: "Consistency Level"
summary: "As a distributed vector database, Milvus offers multiple levels of consistency to ensure that each node or replica can access the same data during read and write operations. Currently, the supported levels of consistency include Strong, Bounded, Eventually, and Session, with Bounded being the default level of consistency used."
---

# Consistency Level

As a distributed vector database, Milvus offers multiple levels of consistency to ensure that each node or replica can access the same data during read and write operations. Currently, the supported levels of consistency include **Strong**, **Bounded**, **Eventually**, and **Session**, with **Bounded** being the default level of consistency used.

## Overview

Milvus is a system that separates storage and computation. **Streaming Nodes** append all write operations to the Write-Ahead Log (WAL) and hold the **growing data** — data that is still in the WAL and not yet persisted. A recovery process converts growing data into **historical data** (sealed segments persisted in object storage such as MinIO/S3), which is served by **Query Nodes**. Each search or query request is received by a **Query Delegator** on the Streaming Node that hosts the collection's WAL: the delegator generates the query plan, executes the growing-data part locally, forwards the historical-data part to the relevant Query Nodes, and merges the results before returning them. For details, refer to [Streaming Service](streaming_service.md).

To provide consistency guarantees, Milvus assigns every message a Timestamp Oracle (TSO) timestamp that determines its order in the WAL, and continuously inserts synchronization timestamps into the WAL alongside the data messages. Whenever a synchronization timestamp (syncTs) is received, it is recorded as the ServiceTime, meaning that all data prior to that ServiceTime is visible to queries. Based on the ServiceTime, Milvus provides guarantee timestamps (GuaranteeTs) to meet different user requirements for consistency and availability. Users can inform the delegator of the need to include data prior to a specified point in time in the search scope by specifying GuaranteeTs in their Search requests.

![Service Time And Guarantee Time](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/service-time-and-guarantee-time.png)

As shown in the figure above, if GuaranteeTs is less than ServiceTime, it means that all data before the specified time point is already visible, allowing the search to execute immediately. When GuaranteeTs is greater than ServiceTime, the search must wait until ServiceTime exceeds GuaranteeTs before it can execute.

Users need to make a trade-off between query accuracy and query latency. If users have high consistency requirements and are not sensitive to query latency, they can set GuaranteeTs to a value as large as possible; if users wish to receive search results quickly and are more tolerant of query accuracy, then GuaranteeTs can be set to a smaller value.

![Consistency Level Illustrated](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/consistency-level-illustrated.png)

Milvus provides four types of consistency levels with different GuaranteeTs.

- **Strong**

    The latest timestamp is used as the GuaranteeTs, and the search has to wait until the ServiceTime meets the GuaranteeTs before executing.

- **Eventual**

    The GuaranteeTs is set to an extremely small value, such as 1, to avoid consistency checks so that the search executes immediately on the currently visible data.

- **Bounded Staleness**

    The GuaranteeTs is set to a time point earlier than the latest timestamp, so that the search executes with a tolerance of certain recent data not yet being visible.

- **Session**

    The latest time point at which the client inserts data is used as the GuaranteeTs so that searches can cover all the data inserted by the client.

Milvus uses Bounded Staleness as the default consistency level. If the GuaranteeTs is left unspecified, the latest ServiceTime is used as the GuaranteeTs.

## Set Consistency Level

You can set different consistency levels when you create a collection as well as perform searches and queries.

### Set Consistency Level upon Creating Collection

When creating a collection, you can set the consistency level for the searches and queries within the collection. The following code example sets the consistency level to **Bounded**.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-next-line
    consistency_level="Bounded",
)
```

```java
CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        // highlight-next-line
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
client.createCollection(createCollectionReq);
```

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithConsistencyLevel(entity.ClBounded))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            },
            {
                "fieldName": "my_varchar",
                "dataType": "VarChar",
                "isClusteringKey": true,
                "elementTypeParams": {
                    "max_length": 512
                }
            }
        ]
    }'

export params='{
    "consistencyLevel": "Bounded"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

Possible values for the `consistency_level` parameter are `Strong`, `Bounded`, `Eventually`, and `Session`.

### Set Consistency Level in Search

You can always change the consistency level for a specific search. The following code example sets the consistency level back to the **Bounded**. The change applies only to the current search request.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    limit=3,
    search_params={"metric_type": "IP"}，
    # highlight-start
    consistency_level="Bounded",
    # highlight-next-line
)
```

```java
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField("vector"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "limit": 3,
    "consistencyLevel": "Bounded"
}'
```

This parameter is also available in hybrid searches and the search iterator. Possible values for the `consistency_level` parameter are `Strong`, `Bounded`, `Eventually`, and `Session`.

### Set Consistency Level in Query

You can always change the consistency level for a specific search. The following code example sets the consistency level to the **Eventually**. The setting applies only to the current query request.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.query(
    collection_name="my_collection",
    filter="color like \"red%\"",
    output_fields=["vector", "color"],
    limit=3，
    # highlight-start
    consistency_level="Eventually",
    # highlight-next-line
)
```

```java
QueryReq queryReq = QueryReq.builder()
        .collectionName("my_collection")
        .filter("color like \"red%\"")
        .outputFields(Arrays.asList("vector", "color"))
        .limit(3)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 QueryResp getResp = client.query(queryReq);
```

```go
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("color like \"red%\"").
    WithOutputFields("vector", "color").
    WithLimit(3).
    WithConsistencyLevel(entity.ClEventually))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "filter": "color like \"red_%\"",
    "consistencyLevel": "Bounded",
    "limit": 3
}'
```

This parameter is also available in the query iterator. Possible values for the `consistency_level` parameter are `Strong`, `Bounded`, `Eventually`, and `Session`.