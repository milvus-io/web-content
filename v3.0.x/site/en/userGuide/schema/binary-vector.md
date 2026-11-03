---
id: binary-vector.md
title: "Binary Vector"
summary: "Binary vectors are a special form of data representation that convert traditional high-dimensional floating-point vectors into binary vectors containing only 0s and 1s. This transformation not only compresses the size of the vector but also reduces storage and computational costs while retaining semantic information. When precision for non-critical features is not essential, binary vectors can effectively maintain most of the integrity and utility of the original floating-point vectors."
---

# Binary Vector

Binary vectors are a special form of data representation that convert traditional high-dimensional floating-point vectors into binary vectors containing only 0s and 1s. This transformation not only compresses the size of the vector but also reduces storage and computational costs while retaining semantic information. When precision for non-critical features is not essential, binary vectors can effectively maintain most of the integrity and utility of the original floating-point vectors.

Binary vectors have a wide range of applications, particularly in situations where computational efficiency and storage optimization are crucial. In large-scale AI systems, such as search engines or recommendation systems, real-time processing of massive amounts of data is key. By reducing the size of the vectors, binary vectors help lower latency and computational costs without significantly sacrificing accuracy. Additionally, binary vectors are useful in resource-constrained environments, such as mobile devices and embedded systems, where memory and processing power are limited. Through the use of binary vectors, complex AI functions can be implemented in these restricted settings while maintaining high performance.

## Overview

Binary vectors are a method of encoding complex objects (like images, text, or audio) into fixed-length binary values. In Milvus, binary vectors are typically represented as bit arrays or byte arrays. For example, an 8-dimensional binary vector can be represented as `[1, 0, 1, 1, 0, 0, 1, 0]`.

The diagram below shows how binary vectors represent the presence of keywords in text content. In this example, a 10-dimensional binary vector is used to represent two different texts (**Text 1** and **Text 2**), where each dimension corresponds to a word in the vocabulary: 1 indicates the presence of the word in the text, while 0 indicates its absence.

![Binary Vector](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/binary-vector.png)

Binary vectors have the following characteristics:

- **Efficient Storage:** Each dimension requires only 1 bit of storage, significantly reducing storage space.

- **Fast Computation:** Similarity between vectors can be quickly calculated using bitwise operations like XOR.

- **Fixed Length:** The length of the vector remains constant regardless of the original text length, making indexing and retrieval easier.

- **Simple and Intuitive:** Directly reflects the presence of keywords, making it suitable for certain specialized retrieval tasks.

Binary vectors can be generated through various methods. In text processing, predefined vocabularies can be used to set corresponding bits based on word presence. For image processing, perceptual hashing algorithms (like [pHash](https://en.wikipedia.org/wiki/Perceptual_hashing)) can generate binary features of images. In machine learning applications, model outputs can be binarized to obtain binary vector representations.

After binary vectorization, the data can be stored in Milvus for management and vector retrieval. The diagram below shows the basic process.

![Use Binary Vector](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/use-binary-vector.png)

<div class="alert note">

Although binary vectors excel in specific scenarios, they have limitations in their expressive capability, making it difficult to capture complex semantic relationships. Therefore, in real-world scenarios, binary vectors are often used alongside other vector types to balance efficiency and expressiveness. For more information, refer to [Dense Vector](dense-vector.md) and [Sparse Vector](sparse_vector.md).

</div>

## Use binary vectors

### Add vector field

To use binary vectors in Milvus, first define a vector field for storing binary vectors when creating a collection. This process includes:

1. Setting `datatype` to the supported binary vector data type, i.e., `BINARY_VECTOR`.

1. Specifying the vector's dimensions using the `dim` parameter. Note that `dim` must be a multiple of 8 as binary vectors must be converted into a byte array when inserting. Every 8 boolean values (0 or 1) will be packed into 1 byte. For example, if `dim=128`, a 16-byte array is required for insertion.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_field=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="binary_vector", datatype=DataType.BINARY_VECTOR, dim=128)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

CreateCollectionReq.CollectionSchema schema = MilvusClientV2.CreateSchema();
schema.setEnableDynamicField(true);
schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(100)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("binary_vector")
        .dataType(DataType.BinaryVector)
        .dimension(128)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
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

schema := entity.NewSchema().WithDynamicFieldEnabled(true).
    WithField(entity.NewField().
        WithName("pk").
        WithDataType(entity.FieldTypeVarChar).
        WithIsAutoID(true).
        WithIsPrimaryKey(true).
        WithMaxLength(100),
    ).WithField(entity.NewField().
        WithName("binary_vector").
        WithDataType(entity.FieldTypeBinaryVector).
        WithDim(128),
    )
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let mut schema = CollectionSchema::new().enable_dynamic_field(true);
schema = schema
    .add_field(
        FieldSchema::new()
            .name("pk")
            .data_type(DataType::VarChar)
            .primary_key(true)
            .auto_id(true)
            .max_length(100),
    )
    .add_field(
        FieldSchema::new()
            .name("binary_vector")
            .data_type(DataType::BinaryVector)
            .dimension(128),
    );
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->SetEnableDynamicField(true);
schema->AddField(milvus::FieldSchema("pk", milvus::DataType::VARCHAR, "", true, true).WithMaxLength(100));
schema->AddField(milvus::FieldSchema("binary_vector", milvus::DataType::BINARY_VECTOR).WithDimension(128));
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
});

