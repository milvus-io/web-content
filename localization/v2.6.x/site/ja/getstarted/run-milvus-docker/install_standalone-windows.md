---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Windows 版 Docker Desktop を使用して Milvus スタンドアロンをインストールする方法について学びましょう。
title: DockerでMilvusを実行する（Linux）
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
    </button></h1><p>このページでは、Docker Desktop for Windows を使用して Windows 上で Milvus を実行する方法について説明します。​</p>
<h2 id="Prerequisites​" class="common-anchor-header">前提条件​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktop をインストールします</a>。</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Windows Subsystem for Linux 2 (WSL 2) をインストールしてください</a>。​</p></li>
<li><p>Python 3.8 以降をインストールしてください。</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">DockerでMilvusを実行する​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus には、Docker コンテナとしてインストールするためのインストールスクリプトが用意されています。Microsoft Windows に Docker Desktop をインストールしたら、<strong>管理者</strong>モードの PowerShell または Windows コマンドプロンプト、および WSL 2 から Docker CLI にアクセスできます。​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShell または Windows コマンドプロンプトから​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>PowerShell や Windows コマンドプロンプトに慣れている場合は、以下のコマンドを実行します。​</p>
<ol>
<li><p>Docker Desktopを右クリックし、「<strong>管理者として実行</strong>」を選択して、管理者モードで開きます。​</p></li>
<li><p>インストールスクリプトをダウンロードし、<code translate="no">standalone.bat</code> という名前で保存します。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>ダウンロードしたスクリプトを実行して、MilvusをDockerコンテナとして起動します。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>インストールスクリプトの実行後：​</p>
<ul>
<li><p><strong>milvus-standalone</strong>という名前の Docker コンテナがポート<strong>19530</strong> で起動しました。​</p></li>
<li><p>Milvus とともに、同じコンテナ内に埋め込み型の etcd がインストールされ、ポート<strong>2379</strong> でサービスを提供しています。その設定ファイルは、現在のフォルダ内の<strong>embedEtcd.yaml</strong>にマッピングされています。​</p></li>
<li><p>Milvusのデータボリュームは、現在のフォルダ内の<strong>volumes/milvusに</strong>マッピングされています。​</p></li>
</ul>
<p>以下のコマンドを使用して、Milvus コンテナおよび保存されたデータを管理できます。​</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2 から​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Windows上でLinuxコマンドやシェルスクリプトを使用してMilvusを起動する場合は、WSL 2コマンドがすでにインストールされていることを確認してください。WSL 2コマンドのインストール方法の詳細については、<a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">こちらのMicrosoftの記事を</a>参照してください。​</p>
<ol>
<li><p>WSL 2 を起動します。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>インストールスクリプトをダウンロードします​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>MilvusをDockerコンテナとして起動します。​</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>以下のコマンドを使用して、Milvus コンテナおよび保存されたデータを管理できます。​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Docker Compose を使用して Milvus を実行する​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Microsoft Windows に Docker Desktop をインストールすると、<strong>管理者モードの</strong>PowerShell または Windows コマンドプロンプトから Docker CLI にアクセスできます。PowerShell、Windows コマンドプロンプト、または WSL 2 のいずれかで Docker Compose を実行して、Milvus を起動できます。​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShell または Windows コマンドプロンプトから​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>Docker Desktopを右クリックし、「<strong>管理者として実行</strong>」を選択して、管理者モードで開きます。​</p></li>
<li><p>PowerShell または Windows コマンドプロンプトで以下のコマンドを実行し、Milvus Standalone 用の Docker Compose 設定ファイルをダウンロードして、Milvus を起動します。​</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>ネットワーク接続状況によっては、Milvus インストール用のイメージのダウンロードに時間がかかる場合があります。<strong>「milvus-standalone」</strong>、「<strong>milvus-minio</strong>」、「<strong>milvus-etcd</strong>」という名前のコンテナが起動すると、次のような状態になっていることが確認できます。​</p>
<ul>
<li><p><strong>milvus-etcd</strong>コンテナはホストに対してポートを公開しておらず、そのデータを現在のフォルダ内の<strong>volumes/etcd</strong>にマッピングしています。​</p></li>
<li><p><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してローカルでポート<strong>9090</strong>および<strong>9091</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマッピングします。​</p></li>
<li><p><strong>milvus-standalone</strong>コンテナは、デフォルト設定でローカルのポート<strong>19530</strong>を提供し、そのデータを現在のフォルダ内の<strong>volumes/milvus</strong>にマッピングします。​</p></li>
</ul></li>
</ol>
<p>WSL 2 がインストールされている場合は、Linux 版の Docker Compose コマンドを実行することもできます。​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2 から​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>手順は、Linux システムで Docker Compose を使用して Milvus をインストールする場合と同様です。​</p>
<ol>
<li><p>WSL 2 を起動します。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Milvusの設定ファイルをダウンロードします。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusを起動します。​</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">よくある質問​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">「<code translate="no">Docker Engine stopped</code> 」エラーへの対処方法は？​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>WindowsにDocker Desktopをインストールした後、コンピュータの設定が適切でない場合、「<code translate="no">Docker Engine stopped</code> 」というエラーが発生することがあります。その場合は、以下の点を確認してください：​</p>
<ol>
<li><p>仮想化機能が有効になっているか確認してください。​</p>
<p>仮想化が有効になっているかどうかは、<strong>タスクマネージャーの</strong>[<strong>パフォーマンス</strong>] タブで確認できます。​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>タスクマネージャーでの仮想化設定</span>
  
 </span></p>
