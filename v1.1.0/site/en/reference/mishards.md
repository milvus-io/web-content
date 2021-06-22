---
id: mishards.md
---

# Mishards: Cluster Sharding Middleware

## What is Mishards

Mishards is a Milvus cluster sharding middleware developed in Python. It handles request forwarding, read-write separation, horizontal and dynamic scaling, providing you with additional capabilities in terms of expanded memory and computing power.

## How Mishards works

Mishards cascades a request from upstream down to its sub-modules splitting the upstream request, and then collects and returns the results of the sub-services to upstream.

![proxy](../../../assets/mishards.png)

## Target scenarios

| Scenarios | Concurrency | Latency | Data scale | Suitable for Mishards |
| ----------------------- | ----------- | ---- | -------- | ----------------- |
| 1                       | Low        | Low | Medium / Small | No               |
| 2                       | High       | Low | Medium / Small | No               |
| 3                       | Low        | High | Large   | Yes              |
| 4                       | Low        | Low | Large  | Yes              |
| 5                       | High       | Low | Large  | Yes              |

Mishards is suitable for scenarios with large data scale. So how to judge the size of the data scale? There is no standard answer to this question because it depends on the hardware resources used in the actual production environment. Here is a simple way to determine the size of the data scale:

1. If you do not care about latency, you can assume that a scenario has a large data scale when its data size is larger than the available capacity of the hard disk on a single server. For example, the calculation time of the server to batch process 5000 query requests is greater than the time to load data from the hard disk to the memory, so the available hard disk is the criteria for determining the data scale.

2. Otherwise, you can assume that a scenario has a large data scale when its data size is larger than the available memory on a single server.

## Mishards-based cluster solution

### Overall architecture

![structure](../../../assets/mishards_structure.png)

### Main components

- Service discovery: Obtains the service addresses of the read and write nodes.
- Load balancer
- **Mishards node: A stateless and scalable node.**
- Milvus write node: An unscalable node. To avoid failure at a single node, you need to deploy a high availability strategy.
- Milvus read node: A stateful and scalable node.
- Shared storage service: Milvus read and write nodes share data through the shared storage service. Available options include NAS and NFS.
- Metadata service: Milvus supports only MySQL in the production environment.

## Mishards configurations

### Global configurations

| Parameter | Required | Type    | Default  | Description                                                         |
| ------------- | -------- | ------- | ------- | ------------------------------------------------------------ |
| `Debug`       | No      | Boolean | `True`  | Whether to enable the debug mode. Debug mode only affects the log level for now.<ul><li><code>True</code>: Enable debug mode.</li><li><code>False</code>: Disable debug mode.</li></ul> |
| `TIMEZONE`    | No      | String  | `UTC`   | The time zone.                                                |
| `SERVER_PORT` | No      | Integer | `19530` | Defines the service port of Mishards. |
| `WOSERVER`    | Yes | String  | ` `     | The address of Milvus write node. Format: `tcp://127.0.0.1:19530` |

### Metadata

Metadata records the structure information of the underlying data. In a distributed system, Milvus write nodes are the only producers of metadata; Mishards nodes, Milvus write nodes, and Milvus read nodes are consumers of Metadata. 

<div class="alert note">
Milvus only supports MySQL or SQLite as its Metadata backend for now. In a distributed system, the storage backend for metadata can only be MySQL.
</div>


| Parameter | Required | Type    | Default  | Description                                                         |
| ------------------------------ | -------- | ------- | ------- | ------------------------------------------------------------ |
| `SQLALCHEMY_DATABASE_URI`      | Yes | String  | ` `     | Defines the address of the metadata storage database. The format conforms to the RFC-738-style, for example,  `mysql+pymysql://root:root@127.0.0.1:3306/milvus?charset=utf8mb4`. |
| `SQL_ECHO`                     | No      | Boolean | `False` | Whether to print detailed SQL queries.<ul><li><code>True</code>: Prints detailed SQL queries.</li><li><code>False</code>: Does not print detailed SQL queries.</li></ul> |

### Service discovery

Service discovery provides Mishards with the address information of all Milvus read and write nodes. Mishards defines the relevant service discovery API `IServiceRegistryProvider`, and provides extensions in extension mode. Milvus provides two extensions by default: **KubernetesProvider** corresponds to Kubernetes cluster; **StaticProvider** corresponds to static configuration. You can customize your own service discovery extension based on these two extensions.

![discovery](../../../assets/mishards_discovery.png)

