---
id: manage_databases.md
title: "Database"
summary: "Milvus introduces a database layer above collections, providing a more efficient way to manage and organize your data while supporting multi-tenancy."
---

# Database

Milvus introduces a **database** layer above collections, providing a more efficient way to manage and organize your data while supporting multi-tenancy.

## What is a database

In Milvus, a database serves as a logical unit for organizing and managing data. To enhance data security and achieve multi-tenancy, you can create multiple databases to logically isolate data for different applications or tenants. For example, you create a database to store the data of user A and another database for user B.

## Create database

You can use the Milvus RESTful API or SDKs to create a database programmatically.

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

client.create_database(
    db_name="my_database_1"
)
```

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.service.database.request.*;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

CreateDatabaseReq createDatabaseReq = CreateDatabaseReq.builder()
        .databaseName("my_database_1")
        .build();
client.createDatabase(createDatabaseReq);
```

```go
import (
    "context"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    // handle err
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_1"))
if err != nil {
    // handle err
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
    .create_database(
        CreateDatabaseRequest::builder()
            .database_name("my_database_1")
            .build()?,
    )
    .await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530", "root:Milvus"));
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}

auto request = milvus::CreateDatabaseRequest().WithDatabaseName("my_database_1");
status = client->CreateDatabase(request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
import {MilvusClient} from '@zilliz/milvus2-sdk-node';
const client = new MilvusClient({
    address: "http://localhost:19530",
    token: 'root:Milvus'
});

await client.createDatabase({
    db_name: "my_database_1"
 });
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Database;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

await client.CreateDatabaseAsync(new CreateDatabaseReq
{
    DatabaseName = "my_database_1"
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "my_database_1"
}'
```


You can also set properties for the database when you create it. The following example sets the number of replicas of the database.

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
client.create_database(
    db_name="my_database_2",
    properties={
        "database.replica.number": 3
    }
)
```

```java
Map<String, String> properties = new HashMap<>();
properties.put("database.replica.number", "3");
CreateDatabaseReq createDatabaseReq = CreateDatabaseReq.builder()
        .databaseName("my_database_2")
        .properties(properties)
        .build();
client.createDatabase(createDatabaseReq);
```

```go
err := cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_2").WithProperty("database.replica.number", 3))
if err != nil {
    // handle err
}
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

client
    .create_database(
        CreateDatabaseRequest::builder()
            .database_name("my_database_2")
            .properties(HashMap::from([
                ("database.replica.number".into(), "3".into()),
            ]))
            .build()?,
    )
    .await?;
```

```cpp
auto request = milvus::CreateDatabaseRequest()
    .WithDatabaseName("my_database_2")
    .AddProperty("database.replica.number", "3");
