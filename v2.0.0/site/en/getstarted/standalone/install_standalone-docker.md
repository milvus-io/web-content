---
id: install_standalone-docker.md
title: Install Milvus Standalone
label: Install with Docker Compose
order: 0
group: standalone
summary: Installation instructions for the standalone version of Milvus.
---

# Install Milvus Standalone

This topic describes how to install Milvus standalone with Docker Compose or on Kubernetes. We recommend reading [Before you Begin](prerequisite-docker.md) prior to your installation. 

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_standalone-docker.md" class='active '>Install with Docker Compose</a><a href="install_standalone-helm.md" class=''>Install on Kubernetes</a></div>

## 1. Download an installation file

Run the following command to download **milvus-standalone-docker-compose.yml** and save it as **docker-compose.yml**.

```
wget https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc7/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

> You can also click [here](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc7/milvus-standalone-docker-compose.yml) to download the file.

<div class="alert note">
Data is stored in the <b>volumes</b> folder according to the default configuration in <b>milvus-standalone-docker-compose.yml</b>. To change the folder to store data, edit <b>docker-compose.yml</b> or run <code>$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>

## 2. Start Milvus

```shell
$ docker-compose up -d
```

```text
Docker Compose is now in the Docker CLI, try `docker compose up`
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

*After Milvus standalone starts, three running docker containers appear including two infrastructure services and one Milvus service.* 

```
$ sudo docker-compose ps
      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp,:::19530->19530/tcp
```

## 3. Stop Milvus

To stop Milvus standalone, run <code> $ sudo docker-compose down</code>.

To delete data after stopping Milvus, run <code> $ sudo rm -rf  volumes</code>.



<div class="alert note">
 See <a href="upgrade.md">Upgrade Milvus Using Helm Chart</a> for more information about upgrading Milvus.
</div>
