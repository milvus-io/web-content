---
id: diskann.md
title: "DISKANN"
summary: "In large-scale scenarios, where datasets can include billions or even trillions of vectors, standard in-memory indexing methods (e.g., HNSW, IVF_FLAT) often fail to keep pace due to memory limitations. DISKANN offers a disk-based approach that addresses these challenges by maintaining high search accuracy and speed when the dataset size exceeds available RAM."
---

# DISKANN

In large-scale scenarios, where datasets can include billions or even trillions of vectors, standard in-memory indexing methods (e.g., [HNSW](hnsw.md), [IVF_FLAT](ivf-flat.md)) often fail to keep pace due to memory limitations. **DISKANN** offers a disk-based approach that addresses these challenges by maintaining high search accuracy and speed when the dataset size exceeds available RAM.

## Overview

**DISKANN** combines two key techniques for efficient vector search:

- **Vamana Graph** – A **disk-based**, **graph-based** index that connects data points (or vectors) for efficient navigation during search.

- **Product Quantization (PQ)** – An **in-memory** compression method that reduces the size of vectors, enabling quick approximate distance calculations between vectors.

### Index construction

#### Vamana graph

The Vamana graph is central to DISKANN’s disk-based strategy. It can handle very large datasets because it does not need to fully reside in memory during or after construction.

The following figure shows how a Vamana graph is constructed.

![Diskann](../../../../../assets/diskann.png)

1. **Initial random connections:** Each data point (vector) is represented as a node in the graph. These nodes are initially connected randomly, forming a dense network. Typically, a node starts with around 500 edges (or connections) for broad connectivity.

1. **Refining for efficiency:** The initial random graph undergoes an optimization process to make it more efficient for searching. This involves two key steps:

    - **Pruning redundant edges:** The algorithm discards unnecessary connections based on distances between nodes. This step prioritizes higher-quality edges.

        The `max_degree` parameter restricts the maximum number of edges per node. A higher `max_degree` results in a denser graph, potentially finding more relevant neighbors (higher recall) but also increasing memory usage and search time.

    - **Adding strategic shortcuts:** Vamana introduces long-range edges, connecting data points that are far apart in the vector space. These shortcuts allow searches to quickly jump across the graph, bypassing intermediate nodes and significantly speeding up navigation.

        The `search_list_size` parameter determines the breadth of the graph refinement process. A higher `search_list_size` extends the search for neighbors during construction and can improve final accuracy, but increases index-building time.

