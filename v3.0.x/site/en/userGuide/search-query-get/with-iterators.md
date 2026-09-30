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
    <a href="#javascript">NodeJS</a>
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
import io.milvus.v2.common.IndexParam.MetricType;
import io.milvus.v2.service.vector.request.data.FloatVec;

import java.util.*;

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
        .outputFields(Lists.newArrayList("color"))
        .topK(20000)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

```go
// go
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

const iterator = milvusClient.searchIterator({
    collection_name: collectionName,
    vectors: queryVectors,
    anns_field: 'vector',
    params: { metric_type: 'L2', params: { nprobe: 16 } },
    batch_size: 50,
    output_fields: ['color'],
    limit: 20000,
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
    <a href="#javascript">NodeJS</a>
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
// go
```

```javascript
for await (const result of iterator) {
    console.log(result);
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