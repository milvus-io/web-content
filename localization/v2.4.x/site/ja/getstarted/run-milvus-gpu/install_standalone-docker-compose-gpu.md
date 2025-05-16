---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: KubernetesにMilvusクラスタをインストールする方法をご紹介します。
title: Docker Composeを使用したGPUサポート付きMilvusの実行
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Docker Composeを使用したGPUサポート付きMilvusの実行<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker Composeを使用してGPUをサポートしたMilvusインスタンスを起動する方法を説明します。</p>
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
<li>インストールの前に<a href="/docs/ja/v2.4.x/prerequisite-gpu.md">ハードウェアとソフトウェアの要件を確認して</a>ください。</li>
</ul>
<div class="alert note">
<p>イメージのプル時に問題が発生した場合は、<a href="mailto:community@zilliz.com">community@zilliz.com</a>まで問題の詳細をご連絡ください。</p>
</div>
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
    </button></h2><p>Docker Composeを使用してGPUをサポートしたMilvusをインストールするには、以下の手順に従ってください。</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1.YAMLファイルのダウンロードと設定</h3><p>ダウンロード <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a>をダウンロードし、docker-compose.ymlとして手動または以下のコマンドで保存します。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>YAMLファイル内のスタンドアロンサービスの環境変数に、以下のように変更を加える必要があります：</p>
<ul>
<li>特定の GPU デバイスを Milvus に割り当てるには、<code translate="no">standalone</code> サービスの定義で<code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> フィールドを探し、その値を目的の GPU の ID に置き換えます。NVIDIA GPUディスプレイドライバに含まれる<code translate="no">nvidia-smi</code> ツールを使用して、GPUデバイスのIDを決定することができます。Milvusは複数のGPUデバイスをサポートしています。</li>
</ul>
<p>単一のGPUデバイスをMilvusに割り当てます：</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Milvusに複数のGPUデバイスを割り当てる：</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2.Milvusを起動します。</h3><p>docker-compose.ymlが格納されているディレクトリで、Milvusを起動します：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上記のコマンドを実行できなかった場合は、システムにDocker Compose V1がインストールされているかどうかを確認してください。上記のコマンドを実行できなかった場合は、Docker Compose V1がインストールされているか確認してください。</p>
</div>
<p>milvusの起動後、</p>
<ul>
<li><strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、<strong>milvus-etcdという</strong>名前のコンテナが立ち上がっています。<ul>
<li><strong>milvus-etcd</strong>コンテナはホストにポートを公開せず、カレントフォルダ内の<strong>volumes/etcdに</strong>データをマッピングする。</li>
<li><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してポート<strong>9090</strong>および<strong>9091</strong>をローカルに提供し、そのデータをカレントフォルダ内の<strong>volumes/minio</strong>にマップする。</li>
<li><strong>milvus-standalone</strong>コンテナは、デフォルト設定でローカルにポート<strong>19530</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマップする。</li>
</ul></li>
</ul>
<p>コンテナが稼働しているかどうかは、以下のコマンドで確認できます：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>docker-compose.ymlでMilvusに複数のGPUデバイスを割り当てている場合は、どのGPUデバイスを可視または使用可能にするかを指定できます。</p>
<p>GPU デバイス<code translate="no">0</code> を Milvus から見えるようにします：</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>GPUデバイス<code translate="no">0</code> と<code translate="no">1</code> をMilvusから見えるようにします：</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>このコンテナは、次のように停止および削除できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">メモリプールの設定<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの起動後、<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">initMemSize</code> と<code translate="no">maxMemSize</code> の設定を変更することで、メモリプールをカスタマイズすることができます。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> ファイルは、Milvus コンテナ内の<code translate="no">/milvus/configs/</code> ディレクトリにあります。</p>
</div>
<p>メモリプールをカスタマイズするには、<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">initMemSize</code> および<code translate="no">maxMemSize</code> の設定を以下のように変更します。</p>
<ol>
<li><p>以下のコマンドを使用して、<code translate="no">milvus.yaml</code> を Milvus コンテナからローカルマシンにコピーする。<code translate="no">&lt;milvus_container_id&gt;</code> を実際の Milvus コンテナ ID に置き換える。</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>コピーした<code translate="no">milvus.yaml</code> ファイルをテキストエディタで開く。例えば、vimを使用する：</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">initMemSize</code> と<code translate="no">maxMemSize</code> の設定を必要に応じて編集し、変更を保存する：</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>:メモリプールの初期サイズ。デフォルトは1024。</li>
<li><code translate="no">maxMemSize</code>:メモリプールの最大サイズ。デフォルトは 2048 である。</li>
</ul></li>
<li><p>以下のコマンドを使用して、変更した<code translate="no">milvus.yaml</code> ファイルを Milvus コンテナにコピーする。<code translate="no">&lt;milvus_container_id&gt;</code> を実際の Milvus コンテナ ID に置き換える。</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusコンテナを再起動し、変更を適用する：</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">次の作業<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Milvuクラスタをクラウドにデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvusの</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backupを</a>紹介します。</p></li>
<li><p>Milvusのデバッグとダイナミックコンフィギュレーションアップデートのためのオープンソースツール、<a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcherの</a>ご紹介。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://milvus.io/docs/attu.md">Attuを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">PrometheusでMilvusを監視する</a>。</p></li>
</ul>
