---
id: create-collection-instantly.md
title: "Create Collection Instantly"
summary: "You can create a collection instantly by setting its name and the vector field dimensionality. Milvus automatically indexes the vector field and loads the collection upon creation. This page demonstrates how to create a collection instantly with default settings."
---

# Create Collection Instantly

You can create a collection instantly by setting its name and the vector field dimensionality. Milvus automatically indexes the vector field and loads the collection upon creation. This page demonstrates how to create a collection instantly with default settings.

## Overview

A collection is a two-dimensional table with fixed columns and variant rows. Each column represents a field, and each row represents an entity. A schema is required to implement such structural data management. Every entity to insert has to meet the constraints defined in the schema.

AIGC applications usually use vector databases as a knowledge base to manage the data generated during the interaction between users and Large Language Models (LLMs). Such knowledge bases are almost similar. To accelerate the use of Milvus clusters in such scenarios, an instant method is available for you to create a collection with only two parameters, namely the collection name and the vector field dimensionality.

When you create a collection instantly with default settings, the following settings apply:

- The primary and vector fields are added to the schema (**id** and **vector**).

- The primary field accepts integers and disables **AutoId**.

- The vector field accepts floating vector embeddings.

- **AUTOINDEX** is used to create an index on the vector field.

- **COSINE** is used to measure similarities between vector embeddings.

- The reserves dynamic field named **\$meta** is enabled to save non-schema-defined fields and their values in key-value pairs.

- The collection is automatically loaded upon creation.

For details on the terminologies above, refer to [Collection Explained](manage-collections.md). 

It is worth noting that creating a collection instantly with default settings does not fit all scenarios. You are advised to familiarize yourself with the [common collection creation procedure](create-collection.md) so that you can gain a better understanding of Milvus's capabilities.

## Quick Setup

In this manner, you can create a collection instantly with only the collection name and the vector field dimensionality.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "http://localhost:19530"
TOKEN = "root:Milvus"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection in quick setup mode
client.create_collection(
    collection_name="quick_setup",
    dimension=5
)

res = client.get_load_state(
    collection_name="quick_setup"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
        .collectionName("quick_setup")
        .dimension(5)
        .build();

client.createCollection(quickSetupReq);

GetLoadStateReq quickSetupLoadStateReq = GetLoadStateReq.builder()
        .collectionName("quick_setup")
        .build();

Boolean res = client.getLoadState(quickSetupLoadStateReq);
System.out.println(res);

// Output:
// true
```

```javascript
// 1. Set up a Milvus Client
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 2. Create a collection in quick setup mode
let res = await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
});  

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

err = client.CreateCollection(ctx, milvusclient.SimpleCreateCollectionOptions("quick_setup", 5))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "quick_setup",
    "dimension": 5
}'

# {
#     "code": 0,
#     "data": {}
# }
```

## Quick Setup with Custom Fields

If the default metric type, field names, and data types does not meet your need, you can tune these settings as follows.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "http://localhost:19530"
TOKEN = "root:Milvus"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection in quick setup mode
client.create_collection(
    collection_name="custom_quick_setup",
    dimension=5,
    primary_field_name="my_id",
    id_type="string",
    vector_field_name="my_vector",
    metric_type="L2",
    auto_id=True,
    max_length=512
)

res = client.get_load_state(
    collection_name="custom_quick_setup"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq customQuickSetupReq = CreateCollectionReq.builder()
        .collectionName("custom_quick_setup")
        .dimension(5)
        .primaryFieldName("my_id")
        .idType(DataType.VarChar)
        .maxLength(512)
        .vectorFieldName("my_vector")
        .metricType("L2")
        .autoID(true)
        .build();

client.createCollection(customQuickSetupReq);

GetLoadStateReq customQuickSetupLoadStateReq = GetLoadStateReq.builder()
        .collectionName("custom_quick_setup")
        .build();

Boolean res = client.getLoadState(customQuickSetupLoadStateReq);
System.out.println(res);

// Output:
// true
```

```javascript
// 1. Set up a Milvus Client
const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 2. Create a collection in quick setup mode
let res = await client.createCollection({
    collection_name: "custom_quick_setup",
    dimension: 5,
    primary_field_name: "my_id",
    id_type: "Varchar",
    max_length: 512,
    vector_field_name: "my_vector",
    metric_type: "L2",
    auto_id: true
});  

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "custom_quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
defer client.Close(ctx)

err = client.CreateCollection(ctx, milvusclient.SimpleCreateCollectionOptions("custom_quick_setup", 5).
    WithPKFieldName("my_id").
    WithVarcharPK(true, 512).
    WithVectorFieldName("my_vector").
    WithMetricType(entity.L2).
    WithAutoID(true),
)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "custom_quick_setup",
    "dimension": 5,
    "primaryFieldName": "my_id",
    "idType": "VarChar",
    "vectorFieldName": "my_vector",
    "metricType": "L2",
    "autoId": true,
    "params": {
        "max_length": "512"
    }
}'
```

If the collections created using the above two manners still cannot meet your needs, consider following the procedure in [Create Collection](create-collection.md).