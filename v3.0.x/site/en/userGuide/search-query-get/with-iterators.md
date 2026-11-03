---
id: with-iterators.md
title: "Search Iterator"
summary: "The ANN Search has a maximum limit on the number of entities that can be recalled in a single query, and simply using basic ANN Search may not meet the demands of large-scale retrieval. For ANN Search requests where topK exceeds 16,384, it is advisable to consider using the SearchIterator. This section will introduce how to use the SearchIterator and related considerations."
---

# Search Iterator

The ANN Search has a maximum limit on the number of entities that can be recalled in a single query, and simply using basic ANN Search may not meet the demands of large-scale retrieval. For ANN Search requests where topK exceeds 16,384, it is advisable to consider using the SearchIterator. This section will introduce how to use the SearchIterator and related considerations.

## Overview

A Search request returns search results, while a SearchIterator returns an iterator. You can call the **next()** method of this iterator to get the search results.

Specifically, you can use the SearchIterators as follows:

1. Create a SearchIterator and set **the number of entities to return per search request** and **the total number of entities to return**.

1. Call the **next()** method of the SearchIterator in a loop to get the search result in a paginated manner.

1. Call the **close()** method of the iterator to end the loop if the **next()** method returns an empty result.

## Create SearchIterator

The following code snippet demonstrates how to create a SearchIterator.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import connections, Collection

