---
id: example_code.md
title: Try an Example Program
sidebar_label: Try an Example Program
---

# Try an Example Program

After the Milvus server is successfully started, you can use this example program to create a table, insert 10 vectors, and then run a vector similarity search.

1. Make sure [Python 3.5](https://www.python.org/downloads/) and a compatible [pip](https://pip.pypa.io/en/stable/installing/) are installed.

2. Install Milvus Python SDK.

   ```shell
   # Install Milvus Python SDK
   $ pip3 install pymilvus==0.2.12
   ```

   > Note: To learn more about Milvus Python SDK, go to [Milvus Python SDK Readme](https://github.com/milvus-io/pymilvus/blob/master/README.md).

3. Download Python example code.

   ```shell
   # Download Python example
   $ wget https://raw.githubusercontent.com/milvus-io/pymilvus/0.2.12/examples/example.py
   ```
   
    > Note: If you cannot use `wget` to download the example code, you can also create `example.py` and copy the [example code](https://github.com/milvus-io/pymilvus/blob/0.2.12/examples/example.py).
   
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

- Learn [basic operations](../milvus_operation.md) in Milvus
- [Try Milvus bootcamp](https://github.com/milvus-io/bootcamp) to check more solutions
