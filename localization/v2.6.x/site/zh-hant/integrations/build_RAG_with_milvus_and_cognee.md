---
id: build_RAG_with_milvus_and_cognee.md
summary: 在本教程中，我們將告訴您如何使用 Milvus 和 Cognee 建立 RAG（Retrieval-Augmented Generation）管道。
title: 使用 Milvus 和 Cognee 建立 RAG
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">使用 Milvus 和 Cognee 建立 RAG</h3><p><a href="https://www.cognee.ai">Cognee</a>是一個開發者至上的平台，可透過可擴充的模組化 ECL（Extract、Cognify、Load）管道簡化 AI 應用程式開發。透過與 Milvus 的無縫整合，Cognee 可實現對話、文件和轉錄的高效連接和檢索，從而減少幻覺並優化營運成本。</p>
<p>憑藉對 Milvus、圖形資料庫和 LLM 等向量儲存的強大支援，Cognee 為建立檢索增強生成 (RAG) 系統提供了靈活且可定制的框架。它的生產就緒架構可確保為人工智能驅動的應用程式提高準確性和效率。</p>
<p>在本教程中，我們將教您如何使用 Milvus 和 Cognee 建立 RAG（檢索-增強生成）管道。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面上方的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</blockquote>
<p>本範例預設使用 OpenAI 作為 LLM。您應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a>，並在 config<code translate="no">set_llm_api_key()</code> 函式中設定。</p>
<p>若要設定 Milvus 為向量資料庫，請將<code translate="no">VECTOR_DB_PROVIDER</code> 設定為<code translate="no">milvus</code> ，並指定<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> 。因為我們在這個 demo 中使用 Milvus Lite 來儲存資料，所以只需要提供<code translate="no">VECTOR_DB_URL</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至於環境變數<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> ：</p>
<ul>
<li>將<code translate="no">VECTOR_DB_URL</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">VECTOR_DB_URL</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">準備資料</h3><p>我們使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文件 2.4.x</a>中的 FAQ 頁面作為我們 RAG 中的私有知識，這是一個簡單 RAG 管道的良好資料來源。</p>
<p>下載 zip 檔案並解壓縮文件到資料夾<code translate="no">milvus_docs</code> 。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>我們從資料夾<code translate="no">milvus_docs/en/faq</code> 載入所有 markdown 檔案。對於每個文件，我們只需簡單地使用「#」來分隔文件中的內容，這樣就可以大致分隔出 markdown 文件中每個主要部分的內容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">建立 RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">重置 Cognee 資料</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>清零準備就緒後，我們現在就可以加入資料集，並將其處理成知識圖表。</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">新增資料與認知</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add</code> 方法會將資料集（Milvus FAQs）載入 Cognee，而<code translate="no">cognify</code> 方法則會處理資料，以抽取實體、關係和摘要，建構知識圖表。</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">查詢摘要</h3><p>現在資料已經處理完成，讓我們來查詢知識圖表。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>此查詢在知識圖表中搜尋與查詢文字相關的摘要，並列印出最相關的候選摘要。</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">查詢大塊</h3><p>摘要提供了高層次的洞察力，但若要瞭解更仔細的細節，我們可以直接從處理過的資料集中查詢特定的資料塊。這些資料塊來自於在建立知識圖表時新增和分析的原始資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>讓我們將它格式化並顯示出來，以獲得更好的可讀性！</p>
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
<p>在之前的步驟中，我們查詢了 Milvus FAQ 資料集的摘要和特定資料塊。雖然這提供了詳盡的洞察力和細粒度資訊，但資料集相當龐大，因此要清楚可視化知識圖表內的依賴關係是一大挑戰。</p>
<p>為了解決這個問題，我們將重設 Cognee 環境，並使用更小、更集中的資料集。這將使我們能夠更好地展示在 Cognify 過程中提取的關係和依賴關係。通過簡化資料，我們可以清楚地看到 Cognee 如何組織和結構知識圖表中的資訊。</p>
<h3 id="Reset-Cognee" class="common-anchor-header">重置 Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">新增焦點資料集</h3><p>在這裡，我們添加並處理了一個只有一行文字的較小數據集，以確保知識圖表聚焦且易於詮釋。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">查詢洞察力</h3><p>透過聚焦於這個較小的資料集，我們現在可以清楚地分析知識圖形中的關係和結構。</p>
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
<p>此輸出代表知識圖表查詢的結果，展示了從已處理資料集中萃取的實體 (節點) 及其關係 (邊)。每個元元組包括來源實體、關係類型和目標實體，以及獨特 ID、描述和時間戳等元資料。圖形會強調關鍵概念及其語義連結，提供對資料集的結構化理解。</p>
<p>恭喜您，您已經學會了使用 Milvus 的 cognee 的基本用法。如果您想了解更多關於 cognee 的進階用法，請參閱其官方<a href="https://github.com/topoteretes/cognee">頁面</a>。</p>
