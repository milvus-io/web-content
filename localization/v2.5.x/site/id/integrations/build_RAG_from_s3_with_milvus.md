---
id: build_RAG_from_s3_with_milvus.md
summary: >-
  Tutorial ini memandu Anda melalui proses pembuatan pipeline
  Retrieval-Augmented Generation (RAG) menggunakan Milvus dan Amazon S3. Anda
  akan belajar cara memuat dokumen secara efisien dari bucket S3, membaginya
  menjadi potongan-potongan yang dapat dikelola, dan menyimpan embedding
  vektornya di Milvus untuk pengambilan yang cepat dan dapat diskalakan. Untuk
  menyederhanakan proses ini, kita akan menggunakan LangChain sebagai alat untuk
  memuat data dari S3 dan memfasilitasi penyimpanannya di Milvus.
title: 'Membangun Pipa RAG: Memuat Data dari S3 ke Milvus'
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_from_s3_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_from_s3_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="common-anchor-header">Membangun Pipa RAG: Memuat Data dari S3 ke Milvus<button data-href="#Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini memandu Anda melalui proses pembuatan pipeline Retrieval-Augmented Generation (RAG) menggunakan Milvus dan Amazon S3. Anda akan belajar cara memuat dokumen secara efisien dari bucket S3, membaginya menjadi potongan-potongan yang dapat dikelola, dan menyimpan embedding vektornya di Milvus untuk pengambilan yang cepat dan dapat diskalakan. Untuk menyederhanakan proses ini, kita akan menggunakan LangChain sebagai alat untuk memuat data dari S3 dan memfasilitasi penyimpanannya di Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Persiapan<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Ketergantungan dan Lingkungan</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus openai requests tqdm boto3 langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>Kita akan menggunakan OpenAI sebagai LLM dalam contoh ini. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="S3-Configuration" class="common-anchor-header">Konfigurasi S3<button data-href="#S3-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk memuat dokumen dari S3, Anda memerlukan yang berikut ini:</p>
<ol>
<li><strong>Kunci Akses AWS dan Kunci Rahasia</strong>: Simpan ini sebagai variabel lingkungan untuk mengakses bucket S3 Anda dengan aman:</li>
</ol>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><strong>Bucket dan Dokumen S3</strong>: Tentukan nama bucket dan nama dokumen sebagai argumen ke kelas <code translate="no">S3FileLoader</code>.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> S3FileLoader

loader = S3FileLoader(
    bucket=<span class="hljs-string">&quot;milvus-s3-example&quot;</span>,  <span class="hljs-comment"># Replace with your S3 bucket name</span>
    key=<span class="hljs-string">&quot;WhatIsMilvus.docx&quot;</span>,  <span class="hljs-comment"># Replace with your document file name</span>
    aws_access_key_id=os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    aws_secret_access_key=os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li><strong>Memuat Dokumen</strong>: Setelah dikonfigurasi, Anda dapat memuat dokumen dari S3 ke dalam pipeline Anda:</li>
</ol>
<pre><code translate="no" class="language-python">documents = loader.load()
<button class="copy-code-btn"></button></code></pre>
<p>Langkah ini memastikan bahwa dokumen Anda berhasil dimuat dari S3 dan siap untuk diproses dalam pipeline RAG.</p>
<h2 id="Split-Documents-into-Chunks" class="common-anchor-header">Pisahkan Dokumen menjadi Potongan-potongan<button data-href="#Split-Documents-into-Chunks" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah memuat dokumen, gunakan <code translate="no">RecursiveCharacterTextSplitter</code> dari LangChain untuk memecah konten menjadi potongan-potongan yang dapat dikelola:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 's3://milvus-s3-example/WhatIsMilvus.docx'}, page_content='Milvus offers three deployment modes, covering a wide range of data scales—from local prototyping in Jupyter Notebooks to massive Kubernetes clusters managing tens of billions of vectors: \n\nMilvus Lite is a Python library that can be easily integrated into your applications. As a lightweight version of Milvus, it’s ideal for quick prototyping in Jupyter Notebooks or running on edge devices with limited resources. Learn more.\nMilvus Standalone is a single-machine server deployment, with all components bundled into a single Docker image for convenient deployment. Learn more.\nMilvus Distributed can be deployed on Kubernetes clusters, featuring a cloud-native architecture designed for billion-scale or even larger scenarios. This architecture ensures redundancy in critical components. Learn more. \n\nWhat Makes Milvus so Fast\U0010fc00 \n\nMilvus was designed from day one to be a highly efficient vector database system. In most cases, Milvus outperforms other vector databases by 2-5x (see the VectorDBBench results). This high performance is the result of several key design decisions: \n\nHardware-aware Optimization: To accommodate Milvus in various hardware environments, we have optimized its performance specifically for many hardware architectures and platforms, including AVX512, SIMD, GPUs, and NVMe SSD. \n\nAdvanced Search Algorithms: Milvus supports a wide range of in-memory and on-disk indexing/search algorithms, including IVF, HNSW, DiskANN, and more, all of which have been deeply optimized. Compared to popular implementations like FAISS and HNSWLib, Milvus delivers 30%-70% better performance.')
</code></pre>
<p>Pada tahap ini, dokumen Anda dimuat dari S3, dipecah menjadi potongan-potongan yang lebih kecil, dan siap untuk diproses lebih lanjut dalam pipeline Retrieval-Augmented Generation (RAG).</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">Membangun rantai RAG dengan Milvus Vector Store<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita akan menginisialisasi penyimpanan vektor Milvus dengan dokumen, yang memuat dokumen ke dalam penyimpanan vektor Milvus dan membangun indeks di bawahnya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=embeddings,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,
    },
    drop_old=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Drop the old Milvus collection if it exists</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk <code translate="no">connection_args</code>:</p>
