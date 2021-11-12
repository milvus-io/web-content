---
id: manage_connection.md
related_key: connect Milvus
summary: Learn how to connect to a Milvus server.
---

# Manage Milvus Connections

This topic describes how to connect to and disconnect from a Milvus server.

<div class="alert note">
  Ensure to connect to Milvus server before any operations.
</div>

Below example connects to a Milvus server with host as `localhost` and port as `19530` and disconnects from it.


## Connect to a Milvus server

Construct a Milvus connection. Ensure to connect to Milvus server before any operations.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
# Run `python3` in your terminal to operate in the Python interactive mode.
>>> from pymilvus import connections
>>> connections.connect(alias="default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
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

## Disconnect from a Milvus server

Disconnect from a Milvus server.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> connections.disconnect("default")
```


```javascript
await milvusClient.closeConnection();
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

- [Create a collection](manage_collection.md)
- [Manage data](manage_data.md)
- [Build a vector index](manage_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)

For advanced operations, check:

- [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
- [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

