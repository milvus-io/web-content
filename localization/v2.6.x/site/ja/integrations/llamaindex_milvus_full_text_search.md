---
id: llamaindex_milvus_full_text_search.md
title: LlamaIndexとMilvusを用いた全文検索
related_key: LlamaIndex
summary: >-
  このチュートリアルでは、LlamaIndexとMilvusを使用して、全文検索とハイブリッド検索を活用したRAGシステムを構築する方法を学びます。まず、全文検索のみを実装し、その後、より包括的な検索結果を得るためにセマンティック検索を統合して機能を拡張していきます。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">LlamaIndexとMilvusを用いた全文検索<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>全文検索では</strong>、キーワードの完全一致を利用し、多くの場合BM25などのアルゴリズムを活用して、関連性に基づいてドキュメントをランク付けします。<strong>検索拡張生成（RAG）</strong>システムでは、この手法を用いて関連性の高いテキストを取得し、AIが生成する応答の質を向上させます。</p>
<p>一方、<strong>セマンティック検索は</strong>文脈上の意味を解釈し、より広範な検索結果を提供します。これら2つのアプローチを組み合わせることで<strong>ハイブリッド検索</strong>が実現され、特に単一の手法では不十分な場合において、情報検索の精度が向上します。</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5のSparse-BM25</a>アプローチでは、生のテキストが自動的にスパースベクトルに変換されます。これにより、手動でのスパース埋め込み生成が不要となり、意味理解とキーワードの関連性のバランスを取ったハイブリッド検索戦略が可能になります。</p>
<p>このチュートリアルでは、LlamaIndexとMilvusを使用して、全文検索とハイブリッド検索を活用したRAGシステムを構築する方法を学びます。まず、全文検索のみを実装し、その後、より包括的な結果を得るためにセマンティック検索を統合して機能を強化していきます。</p>
<blockquote>
<p>このチュートリアルを進める前に、<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文検索</a>および<a href="https://milvus.io/docs/integrate_with_llamaindex.md">LlamaIndexでのMilvusの使用方法の基本について</a>理解していることを確認してください。</p>
</blockquote>
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
<p>開始する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Google Colab を使用している場合は、<strong>ランタイムを再起動</strong>する必要がある場合があります（インターフェース上部の「Runtime」メニューに移動し、ドロップダウンメニューから「Restart session」を選択してください）。</p>
</blockquote>
</div>
<p><strong>アカウントの設定</strong></p>
<p>このチュートリアルでは、テキストの埋め込みおよび回答生成に OpenAI を使用します。<a href="https://platform.openai.com/api-keys">OpenAI API キー</a>を準備する必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusベクトルストアを使用するには、Milvusサーバーの<code translate="no">URI</code> を指定してください（必要に応じて<code translate="no">TOKEN</code> も指定できます）。Milvusサーバーを起動するには、<a href="https://milvus.io/docs/install-overview.md">Milvusのインストールガイド</a>に従ってサーバーを設定するか、<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloudを</a>無料で試用してください。</p>
<blockquote>
<p>全文検索は現在、Milvus Standalone、Milvus Distributed、およびZilliz Cloudでサポートされていますが、Milvus Liteではまだサポートされていません（将来の実装を予定しています）。詳細については、support@zilliz.com までお問い合わせください。</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>サンプルデータのダウンロード</strong></p>
<p>以下のコマンドを実行して、サンプルドキュメントを「data/paul_graham」ディレクトリにダウンロードしてください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">全文検索を備えたRAG<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGシステムに全文検索を統合することで、セマンティック検索と、正確かつ予測可能なキーワードベースの検索とのバランスを取ることができます。全文検索のみを使用することも可能ですが、より良い検索結果を得るためには、全文検索とセマンティック検索を組み合わせることをお勧めします。ここでは、デモの目的で、全文検索のみとハイブリッド検索の両方をご紹介します。</p>
<p>まず、<code translate="no">SimpleDirectoryReaderLoad</code> を使用して、ポール・グラハムによるエッセイ「What I Worked On」を読み込みます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">BM25 による全文検索<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>LlamaIndexの<code translate="no">MilvusVectorStore</code> は全文検索をサポートしており、効率的なキーワードベースの検索を可能にします。<code translate="no">sparse_embedding_function</code> などの組み込み関数を使用することで、BM25スコアリングを適用して検索結果の順位付けを行います。</p>
<p>このセクションでは、全文検索にBM25を使用したRAGシステムの実装方法を解説します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>上記のコードは、Milvusにサンプルドキュメントを挿入し、全文検索でBM25によるランク付けを可能にするインデックスを構築します。また、dense embeddingを無効にし、デフォルトのパラメータで<code translate="no">BM25BuiltInFunction</code> を利用します。</p>
<p><code translate="no">BM25BuiltInFunction</code> のパラメータで、入力フィールドと出力フィールドを指定できます：</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: 入力テキストフィールド（デフォルト: “text”）。BM25アルゴリズムが適用されるテキストフィールドを示します。テキストフィールド名が異なる独自のコレクションを使用する場合は、これを変更してください。</li>
<li><code translate="no">output_field_names (str)</code>: このBM25関数の出力が格納されるフィールド（デフォルト：「sparse_embedding」）。</li>
</ul>
<p>ベクトルストアの設定が完了したら、Milvusのクエリモード「sparse」または「text_search」を使用して全文検索クエリを実行できます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">テキストアナライザーのカスタマイズ</h4><p>アナライザーは、文をトークンに分割し、ステミングやストップワードの除去といった語彙処理を行うことで、全文検索において極めて重要な役割を果たします。これらは通常、言語ごとに異なります。詳細については、<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">『Milvus アナライザーガイド』</a>を参照してください。</p>
<p>Milvus は、「<strong>組み込みアナライザー</strong>」と「<strong>カスタムアナライザー</strong>」の 2 種類のアナライザーをサポートしています。デフォルトでは、<code translate="no">BM25BuiltInFunction</code> は標準の組み込みアナライザーを使用し、句読点に基づいてテキストをトークン化します。</p>
<p>別のアナライザーを使用したり、既存のアナライザーをカスタマイズしたりするには、<code translate="no">analyzer_params</code> 引数に値を指定します：</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">リランカーを用いたハイブリッド検索<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>ハイブリッド検索システムは、セマンティック検索と全文検索を組み合わせ、RAGシステムにおける検索パフォーマンスを最適化します。</p>
<p>以下の例では、セマンティック検索に OpenAI エンベディングを、全文検索に BM25 を使用しています：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>仕組み</strong></p>
<p>このアプローチでは、ドキュメントを、両方のベクトルフィールドを含むMilvusコレクションに格納します：</p>
<ul>
<li><code translate="no">embedding</code>: セマンティック検索用にOpenAIの埋め込みモデルによって生成された高密度埋め込み。</li>
<li><code translate="no">sparse_embedding</code>: 全文検索用にBM25BuiltInFunctionを使用して計算されたスパース埋め込み。</li>
</ul>
<p>さらに、デフォルトパラメータを設定した「RRFRanker」を用いた再ランク付け戦略を適用しています。再ランク付け機能をカスタマイズするには、<a href="https://milvus.io/docs/weighted-ranker.md">Milvusの再ランク付けガイドに従って</a>、<code translate="no">hybrid_ranker</code> および<code translate="no">hybrid_ranker_params</code> を設定することができます。</p>
<p>それでは、サンプルクエリを使用してRAGシステムをテストしてみましょう：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>このハイブリッドなアプローチにより、セマンティック検索とキーワードベースの検索の両方を活用することで、RAGシステムにおいてより正確で文脈を意識した応答を実現します。</p>
