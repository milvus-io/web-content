---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: RPM/DEB パッケージの入手状況を確認し、サポートされている Milvus スタンドアロンインストール方法を選択してください。
title: RPM/DEB パッケージを使用した Milvus Standalone のインストール
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">RPM/DEB パッケージを使用した Milvus Standalone のインストール<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvus Standalone のパッケージの入手可能性について説明し、公開されているリリース資産を用いたインストール方法へのリンクを掲載しています。</p>
<h2 id="Check-package-availability" class="common-anchor-header">パッケージの入手状況を確認する<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5</a> を含む Milvus 3.0.x リリースでは、Docker Compose 設定ファイルは公開されていますが、RPM や DEB パッケージは公開されていません。これらのリリースについては、RPM や DEB のダウンロード URL を作成しないでください。ダウンロードコマンドにパッケージファイル名を指定しても、そのアセットは利用できません。</p>
<p>その他のリリースについては、パッケージのインストール方法を選択する前に、<a href="https://github.com/milvus-io/milvus/releases">該当するMilvusリリースページの</a>「<strong>Assets</strong>」セクションを確認してください。そのリリースおよびお使いのシステムアーキテクチャに対して実際にリストされているパッケージのみを使用してください。</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Docker を使用した Milvus スタンドアロンのインストール<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>v3.0.5 については、以下のインストール方法のいずれかを選択してください：</p>
<ul>
<li>v3.0.5 とともに公開された Compose 設定を使用するには、「<a href="/docs/ja/install_standalone-docker-compose.md">Docker Compose を使用して Milvus を実行する (Linux)</a>」を選択してください。</li>
<li><a href="/docs/ja/install_standalone-docker.md">Docker 内で Milvus を実行（Linux）</a>して、スタンドアロンインストールスクリプトを使用します。スクリプトを実行する前に、スクリプト内のイメージタグを確認してください。</li>
<li><a href="/docs/ja/install_standalone-windows.md">「Docker での Milvus 実行（Windows）</a>」を選択すると、WSL 2 バックエンドと Linux コンテナを使用した Docker Desktop が利用できます。</li>
</ul>
<p>インストール前に、<a href="/docs/ja/prerequisite-docker.md">ハードウェアおよびソフトウェアの要件</a>を確認してください。インスタンスが稼働したら、<a href="/docs/ja/quickstart.md">クイックスタートの</a>「<strong>既存の Milvus サーバーを使用する</strong>」手順に従い、ローカルの<code translate="no">.db</code> パスではなく<code translate="no">http://localhost:19530</code> に接続して、データの挿入や検索を実行してください。</p>
