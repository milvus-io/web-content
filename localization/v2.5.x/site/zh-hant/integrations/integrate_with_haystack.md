---
id: integrate_with_haystack.md
summary: 本指南示範如何使用 Haystack 和 Milvus 建立檢索增強世代 (RAG) 系統。
title: 使用 Milvus 和 Haystack 的檢索-擴充世代 (RAG)
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="common-anchor-header">使用 Milvus 和 Haystack 的檢索-擴充世代 (RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南展示了如何使用 Haystack 和 Milvus 建立一個檢索-增強生成 (RAG) 系統。</p>
<p>RAG 系統結合了檢索系統與生成模型，可根據給定的提示產生新的文字。該系統首先使用 Milvus 從語料庫中檢索相關文件，然後根據檢索到的文件使用生成模型生成新文本。</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a>是 deepset 開放源碼的 Python 框架，用於使用大型語言模型 (LLM) 建立自訂應用程式。<a href="https://milvus.io/">Milvus</a>是世界上最先進的開放原始碼向量資料庫，用於嵌入相似性搜尋和人工智能應用程式。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>執行本筆記本之前，請確定您已安裝下列相依性：</p>
<pre><code translate="no" class="language-python">! pip install --upgrade --quiet pymilvus milvus-haystack markdown-it-py mdit_plain
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面頂端的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>我們將使用 OpenAI 的模型。您應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作為環境變數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">準備資料<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>我們使用一個關於<a href="https://www.gutenberg.org/cache/epub/7785/pg7785.txt">達芬奇的</a>線上內容，作為我們 RAG 管道的私人知識儲存庫，對於簡單的 RAG 管道而言，這是一個很好的資料來源。</p>
<p>下載並儲存為本機文字檔。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> urllib.request

url = <span class="hljs-string">&quot;https://www.gutenberg.org/cache/epub/7785/pg7785.txt&quot;</span>
file_path = <span class="hljs-string">&quot;./davinci.txt&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-the-indexing-Pipeline" class="common-anchor-header">建立索引管道<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>建立一個索引管道，將文字轉換成文件、分割成句子並嵌入其中。然後將文件寫入 Milvus 文件儲存庫。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.converters <span class="hljs-keyword">import</span> MarkdownToDocument
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.preprocessors <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore
<span class="hljs-keyword">from</span> milvus_haystack.milvus_embedding_retriever <span class="hljs-keyword">import</span> MilvusEmbeddingRetriever


document_store = MilvusDocumentStore(
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>},
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: &quot;http://localhost:19530&quot;},</span>
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: YOUR_ZILLIZ_CLOUD_URI, &quot;token&quot;: Secret.from_env_var(&quot;ZILLIZ_CLOUD_API_KEY&quot;)},</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>對於 connection_args：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
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
<pre><code translate="no">Converting markdown files to Documents: 100%|█| 1/
Calculating embeddings: 100%|█| 9/9 [00:05&lt;00:00, 
E20240516 10:40:32.945937 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946677 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946704 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946725 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed


Number of documents: 277
</code></pre>
<h2 id="Create-the-retrieval-pipeline" class="common-anchor-header">建立檢索管道<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>建立檢索管道，使用向量相似性搜尋引擎從 Milvus 文件儲存庫檢索文件。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&#x27;Where is the painting &quot;Warrior&quot; currently stored?&#x27;</span>

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
retrieval_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;retriever&quot;</span>)

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question}})

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>]:
    <span class="hljs-built_in">print</span>(doc.content)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">10</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">). The
composition of this oil-painting seems to have been built up on the
second cartoon, which he had made some eight years earlier, and which
was apparently taken to France in 1516 and ultimately lost.
----------

This &quot;Baptism of Christ,&quot; which is now in the Accademia in Florence
and is in a bad state of preservation, appears to have been a
comparatively early work by Verrocchio, and to have been painted
in 1480-1482, when Leonardo would be about thirty years of age.

To about this period belongs the superb drawing of the &quot;Warrior,&quot; now
in the Malcolm Collection in the British Museum.
----------
&quot; Although he
completed the cartoon, the only part of the composition which he
eventually executed in colour was an incident in the foreground
which dealt with the &quot;Battle of the Standard.&quot; One of the many
supposed copies of a study of this mural painting now hangs on the
south-east staircase in the Victoria and Albert Museum.
----------
</code></pre>
<h2 id="Create-the-RAG-pipeline" class="common-anchor-header">建立 RAG 管道<button data-href="#Create-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>建立 RAG 管道，結合 MilvusEmbeddingRetriever 與 OpenAIGenerator，使用擷取的文件回答問題。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> PromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators <span class="hljs-keyword">import</span> OpenAIGenerator

prompt_template = <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
                     not include an answer, reply with &#x27;I don&#x27;t know&#x27;.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer:
                  &quot;&quot;&quot;</span>

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
rag_pipeline.add_component(<span class="hljs-string">&quot;prompt_builder&quot;</span>, PromptBuilder(template=prompt_template))
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIGenerator(
        api_key=Secret.from_token(os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)),
        generation_kwargs={<span class="hljs-string">&quot;temperature&quot;</span>: <span class="hljs-number">0</span>},
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder&quot;</span>, <span class="hljs-string">&quot;generator&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: The painting &quot;Warrior&quot; is currently stored in the Malcolm Collection in the British Museum.
</code></pre>
<p>有關如何使用 milvus-haystack 的詳細資訊，請參閱<a href="https://github.com/milvus-io/milvus-haystack">milvus-haystack Readme</a>。</p>