status = client->CreateDatabase(request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.createDatabase({
    db_name: "my_database_2",
    properties: {
        "database.replica.number": 3
    }
});
```

```csharp
using Milvus.Client.V2.Requests.Database;

await client.CreateDatabaseAsync(new CreateDatabaseReq
{
    DatabaseName = "my_database_2",
    Properties =
    {
        ["database.replica.number"] = "3"
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "my_database_2",
    "properties": {
        "database.replica.number": 3
    }
}'
```


## View databases

You can use the Milvus RESTful API or SDKs to list all existing databases and view their details.

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
# List all existing databases
client.list_databases()

# Output
# ['default', 'my_database_1', 'my_database_2']

# Check database details
client.describe_database(
    db_name="default"
)

# Output
# {"name": "default"}
```

```java
import io.milvus.v2.service.database.response.*;

ListDatabasesResp listDatabasesResp = client.listDatabases();

DescribeDatabaseResp descDBResp = client.describeDatabase(DescribeDatabaseReq.builder()
        .databaseName("default")
        .build());
```

```go
// List all existing databases
databases, err := cli.ListDatabase(ctx, milvusclient.NewListDatabaseOption())
if err != nil {
    // handle err
}
log.Println(databases)

db, err := cli.DescribeDatabase(ctx, milvusclient.NewDescribeDatabaseOption("default"))
if err != nil {
    // handle err
}
log.Println(db)
```

```rust
use milvus::v2::prelude::*;

let databases = client
    .list_databases(ListDatabasesRequest::builder().build()?)
    .await?;
println!("{:?}", databases);

let database = client
    .describe_database(
        DescribeDatabaseRequest::builder()
            .database_name("default")
            .build()?,
    )
    .await?;
println!("{:?}", database);
```

```cpp
milvus::ListDatabasesResponse listResponse;
status = client->ListDatabases(milvus::ListDatabasesRequest(), listResponse);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}

milvus::DescribeDatabaseResponse describeResponse;
status = client->DescribeDatabase(
    milvus::DescribeDatabaseRequest().WithDatabaseName("default"),
    describeResponse);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.describeDatabase({
    db_name: 'default'
});
```

```csharp
using Milvus.Client.V2.Requests.Database;
using Milvus.Client.V2.Responses.Database;

ListDatabasesResp databases = await client.ListDatabasesAsync(new ListDatabasesReq());
Console.WriteLine(string.Join(",", databases.DatabaseNames));

DescribeDatabaseResp database = await client.DescribeDatabaseAsync(new DescribeDatabaseReq
{
    DatabaseName = "default"
});
Console.WriteLine(database.DatabaseName);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "default"
}'
```


## Manage database properties

Each database has its own properties, you can set the properties of a database when you create the database as described in [Create database](manage_databases.md#Create-database) or you can alter and drop the properties of any existing database.

The following table lists possible database properties.

<table>
   <tr>
     <th><p>Property Name</p></th>
     <th><p>Type</p></th>
     <th><p>Property Description</p></th>
   </tr>
   <tr>
     <td><p><code>database.replica.number</code></p></td>
     <td><p>integer</p></td>
     <td><p>The number of replicas for the specified database.</p></td>
   </tr>
   <tr>
     <td><p><code>database.resource_groups</code></p></td>
     <td><p>string</p></td>
     <td><p>The names of the resource groups associated with the specified database in a comma-separated list.</p></td>
   </tr>
   <tr>
     <td><p><code>database.diskQuota.mb</code></p></td>
     <td><p>integer</p></td>
     <td><p>The maximum size of the disk space for the specified database, in megabytes (MB).</p></td>
   </tr>
   <tr>
     <td><p><code>database.max.collections</code></p></td>
     <td><p>integer</p></td>
     <td><p>The maximum number of collections allowed in the specified database.</p></td>
   </tr>
   <tr>
     <td><p><code>database.force.deny.writing</code></p></td>
     <td><p>boolean</p></td>
     <td><p>Whether to force the specified database to deny writing operations.</p></td>
   </tr>
   <tr>
     <td><p><code>database.force.deny.reading</code></p></td>
     <td><p>boolean</p></td>
     <td><p>Whether to force the specified database to deny reading operations.</p></td>
   </tr>
   <tr>
     <td><p><code>timezone</code></p></td>
     <td><p>string</p></td>
     <td><p>Specifies the default timezone applied to time-sensitive operations within the database, particularly for <code>TIMESTAMPTZ</code> fields. Collections inherit the database timezone unless a collection-level timezone is set. A query-level timezone parameter can temporarily override both database and collection defaults. The value must be a valid <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA time zone identifier</a> (for example, <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong>, or <strong>UTC</strong>). For details on how to use a <code>TIMESTAMPTZ</code> field, refer to <a href="timestamptz-field.md">TIMESTAMPTZ Field</a>.</p></td>
   </tr>
</table>

### Alter database properties

You can alter the properties of an existing database as follows. The following example limits the number of collections you can create in the database.

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
client.alter_database_properties(
    db_name="my_database_1",
    properties={
        "database.max.collections": 10
    }
)
```

```java
import io.milvus.v2.service.database.request.AlterDatabasePropertiesReq;

client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .property("database.max.collections", "10")
        .build());
```

```go
err := cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption("my_database_1").
    WithProperty("database.max.collections", 10))
if err != nil {
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

client
    .alter_database_properties(
        AlterDatabasePropertiesRequest::builder()
            .database_name("my_database_1")
            .property("database.max.collections", "10")
            .build()?,
    )
    .await?;
```

```cpp
auto request = milvus::AlterDatabasePropertiesRequest()
    .WithDatabaseName("my_database_1")
    .AddProperty("database.max.collections", "10");
status = client->AlterDatabaseProperties(request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.alterDatabaseProperties({
  db_name: "my_database_1",
  properties: {
    "database.max.collections": 10,
  },
})
```

```csharp
using Milvus.Client.V2.Requests.Database;

await client.AlterDatabasePropertiesAsync(new AlterDatabasePropertiesReq
{
    DatabaseName = "my_database_1",
    Properties =
    {
        ["database.max.collections"] = "10"
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "my_database_1",
    "properties": {
        "database.max.collections": 10
    }
}'
```


### Drop database properties

You can also reset a database property by dropping it as follows. The following example removes the limit on the number of collections you can create in the database.

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
client.drop_database_properties(
    db_name="my_database_1",
    property_keys=[
        "database.max.collections"
    ]
)
```

```java
import io.milvus.v2.service.database.request.DropDatabasePropertiesReq;
import java.util.Collections;

client.dropDatabaseProperties(DropDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .propertyKeys(Collections.singletonList("database.max.collections"))
        .build());
```

```go
err := cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption("my_database_1", "database.max.collections"))
if err != nil {
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

client
    .drop_database_properties(
        DropDatabasePropertiesRequest::builder()
            .database_name("my_database_1")
            .property_keys(["database.max.collections"])
            .build()?,
    )
    .await?;
```

```cpp
auto request = milvus::DropDatabasePropertiesRequest()
    .WithDatabaseName("my_database_1")
    .AddPropertyKey("database.max.collections");
status = client->DropDatabaseProperties(request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.dropDatabaseProperties({
  db_name: "my_database_1",
  property_keys: ["database.max.collections"],
});
```

```csharp
using Milvus.Client.V2.Requests.Database;

await client.DropDatabasePropertiesAsync(new DropDatabasePropertiesReq
{
    DatabaseName = "my_database_1",
    DeleteKeys = ["database.max.collections"]
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "my_database_1",
    "propertyKeys": [
        "database.max.collections"
    ]
}'
```


## Use database

You can switch from one database to another without disconnecting from Milvus.

<div class="alert note">

RESTful API does not support switching databases on a persistent connection. For RESTful API requests, specify the target database in each request body when the operation supports `dbName`.

</div>

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
client.use_database(
    db_name="my_database_2"
)
```

```java
client.useDatabase("my_database_2");
```

```go
err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

```rust
client.use_database("my_database_2").await?;
```

```cpp
status = client->UseDatabase("my_database_2");
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.useDatabase({
  db_name: "my_database_2",
});
```

```csharp
using Milvus.Client.V2.Requests.Utility;

await client.UseDatabaseAsync(new UseDatabaseReq
{
    DatabaseName = "my_database_2"
});
```

```bash
# This operation is unsupported because RESTful does not provide a persistent connection.
# As a workaround, initiate the required request again with the target database.
```


## Drop database

Once a database is no longer needed, you can drop the database. Note that:

- Default databases cannot be dropped.

- Before dropping a database, you need to drop all collections in the database first.

You can use the Milvus RESTful API or SDKs to drop a database programmatically.

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
client.drop_database(
    db_name="my_database_2"
)
```

```java
client.dropDatabase(DropDatabaseReq.builder()
        .databaseName("my_database_2")
        .build());
```

```go
err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

client
    .drop_database(
        DropDatabaseRequest::builder()
            .database_name("my_database_2")
            .build()?,
    )
    .await?;
```

```cpp
auto request = milvus::DropDatabaseRequest().WithDatabaseName("my_database_2");
status = client->DropDatabase(request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
}
```

```javascript
await client.dropDatabase({
  db_name: "my_database_2",
});
```

```csharp
using Milvus.Client.V2.Requests.Database;

await client.DropDatabaseAsync(new DropDatabaseReq
{
    DatabaseName = "my_database_2"
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "dbName": "my_database_2"
}'
```


## FAQ

### How do I manage permissions for a database?

Milvus uses Role-Based Access Control (RBAC) to manage permissions. You can create roles with specific privileges and assign them to users, thus controlling their access to different databases. For more details, refer to the [RBAC documentation](rbac.md).

### Are there any quota limitations for a database?

Yes, Milvus allows you to set quota limitations for a database, such as the maximum number of collections. For a comprehensive list of limitations, please refer to the [Milvus Limits documentation](limitations.md).
