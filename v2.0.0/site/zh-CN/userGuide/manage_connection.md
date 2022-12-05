---
id: manage_connection.md
related_key: connect Milvus
summary: Learn how to connect to a Milvus server.
---

# 管理Milvus连接

当前主题介绍怎么连接、断开 Milvus 服务器。

<div class="alert note">
  在进行其他操作前确保连接到 Milvus 服务器。
</div>

下面的例子使用 `localhost` 作为主机名，端口号 `19530` 展示连接或断开连接到 Milvus 服务器。


## 连接到 Milvus 服务器

构建一个 Milvus 连接。在进行其他操作前确保已连接 Milvus 服务。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

```shell
connect -h localhost -p 19530 -a default
```


<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias</code></td>
		<td>创建的Milvus连接的别名。</td>
	</tr>
	<tr>
		<td><code>host</code></td>
		<td>Milvus 服务 IP 地址。</td>
	</tr>
	<tr>
		<td><code>port</code></td>
		<td>Milvus 服务端口号。</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
		<tr>
		<th>参数</th>
		<th>描述</th>
		</tr>
	</thead>
	<tbody>
    	<tr>
	    	<td><code>address</code></td>
			<td>Milvus 连接地址。</td>
		</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
		<tr>
		<th>参数</th>
		<th>描述</th>
		</tr>
	</thead>
	<tbody>
    	<tr>
	    	<td><code>ctx</code></td>
			<td>控制调用 API 的 context。</td>
		</tr>
		<tr>
	    	<td><code>addr</code></td>
			<td>Milvus 连接地址。</td>
		</tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>Host</code></td>
		<td>Milvus IP 地址。</td>
	</tr>
	<tr>
		<td><code>Port</code></td>
		<td>Milvus 端口。</td>
	</tr>
	</tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>选项</th>
            <th>全称</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-h</td>
            <td>--host</td>
            <td>(可选) Milvus 服务 IP 地址。默认为 "127.0.0.1"。</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>--port</td>
            <td>(可选) Milvus 服务端口。默认为 "19530"。</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>--alias</td>
            <td>(可选) Milvus 连接别名。默认为 "default"。</td>
        </tr>
        <tr>
            <td>-D</td>
            <td>--disconnect</td>
            <td>(可选) 使用别名断开连接的标记。默认别名为  "default".</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>显示命令行帮助</td>
        </tr>
    </tbody>
</table>



## 断开 MIlvus 连接

从 MIlvus 服务器断开。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias</code></td>
		<td>Milvus 服务别名。</td>
	</tr>
	</tbody>
</table>

## 使用限制

最大连接数为 65536。

## 更多内容

链接 Milvus 后，还可以：

- [创建 collection](create_collection.md)
- [插入数据](insert_data.md)
- [创建索引](build_index.md)
- [向量搜索](search.md)
- [混合搜索](hybridsearch.md)

关于其他操作，参考

- [PyMilvus API reference](/api-reference/pymilvus/v2.0.1/tutorial.html)
- [Node.js API reference](/api-reference/node/v2.0.1/tutorial.html)