<p>仮想化が無効になっている場合は、マザーボードのファームウェアのBIOS設定を確認する必要があるかもしれません。BIOS設定で仮想化を有効にする方法は、マザーボードのメーカーによって異なります。例えば、ASUSのマザーボードの場合は、仮想化を有効にする方法について、<a href="https://www.asus.com/support/faq/1043786/">こちらの記事を</a>参照してください。​</p>
<p>その後、コンピュータを再起動して Hyper-V を有効にする必要があります。詳細については、<a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft のこの記事を</a>参照してください。​</p></li>
<li><p>Docker Desktop サービスが起動しているか確認してください。</p>
<p>次のコマンドを実行して、Docker Desktop サービスを起動できます。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>WSLが正しくインストールされているか確認してください。</p>
<p>以下のコマンドを実行して、WSL 2 をインストールまたは更新できます。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Docker デーモンが起動しているか確認してください。</p>
<p>Docker Desktopのインストールディレクトリに移動し、<code translate="no">.\DockerCli.exe -SwitchDaemon</code> を実行してDockerデーモンを起動する必要があります。​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Docker Desktop<strong>を管理者モード</strong>で起動しているか確認してください。​</p>
<p>Docker Desktop が管理者モードで起動されていることを確認してください。そのためには、<strong>Docker Desktop</strong>を右クリックし、「<strong>管理者として実行</strong>」を選択してください。​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>Docker Desktop を管理者として起動する</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Milvusのデプロイ中にWSL関連の問題が発生した場合、どのように対処すればよいですか？​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>WSL 2 から Milvus を実行中に WSL に関連する問題が発生した場合は、Docker Desktop が WSL 2 ベースのエンジンを使用するように設定されているか、次のように確認する必要がある可能性があります：​</p>
<ol>
<li><p><strong>[設定]</strong>&gt;<strong>[全般]</strong> で、「WSL 2 ベースのエンジンを使用する」にチェックが入っていることを確認してください。​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Docker Desktopの設定でWSL 2ベースのエンジンを使用する</span>
  
 </span></p></li>
<li><p><strong>[設定]</strong>&gt;<strong>[リソース]</strong>&gt;<strong>[WSL 統合</strong>] に移動し、Docker 統合を有効にしたいインストール済みの WSL 2 ディストリビューションを選択してください。​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Docker Desktopの設定でWSL 2ディストリビューションを選択する</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Milvusの起動時に表示される「<code translate="no">Read config failed</code> 」というボリューム関連のエラーにはどのように対処すればよいですか？​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Milvusの起動時に表示される「Read config failed」エラー</span>
  
 </span></p>
<p>Milvusの起動時に「Read config failed」というエラーが表示された場合は、Milvusコンテナにマウントされているボリュームが正しいかどうかを確認する必要があります。ボリュームがコンテナに正しくマウントされている場合は、<code translate="no">docker exec</code> コマンドを使用してコンテナ内に移動し、次<strong>のように/milvus/configsフォルダ</strong>の一覧を表示できます：​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Milvusの設定ファイルの一覧表示</span>
  
 </span></p>
<p>​</p>
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
    </button></h2><p>DockerにMilvusをインストールしたら、以下の操作が可能です：</p>
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
<li><p>Milvusを直感的に管理できるオープンソースのGUIツール「<a href="https://github.com/zilliztech/attu">Attu</a>」をご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.6.x/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
