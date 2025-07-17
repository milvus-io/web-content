---
id: milvus-sdk-helper-mcp.md
title: Milvus SDK コードヘルパーガイド
summary: ⚡️ 一度設定すれば、いつまでも効率アップ！
---
<h1 id="Milvus-SDK-Code-Helper-Guide" class="common-anchor-header">Milvus SDK コードヘルパーガイド<button data-href="#Milvus-SDK-Code-Helper-Guide" class="anchor-icon" translate="no">
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
    </button></h1><h1 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>⚡️ 一度設定すれば、いつまでも効率アップ！</p>
<p>LLMの古い結果にイライラしていませんか？LLMのバージョンが上がっても、古い内容が出力されることにうんざりしていませんか？Milvus関連コード開発時の情報遅延問題を一挙に解決するmcpをお試しください！</p>
<p>Milvus公式SDKコードヘルパーがオンラインになりました。対応するAI IDEを見つけ、一度設定するだけで、AIが<strong>公式に推奨する</strong>Milvusコードをあなたの代わりに書いてくれます。時代遅れのフレームワークとは完全にお別れです！</p>
<p>➡️ 今すぐジャンプ<a href="#Quickstart">クイックスタート</a></p>
<h1 id="Effect-display" class="common-anchor-header">効果表示<button data-href="#Effect-display" class="anchor-icon" translate="no">
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
    </button></h1><p>次の図は、Milvus SDKコードヘルパーを使用した場合と使用しなかった場合のコード生成の効果を比較したものです。Milvus SDKコードヘルパーを使用しない場合、記述されたコードは古いORM SDKアプローチに従いますが、これはもはや推奨されません。以下はコードヘルパーMCPの有無によるコードスクリーンショットの比較です：</p>
<table>
   <tr>
     <th><p>MCPコードヘルパー<strong>有効</strong></p></th>
     <th><p>MCPコードヘルパー<strong>無効</strong></p></th>
   </tr>
   <tr>
     <td><p><img translate="no" width="400" src="/docs/v2.6.x/assets/code-helper-enabled.png" alt="Code Helper Enabled" /></p></td>
     <td><p><img translate="no" width="400"src="/docs/v2.6.x/assets/code-helper-disabled.png" alt="Code Helper Disabled" /></p></td>
   </tr>
   <tr>
     <td><p>公式に推奨されている最新のMilvusClientインタフェースを使用してCollectionを作成する</p></td>
     <td><p>古いORMインターフェースを使用してコレクションを作成することは推奨されません。</p></td>
   </tr>
</table>
<h1 id="Quickstart" class="common-anchor-header">クイックスタート<button data-href="#Quickstart" class="anchor-icon" translate="no">
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
    </button></h1><p>あなたのAI IDEを見つけ、ワンクリックで設定し、心配のないコーディングの旅を解き放ちます。</p>
<h2 id="Cursor" class="common-anchor-header">カーソル<button data-href="#Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p>にアクセスしてください： <code translate="no">Settings</code> -&gt;<code translate="no">Cursor Settings</code> -&gt;<code translate="no">Tools &amp; Intergrations</code> -&gt;<code translate="no">Add new global MCP server</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cursor-mcp-settings.png" alt="Cursor Mcp Settings" class="doc-image" id="cursor-mcp-settings" />
   </span> <span class="img-wrapper"> <span>カーソルMcp設定</span> </span></p>
<p>以下の設定を Cursor<code translate="no">~/.cursor/mcp.json</code> ファイルに貼り付けることをお勧めします。プロジェクトフォルダに<code translate="no">.cursor/mcp.json</code> を作成して、特定のプロジェクトをインストールすることもできます。詳細は<a href="https://docs.cursor.com/context/model-context-protocol">Cursor MCP ドキュメントを</a>参照してください。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Desktop" class="common-anchor-header">クロード・デスクトップ<button data-href="#Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><p>クロード・デスクトップ構成に追加します：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Code" class="common-anchor-header">クロードコード<button data-href="#Claude-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Claude Code は、リモート URL タイプのサーバを含め、JSON 設定を通じて MCP サーバを直接追加できます。Claude Codeに設定を追加するには、以下のコマンドを使用します：</p>
<pre><code translate="no" class="language-sql">claude mcp <span class="hljs-keyword">add</span><span class="hljs-operator">-</span>json sdk<span class="hljs-operator">-</span>code<span class="hljs-operator">-</span>helper <span class="hljs-comment">--json &#x27;{</span>
  &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
  &quot;headers&quot;: {
    &quot;Accept&quot;: &quot;text/event-stream&quot;
  }
}<span class="hljs-string">&#x27;
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Windsurf" class="common-anchor-header">Windsurf<button data-href="#Windsurf" class="anchor-icon" translate="no">
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
    </button></h2><p>Windsurfは、JSONファイルによるMCP設定をサポートしています。以下の設定をWindsurfのMCP設定に追加してください：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="VS-Code" class="common-anchor-header">VSコード<button data-href="#VS-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>CodeIndexer MCPサーバーは、MCP互換の拡張機能を通してVS Codeで使用することができます。以下の設定をVS CodeのMCP設定に追加してください：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Cherry-Studio" class="common-anchor-header">Cherry Studio<button data-href="#Cherry-Studio" class="anchor-icon" translate="no">
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
    </button></h2><p>Cherry Studioでは、設定インターフェイスを通じて視覚的にMCPサーバーを設定できます。手動でのJSON設定には直接対応していませんが、GUIで新しいサーバーを追加できます：</p>
