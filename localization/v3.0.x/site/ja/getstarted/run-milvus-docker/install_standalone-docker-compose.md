---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Docker Compose を使用して Milvus スタンドアロンをインストールする方法について学びましょう。
title: Docker Compose を使用して Milvus を実行する（Linux）
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Docker Compose を使用して Milvus を実行する（Linux）<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker Compose を使用して Docker 内で Milvus インスタンスを起動する方法について説明します。</p>
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
<li><a href="https://docs.docker.com/get-docker/">Docker をインストールします</a>。</li>
<li><a href="https://docs.docker.com/compose/install/linux/">Docker Compose プラグイン</a>（V2 以降）をインストールし、<code translate="no">docker compose version</code> で動作を確認してください。この手順では、従来の<code translate="no">docker-compose</code> V1 コマンドではなく、<code translate="no">docker compose</code> を使用します。</li>
<li>インストール前に、<a href="/docs/ja/prerequisite-docker.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
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
    </button></h2><p>Milvusのリポジトリには、Docker Composeの設定ファイルが用意されています。以下の<code translate="no">wget</code> コマンドを使用して、v3.0.5用の設定ファイルをダウンロードしてください。ダウンロード直後、ファイルを編集したり<code translate="no">sudo docker compose up -d</code> でMilvusを起動したりする前に、<code translate="no">sha256sum docker-compose.yaml</code> を実行し、<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">その結果をv3.0.5のリリースページ</a>（<code translate="no">milvus-standalone-docker-compose.yaml</code> ）に記載されている<code translate="no">sha256</code> ダイジェストと比較してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>デフォルトのデプロイ（v3.0.5）：</strong> <code translate="no">docker compose up -d</code> は、<code translate="no">milvus-etcd</code> （メタデータ）、<code translate="no">milvus-minio</code> （オブジェクトストレージ）、および<code translate="no">milvus-standalone</code> の 3 つの長時間実行コンテナを起動します。メッセージキューは<strong>Woodpecker（組み込み型、WAL バックエンドとして MinIO / オブジェクトストレージを使用）</strong>であるため、別途メッセージキューコンテナは必要ありません。</p>
