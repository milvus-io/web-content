---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  Milvusにおいて、Woodpeckerがデフォルトのメッセージキュー（WAL）としてどのように機能するか、また、組み込みモードやサービスモードで実行する方法について学びましょう。
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpeckerは、Milvus 3.xにおける<strong>デフォルトのメッセージキュー（書き込み先行ログ、WAL）</strong>です。オブジェクトストレージ向けに設計されたクラウドネイティブなWALであり、高いスループット、低い運用オーバーヘッド、シームレスなスケーラビリティを提供します。アーキテクチャおよびベンチマークの詳細については、<a href="/docs/ja/woodpecker_architecture.md">「Woodpecker」</a>を参照してください。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
<li>Milvus 3.x では、Woodpecker<strong>がデフォルトの</strong>WAL/メッセージキューとして機能し、ロギングサービスとして順序付き書き込みとリカバリを提供します。Pulsar や Kafka などの外部メッセージキューサービスは不要です。</li>
<li>Woodpeckerは、Milvus/ストリーミングノードに<strong>組み込んで</strong>実行することも（デフォルト）、独自のポッドを持つ<strong>専用サービス</strong>として実行することも可能です（分散/クラスターのみ）。</li>
<li><code translate="no">storage.type</code> モードとして、オブジェクトストレージ（<code translate="no">minio</code> 、デフォルト）、ローカルファイルシステム（<code translate="no">local</code> ）、および専用の<code translate="no">service</code> の3つをサポートしています。「<a href="#Deployment-modes">デプロイメントモード</a>」を参照してください。</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">クイックスタート<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerを有効にするには、MQタイプをWoodpeckerに設定します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>注：稼働中のクラスタで<code translate="no">mq.type</code> を切り替えることは、アップグレード操作となります。アップグレード手順を厳守し、本番環境に切り替える前に、新しいクラスタで検証を行ってください。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>以下は、Woodpeckerの設定ブロック全体です（<code translate="no">milvus.yaml</code> を編集するか、<code translate="no">user.yaml</code> で上書きしてください）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>重要な注意点：</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>: 現在、<code translate="no">etcd</code> のみがサポートされています。軽量なメタデータを保存するために、Milvusと同じetcdを再利用してください。</li>
<li><strong>prefix</strong>: メタデータのキープレフィックス。デフォルト:<code translate="no">woodpecker</code> 。</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>クライアント側でのセグメントの追加・ローリング・監査の動作を制御し、スループットとエンドツーエンドのレイテンシのバランスを調整します。</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>ログセグメントの同期・フラッシュ・コンパクション・読み取りポリシーを制御します。これらは、スループットとレイテンシのチューニングにおける主要な調整項目です。</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>: MinIO/S3互換のオブジェクトストレージ（MinIO/S3/GCS/OSSなど）の場合は<code translate="no">minio</code> 、ローカル/共有ファイルシステムの場合は<code translate="no">local</code> 。</li>
<li><strong>rootPath</strong>: ストレージバックエンドのルートパス（<code translate="no">local</code> で有効。<code translate="no">minio</code> では、パスはバケット/プレフィックスによって決定されます）。</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">デプロイモード<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerは、<code translate="no">storage.type</code> の3つのモードをサポートしています：</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Woodpeckerの動作</th><th>WAL バックエンド</th><th>Milvus スタンドアロン</th><th>Milvus 分散（クラスタ）</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (デフォルト)</td><td>Milvus/ストリーミングノードに組み込み</td><td>オブジェクトストレージ（MinIO／S3互換）</td><td>対応</td><td>サポート済み</td></tr>
<tr><td><code translate="no">local</code></td><td>Milvus/ストリーミングノードに組み込み</td><td>ローカルファイルシステム</td><td>対応</td><td>制限あり（すべてのノードに共有ファイルシステム（例：NFS）が必要）</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>専用のWoodpeckerサービス</strong>（独自のポッド）</td><td>オブジェクトストレージ（MinIO／S3互換）</td><td><strong>未対応</strong></td><td>対応</td></tr>
</tbody>
</table>
<p>注：</p>
<ul>
<li><code translate="no">minio</code> では、WoodpeckerはMilvus（MinIO/S3/GCS/OSSなど）と同一のオブジェクトストレージを共有します。</li>
<li><code translate="no">local</code> では、シングルノードのローカルディスクはスタンドアロンモードでのみ利用可能です。すべてのポッドが共有ファイルシステム（例：NFS）にアクセスできる場合、クラスターモードでも<code translate="no">local</code> を使用できます。</li>
<li><strong><code translate="no">service</code> モードでは、Woodpeckerは独立してスケーラブルなサービスとして実行され、分散/クラスタ展開でのみ利用可能です。</strong>スタンドアロン展開では、組み込みモード（<code translate="no">minio</code> または<code translate="no">local</code> ）が使用されます。</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">オブジェクトストレージとの互換性<code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のマトリックスは、Woodpeckerが<code translate="no">storage.type=minio</code> で構成された場合の、現在確認されているオブジェクトストレージバックエンドの互換性をまとめたものです。<a href="https://github.com/zilliztech/woodpecker/discussions/150">この情報はGitHubディスカッション#150に基づいています</a>。</p>
<table>
<thead>
<tr><th>プロバイダー／サービス</th><th>ステータス</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>Azure Blob Storage</td><td>サポート対象</td><td>ネイティブの Azure SDK を使用します。</td></tr>
<tr><td>AWS S3</td><td>対応</td><td>条件付き書き込みを完全にサポートしたネイティブ S3。</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>対応</td><td>S3の条件付き書き込みを完全にサポートしています。</td></tr>
<tr><td>Aliyun OSS</td><td>対応</td><td>S3互換インターフェースを通じてサポートされています。</td></tr>
<tr><td>Tencent COS</td><td>対応</td><td>S3互換インターフェースを通じてサポートされています。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>対応</td><td>S3相互運用モードを通じてサポートされています。</td></tr>
<tr><td>Huawei Cloud OBS</td><td>未対応</td><td>必要な条件付き書き込みのセマンティクスが欠如しています。</td></tr>
<tr><td>VAST Data</td><td>サポートされています</td><td>コミュニティにより検証済み。バージョン管理されていないバケットでのみ動作します。</td></tr>
<tr><td>その他の S3 互換ストレージ</td><td>部分的に</td><td>S3の条件付き書き込み（Conditional Write）のセマンティクスが完全にサポートされていることが前提となります。</td></tr>
</tbody>
</table>
<p>注：</p>
<ul>
<li>互換性は、ネイティブSDKのサポートまたはS3条件付き書き込みセマンティクスのサポートに依存します。</li>
<li>Woodpecker用にMinIOをセルフホストする場合は、<code translate="no">RELEASE.2024-12-18T13-15-44Z</code> 以降を使用してください。</li>
<li>このマトリックスは<a href="https://github.com/zilliztech/woodpecker/discussions/150">現在の検討状況を</a>反映したものであり、バックエンドのサポートがさらに検証されるにつれて変更される可能性があります。</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">導入ガイド<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Kubernetes上のMilvusクラスタでWoodpeckerを有効にする（Milvus Operator、storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ja/install_cluster-milvusoperator.md">Milvus Operator</a> をインストールした後、公式サンプルを使用して Woodpecker を有効にした Milvus クラスタを起動します:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>このサンプルでは、Woodpeckerをメッセージキューとして設定し、ストリーミングノードを有効にします。初回起動時はイメージのプルに時間がかかる場合があります。すべてのポッドの準備が整うまでお待ちください:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>準備が整うと、次のようなポッドが表示されます:</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>以下のコマンドを実行して、Milvusクラスターをアンインストールします。</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>Woodpeckerのパラメータを調整する必要がある場合は、「<a href="#Configuration">設定</a>」に記載されている手順に従ってください。</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Kubernetes上のMilvusクラスターでWoodpeckerを有効にする（Helmチャート、storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>まず、「<a href="/docs/ja/install_cluster-helm.md">Helm を使用して Kubernetes で Milvus を実行する</a>」に記載されている手順に従って、Milvus Helm チャートを追加および更新してください。</p>
<p>その後、以下の例のいずれかを使用してデプロイします。</p>
<p>– クラスタ展開（Woodpecker および Streaming Node を有効にした推奨設定）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– スタンドアロン展開（Woodpeckerを有効化）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>デプロイ後は、ドキュメントに従ってポートフォワードを行い、接続してください。Woodpeckerのパラメータを調整するには、「<a href="#Configuration">設定」</a>に記載されている手順に従ってください。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Docker での Milvus スタンドアロン（storage=local）で Woodpecker を有効にする<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 3.x では、Docker スタンドアロン展開において、Woodpecker<strong>はデフォルトで</strong> <strong>ローカルファイルシステムを</strong>WAL バックエンドとして使用します。追加の設定は不要です。「<a href="/docs/ja/install_standalone-docker.md">Docker で Milvus を実行する</a>」の手順に従ってください:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Woodpeckerを調整するには、初回起動後に生成された<code translate="no">user.yaml</code> を編集し、<code translate="no">bash standalone_embed.sh restart</code> を実行して変更を適用してください（<code translate="no">start</code> を実行すると<code translate="no">user.yaml</code> が再生成されるため、編集内容は<code translate="no">restart</code> で適用してください）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Docker Compose を使用した Milvus スタンドアロンで Woodpecker を有効にする（storage=minio）<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>「<a href="/docs/ja/install_standalone-docker-compose.md">Docker Compose を使用した Milvus の実行</a>」の手順に従ってください。例：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">Milvus クラスタ（Helm）で Woodpecker サービスモードを有効にする<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Woodpecker</strong> <strong>のサービス</strong> <strong>モードはMilvus 3.0の</strong>機能です。分散/クラスタ展開の場合、<code translate="no">streaming.woodpecker.embedded=false</code> を設定することで、Woodpeckerをストリーミングノードに組み込むのではなく、<strong>専用のサービス</strong>（個別のポッド）として実行できます：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、Woodpeckerは専用のStatefulSet（<code translate="no">my-release-milvus-woodpecker</code> 、デフォルトで4つのレプリカ）としてデプロイされ、ヘッドレスサービスによってフロントエンドが構成されます。ポート<code translate="no">18080</code> （サービス）、<code translate="no">17946</code> （ゴシップ）、<code translate="no">9091</code> （メトリクス）でゴシップクラスタリングが行われ、ストレージバックエンドにはMinIOが使用されます。 このサービスには<strong>3ノード</strong>のクォーラムが必要です。デフォルトの<strong>レプリカ数4は</strong>、1ノードの障害を許容しつつクォーラムを維持するため、<code translate="no">woodpecker.replicaCount</code> を3未満に設定しないでください。このクラスターには、別途<code translate="no">woodpecker</code> のポッドセットが含まれます：</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Woodpeckerの<code translate="no">service</code> モードは、<strong>分散型／クラスタ展開</strong>専用です。スタンドアロン展開では、Woodpeckerが組み込みモードで実行されます（<code translate="no">minio</code> または<code translate="no">local</code> ）。Milvus Operatorは、現時点ではWoodpeckerのサービスモードをサポートしていません。</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">スループット調整のヒント<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerのスループットとレイテンシの特性は、<strong>組み込み</strong>モードと<strong>サービス</strong>モード（Milvus 3.0の新機能）で異なります。以下のガイダンスはモードごとに分類されています。</p>
<h3 id="Embedded-mode" class="common-anchor-header">組み込みモード<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ja/woodpecker_architecture.md">Woodpeckerの</a>ベンチマークおよびバックエンドの制限に基づき、以下の観点からエンドツーエンドの書き込みスループットを最適化してください：</p>
<ul>
<li>ストレージ側
<ul>
<li><strong>オブジェクトストレージ（MinIO／S3互換）</strong>：同時実行数とオブジェクトサイズを増やします（極小のオブジェクトは避けてください）。ネットワークおよびバケットの帯域幅制限に注意してください。SSD上の単一のMinIOノードでは、ローカルで100 MB/s程度が上限となる場合が多いですが、単一のEC2からS3への転送ではGB/sに達することがあります。</li>
<li><strong>ローカル／共有ファイルシステム（ローカル）</strong>：NVMeや高速ディスクを優先する。ファイルシステムが小規模な書き込みやfsyncのレイテンシに適切に対応していることを確認する。</li>
</ul></li>
<li>Woodpeckerの調整パラメータ
<ul>
<li><code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> および<code translate="no">maxFlushThreads</code> を増やして、フラッシュ量を拡大し、並列度を高めます。</li>
<li>メディアの特性に応じて<code translate="no">maxInterval</code> を調整します（集約時間を長くすることで、レイテンシとスループットのトレードオフを図ります）。</li>
<li>オブジェクトストレージの場合は、セグメント切り替えを減らすために<code translate="no">segmentRollingPolicy.maxSize</code> の値を増やすことを検討してください。</li>
</ul></li>
<li>クライアント／アプリケーション側
<ul>
<li>バッチサイズを大きくし、同時書き込みを行うライター/クライアントの数を増やしてください。</li>
<li>頻繁な小規模な書き込みを避けるため、リフレッシュやインデックス構築のタイミング（トリガー前にバッチをまとめる）を制御してください。</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">サービスモード（Milvus 3.0 以降）<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>サービスモードでは、オブジェクトストレージをバックエンドとする WAL の高い書き込みスループットを維持しつつ、低レイテンシを実現します（<a href="#Latency">「レイテンシ」</a>を参照）。 上記のストレージ側およびクライアント側のチューニングは引き続き適用されます。さらに、Woodpeckerは独自のサービスとして実行されるため、レプリカ（<code translate="no">woodpecker.replicaCount</code> 、デフォルトは4）を追加することで書き込み容量を水平方向にスケールでき、書き込みは1-RTTクォーラムレプリケーションと、ブローカーによる転送を回避するトポロジー認識型読み取りの恩恵を受けます。</p>
<p><strong>バッチ挿入のデモ</strong>— 以下のコマンドを使用して書き込みスループットを測定してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">レイテンシ<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">組み込みモード<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpeckerは、スループット、コスト、レイテンシのトレードオフを考慮してオブジェクトストレージ向けに設計されたクラウドネイティブなWALです。軽量な組み込みモードでは、コストとスループットの最適化を優先します。これは、ほとんどのシナリオにおいて、個々の書き込みリクエストに対して低レイテンシを要求するのではなく、データが一定の時間内に書き込まれることのみが求められるためです。 そのため、Woodpeckerはバッチ書き込みを採用しており、ローカルファイルシステムストレージバックエンドではデフォルトの間隔が10ms、MinIOのようなストレージバックエンドでは200msに設定されています。書き込み処理が遅い場合、最大レイテンシは間隔時間とフラッシュ時間の合計に等しくなります。</p>
<p>なお、バッチ挿入は時間間隔だけでなく、デフォルトで2MBに設定されているバッチサイズによってもトリガーされる点に注意してください。</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">サービスモード (Milvus 3.0 以降)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>サービスモードでは、コストを低く抑えつつ、<strong>ミリ秒レベルの書き込みレイテンシ</strong>（従来の3レプリカ構成のローカルディスクWALと同等）を実現します。一般的な3レプリカのAZ横断展開において、書き込みレイテンシはミリ秒単位に収まります。これは以下の仕組みによって達成されます：</p>
<ul>
<li><strong>1 RTT クォーラム書き込み</strong>— クライアント主導型レプリケーションでは、1回のラウンドトリップ（RTT）以内にクォーラム書き込みを完了します。これにより、AZをまたぐトラフィックは2つのレプリカ分のデータ量に固定されます（これに対し、ブローカー／リーダーベースのレプリケーションでは、通常、約1/3分の追加のAZ間トラフィックが発生します）。</li>
<li><strong>トポロジーを意識したシングルホップ読み取り</strong>— 各読み取りはブローカーを経由せずに最も近いレプリカに直接行われるため、ブローカーベースのシステムに見られるランダムなAZ間読み取り（AZ間読み取りトラフィックの約2/3）を回避します。</li>
<li><strong>セグメントのローリング後の即時オブジェクトストレージへのアップロード</strong>— 各セグメントはそのライフサイクル全体を追跡し、ローリングされるとすぐにオブジェクトストレージにアップロードされるため、レイテンシを犠牲にすることなく、ローカルディスクの占有容量とストレージコストを低く抑えることができる。</li>
<li><strong>ノード間での継続的なレプリケーションなし</strong>— ログは共有ストレージとして機能するオブジェクトストレージに永続化されるため、フェイルオーバー時には生存しているレプリカのみを再アップロードします（ノード全体のコピーは行われません）。これにより、スケーリングがノード間レプリケーションの帯域幅に制限されることがなく、大規模なノード交換でもレプリケーションストームが発生しません。</li>
</ul>
<p>AZをまたぐ展開において、サービスモードは、ブローカーベースのログシステムと比較して、AZ間ネットワーク<strong>トラフィックの書き込みを</strong>約<strong>1/3</strong>、<strong>読み取りを</strong>約<strong>2/3</strong>削減します。詳細な設計およびコスト分析については、<a href="/docs/ja/woodpecker_architecture.md">「Woodpeckerアーキテクチャ」を</a>参照してください。</p>
<p>アーキテクチャ、デプロイメントモード（MemoryBuffer / QuorumBuffer）、およびパフォーマンスの詳細については、「<a href="/docs/ja/woodpecker_architecture.md">Woodpecker Architecture</a>」を参照してください。</p>
<p>パラメータの詳細については、Woodpecker<a href="https://github.com/zilliztech/woodpecker">のGitHubリポジトリ</a>を参照してください。</p>
