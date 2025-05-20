---
id: deploy_pulsar.md
title: 使用 Docker Compose 或 Helm 配置消息存储
related_key: 'Pulsar, storage'
summary: 了解如何使用 Docker Compose 或 Helm 配置消息存储。
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">使用 Docker Compose 或 Helm 配置消息存储<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 Pulsar 或 Kafka 管理最近更改的日志、输出流日志并提供日志订阅。Pulsar 是默认的消息存储系统。本主题介绍如何使用 Docker Compose 或 Helm 配置消息存储。</p>
<p>你可以使用<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上配置 Pulsar，并在 K8s 上配置 Kafka。</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 配置 Pulsar<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1.配置 Pulsar</h3><p>要使用 Docker Compose 配置 Pulsar，请在 milvus/configs 路径下的<code translate="no">milvus.yaml</code> 文件中提供<code translate="no">pulsar</code> 部分的值。</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>更多信息，请参阅<a href="/docs/zh/v2.4.x/configure_pulsar.md">Pulsar 相关配置</a>。</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2.运行 Milvus</h3><p>运行以下命令启动使用 Pulsar 配置的 Milvus。</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置仅在 Milvus 启动后生效。更多信息，请参阅<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">启动 Milvus</a>。</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">使用 Helm 配置 Pulsar<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 K8s 上的 Milvus 群集，可以在启动 Milvus 的同一命令中配置 Pulsar。或者，你也可以在启动<a href="https://github.com/milvus-io/milvus-helm">Milvus</a>之前，使用<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>资源库中 /charts/milvus 路径下的<code translate="no">values.yml</code> 文件配置 Pulsar。</p>
<p>有关如何使用 Helm<a href="/docs/zh/v2.4.x/configure-helm.md">配置</a> Milvus<a href="/docs/zh/v2.4.x/configure-helm.md">的</a>详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm 图表配置 Milvus</a>。有关 Pulsar 相关配置项的详情，请参阅<a href="/docs/zh/v2.4.x/configure_pulsar.md">Pulsar 相关配置</a>。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 文件</h3><ol>
<li>在<code translate="no">values.yaml</code> 文件中配置<code translate="no">externalConfigFiles</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    pulsar:
      address: localhost <span class="hljs-comment"># Address of pulsar</span>
      port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of Pulsar</span>
      webport: <span class="hljs-number">80</span> <span class="hljs-comment"># Web port of pulsar, if you connect direcly without proxy, should use 8080</span>
      maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
      tenant: public
      namespace: default    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>配置前述部分并保存<code translate="no">values.yaml</code> 文件后，运行以下命令安装使用 Pulsar 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">使用 Helm 配置 Kafka<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 K8s 上的 Milvus 集群，可以在启动 Milvus 的同一命令中配置 Kafka。或者，你也可以在启动<a href="https://github.com/milvus-io/milvus-helm">Milvus</a>之前，使用 /charts/milvus 路径下<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>资源库中的<code translate="no">values.yml</code> 文件配置 Kafka。</p>
