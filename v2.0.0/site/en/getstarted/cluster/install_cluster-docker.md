---
id: install_cluster-docker.md
label: Docker Compose
related_key: Docker
order: 0
group: cluster
summary: Learn how to install Milvus cluster with Docker Compose.
---

# Install Milvus Cluster

This topic describes how to install Milvus cluster with Docker Compose or on Kubernetes. 

[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

If you run into image loading errors while installing, you can [Install Milvus Offline](install_offline-docker.md).

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a></div>


## Download an installation file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-cluster-docker-compose.yml) `milvus-cluster-docker-compose.yml` directly or with the following command, and save it as `docker-compose.yml`.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-cluster-docker-compose.yml -O docker-compose.yml
```

## Configure Milvus (optional)

[Download](https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0-rc8/configs/milvus.yaml) `milvus.yaml` directly or with the following command. 

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0-rc8/configs/milvus.yaml
```

Modify the configurations to suit your needs. See [Milvus Cluster System Configurations](configuration_cluster-basic.md) for more information.

In `docker-compose.yml`, add a `volumes` section under each Milvus component, i.e. root coord, data coord, data node, query coord, query node, index coord, index node, and proxy. 

Map the local path to your `milvus.yaml` file onto the corresponding docker container paths to the configuration files `/milvus/configs/milvus.yaml` under all `volumes` sections.

```yaml
...
proxy:
    container_name: milvus-proxy
    image: milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
    command: ["milvus", "run", "proxy"]
    volumes:       # Add a volumes section.
      - /local/path/to/your/file:/milvus/configs/milvus.yaml   # Map the local path to the container path
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
      PULSAR_ADDRESS: pulsar://pulsar:6650
    ports:
      - "19530:19530"
...
```

<div class="alert note">
Data is stored in the <code>/volumes</code> folder according to the default configuration in <code>docker-compose.yml</code>. To change the folder to store data, edit <code>docker-compose.yml</code> or run <code>$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>

## Start Milvus

```Shell
$ docker-compose up -d
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
  - [Connect to Milvus server](connect.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
