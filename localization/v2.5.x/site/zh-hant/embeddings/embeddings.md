---
id: embeddings.md
order: 1
summary: 瞭解如何為您的資料產生 embeddings。
title: 嵌入概述
---
<h1 id="Embedding-Overview" class="common-anchor-header">嵌入概述<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>嵌入（Embedding）是一種機器學習概念，用於將資料映射到高維空間，將語義相似的資料放在一起。嵌入模型通常是來自 BERT 或其他 Transformer 系列的深度神經網路，可以有效地以一系列稱為向量的數字來表示文字、影像和其他資料類型的語意。這些模型的一個主要特點是，向量之間在高維空間中的數學距離可以表示原始文字或影像語義的相似性。這個特性釋放了許多資訊檢索的應用，例如 Google 和 Bing 等網路搜尋引擎、電子商務網站上的產品搜尋和推薦，以及最近在生成式人工智慧 (Generative AI) 中流行的檢索擴增生成 (Retrieval Augmented Generation, RAG) 模式。</p>
<p>嵌入有兩大類，各自產生不同類型的向量：</p>
<ul>
<li><p><strong>密集嵌入</strong>：大多數的嵌入模型將資訊表示為數百到數千維的浮點向量。由於大部分的維度都有非零值，因此輸出的向量稱為「密集」向量。舉例來說，流行的開放原始碼嵌入模型 BAAI/bge-base-en-v1.5 會輸出 768 個浮點數的向量 (768 維浮點向量)。</p></li>
<li><p><strong>稀疏嵌入</strong>：相比之下，稀疏嵌入的輸出向量大多數維度為零，即「稀疏」向量。這些向量通常有更高的維度（數萬或更多），這是由標記詞彙的大小決定的。稀疏向量可以由深度神經網路或文字庫的統計分析產生。由於稀疏嵌入向量具有可解釋性及更好的域外泛化能力，因此越來越多的開發人員採用稀疏嵌入向量作為密集嵌入向量的補充。</p></li>
</ul>
<p>Milvus 是專為向量資料管理、儲存和檢索而設計的向量資料庫。透過整合主流的<a href="https://milvus.io/docs/rerankers-overview.md">embeddings</a>和<a href="https://milvus.io/docs/rerankers-overview.md">reranking</a>模型，您可以輕鬆地將原始文字轉換為可搜尋的向量，或使用強大的模型對結果進行 rerank，以達到更精確的 RAG 結果。這種整合簡化了文字轉換，不需要額外的 embedding 或 reranking 元件，進而簡化 RAG 的開發與驗證。</p>
<p>要以實作方式建立嵌入，請參閱<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">使用 PyMilvus 的模型來產生文字嵌入</a>。</p>
<table>
<thead>
<tr><th>嵌入函數</th><th>類型</th><th>API 或開放源碼</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">開放</a></td><td>密集</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">句子轉換器</a></td><td>密集</td><td>開放源碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">開放源碼</a></td><td>稀疏</td><td>開放源碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>混合</td><td>開放原始碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">稠密</a></td><td>密集型</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">叢書</a></td><td>密集</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">凝聚</a></td><td>密集</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">導師</a></td><td>密集</td><td>開放源碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>密集</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">諾米</a></td><td>密集型</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>混合型</td><td>開放源碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">Model2Vec</a></td><td>混合型</td><td>開放源碼</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">雙子星</a></td><td>混合型</td><td>隱私</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">範例 1：使用預設的 embedding 函式產生密集向量<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用嵌入函數，首先要安裝 PyMilvus 用戶端函式庫，並安裝<code translate="no">model</code> 子套件，該套件包裝了所有用於嵌入生成的實用程式。</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">model</code> 子套件支援各種嵌入模型，從<a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>、<a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>、<a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> 到<a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>預先訓練的模型。為了簡單起見，本範例使用<code translate="no">DefaultEmbeddingFunction</code> ，這是<strong>全-MiniLM-L6-v2 的</strong>句子轉換器模型，模型約 70MB，第一次使用時會下載：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出與以下相似：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">範例 2：使用 BGE M3 模型一次呼叫產生密集與稀疏向量<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>在這個範例中，我們使用<a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>混合模型將文字嵌入到密集向量和稀疏向量中，並使用它們來擷取相關文件。整體步驟如下：</p>
<ol>
<li><p>使用 BGE-M3 模型將文字嵌入為密集向量和稀疏向量；</p></li>
<li><p>建立一個 Milvus 集合來儲存密集向量和稀疏向量；</p></li>
<li><p>將資料插入 Milvus；</p></li>
<li><p>搜尋並檢查結果。</p></li>
</ol>
<p>首先，我們需要安裝必要的相依性。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>使用 BGE M3 對文件和查詢進行編碼，以便嵌入檢索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
