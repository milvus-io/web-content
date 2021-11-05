---
id: configuration_standalone-advanced.md
label: 高级配置
order: 1
group: standalone_sys
---

# 单机版 Milvus 系统配置

单机版 Milvus 通过系统配置项控制系统运行。所有配置项均可在服务启动前在相应配置文件中手动设置。各配置项的默认值可以直接投入使用。

<div class="alert note">
所有参数设置在 Milvus 启动时生效。
</div>

<div class="tab-wrapper"><a href="configuration_standalone-basic.md" class=''>基本配置</a><a href="configuration_standalone-advanced.md" class='active '>高级配置</a></div>


Milvus 集群的管理员需要通过更改以下配置项维护集群运行。

## etcd 配置

etcd 是系统的元数据引擎，支撑底层的元数据存储与访问。你可以在 [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml) 中设置这些参数。

> 如使用默认 [**milvus-standalone-docker-compose.yml**](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-standalone-docker-compose.yml) 文件启动第三方服务，则无需修改该部分参数。

<table id="etcd">
<thead>
  <tr>     
    <th class="width20">参数</th>     
    <th class="width70">说明</th>     
    <th class="width10">默认值</th>   
  </tr>
</thead>
<tbody>
	<tr>
		<td><code>etcd.endpoints</code></td>
		<td><details>
       <summary>etcd 节点</summary>
       <li>环境变量：<code>ETCD_ENDPOINTS</code></li>
       <li>etcd 监听请求的有效地址，用于访问 etcd 服务。</li>
       <li>Milvus 启动时，优先从环境变量 <code>ETCD_ENDPOINTS</code> 获得有效地址。</li>
       <li>对于已存在的 etcd 集群，请将该参数改为当前 etcd 节点。</li>
      </details></td>
		<td>localhost:2379</td>
	</tr>
	<tr>
		<td><code>etcd.rootPath</code></td>
		<td><details>
       <summary>etcd 存储数据的 key 前缀</summary>
       <li>Milvus 向 etcd 存储数据使用的 key 前缀</li>
       <li>在使用 Milvus 一段时间后，请不要轻易更改这个参数。更改之后您将无法正确访问之前的数据。</li>
       <li>推荐在初次使用 Milvus 前修改这个参数。</li>
       <li>对于已存在的 etcd 服务，请为 Milvus 设置一个容易辨析的 key 前缀，推荐使用 "<b>milvus-root</b>"。</li>
      </details></td>
		<td>"by-dev"</td>
	</tr>
</tbody>
</table>


## MinIO/S3 配置

Milvus 支持 MinIO 以及 Amazon S3 作为系统的存储引擎，支撑日志文件与索引文件的持久化存储。由于 MinIO 兼容 S3，你可以将以下配置项直接修改为你的 S3 服务配置。你可以在 [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml) 中设置这些参数。

> 如使用默认 [**milvus-standalone-docker-compose.yml**](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-standalone-docker-compose.yml) 文件启动第三方服务，则无需修改该部分参数。

<table id="minio">
<thead>
  <tr>     
    <th class="width20">参数</th>     
    <th class="width70">说明</th>     
    <th class="width10">默认值</th>   
  </tr>
</thead>
<tbody>
  <tr>
		<td><code>minio.address</code></td>
		<td><details>
       <summary>MinIO/S3 监听请求的 IP 地址</summary>
       <li>环境变量：<code>MINIO_ADDRESS</code></li>
       <li>MinIO/S3 监听请求的 IP 地址，用于访问 MinIO/S3 服务。<code>minio.address</code> 和 <code>minio.port</code> 共同组成 MinIO/S3 监听请求的有效地址。</li>
       <li>Milvus 启动时，优先从环境变量 <code>MINIO_ADDRESS</code> 获得有效 IP 地址。</li>
      <li>默认值适用于 MinIO/S3 与 Milvus 运行于相同的网络中。</li>
      <li>Milvus 2.0 使用非安全模式访问 MinIO。后续版本将支持安全模式访问 MinIO。</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>minio.port</code></td>
		<td><details>
       <summary>MinIO/S3 监听请求的端口</summary>
       <li>环境变量：<code>MINIO_ADDRESS</code></li>
       <li>MinIO/S3 监听请求的端口，用于访问 MinIO 服务。<code>minio.address</code> 和 <code>minio.port</code> 共同组成 MinIO/S3 监听请求的有效地址。</li>
       <li>Milvus 启动时，优先从环境变量 <code>MINIO_ADDRESS</code> 获得有效端口。</li>
      </details></td>
		<td>9000</td>
	</tr>
  <tr>
		<td><code>minio.AccessKeyID</code></td>
		<td><details>
       <summary>MinIO/S3 给用户授权访问的密钥 ID</summary>
       <li>环境变量：<code>MINIO_ACCESS_KEY</code></li>
       <li>MinIO/S3 颁发给用户的访问服务所需要的密钥 ID，用于做身份认证。<code>minio.accessKeyID</code> 与 <code>minio.secretAccessKey</code> 共同用于访问 MinIO/S3 服务。</li>
       <li>此配置项需要与 MinIO/S3 服务启动时所需要的环境变量 <code>MINIO_ACCESS_KEY</code>相同。默认值适用于使用默认 <b>docker-compose.yml</b> 文件启动 Milvus。</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
  <tr>
		<td><code>minio.secretAccessKey</code></td>
		<td><details>
       <summary>MinIO/S3 加密字符串</summary>
       <li>环境变量：<code>MINIO_SECRET_KEY</code></li>
       <li>用于加密签名字符串和服务器端验证签名字符串的密钥，须严格保密，仅用户与 MinIO/S3 服务端可见。</li>
       <li>此配置项需要与 MinIO/S3 服务启动时所需要的环境变量 <code>MINIO_SECRET_KEY</code>相同。默认值适用于使用默认 <b>docker-compose.yml</b> 文件启动 Milvus。</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
