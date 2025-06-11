---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  El índice IVF_SQ8 es un algoritmo de indexación basado en la cuantización y
  diseñado para afrontar los retos de la búsqueda de similitudes a gran escala.
  Este tipo de índice permite realizar búsquedas más rápidas con un consumo de
  memoria mucho menor que los métodos de búsqueda exhaustiva.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>IVF_SQ8</strong> es un algoritmo de indexación <strong>basado en la cuantización</strong>, diseñado para afrontar los retos de la búsqueda de similitudes a gran escala. Este tipo de índice consigue búsquedas más rápidas con una huella de memoria mucho menor en comparación con los métodos de búsqueda exhaustiva.</p>
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
    </button></h2><p>El índice IVF_SQ8 se basa en dos componentes clave:</p>
<ul>
<li><p><strong>Archivo invertido (IVF)</strong>: Organiza los datos en clusters, permitiendo al algoritmo de búsqueda centrarse sólo en los subconjuntos de vectores más relevantes.</p></li>
<li><p><strong>Cuantización escalar (SQ8)</strong>: Comprime los vectores a una forma más compacta, reduciendo drásticamente el uso de memoria y manteniendo al mismo tiempo la precisión suficiente para realizar cálculos rápidos de similitud.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF es como crear un índice en un libro. En lugar de escanear cada página (o, en nuestro caso, cada vector), se buscan palabras clave específicas (clusters) en el índice para encontrar rápidamente las páginas (vectores) relevantes. En nuestro caso, los vectores se agrupan en clusters, y el algoritmo buscará dentro de unos pocos clusters que estén cerca del vector de consulta.</p>
<p>El funcionamiento es el siguiente</p>
<ol>
<li><p><strong>Agrupación:</strong> El conjunto de datos vectoriales se divide en un número determinado de clusters, utilizando un algoritmo de agrupación como k-means. Cada cluster tiene un centroide (un vector representativo del cluster).</p></li>
<li><p><strong>Asignación:</strong> Cada vector se asigna al cluster cuyo centroide está más próximo a él.</p></li>
<li><p><strong>Índice invertido:</strong> Se crea un índice que asigna el centroide de cada cluster a la lista de vectores asignados a ese cluster.</p></li>
<li><p><strong>Búsqueda:</strong> Cuando se buscan los vecinos más cercanos, el algoritmo de búsqueda compara el vector de consulta con los centroides de los clústeres y selecciona el clúster o clústeres más prometedores. A continuación, la búsqueda se reduce a los vectores que se encuentran dentro de esos clusters seleccionados.</p></li>
</ol>
<p>Para obtener más información sobre los detalles técnicos, consulte <a href="/docs/es/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>La cuantificación escalar (SQ) es una técnica utilizada para reducir el tamaño de vectores de alta dimensión sustituyendo sus valores por representaciones más pequeñas y compactas. La variante <strong>SQ8</strong> utiliza enteros de 8 bits en lugar de los típicos números en coma flotante de 32 bits para almacenar el valor de cada dimensión de un vector. Esto reduce enormemente la cantidad de memoria necesaria para almacenar los datos.</p>
<p>A continuación se explica cómo funciona SQ8:</p>
<ol>
<li><p><strong>Identificación de rangos:</strong> En primer lugar, se identifican los valores mínimo y máximo dentro del vector. Este rango define los límites para la cuantización.</p></li>
<li><p><strong>Normalización:</strong> Normalice los valores del vector a un rango entre 0 y 1 utilizando la fórmula:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Esto asegura que todos los valores se mapean proporcionalmente dentro de un rango estandarizado, preparándolos para la compresión.</p></li>
<li><p><strong>Compresión de 8 bits:</strong> Multiplique el valor normalizado por 255 (el valor máximo para un entero de 8 bits) y redondee el resultado al entero más cercano. Esto comprime cada valor en una representación de 8 bits.</p></li>
</ol>
<p>Supongamos que tiene un valor de dimensión de 1,2, con un valor mínimo de -1,7 y un valor máximo de 2,3. La siguiente figura muestra cómo se aplica SQ8 para convertir un valor float32 en un entero int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>El índice IVF_SQ8 combina IVF y SQ8 para realizar búsquedas de similitud de forma eficiente:</p>
<ol>
<li><p><strong>IVF reduce el ámbito de búsqueda</strong>: El conjunto de datos se divide en clusters, y cuando se realiza una consulta, IVF compara primero la consulta con los centroides de los clusters, seleccionando los clusters más relevantes.</p></li>
<li><p><strong>SQ8 acelera el cálculo de distancias</strong>: Dentro de los clusters seleccionados, SQ8 comprime los vectores en enteros de 8 bits, lo que reduce el uso de memoria y acelera los cálculos de distancia.</p></li>
</ol>
<p>Al utilizar IVF para centrar la búsqueda y SQ8 para acelerar los cálculos, IVF_SQ8 consigue tanto tiempos de búsqueda rápidos como eficiencia de memoria.</p>
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
    </button></h2><p>Para construir un índice <code translate="no">IVF_SQ8</code> en un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando el <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><code translate="no">nlist</code>: Número de conglomerados que se crearán utilizando el algoritmo k-means durante la construcción del índice.</li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">IVF_SQ8</code>, consulte <a href="/docs/es/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Parámetros de construcción del índice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>: Número de clusters para buscar candidatos.</li>
</ul>
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">IVF_SQ8</code>, consulte <a href="/docs/es/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">crear un índice</a>.</p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">search_params.params</code> al <a href="/docs/es/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">buscar en el índice</a>.</p>
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
