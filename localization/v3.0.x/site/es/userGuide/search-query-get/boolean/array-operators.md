---
id: array-operators.md
title: Operadores de ARRAY
summary: >-
  Milvus ofrece operadores ARRAY para filtrar campos ARRAY y actualizar
  parcialmente los valores de dichos campos.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operadores de ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ofrece operadores de ARRAY para filtrar campos de ARRAY y actualizar parcialmente los valores de dichos campos.</p>
<div class="alert note">
<p>Todos los elementos de una matriz deben ser del mismo tipo, y las estructuras anidadas dentro de las matrices se tratan como cadenas de texto simples. Por lo tanto, al trabajar con campos ARRAY, es recomendable evitar anidamientos excesivamente profundos y asegurarse de que las estructuras de datos sean lo más planas posible para obtener un rendimiento óptimo.</p>
</div>
<p>Los operadores de ARRAY en Milvus abarcan dos escenarios de uso:</p>
<ul>
<li><p>Expresiones de filtro para consultas y búsquedas.</p></li>
<li><p>Actualizaciones parciales en solicitudes de « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Operadores ARRAY disponibles<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera los operadores ARRAY disponibles en Milvus.</p>
<table>
<thead>
<tr><th>Operador</th><th>Uso en</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><a href="#ARRAYCONTAINS">ARRAY_CONTAINS(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si un elemento específico existe en un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si todos los elementos de una lista especificada existen en un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si algún elemento de una lista especificada existe en un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYLENGTH">ARRAY_LENGTH(identificador)</a></td><td>Expresión de filtro</td><td>Devuelve el número de elementos de un campo ARRAY y puede combinarse con operadores de comparación para filtrar.</td></tr>
<tr><td><a href="#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Añade elementos de carga útil a un campo ARRAY ya existente. Disponible en Milvus v2.6.17 y versiones posteriores.</td></tr>
<tr><td><a href="#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Elimina de un campo ARRAY existente todos los elementos que coincidan con un valor de la carga útil de la solicitud. Disponible en Milvus v2.6.17 y versiones posteriores.</td></tr>
</tbody>
</table>
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
    </button></h2><p>El operador « <code translate="no">ARRAY_CONTAINS</code> » comprueba si un elemento específico existe en un campo «ARRAY». Resulta útil cuando se desea encontrar entidades en las que un elemento determinado esté presente en el campo «ARRAY».</p>
<p><strong>Ejemplo</strong></p>
<p>Supongamos que tienes un campo de matriz <code translate="no">history_temperatures</code>, que contiene las temperaturas mínimas registradas en diferentes años. Para encontrar todas las entidades en las que la matriz contenga el valor <code translate="no">23</code>, puedes utilizar la siguiente expresión de filtro:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que la matriz <code translate="no">history_temperatures</code> contenga el valor <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_CONTAINS_ALL</code> » garantiza que todos los elementos de la lista especificada estén presentes en el campo de matriz. Este operador resulta útil cuando se desea buscar entidades que contengan varios valores en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Si quieres encontrar todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga tanto ` <code translate="no">23</code> ` como ` <code translate="no">24</code>`, puedes utilizar:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ALL filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga ambos valores especificados.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_CONTAINS_ANY</code> » comprueba si alguno de los elementos de la lista especificada está presente en el campo de matriz. Esto resulta útil cuando se desea encontrar entidades que contengan al menos uno de los valores especificados en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Para encontrar todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`, puedes utilizar:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ANY filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga al menos uno de los valores ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> devuelve la longitud (número de elementos) de un campo de matriz. Acepta exactamente un parámetro: el identificador del campo de matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Para encontrar todas las entidades en las que el array « <code translate="no">history_temperatures</code> » tenga menos de 10 elementos:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_LENGTH filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array <code translate="no">history_temperatures</code> tenga menos de 10 elementos.</p>
<h2 id="ARRAYAPPEND" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador ` <code translate="no">ARRAY_APPEND</code> ` añade elementos de carga útil a un campo `ARRAY` existente durante una solicitud ` <code translate="no">upsert</code> `. No es una expresión de filtro. Úsalo cuando quieras añadir valores a un array sin consultar primero el valor actual del mismo.</p>
<p>El siguiente ejemplo añade « <code translate="no">&quot;premium&quot;</code> » al campo ARRAY de la solicitud <code translate="no">tags</code> de la entidad cuya clave principal es « <code translate="no">1</code> »:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;premium&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;premium&quot;</span>}})).
    WithArrayAppend(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayAppend),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;premium&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;premium&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_APPEND&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;premium&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayAppend)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;premium&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_append&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al añadir « <code translate="no">ARRAY_APPEND</code> » a un campo mediante « <code translate="no">field_ops</code> », se habilita la semántica de actualización parcial para ese campo. Para conocer el flujo de trabajo completo, los tipos de elementos admitidos y los límites, consulta <a href="/docs/es/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">«Campos ARRAY de Upsert en modo de fusión</a>».</p>
<h2 id="ARRAYREMOVE" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_REMOVE</code> » elimina todos los elementos de un campo ARRAY existente que coincidan con un valor de la carga útil de la solicitud durante una solicitud de « <code translate="no">upsert</code> ». No se trata de una expresión de filtro. Úsalo cuando quieras eliminar valores coincidentes de un array sin consultar primero el valor actual del array.</p>
<p>El siguiente ejemplo elimina « <code translate="no">&quot;trial&quot;</code> » del campo ARRAY « <code translate="no">tags</code> » de la entidad cuya clave primaria es « <code translate="no">1</code> »:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;trial&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;trial&quot;</span>}})).
    WithArrayRemove(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayRemove),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;trial&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;trial&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_REMOVE&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;trial&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayRemove)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;trial&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_remove&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al asociar <code translate="no">ARRAY_REMOVE</code> a un campo mediante <code translate="no">field_ops</code>, se habilita la semántica de actualización parcial para ese campo. Para conocer el flujo de trabajo completo, los tipos de elementos admitidos y los límites, consulta <a href="/docs/es/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">Campos ARRAY</a> de <a href="/docs/es/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">Upsert en modo de fusión</a>.</p>
