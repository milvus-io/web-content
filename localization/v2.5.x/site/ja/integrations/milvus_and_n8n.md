---
id: milvus_and_n8n.md
summary: >-
  n8nは強力なオープンソースのワークフロー自動化プラットフォームで、様々なアプリケーション、サービス、APIを接続し、コーディングなしで自動化ワークフローを作成することができます。n8nはノードベースのビジュアルインターフェースにより、ユーザーは異なるサービスやアクションを表すノードを接続するだけで、複雑な自動化プロセスを構築することができます。n8nは、セルフホスト可能で、拡張性が高く、フェアコードとエンタープライズライセンスの両方をサポートしています。
title: Milvusとn8nを始めよう
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Milvusとn8n入門<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">n8nとMilvus Vector Store Nodeの紹介<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8nは</a>強力なオープンソースのワークフロー自動化プラットフォームであり、様々なアプリケーション、サービス、APIを接続することで、コーディングなしで自動化ワークフローを作成することができます。ノードベースのビジュアルインターフェースにより、異なるサービスやアクションを表すノードを接続するだけで、複雑な自動化プロセスを構築することができます。n8nはセルフホスト可能で、拡張性が高く、フェアコードとエンタープライズライセンスの両方をサポートしています。</p>
<p>n8nの<strong>Milvus Vector Store</strong>ノードは、<a href="https://milvus.io/">Milvusを</a>オートメーションワークフローに統合します。これにより、n8nエコシステム内で、セマンティック検索、検索拡張世代（RAG）システムのパワーアップ、インテリジェントAIアプリケーションの構築が可能になります。</p>
<p>このドキュメントは主に<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Storeの</a>公式<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">ドキュメントに基づいて</a>います。もし古い内容や一貫性のない内容がありましたら、公式ドキュメントを優先してお読みください。</p>
<h2 id="Key-Features" class="common-anchor-header">主な機能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>n8nのMilvus Vector Storeノードでは、以下のことが可能です：</p>
<ul>
<li>Milvusデータベースを<a href="https://docs.n8n.io/glossary/#ai-vector-store">ベクターストアとして</a>扱うことができます。</li>
<li>Milvusにドキュメントを挿入する。</li>
<li>Milvusからドキュメントを取得する。</li>
<li><a href="https://docs.n8n.io/glossary/#ai-chain">チェーンに</a>接続されたレトリーバーにドキュメントを提供するためにドキュメントを取得する。</li>
<li><a href="https://docs.n8n.io/glossary/#ai-tool">ツールとして</a> <a href="https://docs.n8n.io/glossary/#ai-agent">エージェントに</a>直接接続する</li>
<li>メタデータに基づいてドキュメントをフィルタリングする</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">ノードの使用パターン<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>n8nのMilvus Vector Storeノードは以下のパターンで利用することができます。</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">通常のノードとしてドキュメントの挿入・取得を行う</h3><p>Milvus Vector Storeを通常のノードとして利用し、文書の挿入や取得を行うことができます。このパターンでは、Milvus Vector Storeをエージェントを使わずに通常の接続フローに配置します。</p>
<p>Milvusにドキュメントを保存し、引用されたチャットベースの回答をサポートするためにドキュメントを取得するシステムの構築方法については、この<a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">サンプルテンプレートを</a>参照してください。</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">ツールとしてAIエージェントに直接接続</h3><p>Milvusベクターストアノードを<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">AIエージェントの</a>ツールコネクタに直接接続することで、問い合わせに回答する際のリソースとしてベクターストアを利用することができます。</p>
<p>ここでは以下のように接続します：AIエージェント（ツールコネクタ） -&gt; Milvus Vector Storeノード.Milvusにデータが埋め込まれ、インデックスが作成され、AIエージェントがベクターストアをナレッジツールとして使用し、質問に回答する<a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">例です。</a></p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">ドキュメントの取得にレトリバーを使用する</h3><p><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a>ノードをMilvus Vector Storeノードと一緒に使用することで、Milvus Vector Storeノードからドキュメントをフェッチすることができます。これはよく<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Question and Answer Chain</a>ノードと共に使用され、指定されたチャット入力にマッチするドキュメントをベクターストアからフェッチします。</p>
<p>典型的なノードの接続フローは以下のようになります：Question and Answer Chain (Retriever connector) -&gt; Vector Store Retriever (Vector Store connector) -&gt; Milvus Vector Store.</p>
<p>Milvusに外部データを取り込み、チャットベースのセマンティックQ&amp;Aシステムを構築する方法については、こちらの<a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">ワークフロー例を</a>ご覧ください。</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">ベクターストアの質問回答ツールを使って質問に答える</h3><p><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Toolを</a>使用して、Milvus Vector Storeノードからの結果を要約し、質問に回答するパターンもあります。このパターンでは、Milvus Vector Storeを直接ツールとして接続するのではなく、Vector Storeのデータを要約するために特別に設計されたツールを使用します。</p>
<p>接続の流れは以下のようになる：AIエージェント(ツールコネクタ) -&gt; ベクターストア質問回答ツール(ベクターストアコネクタ) -&gt; Milvusベクターストア.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">ノード操作モード<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Vector Storeノードは複数のオペレーションモードをサポートしており、それぞれが異なるワークフローのユースケースに合わせて調整されています。これらのモードを理解することで、より効果的なワークフローを設計することができます。</p>
<p>以下に利用可能なオペレーションモードとオプションの概要を説明します。各モードの入力パラメータと設定オプションの完全なリストについては、<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">公式ドキュメントを</a>参照してください。</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">オペレーションモードの概要</h3><p>Milvus Vector Storeノードは4つのモードをサポートしています：</p>
<ul>
<li><strong>Get Many</strong>：プロンプトとの意味的類似性に基づいて複数の文書を取得します。</li>
<li><strong>文書を挿入する</strong>：Milvusコレクションに新しい文書を挿入します。</li>
<li><strong>ドキュメントの取得 (Vector Store for Chain/Tool として)：</strong>チェーンベースのシステム内でノードをリトリーバーとして使用します。</li>
<li><strong>ドキュメントを取得する(AIエージェントのツールとして)：</strong>質問応答タスク中にAIエージェントのツールリソースとしてノードを使用します。</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">追加ノードオプション</h3><ul>
<li><strong>メタデータフィルター</strong>（Get Many モードのみ）：カスタムのメタデータキーに基づいて結果をフィルタリングします。複数のフィールドに AND 条件を適用します。</li>
<li><strong>コレクションをクリア</strong>（ドキュメント挿入モードのみ）：新しい文書を挿入する前に、コレクションから既存の文書を削除します。</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">関連リソース</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus統合ドキュメント</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus ドキュメント</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n Advanced AI ドキュメント</a></li>
</ul>
