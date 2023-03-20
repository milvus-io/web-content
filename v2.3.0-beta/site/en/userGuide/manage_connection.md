---
id: manage_connection.md
related_key: connect Milvus
summary: Learn how to connect to a Milvus server.
---

# Manage Milvus Connections

This topic describes how to connect to and disconnect from a Milvus server.

<div class="alert note">
  Ensure to connect to a Milvus server before any operations.
</div>

Milvus supports two ports, port `19530` and port `9091`:
 
- Port `19530` is for gRPC. It is the default port when you connect to a Milvus server with different Milvus SDKs.

- Port `9091` is for RESTful API. It is used when you connect to a Milvus server with an HTTP client.

The example below connects to the Milvus server with host as `localhost` and port as `19530` or `9091`, and disconncets from it. If the connection is refused, try unblocking the corresponding port.

## Connect to a Milvus server

Construct a Milvus connection. Ensure to connect to Milvus server before any operations.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
# Run `python3` in your terminal to operate in the Python interactive mode.
from pymilvus import connections
connections.connect(
  alias="default", 
  host='localhost', 
  port='19530'
)
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const address = "localhost:19530";
const milvusClient = new MilvusClient(address);
```

```go
milvusClient, err := client.NewGrpcClient(
  context.Background(), // ctx
  "localhost:19530",    // addr
)
if err != nil {
  log.Fatal("failed to connect to Milvus:", err.Error())
}
```

```java
final MilvusServiceClient milvusClient = new MilvusServiceClient(
  ConnectParam.newBuilder()
    .withHost("localhost")
    .withPort(19530)
    .build()
);
```

```shell
connect -h localhost -p 19530 -a default
```

```curl
curl localhost:9091/api/v1/health  
{"status":"ok"}
```

<table class="language-python">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias</code></td>
		<td>Alias of the Milvus connection to construct.</td>
	</tr>
	<tr>
		<td><code>host</code></td>
		<td>IP address of the Milvus server.</td>
	</tr>
	<tr>
		<td><code>port</code></td>
		<td>Port of the Milvus server.</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
		<tr>
			<th>Parameter</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
    	<tr>
	    	<td><code>address</code></td>
			<td>Address of the Milvus connection to construct.</td>
		</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
		<tr>
			<th>Parameter</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
    	<tr>
	    	<td><code>ctx</code></td>
			<td>Context to control API invocation process.</td>
		</tr>
		<tr>
	    	<td><code>addr</code></td>
			<td>Address of the Milvus connection to construct.</td>
		</tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>Host</code></td>
		<td>IP address of the Milvus server.</td>
	</tr>
	<tr>
		<td><code>Port</code></td>
		<td>Port of the Milvus server.</td>
	</tr>
	</tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-h (Optional)</td>
            <td>The host name. The default is "127.0.0.1".</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>The port number. The default is "19530".</td>
        </tr>
        <tr>
            <td>-a (Optional)</td>
            <td>The alias name of the Milvus link. The default is "default".</td>
        </tr>
        <tr>
            <td>-D (Optional)</td>
            <td>Flag to disconnect from the Milvus server specified by an alias. The default alias is "default".</td>
        </tr>
    </tbody>
</table>

<div class="language-python">

### Return

A Milvus connection created by the passed parameters.

### Raises

<ul>
  <li><b>NotImplementedError</b>: If handler in connection parameters is not GRPC.</li>
  <li><b>ParamError</b>: If pool in connection parameters is not supported.</li>
  <li><b>Exception</b>: If server specified in parameters is not ready, we cannot connect to server.</li>
</ul>  

</div>


## Disconnect from a Milvus server

Disconnect from a Milvus server.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
connections.disconnect("default")
```


```javascript
await milvusClient.closeConnection();
```

```go
milvusClient.Close()
```

```java
milvusClient.close()
```

```shell
connect -D
```

```curl
# Close your HTTP client connection.
```

<table class="language-python">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias</code></td>
		<td>Alias of the Milvus server to disconnect from.</td>
	</tr>
	</tbody>
</table>

## Limits

The maximum number of connections is 65,536.

## What's next

Having connected to a Milvus server, you can:

- [Create a collection](create_collection.md)
- [Manage data](insert_data.md)
- [Build a vector index](build_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)

