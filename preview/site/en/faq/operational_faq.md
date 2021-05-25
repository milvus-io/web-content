---
id: operational_faq.md
title: Operational FAQ
---

# Operational FAQ

<!-- TOC -->
[What if I failed to pull Milvus Docker image from Docker Hub?](#what-if-i-failed-to-pull-milvus-docker-image-from-docker-hub)
[Is Docker the only way to install and run Milvus?](#is-docker-the-only-way-to-install-and-run-milvus)
[What are the main factors affecting recall?](#what-are-the-main-factors-affecting-recall)
[Why my changes to the configuration files did not take effect?](#why-my-changes-to-the-configuration-files-did-not-take-effect)
[How can I know if Milvus has started successfully?](#how-can-i-know-if-milvus-has-started-successfully)
[Why is the time in the log files different from the system time?](#why-is-the-time-in-the-log-files-different-from-the-system-time)
[How can I know whether my CPU supports Milvus?](#how-can-i-know-whether-my-cpu-supports-milvus)
[Why does Milvus return Illegal instruction during startup?](#why-does-milvus-return-illegal-instruction-during-startup)
[Can I install Milvus on Windows?](#can-i-install-milvus-on-windows)
[How to fix the error when I install pymilvus on Windows?](#how-to-fix-the-error-when-i-install-pymilvus-on-windows)
[Can I deploy Milvus service when disconnected from the Internet?](#can-i-deploy-milvus-service-when-disconnected-from-the-internet)
[Still have questions?](#still-have-questions)
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

For HNSW index, the ef parameter determines the breadth of the graph search. Increasing ef increases the number of points searched on the graph and recall, but diminishes search performance.

For more information, see [Vector Indexing](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing).

#### Why did my changes to the configuration files not take effect?

Milvus v2.0 does not support modification to configuration files during runtime.You must restart Milvus Docker for configuration file changes to take effect.

#### How do I know if Milvus has started successfully?

If Milvus is started using Docker Compose, run docker ps to observe how many Docker containers are running and check if Milvus services started correctly.

- For Milvus Standalone, you should be able to observe at least three running Docker containers, one being the Milvus service and the other two being etcd management and storage service. For more information, see [Installing Milvus Standalone](install_standalone-docker.md).
- For Milvus Cluster, you should be able to observe at least twelve running Docker containers, nine for the Milvus service and three for basic services. For more information, see [Installing Milvus Cluster](install_cluster-docker.md).

#### Why is the time in the log files different from the system time?

The time difference is usually due to the fact that the host machine does not use Coordinated Universal Time (UTC).

The log files inside the Docker image use UTC by default. If your host machine does not use UTC, this issue may occur.


#### Why does Milvus return Illegal instruction during startup?

Milvus requires your CPU to support a SIMD instruction set: SSE4_2, AVX, AVX2, or AVX512. CPU must support at least one of these to ensure that Milvus operates normally. An Illegal instruction error returned during startup suggests that your CPU does not support any of the above four instruction sets.


#### Can I install Milvus on Windows?

If you try to deploy Milvus with Docker, Milvus only supports the deployment on [Windows Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/).

Milvus cannot be built from source code on Windows or macOS. Use Ubuntu (18.04 or higher) or CentOS (7 or higher) to build Milvus from source code.

#### I got an error when installing pymilvus on Windows. What shall I do?

It is not recommended to install pymilvus on Windows. Try installing it in a Conda environment.

#### Can I deploy Milvus when disconnected from the Internet?

Milvus is available as a Docker image and allows offline deployment. Taking Milvus Standalone as an example:

1. Pull the Docker images of minIO, etcd, and Milvus when you have Internet access.
2. Run docker save to save the images as TAR files.
3. Save the **.TAR** files locally.
4. Run docker load to load the file as a Docker image.
5. Run docker-compose to start Milvus.

For more information about Docker, see [Installing Milvus Standalone](install_standalone-docker.md).

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. Feel free to ask questions, share ideas, and help others.
- Join our [Slack Channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find support and engage with our open-source community.