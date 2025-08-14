---
id: operational_faq.md
summary: Find answers to commonly asked questions about operations in Milvus.
title: Operational FAQ
---

# Operational FAQ

#### What is a QueryNode delegator, and what are its responsibilities?

When a collection loads, a QueryNode subscribes to DML channels for insert and delete messages coming from the message queue. The QueryNode that subscribes to these channels, known as the delegator, is responsible for:
 - Managing increasing segments that require additional memory because of ongoing inserts.
 - Receiving delete messages and passing them to other QueryNodes that hold the relevant segments.

#### How to identify delegator nodes for a collection?

Use Birdwatcher. 

Install Birdwatcher following [this](https://milvus.io/docs/birdwatcher_install_guides.md#Install-Birdwatcher), then run the following command:

```shell
./birdwatcher
# Find delegator nodes for your collection
Milvus(my-release) > show segment-loaded-grpc --collection <your-collectionID>

ServerID 2
Channel by-dev-rootcoord-dml_2, collection: 430123456789, version 1
Leader view for channel: by-dev-rootcoord-dml_2
Growing segments count: 1, ids: [430123456789_4]

# Map server ID to pod IP
Milvus(my-release) > show session

Node(s) querynode
        ID: 1        Version: 2.4.0        Address: 10.0.0.4:19530
        ID: 2        Version: 2.4.0        Address: 10.0.0.5:19530
        ID: 3        Version: 2.4.0        Address: 10.0.0.6:19530
```

#### What parameters can be adjusted if query node memory usage is unbalanced?

Sometimes, query node memory varies because some act as delegators using more RAM. If a delegator's memory is high, adjust queryCoord.delegatorMemoryOverloadFactor to offload sealed segments to other nodes and reduce RAM usage.
- The default value is 0.1.
- Increasing this value (e.g., to 0.3 or higher) will cause the system to offload more sealed segments from the overloaded delegator to other QueryNodes, helping balance memory usage. And you can also try to increase value up to 1, which means no sealed segments will be loaded in the delegator nodes.

If you don’t want to restart the cluster, you can modify milvus config with birdwatcher:

```
./birdwatcher
Offline > connect --etcd <your-etcd-ip>:2379 --auto

# Change delegatorMemoryOverloadFactor to 0.3 without restart, default value is 0.1
set config-etcd --key queryCoord.delegatorMemoryOverloadFactor --value 0.3
```

#### How to set shard_num for a collection?

As a best practice, for a collection with vectors of dimension 768, it is recommended to use at least 1 shard per ~100 million vectors. For heavy write use case, use 4 shards per ~100 million vectors.

E.g. if you have 100 million vectors, use 1-4 shards. If you have 500m vectors, use 5-10 shards.



#### What if I failed to pull the Milvus Docker image from Docker Hub?

If you failed to pull the Milvus Docker image from Docker Hub, try adding other registry mirrors. 

Users from Mainland China can add the URL "https://registry.docker-cn.com" to the registry-mirrors array in **/etc.docker/daemon.json**.

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Is Docker the only way to install and run Milvus?

Docker is an efficient way to deploy Milvus, but not the only way. You can also deploy Milvus from source code. This requires Ubuntu (18.04 or higher) or CentOS (7 or higher). See [Building Milvus from Source Code](https://github.com/milvus-io/milvus#build-milvus-from-source-code) for more information.

#### What are the main factors affecting recall?

Recall is affected mainly by index type and search parameters.

For FLAT index, Milvus takes an exhaustive scan within a collection, with a 100% return.

For IVF indexes, the nprobe parameter determines the scope of a search within the collection. Increasing nprobe increases the proportion of vectors searched and recall, but diminishes query performance.

For HNSW index, the ef parameter determines the breadth of the graph search. Increasing ef increases the number of points searched on the graph and recall, but diminishes query performance.

For more information, see [Vector Indexing](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing).

#### Why did my changes to the configuration files not take effect?

Milvus does not support modification to configuration files during runtime. You must restart Milvus Docker for configuration file changes to take effect.

#### How do I know if Milvus has started successfully?

If Milvus is started using Docker Compose, run `docker ps` to observe how many Docker containers are running and check if Milvus services started correctly.

For Milvus standalone, you should be able to observe at least three running Docker containers, one being the Milvus service and the other two being etcd management and storage service. For more information, see [Installing Milvus Standalone](install_standalone-docker.md).

#### Why is the time in the log files different from the system time?

The time difference is usually due to the fact that the host machine does not use Coordinated Universal Time (UTC).

The log files inside the Docker image use UTC by default. If your host machine does not use UTC, this issue may occur.


#### How do I know if my CPU supports Milvus?

Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

#### Why does Milvus return `illegal instruction` during startup?

Milvus requires your CPU to support a SIMD instruction set: SSE4.2, AVX, AVX2, or AVX512. CPU must support at least one of these to ensure that Milvus operates normally. An `illegal instruction` error returned during startup suggests that your CPU does not support any of the above four instruction sets.

See [CPU’s support for SIMD Instruction Set](prerequisite-docker.md).

#### Can I install Milvus on Windows?

Yes. You can install Milvus on Windows either by compiling from source code or from a binary package. 

See [Run Milvus on Windows](https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md) to learn how to install Milvus on Windows.

#### I got an error when installing pymilvus on Windows. What shall I do?

Please try to use the following command to update pymilvus to the newest version.

```shell
pip install --upgrade pymilvus
```

#### Can I deploy Milvus when disconnected from the Internet?

Yes. You can install Milvus in an offline environment. See [Install Milvus Offline](install_offline-helm.md) for more information.

#### Where can I find the logs generated by Milvus?

The Milvus log is printed to stout (standard output) and stderr (standard error) by default, however we highly recommend redirecting your log to a persistent volume in production. To do so, update `log.file.rootPath` in **milvus.yaml**. And if you deploy Milvus with `milvus-helm` chart, you also need to enable log persistence first via `--set log.persistence.enabled=true`. 

If you didn't change the config, using kubectl logs <pod-name> or docker logs CONTAINER can also help you to find the log.


#### Can I create index for a segment before inserting data into it?

Yes, you can. But we recommend inserting data in batches, each of which should not exceed 256 MB, before indexing each segment.

#### Can I share an etcd instance among multiple Milvus instances?

Yes, you can share an etcd instance among multiple Milvus instances. To do so, you need to change `etcd.rootPath` to a separate value for each Milvus instance in the configuration files of each before starting them.

#### Can I share a Pulsar instance among multiple Milvus instances?

Yes, you can share a Pulsar instance among multiple Milvus instances. To do so, you can

- If multi-tenancy is enabled on your Pulsar instance, consider allocating a separate tenant or namespace for each Milvus instance. To do so, you need to change `pulsar.tenant` or `pulsar.namespace` in the configuration files of your Milvus instances to a unique value for each before starting them.
- If you do not plan on enabling multi-tenancy on your Pulsar instance, consider changing `msgChannel.chanNamePrefix.cluster` in the configuration files of your Milvus instances to a unique value for each before starting them.

#### Can I share a MinIO instance among multiple Milvus instances?

Yes, you can share a MinIO instance among multiple Milvus instances. To do so, you need to change `minio.rootPath` to a unique value for each Milvus instance in the configuration files of each before starting them.

#### How do I handle the error message `pymilvus.exceptions.ConnectionConfigException: <ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')>`?

The error message `Illegal uri [example.db]` indicates that you are trying to connect to Milvus Lite using an earlier version of PyMilvus that does not support this connection type. To resolve this issue, upgrade your PyMilvus installation to at least version 2.4.2, which includes support for connecting to Milvus Lite.

You can upgrade PyMilvus using the following command:

```shell
pip install pymilvus>=2.4.2
```

#### Why am I getting fewer results than the `limit` I set in my search/query?

There are several reasons why you might receive fewer results than the `limit` you specified:

- **Limited Data**: The collection might not have enough entities to fulfill the limit you requested. If the total number of entities in the collection is less than the limit, you will naturally receive fewer results.

- **Duplicate Primary Keys**: Milvus prioritizes specific entities when encountering duplicate primary keys during a search. This behavior varies based on the search type:

- **Query (Exact Match)**: Milvus selects the latest entity with the matching PK.
ANN Search: Milvus selects the entity with the highest similarity score, even if entities share the same PK.
This prioritization can result in fewer unique results than the limit if your collection has many duplicate primary keys.

- **Insufficient Matches**: Your search filtering expressions might be too strict, resulting in fewer entities meeting the similarity threshold. If the conditions set for the search are too restrictive, not enough entities will match, leading to fewer results than expected.

#### `MilvusClient("milvus_demo.db") gives an error: ModuleNotFoundError: No module named 'milvus_lite'`. What causes this and how can it be solved?

This error occurs when you attempt to use Milvus Lite on a Windows platform. Milvus Lite is primarily designed for Linux environments and may not have native support for Windows.

The solution is to utilize a Linux environment:

- Use a Linux-based operating system or virtual machine to run Milvus Lite.
- This approach will ensure compatibility with the library's dependencies and functionality.

#### What are the "length exceeds max length" errors in Milvus, and how can they be understood and addressed?

"Length exceeds max length" errors in Milvus occur when the size of a data element surpasses the maximum allowable size for a collection or field. Here are some examples and explanations:

- JSON field error: `<MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)>`

- String length error: `<ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)>`

- VarChar field error: `<MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)>`

To understand and address these errors:

- Understand that `len(str)` in Python represents the number of characters, not the size in bytes.
- For string-based data types like VARCHAR and JSON, use `len(bytes(str, encoding='utf-8'))` to determine the actual size in bytes, which is what Milvus uses for "max-length".

Example in Python:

```python
# Python Example: result of len() str cannot be used as "max-length" in Milvus 
>>> s = "你好，世界！"
>>> len(s) # Number of characters of s.
6
>>> len(bytes(s, "utf-8")) # Size in bytes of s, max-length in Milvus.
18
```

#### `pymilvus.exceptions.ConnectionConfigException: <ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')>`. What causes this and how can it be solved?

This error indicates that you're trying to connect to Milvus Lite using an earlier version of pymilvus that doesn't support it. To resolve it, upgrade your pymilvus installation to at least version 2.4.2. This version supports connecting to Milvus Lite. To upgrade, use the following command:

```shell
pip install pymilvus>=2.4.2
```

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. Feel free to ask questions, share ideas, and help others.
- Join our [Milvus Forum](https://discuss.milvus.io/) or [Slack Channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find support and engage with our open-source community.
