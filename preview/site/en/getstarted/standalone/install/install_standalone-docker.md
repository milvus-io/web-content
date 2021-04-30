---
id: install_standalone-docker.md
label: Install with Docker Compose
order: 0
group: install_standalone 
---

# Install Milvus Standalone

## Install Milvus Standalone with Docker Compose

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

3. Pull the docker image:

```
$ sudo docker pull milvusdb/milvus:2.0.0-d043021-19c36b
```

4. Download **docker-compose.standalone.yml** and save it as **docker-compose.yml**:

```
$ mkdir -p /home/$USER/milvus
$ chome/$USER/milvus
$ wget <https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/docker-compose.standalone.yml> -O docker-compose.yml
$ wget <https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/.env>
```
> The **.env** file contains all variable definitions used in **docker-compose.yml**.

| Variable      | Definition |
| ----------- | ----------- |
| TARGET_DOCKER_IMAGE         | Docker image.       |
| ETCD_ADDRESS   | 	Etcd service address.        |
| MINIO_ADDRESS      | MinIO service address.       |
| MASTER_ADDRESS   | Master service address.        |
| PROXY_SERVICE_ADDRESS      | Proxy service address.       |
| INDEX_SERVICE_ADDRESS   | Index service address.        |
| DATA_SERVICE_ADDRESS      | Data service address.       |
| QUERY_SERVICE_ADDRESS   | Query service address.        |

<br/>

5. Start Docker Compose.

Ensure that you set the docker image in TARGET_DOCKER_IMAGE to the image defined in the **.env** file.

```
TARGET_DOCKER_IMAGE=milvusdb/milvus:2.0.0-d043021-19c36b
```

Start Docker Compose:

```
$ sudo docker-compose up -d 
```
Stop Docker Compose:

```
$ sudo docker-compose down
```
> If Docker Compose boots successfully, three running docker containers will appear (two infrastructure services and one Milvus service):

```
$ docker ps 

CONTAINER ID | IMAGE | COMMAND | CREATED |STATUS | PORTS | NAMES
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
|3baf500700ff | milvusdb/milvus:2.0.0-d043021-19c36b | "/tini -- /milvus-di…" | 3 seconds ago | Up 1 second |   0.0.0.0:19530->19530/tcp | deploy_standalone_1|
|d807e1e1e9b1 |  quay.io/coreos/etcd:latest | "etcd -listen-peer-u…" |  6 seconds ago  | Up 4 seconds  |  0.0.0.0:2379-2380->2379-2380/tcp, 0.0.0.0:4001->4001/tcp  |deploy_etcd_1 |
| a103514a959a  | minio/minio:RELEASE.2020-12-03T00-03-10Z |   "/usr/bin/docker-ent…"  | 6 seconds ago  | Up 4 seconds (health: starting) |  0.0.0.0:9000->9000/tcp    | deploy_minio_1|

```
