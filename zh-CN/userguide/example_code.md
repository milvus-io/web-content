---
id: example_code
title: Try an Example Program
sidebar_label: Try an Example Program
---
# 运行示例程序

接下来，让我们来运行一个Python示例程序。您将创建一个向量数据表，向其中插入10条向量，然后运行一条向量相似度查询。

1. 请确保系统已经安装了[Python3](https://www.python.org/downloads/)。

2. 安装Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip install pymilvus==0.2.0
   ```

   > 提示：如果需要进一步了解Milvus Python SDK，请阅读[Milvus Python SDK使用手册](https://pypi.org/project/pymilvus)。
   
3. 创建*example.py*文件，并向文件中加入[Python示例代码](https://github.com/milvus-io/pymilvus/blob/branch-0.4.0/examples/AdvancedExample.py)。

4. 运行示例代码。

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. 确认程序正确运行。

   恭喜您！您已经成功完成了在Milvus上的第一次向量相似度查询。
