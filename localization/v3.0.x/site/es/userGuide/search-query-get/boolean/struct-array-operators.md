---
id: struct-array-operators.md
title: Operadores de StructArray
summary: >-
  Los operadores de StructArray filtran entidades evaluando predicados sobre
  subcampos escalares dentro de un campo StructArray. Utiliza esta página como
  referencia sintáctica para el operador `element_filter` y la familia de
  operadores `MATCH_*`.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operadores de StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Los operadores de StructArray filtran entidades evaluando predicados en subcampos escalares dentro de un campo StructArray. Utiliza esta página como referencia sintáctica para « <code translate="no">element_filter</code> » y la familia de operadores « <code translate="no">MATCH_*</code> ».</p>
<p>El filtrado de StructArray cuenta con dos familias de operadores:</p>
<table>
<thead>
<tr><th>Familia de operadores</th><th>Finalidad principal</th><th>Comportamiento del resultado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Coincide con los elementos de Struct que satisfacen un predicado escalar.</td><td>En la búsqueda a nivel de elemento, los resultados coincidentes pueden incluir desplazamientos de elementos. En la consulta a nivel de fila o en la búsqueda filtrada, la forma del resultado depende de la API y de los campos de salida.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Selecciona entidades en función del número de elementos de Struct que satisfacen un predicado escalar.</td><td>Filtrado a nivel de fila. Estos operadores no devuelven por sí mismos las posiciones de los elementos.</td></tr>
</tbody>
</table>
<p>Utiliza subcampos escalares en los operadores StructArray. Los subcampos vectoriales se utilizan en las rutas de búsqueda vectorial y no son entradas de predicados escalares.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Cuándo utilizar cada operador<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Objetivo</th><th>Uso</th></tr>
</thead>
<tbody>
<tr><td>Limitar la búsqueda vectorial a nivel de elemento a aquellos elementos que cumplan condiciones escalares.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Cumplir varias condiciones escalares dentro del mismo elemento Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Devolver únicamente las entidades en las que al menos un elemento Struct cumpla un predicado.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Devolver únicamente las entidades en las que todos los elementos Struct cumplan un predicado.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Devuelve únicamente las entidades en las que al menos, como máximo o exactamente <code translate="no">N</code> elementos Struct satisfacen un predicado.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Filtro de elementos<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice « <code translate="no">element_filter(structArrayField, predicate)</code> » para buscar coincidencias con elementos de Struct en un campo StructArray.</p>
<p>Dentro del predicado, utilice « <code translate="no">$[subfield]</code> » para hacer referencia a un subcampo escalar del elemento Struct actual.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Cuando se utilizan varias condiciones dentro del predicado, todas las referencias a ` <code translate="no">$[subfield]</code> ` se aplican al mismo elemento de la estructura:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Cuando se combine un predicado a nivel de entidad con ` <code translate="no">element_filter</code>`, coloque ` <code translate="no">element_filter</code> ` al final de la expresión:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> solo puede aparecer una vez en una expresión de filtro. No anides <code translate="no">element_filter</code> ni <code translate="no">MATCH_*</code> dentro de otro <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operadores de coincidencia de familias<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza los operadores « <code translate="no">MATCH_*</code> » cuando se deba seleccionar una entidad en función del número de elementos «Struct» que cumplan un predicado.</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Al menos un elemento Struct cumple el predicado.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Todos los elementos Struct satisfacen el predicado.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Al menos <code translate="no">N</code> elementos Struct cumplen el predicado.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Como máximo, un <code translate="no">N</code> e de los elementos de la estructura cumple el predicado.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Exactamente <code translate="no">N</code> elementos de Struct satisfacen el predicado.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> Tanto « <code translate="no">element_filter</code> » como « » pueden expresar que al menos un elemento de Struct cumple un predicado. Utiliza « <code translate="no">MATCH_ANY</code> » cuando solo necesites filtrado a nivel de fila. Utiliza « <code translate="no">element_filter</code> » cuando necesites restricciones a nivel de elemento, como filtrar qué elementos de Struct participan en una búsqueda vectorial a nivel de elemento.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> se evalúa como « <code translate="no">true</code> » si al menos un elemento de StructArray cumple el predicado.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para un StructArray vacío, <code translate="no">MATCH_ANY</code> devuelve <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> devuelve « <code translate="no">true</code> » si todos los elementos de StructArray satisfacen el predicado.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Para un StructArray vacío, ` <code translate="no">MATCH_ALL</code> ` devuelve ` <code translate="no">true</code>`.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> devuelve <code translate="no">true</code> si el número de elementos que satisfacen el predicado es mayor o igual que <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">MATCH_LEAST</code>, <code translate="no">threshold</code> debe ser un entero positivo.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> devuelve el valor « <code translate="no">true</code> » si el número de elementos que satisfacen el predicado es menor o igual que « <code translate="no">threshold</code> ».</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> puede ser cero o un entero positivo.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> devuelve el valor « <code translate="no">true</code> » si el número de elementos que satisfacen el predicado es exactamente igual a « <code translate="no">threshold</code> ».</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> puede ser cero o un entero positivo.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predicados admitidos<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>La sintaxis « <code translate="no">$[...]</code> » representa el valor escalar del elemento Struct actual. La compatibilidad con los predicados depende del tipo de subcampo escalar.</p>
<table>
<thead>
<tr><th>Tipo de subcampo</th><th>Compatibilidad con predicados a nivel de elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predicados escalares como <code translate="no">$[has_code] == true</code> o <code translate="no">!($[has_code] == true)</code>. Evita expresiones booleanas sin calificaciones como <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>comparaciones, rangos encadenados, <code translate="no">in</code>, <code translate="no">not in</code>, expresiones aritméticas con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> o <code translate="no">%</code> seguidas de una comparación, y combinaciones lógicas.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparación, rango encadenado, <code translate="no">in</code>, <code translate="no">not in</code>, expresiones aritméticas con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> o <code translate="no">/</code> seguidas de una comparación, y combinaciones lógicas. El operador <code translate="no">%</code> no es compatible con subcampos de punto flotante.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Comparación de cadenas, rango encadenado, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> y combinaciones lógicas.</td></tr>
<tr><td>Subcampos vectoriales</td><td>No son compatibles como entradas de predicados escalares de <code translate="no">$[...]</code>. En su lugar, utiliza subcampos vectoriales mediante la búsqueda con EmbeddingList o la búsqueda vectorial a nivel de elemento.</td></tr>
</tbody>
</table>
<p>Los operadores lógicos como « <code translate="no">&amp;&amp;</code> », « <code translate="no">\|\|</code> » y « <code translate="no">!</code> » se aplican a las expresiones de predicado. Por ejemplo, escriba « <code translate="no">!($[has_code] == true)</code> » en lugar de « <code translate="no">!$[has_code]</code> ».</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Predicados no admitidos<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Los predicados de nivel de elemento de <code translate="no">$[...]</code> no admiten:</p>
<ul>
<li><p>Funciones de coincidencia de texto, como <code translate="no">text_match(field, &quot;...&quot;)</code> o <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>La sintaxis de rutas JSON, la función ` <code translate="no">exists</code> ` aplicada a rutas JSON, o funciones JSON como ` <code translate="no">json_contains</code>`, ` <code translate="no">json_contains_all</code>` o ` <code translate="no">json_contains_any</code>`.</p></li>
<li><p>Funciones de contenedores de matrices como <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> o <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Funciones de geometría/SIG.</p></li>
<li><p>Expresiones de Timestamptz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Predicados vectoriales a nivel de campo.</p></li>
<li><p>Llamadas a funciones de filtro genéricas, a menos que la firma específica de la función y la ruta de ejecución admitan explícitamente predicados a nivel de elemento de StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Reglas sintácticas<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> Los nombres de los operadores no distinguen entre mayúsculas y minúsculas.</p></li>
<li><p>Utilice « <code translate="no">$[subfield]</code> » únicamente dentro de los predicados « <code translate="no">element_filter</code> » o « <code translate="no">MATCH_*</code> ».</p></li>
<li><p>No utilices « <code translate="no">$[subfield]</code> » como ruta JSON, contenedor de matriz o referencia a un campo vectorial.</p></li>
<li><p>No anides « <code translate="no">element_filter</code> » o « <code translate="no">MATCH_*</code> » dentro de otro operador «StructArray».</p></li>
<li><p>Utilice <code translate="no">threshold=N</code> con nombre para <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> y <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> En un StructArray vacío devuelve <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> sobre un StructArray vacío devuelve <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Véase también<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/es/filtered-search-with-structarray.md">Búsqueda filtrada con StructArray</a></p></li>
<li><p><a href="/docs/es/basic-vector-search-with-structarray.md">Búsqueda vectorial básica con StructArray</a></p></li>
<li><p><a href="/docs/es/index-structarray-fields.md">Indexar campos de StructArray</a></p></li>
<li><p><a href="/docs/es/structarray-limits.md">Límites de StructArray</a></p></li>
</ul>
