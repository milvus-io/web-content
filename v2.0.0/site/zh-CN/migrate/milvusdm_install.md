---
id: milvusdm_install.md
summary: 了解如何安装 MilvusDM 进行数据迁移。
---

# 安装 MilvusDM

MilvusDM 是一款针对 Milvus 研发的开源数据迁移工具，支持 Milvus 数据传输以及数据文件的导入与导出。本文将介绍如何安装 MilvusDM。

<div class="alert note">
  pymilvusdm2.0 可用于将数据从 <b>Milvus(0.10.x or 1.x) 版本</b> 迁移到 <b>Milvus2.x 版本</b>。
</div>

## 安装前提

在安装 MilvusDM 之前请确保你的操作系统和软件符合以下要求。


| 操作系统 | 版本 |
| ---------------  |  ----------------- |
| CentOS           | 7.5 或以上版本      |
| Ubuntu LTS       | 18.04 或以上版本    |


| 软件                     | 版本                        |
|  --------------------------- |  ----------------------------- |
| [Milvus](https://milvus.io/) | 0.10.x or 1.x or 2.x                          |
| Python3                      | 3.7 或以上版本                  |
| pip3                         | 和 Python 版本对应. |

## 安装 MilvusDM

1. 将如下内容添加到 **~/.bashrc** :

```bash
export MILVUSDM_PATH='/home/$user/milvusdm'
export LOGS_NUM=0
```

- `MILVUSDM_PATH`： 该变量定义了 MilvusDM 工作目录，用于保存 MilvusDM 生成的日志和数据。该变量的值默认为 `/home/$user/milvusdm`。

- `LOGS_NUM`： MilvusDM 每日生成一个日志文件。使用该变量定义需要保存的日志文件数量。该变量的默认值为 0，所有日志都会保存。


2. 配置环境变量：

```shell
$ source ~/.bashrc
```

3. 使用 `pip` 安装 MilvusDM:

```shell
$ pip3 install pymilvusdm==2.0
```


