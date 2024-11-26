---
id: index-with-gpu.md
order: 3
summary: This guide explains how to build an index with GPU support in Milvus to enhance search performance.
title: Index with GPU
---

# Index with GPU

This guide outlines the steps to build an index with GPU support in Milvus, which can significantly improve search performance in high-throughput and high-recall scenarios. For details on the types of GPU indexes supported by Milvus, refer to [GPU Index](gpu_index.md).

## Configure Milvus settings for GPU memory control

Milvus uses a global graphics memory pool to allocate GPU memory.

It supports two parameters `initMemSize` and `maxMemSize` in [Milvus config file](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769). The pool size is initially set to `initMemSize`, and will be automatically expanded to `maxMemSize` after exceeding this limit.

The default `initMemSize` is 1/2 of the available GPU memory when Milvus starts, and the default `maxMemSize` is equal to all available GPU memory.

Up until Milvus 2.4.1( including version 2.4.1), Milvus used a unified GPU memory pool. For versions prior to 2.4.1( including version 2.4.1), it was recommended to set both of the value to 0. 

```yaml
gpu:
  initMemSize: 0 #set the initial memory pool size.
  maxMemSize: 0 #maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. 
```

From Milvus 2.4.1 onwards, the GPU memory pool is only used for temporary GPU data during searches. Therefore, it is recommended to set it to 2048 and 4096.

```yaml
gpu:
  initMemSize: 2048 #set the initial memory pool size.
  maxMemSize: 4096 #maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. 
```

## Build an index

The following examples demonstrate how to build GPU indexes of different types.

### Prepare index parameters

When setting up GPU index parameters, define __index_type__, __metric_type__, and __params__:

- __index_type__ (_string_): The type of index used to accelerate vector search. Valid options include __GPU_CAGRA__, __GPU_IVF_FLAT__, __GPU_IVF_PQ__, and __GPU_BRUTE_FORCE__.

- __metric_type__ (_string_): The type of metrics used to measure the similarity of vectors. Valid options are __IP__ and __L2__.

- __params__(_dict_): The index-specific building parameters. The valid options for this parameter depend on the index type.

Here are example configurations for different index types:

- __GPU_CAGRA__ index

    ```python
    index_params = {
        "metric_type": "L2",
        "index_type": "GPU_CAGRA",
        "params": {
            'intermediate_graph_degree': 64,
            'graph_degree': 32
        }
    }
    ```

    Possible options for __params__ include:

    - __intermediate_graph_degree__ (_int_): Affects recall and build time by determining the graph's degree before pruning. Recommended values are __32__ or __64__.

    - __graph_degree__ (_int_): Affects search performance and recall by setting the graph's degree after pruning. Typically, it is half of the __intermediate_graph_degree__. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of __intermediate_graph_degree__.

    - __build_algo__ (_string_): Selects the graph generation algorithm before pruning. Possible options: 

        - __IVF_PQ__: Offers higher quality but slower build time.

        - __NN_DESCENT__: Provides a quicker build with potentially lower recall.

    - __cache_dataset_on_device__ (_string_, __"true"__ | __"false"__): Decides whether to cache the original dataset in GPU memory. Setting this to __"true"__ enhances recall by refining search results, while setting it to __"false"__ conserves GPU memory.

