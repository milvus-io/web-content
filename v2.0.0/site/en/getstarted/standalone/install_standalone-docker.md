---
id: install_standalone-docker.md
label: Docker Compose
related_key: Docker
order: 0
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with Docker Compose.
---

# Install Milvus Standalone

This topic describes how to install Milvus standalone with Docker Compose or on Kubernetes. 

[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

If you run into image loading errors while installing, you can [Install Milvus Offline](install_offline-docker.md).

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_standalone-docker.md" class='active '>Docker Compose</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class=''>APT or YUM</a></div>

## Download an installation file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.0.0/milvus-standalone-docker-compose.yml) `milvus-standalone-docker-compose.yml` directly or with the following command, and save it as `docker-compose.yml`.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
```


## Start Milvus

```shell
$ sudo docker-compose up -d
```

```text
Docker Compose is now in the Docker CLI, try `docker compose up`
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```


Check the status of the containers.
```
$ sudo docker-compose ps
```

After Milvus standalone starts, three running docker containers appear including two dependencies and one Milvus service. 
```
      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp,:::19530->19530/tcp
```

## Stop Milvus

To stop Milvus standalone, run:
```
sudo docker-compose down
```

To delete data after stopping Milvus, run:
```
sudo rm -rf  volumes
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
