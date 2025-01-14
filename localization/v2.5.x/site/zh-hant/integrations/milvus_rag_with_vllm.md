---
id: milvus_rag_with_vllm.md
summary: >-
  這篇部落格將會告訴您如何使用 Milvus、vLLM 和 Llama 3.1 建立並執行一個 RAG。更具體來說，我會告訴您如何在 Milvus
  中將文字資訊嵌入並儲存為向量嵌入，並將此向量儲存作為知識庫，以有效率地擷取與使用者問題相關的文字區塊。
title: 使用 Milvus、vLLM 和 Llama 3.1 建立 RAG
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">使用 Milvus、vLLM 和 Llama 3.1 建立 RAG<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>加州大學柏克萊分校於 2024 年 7 月捐贈<a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a> 給<a href="https://lfaidata.foundation/">LF AI &amp; Data Foundation</a>作為孵化階段專案。身為其他成員專案，我們歡迎 vLLM 加入 LF AI &amp; Data 大家庭！🎉</p>
<p>大型語言模型<a href="https://zilliz.com/glossary/large-language-models-(llms)">(LLM</a>) 與<a href="https://zilliz.com/learn/what-is-vector-database">向量資料庫</a>通常會搭配來建構 Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>)，這是一種常用的 AI 應用架構，可以解決<a href="https://zilliz.com/glossary/ai-hallucination">AI 幻覺的</a>問題。這篇部落格將會告訴您如何使用 Milvus、vLLM 和 Llama 3.1 來建立並執行 RAG。更具體來說，我會告訴您如何在 Milvus 中將文字資訊嵌入並儲存為<a href="https://zilliz.com/glossary/vector-embeddings">向量嵌入</a>，並使用此向量儲存作為知識庫，以有效率地擷取與使用者問題相關的文字塊。最後，我們會利用 vLLM 為 Meta 的 Llama 3.1-8B 模型提供服務，以產生由擷取的文字所增強的答案。讓我們深入瞭解！</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Milvus、vLLM 和 Meta's Llama 3.1 簡介<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Milvus 向量資料庫</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a>是一個開放原始碼、<a href="https://zilliz.com/blog/what-is-a-real-vector-database">專門為</a> <a href="https://zilliz.com/learn/generative-ai">生成式人工智能</a>(GenAI) 工作負載而設計的分散式向量資料庫，用於儲存、索引和搜尋向量。它能夠執行<a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">混合搜尋、</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">元資料過濾</a>、重新排列，並有效率地處理數以萬億計的向量，讓 Milvus 成為 AI 與機器學習工作負載的首選。<a href="https://github.com/milvus-io/">Milvus</a>可在本機、集群上執行，或託管於全面管理的<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a>是 UC Berkeley SkyLab 開發的開放原始碼專案，專注於優化 LLM 服務效能。它使用 PagedAttention、連續批次和最佳化的 CUDA 核心進行有效的記憶體管理。與傳統方法相比，vLLM 可將服務效能提升 24 倍，同時將 GPU 記憶體使用量減少一半。</p>
<p>根據「<a href="https://arxiv.org/abs/2309.06180">Efficient Memory Management for Large Language Model Serving with PagedAttention</a>」這篇論文，KV 快取記憶體使用了約 30% 的 GPU 記憶體，導致潛在的記憶體問題。KV 快取儲存在連續的記憶體中，但改變大小會造成記憶體碎片，對於計算而言效率不高。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>圖 1.現有系統中的 KV 快取記憶體管理 (2023 分頁注意事項<a href="https://arxiv.org/pdf/2309.06180">論文</a>)</em></p>
<p>透過為 KV 快取記憶體使用虛擬記憶體，vLLM 只會在需要時分配實體 GPU 記憶體，消除記憶體碎片並避免預先分配。在測試中，vLLM 的表現優於<a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a>(HF) 和<a href="https://github.com/huggingface/text-generation-inference">Text Generation Inference</a>(TGI)，在 NVIDIA A10G 和 A100 GPU 上，vLLM 的吞吐量比 HF 高出 24 倍，比 TGI 高出 3.5 倍。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>圖 2.vLLM 的吞吐量比 HF 高出 8.5 倍至 15 倍，比 TGI 高出 3.3 倍至 3.5 倍 (2023<a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM 博客</a>)。</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Meta's Llama 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Meta's Llama 3.1</strong></a>於 2024 年 7 月 23 日發表。405B 模型在多個公開基準上提供最先進的效能，並擁有 128,000 個輸入代幣的上下文視窗，允許各種商業用途。除了 4050 億參數模型之外，Meta 還發布了 Llama3 70B (700 億參數) 和 8B (80 億參數) 的更新版本。模型權重可<a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">在 Meta 網站上</a>下載。</p>
<p>一個重要的啟示是，微調產生的資料可以提升效能，但品質不佳的範例則會降低效能。Llama 團隊使用模型本身、輔助模型和其他工具，廣泛地識別和移除這些不良範例。</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">使用 Milvus 建立並執行 RAG-Retrieval<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">準備您的資料集。</h3><p>我使用官方的<a href="https://milvus.io/docs/">Milvus 文件</a>作為本範例的資料集，我下載並儲存在本機。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> DirectoryLoader
<span class="hljs-comment"># Load HTML files already saved in a local directory</span>
path = <span class="hljs-string">&quot;../../RAG/rtdocs_new/&quot;</span>
global_pattern = <span class="hljs-string">&#x27;*.html&#x27;</span>
loader = DirectoryLoader(path=path, glob=global_pattern)
docs = loader.load()


