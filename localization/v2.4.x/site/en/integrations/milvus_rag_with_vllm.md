---
id: milvus_rag_with_vllm.md
summary: >-
  This blog will show you how to build and run a RAG with Milvus, vLLM, and
  Llama 3.1. More specifically, I will show you how to embed and store text
  information as vector embeddings in Milvus and use this vector store as a
  knowledge base to efficiently retrieve text chunks relevant to user questions.
title: 'Building RAG with Milvus, vLLM, and Llama 3.1'
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">Building RAG with Milvus, vLLM, and Llama 3.1<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>The University of California – Berkeley donated <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a>, a fast and easy-to-use library for LLM inference and serving, to <a href="https://lfaidata.foundation/">LF AI &amp; Data Foundation</a> as an incubation-stage project in July 2024. As a fellow member project, we’d like to welcome vLLM joining the LF AI &amp; Data family! 🎉</p>
<p>Large Language Models (<a href="https://zilliz.com/glossary/large-language-models-(llms)">LLMs</a>) and <a href="https://zilliz.com/learn/what-is-vector-database">vector databases</a> are usually paired to build Retrieval Augmented Generation (<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">RAG</a>), a popular AI application architecture to address <a href="https://zilliz.com/glossary/ai-hallucination">AI Hallucinations</a>. This blog will show you how to build and run a RAG with Milvus, vLLM, and Llama 3.1. More specifically, I will show you how to embed and store text information as <a href="https://zilliz.com/glossary/vector-embeddings">vector embeddings</a> in Milvus and use this vector store as a knowledge base to efficiently retrieve text chunks relevant to user questions. Finally, we’ll leverage vLLM to serve Meta’s Llama 3.1-8B model to generate answers augmented by the retrieved text. Let’s dive in!</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Introduction to Milvus, vLLM, and Meta’s Llama 3.1<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Milvus vector database</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a> is an open-source, <a href="https://zilliz.com/blog/what-is-a-real-vector-database">purpose-built</a>, distributed vector database for storing, indexing, and searching vectors for <a href="https://zilliz.com/learn/generative-ai">Generative AI</a> (GenAI) workloads. Its ability to perform <a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">hybrid search,</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">metadata filtering</a>, reranking, and efficiently handle trillions of vectors makes Milvus a go-to choice for AI and machine learning workloads. <a href="https://github.com/milvus-io/">Milvus</a> can be run locally, on a cluster, or hosted in the fully managed <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a> is an open-source project started at UC Berkeley SkyLab focused on optimizing LLM serving performance. It uses efficient memory management with PagedAttention, continuous batching, and optimized CUDA kernels. Compared to traditional methods, vLLM improves serving performance by up to 24x while cutting GPU memory usage in half.</p>
<p>According to the paper &quot;<a href="https://arxiv.org/abs/2309.06180">Efficient Memory Management for Large Language Model Serving with PagedAttention</a>,&quot; the KV cache uses around 30% of GPU memory, leading to potential memory issues. The KV cache is stored in contiguous memory, but changing size can cause memory fragmentation, which is inefficient for computation.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Image 1. KV cache memory management in existing systems (2023 Paged Attention  <a href="https://arxiv.org/pdf/2309.06180">paper</a>)</em></p>
<p>By using virtual memory for the KV cache, vLLM only allocates physical GPU memory as needed, eliminating memory fragmentation and avoiding pre-allocation. In tests, vLLM outperformed <a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a> (HF) and <a href="https://github.com/huggingface/text-generation-inference">Text Generation Inference</a> (TGI), achieving up to 24x higher throughput than HF and 3.5x higher than TGI on NVIDIA A10G and A100 GPUs.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Image 2. Serving throughput when each request asks for three parallel output completions. vLLM achieves 8.5x—15x higher throughput than HF and 3.3x—3.5x higher throughput than TGI (2023 <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM blog</a>).</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Meta’s Llama 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Meta’s Llama 3.1</strong></a> was announced on July 23, 2024. The 405B model delivers state-of-the-art performance on several public benchmarks and has a context window of 128,000 input tokens with various commercial uses permitted. Alongside the 405-billion parameter model, Meta released an updated version of Llama3 70B (70 billion parameters) and 8B (8 billion parameters). Model weights are available to download <a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">on Meta’s website</a>.</p>
<p>A key insight was that fine-tuning generated data can boost performance, but poor-quality examples can degrade it. The Llama team worked extensively to identify and remove these bad examples using the model itself, auxiliary models, and other tools.</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">Build and Perform the RAG-Retrieval with Milvus<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">Prepare your dataset.</h3><p>I used the official <a href="https://milvus.io/docs/">Milvus documentation</a> as my dataset for this demo, which I downloaded and saved locally.</p>
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
<h3 id="Download-an-embedding-model" class="common-anchor-header">Download an embedding model.</h3><p>Next, download a free, open-source <a href="https://zilliz.com/ai-models">embedding model</a> from HuggingFace.</p>
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
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">Chunk and encode your custom data as vectors.</h3><p>I’ll use a fixed length of 512 characters with 10% overlap.</p>
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
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">Save the vectors in Milvus.</h3><p>Ingest the encoded vector embedding in the Milvus vector database.</p>
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
<h3 id="Perform-a-vector-search" class="common-anchor-header">Perform a vector search.</h3><p>Ask a question and search for the nearest neighbor chunks from your knowledge base in Milvus.</p>
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
<p>The retrieved result is as shown below.</p>
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
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">Build and Perform the RAG-Generation with vLLM and Llama 3.1-8B<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">Install vLLM and models from HuggingFace</h3><p>vLLM downloads large language models from HuggingFace by default. In general, anytime you want to use a brand new model on HuggingFace, you should do a pip install --upgrade or -U. Also, you’ll need a GPU to run inference of Meta’s Llama 3.1 models with vLLM.</p>
<p>For a full list of all vLLM-supported models, see this <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">documentation page</a>.</p>
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
<p>To learn more about how to install vLLM, see its <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">installation</a> page.</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">Get a HuggingFace token.</h3><p>Some models on HuggingFace, such as Meta Llama 3.1, require the user to accept their license before being able to download the weights. Therefore, you must create a HuggingFace account, accept the model’s license, and generate a token.</p>
<p>When visiting this <a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">Llama3.1 page</a> on HuggingFace, you’ll get a message asking you to agree to the terms. Click “<strong>Accept License</strong>” to accept Meta terms before downloading model weights. The approval usually takes less than a day.</p>
<p><strong>After you receive approval, you must generate a new HuggingFace token. Your old tokens will not work with the new permissions.</strong></p>
<p>Before installing vLLM, log in to HuggingFace with your new token. Below, I used Colab secrets to store the token.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Login to HuggingFace using your new token.</span>
<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> login
<span class="hljs-keyword">from</span> google.colab <span class="hljs-keyword">import</span> userdata
hf_token = userdata.get(<span class="hljs-string">&#x27;HF_TOKEN&#x27;</span>)
login(token = hf_token, add_to_git_credential=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">Run the RAG-Generation</h3><p>In the demo, we run <code translate="no">Llama-3.1-8B</code> model, which requires GPU and sizable memory to spin up. The following example was run on Google Colab Pro ($10/month) with an A100 GPU. To learn more about how to run vLLM, you can check out the <a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">Quickstart documentation</a>.</p>
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
<p>Write a prompt using contexts and sources retrieved from Milvus.</p>
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
<p>Now, generate an answer using the retrieved chunks and the original question stuffed into the prompt.</p>
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
<p>That answer above looks perfect to me!</p>
<p>If you’re interested in this demo, feel free to try it yourself and let us know your thoughts. You’re also welcome to join our <a href="https://discord.com/invite/8uyFbECzPX">Milvus community on Discord</a> to have conversations with all the GenAI developers directly.</p>
<h2 id="References" class="common-anchor-header">References<button data-href="#References" class="anchor-icon" translate="no">
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
<li><p>vLLM <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">official documentation</a> and <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">model page</a>.</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">2023 vLLM paper on Paged Attention</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">2023 vLLM presentation</a> at Ray Summit</p></li>
<li><p>vLLM blog: <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention</a></p></li>
<li><p>Helpful blog about running the vLLM server: <a href="https://ploomber.io/blog/vllm-deploy/">Deploying vLLM: a Step-by-Step Guide</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">The Llama 3 Herd of Models | Research - AI at Meta</a></p></li>
</ul>
