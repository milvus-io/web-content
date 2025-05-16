---
id: milvus_lite.md
summary: Empieza con Milvus Lite.
title: Ejecutar Milvus Lite localmente
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Ejecutar Milvus Lite localmente<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra cómo ejecutar Milvus localmente con Milvus Lite. Milvus Lite es la versión ligera de <a href="https://github.com/milvus-io/milvus">Milvus</a>, una base de datos vectorial de código abierto que potencia las aplicaciones de IA con incrustaciones vectoriales y búsqueda de similitud.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite puede importarse en su aplicación Python, proporcionando la funcionalidad de búsqueda vectorial central de Milvus. Milvus Lite ya está incluido en el <a href="https://github.com/milvus-io/pymilvus">SDK Python de Milvus</a>. Puede ser simplemente desplegado con <code translate="no">pip install pymilvus</code>.</p>
<p>Con Milvus Lite, ¡puede empezar a construir una aplicación de IA con búsqueda de similitud vectorial en cuestión de minutos! Milvus Lite es bueno para ejecutarse en el siguiente entorno:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>Portátiles</li>
<li>Dispositivos Edge</li>
</ul>
<p>Milvus Lite comparte la misma API con Milvus Standalone y Distributed, y cubre la mayoría de las características como la persistencia y gestión de datos vectoriales, operaciones CRUD vectoriales, búsqueda vectorial dispersa y densa, filtrado de metadatos, búsqueda multivectorial e híbrida. Juntos, proporcionan una experiencia coherente en distintos tipos de entornos, desde dispositivos de borde hasta clústeres en la nube, adaptándose a casos de uso de distinto tamaño. Con el mismo código del lado del cliente, puede ejecutar aplicaciones GenAI con Milvus Lite en un portátil o Jupyter Notebook, o Milvus Standalone en un contenedor Docker, o Milvus Distributed en un clúster Kubernetes a escala masiva que sirve miles de millones de vectores en producción.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite actualmente soporta los siguientes entornos:</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64 y arm64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon M1/M2 y x86_64)</li>
</ul>
<p>Tenga en cuenta que Milvus Lite sólo es adecuado para casos de uso de búsqueda vectorial a pequeña escala. Para un caso de uso a gran escala, recomendamos utilizar <a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a> o <a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributed</a>. También puede considerar Milvus totalmente gestionado en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Configurar Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Recomendamos utilizar <code translate="no">pymilvus</code>. Dado que <code translate="no">milvus-lite</code> está incluido en <code translate="no">pymilvus</code> versión 2.4.2 o superior, puede <code translate="no">pip install</code> con <code translate="no">-U</code> para forzar la actualización a la última versión y <code translate="no">milvus-lite</code> se instala automáticamente.</p>
<p>Si desea instalar explícitamente el paquete <code translate="no">milvus-lite</code>, o tiene instalada una versión anterior de <code translate="no">milvus-lite</code> y desea actualizarla, puede hacerlo con <code translate="no">pip install -U milvus-lite</code>.</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Conectarse a Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>En <code translate="no">pymilvus</code>, especifique un nombre de archivo local como parámetro uri de MilvusClient utilizará Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
client = <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Después de ejecutar el fragmento de código anterior, se generará un archivo de base de datos llamado <strong>milvus_demo.db</strong> en la carpeta actual.</p>
<blockquote>
<p><strong><em>NOTA:</em></strong> Tenga en cuenta que la misma API también se aplica a Milvus Standalone, Milvus Distributed y Zilliz Cloud, la única diferencia es sustituir el nombre del archivo local por el punto final del servidor remoto y las credenciales, por ejemplo<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code>.</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación se muestra una sencilla demostración de cómo utilizar Milvus Lite para la búsqueda de texto. Hay <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">ejemplos</a> más completos para usar Milvus Lite para construir aplicaciones como <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>, <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/image_search_with_milvus.ipynb">búsqueda de imágenes</a>, y el uso de Milvus Lite en el popular marco RAG como <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a> y <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando ejecute Milvus Lite, tenga en cuenta que algunas características no están soportadas. Las siguientes tablas resumen los límites de uso de Milvus Lite.</p>
<h3 id="Collection" class="common-anchor-header">Colección</h3><table>
<thead>
<tr><th>Método / Parámetro</th><th>Soportado en Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">crear_colección()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (Sólo admite <code translate="no">Strong</code>; Cualquier configuración será tratada como <code translate="no">Strong</code>.)</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>Admite la obtención de estadísticas de colección.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code> <code translate="no">consistency_level</code> y en la respuesta no son válidos. <code translate="no">collection_id</code> </td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>Permite comprobar si existe una colección.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>Permite listar todas las colecciones.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">soltar_colección()</a></td><td>Permite eliminar una colección.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">renombrar_colección()</a></td><td>No permite renombrar una colección.</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">Campo y esquema</h3><table>
<thead>
<tr><th>Método / Parámetro</th><th>Soportado en Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">crear_esquema()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">Insertar y buscar</h3><table>
<thead>
<tr><th>Método / Parámetro</th><th>Soportado en Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">buscar()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">consulta()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">get()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">eliminar()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">insertar()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>Soporte con parámetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">Carga y liberación</h3><table>
<thead>
<tr><th>Método / Parámetro</th><th>Soportado en Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">load_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">liberar_colección()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">obtener_estado_carga()</a></td><td>No se admite la obtención del estado de carga.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>No es posible cargar los datos descargados de una colección cargada.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">cerrar()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">Índice</h3><table>
<thead>
<tr><th>Método / Parámetro</th><th>Soportado en Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>Se admite el listado de índices.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">crear_índice()</a></td><td>Sólo admite el tipo de índice <code translate="no">FLAT</code>.</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>Admite la eliminación de índices.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describir_índice()</a></td><td>Se admite la descripción de índices.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">Tipos de índice vectorial</h3><p>Milvus Lite sólo admite <a href="https://milvus.io/docs/index.md?tab=floating#FLAT">el</a> tipo de índice <a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a>. Utiliza el tipo FLAT independientemente del tipo de índice especificado en la colección.</p>
<h3 id="Search-Features" class="common-anchor-header">Características de búsqueda</h3><p>Milvus Lite admite vectores dispersos, multivectores y búsqueda híbrida.</p>
<h3 id="Partition" class="common-anchor-header">Partición</h3><p>Milvus Lite no soporta particiones ni métodos relacionados con particiones.</p>
<h3 id="Users--Roles" class="common-anchor-header">Usuarios y roles</h3><p>Milvus Lite no soporta usuarios y roles y métodos relacionados.</p>
<h3 id="Alias" class="common-anchor-header">Alias</h3><p>Milvus Lite no soporta alias ni métodos relacionados con alias.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migración de datos desde Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Todos los datos almacenados en Milvus Lite se pueden exportar y cargar fácilmente en otros tipos de despliegue de Milvus, como Milvus Standalone en Docker, Milvus Distributed en K8s, o Milvus totalmente gestionado en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<p>Milvus Lite proporciona una herramienta de línea de comandos que puede volcar datos en un archivo json, que se puede importar en <a href="https://github.com/milvus-io/milvus">milvus</a> y <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(el servicio en la nube totalmente gestionado para Milvus). El comando milvus-lite se instalará junto con el paquete python milvus-lite.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Install</span>
pip install -U <span class="hljs-string">&quot;pymilvus[bulk_writer]&quot;</span>

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --<span class="hljs-built_in">help</span>            show this <span class="hljs-built_in">help</span> message and <span class="hljs-built_in">exit</span>
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage <span class="hljs-built_in">dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>El siguiente ejemplo vuelca todos los datos de la colección <code translate="no">demo_collection</code> almacenados en <code translate="no">./milvus_demo.db</code> (archivo de base de datos de Milvus Lite)</p>
<p>Para exportar datos:</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-comment"># ./milvus_demo.db: milvus lite db file</span>
<span class="hljs-comment"># demo_collection: collection that need to be dumped</span>
<span class="hljs-comment">#./data_dir : dump file storage dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>Con el archivo de volcado, puede cargar datos a Zilliz Cloud a través de <a href="https://docs.zilliz.com/docs/data-import">Data Import</a>, o cargar datos a servidores Milvus a través de <a href="https://milvus.io/docs/import-data.md">Bulk Insert</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez conectado a Milvus Lite, puede:</p>
<ul>
<li><p>Comprobar <a href="/docs/es/v2.4.x/quickstart.md">el Inicio Rápido</a> para ver lo que Milvus puede hacer.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/v2.4.x/manage_databases.md">Gestionar Bases de Datos</a></li>
<li><a href="/docs/es/v2.4.x/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/v2.4.x/manage-partitions.md">Gestionar Particiones</a></li>
<li><a href="/docs/es/v2.4.x/insert-update-delete.md">Insertar, Subinsertar y Eliminar</a></li>
<li><a href="/docs/es/v2.4.x/single-vector-search.md">Búsqueda monovectorial</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda Híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-helm.md">Actualice Milvus utilizando Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/v2.4.x/scaleout.md">Escale su cluster Milvus</a>.</p></li>
<li><p>Despliegue su clúster Milvus en nubes:</p>
<ul>
<li><a href="/docs/es/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/es/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Explore <a href="/docs/es/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para depurar Milvus y actualizaciones dinámicas de configuración.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/v2.4.x/monitor.md">Supervise Milvus con Prometheus</a>.</p></li>
</ul>
