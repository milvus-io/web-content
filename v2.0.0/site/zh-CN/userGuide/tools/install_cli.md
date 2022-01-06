---
id: install_cli.md
summary: Learn how to install Milvus_CLI.
---

# 如何安装 Milvus_CLI

Milvus_CLI 的当前版本是 0.1.9。
如果想查找已安装的版本，并查看是否需要更新，请运行 `milvus_cli --version` 命令。

## 先决条件

- 安装 [Python 3.8.5](https://www.python.org/downloads/release/python-385/) 或更高版本
- 安装 [pip](https://pip.pypa.io/en/stable/installation/)

## 安装

我们建议你从 [PyPI](https://pypi.org/project/milvus-cli/) 安装 Milvus_CLI。

### 从 PyPI 安装

安装 Milvus_CLI。

```shell
pip install milvus-cli
```

### 从源代码安装

1. 下载 `milvus_cli` 仓库到本地。

```shell
git clone https://github.com/zilliztech/milvus_cli.git
```

2. 进入 `milvus_cli` 文件夹。

```shell
cd milvus_cli
```

3. 安装 Milvus。

```shell
python -m pip install --editable .
```

你也可以从<a href="https://github.com/zilliztech/milvus_cli/releases">这里</a>下载包含源代码的 tarball 压缩文件并运行如下命令来安装 Milvus_CLI。

```shell
python -m pip install milvus_cli-<version>.tar.gz
```
