---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: MilvusをDockerでスタンドアロンインストールする方法をご紹介します。
title: DockerでMilvusを起動する(Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">DockerでMilvusを起動する(Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、DockerでMilvusインスタンスを起動する方法を説明します。</p>
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
<li><a href="https://docs.docker.com/get-docker/">Dockerをインストールして</a>ください。</li>
<li>インストール前に<a href="/docs/ja/prerequisite-docker.md">ハードウェアとソフトウェアの要件を確認して</a>ください。</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">DockerへのMilvusのインストール<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはDockerコンテナとしてインストールするためのインストールスクリプトを提供しています。このスクリプトは<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvusリポジトリから</a>入手可能です。DockerにMilvusをインストールするには、以下を実行してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>スタンドアロンデプロイメントモードで<a href="https://milvus.io/docs/milvus_backup_overview.md">Backupを</a>使用する場合は、<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>デプロイメントメソッドを使用することを推奨します。</p>
<p>イメージのプルに問題が発生した場合は、<a href="mailto:community@zilliz.com">community@zilliz.com</a>まで問題の詳細をご連絡ください。</p>
</div>
<p>インストールスクリプトの実行後</p>
<ul>
<li>milvus という名前の docker コンテナがポート<strong>19530</strong> で開始されました。</li>
<li>milvusと一緒にembed etcdが同じコンテナにインストールされ、ポート<strong>2379で</strong>サービスを提供しています。その設定ファイルは、現在のフォルダ内の<strong>embedEtcd.yaml</strong>にマップされています。</li>
<li>Milvusのデフォルト設定を変更するには、カレントフォルダ内の<strong>user.yaml</strong>ファイルに設定を追加し、サービスを再起動します。</li>
<li>Milvusデータボリュームはカレントフォルダ内の<strong>volumes/milvusに</strong>マッピングされます。</li>
</ul>
<p>Milvusインスタンスの詳細については、<code translate="no">http://127.0.0.1:9091/webui/</code> からMilvus WebUIにアクセスすることができます。詳細は<a href="/docs/ja/milvus-webui.md">Milvus WebUIを</a>ご参照ください。</p>
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
    </button></h2><p>このコンテナは、以下の手順で停止および削除することができます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusの最新バージョンへのアップグレードは以下の手順で行うことができます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
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
    </button></h2><p>DockerにMilvusをインストールしました：</p>
<ul>
<li><p><a href="/docs/ja/quickstart.md">クイックスタートで</a>Milvusの機能を確認する。</p></li>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/upgrade_milvus_cluster-helm.md">Helm Chartを使用したMilvusのアップグレード</a>。</p></li>
<li><p><a href="/docs/ja/scaleout.md">Milvusクラスタをスケールする</a>。</p></li>
<li><p>Milvuクラスタをクラウドにデプロイする：</p>
<ul>
<li><a href="/docs/ja/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/milvus-webui.md">Milvusの</a>観測と管理のための直感的なWebインターフェースである<a href="/docs/ja/milvus-webui.md">Milvus WebUIを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/milvus_backup_overview.md">Milvus</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/milvus_backup_overview.md">Milvus Backupを</a>ご紹介します。</p></li>
<li><p>Milvusのデバッグとダイナミックなコンフィギュレーション更新のためのオープンソースツール、<a href="/docs/ja/birdwatcher_overview.md">Birdwatcherを</a>ご覧ください。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://github.com/zilliztech/attu">Attuを</a>ご紹介します。</p></li>
<li><p><a href="/docs/ja/monitor.md">PrometheusでMilvusを監視する</a>。</p></li>
</ul>
