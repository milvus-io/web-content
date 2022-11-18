---
id: install_cluster-docker.md
label: Docker Compose
related_key: Docker
order: 2
group: install_cluster-milvusoperator.md
summary: Learn how to install Milvus cluster with Docker Compose.
---

<div class="tab-wrapper"><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-docker.md" class='active '>Docker Compose</a><a href="install_cluster-ansible.md" class=''>Ansible</a></div>

# Install Milvus Cluster with Docker Compose

This topic introduces how to deploy a Milvus cluster with Docker Compose.

<div class="alert note">
Docker Compose cannot deploy Milvus distributed clusters across machines, and can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>

## Prerequisites

Check [the requirements](prerequisite-docker.md) for hardware and software prior to your installation. 

## Download the `YAML` file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus-cluster-docker-compose.yml) `milvus-cluster-docker-compose.yml` and save it as `docker-compose.yml` manually, or with the following command.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus-cluster-docker-compose.yml -O docker-compose.yml
```


## Start Milvus

In the same directory as the `docker-compose.yml` file, start up Milvus by running:

```Shell
$ sudo docker-compose up -d
```

<div class="alert note">
If your system has Docker Compose V2 installed instead of V1, use <code> docker compose </code> instead of <code> docker-compose </code>. Check if this is the case with <code> $ docker compose version </code>. Read <a href="https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command"> here </a> for more information.
</div>

```Text
Creating milvus-etcd   ... done
Creating milvus-minio  ... done
Creating milvus-pulsar ... done
Creating milvus-proxy      ... done
Creating milvus-rootcoord  ... done
Creating milvus-indexcoord ... done
Creating milvus-querycoord ... done
Creating milvus-datacoord  ... done
Creating milvus-querynode  ... done
Creating milvus-indexnode  ... done
Creating milvus-datanode   ... done
```

Check the status of the containers.

```
$ sudo docker ps
```

After Milvus cluster starts, 11 running docker containers appear including three dependencies and eight Milvus services.

```
      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-datacoord    /tini -- milvus run datacoord    Up
milvus-datanode     /tini -- milvus run datanode     Up
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-indexcoord   /tini -- milvus run indexcoord   Up
milvus-indexnode    /tini -- milvus run indexnode    Up
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   0.0.0.0:9000->9000/tcp, 0.0.0.0:9001->9001/tcp
milvus-proxy        /tini -- milvus run proxy        Up             0.0.0.0:19530->19530/tcp, 0.0.0.0:9091->9091/tcp
milvus-pulsar       /bin/bash -c                     Up
                    bin/apply-co ...
milvus-querycoord   /tini -- milvus run querycoord   Up
milvus-querynode    /tini -- milvus run querynode    Up
milvus-rootcoord    /tini -- milvus run rootcoord    Up
```

## Stop Milvus

To stop Milvus cluster, run:

```shell
$ sudo docker-compose down
```

To delete data after stopping Milvus, run:

```shell
$ sudo rm -rf  volumes
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
