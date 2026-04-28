---
id: langchain_milvus_async.md
summary: >-
  このチュートリアルでは、langchain-milvusの非同期関数を活用して高性能なアプリケーションを構築する方法について説明します。非同期メソッドを使用することで、特に大規模な検索を扱う場合に、アプリケーションのスループットと応答性を大幅に向上させることができます。
title: LangChain-milvus統合における非同期関数
---
<h1 id="Asynchronous-Functions-in-LangChain-Milvus-Integration" class="common-anchor-header">LangChain-milvus統合における非同期関数<button data-href="#Asynchronous-Functions-in-LangChain-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>このチュートリアルでは、<a href="https://github.com/langchain-ai/langchain-milvus">langchain-milvusの</a>非同期関数を活用して高性能なアプリケーションを構築する方法について説明します。非同期メソッドを使うことで、特に大規模な検索を扱う場合に、アプリケーションのスループットと応答性を大幅に向上させることができます。リアルタイムのレコメンデーションシステムを構築する場合でも、アプリケーションにセマンティック検索を実装する場合でも、RAG（Retrieval-Augmented Generation）パイプラインを作成する場合でも、非同期操作は同時リクエストをより効率的に処理するのに役立ちます。高性能ベクトルデータベースmilvusとLangChainの強力なLLM抽象化を組み合わせることで、スケーラブルなAIアプリケーションを構築するための強固な基盤を提供することができます。</p>
<h2 id="Async-API-Overview" class="common-anchor-header">非同期APIの概要<button data-href="#Async-API-Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>langchain-milvusは包括的な非同期処理のサポートを提供し、大規模な並行処理シナリオにおけるパフォーマンスを大幅に向上させます。非同期APIは同期APIと一貫したインターフェース設計を維持します。</p>
<h3 id="Core-Async-Functions" class="common-anchor-header">コア非同期関数</h3><p>langchain-milvusで非同期操作を使用するには、メソッド名に<code translate="no">a</code> プレフィックスを追加するだけです。これにより、リソースの利用効率が向上し、同時検索要求を処理する際のスループットが向上します。</p>
<table>
<thead>
<tr><th>操作タイプ</th><th>同期メソッド</th><th>非同期メソッド</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>テキストの追加</td><td><code translate="no">add_texts()</code></td><td><code translate="no">aadd_texts()</code></td><td>ベクトルストアにテキストを追加</td></tr>
<tr><td>ドキュメントの追加</td><td><code translate="no">add_documents()</code></td><td><code translate="no">aadd_documents()</code></td><td>ベクトルストアにドキュメントを追加する</td></tr>
<tr><td>埋め込みベクターの追加</td><td><code translate="no">add_embeddings()</code></td><td><code translate="no">aadd_embeddings()</code></td><td>埋め込みベクトルを追加</td></tr>
<tr><td>類似検索</td><td><code translate="no">similarity_search()</code></td><td><code translate="no">asimilarity_search()</code></td><td>テキストによる意味検索</td></tr>
<tr><td>ベクトル検索</td><td><code translate="no">similarity_search_by_vector()</code></td><td><code translate="no">asimilarity_search_by_vector()</code></td><td>ベクトルによる意味検索</td></tr>
<tr><td>スコアによる検索</td><td><code translate="no">similarity_search_with_score()</code></td><td><code translate="no">asimilarity_search_with_score()</code></td><td>テキストによる意味検索と類似度スコアを返す</td></tr>
<tr><td>スコア付きベクトル検索</td><td><code translate="no">similarity_search_with_score_by_vector()</code></td><td><code translate="no">asimilarity_search_with_score_by_vector()</code></td><td>ベクトルによる意味検索と類似スコアを返す</td></tr>
<tr><td>多様性検索</td><td><code translate="no">max_marginal_relevance_search()</code></td><td><code translate="no">amax_marginal_relevance_search()</code></td><td>MMR検索（多様性を最適化しつつ類似したものを返す）</td></tr>
<tr><td>ベクトル多様性検索</td><td><code translate="no">max_marginal_relevance_search_by_vector()</code></td><td><code translate="no">amax_marginal_relevance_search_by_vector()</code></td><td>ベクトルによるMMR検索</td></tr>
<tr><td>削除操作</td><td><code translate="no">delete()</code></td><td><code translate="no">adelete()</code></td><td>文書の削除</td></tr>
<tr><td>Upsert操作</td><td><code translate="no">upsert()</code></td><td><code translate="no">aupsert()</code></td><td>文書をアップサート（既存の場合は更新、そうでない場合は挿入）する。</td></tr>
<tr><td>メタデータ検索</td><td><code translate="no">search_by_metadata()</code></td><td><code translate="no">asearch_by_metadata()</code></td><td>メタデータフィルタリングによるクエリー</td></tr>
<tr><td>主キーの取得</td><td><code translate="no">get_pks()</code></td><td><code translate="no">aget_pks()</code></td><td>式による主キーの取得</td></tr>
<tr><td>テキストからの作成</td><td><code translate="no">from_texts()</code></td><td><code translate="no">afrom_texts()</code></td><td>テキストからベクトルストアを作成</td></tr>
</tbody>
</table>
<p>これらの関数の詳細については、<a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus">APIリファレンスを</a>参照してください。</p>
<h3 id="Performance-Benefits" class="common-anchor-header">パフォーマンスの利点</h3><p>非同期操作により、大量の同時リクエストを処理する際のパフォーマンスが大幅に向上します：</p>
<ul>
<li>ドキュメントのバッチ処理</li>
<li>高同時検索シナリオ</li>
<li>プロダクションRAGアプリケーション</li>
<li>大規模データのインポート/エクスポート</li>
</ul>
<p>このチュートリアルでは、同期操作と非同期操作の詳細な比較を通じて、これらのパフォーマンス上の利点を実証し、非同期 API を活用してアプリケーションのパフォーマンスを最適化する方法を紹介します。</p>
<h2 id="Before-you-begin" class="common-anchor-header">始める前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>このページのコード・スニペットには、以下の依存関係が必要です：</p>
<pre><code translate="no" class="language-python">! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</blockquote>
<p>OpenAIのモデルを使います。<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> を環境変数として用意してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jupyter Notebookを使用している場合、非同期コードを実行する前にこのコードを実行する必要があります：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Exploring-Async-APIs-and-Performance-Comparison" class="common-anchor-header">非同期APIの探索とパフォーマンス比較<button data-href="#Exploring-Async-APIs-and-Performance-Comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>それでは、langchain-milvusを使った同期処理と非同期処理のパフォーマンス比較について深く掘り下げてみよう。</p>
<p>まず、必要なライブラリをインポートします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Define the Milvus URI</span>
URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-up-Test-Functions" class="common-anchor-header">テスト関数のセットアップ</h3><p>テストデータを生成するヘルパー関数を作りましょう：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    <span class="hljs-string">&quot;&quot;&quot;Generate a random string ID&quot;&quot;&quot;</span>
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_test_documents</span>(<span class="hljs-params">num_docs</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate test documents for performance testing&quot;&quot;&quot;</span>
    docs = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_docs):
        content = (
            <span class="hljs-string">f&quot;This is test document <span class="hljs-subst">{i}</span> with some random content: <span class="hljs-subst">{random.random()}</span>&quot;</span>
        )
        metadata = {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">f&quot;doc_<span class="hljs-subst">{i}</span>&quot;</span>,
            <span class="hljs-string">&quot;score&quot;</span>: random.random(),
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">f&quot;cat_<span class="hljs-subst">{i % <span class="hljs-number">5</span>}</span>&quot;</span>,
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Initialize-the-Vector-Store" class="common-anchor-header">ベクターストアの初期化</h3><p>パフォーマンステストを実行する前に、Milvusベクターストアを初期化する必要があります。この関数により、テストごとに新しいコレクションから開始し、以前のデータからの干渉を排除します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-string">&quot;&quot;&quot;Initialize and return a fresh vector store for testing&quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name=<span class="hljs-string">&quot;langchain_perf_test&quot;</span>,
        connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
        auto_id=<span class="hljs-literal">True</span>,
        drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Always start with a fresh collection</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Async-vs-Sync-Add-Documents" class="common-anchor-header">非同期と同期ドキュメントの追加</h3><p>それでは、同期と非同期のドキュメント追加のパフォーマンスを比較してみましょう。これらの関数は、ベクトルストアに複数のドキュメントを追加するときに、非同期操作がどれだけ速くなるかを測定するのに役立ちます。非同期バージョンはドキュメント追加ごとにタスクを作成して同時に実行し、同期バージョンはドキュメントを1つずつ処理します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents asynchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        <span class="hljs-comment"># Create tasks for each document addition</span>
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents synchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>では、ドキュメント数を変えてパフォーマンステストを実行し、実際のパフォーマンスの違いを見てみましょう。負荷を変化させてテストし、非同期操作が同期操作に比べてどのようにスケールするかを理解します。このテストでは、両方のアプローチの実行時間を測定し、非同期操作のパフォーマンス上の利点を実証します：</p>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Get the event loop</span>
loop = asyncio.get_event_loop()

<span class="hljs-comment"># Create a new vector store for testing</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test async document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())

<span class="hljs-comment"># Reset vector store for sync tests</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test sync document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


Async add for 10 documents took 1.74 seconds


2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


Async add for 100 documents took 2.77 seconds
Sync add for 10 documents took 5.36 seconds
Sync add for 100 documents took 65.60 seconds
</code></pre>
<h3 id="Async-vs-Sync-Search" class="common-anchor-header">非同期 vs 同期検索</h3><p>検索性能の比較では、まずベクターストアにデータを入れる必要がある。以下の関数は、複数の検索クエリーを同時に作成し、同期と非同期の実行時間を比較することで、検索パフォーマンスを測定するのに役立ちます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">populate_vector_store</span>(<span class="hljs-params">milvus_store, num_docs=<span class="hljs-number">1000</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Populate the vector store with test documents&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform async searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        task = milvus_store.asimilarity_search(query=query, k=<span class="hljs-number">3</span>)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform sync searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        result = milvus_store.similarity_search(query=query, k=<span class="hljs-number">3</span>)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>では、包括的な検索パフォーマンス・テストを実行して、非同期操作が同期操作に比べてどのようにスケールするかを見てみよう。異なるクエリーボリュームでテストを行い、特に同時処理の数が増えるほど、非同期処理のパフォーマンス上の利点が高まることを実証します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Test async search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())

<span class="hljs-comment"># Test sync search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


Async search for 10 queries took 2.31 seconds
Async search for 100 queries took 3.72 seconds
Sync search for 10 queries took 6.07 seconds
Sync search for 100 queries took 54.22 seconds
</code></pre>
<h3 id="Async-vs-Sync-Delete" class="common-anchor-header">非同期と同期の比較削除</h3><p>削除操作もまた、非同期操作によってパフォーマンスが大幅に向上する重要な要素です。同期削除操作と非同期削除操作のパフォーマンスの違いを測定する関数を作ってみましょう。これらのテストは、非同期オペレーションがバッチ削除をより効率的に処理できることを示すのに役立ちます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents asynchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents synchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>では、削除パフォーマンステストを実行して、パフォーマンスの違いを定量化してみましょう。まず、新しいベクターストアにテストデータを入れ、同期と非同期の両方のアプローチで削除操作を実行します：</p>
<pre><code translate="no" class="language-python">delete_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test async delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_delete</span>():
        async_time = <span class="hljs-keyword">await</span> async_delete(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_delete())

<span class="hljs-comment"># Reset and repopulate the vector store for sync tests</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test sync delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:
    sync_time = sync_delete(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


Async delete for 10 operations took 0.58 seconds


2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


Async delete for 100 operations took 0.61 seconds
Sync delete for 10 operations took 2.82 seconds
Sync delete for 100 operations took 29.21 seconds
</code></pre>
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
    </button></h2><p>このチュートリアルでは、LangChainとmilvusを使った非同期操作のパフォーマンス上の優位性を示しました。追加、検索、削除操作の同期版と非同期版を比較し、特に大規模なバッチ操作において、非同期操作がいかに大幅な速度向上をもたらすかを示しました。</p>
<p>主な要点</p>
<ol>
<li>非同期オペレーションは、並列実行可能な多数の個別オペレーションを実行する場合に、最大のメリットをもたらす。</li>
<li>より高いスループットを生成するワークロードでは、同期操作と非同期操作の性能差は拡大する。</li>
<li>非同期オペレーションは、マシンの計算能力をフルに活用します。</li>
</ol>
<p>LangChainとmilvusでプロダクションRAGアプリケーションを構築する場合、パフォーマンスが気になる場合、特に並行処理では非同期APIの使用を検討してください。</p>
