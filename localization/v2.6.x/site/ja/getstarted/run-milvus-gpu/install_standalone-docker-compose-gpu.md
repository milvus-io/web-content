---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Kubernetes上にMilvusクラスターをインストールする方法について学びましょう。
title: Docker Compose を使用して GPU 対応の Milvus を実行する
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Docker Compose を使用して GPU 対応の Milvus を実行する<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker Compose を使用して GPU 対応の Milvus インスタンスを起動する方法について説明します。</p>
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
<li>インストール前に、<a href="/docs/ja/v2.6.x/prerequisite-gpu.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
</ul>
<div class="alert note">
<p>イメージの取得で問題が発生した場合は、問題の詳細を<a href="mailto:community@zilliz.com">community@zilliz.com</a>までご連絡ください。必要なサポートを提供いたします。</p>
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
    </button></h2><p>Docker Compose を使用して GPU 対応の Milvus をインストールするには、以下の手順に従ってください。</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. YAML ファイルをダウンロードして設定します<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>ダウンロード <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> をダウンロードし、手動で、または以下のコマンドを使用して「docker-compose.yml」という名前で保存してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>YAML ファイル内のスタンドアロンサービスの環境変数を、次のように変更する必要があります。</p>
<ul>
<li>Milvusに特定のGPUデバイスを割り当てるには、<code translate="no">standalone</code> サービスの定義内にある<code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> フィールドを見つけ、その値を目的のGPUのIDに置き換えてください。GPUデバイスのIDを確認するには、NVIDIA GPUディスプレイドライバに同梱されている<code translate="no">nvidia-smi</code> ツールを使用できます。Milvusは複数のGPUデバイスに対応しています。</li>
</ul>
<p>Milvusに単一のGPUデバイスを割り当てる:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>複数のGPUデバイスをMilvusに割り当てるには：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Milvus を起動する<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>docker-compose.yml が存在するディレクトリで、以下のコマンドを実行して Milvus を起動します:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上記のコマンドが実行できなかった場合は、システムに Docker Compose V1 がインストールされているかどうかを確認してください。インストールされている場合は、<a href="https://docs.docker.com/compose/">このページの</a>注意事項に基づき、Docker Compose V2 への移行を推奨します。</p>
</div>
<p>Milvusの起動後、</p>
<ul>
<li><strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、および<strong>milvus-etcd</strong>という名前のコンテナが起動します。
<ul>
<li><strong>milvus-etcd</strong>コンテナはホストに対してポートを公開しておらず、そのデータは現在のフォルダ内の<strong>volumes/etcd</strong>にマッピングされます。</li>
<li><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してローカルでポート<strong>9090</strong>および<strong>9091</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマッピングします。</li>
<li><strong>milvus-standalone</strong>コンテナは、デフォルト設定でローカルのポート<strong>19530</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングします。</li>
</ul></li>
</ul>
<p>以下のコマンドを使用して、コンテナが起動して実行中かどうかを確認できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>また、<code translate="no">http://127.0.0.1:9091/webui/</code> から Milvus WebUI にアクセスして、お使いの Milvus インスタンスの詳細を確認することもできます。詳細については、<a href="/docs/ja/v2.6.x/milvus-webui.md">Milvus WebUI</a> を参照してください。</p>
<p>docker-compose.yml で Milvus に複数の GPU デバイスを割り当てている場合、どの GPU デバイスを可視化するか、または使用可能にするかを指定できます。</p>
<p>GPUデバイス<code translate="no">0</code> を Milvus から認識可能にするには：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>GPUデバイス<code translate="no">0</code> および<code translate="no">1</code> を Milvus から認識可能にするには：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>このコンテナは、以下の手順で停止および削除できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
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
    </button></h2><p>Milvus が起動して実行された後、<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">initMemSize</code> および<code translate="no">maxMemSize</code> の設定を変更することで、メモリプールをカスタマイズできます。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> ファイルは、Milvusコンテナ内の<code translate="no">/milvus/configs/</code> ディレクトリにあります。</p>
</div>
<p>メモリプールを設定するには、<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">initMemSize</code> および<code translate="no">maxMemSize</code> の設定を次のように変更します。</p>
<ol>
<li><p>次のコマンドを使用して、<code translate="no">milvus.yaml</code> を Milvus コンテナからローカルマシンにコピーします。<code translate="no">&lt;milvus_container_id&gt;</code> を実際の Milvus コンテナ ID に置き換えてください。</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>コピーした<code translate="no">milvus.yaml</code> ファイルを、お好みのテキストエディタで開きます。例えば、vim を使用する場合：</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>必要に応じて<code translate="no">initMemSize</code> および<code translate="no">maxMemSize</code> の設定を編集し、変更を保存してください:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: メモリプールの初期サイズ。デフォルトは 1024 です。</li>
<li><code translate="no">maxMemSize</code>: メモリプールの最大サイズ。デフォルトは 2048 です。</li>
</ul></li>
<li><p>以下のコマンドを使用して、変更した `<code translate="no">milvus.yaml</code> ` ファイルを Milvus コンテナにコピーし直します。<code translate="no">&lt;milvus_container_id&gt;</code> を実際の Milvus コンテナ ID に置き換えてください。</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>変更を反映させるために、Milvusコンテナを再起動します:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>DockerにMilvusをインストールしたら、次のことができます:</p>
<ul>
<li><p><a href="/docs/ja/v2.6.x/quickstart.md">クイックスタートを</a>参照して、Milvusの機能を確認してください。</p></li>
<li><p><a href="/docs/ja/v2.6.x/milvus-webui.md">Milvus WebUI</a>を確認して、Milvusインスタンスについてさらに詳しく学びましょう。</p></li>
<li><p>Milvusの基本的な操作を学びましょう:</p>
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
<li><p>Milvusを直感的に管理できるオープンソースのGUIツール「<a href="https://github.com/zilliztech/attu">Attu</a>」をご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.6.x/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
