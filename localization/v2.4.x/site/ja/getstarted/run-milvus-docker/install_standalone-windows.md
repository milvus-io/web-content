---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Docker Desktop for Windowsでmilvusをスタンドアロンインストールする方法をご紹介します。
title: DockerでMilvusを実行する(Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">DockerでMilvusを動かす(Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Docker Desktop for Windowsを使用してWindows上でMilvusを実行する方法を説明します。</p>
<h2 id="Prerequisites​" class="common-anchor-header">前提条件<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktopをインストール</a>します。</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Windows Subsystem for Linux 2 (WSL 2)をインストール</a>する。</p></li>
<li><p>Python 3.8+をインストールする。</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">DockerでMilvusを実行する。<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはDockerコンテナとしてインストールするためのインストールスクリプトを提供しています。Microsoft WindowsにDocker Desktopをインストールしたら、<strong>管理者</strong>モードでPowerShellまたはWindowsコマンドプロンプトから、またWSL 2からDocker CLIにアクセスすることができます。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShellまたはWindowsコマンドプロンプトから</h3><p>PowerShellやWindowsコマンドプロンプトに慣れている場合、コマンドプロンプトは以下のようになります。</p>
<ol>
<li><p>右クリックして管理者モードでDocker Desktopを開き、<strong>管理者として実行を</strong>選択します。</p></li>
<li><p>インストールスクリプトをダウンロードし、<code translate="no">standalone.bat</code> として保存します。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>ダウンロードしたスクリプトを実行し、MilvusをDockerコンテナとして起動する。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>インストールスクリプトの実行後</p>
<ul>
<li><p><strong>milvus-standaloneという</strong>名前のDockerコンテナがポート<strong>19530で</strong>起動しました。</p></li>
<li><p>Milvusと一緒にembed etcdが同じコンテナにインストールされ、ポート<strong>2379で</strong>サービスを提供しています。その設定ファイルはカレントフォルダ内の<strong>embedEtcd.yaml</strong>にマップされている。</p></li>
<li><p>Milvusデータボリュームは、カレントフォルダ内の<strong>volumes/milvusに</strong>マップされる。</p></li>
</ul>
<p>以下のコマンドを使用して、Milvus コンテナと保存データを管理できます。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Stop Milvus​</span>
C:\&gt;standalone.bat stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus container​</span>
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. <span class="hljs-comment"># Container has been removed.​</span>
Delete successfully. <span class="hljs-comment"># Data has been removed.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2から</h3><p>Windows上でLinuxコマンドやシェルスクリプトを使用してMilvusを起動する場合は、WSL 2コマンドをインストール済みであることを確認してください。WSL 2コマンドのインストール方法の詳細については、こちらの<a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Microsoftの記事を</a>ご参照ください。</p>
<ol>
<li><p>WSL 2を起動します。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>インストール・スクリプトをダウンロードする。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusをdockerコンテナとして起動します。</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>以下のコマンドでMilvusコンテナと保存データを管理することができます。</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Docker Composeを使用したMilvusの実行<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Microsoft WindowsにDocker Desktopをインストールしたら、<strong>管理者</strong>モードでPowerShellまたはWindowsコマンドプロンプトからDocker CLIにアクセスできます。PowerShell、Windowsコマンドプロンプト、WSL 2のいずれかでDocker Composeを実行し、milvusを起動することができます。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">PowerShellまたはWindowsコマンドプロンプトから</h3><ol>
<li><p>右クリックから管理<strong>者として実行を</strong>選択し、管理者モードでDocker Desktopを開きます。</p></li>
<li><p>PowerShellまたはWindowsコマンドプロンプトで以下のコマンドを実行し、Milvus Standalone用のDocker Compose設定ファイルをダウンロードし、Milvusを起動します。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker-compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>ネットワーク接続状況によっては、Milvusインストール用のイメージのダウンロードに時間がかかる場合があります。<strong>milvus-standalone</strong>、<strong>milvus-minio</strong>、<strong>milvus-etcdという</strong>名前のコンテナが立ち上がると、以下のことが確認できます。</p>
<ul>
<li><p><strong>milvus-etcd</strong>コンテナは、ホストにポートを一切公開せず、カレントフォルダ内の<strong>volumes/etcdに</strong>データをマッピングする。</p></li>
<li><p><strong>milvus-minio</strong>コンテナは、デフォルトの認証情報を使用してポート<strong>9090</strong>および<strong>9091</strong>をローカルに提供し、そのデータを現在のフォルダ内の<strong>volumes/minio</strong>にマップする。</p></li>
<li><p><strong>milvus-standalone</strong>コンテナは、ポート<strong>19530</strong>をデフォルト設定でローカルに提供し、そのデータを現在のフォルダの<strong>volumes/milvus</strong>にマップする。</p></li>
</ul></li>
</ol>
<p>WSL 2がインストールされていれば、Linux版のDocker Composeコマンドを呼び出すこともできます。</p>
<h3 id="From-WSL-2​" class="common-anchor-header">WSL 2から</h3><p>手順は、Docker Composeを使用してLinuxシステムにMilvusをインストールする場合と同様です。</p>
<ol>
<li><p>WSL 2を起動します。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusの設定ファイルをダウンロードします。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusを起動します。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">よくある質問<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header"><code translate="no">Docker Engine stopped</code> エラーの対処方法を教えてください。</h3><p>WindowsにDocker Desktopをインストールした後、お使いのコンピュータが正しく設定されていない場合、<code translate="no">Docker Engine stopped</code> エラーが発生することがあります。この場合、以下の確認を行う必要があります。</p>
<ol>
<li><p>仮想化が有効になっているか確認してください。</p>
<p>仮想化が有効になっているかどうかは、<strong>タスクマネージャの</strong> <strong>パフォーマンス</strong>タブで確認できます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>タスクマネージャの仮想化</span> </span></p>
<p>仮想化が無効になっている場合は、マザーボードのファームウェアのBIOS設定を確認する必要があります。BIOS設定で仮想化を有効にする方法は、マザーボードベンダーによって異なります。例えばASUSマザーボードの場合、仮想化を有効にする方法については<a href="https://www.asus.com/support/faq/1043786/">こちらの記事を</a>参考にしてください。</p>
<p>その後、コンピュータを再起動し、Hyper-Vを有効にする必要があります。詳細については、この<a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoftの記事を</a>参照してください。</p></li>
<li><p>Docker Desktop Serviceが起動したかどうかを確認します。</p>
<p>以下のコマンドを実行して、Docker Desktop Serviceを起動します。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>WSLが正しくインストールされているかどうかを確認します。</p>
<p>以下のコマンドを実行して、WSL 2コマンドをインストールまたは更新します。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Docker Daemonが起動しているか確認します。</p>
<p>Docker Desktopのインストールディレクトリに移動し、<code translate="no">.\DockerCli.exe -SwitchDaemon</code> 。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Docker Desktopを<strong>管理者</strong>モードで起動したかどうかを確認します。</p>
<p>Docker Desktopを管理者モードで起動していることを確認してください。これを行うには、<strong>Docker Desktopを</strong>右クリックし、<strong>管理者として実行を</strong>選択します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>管理者としてDocker Desktopを起動する</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Milvusのデプロイ中にWSL関連の問題が発生した場合の対処方法を教えてください。</h3><p>WSL 2からMilvusを実行中にWSL関連の問題が発生した場合、以下のようにWSL 2ベースのエンジンを使用するようにDocker Desktopを設定したかどうかを確認する必要があるかもしれません。</p>
<ol>
<li><p><strong>設定</strong>&gt;<strong>一般で</strong>「WSL 2ベースのエンジンを使用する」にチェックが入っていることを確認してください。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Docker Desktopの設定でWSL 2ベースのエンジンを使用する</span> </span></p></li>
<li><p>インストールされているWSL 2ディストリビューションから、Dockerインテグレーションを有効にしたいディストリビューションを選択します：<strong>設定</strong>&gt;<strong>リソース</strong>&gt;<strong>WSL統合</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Docker Desktop SettingsでWSL 2ディストリビューションを選択します。</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Milvusの起動時にボリューム関連のエラーが表示され、<code translate="no">Read config failed</code> 。</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Milvus起動時のRead config failedエラーのプロンプト</span> </span></p>
<p>Milvus起動時に表示される「Read config failed」というエラーに対処するには、Milvusコンテナにマウントされているボリュームが正しいかどうかを確認する必要があります。ボリュームが正しくコンテナにマウントされていれば、<code translate="no">docker exec</code> コマンドでコンテナに入り、以下のように<strong>/milvus/configs</strong>フォルダをリストアップすることができる。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Milvus 設定ファイルのリストアップ</span> </span></p>
<p></p>
