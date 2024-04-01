---
id: mmap.md
summary: MMap enables more data in a single node.
title: MMap-enabled Data Storage
---

# MMap-enabled Data Storage

In Milvus, memory-mapped files allow for direct mapping of file contents into memory. This feature enhances memory efficiency, particularly in situations where available memory is scarce but complete data loading is infeasible. This optimization mechanism can increase data capacity while ensuring performance up to a certain limit; however, when the amount of data exceeds memory by too much, search and query performance may suffer serious degradation, so please choose to turn this feature on or off as appropriate.

## Configure memory mapping

Starting with Milvus 2.4, you have the flexibility to adjust the static configuration file to configure default memory mapping settings for the entire cluster before deployment. Additionally, there's the option for you to dynamically alter parameters to fine-tune memory mapping settings at both the cluster and index levels. Looking ahead, future updates will extend memory mapping capabilities to include field-level configurations.

### Before cluster deployment: global configuration

Before you deploy a cluster, __cluster-level__ settings apply memory mapping across your entire cluster. This ensures all new objects will automatically adhere to these configurations. It's important to note that modifying these settings requires a restart of the cluster to become effective.

To adjust your cluster's memory mapping settings, edit the `configs/milvus.yaml` file. Within this file, you can specify whether to enable memory mapping by default and determine the directory path for storing memory-mapped files. If the path (`mmapDirPath`) is left unspecified, the system defaults to storing memory-mapped files in `{localStorage.path}/mmap`. For more information, refer to [Local Storage-related Configurations](https://milvus.io/docs/configure_localstorage.md#localStoragepath).

```yaml
# This parameter was set in configs/milvus.yaml
...
queryNode:
  mmap:
    # Set memory mapping property for whole cluster
    mmapEnabled: false | true
    # Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. 
    mmapDirPath: any/valid/path 
....
```

### During cluster operation: dynamic configuration

During cluster runtime, you can dynamically adjust memory mapping settings at either the collection or index level.

At the __collection level__, memory mapping is applied to all unindexed raw data within a collection, excluding primary keys, timestamps, and row IDs. This approach is particularly suited for comprehensive management of large datasets.

For dynamic adjustments to memory mapping settings within a collection, utilize the `set_properties()` method. Here, you can toggle `mmap.enabled` between `True` or `False` as needed.

```python
# Get existing collection
collection = Collection("test_collection") # Replace with your collection name

# Set memory mapping property to True or Flase
collection.set_properties({'mmap.enabled': True})
```

For __index-level__ settings, memory mapping can be specifically applied to vector indexes without affecting other data types. This feature is invaluable for collections that require optimized performance for vector searches.

To enable or disable memory mapping for an index within a collection, call the `alter_index()` method, specifying the target index name in `index_name` and setting `mmap.enabled` to `True` or `False`.

```python
collection.alter_index(
    index_name="vector_index", # Replace with your vector index name
    extra_params={"mmap.enabled": True} # Enable memory mapping for index
)
```

## Customize storage path in different deployments

Memory-mapped files default to the `/mmap` directory within `localStorage.path`. Here's how to customize this setting across various deployment methods:

- For Milvus installed using Helm Chart:

```bash
# new-values.yaml
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: true
           mmapDirPath: any/valid/path
        
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

- For Milvus installed using Milvus Operator:

```bash
# patch.yaml
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: true
        mmapDirPath: any/valid/path
      
 kubectl patch milvus <milvus-name> --patch-file patch.yaml
```

- For Milvus installed using Docker:

```bash
# A new installation script is provided to enable mmap-related settings.
```

## Limits

- Memory mapping cannot be enabled for a loaded collection, ensure the collection has been released before enabling memory mapping.

- Memory mapping is not supported for DiskANN or GPU-class indexes.

## FAQ

- __In which scenarios is it recommended to enable memory mapping? What are the trade-offs after enabling this feature?__

    Memory mapping is recommended when memory is limited or when performance requirements are moderate. Enabling this feature increases the capacity for data loading. For example, with a configuration of 2 CPUs and 8 GB of memory, enabling memory mapping can allow for up to 4 times more data to be loaded compared to not enabling it. The impact on performance varies:

    - With sufficient memory, the expected performance is similar to that of using only memory.

    - With insufficient memory, the expected performance may degrade.

- __What is the relationship between collection-level and index-level configurations?__

    Collection-level and index-level are not inclusive relationships, collection-level controls whether the original data is mmap-enabled or not, whereas index-level is for vector indexes only.

- __Is there any recommended index type for memory mapping?__

    Yes, HNSW is recommended for enable mmap. We have tested HNSW, IVF_FLAT, IVF_PQ/SQ series indexes before, the performance of IVF series indexes dropped seriously, while the performance drop of turning on mmap for HNSW indexes is still within expectation.

- __What kind of local storage is required for memory mapping?__

    A high-quality disk enhances performance, with NVMe drives being the preferred option.

- __Can scalar data be memory-mapped?__

    Memory mapping can be applied to scalar data, but it is not applicable to indexes built on scalar fields.

- __How is the priority determined for memory mapping configurations across different levels?__

    In Milvus, when memory mapping configurations are explicitly defined across multiple levels, index-level and collection-level configurations share the highest priority, which is then followed by cluster-level configurations.

- __If I upgrade from Milvus 2.3 and have configured the memory mapping directory path, what will happen?__

    If you upgrade from Milvus 2.3 and have configured the memory mapping directory path (`mmapDirPath`), your configuration will be retained, and the default setting for memory mapping enabled (`mmapEnabled`) will be `true`. It's important to migrate the metadata to synchronize the configuration of your existing memory-mapped files. For more details, refer to [Migrate the metadata](https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata). 