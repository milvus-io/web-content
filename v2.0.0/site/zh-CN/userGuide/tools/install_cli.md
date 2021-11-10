---
id: install_cli.md
summary: Learn how to install Milvus CLI.
---
# 如何安装Milvus CLI
Milvus CLI的当前版本是0.1.8。
如果想查找已安装的版本，并查看是否需要更新，请运行```shell milvus_cli --version```命令。


## 先决条件

  - 安装[Python 3.8.5](https://www.python.org/downloads/release/python-385/)或更高版本
  - 安装[pip](https://pip.pypa.io/en/stable/installation/)
## 安装

我们建议你从[PyPI](https://pypi.org/project/milvus-cli/)安装Milvus CLI。

### 从PyPI安装

安装Milvus CLI。

```shell
pip install milvus-cli
```
### 从源代码安装

1. 下载安装包。

```shell
git clone https://github.com/milvus-io/milvus_cli.git
```
<div class ="alert note">你也可以从<a href="https://github.com/milvus-io/milvus_cli/releases"> GitHub</a>下载. </div>

2. 进入milvus_cli文件夹。

```shell
cd milvus_cli
```
3. 安装Milvus。

```shell
python -m pip install --editable .
```

