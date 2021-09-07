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