<p>また、この設定では、データディレクトリの所有権を設定するために、ワンショットで<code translate="no">milvus-volume-init</code> サービスも実行されます。このタスクが完了すると、サービスは終了します。</p>
<p><strong>バージョンごとのメッセージキューのデフォルト設定：</strong></p>
<ul>
<li><strong>2.5.x</strong>— デフォルトのメッセージキューは<strong>RocksMQ</strong> です。</li>
<li><strong>2.6.x 以降</strong>— デフォルトのメッセージキューは<strong>Woodpecker（組み込み型）</strong>です。</li>
</ul>
<p>インストールするリリースに付属の設定ファイルを使用してください。既存のデプロイメントについては、設定ファイルを新規インストール用ファイルで置き換えるのではなく、アップグレード手順に従ってください。</p>
<ul>
<li><p><code translate="no">docker compose</code> が利用できない場合は、<a href="https://docs.docker.com/compose/install/linux/">Dockerの手順</a>に従ってComposeプラグインをインストールしてください。</p></li>
<li><p>イメージの取得で問題が発生した場合は、問題の詳細を明記の上、<a href="mailto:community@zilliz.com">community@zilliz.com</a>までご連絡ください。必要なサポートを提供いたします。</p></li>
</ul>
</div>
<p>Milvusの起動後、</p>
<ul>
<li><strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、および<strong>milvus-etcd</strong>という名前のコンテナが起動します。
<ul>
<li><strong>milvus-etcd</strong>コンテナはホストに対してポートを公開せず、そのデータを現在のフォルダ内の<strong>volumes/etcd</strong>にマッピングします。</li>
<li><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してポート<strong>9000</strong>および<strong>9001</strong>を公開し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマッピングします。</li>
<li><strong>milvus-standalone</strong>コンテナは、デフォルト設定でポート<strong>19530</strong>および<strong>9091</strong>を公開し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングします。</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> サービスは<code translate="no">security_opt: seccomp:unconfined</code> を設定するため、MilvusコンテナはデフォルトのDocker seccompプロファイルなしで実行されます。</p>
<div class="alert warning">
<blockquote>
<p>この設定ファイルでは、ホストアドレスを指定せずにこれらのポートを公開しています。Dockerはホストアドレスを指定せずにポートを公開すると、すべてのホストアドレスに対して公開されるため、このホストにアクセス可能な他のマシンからもMilvusおよびMinIOに接続できるようになります。MinIOは、設定ファイルで設定されているアクセスキーとシークレットキー（<code translate="no">minioadmin</code> ）を使用します。 このホストへのアクセスを制限するには、<code translate="no">docker-compose.yaml</code> 内の<code translate="no">minio</code> および<code translate="no">standalone</code> サービスの<code translate="no">ports</code> エントリに<code translate="no">127.0.0.1:</code> を追加し（例:<code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> ）、<code translate="no">sudo docker compose up -d</code> を再度実行します。他の MinIO 認証情報を使用するには、<code translate="no">minio</code> サービスの<code translate="no">MINIO_ACCESS_KEY</code> および<code translate="no">MINIO_SECRET_KEY</code> を変更し、Milvus 設定の<code translate="no">minio.accessKeyID</code> および<code translate="no">minio.secretAccessKey</code> にも同じ値を設定します。Milvus 接続に認証情報を必須にするには、<a href="/docs/ja/authenticate.md">「ユーザーアクセスの認証」</a>を参照してください。</p>
</blockquote>
</div>
<p>以下のコマンドを使用して、コンテナが起動して実行中かどうかを確認できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">PORTS</code> 列には、IPv6 アドレス<code translate="no">[::]</code> を持つ各公開ポート（例:<code translate="no">[::]:19530-&gt;19530/tcp</code> ）も一覧表示される場合があります。これは、Docker が<code translate="no">0.0.0.0</code> および<code translate="no">[::]</code> の両方で、ホストアドレスを指定せずにポートを公開するためです。</p>
<p>また、<code translate="no">http://127.0.0.1:9091/webui/</code> から Milvus WebUI にアクセスして、お使いの Milvus インスタンスについて詳しく確認することもできます。詳細については、<a href="/docs/ja/milvus-webui.md">Milvus WebUI</a> を参照してください。</p>
<p>実行中のサーバーを試すには、<a href="/docs/ja/quickstart.md">クイックスタートの</a>「<strong>既存のMilvusサーバーを使用する</strong>」手順に従い、<code translate="no">http://localhost:19530</code> に接続してください。別のMilvus Liteデータベースを起動してしまう「<code translate="no">.db</code> 」へのローカル接続ブロックは使用しないでください。</p>
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
    </button></h2><p>ニーズに合わせて Milvus の設定を更新するには、ホスト上の<code translate="no">user.yaml</code> ファイルに設定を記述し、<code translate="no">milvus-standalone</code> コンテナ内の<code translate="no">/milvus/configs/user.yaml</code> にマウントしてください。この設定ファイルは<code translate="no">/var/lib/milvus</code> のみをこのコンテナにマウントするため、コンテナ内で編集した<code translate="no">user.yaml</code> は、<code translate="no">docker-compose.yaml</code> や Milvus イメージの変更後など、Compose がコンテナを再作成した際に失われます。</p>
