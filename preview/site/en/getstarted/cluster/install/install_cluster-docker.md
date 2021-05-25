---
id: install_cluster-docker.md
title: Install Milvus Cluster
---

# Install Milvus Cluster

## Install Milvus Cluster with Docker Compose

1. Docker version 19.03 or higher is required. Check Docker version:

```
$ sudo docker info
```

> Follow [Get Docker](https://docs.docker.com/get-docker/) to install Docker on your system.

2. Docker Compose version 1.25.1 or higher is required. Check Docker Compose version:

```
$ sudo docker-compose version
```

> See [Install Docker Compose](https://docs.docker.com/compose/install/) for Docker Compose installation guide.

3. Download **docker-compose.yml**.

```
$ mkdir -p /home/$USER/milvus
$ chome/$USER/milvus
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/distributed/docker-compose.yml
```
4. Start the infrastructure service and the Milvus service with docker-compose.

Start the infrastructure service and the Milvus service.
```
$ sudo docker-compose up -d 
```
Stop the infrastructure service and the Milvus service.
```
$ sudo docker-compose down
```
Check if the infrastructure service and the Milvus service boot successfully.
```
$ sudo docker ps
```

> If Docker Compose boots successfully, 12 running docker containers will appear (nine infrastructure services and three Milvus services):

'''
$ sudo docker ps 

CONTAINER ID | IMAGE | COMMAND | CREATED |STATUS | PORTS | NAMES
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
0f9d37d78e0c |  milvusdb/milvus:2.0.0-d043021-19c36b |      "/tini -- /milvus/bi…"  | 7 minutes ago  | Up 7 minutes |  | distributed_querynode_1
40568c5d5c40 |  milvusdb/milvus:2.0.0-d043021-19c36b |      "/tini -- /milvus/bi…"  | 7 minutes ago  | Up 7 minutes |   | distributed_indexnode_1
071124ad8e1a |  milvusdb/milvus:2.0.0-d043021-19c36b  |     "/tini -- /milvus/bi…"  | 7 minutes ago |  Up 7 minutes |    |  distributed_datanode_1
22d4786a6b22  | milvusdb/milvus:2.0.0-d043021-19c36b |      "/tini -- /milvus/bi…"  | 7 minutes ago |  Up 7 minutes       |  0.0.0.0:19530->19530/tcp, :::19530->19530/tcp  | distributed_proxynode_1
f92daa379628  | milvusdb/milvus:2.0.0-d043021-19c36b  |     "/tini -- /milvus/bi…" |  7 minutes ago |  Up 7 minutes   |   |   distributed_indexservice_1
5d592010b3aa  | milvusdb/milvus:2.0.0-d043021-19c36b |      "/tini -- /milvus/bi…" |  7 minutes ago  | Up 7 minutes |   | distributed_master_1
481bae1480ea  | milvusdb/milvus:2.0.0-d043021-19c36b |       "/tini -- /milvus/bi…" |  7 minutes ago |  Up 7 minutes  |    | distributed_queryservice_1
d87fe6b9d731 |  milvusdb/milvus:2.0.0-d043021-19c36b |      "/tini -- /milvus/bi…" |  7 minutes ago  | Up 7 minutes |    | distributed_proxyservice_1
7513e26e1ee2 |  milvusdb/milvus:2.0.0-d043021-19c36b  |     "/tini -- /milvus/bi…"  | 7 minutes ago |  Up 7 minutes  |    |  distributed_dataservice_1
75d4ff2916b7 |  minio/minio:RELEASE.2020-12-03T00-03-10Z |  "/usr/bin/docker-ent…"  | 7 minutes ago  | Up 7 minutes (healthy) |  9000/tcp |distributed_minio_1
08b81e680c82 |  quay.io/coreos/etcd:latest    |    "etcd -listen-peer-u…" |  7 minutes ago  | Up 7 minutes  | 2379-2380/tcp |distributed_etcd_1
5622c872ed3e |  apachepulsar/pulsar:latest  |   "bin/pulsar standalo…" |  7 minutes ago  | Up 7 minutes |     |     distributed_pulsar_1
'''
