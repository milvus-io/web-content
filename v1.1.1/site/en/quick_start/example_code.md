---
id: example_code.md
---

# Hello Milvus 

After the Milvus server is successfully started, you can use this example program to create a table, insert 10 vectors, and then run a vector similarity search.

1. Make sure [Python 3.6](https://www.python.org/downloads/) and a compatible [pip](https://pip.pypa.io/en/stable/installing/) are installed.

2. Install Milvus Python SDK.

   ```shell
   # Install Milvus Python SDK
   $ pip3 install pymilvus==1.1.2
   ```

   <div class="alert note">
   To learn more about Milvus Python SDK, go to <a href="https://github.com/milvus-io/pymilvus/blob/v1.0.1/README.md">Milvus Python SDK Readme.</a>
   </div>

3. Download Python example code.

   ```shell
   # Download Python example
   $ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v1.1.2/examples/example.py
   ```

   <div class="alert note">
   If you cannot use <code>wget</code> to download the example code, you can also create <b>example.py</b> and copy the <a href="https://github.com/milvus-io/pymilvus/blob/v1.1.2/examples/example.py">example code.</a>
   </div>
   
4. Run the example code.

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. Confirm the program is running correctly.

   ```shell
   Query result is correct.
   ```

Congratulations! You have successfully completed your first vector similarity search with Milvus.

## What's next

- [Learn basic Milvus operations](connect_milvus_python.md) in Milvus
- [Try Milvus bootcamp](https://github.com/zilliz-bootcamp) to check more solutions
