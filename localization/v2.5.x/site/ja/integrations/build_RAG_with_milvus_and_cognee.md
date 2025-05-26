---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  このチュートリアルでは、MilvusとCogneeを使ってRAG（Retrieval-Augmented
  Generation）パイプラインを構築する方法を紹介します。
title: MilvusとCogneeでRAGを構築する
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">MilvusとCogneeでRAGを構築する</h3><p><a href="https://www.cognee.ai">Cogneeは</a>、スケーラブルでモジュール化されたECL（Extract、Cognify、Load）パイプラインによりAIアプリケーション開発を合理化する開発者ファーストのプラットフォームです。CogneeはMilvusとシームレスに統合することで、会話、ドキュメント、トランスクリプションの効率的な接続と検索を可能にし、幻覚を減らし、運用コストを最適化します。</p>
<p>Milvusのようなベクトルストア、グラフデータベース、LLMを強力にサポートするCogneeは、検索支援世代（RAG）システムを構築するための柔軟でカスタマイズ可能なフレームワークを提供します。そのプロダクション・レディなアーキテクチャは、AIを活用したアプリケーションの精度と効率の向上を保証します。</p>
<p>このチュートリアルでは、MilvusとCogneeを使ってRAG（Retrieval-Augmented Generation）パイプラインを構築する方法を紹介します。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</blockquote>
<p>この例では、デフォルトでOpenAIをLLMとして使用しています。<a href="https://platform.openai.com/docs/quickstart">apiキーを</a>用意し、config<code translate="no">set_llm_api_key()</code> 。</p>
<p>Milvusをベクターデータベースとして設定するには、<code translate="no">VECTOR_DB_PROVIDER</code> を<code translate="no">milvus</code> に設定し、<code translate="no">VECTOR_DB_URL</code> と<code translate="no">VECTOR_DB_KEY</code> を指定します。このデモではMilvus Liteを使ってデータを保存しているので、<code translate="no">VECTOR_DB_URL</code> のみを指定すればよい。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>環境変数としては<code translate="no">VECTOR_DB_URL</code> と<code translate="no">VECTOR_DB_KEY</code> を指定する：</p>
<ul>
<li><code translate="no">VECTOR_DB_URL</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法である。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバの uri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">VECTOR_DB_URL</code> として使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">VECTOR_DB_URL</code> と<code translate="no">VECTOR_DB_KEY</code> を調整してください。</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">データの準備</h3><p><a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvusドキュメント2.4.xの</a>FAQページをRAGのプライベートナレッジとして使用する。</p>
<p>zipファイルをダウンロードし、<code translate="no">milvus_docs</code> フォルダにドキュメントを展開する。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>フォルダ<code translate="no">milvus_docs/en/faq</code> からすべてのマークダウン・ファイルをロードする。各ドキュメントについて、単に "# "を使ってファイル内のコンテンツを区切るだけで、マークダウン・ファイルの各主要部分のコンテンツを大まかに区切ることができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAGの構築<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Cogneeデータのリセット</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>データセットを追加し、ナレッジグラフに加工することができる。</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">データの追加とコグニファイ</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add</code> メソッドはデータセット（Milvus FAQs）をCogneeにロードし、<code translate="no">cognify</code> メソッドはデータを処理してエンティティ、リレーションシップ、サマリーを抽出し、ナレッジグラフを構築します。</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">要約のクエリ</h3><p>データが処理されたので、ナレッジグラフをクエリしてみましょう。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>このクエリは、クエリテキストに関連する要約をナレッジグラフから検索し、最も関連する候補を表示します。</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">チャンクのクエリ</h3><p>要約はハイレベルな洞察を提供しますが、より詳細な詳細については、処理されたデータセットから直接データの特定のチャンクをクエリできます。これらのチャンクは、ナレッジグラフ作成時に追加・分析された元のデータから派生したものです。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>読みやすいように整形して表示しましょう！</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>これまでのステップでは、MilvusのFAQデータセットに対して、要約と特定のデータチャンクの両方を照会しました。これは詳細な洞察と粒度の細かい情報を提供しましたが、データセットが大きかったため、ナレッジグラフ内の依存関係を明確に視覚化することが困難でした。</p>
<p>この問題に対処するため、Cognee環境をリセットし、より小さく、より焦点を絞ったデータセットで作業する。これにより、コグニファイプロセス中に抽出された関係や依存関係をより明確に示すことができるようになります。データを単純化することで、Cogneeがどのようにナレッジグラフ内の情報を整理し、構造化するかを明確に見ることができます。</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Cogneeのリセット</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">フォーカスされたデータセットの追加</h3><p>ここでは、1行のテキストのみの小さなデータセットが追加され、ナレッジグラフがフォーカスされ解釈しやすくなるように処理されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">インサイトのクエリ</h3><p>この小さなデータセットに焦点を当てることで、ナレッジグラフ内の関係と構造を明確に分析できるようになりました。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-built_in">print</span>(result_text)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># ({&#x27;id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;natural language processing&#x27;, &#x27;description&#x27;: &#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;}, {&#x27;relationship_name&#x27;: &#x27;is_a_subfield_of&#x27;, &#x27;source_node_id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;target_node_id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {&#x27;id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;computer science&#x27;, &#x27;description&#x27;: &#x27;The study of computation and information processing.&#x27;})</span>
<span class="hljs-comment"># (...)</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># It represents nodes and relationships in the knowledge graph:</span>
<span class="hljs-comment"># - The first element is the source node (e.g., &#x27;natural language processing&#x27;).</span>
<span class="hljs-comment"># - The second element is the relationship between nodes (e.g., &#x27;is_a_subfield_of&#x27;).</span>
<span class="hljs-comment"># - The third element is the target node (e.g., &#x27;computer science&#x27;).</span>
<button class="copy-code-btn"></button></code></pre>
<p>この出力はナレッジグラフのクエリの結果を表しており、処理されたデータセットから抽出されたエンティティ（ノード）とその関係（エッジ）を示しています。各タプルには、一意のID、説明、タイムスタンプなどのメタデータとともに、ソース・エンティティ、関係タイプ、ターゲット・エンティティが含まれます。グラフは、主要な概念とその意味的なつながりを強調し、データセットの構造的な理解を提供します。</p>
<p>Milvusを使ったcogneeの基本的な使い方はご理解いただけたと思います。より高度な使い方を知りたい方はcogneeの公式<a href="https://github.com/topoteretes/cognee">ページを</a>ご覧ください。</p>
