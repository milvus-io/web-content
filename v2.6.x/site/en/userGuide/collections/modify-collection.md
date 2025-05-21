---
id: modify-collection.md
title: "Modify Collection"
summary: "You can rename a collection or change its settings. This page focuses on how to modify a collection."
---

# Modify Collection

You can rename a collection or change its settings. This page focuses on how to modify a collection.

## Rename Collection

You can rename a collection as follows.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.rename_collection(
    old_name="my_collection",
    new_name="my_new_collection"
)
```

```java
import io.milvus.v2.service.collection.request.RenameCollectionReq;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();
    
MilvusClientV2 client = new MilvusClientV2(connectConfig);

RenameCollectionReq renameCollectionReq = RenameCollectionReq.builder()
        .collectionName("my_collection")
        .newCollectionName("my_new_collection")
        .build();

client.renameCollection(renameCollectionReq);
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

const res = await client.renameCollection({
    oldName: "my_collection",
    newName: "my_new_collection"
});
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
token := "root:Milvus"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

err = client.RenameCollection(ctx, milvusclient.NewRenameCollectionOption("my_collection", "my_new_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "newCollectionName": "my_new_collection"
}'
```

## Set Collection Properties

The following code snippet demonstrates how to set collection TTL.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"collection.ttl.seconds": 60}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionReq;
import java.util.HashMap;
import java.util.Map;

Map<String, String> properties = new HashMap<>();
properties.put("collection.ttl.seconds", "60");

AlterCollectionReq alterCollectionReq = AlterCollectionReq.builder()
        .collectionName("my_collection")
        .properties(properties)
        .build();

client.alterCollection(alterCollectionReq);
```

```javascript
res = await client.alterCollection({
    collection_name: "my_collection",
    properties: {
        "collection.ttl.seconds": 60
    }
})
```

```go
err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "test_collection",
    "properties": {
        "collection.ttl.seconds": 60
    }
}'
```

The applicable collection properties are as follows:

<table>
   <tr>
     <th><p>Property</p></th>
     <th><p>When to Use</p></th>
   </tr>
   <tr>
     <td><p><code>collection.ttl.seconds</code></p></td>
     <td><p>If the data of a collection needs to be deleted after a specific period, consider setting its Time-To-Live (TTL) in seconds. Once the TTL times out, Milvus deletes all entities from the collection.  The deletion is asynchronous, indicating that searches and queries are still possible before the deletion is complete. For details, refer to <a href="set-collection-ttl.md">Set Collection TTL</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>mmap.enabled</code></p></td>
     <td><p>Memory mapping (Mmap) enables direct memory access to large files on disk, allowing Milvus to store indexes and data in both memory and hard drives. This approach helps optimize data placement policy based on access frequency, expanding storage capacity for collections without impacting search performance.</p><p>For details, refer to <a href="mmap.md">Use mmap</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>partitionkey.isolation</code></p></td>
     <td><p>With Partition Key Isolation enabled, Milvus groups entities based on the Partition Key value and creates a separate index for each of these groups. Upon receiving a search request, Milvus locates the index based on the Partition Key value specified in the filtering condition and restricts the search scope within the entities included in the index, thus avoiding scanning irrelevant entities during the search and greatly enhancing the search performance. For details, refer to <a href="use-partition-key.md#Use-Partition-Key-Isolation">Use Partition Key Isolation</a>.</p></td>
   </tr>
</table>

## Drop Collection Properties

You can also reset a collection property by dropping it as follows. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_collection_properties(
    collection_name="my_collection",
    property_keys=[
        "collection.ttl.seconds"
    ]
)
```

```java
client.dropCollectionProperties(DropCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .propertyKeys(Collections.singletonList("collection.ttl.seconds"))
        .build());
```

```javascript
client.dropCollectionProperties({
    collection_name:"my_collection",
    properties: ['collection.ttl.seconds'],
});
```

```go
err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption("my_collection", common.CollectionTTLConfigKey))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "propertyKeys": [
        "collection.ttl.seconds"
    ]
}'
```

