---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  Utiliza la función de transferencia de índices FAISS para proporcionar cadenas
  de la fábrica de índices FAISS y parámetros de búsqueda específicos de dicha
  fábrica en Milvus 3.0.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p>El tipo de índice « <code translate="no">FAISS</code> » es una opción de nivel avanzado disponible en Milvus 3.0.0 y versiones posteriores. Permite proporcionar una <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">cadena de fábrica de índices Faiss</a> en lugar de seleccionar un tipo de índice Milvus fijo.</p>
<p>Utiliza « <code translate="no">FAISS</code> » cuando ya dispongas de una receta de Faiss probada y necesites un control directo sobre su composición. Para recetas comunes con un tipo de índice específico de Milvus, es preferible utilizar el tipo específico, ya que cuenta con un contrato de parámetros estable y documentado.</p>
<div class="alert note">
<p>Una cadena de fábrica aceptada por Faiss (upstream) no es compatible automáticamente con Milvus. La compatibilidad depende del tipo de campo vectorial, la métrica, la dimensión, los módulos de Faiss compilados en la imagen de Milvus y de si el índice resultante admite las operaciones que requiere Milvus.</p>
</div>
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
    </button></h2><ul>
<li><p><code translate="no">FAISS</code> Admite los campos « <code translate="no">FLOAT_VECTOR</code> » y « <code translate="no">BINARY_VECTOR</code> ». No admite los campos « <code translate="no">FLOAT16_VECTOR</code> », « <code translate="no">BFLOAT16_VECTOR</code> », « <code translate="no">INT8_VECTOR</code> » ni « <code translate="no">SPARSE_FLOAT_VECTOR</code> ».</p></li>
<li><p>El adaptador genérico « <code translate="no">FAISS</code> » se ejecuta en la CPU. No es un tipo de índice de Faiss para GPU.</p></li>
<li><p>El parámetro de compilación « <code translate="no">faiss_index_name</code> » es obligatorio. Milvus pasa su valor a Faiss sin convertir la receta a un tipo de índice específico de Milvus.</p></li>
<li><p>Los parámetros de compilación y búsqueda son específicos de cada fábrica. Un parámetro compatible con una fábrica puede ser rechazado por otra.</p></li>
<li><p>El filtrado escalar requiere que el índice Faiss subyacente admita un selector de ID. Las pruebas de Milvus 3.0.0 cubren la búsqueda filtrada con las fábricas de tipo float « <code translate="no">Flat</code> », « <code translate="no">IVF64,Flat</code> » y « <code translate="no">HNSW16,Flat</code> ». No se debe dar por sentado que todas las fábricas admiten filtros ni que los índices binarios « <code translate="no">FAISS</code> » admitan el filtrado escalar.</p></li>
<li><p>No se admiten iteradores de búsqueda.</p></li>
<li><p>El adaptador no permite la recuperación de vectores sin procesar.</p></li>
<li><p>La compatibilidad con la búsqueda por rango depende de la fábrica. Float <code translate="no">Flat</code> cuenta con cobertura de la versión. No utilices la búsqueda por rango con índices binarios <code translate="no">FAISS</code>.</p></li>
<li><p>Una fábrica puede compilarse correctamente, pero aun así rechazar algunas operaciones de búsqueda de Milvus. Por ejemplo, la versión independiente de <code translate="no">PQ8x4</code> rechaza el selector utilizado por la búsqueda con filtrado escalar. Valida el uso sin filtrar por separado.</p></li>
<li><p>En Milvus 3.0.0, comprueba las puntuaciones de <code translate="no">COSINE</code> y los umbrales de búsqueda por rango tras recargar un índice. Knowhere v3.0.6 no restaura el estado de normalización coseno del adaptador <code translate="no">FAISS</code> durante la deserialización.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>Flujo de trabajo de paso directo del índice FAISS</span>
  
 </span></p>
