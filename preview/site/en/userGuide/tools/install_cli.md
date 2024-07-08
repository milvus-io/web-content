---
id: install_cli.md
summary: Learn how to install Milvus_CLI.
title: Install Milvus_CLI
---

# Install Milvus_CLI

This topic describes how to install Milvus_CLI.


## Install from PyPI

You can install Milvus_CLI from [PyPI](https://pypi.org/project/milvus-cli/).

### Prerequisites

- Install [Python 3.8.5](https://www.python.org/downloads/release/python-385/) or later
- Install [pip](https://pip.pypa.io/en/stable/installation/)

### Install via pip

Run the following command to install Milvus_CLI.

```shell
pip install milvus-cli
```

## Install with Docker

You can instal Milvus_CLI with docker.

### Prerequisites

Docker 19.03 or later is required.

### Install based on Docker image

```shell
$ docker run -it zilliz/milvus_cli:latest
```


## Install from source code

1. Run the following command to download a `milvus_cli` repository.

```shell
git clone https://github.com/zilliztech/milvus_cli.git
```

2. Run the following command to enter the `milvus_cli` folder.

```shell
cd milvus_cli
```

3. Run the following command to install Milvus_CLI.

```shell
python -m pip install --editable .
```

Alternatively, you can install Milvus_CLI from a compressed tarball (`.tar.gz` file). Download a [tarball](https://github.com/zilliztech/milvus_cli/releases) and run `python -m pip install milvus_cli-<version>.tar.gz`.

### Install from an .exe file

<div class="alert note"> This installation method only applies to Windows. </div>

Download an .exe file from [GitHub](https://github.com/zilliztech/milvus_cli/releases) and run it to install Milvus_CLI.
If successful, `milvus_cli-<version>.exe` pops up as shown in the following figure.

![Milvus_CLI](../../../../assets/milvus_cli_exe.png "Successful installation of Milvus_CLI.")
