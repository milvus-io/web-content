---
id: manage_connection.md
related_key: connect Milvus
summary: Learn how to connect to a Milvus server.
---

# Manage Milvus Connections

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


This topic describes how to connect to and disconnect from a Milvus server.

<div class="alert note">
  Ensure to connect to Milvus server before any operations.
</div>

Below example connects to a Milvus server with host as `localhost` and port as `19530` and disconnects from it.


## Connect to a Milvus server

Construct a Milvus connection. Ensure to connect to Milvus server before any operations.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
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
				.build());
```

```cli
connect -h localhost -p 19530 -a default
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

<table class="language-cli">
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
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
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

```cli
connect -D
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

For advanced operations, check:

- [PyMilvus API reference](/api-reference/pymilvus/v2.0.0/tutorial.html)
- [Node.js API reference](/api-reference/node/v2.0.0/tutorial.html)