<span class="hljs-comment"># Print num documents and a preview.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;loaded <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>].page_content)
pprint.pprint(docs[<span class="hljs-number">0</span>].metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">loaded <span class="hljs-number">22</span> documents
<span class="hljs-title class_">Why</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-title class_">Docs</span> <span class="hljs-title class_">Tutorials</span> <span class="hljs-title class_">Tools</span> <span class="hljs-title class_">Blog</span> <span class="hljs-title class_">Community</span> <span class="hljs-title class_">Stars0</span> <span class="hljs-title class_">Try</span> <span class="hljs-title class_">Managed</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-variable constant_">FREE</span> <span class="hljs-title class_">Search</span> <span class="hljs-title class_">Home</span> v2<span class="hljs-number">.4</span>.<span class="hljs-property">x</span> <span class="hljs-title class_">About</span> ...
{<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/quickstart.md&#x27;</span>}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-an-embedding-model" class="common-anchor-header">下載嵌入模型。</h3><p>接下來，從 HuggingFace 下載免費的開放原始碼<a href="https://zilliz.com/ai-models">嵌入模型</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer


<span class="hljs-comment"># Initialize torch settings for device-agnostic code.</span>
N_GPU = torch.cuda.device_count()
DEVICE = torch.device(<span class="hljs-string">&#x27;cuda:N_GPU&#x27;</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;cpu&#x27;</span>)


<span class="hljs-comment"># Download the model from huggingface model hub.</span>
model_name = <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>
encoder = SentenceTransformer(model_name, device=DEVICE)


<span class="hljs-comment"># Get the model parameters and save for later.</span>
EMBEDDING_DIM = encoder.get_sentence_embedding_dimension()
MAX_SEQ_LENGTH_IN_TOKENS = encoder.get_max_seq_length()


<span class="hljs-comment"># Inspect model parameters.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;model_name: <span class="hljs-subst">{model_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;EMBEDDING_DIM: <span class="hljs-subst">{EMBEDDING_DIM}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;MAX_SEQ_LENGTH: <span class="hljs-subst">{MAX_SEQ_LENGTH}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">model_name: BAAI/bge-large-en-v1.5
EMBEDDING_DIM: 1024
MAX_SEQ_LENGTH: 512
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">將您自訂的資料分塊並編碼為向量。</h3><p>我會使用固定長度的 512 個字元，並有 10% 的重疊。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter


CHUNK_SIZE = <span class="hljs-number">512</span>
chunk_overlap = np.<span class="hljs-built_in">round</span>(CHUNK_SIZE * <span class="hljs-number">0.10</span>, <span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;chunk_size: <span class="hljs-subst">{CHUNK_SIZE}</span>, chunk_overlap: <span class="hljs-subst">{chunk_overlap}</span>&quot;</span>)


<span class="hljs-comment"># Define the splitter.</span>
child_splitter = RecursiveCharacterTextSplitter(
   chunk_size=CHUNK_SIZE,
   chunk_overlap=chunk_overlap)


<span class="hljs-comment"># Chunk the docs.</span>
chunks = child_splitter.split_documents(docs)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> docs split into <span class="hljs-subst">{<span class="hljs-built_in">len</span>(chunks)}</span> child documents.&quot;</span>)


<span class="hljs-comment"># Encoder input is doc.page_content as strings.</span>
list_of_strings = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> chunks <span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(doc, <span class="hljs-string">&#x27;page_content&#x27;</span>)]


<span class="hljs-comment"># Embedding inference using HuggingFace encoder.</span>
embeddings = torch.tensor(encoder.encode(list_of_strings))


<span class="hljs-comment"># Normalize the embeddings.</span>
embeddings = np.array(embeddings / np.linalg.norm(embeddings))


<span class="hljs-comment"># Milvus expects a list of `numpy.ndarray` of `numpy.float32` numbers.</span>
converted_values = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, embeddings))


<span class="hljs-comment"># Create dict_list for Milvus insertion.</span>
dict_list = []
<span class="hljs-keyword">for</span> chunk, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(chunks, converted_values):
   <span class="hljs-comment"># Assemble embedding vector, original text chunk, metadata.</span>
   chunk_dict = {
       <span class="hljs-string">&#x27;chunk&#x27;</span>: chunk.page_content,
       <span class="hljs-string">&#x27;source&#x27;</span>: chunk.metadata.get(<span class="hljs-string">&#x27;source&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>),
       <span class="hljs-string">&#x27;vector&#x27;</span>: vector,
   }
   dict_list.append(chunk_dict)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">chunk_size: 512, chunk_overlap: 51.0
22 docs <span class="hljs-built_in">split</span> into 355 child documents.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">在 Milvus 中儲存向量。</h3><p>將編碼好的向量嵌入到 Milvus 向量資料庫中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect a client to the Milvus Lite server.</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
mc = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)


