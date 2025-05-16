---
id: deploy_pulsar.md
title: Docker ComposeまたはHelmでメッセージストレージを設定する
related_key: 'Pulsar, storage'
summary: Docker ComposeやHelmを使ってメッセージストレージを設定する方法を紹介します。
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Docker ComposeまたはHelmでメッセージストレージを構成する<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusはPulsarまたはKafkaを使用して、最近の変更のログを管理し、ストリームログを出力し、ログサブスクリプションを提供します。Pulsarはデフォルトのメッセージ・ストレージ・システムです。このトピックでは、Docker ComposeまたはHelmを使用してメッセージ・ストレージを設定する方法を紹介します。</p>
<p><a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>またはK8s上でPulsarを構成し、K8s上でKafkaを構成することができます。</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Docker ComposeでPulsarを構成する<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1.Pulsarの構成</h3><p>Docker ComposeでPulsarを設定するには、milvus/configパスの<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">pulsar</code> セクションに値を指定します。</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>詳細については、<a href="/docs/ja/v2.4.x/configure_pulsar.md">Pulsar関連の設定を</a>参照してください。</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2.Milvusの実行</h3><p>以下のコマンドを実行し、Pulsar設定を使用するMilvusを起動します。</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">設定はMilvusの起動後にのみ有効になります。詳細は<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvusの起動を</a>ご参照ください。</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">HelmによるPulsarの構成<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s上のMilvusクラスタの場合、Milvusの起動と同じコマンドでPulsarを設定することができます。あるいは、Milvusを起動する前に、<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>リポジトリの/charts/milvusパスにある<code translate="no">values.yml</code> ファイルを使ってPulsarを設定することもできます。</p>
<p>Helmを使用したMilvus設定方法の詳細については、<a href="/docs/ja/v2.4.x/configure-helm.md">HelmチャートによるMilvus設定を</a>ご参照ください。Pulsar関連の設定項目の詳細については、<a href="/docs/ja/v2.4.x/configure_pulsar.md">Pulsar関連の設定を</a>参照してください。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAMLファイルの使用</h3><ol>
<li><code translate="no">values.yaml</code> ファイルの<code translate="no">externalConfigFiles</code> セクションを設定します。</li>
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
<li>前述のセクションを設定し、<code translate="no">values.yaml</code> ファイルを保存した後、以下のコマンドを実行して、Pulsar設定を使用するMilvusをインストールする。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">HelmによるKafkaの構成<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s上のMilvusクラスタの場合、Milvusを起動するのと同じコマンドでKafkaを設定することができる。または、Milvusを起動する前に、<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>リポジトリの/charts/milvusパスにある<code translate="no">values.yml</code> ファイルを使用してKafkaを設定することもできます。</p>
<p>Helmを使用したMilvusの設定方法の詳細については、「<a href="/docs/ja/v2.4.x/configure-helm.md">Helmチャートを使用したMilvusの設定</a>」をご参照ください。Pulsar関連の設定項目の詳細については、<a href="/docs/ja/v2.4.x/configure_pulsar.md">Pulsar関連の設定を</a>参照してください。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAMLファイルの使用</h3><ol>
<li>メッセージ・ストレージ・システムとしてKafkaを使用する場合は、<code translate="no">values.yaml</code> ファイルの<code translate="no">externalConfigFiles</code> セクションを設定します。</li>
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
<li>前述のセクションを設定し、<code translate="no">values.yaml</code> ファイルを保存した後、以下のコマンドを実行し、Kafka設定を使用するMilvusをインストールする。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">HelmによるRocksMQの設定<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusスタンドアロンでは、デフォルトのメッセージストレージとしてRocksMQを使用します。Helmを利用したMilvusの設定方法の詳細については、「<a href="/docs/ja/v2.4.x/configure-helm.md">Helmチャートを利用したMilvusの設定</a>」をご参照ください。RocksMQ関連の設定項目については、<a href="/docs/ja/v2.4.x/configure_rocksmq.md">RocksMQ関連の設定を</a>ご参照ください。</p>
<ul>
<li><p>RocksMQでMilvusを起動し、その設定を変更したい場合は、以下のYAMLファイルで変更した設定で<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>RocksMQ以外のメッセージストアを使用してHelmを使用してMilvusをスタンドアロンでインストールし、RocksMQに戻したい場合は、全てのコレクションをフラッシュしてMilvusを停止した後に、以下のYAMLファイルを指定して<code translate="no">helm upgrade -f</code> 。</p></li>
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
<p>メッセージストアの変更は推奨しません。もしこれを行いたいのであれば、実際にメッセージストアを変更する前に、すべてのDDLオペレーションを停止し、次にFlushAll APIを呼び出してすべてのコレクションをフラッシュし、最後にMilvusを停止してください。</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">HelmでNATSを設定する<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATSはRocksMQに代わる実験的なメッセージストアです。Helmを使ったMilvusの設定方法の詳細については、<a href="/docs/ja/v2.4.x/configure-helm.md">Helm Chartsを使ったMilvusの設定を</a>参照してください。RocksMQ関連の設定項目については、<a href="/docs/ja/v2.4.x/configure_natsmq.md">NATS関連の設定を</a>参照してください。</p>
<ul>
<li><p>NATSでMilvusを起動し、設定を変更したい場合は、以下のYAMLファイルで変更した設定で<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>NATS以外のメッセージストアでMilvusをスタンドアロンインストールし、NATSに変更したい場合は、全てのコレクションをフラッシュし、Milvusを停止した後、以下のYAMLファイルを指定して<code translate="no">helm upgrade -f</code> 。</p></li>
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
<p><strong>RocksMQとNATSのどちらを選択しますか？</strong></p>
<p>RockMQはCGOを使ってRocksDBとやりとりし、それ自身でメモリを管理しますが、Milvusに組み込まれている純粋なGO NATSはメモリ管理をGoのガベージコレクタ(GC)に委譲します。</p>
<p>データパケットが64kbより小さい場合、RocksDBはメモリ使用量、CPU使用量、レスポンスタイムの点で優れている。一方、データ・パケットが64kbより大きい場合は、十分なメモリと理想的なGCスケジューリングがあれば、NATSの方が応答時間の点で優れている。</p>
<p>現在のところ、NATSは実験にのみ使用することをお勧めします。</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker ComposeまたはHelmを使用して他のMilvus依存関係を設定する方法について説明します：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/deploy_s3.md">Docker ComposeまたはHelmでオブジェクトストレージを設定する</a></li>
<li><a href="/docs/ja/v2.4.x/deploy_etcd.md">Docker ComposeまたはHelmでメタストレージを設定する</a></li>
</ul>
