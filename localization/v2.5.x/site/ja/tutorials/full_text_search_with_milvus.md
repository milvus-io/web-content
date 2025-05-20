---
id: full_text_search_with_milvus.md
summary: >-
  全文検索は、テキスト中の特定のキーワードや語句にマッチする文書を検索する伝統的な手法である。用語の頻度などから計算された関連性スコアに基づいて結果をランク付けする。セマンティック検索が意味や文脈を理解するのに優れているのに対し、全文検索は正確なキーワードマッチングに優れており、セマンティック検索を補完するのに有用である。検索補強型生成（RAG）パイプラインを構築する一般的なアプローチでは、セマンティック検索と全文検索の両方を通して文書を検索し、その後、結果を絞り込むために再ランク付けを行う。
title: Milvusによる全文検索
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-Text-Search-with-Milvus" class="common-anchor-header">Milvusによる全文検索<button data-href="#Full-Text-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文検索は</a>、テキスト中の特定のキーワードやフレーズにマッチする文書を検索する伝統的な手法です。用語の頻度などから計算された関連性スコアに基づいて結果をランク付けする。セマンティック検索が意味や文脈を理解するのに優れているのに対し、フルテキスト検索は正確なキーワードマッチングに優れているため、セマンティック検索を補完するのに有効です。検索補強型生成（RAG）パイプラインを構築する一般的なアプローチでは、セマンティック検索と全文検索の両方を通じて文書を検索し、その後、結果を絞り込むために再ランク付け処理を行う。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>このアプローチでは、テキストをBM25スコアリング用のスパースベクトルに変換する。文書を取り込むには、ユーザーはスパースベクトルを手動で計算することなく、生のテキストを入力するだけでよい。Milvusは自動的にスパースベクトルを生成し、保存する。文書を検索するには、検索クエリを指定するだけでよい。Milvusは内部でBM25スコアを計算し、ランク付けされた結果を返す。</p>
<p>Milvusは全文検索と密なベクトルベースの意味検索を組み合わせたハイブリッド検索もサポートしている。通常、キーワードマッチングと意味理解のバランスをとることにより、検索品質を向上させ、より良い結果をユーザーに提供することができる。</p>
<div class="alert note">
<ul>
<li>全文検索は現在、Milvus Standalone、Milvus Distributed、Zilliz Cloudで利用可能ですが、Milvus Liteではまだサポートされていません（この機能は将来実装される予定です）。詳細は support@zilliz.com までお問い合わせください。</li>
</ul>
</div>
<h2 id="Preparation" class="common-anchor-header">準備<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-PyMilvus" class="common-anchor-header">PyMilvusのインストール</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus -U</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールした依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<h3 id="Set-OpenAI-API-Key" class="common-anchor-header">OpenAI APIキーの設定</h3><p>OpenAIのモデルを用いてベクトル埋め込みとレスポンス生成を行います。<a href="https://platform.openai.com/docs/quickstart">APIキー</a> <code translate="no">OPENAI_API_KEY</code> を環境変数として用意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setup-and-Configuration" class="common-anchor-header">セットアップと設定<button data-href="#Setup-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>必要なライブラリのインポート</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
    RRFRanker,
)
<button class="copy-code-btn"></button></code></pre>
<p>MilvusClientを使ってMilvusサーバとの接続を確立します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;full_text_demo&quot;</span>
client = MilvusClient(uri=uri)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>connection_argsに</p>
<ul>
<li><a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上でよりパフォーマンスの高いMilvusサーバをセットアップすることができます。このセットアップでは、サーバのアドレス、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">uri</code> としてください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<h2 id="Collection-Setup-for-Full-Text-Search" class="common-anchor-header">全文検索用コレクションのセットアップ<button data-href="#Collection-Setup-for-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>全文検索用にコレクションをセットアップするには、いくつかの設定ステップが必要です。一つずつ見ていきましょう。</p>
<h3 id="Text-Analysis-Configuration" class="common-anchor-header">テキスト分析設定</h3><p>全文検索のために、テキストがどのように処理されるべきかを定義します。アナライザは、文章をトークンに分割し、ステミングやストップワードの除去のような字句解析を実行することで、全文検索に不可欠です。ここでは単純にアナライザーを定義する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define tokenizer parameters for text analysis</span>
analyzer_params = {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>アナライザーの詳細については、<a href="https://milvus.io/docs/analyzer-overview.md">アナライザーのドキュメントを</a>参照してください。</p>
<h3 id="Collection-Schema-and-BM25-Function" class="common-anchor-header">コレクションスキーマとBM25関数</h3><p>ここで、プライマリ・キー、テキスト・コンテンツ、スパース・ベクトル（全文検索用）、デンス・ベクトル（セマンティック検索用）、メタデータのフィールドを持つスキーマを定義します。また、全文検索のために BM25 関数を構成します。</p>
<p>BM25関数は自動的にテキストコンテンツをスパースベクトルに変換するため、Milvusは手動でスパース埋め込みを生成することなく、全文検索の複雑さに対応することができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema()
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.VARCHAR,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>,
    max_length=<span class="hljs-number">100</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
    analyzer_params=analyzer_params,
    enable_match=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text matching</span>
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text analysis</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Dimension for text-embedding-3-small</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)

