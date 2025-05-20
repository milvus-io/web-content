---
id: deploy_pulsar.md
title: Configure Message Storage with Docker Compose or Helm
related_key: 'Pulsar, storage'
summary: Learn how to configure message storage with Docker Compose or Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configure Message Storage with Docker Compose or Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus uses Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. Pulsar is the default message storage system. This topic introduces how to configure message storage with Docker Compose or Helm.</p>
<p>You can configure Pulsar with <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> or on K8s and configure Kafka on K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configure Pulsar with Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configure Pulsar</h3><p>To configure Pulsar with Docker Compose, provide your values for the <code translate="no">pulsar</code> section in the <code translate="no">milvus.yaml</code> file on the milvus/configs path.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>See <a href="/docs/v2.4.x/configure_pulsar.md">Pulsar-related configurations</a> for more information.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Run Milvus</h3><p>Run the following command to start Milvus that uses the Pulsar configurations.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Configurations only take effect after Milvus starts. See <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Start Milvus</a> for more information.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Configure Pulsar with Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>For Milvus clusters on K8s, you can configure Pulsar in the same command that starts Milvus. Alternatively, you can configure Pulsar using the <code translate="no">values.yml</code> file on the /charts/milvus path in the <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> repository before you start Milvus.</p>
<p>For details on how to configure Milvus using Helm, refer to <a href="/docs/v2.4.x/configure-helm.md">Configure Milvus with Helm Charts</a>. For details on Pulsar-related configuration items, refer to <a href="/docs/v2.4.x/configure_pulsar.md">Pulsar-related configurations</a>.
|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Using the YAML file</h3><ol>
<li>Configure the <code translate="no">externalConfigFiles</code> section in the <code translate="no">values.yaml</code> file.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>After configuring the preceding sections and saving the <code translate="no">values.yaml</code> file, run the following command to install Milvus which uses the Pulsar configurations.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Configure Kafka with Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>For Milvus clusters on K8s, you can configure Kafka in the same command that starts Milvus. Alternatively, you can configure Kafka using the <code translate="no">values.yml</code> file on the /charts/milvus path in the <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> repository before you start Milvus.</p>
<p>For details on how to configure Milvus using Helm, refer to <a href="/docs/v2.4.x/configure-helm.md">Configure Milvus with Helm Charts</a>. For details on Pulsar-related configuration items, refer to <a href="/docs/v2.4.x/configure_pulsar.md">Pulsar-related configurations</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Using the YAML file</h3><ol>
<li>Configure the <code translate="no">externalConfigFiles</code> section in the <code translate="no">values.yaml</code> file if you want to use Kafka as the message storage system.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>After configuring the preceding sections and saving the <code translate="no">values.yaml</code> file, run the following command to install Milvus that uses the Kafka configurations.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Configure RocksMQ with Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone uses RocksMQ as the default message storage. For detailed steps on how to configure Milvus with Helm, refer to <a href="/docs/v2.4.x/configure-helm.md">Configure Milvus with Helm Charts</a>. For details on RocksMQ-related configuration items, refer to <a href="/docs/v2.4.x/configure_rocksmq.md">RocksMQ-related configurations</a>.</p>
<ul>
<li><p>If you start Milvus with RocksMQ and want to change its settings, you can run <code translate="no">helm upgrade -f</code> with the changed settings in the following YAML file.</p></li>
<li><p>If you have installed Milvus standalone using Helm with a message store other than RocksMQ and want to change it back to RocksMQ, run <code translate="no">helm upgrade -f</code> with the following YAML file after you have flushed all collections and stopped Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>Changing the message store is not recommended. If this is you want to do this, stop all DDL operations, then call the FlushAll API to flush all collections, and finally stop Milvus in the end before you actually change the message store.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Configure NATS with Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS is an experimental message store alternative to RocksMQ. For detailed steps on how to configure Milvus with Helm, refer to <a href="/docs/v2.4.x/configure-helm.md">Configure Milvus with Helm Charts</a>. For details on RocksMQ-related configuration items, refer to <a href="/docs/v2.4.x/configure_natsmq.md">NATS-related configurations</a>.</p>
<ul>
<li><p>If you start Milvus with NATS and want to change its settings, you can run <code translate="no">helm upgrade -f</code> with the changed settings in the following YAML file.</p></li>
<li><p>If you have installed Milvus standalone with a message store other than NATS and want to change it to NATS, run <code translate="no">helm upgrade -f</code> with the following YAML file after you flushed all collections and stopped Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Choose between RocksMQ and NATS?</strong></p>
<p>RockMQ uses CGO to interact with RocksDB and manages the memory by itself, while the pure-GO NATS embedded in the Milvus installation delegates its memory management to Go’s garbage collector (GC).</p>
<p>In the scenario where the data packet is smaller than 64 kb, RocksDB outperforms in terms of memory usage, CPU usage, and response time. On the other hand, if the data packet is greater than 64 kb, NATS excels in terms of response time with sufficient memory and ideal GC scheduling.</p>
<p>Currently, you are advised to use NATS only for experiments.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Learn how to configure other Milvus dependencies with Docker Compose or Helm:</p>
<ul>
<li><a href="/docs/v2.4.x/deploy_s3.md">Configure Object Storage with Docker Compose or Helm</a></li>
<li><a href="/docs/v2.4.x/deploy_etcd.md">Configure Meta Storage with Docker Compose or Helm</a></li>
</ul>
