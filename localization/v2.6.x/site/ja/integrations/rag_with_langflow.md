---
id: rag_with_langflow.md
summary: >-
  このガイドでは、Langflowを使用してMilvusでRAG（Retrieval-Augmented
  Generation）パイプラインを構築する方法を説明します。
title: LangflowとMilvusを使用したRAGシステムの構築
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">LangflowとMilvusを使用したRAGシステムの構築<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、<a href="https://www.langflow.org/">Langflowを</a>使用して<a href="https://milvus.io/">Milvusで</a>RAG（Retrieval-Augmented Generation）パイプラインを構築する方法を示します。</p>
<p>RAGシステムは、まず知識ベースから関連文書を検索し、次にこのコンテキストに基づいて新しい応答を生成することで、テキスト生成を強化します。Milvusは埋め込みテキストの保存と検索に使用され、Langflowは視覚的ワークフローにおける検索と生成の統合を容易にします。</p>
<p>LangflowはRAGパイプラインの容易な構築を可能にし、テキストのチャンクが埋め込まれ、Milvusに保存され、関連するクエリが行われたときに検索される。これにより、言語モデルは文脈に基づいた応答を生成することができます。</p>
<p>Milvusは意味的に類似したテキストを素早く見つけるスケーラブルなベクトルデータベースとして機能し、Langflowはパイプラインがテキスト検索とレスポンス生成をどのように処理するかを管理することができます。これらを組み合わせることで、テキストベースのアプリケーションを強化するための堅牢なRAGパイプラインを構築する効率的な方法を提供します。</p>
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
    </button></h2><p>このノートブックを実行する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">python -m pip install langflow -U</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">チュートリアル<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>すべての依存関係がインストールされたら、次のコマンドを入力してLangflowダッシュボードを起動します：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">python -m langflow run</span>
<button class="copy-code-btn"></button></code></pre>
<p>すると、以下のようにダッシュボードがポップアップします：<span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p><strong>Vector Store</strong>プロジェクトを作成したいので、まず<strong>New Project</strong>ボタンをクリックします。パネルがポップアップするので、<strong>Vector Store RAG</strong>オプションを選択する：<span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Vector Store Ragプロジェクトが正常に作成されたら、デフォルトのベクターストアはAstraDBである。そこで、Milvusをベクターストアとして使用するために、これら2つのastraDBモジュールをMilvusに置き換える必要があります。<span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" />astraDB </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">astraDBをMilvusに置き換える手順：</h3><ol>
<li>ベクターストアの既存のカードを削除する。上の画像で赤く表示されている2つのAstraDBカードをクリックし、<strong>バックスペースを押して</strong>削除します。</li>
<li>サイドバーの<strong>Vector Store</strong>オプションをクリックし、Milvusを選択してキャンバスにドラッグする。ファイル処理ワークフロー用と検索ワークフロー用の2枚のMilvusカードが必要なので、これを2回行う。</li>
<li>Milvusモジュールを残りのコンポーネントにリンクします。下の画像を参照してください。</li>
<li>両方のMilvusモジュールにMilvus認証情報を設定する。最も簡単な方法は、接続URIをmilvus_demo.dbに設定してMilvus Liteを使用することです。Milvusサーバをセルフデプロイしている場合、またはZilliz Cloudを利用している場合は、Connection URIをサーバエンドポイントに、Connection Passwordをトークン（Milvusの場合は"<username>:<password>"、Zilliz Cloudの場合はAPI Key）に設定します。参考までに以下の画像をご覧ください：</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Milvusの構造デモ</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">RAGシステムに知識を埋め込む</h3><ol>
<li>左下のファイルモジュールからLLMのナレッジベースとしてファイルをアップロードします。ここではMilvusの簡単な紹介を含むファイルをアップロードしました。</li>
<li>右下のMilvusモジュールの実行ボタンを押して、挿入ワークフローを実行します。これでMilvusベクターストアにナレッジが挿入されます。</li>
<li>知識がメモリにあるかテストする。プレイグラウンドを開き、アップロードしたファイルに関連する質問をします。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>なぜmilvusなのか？</span> </span></p>
