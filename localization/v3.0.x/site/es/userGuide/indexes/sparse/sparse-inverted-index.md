---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  El índice SPARSE_INVERTED_INDEX es un tipo de índice que utiliza Milvus para
  almacenar y buscar vectores dispersos de forma eficiente. Este tipo de índice
  aprovecha los principios de la indexación invertida para crear una estructura
  de búsqueda altamente eficiente para datos dispersos.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice « <code translate="no">SPARSE_INVERTED_INDEX</code> » es un tipo de índice que utiliza Milvus para almacenar y buscar vectores dispersos de forma eficiente. Crea una estructura invertida a partir de las dimensiones distintas de cero de los vectores dispersos. Este índice se puede utilizar para la búsqueda de texto completo BM25 y para la búsqueda de incrustaciones dispersas basada en el producto interno.</p>
<p>Para obtener más información sobre los campos de vectores dispersos, los tipos de métricas y la búsqueda de texto completo, consulta <a href="/docs/es/sparse_vector.md">«Vectores dispersos</a>, <a href="/docs/es/metric.md">tipos de métricas</a> y <a href="/docs/es/full-text-search.md">búsqueda de texto completo</a>».</p>
<h2 id="Build-index" class="common-anchor-header">Crear índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para crear un índice « <code translate="no">SPARSE_INVERTED_INDEX</code> » en un campo de vectores dispersos en Milvus, utiliza el método « <code translate="no">add_index()</code> » y especifica los parámetros « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » e «index».</p>
<p>Para la búsqueda de texto completo con BM25, cree el índice sobre el campo de vectores dispersos generado por una función BM25. Establezca ` <code translate="no">metric_type</code> ` en ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Para la búsqueda con incrustación dispersa, cree el índice en un campo de vectores dispersos que almacene vectores dispersos generados externamente. Establezca <code translate="no">metric_type</code> en <code translate="no">IP</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>En las configuraciones anteriores:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. Establece este valor en <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La métrica utilizada para calcular la similitud entre vectores dispersos. Valores válidos:</p>
<ul>
<li><p><code translate="no">BM25</code>: Utiliza la puntuación de relevancia BM25 para la búsqueda de texto completo.</p></li>
<li><p><code translate="no">IP</code> (Producto escalar): Mide la similitud entre vectores dispersos mediante el producto escalar.</p></li>
</ul>
<p>Para más detalles, consulta <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a> y <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: El algoritmo utilizado para crear y consultar el índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Procesamiento de consultas «Document-at-a-Time» con MaxScore. Este es el valor predeterminado para <code translate="no">BM25</code>. Para obtener más información, consulta <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">«Evaluación</a> de <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">consultas: estrategias y optimizaciones</a>».</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Procesamiento de consultas «Document-at-a-Time» con WAND. Este algoritmo es adecuado para valores topK más pequeños o consultas más cortas. Para más información, consulte <a href="https://dl.acm.org/doi/10.1145/956863.956944">«Evaluación eficiente de consultas mediante un proceso de recuperación de dos niveles</a>».</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Procesamiento básico de consultas «término por término». Utilice esta opción como referencia o cuando necesite que la puntuación se adapte dinámicamente a las estadísticas globales de la colección, como la longitud media de los documentos.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Procesamiento de consultas MaxScore con metadatos de puntuación máxima a nivel de bloque. Para más información, consulte <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Recuperación más rápida de documentos Top-k mediante índices Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Procesamiento de consultas WAND con metadatos de puntuación máxima a nivel de bloque. Para más información, consulte <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Recuperación más rápida</a> de <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">los k documentos principales mediante índices Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Un índice invertido disperso basado en ventanas fijas de identificadores de documento, con aceleración SIMD para la búsqueda. Esta es la opción predeterminada para <code translate="no">IP</code>. Para más detalles, consulta el <a href="https://arxiv.org/abs/2509.08395">artículo</a> sobre <a href="https://arxiv.org/abs/2509.08395">SINDI</a>.</p></li>
</ul>
<p>Si no se especifica <code translate="no">inverted_index_algo</code>, Milvus selecciona el algoritmo predeterminado según <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> para <code translate="no">BM25</code> y <code translate="no">SINDI</code> para <code translate="no">IP</code>.</p>
<p>Para obtener más información sobre los parámetros de creación disponibles para el índice « <code translate="no">SPARSE_INVERTED_INDEX</code> », consulta <a href="/docs/es/sparse-inverted-index.md#Index-building-params">«Parámetros de creación</a> de <a href="/docs/es/sparse-inverted-index.md#Index-building-params">índices</a>».</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método ` <code translate="no">create_index()</code> ` o pasando los parámetros del índice en el método ` <code translate="no">create_collection</code> `. Para obtener más detalles, consulte <a href="/docs/es/create-collection.md">«Crear colección</a>».</p>
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
    </button></h2><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas de similitud en el índice.</p>
