---
id: connect.md
---

# 连接服务器

通过本章节文档，你将了解如何连接 Milvus 服务器。

如果你选择在 Python 交互式编程环境下学习基本操作，在命令行输入 `python3`。

## 连接 Milvus 服务器

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
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias*</code></td>
		<td>Milvus 服务器的名称</td>
		<td>数据类型: String<br/>必填项</td>
	</tr>
	<tr>
		<td><code>host*</code></td>
		<td>Milvus 服务器的 IP</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>port*</code></td>
		<td>Milvus 服务器的端口</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>address**</code></td>
		<td>Milvus 服务器的地址</td>
		<td><code>"server_IP:server_port"</code><br/>必填项</td>
	</tr>
	</tbody>
</table>
</details>

## 断开与服务器的连接

使用完 Milvus 的服务之后，可以断开与 Milvus 服务器的连接以释放资源：

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
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>alias*</td>
		<td>Milvus 服务器的名称</td>
		<td>数据类型: String<br/>必填项</td>
	</tr>
	</tbody>
</table>
</details>
