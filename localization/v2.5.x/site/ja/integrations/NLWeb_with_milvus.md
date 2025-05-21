---
id: NLWeb_with_milvus.md
summary: >-
  Microsoft
  NLWebとMilvusを統合し、ウェブサイト用の強力な自然言語インターフェースを構築する方法を学びます。このチュートリアルでは、Milvusのベクトルデータベース機能を活用し、NLWebアプリケーションにおける効率的なセマンティック検索、埋め込みストレージ、コンテキスト検索を実現する方法をご紹介します。
title: MilvusでNLWebを使う
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">MilvusでNLWebを使う<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">マイクロソフトのNLWebは</a>、<a href="https://schema.org/">Schema.org</a>、RSSのようなフォーマット、そして新しいMCPプロトコルを使って、ウェブサイトのための自然言語インターフェースを可能にするフレームワークです。</p>
<p><a href="https://milvus.io/">Milvusは</a>、自然言語処理アプリケーションのための強力なコンテキスト検索を可能にする、ストレージと効率的なベクトル類似検索を埋め込むためのNLWeb内のベクトルデータベースバックエンドとしてサポートされています。</p>
<blockquote>
<p>このドキュメントは主に公式<a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">クイックスタート</a>ドキュメントに基づいています。もし古い内容や一貫性のない内容を見つけた場合は、公式ドキュメントを優先し、遠慮なく私たちに問題を提起してください。</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWebはMilvusを検索エンジンとして使用するように設定することができます。以下はMilvusを使用したNLWebの設定と使用方法についてのガイドです。</p>
<h3 id="Installation" class="common-anchor-header">インストール</h3><p>リポジトリをクローンし、環境を構築します：</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Milvusの設定</h3><p><strong>Milvusを</strong>利用するために、設定を更新します。</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">設定ファイルの更新<code translate="no">code/config</code></h4><p><code translate="no">config_retrieval.yaml</code> ファイルを開き、Milvus の設定を追加します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">データの読み込み</h3><p>設定が完了したら、RSSフィードを使ってコンテンツを読み込みます。</p>
<p><code translate="no">code</code> ：</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>これでコンテンツがMilvusコレクションに取り込まれ、テキストデータとベクター埋め込みデータの両方が保存されます。</p>
<h3 id="Running-the-Server" class="common-anchor-header">サーバーの実行</h3><p>NLWebを起動するには、<code translate="no">code</code> ディレクトリから、実行します：</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>これで、http://localhost:8000/ のウェブUI、またはMCP互換のREST APIを直接使用して、自然言語経由でコンテンツを照会できるようになります。</p>
<h2 id="Further-Reading" class="common-anchor-header">参考文献<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvusドキュメント</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWebソース</a></li>
<li>チャットクエリの寿命</li>
<li>プロンプトの変更による動作の変更</li>
<li>制御フローの変更</li>
<li>ユーザーインターフェースの変更</li>
</ul>
