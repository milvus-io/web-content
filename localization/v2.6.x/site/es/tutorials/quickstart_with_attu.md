---
id: quickstart_with_attu.md
summary: >-
  Attu es una herramienta de administración todo en uno de código abierto para
  Milvus. Presenta una interfaz gráfica de usuario (GUI) intuitiva, que le
  permite interactuar fácilmente con sus bases de datos. Con unos pocos clics,
  puede visualizar el estado de su clúster, gestionar metadatos, realizar
  consultas de datos y mucho más.
title: Inicio rápido con Attu - la interfaz de usuario web de Milvus
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Inicio rápido con Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Introducción<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> es una herramienta de administración todo en uno de código abierto para Milvus. Presenta una interfaz gráfica de usuario (GUI) intuitiva, que le permite interactuar fácilmente con sus bases de datos. Con sólo unos clics, puede visualizar el estado de su clúster, gestionar metadatos, realizar consultas de datos y mucho más.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Instalación de la aplicación de escritorio<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Descargue la versión de escritorio de Attu visitando la <a href="https://github.com/zilliztech/attu/releases">página Attu GitHub Releases</a>. Seleccione la versión adecuada para su sistema operativo y siga los pasos de instalación.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Nota para macOS (chip serie M):</h3><p>Si se encuentra con el error:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Ejecute el siguiente comando en terminal para evitar este problema:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Conectarse a Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu admite la conexión tanto a <strong>Milvus Standalone</strong> como a <strong>Zilliz Cloud</strong>, lo que proporciona flexibilidad para trabajar con bases de datos locales o alojadas en la nube.</p>
<p>Para utilizar Milvus Standalone localmente:</p>
<ol>
<li>Inicie Milvus Standalone siguiendo la <a href="https://milvus.io/docs/install_standalone-docker.md">guía de instalación de Milvus</a>.</li>
<li>Abra Attu e introduzca la información de conexión:<ul>
<li>Dirección de Milvus: Su URI del servidor de Milvus Standalone, por ejemplo http://localhost:19530</li>
<li>Otros ajustes opcionales: Puede establecerlos en función de sus configuraciones de Milvus o simplemente dejarlos por defecto.</li>
</ul></li>
<li>Haga clic en Conectar para acceder a su base de datos.</li>
</ol>
<blockquote>
<p>También puede conectar el Milvus totalmente gestionado en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Simplemente configure <code translate="no">Milvus Address</code> y <code translate="no">token</code> con el <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">punto final público y la clave API</a> de su instancia de Zilliz Cloud.</p>
</blockquote>
<ol start="4">
<li>Haz clic para acceder a tu base de datos.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Preparar los datos, crear la colección e insertar los datos<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Preparar los datos</h3><p>Utilizamos las páginas de preguntas frecuentes de la <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentación de Milvus 2.4.x</a> como conjunto de datos para este ejemplo.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Descargue y extraiga los datos:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Procesar archivos Markdown:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Generar incrustaciones</h3><p>Defina un modelo de incrustación para generar incrustaciones de texto utilizando <code translate="no">milvus_model</code>. Utilizamos el modelo <code translate="no">DefaultEmbeddingFunction</code> como ejemplo, que es un modelo de incrustación preentrenado y ligero.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Salida:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Crear colección</h3><p>Conéctese a Milvus y cree una colección:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Insertar datos</h3><p>Itere a través de las líneas de texto, cree incrustaciones e inserte los datos en Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Visualizar datos y esquema</h3><p>Ahora podemos visualizar el esquema de datos y las entidades insertadas utilizando la interfaz de Attu. El esquema muestra los campos definidos, incluyendo un campo <code translate="no">id</code> de tipo <code translate="no">Int64</code> y un campo <code translate="no">vector</code> de tipo <code translate="no">FloatVector(768)</code> con una métrica <code translate="no">Inner Product (IP)</code>. La colección se carga con <strong>72 entidades</strong>.</p>
<p>Además, podemos ver los datos insertados, incluidos ID, incrustaciones vectoriales y campos dinámicos que almacenan metadatos como contenido de texto. La interfaz admite el filtrado y la consulta basados en condiciones especificadas o campos dinámicos.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Visualización de resultados de búsqueda y relaciones<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu proporciona una potente interfaz para visualizar y explorar las relaciones entre datos. Para examinar los puntos de datos insertados y sus relaciones de similitud, siga estos pasos:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Realizar una búsqueda</strong></h3><p>Vaya a la pestaña <strong>Búsqueda vectorial</strong> en Attu.</p>
<ol>
<li>Haga clic en el botón <strong>Generar datos aleatorios</strong> para crear consultas de prueba.</li>
<li>Haga clic en <strong>Buscar</strong> para obtener resultados basados en los datos generados.</li>
</ol>
<p>Los resultados se muestran en una tabla, mostrando IDs, puntuaciones de similitud y campos dinámicos para cada entidad coincidente.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Explorar relaciones de datos</strong></h3><p>Haga clic en el botón <strong>Explorar</strong> del panel de resultados para visualizar las relaciones entre el vector de consulta y los resultados de la búsqueda en una <strong>estructura similar a un grafo de conocimiento</strong>.</p>
<ul>
<li>El <strong>nodo central</strong> representa el vector de búsqueda.</li>
<li>Los <strong>nodos conectados</strong> representan los resultados de la búsqueda, al hacer clic en ellos se mostrará la información detallada del nodo correspondiente.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Ampliar el gráfico</strong></h3><p>Haga doble clic en cualquier nodo de resultados para expandir sus conexiones. Esta acción revela relaciones adicionales entre el nodo seleccionado y otros puntos de datos de la colección, creando un <strong>gráfico de conocimiento más amplio e interconectado</strong>.</p>
<p>Esta vista ampliada permite una exploración más profunda de cómo se relacionan los puntos de datos, basándose en la similitud vectorial.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Conclusión<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu simplifica la gestión y visualización de los datos vectoriales almacenados en Milvus. Desde la inserción de datos hasta la ejecución de consultas y la exploración interactiva, proporciona una interfaz intuitiva para gestionar tareas complejas de búsqueda vectorial. Con características como el soporte de esquemas dinámicos, visualizaciones gráficas de búsqueda y filtros de consulta flexibles, Attu permite a los usuarios analizar conjuntos de datos a gran escala de forma eficaz.</p>
<p>Al aprovechar las herramientas de exploración visual de Attu, los usuarios pueden comprender mejor sus datos, identificar relaciones ocultas y tomar decisiones basadas en datos. Empiece hoy mismo a explorar sus propios conjuntos de datos con Attu y Milvus.</p>
<hr>
