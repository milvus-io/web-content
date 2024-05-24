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

<p>Milvus  introduces a feature called <strong>Partition Key</strong>, leveraging the underlying partitions to store entities based on the hashed values of a specific field. This feature facilitates the implementation of multi-tenancy, enhancing search performance. For details, read <a href="https://milvus.io/docs/use-partition-key.md">Use Partition Key</a>.</p>
<p>If the <strong>Partition Key</strong> feature is on in a collection, Milvus takes care of managing all the partitions, relieving you of this responsibility.</p>
<p>The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.</p>

</div>

## Preparations

The code snippet below repurposes the existing code to establish a connection to Milvus and create a collection in a quick-setup mode, indicating that the collection is loaded upon creation.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import MilvusClient, DataType

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)

```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .build();

client.createCollection(quickSetupReq);
```

```javascript
const address = "http://localhost:19530"

// 1. Set up a Milvus Client
client = new MilvusClient({address});

// 2. Create a collection in quick setup mode
await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
});  
```

<div class="admonition note">

<p><b>notes</b></p>

<p>In the above code snippet, the index of the collection has been created along with the collection, indicating that the collection is loaded upon creation.</p>

</div>

## List Partitions

Once a collection is ready, you can list its partitions.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 3. List partitions
res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default"]
```

```java
import io.milvus.v2.service.partition.request.ListPartitionsReq;

// 3. List all partitions in the collection
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
    .collectionName("quick_setup")
    .build();

List<String> partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

// Output:
// ["_default"]
```

```javascript
// 3. List partitions
res = await client.listPartitions({
    collection_name: "quick_setup"
})

console.log(res.partition_names)

// Output
// 
// [ '_default' ]
// 
```

The output of the above code snippet includes the names of the partitions within the specified collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>If you have set a field as the partition key in a collection, Milvus creates at least <strong>64</strong> partitions along with the collection. When listing the partitions, the results may differ from the output of the above code snippets.</p>
<p>For details, refer to <a href="https://milvus.io/docs/use-partition-key.md">Use Partition Key</a>.</p>

</div>

## Create Partitions

You can add more partitions to the collection. A collection can have up to 64 partitions.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
import io.milvus.v2.service.partition.request.CreatePartitionReq;

// 4. Create more partitions
CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName("quick_setup")
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

// Output:
// [
//     "_default",
//     "partitionA",
//     "partitionB"
// ]
```

```javascript
// 4. Create more partitions
await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

res = await client.listPartitions({
    collection_name: "quick_setup"
})

console.log(res.partition_names)

// Output
// 
// [ '_default', 'partitionA', 'partitionB' ]
// 
```

The code snippet above creates a partition in a collection and lists the partitions of the collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>If you have set a field as the partition key in a collection, Milvus takes care of managing the partitions in the collection. Therefore, you may encounter prompted errors when attempting to create partitions.</p>
<p>For details, refer to <a href="https://milvus.io/docs/use-partition-key.md">Use Partition Key</a>.</p>

</div>

## Check for a Specific Partition

You can also check the existence of a specific partition.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
import io.milvus.v2.service.partition.request.HasPartitionReq;

// 5. Check whether a partition exists
HasPartitionReq hasPartitionReq = HasPartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

boolean exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

// Output:
// true

hasPartitionReq = HasPartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionC")
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

// Output:
// false
```

```javascript
// 5. Check whether a partition exists
res = await client.hasPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.value)

// Output
// 
// true
// 

res = await client.hasPartition({
    collection_name: "quick_setup",
    partition_name: "partitionC"
})

console.log(res.value)

// Output
// 
// false
// 
```

The code snippet above checks whether the collection has a partition named `partitionA` and `partitionC`.

## Load & Release Partitions

You can load and release specific partitions to make them available or unavailable for searches and queries. 

### Get Load Status

To check the load status of a collection and its partitions, do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;
import io.milvus.v2.service.partition.request.LoadPartitionsReq;
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

// 6. Load a partition independantly
// 6.1 Release the collection
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
    .collectionName("quick_setup")
    .build();

client.releaseCollection(releaseCollectionReq);

// 6.2 Load partitionA
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(3000);

// 6.3 Check the load status of the collection and its partitions
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

boolean state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

```javascript
// 6. Load a partition indenpendantly
await client.releaseCollection({
    collection_name: "quick_setup"
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 

await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

await sleep(3000)

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

Possible load status may be either of the following

- __Loaded__

    A collection is marked as `Loaded` if at least one of its partitions has been loaded.

- __NotLoad__

    A collection is marked as `NotLoad` if none of its partitions has been loaded.

- __Loading__

    A collection is marked as Loading if at least one of its partitions is in the loading process.


### Load Partitions

To load all partitions of a collection, you can just call `load_collection()`. To load specific partitions of a collection, do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true
```

```javascript
await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
//
```

To load multiple partitions at a time, do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA", "partitionB"))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true
```

```javascript
await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA", "partitionB"]
})

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

console.log(res)

// Output
// 
// LoadStateLoaded
// 
```

### Release Partitions

To release all partitions of a collection, you can just call `release_collection`. To release specific partitions of a collection, do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

// 7. Release a partition
ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

```javascript
// 7. Release a partition
await client.releasePartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 
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

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

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

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("_default", "partitionA", "partitionB"))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

```javascript

await client.releasePartitions({
    collection_name: "quick_setup",
    partition_names: ["_default", "partitionA", "partitionB"]
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res)

// Output
// 
// {
//   status: {
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   state: 'LoadStateNotLoad'
// }
// 
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Before dropping a partition, you need to release it from memory.</p>

</div>

## FAQ

- __How much data can be stored in a partition?__

    It is recommended to store less than 1B of data in a partition.

- __What is the maximum number of partitions that can be created?__

    By default, Milvus allows a maximum of 4,096 partitions to be created. You can adjust the maximum number of partitions by configuring `rootCoord.maxPartitionNum`. For details, refer to [System Configurations](https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum).

- __How can I differentiate between partitions and partition keys?__

    Partitions are physical storage units, whereas partition keys are logical concepts that automatically assign data to specific partitions based on a designated column.

    For instance, in Milvus, if you have a collection with a partition key defined as the `color` field, the system automatically assigns data to partitions based on the hashed values of the `color` field for each entity. This automated process relieves the user of the responsibility to manually specify the partition when inserting or searching data.

    On the other hand, when manually creating partitions, you need to assign data to each partition based on the criteria of the partition key. If you have a collection with a `color` field, you would manually assign entities with a `color` value of `red` to `partition A`, and entities with a `color` value of `blue` to `partition B`. This manual management requires more effort.

    In summary, both partitions and partition keys are utilized to optimize data computation and enhance query efficiency. It is essential to recognize that enabling a partition key means surrendering control over the manual management of partition data insertion and loading, as these processes are fully automated and handled by Milvus.