To learn more about parameter tuning, refer to [DISKANN params](diskann.md#diskann-params).

#### PQ

DISKANN uses **PQ** to compress high-dimensional vectors into smaller representations (**PQ codes**), which are stored in memory for rapid approximate distance calculations. 

The `pq_code_budget_gb_ratio` parameter manages the memory footprint dedicated to storing these PQ codes. It represents a ratio between the total size of the vectors (in gigabytes) and the space allocated for storing the PQ codes. You can calculate the actual PQ code budget (in gigabytes) with this formula:

```plaintext
PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
```

where:

- `vec_field_size_gb` is the total size of the vectors (in gigabytes).

- `pq_code_budget_gb_ratio` is a user-defined ratio, representing the fraction of the total data size reserved for PQ codes. This parameter allows for a trade-off between search accuracy and memory resources. For more information on parameter tuning, refer to [DISKANN configs](diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd).

For technical details on the underlying PQ method, refer to [IVF_PQ](ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc).

### Search process

Once the index (the Vamana graph on disk and PQ codes in memory) is built, DISKANN performs ANN searches as follows:

![Diskann 2](../../../../../assets/diskann-2.png)

1. **Query and entry point:** A query vector is provided to locate its nearest neighbors. DISKANN starts from a selected entry point in the Vamana graph, often a node near the global centroid of the dataset. The global centroid represents the average of all vectors, which helps to minimize the traversal distance through the graph to find desired neighbors.

1. **Neighborhood exploration:** The algorithm gathers potential candidate neighbors (circles in red in the figure) from the edges of the current node, leveraging in-memory PQ codes to approximate the distances between these candidates and the query vector. These potential candidate neighbors are the nodes directly connected to the selected entry point through edges in the Vamana graph.

1. **Selecting nodes for accurate distance calculation:** From the approximate results, a subset of the most promising neighbors (circles in green in the figure) are selected for precise distance evaluations using their original, uncompressed vectors. This requires reading data from disk, which can be time-consuming. DISKANN uses two parameters to control this delicate balance between accuracy and speed:

    - `beam_width_ratio`: A ration that controls the breadth of the search, determining how many candidate neighbors are selected in parallel to explore their neighbors. A larger `beam_width_ratio` results in a wider exploration, potentially leading to higher accuracy but also increasing computational cost and disk I/O. The beam width, or the number of nodes selected, is determined using the formula: `Beam width = Number of CPU cores * beam_width_ratio`.

    - `search_cache_budget_gb_ratio`: The proportion of memory allocated for caching frequently accessed disk data. This caching helps to minimize disk I/O, making repeated searches faster as the data is already in memory.

    To learn more about parameter tuning, refer to [DISKANN configs](diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd).

1. **Iterative exploration:** The search iteratively refines the set of candidates, repeatedly performing approximate evaluations (using PQ) followed by precise checks (using original vectors from disk) until a sufficient number of neighbors are found.

## Enable DISKANN in Milvus

By default, **DISKANN** is disabled in Milvus to prioritize the speed of in-memory indexes for datasets that fit comfortably in RAM. However, if you're working with massive datasets or want to take advantage of **DISKANN**'s scalability and SSD optimization, you can easily enable it.

Here's how to enable DISKANN in Milvus:

1. **Update the Milvus Configuration File**

    1. Locate your Milvus configuration file**.** (Refer to the Milvus documentation on Configuration for details on finding this file.)

    1. Find the `queryNode.enableDisk` parameter and set its value to `true`:

        ```yaml
         queryNode:
             enableDisk: true # Enables query nodes to load and search using the on-disk index
        ```

1. **Optimize Storage for DISKANN**

To ensure the best performance with DISKANN, it's recommended to store your Milvus data on a fast NVMe SSD. Here's how to do this for both Milvus Standalone and Cluster deployments:

- **Milvus Standalone**

    - Mount the Milvus data directory to an NVMe SSD within the Milvus container. You can do this in the `docker-compose.yml` file or using other container management tools.

    - For example, if your NVMe SSD is mounted at `/mnt/nvme`, you would update the `volumes`section of your `docker-compose.yml` like this:

    ```yaml
     volumes:
          - /mnt/nvme/volumes/milvus:/var/lib/milvus
    ```

- **Milvus Cluster**

    - Mount the Milvus data directory to an NVMe SSD in both the QueryNode and IndexNode containers. You can achieve this through your container orchestration setup.

    - By mounting the data on an NVMe SSD in both node types, you ensure fast read and write speeds for both search and indexing operations.

Once you've made these changes, restart your Milvus instance for the settings to take effect. Now, Milvus will leverage DISKANN's capabilities to handle large datasets, delivering efficient and scalable vector search.

## Configure DISKANN

DISKANN parameters can be configured using two primary methods:

- **Milvus Configuration File:** Adjust DISKANN parameters through the Milvus configuration file. This method is suitable for setting general configuration options for your Milvus instance.

- **Milvus SDK:** Fine-tune DISKANN parameters using the Milvus SDK during index creation or search operations. This allows for more granular control and dynamic parameter adjustments based on specific use cases.

<div class="alert note">

The configuration made by the SDK overrides any settings defined in the configuration file, offering flexibility and control for specific applications and data sets.

</div>

### Milvus configuration file

Here's an example of how to set DISKANN parameters within the `milvus.yaml` file:

```yaml
knowhere:
  enable: true # When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.
  DISKANN:
    build:
      max_degree: 56 # Maximum degree of the Vamana graph
      pq_code_budget_gb_ratio: 0.125 # Size limit on the PQ code (compared with raw data)
      search_cache_budget_gb_ratio: 0.1 # Ratio of cached node numbers to raw data
      search_list_size: 100 # Size of the candidate list during building graph
    search:
      beam_width_ratio: 4 # Ratio between the maximum number of IO requests per search iteration and CPU number
```

### SDK configuration

Here's an example of how to set DISKANN parameters using Milvus SDK.

#### Build

To build an `IVF_FLAT` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="DISKANN", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={
        "max_degree": 56, # Maximum number of connections (edges) each data point can have
        "search_list_size": 100,
        "search_cache_budget_gb_ratio": 0.10, # Amount of memory allocated for caching frequently accessed parts of the graph
        "pq_code_budget_gb_ratio": 0.125 # Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data
    } # Index building params
)
```

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

#### Search

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
search_params = {
    "params": {
        "beam_width_ratio": 4.0, # degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.
    }
}

res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="vector_field",  # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # Query vector
    limit=3,  # TopK results to return
    search_params=search_params
)
```

