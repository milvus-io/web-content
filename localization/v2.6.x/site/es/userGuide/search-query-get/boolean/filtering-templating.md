---
id: filtering-templating.md
title: Plantillas de filtro
summary: >-
  En Milvus, las expresiones de filtro complejas con numerosos elementos,
  especialmente las que implican caracteres no ASCII como los caracteres CJK,
  pueden afectar significativamente al rendimiento de la consulta. Para
  solucionar este problema, Milvus introduce un mecanismo de plantillas de
  expresiones de filtro diseñado para mejorar la eficacia reduciendo el tiempo
  empleado en analizar expresiones complejas. Esta página explica el uso de
  plantillas de expresiones de filtro en operaciones de búsqueda, consulta y
  eliminación.
---
<h1 id="Filter-Templating" class="common-anchor-header">Plantillas de filtro<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, las expresiones de filtro complejas con numerosos elementos, especialmente las que implican caracteres no ASCII como los caracteres CJK, pueden afectar significativamente al rendimiento de la consulta. Para solucionar este problema, Milvus introduce un mecanismo de plantillas de expresiones de filtro diseñado para mejorar la eficacia reduciendo el tiempo empleado en analizar expresiones complejas. Esta página explica el uso de plantillas de expresiones de filtro en operaciones de búsqueda, consulta y eliminación.</p>
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
    </button></h2><p>Las plantillas de expresiones de filtrado permiten crear expresiones de filtrado con marcadores de posición que pueden sustituirse dinámicamente por valores durante la ejecución de la consulta. Mediante el uso de plantillas, se evita incrustar grandes matrices o expresiones complejas directamente en el filtro, lo que reduce el tiempo de análisis y mejora el rendimiento de la consulta.</p>
<p>Supongamos que tiene una expresión de filtro que incluye dos campos, <code translate="no">age</code> y <code translate="no">city</code>, y desea encontrar a todas las personas cuya edad sea superior a 25 años y que vivan en "北京" (Pekín) o "上海" (Shanghái). En lugar de incrustar directamente los valores en la expresión del filtro, puede utilizar una plantilla:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Aquí, <code translate="no">{age}</code> y <code translate="no">{city}</code> son marcadores de posición que se sustituirán por los valores reales en <code translate="no">filter_params</code> cuando se ejecute la consulta.</p>
<p>El uso de plantillas de expresión de filtro en Milvus tiene varias ventajas clave:</p>
<ul>
<li><p><strong>Reducción del tiempo de análisis</strong>: Al sustituir expresiones de filtro grandes o complejas por marcadores de posición, el sistema emplea menos tiempo en analizar y procesar el filtro.</p></li>
<li><p><strong>Mejora del rendimiento de las consultas</strong>: Al reducirse la sobrecarga de análisis sintáctico, mejora el rendimiento de las consultas, lo que se traduce en mayores QPS y tiempos de respuesta más rápidos.</p></li>
<li><p><strong>Escalabilidad</strong>: A medida que sus conjuntos de datos crecen y las expresiones de filtro se vuelven más complejas, la creación de plantillas garantiza que el rendimiento siga siendo eficiente y escalable.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Operaciones de búsqueda<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Para las operaciones de búsqueda en Milvus, la expresión <code translate="no">filter</code> se utiliza para definir la condición de filtrado, y el parámetro <code translate="no">filter_params</code> se utiliza para especificar los valores de los marcadores de posición. El diccionario <code translate="no">filter_params</code> contiene los valores dinámicos que Milvus utilizará para sustituir en la expresión de filtrado.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, Milvus sustituirá dinámicamente <code translate="no">{age}</code> por <code translate="no">25</code> y <code translate="no">{city}</code> por <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> al ejecutar la búsqueda.</p>
<h2 id="Query-Operations" class="common-anchor-header">Operaciones de consulta<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>El mismo mecanismo de plantillas puede aplicarse a las operaciones de consulta en Milvus. En la función <code translate="no">query</code>, se define la expresión de filtro y se utiliza <code translate="no">filter_params</code> para especificar los valores a sustituir.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizando <code translate="no">filter_params</code>, Milvus maneja eficientemente la inserción dinámica de valores, mejorando la velocidad de ejecución de la consulta.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Operaciones de eliminación<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>También puede utilizar plantillas de expresiones de filtrado en operaciones de eliminación. De forma similar a la búsqueda y la consulta, la expresión <code translate="no">filter</code> define las condiciones y <code translate="no">filter_params</code> proporciona los valores dinámicos para los marcadores de posición.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Este enfoque mejora el rendimiento de las operaciones de eliminación, especialmente cuando se trata de condiciones de filtro complejas.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Las plantillas de expresiones de filtro son una herramienta esencial para optimizar el rendimiento de las consultas en Milvus. Utilizando marcadores de posición y el diccionario <code translate="no">filter_params</code>, puede reducir significativamente el tiempo empleado en analizar expresiones de filtro complejas. Esto conduce a una ejecución más rápida de la consulta y a un mejor rendimiento general.</p>