<p>Para la creación de índices, Milvus reenvía <code translate="no">faiss_index_name</code>, el tipo de campo vectorial, la métrica y otros parámetros de creación al adaptador FAISS de Knowhere. El adaptador llama a <code translate="no">faiss::index_factory()</code> para los campos de tipo « <code translate="no">FLOAT_VECTOR</code> » o a <code translate="no">faiss::index_binary_factory()</code> para los campos de tipo « <code translate="no">BINARY_VECTOR</code> ». El objeto resultante es un índice FAISS nativo gestionado a través del ciclo de vida normal de los índices de Milvus.</p>
<p>Para la búsqueda, el adaptador convierte los parámetros específicos de fábrica proporcionados en el objeto Faiss correspondiente <code translate="no">SearchParameters</code>. Para las fábricas de tipo flotante compatibles, también pasa el conjunto de bits de filtro de Milvus como selector de Faiss. La compatibilidad con los selectores depende de cada fábrica, y las pruebas publicadas no establecen un filtrado escalar para los índices binarios <code translate="no">FAISS</code>. Por este motivo, una receta puede ser válida en Faiss de forma independiente, pero rechazar una operación requerida por la ruta de búsqueda de Milvus.</p>
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
    </button></h2><ul>
<li>Milvus 3.0.0 o posterior</li>
<li>PyMilvus 3.0.0 o posterior</li>
<li>Conocimiento de la sintaxis de las fábricas de índices de Faiss y de los requisitos de entrenamiento de la fábrica seleccionada</li>
</ul>
<p>Para obtener instrucciones de instalación, consulta <a href="/docs/es/install-pymilvus.md">«Instalar PyMilvus</a>».</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Elige una cadena de fábrica<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Una cadena de fábrica describe un índice Faiss como una secuencia de componentes. Los siguientes ejemplos cuentan con cobertura de pruebas de la versión Milvus 3.0.0. Esta lista no es exhaustiva.</p>
<table>
<thead>
<tr><th>Cadena de fábrica</th><th>Tipo de campo</th><th>Métricas evaluadas en las pruebas de la versión</th><th>Parámetros de búsqueda</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Ninguna</td><td>Búsqueda exacta.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>IVF con 64 listas invertidas y vectores sin comprimir.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>Grafo HNSW con almacenamiento de vectores planos.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Específico para cada fábrica</td><td>Combina OPQ, IVF y PQ. Valida el tamaño del entrenamiento y la recuperación con tus datos.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>, <code translate="no">k_factor</code></td><td>Utiliza un refinador plano tras la recuperación de candidatos de PQ.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Ninguno</td><td>Incorpora pruebas de lanzamiento. La búsqueda con filtro escalar falla porque el índice rechaza el selector; comprueba por separado el uso sin filtrar.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>Ninguna</td><td>Búsqueda exacta de vectores binarios.</td></tr>
</tbody>
</table>
<p>Las entradas « <code translate="no">COSINE</code> » indican la cobertura de las pruebas de compilación y búsqueda. En Milvus 3.0.0, no garantizan la corrección de la puntuación ni de la búsqueda por rango tras una recarga del índice. Véase <a href="#limits">«Límites</a>».</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">Compilar y buscar en un índice de tipo flotante<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo crea 3.000 vectores de 128 dimensiones. Esto proporciona datos de entrenamiento suficientes para la receta « <code translate="no">IVF64,Flat</code> » utilizada en el ejemplo. Expande el bloque de configuración y ejecútalo antes de compilar y realizar búsquedas en el índice.</p>
<p><details></p>
<p><summary>Preparar la colección de vectores de tipo float</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Crear el índice<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Configure « <code translate="no">index_type</code> » en « <code translate="no">FAISS</code> » y utilice « <code translate="no">faiss_index_name</code> » para seleccionar la receta de fábrica nativa de Faiss.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>La cadena de fábrica <code translate="no">IVF64,Flat</code> crea un índice IVF con 64 listas invertidas y almacena vectores sin comprimir en cada lista.</p>
<h3 id="Search-the-index" class="common-anchor-header">Buscar en el índice<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Configure los parámetros de búsqueda específicos de la fábrica dentro de <code translate="no">search_params.params</code>. Para una fábrica IVF, <code translate="no">nprobe</code> controla el número de listas invertidas que busca Faiss.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>La consulta utiliza ` <code translate="no">nprobe=8</code>`, por lo que Faiss busca en 8 de las 64 listas invertidas. El filtro restringe los resultados a las entidades cuyo valor de ` <code translate="no">category</code> ` sea ` <code translate="no">reference</code>`.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">Crear y buscar en un índice binario<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para los campos « <code translate="no">BINARY_VECTOR</code> », utiliza una cadena de fábrica binaria como « <code translate="no">BFlat</code> » y una métrica binaria compatible. Expande el bloque de configuración y ejecútalo antes de crear y realizar búsquedas en el índice.</p>
<p><details></p>
<p><summary>Preparar la colección de vectores binarios</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Crear el índice<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza <code translate="no">BFlat</code> como cadena de fábrica y <code translate="no">HAMMING</code> como métrica para este ejemplo de vector binario.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">Realiza una búsqueda en el índice<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> no tiene ningún parámetro de búsqueda específico de la familia. Pase una asignación vacía de « <code translate="no">params</code> » al construir la solicitud de búsqueda.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Cada vector binario de 128 dimensiones se representa mediante 16 bytes. Para obtener más información, consulta <a href="/docs/es/binary-vector.md">«Vector binario</a>».</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">Configurar los parámetros de compilación y búsqueda<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>El tipo de índice « <code translate="no">FAISS</code> » tiene un parámetro de compilación de paso obligatorio.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Ubicación</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in <code translate="no">add_index()</code></td><td>La cadena de la fábrica de índices Faiss. Por ejemplo, <code translate="no">IVF64,Flat</code>.</td></tr>
</tbody>
</table>
<p>Configure los parámetros de búsqueda específicos de la fábrica dentro de <code translate="no">search_params.params</code>. La siguiente tabla recoge ejemplos comunes y no es exhaustiva.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Ejemplo de fábrica</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>Número de listas invertidas que se van a buscar.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>Tamaño de la lista de candidatos de búsqueda HNSW.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>Número de candidatos proporcionados al refinador en relación con el top-K solicitado.</td></tr>
</tbody>
</table>
<p>Milvus solo reenvía los parámetros adicionales reconocidos por el adaptador. Se rechazan las claves de compilación y de búsqueda desconocidas que la familia de fábricas concreta no admite. Milvus no mantiene un esquema de parámetros universal para todas las fábricas posibles. Consulta la documentación de Faiss correspondiente a la fábrica seleccionada y, a continuación, valida el flujo completo de compilación y búsqueda con la versión y la imagen exactas de Milvus que tengas previsto implementar.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">Gestión de errores y operaciones no compatibles<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>Si la cadena de la fábrica no es válida o no está disponible en la compilación de Milvus, la creación del índice fallará. Comprueba el estado del índice y el motivo del fallo antes de cargar la colección.</p></li>
<li><p>Si un parámetro tiene un tipo incorrecto, la búsqueda falla. Por ejemplo, « <code translate="no">nprobe=&quot;invalid&quot;</code> » se rechaza porque « <code translate="no">nprobe</code> » debe ser numérico.</p></li>
<li><p>Si un parámetro no es aplicable a la fábrica creada, el adaptador lo rechaza por no ser compatible.</p></li>
<li><p>Si una fábrica no es compatible con el selector de Milvus, la búsqueda filtrada puede fallar incluso cuando esa misma fábrica pueda realizar búsquedas en Faiss de forma independiente.</p></li>
<li><p>No utilices <code translate="no">search_iterator()</code> con un índice <code translate="no">FAISS</code>.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Descubre cómo se organizan los índices de Milvus en <a href="/docs/es/index-explained.md">«Explicación de los índices</a>».</li>
<li>Compara los tipos de índice específicos <a href="/docs/es/ivf-flat.md">IVF_FLAT</a> y <a href="/docs/es/hnsw.md">HNSW</a>.</li>
<li>Consulta <a href="/docs/es/metric.md">«Tipos de métricas</a> » antes de elegir una métrica para la fábrica.</li>
</ul>