- __GPU_IVF_FLAT__ or __GPU_IVF_PQ__ index

    ```python
    index_params = {
        "metric_type": "L2",
        "index_type": "GPU_IVF_FLAT", # Or GPU_IVF_PQ
        "params": {
            "nlist": 1024
        }
    }
    ```

    The __params__ options are identical to those used in __[IVF_FLAT](https://milvus.io/docs/index.md#IVF_FLAT)__ and __[IVF_PQ](https://milvus.io/docs/index.md#IVF_PQ)__.

- __GPU_BRUTE_FORCE__ index

    ```python
    index_params = {
        'index_type': 'GPU_BRUTE_FORCE',
        'metric_type': 'L2',
        'params': {}
    }
    ```

    No additional __params__ configurations are required.

### Build index

After configuring the index parameters in __index_params__, call the [`create_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md) method to build the index.

```python
# Get an existing collection
collection = Collection("YOUR_COLLECTION_NAME")

collection.create_index(
    field_name="vector", # Name of the vector field on which an index is built
    index_params=index_params
)
```

## Search

Once you have built your GPU index, the next step is to prepare the search parameters before conducting a search.

### Prepare search parameters

Below are example configurations for different index types:

- __GPU_BRUTE_FORCE__ index

    ```python
    search_params = {
        "metric_type": "L2",
        "params": {}
    }
    ```

    No additional __params__ configurations are required.

- __GPU_CAGRA__ index

    ```python
    search_params = {
        "metric_type": "L2",
        "params": {
            "itopk_size": 128,
            "search_width": 4,
            "min_iterations": 0,
            "max_iterations": 0,
            "team_size": 0
        }
    }
    ```

    Key search parameters include:

    - __itopk_size__: Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (__limit__) value and is typically a power of 2 (e.g., 16, 32, 64, 128).

    - __search_width__: Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance.

    - __min_iterations__ / __max_iterations__: These parameters control the search iteration process. By default, they are set to __0__, and CAGRA automatically determines the number of iterations based on __itopk_size__ and __search_width__. Adjusting these values manually can help balance performance and accuracy.

    - __team_size__: Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is __0__, where Milvus automatically selects the __team_size__ based on the vector dimension.

- __GPU_IVF_FLAT__ or __GPU_IVF_PQ__ index

    ```python
    search_params = {
        "metric_type": "L2", 
        "params": {"nprobe": 10}
    }
    ```

    Search parameters for these two index types are similar to those used in __[IVF_FLAT](https://milvus.io/docs/index.md#IVF_FLAT) and [IVF_PQ](https://milvus.io/docs/index.md#IVF_PQ)__. For more information, refer to [Conduct a Vector Similarity Search](https://milvus.io/docs/search.md#Prepare-search-parameters).

### Conduct a search

Use the [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md) method to perform a vector similarity search on the GPU index.

```python
# Load data into memory
collection.load()

collection.search(
    data=[[query_vector]], # Your query vector
    anns_field="vector", # Name of the vector field
    param=search_params,
    limit=100 # Number of the results to return
)
```

## Limits

When using GPU indexes, be aware of certain constraints:

- For __GPU_IVF_FLAT__, the maximum value for __limit__ is 256.

- For __GPU_IVF_PQ__ and __GPU_CAGRA__, the maximum value for __limit__ is 1024.

- While there is no set limit for __limit__ on __GPU_BRUTE_FORCE__, it is recommended not to exceed 4096 to avoid potential performance issues.

- Currently, GPU indexes do not support COSINE distance. If COSINE distance is required, data should be normalized first, and then inner product (IP) distance can be used as a substitute.

- Loading OOM protection for GPU indexes is not fully supported, too much data might lead to QueryNode crashes.

- GPU indexes do not support search functions like [range search](https://milvus.io/docs/single-vector-search.md#Range-search) and [grouping search](https://milvus.io/docs/single-vector-search.md#Grouping-searchh).

## FAQ

- __When is it appropriate to utilize a GPU index?__

    A GPU index is particularly beneficial in situations that demand high throughput or high recall. For instance, when dealing with large batches, the throughput of GPU indexing can surpass that of CPU indexing by as much as 100 times. In scenarios with smaller batches, GPU indexes still significantly outshine CPU indexes in terms of performance. Furthermore, if there's a requirement for rapid data insertion, incorporating a GPU can substantially speed up the process of building indexes.

- __In which scenarios are GPU indexes like CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, and GPU_BRUTE_FORCE most suitable?__

    CAGRA indexes are ideal for scenarios that demand enhanced performance, albeit at the cost of consuming more memory. For environments where memory conservation is a priority, the __GPU_IVF_PQ__ index can help minimize storage requirements, though this comes with a higher loss in precision. The __GPU_IVF_FLAT__ index serves as a balanced option, offering a compromise between performance and memory usage. Lastly, the __GPU_BRUTE_FORCE__ index is designed for exhaustive search operations, guaranteeing a recall rate of 1 by performing traversal searches.