connections.connect(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# create iterator
query_vectors = [
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]

collection = Collection("iterator_collection")

iterator = collection.search_iterator(
    data=query_vectors,
    anns_field="vector",
    param={"metric_type": "L2", "params": {"nprobe": 16}},
    # highlight-next-line
    batch_size=50,
    output_fields=["color"],
    # highlight-next-line
    limit=20000
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.orm.iterator.SearchIterator;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchIteratorReq;
import io.milvus.v2.service.vector.request.data.FloatVec;

import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchIterator searchIterator = client.searchIterator(SearchIteratorReq.builder()
        .collectionName("iterator_collection")
        .vectors(Collections.singletonList(queryVector))
        .vectorFieldName("vector")
        .batchSize(500L)
        .outputFields(Collections.singletonList("color"))
        .topK(20000)
        .metricType(IndexParam.MetricType.L2)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

// create iterator
iterator, err := client.SearchIterator(ctx, milvusclient.NewSearchIteratorOption("iterator_collection", entity.FloatVector(queryVector)).
    WithANNSField("vector").
    WithAnnParam(index.NewIvfAnnParam(16)).
    // highlight-next-line
    WithBatchSize(50).
    WithOutputFields("color").
    // highlight-next-line
    WithIteratorLimit(20000))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(&ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus")).await?;

let query_vectors = vec![vec![0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]];
let iterator = client
    .search_iterator(
        SearchIteratorRequest::builder()
            .search(
                SearchRequest::builder()
                    .collection_name("iterator_collection")
                    .vector_field("vector")
                    .vectors(SearchVectors::Float(query_vectors))
                    .output_fields(["color"])
                    .build()?,
            )
            .batch_size(50)
            .limit(20000)
            .build()?,
    )
    .await?;
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const queryVectors = [
[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
];
const collectionName = 'iterator_collection';

const iterator = await milvusClient.searchIterator({
    collection_name: collectionName,
    vectors: queryVectors,
    anns_field: 'vector',
    params: { metric_type: 'L2', params: { nprobe: 16 } },
    batch_size: 50,
    output_fields: ['color'],
    limit: 20000,
});

```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
});

// create iterator
float[] queryVector = [0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f];

SearchIterator iterator = client.SearchIteratorAsync(new SearchIteratorReq
{
    CollectionName = "iterator_collection",
    VectorFieldName = "vector",
    Vectors = [queryVector],
    MetricType = MetricType.L2,
    BatchSize = 50,
    Parameters = new SearchParameters { OutputFields = { "color" } },
    Limit = 20000
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "iterator_collection",
    "annsField": "vector",
    "data": [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    "searchParams": {
        "metricType": "L2",
        "params": {
            "nprobe": 16
        }
    },
    "limit": 50,
    "offset": 0,
    "outputFields": ["color"]
}'
```

```cpp
#include <iostream>
#include <vector>

#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530", "root:Milvus"));
if (!status.IsOk()) {
    std::cerr << "Failed to connect: " << status.Message() << std::endl;
    return;
}

// create iterator
std::vector<float> queryVector = {
    0.35803764F, -0.60234958F, 0.18414013F, -0.26286206F, 0.90294385F
};

milvus::SearchIteratorRequest request;
request.SetCollectionName("iterator_collection");
request.SetAnnsField("vector");
request.SetMetricType(milvus::MetricType::L2);
request.AddExtraParam("nprobe", "16");
// highlight-next-line
request.SetBatchSize(50);
request.AddOutputField("color");
// highlight-next-line
request.SetLimit(20000);
// SearchIterator only accepts one vector
request.AddFloatVector(queryVector);

milvus::SearchIteratorPtr iterator;
status = client->SearchIterator(request, iterator);
if (!status.IsOk()) {
    std::cerr << "Failed to create search iterator: " << status.Message() << std::endl;
    return;
}
```

In the above examples, you have set the number of entities to return per search (**batch_size**/**batchSize**) to 50, and the total number of entities to return (**topK**) to 20,000.

## Use SearchIterator

Once the SearchIterator is ready, you can call its next() method to get the search results in a paginated manner.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
results = []

while True:
    # highlight-next-line
    result = iterator.next()
    if not result:
        # highlight-next-line
        iterator.close()
        break

    for hit in result:
        results.append(hit.to_dict())
```

```java
import io.milvus.response.QueryResultsWrapper;

import java.util.List;

while (true) {
    List<QueryResultsWrapper.RowRecord> res = searchIterator.next();
    if (res.isEmpty()) {
        searchIterator.close();
        break;
    }

    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}
```

```go
for {
    // highlight-next-line
    resultSet, err := iterator.Next(ctx)
    if err != nil {
        // io.EOF marks the end of the iterator
        break
    }

    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

```rust
loop {
    let Some(batch) = iterator.next().await? else {
        iterator.close().await?;
        break;
    };
    for result in batch.results() {
        for row in result.rows()? {
            println!("{:?}", row.to_entity_row()?);
        }
    }
}
```

```javascript
for await (const result of iterator) {
    console.log(result);
}
```

```csharp
using Milvus.Client.V2.Responses.Dql;

// Use SearchIterator
await foreach (SingleResult result in iterator)
{
    Console.WriteLine(result.Scores);
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

batch_size=50
limit=20000
offset=0

# Paginate with offset until an empty page is returned. Note that the sum of
# offset and limit in each request must not exceed the server-side result
# window (16,384 by default); SDK search iterators do not have this limit.
while [ "$offset" -lt "$limit" ]; do
    # highlight-next-line
    response=$(curl --silent --request POST \
        --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
        --header "Authorization: Bearer ${TOKEN}" \
        --header "Content-Type: application/json" \
        --header "Request-Timeout: 10" \
        -d '{
            "collectionName": "iterator_collection",
            "annsField": "vector",
            "data": [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
            "searchParams": {
                "metricType": "L2",
                "params": {
                    "nprobe": 16
                }
            },
            "limit": '"$batch_size"',
            "offset": '"$offset"',
            "outputFields": ["color"]
        }')

    count=$(echo "$response" | jq -r '.data | length')
    if [ "$count" -eq 0 ]; then
        # highlight-next-line
        break
    fi

    echo "$response" | jq -r '.data[]'
    offset=$((offset + batch_size))
done
```

```cpp
while (true) {
    milvus::SingleResult result;
    // highlight-next-line
    status = iterator->Next(result);
    if (!status.IsOk()) {
        std::cerr << "Iterator next failed: " << status.Message() << std::endl;
        break;
    }
    if (result.GetRowCount() == 0) {
        // highlight-next-line
        break;
    }

    milvus::EntityRows rows;
    status = result.OutputRows(rows);
    if (!status.IsOk()) {
        std::cerr << "Failed to get output rows: " << status.Message() << std::endl;
        break;
    }

    for (const auto& row : rows) {
        std::cout << row.dump() << std::endl;
    }
}
```

In the above code examples, you have created an infinite loop and called the **next()** method in the loop to store the search results in a variable and closed the iterator when the **next()** returns nothing.