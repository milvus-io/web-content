---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  El índice GPU_IVF_PQ se basa en el concepto IVF_PQ combinando la agrupación de
  archivos invertida con la cuantificación de productos (PQ), que descompone los
  vectores de alta dimensión en subespacios más pequeños y los cuantiza para
  realizar búsquedas de similitud eficientes. Diseñado exclusivamente para
  entornos de GPU, GPU_IVF_PQ aprovecha el procesamiento paralelo para acelerar
  los cálculos y manejar con eficacia datos vectoriales a gran escala. Para
  obtener más información sobre los conceptos básicos, consulte IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>GPU_IVF_PQ</strong> se basa en el concepto <strong>IVF_PQ</strong> combinando la agrupación de archivos invertida con la cuantificación de productos (PQ), que descompone los vectores de alta dimensión en subespacios más pequeños y los cuantiza para realizar búsquedas de similitud eficientes. Diseñado exclusivamente para entornos de GPU, GPU_IVF_PQ aprovecha el procesamiento paralelo para acelerar los cálculos y manejar con eficacia datos vectoriales a gran escala. Para obtener más información sobre los conceptos básicos, consulte <a href="/docs/es/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Para construir un índice <code translate="no">GPU_IVF_PQ</code> en un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><code translate="no">m</code>: Número de subvectores en los que se divide el vector.</li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">GPU_IVF_PQ</code>, consulte <a href="/docs/es/gpu-ivf-pq.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
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
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice.</p>
<ul>
<li><code translate="no">nprobe</code>: Número de clusters a buscar.</li>
</ul>
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">GPU_IVF_PQ</code>, consulte <a href="/docs/es/gpu-ivf-pq.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/gpu-ivf-pq.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>El número de clusters a crear usando el algoritmo k-means durante la construcción del índice.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 65536]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">128</code></p></td>
     <td><p>Los valores mayores de <code translate="no">nlist</code> mejoran la recuperación al crear clusters más refinados, pero aumentan el tiempo de creación del índice. Optimice en función del tamaño del conjunto de datos y de los recursos disponibles. En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Número de subvectores (utilizados para la cuantificación) en los que se dividirá cada vector de alta dimensión durante el proceso de cuantificación.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 65536]</p>
<p><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Un valor más alto de <code translate="no">m</code> puede mejorar la precisión, pero también aumenta la complejidad computacional y el uso de memoria. <code translate="no">m</code> debe ser un divisor de la dimensión del vector<em>(D</em>) para garantizar una descomposición adecuada. Un valor comúnmente recomendado es <em>m = D/2</em>.</p>
<p>En la mayoría de los casos, le recomendamos que establezca un valor dentro de este rango: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>El número de bits utilizados para representar el índice del centroide de cada subvector en la forma comprimida. Determina directamente el tamaño de cada libro de códigos. Cada libro de códigos contendrá $2^{\textit{nbits}}$ centroides. Por ejemplo, si <code translate="no">nbits</code> se establece en 8, cada subvector estará representado por un índice centroide de 8 bits. Esto permite que haya $2^8$ (256) centroides posibles en el libro de códigos para ese subvector.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 64]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valor más alto de <code translate="no">nbits</code> permite libros de códigos más grandes, lo que potencialmente conduce a representaciones más precisas de los vectores originales. Sin embargo, también implica el uso de más bits para almacenar cada índice, lo que se traduce en una menor compresión. En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decide si almacenar en caché el conjunto de datos original en la memoria de la GPU. Valores posibles:</p>
<ul>
<li><p><code translate="no">"true"</code>: Almacena en caché el conjunto de datos original para mejorar la recuperación refinando los resultados de búsqueda.</p></li>
<li><p><code translate="no">"false"</code>: No almacena en caché el conjunto de datos original para ahorrar memoria de la GPU.</p></li>
</ul></td>
     <td><p><strong>Tipo</strong>: Cadena <strong>Rango</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">"false"</code></p></td>
     <td><p>Si se establece en <code translate="no">"true"</code>, se mejora la recuperación al refinar los resultados de búsqueda, pero se utiliza más memoria de GPU. Si se establece en <code translate="no">"false"</code>, se conserva la memoria de la GPU.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>En la siguiente tabla se enumeran los parámetros que pueden configurarse en <code translate="no">search_params.params</code> cuando se <a href="/docs/es/gpu-ivf-pq.md#Search-on-index">realizan búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>El número de clusters para buscar candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>nlist</em>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Los valores más altos permiten buscar en más conglomerados, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de aumentar la latencia de la consulta. Establezca <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar la velocidad y la precisión.</p>
<p>En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [1, nlist].</p></td>
   </tr>
</table>
