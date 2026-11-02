---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: MilvusのPython SDKのインストール方法をご覧ください。
title: Milvus Python SDK のインストール
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Milvus Python SDK のインストール<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvus用のPython SDKであるPyMilvusのインストール方法と、ローカルデータベースや埋め込みモデル用のオプション依存関係の選択方法について説明します。</p>
<h2 id="Requirements" class="common-anchor-header">要件<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>PyMilvus 3.0.2 では、リモートの Milvus サーバーに接続するために Python 3.9 以降が必要です。</li>
<li>ローカルの Milvus Lite 3.2.2 のサンプルを実行するには、Python 3.10 以降およびサポート対象のプラットフォームが必要です。「<a href="/docs/ja/milvus_lite.md">Milvus Lite をローカルで実行する</a>」を参照してください。</li>
<li><code translate="no">pip</code> を使用して依存関係をインストールしてください。PyMilvus 3.0.2 では<code translate="no">protobuf&gt;=5.27.2</code> が必要です。<code translate="no">protobuf==3.20.0</code> を個別にピン留めしないでください。SDK を使用するために<code translate="no">grpcio-tools</code> は必要ありません。</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">pip 経由で PyMilvus をインストールする<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus<a href="https://pypi.org/project/pymilvus/">はPython Package Index</a>から入手可能です。</p>
<div class="alert note">
インストールした Milvus サーバーのバージョンと一致する PyMilvus バージョンをインストールすることを推奨します。詳細については、<a href="/docs/ja/release_notes.md">リリースノートを</a>参照してください。
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、リモート Milvus サーバー用のクライアントがインストールされます。Milvus Lite や組み込みモデルはインストールされません。</p>
<p><a href="/docs/ja/quickstart.md">クイックスタート</a>で使用されるローカルデータベースについては、<code translate="no">milvus-lite</code> エクストラと、それに対応する Lite パッケージをインストールしてください：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>エンベディング・ヘルパーについては、別の「<code translate="no">model</code> 」エクストラをインストールしてください：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows では、プラットフォームマーカーの都合上、pip は PyMilvus 3.0.2 の「<code translate="no">milvus-lite</code> 」エクストラをスキップします。上記のコマンドでは `<code translate="no">milvus-lite</code> ` を明示的に指定しているため、お使いの Python バージョンに対応する `<code translate="no">faiss-cpu</code> ` および `<code translate="no">pyarrow</code> ` のホイールが存在すれば、Windows でもインストールされます。</p>
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
    </button></h2><p>PyMilvusが正しくインストールされていれば、次のコマンドを実行しても例外は発生しません。</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これはサーバーへの接続ではなく、SDKのインポートを確認するものです。「<a href="/docs/ja/quickstart.md">クイックスタート</a>」の手順に従って、ローカルコレクションを作成し、データを挿入し、検索を実行してください。</p>
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
    </button></h2><p>PyMilvusのインストールが完了したら、以下の操作が可能です：</p>
<ul>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/insert-update-delete.md">挿入、Upsert、削除</a></li>
<li><a href="/docs/ja/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/api-reference/pymilvus/v3.0.x/About.md">PyMilvus API リファレンスを</a>参照する</p></li>
</ul>
