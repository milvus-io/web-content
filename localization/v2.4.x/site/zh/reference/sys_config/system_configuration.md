---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: 了解 Milvus 的系统配置。
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvus 系统配置核对表<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>本主题介绍 Milvus 系统配置的一般部分。</p>
<p>Milvus 维护着大量配置系统的参数。每个配置都有一个默认值，可以直接使用。您可以灵活修改这些参数，使 Milvus 更好地服务于您的应用程序。更多信息，请参阅<a href="/docs/zh/v2.4.x/configure-docker.md">配置 Milvus</a>。</p>
<div class="alert note">
在当前版本中，所有参数只有在启动 Milvus 时配置后才会生效。</div>
<h2 id="Sections" class="common-anchor-header">章节<button data-href="#Sections" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>为便于维护，Milvus 根据组件、依赖关系和一般使用情况，将配置分为 %s 个部分。</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>etcd 的相关配置，用于存储 Milvus 元数据和服务发现。</p>
<p>请参阅<a href="/docs/zh/v2.4.x/configure_etcd.md">etcd 相关配置</a>，了解该部分下每个参数的详细说明。</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_metastore.md">元存储相关配置</a>。</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>用于存储 Milvus 元数据的 tikv 的相关配置。</p>
<p>请注意，启用 TiKV 作为元存储时，仍需要使用 etcd 来发现服务。</p>
<p>当元数据大小需要更好的横向扩展性时，TiKV 是一个不错的选择。</p>
<p><a href="/docs/zh/v2.4.x/configure_tikv.md">有关</a>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_tikv.md">tikv 相关配置</a>。</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_localstorage.md">localStorage 相关配置</a>。</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>MinIO/S3/GCS 或任何其他服务的相关配置都支持 S3 API，它负责 Milvus 的数据持久性。</p>
<p>为简单起见，我们在下文中将存储服务称为 MinIO/S3。</p>
<p>本节下每个参数的详细说明请参见<a href="/docs/zh/v2.4.x/configure_minio.md">minio 相关配置</a>。</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus 支持四种 MQ：rocksmq（基于 RockDB）、natsmq（嵌入式 nats-server）、Pulsar 和 Kafka。</p>
<p>你可以通过设置 mq.type 字段来更改你的 MQ。</p>
<p>如果不将 mq.type 字段设为默认值，那么如果我们在此文件中配置了多个 mq，就需要注意启用优先级。</p>
<ol>
<li><p>独立（本地）模式：Rocksmq（默认） &gt; Natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>集群模式：  Pulsar（默认） &gt; Kafka（集群模式下不支持 rocksmq 和 natsmq）</p></li>
</ol>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_mq.md">mq 相关配置</a>。</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>pulsar 的相关配置，用于管理 Milvus 最近突变操作的日志，输出流式日志，并提供日志发布-订阅服务。</p>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_pulsar.md">pulsar 相关配置</a>。</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>如果要启用 kafka，需要对 pulsar 配置进行注释</p>
<p>kafka：</p>
<p>brokerList：</p>
<p>saslUsername：</p>
<p>saslPassword：</p>
<p>saslMechanisms：</p>
<p>securityProtocol：</p>
<p>ssl：</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout：10</p>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_rocksmq.md">rocksmq 相关配置</a>。</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmq 配置。</p>
<p>更多详情：https://docs.nats.io/running-a-nats-service/configuration</p>
<p><a href="/docs/zh/v2.4.x/configure_natsmq.md">有关</a>本节中各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_natsmq.md">natsmq 相关配置</a>。</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>rootCoord 的相关配置，用于处理数据定义语言 (DDL) 和数据控制语言 (DCL) 请求</p>
<p>有关本节中各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_rootcoord.md">rootCoord 相关配置</a>。</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>代理相关配置，用于验证客户端请求并减少返回结果。</p>
<p><a href="/docs/zh/v2.4.x/configure_proxy.md">有关</a>本节中各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_proxy.md">代理相关配置</a>。</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>queryCoord 的相关配置用于管理查询节点的拓扑和负载平衡，以及从增长网段到封存网段的切换。</p>
<p>有关本节中每个参数的详细说明，请参阅<a href="/docs/zh/v2.4.x/configure_querycoord.md">queryCoord 相关配置</a>。</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>queryNode 的相关配置，用于在向量和标量数据之间运行混合搜索。</p>
<p>有关本节中每个参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_querynode.md">查询节点相关配置</a>。</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p><a href="/docs/zh/v2.4.x/configure_indexcoord.md">有关</a>本节中每个参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_indexcoord.md">indexCoord 相关配置</a>。</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p><a href="/docs/zh/v2.4.x/configure_indexnode.md">有关</a>本节中每个参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_indexnode.md">indexNode 相关配置</a>。</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>请参阅<a href="/docs/zh/v2.4.x/configure_datacoord.md">dataCoord-related Configurations（数据</a>节点<a href="/docs/zh/v2.4.x/configure_datacoord.md">相关配置</a>），了解本节中各参数的详细说明。</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>请参阅<a href="/docs/zh/v2.4.x/configure_datanode.md">dataNode-related Configurations（数据节点相关配置</a>），了解本节下各参数的详细说明。</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>本主题介绍 Milvus 的消息通道相关配置。</p>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_msgchannel.md">msgChannel 相关配置</a>。</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>配置系统日志输出。</p>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_log.md">日志相关配置</a>。</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_grpc.md">grpc 相关配置</a>。</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>配置代理 tls 启用。</p>
<p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_tls.md">tls 相关配置</a>。</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_common.md">常用相关配置</a>。</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig，Milvus 配额和限制的配置。</p>
<p>默认情况下，我们启用</p>
<ol>
<li><p>TT 保护；</p></li>
<li><p>内存保护</p></li>
<li><p>磁盘配额保护。</p></li>
</ol>
<p>可以启用</p>
<ol>
<li><p>DML 吞吐量限制；</p></li>
<li><p>DDL、DQL qps/rps 限制；</p></li>
<li><p>DQL 队列长度/延迟保护；</p></li>
<li><p>DQL 结果速率保护；</p></li>
</ol>
<p>如有必要，也可以手动强制拒绝 RW 请求。</p>
<p><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md">有关</a>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_quotaandlimits.md">配额和限制相关配置</a>。</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>本节下各参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_trace.md">与跟踪相关的配置</a>。</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#使用 GPU 索引时，Milvus 将利用内存池来避免频繁的内存分配和删除。</p>
<p>#在这里，你可以设置内存池占用内存的大小，单位为 MB。</p>
<p>#注意，当实际内存需求超过 maxMemSize 设置的值时，Milvus 有可能崩溃。</p>
<p>#如果 initMemSize 和 MaxMemSize 都设置为零、</p>
<p>#milvus 将自动初始化 GPU 可用内存的一半、</p>
<p>#maxMemSize则为整个可用 GPU 内存。</p>
<p>本节下每个参数的详细说明，请参见<a href="/docs/zh/v2.4.x/configure_gpu.md">与 GPU 相关的配置</a>。</p>
