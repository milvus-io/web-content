---
id: connect-to-milvus-server.md
title: "Connect to Milvus Server"
summary: "This topic describes how to establish a client connection to a Milvus server and configure common connection options."
---

# Connect to Milvus Server

This topic describes how to establish a client connection to a Milvus server and configure common connection options.

## Prerequisites

- The SDK of your language installed. For details, refer to [Python SDK](install-pymilvus.md), [Java SDK](install-java.md), [Go SDK](install-go.md), or [Nodejs SDK](install-node.md).

- A Milvus server address (for local default: `http://localhost:19530`, proxy port **19530**).

- If [authentication is enabled](authenticate.md), provide either a **token** or a **username + password**. A token can be `username:password` (e.g., `root:Milvus`). See [Authenticate User Access](authenticate.md) and [Create Users & Roles](users_and_roles.md) for details.

## Connect by URI (authentication disabled)

Use the Milvus server address (e.g. `http://localhost:19530`) to establish a connection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient("http://localhost:19530")
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build();
client = new MilvusClientV2(config);
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
   address: 'http://localhost:19530'
});
```

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

c, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
```

```bash
# The RESTful API is stateless, so there is no persistent connection.
# Each request hits the server directly; the /collections/list endpoint
# doubles as a health check when you need to verify reachability.
export HOST="localhost:19530"

curl -X POST "http://${HOST}/v2/vectordb/collections/list" \
    -H "Content-Type: application/json" \
    -H "Request-Timeout: 10" \
    -d '{}'
```

## Connect with credentials (authentication enabled)

Provide either a **token** in the form `"username:password"` or separate `user` and `password`. The default built-in admin is `root:Milvus` (change this for production).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

# Token form
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

# Or explicit user/password
client = MilvusClient(
    uri="http://localhost:19530",
    user="root",
    password="Milvus",
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .username("root")
        .password("Milvus")
        .build();
client = new MilvusClientV2(config);
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
   address: 'http://localhost:19530',
   username: 'root',
   password: 'Milvus'
});
```

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

c, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    Username: "root",
    Password: "Milvus",
})
```

```bash
export HOST="localhost:19530"
export TOKEN="root:Milvus"

curl -X POST "http://${HOST}/v2/vectordb/collections/list" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Request-Timeout: 10" \
    -d '{}'
```

<div class="alert note">

Token format is `"<username>:<password>"`. The docs explicitly note `root:Milvus` as the default credential, and the [Create Users & Roles](users_and_roles.md) guide covers managing users. 

</div>

## Configure a timeout

Set a default timeout on the client connection:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", timeout=1000) # If not set, the timeout defaults to 10s
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .rpcDeadlineMs(1000)
        .build();
client = new MilvusClientV2(config);

```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
   address: 'http://localhost:19530',
   username: 'root',
   password: 'Milvus',
   timeout: 1000 // ms
});
// await client.listCollections({ timeout: 2000})
```

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()
c, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
```

```bash
export HOST="localhost:19530"
export TOKEN="root:Milvus"

# Request-Timeout is applied per-request (unit: seconds). --max-time
# caps the total curl wall-clock so the client gives up even if the
# server never responds.
curl -X POST "http://${HOST}/v2/vectordb/collections/list" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Request-Timeout: 10" \
    --max-time 7 \
    -d '{}'
```

<div class="alert note">

- For the SDKs listed above, this timeout is used only when establishing connections and does not serve as a default timeout for other API operations.

- For the RESTful API, `Request-Timeout` is a per-request deadline in seconds (unlike Java's `rpcDeadlineMs` and the Node.js `timeout`, which are in milliseconds), so include it on every call that needs a deadline.

</div>

## Connect to a specific database

Choose the target database during construction with `db_name`. You can also switch later using `using_database()`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

# Set the database when creating the client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
    db_name="analytics",
)

# (Optional) Switch the active database later
# client.using_database("reports")
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .username("root")
        .password("Milvus")
        .dbName("analytics")
        .build();
client = new MilvusClientV2(config);
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
   address: 'http://localhost:19530',
   username: 'root',
   password: 'Milvus',
   database: 'analytics'
});
// (Optional) Switch the active database later
// await milvusClient.useDatabase({
//   db_name: 'reports',
//});
```

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

c, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    DBName:  "analytics",
    APIKey:  "root:Milvus",
})
// (Optional) switch the active database later with:
err = c.UseDatabase(ctx, milvusclient.NewUseDatabaseOption("reports"))
```

```bash
export HOST="localhost:19530"
export TOKEN="root:Milvus"

# Target a specific database by setting "dbName" in the request body.
# The RESTful API is stateless, so include "dbName" on every request
# that should run against a non-default database.
curl -X POST "http://${HOST}/v2/vectordb/collections/list" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Request-Timeout: 10" \
    -d '{
      "dbName": "analytics"
    }'
```

<div class="alert note">

See the [Database](manage_databases.md) guide for creating, listing, and describing databases, and for broader database management tasks. 

</div>

## What's next

- [Create Collection](create-collection.md)

- [Insert Entities](insert-update-delete.md)

- [Basic Vector Search](single-vector-search.md)

