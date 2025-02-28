---
id: deploy-cdc-server.md
order: 2
summary: 本指南提供了部署 Milvus-CDC 服务器的分步流程。
title: 部署 CDC 服务器
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">部署 CDC 服务器<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供部署 Milvus-CDC 服务器的分步流程。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在部署 Milvus-CDC 服务器之前，确保满足以下条件：</p>
<ul>
<li><p><strong>Milvus 实例</strong>：源 Milvus 和至少一个目标 Milvus 都应部署并操作符。</p>
<ul>
<li><p>源和目标 Milvus 版本都必须是 2.3.2 或更高，最好是 2.4.x。我们建议源和目标 Milvus 使用相同的版本，以确保兼容性。</p></li>
<li><p>将目标 Milvus 的<code translate="no">common.ttMsgEnabled</code> 配置设为<code translate="no">false</code> 。</p></li>
<li><p>用不同的元和消息存储设置配置源和目标 Milvus，以防止冲突。例如，避免在多个 Milvus 实例中使用相同的 etcd 和 rootPath 配置，以及相同的 Pulsar 服务和<code translate="no">chanNamePrefix</code> 。</p></li>
</ul></li>
<li><p><strong>元存储</strong>：为 Milvus-CDC 元存储准备一个 etcd 或 MySQL 数据库。</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">步骤<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">获取 Milvus-CDC 配置文件</h3><p>克隆<a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDC repo</a>并导航到<code translate="no">milvus-cdc/server/configs</code> 目录，访问<code translate="no">cdc.yaml</code> 配置文件。</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">编辑配置文件</h3><p>在<code translate="no">milvus-cdc/server/configs</code> 目录中，修改<code translate="no">cdc.yaml</code> 文件，自定义与 Milvus-CDC 元存储和源 Milvus 的连接详细信息相关的配置。</p>
<ul>
<li><p><strong>元存储配置</strong>：</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>:Milvus-CDC 的元存储类型。可能的值是<code translate="no">etcd</code> 或<code translate="no">mysql</code> 。</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>:用于连接 Milvus-CDC etcd 的地址。如果<code translate="no">storeType</code> 设置为<code translate="no">etcd</code> 则必须使用。</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>:Milvus-CDC 服务器 MySQL 数据库的连接地址。如果<code translate="no">storeType</code> 设置为<code translate="no">mysql</code> ，则为必填项。</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>:Milvus-CDC 元存储的根路径。此配置可实现多租户，允许多个 CDC 服务使用相同的 etcd 或 MySQL 实例，同时通过不同的根路径实现隔离。</p></li>
</ul>
<p>配置示例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>源 Milvus 配置：</strong></p>
<p>指定源 Milvus 的连接详细信息，包括 etcd 和消息存储，以便在 Milvus-CDC 服务器和源 Milvus 之间建立连接。</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>:用于连接源 Milvus 的 etcd 的地址。更多信息，请参阅<a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd 相关配置</a>。</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>:源 Milvus 在 etcd 中存储数据的键的根前缀。根据 Milvus 实例的部署方法，该值可能会有所不同：</p>
<ul>
<li><p><strong>Helm</strong>或<strong>Docker Compose</strong>：默认为<code translate="no">by-dev</code> 。</p></li>
<li><p><strong>操作符</strong>：默认为<code translate="no">&lt;release_name&gt;</code> 。</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>：Milvus 复制通道名称，在 milvus.yaml 文件中为<code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> 。</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>:源 Milvus 的 Pulsar 配置。如果源 Milvus 使用 Kafka 进行消息存储，请移除所有与 Pulsar 相关的配置。更多信息，请参阅<a href="https://milvus.io/docs/configure_pulsar.md">Pulsar 相关配置</a>。</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>:Milvus 源的 Kafka 地址。如果源 Milvus 使用 Kafka 进行消息存储，则取消注释此配置。</p></li>
</ul></li>
</ul>
<p>配置示例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">编译 Milvus-CDC 服务器</h3><p>保存<code translate="no">cdc.yaml</code> 文件后，导航到<code translate="no">milvus-cdc</code> 目录，运行以下命令之一编译服务器：</p>
<ul>
<li><p>对于二进制文件</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>对于 Docker 映像</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>对于 Docker 映像，将编译后的文件挂载到容器内的<code translate="no">/app/server/configs/cdc.yaml</code> 。</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">启动服务器</h3><ul>
<li><p>使用二进制文件</p>
<p>导航到包含<code translate="no">milvus-cdc</code> 二进制文件的目录和包含<code translate="no">cdc.yaml</code> 文件的<code translate="no">configs</code> 目录，然后启动服务器：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用 Docker Compose：</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
