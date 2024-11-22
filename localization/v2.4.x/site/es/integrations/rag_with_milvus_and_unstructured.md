---
id: rag_with_milvus_and_unstructured.md
summary: >-
  En este tutorial, usaremos Unstructured para ingerir documentos PDF y luego
  usaremos Milvus para construir una canalización RAG.
title: Construir una RAG con Milvus y Unstructured
---
<h1 id="Build-a-RAG-with-Milvus-and-Unstructured" class="common-anchor-header">Construir una RAG con Milvus y Unstructured<button data-href="#Build-a-RAG-with-Milvus-and-Unstructured" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://docs.unstructured.io/welcome">Unstructured</a> proporciona una plataforma y herramientas para ingerir y procesar documentos no estructurados para la Retrieval Augmented Generation (RAG) y el ajuste de modelos. Ofrece tanto una plataforma de interfaz de usuario sin código como servicios de API sin servidor, lo que permite a los usuarios procesar datos en recursos informáticos alojados en Unstructured.</p>
<p>En este tutorial, utilizaremos Unstructured para ingerir documentos PDF y, a continuación, utilizaremos Milvus para construir una canalización RAG.</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dependencias y entorno</h3><pre><code translate="no" class="language-python">$ pip install -qU <span class="hljs-string">&quot;unstructured-ingest[pdf]&quot;</span> unstructured pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para habilitar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>Puedes obtener tus variables de entorno <code translate="no">UNSTRUCTURED_API_KEY</code> y <code translate="no">UNSTRUCTURED_URL</code> desde <a href="https://docs.unstructured.io/api-reference/api-services/saas-api-development-guide">aquí</a>.</p>
<p>En este ejemplo utilizaremos OpenAI como LLM. Debes preparar la <a href="https://platform.openai.com/docs/quickstart">clave api</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os


os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;UNSTRUCTURED_API_KEY&quot;</span>] = <span class="hljs-string">&quot;***********&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;UNSTRUCTURED_URL&quot;</span>] = <span class="hljs-string">&quot;***********&quot;</span>

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Milvus-and-OpenAI-clients" class="common-anchor-header">Prepare los clientes Milvus y OpenAI</h3><p>Puede utilizar el cliente Milvus para crear una colección Milvus e insertar datos en ella.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize Milvus client</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)  <span class="hljs-comment"># TODO</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>En cuanto al argumento de <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Establecer el <code translate="no">uri</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Si tiene una gran escala de datos, digamos más de un millón de vectores, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En esta configuración, por favor utilice la dirección del servidor y el puerto como su uri, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, utilice "&lt;su_nombre_de_usuario&gt;:&lt;su_contraseña&gt;" como token, de lo contrario no configure el token.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto final público y a la clave Api</a> en Zilliz Cloud.</li>
</ul>
</div>
<p>Comprueba si la colección ya existe y elimínala si es así.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.<span class="hljs-title function_">has_collection</span>(collection_name):
    milvus_client.<span class="hljs-title function_">drop_collection</span>(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Prepara un cliente OpenAI para generar embeddings y generar respuestas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>Genera una incrustación de prueba e imprime su dimensión y sus primeros elementos.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Create-Milvus-Collection" class="common-anchor-header">Crear la colección Milvus<button data-href="#Create-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Crearemos una colección con el siguiente esquema:</p>
<ul>
<li><code translate="no">id</code>: la clave primaria, que es un identificador único para cada documento.</li>
<li><code translate="no">vector</code>La incrustación del documento.</li>
<li><code translate="no">text</code>: el contenido textual del documento.</li>
<li><code translate="no">metadata</code>los metadatos del documento.</li>
</ul>
<p>Luego construimos un índice <code translate="no">AUTOINDEX</code> sobre el campo <code translate="no">vector</code>. Y luego creamos la colección.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=embedding_dim)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
)
milvus_client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

milvus_client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-data-from-Unstructured" class="common-anchor-header">Cargar datos desde Unstructured<button data-href="#Load-data-from-Unstructured" class="anchor-icon" translate="no">
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
    </button></h2><p>Unstructured proporciona una canalización de ingesta flexible y potente para procesar varios tipos de archivos, incluidos PDF, HTML, etc. Utilizaremos la funcionalidad de ingesta para particionar archivos PDF en un directorio local. A continuación, cargaremos los datos en Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> unstructured_ingest.v2.pipeline.pipeline <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> unstructured_ingest.v2.interfaces <span class="hljs-keyword">import</span> ProcessorConfig
