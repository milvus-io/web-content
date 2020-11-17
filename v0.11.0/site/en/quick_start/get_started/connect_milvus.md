---
id: connect_milvus.md
---

# Connect to the Server

This article decribes how to connect to the Milvus server.

<div class="alert note">
<li>See <a href="https://github.com/milvus-io/pymilvus">Python API documentation</a> for details about APIs.</li>
<li>We recommend using <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> to estimate the hardware resources required for the data.</li>
</div>

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

1. Import pymilvus:

   ```python
   # Import pymilvus.
   >>> from milvus import Milvus, DataType
   ```

2. Use any of the following methods to connect to the Milvus server:

   ```python
   # Connect to the Milvus server.
   >>> client = Milvus(host='localhost', port='19530')
   ```

   <div class="alert note">
   In the above code, <code>host</code> and <code>port</code> both use default values. You can change them to your IP address and port.
   </div>

   ```python
   >>> client = Milvus(uri='tcp://localhost:19530')
   ```

## FAQ

<details>
<summary><font color="#4fc4f9">Does Milvus' Python SDK have a connection pool?</font></summary>
Python SDKs corresponding to Milvus v0.9.0 or later have a connection pool. There is no upper limit on the default number of connections in a connection pool.
</details>
<details>
<summary><font color="#4fc4f9">How to fix the error when I install pymilvus on Windows?</font></summary>
Try installing pymilvus in a Conda environment.
</details>

</div>

<div class="filter-Java" markdown="block">

1. Import all Milvus.client related file packages：

   ```java
   import io.milvus.client.*;
   ```

2. Connect to the Milvus server：

   ```java
    // You can call withLogging() to enable logging framework.
    ConnectParam connectParam = new ConnectParam.Builder().withHost("127.0.0.1").withPort(19530).build();
    MilvusClient client = new MilvusGrpcClient(connectParam);
    ```
</div>