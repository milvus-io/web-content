---
id: install_cluster-docker.md
label: Docker Compose
related_key: Docker
order: 0
group: install_cluster-docker.md
summary: Learn how to install Milvus cluster with Docker Compose.
---

<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a><a href="install_cluster-ansible.md" class=''>Ansible</a></div>

# Install Milvus Cluster with Docker Compose

This topic introduces how to deploy a Milvus cluster with Docker Compose.

<div class="alert note">
Docker Compose cannot deploy Milvus distributed clusters across machines, and can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>

## Prerequisites
[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

## Download an installation file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-cluster-docker-compose.yml) `milvus-cluster-docker-compose.yml` directly or with the following command, and save it as `docker-compose.yml`.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-cluster-docker-compose.yml -O docker-compose.yml
```


## Start Milvus

```Shell
$ sudo docker-compose up -d
```

```Text
Docker Compose is now in the Docker CLI, try `docker compose up`
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
      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-datacoord    /tini -- milvus run datacoord    Up
milvus-datanode     /tini -- milvus run datanode     Up
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-indexcoord   /tini -- milvus run indexcoord   Up
milvus-indexnode    /tini -- milvus run indexnode    Up
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-proxy        /tini -- milvus run proxy        Up             0.0.0.0:19530->19530/tcp,:::19530->19530/tcp
milvus-pulsar       bin/pulsar standalone            Up
milvus-querycoord   /tini -- milvus run querycoord   Up
milvus-querynode    /tini -- milvus run querynode    Up
milvus-rootcoord    /tini -- milvus run rootcoord    Up
```

## Stop Milvus

To stop Milvus cluster, run <code>$ sudo docker-compose down</code>.

To delete data after stopping Milvus, run <code>$ sudo rm -rf  volumes</code>.

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
