---
id: switch_milvus_cluster_mq_type-operator.md
summary: Milvusクラスタのメッセージキュータイプを切り替える方法について説明します。
title: MilvusクラスタのMQタイプの切り替え
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">MilvusクラスタのMQタイプの切り替え<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、既存のMilvusクラスターでメッセージ・キュー(MQ)のタイプを切り替える方法について説明します。Milvusは、ダウンタイムなしでPulsar、Kafka、Woodpecker間のオンラインMQ切り替えをサポートしています。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Milvus<a href="/docs/ja/v2.6.x/install_cluster-milvusoperator.md">Operator</a>または<a href="/docs/ja/v2.6.x/install_cluster-helm.md">Helm</a>経由でインストールされた稼働中のMilvusクラスタ・インスタンス。</li>
<li>Milvusインスタンスが、このSwitch MQ機能をサポートする最新バージョンにアップグレードされていること。</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">Pulsar/KafkaからWoodpecker (MinIO)への切り替え<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の手順に従って、MQタイプをPulsarまたはKafkaからMinIOストレージを持つWoodpeckerに切り替えてください。</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">ステップ1： Milvusインスタンスが稼動していることを確認する<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>切り替える前に、Milvusクラスタ・インスタンスが正しく動作していることを確認してください。テスト・コレクションを作成し、データを挿入し、クエリを実行することで検証できます。</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">ステップ2: (オプション) Woodpecker設定の確認<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusのデフォルト設定では、WoodpeckerのストレージタイプはすでにMinIOに設定されているため、ほとんどの場合、追加の設定は必要ありません。</p>
<p>ただし、以前にWoodpecker構成をカスタマイズした場合は、<code translate="no">woodpecker.storage.type</code> が<code translate="no">minio</code> に設定されていることを確認する必要があります。<code translate="no">mqType</code> の値を変更<strong>せずに、</strong>Milvus構成を更新します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>Helmの</strong>場合は、"<a href="/docs/ja/v2.6.x/configure-helm.md">Helm ChartsでMilvusを設定する</a>"を参照し、設定を更新してください。</li>
<li><strong>Milvus Operatorの</strong>場合は、<a href="/docs/ja/v2.6.x/configure_operator.md">Milvus Operatorを使用してMilvusを設定するを</a>参照してください。</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">ステップ3: MQスイッチの実行<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のコマンドを実行し、Woodpeckerへの切り替えを実行します：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> はMixCoordサービスの実際のアドレスに置き換えてください。</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">ステップ4：スイッチ完了の確認<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>スイッチプロセスは自動的に完了します。Milvusのログを監視して、以下のキーメッセージを確認し、切り替えが完了したことを確認してください：</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上記のログメッセージにおいて、<code translate="no">&lt;MQ1&gt;</code> はソース MQ タイプ（例えば、<code translate="no">pulsar</code> または<code translate="no">kafka</code> ）であり、<code translate="no">&lt;MQ2&gt;</code> はターゲット MQ タイプ（<code translate="no">woodpecker</code> ）です。</p>
<ul>
<li>最初のメッセージは、ソースからターゲットへのWAL切り替えが完了したことを示している。</li>
<li>2つ目のメッセージは、すべての物理チャネルが切り替わったことを示す。</li>
<li>3つ目のメッセージは、etcdで<code translate="no">mq.type</code> 構成が更新されたことを示す。</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">Woodpecker（MinIO）からPulsarまたはKafkaへの切り替え<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の手順に従って、MQタイプをWoodpeckerからPulsarまたはKafkaに戻してください。</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">ステップ1： Milvusインスタンスが稼動していることを確認する<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>切り替える前に、Milvusクラスタ・インスタンスが正常に稼動していることを確認してください。</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">ステップ2: ターゲットMQの設定<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>切り替えをトリガする前に、ターゲットMQサービス（PulsarまたはKafka）が利用可能で、そのアクセス設定がMilvus設定にレンダリングされていることを確認する必要があります。</p>
<div class="alert note">
<p>このセクションの正確な手順は、内部（バンドル）または外部MQサービスのどちらを使用するかによって異なります。</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">オプションA：内部Pulsar/Kafka（Helmにバンドル）</h4><p>HelmにバンドルされたPulsarまたはKafkaを使用している場合は、Helmリリースを更新して対象のMQサービスを有効にし、Woodpeckerを無効にしてください。<code translate="no">streaming.enabled=true</code> フラグは、Switch MQ機能の前提条件であるStreaming Nodeを有効にするために必要です。例えば、Pulsarに切り替える場合などです：</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>アップグレード後、ターゲットMQアクセス設定がmilvus設定にレンダリングされていることを確認します。例えば、Pulsarの場合：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">オプションB： 内部Pulsar/Kafka（Milvus Operatorで管理）</h4><p>Milvus Operatorを使用している場合は、Milvusカスタム・リソースを更新し、ターゲットMQアクセス構成を含めます。Milvus設定の更新の詳細については、「<a href="/docs/ja/v2.6.x/configure_operator.md">Milvus Operatorを使用したMilvusの設定</a>」を参照してください。</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">オプションC： 外部Pulsar/Kafka</h4><p>外部PulsarまたはKafkaサービスを使用している場合、<code translate="no">mqType</code> を変更する必要はありません。<code translate="no">values.yaml</code> に外部MQアクセス設定を追加し、Milvusインスタンスを再起動するだけで設定が反映されます。</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">ステップ 3: MQ スイッチの実行<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のコマンドを実行し、Pulsarへの切り替えをトリガします（Kafkaへの切り替えの場合は、<code translate="no">pulsar</code> を<code translate="no">kafka</code> に置き換えてください）：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> 、MixCoordサービスの実際のアドレスに置き換えてください。</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">ステップ4：切り替え完了の確認<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>スイッチ・プロセスは自動的に完了します。Milvusのログを監視して、以下のキーメッセージを確認し、切り替えが完了したことを確認します：</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上のログメッセージでは、<code translate="no">&lt;MQ1&gt;</code> がソース MQ タイプ（<code translate="no">woodpecker</code> ）、<code translate="no">&lt;MQ2&gt;</code> がターゲット MQ タイプ（<code translate="no">pulsar</code> や<code translate="no">kafka</code> など）です。</p>
<ul>
<li>最初のメッセージは、ソースからターゲットへのWAL切り替えが完了したことを示している。</li>
<li>2つ目のメッセージは、すべての物理チャネルが切り替わったことを示す。</li>
<li>3つ目のメッセージは、etcdで<code translate="no">mq.type</code> 構成が更新されたことを示す。</li>
</ul>
</div>
