---
id: example_code.md
title: Try an Example Program
sidebar_label: Try an Example Program
---
# 运行示例程序

在 Milvus 服务端成功启动之后，你可以运行一个 Python 示例程序。这个示例程序将创建一个向量数据表，向其中插入 10 条向量，然后运行向量相似度查询。

1. 请确保系统已经安装了 [Python 3.5](https://www.python.org/downloads/) 和 [pip](https://pip.pypa.io/en/stable/installing/)。

2. 安装 Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip3 install pymilvus==0.2.12
   ```

   > 提示：如果需要进一步了解 Milvus Python SDK，请参考 [Milvus Python SDK Readme](https://github.com/milvus-io/pymilvus/blob/master/README.md)。
   
3. 下载 Python 示例代码。
   
   ```shell
   # Download Python example
   $ wget https://raw.githubusercontent.com/milvus-io/pymilvus/0.2.12/examples/example.py
   ```
   
   > 注意：万一你遇到无法通过 `wget` 命令正常下载示例代码的情况，你也可以创建 `example.py` 文件并复制粘贴[示例代码](https://github.com/milvus-io/pymilvus/blob/0.2.12/examples/example.py)的内容。

4. 运行示例代码。

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. 确认程序正确运行。

   ```shell
   Query result is correct.
   ```

   恭喜你！你已经成功完成了在 Milvus 上的第一次向量相似度查询。

## 接下来你可以

- 了解更多 Milvus [基础操作](../milvus_operation.md)
- [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)，发现更多解决方案。