| Parameter | Required | Type    | Default  | Description                                                         |
| ------------------------------------- | -------- | ------- | -------- | ------------------------------------------------------------ |
| `DISCOVERY_STATIC_HOSTS`              | No       | List    | `[]`     | When `DISCOVERY_CLASS_NAME` is `static`, defines the service address list. The addresses in the list are separated by comma, for example, `192.168.1.188,192.168.1.190`. |
| `DISCOVERY_STATIC_PORT`               | No       | Integer | `19530`  | When `DISCOVERY_CLASS_NAME` is `static`, defines the service address listening port. |
| `DISCOVERY_PLUGIN_PATH`               | No       | String  | ` `      | The search path to the customized service discovery extension (uses the system search path by default).   |
| `DISCOVERY_CLASS_NAME`                | No       | String  | `static` | In the extension search path, searches for the class based on its name and instantiates it. At present, the system provides two classes: `static` (default) and `kubernetes`. |
| `DISCOVERY_KUBERNETES_NAMESPACE`      | No       | String  | ` `      | When `DISCOVERY_CLASS_NAME` is `kubernetes`, defines the namespace of the Milvus cluster. |
| `DISCOVERY_KUBERNETES_IN_CLUSTER`     | No       | Boolean | `False`  | When `DISCOVERY_CLASS_NAME` is `kubernetes`, decides whether to run service discovery in the cluster. |
| `DISCOVERY_KUBERNETES_POLL_INTERVAL`  | No       | Integer | `5`      | When `DISCOVERY_CLASS_NAME` is `kubernetes`, defines the monitoring period of the service discovery (unit: seconds). |
| `DISCOVERY_KUBERNETES_POD_PATT`       | No       | String  | ` `      | When `DISCOVERY_CLASS_NAME` is `kubernetes`, matches the regular expression to the name of Milvus Pod. |
| `DISCOVERY_KUBERNETES_LABEL_SELECTOR` | No       | String  | ` `      | When `SD_PROVIDER` is `kubernetes`, matches the label of Milvus Pod, for example, `tier=ro-servers`. |

### Chain tracking

