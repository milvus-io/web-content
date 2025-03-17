---
id: milvus_and_mcp.md
summary: >-
  このチュートリアルでは、Milvus用のMCPサーバーのセットアップについて説明します。Milvusを使用することで、AIアプリケーションは、カスタムデータベースクエリを記述することなく、自然言語コマンドを使用して、ベクトル検索、コレクション管理、データ取得を行うことができます。
title: MilvusとMindsDBの統合
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: AIとベクターデータベースをつなぐ<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">はじめに<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>モデルコンテキストプロトコル（MCP</strong>）は、ClaudeやCursorなどのAIアプリケーションと外部データソースやツールとのシームレスな連携を可能にするオープンプロトコルです。カスタムAIアプリケーションの構築、AIワークフローの統合、チャットインターフェースの強化のいずれにおいても、MCPは大規模言語モデル（LLM）を関連するコンテキストデータと接続するための標準化された方法を提供します。</p>
<p>このチュートリアルでは、<strong>Milvus用のMCPサーバーのセットアップ</strong>方法を説明し、AIアプリケーションがベクトル検索を実行し、コレクションを管理し、カスタムデータベースクエリを記述する<strong>ことなく、自然言語コマンドを</strong>使用してデータを取得できるようにします。</p>
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
    </button></h2><p>MCPサーバーをセットアップする前に、以下を確認してください：</p>
<ul>
<li>Python 3.10以上</li>
<li>稼働中の<a href="https://milvus.io/">Milvus</a>インスタンス</li>
<li><a href="https://github.com/astral-sh/uv">uv</a>(サーバの実行に推奨)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">はじめに<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>このMCPサーバを使用する推奨方法は、インストールせずにuvで直接実行することです。以下の例では、Claude Desktop と Cursor の両方をこの方法で設定しています。</p>
<p>リポジトリをクローンする場合</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>その後、サーバーを直接実行できます：</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">対応アプリケーション<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>このMCPサーバーは、モデルコンテキストプロトコルをサポートする以下のような様々なAIアプリケーションで使用することができます：</p>
<ul>
<li><strong>Claudeデスクトップ</strong>：AnthropicのClaude用デスクトップアプリケーション</li>
<li><strong>Cursor</strong>Composer機能でMCPをサポートするAIコードエディタ</li>
<li><strong>その他のカスタムMCPクライアント</strong>MCPクライアント仕様を実装したあらゆるアプリケーション</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Claude DesktopでMCPを使用する<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><a href="https://claude.ai/download">Claude Desktopを</a>インストールします。</li>
<li>Claude設定ファイルを開きます：<ul>
<li>macOSの場合<code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>以下の構成を追加します：</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Claude Desktopを再起動して、変更を適用します。</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Cursor での MCP の使用<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursorは</a>ComposerのAgent機能を通じてMCPツールもサポートしています。Milvus MCPサーバをCursorに追加するには2つの方法があります：</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">オプション 1: Cursor 設定 UI を使用する</h3><ol>
<li><code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> を開きます。</li>
<li><code translate="no">+ Add New MCP Server</code> をクリックします。</li>
<li>をクリックします：<ul>
<li>タイプ<code translate="no">stdio</code></li>
<li>名前<code translate="no">milvus</code></li>
<li>コマンド<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ ヒント：DNS解決の潜在的な問題を避けるために、<code translate="no">localhost</code> の代わりに<code translate="no">127.0.0.1</code> を使う。</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">オプション2：プロジェクト固有の設定を使う（推奨）</h3><ol>
<li><strong>プロジェクトのルートディレクトリに</strong> <code translate="no">.cursor/mcp.json</code> ファイルを作成します：</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>設定を適用するには、Cursor を再起動します。</li>
</ol>
<p>サーバーを追加した後、MCP設定の更新ボタンを押してツール・リストを表示する必要があるかもしれません。Composer Agentは、クエリに関連する場合、自動的にMilvusツールを使用します。</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">統合の確認<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>MCPサーバーが正しく設定されていることを確認します：</p>
<h3 id="For-Cursor" class="common-anchor-header">カーソルの場合</h3><ol>
<li><code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> と進みます。</li>
<li>MCP サーバーのリストに<code translate="no">&quot;Milvus&quot;</code> が表示されていることを確認する。</li>
<li>Milvus ツール(例:<code translate="no">milvus_list_collections</code>,<code translate="no">milvus_vector_search</code>)がリストに表示されていることを確認する。</li>
<li>エラーが表示される場合は、以下の「<strong>トラブルシューティング」の</strong>セクションを参照してください。</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Milvus用MCPサーバーツール<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>このMCPサーバは、<strong>Milvusのベクターデータを検索、照会、管理</strong>するための複数のツールを提供しています。詳細は<a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvusの</a>ドキュメントを参照してください。</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">ᔍ 検索・クエリツール</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong>→ 全文検索による文書の検索</li>
<li><strong><code translate="no">milvus-vector-search</code></strong>→ コレクションに対してベクトル類似性検索を実行する。</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong>→ ベクトル類似度と属性フィルタリングを組み合わせたハイブリッド検索を行う。</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong>→ 複数のクエリベクトルを使ってベクトル類似検索を行う。</li>
<li><strong><code translate="no">milvus-query</code></strong>→ フィルタ式を使用してコレクションにクエリを実行する</li>
<li><strong><code translate="no">milvus-count</code></strong>→ コレクション内のエンティティをカウントする。</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">コレクション管理</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong>→ データベース内のすべてのコレクションをリストアップ</li>
<li><strong><code translate="no">milvus-collection-info</code></strong>→ コレクションに関する詳細情報の取得</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong>→ コレクションに関する統計情報の取得</li>
<li><strong><code translate="no">milvus-create-collection</code></strong>→ 指定されたスキーマで新しいコレクションを作成する。</li>
<li><strong><code translate="no">milvus-load-collection</code></strong>→ 検索とクエリのためにコレクションをメモリにロードする。</li>
<li><strong><code translate="no">milvus-release-collection</code></strong>→ コレクションをメモリから解放する</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong>→ クエリセグメントに関する情報を取得する</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong>→ コレクションのロードの進行状況を取得する</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 データ操作</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong>→ コレクションへのデータ挿入</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong>⑬ データ操作 → データをコレクションに挿入します。</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong>→ コレクションにデータをアップサートします (存在する場合は挿入または更新)。</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong>→ フィルタ式に基づいて、コレクションからエンティティを削除する。</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong>→ 既存のコレクションに動的フィールドを追加する。</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ インデックス管理</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong>→ ベクトルフィールドにインデックスを作成する</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong>→ コレクション内のインデックスに関する情報を取得する。</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">環境変数<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong>→ Milvus サーバー URI (<code translate="no">--milvus-uri</code> の代わりに設定可能).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong>→ オプションの認証トークン</li>
<li><strong><code translate="no">MILVUS_DB</code></strong>→ データベース名(デフォルトは "default")</li>
</ul>
<h2 id="Development" class="common-anchor-header">開発<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>サーバを直接実行する：</p>
<pre><code translate="no" class="language-bash">uv run server.<span class="hljs-property">py</span> --milvus-uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">クロードデスクトップを使う</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">例 1：コレクションのリストアップ</h4><pre><code translate="no">What are the collections I have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>ClaudeはMCPを使ってMilvus DBの情報をチェックします。</p>
<pre><code translate="no">I&#x27;ll check what collections are available in your Milvus database.