const schema = [
  {
    name: "pk",
    data_type: DataType.VarChar,
    is_primary_key: true,
    autoID: true,
    max_length: 100,
  },
  {
    name: "binary_vector",
    data_type: DataType.BinaryVector,
    dim: 128,
  },
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

var schema = new CollectionSchema
{
    EnableDynamicFields = true,
    Fields =
    {
        new FieldSchema("pk", DataType.VarChar, isPrimaryKey: true, autoId: true) { MaxLength = 100 },
        new FieldSchema("binary_vector", DataType.BinaryVector) { Dimension = 128 }
    }
};
```

```bash
export primaryField='{
    "fieldName": "pk",
    "dataType": "VarChar",
    "isPrimary": true,
    "elementTypeParams": {
        "max_length": 100
    }
}'

export vectorField='{
    "fieldName": "binary_vector",
    "dataType": "BinaryVector",
    "elementTypeParams": {
        "dim": 128
    }
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField
    ],
    \"enableDynamicField\": true
}"
```

In this example, a vector field named `binary_vector` is added for storing binary vectors. The data type of this field is `BINARY_VECTOR`, with a dimension of 128.

### Set index params for vector field

To speed up searches, an index must be created for the binary vector field. Indexing can significantly enhance the retrieval efficiency of large-scale vector data.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="binary_vector",
    index_name="binary_vector_index",
    index_type="AUTOINDEX",
    metric_type="HAMMING"
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexParams = new ArrayList<>();

indexParams.add(IndexParam.builder()
        .fieldName("binary_vector")
        .indexName("binary_vector_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption("my_collection", "binary_vector", idx)
```

```rust
use milvus::v2::prelude::*;

let index_params = vec![IndexParam::new()
    .field_name("binary_vector")
    .index_name("binary_vector_index")
    .index_type(IndexType::AutoIndex)
    .metric_type(MetricType::Hamming)];
```

```cpp
std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("binary_vector", "binary_vector_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::HAMMING)
};
```

```javascript
import { MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

const indexParams = [{
  index_name: "binary_vector_index",
  field_name: "binary_vector",
  metric_type: MetricType.HAMMING,
  index_type: IndexType.AUTOINDEX
}];
```

```csharp
using Milvus.Client.V2.Types;

var indexParam = new IndexParam(
    fieldName: "binary_vector",
    indexName: "binary_vector_index",
    indexType: IndexType.AutoIndex,
    metricType: MetricType.Hamming);
```

