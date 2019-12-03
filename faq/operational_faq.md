---
id: operational_faq
title: Operational FAQ
sidebar_label: Operational FAQ
---

# Operational FAQ


## Why do I fail to compile Milvus from source?

Although the reasons may vary, the most possible cause could be environmental issues, such as incompatible versions, missing dependencies, etc. Refer to [Install Milvus from Source Code](https://github.com/milvus-io/milvus/blob/0.6.0/install.md) for more information.

It is recommended that you use the docker images with the Milvus compilation environment. Refer to [How to build Milvus from source in the Docker container?](#how-to-build-milvus-from-source-in-the-docker-container) to learn how to compile Milvus with the docker images.

## Does Milvus support insert, delete, update, and query operations for vectors?

Currently, Milvus supports only the following operations for vectors:

- Insert
- Query

> Although Milvus does not support directly deleting vectors, you can drop a table for vector deletion.

## Why do Euclidean distance and inner product have inconsistent results in computing vector similarity?

If Euclidean distance and inner product have inconsistent results, you need to check whether the data has been normalized. If not, please normalize your data before computing vector similarity.

It can be theoretically proved that Euclidean distance will not be consistent with inner product for data without normalization. For detailed analysis, please refer to [data normalization](https://github.com/milvus-io/bootcamp/blob/master/EN_docs/data_preparation/data_normalization.md).


## Why does Milvus display "no space left on device" when I import data to Milvus?

You probably did not leave enough disk space for the data to import. For example, to build `FLAT` or `IVFLAT` index for 100 million single-precision vectors, the space needed for importing data is about 200 GB. For `IVF_SQ8` index, the space is about 50 GB.

## Why does this error "Vectors should be 2-dim array" still occur in the Python SDK when the data is a 2-dimensional array?

Even if the data is a 2-dim array, this error can still occur if the data type is integer instead of float. Milvus only support the float data type.

## Why sometimes it takes much longer for queries with smaller datasets?

If the size of a data file is smaller than the value of the `index_build_threshold` parameter in the config file, Milvus will not build indexes for the data file. Thus, it is possible that smaller datasets may need more time for queries. Refer to [Milvus Configuration](../reference/milvus_config.md) for more information.

> Note: `index_build_threshold` was named as `index_file_size` before the 0.6.0 release.

## Why is my Milvus constantly having bad performance?

The reasons may vary, but it is recommended that you check the `cpu_cache_capacity` parameter in the config file to see if all data can be successfully loaded to the memory. Milvus cannot have the best performance before all data is loaded to the memory. Refer to [Milvus Configuration](../reference/milvus_config.md) for more information.

If your parameter settings look correct, check whether other running applications have high memory usage.

## Why is my Milvus constantly having low accuracy?

Check the value of the `nprobe` parameter in the functions when you use an SDK to search vectors in a table. The greater the value, the more precise the result, yet the slower the search speed. Refer to [Learn Milvus Operation](../userguide/milvus_operation.md) for more information.

## Why are my new configurations not working?

You need to restart Milvus docker every time you change the configuration file.

```bash
$ docker restart <container id>
```

## Why is my Python SDK constantly having errors?

Check whether your pymilvus is supported by the installed Milvus. Refer to [https://pypi.org/project/pymilvus](https://pypi.org/project/pymilvus) for a detailed list of supported pymilvus versions.

## How do I know whether Milvus is successfully started?

Use the following command to check the running status of Milvus:

```bash
$ docker logs <container ID>
```


## Why does my multiprocessing program fail? 

In order to successfully run multiprocessing in Milvus, make sure the following conditions are met:

- No client is created in the main process
- Clients are created in each child process

The following example shows a correct way to implement multiprocessing. When there is a table named `TABLE_NAME` which already includes `vector_1`, you can invoke this function in the main process to run two insert processes and one search process concurrently to get the correct result. It should be noted that the search result is irrelevant to the vectors that are being inserted.

```python
def test_add_vector_search_multiprocessing():
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
 	'''
    nq = 1000
    vectors_1 = gen_vec_list(nq)
    vectors_2 = gen_vec_list(nq)

 	def add_vectors_search(idx):
        if idx == 0:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_1)
            print("add", i, "finished")
            assert status.OK()
        elif idx == 1:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status, result = MILVUS.search_vectors(TABLE_NAME, 1, NPROBE, [vectors_1[0]])
            print(result)
            assert status.OK()
            assert len(result) == 1
  		else:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_2)
            print("add", i, "finished")
            assert status.OK()

    process_num = 3
 	processes = []
    for i in range(process_num):
        p = mp.Process(target=add_vectors_search, args=(i,))
        processes.append(p)
        p.start()
        print("process", i)
    for p in processes:
        p.join()
```

If a client already exists in the main process, enabling multiprocessing will cause the client to hang, which will eventually lead to timeout. The following function is a bad example, in which the `connect` is the client built in the main process.

```python
def test_add_vector_search_multiprocessing(self, connect, table):
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
	'''
    nq = 5
    vectors_1 = gen_vectors(nq, dim)
    vectors_2 = gen_vectors(nq, dim)

    status, ids = connect.add_vectors(table, vectors_1)
    time.sleep(3)

    status, count = connect.get_table_row_count(table)
    assert count == 5

  	def add_vectors_search(connect, idx):
        if (idx % 2) == 0:
            status, ids = connect.add_vectors(table, vectors_2)
            assert status.OK()
        else:
            status, result = connect.search_vectors(table, 1, [vectors_1[0]])
            assert status.OK()
            assert len(result) == 1

    process_num = 3
    processes = []
    for i in range(process_num):
        p = Process(target=add_vectors_search, args=(connect, i))
        processes.append(p)
        p.start()
    for p in processes:
        p.join()
```

## Why are the search results fewer than K when I try to search the top K vectors?

In all the indexing types that Milvus supports, `IVFLAT` and `IVF_SQ8` are cell-probe methods that employ a partitioning technique called k-means. The feature space is partitioned into `nlist` cells, and vectors are assigned to one of these cells (to the centroid closest to the query), and stored in an inverted file structure formed of `nlist` inverted lists. When query occurs, only a set of `nprobe` inverted lists are selected.

If the `nlist` and K is relatively large, and `nprobe` is small enough, it happens that the vectors in `nprobe` lists are even fewer than K. Thus, when you search the top K vectors, the results would be fewer than K.

In order to avoid this situation, you can try increasing the value of `nprobe`, or smaller `nlist` and K.

## How to build Milvus from source in the Docker container?

As Milvus is mainly developed under the Ubuntu environment, the recommended compilation environment is Ubuntu 18.04 or higher. If your developing environment is not Ubuntu 18.04, you can also build Milvus from source code in the docker container. We provide two docker images that provide the build environment needed for the Milvus CPU-only and GPU supported versions.

Use these two docker images to compile Milvus as follows:

**Step 1 Pull the image**

Docker image of CPU-only build environment:

```bash
$ Docker pull milvusdb/milvus-cpu-build-env:v0.6.0-ubuntu18.04
```

Docker image of GPU build environment:

```bash
$ Docker pull milvusdb/milvus-gpu-build-env:v0.6.0-ubuntu18.04
```

![docker_image](https://raw.githubusercontent.com/milvus-io/www.milvus.io/master/website/blog/assets/docker_compile/docker_image.png)

> Note: If you want to the docker image of GPU build environment, you must [install nvidia-docker] (https://github.com/NVIDIA/nvidia-docker/) first.

**Step 2 Start the container**

Start a CPU-only container:

```bash
$ Docker run -it -p 19530:19530 -d milvusdb/milvus-cpu-build-env:v0.6.0-ubuntu18.04
```

Start a GPU container:

```bash
$ Docker run --runtime=nvidia -it -p 19530:19530 -d milvusdb/milvus-gpu-build-env:v0.6.0-ubuntu18.04
```

![docker_run](https://raw.githubusercontent.com/milvus-io/www.milvus.io/master/website/blog/assets/docker_compile/docker_run_gpu.png)

When the new container is created, the container id (such as the `d4adxxxxx` above) will be created and automatically displayed.

To enter this container:

```bash
$ Docker exec -it [container_id] bash
```

Replace `container_id` with `d4adxxxxx` in the previous command.

![docker_exec](https://raw.githubusercontent.com/milvus-io/www.milvus.io/master/website/blog/assets/docker_compile/docker_exec.png)

**Step 3 Download Milvus source code and compile it in the container**

First enter a directory where you can write code, such as the home directory:

```bash
$ cd /home
```

Download the source code of the current version 0.6.0:

```bash
$ wget https://github.com/milvus-io/milvus/archive/0.6.0.zip
```

Update apt-get and install a decompression tool:

```bash
$ Apt-get update
$ Apt-get install unzip
```

Unzip the source package:

```bash
$ Unzip ./0.6.0.zip
```

The source code is extracted into a folder called `milvus-0.6.0`. To enter its core directory:

```bash
$ cd ./milvus-0.6.0/core
```

If you are using a CPU image, compile it like this:

```bash
$ ./build.sh -t Release
```

If you are using a GPU image, you need to add a `-g` parameter:

```bash
$ ./build.sh -g -t Release
```

The parameter `-t Release` means to compile the Release version. If you want to debug, you can also compile the Debug version.

When it is done, start the compiled Milvus server:

```bash
$ ./start_server.sh
```

![server_start](https://raw.githubusercontent.com/milvus-io/www.milvus.io/master/website/blog/assets/docker_compile/server_start.png)

This `start_server.sh` specifies `server_config.yaml` and `log_config.conf` in the `core/conf` directory to start Milvus as a configuration.

The Milvus data storage path is specified by the `primary_path` parameter in the `server_config.yaml` file. The default path is `tmp/milvus`.

If you want to view Milvus log files, go to directory `/tmp/milvus/logs`.

**Step 4 Connect to Milvus using Python**

Before writing the script, make sure pymilvus is installed:

```bash
$ pip3 install pymilvus==0.2.5
```

> Note: There is a table listing compatible Milvus and pymilvus versions in pymilvus README file.

If the Python environment is fine, you can start writing your test script, for example, a script in PyCharm to create a table in Milvus. When the execution is completed, you can see the success message returned:

![connect_py](https://raw.githubusercontent.com/milvus-io/www.milvus.io/master/website/blog/assets/docker_compile/connect_py.png)

## Related links

[Product FAQ](product_faq.md)
