---
id: connect.md
related_key: connect Milvus
summary: Learn how to connect Milvus server.
---

# Connect to Milvus Server

This topic describes how to connect to and disconnect from a Milvus server.

If you choose to operate in the Python interactive mode, type `python3` in your terminal.
 
<div class="alert note">
Parameters marked with <code>*</code> are specific to Python SDK, and those marked with <code>**</code> are specific to Node.js SDK.
</div>

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
		<td><code>alias*</code></td>
		<td>Alias for the Milvus server</td>
    <td>Data type: String<br/>Mandatory</td>
	</tr>
	<tr>
		<td><code>host*</code></td>
		<td>IP address of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td><code>port*</code></td>
		<td>Port of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td><code>address**</code></td>
		<td>Address of the Milvus server</td>
		<td><code>"server_IP:server_port"</code><br/>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

## Disconnect from the Milvus server

When you no longer need Milvus services, you can disconnect from Milvus server:

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

