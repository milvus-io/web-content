---
id: mishards.md
---

# [Mishards](https://github.com/milvus-io/milvus/tree/master/shards) - Milvus 集群分片中间件

## Mishards 是什么

Mishards 是一个用 Python 开发的 Milvus 集群分片中间件，其内部处理请求转发、读写分离、水平扩展和动态扩容，为用户提供内存和算力可以扩容的 Milvus 实例。

## Mishards 简单工作原理

Mishards 负责将上游请求拆分，并路由到内部各细分子服务，最后将子服务结果汇总，返回给上游。

![proxy](https://milvus.io/static/c00635f52b4cbe35ebd6bb9ce5af1db2/302a4/image_04.png)

## Mishards 目标场景

| 场景分类   | 并发度 | 延迟   | 数据规模 | 是否适合 Mishards |
| ---------- | -----  | ------ | -------- | ----------------- |
| 1          | 低     | 低     | 中等、小 | 否　              |
| 2          | 高     | 低     | 中等、小 | 否　              |
| 3          | 低     | 高     | 大　　　 | 是　              |
| 4          | 低     | 低     | 大　　　 | 是　              |
| 5          | 高     | 低     | 大　　　 | 是　              |

Mishards 适合大数据规模下的搜索场景。那么，怎么判断数据规模的大小呢？这个问题没有标准答案，因为这取决于实际生产环境中使用的硬件资源。这里提供一个简单的判断数据规模的思路：

1. 如果你不在意延迟，当数据规模大于单台服务器上硬盘的可用容量时，你可以认为这种场景具有大的数据规模。例如，每次批处理 5000 条查询请求，服务端计算时间已经大于数据从硬盘到内存的加载时间，此时将硬盘的可用容量作为判断数据规模的标准。

2. 如果你在意延迟，当数据规模大于单台服务器上的可用内存时，你也可以认为这种场景具有大的数据规模。

## 基于 Mishards 的集群方案

### 总体架构

![structure](https://milvus.io/static/c1dcc5824580dd51b8beb81bbf4cb00d/302a4/image_02.png)

### 主要构件

- 服务发现：获取读写节点的服务地址。
- 负载均衡器
- **Mishards 节点：无状态, 可扩容。**
- Milvus 写节点：单节点，不可扩容。为避免单点故障，需为该节点部署高可用 HA 方案。
- Milvus 读节点：有状态，可扩容。
- 共享存储服务：Milvus 读写节点通过共享存储服务共享数据，可选择 NAS 或 NFS。
- 元数据服务：目前只支持 MySQL。生产环境下需要部署 MySQL 高可用方案。

## Mishards 配置

### 全局配置

| 参数          | 是否必填 | 类型    | 默认值  | 说明                                                         |
| ------------- | -------- | ------- | ------- | ------------------------------------------------------------ |
| `Debug`       | 否       | Boolean | `True`  | 选择是否启用 Debug 工作模式。目前 Debug 模式只会影响日志级别。<ul><li><code>True</code>：启用 Debug 工作模式。</li><li><code>False</code>：不启用 Debug 工作模式。</li></ul>           |
| `TIMEZONE`    | 否       | String  | `UTC`   | 时区                                                         |
| `SERVER_PORT` | 否       | Integer | `19530` | 定义 Mishards 的服务端口。                                   |
| `WOSERVER`    | 是  | String  | ` `     | Milvus 写节点地址，参考格式：`tcp://127.0.0.1:19530` |

### 元数据

元数据记录了底层数据的组织结构信息。在分布式系统中，Milvus 写节点是元数据唯一的生产者，而 Mishards 节点、Milvus 写节点和读节点都是元数据的消费者。目前版本的 Milvus 只支持 MySQL 和 SQLite 作为元数据的存储后端。

<div class="alert note">
在分布式系统中，元数据的存储后端只能是 MySQL。
</div>

| 参数                           | 是否必填 | 类型    | 默认值  | 说明                                                         |
| ------------------------------ | -------- | ------- | ------- | ------------------------------------------------------------ |
| `SQLALCHEMY_DATABASE_URI`      | 是  | String  | ` `     | 定义元数据存储的数据库地址，格式标准为 RFC-738-style。例如：`mysql+pymysql://root:root@127.0.0.1:3306/milvus?charset=utf8mb4`。 |
| `SQL_ECHO`                     | 否       | Boolean | `False` | 是否打印 SQL 详细语句。<ul><li><code>True</code>：打印 SQL 详细语句。</li><li><code>False</code>：不打印 SQL 详细语句。</li></ul>                                  |

### 服务发现

服务发现为 Mishards 提供所有 Milvus 读写节点的地址信息。Mishards 定义了相关的服务发现接口 `IServiceRegistryProvider`，并通过插件模式提供了扩展的可能性。目前默认提供了两种插件：**KubernetesProvider** 对应 Kubernetes 集群；**StaticProvider** 对应静态配置。你可以仿照这两种插件的实现，定制自己的服务发现插件。

![discovery](https://milvus.io/static/63f649314b297b1fe0b07d2c8c0ba8ea/302a4/image_07.png)

| 参数                                  | 是否必填 | 类型    | 默认值   | 说明                                                         |
| ------------------------------------- | -------- | ------- | -------- | ------------------------------------------------------------ |
| `DISCOVERY_STATIC_HOSTS`              | 否       | List    | `[]`     | `DISCOVERY_CLASS_NAME` 为 `static` 时，定义服务地址列表。列表中的地址以逗号隔开，例如 `192.168.1.188,192.168.1.190`。 |
| `DISCOVERY_STATIC_PORT`               | 否       | Integer | `19530`  | `DISCOVERY_CLASS_NAME` 为 `static` 时，定义服务地址监听端口。 |
| `DISCOVERY_PLUGIN_PATH`               | 否       | String  | ` `      | 用户自定义服务发现插件的搜索路径，默认使用系统搜索路径。     |
| `DISCOVERY_CLASS_NAME`                | 否       | String  | `static` | 在插件搜索路径下，根据类名搜索类，并将其实例化。目前系统提供 `static` 和 `kubernetes` 两种类，默认使用 `static`。 |
| `DISCOVERY_KUBERNETES_NAMESPACE`      | 否       | String  | ` `      | `DISCOVERY_CLASS_NAME` 为 `kubernetes`时，定义 Milvus 集群的 namespace。 |
| `DISCOVERY_KUBERNETES_IN_CLUSTER`     | 否       | Boolean | `False`  | `DISCOVERY_CLASS_NAME` 为 `kubernetes` 时，选择服务发现是否在集群中运行。 |
| `DISCOVERY_KUBERNETES_POLL_INTERVAL`  | 否       | Integer | `5`      | `DISCOVERY_CLASS_NAME` 为 `kubernetes` 时，定义服务发现监听周期（单位：秒）。 |
| `DISCOVERY_KUBERNETES_POD_PATT`       | 否       | String  | ` `      | `DISCOVERY_CLASS_NAME` 为 `kubernetes` 时，匹配 Milvus Pod 名字的正则表达式。 |
| `DISCOVERY_KUBERNETES_LABEL_SELECTOR` | 否       | String  | ` `      | `SD_PROVIDER` 为 `kubernetes` 时，匹配 Milvus Pod 的标签，例如：`tier=ro-servers`。 |

### 链路追踪

分布式系统错综复杂，请求往往会分发给内部多个服务调用。为了方便问题的定位，我们需要跟踪内部的服务调用链。系统的复杂性越高，一个可行的链路追踪系统带来的好处就越明显。我们选择了已进入 CNCF 的 [OpenTracing](https://opentracing.io/docs/) 分布式追踪标准，[OpenTracing](https://opentracing.io/docs/) 提供与平台和厂商无关的 API，便于开发人员实现链路跟踪系统。

Mishards 定义了相关的链路追踪接口，并通过插件模式提供了扩展的可能性。目前默认提供了基于 Jaeger 的插件。

<div class="alert note">
查阅 <a href="https://www.jaegertracing.io/docs/1.18/getting-started/">Jaeger Doc</a> 了解怎样集成 Jaeger。
</div>

| 参数                    | 是否必填 | 类型    | 默认值     | 说明                                                         |
| ----------------------- | -------- | ------- | ---------- | ------------------------------------------------------------ |
| `TRACER_PLUGIN_PATH`    | 否       | String  | ` `        | 用户自定义链路追踪插件的搜索路径，默认使用系统搜索路径。     |
| `TRACER_CLASS_NAME`     | 否       | String  | ` `        | 在插件搜索路径下，根据类名搜索类，并将其实例化。目前只支持 `Jaeger`，**默认不使用**。 |
| `TRACING_SERVICE_NAME`  | 否       | String  | `mishards` | `TRACING_CLASS_NAME` 为 [`Jaeger`](https://www.jaegertracing.io/docs/1.14/) 时，链路追踪的服务。 |
| `TRACING_SAMPLER_TYPE`  | 否       | String  | `const`    | `TRACING_CLASS_NAME` 为 `Jaeger` 时，链路追踪的 [采样类型](https://www.jaegertracing.io/docs/1.14/sampling/)。 |
| `TRACING_SAMPLER_PARAM` | 否       | Integer | `1`        | `TRACING_CLASS_NAME` 为 `Jaeger` 时，链路追踪的 [采样频率](https://www.jaegertracing.io/docs/1.14/sampling/)。 |
| `TRACING_LOG_PAYLOAD`   | 否       | Boolean | `False`    | `TRACING_CLASS_NAME` 为 `Jaeger` 时，链路追踪是否采集 Payload。 |

### 日志

集群服务日志文件分布在不同的服务节点上，因此你在排查问题需要登录到相关服务器获取日志。建议使用 [ELK](https://www.elastic.co/what-is/elk-stack) 日志分析组件来协同分析多个日志文件、排查问题。

| 参数        | 是否必填 | 类型   | 默认值          | 说明                                                         |
| ----------- | -------- | ------ | --------------- | ------------------------------------------------------------ |
| `LOG_LEVEL` | 否       | String | `DEBUG`         | 日志记录级别：`DEBUG` < `INFO` < `WARNING` < `ERROR`。 |
| `LOG_PATH`  | 否       | String | `/tmp/mishards` | 日志文件的存储路径                                               |
| `LOG_NAME`  | 否       | String | `logfile`       | 日志文件的名称                                                 |

### 路由

Mishards 从服务发现中心获取 Milvus 读写节点的地址信息，通过元数据服务获取底层数据元信息。Mishards 的路由策略就是对于这些素材的一种消费。如图有 10 个数据段（s1, s2, s3, …, s10）。现在选择基于数据段名字的一致性哈希路由策略（`FileNameHashRingBased`），Mishards 会将涉及 s1、s4、s6、s9 数据段的请求路由到 Milvus 1 节点，将涉及 s2、s3、s5 数据段的请求路由到 Milvus 2 节点，将涉及 s7、s8、s10 数据段的请求路由到 Milvus 3 节点。

Mishards 定义了路由策略相关的接口，并通过插件提供扩展。你可以仿照默认的一致性哈希路由插件，根据自己的业务特点定制个性化路由。

![router](https://milvus.io/static/84435d8783b7f4454b3667544ba2a4cf/302a4/image_08.png)

| 参数                     | 是否必填 | 类型   | 默认值                    | 说明                                                         |
| ------------------------ | -------- | ------ | ------------------------- | ------------------------------------------------------------ |
| `ROUTER_CLASS_NAME`      | 否       | String | `FileBasedHashRingRouter` | 在插件搜索路径下，根据类名搜索路由的类，并将其实例化。目前系统只提供了基于数据段名字的一致性哈希路由策略 `FileBasedHashRingRouter`。 |
| `ROUTER_PLUGIN_PATH`     | 否       | String | ` `                       | 用户自定义路由插件的搜索路径，默认使用系统搜索路径。         |


## Mishards 简单示例

### 启动示例

#### 前提条件

- 安装 Milvus
- Python 版本 3.6 及以上

#### 启动 Milvus 和 Mishards 实例

请按照以下步骤在单机上启动单个 Milvus 实例和 Mishards 服务：

1. 将 Milvus 仓库复制到本地：

   ```shell
   git clone https://github.com/milvus-io/milvus
   ```

2. 安装 Mishards 的依赖库：

   ```shell
   $ cd milvus/shards
   $ pip install -r requirements.txt
   ```

3. 启动 Milvus 服务：

   - 如果 Docker 版本低于 v19.03，运行如下命令：

   ```shell
   $ sudo docker  run --runtime=nvidia --rm -d -p 19530:19530 -v /tmp/milvus/db:/var/lib/milvus/db milvusdb/milvus:0.10.0-gpu-d061620-5f3c00
   ```

   - 否则，运行如下命令：

   ```shell
   $ sudo docker run --gpus all --rm -d -p 19530:19530 -v /tmp/milvus/db:/var/lib/milvus/db milvusdb/milvus:0.10.0-gpu-d061620-5f3c00
   ```

4. 更改目录权限：

   ```shell
   $ sudo chown -R $USER:$USER /tmp/milvus
   ```

5. 配置 Mishards 环境变量：

   ```shell
   $ cp mishards/.env.example mishards/.env
   ```

6. 启动 Mishards 服务：

   ```shell
   $ python mishards/main.py
   ```

### 使用 docker-compose 启动示例

`all_in_one` 使用 Docker 容器启动 2 个 Milvus 实例、1 个 Mishards 中间件实例和 1 个 Jaeger 链路追踪实例。

1. 安装 [Docker Compose](https://docs.docker.com/compose/install/)。

2. 将 Milvus 仓库复制到本地：

   ```shell
   $ git clone https://github.com/milvus-io/milvus
   $ cd milvus/shards
   ```

3. 启动所有服务：

   ```shell
   $ make deploy
   ```

4. 检查确认服务状态：

   ```shell
   $ make probe_deploy
   Pass ==> Pass: Connected
   Fail ==> Error: Fail connecting to server on 127.0.0.1:19530. Timeout
   ```

若要查看服务踪迹，使用浏览器打开 [Jaeger 页面](http://127.0.0.1:16686/)。

![jaegerui](../../../assets/jaegerui.png)

![jaegertraces](../../../assets/jaegertraces.png)

若要清理所有服务，请使用如下命令：

```shell
$ make clean_deploy
```

## 在 Kubernetes 中部署 Mishards 集群

### 安装前提

- Kubernetes 版本 1.10 及以上
- Helm 版本 2.12.0 及以上

<div class="alert note">
关于 Helm 的使用请参考 <a href="https://helm.sh/docs/">Helm 使用指南</a>。
</div>

### 安装流程

1. 添加 Helm Chart 仓库：

   ```bash
   $ helm repo add stable https://kubernetes-charts.storage.googleapis.com
   ```

2. 安装 Chart 依赖：
   
   ```bash
   $ git clone https://github.com/milvus-io/milvus-helm.git
   $ cd milvus-helm
   $ helm dep update
   ```

3. 部署 Mishards：
   
   ```bash
   $ helm install --set cluster.enabled=true --set persistence.enabled=true milvus-release  .
   ```

4. 检查部署状态：
   
   ```bash
   $ helm list -f "milvus-release"
   ```

### 卸载 Mishards

- 使用 Helm v2.x 卸载 Mishards：

   ```bash
   $ helm delete milvus-release
   ```

- 使用 Helm v3.x 卸载 Mishards：

   ```bash
   $ helm uninstall milvus-release
   ```

### 从单机升级到 Mishards 集群

[Milvus-Helm](https://github.com/milvus-io/milvus-helm) 支持从单机服务升级到 Mishards 集群。

1. 部署单机 Milvus：

   ```bash
   $ helm install --set persistence.enabled=true milvus-release .
   ```

2. 升级到 Mishards 集群：

   ```bash
   $ helm upgrade --set cluster.enabled=true --set persistence.enabled=true milvus-release .
   ```

### 注意事项

Mishards 依赖共享存储，因此 Kubernetes 集群中必须有可用的 PV（Persistent Volumes）， 并且保证 PV 能够同时被多个 Pod 共同使用。这里通过 `persistence.enabled` 来开启 Persistent Volumes。

1. 为了共享数据，PV 访问模式必须被设置为 `ReadOnlyMany` 或者 `ReadWriteMany`。
2. 选择文件存储系统：
   - 如果集群部署在 AWS，可以使用 [Elastic File System (EFS)](https://aws.amazon.com/efs/)。
   - 如果集群部署在 Azure，可以使用 [Azure File Storage (AFS)](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv)。

<div class="alert note">
<ul>
<li>关于 PersistentVolume 的申请及管理，请参阅 <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">Persistent Volumes</a>。</li>
<li>关于 PersistentVolume 的访问模式，请参阅 <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes">Access Modes</a>。</li>
</ul>
</div>

### 基本案例

你可以在 [Milvus Helm Charts](https://github.com/milvus-io/milvus-helm) 找到 Milvus-Helm 支持的所有参数。

1. 配置有多个读节点和多个 Mishards 分片中间件的集群。

   我们通常配置多个节点来保证服务的可用性以及提高吞吐率。下面的例子部署的 Mishards 集群包括：2 个分片中间件、2 个读节点、1 个写节点。

   ```bash
   $ helm install
      --set cluster.enabled=true     \
      --set persistence.enabled=true \
      --set mishards.replica=2       \
      --set readonly.replica=2       \
      milvus-release .
   ```

   这里通过 `mishards.replica` 和 `readonly.replica` 控制副本集数量，默认值为 1。

   <div class="alert note">
   Mishards 集群中的写节点暂时不支持扩展。
   </div>

2. 使用外部已配置好的 MySQL 集群作为元数据数据库。

   为了配合本地部署，有些情况需要支持外部的 MySQL。Milvus-Helm 内部的 MySQL 服务不保证高可用，但你可以通过外部的 MySQL 集群来提升可用性。下面的例子就是基于外部 MySQL 的部署。

   ```bash
   $ helm install
      --set cluster.enabled=true             \
      --set persistence.enabled=true         \
      --set mysql.enabled=false              \
      --set externalMysql.enable=true        \
      --set externalMysql.ip=192.168.1.xx    \
      --set externalMysql.port=3306          \
      --set externalMysql.user=root          \
      --set externalMysql.password=root      \
      --set externalMysql.database=milvus    \
      milvus-release .
   ```

   若使用外部的 MySQL，则不再需要 Helm 内置的 MySQL 服务。这里通过 `mysql.enabled` 来关闭 Helm 内置的 MySQL 服务。

3. 读写节点的 Milvus 分别使用不同的配置。

   为了更合理地使用资源，我们希望读节点和写节点拥有不一样的配置。下面的例子配置了一个拥有 16 GB 内存的读节点和 8 GB 内存的写节点。

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
   <li>更多 Milvus 配置参数，请参阅 <a href="milvus_config.md">Milvus 服务端配置</a>。</li>
   <li>更多 Milvus-Helm 配置参数，请参阅 <a href="https://github.com/milvus-io/milvus-helm/blob/master/README.md">Milvus Helm Charts</a>。</li>
   </ul>
   </div>

4. 配置 GPU 资源。

   使用 GPU 可以有效提升 Milvus 的性能。下面的例子通过 `gpu.enabled=true` 允许写节点使用 GPU 资源，`readonly.gpu.enabled=false` 禁止读节点使用 GPU 资源。

   ```bash
   $ helm install
      --set cluster.enabled=true             \
      --set persistence.enabled=true         \
      --set gpu.enabled=true                 \
      --set readonly.gpu.enabled=false       \
      milvus-release .
   ```

   <div class="alert note">
   Kubernetes 集群中必须有可访问的 GPU 资源。关于 Kubernetes 中的 GPU 资源管理及调度，请参阅 <a href="https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/">Schedule GPUs</a>。
   </div>
