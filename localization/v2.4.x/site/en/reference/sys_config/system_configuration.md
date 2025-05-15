---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Learn about the system configuration of Milvus.
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvus System Configurations Checklist<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the general sections of the system configurations in Milvus.</p>
<p>Milvus maintains a considerable number of parameters that configure the system. Each configuration has a default value, which can be used directly. You can modify these parameters flexibly so that Milvus can better serve your application. See <a href="/docs/v2.4.x/configure-docker.md">Configure Milvus</a> for more information.</p>
<div class="alert note">
In current release, all parameters take effect only after being configured at the startup of Milvus.
</div>
<h2 id="Sections" class="common-anchor-header">Sections<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>For the convenience of maintenance, Milvus classifies its configurations into %s sections based on its components, dependencies, and general usage.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Related configuration of etcd, used to store Milvus metadata & service discovery.</p>
<p>See <a href="/docs/v2.4.x/configure_etcd.md">etcd-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>See <a href="/docs/v2.4.x/configure_metastore.md">metastore-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Related configuration of tikv, used to store Milvus metadata.</p>
<p>Notice that when TiKV is enabled for metastore, you still need to have etcd for service discovery.</p>
<p>TiKV is a good option when the metadata size requires better horizontal scalability.</p>
<p>See <a href="/docs/v2.4.x/configure_tikv.md">tikv-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>See <a href="/docs/v2.4.x/configure_localstorage.md">localStorage-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>Related configuration of MinIO/S3/GCS or any other service supports S3 API, which is responsible for data persistence for Milvus.</p>
<p>We refer to the storage service as MinIO/S3 in the following description for simplicity.</p>
<p>See <a href="/docs/v2.4.x/configure_minio.md">minio-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus supports four MQ: rocksmq(based on RockDB), natsmq(embedded nats-server), Pulsar and Kafka.</p>
<p>You can change your mq by setting mq.type field.</p>
<p>If you don’t set mq.type field as default, there is a note about enabling priority if we config multiple mq in this file.</p>
<ol>
<li><p>standalone(local) mode: rocksmq(default) > natsmq > Pulsar > Kafka</p></li>
<li><p>cluster mode:  Pulsar(default) > Kafka (rocksmq and natsmq is unsupported in cluster mode)</p></li>
</ol>
<p>See <a href="/docs/v2.4.x/configure_mq.md">mq-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Related configuration of pulsar, used to manage Milvus logs of recent mutation operations, output streaming log, and provide log publish-subscribe services.</p>
<p>See <a href="/docs/v2.4.x/configure_pulsar.md">pulsar-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>If you want to enable kafka, needs to comment the pulsar configs</p>
<p>kafka:</p>
<p>brokerList:</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>See <a href="/docs/v2.4.x/configure_rocksmq.md">rocksmq-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmq configuration.</p>
<p>more detail: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>See <a href="/docs/v2.4.x/configure_natsmq.md">natsmq-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Related configuration of rootCoord, used to handle data definition language (DDL) and data control language (DCL) requests</p>
<p>See <a href="/docs/v2.4.x/configure_rootcoord.md">rootCoord-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Related configuration of proxy, used to validate client requests and reduce the returned results.</p>
<p>See <a href="/docs/v2.4.x/configure_proxy.md">proxy-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Related configuration of queryCoord, used to manage topology and load balancing for the query nodes, and handoff from growing segments to sealed segments.</p>
<p>See <a href="/docs/v2.4.x/configure_querycoord.md">queryCoord-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Related configuration of queryNode, used to run hybrid search between vector and scalar data.</p>
<p>See <a href="/docs/v2.4.x/configure_querynode.md">queryNode-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>See <a href="/docs/v2.4.x/configure_indexcoord.md">indexCoord-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>See <a href="/docs/v2.4.x/configure_indexnode.md">indexNode-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>See <a href="/docs/v2.4.x/configure_datacoord.md">dataCoord-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>See <a href="/docs/v2.4.x/configure_datanode.md">dataNode-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>This topic introduces the message channel-related configurations of Milvus.</p>
<p>See <a href="/docs/v2.4.x/configure_msgchannel.md">msgChannel-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Configures the system log output.</p>
<p>See <a href="/docs/v2.4.x/configure_log.md">log-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>See <a href="/docs/v2.4.x/configure_grpc.md">grpc-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Configure the proxy tls enable.</p>
<p>See <a href="/docs/v2.4.x/configure_tls.md">tls-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>See <a href="/docs/v2.4.x/configure_common.md">common-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, configurations of Milvus quota and limits.</p>
<p>By default, we enable:</p>
<ol>
<li><p>TT protection;</p></li>
<li><p>Memory protection.</p></li>
<li><p>Disk quota protection.</p></li>
</ol>
<p>You can enable:</p>
<ol>
<li><p>DML throughput limitation;</p></li>
<li><p>DDL, DQL qps/rps limitation;</p></li>
<li><p>DQL Queue length/latency protection;</p></li>
<li><p>DQL result rate protection;</p></li>
</ol>
<p>If necessary, you can also manually force to deny RW requests.</p>
<p>See <a href="/docs/v2.4.x/configure_quotaandlimits.md">quotaAndLimits-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>See <a href="/docs/v2.4.x/configure_trace.md">trace-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#when using GPU indexing, Milvus will utilize a memory pool to avoid frequent memory allocation and deallocation.</p>
<p>#here, you can set the size of the memory occupied by the memory pool, with the unit being MB.</p>
<p>#note that there is a possibility of Milvus crashing when the actual memory demand exceeds the value set by maxMemSize.</p>
<p>#if initMemSize and MaxMemSize both set zero,</p>
<p>#milvus will automatically initialize half of the available GPU memory,</p>
<p>#maxMemSize will the whole available GPU memory.</p>
<p>See <a href="/docs/v2.4.x/configure_gpu.md">gpu-related Configurations</a> for detailed description for each parameter under this section.</p>
