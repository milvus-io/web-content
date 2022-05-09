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
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
# Run `python3` in your terminal to operate in the Python interactive mode.
from pymilvus import connections
connections.connect(alias="default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const address = "localhost:19530";
const milvusClient = new MilvusClient(address);
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

<table class="language-cli">
    <thead>
        <tr>
            <th>Option</th>
            <th>Full name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-h</td>
            <td>--host</td>
            <td>(Optional) The host name. The default is "127.0.0.1".</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>--port</td>
            <td>(Optional) The port number. The default is "19530".</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>--alias</td>
            <td>(Optional) The alias name of the Milvus link. The default is "default".</td>
        </tr>
        <tr>
            <td>-D</td>
            <td>--disconnect</td>
            <td>(Optional) Flag to disconnect from the Milvus server specified by an alias. The default alias is "default".</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>

## Disconnect from a Milvus server

Disconnect from a Milvus server.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
connections.disconnect("default")
```


```javascript
await milvusClient.closeConnection();
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

## What's next

Having connected to a Milvus server, you can:

- [Create a collection](create_collection.md)
- [Manage data](insert_data.md)
- [Build a vector index](build_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)

For advanced operations, check:

- [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)
- [Node.js API reference](/api-reference/node/v1.0.20/tutorial.html)

