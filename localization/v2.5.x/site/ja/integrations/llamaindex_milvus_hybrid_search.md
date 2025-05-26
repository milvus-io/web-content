---
id: llamaindex_milvus_hybrid_search.md
title: MilvusとLlamaIndexによるハイブリッド検索を使用したRAG
related_key: LlamaIndex
summary: >-
  このノートブックでは、[LlamaIndex](https://www.llamaindex.ai/)
  RAGパイプラインでのハイブリッド検索にMilvusを使用する方法を示します。推奨されるデフォルトのハイブリッド検索（semantic +
  BM25）から始め、他の代替スパース埋め込み方法とハイブリッドリランカーのカスタマイズを探ります。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">MilvusとLlamaIndexによるハイブリッド検索を使用したRAG<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>ハイブリッド検索は、セマンティック検索とキーワードマッチングの両方の長所を活用し、より正確で文脈に関連した結果を提供します。セマンティック検索とキーワードマッチングの長所を組み合わせることで、ハイブリッド検索は複雑な情報検索タスクにおいて特に効果的です。</p>
<p>このノートブックでは、<a href="https://www.llamaindex.ai/">LlamaIndex</a>RAGパイプラインでMilvusをハイブリッド検索に使用する方法を説明します。推奨されるデフォルトのハイブリッド検索（セマンティック＋BM25）から始め、他の代替スパース埋め込み方法とハイブリッドリランカーのカスタマイズを探ります。</p>
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
    </button></h2><p><strong>依存関係のインストール</strong></p>
<p>始める前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、<strong>ランタイムを再起動する</strong>必要があるかもしれません（インターフェースの上部にある "Runtime "メニューに移動し、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p><strong>アカウントの設定</strong></p>
<p>このチュートリアルでは、テキスト埋め込みと回答生成にOpenAIを使います。<a href="https://platform.openai.com/api-keys">OpenAIのAPIキーを</a>準備する必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusベクターストアを使用するには、Milvusサーバを<code translate="no">URI</code> (オプションで<code translate="no">TOKEN</code>)で指定します。Milvusサーバを立ち上げるには、<a href="https://milvus.io/docs/install-overview.md">Milvusのインストールガイドに</a>従うか、<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloudを</a>無料で試すことができる。</p>
<blockquote>
<p>全文検索は現在、Milvus Standalone、Milvus Distributed、Zilliz Cloudでサポートされていますが、Milvus Liteではまだサポートされていません（将来実装予定）。詳細は support@zilliz.com までお問い合わせください。</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>サンプルデータのロード</strong></p>
<p>以下のコマンドを実行し、サンプルドキュメントを "data/paul_graham "ディレクトリにダウンロードします：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>次に<code translate="no">SimpleDirectoryReaderLoad</code> 、Paul Grahamのエッセイ "What I Worked On "をロードする：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">BM25によるハイブリッド検索<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、BM25 を使ってハイブリッド検索を実行する方法を示す。始めに、<code translate="no">MilvusVectorStore</code> を初期化し、サンプル文書のインデックスを作成します。デフォルトの設定では</p>
<ul>
<li>デフォルトの埋め込みモデル（OpenAIの<code translate="no">text-embedding-ada-002</code> ）からの密な埋め込み。</li>
<li>enable_sparseがTrueの場合、全文検索のためのBM25</li>
<li>ハイブリッド検索が有効な場合、k=60のRRFRankerを結果の結合に使用します。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p><code translate="no">MilvusVectorStore</code> の密フィールドと疎フィールドを設定するための引数についての詳細は以下の通りです：</p>
<p><strong>密フィールド</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>:密な埋め込みを有効または無効にするブール値のフラグ。デフォルトはTrue。</li>
<li><code translate="no">dim (int, optional)</code>:コレクションの埋め込みベクトルの次元。</li>
<li><code translate="no">embedding_field (str, optional)</code>:コレクションの密埋め込みフィールドの名前。デフォルトは DEFAULT_EMBEDDING_KEY です。</li>
<li><code translate="no">index_config (dict, optional)</code>:密埋め込みインデックスの構築に使用される設定。デフォルトはなし。</li>
<li><code translate="no">search_config (dict, optional)</code>:Milvus密インデックスを検索するための設定。これは<code translate="no">index_config</code> で指定されたインデックスタイプと互換性がなければならないことに注意してください。デフォルトはなし。</li>
<li><code translate="no">similarity_metric (str, optional)</code>:密な埋め込みに使用する類似度メトリックで、現在は IP, COSINE, L2 をサポートしています。</li>
</ul>
<p><strong>スパースフィールド</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>:スパース埋め込みを有効または無効にするブール値のフラグ。デフォルトはFalse。</li>
<li><code translate="no">sparse_embedding_field (str)</code>:スパース埋め込みフィールドの名前。デフォルトは DEFAULT_SPARSE_EMBEDDING_KEY です。</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>:enable_sparse が True の場合、テキストをスパース埋め込みに変換するためにこのオブジェクトを提供する必要があります。Noneの場合、デフォルトのスパース埋め込み関数(BM25BuiltInFunction)が使用されるか、組み込み関数のない既存のコレクションではBGEM3SparseEmbeddingが使用される。</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>:スパース埋め込みインデックスの構築に使用される設定。デフォルトはNoneです。</li>
</ul>
<p>クエリの段階でハイブリッド検索を有効にするには、<code translate="no">vector_store_query_mode</code> を "hybrid "に設定します。これにより、セマンティック検索とフルテキスト検索の両方からの検索結果が結合され、再ランク付けされる。サンプルクエリでテストしてみよう：「著者はViawebで何を学びましたか？</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">テキストアナライザーをカスタマイズする</h3><p>アナライザーは、文章をトークンに分割し、ステミングやストップワード除去などの語彙処理を行うことで、全文検索において重要な役割を果たします。アナライザは通常、言語固有です。詳細は<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guideを</a>ご参照ください。</p>
<p>Milvusは2種類のアナライザをサポートしています：<strong>ビルトイン アナライザと</strong> <strong>カスタム アナライザ</strong>です。デフォルトでは、<code translate="no">enable_sparse</code> が True に設定されている場合、<code translate="no">MilvusVectorStore</code> はデフォルト設定の<code translate="no">BM25BuiltInFunction</code> を利用し、句読点に基づいてテキストをトークン化する標準の組み込みアナライザを採用します。</p>
<p>別の解析器を使用したり、既存の解析器をカスタマイズしたりするには、<code translate="no">BM25BuiltInFunction</code> を構築する際に<code translate="no">analyzer_params</code> 引数に値を指定します。その後、この関数を<code translate="no">MilvusVectorStore</code> の<code translate="no">sparse_embedding_function</code> として設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">他のスパース埋め込みとのハイブリッド検索<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはセマンティック検索とBM25の組み合わせ以外にも、<a href="https://arxiv.org/abs/2402.03216">BGE-M3の</a>ようなスパース埋め込み関数を使ったハイブリッド検索もサポートしています。以下の例では、組み込みの<code translate="no">BGEM3SparseEmbeddingFunction</code> を使ってスパース埋め込みを生成します。</p>
<p>まず、<code translate="no">FlagEmbedding</code> パッケージをインストールします：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>そして、OpenAIのデフォルトモデルであるdensen embeddingと、組み込みのBGE-M3を使ったsparse embeddingを使って、ベクトルストアとインデックスを構築します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>それでは、サンプル質問でハイブリッド検索クエリを実行してみましょう：</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">スパース埋め込み関数のカスタマイズ</h3><p>以下のメソッドを含む<code translate="no">BaseSparseEmbeddingFunction</code> を継承する限り、スパース埋め込み関数をカスタマイズすることもできます：</p>
<ul>
<li><code translate="no">encode_queries</code>:このメソッドは、テキストをクエリ用のスパース埋め込みリストに変換します。</li>
<li><code translate="no">encode_documents</code>:このメソッドは、テキストを文書用のスパース埋め込みリストに変換します。</li>
</ul>
<p>各メソッドの出力は、辞書のリストであるスパース埋込みの形式に従う必要があります。各辞書は，次元を表すキー（整数）と，その次元における埋込みの大きさを表す対応する値（浮動小数点数）を持つ必要があります（例えば，{1: 0.5, 2: 0.3}）．</p>
<p>例えば、BGE-M3を使ったカスタムスパース埋め込み関数の実装です：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">ハイブリッドリランカーのカスタマイズ<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは2種類の<a href="https://milvus.io/docs/reranking.md">リランキング戦略を</a>サポートしています：Reciprocal Rank Fusion (RRF)とWeighted Scoringです。<code translate="no">MilvusVectorStore</code> ハイブリッド検索のデフォルトランカーはk=60のRRFです。ハイブリッドランカーをカスタマイズするには、以下のパラメータを変更します：</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>:ハイブリッド検索クエリで使用するランカーのタイプを指定します。現在は ["RRFRanker", "WeightedRanker"] のみをサポートしています。デフォルトは "RRFRanker" です。</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>:ハイブリッドランカーの設定パラメータ。この辞書の構造は使用される特定のランカーに依存する：<ul>
<li>RRFRanker "の場合、以下を含むべきである：<ul>
<li>"k"(int)：k」（int）：RRF（Reciprocal Rank Fusion）で使用されるパラメータ。この値はRRFアルゴリズムの一部としてランクスコアを計算するために使用され、複数のランキング戦略を1つのスコアにまとめ、検索の関連性を向上させます。デフォルト値は60です。</li>
</ul></li>
<li>WeightedRanker "には、次のようなものが期待される：<ul>
<li>"weights"（floatのリスト）：2つの重みのリスト：<ol>
<li>密な埋め込みコンポーネントの重み。</li>
<li>これらの重みは，ハイブリッド検索処理において，埋め込み成分の密な成分と疎な成分の重要度のバランスをとるために用いられます．デフォルトの重みは[1.0, 1.0]です。</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
