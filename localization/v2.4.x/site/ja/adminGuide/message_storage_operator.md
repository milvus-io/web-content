---
id: message_storage_operator.md
title: Milvus Operatorでメッセージストレージを設定する
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operatorでメッセージストレージを設定する方法をご覧ください。
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus Operatorでメッセージストレージを設定する<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、RocksMQ、Pulsar、またはKafkaを使用して、最近の変更に関するログの管理、ストリームログの出力、およびログのサブスクリプションを提供します。このトピックでは、Milvus OperatorでMilvusをインストールする際に、メッセージストレージの依存関係を設定する方法を紹介します。詳細については、Milvus Operatorリポジトリの「<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Milvus Operatorでメッセージストレージを設定する</a>」を参照してください。</p>
<p>このトピックでは、Milvus Operatorをデプロイ済みであることを前提としています。</p>
<div class="alert note">詳細については、「<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operatorのデプロイ</a>」を参照してください。 </div>
<p>Milvus Operatorを使用してMilvusクラスタを起動するには、設定ファイルを指定する必要があります。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>サードパーティの依存関係を設定するには、<code translate="no">milvus_cluster_default.yaml</code> のコードテンプレートを編集するだけです。以下のセクションでは、オブジェクト・ストレージ、etcd、Pulsarの設定方法をそれぞれ紹介します。</p>
<h2 id="Before-you-begin" class="common-anchor-header">始める前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、RocksMQ、NATS、Pulsar、KafkaがMilvusスタンドアロンおよびクラスタモードでサポートされているかどうかを示しています。</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">スタンドアロンモード</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">クラスターモード</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>メッセージストレージの指定には他にも制限があります：</p>
<ul>
<li>1つのMilvusインスタンスに対して1つのメッセージストレージのみがサポートされます。ただし、1つのインスタンスに複数のメッセージストレージを設定しても、後方互換性があります。優先順位は以下の通りです：<ul>
<li>スタンドアロンモード  RocksMQ (デフォルト) &gt; Pulsar &gt; Kafka</li>
<li>クラスタ・モード：Pulsar (デフォルト) &gt; Kafka</li>
<li>後方互換性のため、2.3から導入されたNatsはこれらの優先ルールに参加しません。</li>
</ul></li>
<li>Milvusシステムの実行中は、メッセージストレージを変更することはできません。</li>
<li>Kafka 2.x または 3.x バージョンのみがサポートされています。</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">RocksMQの設定<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQはMilvusスタンドアロンのデフォルトのメッセージストレージです。</p>
<div class="alert note">
<p>現在、RocksMQをMilvusスタンドアロンのメッセージストレージとして設定できるのはMilvus Operatorのみです。</p>
</div>
<h4 id="Example" class="common-anchor-header">設定例</h4><p>以下の例では、RocksMQサービスを設定しています。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">NATSの設定<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATSの代替メッセージストレージです。</p>
<h4 id="Example" class="common-anchor-header">例</h4><p>以下の例ではNATSサービスを設定します。</p>
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
<p>メッセージストレージをRocksMQからNATSに移行するには、以下の手順を実行します：</p>
<ol>
<li><p>すべてのDDLオペレーションを停止する。</p></li>
<li><p>FlushAll APIを呼び出し、APIコールの実行が終了したらMilvusを停止する。</p></li>
<li><p><code translate="no">msgStreamType</code> を<code translate="no">natsmq</code> に変更し、<code translate="no">spec.dependencies.natsmq</code> の NATS 設定に必要な変更を加える。</p></li>
<li><p>Milvusを再度起動し、以下を確認してください：</p>
<ul>
<li>ログに<code translate="no">mqType=natsmq</code> というログエントリが存在する。</li>
<li><code translate="no">spec.dependencies.natsmq.server.storeDir</code> で指定したディレクトリに<code translate="no">jetstream</code> という名前のディレクトリが存在する。</li>
</ul></li>
<li><p>(オプション) RocksMQストレージディレクトリのデータファイルをバックアップし、クリーンアップする。</p></li>
</ol>
<div class="alert note">
<p><strong>RocksMQとNATSのどちらを選びますか？</strong></p>
<p>RockMQはRocksDBとのやりとりにCGOを使用し、自身でメモリを管理しますが、Milvusに組み込まれている純粋なGO NATSはメモリ管理をGoのガベージコレクタ（GC）に委譲します。</p>
<p>データパケットが64kbより小さい場合、RocksDBはメモリ使用量、CPU使用量、レスポンスタイムの点で優れている。一方、データ・パケットが64kbより大きい場合は、十分なメモリと理想的なGCスケジューリングがあれば、NATSの方が応答時間の点で優れている。</p>
<p>現在のところ、NATSは実験にのみ使用することをお勧めします。</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Pulsarの設定<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsarは最近の変更のログを管理し、ストリーム・ログを出力し、ログ購読を提供します。メッセージ・ストレージ用にPulsarを設定することは、MilvusスタンドアロンおよびMilvusクラスタの両方でサポートされています。ただしMilvus Operatorでは、PulsarをMilvusクラスタのメッセージ・ストレージとしてのみ構成することができます。Pulsarを設定するには、<code translate="no">spec.dependencies.pulsar</code> の下に必須フィールドを追加してください。</p>
<p><code translate="no">pulsar</code> <code translate="no">external</code> および をサポートしています。<code translate="no">inCluster</code></p>
<h3 id="External-Pulsar" class="common-anchor-header">外部Pulsar</h3><p><code translate="no">external</code> は外部Pulsarサービスの使用を示します。 外部Pulsarサービスの構成に使用されるフィールドには以下が含まれます：</p>
<ul>
<li><code translate="no">external</code>:  <code translate="no">true</code> 値は、Milvusが外部Pulsarサービスを使用していることを示します。</li>
<li><code translate="no">endpoints</code>:Pulsarのエンドポイント。</li>
</ul>
<h4 id="Example" class="common-anchor-header">例</h4><p>以下の例では、外部Pulsarサービスを設定しています。</p>
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
<h3 id="Internal-Pulsar" class="common-anchor-header">内部Pulsar</h3><p><code translate="no">inCluster</code> は、Milvusクラスタが起動すると、クラスタ内で自動的にPulsarサービスが起動することを示します。</p>
<h4 id="Example" class="common-anchor-header">例</h4><p>以下の例では、内部Pulsarサービスを構成します。</p>
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
<div class="alert note">この例では、Pulsarの各コンポーネントのレプリカ数、Pulsar BookKeeperのコンピュート・リソース、その他の構成を指定します。</div>
<div class="alert note"><a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yamlで</a>、内部Pulsarサービスを構成する完全な構成項目を見つけてください。先の例に示すように、<code translate="no">pulsar.inCluster.values</code> 、必要に応じて構成項目を追加してください。</div>
<p>構成ファイルの名前を<code translate="no">milvuscluster.yaml</code> と仮定し、以下のコマンドを実行して構成を適用します。</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Kafkaの構成<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>PulsarはMilvusクラスタにおけるデフォルトのメッセージ・ストレージです。Kafkaを使用する場合は、オプションのフィールド<code translate="no">msgStreamType</code> 。</p>
<p><code translate="no">kafka</code> は および をサポートしています。<code translate="no">external</code> <code translate="no">inCluster</code></p>
<h3 id="External-Kafka" class="common-anchor-header">外部Kafka</h3><p><code translate="no">external</code> は外部Kafkaサービスを使用することを示します。</p>
<p>外部Kafkaサービスの設定に使用されるフィールドは以下のとおりです：</p>
<ul>
<li><code translate="no">external</code>:<code translate="no">true</code> の値は、Milvusが外部Kafkaサービスを使用していることを示します。</li>
<li><code translate="no">brokerList</code>:メッセージを送信するブローカーのリスト。</li>
</ul>
<h4 id="Example" class="common-anchor-header">例</h4><p>以下の例では、外部Kafkaサービスを設定しています。</p>
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
<p>SASLの設定はoperator v0.8.5以上のバージョンでサポートされています。</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">内部Kafka</h3><p><code translate="no">inCluster</code> は、Milvusクラスタが起動すると、クラスタ内でKafkaサービスが自動的に起動することを示します。</p>
<h4 id="Example" class="common-anchor-header">例</h4><p>次の例では、内部Kafkaサービスを設定します。</p>
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
<p>内部Kafkaサービスを設定するための完全な設定項目は<a href="https://artifacthub.io/packages/helm/bitnami/kafka">こちらを</a>参照してください。<code translate="no">kafka.inCluster.values</code> の下に、必要に応じて設定項目を追加します。</p>
<p>設定ファイルの名前が<code translate="no">milvuscluster.yaml</code> の場合、次のコマンドを実行して設定を適用します。</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operatorを使用して他のMilvus依存関係を設定する方法について説明します：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/object_storage_operator.md">Milvus Operatorでオブジェクトストレージを構成する</a></li>
<li><a href="/docs/ja/v2.4.x/meta_storage_operator.md">Milvus Operatorを使用したメタストレージの構成</a></li>
</ul>
