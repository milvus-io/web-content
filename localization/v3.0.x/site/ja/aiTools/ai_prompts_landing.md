---
id: ai_prompts_landing.md
title: MilvusのためのAIプロンプト
summary: AIコーディングアシスタントが正しく最新のMilvusコードを記述するためのプロンプトをキュレーション。
---
<h1 id="AI-Prompts" class="common-anchor-header">AIプロンプト<button data-href="#AI-Prompts" class="anchor-icon" translate="no">
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
    </button></h1><p>AIコーディングアシスタントが正しいMilvusコードを書くためのプロンプトが用意されています。各プロンプトには、最も一般的なミスを防ぐルールとパターンがコード化されています。</p>
<h2 id="How-to-use" class="common-anchor-header">使用方法<button data-href="#How-to-use" class="anchor-icon" translate="no">
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
<li>プロンプトページの "Full prompt "セクションからプロンプトを<strong>コピー</strong>する。</li>
<li>それをあなたのAIツールが期待するファイルに<strong>保存</strong>します(下記の<a href="#use-in-different-environments">環境表を</a>参照)。</li>
<li>AIアシスタントがMilvusコードを生成またはレビューする際に自動的にルールが適用されます。</li>
</ol>
<h2 id="Prompt-pages" class="common-anchor-header">プロンプトページ<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
  <a href="/docs/ja/agents_overview.md">
    <p class="link-btn">🤖 MilvusのAGENTS.md</p>
    <p>AIコーディングエージェントのトップレベルのルールです。1つのファイルしか必要ない場合はここから始めてください。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/python_sdk.md">
    <p class="link-btn">🐍 Milvus Python SDK</p>
    <p>正しい接続パターン、MilvusClientの使い方、ORM APIの禁止。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/schema_design.md">
    <p class="link-btn">スキーマ設計</p>
    <p>フィールドタイプ、プライマリキー、スキーマの不変性、BM25 設定。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ja/search_patterns.md">
    <p class="link-btn">🔍 検索パターン</p>
    <p>重要な制約ルールによるANN、ハイブリッド、全文検索。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/index_selection.md">
    <p class="link-btn">🗂️ インデックス選択</p>
    <p>AUTOINDEX、HNSW、DiskANN、IVF_FLATの決定木。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ja/rag_pipeline.md">
    <p class="link-btn">🔗 RAGパイプライン</p>
    <p>Milvusによるエンドツーエンドの検索補強生成フロー。</p>
  </a>
</div>
</div>
<h2 id="Use-in-different-environments" class="common-anchor-header">異なる環境での使用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h2><table>
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