<p>Para la búsqueda de texto completo BM25, utiliza texto sin formato como consulta. Milvus convierte el texto de la consulta en un vector disperso mediante la función BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Para la búsqueda con incrustaciones dispersas, utilice un diccionario de vectores dispersos como vector de consulta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>De forma predeterminada, Milvus utiliza el algoritmo de búsqueda configurado para el índice.</p>
<p>Para obtener más información sobre los parámetros de búsqueda disponibles para el índice « <code translate="no">SPARSE_INVERTED_INDEX</code> », consulta <a href="/docs/es/sparse-inverted-index.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</p>
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
    </button></h2><p>Esta sección ofrece una visión general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/sparse-inverted-index.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>El algoritmo utilizado para crear y consultar el índice. Determina cómo procesa el índice las consultas.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Valor por defecto: <code translate="no">"DAAT_MAXSCORE"</code> para <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> para <code translate="no">IP</code>.</p></td>
     <td><p>Utilice <code translate="no">"DAAT_MAXSCORE"</code> para cargas de trabajo de búsqueda de texto completo de BM25 con valores k elevados o consultas con muchos términos.</p><p>Utilice <code translate="no">"DAAT_WAND"</code> para cargas de trabajo de BM25 con valores k pequeños o consultas cortas.</p><p>Utilice <code translate="no">"TAAT_NAIVE"</code> como referencia, o cuando necesite que la puntuación se adapte dinámicamente a las estadísticas globales de la colección, como la longitud media de los documentos.</p><p>Utilice <code translate="no">"BLOCK_MAX_MAXSCORE"</code> o <code translate="no">"BLOCK_MAX_WAND"</code> para emplear metadatos de puntuación máxima a nivel de bloque en la poda de consultas.</p><p>Utilice <code translate="no">"SINDI"</code> para la búsqueda con incrustaciones dispersas con <code translate="no">IP</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Controla la saturación de la frecuencia de términos para la puntuación BM25. Este parámetro solo se aplica cuando <code translate="no">metric_type</code> es <code translate="no">BM25</code>.</p></td>
     <td><p>Rango recomendado: [1,2; 2,0]</p><p>Valor por defecto: 1,2</p></td>
     <td><p>Aumenta este valor para dar más peso a la frecuencia de los términos en la clasificación de los documentos.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Controla la intensidad de la normalización de la longitud del documento para la puntuación BM25. Este parámetro solo se aplica cuando <code translate="no">metric_type</code> es <code translate="no">BM25</code>.</p></td>
     <td><p>Rango: [0, 1]</p><p>Valor por defecto: 0,75</p></td>
     <td><p>Utilice un valor más alto para aplicar una normalización de la longitud más intensa. Utilice un valor más bajo para reducir el efecto de la longitud del documento en la clasificación.</p></td>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/sparse-inverted-index.md#Search-on-index">realizar búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Proporción de los valores más pequeños que se deben ignorar durante la búsqueda, lo que ayuda a reducir el ruido.</p></td>
     <td><p>Rango: [0,0; 1,0) (por ejemplo, 0,2 ignora el 20 % de los valores más pequeños)</p></td>
     <td><p>Ajuste este parámetro en función de la dispersión y el nivel de ruido de sus vectores de consulta.</p><p>Este parámetro controla la proporción de valores de baja magnitud que se descartan durante la búsqueda. Aumentar este valor (por ejemplo, a <code translate="no">0.2</code>) puede reducir el ruido y centrar la búsqueda en componentes más significativos, lo que puede mejorar la precisión y la eficiencia. Sin embargo, descartar más valores también puede reducir la recuperación al excluir señales potencialmente relevantes. Elige un valor que equilibre la recuperación y la precisión para tu carga de trabajo.</p></td>
   </tr>
</table>
