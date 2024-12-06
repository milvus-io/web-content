---
id: deploy-cdc-server.md
order: 2
summary: This guide provides a step-by-step process for deploying a Milvus-CDC server.
title: Deploy CDC Server
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Deploy CDC Server<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide provides a step-by-step process for deploying a Milvus-CDC server.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensure the following conditions are met before deploying a Milvus-CDC server:</p>
<ul>
<li><p><strong>Milvus Instances</strong>: Both the source Milvus and at least one target Milvus should be deployed and operational.</p>
<ul>
<li><p>Both the source and target Milvus versions must be 2.3.2 or higher, preferably 2.4.x. We recommend uisng the same version for the source and target Milvus to ensure compatibility.</p></li>
<li><p>Set the <code translate="no">common.ttMsgEnabled</code> configuration of the target Milvus to <code translate="no">false</code>.</p></li>
<li><p>Configure the source and target Milvus with distinct meta and message storage settings to prevent conflicts. For instance, avoid using the same etcd and rootPath configurations, as well as identical Pulsar services and <code translate="no">chanNamePrefix</code> in multiple Milvus instances.</p></li>
</ul></li>
<li><p><strong>Metastore</strong>: Have an etcd or MySQL database ready for the Milvus-CDC metastore.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Steps<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Obtain the Milvus-CDC config file</h3><p>Clone the <a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDC repo</a> and navigate to the <code translate="no">milvus-cdc/server/configs</code> directory to access the <code translate="no">cdc.yaml</code> config file.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Edit the config file</h3><p>In the <code translate="no">milvus-cdc/server/configs</code> directory, modify the <code translate="no">cdc.yaml</code> file to customize configurations related to the Milvus-CDC metastore and connection details of the source Milvus.</p>
<ul>
<li><p><strong>Metastore Configuration</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Type of metastore for Milvus-CDC. Possible values are <code translate="no">etcd</code> or <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Address for connecting to the etcd of Milvus-CDC. Required if <code translate="no">storeType</code> is set to <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Connection address of the MySQL database for the Milvus-CDC server. Required if <code translate="no">storeType</code> is set to <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Root path of the Milvus-CDC metastore. This configuration enables multi-tenancy, allowing multiple CDC services to utilize the same etcd or MySQL instance while achieving isolation through different root paths.</p></li>
</ul>
<p>Example configuration:</p>
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
<li><p><strong>Source Milvus Configuration:</strong></p>
<p>Specify the connection details of the source Milvus, including etcd and message storage, to establish a connection between the Milvus-CDC server and the source Milvus.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Address for connecting to the etcd of the source Milvus. For more information, refer to <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd-related Configurations</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Root prefix of the key where the source Milvus stores data in etcd. The value may vary based on the deployment method of the Milvus instance:</p>
<ul>
<li><p><strong>Helm</strong> or <strong>Docker Compose</strong>: Defaults to <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator</strong>: Defaults to <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>: milvus replicate channel name, which is <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> in the milvus.yaml file</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Pulsar configurations for the source Milvus. If the source Milvus uses Kafka for message storage, remove all Pulsar-related configurations. For more information, refer to <a href="https://milvus.io/docs/configure_pulsar.md">Pulsar-related Configurations</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Kafka address for the source Milvus. Uncomment this configuration if the source Milvus uses Kafka for message storage.</p></li>
</ul></li>
</ul>
<p>Example configuration:</p>
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
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Compile the Milvus-CDC server</h3><p>After saving the <code translate="no">cdc.yaml</code> file, navigate to the <code translate="no">milvus-cdc</code> directory and run one of the following commands to compile the server:</p>
<ul>
<li><p>For a binary file:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>For a Docker image:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>For a Docker image, mount the compiled file to <code translate="no">/app/server/configs/cdc.yaml</code> within the container.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Start the server</h3><ul>
<li><p>Using the binary</p>
<p>Navigate to the directory containing the <code translate="no">milvus-cdc</code> binary and the <code translate="no">configs</code> directory with the <code translate="no">cdc.yaml</code> file, then start the server:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Using Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
