---
id: message_storage_operator.md
title: 使用 Milvus Operator 配置信息存储
related_key: "minio, s3, storage, etcd, pulsar"
summary: 了解如何使用 Milvus Operator 配置信息存储。
---

<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 配置消息存储<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 RocksMQ、Pulsar 或 Kafka 管理最近更改的日志、输出流日志并提供日志订阅。本主题介绍如何在使用 Milvus Operator 安装 Milvus 时配置消息存储依赖关系。有关详细信息，请参阅<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Milvus Operator 存储</a>库中的<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">配置消息存储与 Milvus Operator</a>。</p>
<p>本主题假定您已部署 Milvus Operator。</p>
<div class="alert note">有关详细信息，请参阅<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">部署 Milvus Operator</a>。 </div>
<p>您需要指定使用 Milvus Operator 启动 Milvus 群集的配置文件。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您只需编辑<code translate="no">milvus_cluster_default.yaml</code> 中的代码模板，即可配置第三方依赖关系。以下各节将分别介绍如何配置对象存储、etcd 和 Pulsar。</p>
<h2 id="Before-you-begin" class="common-anchor-header">开始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>下表显示了 Milvus 独立模式和集群模式是否支持 RocksMQ、NATS、Pulsar 和 Kafka。</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">脉冲星</th><th style="text-align:center">卡夫卡</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">独立模式</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">集群模式</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>指定消息存储还有其他限制：</p>
<ul>
<li>一个 Milvus 实例只支持一个消息存储。不过，我们仍然向后兼容为一个实例设置多个消息存储空间。优先级如下：<ul>
<li>独立模式：  RocksMQ（默认） &gt; Pulsar &gt; Kafka</li>
<li>集群模式：脉冲星（默认） &gt; 卡夫卡</li>
<li>为了向后兼容，2.3 中引入的 Nats 不参与这些优先级规则。</li>
</ul></li>
<li>Milvus 系统运行时，消息存储不能更改。</li>
<li>仅支持 Kafka 2.x 或 3.x 版本。</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">配置 RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ 是 Milvus 单机版的默认消息存储。</p>
<div class="alert note">
<p>目前，你只能通过 Milvus Operator 将 RocksMQ 配置为 Milvus 单机版的消息存储。</p>
</div>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了一个 RocksMQ 服务。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">配置 NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS 是 NATS 的替代消息存储。</p>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了 NATS 服务。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: <span class="hljs-string">&#x27;natsmq&#x27;</span>
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
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>将消息存储从 RocksMQ 迁移到 NATS 的步骤如下：</p>
<ol>
<li><p>停止所有 DDL 操作。</p></li>
<li><p>调用 FlushAll API，然后在 API 调用执行完毕后停止 Milvus。</p></li>
<li><p>将<code translate="no">msgStreamType</code> 更改为<code translate="no">natsmq</code> ，并对<code translate="no">spec.dependencies.natsmq</code> 中的 NATS 设置进行必要更改。</p></li>
<li><p>再次启动 Milvus 并检查是否</p>
<ul>
<li>日志中是否存在读作<code translate="no">mqType=natsmq</code> 的日志条目。</li>
<li><code translate="no">spec.dependencies.natsmq.server.storeDir</code> 中指定的目录中是否有名为<code translate="no">jetstream</code> 的目录。</li>
</ul></li>
<li><p>(可选）备份并清理 RocksMQ 存储目录中的数据文件。</p></li>
</ol>
<div class="alert note">
<p><strong>在 RocksMQ 和 NATS 之间做选择？</strong></p>
<p>RockMQ 使用 CGO 与 RocksDB 交互，并自行管理内存，而 Milvus 安装中的纯 Go NATS 则将内存管理委托给 Go 的垃圾收集器（GC）。</p>
<p>在数据包小于 64 kb 的情况下，RocksDB 在内存使用率、CPU 使用率和响应时间方面都更胜一筹。另一方面，如果数据包大于 64 kb，则 NATS 在内存充足、GC 调度理想的情况下，响应时间更胜一筹。</p>
<p>目前，建议您仅在实验中使用 NATS。</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">配置 Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar 管理最近更改的日志、输出流日志并提供日志订阅。Milvus 独立版和 Milvus 集群都支持为消息存储配置 Pulsar。不过，使用 Milvus Operator，只能将 Pulsar 配置为 Milvus 群集的消息存储。添加<code translate="no">spec.dependencies.pulsar</code> 下的必填字段以配置 Pulsar。</p>
<p><code translate="no">pulsar</code> 支持 和 。<code translate="no">external</code> <code translate="no">inCluster</code></p>
<h3 id="External-Pulsar" class="common-anchor-header">外部 Pulsar</h3><p><code translate="no">external</code> 表示使用外部 Pulsar 服务。 用于配置外部 Pulsar 服务的字段包括：</p>
<ul>
<li><code translate="no">external</code>:  <code translate="no">true</code> 值表示 Milvus 使用外部 Pulsar 服务。</li>
<li><code translate="no">endpoints</code>:Pulsar 的端点。</li>
</ul>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了外部 Pulsar 服务。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    pulsar: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>
  components: {}
  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">内部 Pulsar</h3><p><code translate="no">inCluster</code> 表示 Milvus 集群启动时，集群中的 Pulsar 服务会自动启动。</p>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了内部 Pulsar 服务。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: <span class="hljs-literal">false</span>
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              <span class="hljs-built_in">limit</span>:
                cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>
              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">该示例指定了 Pulsar 各组件的副本数量、Pulsar BookKeeper 的计算资源和其他配置。</div>
<div class="alert note">在<a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a> 中查找配置内部 Pulsar 服务的完整配置项。如上例所示，根据需要在<code translate="no">pulsar.inCluster.values</code> 下添加配置项。</div>
<p>假设配置文件名为<code translate="no">milvuscluster.yaml</code> ，运行以下命令应用配置。</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">配置 Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar 是 Milvus 集群的默认消息存储。如果要使用 Kafka，请添加可选字段<code translate="no">msgStreamType</code> 以配置 Kafka。</p>
<p><code translate="no">kafka</code> 支持 和 。<code translate="no">external</code> <code translate="no">inCluster</code></p>
<h3 id="External-Kafka" class="common-anchor-header">外部 Kafka</h3><p><code translate="no">external</code> 表示使用外部 Kafka 服务。</p>
<p>用于配置外部 Kafka 服务的字段包括</p>
<ul>
<li><code translate="no">external</code>:<code translate="no">true</code> 值表示 Milvus 使用外部 Kafka 服务。</li>
<li><code translate="no">brokerList</code>:要向其发送消息的代理列表。</li>
</ul>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了外部 Kafka 服务。</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      securityProtocol: PLAINTEXT
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      saslMechanisms: PLAIN
      saslUsername: <span class="hljs-string">&quot;&quot;</span>
      saslPassword: <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      external: true
      brokerList: 
        - <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        - <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>操作员 v0.8.5 或更高版本支持 SASL 配置。</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">内部 Kafka</h3><p><code translate="no">inCluster</code> 表示当 Milvus 集群启动时，集群中的 Kafka 服务会自动启动。</p>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了内部 Kafka 服务。</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      inCluster: 
        values: {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://artifacthub.io/packages/helm/bitnami/kafka">在此处</a>查找配置内部 Kafka 服务<a href="https://artifacthub.io/packages/helm/bitnami/kafka">的</a>完整配置项。根据需要在<code translate="no">kafka.inCluster.values</code> 下添加配置项。</p>
<p>假设配置文件名为<code translate="no">milvuscluster.yaml</code> ，运行以下命令应用配置。</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>了解如何使用 Milvus Operator 配置其他 Milvus 依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/object_storage_operator.md">使用 Milvus Operator 配置对象存储</a></li>
<li><a href="/docs/zh/v2.4.x/meta_storage_operator.md">使用 Milvus Operator 配置元存储</a></li>
</ul>
