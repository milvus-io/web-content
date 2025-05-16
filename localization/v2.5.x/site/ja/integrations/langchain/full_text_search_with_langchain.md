---
id: full_text_search_with_langchain.md
summary: このチュートリアルでは、LangChainとmilvusを使ってアプリケーションに全文検索を実装する方法を紹介します。
title: LangChainとmilvusで全文検索を使う
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">LangChainとmilvusで全文検索を使う<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文検索は</a>、テキスト中の特定のキーワードやフレーズにマッチする文書を検索する伝統的な方法です。用語の頻度などから計算された関連性スコアに基づいて結果をランク付けします。セマンティック検索が意味や文脈を理解するのに優れているのに対し、全文検索は正確なキーワードマッチングに優れており、セマンティック検索を補完するのに有用である。BM25アルゴリズムは、フルテキスト検索におけるランキングに広く使用されており、RAG（Retrieval-Augmented Generation）において重要な役割を果たしている。</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5では</a>、BM25を使ったネイティブな全文検索機能を導入した。このアプローチはテキストをBM25スコアを表すスパースベクトルに変換します。生テキストを入力するだけで、Milvusが自動的にスパースベクトルを生成・保存し、手動でのスパース埋め込み生成は不要です。</p>
<p>LangChainとMilvusの統合もこの機能を導入し、RAGアプリケーションに全文検索を組み込むプロセスを簡素化しました。全文検索と密なベクトルによるセマンティック検索を組み合わせることで、密な埋め込みによるセマンティックコンテキストと単語マッチングによる正確なキーワード関連性の両方を活用するハイブリッドアプローチを実現することができます。この統合により、検索システムの精度、関連性、ユーザーエクスペリエンスが向上します。</p>
<p>このチュートリアルでは、LangChainとmilvusを使ってアプリケーションに全文検索を実装する方法を紹介します。</p>
<div class="alert note">
<ul>
<li>全文検索は現在、Milvus Standalone、Milvus Distributed、Zilliz Cloudで利用可能ですが、Milvus Liteではまだサポートされていません（将来の実装を予定しています）。詳細は support@zilliz.com までお問い合わせください。</li>
<li>このチュートリアルを進める前に、<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文検索と</a>LangChain Milvus インテグレーションの<a href="https://milvus.io/docs/basic_usage_langchain.md">基本</a>的な使い方を理解しておいてください。</li>
</ul>
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
    </button></h2><p>このノートブックを実行する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするには、<strong>ランタイムを再起動する</strong>必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p>OpenAIのモデルを使います。<a href="https://platform.openai.com/docs/quickstart">OpenAIの</a>環境変数<code translate="no">OPENAI_API_KEY</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus サーバ<code translate="no">URI</code> (オプションで<code translate="no">TOKEN</code>) を指定してください。Milvusサーバのインストールと起動方法については<a href="https://milvus.io/docs/install_standalone-docker-compose.md">こちらを</a>参照してください。</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>サンプルドキュメントを用意する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">BM25関数による初期化<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">ハイブリッド検索</h3><p>Milvus VectorStoreは全文検索のために<code translate="no">builtin_function</code> パラメータを受け付けます。このパラメータを通して、<code translate="no">BM25BuiltInFunction</code> のインスタンスを渡すことができます。これは通常、<code translate="no">VectorStore</code> に密な埋め込みを渡すセマンティック検索とは異なります、</p>
