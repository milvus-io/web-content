---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Windows版 Docker Desktop を使用して、Milvus スタンドアロンをインストールする方法について学びましょう。
title: Docker で Milvus を実行する（Windows）
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Docker で Milvus を実行する（Windows）<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>デフォルトでは、このデプロイメントはメッセージキューとして<strong>Woodpecker</strong>（ローカルファイルシステム）を使用するため、外部のメッセージキューサービスは必要ありません。<a href="/docs/ja/woodpecker.md">Woodpecker を</a>参照してください。</p>
</blockquote>
<p>このページでは、WSL 2 バックエンドと Linux コンテナを備えた Docker Desktop を使用して、Windows 上で Milvus を実行する方法について説明します。</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktop をインストールし</a>、Windows およびハードウェアの要件を満たしている必要があります。</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Windows Subsystem for Linux 2 (WSL 2) をインストールしてください</a>。</li>
<li>Docker Desktop を起動し、<strong>「WSL 2 ベースのエンジンを使用する」を</strong>有効にして、「Linux コンテナ」を選択します。WSL ディストリビューション内でコマンドを実行する場合は、<strong>[設定]</strong>&gt;<strong>[リソース]</strong>&gt;<strong>[WSL 統合</strong>] でそのディストリビューションも有効にしてください。<a href="https://docs.docker.com/desktop/features/wsl/">Docker Desktop WSL 2 バックエンドを</a>参照してください。</li>
</ul>
<p>Milvus ファイルをダウンロードする前に、PowerShell または Windows コマンドプロンプトで以下の確認を行ってください：</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>DockerのOSタイプは「<code translate="no">linux</code> 」である必要があります。Composeのサンプルでは、レガシーな<code translate="no">docker-compose</code> V1コマンドではなく、<code translate="no">docker compose</code> プラグイン（V2以降）を使用しています。</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Docker での Milvus の実行<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のターミナルのいずれかを選択してください。書き込み可能な作業ディレクトリでコマンドを実行してください。スクリプトは、そのディレクトリに設定ファイルと<code translate="no">volumes</code> ディレクトリを保存します。</p>
<p>このスクリプトは、Milvusの<code translate="no">master</code> ブランチからダウンロードされます。Dockerイメージのタグはスクリプト内で定義されており、v3.0.3とは異なる場合があります。その特定のリリースをデプロイするには、以下のバージョン指定されたDocker Compose設定を使用してください。</p>
<h3 id="From-PowerShell" class="common-anchor-header">PowerShell から<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>スクリプトをダウンロードしてから、Milvus を起動します:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell では、作業ディレクトリからスクリプトを実行するために「<code translate="no">.\</code> 」というプレフィックスが必要です。</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Windows コマンドプロンプトから<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">curl.exe</code> を使用してスクリプトをダウンロードしてください。<code translate="no">Invoke-WebRequest</code> は PowerShell コマンドであり、コマンドプロンプトでは実行されません:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>いずれかの Windows コマンドシーケンスを実行した後：</p>
<ul>
<li>「<strong>milvus-standalone</strong>」という名前の Docker コンテナがポート<strong>19530</strong> でサービスを提供します。</li>
<li>組み込みの etcd は、同じコンテナ内のポート<strong>2379</strong> で実行されます。その設定ファイルは、作業ディレクトリ内の<strong>embedEtcd.yaml</strong>に対応しています。</li>
<li>Milvus は、作業ディレクトリ内の `<strong>volumes/milvus</strong>` にデータを保存します。</li>
<li>設定のオーバーライドは、作業ディレクトリ内の<strong>user.yaml</strong>に記述します。変更後はコンテナを再起動してください。</li>
</ul>
<p>いずれかのターミナルでイメージとコンテナのステータスを確認してください:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>PowerShell から Milvus を停止するには、<code translate="no">.\standalone.bat stop</code> を実行します。コマンドプロンプトからは、<code translate="no">standalone.bat stop</code> を実行します。<code translate="no">delete</code> コマンドは、コンテナとその保存データの両方を削除します。使用前にデータをバックアップしてください。</p>
<h3 id="From-WSL-2" class="common-anchor-header">WSL 2 から<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Windows ターミナルから、インストール済みの WSL ディストリビューションを開きます：</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>WSL ターミナルで、Linux スクリプトをダウンロードし、Milvus を一度起動します:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Milvusを停止するには、<code translate="no">bash standalone_embed.sh stop</code> を実行します。<code translate="no">bash standalone_embed.sh delete</code> コマンドは、コンテナ、設定、およびデータを削除します。使用前にデータをバックアップしてください。</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Docker Compose を使用して Milvus を実行する<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース v3.0.3 に付属の設定を使用してください。お使いのターミナルに対応したコマンドシーケンスのみを実行してください。</p>
<h3 id="From-PowerShell" class="common-anchor-header">PowerShell から<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>設定ファイルをダウンロードし、Milvusを起動します:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Windows コマンドプロンプトから<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>設定ファイルをダウンロードし、Milvus を起動します:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">WSL 2 の場合<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL ディストリビューションを開き、以下の Linux コマンドを実行します:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>この設定により、<strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、<strong>milvus-etcd</strong> の 3 つの長時間実行コンテナが起動します。また、データディレクトリの所有権を設定するために、<code translate="no">milvus-volume-init</code> サービスを一度だけ実行します。これらのデータは、作業ディレクトリ内の<strong>volumes/milvus</strong>、<strong>volumes/minio</strong>、<strong>volumes/etcd</strong>にマッピングされます。 MinIOはポート<strong>9000と</strong> <strong>9001</strong>を公開し、Milvusはポート<strong>19530と</strong> <strong>9091</strong>を公開します。設定およびライフサイクルコマンドについては、「<a href="/docs/ja/install_standalone-docker-compose.md">Docker ComposeでMilvusを実行する</a>」を参照してください。</p>
<h2 id="FAQs" class="common-anchor-header">よくある質問<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header"><code translate="no">Docker Engine stopped</code> というエラーが発生した場合、どうすればよいですか？<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>MilvusはLinuxコンテナを使用しています。インストールを再試行する前に、Docker DesktopおよびそのWSL 2バックエンドを確認してください：</p>
<ol>
<li><p>[<strong>タスクマネージャー</strong>] &gt; [<strong>パフォーマンス</strong>] でハードウェア仮想化が無効になっている場合は、BIOS/UEFIで有効にしてください。<a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Docker DesktopのWindows要件</a>を参照してください。</p></li>
<li><p>Windowsの[スタート]メニューからDocker Desktopを起動し、エンジンが起動するまで待ちます。WSLのインストールや更新、あるいは特定のDocker Desktopインストールモードでは管理者権限が必要になる場合がありますが、WSL 2バックエンドでLinuxコンテナを実行するための一般的な要件ではありません。</p></li>
<li><p>Windows ターミナルから WSL を確認してください。更新が必要な場合は、Windows が要求する権限で更新コマンドを実行してください：</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Docker Desktop で<strong>「WSL 2 ベースのエンジンを使用する」を</strong>有効にします。Docker メニューに<strong>「Linux コンテナに切り替える</strong>」が表示されている場合は、それを選択してください。Milvus Linux イメージのトラブルシューティングを行うために、Windows コンテナに切り替えないでください。</p></li>
<li><p>インストールに使用するターミナルで、次の確認を実行してください：</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p><code translate="no">linux</code> という結果が返される必要があります。デーモンに接続できない場合は、Milvusスクリプトを再実行する前に、<a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">Docker Desktopのトラブルシューティング手順</a>に従ってください。<code translate="no">com.docker.service</code> を起動しただけでは、WSL 2 Linuxエンジンが実行されているとは限りません。</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Milvusのデプロイ中にWSL関連の問題が発生した場合、どのように対処すればよいですか？<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL 2 から Milvus を実行中に WSL 関連の問題が発生した場合は、Docker Desktop が WSL 2 ベースのエンジンを使用するように設定されているかどうかを、次のように確認する必要があります：</p>
<ol>
<li><p><strong>[設定]</strong>&gt;<strong>[全般]</strong> で、「WSL 2 ベースのエンジンを使用する」にチェックが入っていることを確認してください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Docker Desktopの設定でWSL 2ベースのエンジンを使用する</span>
  
 </span></p></li>
