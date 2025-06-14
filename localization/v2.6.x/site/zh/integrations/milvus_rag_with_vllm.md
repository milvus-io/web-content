---
id: milvus_rag_with_vllm.md
summary: >-
  本博客将向您展示如何使用 Milvus、vLLM 和 Llama 3.1 构建并运行 RAG。更具体地说，我将向你展示如何在 Milvus
  中将文本信息嵌入并存储为向量嵌入，并将此向量存储作为知识库来高效检索与用户问题相关的文本块。
title: 用 Milvus、vLLM 和 Llama 3.1 构建 RAG
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">用 Milvus、vLLM 和 Llama 3.1 构建 RAG<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>加州大学伯克利分校于 2024 年 7 月向<a href="https://lfaidata.foundation/">LF AI &amp; Data 基金会</a>捐赠了用于 LLM 推理和服务的快速易用库<a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a>，将其作为一个处于孵化阶段的项目。作为同类成员项目，我们欢迎 vLLM 加入 LF AI &amp; Data 大家庭！🎉</p>
<p>大型语言模型<a href="https://zilliz.com/glossary/large-language-models-(llms)">（LLMs</a>）和<a href="https://zilliz.com/learn/what-is-vector-database">向量数据库</a>通常搭配构建检索增强生成<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">（RAG</a>），这是一种流行的人工智能应用架构，用于解决<a href="https://zilliz.com/glossary/ai-hallucination">人工智能幻觉问题</a>。本篇博客将向您展示如何使用 Milvus、vLLM 和 Llama 3.1 构建并运行 RAG。更具体地说，我将向你展示如何在 Milvus 中将文本信息<a href="https://zilliz.com/glossary/vector-embeddings">嵌入</a>并存储为<a href="https://zilliz.com/glossary/vector-embeddings">向量 embeddings</a>，并将此向量存储作为知识库来高效检索与用户问题相关的文本块。最后，我们将利用 vLLM 为 Meta 的 Llama 3.1-8B 模型提供服务，生成由检索到的文本增强的答案。让我们深入了解一下！</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Milvus、vLLM 和 Meta's Llama 3.1 简介<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Milvus 向量数据库</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a>是一个开源、<a href="https://zilliz.com/blog/what-is-a-real-vector-database">专门构建的</a>分布式向量数据库，用于为<a href="https://zilliz.com/learn/generative-ai">生成式人工智能</a>（GenAI）工作负载存储、索引和搜索向量。它能够执行<a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">混合搜索、</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">元数据过滤</a>、重排序并高效处理数万亿向量，这使得 Milvus 成为人工智能和机器学习工作负载的首选。<a href="https://github.com/milvus-io/">Milvus</a>可在本地、集群上运行，也可托管在完全托管的<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 中。</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a>是加州大学伯克利分校 SkyLab 启动的一个开源项目，专注于优化 LLM 服务性能。它使用 PagedAttention、连续批处理和优化的 CUDA 内核进行高效内存管理。与传统方法相比，vLLM 将服务性能提高了 24 倍，同时将 GPU 内存使用量减少了一半。</p>
<p>根据论文<a href="https://arxiv.org/abs/2309.06180">"Efficient Memory Management for Large Language Model Serving with PagedAttention</a>"，KV 缓存使用了大约 30% 的 GPU 内存，导致潜在的内存问题。KV 缓存存储在连续的内存中，但改变大小会导致内存碎片，从而降低计算效率。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>图片 1.现有系统中的 KV 缓存内存管理（2023 年分页关注<a href="https://arxiv.org/pdf/2309.06180">论文）</a></em></p>
<p>通过为 KV 缓存使用虚拟内存，vLLM 只在需要时分配 GPU 物理内存，从而消除了内存碎片，避免了预分配。在测试中，vLLM 的表现优于<a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a>（HF）和<a href="https://github.com/huggingface/text-generation-inference">文本生成推理</a>（TGI），在英伟达 A10G 和 A100 GPU 上，vLLM 的吞吐量比 HF 高出 24 倍，比 TGI 高出 3.5 倍。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>图 2.vLLM 的吞吐量是 HF 的 8.5-15 倍，是 TGI 的 3.3-3.5 倍（2023<a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM 博客</a>）。</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Meta's Llama 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Meta's Llama 3.1</strong></a>于 2024 年 7 月 23 日发布。405B 模型在多个公共基准上提供了最先进的性能，其上下文窗口为 128,000 个输入代币，并允许各种商业用途。在发布 4050 亿参数模型的同时，Meta 还发布了 Llama3 70B（700 亿参数）和 8B（80 亿参数）的更新版本。模型权重可<a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">在 Meta 网站上</a>下载。</p>
<p>一个重要的启示是，对生成的数据进行微调可以提高性能，但劣质示例会降低性能。Llama 团队开展了大量工作，利用模型本身、辅助模型和其他工具识别并移除这些不良示例。</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">使用 Milvus 构建并执行 RAG-Retrieval<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">准备数据集。</h3><p>我使用<a href="https://milvus.io/docs/">Milvus</a>官方<a href="https://milvus.io/docs/">文档</a>作为本演示的数据集，并将其下载保存到本地。</p>
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
<pre><code translate="no" class="language-text">loaded 22 documents
Why Milvus Docs Tutorials Tools Blog Community Stars0 Try Managed Milvus FREE Search Home v2.4.x About ...
{&#x27;source&#x27;: &#x27;https://milvus.io/docs/quickstart.md&#x27;}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-an-embedding-model" class="common-anchor-header">下载一个 Embeddings 模型。</h3><p>接下来，从 HuggingFace 下载一个免费的开源<a href="https://zilliz.com/ai-models">嵌入模型</a>。</p>
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
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">将自定义数据分块并编码为向量。</h3><p>我将使用固定长度的 512 个字符，重叠率为 10%。</p>
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
22 docs split into 355 child documents.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">在 Milvus 中保存向量。</h3><p>将编码后的向量 Embeddings 纳入 Milvus 向量数据库。</p>
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
<h3 id="Perform-a-vector-search" class="common-anchor-header">执行向量搜索。</h3><p>提出一个问题，然后在 Milvus 中搜索知识库中的最近邻块。</p>
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
<p>检索结果如下所示。</p>
<pre><code translate="no" class="language-text">Retrieved result #1
distance = 0.7001987099647522
(&#x27;Chunk text: layer, finds the node closest to the target in this layer, and&#x27;
...
&#x27;outgoing&#x27;)
source: https://milvus.io/docs/index.md

Retrieved result #2
distance = 0.6953287124633789
(&#x27;Chunk text: this value can improve recall rate at the cost of increased&#x27;
...
&#x27;to the target&#x27;)
source: https://milvus.io/docs/index.md
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">使用 vLLM 和 Llama 3.1-8B 构建并执行 RAG 生成<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">从 HuggingFace 安装 vLLM 和模型</h3><p>vLLM 默认从 HuggingFace 下载大型语言模型。一般来说，无论何时想在 HuggingFace 上使用全新的模型，都应该进行 pip install --upgrade 或 -U。此外，您还需要 GPU 才能使用 vLLM 对 Meta 的 Llama 3.1 模型进行推理。</p>
<p>有关所有 vLLM 支持模型的完整列表，请参阅此<a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">文档页面</a>。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">(Recommended) Create a new conda environment.</span>
conda create -n myenv python=3.11 -y
conda activate myenv
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Install vLLM with CUDA 12.1.</span>
pip install -U vllm transformers torch


import vllm, torch
from vllm import LLM, SamplingParams
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Clear the GPU memory cache.</span>
torch.cuda.empty_cache()
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Check the GPU.</span>
!nvidia-smi
<button class="copy-code-btn"></button></code></pre>
<p>要了解有关如何安装 vLLM 的更多信息，请参阅其<a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">安装</a>页面。</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">获取 HuggingFace 令牌。</h3><p>HuggingFace 上的某些模型（如 Meta Llama 3.1）要求用户接受其许可证后才能下载权重。因此，您必须创建一个 HuggingFace 账户，接受模型的许可证，并生成一个令牌。</p>
<p>访问 HuggingFace 上的这个<a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">Llama3.1 页面</a>时，您会收到一条信息，要求您同意相关条款。在下载模型权重之前，请单击 "<strong>接受许可</strong>"以接受 Meta 条款。批准时间通常不超过一天。</p>
<p><strong>收到批准后，您必须生成一个新的 HuggingFace 令牌。您的旧令牌将无法使用新权限。</strong></p>
<p>在安装 vLLM 之前，请使用新令牌登录 HuggingFace。下面，我使用 Colab secrets 来存储令牌。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Login to HuggingFace using your new token.</span>
from huggingface_hub import login
from google.colab import userdata
hf_token = userdata.get(&#x27;HF_TOKEN&#x27;)
login(token = hf_token, add_to_git_credential=True)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">运行 RAG 生成</h3><p>在演示中，我们运行<code translate="no">Llama-3.1-8B</code> 模型，这需要 GPU 和相当大的内存来启动。下面的示例是在配备 A100 GPU 的 Google Colab Pro（10 美元/月）上运行的。要进一步了解如何运行 vLLM，可以查看<a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">快速入门文档</a>。</p>
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
<p>使用从 Milvus 检索到的上下文和来源编写提示。</p>
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
<p>现在，使用检索到的内容块和塞进提示中的原始问题生成一个答案。</p>
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
<pre><code translate="no" class="language-text">Question: &#x27;What do the parameters for HNSW MEAN!?&#x27;
Generated text: &#x27;Answer: The parameters for HNSW (Hiera(rchical Navigable Small World Graph) are: &#x27;
&#x27;* M: The maximum degree of nodes on each layer oof the graph, which can improve &#x27;
&#x27;recall rate at the cost of increased search time. * efConstruction and ef: &#x27; 
&#x27;These parameters specify a search range when building or searching an index.&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>我觉得上面的答案非常完美！</p>
<p>如果您对这个演示感兴趣，可以亲自尝试一下，并告诉我们您的想法。也欢迎您加入我们<a href="https://discord.com/invite/8uyFbECzPX">在 Discord 上的 Milvus 社区</a>，直接与 GenAI 的所有开发人员交流。</p>
<h2 id="References" class="common-anchor-header">参考资料<button data-href="#References" class="anchor-icon" translate="no">
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
<li><p>vLLM<a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">官方文档</a>和<a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">模型页面</a>。</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">2023 vLLM 关于分页注意力的论文</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">2023 vLLM</a>在 Ray 峰会上的<a href="https://www.youtube.com/watch?v=80bIUggRJf4">演讲</a></p></li>
<li><p>vLLM 博客：<a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM：使用 PagedAttention 提供简单、快速、廉价的 LLM 服务</a></p></li>
<li><p>关于运行 vLLM 服务器的实用博客：<a href="https://ploomber.io/blog/vllm-deploy/">部署 vLLM：分步指南</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">喇嘛 3 模型群 | 研究 - Meta 的人工智能</a></p></li>
</ul>