<p>Milvusで、セマンティック検索にOpenAIのdense embedding、全文検索にBM25を使ったハイブリッド検索の簡単な例を示します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    <span class="hljs-comment"># `dense` is for OpenAI embeddings, `sparse` is the output field of BM25 function</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>上のコードでは、<code translate="no">BM25BuiltInFunction</code> のインスタンスを定義し、<code translate="no">Milvus</code> オブジェクトに渡しています。<code translate="no">BM25BuiltInFunction</code> は、Milvusにおける <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a>の軽量なラッパークラスです。</p>
<p>この関数の入力フィールドと出力フィールドは<code translate="no">BM25BuiltInFunction</code> のパラメータで指定できます：</p>
<ul>
<li><code translate="no">input_field_names</code> (str)で指定します：入力フィールドの名前、デフォルトは です。 この関数がどのフィールドを入力として読み込むかを示します。<code translate="no">text</code></li>
<li><code translate="no">output_field_names</code> (str)：(str):出力フィールド名, デフォルトは . この関数が計算結果を出力するフィールドを示します.<code translate="no">sparse</code></li>
</ul>
<p>前述のMilvus初期化パラメータでは、<code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code> も指定していることに注意してください。<code translate="no">BM25BuiltInFunction</code>によって定義された出力フィールドとして<code translate="no">sparse</code> フィールドが取られるため、他の<code translate="no">dense</code> フィールドは自動的に OpenAIEmbeddings の出力フィールドに割り当てられます。</p>
<p>実際には、特に複数の埋め込みや関数を組み合わせる場合には、曖昧さを避けるために、関数ごとに入力フィールドと出力フィールドを明示的に指定することをお勧めします。</p>
<p>以下の例では、<code translate="no">BM25BuiltInFunction</code> の入力フィールドと出力フィールドを明示的に指定し、組み込み関数がどのフィールドに対するものかを明確にしています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding2 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(
        input_field_names=<span class="hljs-string">&quot;text&quot;</span>, output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>
    ),
    text_field=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># `text` is the input field name of BM25BuiltInFunction</span>
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>この例では、3つのベクトル・フィールドがあります。その中で、<code translate="no">sparse</code> は<code translate="no">BM25BuiltInFunction</code> の出力フィールドとして使用され、他の2つ、<code translate="no">dense1</code> と<code translate="no">dense2</code> は、（順番に基づいて）2つの<code translate="no">OpenAIEmbeddings</code> モデルの出力フィールドとして自動的に割り当てられます。</p>
<p>このように、複数のベクトル・フィールドを定義し、それらに異なる埋め込みや関数の組み合わせを割り当てることで、ハイブリッド検索を実行することができる。</p>
<p>ハイブリッド検索を実行する際には、クエリーテキストを渡し、オプションでtopKとrerankerパラメータを設定するだけでよい。<code translate="no">vectorstore</code> インスタンスは自動的にベクトル埋め込みと組み込み関数を処理し、最後にリランカーを使って結果を絞り込む。検索プロセスの基本的な実装の詳細は、ユーザーからは見えないようになっている。</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>ハイブリッド検索の詳細については、<a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">ハイブリッド検索入門と</a> <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">LangChain Milvusハイブリッド検索チュートリアルを</a>参照してください。</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">エンベッディングなしのBM25検索</h3><p>埋め込みベースのセマンティック検索を使わず、BM25関数で全文検索のみを行いたい場合、埋め込みパラメータを<code translate="no">None</code> に設定し、BM25関数インスタンスとして指定された<code translate="no">builtin_function</code> のみを保持することができます。ベクトル・フィールドは "sparse "フィールドのみを持つ。例えば</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=<span class="hljs-literal">None</span>,
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
    ),
    vector_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['sparse']
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">アナライザーのカスタマイズ<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>アナライザーは、文章をトークンに分割し、ステミングやストップワード除去のような字句解析を行うことで、全文検索には欠かせないものです。アナライザーは通常、言語固有です。Milvusのアナライザについては<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">こちらのガイドを</a>ご参照ください。</p>
<p>Milvusは2種類のアナライザをサポートしています：<strong>ビルトイン アナライザと</strong> <strong>カスタム アナライザ</strong>です。デフォルトでは、<code translate="no">BM25BuiltInFunction</code> <a href="https://milvus.io/docs/standard-analyzer.md">標準の内蔵アナライザが</a>使用されます。これは、句読点を含むテキストをトークン化する最も基本的なアナライザです。</p>
<p>別のアナライザーを使いたい場合や、アナライザーをカスタマイズしたい場合は、<code translate="no">BM25BuiltInFunction</code> の初期化で<code translate="no">analyzer_params</code> パラメーターを渡します。</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
        enable_match=<span class="hljs-literal">True</span>,
        analyzer_params=analyzer_params_custom,
    ),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvusコレクションのスキーマを見て、カスタマイズされた解析器が正しくセットアップされていることを確認することができます。</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>コンセプトの詳細、例えば、<code translate="no">analyzer</code>,<code translate="no">tokenizer</code>,<code translate="no">filter</code>,<code translate="no">enable_match</code>,<code translate="no">analyzer_params</code> については、<a href="https://milvus.io/docs/analyzer-overview.md">アナライザーのドキュメントを</a>参照してください。</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">RAGでのハイブリッド検索と再ランク付けの使用<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>ここまでLangChainとmilvusの基本的なBM25ビルドイン関数の使い方を学んできた。ハイブリッド検索とリランキングで最適化されたRAG実装を紹介しましょう。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この図はハイブリッド検索と再ランク付けのプロセスを示しており、キーワードマッチングのためのBM25と意味検索のためのベクトル検索を組み合わせている。両方の方法からの結果はマージされ、再ランク付けされ、最終的な答えを生成するためにLLMに渡される。</p>
<p>ハイブリッド検索は精度と意味理解のバランスをとり、多様なクエリに対する精度と頑健性を向上させる。BM25全文検索とベクトル検索で候補を検索し、セマンティックでコンテキストを考慮した正確な検索を実現します。</p>
<p>それでは例題をご覧ください。</p>
<h3 id="Prepare-the-data" class="common-anchor-header">データの準備</h3><p>Langchain WebBaseLoaderを使ってウェブソースからドキュメントをロードし、RecursiveCharacterTextSplitterを使ってチャンクに分割する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'}, page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#')
</code></pre>
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Milvusベクトルストアにドキュメントをロードする。</h3><p>Milvusベクターストアには2つのベクターフィールドがあります。<code translate="no">dense</code> はOpenAIのエンベッディング用、<code translate="no">sparse</code> はBM25関数用です。</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">RAGチェーンの構築</h3><p>LLMインスタンスとプロンプトを準備し、LangChain Expression Languageを使ってRAGパイプラインに結合する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-4o&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>LCEL(LangChain Expression Language)を使ってRAGチェインを構築する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>特定の質問でRAGチェーンを呼び出し、応答を取得する。</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>おめでとう！MilvusとLangChainのハイブリッド（密なベクトル＋疎なbm25関数）検索RAGチェーンが構築できました。</p>
