---
id: sparse-inverted-index.md
title: ÍNDICE_ESPARCIDO_INVERTIDO
summary: >-
  El índice SPARSE_INVERTED_INDEX es un tipo de índice utilizado por Milvus para
  almacenar y buscar vectores dispersos de forma eficiente. Este tipo de índice
  aprovecha los principios de la indexación invertida para crear una estructura
  de búsqueda muy eficiente para datos dispersos.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">ÍNDICE_ESPARCIDO_INVERTIDO<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <code translate="no">SPARSE_INVERTED_INDEX</code> es un tipo de índice utilizado por Milvus para almacenar y buscar eficientemente vectores dispersos. Este tipo de índice aprovecha los principios de la indexación invertida para crear una estructura de búsqueda altamente eficiente para datos dispersos. Para más información, consulte <a href="/docs/es/inverted.md">INVERTED</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Crear un índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para construir un índice <code translate="no">SPARSE_INVERTED_INDEX</code> en un campo de vectores dispersos en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor a <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La métrica utilizada para calcular la similitud entre vectores dispersos. Valores válidos:</p>
<ul>
<li><p><code translate="no">IP</code> (Producto interior): Mide la similitud utilizando el producto punto.</p></li>
<li><p><code translate="no">BM25</code>: Se utiliza normalmente para la búsqueda de texto completo, centrándose en la similitud textual.</p>
<p>Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a> y <a href="/docs/es/full-text-search.md">búsqueda de texto completo</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: El algoritmo utilizado para construir y consultar el índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (por defecto): Procesamiento optimizado de consultas documento a documento (DAAT) mediante el algoritmo MaxScore. MaxScore proporciona un mejor rendimiento para valores altos de <em>k</em> o consultas con muchos términos al omitir términos y documentos que probablemente tengan un impacto mínimo. Para ello, divide los términos en grupos esenciales y no esenciales en función de sus puntuaciones máximas de impacto, centrándose en los términos que pueden contribuir a los resultados k más importantes.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Procesamiento optimizado de consultas DAAT mediante el algoritmo WAND. WAND evalúa un menor número de documentos coincidentes aprovechando las puntuaciones de impacto máximo para omitir los documentos no competitivos, pero tiene una mayor sobrecarga por coincidencia. Esto hace que WAND sea más eficiente para consultas con valores de <em>k</em> pequeños o consultas cortas, en las que saltar es más factible.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Procesamiento de consultas básicas término a término (TAAT). Aunque es más lento que <code translate="no">DAAT_MAXSCORE</code> y <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> ofrece una ventaja única. A diferencia de los algoritmos DAAT, que utilizan puntuaciones de impacto máximo almacenadas en caché que permanecen estáticas independientemente de los cambios en el parámetro de recopilación global (avgdl), <code translate="no">TAAT_NAIVE</code> se adapta dinámicamente a dichos cambios.</p></li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">SPARSE_INVERTED_INDEX</code>, consulte <a href="/docs/es/sparse-inverted-index.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método <code translate="no">create_index()</code> o pasando los parámetros del índice al método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Búsqueda en el índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas por similitud en el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre los parámetros de búsqueda disponibles para el índice <code translate="no">SPARSE_INVERTED_INDEX</code>, consulte <a href="/docs/es/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">Parámetros de búsqueda específicos del índice</a>.</p>
<h2 id="Index-params" class="common-anchor-header">Parámetros del índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección se ofrece una descripción general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/sparse-inverted-index.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>El algoritmo utilizado para construir y consultar el índice. Determina cómo procesa el índice las consultas.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (por defecto), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Utilice <code translate="no">"DAAT_MAXSCORE"</code> para escenarios con valores de k altos o consultas con muchos términos, que pueden beneficiarse de saltarse documentos no competitivos. </p><p>Elija <code translate="no">"DAAT_WAND"</code> para consultas con valores de k pequeños o consultas cortas para aprovechar una omisión más eficiente.</p><p>Utilice <code translate="no">"TAAT_NAIVE"</code> si se requiere un ajuste dinámico a los cambios de la colección (por ejemplo, avgdl).</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>En la tabla siguiente se enumeran los parámetros que pueden configurarse en <code translate="no">search_params.params</code> cuando se <a href="/docs/es/sparse-inverted-index.md#Search-on-index">realizan búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>La proporción de los valores más pequeños a ignorar durante la búsqueda, ayudando a reducir el ruido.</p></td>
     <td><p>Fracción entre 0,0 y 1,0 (por ejemplo, 0,2 ignora el 20% de los valores más pequeños).</p></td>
     <td><p>Ajuste este parámetro en función de la dispersión y el nivel de ruido de sus vectores de consulta.</p><p>Este parámetro controla la proporción de valores de baja magnitud descartados durante la búsqueda. Aumentar este valor (por ejemplo, a <code translate="no">0.2</code>) puede reducir el ruido y centrar la búsqueda en los componentes más significativos, lo que puede mejorar la precisión y la eficacia. Sin embargo, descartar más valores también puede reducir la recuperación al excluir señales potencialmente relevantes. Elija un valor que equilibre la recuperación y la precisión para su carga de trabajo.</p></td>
   </tr>
</table>