&gt; View result from milvus-list-collections from milvus (local)

Here are the collections in your Milvus database:

1. rag_demo
2. test
3. chat_messages
4. text_collection
5. image_collection
6. customized_setup
7. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">例 2: 文書の検索</h4><pre><code translate="no"><span class="hljs-title class_">Find</span> documents <span class="hljs-keyword">in</span> my text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ClaudeはMilvusの全文検索機能を使って関連文書を検索します：</p>
<pre><code translate="no">I&#x27;ll search for documents about machine learning in your text_collection.

&gt; View result from milvus-text-search from milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based on your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">カーソルの使用</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">例コレクションの作成</h4><p>CursorのComposerで、あなたは尋ねることができます：</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor は MCP サーバを使用してこの操作を実行します：</p>
<pre><code translate="no">I<span class="hljs-string">&#x27;ll create a new collection called &#x27;</span>articles<span class="hljs-string">&#x27; with the specified fields.

&gt; View result from milvus-create-collection from milvus (local)

Collection &#x27;</span>articles<span class="hljs-string">&#x27; has been created successfully with the following schema:
- title: string
- content: string
- vector: float vector[128]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">トラブルシューティング<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">一般的な問題</h3><h4 id="Connection-Errors" class="common-anchor-header">接続エラー</h4><p>Milvusサーバへの接続に失敗しました：</p>
<ol>
<li>Milvusインスタンスが起動していることを確認してください:<code translate="no">docker ps</code> (Dockerを使用している場合)</li>
<li>URIが正しいか確認してください。</li>
<li>接続をブロックしているファイアウォールルールがないことを確認してください。</li>
<li>URIに<code translate="no">localhost</code> の代わりに<code translate="no">127.0.0.1</code> を使用してみてください。</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">認証の問題</h4><p>認証エラーが表示される場合</p>
<ol>
<li><code translate="no">MILVUS_TOKEN</code> が正しいか確認してください。</li>
<li>Milvusインスタンスに認証が必要かどうか確認してください。</li>
<li>実行しようとしている操作に対して正しい権限があることを確認してください。</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">ツールが見つからない</h4><p>MCPツールがクロードデスクトップまたはカーソルに表示されない場合：</p>
<ol>
<li>アプリケーションを再起動してください。</li>
<li>サーバーのログにエラーがないか確認する</li>
<li>MCP サーバが正しく実行されていることを確認する</li>
<li>MCP 設定で更新ボタンを押します (Cursor の場合)。</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">ヘルプの入手</h3><p>問題が解決しない場合</p>
<ol>
<li><a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issuesに</a>同様の問題がないか確認してください。</li>
<li><a href="https://discord.gg/zilliz">Zilliz Community Discordに</a>参加してサポートを受けてください。</li>
<li>問題の詳細情報を添えて、新しい課題を提出する</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">まとめ<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>このチュートリアルに従うことで、<strong>MCPサーバーが</strong>動作し、MilvusでAIによるベクトル検索が可能になります。<strong>Claude Desktopと</strong> <strong>Cursorの</strong>どちらを使用している場合でも、データベースコードを記述する<strong>ことなく、自然言語コマンドを</strong>使用してMilvusデータベースのクエリ、管理、検索を行うことができます！</p>