<span class="hljs-comment"># Create a collection with flexible schema and AUTOINDEX.</span>
COLLECTION_NAME = <span class="hljs-string">&quot;MilvusDocs&quot;</span>
mc.create_collection(COLLECTION_NAME,
       EMBEDDING_DIM,
       consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,
       auto_id=<span class="hljs-literal">True</span>, 
       overwrite=<span class="hljs-literal">True</span>)


<span class="hljs-comment"># Insert data into the Milvus collection.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Start inserting entities&quot;</span>)
start_time = time.time()
mc.insert(
   COLLECTION_NAME,
   data=dict_list,
   progress_bar=<span class="hljs-literal">True</span>)


end_time = time.time()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Milvus insert time for <span class="hljs-subst">{<span class="hljs-built_in">len</span>(dict_list)}</span> vectors: &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">round</span>(end_time - start_time, <span class="hljs-number">2</span>)}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Start inserting entities
Milvus insert time for 355 vectors: 0.2 seconds
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-a-vector-search" class="common-anchor-header">執行向量搜尋。</h3><p>提出問題，並從 Milvus 的知識庫中搜尋最近鄰的資料塊。</p>
<pre><code translate="no" class="language-python">SAMPLE_QUESTION = <span class="hljs-string">&quot;What do the parameters for HNSW mean?&quot;</span>


<span class="hljs-comment"># Embed the question using the same encoder.</span>
query_embeddings = torch.tensor(encoder.encode(SAMPLE_QUESTION))
<span class="hljs-comment"># Normalize embeddings to unit length.</span>
query_embeddings = F.normalize(query_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
<span class="hljs-comment"># Convert the embeddings to list of list of np.float32.</span>
query_embeddings = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, query_embeddings))


