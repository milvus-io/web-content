---
id: boolean.md
summary: >-
  Milvus proporciona potentes funciones de filtrado que permiten una consulta
  precisa de sus datos. Las expresiones de filtrado le permiten dirigirse a
  campos escalares específicos y refinar los resultados de la búsqueda con
  diferentes condiciones. Esta guía explica cómo utilizar las expresiones de
  filtrado en Milvus, con ejemplos centrados en las operaciones de consulta.
  También puede aplicar estos filtros en solicitudes de búsqueda y eliminación.
title: Explicación del filtrado
---
<h1 id="Filtering-Explained​" class="common-anchor-header">Explicación del filtrado<button data-href="#Filtering-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus proporciona potentes capacidades de filtrado que permiten una consulta precisa de sus datos. Las expresiones de filtrado le permiten dirigirse a campos escalares específicos y refinar los resultados de la búsqueda con diferentes condiciones. Esta guía explica cómo utilizar las expresiones de filtrado en Milvus, con ejemplos centrados en las operaciones de consulta. También puede aplicar estos filtros en solicitudes de búsqueda y eliminación.</p>
<h2 id="Basic-operators​" class="common-anchor-header">Operadores básicos<button data-href="#Basic-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite varios operadores básicos para filtrar datos.</p>
<ul>
<li><p><strong>Operadores de comparación</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, y <code translate="no">&lt;=</code> permiten filtrar basándose en campos numéricos, de texto o de fecha.</p></li>
<li><p><strong>Filtros de rango</strong>: <code translate="no">IN</code> y <code translate="no">LIKE</code> ayudan a coincidir con rangos o conjuntos de valores específicos.</p></li>
<li><p><strong>Operadores aritméticos</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code>, y <code translate="no">**</code> se utilizan para cálculos que implican campos numéricos.</p></li>
<li><p><strong>Operadores lógicos</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, y <code translate="no">NOT</code> o '&amp;&amp;', '||', '~', '!' combinan múltiples condiciones en expresiones complejas.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color​" class="common-anchor-header">Ejemplo: Filtrar por color</h3><p>Para encontrar entidades con colores primarios (rojo, verde o azul) en un campo escalar <code translate="no">color</code>, utilice la siguiente expresión de filtro.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields​" class="common-anchor-header">Ejemplo: Filtrado de campos JSON</h3><p>Milvus permite referenciar claves en campos JSON. Por ejemplo, si tiene un campo JSON <code translate="no">product</code> con las claves <code translate="no">price</code> y <code translate="no">model</code>, y desea encontrar productos con un modelo específico y un precio inferior a 1.850, utilice esta expresión de filtro.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; and product[&quot;price&quot;] &lt; 1850&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields​" class="common-anchor-header">Ejemplo: Filtrado de campos de matriz</h3><p>Si tiene un campo de matriz <code translate="no">history_temperatures</code> que contiene registros de temperatura y desea encontrar observatorios en los que la décima temperatura registrada supere los 23°C, utilice esta expresión.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre estos operadores básicos, consulte <a href="/docs/es/basic-operators.md">Operadores básicos</a>.</p>
<h2 id="Filter-expression-templates​" class="common-anchor-header">Plantillas de expresiones de filtrado<button data-href="#Filter-expression-templates​" class="anchor-icon" translate="no">
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
    </button></h2><p>Al filtrar utilizando caracteres CJK, el procesamiento puede ser más complejo debido a sus mayores conjuntos de caracteres y diferencias de codificación. Esto puede dar lugar a un rendimiento más lento, especialmente con el operador <code translate="no">IN</code>.</p>
<p>Milvus introduce plantillas de expresiones de filtrado para optimizar el rendimiento cuando se trabaja con caracteres CJK. Al separar los valores dinámicos de la expresión de filtro, el motor de consulta gestiona la inserción de parámetros de forma más eficiente.</p>
<h3 id="Example​" class="common-anchor-header">Ejemplo</h3><p>Para buscar personas mayores de 25 años que vivan en "北京" (Pekín) o "上海" (Shanghai), utilice la siguiente expresión de plantilla.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 and city in [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para mejorar el rendimiento, utilice esta variación con parámetros.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} and city in {city}&quot;</span>,​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​

<button class="copy-code-btn"></button></code></pre>
<p>Este enfoque reduce la sobrecarga de análisis sintáctico y mejora la velocidad de consulta. Para obtener más información, consulte <a href="/docs/es/filtering-templating.md">Plantillas de filtros</a>.</p>
<h2 id="Data-type-specific-operators​" class="common-anchor-header">Operadores específicos de tipos de datos<button data-href="#Data-type-specific-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona operadores de filtrado avanzados para tipos de datos específicos, como los campos JSON, ARRAY y VARCHAR.</p>
<h3 id="JSON-field-specific-operators​" class="common-anchor-header">Operadores específicos de campo JSON</h3><p>Milvus ofrece operadores avanzados para consultar campos JSON, permitiendo un filtrado preciso dentro de estructuras JSON complejas.</p>
<p><code translate="no">**JSON_CONTAINS(identifier, jsonExpr)**</code>: Comprueba si existe una expresión JSON en el campo.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">**JSON_CONTAINS_ALL(identifier, jsonExpr)**</code>: Comprueba que todos los elementos de la expresión JSON están presentes.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">**JSON_CONTAINS_ANY(identifier, jsonExpr)**</code>: Filtra las entidades en las que existe al menos un elemento en la expresión JSON.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre los operadores JSON, consulte <a href="/docs/es/json-operators.md">Operadores JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators​" class="common-anchor-header">Operadores específicos de campo ARRAY</h3><p>Milvus proporciona operadores de filtrado avanzados para campos de array, como <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, y <code translate="no">ARRAY_LENGTH</code>, que permiten un control detallado de los datos de array.</p>
<p><code translate="no">**ARRAY_CONTAINS**</code>: Filtra entidades que contienen un elemento específico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">**ARRAY_CONTAINS_ALL**</code>: Filtra entidades en las que están presentes todos los elementos de una lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">**ARRAY_CONTAINS_ANY**</code>: Filtra entidades que contienen cualquier elemento de la lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">**ARRAY_LENGTH**</code>: Filtra en función de la longitud de la matriz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre los operadores de matrices, consulte <a href="/docs/es/array-operators.md">Operadores ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators​" class="common-anchor-header">Operadores específicos de campo VARCHAR</h3><p>El operador <code translate="no">**Text_Match**</code> permite recuperar documentos con precisión basándose en términos de consulta específicos. Es especialmente útil para búsquedas filtradas que combinan filtros escalares con búsquedas de similitud vectorial. A diferencia de las búsquedas semánticas, Text Match se centra en las ocurrencias exactas de los términos.</p>
<p>Milvus utiliza Tantivy para soportar la indexación invertida y la búsqueda de texto basada en términos. El proceso implica.</p>
<ol>
<li><p><strong>Analizador</strong>: Tokeniza y procesa el texto de entrada.</p></li>
<li><p><strong>Indexación</strong>: Crea un índice invertido que asigna tokens únicos a documentos.</p></li>
</ol>
<p>Para más información, consulte <a href="/docs/es/keyword-match.md">Text Match</a>.</p>
