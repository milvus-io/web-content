---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  El índice IVF_PQ es un algoritmo de indexación basado en la cuantización para
  la búsqueda aproximada del vecino más próximo en espacios de alta dimensión.
  Aunque no es tan rápido como algunos métodos basados en grafos, IVF_PQ suele
  requerir bastante menos memoria, lo que lo convierte en una opción práctica
  para grandes conjuntos de datos.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>IVF_PQ</strong> es un algoritmo de indexación <strong>basado en la cuantización</strong> para la búsqueda aproximada del vecino más próximo en espacios de alta dimensión. Aunque no es tan rápido como algunos métodos basados en grafos, <strong>IVF_PQ</strong> suele requerir bastante menos memoria, lo que lo convierte en una opción práctica para grandes conjuntos de datos.</p>
<h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_PQ</strong> son las siglas de <strong>Inverted File with Product Quantization (Archivo invertido con cuantificación de productos</strong>), un enfoque híbrido que combina indexación y compresión para una búsqueda y recuperación vectorial eficientes. Aprovecha dos componentes básicos: El <strong>archivo invertido (IVF</strong> ) y la <strong>cuantificación de productos (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF es como crear un índice en un libro. En lugar de escanear cada página (o, en nuestro caso, cada vector), se buscan palabras clave específicas (clusters) en el índice para encontrar rápidamente las páginas (vectores) relevantes. En nuestro caso, los vectores se agrupan en clusters, y el algoritmo buscará dentro de unos pocos clusters que estén cerca del vector de consulta.</p>
<p>El funcionamiento es el siguiente</p>
<ol>
<li><p><strong>Agrupación:</strong> El conjunto de datos vectoriales se divide en un número determinado de clusters, utilizando un algoritmo de agrupación como k-means. Cada cluster tiene un centroide (un vector representativo del cluster).</p></li>
<li><p><strong>Asignación:</strong> Cada vector se asigna al cluster cuyo centroide está más próximo a él.</p></li>
<li><p><strong>Índice invertido:</strong> Se crea un índice que asigna el centroide de cada cluster a la lista de vectores asignados a ese cluster.</p></li>
<li><p><strong>Búsqueda:</strong> Cuando se buscan los vecinos más cercanos, el algoritmo de búsqueda compara el vector de consulta con los centroides de los clústeres y selecciona el clúster o clústeres más prometedores. A continuación, la búsqueda se reduce a los vectores que se encuentran dentro de esos clusters seleccionados.</p></li>
</ol>
<p>Para obtener más información sobre los detalles técnicos, consulte <a href="/docs/es/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>La cuantificación de productos (PQ)</strong> es un método de compresión de vectores de alta dimensión que reduce significativamente los requisitos de almacenamiento y permite realizar rápidas operaciones de búsqueda de similitudes.</p>
<p>El proceso PQ consta de las siguientes etapas</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>Descomposición dimensional</strong>: El algoritmo comienza descomponiendo cada vector de alta dimensión en <code translate="no">m</code> subvectores de igual tamaño. Esta descomposición transforma el espacio original de D dimensiones en <code translate="no">m</code> subespacios disjuntos, donde cada subespacio contiene <em>D/m</em> dimensiones. El parámetro <code translate="no">m</code> controla la granularidad de la descomposición e influye directamente en la relación de compresión.</p></li>
<li><p><strong>Generación del libro de códigos del subespacio</strong>: Dentro de cada subespacio, el algoritmo aplica <a href="https://en.wikipedia.org/wiki/K-means_clustering">la agrupación k-means</a> para aprender un conjunto de vectores representativos (centroides). Estos centroides forman colectivamente un libro de códigos para ese subespacio. El número de centroides de cada libro de códigos viene determinado por el parámetro <code translate="no">nbits</code>, donde cada libro de códigos contiene <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroides. Por ejemplo, si</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code>, cada libro de códigos contendrá 256 centroides. A cada centroide se le asigna un índice único con <code translate="no">nbits</code> bits.</p></li>
<li><p><strong>Cuantificación</strong><strong>vectorial</strong>: Para cada subvector del vector original, PQ identifica su centroide más cercano dentro del subespacio correspondiente utilizando un tipo de métrica específico. Este proceso asigna cada subvector a su vector representativo más cercano en el libro de códigos. En lugar de almacenar todas las coordenadas del subvector, sólo se conserva el índice del centroide correspondiente.</p></li>
<li><p><strong>Representación comprimida</strong>: La representación comprimida final consta de <code translate="no">m</code> índices, uno de cada subespacio, denominados colectivamente <strong>códigos PQ</strong>. Esta codificación reduce los requisitos de almacenamiento de <em>D × 32</em> bits (suponiendo números en coma flotante de 32 bits) a <em>m</em> × <em>nbits</em> bits, con lo que se consigue una compresión sustancial al tiempo que se conserva la capacidad de aproximar distancias vectoriales.</p></li>
</ol>
<p>Para obtener más información sobre el ajuste y la optimización de los parámetros, consulte <a href="/docs/es/ivf-pq.md#Index-params">Parámetros del índice</a>.</p>
<div class="alert note">
<p>Considere un vector con <em>D = 128</em> dimensiones utilizando números de coma flotante de 32 bits. Con los parámetros PQ <em>m = 64</em> (subvectores) y <em>nbits = 8</em> (por tanto <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em> centroides por subespacio), podemos comparar los requisitos de almacenamiento:</p>
<ul>
<li><p>Vector original: 128 dimensiones × 32 bits = 4.096 bits</p></li>
<li><p>Vector comprimido PQ: 64 subvectores × 8 bits = 512 bits</p></li>
</ul>
<p>Esto supone una reducción de 8 veces en los requisitos de almacenamiento.</p>
</div>
<p><strong>Cálculo de distancias con PQ</strong></p>
<p>Cuando se realiza una búsqueda de similitud con un vector de consulta, PQ permite un cálculo eficaz de la distancia mediante los siguientes pasos:</p>
<ol>
<li><p><strong>Preprocesamiento de la consulta</strong></p>
<ul>
<li><p>El vector de consulta se descompone en <code translate="no">m</code> subvectores, que coinciden con la estructura de descomposición original de PQ.</p></li>
<li><p>Para cada subvector de consulta y su correspondiente libro de códigos (que contiene <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroids), se calculan y almacenan las distancias a todos los centroids.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>Esto genera <code translate="no">m</code> tablas de búsqueda, donde cada tabla contiene <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits distancias.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>Aproximación de distancias</strong></p>
<p>Para cualquier vector de base de datos representado por códigos PQ, su distancia aproximada al vector de consulta se calcula del siguiente modo:</p>
<ul>
<li><p>Para cada uno de los subvectores de <code translate="no">m</code>, recupere la distancia precalculada de la tabla de consulta correspondiente utilizando el índice centroide almacenado.</p></li>
<li><p>Sume estas distancias <code translate="no">m</code> para obtener la distancia aproximada basada en un tipo métrico específico (por ejemplo, la distancia euclídea).</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>El índice <strong>IVF_PQ</strong> combina los puntos fuertes de <strong>IVF</strong> y <strong>PQ</strong> para acelerar las búsquedas. El proceso funciona en dos etapas:</p>
<ol>
<li><p><strong>Filtrado grueso con IVF</strong>: IVF particiona el espacio vectorial en clusters, reduciendo el alcance de la búsqueda. En lugar de evaluar todo el conjunto de datos, el algoritmo se centra sólo en los clusters más cercanos al vector de consulta.</p></li>
<li><p><strong>Comparación detallada con PQ</strong>: dentro de los conglomerados seleccionados, PQ utiliza representaciones vectoriales comprimidas y cuantizadas para calcular rápidamente distancias aproximadas.</p></li>
</ol>
<p>El rendimiento del índice <strong>IVF_PQ</strong> depende en gran medida de los parámetros que controlan los algoritmos IVF y PQ. El ajuste de estos parámetros es crucial para lograr los resultados óptimos para un conjunto de datos y una aplicación determinados. Encontrará información más detallada sobre estos parámetros y cómo ajustarlos en <a href="/docs/es/ivf-pq.md#Index-params">Parámetros del índice</a>.</p>
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
    </button></h2><p>Para construir un índice <code translate="no">IVF_PQ</code> sobre un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><code translate="no">m</code>: Número de subvectores en los que se divide el vector.</li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">IVF_PQ</code>, consulte <a href="/docs/es/ivf-pq.md#Index-building-params">Parámetros de construcción del índice</a>.</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método <code translate="no">create_index()</code> o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
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
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">IVF_PQ</code>, consulte <a href="/docs/es/ivf-pq.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/ivf-pq.md#Build-index">crear un índice</a>.</p>
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
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 65536]</p><p><strong>Valor por defecto</strong>: <code translate="no">128</code></p></td>
     <td><p>Los valores mayores de <code translate="no">nlist</code> mejoran la recuperación al crear clusters más refinados, pero aumentan el tiempo de creación del índice. Optimice en función del tamaño del conjunto de datos y de los recursos disponibles. En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Número de subvectores (utilizados para la cuantificación) en los que se dividirá cada vector de alta dimensión durante el proceso de cuantificación.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 65536]</p><p><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Un valor más alto de <code translate="no">m</code> puede mejorar la precisión, pero también aumenta la complejidad computacional y el uso de memoria. <code translate="no">m</code> debe ser un divisor de la dimensión del vector<em>(D</em>) para garantizar una descomposición adecuada. Un valor comúnmente recomendado es <em>m = D/2</em>.</p><p>En la mayoría de los casos, le recomendamos que establezca un valor dentro de este rango: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>El número de bits utilizados para representar el índice del centroide de cada subvector en la forma comprimida. Determina directamente el tamaño de cada libro de códigos. Cada libro de códigos contendrá $2^{\textit{nbits}}$ centroides. Por ejemplo, si <code translate="no">nbits</code> se establece en 8, cada subvector estará representado por un índice centroide de 8 bits. Esto permite que haya $2^8$ (256) centroides posibles en el libro de códigos para ese subvector.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 64]</p><p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valor más alto de <code translate="no">nbits</code> permite libros de códigos más grandes, lo que potencialmente conduce a representaciones más precisas de los vectores originales. Sin embargo, también implica utilizar más bits para almacenar cada índice, lo que se traduce en una menor compresión. En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos de cada índice</h3><p>En la tabla siguiente se enumeran los parámetros que pueden configurarse en <code translate="no">search_params.params</code> al <a href="/docs/es/ivf-pq.md#Search-on-index">buscar en el índice</a>.</p>
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
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>nlist</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Los valores más altos permiten buscar en más conglomerados, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de aumentar la latencia de la consulta. Establezca <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidad y precisión.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [1, nlist].</p></td>
   </tr>
</table>
