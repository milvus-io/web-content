---
id: milvus_for_agents.md
title: AIエージェントのためのMilvus
summary: AIエージェントがMilvusをRAG、意味検索、長期記憶のためのベクトルデータベースとしてどのように利用できるかを学ぶ。
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">AIエージェントのためのMilvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、AIコーディングエージェントや自律エージェントシステムがプログラムでベクトルデータベースと対話できるエージェントフレンドリーなインターフェースを提供します。RAGパイプライン、セマンティック検索、またはエージェントメモリーシステムを構築する場合でも、Milvusはエージェントが接続して操作するための複数の方法を提供します。</p>
<h2 id="Agent-tools" class="common-anchor-header">エージェントツール<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvusスキル</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">LLMにPyMilvusを使ったベクトルデータベース操作を教えるClaude Codeのエージェントスキルです。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCPサーバ</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP対応エージェントがMilvusと直接対話できるようにするモデルコンテキストプロトコルサーバー。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">クロードコンテキストMCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">クロードコード用に設計されたMCPサーバで、コンテキストを意識したMilvusドキュメントへのアクセスを提供します。</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AIプロンプト<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>AIコーディングアシスタントが正しいMilvusコードを書くためのプロンプト。各プロンプトには、最も一般的なミスを防ぐルールとパターンがコード化されています。</p>
<p><strong>使用方法</strong></p>
<ol>
<li>プロンプトページの "Full prompt "セクションからプロンプトを<strong>コピー</strong>する。</li>
<li>それをあなたのAIツールが期待するファイルに<strong>保存</strong>します（下記の<a href="#use-in-different-environments">環境表を</a>参照）。</li>
<li>AIアシスタントがMilvusコードを生成またはレビューする際に自動的にルールが適用されます。</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">プロンプトページ<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ja/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AIコーディングエージェントのトップレベルルールです。1つのファイルしか必要ない場合はここから始めてください。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正しい接続パターン、MilvusClientの使用、ORM APIの禁止。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">スキーマ設計</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">フィールドタイプ、プライマリキー、スキーマの不変性、BM25 設定。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ja/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">検索パターン</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN検索、ハイブリッド検索、重要制約ルールによる全文検索。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">インデックス選択</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AUTOINDEX、HNSW、DiskANN、IVF_FLATの決定木。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAGパイプライン</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Milvusによるエンドツーエンドの検索支援生成フロー。</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">さまざまな環境での使用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>使用環境</th><th>プロンプトを表示する場所</th><th>インストラクション</th></tr>
</thead>
<tbody>
<tr><td>カーソル</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">プロジェクトのルールを設定する</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">カスタム指示</a></td></tr>
<tr><td>クロードコード</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">クロードコードのドキュメント</a></td></tr>
<tr><td>JetBrains IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">ガイドラインのカスタマイズ</a></td></tr>
<tr><td>ジェミニCLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI コードラボ</a></td></tr>
<tr><td>VSコード</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">.instructions.mdの設定</a></td></tr>
<tr><td>ウィンドサーフ</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">ガイドライン.mdの設定</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">エージェントに推奨されるデプロイメント<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの適切なデプロイメントの選択は、開発ステージによって異なります。</p>
<table>
<thead>
<tr><th>ステージ</th><th>デプロイメント</th><th>なぜ</th></tr>
</thead>
<tbody>
<tr><td>プロトタイピング</td><td><a href="/docs/ja/milvus_lite.md">Milvus Lite</a></td><td>ゼロコンフィグ、インプロセス。Pythonが動作する場所であればどこでも実行可能 - 迅速なエージェントプロトタイピングに理想的です。</td></tr>
<tr><td>開発</td><td><a href="/docs/ja/install_standalone-docker.md">Milvusスタンドアロン</a></td><td>シングルノードのDockerデプロイメント。現実的なデータ量のローカル開発やテストに適しています。</td></tr>
<tr><td>プロダクション</td><td><a href="https://cloud.zilliz.com/signup">Zillizクラウド</a></td><td>フルマネージド、サーバーレスのMilvus。インフラを管理する必要がなく、エージェントは接続して操作するだけです。</td></tr>
<tr><td>セルフホスト</td><td><a href="/docs/ja/install_cluster-helm.md">Milvusディストリビューテッド</a></td><td>インフラを完全にコントロールする必要があるチーム向けのマルチノードKubernetesデプロイメント。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>エージェントのワークロードについては、<strong><a href="https://zilliz.com/cloud">Zilliz Cloudを</a></strong>本番環境で使用することを推奨します。エージェントは通常インフラを管理しないため、サーバーレス・デプロイメントにより運用のオーバーヘッドがなくなり、自動スケーリングが可能になります。</p>
</div>
