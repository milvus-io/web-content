---
id: build_RAG_with_milvus_and_embedAnything.md
summary: >-
  このチュートリアルでは、EmbedAnythingとMilvusを使用したRAG（Retrieval-Augmented
  Generation）パイプラインの構築方法を紹介します。EmbedAnythingは、特定のデータベースと密に結合するのではなく、プラグイン可能なアダプタシステムを使用しています。アダプタは、埋め込みがどのようにフォーマットされ、インデックスが付けられ、ターゲットベクターストアに格納されるかを定義するラッパーとして機能します。
title: MilvusとEmbedAnythingでRAGを構築する
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-RAG-with-Milvus-and-EmbedAnything" class="common-anchor-header">MilvusとEmbedAnythingでRAGを構築する<button data-href="#Building-RAG-with-Milvus-and-EmbedAnything" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnythingは</a>、テキスト、PDF、画像、音声などをサポートする、Rustで構築された高速で軽量な埋め込みパイプラインです。</p>
<p>このチュートリアルでは、EmbedAnythingと<a href="https://milvus.io">Milvusを</a>使用したRAG（Retrieval-Augmented Generation）パイプラインの構築方法を紹介します。EmbedAnythingは、特定のデータベースと密に結合するのではなく、プラグイン可能な<strong>アダプタ</strong>システムを使用しています。アダプタは、エンベッディングがどのようにフォーマットされ、インデックス付けされ、ターゲットベクターストアに格納されるかを定義するラッパーとして機能します。</p>
<p>EmbedAnythingとMilvusアダプタを組み合わせることで、わずか数行のコードで、多様なファイルタイプからエンベッディングを生成し、効率的にMilvusに格納することができます。</p>
<blockquote>
<p>⚠️ 注：EmbedAnythingのアダプタはMilvusへの挿入を処理しますが、検索はサポートしていません。完全なRAGパイプラインを構築するには、別途MilvusClientをインスタンス化し、アプリケーションの一部として検索ロジック（例：ベクトルに対する類似検索）を実装する必要があります。</p>
</blockquote>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">依存関係と環境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU pymilvus openai embed_anything</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<h3 id="Clone-the-Repository-and-Load-Adapter" class="common-anchor-header">リポジトリのクローンとアダプタのロード</h3><p>次に、<a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a>リポジトリをクローンし、<code translate="no">examples/adapters</code> ディレクトリを Python のパスに追加します。このディレクトリにはEmbedAnythingがMilvusと通信してベクトルを挿入するためのカスタムMilvusアダプタ実装が格納されています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sys

