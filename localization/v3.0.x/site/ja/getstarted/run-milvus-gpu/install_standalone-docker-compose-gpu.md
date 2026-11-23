---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: Docker Compose を使用して、GPU 対応の Milvus スタンドアロンをインストールする方法について学びましょう。
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
<li>インストール前に、<a href="/docs/ja/prerequisite-gpu.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
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
    </button></h3><p>ダウンロード <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> 手動で、または以下のコマンドを使用してダウンロードし、docker-compose.ymlという名前で保存してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>ダウンロードが正常に行われたか確認するには、次のコマンドの出力を、<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">リリースページ</a>（<code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> ）に記載されている「<code translate="no">sha256</code> 」のダイジェストと比較してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>YAML ファイル内の<code translate="no">standalone</code> サービスの「<code translate="no">deploy</code> 」セクションで、Milvus に割り当てられる GPU デバイスを次のように変更できます：</p>
<ul>
<li>特定のGPUデバイスをMilvusに割り当てるには、<code translate="no">standalone</code> サービスの定義内で<code translate="no">deploy.resources.reservations.devices[0].device_ids</code> フィールドを見つけ、その値を目的のGPUのIDに置き換えます。GPUデバイスのIDを確認するには、NVIDIA GPUディスプレイドライバーに同梱されている<code translate="no">nvidia-smi</code> ツールを使用できます。Milvusは複数のGPUデバイスに対応しています。</li>
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
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Milvusの起動<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上記のコマンドが実行できなかった場合は、システムに Docker Compose V1 がインストールされているかどうかを確認してください。インストールされている場合は、<a href="https://docs.docker.com/compose/">このページの</a>注意事項に基づき、Docker Compose V2 への移行を推奨します。</p>
</div>
<p>Milvusの起動後、</p>
<ul>
<li><strong>「milvus-standalone</strong>」、「<strong>milvus-minio</strong>」、「<strong>milvus-etcd</strong>」という名前のコンテナが起動します。
<ul>
<li><strong>milvus-etcd</strong>コンテナはホストに対してポートを公開しておらず、そのデータは現在のフォルダ内の<strong>volumes/etcd</strong>にマッピングされます。</li>
<li><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してポート<strong>9000</strong>および<strong>9001</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマッピングします。</li>
<li><strong>milvus-standalone</strong>コンテナは、デフォルト設定でポート<strong>19530</strong>および<strong>9091</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングします。</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> サービスは<code translate="no">security_opt: seccomp:unconfined</code> を設定するため、MilvusコンテナはデフォルトのDocker seccompプロファイルなしで実行されます。</p>
<div class="alert warning">
<blockquote>
<p>Compose ファイルでは、これらのポートをホスト IP なしで公開しているため、Docker はそれらをホストのすべてのネットワークインターフェースにバインドし、このホストにアクセスできる他のマシンから Milvus および MinIO に接続できるようになります。MinIO は、Compose ファイルで設定されているアクセスキーとシークレットキー<code translate="no">minioadmin</code> を使用します。 ポートをループバックアドレスのみに公開するには、<code translate="no">docker-compose.yml</code> 内の<code translate="no">minio</code> および<code translate="no">standalone</code> サービスの<code translate="no">ports</code> エントリに<code translate="no">127.0.0.1:</code> を追加します（例：<code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> ）。その後、<code translate="no">sudo docker compose up -d</code> を再度実行してください。 詳細については、「<a href="https://docs.docker.com/engine/network/port-publishing/">ポートの公開とマッピング</a>」を参照してください。他の MinIO 認証情報を使用するには、<code translate="no">minio</code> サービスの<code translate="no">MINIO_ACCESS_KEY</code> および<code translate="no">MINIO_SECRET_KEY</code> を変更し、Milvus 設定の<code translate="no">minio.accessKeyID</code> および<code translate="no">minio.secretAccessKey</code> に同じ値を設定してください。Milvus へのクライアント接続にユーザー名とパスワードを必須にするには、<a href="/docs/ja/authenticate.md">「ユーザーアクセスの認証」を</a>参照してください。</p>
</blockquote>
</div>
<p>以下のコマンドを使用して、コンテナが起動して実行中かどうかを確認できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトでは、このコマンドは実行中のコンテナのみを表示します。出力に<strong>milvus-etcd</strong>、<strong>milvus-minio</strong>、および<strong>milvus-standalone</strong>コンテナが一覧表示され、それぞれの「<code translate="no">STATUS</code> 」列が<code translate="no">Up</code> で始まっていることを確認してください。</p>
<p>また、<code translate="no">http://127.0.0.1:9091/webui/</code> から Milvus WebUI にアクセスして、お使いの Milvus インスタンスに関する詳細を確認することもできます。詳細については、「<a href="/docs/ja/milvus-webui.md">Milvus WebUI</a>」を参照してください。</p>
<p>Milvusの起動後に使用するGPUデバイスを変更するには、手順1に示すように、docker-compose.yml内の<code translate="no">standalone</code> サービスの<code translate="no">deploy.resources.reservations.devices</code> の下にある<code translate="no">device_ids</code> フィールドを編集し、次のコマンドを実行します。サービス設定が変更されたため、<code translate="no">docker compose up</code> は停止し、<strong>milvus-standalone</strong>コンテナを再作成します。 詳細については、「<a href="https://docs.docker.com/compose/how-tos/gpu-support/">GPU アクセス可能な Docker Compose サービスの実行</a>」を参照してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>このコンテナは、次のように停止および削除できます。</p>
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
    </button></h2><p>Milvus が起動して実行された後、Milvus 設定の `<code translate="no">gpu</code> ` セクションにある `<code translate="no">initMemSize</code> ` および `<code translate="no">maxMemSize</code> ` の設定を変更することで、メモリプールをカスタマイズできます。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> ファイルは、Milvusコンテナ内の<code translate="no">/milvus/configs/</code> ディレクトリにあります。同じディレクトリにある<code translate="no">user.yaml</code> ファイルの設定は、<code translate="no">milvus.yaml</code> 内の値よりも優先されます。</p>
