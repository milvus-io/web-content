---
id: cli_overview.md
summary: Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data.
---

# 什么是 Milvus_CLI？

Milvus 命令行接口(CLI)是一个支持数据库连接、数据操作、以及数据导入和导出的命令行工具。基于 [Milvus Python SDK](https://github.com/milvus-io/pymilvus)，它允许使用交互式命令行提示符通过终端执行命令。

## 推荐版本

在下面的表格中，你可以找到根据你正在使用的 Milvus 版本推荐的 PyMilvus 和 Milvus 版本。

|  Milvus   | PyMilvus | Milvus_CLI |
| :-------: | :------: | :--------: |
|   1.0.x   |  1.0.1   |     x      |
|   1.1.x   |  1.1.2   |     x      |
| 2.0.0-RC1 | 2.0.0rc1 |     x      |
| 2.0.0-RC2 | 2.0.0rc2 |   0.1.3    |
| 2.0.0-RC4 | 2.0.0rc4 |   0.1.4    |
| 2.0.0-RC5 | 2.0.0rc5 |   0.1.5    |
| 2.0.0-RC6 | 2.0.0rc6 |   0.1.6    |
| 2.0.0-RC7 | 2.0.0rc7 |   0.1.7    |
| 2.0.0-RC8 | 2.0.0rc8 |   0.1.8    |

<div class="alert note">由于存储格式的变化，Milvus 2.0.0-RC7及更高版本不能向2.0.0-RC6及更低版本兼容。</div>

## 当前版本

Milvus_CLI 的当前版本是 0.1.8。
如果想查找已安装的版本，并查看是否需要更新，请运行 `shell milvus_cli --version` 命令。