<span class="hljs-comment"># Define BM25 function to generate sparse vectors from text</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
    output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
)

<span class="hljs-comment"># Add the function to schema</span>
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 100}, 'is_primary': True, 'auto_id': True}, {'name': 'content', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase']}}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'dense_vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'metadata', 'description': '', 'type': &lt;DataType.JSON: 23&gt;}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['content'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<h3 id="Indexing-and-Collection-Creation" class="common-anchor-header">インデックスとコレクションの作成</h3><p>検索パフォーマンスを最適化するために、スパースと密なベクトルフィールドの両方にインデックスを作成し、Milvusでコレクションを作成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define indexes</span>
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
)
index_params.add_index(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment"># Drop collection if exist</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Collection 'full_text_demo' created successfully
</code></pre>
<h2 id="Insert-Data" class="common-anchor-header">データの挿入<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションをセットアップした後、テキストコンテンツとベクトル表現の両方を持つエンティティを準備してデータを挿入する。埋め込み関数を定義し、コレクションにデータを挿入する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up OpenAI for embeddings</span>
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
model_name = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>


<span class="hljs-comment"># Define embedding generation function for reuse</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]]:
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> texts:
        <span class="hljs-keyword">return</span> []

    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=texts, model=model_name)
    <span class="hljs-keyword">return</span> [embedding.embedding <span class="hljs-keyword">for</span> embedding <span class="hljs-keyword">in</span> response.data]
<button class="copy-code-btn"></button></code></pre>
<p>サンプル文書をコレクションに挿入する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example documents to insert</span>
documents = [
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus is a vector database built for embedding similarity search and AI applications.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;documentation&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;introduction&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Full-text search in Milvus allows you to search using keywords and phrases.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tutorial&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;full-text search&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Hybrid search combines the power of sparse BM25 retrieval with dense vector search.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;blog&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;hybrid search&quot;</span>},
    },
]

