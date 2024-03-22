---
id: manage-partitions.md
title: Manage Partitions
---

# Manage Partitions

This guide walks you through how to create and manage partitions in a collection. 

## Overview

A partition in Milvus represents a sub-division of a collection. This functionality allows the physical storage of a collection to be divided into multiple parts, contributing to improved query performance by narrowing down the focus to a smaller subset of data rather than the entire collection.

Upon the creation of a collection, at least a default partition named ___default__ is automatically created. You can create a maximum of 4,096 partitions within a collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>Milvus  introduces a feature called <strong>Partition Key</strong>, leveraging the underlying partitions to store entities based on the hashed values of a specific field. This feature facilitates the implementation of multi-tenancy, enhancing search performance. For details, read <a href="./use-partition-key">Use Partition Key</a>.</p>
<p>If the <strong>Partition Key</strong> feature is on in a collection, Milvus takes care of managing all the partitions, relieving you of this responsibility.</p>
<p>The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.</p>

</div>

## Preparations

The code snippet below repurposes the existing code to establish a connection to Milvus and create a collection and its index separately. Consequently, the collection remains unloaded.

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)

```

<div class="admonition note">

<p><b>notes</b></p>

<p>In the above code snippet, the index of the collection has been created along with the collection, indicating that the collection is loaded upon creation.</p>

</div>

## List Partitions

Once a collection is ready, you can list its partitions.

```python
# 3. List partitions
res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default"]
```

The output of the above code snippet includes the names of the partitions within the specified collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>If you have set a field as the partition key in a collection, Milvus creates at least <strong>64</strong> partitions along with the collection. When listing the partitions, the results may differ from the output of the above code snippets.</p>
<p>For details, refer to <a href="./use-partition-key">Use Partition Key</a>.</p>

</div>

## Create Partitions

You can add more partitions to the collection. A collection can have up to 64 partitions.

```python
# 4. Create more partitions
client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)

client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionB"
)

res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default", "partitionA", "partitionB"]
```

The code snippet above creates a partition in a collection and lists the partitions of the collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>If you have set a field as the partition key in a collection, Milvus takes care of managing the partitions in the collection. Therefore, you may encounter prompted errors when attempting to create partitions.</p>
<p>For details, refer to <a href="./use-partition-key">Use Partition Key</a>.</p>

</div>

## Check for a Specific Partition

You can also check the existence of a specific partition.

```python
# 5. Check whether a partition exists
res = client.has_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)
print(res)

# Output
#
# True

res = client.has_partition(
    collection_name="quick_setup",
    partition_name="partitionC"
)
print(res)

# Output
#
# False
```

The code snippet above checks whether the collection has a partition named `partitionA` and `partitionC`.

## Load & Release Partitions

You can load and release specific partitions to make them available or unavailable for searches and queries. 

### Get Load Status

To check the load status of a collection and its partitions, do as follows:

```python
# Release the collection
client.release_collection(collection_name="quick_setup")

# Check the load status
res = client.get_load_state(collection_name="quick_setup")
print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_state(
    collection_name="quick_setup", 
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_state(
    collection_name="quick_setup", 
    partition_name="partitionB"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }

```

Possible load status may be either of the following

- __Loaded__

    A collection is marked as `Loaded` if at least one of its partitions has been loaded.

- __NotLoad__

    A collection is marked as `NotLoad` if none of its partitions has been loaded.

- __Loading__

### Load Partitions

To load all partitions of a collection, you can just call `load_collection()`. To load specific partitions of a collection, do as follows:

```python
client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA"]
)

res = client.get_load_state(collection_name="quick_setup")
print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

To load multiple partitions at a time, do as follows:

```python
client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA", "partitionB"]
)

res = client.get_load_status(
    collection_name="quick_setup",
    partition_name="partitionA"
)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_status(
    collection_name="quick_setup",
    partition_name="partitionB"
)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

### Release Partitions

To release all partitions of a collection, you can just call `release_collection`. To release specific partitions of a collection, do as follows:

```python
# 7. Release a partition
client.release_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA"]
)

res = client.get_load_state(
    collection_name="quick_setup", 
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }

```

To release multiple partitions at a time, do as follows:

```python
client.release_partitions(
    collection_name="quick_setup",
    partition_names=["_default", "partitionA", "partitionB"]
)

res = client.get_load_status(
    collection_name="quick_setup",
)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

## Drop Partitions

Once you release a partition, you can drop it if it is no longer needed.

```python
# 8. Drop a partition
client.drop_partition(
    collection_name="quick_setup",
    partition_name="partitionB"
)

res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default", "partitionA"]
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Before dropping a partition, you need to release it from memory.</p>

</div>
