---
id: milvusdm.md
---

# Milvus 数据迁移工具 -- MilvusDM

## 简介

[MilvusDM](https://github.com/milvus-io/milvus-tools) 是一款针对 Milvus 研发的数据迁移工具，支持 Milvus 数据传输以及数据文件的导入与导出：

- [Faiss to Milvus](#faiss-to-milvus)：将未压缩的 Faiss 文件导入 Milvus

- [HDF5 to Milvus](#hdf5-to-milvus)：将 HDF5 格式的文件导入 Milvus

- [Milvus to Milvus](#milvus-to-milvus)：支持 Milvus 之间的数据迁移

- [Milvus to HDF5](#milvus-to-hdf5)：将 Milvus 数据批量备份为 HDF5 格式的本地文件

开发者使用 MilvusDM 可以提升数据管理效率，降低运维成本。

![milvusdm blog 1.png](https://zillizstorage.blob.core.windows.net/zilliz-assets/zilliz-assets/assets/milvusdm_blog_1_199cbdebe7.png)

## 功能介绍
在之前发布的文章[《Milvus 迁移升级攻略》](https://zilliz.blog.csdn.net/article/details/108525869)中，我们介绍了如何将 Milvus 数据从有网环境迁移到无网环境以及不同版本 Milvus 之间的数据迁移。数据迁移工具 MilvusDM 可以通过指定 Milvus 中的集合或分区，帮助用户更智能地迁移所需数据。MilvusDM 十分易于使用，只需要运行一句 ```pip3 install pymilvusdm``` 指令即可快速安装。此外，您还可在 [github](https://github.com/milvus-io/milvus-tools) 上获取本项目的开源代码。本文将介绍 MilvusDM 工具的使用方法：

### Faiss to Milvus

- 使用示例

    1.下载 **yaml** 文件

    ```
    $ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
    ```
    2.配置参数
    
    通过指定文件路径 ```data_path``` 读取 Faiss 的数据，并将读取到的向量和 ids 导入 Milvus 中。导入时需要指定参数 ```dest_host```、```dest_port```、```mode```、```dest_collection_name```、```dest_partition_name``` 和 ```collection_parameter```。

    ```
    F2M:
  milvus_version: 0.10.5
  data_path: '/home/data/faiss.index'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'append'
  dest_collection_name: 'test'
  dest_partition_name: ''
  collection_parameter:
    dimension: 256
    index_file_size: 1024
    metric_type: 'L2'
    ```

    3.运行

    ```
    $ milvusdm --yaml F2M.yaml
    ```

- 具体实现

    读取 Faiss 的文件，返回特征向量和对应的 ids 并导入 Milvus。

```
ids, vectors = faiss_data.read_faiss_data()
insert_milvus.insert_data(vectors, self.dest_collection_name, self.collection_parameter, self.mode, ids, self.dest_partition_name)
```
### HDF5 to Milvus
- 使用示例

    1.下载 **yaml** 文件

    ```
    $ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/H2M.yaml
    ```
    2. 配置参数

    通过指定 ```data_path``` 或 ```data_dir``` 读取 HDF5 格式的数据并导入 Milvus 中。导入时需要指定参数 ```dest_host```、```dest_port```、```mode```、```dest_collection_name```、```dest_partition_name``` 和 ```collection_parameter```。
    
    > ```data_path``` 参数可指定多个文件路径，```data_dir``` 参数指定文件目录。两个参数只能配置一个。

    ```
    H2M:
  milvus-version: 0.10.5
  data_path:
    - /Users/zilliz/float_1.h5
    - /Users/zilliz/float_2.h5
  data_dir:
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'overwrite'        # 'skip/append/overwrite'
  dest_collection_name: 'test_float'
  dest_partition_name: 'partition_1'
  collection_parameter:
    dimension: 128
    index_file_size: 1024
    metric_type: 'L2'
    ```
    3. 运行

    ```
    $ milvusdm --yaml H2M.yaml
    ```
- 具体实现

    读取 HDF5 格式的文件，返回特征向量和对应的 ids 并导入 Milvus。

    ```
    embeddings, ids = self.file.read_hdf5_data()
    ids = insert_milvus.insert_data(embeddings, self.c_name, self.c_param, self.mode, ids,self.p_name)
    ```
### Milvus to Milvus

- Improve使用示例

    1.下载 yaml 文件

    ```
    $ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml
    ```
    2.配置参数

    通过指定 ```source_milvus_path```、```mysql_parameter``` 和 ```source_collection```读取源 Milvus 的向量和 ids 数据并导入 Milvus 中。导入时需要指定参数 ```dest_host```、```dest_port``` 和 ```mode```。

    > 如果源 Milvus 没有使用 MySQL 进行元数据管理， ```mysql_parameter``` 参数则为空。

    ```
    M2M:
  milvus_version: 0.10.5
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection:
    test:
      - 'partition_1'
      - 'partition_2'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'skip' # 'skip/append/overwrite'
  ```

  3. 运行
    
    ```
    $ milvusdm --yaml M2M.yaml
    ```
- 具体实现

    读取指定集合或分区的 meta 信息，根据 meta 信息读取本地 **milvus/db** 下的数据文件，返回特征向量和对应的 ids 并导入 Milvus。

    ```
    collection_parameter, _ = milvus_meta.get_collection_info(collection_name)
    r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag)
    milvus_insert.insert_data(r_vectors, collection_name, collection_parameter, self.mode, r_ids, partition_tag)
    ```

### Milvus to HDF5

- 使用示例

    1.下载 yaml 文件

    ```
    $ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2H.yaml
    ```

    2.修改参数

    通过指定 ```source_milvus_path```、```mysql_parameter``` 和 ```source_collection```读取源 Milvus 的数据，将 HDF5 格式的向量和 ids 保存在 ```data_dir``` 路径下。

    ```
    M2H:
  milvus_version: 0.10.5
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection: # specify the 'partition_1' and 'partition_2' partitions of the 'test' collection.
    test:
      - 'partition_1'
      - 'partition_2'
  data_dir: '/home/user/data'
  ```
  3.运行

  ```
  $ milvusdm --yaml M2H.yaml
  ```
- 具体实现

    读取指定集合或分区的 meta 信息，根据 meta 信息读取本地 **milvus/db** 下的数据文件，返回特征向量和对应的 ids 并存入本地的 HDF5 文件中。

    ```
    collection_parameter, version = milvus_meta.get_collection_info(collection_name)
    r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag)
    data_save.save_yaml(collection_name, partition_tag, collection_parameter, version, save_hdf5_name)
    ```
## MilvusDM 代码结构

我们十分欢迎大家为开源项目 MilvusDM 贡献代码。你可以通过代码文件结构了解 MilvusDM 工具的设计构思。如有新的数据迁移需求，你还可以通过修改源码，为社区贡献代码。

> MilvusDM 项目地址：milvus-io/milvus-tools 

> 欢迎贡献代码👏，也请给本项目点 star 🌟

使用 MilvusDM 时会根据传入的 yaml 文件执行对应的任务，如下图所示：

![milvusdm blog 2.png](https://zillizstorage.blob.core.windows.net/zilliz-assets/zilliz-assets/assets/milvusdm_blog_2_7824b16e5e.png)

- pymilvusdm

    - core

        - **milvus_client.py**，Milvus 客户端相关的操作

        - **read_data.py**，读取本地 HDF5 格式的数据文件（如果有读取其他文件格式的需求，可在此处添加代码）

        - **read_faiss_data.py**，读取 Faiss 的数据文件

        - **read_milvus_data.py**，读取 Milvus 的数据文件

        - **read_milvus_meta.py**，读取 Milvus 的 meta 信息

        - **data_to_milvus.py**，根据 yaml 文件配置参数，建立集合或分区，并将向量和 ids 导入 Milvus

        - **save_data.py**，将读取到的数据保存为 HDF5 格式的文件

        - **write_logs.py**，在执行操作时写 debug/info/error 日志

    - **faiss_to_milvus.py**，实现将 Faiss 文件数据导入 Milvus

    - **hdf5_to_milvus.py**，实现将 HDF5 格式的文件数据导入 Milvus

    - **milvus_to_milvus.py**，实现将 Milvus 的数据拷贝到另一个 Milvus

    - **milvus_to_hdf5.py**，实现将 Milvus 的数据导出为 HDF5 格式的文件

    - **main.py**，根据 yaml 文件执行相关任务

    - **setting.py**，执行代码时的相关配置参数

- **setup.py**，将 pymilvusdm 打包并上传到 pypi

## 写在最后
本文介绍了 MilvusDM 工具的使用方法和开源代码。MilvusDM 主要支持以下四个功能：Faiss to Milvus、HDF5 to Milvus、Milvus to Milvus、Milvus to HDF5。如果有任何问题和建议，欢迎给本项目提 [issue](https://github.com/milvus-io/milvus-tools/issues) 或贡献代码。我们计划在下个版本中添加以下功能：

- 支持将 Faiss 的 binary 数据文件导入 Milvus

- Milvus to Milvus 时支持指定黑白名单

- Milvus to Milvus 时支持将多个集合或分区的数据合并导入至一个集合中

- 支持 Milvus 数据备份和数据恢复

如果你对本项目感兴趣的话欢迎加入我们。




