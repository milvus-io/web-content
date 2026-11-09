---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Docker を使用して Milvus スタンドアロンをインストールする方法について学びましょう。
title: Docker（Linux）でMilvusを実行する
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Docker（Linux）でMilvusを実行する<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker で Milvus インスタンスを起動する方法について説明します。</p>
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
<li><a href="https://docs.docker.com/get-docker/">Docker をインストールしてください</a>。</li>
<li>インストール前に、<a href="/docs/ja/prerequisite-docker.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Docker での Milvus のインストール<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus には、Docker コンテナとしてインストールするためのインストールスクリプトが用意されています。このスクリプトは<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus リポジトリ</a>から入手できます。新しいデプロイを開始する前に、スクリプトをダウンロードして内容を確認してください:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>スクリプトは、Milvusの<code translate="no">master</code> ブランチからダウンロードされます。Dockerイメージのタグはスクリプト内で定義されており、v3.0.5とは異なる場合があります。その特定のリリースをインストールするには、「<a href="/docs/ja/install_standalone-docker-compose.md">Docker ComposeでMilvusを実行する</a>」に記載されているバージョン指定の設定を使用してください。</p>
<p>この Docker デプロイでは、<strong>Woodpecker</strong> <strong>をローカルファイルシステム</strong>を WAL バックエンドとして実行するため、外部のメッセージキューサービスは必要ありません。<a href="/docs/ja/woodpecker.md">Woodpecker を</a>参照してください。</p>
<p><a href="/docs/ja/milvus_backup_overview.md">Backupを</a>スタンドアロン展開モードで使用する場合は、<a href="/docs/ja/install_standalone-docker-compose.md">Docker Composeによる</a>展開方法を使用することを推奨します。</p>
<p>イメージの取得で問題が発生した場合は、問題の詳細を明記の上、<a href="mailto:community@zilliz.com">community@zilliz.com</a>までご連絡ください。必要なサポートを提供いたします。</p>
</div>
<p>インストールスクリプトの実行後：</p>
<ul>
<li>「milvus-standalone」という名前の Docker コンテナがポート<strong>19530</strong> で起動しました。</li>
<li>Milvus とともに、同じコンテナ内に埋め込み型の etcd がインストールされ、ポート<strong>2379</strong> で動作しています。その設定ファイルは、現在のフォルダ内の<strong>embedEtcd.yaml</strong>にマッピングされています。</li>
<li>Milvusのデフォルト設定を変更するには、現在のフォルダ内の<strong>user.yamlファイルに</strong>設定を追加し、サービスを再起動してください。</li>
<li>Milvusのデータボリュームは、現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングされています。</li>
</ul>
<p>実際のイメージと正常性を確認してください:</p>
<pre><code translate="no" class="language-bash">docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p><a href="/docs/ja/quickstart.md">クイックスタートの手</a>順に進む前に、<code translate="no">healthy</code> が表示されるまでお待ちください。このサーバーを使用する場合は、SDKを<code translate="no">http://localhost:19530</code> に接続してください。ローカルの<code translate="no">.db</code> URIに接続すると、代わりにMilvus Liteが起動します。</p>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> から Milvus WebUI にアクセスし、お使いの Milvus インスタンスに関する詳細を確認できます。詳細については、<a href="/docs/ja/milvus-webui.md">Milvus WebUI</a> を参照してください。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">（オプション）Milvusの設定を更新する<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>現在のフォルダにある<strong>user.yaml</strong>ファイルで Milvus の設定を変更できます。たとえば、<code translate="no">proxy.healthCheckTimeout</code> を<code translate="no">1000</code> ms に変更するには、次のようにファイルを編集します。</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>その後、次のようにサービスを再起動します:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>適用可能な設定項目については、「<a href="/docs/ja/system_configuration.md">システム設定</a>」を参照してください。</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Milvusのアップグレード<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>スクリプトの `<code translate="no">upgrade</code> ` コマンドは、<code translate="no">master</code> からスクリプトをダウンロードし、そのスクリプトで選択されたイメージを使用してコンテナを再作成します。このコマンドは、サポートされているソースからターゲットへのバージョンパスを検証せず、生成された設定ファイルを再作成する場合があります。任意の古いデプロイメントが v3.0.5 へ安全にアップグレードできることを保証するものではないため、そのように扱わないでください。</p>
<p>アップグレードの前に、メタデータ、永続データ、<code translate="no">embedEtcd.yaml</code> 、および<code translate="no">user.yaml</code> をバックアップしてください。ターゲットバージョン、メッセージキュー、ストレージの互換性を確認し、本番環境以外で復旧動作を検証してください。Docker Compose で管理されているデプロイメントについては、「<a href="/docs/ja/upgrade_milvus_standalone-docker.md">Docker Compose を使用した Milvus スタンドアロンのアップグレード</a>」の手順に従ってください。スクリプトで管理されているコンテナには、その手順を直接適用しないでください。</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Milvusの停止と削除<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>このコンテナは、次のように停止および削除できます</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">オプションの依存関係<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトでは、このデプロイメントはメッセージキューとして<strong>Woodpecker</strong>（ローカルファイルシステム WAL）、メタデータ用に<strong>組み込みの etcd</strong>を実行しており、他にインストールする必要はありません。別のメッセージキューを使用する場合、または外部オブジェクトストレージ／メタデータに接続する場合は、以下を参照してください：</p>
<ul>
<li>メッセージキュー：<a href="/docs/ja/woodpecker.md">Woodpecker</a>（デフォルト） ·<a href="/docs/ja/mq_pulsar.md">Pulsar</a>·<a href="/docs/ja/mq_kafka.md">Kafka</a>·<a href="/docs/ja/mq_rocksmq.md">RocksMQ</a></li>
<li>オブジェクトストレージ：<a href="/docs/ja/deploy_s3.md">MinIO</a>（デフォルト） ·<a href="/docs/ja/deploy_s3.md">AWS S3</a>·<a href="/docs/ja/abs.md">Azure Blob</a>·<a href="/docs/ja/gcs.md">GCP Cloud Storage</a>·<a href="/docs/ja/deploy_s3.md">Aliyun OSS</a>·<a href="/docs/ja/deploy_s3.md">Tencent COS</a>·<a href="/docs/ja/deploy_s3.md">Huawei OBS</a>·<a href="/docs/ja/deploy_s3.md">S3互換</a></li>
<li>メタデータ:<a href="/docs/ja/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3はデフォルトで無効になっています。Storage V3に依存する機能を使用する前に、有効にしてください。要件および互換性に関する注意事項については、「<a href="/docs/ja/storage-v3.md">Storage V3</a>」を参照してください。</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker に Milvus をインストールしたら、次のことができます:</p>
<ul>
<li><p><a href="/docs/ja/quickstart.md">「クイックスタート</a>」を参照して、Milvusの機能を確認してください。</p></li>
<li><p>Milvusの基本的な操作を学びましょう：</p>
<ul>
<li><a href="/docs/ja/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p>Milvusのバージョンを変更する前に、このページに記載されているアップグレードに関する注意事項をご確認ください。</p></li>
<li><p><a href="/docs/ja/scaleout.md">Milvusクラスタをスケールアウトしてください</a>。</p></li>
<li><p>クラウド上に Milvus クラスターをデプロイします：</p>
<ul>
<li><a href="/docs/ja/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ja/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvusの可観測性と管理のための直感的なWebインターフェース「<a href="/docs/ja/milvus-webui.md">Milvus WebUI</a>」をご覧ください。</p></li>
<li><p>Milvusデータのバックアップを行うオープンソースツール「<a href="/docs/ja/milvus_backup_overview.md">Milvus Backup</a>」をご覧ください。</p></li>
<li><p>Milvusのデバッグや動的な構成更新を行うためのオープンソースツール「<a href="/docs/ja/birdwatcher_overview.md">Birdwatcher</a>」をご覧ください。</p></li>
<li><p>直感的な Milvus 管理のためのオープンソース GUI ツール「<a href="https://github.com/zilliztech/attu">Attu</a>」をご覧ください。</p></li>
<li><p><a href="/docs/ja/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
