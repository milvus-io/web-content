---
id: install_cluster-docker.md
title: Install Milvus Cluster
label: Install with Docker Compose
order: 0
group: cluster
summary: Installation instructions for the cluster version of Milvus.
---

# Install Milvus Cluster

This topic describes how to install Milvus cluster with Docker Compose or on Kubernetes. We recommend reading [Before you Begin](prerequisite-docker.md) prior to your installation. 

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Install with Docker Compose</a><a href="install_cluster-helm.md" class=''>Install on Kubernetes</a></div>


## 1. Download an installation file


Run the following command to download **milvus-cluster-docker-compose.yml** and save it as **docker-compose.yml**.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc7/milvus-cluster-docker-compose.yml -O docker-compose.yml
```
> You can also click [here](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc7/milvus-cluster-docker-compose.yml) to download the file.

<div class="alert note">
Data is stored in the <b>volumes</b> folder according to the default configuration in <b>milvus-cluster-docker-compose.yml</b>. To change the folder to store data, edit <b>docker-compose.yml</b> or run <code>$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>

## 2. Start Milvus
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

*After Milvus cluster starts, 11 running docker containers appear including three infrastructure services and eight Milvus services.*

```
$ sudo docker ps
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
## 3. Stop Milvus

To stop Milvus cluster, run <code> $ sudo docker-compose down</code>.

To delete data after stopping Milvus, run <code> $ sudo rm -rf  volumes</code>.

<div class="alert note">
See <a href="upgrade.md">Upgrade Milvus Using Helm Chart</a> for more information about upgrading Milvus.
</div>
