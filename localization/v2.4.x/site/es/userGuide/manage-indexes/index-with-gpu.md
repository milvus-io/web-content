---
id: index-with-gpu.md
order: 3
summary: >-
  Esta guía explica cómo construir un índice con soporte GPU en Milvus para
  mejorar el rendimiento de la búsqueda.
title: Índice con GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Índice con GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe los pasos para construir un índice con soporte GPU en Milvus, que puede mejorar significativamente el rendimiento de la búsqueda en escenarios de alto rendimiento y alta recuperación. Para más detalles sobre los tipos de índices GPU soportados por Milvus, consulte <a href="/docs/es/v2.4.x/gpu_index.md">Índice GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configure los ajustes de Milvus para el control de la memoria de la GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus utiliza un pool de memoria gráfica global para asignar memoria GPU.</p>
<p>Admite dos parámetros <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> en el <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">archivo de configuración de Milvus</a>. El tamaño del pool se establece inicialmente en <code translate="no">initMemSize</code>, y se ampliará automáticamente a <code translate="no">maxMemSize</code> una vez superado este límite.</p>
<p>El valor por defecto <code translate="no">initMemSize</code> es 1/2 de la memoria GPU disponible cuando Milvus se inicia, y el valor por defecto <code translate="no">maxMemSize</code> es igual a toda la memoria GPU disponible.</p>
<p>Hasta Milvus 2.4.1( incluyendo la versión 2.4.1), Milvus utilizaba un pool de memoria GPU unificado. Para versiones anteriores a la 2.4.1( incluyendo la versión 2.4.1), se recomendaba poner ambos valores a 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partir de Milvus 2.4.1, el pool de memoria de la GPU sólo se utiliza para datos temporales de la GPU durante las búsquedas. Por lo tanto, se recomienda establecerla en 2048 y 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Construir un índice<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes ejemplos muestran cómo construir índices GPU de diferentes tipos.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Preparar los parámetros del índice</h3><p>Al configurar los parámetros de índice de la GPU, defina <strong>index_type</strong>, <strong>metric_type</strong> y <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(cadena</em>): El tipo de índice utilizado para acelerar la búsqueda vectorial. Las opciones válidas son <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> y <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(cadena</em>): El tipo de métrica utilizada para medir la similitud de los vectores. Las opciones válidas son <strong>IP</strong> y <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): Los parámetros de construcción específicos del índice. Las opciones válidas para este parámetro dependen del tipo de índice.</p></li>
</ul>
<p>A continuación se muestran configuraciones de ejemplo para distintos tipos de índice:</p>
<ul>
<li><p>Índice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Las opciones posibles para <strong>params</strong> incluyen:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): Afecta a la recuperación y al tiempo de construcción al determinar el grado del gráfico antes de la poda. Los valores recomendados son <strong>32</strong> o <strong>64</strong>.</p></li>
<li><p><strong>grado_grafico</strong><em>(int</em>): Afecta al rendimiento de la búsqueda y a la recuperación estableciendo el grado del gráfico después de la poda. Normalmente, es la mitad del <strong>grado_grafo_intermedio</strong>. Una diferencia mayor entre estos dos grados se traduce en un tiempo de construcción más largo. Su valor debe ser menor que el de <strong>grado_grafo_intermedio</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(cadena</em>): Selecciona el algoritmo de generación de grafos antes de la poda. Opciones posibles:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Ofrece mayor calidad pero un tiempo de construcción más lento.</p></li>
<li><p><strong>NN_DESCENT</strong>: Proporciona una construcción más rápida con una recuperación potencialmente menor.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(cadena</em>, <strong>"true"</strong> | <strong>"false")</strong>: Decide si se almacena en caché el conjunto de datos original en la memoria de la GPU. Si se establece en <strong>"</strong> <strong>true"</strong> se mejora la recuperación al refinar los resultados de búsqueda, mientras que si se establece en <strong>"false"</strong> se conserva la memoria de la GPU.</p></li>
</ul></li>
<li><p>Índice<strong>GPU_IVF_FLAT</strong> o <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Las opciones <strong>params</strong> son idénticas a las utilizadas en <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> e <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong> índice</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>No se requieren configuraciones <strong>params</strong> adicionales.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Construir índice</h3><p>Después de configurar los parámetros del índice en <strong>index_params</strong>, llama al método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> para construir el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Buscar en<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez construido el índice GPU, el siguiente paso es preparar los parámetros de búsqueda antes de realizar una búsqueda.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Preparar los parámetros de búsqueda</h3><p>A continuación se muestran configuraciones de ejemplo para diferentes tipos de índices:</p>
<ul>
<li><p>Índice<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>No es necesario configurar ningún <strong>parámetro</strong> adicional.</p></li>
<li><p>Índice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Los parámetros clave de búsqueda son</p>
<ul>
<li><p><strong>itopk_size</strong>: Determina el tamaño de los resultados intermedios guardados durante la búsqueda. Un valor mayor puede mejorar la recuperación a expensas del rendimiento de la búsqueda. Debe ser al menos igual al valor final top-k<strong>(límite</strong>) y suele ser una potencia de 2 (por ejemplo, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Especifica el número de puntos de entrada en el gráfico CAGRA durante la búsqueda. Aumentar este valor puede mejorar la recuperación, pero puede afectar al rendimiento de la búsqueda.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Estos parámetros controlan el proceso de iteración de la búsqueda. Por defecto, están fijados en <strong>0</strong>, y CAGRA determina automáticamente el número de iteraciones en función de <strong>itopk_size</strong> y <strong>search_width</strong>. Ajustar estos valores manualmente puede ayudar a equilibrar el rendimiento y la precisión.</p></li>
<li><p><strong>tamaño_equipo</strong>: Especifica el número de subprocesos CUDA utilizados para calcular la distancia métrica en la GPU. Los valores habituales son una potencia de 2 hasta 32 (por ejemplo, 2, 4, 8, 16, 32). Tiene un impacto menor en el rendimiento de la búsqueda. El valor por defecto es <strong>0</strong>, donde Milvus selecciona automáticamente el <strong>team_size</strong> basado en la dimensión del vector.</p></li>
</ul></li>
<li><p>Índice <strong>GPU_IVF_FLAT</strong> o <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Los parámetros de búsqueda para estos dos tipos de índice son similares a los utilizados en <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> e <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Para obtener más información, consulte <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Realizar una búsqueda de similitud vectorial</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Realizar una búsqueda</h3><p>Utilice el método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> para realizar una búsqueda de similitud vectorial en el índice GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
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
    </button></h2><p>Cuando utilice índices GPU, tenga en cuenta ciertas restricciones:</p>
<ul>
<li><p>Para <strong>GPU_IVF_FLAT</strong>, el valor máximo de <strong>límite</strong> es 1024.</p></li>
<li><p>Para <strong>GPU_IVF_PQ</strong> y <strong>GPU_CAGRA</strong>, el valor máximo de <strong>limit</strong> es 1024.</p></li>
<li><p>Aunque no hay un <strong>límite</strong> establecido para <strong>GPU_BRUTE_FORCE</strong>, se recomienda no superar los 4096 para evitar posibles problemas de rendimiento.</p></li>
<li><p>Actualmente, los índices GPU no soportan la distancia COSINE. Si se requiere la distancia COSINE, los datos deben ser normalizados en primer lugar, y luego la distancia de producto interno (IP) se puede utilizar como sustituto.</p></li>
<li><p>La carga de la protección OOM para los índices de la GPU no está totalmente soportada, demasiados datos pueden provocar fallos en el QueryNode.</p></li>
<li><p>Los índices GPU no soportan funciones de búsqueda como la <a href="https://milvus.io/docs/single-vector-search.md#Range-search">búsqueda por rango</a> y la <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">búsqueda por agrupación</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PREGUNTAS FRECUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>¿Cuándo es apropiado utilizar un índice GPU?</strong></p>
<p>Un índice de GPU es especialmente beneficioso en situaciones que exigen un alto rendimiento o una alta recuperación. Por ejemplo, cuando se trata de grandes lotes, el rendimiento de la indexación en la GPU puede superar hasta 100 veces el de la indexación en la CPU. En situaciones con lotes más pequeños, los índices de la GPU siguen superando significativamente a los de la CPU en términos de rendimiento. Además, si se requiere una rápida inserción de datos, la incorporación de una GPU puede acelerar sustancialmente el proceso de creación de índices.</p></li>
<li><p><strong>¿En qué escenarios son más adecuados los índices de GPU como CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT y GPU_BRUTE_FORCE?</strong></p>
<p>Los índices CAGRA son ideales para escenarios que exigen un mayor rendimiento, aunque a costa de consumir más memoria. Para entornos en los que la conservación de la memoria es una prioridad, el índice <strong>GPU_IVF_PQ</strong> puede ayudar a minimizar los requisitos de almacenamiento, aunque esto viene acompañado de una mayor pérdida de precisión. El índice <strong>GPU_IVF_FLAT</strong> sirve como opción equilibrada, ofreciendo un compromiso entre rendimiento y consumo de memoria. Por último, el índice <strong>GPU_BRUTE_FORCE</strong> está diseñado para operaciones de búsqueda exhaustiva, garantizando una tasa de recuperación de 1 mediante la realización de búsquedas transversales.</p></li>
</ul>
