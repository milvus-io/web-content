---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: MilvusのPython SDKのインストール方法をご紹介します。
title: Milvus Python SDKのインストール
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Milvus Python SDKのインストール<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusのPython SDK pymilvusのインストール方法について説明します。</p>
<p>現行バージョンのMilvusでは、Python、Node.js、GO、JavaのSDKをサポートしています。</p>
<h2 id="Requirements" class="common-anchor-header">必要条件<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>Python 3.7以降が必要です。</li>
<li>Google protobufがインストールされていること。<code translate="no">pip3 install protobuf==3.20.0</code> コマンドでインストールできます。</li>
<li>grpcio-toolsがインストールされていること。<code translate="no">pip3 install grpcio-tools</code> コマンドでインストールできる。</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">pipでPyMilvusをインストールする<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvusは<a href="https://pypi.org/project/pymilvus/">Python Package Indexに</a>あります。</p>
<div class="alert note">
インストールしたMilvusサーバのバージョンに合ったバージョンのPyMilvusをインストールすることを推奨します。詳細については、<a href="/docs/ja/v2.4.x/release_notes.md">リリースノートを</a>参照してください。</div>
<pre><code translate="no">$ python3 -m pip install pymilvus==2.4.15
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-installation" class="common-anchor-header">インストールの確認<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvusが正しくインストールされていれば、以下のコマンドを実行しても例外は発生しません。</p>
<pre><code translate="no">$ python3 -c <span class="hljs-string">&quot;from pymilvus import Collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次に行うこと<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvusをインストールしたら、次のことができます：</p>
<ul>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/api-reference/pymilvus/v2.4.x/About.md">PyMilvus APIリファレンスを</a>調べる</p></li>
</ul>
