---
id: scann.md
title: SCANN
summary: >-
  Impulsado por la biblioteca ScaNN de Google, el índice SCANN de Milvus está
  diseñado para hacer frente a los retos de la búsqueda de similitud vectorial a
  escala, logrando un equilibrio entre velocidad y precisión, incluso en grandes
  conjuntos de datos que tradicionalmente plantearían retos para la mayoría de
  los algoritmos de búsqueda.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Impulsado por la biblioteca <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> de Google, el índice <code translate="no">SCANN</code> de Milvus está diseñado para abordar los retos de la búsqueda de similitud vectorial a escala, logrando un equilibrio entre velocidad y precisión, incluso en grandes conjuntos de datos que tradicionalmente plantearían retos para la mayoría de los algoritmos de búsqueda.</p>
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
    </button></h2><p>ScaNN está diseñado para resolver uno de los mayores retos de la búsqueda vectorial: encontrar de forma eficiente los vectores más relevantes en espacios de gran dimensión, incluso cuando los conjuntos de datos son cada vez más grandes y complejos. Su arquitectura divide el proceso de búsqueda vectorial en distintas etapas:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Exploración</span> </span></p>
<ol>
<li><p><strong>Partición</strong>: Divide el conjunto de datos en clusters. Este método reduce el espacio de búsqueda centrándose sólo en los subconjuntos de datos relevantes en lugar de escanear todo el conjunto de datos, lo que ahorra tiempo y recursos de procesamiento. ScaNN suele utilizar algoritmos de agrupación, como <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, para identificar los clusters, lo que le permite realizar búsquedas de similitud de forma más eficiente.</p></li>
<li><p><strong>Cuantización</strong>: ScaNN aplica un proceso de cuantificación conocido como <a href="https://arxiv.org/abs/1908.10396">cuantificación vectorial anisotrópica</a> tras la partición. La cuantización tradicional se centra en minimizar la distancia total entre los vectores originales y los comprimidos, lo que no es ideal para tareas como <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">la búsqueda del producto interior máximo (MIPS)</a>, en la que la similitud viene determinada por el producto interior de los vectores en lugar de por la distancia directa. En su lugar, la cuantización anisotrópica da prioridad a preservar los componentes paralelos entre vectores, o las partes más importantes para calcular productos internos precisos. Este enfoque permite a ScaNN mantener una alta precisión MIPS alineando cuidadosamente los vectores comprimidos con la consulta, lo que permite realizar búsquedas de similitud más rápidas y precisas.</p></li>
<li><p><strong>Reclasificación</strong>: La fase de reordenación es el paso final, en el que ScaNN ajusta los resultados de las etapas de partición y cuantificación. Este reordenamiento aplica cálculos precisos del producto interno a los vectores candidatos más importantes, lo que garantiza que los resultados finales sean muy precisos. El reordenamiento es crucial en los motores de recomendación de alta velocidad o en las aplicaciones de búsqueda de imágenes, donde el filtrado y la agrupación iniciales sirven como capa gruesa, y la etapa final garantiza que sólo se devuelvan al usuario los resultados más relevantes.</p></li>
</ol>
<p>El rendimiento de <code translate="no">SCANN</code> se controla mediante dos parámetros clave que permiten afinar el equilibrio entre velocidad y precisión:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Controla si los datos vectoriales originales se almacenan junto con las representaciones cuantizadas. La activación de este parámetro mejora la precisión durante la reclasificación, pero aumenta los requisitos de almacenamiento.</p></li>
<li><p><code translate="no">reorder_k</code>: Determina cuántos candidatos se refinan durante la fase final de reclasificación. Los valores más altos mejoran la precisión pero aumentan la latencia de la búsqueda.</p></li>
</ul>
<p>Para obtener información detallada sobre la optimización de estos parámetros para su caso de uso específico, consulte <a href="/docs/es/scann.md#Index-params">Parámetros del índice</a>.</p>
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
    </button></h2><p>Para construir un índice <code translate="no">SCANN</code> en un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Si se almacenan los datos vectoriales originales junto con la representación cuantizada.</li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">SCANN</code>, consulte <a href="/docs/es/scann.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
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
    </button></h2><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas de similitud en el índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span> <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice.</p>
