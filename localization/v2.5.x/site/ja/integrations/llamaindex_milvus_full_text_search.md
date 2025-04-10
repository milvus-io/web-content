---
id: llamaindex_milvus_full_text_search.md
title: LlamaIndexとmilvusで全文検索を使う
related_key: LlamaIndex
summary: >-
  このチュートリアルでは、LlamaIndexとMilvusを使って、全文検索とハイブリッド検索を使ったRAGシステムを構築する方法を学びます。まず全文検索を単独で実装し、次にセマンティック検索を統合してより包括的な検索結果を得られるように拡張します。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">LlamaIndexとmilvusで全文検索を使う<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>全文検索では</strong>、キーワードの完全一致を使用し、多くの場合BM25のようなアルゴリズムを活用して関連性によって文書をランク付けする。<strong>検索拡張生成（RAG）</strong>システムでは、この方法はAIが生成した応答を強化するために適切なテキストを検索する。</p>
<p>一方、<strong>セマンティック検索は</strong>文脈の意味を解釈して、より広範な結果を提供する。この2つのアプローチを組み合わせることで、情報検索を向上させる<strong>ハイブリッド検索が</strong>実現する。</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus2.</a>5のSparse-BM25アプローチでは、生テキストは自動的にスパースベクトルに変換されます。これにより、手作業によるスパース埋め込み生成が不要になり、意味理解とキーワードの関連性のバランスをとったハイブリッド検索戦略が可能になります。</p>
<p>このチュートリアルでは、LlamaIndexとMilvusを使って、全文検索とハイブリッド検索を使ったRAGシステムを構築する方法を学びます。まずは全文検索を単独で実装し、次にセマンティック検索を統合してより包括的な結果を得られるように拡張していきます。</p>
<blockquote>
<p>このチュートリアルを進める前に、<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文検索と</a> <a href="https://milvus.io/docs/integrate_with_llamaindex.md">LlamaIndexにおけるMilvusの基本的な使い方を</a>理解しておいてください。</p>
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
<p>始める前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Google Colabを使用している場合、<strong>ランタイムを再起動</strong>する必要があるかもしれません(インターフェースの上部にある "Runtime "メニューに移動し、ドロップダウンメニューから "Restart session "を選択してください)。</p>
</blockquote>
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
<p><strong>サンプルデータのダウンロード</strong></p>
<p>以下のコマンドを実行し、サンプルドキュメントを「data/paul_graham」ディレクトリにダウンロードしてください：</p>
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
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">全文検索付きRAG<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>全文検索をRAGシステムに統合することで、セマンティック検索と正確で予測可能なキーワードベースの検索のバランスが取れます。より良い検索結果を得るためには、全文検索とセマンティック検索を組み合わせることをお勧めしますが、全文検索のみを使用することもできます。ここではデモンストレーションのため、全文検索のみとハイブリッド検索を示します。</p>
<p>はじめに、<code translate="no">SimpleDirectoryReaderLoad</code> 、Paul Grahamのエッセイ「What I Worked On」を読み込んでください：</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">BM25による全文検索</h3><p>LlamaIndex の<code translate="no">MilvusVectorStore</code> は全文検索をサポートしており、キーワードベースの効率的な検索が可能です。組み込み関数を<code translate="no">sparse_embedding_function</code> 、検索結果のランク付けにBM25スコアリングを適用します。</p>
<p>このセクションでは、全文検索にBM25を使ったRAGシステムの実装方法を示す。</p>
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
<p>上記のコードでは、Milvusにサンプル文書を挿入し、全文検索のためのBM25ランキングを有効にするためのインデックスを構築している。これは密な埋め込みを無効にし、デフォルトのパラメータで<code translate="no">BM25BuiltInFunction</code> 。</p>
<p><code translate="no">BM25BuiltInFunction</code> パラメータで入力フィールドと出力フィールドを指定することができます：</p>
<ul>
<li><code translate="no">input_field_names (str)</code>:入力テキスト・フィールド（デフォルト："text"）。これは、BM25アルゴリズムがどのテキストフィールドに適用されるかを示す。異なるテキストフィールド名を持つ独自のコレクションを使用する場合は、これを変更する。</li>
<li><code translate="no">output_field_names (str)</code>:このBM25関数の出力が格納されるフィールド（デフォルト："sparse_embedding"）。</li>
</ul>
<p>ベクトルストアの設定が完了すると、Milvusを使ってクエリーモード "sparse "または "text_search "で全文検索クエリーを実行することができます：</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">テキストアナライザーのカスタマイズ</h4><p>アナライザは文章をトークンに分割し、ステミングやストップワード除去などの語彙処理を行うことで、全文検索において重要な役割を果たします。アナライザは通常、言語固有である。詳細は<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guideを</a>ご参照ください。</p>
<p>Milvusは2種類のアナライザをサポートしています：<strong>ビルトイン アナライザと</strong> <strong>カスタム アナライザ</strong>です。デフォルトでは、<code translate="no">BM25BuiltInFunction</code> 、句読点に基づいてテキストをトークン化する標準の内蔵アナライザが使用されます。</p>
<p>別のアナライザを使用したり、既存のアナライザをカスタマイズしたりするには、<code translate="no">analyzer_params</code> 引数に値を渡します：</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">再ランカーによるハイブリッド検索</h3><p>ハイブリッド検索システムは、セマンティック検索と全文検索を組み合わせ、RAGシステムにおける検索パフォーマンスを最適化する。</p>
<p>以下の例では、セマンティック検索にOpenAIエンベッディングを使用し、全文検索にBM25を使用しています：</p>
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
<p>このアプローチでは、Milvusコレクションに両方のベクトルフィールドを持つ文書を格納する：</p>
<ul>
<li><code translate="no">embedding</code>:意味検索のためのOpenAI埋め込みモデルによって生成された密な埋め込み。</li>
<li><code translate="no">sparse_embedding</code>:全文検索のためにBM25BuiltInFunctionを用いて計算された疎埋め込み。</li>
</ul>
<p>さらに、"RRFRanker "を使って、デフォルトのパラメータでリランキング戦略を適用した。RRFRankerをカスタマイズするには、<a href="https://milvus.io/docs/reranking.md">Milvus Reranking Guideに従って</a>、<code translate="no">hybrid_ranker</code> 、<code translate="no">hybrid_ranker_params</code> 。</p>
<p>それでは、サンプルクエリでRAGシステムをテストしてみよう：</p>
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
<p>このハイブリッド・アプローチは、セマンティック検索とキーワード・ベースの検索の両方を活用することで、RAGシステムにおいてより正確で文脈を考慮した応答を保証する。</p>