<ul>
<li><p>Mengatur <code translate="no">uri</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</p></li>
<li><p>Jika Anda memiliki data dalam skala besar, Anda dapat mengatur server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</p></li>
<li><p>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, silakan sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</p></li>
</ul>
</div>
<p>Cari dokumen di penyimpanan vektor Milvus menggunakan pertanyaan kueri uji. Mari kita lihat 1 dokumen teratas.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;How can Milvus be deployed&quot;</span>
vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 455631712233193487, 'source': 's3://milvus-s3-example/WhatIsMilvus.docx'}, page_content='Milvus offers three deployment modes, covering a wide range of data scales—from local prototyping in Jupyter Notebooks to massive Kubernetes clusters managing tens of billions of vectors: \n\nMilvus Lite is a Python library that can be easily integrated into your applications. As a lightweight version of Milvus, it’s ideal for quick prototyping in Jupyter Notebooks or running on edge devices with limited resources. Learn more.\nMilvus Standalone is a single-machine server deployment, with all components bundled into a single Docker image for convenient deployment. Learn more.\nMilvus Distributed can be deployed on Kubernetes clusters, featuring a cloud-native architecture designed for billion-scale or even larger scenarios. This architecture ensures redundancy in critical components. Learn more. \n\nWhat Makes Milvus so Fast\U0010fc00 \n\nMilvus was designed from day one to be a highly efficient vector database system. In most cases, Milvus outperforms other vector databases by 2-5x (see the VectorDBBench results). This high performance is the result of several key design decisions: \n\nHardware-aware Optimization: To accommodate Milvus in various hardware environments, we have optimized its performance specifically for many hardware architectures and platforms, including AVX512, SIMD, GPUs, and NVMe SSD. \n\nAdvanced Search Algorithms: Milvus supports a wide range of in-memory and on-disk indexing/search algorithms, including IVF, HNSW, DiskANN, and more, all of which have been deeply optimized. Compared to popular implementations like FAISS and HNSWLib, Milvus delivers 30%-70% better performance.')]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan LCEL (LangChain Expression Language) untuk membangun rantai RAG.</p>
<pre><code translate="no" class="language-python">rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)


res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus can be deployed in three different modes: Milvus Lite for local prototyping and edge devices, Milvus Standalone for single-machine server deployment, and Milvus Distributed for deployment on Kubernetes clusters. These deployment modes cover a wide range of data scales, from small-scale prototyping to massive clusters managing tens of billions of vectors.'
</code></pre>
<pre><code translate="no" class="language-python">
<button class="copy-code-btn"></button></code></pre>
