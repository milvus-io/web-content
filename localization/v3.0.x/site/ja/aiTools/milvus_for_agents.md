---
id: milvus_for_agents.md
title: AIエージェント向けMilvus
summary: AIエージェントが、RAG、セマンティック検索、長期記憶のために、Milvusをベクトルデータベースとして活用する方法について学びましょう。
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">AIエージェント向けMilvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、AIコーディングエージェントや自律型エージェントシステムが、プログラムを通じてベクトルデータベースとやり取りできるようにする、エージェント向けのインターフェースを提供します。RAGパイプライン、セマンティック検索、エージェントのメモリシステムのいずれを構築する場合でも、Milvusはエージェントが接続し、動作するための複数の方法を提供します。</p>
<h2 id="Agent-tools" class="common-anchor-header">エージェント向けツール<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code向けのエージェントスキルで、LLMにPyMilvusを使用したベクトルデータベース操作を学習させます。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCPサーバー</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP（Model Context Protocol）サーバー。MCP互換のエージェントであれば、どれでもMilvusと直接やり取りできるようにします。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code向けに設計されたMCPサーバーで、コンテキストに応じたMilvusドキュメントへのアクセスを提供します。</p>
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
    </button></h2><p>AIコーディングアシスタントが正しいMilvusコードを記述できるよう支援する、厳選されたプロンプトです。各プロンプトには、最もよくあるミスを防ぐためのルールやパターンが組み込まれています。</p>
<p><strong>使用方法：</strong></p>
<ol>
<li>任意のプロンプトページの「完全なプロンプト」セクションからプロンプトを<strong>コピーします</strong>。</li>
<li>AIツールが指定する形式のファイルに<strong>保存してください</strong>（以下の<a href="#use-in-different-environments">環境一覧表を</a>参照）。</li>
<li>AIアシスタントは、Milvusコードを生成またはレビューする際に、自動的にこれらのルールを適用します。</li>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">あらゆるAIコーディングエージェント向けの最上位ルールです。ファイルを1つだけ作成したい場合は、ここから始めてください。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正しい接続パターン、MilvusClientの使用方法、およびORM APIの使用禁止について。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">スキーマ設計</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">フィールド型、主キー、スキーマの不変性、およびBM25の設定。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ja/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">検索パターン</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">重要な制約ルールを伴うANN検索、ハイブリッド検索、および全文検索。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">インデックスの選択</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AUTOINDEX、HNSW、DiskANN、およびIVF_FLAT用の決定木。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAGパイプライン</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Milvusを用いたエンドツーエンドの検索強化生成フロー。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ja/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MilvusClient メソッドの呼び出し、フィールド定義、レスポンスステータスの確認、および検索結果のシェイプ。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Go SDK v3のモジュールパス、接続タイムアウト、コレクションの読み込み、および検索結果セット。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">v2エンドポイント、camelCase形式のリクエストフィールド、レスポンスコードの確認、およびロード状態のポーリング。</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">さまざまな環境での利用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>環境</th><th>プロンプトの配置場所</th><th>手順</th></tr>
</thead>
<tbody>
<tr><td>カーソル</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">プロジェクトルールの設定</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">カスタム指示</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Codeのドキュメント</a></td></tr>
<tr><td>JetBrains IDE</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">ガイドラインのカスタマイズ</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI コードラボ</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">.instructions.md の設定</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">guidelines.md の設定</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">エージェントの推奨デプロイ方法<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>適切な Milvus のデプロイ方法の選択は、開発の段階によって異なります。</p>
<table>
<thead>
<tr><th>段階</th><th>デプロイメント</th><th>理由</th></tr>
</thead>
<tbody>
<tr><td>プロトタイピング</td><td><a href="/docs/ja/milvus_lite.md">Milvus Lite</a></td><td>設定不要、インプロセス。Pythonが動作する環境ならどこでも実行可能 — エージェントの迅速なプロトタイピングに最適。</td></tr>
<tr><td>開発</td><td><a href="/docs/ja/install_standalone-docker.md">Milvus Standalone</a></td><td>シングルノードのDockerデプロイ。現実的なデータ量を用いたローカル開発やテストに適しています。</td></tr>
<tr><td>本番環境</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>フルマネージドのサーバーレス Milvus。インフラの管理は不要で、エージェントを接続するだけで動作します。</td></tr>
<tr><td>セルフホスト型本番環境</td><td><a href="/docs/ja/install_cluster-helm.md">Milvus Distributed</a></td><td>インフラストラクチャを完全に制御する必要があるチーム向けの、マルチノードKubernetesデプロイメント。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>エージェントのワークロードについては、本番環境での利用には<strong><a href="https://zilliz.com/cloud">Zilliz Cloudを</a></strong>推奨します。エージェントは通常、インフラを管理しないため、サーバーレス展開により運用上のオーバーヘッドを排除し、自動スケーリングを実現します。</p>
</div>
