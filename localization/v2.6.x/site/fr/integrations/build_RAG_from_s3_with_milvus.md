---
id: build_RAG_from_s3_with_milvus.md
summary: >-
  This tutorial walks you through the process of building a Retrieval-Augmented
  Generation (RAG) pipeline using Milvus and Amazon S3. You will learn how to
  efficiently load documents from a S3 bucket, split them into manageable
  chunks, and store their vector embeddings in Milvus for fast and scalable
  retrieval. To streamline this process, we will use LangChain as a tool to load
  data from S3 and facilitate its storage in Milvus.
title: 'Building a RAG Pipeline: Loading Data from S3 into Milvus'
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_from_s3_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_from_s3_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="common-anchor-header">Building a RAG Pipeline: Loading Data from S3 into Milvus<button data-href="#Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial walks you through the process of building a Retrieval-Augmented Generation (RAG) pipeline using Milvus and Amazon S3. You will learn how to efficiently load documents from a S3 bucket, split them into manageable chunks, and store their vector embeddings in Milvus for fast and scalable retrieval. To streamline this process, we will use LangChain as a tool to load data from S3 and facilitate its storage in Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dependencies and Environment</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus openai requests tqdm boto3 langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<p>We will use OpenAI as the LLM in this example. You should prepare the <a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> as an environment variable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="S3-Configuration" class="common-anchor-header">S3 Configuration<button data-href="#S3-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>For loading documents from S3, you need the following:</p>
<ol>
<li><strong>AWS Access Key and Secret Key</strong>: Store these as environment variables to securely access your S3 bucket:</li>
</ol>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><strong>S3 Bucket and Document</strong>: Specify the bucket name and document name as arguments to the <code translate="no">S3FileLoader</code> class.</li>
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
<li><strong>Load Documents</strong>: Once configured, you can load the document from S3 into your pipeline:</li>
</ol>
<pre><code translate="no" class="language-python">documents = loader.load()
<button class="copy-code-btn"></button></code></pre>
<p>This step ensures that your documents are successfully loaded from S3 and ready for processing in the RAG pipeline.</p>
<h2 id="Split-Documents-into-Chunks" class="common-anchor-header">Split Documents into Chunks<button data-href="#Split-Documents-into-Chunks" class="anchor-icon" translate="no">
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
    </button></h2><p>After loading the document, use LangChain’s <code translate="no">RecursiveCharacterTextSplitter</code> to break the content into manageable chunks:</p>
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
<p>At this stage, your documents are loaded from S3, split into smaller chunks, and ready for further processing in the Retrieval-Augmented Generation (RAG) pipeline.</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">Build RAG chain with Milvus Vector Store<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>We will initialize a Milvus vector store with the documents, which load the documents into the Milvus vector store and build an index under the hood.</p>
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
<p>For the <code translate="no">connection_args</code>:</p>
<ul>
<li><p>Setting the <code translate="no">uri</code> as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</p></li>
<li><p>If you have large scale of data, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubernetes</a>. In this setup, please use the server uri, e.g.<code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>.</p></li>
<li><p>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, please adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</p></li>
</ul>
</div>
<p>Search the documents in the Milvus vector store using a test query question. Let’s take a look at the top 1 document.</p>
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
<p>Use the LCEL(LangChain Expression Language) to build a RAG chain.</p>
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
