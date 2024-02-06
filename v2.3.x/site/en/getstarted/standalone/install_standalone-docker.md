---
id: install_standalone-docker.md
label: Docker
related_key: Docker
order: 0
group: install_standalone-docker.md
summary: Learn how to install Milvus standalone with Docker.
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class='active '>Docker</a><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class=''>DEB/RPM</a><a href="install_standalone-docker-compose.md" class=''>Docker Compose</a></div>

# Install Milvus Standalone with Docker

This topic describes how to install Milvus standalone using Docker.


## Prerequisites

- [Install Docker](https://docs.docker.com/get-docker/).

- [Check the requirements for hardware and software](prerequisite-helm.md) prior to your installation.


## Install Milvus Standalone with Docker

- Start Milvus.
```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh
bash standalone_embed.sh start
```

- Connect to Milvus
Please refer to [Hello Milvus](https://milvus.io/docs/example_code.md), then run the example code.

- Stop Milvus

To stop Milvus standalone, run:
```
bash standalone_embed.sh stop
```

To delete data after stopping Milvus, run:
```
bash standalone_embed.sh delete
```


## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.
- Check [In-memory Index](index.md) for more about CPU-compatible index types.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Manage Databases](manage_databases.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md)