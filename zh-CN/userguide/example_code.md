---
id: example_code
title: Try an Example Program
sidebar_label: Try an Example Program
---
# 运行示例程序

接下来，让我们来运行一个 Python 示例程序。您将创建一个向量数据表，向其中插入10条向量，然后运行向量相似度查询。

1. 请确保系统已经安装了 [Python 3.5](https://www.python.org/downloads/) 和 [pip](https://pip.pypa.io/en/stable/installing/)。

2. 安装 Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip install pymilvus==0.2.5
   ```

   > 提示：如果需要进一步了解 Milvus Python SDK，请阅读 [Milvus Python SDK 使用手册](https://milvus-io.github.io/milvus-sdk-python/pythondoc/status.html)。
   

3. 创建 `example.py` 文件，并向文件中加入 [Python 示例代码](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)。


4. 运行示例代码。

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. 确认程序正确运行。

   ```shell
   Query result is correct.
   ```

   恭喜您！您已经成功完成了在 Milvus 上的第一次向量相似度查询。

## 接下来您可以

- 了解更多 Milvus [基础操作](milvus_operation.md)
- [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)，发现更多解决方案
