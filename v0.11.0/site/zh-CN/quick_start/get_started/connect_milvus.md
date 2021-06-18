---
id: connect_milvus.md
---

# 连接服务端

该页面将向你展示如何从客户端连接 Milvus 服务端。 

<div class="alert note">
建议你使用 <a href="https://milvus.io/tools/sizing">资源评估工具</a> 来估算数据所需的硬件资源。
</div>

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

1. 导入 pymilvus：

   ```python
   # Import pymilvus.
   >>> from milvus import Milvus, DataType
   ```

2. 使用以下任意一种方法连接 Milvus 服务端：

   ```python
   # Connect to the Milvus server.
   >>> client = Milvus(host='localhost', port='19530')
   ```

   <div class="alert note">
   在上面的代码中，<code>host</code> 和 <code>port</code> 都使用了默认值。你可以将其更改为自己设定的 IP 地址和端口。
   </div>

   ```python
   >>> client = Milvus(uri='tcp://localhost:19530')
   ```

#### 常见问题

<details>
<summary><font color="#4fc4f9">Milvus 的 Python SDK 有连接池吗？</font></summary>
Milvus v0.9.0 及更高版本对应的 Python SDK 有连接池。连接池的默认连接数量没有上限。
</details>
<details>
<summary><font color="#4fc4f9">在 Windows 安装 pymilvus 报错，如何解决？</font></summary>
可以尝试在 Conda 环境下安装。
</details>

</div>

<div class="filter-Java" markdown="block">

1. 导入 Milvus.client 所有相关包：

   ```java
   import io.milvus.client.*;
   ```

2. 连接 Milvus 服务端：

   ```java
   // You can call withLogging() to enable logging framework.
    ConnectParam connectParam = new ConnectParam.Builder().withHost("127.0.0.1").withPort(19530).build();
    MilvusClient client = new MilvusGrpcClient(connectParam);
    ```
</div>