</div>
<p>コンテナが再作成された際にも設定を維持するには、ホスト上の<code translate="no">user.yaml</code> ファイルに設定を保存し、次のようにそのファイルをコンテナにマウントします。</p>
<ol>
<li><p>docker-compose.yml が存在するディレクトリに、変更したい設定を記述した<code translate="no">user.yaml</code> という名前のファイルを作成します。以下の例は、<code translate="no">gpu</code> セクションのデフォルト値を示しています。必要に応じて、これらの値を適切なサイズに置き換えてください:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: メモリプールの初期サイズ（MB単位）。デフォルトは 2048 です。</li>
<li><code translate="no">maxMemSize</code>: メモリプールの最大サイズ（MB単位）。デフォルトは 4096 です。</li>
</ul></li>
<li><p>docker-compose.yml 内で、<code translate="no">standalone</code> サービスの<code translate="no">volumes</code> リストに<code translate="no">user.yaml</code> ファイルを追加します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>変更を反映するために、Milvusコンテナを再作成します:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>ファイルのマウントが完了したら、<code translate="no">standalone</code> サービスを再起動して、<code translate="no">user.yaml</code> への後続の変更を適用します:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3はデフォルトで無効になっています。Storage V3に依存する機能を使用する前に、有効にしてください。要件および互換性に関する考慮事項については、「<a href="/docs/ja/storage-v3.md">Storage V3</a>」を参照してください。</p>
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
<li><p><a href="/docs/ja/quickstart.md">クイックスタートを</a>参照して、Milvusの機能を確認してください。</p></li>
<li><p><a href="/docs/ja/milvus-webui.md">Milvus WebUI</a>を確認して、Milvusインスタンスについてさらに詳しく学びましょう。</p></li>
<li><p>Milvusの基本的な操作を学びましょう：</p>
<ul>
<li><a href="/docs/ja/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/upgrade_milvus_standalone-docker.md">Docker Compose を使用して Milvus Standalone をアップグレードします</a>。そのページには CPU イメージのタグが表示されています。この GPU 展開では、<code translate="no">-gpu</code> というサフィックス（<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> ）を維持し、<code translate="no">deploy</code> および<code translate="no">user.yaml</code> の設定もそのままにしてください。</p></li>
<li><p>Kubernetes 上で<a href="/docs/ja/scaleout.md">Milvus クラスタをスケールアウトします</a>。この手順では Helm を使用するため、この Docker デプロイには適用されません。</p></li>
<li><p>クラウド上でMilvusクラスターをデプロイする:</p>
<ul>
<li><a href="/docs/ja/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ja/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvusの可観測性と管理のための直感的なWebインターフェースである「<a href="/docs/ja/milvus-webui.md">Milvus WebUI</a>」をご覧ください。</p></li>
<li><p>Milvusデータのバックアップを行うオープンソースツール「<a href="/docs/ja/milvus_backup_overview.md">Milvus Backup</a>」をご覧ください。</p></li>
<li><p>Milvusのデバッグや動的な構成更新を行うためのオープンソースツール「<a href="/docs/ja/birdwatcher_overview.md">Birdwatcher</a>」をご覧ください。</p></li>
<li><p>直感的な Milvus 管理のためのオープンソース GUI ツール「<a href="https://github.com/zilliztech/attu">Attu</a>」をご覧ください。</p></li>
<li><p><a href="/docs/ja/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