<span class="hljs-comment"># Prepare entities for insertion</span>
entities = []
texts = [doc[<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> documents]
embeddings = get_embeddings(texts)

<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    entities.append(
        {
            <span class="hljs-string">&quot;content&quot;</span>: doc[<span class="hljs-string">&quot;content&quot;</span>],
            <span class="hljs-string">&quot;dense_vector&quot;</span>: embeddings[i],
            <span class="hljs-string">&quot;metadata&quot;</span>: doc.get(<span class="hljs-string">&quot;metadata&quot;</span>, {}),
        }
    )

<span class="hljs-comment"># Insert data</span>
client.insert(collection_name, entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(entities)}</span> documents&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 3 documents
</code></pre>
<h2 id="Perform-Retrieval" class="common-anchor-header">検索の実行<button data-href="#Perform-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search()</code> または<code translate="no">hybrid_search()</code> メソッドを柔軟に使用して、全文検索（疎）、意味検索（密）、ハイブリッド検索を実装し、より堅牢で正確な検索結果を導くことができます。</p>
<h3 id="Full-Text-Search" class="common-anchor-header">全文検索</h3><p>スパース検索はBM25アルゴリズムを活用し、特定のキーワードや語句を含む文書を検索する。この伝統的な検索方法は、正確な語句のマッチングを得意とし、ユーザーが探しているものを正確に把握している場合に特に効果的です。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for keyword search</span>
query = <span class="hljs-string">&quot;full-text search keywords&quot;</span>

<span class="hljs-comment"># BM25 sparse vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
sparse_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSparse Search (Full-text search):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sparse_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sparse Search (Full-text search):
1. Score: 3.1261, Content: Full-text search in Milvus allows you to search using keywords and phrases.
2. Score: 0.1836, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
3. Score: 0.1335, Content: Milvus is a vector database built for embedding similarity search and AI applications.
</code></pre>
<h3 id="Semantic-Search" class="common-anchor-header">セマンティック検索</h3><p>デンスサーチはベクトル埋め込みを使い、たとえキーワードが全く同じでなくても、似たような意味を持つ文書を見つける。このアプローチはコンテキストとセマンティクスの理解を助け、より自然な言語によるクエリに最適です。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for semantic search</span>
query = <span class="hljs-string">&quot;How does Milvus help with similarity search?&quot;</span>

<span class="hljs-comment"># Generate embedding for query</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Semantic search using dense vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query_embedding],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
dense_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nDense Search (Semantic):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(dense_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dense Search (Semantic):
1. Score: 0.6959, Content: Milvus is a vector database built for embedding similarity search and AI applications.
2. Score: 0.6501, Content: Full-text search in Milvus allows you to search using keywords and phrases.
3. Score: 0.4371, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<h3 id="Hybrid-Search" class="common-anchor-header">ハイブリッド検索</h3><p>ハイブリッド検索は、全文検索とセマンティック密集検索の両方を組み合わせたものです。このバランスの取れたアプローチは、両方の手法の長所を活用することで、検索精度と堅牢性を向上させる。</p>
<p>ハイブリッド検索は、意味理解と正確なキーワードマッチングの両方がより良い検索結果に貢献する、RAG（Retrieval-Augmented Generation）アプリケーションにおいて特に価値があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for hybrid search</span>
query = <span class="hljs-string">&quot;what is hybrid search&quot;</span>

<span class="hljs-comment"># Get query embedding</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Set up BM25 search request</span>
sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>}
sparse_request = AnnSearchRequest(
    [query], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Set up dense vector search request</span>
dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
dense_request = AnnSearchRequest(
    [query_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Perform hybrid search with reciprocal rank fusion</span>
results = client.hybrid_search(
    collection_name,
    [sparse_request, dense_request],
    ranker=RRFRanker(),  <span class="hljs-comment"># Reciprocal Rank Fusion for combining results</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
hybrid_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nHybrid Search (Combined):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hybrid_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid Search (Combined):
1. Score: 0.0328, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
2. Score: 0.0320, Content: Milvus is a vector database built for embedding similarity search and AI applications.
3. Score: 0.0320, Content: Full-text search in Milvus allows you to search using keywords and phrases.
</code></pre>
<h2 id="Answer-Generation" class="common-anchor-header">回答生成<button data-href="#Answer-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索で関連文書を検索した後、LLMを使って検索された情報に基づいて包括的な回答を生成することができる。これがRAG（Retrieval Augmented Generation）パイプラインの最終ステップである。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Format retrieved documents into context</span>
context = <span class="hljs-string">&quot;\n\n&quot;</span>.join([doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> hybrid_results])

<span class="hljs-comment"># Create prompt</span>
prompt = <span class="hljs-string">f&quot;&quot;&quot;Answer the following question based on the provided context. 
If the context doesn&#x27;t contain relevant information, just say &quot;I don&#x27;t have enough information to answer this question.&quot;

Context:
<span class="hljs-subst">{context}</span>

Question: <span class="hljs-subst">{query}</span>

Answer:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Call OpenAI API</span>
response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant that answers questions based on the provided context.&quot;</span>,
        },
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
    ],
)

<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<p>以上だ！これで、BM25ベースの全文検索と密なベクトルベースの意味検索の力を組み合わせたハイブリッド検索でRAGを構築したことになる。</p>