<ul>
<li><code translate="no">reorder_k</code>: Número de candidatos a refinar durante la fase de reordenación.</li>
<li><code translate="no">nprobe</code>: Número de clusters a buscar.</li>
</ul>
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">SCANN</code>, consulte <a href="/docs/es/scann.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
    </button></h2><p>Esta sección proporciona una visión general de los parámetros utilizados para construir un índice y realizar búsquedas en el índice.</p>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/scann.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Número de unidades de clúster</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>Una <em>nlist</em> más alta aumenta la eficiencia de la poda y normalmente acelera la búsqueda gruesa, pero las particiones pueden ser demasiado pequeñas, lo que puede reducir la recuperación; una <em>nlist</em> más baja explora clusters más grandes, mejorando la recuperación pero ralentizando la búsqueda.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Si se almacenan los datos vectoriales originales junto con la representación cuantizada. Si esta opción está activada, permite realizar cálculos de similitud más precisos durante la fase de reordenación utilizando los vectores originales en lugar de aproximaciones cuantizadas.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Rango</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Valor por defecto</strong>: <code translate="no">true</code></p></td>
     <td><p>Establezca <code translate="no">true</code> para <strong>una mayor precisión de búsqueda</strong> y cuando el espacio de almacenamiento no sea una preocupación primordial. Los datos vectoriales originales permiten realizar cálculos de similitud más precisos durante la reclasificación.</p><p>Establezca <code translate="no">false</code> para <strong>reducir la sobrecarga de almacenamiento</strong> y el uso de memoria, especialmente para grandes conjuntos de datos. Sin embargo, esto puede reducir ligeramente la precisión de la búsqueda, ya que la fase de reclasificación utilizará vectores cuantizados.</p><p><strong>Recomendado</strong>: Utilice <code translate="no">true</code> para aplicaciones de producción en las que la precisión sea fundamental.</p></td>
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
    </button></h3><p>En la tabla siguiente se enumeran los parámetros que pueden configurarse en <code translate="no">search_params.params</code> cuando se <a href="/docs/es/scann.md#Search-on-index">realizan búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Controla el número de vectores candidatos que se refinan durante la fase de reordenación. Este parámetro determina cuántos candidatos principales de las etapas iniciales de partición y cuantificación se reevalúan utilizando cálculos de similitud más precisos.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Un valor mayor de <code translate="no">reorder_k</code> suele <strong>aumentar la precisión de la búsqueda</strong>, ya que se tienen en cuenta más candidatos durante la fase final de refinamiento. Sin embargo, esto también <strong>aumenta el tiempo de búsqueda</strong> debido al cálculo adicional.</p><p>Considere la posibilidad de aumentar <code translate="no">reorder_k</code> cuando sea fundamental lograr una alta recuperación y la velocidad de búsqueda sea menos importante. Un buen punto de partida es de 2 a 5 veces el <code translate="no">limit</code> deseado (TopK resultados a devolver).</p><p>Considere la posibilidad de reducir <code translate="no">reorder_k</code> para dar prioridad a las búsquedas más rápidas, especialmente en situaciones en las que es aceptable una ligera reducción de la precisión.</p><p>En la mayoría de los casos, le recomendamos que establezca un valor dentro de este rango:<em>[límite</em>, <em>límite</em> * 5].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>El número de clusters para buscar candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, <em>nlist</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Los valores más altos permiten buscar en más grupos, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de aumentar la latencia de la consulta.</p><p>Establezca <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidad y precisión.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [1, nlist].</p></td>
   </tr>
</table>
