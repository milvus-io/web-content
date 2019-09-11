---
id: benchmarking
title: Performance Benchmarking
sidebar_label: Performance Benchmarking
---

# 性能评估

该页面向您展示如何针对Milvus进行性能测试，评估指标为总查询时间（`total_time`）和单条向量查询时间（`avg_time`）。下文展示的测试针对以下数据集进行：

- 1百万条512维向量（总大小：GB） 
- 1亿条512维向量（总大小：GB）

## 百万向量检索

### 硬件要求

| Component  | Minimum Config                  |
| ---------- | ------------------------------- |
| OS         | Ubuntu LTS 18.04                |
| CPU        | Intel Core i5-8250U             |
| GPU        | Nvidia GeForce MX150, 2GB GDDR5 |
| GPU Driver | CUDA 10.1, Driver 418.74        |
| Memory     | 8 GB DDR4                       |
| Storage    | NVMe SSD 256 GB                 |

### 相关数据集

创建名为 `milvlus_sift1m` 的文件夹，然后下载以下数据集和测试脚本到该文件夹。

- [1百万测试向量数据集](https://pan.baidu.com/s/1nVIIxO8MnOle339iYs2dUw)
- [1万条查询向量](https://pan.baidu.com/s/1mBRM1cJZ6QWehDuddOYl4A)
- [搜索结果对照](https://pan.baidu.com/s/1-95nJvW3vx2Cq9wqBWOFaA)
- [测试脚本](https://github.com/jielinxu/bootcamp/blob/master/bootcamp/scripts)

### Milvus 参数配置

配置文件：`/home/$USER/milvus/conf/server_config.yaml`

| 参数                       | 推荐值 |
| -------------------------- | ------ |
| `index_building_threshold` | 64     |
| `cpu_cache_capacity`       | 4      |
| `use_blas_threshold`       | 801    |
| `nprobe`                   | 32     |

配置文件参数编辑完毕后，重启 Milvus Docker 使配置生效。

```shell
$ docker restart <container id>
```

### 第1步：启动 Milvus 服务

```shell
# start Milvus
$ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.1
```

### 第2步：导入测试数据

导入数据之前，首先确保 `bvecs_data` 文件夹与测试脚本 `milvus_bootcamp.py` 都放在 `milvus_sift1m` 目录下

进入 `milvus_sift1m` 目录，运行如下脚本：

```
$ python3 milvus_bootcamp.py --table=ann_1m_sq8 --index=ivfsq8 -t
```

脚本会创建一张名为 `ann_1m_sq8` 的表，它采用的索引类型为 `ivfsq8` ，数据将导入该表：

[![1m_import](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/1m_import.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/1m_import.png)

### 第3步：性能测试

为评估 Milvus 的查询性能，进入 `milvus_sift1m` 目录，运行如下脚本：

```
$ python3 milvus_bootcamp.py --table=ann_1m_sq8 -s
```

### 第4步：分析结果

运行结束后，将会生成一个名为 `performance_results` 的文件夹，在该文件夹下会有一个名为 `xxx_results.csv` 的文件，`xxx` 代表执行命令的时间。文件内容如下图所示（未完全展示）：

[![1m_per_10_20](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/1m_per_10_20.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/1m_per_10_20.png)

- `nq` - 要查询的向量条数
- `topk` - 查询某个向量的前 k 个相似的向量
- `total_time` - 查询 nq 个向量的前 k 个相似向量一共花费的时间，单位：秒
- `avg_time` - 查询一个向量的 topk 个相似向量的平均时间，单位：秒

## 亿级向量检索

### 硬件要求

| Component  | Minimum Config                     |
| ---------- | ---------------------------------- |
| OS         | Ubuntu LTS 18.04                   |
| CPU        | Intel Core i7-7700K                |
| GPU        | Nvidia GeForce GTX 1050, 4GB GDDR5 |
| GPU Driver | CUDA 10.1, Driver 418.74           |
| Memory     | 16 GB DDR4 ( 2400 Mhz ) x 2        |
| Storage    | SATA 3.0 SSD 256 GB                |

### 相关数据集

创建名为 `milvlus_sift100m` 的文件夹，然后下载以下数据集和测试脚本到该文件夹。

- [100 million base vectors](https://pan.baidu.com/s/1N5jGKHYTGchye3qR31aNnA)

  将数据文件都解压到 `milvus_sift100M/bvecs_data/` 文件夹下。解压完成后 `milvus_sift100M/bvecs_data/` 文件夹里将会有 1,000 个 npy 文件，每个 npy 文件中存放 10 万条向量数据，共 1 亿条。

- [10,000 query vectors](https://pan.baidu.com/s/1l9_lDItU2dPBPIYZ7oV0NQ)

- [Search ground truth](https://pan.baidu.com/s/15dPvxxrfslairyUEBJgk-g)

- [Test scripts](https://github.com/jielinxu/bootcamp/blob/master/bootcamp/scripts)

### Milvus 参数配置

配置文件：`/home/$USER/milvus/conf/server_config.yaml`

| 参数                       | 推荐值 |
| -------------------------- | ------ |
| `index_building_threshold` | 1024   |
| `cpu_cache_capacity`       | 25     |
| `use_blas_threshold`       | 801    |
| `nprobe`                   | 32     |

配置文件参数编辑完毕后，重启 Milvus Docker 使配置生效。

```shell
$ docker restart <container id>
```

### 第1步：启动 Milvus 服务

```shell
# start Milvus
$ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.1
```

### 第2步：导入测试数据

导入数据之前，首先确保 `bvecs_data` 文件夹与测试脚本 `milvus_bootcamp.py` 都放在 `milvus_sift100m` 目录下。

进入 `milvus_sift100m` 目录，运行如下脚本：

```
$ python3 milvus_bootcamp.py --table=ann_100m_sq8 --index=ivfsq8 -t
```

脚本会创建一张名为 `ann_1m00_sq8` 的表，它采用的索引类型为 `ivfsq8`，数据将导入该表：

[![100m_import](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/100m_import.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/100m_import.png)

### 第3步：性能测试

为评估 Milvus 的查询性能，进入 `milvus_sift100m` 目录，运行如下脚本：

```
$ python3 milvus_bootcamp.py --table=ann_100m_sq8 -s
```

### 第4步：分析结果

运行结束后，将会生成一个名为 `performance_results` 的文件夹，在该文件夹下会有一个名为 `xxx_results.csv` 的文件，`xxx` 代表执行命令的时间。文件内容如下图所示（未完全展示）：

[![100m_per](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/100m_per.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/100m_per.png)

- `nq` - 要查询的向量条数
- `topk` - 查询某个向量的前 k 个相似的向量
- `total_time` - 查询 nq 个向量的前 k 个相似向量一共花费的时间，单位：秒
- `avg_time` - 查询一个向量的 topk 个相似向量的平均时间，单位：秒

## 相关阅读

[Milvus 配置]