```bash
export indexParams='[
        {
            "fieldName": "binary_vector",
            "metricType": "HAMMING",
            "indexName": "binary_vector_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

In the example above, an index named `binary_vector_index` is created for the `binary_vector` field, using the `AUTOINDEX` index type. The `metric_type` is set to `HAMMING`, indicating that Hamming distance is used for similarity measurement.

Milvus provides various index types for a better vector search experience. AUTOINDEX is a special index type designed to smooth the learning curve of vector search. There are a lot of index types available for you to choose from. For details, refer to [Index Explained](index-explained.md).

Additionally, Milvus supports other similarity metrics for binary vectors. For more information, refer to [Metric Types](metric.md).

### Create collection

Once the binary vector and index settings are complete, create a collection that contains binary vectors. The example below uses the `create_collection` method to create a collection named `my_collection`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
if err = loadTask.Await(ctx); err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("my_collection")
            .schema(schema)
            .index_params(index_params)
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                        .WithCollectionName("my_collection")
                                        .WithIndexes(std::move(indexes))
                                        .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

await client.createCollection({
    collection_name: 'my_collection',
    schema: schema,
    index_params: indexParams
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    Indexes = [indexParam]
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

### Insert data

After creating the collection, use the `insert` method to add data containing binary vectors. Note that binary vectors should be provided in the form of a byte array, where each byte represents 8 boolean values.

For example, for a 128-dimensional binary vector, a 16-byte array is required (since 128 bits ÷ 8 bits/byte = 16 bytes). Below is an example code for inserting data:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
def convert_bool_list_to_bytes(bool_list):
    if len(bool_list) % 8 != 0:
        raise ValueError("The length of a boolean list must be a multiple of 8")

    byte_array = bytearray(len(bool_list) // 8)
    for i, bit in enumerate(bool_list):
        if bit == 1:
            index = i // 8
            shift = i % 8
            byte_array[index] |= (1 << shift)
    return bytes(byte_array)

bool_vectors = [
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112,
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1] + [0] * 112,
]

data = [{"binary_vector": convert_bool_list_to_bytes(bool_vector)} for bool_vector in bool_vectors]

client.insert(
    collection_name="my_collection",
    data=data
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;
import java.nio.ByteBuffer;

// Binary vectors (128 bits = 16 bytes)
// vector1: [1,0,0,1,1,0,1,1, 0,1,0,1,0,1,0,0] + [0]*112
byte[] vector1 = new byte[16];
vector1[0] = (byte) 0xD9;
vector1[1] = 0x2A;

// vector2: [0,1,0,1,0,1,0,0, 1,1,0,0,1,1,0,1] + [0]*112
byte[] vector2 = new byte[16];
vector2[0] = 0x2A;
vector2[1] = (byte) 0xB3;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();

JsonObject row1 = new JsonObject();
row1.add("binary_vector", gson.toJsonTree(vector1));
rows.add(row1);

JsonObject row2 = new JsonObject();
row2.add("binary_vector", gson.toJsonTree(vector2));
rows.add(row2);

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithBinaryVectorColumn("binary_vector", 128, [][]byte{
        {0b11011001, 0b00101010, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0b00101010, 0b10110011, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    }))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

// Binary vectors (128 bits = 16 bytes)
let binary_vectors: Vec<Vec<u8>> = vec![
    vec![0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    vec![0x2A, 0xB3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

client
    .insert(
        InsertRequest::builder()
            .collection_name("my_collection")
            .columns(vec![FieldData::binary_vector(
                "binary_vector",
                binary_vectors,
            )])
            .build()?,
    )
    .await?;
```

```cpp
// Binary vectors (128 bits = 16 bytes)
std::vector<uint8_t> vector1 = {0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
std::vector<uint8_t> vector2 = {0x2A, 0xB3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

milvus::EntityRows data = {
    {{"binary_vector", vector1}},
    {{"binary_vector", vector2}}
};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("my_collection")
                                .WithRowsData(std::move(data)),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const data = [
  { binary_vector: [1,0,0,1,1,0,1,1,0,1,0,1,0,1,0,0] },
  { binary_vector: [0,1,0,1,0,1,0,0,1,1,0,0,1,1,0,1] },
];

await client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Types;

// Binary vectors (128 bits = 16 bytes)
// vector1: [1,0,0,1,1,0,1,1, 0,1,0,1,0,1,0,0] + [0]*112
byte[] vector1 = { 0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

// vector2: [0,1,0,1,0,1,0,0, 1,1,0,0,1,1,0,1] + [0]*112
byte[] vector2 = { 0x2A, 0xB3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    ColumnsData =
    [
        new BinaryVectorFieldData("binary_vector", new ReadOnlyMemory<byte>[]
        {
            vector1,
            vector2
        })
    ]
});
```

