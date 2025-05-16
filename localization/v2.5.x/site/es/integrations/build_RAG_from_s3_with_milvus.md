---
id: build_RAG_from_s3_with_milvus.md
summary: >-
  Este tutorial le guiará a través del proceso de creación de una canalización
  de generación mejorada de recuperación (RAG) utilizando Milvus y Amazon S3.
  Aprenderá a cargar documentos de forma eficiente desde un bucket de S3,
  dividirlos en trozos manejables y almacenar sus incrustaciones vectoriales en
  Milvus para una recuperación rápida y escalable. Para agilizar este proceso,
  utilizaremos LangChain como herramienta para cargar datos desde S3 y facilitar
  su almacenamiento en Milvus.
title: 'Creación de una canalización RAG: Carga de datos de S3 en Milvus'
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_from_s3_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_from_s3_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="common-anchor-header">Creación de una canalización RAG: Carga de datos de S3 en Milvus<button data-href="#Building-a-RAG-Pipeline-Loading-Data-from-S3-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial le guiará a través del proceso de construcción de un canal de Generación de Recuperación-Aumentada (RAG) utilizando Milvus y Amazon S3. Aprenderá a cargar documentos de forma eficiente desde un cubo de S3, dividirlos en trozos manejables y almacenar sus incrustaciones vectoriales en Milvus para una recuperación rápida y escalable. Para agilizar este proceso, utilizaremos LangChain como herramienta para cargar datos desde S3 y facilitar su almacenamiento en Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Preparación<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dependencias y entorno</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus openai requests tqdm boto3 langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si estás utilizando Google Colab, para habilitar las dependencias que acabamos de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla, y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>En este ejemplo utilizaremos OpenAI como LLM. Debes preparar la <a href="https://platform.openai.com/docs/quickstart">clave api</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="S3-Configuration" class="common-anchor-header">Configuración de S3<button data-href="#S3-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Para cargar documentos desde S3, necesitas lo siguiente:</p>
<ol>
<li><strong>AWS Access Key y Secret Key</strong>: Almacénalas como variables de entorno para acceder de forma segura a tu bucket de S3:</li>
</ol>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><strong>S3 Bucket y Document</strong>: Especifique el nombre del bucket y el nombre del documento como argumentos de la clase <code translate="no">S3FileLoader</code>.</li>
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
<li><strong>Cargar documentos</strong>: Una vez configurado, puede cargar el documento desde S3 en su canalización:</li>
</ol>
<pre><code translate="no" class="language-python">documents = loader.load()
<button class="copy-code-btn"></button></code></pre>
<p>Este paso garantiza que sus documentos se carguen correctamente desde S3 y estén listos para su procesamiento en la tubería RAG.</p>
<h2 id="Split-Documents-into-Chunks" class="common-anchor-header">Dividir documentos en trozos<button data-href="#Split-Documents-into-Chunks" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de cargar el documento, utilice <code translate="no">RecursiveCharacterTextSplitter</code> de LangChain para dividir el contenido en trozos manejables:</p>
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
<p>En esta etapa, sus documentos se cargan desde S3, se dividen en trozos más pequeños y están listos para su posterior procesamiento en la tubería Retrieval-Augmented Generation (RAG).</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">Construir la cadena RAG con Milvus Vector Store<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>Inicializaremos un almacén vectorial Milvus con los documentos, que cargarán los documentos en el almacén vectorial Milvus y construirán un índice bajo el capó.</p>
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
<p>Para el <code translate="no">connection_args</code>:</p>
<ul>
<li><p>Establecer el <code translate="no">uri</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</p></li>
<li><p>Si tiene una gran escala de datos, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. En esta configuración, por favor utilice la uri del servidor, por ejemplo<code translate="no">http://localhost:19530</code>, como su <code translate="no">uri</code>.</p></li>
<li><p>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, por favor ajuste el <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y a la Api key</a> en Zilliz Cloud.</p></li>
</ul>
</div>
<p>Busque los documentos en el almacén vectorial de Milvus utilizando una pregunta de consulta de prueba. Echemos un vistazo al primer documento.</p>
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
<p>Utiliza el LCEL(LangChain Expression Language) para construir una cadena RAG.</p>
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
