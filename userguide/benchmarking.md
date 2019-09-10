---
id: benchmarking
title: Performance Benchmarking
sidebar_label: Performance Benchmarking
---

# Performance Benchmarking

This page walks you through the performance benchmarking on Milvus. It measures Total Query Time (`total_time`) and Query Time per Vector (`avg_time`) on two datasets:

- 1 million vectors of 512 dimension (a total data size of  GB)
- 100 million vectors of 512 dimension (a total data size of  GB)

## Benchmark 1 million vectors

### Hardware requirements

| Component  | Minimum Config                  |
| ---------- | ------------------------------- |
| OS         | Ubuntu LTS 18.04                |
| CPU        | Intel Core i5-8250U             |
| GPU        | Nvidia GeForce MX150, 2GB GDDR5 |
| GPU Driver | CUDA 10.1, Driver 418.74        |
| Memory     | 8 GB DDR4                       |
| Storage    | NVMe SSD 256 GB                 |

### Data sets 

Create a file named `milvlus_sift1m`. Then download the following data and scripts, and save them to the file.

- [One million base vectors](https://pan.baidu.com/s/1nVIIxO8MnOle339iYs2dUw)
- [10,000 query vectors](https://pan.baidu.com/s/1mBRM1cJZ6QWehDuddOYl4A)
- [Search ground truth](https://pan.baidu.com/s/1-95nJvW3vx2Cq9wqBWOFaA)
- [Test scripts](https://github.com/jielinxu/bootcamp/blob/master/bootcamp/scripts)

### Milvus settings

Configuration file: `/home/$USER/milvus/conf/server_config.yaml`

| Parameter                  | Recommended value |
| -------------------------- | ----------------- |
| `index_building_threshold` | 64                |
| `cpu_cache_capacity`       | 4                 |
| `use_blas_threshold`       | 801               |
| `nprobe`                   | 32                |

After the parameter configuration, restart Milvus Docker apply them.

```shell
$ docker restart <container id>
```

### Step 1: Start Milvus server

```shell
# start Milvus
$ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.1
```

### Step 2: Import data for the benchmarks

Before the data import, make sure the files `bvecs_data` and `milvus_bootcamp.py` are both placed under the directory `milvus_sift1m`.

Go to `milvus_sift1m`, and run the following command:

```
$ python3 milvus_bootcamp.py --table=ann_1m_sq8 --index=ivfsq8 -t
```

You will see vectors inserted into a table named `ann_1m_sq8`, with the index_type of `IVF_SQ8`.

[![1m_import](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/1m_import.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/1m_import.png)

### Step 3: Run the benchmark

To benchmark search performance, go to directory `milvus_sift1m`, and run the following script:

```
$ python3 milvus_bootcamp.py --table=ann_1m_sq8 -s
```

### Step 4: Analyze the results

Once the `milvus_bootcamp.py` has finished running, you will see the results in the file `xxx_results.csv` ('xxx' represents the execution time) in `performance_results`. Below is a partial display of the results:

[![1m_per_10_20](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/1m_per_10_20.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/1m_per_10_20.png)

- `nq` - the number of query vectors
- `topk` - the top k most similar vectors for the query vectors
- `total_time` - the total query elapsed time (in seconds)
- `avg_time` - the average time to query one vector (in seconds)

## Benchmark 100 million vectors

### Hardware requirements

| Component  | Minimum Config                     |
| ---------- | ---------------------------------- |
| OS         | Ubuntu LTS 18.04                   |
| CPU        | Intel Core i7-7700K                |
| GPU        | Nvidia GeForce GTX 1050, 4GB GDDR5 |
| GPU Driver | CUDA 10.1, Driver 418.74           |
| Memory     | 16 GB DDR4 ( 2400 Mhz ) x 2        |
| Storage    | SATA 3.0 SSD 256 GB                |

### Data sets

Create a file named `milvlus_sift100m`. Then download the following data and scripts, and save them to the file.

- [100 million base vectors](https://pan.baidu.com/s/1N5jGKHYTGchye3qR31aNnA)

  Download the dataset and extract the data to `milvus_sift100M/bvecs_data/`. When the extraction is completed, there will be 1000 NPY files, each containing 100,000 vectors, in file `bvecs_data`.

- [10,000 query vectors](https://pan.baidu.com/s/1l9_lDItU2dPBPIYZ7oV0NQ)

- [Search ground truth](https://pan.baidu.com/s/15dPvxxrfslairyUEBJgk-g)

- [Test scripts](https://github.com/jielinxu/bootcamp/blob/master/bootcamp/scripts)

### Milvus settings

Configuration file: `/home/$USER/milvus/conf/server_config.yaml`

| Parameter                  | Recommended value |
| -------------------------- | ----------------- |
| `index_building_threshold` | 1024              |
| `cpu_cache_capacity`       | 25                |
| `use_blas_threshold`       | 801               |
| `nprobe`                   | 32                |

After the parameter configuration, restart Milvus Docker apply them.

```shell
$ docker restart <container id>
```

### Step 1: Start Milvus server

```shell
# start Milvus
$ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.1
```

### Step 2: Import data for the benchmarks

Before the data import, make sure the files `bvecs_data` and `milvus_bootcamp.py` are both placed under the directory `milvus_sift100m`.

Go to `milvus_sift100m`, and run the following command:

```
$ python3 milvus_bootcamp.py --table=ann_100m_sq8 --index=ivfsq8 -t
```

You will see vectors inserted into a table named `ann_100m_sq8`, with the index_type of `IVF_SQ8`.

[![100m_import](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/100m_import.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/100m_import.png)

### Step 3: Run the benchmark

To benchmark search performance, go to directory `milvus_sift100m`, and run the following script:

```
$ python3 milvus_bootcamp.py --table=ann_100m_sq8 -s
```

### Step 4: Analyze the results

Once the `milvus_bootcamp.py` has finished running, you will see the results in the file `xxx_results.csv` (`xxx` represents the execution time) in `performance_results`. Below is a partial display of the results:

[![100m_per](https://github.com/jielinxu/bootcamp/raw/master/EN_docs/labs/pic/100m_per.png)](https://github.com/jielinxu/bootcamp/blob/master/EN_docs/labs/pic/100m_per.png)

- `nq` - the number of query vectors
- `topk` - the top k most similar vectors for the query vectors
- `total_time` - the total query elapsed time (in seconds)
- `avg_time` - the average time to query one vector (in seconds)

## Related links

- [Milvus Configuration]
- [Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
