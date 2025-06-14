---
id: json-operators.md
title: Operadores JSON
summary: >-
  Milvus admite operadores avanzados para consultar y filtrar campos JSON, lo
  que los hace perfectos para gestionar datos complejos y estructurados. Estos
  operadores permiten una consulta altamente efectiva de documentos JSON,
  permitiéndole recuperar entidades basadas en elementos específicos, valores o
  condiciones dentro de los campos JSON. Esta sección le guiará a través del uso
  de operadores específicos JSON en Milvus, proporcionando ejemplos prácticos
  para ilustrar su funcionalidad.
---
<h1 id="JSON-Operators" class="common-anchor-header">Operadores JSON<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus soporta operadores avanzados para consultar y filtrar campos JSON, haciéndolos perfectos para gestionar datos complejos y estructurados. Estos operadores permiten una consulta altamente efectiva de documentos JSON, permitiéndole recuperar entidades basadas en elementos específicos, valores o condiciones dentro de los campos JSON. Esta sección le guiará a través del uso de operadores específicos JSON en Milvus, proporcionando ejemplos prácticos para ilustrar su funcionalidad.</p>
<div class="alert note">
<p>Los campos JSON no pueden manejar estructuras anidadas complejas y tratan todas las estructuras anidadas como cadenas simples. Por lo tanto, cuando se trabaja con campos JSON, es aconsejable evitar el anidamiento excesivamente profundo y asegurarse de que sus estructuras de datos son tan planas como sea posible para un rendimiento óptimo.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">Operadores JSON disponibles<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona varios potentes operadores JSON que ayudan a filtrar y consultar datos JSON, y estos operadores son:</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>: Filtra entidades donde la expresión JSON especificada se encuentra dentro del campo.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>: Asegura que todos los elementos de la expresión JSON especificada están presentes en el campo.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>: Filtra entidades donde al menos un miembro de la expresión JSON existe dentro del campo.</p></li>
</ul>
<p>Exploremos estos operadores con ejemplos para ver cómo se pueden aplicar en situaciones reales.</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">json_contains</code> comprueba si existe un elemento o subarray específico dentro de un campo JSON. Es útil cuando quieres asegurarte de que un array u objeto JSON contiene un valor concreto.</p>
<p><strong>Ejemplo</strong></p>
<p>Imagine que tiene una colección de productos, cada uno con un campo <code translate="no">tags</code> que contiene una matriz JSON de cadenas, como <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Quiere filtrar los productos que tienen la etiqueta <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, Milvus devolverá todos los productos cuyo campo <code translate="no">tags</code> contenga el elemento <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">json_contains_all</code> garantiza que todos los elementos de una expresión JSON especificada estén presentes en el campo de destino. Resulta especialmente útil cuando es necesario buscar múltiples valores dentro de una matriz JSON.</p>
<p><strong>Ejemplo</strong></p>
<p>Siguiendo con el escenario de las etiquetas de producto, si desea encontrar todos los productos que tengan las etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, y <code translate="no">&quot;new&quot;</code>, puede utilizar el operador <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esta consulta devolverá todos los productos cuya matriz <code translate="no">tags</code> contenga los tres elementos especificados: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, y <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">json_contains_any</code> filtra las entidades en las que existe al menos un miembro de la expresión JSON dentro del campo. Resulta útil cuando se desea buscar entidades en función de uno de varios valores posibles.</p>
<p><strong>Ejemplo</strong></p>
<p>Supongamos que desea filtrar productos que tengan al menos una de las etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, o <code translate="no">&quot;new&quot;</code>. Puede utilizar el operador <code translate="no">json_contains_any</code> para conseguirlo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>En este caso, Milvus le devolverá todos los productos que tengan al menos una de las etiquetas de la lista <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Incluso si un producto sólo tiene una de estas etiquetas, se incluirá en el resultado.</p>