<span class="hljs-keyword">from</span> unstructured_ingest.v2.processes.connectors.local <span class="hljs-keyword">import</span> (
    LocalIndexerConfig,
    LocalDownloaderConfig,
    LocalConnectionConfig,
    LocalUploaderConfig,
)
<span class="hljs-keyword">from</span> unstructured_ingest.v2.processes.partitioner <span class="hljs-keyword">import</span> PartitionerConfig

directory_with_pdfs = <span class="hljs-string">&quot;./pdf_files&quot;</span>
directory_with_results = <span class="hljs-string">&quot;./pdf_processed_outputs&quot;</span>

Pipeline.from_configs(
    context=ProcessorConfig(),
    indexer_config=LocalIndexerConfig(input_path=directory_with_pdfs),
    downloader_config=LocalDownloaderConfig(),
    source_connection_config=LocalConnectionConfig(),
    partitioner_config=PartitionerConfig(
        partition_by_api=<span class="hljs-literal">True</span>,
        api_key=os.getenv(<span class="hljs-string">&quot;UNSTRUCTURED_API_KEY&quot;</span>),
        partition_endpoint=os.getenv(<span class="hljs-string">&quot;UNSTRUCTURED_API_URL&quot;</span>),
        strategy=<span class="hljs-string">&quot;hi_res&quot;</span>,
        additional_partition_args={
            <span class="hljs-string">&quot;split_pdf_page&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;split_pdf_concurrency_level&quot;</span>: <span class="hljs-number">15</span>,
        },
    ),
    uploader_config=LocalUploaderConfig(output_dir=directory_with_results),
).run()


<span class="hljs-keyword">from</span> unstructured.staging.base <span class="hljs-keyword">import</span> elements_from_json


<span class="hljs-keyword">def</span> <span class="hljs-title function_">load_processed_files</span>(<span class="hljs-params">directory_path</span>):
    elements = []
    <span class="hljs-keyword">for</span> filename <span class="hljs-keyword">in</span> os.listdir(directory_path):
        <span class="hljs-keyword">if</span> filename.endswith(<span class="hljs-string">&quot;.json&quot;</span>):
            file_path = os.path.join(directory_path, filename)
            <span class="hljs-keyword">try</span>:
                elements.extend(elements_from_json(filename=file_path))
            <span class="hljs-keyword">except</span> IOError:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Error: Could not read file <span class="hljs-subst">{filename}</span>.&quot;</span>)

    <span class="hljs-keyword">return</span> elements


elements = load_processed_files(directory_with_results)
<button class="copy-code-btn"></button></code></pre>
<p>Insertar datos en Milvus.</p>
<pre><code translate="no" class="language-python">data = []
<span class="hljs-keyword">for</span> i, element <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(elements):
    data.append(
        {
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: emb_text(element.text),
            <span class="hljs-string">&quot;text&quot;</span>: element.text,
            <span class="hljs-string">&quot;metadata&quot;</span>: element.metadata.to_dict(),
        }
    )
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-and-Generate-Response" class="common-anchor-header">Recuperar y generar respuesta<button data-href="#Retrieve-and-Generate-Response" class="anchor-icon" translate="no">
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
    </button></h2><p>Definir una función para recuperar documentos relevantes de Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    search_res = milvus_client.search(
        collection_name=collection_name,
        data=[emb_text(question)],
        limit=top_k,
        <span class="hljs-comment"># search_params={&quot;metric_type&quot;: &quot;IP&quot;, &quot;params&quot;: {}},</span>
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    <span class="hljs-keyword">return</span> [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
<button class="copy-code-btn"></button></code></pre>
<p>Definir una función para generar una respuesta utilizando los documentos recuperados en la canalización RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>Probemos la canalización RAG con una pregunta de ejemplo.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO: HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
INFO: HTTP Request: POST https://api.openai.com/v1/chat/completions &quot;HTTP/1.1 200 OK&quot;


Question: What is the Advanced Search Algorithms in Milvus?
Answer: The Advanced Search Algorithms in Milvus refer to a wide range of in-memory and on-disk indexing/search algorithms it supports, including IVF, HNSW, DiskANN, and more. These algorithms have been deeply optimized, and Milvus delivers 30%-70% better performance compared to popular implementations like FAISS and HNSWLib.
</code></pre>