<span class="hljs-comment"># Define metadata fields you can filter on.</span>
OUTPUT_FIELDS = <span class="hljs-built_in">list</span>(dict_list[<span class="hljs-number">0</span>].keys())
OUTPUT_FIELDS.remove(<span class="hljs-string">&#x27;vector&#x27;</span>)


<span class="hljs-comment"># Define how many top-k results you want to retrieve.</span>
TOP_K = <span class="hljs-number">2</span>


<span class="hljs-comment"># Run semantic vector search using your query and the vector database.</span>
results = mc.search(
    COLLECTION_NAME,
    data=query_embeddings,
    output_fields=OUTPUT_FIELDS,
    limit=TOP_K,
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>檢索結果如下所示。</p>
<pre><code translate="no" class="language-text">Retrieved result <span class="hljs-comment">#1</span>
distance = 0.7001987099647522
(<span class="hljs-string">&#x27;Chunk text: layer, finds the node closest to the target in this layer, and&#x27;</span>
...
<span class="hljs-string">&#x27;outgoing&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md

Retrieved result <span class="hljs-comment">#2</span>
distance = 0.6953287124633789
(<span class="hljs-string">&#x27;Chunk text: this value can improve recall rate at the cost of increased&#x27;</span>
...
<span class="hljs-string">&#x27;to the target&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">使用 vLLM 和 Llama 3.1-8B 建立並執行 RAG-Generation<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">從 HuggingFace 安裝 vLLM 和模型</h3><p>vLLM 預設會從 HuggingFace 下載大型語言模型。一般而言，無論何時您想要在 HuggingFace 上使用全新的模型，都應該執行 pip install --upgrade 或 -U。此外，您需要 GPU 才能使用 vLLM 執行 Meta's Llama 3.1 模型的推論。</p>
<p>如需所有 vLLM 支援模型的完整清單，請參閱此<a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">文件頁面</a>。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># (Recommended) Create a new conda environment.</span>
conda create -n myenv python=<span class="hljs-number">3.11</span> -y
conda activate myenv


<span class="hljs-comment"># Install vLLM with CUDA 12.1.</span>
pip install -U vllm transformers torch


<span class="hljs-keyword">import</span> vllm, torch
<span class="hljs-keyword">from</span> vllm <span class="hljs-keyword">import</span> LLM, SamplingParams


<span class="hljs-comment"># Clear the GPU memory cache.</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># Check the GPU.</span>
!nvidia-smi
<button class="copy-code-btn"></button></code></pre>
<p>若要進一步瞭解如何安裝 vLLM，請參閱<a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">其安裝頁</a>面。</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">取得 HuggingFace 令牌。</h3><p>HuggingFace 上的某些模型，例如 Meta Llama 3.1，要求使用者在能夠下載權重之前接受其授權。因此，您必須建立 HuggingFace 帳戶，接受模型的授權，並產生一個代用幣。</p>
<p>造訪 HuggingFace 上這個<a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">Llama3.1 頁面時</a>，您會收到要求您同意條款的訊息。在下載模型權重之前，按一下「<strong>接受授權</strong>」以接受 Meta 條款。批准通常需要不到一天的時間。</p>
<p><strong>收到批准後，您必須產生一個新的 HuggingFace 令牌。您的舊權限將無法使用新的權限。</strong></p>
<p>在安裝 vLLM 之前，請使用新的 token 登入 HuggingFace。以下，我使用 Colab secrets 來儲存代用幣。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Login to HuggingFace using your new token.</span>
<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> login
<span class="hljs-keyword">from</span> google.colab <span class="hljs-keyword">import</span> userdata
hf_token = userdata.get(<span class="hljs-string">&#x27;HF_TOKEN&#x27;</span>)
login(token = hf_token, add_to_git_credential=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">執行 RAG-Generation</h3><p>在示範中，我們執行<code translate="no">Llama-3.1-8B</code> 模型，這需要 GPU 和相當大的記憶體才能啟動。以下範例是在 Google Colab Pro ($10/month) 搭配 A100 GPU 上執行。若要進一步瞭解如何執行 vLLM，您可以查看<a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">Quickstart 文件</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Choose a model</span>
MODELTORUN = <span class="hljs-string">&quot;meta-llama/Meta-Llama-3.1-8B-Instruct&quot;</span>


<span class="hljs-comment"># 2. Clear the GPU memory cache, you&#x27;re going to need it all!</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># 3. Instantiate a vLLM model instance.</span>
llm = LLM(model=MODELTORUN,
         enforce_eager=<span class="hljs-literal">True</span>,
         dtype=torch.bfloat16,
         gpu_memory_utilization=<span class="hljs-number">0.5</span>,
         max_model_len=<span class="hljs-number">1000</span>,
         seed=<span class="hljs-number">415</span>,
         max_num_batched_tokens=<span class="hljs-number">3000</span>)
<button class="copy-code-btn"></button></code></pre>
<p>使用從 Milvus 擷取的上下文和來源撰寫提示。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Separate all the context together by space.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(contexts)
<span class="hljs-comment"># Lance Martin, LangChain, says put the best contexts at the end.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(contexts))


<span class="hljs-comment"># Separate all the unique sources together by comma.</span>
source_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">dict</span>.fromkeys(sources))))


SYSTEM_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;First, check if the provided Context is relevant to
the user&#x27;s question.  Second, only if the provided Context is strongly relevant, answer the question using the Context.  Otherwise, if the Context is not strongly relevant, answer the question without using the Context. 
Be clear, concise, relevant.  Answer clearly, in fewer than 2 sentences.
Grounding sources: <span class="hljs-subst">{source_combined}</span>
Context: <span class="hljs-subst">{contexts_combined}</span>
User&#x27;s question: <span class="hljs-subst">{SAMPLE_QUESTION}</span>
&quot;&quot;&quot;</span>


prompts = [SYSTEM_PROMPT]
<button class="copy-code-btn"></button></code></pre>
<p>現在，使用擷取的片段和塞入提示的原始問題產生一個答案。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sampling parameters</span>
sampling_params = SamplingParams(temperature=<span class="hljs-number">0.2</span>, top_p=<span class="hljs-number">0.95</span>)


<span class="hljs-comment"># Invoke the vLLM model.</span>
outputs = llm.generate(prompts, sampling_params)


<span class="hljs-comment"># Print the outputs.</span>
<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs:
   prompt = output.prompt
   generated_text = output.outputs[<span class="hljs-number">0</span>].text
   <span class="hljs-comment"># !r calls repr(), which prints a string inside quotes.</span>
   <span class="hljs-built_in">print</span>()
   <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{SAMPLE_QUESTION!r}</span>&quot;</span>)
   pprint.pprint(<span class="hljs-string">f&quot;Generated text: <span class="hljs-subst">{generated_text!r}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Question</span>: <span class="hljs-string">&#x27;What do the parameters for HNSW MEAN!?&#x27;</span>
<span class="hljs-title class_">Generated</span> <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Answer: The parameters for HNSW (Hiera(rchical Navigable Small World Graph) are: &#x27;</span>
<span class="hljs-string">&#x27;* M: The maximum degree of nodes on each layer oof the graph, which can improve &#x27;</span>
<span class="hljs-string">&#x27;recall rate at the cost of increased search time. * efConstruction and ef: &#x27;</span> 
<span class="hljs-string">&#x27;These parameters specify a search range when building or searching an index.&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>我覺得上面的答案看起來很完美！</p>
<p>如果您對這個示範有興趣，歡迎親自試用，並讓我們知道您的想法。我們也歡迎您加入<a href="https://discord.com/invite/8uyFbECzPX">Discord 上的 Milvus 社群</a>，直接與所有 GenAI 開發人員交談。</p>
<h2 id="References" class="common-anchor-header">參考資料<button data-href="#References" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>vLLM<a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">官方文件</a>與<a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">模型頁面</a>。</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">2023 vLLM 有關分頁注意力的論文</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">2023 vLLM</a>在 Ray 峰會上的<a href="https://www.youtube.com/watch?v=80bIUggRJf4">簡報</a></p></li>
<li><p>vLLM 部落格：<a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM：使用 PagedAttention 提供簡單、快速且便宜的 LLM 服務</a></p></li>
<li><p>有關執行 vLLM 伺服器的有用部落格：<a href="https://ploomber.io/blog/vllm-deploy/">部署 vLLM：逐步指南</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">Llama 3 模型群 | 研究 - AI at Meta</a></p></li>
</ul>
