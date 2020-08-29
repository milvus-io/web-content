---
id: connect_milvus_python.md
---

# Connect to the Server

This article decribes how to connect to a Milvus server from a Python client.

<div class="alert note">
<li>See <a href="https://github.com/milvus-io/pymilvus">Python API documentation</a> for details about APIs.</li>
<li>We recommend using <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> to estimate the hardware resources required for the data.</li>
</div>


1. Import pymilvus:

   ```python
   # Import pymilvus.
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. Use any of the following methods to connect to the Milvus server:

   ```python
   # Connect to the Milvus server.
   >>> milvus = Milvus(host='localhost', port='19530')
   ```

   <div class="alert note">
   In the above code, <code>host</code> and <code>port</code> both use default values. You can change them to your IP address and port.
   </div>

   ```python
   >>> milvus = Milvus(uri='tcp://localhost:19530')
   ```