<p>有关如何使用 Helm<a href="/docs/zh/v2.4.x/configure-helm.md">配置</a> Milvus<a href="/docs/zh/v2.4.x/configure-helm.md">的</a>详情，请参阅《<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm 图表配置 Milvus</a>》。有关 Pulsar 相关配置项的详情，请参阅<a href="/docs/zh/v2.4.x/configure_pulsar.md">Pulsar 相关配置</a>。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 文件</h3><ol>
<li>如果要使用 Kafka 作为消息存储系统，请配置<code translate="no">values.yaml</code> 文件中的<code translate="no">externalConfigFiles</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>配置完前面的部分并保存<code translate="no">values.yaml</code> 文件后，运行以下命令安装使用 Kafka 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">使用 Helm 配置 RocksMQ<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 单机版使用 RocksMQ 作为默认消息存储。关于如何用 Helm<a href="/docs/zh/v2.4.x/configure-helm.md">配置</a> Milvus 的详细步骤，请参阅《<a href="/docs/zh/v2.4.x/configure-helm.md">用 Helm 图表配置 Milvus</a>》。有关 RocksMQ 相关配置项的详情，请参阅<a href="/docs/zh/v2.4.x/configure_rocksmq.md">RocksMQ 相关配置</a>。</p>
<ul>
<li><p>如果你使用 RocksMQ 启动 Milvus 并想更改其设置，你可以使用以下 YAML 文件中更改后的设置运行<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>如果你已经使用 Helm 独立安装了 Milvus，并使用了 RocksMQ 以外的消息存储空间，但又想把它改回 RocksMQ，可以在刷新所有集合并停止 Milvus 后，使用下面的 YAML 文件运行<code translate="no">helm upgrade -f</code> 。</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    rocksmq:
      <span class="hljs-comment"># The path where the message is stored in rocksmq</span>
      <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/rdb_data</span>
      path: /var/lib/milvus/rdb_data
      lrucacheratio: <span class="hljs-number">0.06</span> <span class="hljs-comment"># rocksdb cache memory ratio</span>
      rocksmqPageSize: <span class="hljs-number">67108864</span> <span class="hljs-comment"># 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq</span>
      retentionTimeInMinutes: <span class="hljs-number">4320</span> <span class="hljs-comment"># 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.</span>
      retentionSizeInMB: <span class="hljs-number">8192</span> <span class="hljs-comment"># 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.</span>
      compactionInterval: <span class="hljs-number">86400</span> <span class="hljs-comment"># 1 day, trigger rocksdb compaction every day to remove deleted data</span>
      <span class="hljs-comment"># compaction compression type, only support use 0,7.</span>
      <span class="hljs-comment"># 0 means not compress, 7 will use zstd</span>
      <span class="hljs-comment"># len of types means num of rocksdb level.</span>
      compressionTypes: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]    
<button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>不建议更改消息存储。如果你想这样做，请先停止所有 DDL 操作，然后调用 FlushAll API 冲洗所有集合，最后在实际更改消息存储之前停止 Milvus。</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">用 Helm 配置 NATS<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS 是 RocksMQ 的实验性消息存储替代品。关于如何用 Helm<a href="/docs/zh/v2.4.x/configure-helm.md">配置</a> Milvus 的详细步骤，请参阅《<a href="/docs/zh/v2.4.x/configure-helm.md">用 Helm 图表配置 Milvus</a>》。有关 RocksMQ 相关配置项的详情，请参阅<a href="/docs/zh/v2.4.x/configure_natsmq.md">NATS 相关配置</a>。</p>
<ul>
<li><p>如果使用 NATS 启动 Milvus 并想更改其设置，可以使用以下 YAML 文件中更改后的设置运行<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>如果你用 NATS 以外的消息存储独立安装了 Milvus，并想将其更改为 NATS，可在刷新所有集合并停止 Milvus 后，用以下 YAML 文件运行<code translate="no">helm upgrade -f</code> 。</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    mq:
      <span class="hljs-built_in">type</span>: natsmq
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>在 RocksMQ 和 NATS 之间做选择？</strong></p>
<p>RockMQ 使用 CGO 与 RocksDB 交互并自行管理内存，而 Milvus 安装中的纯 Go NATS 则将内存管理委托给 Go 的垃圾收集器（GC）。</p>
<p>在数据包小于 64 kb 的情况下，RocksDB 在内存使用率、CPU 使用率和响应时间方面都更胜一筹。另一方面，如果数据包大于 64 kb，则 NATS 在内存充足、GC 调度理想的情况下，响应时间更胜一筹。</p>
<p>目前，我们建议您仅在实验中使用 NATS。</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>了解如何使用 Docker Compose 或 Helm 配置 Milvus 的其他依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/deploy_s3.md">使用 Docker Compose 或 Helm 配置对象存储</a></li>
<li><a href="/docs/zh/v2.4.x/deploy_etcd.md">使用 Docker Compose 或 Helm 配置元存储</a></li>
</ul>
