---
id: use_milvus_with_sambanova.md
summary: >-
  このチュートリアルでは、RAG(Retrieval-Augmented
  Generation)のような、企業のプライベート文書に基づいた検索と回答のためのエンタープライズ知識検索システムを構築するために、SambaNova AI
  Starter KitsのMilvusインテグレーションを活用する。
title: SambaNovaでMilvusを使う
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">SambaNovaでMilvusを使う<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">SambaNovaは</a>、高度なAIとディープラーニング機能の展開を加速する革新的なAIテクノロジープラットフォームです。SambaNovaは企業向けに設計されており、生成的なAIを活用してパフォーマンスと効率を向上させることができます。SambaNova SuiteやDataScaleのような最先端のソリューションを提供することで、このプラットフォームは、企業がデータから価値ある洞察を引き出すことを可能にし、業務改善を促進し、AIの展望における新たな機会を育成します。</p>
<p><a href="https://github.com/sambanova/ai-starter-kit">SambaNova AIスターターキットは</a>、開発者や企業がSambaNovaでAI駆動型アプリケーションを展開するのを支援するために設計されたオープンソースリソースのコレクションです。これらのキットは、様々なAIユースケースの実装を容易にする実践的な例やガイドを提供し、ユーザーがSambaNovaの先進技術を活用することを容易にします。</p>
<p>このチュートリアルではSambaNova AIスターターキットのMilvusインテグレーションを活用し、RAG(Retrieval-Augmented Generation)に似たエンタープライズ知識検索システムを構築し、企業のプライベートドキュメントに基づいた検索と回答を行います。</p>
<div class="alert note">
<p>このチュートリアルは主に<a href="https://github.com/sambanova/ai-starter-kit/tree/main">SambaNova AI Starter Kitsの</a>公式ガイドを参照しています。もし、このチュートリアルに古い部分があるようでしたら、オフィシャルガイドに従うことを優先し、私たちに問題を作成してください。</p>
</div>
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
    </button></h2><p>Python &gt;= 3.10, &lt; 3.12の使用を推奨します。</p>
<p><a href="https://cloud.sambanova.ai/">SambaNova Cloudに</a>アクセスし、SambaNova APIキーを取得する。</p>
<h2 id="Clone-the-repository" class="common-anchor-header">リポジトリをクローンする<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git
$ d ai-starter-kit/enterprise_knowledge_retriever
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">ベクターストアのタイプを変更する<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">create_vector_store()</code> の<code translate="no">db_type='milvus'</code> と<code translate="no">src/document_retrieval.py</code> の<code translate="no">load_vdb()</code> 関数を設定して、ベクターストアを変更する。</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">依存関係のインストール<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行し、必要な依存関係をインストールする：</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
<span class="hljs-built_in">source</span> enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">アプリケーションの起動<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドでアプリケーションを起動します：</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>その後、ブラウザにユーザーインターフェースが表示される：<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>UI に SambaNova API キーを設定した後、UI を操作したり、ドキュメントに関する質問をすることができます。</p>
<p>詳しくは<a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">SambaNova AI Starter Kitsのエンタープライズ知識検索</a>公式ドキュメントをご参照ください。</p>
