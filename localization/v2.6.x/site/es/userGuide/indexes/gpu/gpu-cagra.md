---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  El índice GPU_CAGRA es un índice basado en grafos optimizado para GPU. El uso
  de GPUs de grado inferencia para ejecutar la versión Milvus GPU puede resultar
  más rentable en comparación con el uso de costosas GPUs de grado
  entrenamiento.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>GPU_CAGRA</strong> es un índice basado en grafos optimizado para GPU. El uso de GPUs de grado inferencia para ejecutar la versión Milvus GPU puede ser más rentable en comparación con el uso de GPUs caras de grado entrenamiento.</p>
<h2 id="Build-index" class="common-anchor-header">Construir el índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para construir un índice <code translate="no">GPU_CAGRA</code> sobre un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando el <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">GPU_CAGRA</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos métricos</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice. Para conocer más parámetros de construcción disponibles para el índice <code translate="no">GPU_CAGRA</code>, consulte <a href="/docs/es/gpu-cagra.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando el método <code translate="no">create_index()</code> directamente o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
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
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice. Para obtener más información sobre los parámetros de búsqueda disponibles para el índice <code translate="no">GPU_CAGRA</code>, consulte <a href="/docs/es/gpu-cagra.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</li>
</ul>
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
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/gpu-cagra.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor predeterminado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>Afecta a la recuperación y al tiempo de construcción al determinar el grado del gráfico antes de la poda. Los valores recomendados son <code translate="no">32</code> o <code translate="no">64</code>.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>Afecta al rendimiento de la búsqueda y a la recuperación estableciendo el grado del gráfico después de la poda. Una mayor diferencia entre estos dos grados se traduce en un mayor tiempo de construcción. Su valor debe ser menor que el de <code translate="no">intermediate_graph_degree</code>.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>Selecciona el algoritmo de generación del grafo antes de la poda. Valores posibles:</p>
<ul>
<li><p><code translate="no">IVF_PQ</code>: Ofrece mayor calidad pero menor tiempo de construcción.</p></li>
<li><p><code translate="no">NN_DESCENT</code>: Proporciona una construcción más rápida con una recuperación potencialmente menor.</p></li>
</ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decide si almacenar en caché el conjunto de datos original en la memoria de la GPU. Valores posibles:</p>
<ul>
<li><p><code translate="no">"true"</code>: Almacena en caché el conjunto de datos original para mejorar la recuperación refinando los resultados de la búsqueda.</p></li>
<li><p><code translate="no">"false"</code>: No almacena en caché el conjunto de datos original para ahorrar memoria en la GPU.</p></li>
</ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>Decide si se utiliza la GPU para la creación de índices y la CPU para la búsqueda. Si se establece este parámetro en <code translate="no">"true"</code>, se requiere la presencia del parámetro <code translate="no">ef</code> en las peticiones de búsqueda.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">search_params.params</code> cuando se <a href="/docs/es/gpu-cagra.md#Search-on-index">realizan búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor por defecto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>Determina el tamaño de los resultados intermedios conservados durante la búsqueda. Un valor mayor puede mejorar la recuperación a expensas del rendimiento de la búsqueda. Debe ser al menos igual al valor final top-k (límite) y suele ser una potencia de 2 (por ejemplo, 16, 32, 64, 128).</p></td>
     <td><p>Vacío</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>Especifica el número de puntos de entrada en el gráfico CAGRA durante la búsqueda. Aumentar este valor puede mejorar la recuperación, pero puede afectar al rendimiento de la búsqueda (por ejemplo, 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Vacío</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>Controla el proceso de iteración de la búsqueda. Por defecto, se establecen en <code translate="no">0</code>, y CAGRA determina automáticamente el número de iteraciones basándose en <code translate="no">itopk_size</code> y <code translate="no">search_width</code>. Ajustar estos valores manualmente puede ayudar a equilibrar el rendimiento y la precisión.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>Especifica el número de subprocesos CUDA utilizados para calcular la distancia métrica en la GPU. Los valores comunes son una potencia de 2 hasta 32 (por ejemplo, 2, 4, 8, 16, 32). Tiene un impacto menor en el rendimiento de la búsqueda. El valor por defecto es <code translate="no">0</code>, donde Milvus selecciona automáticamente <code translate="no">team_size</code> basándose en la dimensión del vector.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Especifica el compromiso entre tiempo de búsqueda y precisión. Un valor más alto de <code translate="no">ef</code> conduce a una búsqueda más precisa pero más lenta. Este parámetro es obligatorio si establece <code translate="no">adapt_for_cpu</code> a <code translate="no">true</code> cuando construye el índice.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
