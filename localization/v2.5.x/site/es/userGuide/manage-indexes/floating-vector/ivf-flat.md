---
id: ivf-flat.md
title: IVF_FLAT
summary: >-
  El índice IVF_FLAT es un algoritmo de indexación que puede mejorar el
  rendimiento de la búsqueda de vectores en coma flotante.
---

<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>IVF_FLAT</strong> es un algoritmo de indexación que puede mejorar el rendimiento de la búsqueda de vectores de coma flotante.</p>
<p>Este tipo de índice es ideal para conjuntos de datos a gran escala que requieren respuestas de consulta rápidas y una gran precisión, especialmente cuando la agrupación de su conjunto de datos puede reducir el espacio de búsqueda y se dispone de memoria suficiente para almacenar los datos agrupados.</p>
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
    </button></h2><p>El término <strong>IVF_FLAT</strong> es la abreviatura de <strong>Inverted File Flat (archivo invertido plano</strong>), que engloba su enfoque de doble capa para la indexación y búsqueda de vectores de coma flotante:</p>
<ul>
<li><p><strong>Archivo invertido (IVF):</strong> Se refiere a la agrupación del espacio vectorial en regiones manejables mediante la <a href="https://en.wikipedia.org/wiki/K-means_clustering">agrupación k-means</a>. Cada clúster está representado por un <strong>centroide</strong>, que sirve como punto de referencia para los vectores que lo componen.</p></li>
<li><p><strong>Plano:</strong> Indica que dentro de cada cluster, los vectores se almacenan en su forma original (estructura plana), sin ningún tipo de compresión o cuantización, para cálculos de distancia precisos.</p></li>
</ul>
<p>La siguiente figura muestra cómo funciona:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo IVF FLAT</span> </span></p>
<p>Este método de indexación acelera el proceso de búsqueda, pero tiene un posible inconveniente: el candidato más cercano a la incrustación de la consulta puede no ser exactamente el más cercano. Esto puede ocurrir si la incrustación más cercana a la incrustación de consulta reside en un clúster diferente del seleccionado en función del centroide más cercano (véase la visualización más abajo).</p>
<p>Para resolver este problema, <strong>IVF_FLAT</strong> proporciona dos hiperparámetros que podemos ajustar:</p>
<ul>
<li><p><code translate="no">nlist</code>: Especifica el número de particiones a crear mediante el algoritmo k-means.</p></li>
<li><p><code translate="no">nprobe</code>: Especifica el número de particiones a considerar durante la búsqueda de candidatos.</p></li>
</ul>
<p>Si en lugar de 1 ponemos <code translate="no">nprobe</code> en 3, obtendremos el siguiente resultado:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>IVF FLAT Flujo de trabajo 2</span> </span></p>
<p>Aumentando el valor de <code translate="no">nprobe</code>, puede incluir más particiones en la búsqueda, lo que puede ayudar a garantizar que no se pierda la incrustación más cercana a la consulta, aunque resida en una partición diferente. Sin embargo, esto tiene el coste de aumentar el tiempo de búsqueda, ya que es necesario evaluar más candidatos. Para más información sobre el ajuste de los parámetros del índice, consulte <a href="/docs/es/v2.5.x/ivf-flat.md#Index-params">Parámetros del índice</a>.</p>
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
    </button></h2><p>Para construir un índice <code translate="no">IVF_FLAT</code> en un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
params={
<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
} <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>

<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/v2.5.x/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><code translate="no">nlist</code>: Número de conglomerados en que se divide el conjunto de datos.</li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">IVF_FLAT</code>, consulte <a href="/docs/es/v2.5.x/ivf-flat.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando el método <code translate="no">create_index()</code> directamente o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/v2.5.x/create-collection.md">Crear colección</a>.</p>
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
anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>

<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice.</p>
<ul>
<li><code translate="no">nprobe</code>: Número de clusters a buscar.</li>
</ul>
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">IVF_FLAT</code>, consulte <a href="/docs/es/v2.5.x/ivf-flat.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/v2.5.x/ivf-flat.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>El número de clusters a crear utilizando el algoritmo k-means durante la construcción del índice. Cada cluster, representado por un centroide, almacena una lista de vectores. Aumentar este parámetro reduce el número de vectores en cada clúster, creando particiones más pequeñas y centradas.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 65536]</p><p><strong>Valor por defecto</strong>: <code translate="no">128</code></p></td>
     <td><p>Los valores mayores de <code translate="no">nlist</code> mejoran la recuperación al crear clusters más refinados, pero aumentan el tiempo de creación del índice. Optimice en función del tamaño del conjunto de datos y de los recursos disponibles. En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">search_params.params</code> al <a href="/docs/es/v2.5.x/ivf-flat.md#Search-on-index">buscar en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Número de conglomerados en los que se buscan candidatos. Los valores más altos permiten buscar en más conglomerados, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de aumentar la latencia de la consulta.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>nlist</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentar este valor mejora la recuperación pero puede ralentizar la búsqueda. Establezca <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidad y precisión.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [1, nlist].</p></td>
   </tr>
</table>
