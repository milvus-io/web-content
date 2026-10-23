---
id: integrate_with_haystack.md
summary: このガイドでは、HaystackとMilvusを使用して、検索拡張生成（RAG）システムを構築する方法について解説します。
title: MilvusとHaystackを用いた検索強化生成（RAG）
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="common-anchor-header">MilvusとHaystackを用いた検索強化生成（RAG）<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、HaystackとMilvusを使用して検索強化生成（RAG）システムを構築する方法について解説します。</p>
<p>RAGシステムは、検索システムと生成モデルを組み合わせ、与えられたプロンプトに基づいて新しいテキストを生成します。このシステムはまず、Milvusを使用してコーパスから関連する文書を検索し、次に生成モデルを用いて、検索された文書に基づいて新しいテキストを生成します。</p>
<p><a href="https://haystack.deepset.ai/">Haystackは</a>、deepsetが提供する、大規模言語モデル（LLM）を用いたカスタムアプリを構築するためのオープンソースのPythonフレームワークです。<a href="https://milvus.io/">Milvusは</a>、埋め込みの類似性検索やAIアプリケーションを駆動するために構築された、世界最先端のオープンソースベクトルデータベースです。</p>
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
    </button></h2><p>このチュートリアルでは、Python 3.10 以降が必要です。最新の PyMilvus および Milvus Lite パッケージとともに、Milvus 用の Haystack 統合機能をインストールしてください：</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot; &quot;nltk&gt;=3.9.1&quot; markdown-it-py mdit_plain
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab を使用している場合、インストールしたばかりの依存機能を有効にするには、<strong>ランタイムを再起動</strong>する必要がある場合があります（画面上部の「Runtime」メニューをクリックし、ドロップダウンメニューから「Restart session」を選択してください）。</p>
</div>
<p>OpenAIのモデルを使用します。環境変数として<a href="https://platform.openai.com/docs/quickstart">APIキー</a> <code translate="no">OPENAI_API_KEY</code> を設定しておいてください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">データの準備<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGパイプラインのプライベートナレッジストアとして、<a href="https://www.gutenberg.org/cache/epub/7785/pg7785.txt">レオナルド・ダ・ヴィンチ</a>に関するオンラインコンテンツを使用します。これは、シンプルなRAGパイプラインに適したデータソースです。</p>
<p>これをダウンロードし、ローカルのテキストファイルとして保存してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> urllib.request

url = <span class="hljs-string">&quot;https://www.gutenberg.org/cache/epub/7785/pg7785.txt&quot;</span>
file_path = <span class="hljs-string">&quot;./davinci.txt&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-the-indexing-Pipeline" class="common-anchor-header">インデックス作成パイプラインの作成<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>テキストをドキュメントに変換し、文に分割して、埋め込み表現を生成するインデックス作成パイプラインを作成します。その後、ドキュメントはMilvusドキュメントストアに書き込まれます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.converters <span class="hljs-keyword">import</span> MarkdownToDocument
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.preprocessors <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore, MilvusEmbeddingRetriever

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_rag_demo&quot;</span>,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>},
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: &quot;http://localhost:19530&quot;},</span>
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: os.environ[&quot;MILVUS_URI&quot;], &quot;token&quot;: Secret.from_env_var(&quot;MILVUS_TOKEN&quot;)},</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>connection_args については：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル（例：<code translate="no">./milvus.db</code> ）として設定するのが最も便利な方法です。これにより、<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteが</a>自動的にこのファイル内のすべてのデータを保存します。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">Docker や Kubernetes</a> 上でより高性能な Milvus サーバーを構築できます。この構成では、<code translate="no">uri</code> の代わりにサーバーの URI（例:<code translate="no">http://localhost:19530</code> ）を使用してください。</li>
<li>Milvus向けのフルマネージドクラウドサービス<a href="https://zilliz.com/cloud">であるZilliz Cloud</a>を使用する場合は、<code translate="no">MILVUS_URI</code> および<code translate="no">MILVUS_TOKEN</code> に、Zilliz Cloudコンソールに表示される<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">パブリックエンドポイントとAPIキー</a>を設定してください。</li>
</ul>
</div>
<pre><code translate="no" class="language-python">indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;converter&quot;</span>, MarkdownToDocument())
indexing_pipeline.add_component(
    <span class="hljs-string">&quot;splitter&quot;</span>, DocumentSplitter(split_by=<span class="hljs-string">&quot;sentence&quot;</span>, split_length=<span class="hljs-number">2</span>)
)
indexing_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, DocumentWriter(document_store))
indexing_pipeline.connect(<span class="hljs-string">&quot;converter&quot;</span>, <span class="hljs-string">&quot;splitter&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;splitter&quot;</span>, <span class="hljs-string">&quot;embedder&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;converter&quot;</span>: {<span class="hljs-string">&quot;sources&quot;</span>: [file_path]}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 134
</code></pre>
<h2 id="Create-the-retrieval-pipeline" class="common-anchor-header">検索パイプラインを作成する<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>ベクトル類似度検索エンジンを使用して、Milvus ドキュメントストアからドキュメントを取得する検索パイプラインを作成します。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Where is Leonardo&#x27;s earliest dated work kept?&quot;</span>

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
retrieval_pipeline.connect(<span class="hljs-string">&quot;embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question}})

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">This
small picture, which has been considerably repainted, and is perhaps
by Andrea del Verrocchio, Leonardo's master, is the subject of Plate
II.

To January 1473 belongs Leonardo's earliest dated work, a pen-and-ink
drawing--&quot;A Wide View over a Plain,&quot; now in the Uffizi. The
inscription together with the date in the top left-hand corner is
reversed, and proves a remarkable characteristic of Leonardo's
handwriting--viz., that he wrote from right to left; indeed, it has
been suggested that he did this in order to make it difficult for any
one else to read the words, which were frequently committed to paper
by the aid of peculiar abbreviations.

Leonardo continued to work in his master's studio till about 1477.
</code></pre>
<h2 id="Create-the-RAG-pipeline" class="common-anchor-header">RAGパイプラインの作成<button data-href="#Create-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MilvusEmbeddingRetriever</code> と<code translate="no">OpenAIChatGenerator</code> を組み合わせて、取得したドキュメントを用いて質問に回答する RAG パイプラインを作成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> ChatPromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators.chat <span class="hljs-keyword">import</span> OpenAIChatGenerator
<span class="hljs-keyword">from</span> haystack.dataclasses <span class="hljs-keyword">import</span> ChatMessage

prompt_template = [
    ChatMessage.from_user(
        <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
        not include an answer, reply with &#x27;I don&#x27;t know&#x27;.

        Query: {{query}}
        Documents:
        {% for doc in documents %}
            {{ doc.content }}
        {% endfor %}
        Answer:
        &quot;&quot;&quot;</span>
    )
]

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;prompt_builder&quot;</span>, ChatPromptBuilder(template=prompt_template)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIChatGenerator(
        api_key=Secret.from_env_var(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder.prompt&quot;</span>, <span class="hljs-string">&quot;generator.messages&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>].text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Leonardo's earliest dated work is kept in the Uffizi Gallery (the Uffizi).
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
    </button></h2><p>HaystackとMilvusを使用して、インデックス作成パイプライン、セマンティック検索パイプライン、およびRAGパイプラインを構築しました。その他の統合オプションについては、<a href="https://github.com/milvus-io/milvus-haystack">milvus-haystackのREADME</a>を参照してください。</p>
