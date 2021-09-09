---
id: operational_faq.md
summary: Find answers to commonly asked questions about operations in Milvus.
---

# Operational FAQ

<!-- TOC -->


<!-- /TOC -->

#### What if I failed to pull the Milvus Docker image from Docker Hub?

If you failed to pull the Milvus Docker image from Docker Hub, try adding other registry mirrors. 

Users from Mainland China can add the URL "https://registry.docker-cn.com" to the registry-mirrors array in **/etc.docker/daemon.json**.

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Is Docker the only way to install and run Milvus?

Docker is an efficient way to deploy Milvus, but not the only way. You can also deploy Milvus from source code. This requires Ubuntu (18.04 or higher) or CentOS (7 or higher). See [Building Milvus from Source Code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

#### What are the main factors affecting recall?

Recall is affected mainly by index type and search parameters.

For FLAT index, Milvus takes an exhaustive scan within a collection, with a 100% return.

For IVF indexes, the nprobe parameter determines the scope of a search within the collection. Increasing nprobe increases the proportion of vectors searched and recall, but diminishes query performance.

For HNSW index, the ef parameter determines the breadth of the graph search. Increasing ef increases the number of points searched on the graph and recall, but diminishes query performance.

For more information, see [Vector Indexing](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing).

#### Why did my changes to the configuration files not take effect?

Milvus v2.0 does not support modification to configuration files during runtime. You must restart Milvus Docker for configuration file changes to take effect.

#### How do I know if Milvus has started successfully?

If Milvus is started using Docker Compose, run `docker ps` to observe how many Docker containers are running and check if Milvus services started correctly.

- For Milvus standalone, you should be able to observe at least three running Docker containers, one being the Milvus service and the other two being etcd management and storage service. For more information, see [Installing Milvus Standalone](install_standalone-docker.md).
- For Milvus Cluster, you should be able to observe at least twelve running Docker containers, nine for the Milvus service and three for basic services. For more information, see [Installing Milvus Cluster](install_cluster-docker.md).

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

See [CPU’s support for SIMD Instruction Set](install_standalone-docker.md#before-you-begin).

#### Can I install Milvus on Windows?

If you try to deploy Milvus with Docker, Milvus only supports the deployment on [Windows Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/).

Milvus cannot be built from source code on Windows or macOS. Use Ubuntu (18.04 or higher) or CentOS (7 or higher) to build Milvus from source code.

#### I got an error when installing pymilvus on Windows. What shall I do?

It is not recommended to install pymilvus on Windows. Try installing it in a Conda environment.

#### Can I deploy Milvus when disconnected from the Internet?

Milvus is available as a Docker image and allows offline deployment. Taking Milvus standalone as an example:

1. Pull the Docker images of MinIO, etcd, and Milvus when you have Internet access.
2. Run `docker save` to save the images as TAR files.
3. Save the **.TAR** files locally.
4. Run `docker load` to load the file as a Docker image.
5. Run `docker-compose` to start Milvus.
For more information about Docker, see [Installing Milvus Standalone](install_standalone-docker.md).

#### Where can I find the logs generated by Milvus?

The Milvus log is printed to stout (standard output) and stderr (standard error) by default, however we highly recommend redirecting your log to a persistent volume in production. To do so, update `log.file.rootPath` in **milvus.yaml**. 


#### Can I create index for a segment before inserting data into it?

Yes, you can. But we recommend inserting data in batches, each of which should not exceed 256 MB, before indexing each segment.

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. Feel free to ask questions, share ideas, and help others.
- Join our [Slack Channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find support and engage with our open-source community.