<ol>
<li><p><code translate="no">docker-compose.yaml</code> を含むフォルダ内に<code translate="no">user.yaml</code> を作成します。マウントする前にファイルを作成してください。ソースパスが存在しない場合、Compose はその名前のディレクトリを代わりに作成します。
以下では、デフォルトの<code translate="no">proxy.healthCheckTimeout</code> を上書きする必要があることを前提としています。該当する設定項目については、「<a href="/docs/ja/system_configuration.md">システム設定</a>」を参照してください。</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">docker-compose.yaml</code> 内で、<code translate="no">standalone</code> サービスの `<code translate="no">volumes</code> ` リストにこのファイルを追加します。<code translate="no">security_opt</code> 、<code translate="no">healthcheck</code> 、<code translate="no">depends_on</code> などのサービスのその他の設定は、そのままにしておきます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>変更を適用します。サービス構成が変更されたため、Compose は<code translate="no">milvus-standalone</code> コンテナを再作成し、マウントされたボリューム内のデータを保持します。</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>ファイルのマウントが完了したら、<code translate="no">user.yaml</code> へのその後の変更を反映させるために、<code translate="no">standalone</code> サービスを再起動します：</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">既存のデプロイメントをアップグレードする<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6.x スタンドアロン展開の場合は、「<a href="/docs/ja/upgrade_milvus_standalone-docker.md">Docker Compose を使用した Milvus スタンドアロンのアップグレード</a>」の手順に従ってください。メタデータと永続データをバックアップし、既存の依存関係と設定を保持した上で、Milvus イメージを変更する前に、ドキュメントに記載されているソースからターゲットへのアップグレードパスを検証してください。 古いデプロイメントの Compose ファイルを、上記の新規インストール用設定で置き換えないでください。</p>
<p><strong>メッセージキューの制限事項</strong>: Milvus v3.0.5 へアップグレードする際は、現在のメッセージキューの選択を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更に対するサポートは、将来のバージョンで提供される予定です。</p>
<p>Milvus 2.6.x 以降では Woodpecker がデフォルトとなり、2.5.x のデプロイメントでは<strong>RocksMQ が</strong>デフォルトとなります。アップグレード対象のデプロイメントがまだ RocksMQ を実行している場合は、Milvus イメージを変更する前に `<code translate="no">user.yaml</code> ` でこれを固定してください。これにより、アップグレード後のインスタンスは新しいデフォルトで起動するのではなく、既存のメッセージキューを維持します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>アップグレード後のインスタンスが v3.0.5 で稼働し始めたら、Milvus 3.0 以降で利用可能な「<a href="/docs/ja/switch-mq-type.md">メッセージキューの切り替え</a>」機能を使用して、RocksMQ から Woodpecker へ移行できます。</p>
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
    </button></h2><p>このデプロイメントでは、メッセージングに<strong>Woodpecker</strong>（組み込み型、MinIO WAL バックエンド）、メタデータに<strong>etcd</strong>、オブジェクトストレージに<strong>MinIO</strong>を使用しています。別のメッセージキューを使用する場合や、外部のオブジェクトストレージ／メタデータに接続する場合は、以下を参照してください：</p>
<ul>
<li>メッセージキュー：<a href="/docs/ja/woodpecker.md">Woodpecker</a>（デフォルト） ·<a href="/docs/ja/mq_pulsar.md">Pulsar</a>·<a href="/docs/ja/mq_kafka.md">Kafka</a>·<a href="/docs/ja/mq_rocksmq.md">RocksMQ</a></li>
<li>オブジェクトストレージ：<a href="/docs/ja/deploy_s3.md">MinIO</a>（デフォルト） ·<a href="/docs/ja/deploy_s3.md">AWS S3</a>·<a href="/docs/ja/abs.md">Azure Blob</a>·<a href="/docs/ja/gcs.md">GCP Cloud Storage</a>·<a href="/docs/ja/deploy_s3.md">Aliyun OSS</a>·<a href="/docs/ja/deploy_s3.md">Tencent COS</a>·<a href="/docs/ja/deploy_s3.md">Huawei OBS</a>·<a href="/docs/ja/deploy_s3.md">S3互換</a></li>
<li>メタデータ:<a href="/docs/ja/deploy_etcd.md">etcd</a></li>
</ul>
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
<li><p><a href="/docs/ja/quickstart.md">「クイックスタート」を</a>参照して、Milvusの機能を確認してください。</p></li>
<li><p>Milvusの基本的な操作を学びましょう：</p>
<ul>
<li><a href="/docs/ja/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/upgrade_milvus_standalone-docker.md">Docker Compose を使用して Milvus Standalone をアップグレードします</a>。</p></li>
<li><p>Kubernetes 上で<a href="/docs/ja/scaleout.md">Milvus クラスターをスケールアウトします</a>。この手順では Helm を使用するため、この Docker デプロイには適用されません。</p></li>
<li><p>クラウド上でMilvusクラスタをデプロイする：</p>
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
