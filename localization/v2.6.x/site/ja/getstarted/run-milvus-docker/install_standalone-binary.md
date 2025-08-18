---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: Milvusをビルド済みのRPM/DEBパッケージを使ってスタンドアロンでインストールする方法を紹介します。
title: RPM/DEBパッケージによるMilvusスタンドアロンのインストール
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">RPM/DEBパッケージによるMilvusスタンドアロンのインストール<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、ビルド済みのRPM/DEBパッケージを使用してMilvusをスタンドアロンインストールする方法を説明します。</p>
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
<li>libstdc++ 8.5.0以降がインストールされていること。</li>
<li>インストールの前に、<a href="/docs/ja/prerequisite-docker.md">ハードウェアとソフトウェアの要件を確認して</a>ください。</li>
</ul>
<h2 id="Download-the-RPMDEB-Package" class="common-anchor-header">RPM/DEB パッケージのダウンロード<button data-href="#Download-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>RPM/DEBパッケージは、<a href="https://github.com/milvus-io/milvus/releases/tag/v2.6.0">Milvus Releases</a>ページから、お使いのシステムアーキテクチャに合わせてダウンロードすることができます。</p>
<ul>
<li>x86_64/amd64の場合、<strong>milvus_2.6.0-1_amd64.deb</strong>または<strong>milvus_2.6.0-1_amd64.rpm</strong>パッケージをダウンロードしてください。</li>
<li>ARM64の場合は、<strong>milvus_2.6.0-1_arm64.deb</strong>または<strong>milvus_2.6.0-1_arm64.rpm</strong>パッケージをダウンロードしてください。</li>
</ul>
<p>以下のコマンドは、x86_64/amd64マシン上でMilvus Standaloneを実行することを想定しています。</p>
<pre><code translate="no" class="language-shell">wget https://github.com/milvus-io/milvus/releases/download/v2.6.0/milvus_2.6.0-1_amd64.rpm -O milvus_2.6.0-1_amd64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-the-RPMDEB-Package" class="common-anchor-header">RPM/DEBパッケージのインストール<button data-href="#Install-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>RPM/DEBパッケージをインストールするには、お使いのシステムのパッケージマネージャを使用します。</p>
<p>RPM ベースのシステム（CentOS、Fedora、RHEL など）の場合、<code translate="no">yum</code> コマンドを使用してパッケージをインストールします。</p>
<pre><code translate="no" class="language-shell">yum install -y ./milvus_2.6.0-1_amd64.rpm
rpm -qa| grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>DEBベースのシステム（UbuntuやDebianなど）の場合、<code translate="no">apt</code> コマンドを使用してパッケージをインストールしてください。</p>
<pre><code translate="no" class="language-shell">apt install -y  ./milvus_2.6.0-1_amd64.rpm
dpkg -l | grep milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus-Standalone" class="common-anchor-header">Milvus Standaloneの起動<button data-href="#Start-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>インストール完了後、Milvusはsystemdサービスとしてインストールされ、以下のコマンドで起動することができる：</p>
<pre><code translate="no" class="language-shell">systemctl start milvus
<button class="copy-code-btn"></button></code></pre>
<p>Milvusサービスの状態は以下のコマンドで確認できる：</p>
<pre><code translate="no" class="language-shell">systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<p>Milvusが正常に実行されている場合、次のような出力が表示されます：</p>
<pre><code translate="no"><span class="hljs-string">●</span> <span class="hljs-string">milvus.service</span> <span class="hljs-bullet">-</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">Standalone</span> <span class="hljs-string">Server</span>
   <span class="hljs-attr">Loaded:</span> <span class="hljs-string">loaded</span> <span class="hljs-string">(/lib/systemd/system/milvus.service;</span> <span class="hljs-string">enabled;</span> <span class="hljs-attr">vendor preset:</span> <span class="hljs-string">enabled)</span>
   <span class="hljs-attr">Active:</span> <span class="hljs-string">active</span> <span class="hljs-string">(running)</span> <span class="hljs-string">since</span> <span class="hljs-string">Fri</span> <span class="hljs-number">2025-08-10 10:30:00 </span><span class="hljs-string">UTC;</span> <span class="hljs-string">5s</span> <span class="hljs-string">ago</span>
 <span class="hljs-attr">Main PID:</span> <span class="hljs-number">1044122</span> <span class="hljs-string">(milvus)</span>
    <span class="hljs-attr">Tasks: 10 (limit:</span> <span class="hljs-number">4915</span><span class="hljs-string">)</span>
   <span class="hljs-attr">CGroup:</span> <span class="hljs-string">/system.slice/milvus.service</span>
           <span class="hljs-string">└─1044122</span> <span class="hljs-string">/usr/bin/milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusバイナリは<code translate="no">/usr/bin/milvus</code> に、systemdサービスファイルは<code translate="no">/lib/systemd/system/milvus.service</code> に、依存関係は<code translate="no">/usr/lib/milvus/</code> にあります。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(オプション) Milvus設定の更新<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">/etc/milvus/configs/milvus.yaml</code> ファイル内の Milvus 設定を変更することができます。例えば、<code translate="no">proxy.healthCheckTimeout</code> を<code translate="no">1000</code> ms に変更する場合、対象のパラメータを検索し、それに応じて変更することができます。該当する設定項目については、<a href="/docs/ja/system_configuration.md">システム設定を</a>参照してください。</p>
<h2 id="Stop-Milvus-Standalone" class="common-anchor-header">Milvusスタンドアロンの停止<button data-href="#Stop-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standaloneを停止するには、以下のコマンドを使用します：</p>
<pre><code translate="no" class="language-shell">systemctl stop milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus-Standalone" class="common-anchor-header">Milvus Standaloneのアンインストール<button data-href="#Uninstall-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standaloneをアンインストールするには、以下のコマンドを使用します：</p>
<p>RPMベースのシステムの場合</p>
<pre><code translate="no" class="language-shell">rpm -e milvus
<button class="copy-code-btn"></button></code></pre>
<p>DEBベースの場合</p>
<pre><code translate="no" class="language-shell">apt remove milvus
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
    </button></h2><p>Milvus Standaloneをインストールしたら、次のことができます：</p>
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
