---
id: install_cluster-docker.md
title: Install Milvus Cluster
label: Install with Docker Compose
order: 0
group: cluster
---

# Install Milvus Cluster

You can install Milvus cluster with Docker Compose or on Kubernetes.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus#to-start-developing-milvus).

<div class="alert note">
Installing Milvus with Docker Compose can only be used for testing and cannot be used in production.
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Install with Docker Compose</a><a href="install_cluster-helm.md" class=''>Install on Kubernetes</a></div>


## Install Milvus Cluster


1. Download **docker-compose.yml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/ecfebff801291934a3e6c5955e53637b993ab41a/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```
> You can also [download **docker-compose.yml** on GitHub](https://raw.githubusercontent.com/milvus-io/milvus/ecfebff801291934a3e6c5955e53637b993ab41a/deployments/docker/cluster/docker-compose.yml).

<div class="alert note">
If you install your Milvus cluster with the original <b>docker-compose.yml</b> file, the data will be stored under <b>./volume</b> directory. To change the mapped directory, you can either change it directly in the <b>docker-compose.yml</b> file, or run <code>$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>

2. Start Milvus Cluster:
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

*If Milvus Cluster boots successfully, 11 running docker containers appear (three infrastructure services and eight Milvus services):*

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

<div class="alert note">
To stop Milvus Cluster, run <code>$ sudo docker-compose down</code>.


If you want to clean up data after stopping Milvus, run <code> $ sudo rm -rf  volume</code>.

</div>
