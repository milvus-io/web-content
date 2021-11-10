---
id: install_cli.md
summary: Learn how to install Milvus CLI.
---
# Install Milvus CLI
The current version of Milvus CLI is 0.1.7. To find your installed version and see if you need to update, run ```shell milvus_cli --version```.

## Prerequisites

  - Install [Python 3.8.5](https://www.python.org/downloads/release/python-385/) or later
  - Install [pip](https://pip.pypa.io/en/stable/installation/)
## Install 
You can install Milvus CLI from [PyPI](https://pypi.org/project/milvus-cli/) or source code. We recommend that you install Milvus CLI from PyPI.

### Install from PyPI

Run the following command to install Milvus CLI.
```shell
pip install milvus-cli
```
### Install from source code

1. Run the following command to download a `milvus_cli` repository.

```shell
git clone https://github.com/milvus-io/milvus_cli.git
```

2. Run the following command to enter the `milvus_cli` folder.

```shell
cd milvus_cli
```
3. Run the following command to install Milvus CLI.

```shell
python -m pip install --editable .
```

Alternatively, you can install Milvus CLI from a compressed tarball (`.tar.gz` file). Download a tarball at <a href="https://github.com/milvus-io/milvus_cli/releases"> GitHub</a> and run `python -m pip install milvus_cli-<version>.tar.gz`.