```bash
export data='[
    {"binary_vector": "2SoAAAAAAAAAAAAAAAAAAA=="},
    {"binary_vector": "KrMAAAAAAAAAAAAAAAAAAA=="}
]'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"data\": $data,
    \"collectionName\": \"my_collection\"
}"
```

### Perform similarity search

Similarity search is one of the core features of Milvus, allowing you to quickly find data that is most similar to a query vector based on the distance between vectors. To perform a similarity search using binary vectors, prepare the query vector and search parameters, then call the `search` method.

During search operations, binary vectors must also be provided in the form of a byte array. Ensure that the dimensionality of the query vector matches the dimension specified when defining `dim` and that every 8 boolean values are converted into 1 byte.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
search_params = {
    "params": {"nprobe": 10}
}

query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    anns_field="binary_vector",
    search_params=search_params,
    limit=5,
    output_fields=["pk"]
)

print(res)

# Output
# data: ["[{'id': '453718927992172268', 'distance': 10.0, 'entity': {'pk': '453718927992172268'}}]"] 
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.nio.ByteBuffer;

// query vector = vector1
byte[] queryBytes = new byte[16];
queryBytes[0] = (byte) 0xD9;
queryBytes[1] = 0x2A;
ByteBuffer queryVector = ByteBuffer.wrap(queryBytes);

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("nprobe", 10);

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new BinaryVec(queryVector)))
        .annsField("binary_vector")
        .searchParams(searchParams)
        .topK(5)
        .outputFields(Collections.singletonList("pk"))
        .build());

System.out.println(searchR.getSearchResults());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

queryVector := []byte{0b11011001, 0b00101010, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField("binary_vector").
    WithOutputFields("pk").
    WithAnnParam(annSearchParams))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("Pks: ", resultSet.GetColumn("pk").FieldData().GetScalars())
}
```

```rust
use milvus::v2::prelude::*;

// query vector = vector1
let query_vector: Vec<u8> = vec![0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let results = client
    .search(
        SearchRequest::builder()
            .collection_name("my_collection")
            .vector_field("binary_vector")
            .vectors(SearchVectors::Binary(vec![query_vector]))
            .limit(5)
            .output_fields(vec!["pk"])
            .metric_type(MetricType::Hamming)
            .build()?,
    )
    .await?;
println!("{:?}", results.results());
```

```cpp
// query vector = vector1
std::vector<uint8_t> query_vector = {0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

auto request = milvus::SearchRequest()
                   .WithCollectionName("my_collection")
                   .WithAnnsField("binary_vector")
                   .WithLimit(5)
                   .AddOutputField("pk")
                   .AddBinaryVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto search_results = response.Results();
for (auto& result : search_results.Results()) {
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

```javascript
const query_vector = [1,0,0,1,1,0,1,1,0,1,0,1,0,1,0,0];

await client.search({
    collection_name: 'my_collection',
    data: query_vector,
    anns_field: 'binary_vector',
    limit: 5,
    output_fields: ['pk'],
    params: { nprobe: 10 }
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// query vector = vector1
byte[] queryBytes = { 0xD9, 0x2A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    BinaryVectors = [new ReadOnlyMemory<byte>(queryBytes)],
    VectorFieldName = "binary_vector",
    MetricType = MetricType.Hamming,
    Limit = 5,
    Parameters = new SearchParameters
    {
        Nprobe = 10,
        OutputFields = { "pk" }
    }
});
Console.WriteLine(res);
```

```bash
export searchParams='{
        "params":{"nprobe":10}
    }'

export data='[
    {"binary_vector": "2SoAAAAAAAAAAAAAAAAAAA=="}
]'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"data\": $data,
    \"annsField\": \"binary_vector\",
    \"limit\": 5,
    \"searchParams\":$searchParams,
    \"outputFields\": [\"pk\"]
}"
```

For more information on similarity search parameters, refer to [Basic ANN Search](single-vector-search.md).

