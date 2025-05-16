---
id: build_RAG_with_milvus_and_gemini.md
summary: >-
  En este tutorial, le mostraremos cómo construir una canalización RAG
  (Retrieval-Augmented Generation) con Milvus y Gemini. Utilizaremos el modelo
  Gemini para generar texto basado en una consulta dada. También utilizaremos
  Milvus para almacenar y recuperar el texto generado.
title: Construir RAG con Milvus y Gemini
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-RAG-with-Milvus-and-Gemini" class="common-anchor-header">Construir RAG con Milvus y Gemini<button data-href="#Build-RAG-with-Milvus-and-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://ai.google.dev/gemini-api/docs">La API Gemini</a> y <a href="https://ai.google.dev/aistudio">Google AI Studio</a> te ayudan a empezar a trabajar con los modelos más recientes de Google y a convertir tus ideas en aplicaciones escalables. Gemini proporciona acceso a potentes modelos lingüísticos como <code translate="no">Gemini-2.0-Flash</code>, <code translate="no">Gemini-2.0-Pro</code>, y otras versiones para tareas como la generación de textos, el procesamiento de documentos, la visión, el análisis de audio, etc. La API permite introducir contextos largos con millones de tokens, ajustar modelos para tareas específicas, generar salidas estructuradas como JSON y aprovechar capacidades como la recuperación semántica y la ejecución de código.</p>
<p>En este tutorial, le mostraremos cómo construir una canalización RAG (Retrieval-Augmented Generation) con Milvus y Gemini. Utilizaremos el modelo Gemini para generar respuestas basadas en una consulta dada, aumentada con información relevante recuperada de Milvus.</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dependencias y entorno</h3><p>En primer lugar, instale los paquetes necesarios:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus google-genai requests tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para activar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>Primero debes iniciar sesión en la plataforma Google AI Studio y preparar la <a href="https://aistudio.google.com/apikey">clave api</a> <code translate="no">GEMINI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparar los datos</h3><p>Utilizamos las páginas de preguntas frecuentes de la <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentación de Milvus 2.4.x</a> como conocimiento privado en nuestra RAG, que es una buena fuente de datos para una canalización RAG sencilla.</p>
<p>Descargamos el archivo zip y extraemos los documentos a la carpeta <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cargamos todos los archivos markdown de la carpeta <code translate="no">milvus_docs/en/faq</code>. Para cada documento, simplemente utilizamos "# " para separar el contenido en el archivo, lo que puede separar aproximadamente el contenido de cada parte principal del archivo markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">Preparar el LLM y el modelo de incrustación</h3><p>Utilizamos <code translate="no">gemini-2.0-flash</code> como LLM y <code translate="no">text-embedding-004</code> como modelo de incrustación.</p>
<p>Intentemos generar una respuesta de prueba a partir del LLM:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> google <span class="hljs-keyword">import</span> genai

client = genai.Client(api_key=os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>])

response = client.models.generate_content(
    model=<span class="hljs-string">&quot;gemini-2.0-flash&quot;</span>, contents=<span class="hljs-string">&quot;who are you&quot;</span>
)
<span class="hljs-built_in">print</span>(response.text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I am a large language model, trained by Google.
</code></pre>
<p>Generar un embedding de prueba e imprimir su dimensión y sus primeros elementos.</p>
<pre><code translate="no" class="language-python">test_embeddings = client.models.embed_content(
    model=<span class="hljs-string">&quot;text-embedding-004&quot;</span>, contents=[<span class="hljs-string">&quot;This is a test1&quot;</span>, <span class="hljs-string">&quot;This is a test2&quot;</span>]
)

embedding_dim = <span class="hljs-built_in">len</span>(test_embeddings.embeddings[<span class="hljs-number">0</span>].values)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embeddings.embeddings[<span class="hljs-number">0</span>].values[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">768
[0.013588584, -0.004361838, -0.08481652, -0.039724775, 0.04723794, -0.0051557426, 0.026071774, 0.045514572, -0.016867816, 0.039378334]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Cargar datos en Milvus<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Crear la colección</h3><p>Inicialicemos el cliente Milvus y creemos nuestra colección:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>En cuanto al argumento de <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Establecer el <code translate="no">uri</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Si tiene una gran escala de datos, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. En esta configuración, por favor utilice la uri del servidor, por ejemplo<code translate="no">http://localhost:19530</code>, como su <code translate="no">uri</code>.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto final público y a la clave Api</a> en Zilliz Cloud.</li>
</ul>
</div>
<p>Compruebe si la colección ya existe y elimínela en caso afirmativo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Crear una nueva colección con los parámetros especificados.</p>
<p>Si no especificamos ninguna información de campo, Milvus creará automáticamente un campo <code translate="no">id</code> por defecto para la clave primaria, y un campo <code translate="no">vector</code> para almacenar los datos vectoriales. Se utiliza un campo JSON reservado para almacenar campos no definidos por el esquema y sus valores.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Insertar datos</h3><p>Iterar a través de las líneas de texto, crear incrustaciones, y luego insertar los datos en Milvus.</p>
<p>Aquí hay un nuevo campo <code translate="no">text</code>, que es un campo no definido en el esquema de la colección. Se añadirá automáticamente al campo dinámico JSON reservado, que puede tratarse como un campo normal a alto nivel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

doc = client.models.embed_content(model=<span class="hljs-string">&quot;text-embedding-004&quot;</span>, contents=text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc.embeddings[i].values, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:00&lt;00:00, 337796.30it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Construir RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Recuperar datos para una consulta</h3><p>Especifiquemos una pregunta frecuente sobre Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Busquemos la pregunta en la colección y recuperemos las 3 primeras coincidencias semánticas.</p>
<pre><code translate="no" class="language-python">quest_embed = client.models.embed_content(model=<span class="hljs-string">&quot;text-embedding-004&quot;</span>, contents=question)

search_res = milvus_client.search(
    collection_name=collection_name,
    data=[quest_embed.embeddings[<span class="hljs-number">0</span>].values],
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Veamos los resultados de la consulta</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.8048275113105774
    ],
    [
        &quot;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When a query request comes, Milvus searches both incremental data and historical data by loading them into memory. Incremental data are in the growing segments, which are buffered in memory before they reach the threshold to be persisted in storage engine, while historical data are from the sealed segments that are stored in the object storage. Incremental data and historical data together constitute the whole dataset to search.\n\n###&quot;,
        0.7574886679649353
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.7453608512878418
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utilizar LLM para obtener una respuesta RAG</h3><p>Convertir los documentos recuperados en un formato de cadena.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>Definir avisos de sistema y de usuario para el modelo de lenguaje. Este prompt se ensambla con los documentos recuperados de Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> google.genai <span class="hljs-keyword">import</span> types

SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilice Gemini para generar una respuesta basada en las instrucciones.</p>
<pre><code translate="no" class="language-python">response = client.models.generate_content(
    model=<span class="hljs-string">&quot;gemini-2.0-flash&quot;</span>,
    config=types.GenerateContentConfig(system_instruction=SYSTEM_PROMPT),
    contents=USER_PROMPT,
)
<span class="hljs-built_in">print</span>(response.text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores two types of data: inserted data and metadata. Inserted data, which includes vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental logs. Milvus supports multiple object storage backends. Metadata is generated within Milvus, and each Milvus module has its own metadata that is stored in etcd.
</code></pre>
<p>Muy bien. Hemos construido con éxito una canalización RAG con Milvus y Gemini.</p>