<li><p><strong>[設定]</strong>&gt;<strong>[リソース]</strong>&gt; [<strong>WSL 統合</strong>] に移動し、Docker 統合を有効にしたいインストール済みの WSL 2 ディストリビューションを選択してください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Docker Desktopの設定でWSL 2ディストリビューションを選択する</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Milvusの起動時に「<code translate="no">Read config failed</code> 」というボリューム関連のエラーが表示された場合、どのように対処すればよいですか？<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Milvusの起動時に表示される「Read config failed」エラー</span>
  
 </span></p>
<p>Milvusの起動時に「Read config failed」というエラーが表示された場合は、Milvusコンテナにマウントされているボリュームが正しいかどうかを確認する必要があります。ボリュームがコンテナに正しくマウントされている場合は、<code translate="no">docker exec</code> コマンドを使用してコンテナ内に移動し、次のように<strong>/milvus/configsフォルダ</strong>の一覧を表示できます：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Milvusの設定ファイルの一覧表示</span>
  
 </span></p>
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
    </button></h2><p>Docker に Milvus をインストールしたら、<a href="/docs/ja/quickstart.md">クイックスタートの</a>「<strong>既存の Milvus サーバーパスを使用する</strong>」の手順に従い、SDK を<code translate="no">http://localhost:19530</code> に接続してください。このサーバーパスでは Milvus Lite は必要ありません。ローカルの `<code translate="no">.db</code> ` 接続ブロックは、このコンテナを使用する代わりに、別のローカルデータベースを起動します。</p>
<p>また、以下のことも可能です：</p>
<ul>
<li><p><a href="/docs/ja/quickstart.md">クイックスタートを</a>参照して、Milvusの機能を確認してください。</p></li>
<li><p>Milvusの基本的な操作を学ぶには：</p>
<ul>
<li><a href="/docs/ja/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p>Compose によるデプロイの場合は、「<a href="/docs/ja/upgrade_milvus_standalone-docker.md">Docker Compose を使用した Milvus スタンドアロンのアップグレード</a>」の手順に従ってください。アップグレードを行う前に、ご自身の環境で手順が正しく動作することを確認してください。</p></li>
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