<span class="hljs-comment"># Clone the EmbedAnything repository if not already cloned</span>
![ -d <span class="hljs-string">&quot;EmbedAnything&quot;</span> ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

<span class="hljs-comment"># Add the `examples/adapters` directory to the Python path</span>
sys.path.append(<span class="hljs-string">&quot;EmbedAnything/examples/adapters&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ EmbedAnything cloned and adapter path added.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">✅ EmbedAnything cloned and adapter path added.
</code></pre>
<p>このRAGパイプラインではOpenAIをLLMとして使用します。環境変数として<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> を用意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAGのビルド<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-Milvus" class="common-anchor-header">Milvusの初期化</h3><p>ファイルを埋め込む前に、Milvusとやりとりする2つのコンポーネントを準備する必要がある：</p>
<ol>
<li><code translate="no">MilvusVectorAdapter</code> - これは、EmbedAnything用のMilvusアダプタで、<strong>ベクターインジェスト</strong>（エンベッディングの挿入とインデックスの作成<strong>）のみに</strong>使用されます。現在のところ、検索操作はサポートして<strong>いません</strong>。</li>
<li><code translate="no">MilvusClient</code> - これは からの公式クライアントであり、ベクター検索、フィルタリング、コレクション管理など、Milvusの<code translate="no">pymilvus</code><strong>全機能にアクセスすることが</strong>できます。</li>
</ol>
<p>混乱を避けるために</p>
<ul>
<li><code translate="no">MilvusVectorAdapter</code> はベクターを保存するための "書き込み専用 "ツールであるとお考えください。</li>
<li><code translate="no">MilvusClient</code> は、実際にクエリーを実行し、RAGのドキュメントを検索するための "読み取り・検索 "エンジンであると考えてください。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> embed_anything
<span class="hljs-keyword">from</span> embed_anything <span class="hljs-keyword">import</span> (
    WhichModel,
    EmbeddingModel,
)
<span class="hljs-keyword">from</span> milvus_db <span class="hljs-keyword">import</span> MilvusVectorAdapter
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Official Milvus client for full operations</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-comment"># EmbedAnything adapter for pushing embeddings into Milvus</span>
index_name = <span class="hljs-string">&quot;embed_anything_milvus_collection&quot;</span>
milvus_adapter = MilvusVectorAdapter(
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>, collection_name=index_name
)

<span class="hljs-comment"># Delete existing collection if it exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

<span class="hljs-comment"># Create a new collection with dimension matching the embedding model later used</span>
milvus_adapter.create_index(dimension=<span class="hljs-number">384</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Ok - Milvus DB connection established.
Collection 'embed_anything_milvus_collection' created with index.
</code></pre>
<div class="alert note">
<p><code translate="no">MilvusVectorAdapter</code> と<code translate="no">MilvusClient</code> の引数について：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> とするのが最も便利な方法です。</li>
<li>100万ベクトルを超えるような大規模なデータをお持ちの場合は、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのアドレスとポートをURIとして使用してください（例：<code translate="no">http://localhost:19530</code> ）。Milvusで認証機能を有効にする場合は、トークンに "<your_username>:<your_password>" を使用します。そうでない場合は、トークンを設定しないでください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<h3 id="Initialize-Embedding-Model-and-Embed-PDF-Document" class="common-anchor-header">埋め込みモデルの初期化とPDFドキュメントの埋め込み</h3><p>埋め込みモデルを初期化します。Sentence-transformersライブラリの<code translate="no">all-MiniLM-L12-v2 model</code> 。これは軽量でありながら、テキスト埋め込みを生成するための強力なモデルです。これは384次元の埋め込みを生成するので、Milvusコレクションの次元が384に設定されているのと一致します。このアラインメントは非常に重要で、Milvusに保存されたベクトル次元とモデルによって生成されたベクトル次元の互換性を保証します。</p>
<p>EmbedAnythingはさらに多くの埋め込みモデルをサポートしています。詳しくは<a href="https://github.com/StarlightSearch/EmbedAnything">公式ドキュメントを</a>参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the embedding model</span>
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id=<span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L12-v2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>それでは、PDFファイルを埋め込んでみましょう。EmbedAnythingは、PDF（およびその他多くの）ドキュメントを簡単に処理し、Milvusに直接埋め込むことができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Embed a PDF file</span>
data = embed_anything.embed_file(
    <span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    embedder=model,
    adapter=milvus_adapter,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converted 12 embeddings for insertion.
Successfully inserted 12 embeddings.
</code></pre>
<h3 id="Retrieve-and-Generate-Response" class="common-anchor-header">レスポンスの取得と生成</h3><p>繰り返しますが、現在のところEmbedAnythingの<code translate="no">MilvusVectorAdapter</code> は、ベクトルの取り込みとインデックス作成のみのための軽量な抽象化です。<strong>検索クエリには対応していません</strong>。したがって、RAGパイプラインを構築するための関連文書を検索するためには、Milvusベクターストアに問い合わせるために、<code translate="no">MilvusClient</code> インスタンス(<code translate="no">milvus_client</code>)を直接使用する必要があります。</p>
<p>Milvusから関連文書を検索する関数を定義する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    query_vector = <span class="hljs-built_in">list</span>(
        embed_anything.embed_query([question], embedder=model)[<span class="hljs-number">0</span>].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    docs = [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<p>RAGパイプラインで取得した文書を使用してレスポンスを生成する関数を定義する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>サンプル質問でRAGパイプラインをテストしてみましょう。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How does Milvus search for similar documents?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: How does Milvus search for similar documents?
Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.
</code></pre>
