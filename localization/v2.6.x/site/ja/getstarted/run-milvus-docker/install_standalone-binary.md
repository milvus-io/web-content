---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: あらかじめビルド済みのRPM/DEBパッケージを使用して、Milvusスタンドアロンをインストールする方法をご確認ください。
title: RPM/DEB パッケージを使用した Milvus スタンドアロンのインストール
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">RPM/DEB パッケージを使用した Milvus スタンドアロンのインストール<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、あらかじめビルド済みの RPM/DEB パッケージを使用して Milvus スタンドアロンをインストールする方法について説明します。</p>
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
<li>libstdc++ 8.5.0 以降がすでにインストールされていること。</li>
<li>インストール前に、<a href="/docs/ja/v2.6.x/prerequisite-docker.md">ハードウェアおよびソフトウェアの要件を確認してください</a>。</li>
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/releases/tag/v2.6.17">Milvus リリースページ</a>から、お使いのシステムアーキテクチャに応じた RPM/DEB パッケージをダウンロードできます。</p>
<ul>
<li>x86_64/amd64 の場合は、<strong>milvus_2.6.9-1_amd64.deb</strong>または<strong>milvus_2.6.9-1_amd64.rpm</strong>パッケージをダウンロードしてください。</li>
<li>ARM64 の場合は、<strong>milvus_2.6.9-1_arm64.deb</strong>または<strong>milvus_2.6.9-1_arm64.rpm</strong>パッケージをダウンロードしてください。</li>
</ul>
<p>以下のコマンドは、x86_64/amd64 マシンで Milvus Standalone を実行することを前提としています。</p>
<pre><code translate="no" class="language-shell">wget https://github.com/milvus-io/milvus/releases/download/v2.6.9/milvus_2.6.9-1_amd64.rpm -O milvus_2.6.9-1_amd64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-the-RPMDEB-Package" class="common-anchor-header">RPM/DEB パッケージのインストール<button data-href="#Install-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>RPM/DEB パッケージをインストールするには、お使いのシステムのパッケージマネージャーを使用できます。</p>
<p>RPM ベースのシステム（CentOS、Fedora、RHEL など）では、<code translate="no">yum</code> コマンドを使用してパッケージをインストールします。</p>
<pre><code translate="no" class="language-shell">yum install -y ./milvus_2.6.9-1_amd64.rpm
rpm -qa| grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>DEB ベースのシステム（Ubuntu や Debian など）の場合は、<code translate="no">apt</code> コマンドを使用してパッケージをインストールします。</p>
<pre><code translate="no" class="language-shell">apt install -y  ./milvus_2.6.9-1_amd64.deb
dpkg -l | grep milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus-Standalone" class="common-anchor-header">Milvus スタンドアロンの起動<button data-href="#Start-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>インストールが完了すると、Milvus は systemd サービスとしてインストールされ、次のコマンドを使用して起動できます。</p>
<pre><code translate="no" class="language-shell">systemctl start milvus
<button class="copy-code-btn"></button></code></pre>
<p>以下のコマンドを使用して、Milvus サービスのステータスを確認できます:</p>
<pre><code translate="no" class="language-shell">systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<p>Milvusが正常に実行されている場合、次のような出力が表示されます:</p>
<pre><code translate="no"><span class="hljs-string">●</span> <span class="hljs-string">milvus.service</span> <span class="hljs-bullet">-</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">Standalone</span> <span class="hljs-string">Server</span>
   <span class="hljs-attr">Loaded:</span> <span class="hljs-string">loaded</span> <span class="hljs-string">(/lib/systemd/system/milvus.service;</span> <span class="hljs-string">enabled;</span> <span class="hljs-attr">vendor preset:</span> <span class="hljs-string">enabled)</span>
   <span class="hljs-attr">Active:</span> <span class="hljs-string">active</span> <span class="hljs-string">(running)</span> <span class="hljs-string">since</span> <span class="hljs-string">Fri</span> <span class="hljs-number">2025-08-10 10:30:00 </span><span class="hljs-string">UTC;</span> <span class="hljs-string">5s</span> <span class="hljs-string">ago</span>
 <span class="hljs-attr">Main PID:</span> <span class="hljs-number">1044122</span> <span class="hljs-string">(milvus)</span>
    <span class="hljs-attr">Tasks: 10 (limit:</span> <span class="hljs-number">4915</span><span class="hljs-string">)</span>
   <span class="hljs-attr">CGroup:</span> <span class="hljs-string">/system.slice/milvus.service</span>
           <span class="hljs-string">└─1044122</span> <span class="hljs-string">/usr/bin/milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusのバイナリは<code translate="no">/usr/bin/milvus</code> 、systemdサービスファイルは<code translate="no">/lib/systemd/system/milvus.service</code> 、依存関係は<code translate="no">/usr/lib/milvus/</code> にあります。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(オプション) Milvusの設定を更新する<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">/etc/milvus/configs/milvus.yaml</code> ファイルで Milvus の設定を変更できます。たとえば、<code translate="no">proxy.healthCheckTimeout</code> を<code translate="no">1000</code> ms に変更するには、target パラメータを検索し、適宜変更してください。適用可能な設定項目については、「<a href="/docs/ja/v2.6.x/system_configuration.md">システム設定</a>」を参照してください。</p>
<h2 id="Stop-Milvus-Standalone" class="common-anchor-header">Milvus Standaloneの停止<button data-href="#Stop-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standaloneを停止するには、次のコマンドを使用します。</p>
<pre><code translate="no" class="language-shell">systemctl stop milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus-Standalone" class="common-anchor-header">Milvus Standalone のアンインストール<button data-href="#Uninstall-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone をアンインストールするには、次のコマンドを使用します:</p>
<p>RPMベースのシステムの場合：</p>
<pre><code translate="no" class="language-shell">rpm -e milvus
<button class="copy-code-btn"></button></code></pre>
<p>DEBベースのシステムの場合:</p>
<pre><code translate="no" class="language-shell">apt remove milvus
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Milvus Standalone のインストールが完了したら、以下の操作が可能です:</p>
<ul>
<li><p><a href="/docs/ja/v2.6.x/quickstart.md">「クイックスタート</a>」を参照して、Milvusの機能を確認してください。</p></li>
<li><p>Milvusの基本的な操作方法を学びましょう：</p>
<ul>
<li><a href="/docs/ja/v2.6.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.6.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.6.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.6.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
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
<li><p><a href="https://github.com/zilliztech/attu">Attu</a>（Milvusの直感的な管理を実現するオープンソースのGUIツール）をご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.6.x/monitor.md">Prometheus を使用して Milvus を監視しましょう</a>。</p></li>
</ul>
