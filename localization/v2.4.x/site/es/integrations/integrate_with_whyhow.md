---
id: integrate_with_whyhow.md
summary: >-
  Esta guía muestra cómo utilizar whyhow.ai y Milvus Lite para llevar a cabo una
  recuperación basada en reglas.
title: Integrar Milvus con WhyHow
---
<h1 id="Integrate-Milvus-with-WhyHow" class="common-anchor-header">Integrar Milvus con WhyHow<button data-href="#Integrate-Milvus-with-WhyHow" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía muestra cómo utilizar whyhow.ai y Milvus Lite para llevar a cabo una recuperación basada en reglas.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>WhyHow es una plataforma que proporciona a los desarrolladores los bloques de construcción que necesitan para organizar, contextualizar y recuperar de forma fiable datos no estructurados para realizar RAG complejas. El paquete Rule-based Retrieval es un paquete Python desarrollado por WhyHow que permite crear y gestionar aplicaciones de Generación Aumentada de Recuperación (RAG) con capacidades avanzadas de filtrado.</p>
<h2 id="Installation" class="common-anchor-header">Instalación<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de empezar, instale todos los paquetes python necesarios para su uso posterior.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus, whyhow_rbr
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, necesitamos inicializar el cliente Milvus para implementar la Recuperación Basada en Reglas utilizando Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite local path</span>
path=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span> <span class="hljs-comment"># random name for local milvus lite db path</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(path)
<button class="copy-code-btn"></button></code></pre>
<p>También puede inicializar el cliente Milvus a través de Milvus Cloud</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Cloud credentials</span>
YOUR_MILVUS_CLOUD_END_POINT = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_END_POINT&quot;</span>
YOUR_MILVUS_CLOUD_TOKEN = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_TOKEN&quot;</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">Crear colección<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-necessary-variables" class="common-anchor-header">Definir las variables necesarias</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define collection name</span>
COLLECTION_NAME=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span> <span class="hljs-comment"># take your own collection name</span>

<span class="hljs-comment"># Define vector dimension size</span>
DIMENSION=<span class="hljs-number">1536</span> <span class="hljs-comment"># decide by the model you use</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-schema" class="common-anchor-header">Añadir esquema</h3><p>Antes de insertar cualquier dato en la base de datos de Milvus Lite, necesitamos definir primero el campo de datos, que aquí se llama esquema. A través de crear objeto <code translate="no">CollectionSchema</code> y añadir campo de datos a través de <code translate="no">add_field()</code>, podemos controlar nuestro tipo de datos y sus características. Este paso es obligatorio antes de insertar cualquier dato en Milvus.</p>
<pre><code translate="no" class="language-python">schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Enable id matching</span>

schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">Crear índice</h3><p>Para cada esquema, es mejor tener un índice para que la consulta sea mucho más eficiente. Para crear un índice, primero necesitamos un <code translate="no">index_params</code> y más tarde añadir más datos de índice en este objeto <code translate="no">IndexParams</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Start to indexing data field</span>
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  <span class="hljs-comment"># pass in index_params object</span>
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Este método es una fina envoltura alrededor de la implementación oficial de Milvus<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">(docs oficiales</a>).</p>
<h3 id="Create-collection" class="common-anchor-header">Crear colección</h3><p>Después de definir todos los campos de datos e indexarlos, ahora necesitamos crear nuestra colección de base de datos para que podamos acceder a nuestros datos de forma rápida y precisa. Lo que hay que mencionar es que inicializamos el <code translate="no">enable_dynamic_field</code> para que sea true y así poder cargar cualquier dato libremente. El coste es que la consulta de datos puede ser ineficiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upload-documents" class="common-anchor-header">Cargar documentos<button data-href="#Upload-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de crear una colección, estamos listos para llenarla de documentos. En <code translate="no">whyhow_rbr</code> esto se hace usando el método <code translate="no">upload_documents</code> de <code translate="no">MilvusClient</code>. Realiza los siguientes pasos bajo el capó:</p>
<ul>
<li><strong>Preprocesamiento</strong>: Lectura y división en trozos de los archivos PDF proporcionados.</li>
<li><strong>Incrustación</strong>: Incrustar todos los trozos utilizando un modelo OpenAI.</li>
<li><strong>Inserción</strong>: Carga de las incrustaciones y los metadatos en Milvus Lite</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># get pdfs</span>
pdfs = [<span class="hljs-string">&quot;harry-potter.pdf&quot;</span>, <span class="hljs-string">&quot;game-of-thrones.pdf&quot;</span>] <span class="hljs-comment"># replace to your pdfs path</span>

<span class="hljs-comment"># Uploading the PDF document</span>
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Question-answering" class="common-anchor-header">Respuesta a preguntas<button data-href="#Question-answering" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora por fin podemos pasar a la generación aumentada de recuperación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search data and implement RAG!</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;What food does Harry Potter like to eat?&#x27;</span>,
    collection_name=COLLECTION_NAME,
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Rules" class="common-anchor-header">Reglas</h3><p>En el ejemplo anterior, se han tenido en cuenta todos y cada uno de los documentos de nuestro índice. Sin embargo, a veces puede ser beneficioso recuperar sólo los documentos que satisfacen algunas condiciones predefinidas (por ejemplo, <code translate="no">filename=harry-potter.pdf</code>). En <code translate="no">whyhow_rbr</code> a través de Milvus Lite, esto puede hacerse ajustando los parámetros de búsqueda.</p>
<p>Una regla puede controlar los siguientes atributos de metadatos</p>
<ul>
<li><code translate="no">filename</code> nombre del archivo</li>
<li><code translate="no">page_numbers</code> lista de números enteros correspondientes a los números de página (indexación 0)</li>
<li><code translate="no">id</code> identificador único de un chunk (este es el filtro más "extremo")</li>
<li>Otras reglas basadas en <a href="https://milvus.io/docs/boolean.md">expresiones booleanas</a></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># RULES(search on book harry-potter on page 8):</span>
PARTITION_NAME=<span class="hljs-string">&#x27;harry-potter&#x27;</span> <span class="hljs-comment"># search on books</span>
page_number=<span class="hljs-string">&#x27;page_number == 8&#x27;</span>

<span class="hljs-comment"># first create a partitions to store the book and later search on this specific partition:</span>
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME <span class="hljs-comment"># separate base on your pdfs type</span>
)

<span class="hljs-comment"># search with rules</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;Tell me about the greedy method&#x27;</span>,
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    <span class="hljs-built_in">filter</span>=page_number, <span class="hljs-comment"># append any rules follow the Boolean Expression Rule</span>
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, primero creamos una partición que almacena los pdf relacionados con harry-potter, y mediante la búsqueda dentro de esta partición, podemos obtener la información más directa. Además, aplicamos números de página como filtro para especificar la página exacta en la que deseamos buscar. Recuerda que el parámetro filer debe seguir la <a href="https://milvus.io/docs/boolean.md">regla booleana</a>.</p>
<h3 id="Clean-up" class="common-anchor-header">Limpieza</h3><p>Por último, después de implementar todas las instrucciones, puedes limpiar la base de datos llamando a <code translate="no">drop_collection()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Clean up</span>
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
<button class="copy-code-btn"></button></code></pre>