## DISKANN params

Fine-tuning DISKANN's parameters allows you to tailor its behavior to your specific dataset and search workload, striking the right balance between speed, accuracy, and memory usage.

### Index building params

These parameters influence how the DISKANN index is constructed. Adjusting them can affect the index size, build time, and search quality.

<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code>max_degree</code></p></td>
     <td><p>Controls the maximum number of connections (edges) each data point can have in the Vamana graph.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 512]</p>
<p><strong>Default value</strong>: <code>56</code></p></td>
     <td><p>Higher values create denser graphs, potentially increasing recall (finding more relevant results) but also increasing memory usage and build time. 
 In most cases, we recommend you set a value within this range: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code>search_list_size</code></p></td>
     <td><p>Determines the number of candidate neighbors considered for each data point during graph construction.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: <code>100</code></p></td>
     <td><p>Larger values lead to more comprehensive graphs, potentially improving search quality but also increasing build time. 
 In most cases, we recommend you set a value within this range: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code>search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controls the amount of memory allocated for caching frequently accessed parts of the graph during index construction.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: [0.0, 0.3)</p>
<p><strong>Default value</strong>: <code>0.10</code></p></td>
     <td><p>A higher value allocates more memory for caching, significantly reducing disk I/O but consuming more system memory. A lower value uses less memory for caching, potentially increasing the need for disk access.
 In most cases, we recommend you set a value within this range: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code>pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: (0.0, 0.25]</p>
<p><strong>Default value</strong>: <code>0.125</code></p></td>
     <td><p>A higher ratio leads to more accurate search results by allocating a larger proportion of memory for PQ codes, effectively storing more information about the original vectors. However, this requires more memory, limiting the capacity for handling large datasets.
 A lower ratio reduces memory usage but potentially sacrifices accuracy, as smaller PQ codes retain less information. This approach is suitable for scenarios where memory constraints are a concern, potentially enabling the indexing of larger datasets.</p>
<p>In most cases, we recommend you set a value within this range: (0.0625, 0.25]</p></td>
   </tr>
</table>

### Index-specific search params

These parameters influence how DISKANN performs searches. Adjusting them can impact search speed, latency, and resource usage.

<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code>beam_width_ratio</code></p></td>
     <td><p>Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: [1, max(128 / CPU number, 16)]</p>
<p><strong>Default value</strong>: <code>4.0</code></p></td>
     <td><p>Higher values increase parallelism, which can speed up search on systems with powerful CPUs and SSDs. However, setting it too high might lead to excessive resource contention.
 In most cases, we recommend you set a value within this range: [1.0, 4.0].</p></td>
   </tr>
</table>

