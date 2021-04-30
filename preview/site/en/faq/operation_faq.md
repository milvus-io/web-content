---
id: operations_faq.md
title: Operations FAQ
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

<a id="markdown-what-if-i-failed-to-pull-milvus-docker-image-from-docker-hub" name="what-if-i-failed-to-pull-milvus-docker-image-from-docker-hub"></a>

#### What if I failed to pull Milvus Docker image from Docker Hub?

If you failed to pull Milvus Docker image from Docker Hub, try adding other registry mirrors. 

Users from Mainland China can add the URL "https://registry.docker-cn.com" to the registry-mirrors array in **/etc.docker/daemon.json**.

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

<a id="markdown-is-docker-the-only-way-to-install-and-run-milvus" name="is-docker-the-only-way-to-install-and-run-milvus"></a>

#### Is Docker the only way to install and run Milvus?

Docker is an efficient way to deploy Milvus, but not the only way. You can also deploy Milvus from source code. This requires Ubuntu (18.04 or higher) or CentOS (7 or higher). See [Building Milvus from Source Code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

<a id="markdown-what-are-the-main-factors-affecting-recall" name="what-are-the-main-factors-affecting-recall"></a>

#### What are the main factors affecting recall?

Recall is affected mainly by index type and search parameters.

For FLAT index, Milvus takes an exclusive scan within a collection, with a recall of 100%.

For IVF indexes, the nprobe parameter determines the coverage of a search within the collection. The greater the nprobe, the higher the proportion of vector to search, the higher the recall, but the poorer the query performance.

For HNSW index, the ef parameter determines the breadth of the graph search. The greater the ef, the more points are searched on the graph, the higher the recall, but the poor the search performance.

For more information, see [Vector Indexing](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing).

<a id="markdown-why-my-changes-to-the-configuration-files-did-not-take-effect" name="why-my-changes-to-the-configuration-files-did-not-take-effect"></a>

#### Why my changes to the configuration files did not take effect?

Milvus v2.0 does not support modification to configuration files during runtime.You must restart Milvus Docker for a change to a configuration file to take effect. See [Server Configuration> Configuration Modification]() for more information.

<a id="markdown-how-can-i-know-if-milvus-has-started-successfully" name="how-can-i-know-if-milvus-has-started-successfully"></a>

#### How can I know if Milvus has started successfully?

If Milvus is started using Docker Compose, run docker ps to observe how many Docker containers are running and check if Milvus services is properly started.

- For Milvus Standalone, you should be able to observe at least three running Docker containers, one being the Milvus service and the other two being etcd management and storage service. For more information, see [Installing Milvus Standalone](install_standalone-docker.md).
- For Milvus Cluster, you should be able to observe at least 12 running Docker containers, nine for the Milvus service and three for basic services. For more information, see [Installing Milvus Cluster](install_cluster-docker.md).

<a id="markdown-why-is-the-time-in-the-log-files-different-from-the-system-time" name="why-is-the-time-in-the-log-files-different-from-the-system-time"></a>

#### Why is the time in the log files different from the system time?

The time difference is usually due to the fact that the host machine does not use the UTC time.

The log files inside the Docker image use UTC time by default. If your host machine does not use UTC time, then this could happen.

<a id="markdown-how-can-i-know-whether-my-cpu-supports-milvus" name="how-can-i-know-whether-my-cpu-supports-milvus"></a>

#### How can I know whether my CPU supports Milvus?

See [CPU’s support for SIMD Instruction Set](begin_standalone.md).

<a id="markdown-why-does-milvus-return-illegal-instruction-during-startup" name="why-does-milvus-return-illegal-instruction-during-startup"></a>

#### Why does Milvus return Illegal instruction during startup?

Milvus requires your CPU to support a SIMD instruction set: SSE4_2, AVX, AVX2, or AVX512. CPU must support at least one of these to ensure the normal operation of Milvus. An Illegal instruction error returned during startup suggests that your CPU does not support any of the above four instruction sets.

See [CPU’s support for SIMD Instruction Set](begin_standalone.md).

<a id="markdown-can-i-install-milvus-on-windows" name="can-i-install-milvus-on-windows"></a>

#### Can I install Milvus on Windows?

If you try to deploy Milvus with Docker, Milvus only supports the deployment on [Windows Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/).

Milvus cannot be built from source code on Windows or macOS. Use Ubuntu (18.04 or higher) or CentOS (7 or higher) to build Milvus from source code.

<a id="markdown-how-to-fix-the-error-when-i-install-pymilvus-on-windows" name="how-to-fix-the-error-when-i-install-pymilvus-on-windows"></a>

#### How to fix the error when I install pymilvus on Windows?

Try installing pymilvus in a Conda environment.

<a id="markdown-can-i-deploy-milvus-service-when-disconnected-from-the-internet" name="can-i-deploy-milvus-service-when-disconnected-from-the-internet"></a>

#### Can I deploy Milvus service when disconnected from the Internet?

Milvus is available as a Docker image and allows offline deployment. Taking Milvus Standalone as an example:

1. Pull the Docker images of minIO, etcd, and Milvus when you have Internet access.
2. Run docker save to save the images as TAR files.
3. Save the **.TAR** files locally.
4. Run docker load to load the file as a Docker image.
5. Run docker-compose to start Milvus.

For more information about Docker, see [Installing Milvus Standalone](install_standalone-docker.md).

<a id="markdown-still-have-questions" name="still-have-questions"></a>

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!