---
id: set-collection-ttl.md
title: "Set Collection TTL"
summary: "Once data is inserted into a collection, it remains there by default. However, in some scenarios, you may want to remove or clean up data after a certain period. In such cases, you can configure the collection’s Time-to-Live (TTL) property so that Milvus automatically deletes the data once the TTL expires."
---

# Set Collection TTL

Once data is inserted into a collection, it remains there by default. However, in some scenarios, you may want to remove or clean up data after a certain period. In such cases, you can configure the collection’s Time-to-Live (TTL) property so that Milvus automatically deletes the data once the TTL expires.

## Overview

Time-to-Live (TTL) is commonly used in databases for scenarios where data should only remain valid or accessible for a certain period after any insertion or modification. Then, the data can be automatically removed. 

For instance, if you ingest data daily but only need to retain records for 14 days, you can configure Milvus to automatically remove any data older than that by setting the collection’s TTL to **14 × 24 × 3600 = 1209600** seconds. This ensures that only the most recent 14 days’ worth of data remain in the collection.

The TTL property in a Milvus collection is specified as an integer in seconds. Once set, any data that surpasses its TTL will be automatically deleted from the collection.

Because the deletion process is asynchronous, data might not be removed from search results exactly once the specified TTL has elapsed. Instead, there may be a delay, as the removal depends on the garbage collection (GC) and compaction processes, which occur at non-deterministic intervals.

## Set TTL

You can set the TTL property when you

- [Create a collection.](set-collection-ttl.md#Set-TTL-when-creating-a-collection)

- [Alter the TTL property of an existing collection.](set-collection-ttl.md#Set-TTL-for-an-existing-collection)

### Set TTL when creating a collection

The following code snippet demonstrates how to set the TTL property when you create a collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

# With TTL
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-start
    properties={
        "collection.ttl.seconds": 1209600
    }
    # highlight-end
)
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.AlterCollectionReq;
import io.milvus.param.Constant;
import java.util.HashMap;
import java.util.Map;

// With TTL
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        // highlight-next-line
        .property(Constant.TTL_SECONDS, "1209600")
        .build();
client.createCollection(customizedSetupReq);
```

```javascript
const createCollectionReq = {
    collection_name: "my_collection",
    schema: schema,
    // highlight-start
    properties: {
        "collection.ttl.seconds": 1209600
    }
    // highlight-end
}
```

```go
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema).
    WithProperty(common.CollectionTTLConfigKey, 1209600)) //  TTL in seconds
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export params='{
    "ttlSeconds": 1209600
}'

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

### Set TTL for an existing collection

The following code snippet demonstrates how to alter the TTL property in an existing collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.alter_collection_properties(
    collection_name="my_collection",
    properties={"collection.ttl.seconds": 1209600}
)
```

```java
Map<String, String> properties = new HashMap<>();
properties.put("collection.ttl.seconds", "1209600");

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
        "collection.ttl.seconds": 1209600
    }
})
```

```go
err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").
    WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"properties\": {
        \"collection.ttl.seconds\": 1209600
    }
}"
```

## Drop TTL setting

If you decide to keep the data in a collection indefinitely, you can simply drop the TTL setting from that collection.

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
    property_keys=["collection.ttl.seconds"]
)
```

```java
propertyKeys = new String[1]
propertyKeys[0] = "collection.ttl.second"

DropCollectionReq dropCollectionReq = DropCollectionReq.builder()
        .collectionName("my_collection")
        .propertyKeys(propertyKeys)
        .build();

client.dropCollection(dropCollectionReq);
```

```javascript
res = await client.dropCollectionProperties({
    collection_name: "my_collection",
    properties: ["collection.ttl.seconds"]
})
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \""my_collection"\",
    \"properties\": {
        \"collection.ttl.seconds\": 60
    }
}"
```

