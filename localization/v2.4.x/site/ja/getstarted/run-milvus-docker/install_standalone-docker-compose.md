---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Docker Composeを使ってmilvusをスタンドアロンインストールする方法をご紹介します。
title: Docker ComposeでMilvusを起動する(Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Docker ComposeでMilvusを起動する(Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker Composeを使用してDocker上でMilvusインスタンスを起動する方法を説明します。</p>
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
<li><a href="https://docs.docker.com/get-docker/">Dockerをインストール</a>します。</li>
<li>インストール前に<a href="/docs/ja/v2.4.x/prerequisite-docker.md">ハードウェアとソフトウェアの要件を確認して</a>ください。</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Milvusのインストール<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはDocker Composeの設定ファイルをMilvusリポジトリで提供しています。Docker Composeを使用してMilvusをインストールするには、以下のコマンドを実行してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>上記コマンドの実行に失敗した場合は、システムにDocker Compose V1がインストールされているか確認してください。もしそうであれば、<a href="https://docs.docker.com/compose/">このページの</a>注意事項に従い、Docker Compose V2に移行することをお勧めします。</p></li>
<li><p>もしイメージのプルに関して問題が発生した場合は、<a href="mailto:community@zilliz.com">community@zilliz.com</a>まで問題の詳細をご連絡ください。</p></li>
</ul>
</div>
<p>milvusの起動後、</p>
<ul>
<li><strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、<strong>milvus-etcdという</strong>名前のコンテナが立ち上がっています。<ul>
<li><strong>milvus-etcd</strong>コンテナはホストにポートを公開せず、カレントフォルダ内の<strong>volumes/etcdに</strong>データをマッピングする。</li>
<li><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してポート<strong>9090</strong>および<strong>9091</strong>をローカルに提供し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマップする。</li>
<li><strong>milvus-standalone</strong>コンテナは、デフォルト設定でローカルにポート<strong>19530</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマップする。</li>
</ul></li>
</ul>
<p>コンテナが稼働しているかどうかは、以下のコマンドで確認できる：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>このコンテナは、以下のようにして停止および削除できる。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>DockerにMilvusをインストールしたら、次のことができます：</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/quickstart.md">クイックスタートで</a>Milvusの機能を確認する。</p></li>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-helm.md">Helm Chartを使用したMilvusのアップグレード</a>。</p></li>
<li><p><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタをスケールする</a>。</p></li>
<li><p>Milvusクラスターをクラウド上にデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvusの</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backupを</a>ご紹介します。</p></li>
<li><p>Milvusのデバッグとダイナミックコンフィギュレーションアップデートのためのオープンソースツール、<a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcherの</a>ご紹介。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://github.com/zilliztech/attu">Attuを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">PrometheusでMilvusを監視する</a>。</p></li>
</ul>