</tbody>
</table>




## 服务地址配置

服务地址配置用于设定 Milvus 服务监听请求的 IP 地址和端口。你可以在 [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml) 中设置这些参数。

<table id="server_address">
<thead>
  <tr>     
    <th class="width20">参数</th>     
    <th class="width70">说明</th>     
    <th class="width10">默认值</th>   
  </tr>
</thead>
<tbody>
  <tr>
		<td><code>proxy.port</code></td>
		<td>监听 Milvus 的 TCP 端口</td>
		<td>19530</td>
	</tr>
</tbody>
</table>


## 系统行为配置

系统行为配置用于设定 Milvus 运行时的系统行为。你可以在 [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml)、 [**root_coord.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/root_coord.yaml)、[**data_coord.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/data_coord.yaml)、以及 [**data_node.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/data_node.yaml) 中设置这些参数。

<table id="system_behavior">
<thead>
  <tr>     
    <th class="width20">参数</th>     
    <th class="width70">说明</th>     
    <th class="width10">默认值</th>   
  </tr>
</thead>
<tbody>
  <tr>
		<td><code>queryNode.gracefulTime</code></td>
		<td><details>
       <summary>新 insert 数据可被搜索的最短时间</summary>
       <li>单位：ms</li>
       <li>当 <code>search</code> 消息时间戳早于 query node 系统时间的时候，Milvus 直接执行此查询命令。</li>
       <li>当 <code>search</code> 消息时间戳晚于 query node 系统时间的时候，Milvus 会等待 query node 系统时间推进直至两者时间差小于该参数后执行此查询命令。</li>
      </details></td>
		<td>1000</td>
	</tr>
  <tr>
		<td><code>rootcoord.minSegmentSizeToEnableIndex</code></td>
		<td><details>
       <summary>Milvus 允许为 segment 创建索引的最小行数</summary>
       <li>该参数用于设定 Milvus 允许为 segment 创建索引的日志文件最小行数。</li>
      </details></td>
		<td>1024</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.maxSize</code></td>
		<td><details>
       <summary>单个 segment 的大小上限</summary>
       <li>单位：MB</li>
       <li><code>datacoord.segment.maxSize</code> 和 <code>datacoord.segment.sealProportion</code> 共同决定一个 segment 可以关闭（sealed）的条件。通常情况下，一个已关闭的（sealed）segment 文件大小大约在 384 至 512 MB 之间。</li>
      </details></td>
		<td>512</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.sealProportion</code></td>
		<td><details>
       <summary>单个 segment 的真实数据大小占 <code>datacoord.segment.maxSize</code>的最大比例</summary>
       <li>当单个 segment 的真实数据大小与 <code>datacoord.segment.maxSize</code>的比例超过该参数，此 segment 可以被关闭（sealed）。</li>
      </details></td>
		<td>0.75</td>
	</tr>
  <tr>
		<td><code>dataNode.flush.insertBufSize</code></td>
		<td><details>
       <summary>内存中一个 segment 缓存 insert 数据的最大行数</summary>
       <li>当内存中缓存的数据超过这个值时，data node 会将所有的缓存数据打包为 1 组 binlog 文件存储在 MinIO/S3 上。</li>
       <li>设定该参数与数据量大小相关。如果设定过小，系统会频繁将少量数据存盘，如果设定过大，系统的内存需求会增高。</li>
       <li>默认值适用于大多数场景。对于 128 维浮点型向量，32000 行数据会生成约 16 MB 的 binlog 文件。</li>
      </details></td>
		<td>32000</td>
	</tr>
</tbody>
</table>
