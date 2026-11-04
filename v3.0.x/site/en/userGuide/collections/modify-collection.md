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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

client.rename_collection(
    old_name="my_new_collection",
    new_name="my_collection"
)
```

```java
import io.milvus.v2.service.collection.request.RenameCollectionReq;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus
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

renameCollectionReq = RenameCollectionReq.builder()
        .collectionName("my_new_collection")
        .newCollectionName("my_collection")
        .build();

client.renameCollection(renameCollectionReq);
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://localhost:19530"
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

err = client.RenameCollection(ctx, milvusclient.NewRenameCollectionOption("my_new_collection", "my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

client
    .rename_collection(
        RenameCollectionRequest::builder()
            .collection_name("my_collection")
            .new_collection_name("my_new_collection")
            .build()?,
    )
    .await?;

client
    .rename_collection(
        RenameCollectionRequest::builder()
            .collection_name("my_new_collection")
            .new_collection_name("my_collection")
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>

#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->RenameCollection(milvus::RenameCollectionRequest()
                                      .WithCollectionName("my_collection")
                                      .WithNewCollectionName("my_new_collection"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->RenameCollection(milvus::RenameCollectionRequest()
                                      .WithCollectionName("my_new_collection")
                                      .WithNewCollectionName("my_collection"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

await client.renameCollection({
    collection_name: "my_collection",
    new_collection_name: "my_new_collection"
});

await client.renameCollection({
    collection_name: "my_new_collection",
    new_collection_name: "my_collection"
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

const string CLUSTER_ENDPOINT = "http://localhost:19530";

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = CLUSTER_ENDPOINT,
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

await client.RenameCollectionAsync(new RenameCollectionReq
{
    CollectionName = "my_collection",
    NewCollectionName = "my_new_collection"
});

await client.RenameCollectionAsync(new RenameCollectionReq
{
    CollectionName = "my_new_collection",
    NewCollectionName = "my_collection"
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "newCollectionName": "my_new_collection"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_new_collection",
    "newCollectionName": "my_collection"
}'
```

## Set Collection Properties


You can modify collection-level properties after a collection is created.


### Supported properties

<table>
   <tr>
     <th><p>Property</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>collection.ttl.seconds</code></p></td>
     <td><p>If the data of a collection needs to be deleted after a specific period, consider setting its Time-To-Live (TTL) in seconds. Once the TTL times out, Milvus deletes all entities from the collection. </p><p>The deletion is asynchronous, indicating that searches and queries are still possible before the deletion is complete.</p><p>For details, refer to <a href="set-collection-ttl.md">Set Collection TTL</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>ttl_field</code></p></td>
     <td><p>Name of the <code>TIMESTAMPTZ</code> field that stores each entity's absolute expiration timestamp (entity-level TTL). Each entity expires when wall-clock time reaches the value stored in this field; a <code>NULL</code> in the field means the entity never expires. Mutually exclusive with <code>collection.ttl.seconds</code>.</p><p>For details, refer to <a href="set-collection-ttl.md">Set entity-level TTL</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>mmap.enabled</code></p></td>
     <td><p>Memory mapping (Mmap) enables direct memory access to large files on disk, allowing Milvus to store indexes and data in both memory and hard drives. This approach helps optimize data placement policy based on access frequency, expanding storage capacity for collections without impacting search performance.</p><p>For details, refer to <a href="mmap.md">Use mmap</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>partitionkey.isolation</code></p></td>
     <td><p>With Partition Key Isolation enabled, Milvus groups entities based on the Partition Key value and creates a separate index for each of these groups. Upon receiving a search request, Milvus locates the index based on the Partition Key value specified in the filtering condition and restricts the search scope within the entities included in the index, thus avoiding scanning irrelevant entities during the search and greatly enhancing the search performance.</p><p>For details, refer to <a href="use-partition-key.md#Use-Partition-Key-Isolation">Use Partition Key Isolation</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>dynamicfield.enabled</code></p></td>
     <td><p>Enables the dynamic field for collections that were created without enabling it. Once enabled, you can insert entities with fields not defined in the original schema. For details, refer to <a href="enable-dynamic-field.md">Dynamic Field</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>allow_insert_auto_id</code></p></td>
     <td><p>Whether to allow a collection to accept user-provided primary key values when AutoID has been enabled for the collection.</p><ul><li><p>When set to <strong>"true"</strong>: Inserts, upserts, and bulk imports use the user-provided primary key if present; otherwise, primary key values are auto-generated.</p></li><li><p>When set to <strong>"false"</strong>: User-provided primary key values are rejected or ignored and primary key values are always auto-generated. The default is <strong>"false"</strong>.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>timezone</code></p></td>
     <td><p>Specifies the default timezone for this collection when handling time-sensitive operations, especially <code>TIMESTAMPTZ</code> fields. Timestamps are stored internally in UTC, and Milvus converts values for display and comparison according to this setting. If set, the collection timezone overrides the database’s default timezone; a query’s timezone parameter can temporarily override both. The value must be a valid <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA time zone identifier</a> (for example, <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong>, or <strong>UTC</strong>). For details on how to use a <code>TIMESTAMPTZ</code> field, refer to <a href="timestamptz-field.md">TIMESTAMPTZ Field</a>.</p></td>
   </tr>
</table>

### Example 1: Set collection-level TTL

The following code snippet demonstrates how to set collection TTL.

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
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"collection.ttl.seconds": 60}
)
```

```java
import io.milvus.param.Constant;
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property(Constant.TTL_SECONDS, "60")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/common"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("collection.ttl.seconds", "60")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty(milvus::COLLECTION_TTL_SECONDS, "60"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "collection.ttl.seconds": 60
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["collection.ttl.seconds"] = "60" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "collection.ttl.seconds": 60
    }
}'
```

### Example 2: Set entity-level TTL | Milvus 3.0.x

The following code snippet designates an existing `TIMESTAMPTZ` field (`expire_at`) as the TTL field for entity-level TTL. The collection must already contain a `TIMESTAMPTZ` field with that name, and `collection.ttl.seconds` must not be set — the two TTL modes are mutually exclusive.

For the full entity-level TTL workflow (schema setup, insert, query, refresh, drop), refer to [Set entity-level TTL](set-collection-ttl.md).

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
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    # highlight-next-line
    properties={"ttl_field": "expire_at"}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property("ttl_field", "expire_at")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty("ttl_field", "expire_at"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("ttl_field", "expire_at")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty("ttl_field", "expire_at"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "ttl_field": "expire_at"
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["ttl_field"] = "expire_at" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "ttl_field": "expire_at"
    }
}'
```

### Example 3: Enable mmap

The following code snippet demonstrates how to enable mmap.

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
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"mmap.enabled": True}
)
```

```java
import io.milvus.param.Constant;
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property(Constant.MMAP_ENABLED, "true")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/common"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty(common.MmapEnabledKey, true))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("mmap.enabled", "true")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty(milvus::MMAP_ENABLED, "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "mmap.enabled": true
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["mmap.enabled"] = "true" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "mmap.enabled": "true"
    }
}'
```

### Example 4: Enable partition key

The following code snippet demonstrates how to enable the partition key.

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
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"partitionkey.isolation": True}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property("partitionkey.isolation", "true")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty("partitionkey.isolation", true))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("partitionkey.isolation", "true")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty("partitionkey.isolation", "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "partitionkey.isolation": true
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["partitionkey.isolation"] = "true" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "partitionkey.isolation": "true"
    }
}'
```

### Example 5: Enable dynamic field

The following code snippet demonstrates how to enable the dynamic field.

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
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"dynamicfield.enabled": True}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property("dynamicfield.enabled", "true")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty("dynamicfield.enabled", true))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("dynamicfield.enabled", "true")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty("dynamicfield.enabled", "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "dynamicfield.enabled": true
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["dynamicfield.enabled"] = "true" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "dynamicfield.enabled": "true"
    }
}'
```

### Example 6: Enable allow_insert_auto_id

The `allow_insert_auto_id` property allows a collection with AutoID enabled to accept user-provided primary key values during insert, upsert, and bulk import. When set to **"true"**, Milvus uses the user-provided primary key value if present; otherwise it auto-generates. Default is **"false"**.

The example below shows how to enable `allow_insert_auto_id`:

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
client.alter_collection_properties(
    collection_name="my_collection",
    # highlight-next-line
    properties={"allow_insert_auto_id": "true"}
)
# After enabling, inserts with a PK column will use that PK; otherwise Milvus auto-generates.
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property("allow_insert_auto_id", "true")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty("allow_insert_auto_id", "true"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("allow_insert_auto_id", "true")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty("allow_insert_auto_id", "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "allow_insert_auto_id": true
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["allow_insert_auto_id"] = "true" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "allow_insert_auto_id": "true"
    }
}'
```

### Example 7: Set collection time zone

You can set a default time zone for your collection using the `timezone` property. This determines how time-related data is interpreted and displayed for all operations within the collection, including data insertion, querying, and results presentation.

The value of `timezone` must be a valid [IANA time zone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), such as `Asia/Shanghai`, `America/Chicago`, or `UTC`. Using an invalid or non-standard value will result in an error when modifying the collection property.

The example below shows how to set the collection time zone to **Asia/Shanghai**:

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
client.alter_collection_properties(
    collection_name="my_collection",
    # highlight-next-line
    properties={"timezone": "Asia/Shanghai"}
)
```

```java
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

AlterCollectionPropertiesReq alterCollectionReq = AlterCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .property("timezone", "Asia/Shanghai")
        .build();

client.alterCollectionProperties(alterCollectionReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty("timezone", "Asia/Shanghai"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_collection_properties(
        AlterCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property("timezone", "Asia/Shanghai")
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->AlterCollectionProperties(milvus::AlterCollectionPropertiesRequest()
                                                   .WithCollectionName("my_collection")
                                                   .AddProperty("timezone", "Asia/Shanghai"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.alterCollectionProperties({
    collection_name: "my_collection",
    properties: {
        "timezone": "Asia/Shanghai"
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { ["timezone"] = "Asia/Shanghai" }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "properties": {
        "timezone": "Asia/Shanghai"
    }
}'
```

## Drop Collection Properties

You can also reset a collection property by dropping it as follows.

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
client.drop_collection_properties(
    collection_name="my_collection",
    property_keys=[
        "collection.ttl.seconds"
    ]
)
```

```java
import io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
import java.util.Collections;

client.dropCollectionProperties(DropCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .propertyKeys(Collections.singletonList("collection.ttl.seconds"))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/common"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption("my_collection", common.CollectionTTLConfigKey))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .drop_collection_properties(
        DropCollectionPropertiesRequest::builder()
            .collection_name("my_collection")
            .property_keys(["collection.ttl.seconds"])
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->DropCollectionProperties(milvus::DropCollectionPropertiesRequest()
                                                  .WithCollectionName("my_collection")
                                                  .AddPropertyKey(milvus::COLLECTION_TTL_SECONDS));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.dropCollectionProperties({
    collection_name: "my_collection",
    properties: ['collection.ttl.seconds'],
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.DropCollectionPropertiesAsync(new DropCollectionPropertiesReq
{
    CollectionName = "my_collection",
    DeleteKeys = ["collection.ttl.seconds"]
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "propertyKeys": [
        "collection.ttl.seconds"
    ]
}'
```
