---
id: integrate_with_llamaindex.md
summary: >-
  このガイドでは、LlamaIndexとmilvusを使用したRAG（Retrieval-Augmented
  Generation）システムの構築方法を説明します。
title: MilvusとLlamaIndexによる検索拡張生成(RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">MilvusとLlamaIndexによる検索拡張生成(RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>このガイドでは、LlamaIndexとMilvusを使ったRAG（Retrieval-Augmented Generation）システムの構築方法を説明する。</p>
<p>RAGシステムは検索システムと生成モデルを組み合わせ、与えられたプロンプトに基づいて新しいテキストを生成する。システムはまずMilvusを使ってコーパスから関連文書を検索し、次に生成モデルを使って検索された文書に基づいて新しいテキストを生成する。</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndexは</a>、カスタムデータソースを大規模言語モデル（LLM）に接続するためのシンプルで柔軟なデータフレームワークである。<a href="https://milvus.io/">Milvusは</a>世界で最も先進的なオープンソースのベクトル・データベースであり、埋め込み類似検索やAIアプリケーションのために構築されている。</p>
<p>このノートブックでは、MilvusVectorStoreの簡単なデモをお見せします。</p>
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">依存関係のインストール</h3><p>このページのコードスニペットにはpymilvusとllamaindexの依存関係が必要です。以下のコマンドでインストールできます：</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールした依存関係を有効にするために、<strong>ランタイムを再起動する</strong>必要があるかもしれません。(画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">OpenAIのセットアップ</h3><p>まず、openai api keyを追加します。これでchatgptにアクセスできるようになる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">データの準備</h3><p>以下のコマンドでサンプルデータをダウンロードできます：</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">はじめに<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">データを生成する</h3><p>最初の例として、<code translate="no">paul_graham_essay.txt</code> というファイルから文書を生成してみましょう。これは<code translate="no">What I Worked On</code> というタイトルの Paul Graham のエッセイです。ドキュメントを生成するにはSimpleDirectoryReaderを使います。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">データを横断するインデックスの作成</h3><p>文書ができたので、インデックスを作成して文書を挿入することができます。インデックスにはMilvusVectorStoreを使います。MilvusVectorStoreはいくつかの引数をとります：</p>
<h4 id="basic-args" class="common-anchor-header">基本引数</h4><ul>
<li><code translate="no">uri (str, optional)</code>:接続先のURIは、MilvusやZillizクラウドサービスの場合は "https://address:port"、ローカルMilvusの場合は "path/to/local/milvus.db "となる。デフォルトは"./milvus_llamaindex.db "です。</li>
<li><code translate="no">token (str, optional)</code>:ログイン用トークン。rbacを使用しない場合は空、rbacを使用する場合は "username:password "となる。</li>
<li><code translate="no">collection_name (str, optional)</code>:データを保存するコレクション名。デフォルトは "llamalection"。</li>
<li><code translate="no">overwrite (bool, optional)</code>:既存の同じ名前のコレクションを上書きするかどうか。デフォルトはFalse。</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">doc idとtextを含むスカラーフィールド</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>:コレクションのdoc_idフィールドの名前。デフォルトは DEFAULT_DOC_ID_KEY です。</li>
<li><code translate="no">text_key (str, optional)</code>:渡されたコレクションのどのキーテキストに格納されるか。独自のコレクションを持ってくるときに使用する。デフォルトは DEFAULT_TEXT_KEY です。</li>
<li><code translate="no">scalar_field_names (list, optional)</code>:コレクションスキーマに含まれる追加スカラーフィールドの名前。</li>
<li><code translate="no">scalar_field_types (list, optional)</code>:追加のスカラー・フィールドの型。</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">密フィールド</h4><ul>
<li><code translate="no">enable_dense (bool)</code>:密な埋め込みを有効または無効にするブーリアン・フラグ。デフォルトはTrue。</li>
<li><code translate="no">dim (int, optional)</code>:コレクションの埋め込みベクトルの次元。enable_sparse が False で新しいコレクションを作成するときに必要です。</li>
<li><code translate="no">embedding_field (str, optional)</code>:コレクションの密埋め込みフィールドの名前。デフォルトは DEFAULT_EMBEDDING_KEY です。</li>
<li><code translate="no">index_config (dict, optional)</code>:密埋め込みインデックスの構築に使用する設定。デフォルトはNone。</li>
<li><code translate="no">search_config (dict, optional)</code>:Milvus密インデックスを検索するための設定。これは<code translate="no">index_config</code> で指定されたインデックスタイプと互換性がなければならないことに注意してください。デフォルトはなし。</li>
<li><code translate="no">similarity_metric (str, optional)</code>:密な埋め込みに使用する類似度メトリックで、現在は IP, COSINE, L2 をサポートしています。</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">スパースフィールド</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>:スパース埋め込みを有効または無効にするブール値のフラグ。デフォルトはFalse。</li>
<li><code translate="no">sparse_embedding_field (str)</code>:スパース埋め込みフィールドの名前。デフォルトは DEFAULT_SPARSE_EMBEDDING_KEY です。</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>:enable_sparse が True の場合、テキストをスパース埋め込みに変換するためにこのオブジェクトを提供する必要があります。Noneの場合、デフォルトのスパース埋め込み関数(BGEM3SparseEmbeddingFunction)が使用される。</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>:スパース埋め込みインデックスの構築に使用される設定。デフォルトはNoneです。</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">ハイブリッドランカー</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>:ハイブリッド検索クエリで使用するランカーのタイプを指定します。現在は["RRFRanker", "WeightedRanker"]のみサポート。デフォルトは "RRFRanker"。</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>:ハイブリッドランカーの設定パラメータ。この辞書の構造は使用される特定のランカーに依存する：</p>
<ul>
<li>RRFRanker "の場合、以下を含むべきである：<ul>
<li>"k"(int)：k」（int）：RRF（Reciprocal Rank Fusion）で使用されるパラメータ。この値はRRFアルゴリズムの一部としてランクスコアを計算するために使用され、複数のランキング戦略を1つのスコアにまとめ、検索の関連性を向上させます。</li>
</ul></li>
<li>WeightedRanker "には、次のようなものが期待されます：<ul>
<li>"weights"（floatのリスト）：2つの重みのリスト：<ol>
<li>密な埋め込みコンポーネントの重み。</li>
<li>これらの重みは、ハイブリッド検索プロセスにおいて、埋め込み要素の密な成分と疎な成分の重要度を調整するために使用されます。 デフォルトは空の辞書で、ランカーは事前に定義されたデフォルト設定で動作することを意味します。</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">その他</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>:TTL (Time-To-Live)やMMAP (memory mapping)などのコレクション・プロパティ。デフォルトはNone。以下を含むことができる：<ul>
<li>"collection.ttl.seconds"（int）：このプロパティが設定されると、現在のコレクション内のデータは指定された時間で期限切れになる。コレクション内の期限切れデータはクリーンアップされ、検索やクエリに関与しない。</li>
<li>"mmap.enabled" (bool)：コレクション・レベルでメモリ・マップド・ストレージを有効にするかどうか。</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>:使用するインデックス管理ストラテジを指定します。デフォルトは "create_if_not_exists"。</li>
<li><code translate="no">batch_size (int)</code>:Milvusへのデータ挿入時に1バッチで処理する文書数を設定します。デフォルトはDEFAULT_BATCH_SIZEです。</li>
<li><code translate="no">consistency_level (str, optional)</code>:新しく作成されたコレクションにどの一貫性レベルを使用するか。デフォルトは "Session "です。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusVectorStore</code> のパラメータについて：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法である。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバの uri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">uri</code> として使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">データをクエリする</h3><p>ドキュメントがインデックスに格納されたので、インデックスに対して質問をすることができます。インデックスはそれ自体に格納されたデータをchatgptの知識ベースとして使用する。</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>次のテストでは、上書きによって前のデータが削除されることを示しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>次のテストは、既に存在するインデックスにデータを追加することを示しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">メタデータのフィルタリング<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のソースをフィルタリングして結果を生成することができます。次の例では、ディレクトリからすべての文書をロードし、その後メタデータに基づいてそれらをフィルタリングしています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">uber_2021.pdf</code> というファイルから文書だけを取り出したいとします。</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>今度はファイル<code translate="no">paul_graham_essay.txt</code> から取得すると、異なる結果が得られます。</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
