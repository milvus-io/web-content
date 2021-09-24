---
id: connect.md
summary: Learn how to connect Milvus server.
---

# Connect to Milvus Server

This section covers operations to connect to and disconnect from a Milvus server.

If you choose to operate in the Python interactive mode, type `python3` in your terminal.

> Parameters marked with `*` are specific to Python SDK, and those marked with `**` are specific to Node.js SDK.


## Connect to the Milvus server

Construct a Milvus connection and register it under given alias.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import connections
>>> connections.connect("default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>alias*</td>
		<td>Alias for the Milvus server</td>
    <td>Data type: String<br/>Mandatory</td>
	</tr>
	<tr>
		<td>host*</td>
		<td>IP address of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td>port*</td>
		<td>Port of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>address**</td>
		<td>Address of the Milvus server.</td>
		<td><code>"server_IP:server_port"</code><br/>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

## Disconnect from the Milvus server

When you no longer need Milvus services, you can release all connection resources of the Milvus server:

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

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>alias*</td>
		<td>Alias for the Milvus server</td>
		<td>Data type: String<br/>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

