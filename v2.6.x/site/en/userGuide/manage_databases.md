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

You can use the Milvus RESTful API or SDKs to create data programmatically.

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

```go
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    Username: "Milvus",
    Password: "root",
})
if err != nil {
    // handle err
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_1"))
if err != nil {
    // handle err
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database_1"
}'
```

You can also set properties for the database when you create it. The following example sets the number of replicas of the database.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
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

```javascript
await client.createDatabase({
    db_name: "my_database_2",
    properties: {
        "database.replica.number": 3
    }
});
```

```go
err := cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_2").WithProperty("database.replica.number", 3))
if err != nil {
    // handle err
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
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

```javascript
await client.describeDatabase({ 
    db_name: 'default'
});
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

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
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
     <td><p>The names of the resource groups associated with the specified database in a common-separated list.</p></td>
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
</table>

### Alter database properties

You can alter the properties of an existing database as follows. The following example limits the number of collections you can create in the database.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.alter_database_properties(
    db_name: "my_database_1",
    properties: {
        "database.max.collections": 10
    }
)
```

```java
client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .property("database.max.collections", "10")
        .build());
```

```javascript
await milvusClient.alterDatabaseProperties({
  db_name: "my_database_1",
  properties: {"database.max.collections", "10" },
})
```

```go
err := cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption("my_database_1").
    WithProperty("database.max.collections", 1))
if err != nil {
    // handle err
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database",
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_database_properties(
    db_name: "my_database_1",
    property_keys: [
        "database.max.collections"
    ]
)
```

```java
client.dropDatabaseProperties(DropDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .propertyKeys(Collections.singletonList("database.max.collections"))
        .build());
```

```javascript
await milvusClient.dropDatabaseProperties({
  db_name: my_database_1,
  properties: ["database.max.collections"],
});
```

```go
err := cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption("my_database_1", "database.max.collections"))
if err != nil {
    // handle err
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database",
    "propertyKeys": [
        "database.max.collections"
    ]
}'
```

## Use database

You can switch from one database to another without disconnecting from Milvus.

<div class="alert note">

RESTful API does not support this operation.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
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

```javascript
await milvusClient.useDatabase({
  db_name: "my_database_2",
});
```

```go
err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

```bash
# This operation is unsupported because RESTful does not provide a persistent connection.
# As a workaround, initiate the required request again with the target database.
```

## Drop database

Once a database is no longer needed, you can drop the database. Note that:

- Default databases cannot be dropped.

- Before dropping a database, you need to drop all collections in the database first.

You can use the Milvus RESTful API or SDKs to create data programmatically.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
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

```javascript
await milvusClient.dropDatabase({
  db_name: "my_database_2",
});
```

```go
err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database"
}'
```

