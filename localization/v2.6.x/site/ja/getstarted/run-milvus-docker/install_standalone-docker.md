---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Docker を使用して Milvus スタンドアロンをインストールする方法について学びましょう。
title: DockerでMilvusを実行する（Linux）
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">DockerでMilvusを実行する（Linux）<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">Dockerをインストールしてください</a>。</li>
<li>インストール前に、<a href="/docs/ja/v2.6.x/prerequisite-docker.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
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
    </button></h2><p>Milvusには、Dockerコンテナとしてインストールするためのインストールスクリプトが用意されています。このスクリプトは<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvusのリポジトリ</a>から入手できます。DockerでMilvusをインストールするには、以下のコマンドを実行してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v2.6.19の新機能:</strong></p>
<ul>
<li><strong>ストリーミングノード</strong>：データ処理機能の強化</li>
<li><strong>Woodpecker MQ</strong>: メンテナンスのオーバーヘッドを低減したメッセージキューの改善。詳細については「<a href="/docs/ja/v2.6.x/use-woodpecker.md">Woodpeckerの使用</a>」を参照してください</li>
<li><strong>アーキテクチャの最適化</strong>：パフォーマンス向上のためにコンポーネントを統合</li>
</ul>
<p>常に最新のスクリプトをダウンロードし、最新の設定とアーキテクチャの改善を確実に適用してください。</p>
<p>スタンドアロン展開モードで<a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a>を使用する場合は、<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Composeによる</a>展開方法の使用を推奨します。</p>
<p>イメージの取得で問題が発生した場合は、問題の詳細を<a href="mailto:community@zilliz.com">community@zilliz.com</a>までご連絡ください。必要なサポートを提供いたします。</p>
</div>
<p>インストールスクリプトの実行後：</p>
<ul>
<li>「milvus」という名前の Docker コンテナがポート<strong>19530</strong> で起動しました。</li>
<li>Milvus と同じコンテナ内に embed etcd がインストールされており、ポート<strong>2379</strong> で動作しています。その設定ファイルは、現在のフォルダ内の<strong>embedEtcd.yaml</strong>にマッピングされています。</li>
<li>Milvusのデフォルト設定を変更するには、現在のフォルダ内の<strong>user.yamlファイル</strong>に設定を追加し、サービスを再起動してください。</li>
<li>Milvusのデータボリュームは、現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングされています。</li>
</ul>
<p><code translate="no">http://127.0.0.1:9091/webui/</code> から Milvus WebUI にアクセスし、お使いの Milvus インスタンスの詳細を確認できます。詳細については、<a href="/docs/ja/v2.6.x/milvus-webui.md">Milvus WebUI</a> を参照してください。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(オプション) Milvus の設定を更新する<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
<p>適用可能な設定項目については、「<a href="/docs/ja/v2.6.x/system_configuration.md">システム設定</a>」を参照してください。</p>
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
    </button></h2><p>組み込みのアップグレードコマンドを使用して、Milvusを最新バージョンにアップグレードできます。これにより、最新の設定とMilvusイメージが自動的にダウンロードされます:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>アップグレードコマンドは自動的に以下の処理を行います：</p>
<ul>
<li>更新された設定を含む最新のインストールスクリプトをダウンロードします</li>
<li>最新のMilvus Dockerイメージを取得します</li>
<li>新しいバージョンでコンテナを再起動します</li>
<li>既存のデータと設定を保持します</li>
</ul>
<p>これが、Milvusのスタンドアロン環境をアップグレードするための推奨方法です。</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Milvusを停止して削除する<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>このコンテナは、以下の手順で停止および削除できます</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p><a href="/docs/ja/v2.6.x/quickstart.md">クイックスタートを</a>参照して、Milvusの機能を確認してください。</p></li>
<li><p>Milvusの基本的な操作を学びましょう：</p>
<ul>
<li><a href="/docs/ja/v2.6.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.6.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.6.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.6.x/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/v2.6.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.6.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.6.x/upgrade_milvus_cluster-helm.md">Helmチャートを使用したMilvusのアップグレード</a></p></li>
<li><p><a href="/docs/ja/v2.6.x/scaleout.md">Milvusクラスタのスケーリング</a></p></li>
<li><p>クラウド上に Milvus クラスターをデプロイする:</p>
<ul>
<li><a href="/docs/ja/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ja/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvusの可観測性と管理のための直感的なWebインターフェース「<a href="/docs/ja/v2.6.x/milvus-webui.md">Milvus WebUI</a>」をご覧ください。</p></li>
<li><p>Milvusデータのバックアップを行うオープンソースツール「<a href="/docs/ja/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>」をご覧ください。</p></li>
<li><p>Milvusのデバッグや動的な構成更新を行うためのオープンソースツール「<a href="/docs/ja/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>」をご覧ください。</p></li>
<li><p>Milvusを直感的に管理するためのオープンソースGUIツール「<a href="https://github.com/zilliztech/attu">Attu</a>」をご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.6.x/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