A distributed systems often distributes requests to multiple internal services. To facilitate troubleshooting, we need to track the call chains of internal services. The higher the complexity of the system, the more obvious the benefits of a viable chain tracking system. We choose [OpenTracing](https://opentracing.io/docs/), which is a distributed tracing standard that has entered CNCF. It provides APIs independent of the platform or vendor to facilitate implementation of a chain tracking system.

Mishards defines the chain tracking APIs and provides extensions in extension mode. It provides Jaeger-based extensions for now.

<div class="alert note">
See <a href="https://www.jaegertracing.io/docs/1.18/getting-started/">Jaeger Doc</a> to learn how to integrate Jaeger.
</div>


| Parameter | Required | Type    | Default  | Description                                                         |
| ----------------------- | -------- | ------- | ---------- | ------------------------------------------------------------ |
| `TRACER_PLUGIN_PATH`    | No       | String  | ` `        | The search path to the custom chain tracking extension (uses the system search path by default).  |
| `TRACER_CLASS_NAME`     | No       | String  | ` `        | In the extension search path, searches for the class based on its name and instantiates it. Currently, only `Jaeger` is supported, but it is **not used by default**. |
| `TRACING_SERVICE_NAME`  | No       | String  | `mishards` | When `TRACING_CLASS_NAME` is [`Jaeger`](https://www.jaegertracing.io/docs/1.14/), specifies the chain tracking service. |
| `TRACING_SAMPLER_TYPE`  | No       | String  | `const`    | When `TRACING_CLASS_NAME` is `Jaeger`, specifies the [sampling type](https://www.jaegertracing.io/docs/1.14/sampling/) for chain tracking. |
| `TRACING_SAMPLER_PARAM` | No       | Integer | `1`         | When `TRACING_CLASS_NAME` is `Jaeger`, specifies the [sampling frequency](https://www.jaegertracing.io/docs/1.14/sampling/) for chain tracking. |
| `TRACING_LOG_PAYLOAD`   | No       | Boolean | `False`    | When `TRACING_CLASS_NAME` is `Jaeger`, decides whether to capture the payload for the chain tracking. |

### Log

The log files of the cluster service are distributed on different nodes, so you need to log in to the relevant server to obtain log files for troubleshooting. It is recommended that you use [ELK](https://www.elastic.co/what-is/elk-stack) log analysis component to collaboratively analyze multiple log files and troubleshoot problems.

| Parameter | Required | Type    | Default  | Description                                                         |
| ----------- | -------- | ------ | --------------- | ------------------------------------------------------ |
| `LOG_LEVEL` | No       | String | `DEBUG`         | Log levels: `DEBUG` < `INFO` < `WARNING` < `ERROR`. |
| `LOG_PATH`  | No       | String | `/tmp/mishards` | Path to log files.              |
| `LOG_NAME`  | No       | String | `logfile`       | Name of log files.                        |

### Route

Mishards obtains the addresses of Milvus read and write nodes from the service discovery center and obtains the underlying Metadata information through the Metadata service. Its routing strategy is to consume these materials. As shown in the figure, there are 10 data segments (s1, s2, s3, …, s10). We select a consistent hash routing strategy based on the name of data segments (`FileNameHashRingBased`). Mishards routes requests about s1, s4, s6, and s9 to the **Milvus 1** node, routes requests about s2, s3, and s5  to the **Milvus 2** node, and routes requests about s7, s8, and s10 to the **Milvus 3** node.

Mishards defines APIs related to routing strategies and provides relevant extensions. You can customize your routes according to your business scenario and based on the default consistent hash routing extension.

![router](../../../assets/mishards_router.png)

| Parameter | Required | Type    | Default  | Description                                                         |
| -------------------- | -------- | ------ | ------------------------- | ------------------------------------------------------------ |
| `ROUTER_CLASS_NAME`  | No       | String | `FileBasedHashRingRouter` | In the extension search path, searches for the routed class based on the class name and instantiates it. Currently, the system only provides a consistent hash routing strategy `FileBasedHashRingRouter` based on the data segment name. |
| `ROUTER_PLUGIN_PATH` | No       | String | ` `                       | The search path to the custom routing extensions (uses the system search path by default). |


## Mishards examples

### Start Mishards

#### Prerequisites

- Milvus properly installed
- Python 3.6 or higher

#### Start a Milvus and Mishards instance

Follow these steps to start a Milvus instance and Mishards service on a machine:

1. Clone the Milvus repository to your local machine:

   ```shell
   $ git clone https://github.com/milvus-io/milvus -b 1.1
   ```

2. Install dependencies for Mishards:

   ```shell
   $ cd milvus/shards
   $ pip install -r requirements.txt
   ```

3. Start the Milvus service:

   - If your Docker version is earlier than v19.03:

   ```shell
   $ sudo docker  run --runtime=nvidia --rm -d -p 19530:19530 -v /tmp/milvus/db:/var/lib/milvus/db milvusdb/milvus:1.1.0-gpu-d050721-5e559c
   ```

   - Otherwise:

   ```shell
   $ sudo docker run --gpus all --rm -d -p 19530:19530 -v /tmp/milvus/db:/var/lib/milvus/db milvusdb/milvus:1.1.0-gpu-d050721-5e559c
   ```

4. Change the directory permission:

   ```shell
   $ sudo chown -R $USER:$USER /tmp/milvus
   ```

5. Configure the environment variable for Mishards:

   ```shell
   $ cp mishards/.env.example mishards/.env
   ```

6. Start the Mishards service:

   ```shell
   $ python mishards/main.py
   ```

### Start Mishards with docker-compose

`all_in_one` uses a Docker container to start 2 Milvus instances, 1 Mishards middleware instance, and 1 Jaeger chain tracking instance.

1. Install [Docker Compose](https://docs.docker.com/compose/install/).

2. Clone the Milvus repository to the local machine:

   ```shell
   $ git clone https://github.com/milvus-io/milvus -b 1.1
   $ cd milvus/shards
   ```

3. Start all services:

   ```shell
   $ make deploy
   ```

4. Check the service status:

   ```shell
   $ make probe_deploy
   Pass ==> Pass: Connected
   Fail ==> Error: Fail connecting to server on 127.0.0.1:19530. Timeout
   ```

To view the service chain, open [Jaeger Page](http://127.0.0.1:16686/) in your browser.

![jaegerui](../../../assets/jaegerui.png)

![jaegertraces](../../../assets/jaegertraces.png)

To clean up all services:

```shell
$ make clean_deploy
```

## Deploy Mishards cluster in Kubernetes

### Prerequisites

- Kubernetes 1.10 or later
- Helm 2.12.0 or later

<div class="alert note">
See <a href="https://helm.sh/docs/">Helm Docs</a> for more information about using Helm.
</div>


### Install Mishards

1. Add the Helm Chart repository:

   ```bash
   $ helm repo add stable https://kubernetes-charts.storage.googleapis.com
   ```

2. Install dependent libraries for Chart:
   
   ```bash
   $ git clone https://github.com/milvus-io/milvus-helm.git
   $ cd milvus-helm/charts/milvus
   $ helm dep update
   ```

3. Deploy Mishards:
   
   ```bash
   $ helm install --set cluster.enabled=true --set persistence.enabled=true milvus-release  .
   ```

4. Check the deployment status:
   
   ```bash
   $ helm list -f "milvus-release"
   ```

### Uninstall Mishards

- Use Helm v2.x to uninstall Mishards:

   ```bash
   $ helm delete milvus-release
   ```

- Use Helm v3.x to uninstall Mishards:

   ```bash
   $ helm uninstall milvus-release
   ```

### Upgrade from standalone service to Mishards cluster

[Milvus-Helm](https://github.com/milvus-io/milvus-helm) supports upgrading from standalone service to Mishards cluster.

1. Deploy a standalone version of Milvus:

   ```bash
   $ helm install --set persistence.enabled=true milvus-release .
   ```

2. Upgrade to Mishards cluster:

   ```bash
   $ helm upgrade --set cluster.enabled=true --set persistence.enabled=true milvus-release .
   ```

### Notes

Mishards is based on shared storage, so the Kubernetes cluster must have available Persistent Volumes (PV). Also, ensure that the PV can be used by multiple pods at the same time. You can enable Persistent Volumes by setting `persistence.enabled`.

1. In order to share data, the PV access mode must be set to `ReadOnlyMany` or `ReadWriteMany`.
2. Choose a file storage system:
   - If your cluster is deployed on AWS, use [Elastic File System (EFS)](https://aws.amazon.com/efs/).
   - If your cluster is deployed on Azure, use [Azure File Storage (AFS)](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv).

<div class="alert note">
<ul>
<li>See <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">Persistent Volumes</a> for more information about applying for and managing Persistent Volume.</li>
<li>See <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes">Access Modes</a> for more information about the access modes of Persistent Volume.</li>
</ul>
</div>


### Usage

You can find all parameters supported by Milvus-Helm at [Milvus Helm Charts](https://github.com/milvus-io/milvus-helm).

1. Configure a cluster with multiple read nodes and multiple Mishards sharding middleware.

   Usually, we configure multiple nodes to ensure service availability and increase throughput rate. In the following example, the Mishards cluster includes 2 sharding middleware, 2 read nodes, and 1 write node.

   ```bash
   $ helm install
      --set cluster.enabled=true     \
      --set persistence.enabled=true \
      --set mishards.replicas=2       \
      --set readonly.replicas=2       \
      milvus-release .
   ```

   Here, the number of replica sets is controlled by `mishards.replicas` and `readonly.replicas`. Their default values are 1.

   <div class="alert note">
   Currently, the write nodes in the Mishards cluster cannot be expanded.
   </div>

2. Use an externally configured MySQL cluster as the Metadata database.

   Sometimes the support for external MySQL is needed to cooperate with local deployment. Although Milvus-Helm's internal MySQL service does not guarantee high availability, you can increase availability through an external MySQL cluster. The following example shows the deployment based on external MySQL.

   ```bash
   $ helm install
      --set cluster.enabled=true             \
      --set persistence.enabled=true         \
      --set mysql.enabled=false              \
      --set externalMysql.enabled=true       \
      --set externalMysql.ip=192.168.1.xx    \
      --set externalMysql.port=3306          \
      --set externalMysql.user=root          \
      --set externalMysql.password=root      \
      --set externalMysql.database=milvus    \
      milvus-release .
   ```

   When using external MySQL, you do not need the built-in MySQL service of Helm. Therefore, you can disable the built-in MySQL service of Helm by setting `mysql.enabled=false`.

3. The read and write nodes of Milvus have different configurations.

   To reasonably use resources, we hope that the read nodes and the write nodes have different configurations. In the following example, we configure a read node with 16 GB memory and a write node with 8 GB memory.

   ```bash
   $ helm install
      --set cluster.enabled=true                     \
      --set persistence.enabled=true                 \
      --set cache.cpuCacheCapacity=8                 \
      --set readonly.cache.cpuCacheCapacity=16       \
      milvus-release .
   ```

   <div class="alert note">
   <ul>
   <li>See <a href="milvus_config.md">Milvus configuration</a> for more Milvus configuration parameters.</li>
   <li>See <a href="https://github.com/milvus-io/milvus-helm/blob/master/README.md">Milvus Helm Charts</a> for more Milvus-Helm configuration parameters.</li>
   </ul>
   </div>

4. Configure the GPU resources.

   The use of GPU can effectively improve Milvus performance. In the following example, we allow write nodes to use GPU resources by setting `gpu.enabled=true` and prevent the read nodes from using GPU resources by setting `readonly.gpu.enabled=false`.

   ```bash
   $ helm install
      --set cluster.enabled=true             \
      --set persistence.enabled=true         \
      --set gpu.enabled=true                 \
      --set readonly.gpu.enabled=false       \
      milvus-release .
   ```

   <div class="alert note">
   See <a href="https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/">Schedule GPUs</a> for GPU resource management and scheduling in Kubernetes.
   </div>