<ol>
<li><p>設定]→[MCPサーバー]→[サーバーの追加]に移動します。</p></li>
<li><p>サーバーの詳細を入力します：</p>
<ul>
<li><p>名前：<code translate="no">sdk code helper</code></p></li>
<li><p>名前：<code translate="no">Streamable HTTP</code></p></li>
<li><p>URL：<code translate="no">https://sdk.milvus.io/mcp/</code></p></li>
<li><p>ヘッダー：<code translate="no">&quot;Accept&quot;: &quot;text/event-stream&quot;</code></p></li>
</ul></li>
<li><p>設定を保存してサーバーを有効にします。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cherry-studio-mcp-settings.png" alt="Cherry Studio Mcp Settings" class="doc-image" id="cherry-studio-mcp-settings" />
   </span> <span class="img-wrapper"> <span>Cherry Studio Mcpの設定</span> </span></p>
<h2 id="Cline" class="common-anchor-header">Cline<button data-href="#Cline" class="anchor-icon" translate="no">
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
    </button></h2><p>ClineはJSON設定ファイルを使用してMCPサーバーを管理します。提供されたMCPサーバー設定を統合するには</p>
<ol>
<li><p>Clineを開き、上部ナビゲーションバーのMCPサーバーアイコンをクリックします。</p></li>
<li><p>インストール済み]タブを選択し、[MCPの詳細設定]をクリックします。</p></li>
<li><p><code translate="no">cline_mcp_settings.json</code> 、以下の設定を追加します：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Augment" class="common-anchor-header">Augment<button data-href="#Augment" class="anchor-icon" translate="no">
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
<li><p>Cmd/Ctrl Shift Pを押すか、Augmentパネルのハンバーガーメニューを開きます。</p></li>
<li><p>設定の編集を選択</p></li>
<li><p>詳細設定]で、[settings.jsonの編集]をクリックします。</p></li>
<li><p><code translate="no">augment.advanced</code> オブジェクトの<code translate="no">mcpServers</code> 配列にサーバー設定を追加します：</p></li>
</ol>
<pre><code translate="no" class="language-markdown">{
  &quot;mcpServers&quot;: {
<span class="hljs-code">    &quot;sdk-code-helper&quot;: {
      &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
      &quot;headers&quot;: {
        &quot;Accept&quot;: &quot;text/event-stream&quot;
      }
    }
  }
}
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Gemini-CLI" class="common-anchor-header">Gemini CLI<button data-href="#Gemini-CLI" class="anchor-icon" translate="no">
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
    </button></h2><p>Gemini CLIでは、JSONファイルによる手動設定が必要です：</p>
<ol>
<li><p><code translate="no">~/.gemini/settings.json</code> ファイルを作成または編集します。</p></li>
<li><p>以下の設定を追加します：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>ファイルを保存し、Gemini CLIを再起動して変更を適用します。</li>
</ol>
<h2 id="Roo-Code" class="common-anchor-header">Rooコード<button data-href="#Roo-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Rooコード</p>
<p>Roo Codeは、MCPサーバー用のJSON設定ファイルを利用します：</p>
<ol>
<li><p>Roo Codeを開き、[設定]→[MCPサーバー]→[グローバル設定の編集]に移動します。</p></li>
<li><p><code translate="no">mcp_settings.json</code> ファイルに以下の設定を追加します：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>ファイルを保存してサーバーをアクティブにします。</li>
</ol>
