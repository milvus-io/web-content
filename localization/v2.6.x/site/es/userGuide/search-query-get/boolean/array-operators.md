---
id: array-operators.md
title: Operadores ARRAY
summary: >-
  Milvus proporciona potentes operadores para consultar campos de matrices,
  permitiéndole filtrar y recuperar entidades basándose en el contenido de las
  matrices.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operadores ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus proporciona potentes operadores para consultar campos de matrices, permitiéndole filtrar y recuperar entidades basándose en el contenido de las matrices.</p>
<div class="alert note">
<p>Todos los elementos de una matriz deben ser del mismo tipo, y las estructuras anidadas dentro de las matrices se tratan como cadenas simples. Por lo tanto, cuando se trabaja con campos ARRAY, es aconsejable evitar el anidamiento excesivamente profundo y asegurarse de que sus estructuras de datos son tan planas como sea posible para un rendimiento óptimo.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Operadores ARRAY disponibles<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Los operadores ARRAY permiten una consulta detallada de los campos array en Milvus. Estos operadores son:</p>
<ul>
<li><p><a href="/docs/es/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: comprueba si un elemento específico existe en un campo de matriz.</p></li>
<li><p><a href="/docs/es/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: comprueba si todos los elementos de la lista especificada están presentes en el campo de matriz.</p></li>
<li><p><a href="/docs/es/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>comprueba si alguno de los elementos de la lista especificada está presente en el campo matriz.</p></li>
<li><p><a href="/docs/es/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: devuelve el número de elementos de un campo de matriz y puede combinarse con operadores de comparación para filtrar.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ARRAY_CONTAINS</code> comprueba si existe un elemento específico en un campo de matriz. Es útil cuando se desea encontrar entidades en las que un elemento determinado está presente en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Suponga que tiene un campo de matriz <code translate="no">history_temperatures</code>, que contiene las temperaturas mínimas registradas en diferentes años. Para encontrar todas las entidades en las que la matriz contiene el valor <code translate="no">23</code>, puede utilizar la siguiente expresión de filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contenga el valor <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">MATRIZ_CONTIENE_TODOS<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ARRAY_CONTAINS_ALL</code> garantiza que todos los elementos de la lista especificada están presentes en el campo de la matriz. Este operador resulta útil cuando se desea buscar entidades que contienen varios valores en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Si desea encontrar todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contiene tanto <code translate="no">23</code> como <code translate="no">24</code>, puede utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contenga los dos valores especificados.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">MATRIZ_CONTIENE_CUALQUIERA<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ARRAY_CONTAINS_ANY</code> comprueba si alguno de los elementos de la lista especificada está presente en el campo de la matriz. Resulta útil cuando se desea buscar entidades que contengan al menos uno de los valores especificados en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Para encontrar todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contiene <code translate="no">23</code> o <code translate="no">24</code>, puede utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contenga al menos uno de los valores <code translate="no">23</code> o <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LONGITUD<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> devuelve la longitud (número de elementos) de un campo de matriz. Acepta exactamente un parámetro: el identificador del campo de la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Encontrar todas las entidades en las que la matriz <code translate="no">history_temperatures</code> tiene menos de 10 elementos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que la matriz <code translate="no">history_temperatures</code> tenga menos de 10 elementos.</p>
