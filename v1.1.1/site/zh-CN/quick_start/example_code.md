---
id: example_code.md
---
# Hello Milvus

在 Milvus 服务端成功启动之后，你可以运行一个 Python 示例程序。这个示例程序将创建一个向量数据表，向其中插入 10 条向量，然后运行向量相似度查询。

1. 请确保系统已经安装了 [Python 3.6](https://www.python.org/downloads/) 和 [pip](https://pip.pypa.io/en/stable/installing/)。

2. 安装 Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip3 install pymilvus==1.1.0
   ```

   <div class="alert note">
   如果需要进一步了解 Milvus Python SDK，请参考 <a href="https://github.com/milvus-io/pymilvus/blob/v1.0.1/README.md">Milvus Python SDK Readme</a>。
   </div>
   
3. 下载 Python 示例代码。
   
   ```shell
   # Download Python example
   $ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v1.1.0/examples/example.py
   ```
   
   <div class="alert note">
   万一你遇到无法通过 <code>wget</code> 命令正常下载示例代码的情况，你也可以创建 <b>example.py</b> 文件并复制粘贴 <a href="https://github.com/milvus-io/pymilvus/blob/v1.1.0/examples/example.py">示例代码</a> 的内容。
   </div>

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

- [了解更多 Milvus 基础操作](connect_milvus_python.md)
- [体验 Milvus 在线训练营](https://github.com/zilliz-bootcamp)，发现更多解决方案。
