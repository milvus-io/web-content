---
id: struct-array-operators.md
title: Operadores de StructArray
summary: >-
  Los operadores de StructArray filtran entidades evaluando predicados en
  subcampos escalares dentro de un campo StructArray. Utiliza esta página como
  referencia sintáctica para `element_filter`, la familia de operadores
  `MATCH_*` y los predicados a nivel de fila en rutas de StructArray.
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
    </button></h1><p>Los operadores de StructArray filtran entidades evaluando predicados en subcampos escalares dentro de un campo StructArray. Utiliza esta página como referencia sintáctica para « <code translate="no">element_filter</code> », la familia de operadores « <code translate="no">MATCH_*</code> » y los predicados a nivel de fila en rutas de StructArray.</p>
<p>El filtrado de StructArray cuenta con dos familias de operadores y un conjunto de predicados de ruta a nivel de fila:</p>
<table>
<thead>
<tr><th>Formulario de filtro</th><th>Finalidad principal</th><th>Comportamiento del resultado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Coincidencia Elementos Struct que satisfacen un predicado escalar.</td><td>En la búsqueda a nivel de elemento, los resultados coincidentes pueden incluir desplazamientos de elementos. En la consulta a nivel de fila o en la búsqueda filtrada, la forma del resultado depende de la API y de los campos de salida.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Selecciona entidades en función del número de elementos de Struct que satisfagan un predicado escalar.</td><td>Filtrado a nivel de fila. Estos operadores no devuelven por sí mismos las posiciones de los elementos.</td></tr>
<tr><td>Predicados de ruta a nivel de fila</td><td>Comprueba la posición de un elemento, cuenta elementos de Struct o comprueba valores de subcampos en distintos elementos sin un predicado « <code translate="no">$[...]</code> ».</td><td>Filtrado a nivel de fila. Estos predicados no devuelven desplazamientos de elementos.</td></tr>
</tbody>
</table>
<p>Utiliza subcampos escalares en los operadores StructArray. Los subcampos vectoriales se utilizan en las rutas de búsqueda vectoriales y no son entradas de predicados escalares.</p>
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
    </button></h2><p>Elige un operador en función de tu objetivo de filtrado:</p>
<table>
<thead>
<tr><th>Objetivo</th><th>Uso</th></tr>
</thead>
<tbody>
<tr><td>Limitar la búsqueda vectorial a nivel de elemento a aquellos elementos que cumplan condiciones escalares.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Cumplir varias condiciones escalares dentro del mismo elemento Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Devolver solo las entidades en las que al menos un elemento Struct cumpla un predicado.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Devolver únicamente las entidades en las que todos los elementos Struct cumplan un predicado.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Devuelve únicamente las entidades en las que al menos, como máximo o exactamente <code translate="no">N</code> elementos Struct cumplan un predicado.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Comprobar el elemento Struct en una posición específica, como el primer fragmento.</td><td>Una ruta posicional como <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Filtrar por el número de elementos de Struct en una entidad.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Comprueba si algún elemento de la estructura contiene un valor de subcampo, sin combinar condiciones sobre el mismo elemento.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_contains_all</code> en una ruta de subcampo como <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">Datos de ejemplo<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes ejemplos parciales de entidades muestran únicamente los campos « <code translate="no">chunks</code> » de <strong>la Entidad A</strong> y <strong>la Entidad B</strong>. No son cargas útiles de inserción completas.</p>
<p><strong>Entidad A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Entidad B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Utiliza « <code translate="no">element_filter(structArrayField, predicate)</code> » para hacer coincidir elementos «Struct» en un campo «StructArray».</p>
<p>Dentro del predicado, utilice « <code translate="no">$[subfield]</code> » para hacer referencia a un subcampo escalar del elemento Struct actual.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto la Entidad A como la Entidad B cumplen la condición: los siete elementos mostrados tienen « <code translate="no">section</code> » establecido en « <code translate="no">&quot;index&quot;</code> ».</p>
<p>Cuando se utilizan varias condiciones dentro del predicado, todas las referencias a ` <code translate="no">$[subfield]</code> ` se aplican al mismo elemento `Struct`:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>Solo la Entidad B cumple los criterios: sus tres elementos satisfacen ambas condiciones.</p>
<p>Cuando se combine un predicado a nivel de entidad con « <code translate="no">element_filter</code> », coloque « <code translate="no">element_filter</code> » al final de la expresión:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>El ejemplo de « <code translate="no">category</code> » ilustra el orden de las expresiones independientemente de los datos del ejemplo, que no definen « <code translate="no">category</code> ».</p>
<p><code translate="no">element_filter</code> solo puede aparecer una vez en una expresión de filtro. No anides <code translate="no">element_filter</code> ni <code translate="no">MATCH_*</code> dentro de otro <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operadores de familia de coincidencias<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice los operadores « <code translate="no">MATCH_*</code> » cuando se deba seleccionar una entidad en función del número de elementos «Struct» que satisfagan un predicado. Estos operadores tienen los siguientes significados:</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Al menos un elemento Struct cumple el predicado.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Todos los elementos Struct satisfacen el predicado.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Al menos <code translate="no">N</code> elementos Struct cumplen el predicado.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Como máximo, un <code translate="no">N</code> es elementos de la estructura cumplen el predicado.</td></tr>
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
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto la entidad A como la entidad B coinciden porque cada una tiene al menos un elemento con <code translate="no">section</code> establecido en <code translate="no">&quot;index&quot;</code>.</p>
<p>En el caso de un StructArray vacío, <code translate="no">MATCH_ANY</code> devuelve <code translate="no">false</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> se evalúa como « <code translate="no">true</code> » si todos los elementos del StructArray satisfacen el predicado.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto la Entidad A como la Entidad B cumplen la condición, ya que todos los elementos mostrados tienen <code translate="no">has_code</code> establecido en <code translate="no">true</code>.</p>
<p>En el caso de un StructArray vacío, <code translate="no">MATCH_ALL</code> devuelve <code translate="no">true</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> se evalúa como ` <code translate="no">true</code> ` si el número de elementos que cumplen el predicado es mayor o igual que ` <code translate="no">threshold</code>`.</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>Solo la entidad B cumple la condición: la entidad A no tiene ningún elemento que cumpla los requisitos, mientras que la entidad B tiene tres.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> devuelve el valor <code translate="no">true</code> si el número de elementos que satisfacen el predicado es menor o igual que <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Ninguna de las entidades cumple el criterio: la entidad A tiene cuatro elementos que cumplen el criterio y la entidad B tiene tres.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> devuelve <code translate="no">true</code> si el número de elementos que satisfacen el predicado es exactamente igual a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Ninguna de las entidades coincide, ya que ninguna tiene un elemento con <code translate="no">section</code> establecido en <code translate="no">&quot;filter&quot;</code>.</p>
<p>Para <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> puede ser cero o un entero positivo.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Predicados a nivel de fila en rutas de StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de ` <code translate="no">element_filter</code> ` y ` <code translate="no">MATCH_*</code>`, una expresión de filtro normal puede hacer referencia directamente a un campo de StructArray o a uno de sus subcampos escalares. Estos predicados se evalúan a nivel de entidad y no devuelven desplazamientos de elementos.</p>
<h3 id="Subfield-access" class="common-anchor-header">Acceso a subcampos<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">Acceder a un elemento de Struct por posición</h4><p>Utilice <code translate="no">structArrayField[index][subfield]</code> para hacer referencia a un subcampo escalar del elemento Struct en una posición con inicio en cero. Escriba primero la posición y, a continuación, el nombre del subcampo. La ruta inversa <code translate="no">chunks[quality_score][0] &gt; 0.8</code> no es válida.</p>
<p>Por ejemplo, comprueba la puntuación de calidad del primer elemento:</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>Solo la Entidad B coincide con esta expresión.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>En el caso de la Entidad A y la Entidad B, el predicado de la primera sección coincide con ambas entidades, el segundo predicado de puntuación coincide solo con la Entidad B y el rango de puntuación estricto no coincide con ninguna de ellas. El predicado « <code translate="no">page</code> » es un ejemplo genérico; los datos de ejemplo no definen « <code translate="no">page</code> ».</p>
<p>Las rutas posicionales admiten predicados de comparación, « <code translate="no">in</code> », « <code translate="no">not in</code> » y de rango encadenado en subcampos escalares. Una entidad no coincide cuando su campo «StructArray» no tiene ningún elemento en esa posición.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">Operadores ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Contar elementos de Struct</h4><p>Utilice <code translate="no">array_length(structArrayField)</code> para filtrar por el número de elementos Struct en una entidad. <code translate="no">array_length</code> en una ruta de subcampo, como <code translate="no">array_length(chunks[section])</code>, devuelve el mismo recuento, ya que cada subcampo contiene un valor por cada elemento Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>Los predicados de recuento del campo principal coinciden con ambas entidades para <code translate="no">&gt;= 3</code> y con ninguna para <code translate="no">== 1</code>. También se pueden contar los valores en una ruta de subcampo:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>Solo la entidad B cumple el criterio, ya que su subcampo « <code translate="no">quality_score</code> » tiene tres valores.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">Comprobar los valores de los subcampos en todos los elementos</h4><p>Por ejemplo, comprueba si alguna puntuación de calidad es igual a « <code translate="no">0.74</code> »:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>Solo coincide la entidad A.</p>
<p>Utiliza <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_contains_all</code> en una ruta de subcampo escalar para comprobar los valores de ese subcampo en todos los elementos Struct de la entidad. Cada ruta de subcampo se evalúa por separado, por lo que las condiciones de diferentes subcampos pueden cumplirse mediante distintos elementos Struct.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>En los datos de ejemplo, las expresiones <code translate="no">array_contains</code> y <code translate="no">array_contains_any</code> coinciden con ambas entidades. La expresión <code translate="no">array_contains_all</code> no coincide con ninguna, ya que ninguna de las entidades tiene una sección <code translate="no">&quot;search&quot;</code>. Estos ejemplos no muestran condiciones que cumplan diferentes elementos en diferentes subcampos.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> selecciona las mismas entidades que <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Utilice <code translate="no">MATCH_*</code> o <code translate="no">element_filter</code> cuando deban cumplirse varias condiciones para el mismo elemento Struct, ya que los predicados <code translate="no">$[...]</code> se evalúan por elemento.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Comprobar si un campo StructArray nulo es nulo<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice <code translate="no">IS NULL</code> o <code translate="no">IS NOT NULL</code> en un campo StructArray nulo para comprobar el valor completo del campo. NULL se aplica a todo el campo StructArray, por lo que estos predicados solo aceptan el nombre del campo, no una ruta de subcampo.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>Para conocer su aplicabilidad, consulta <a href="/docs/es/structarray-limits.md#Nullable-and-dynamic-schema-limits">«Límites de esquemas nulos y dinámicos</a>». Tanto la Entidad A como la Entidad B tienen valores StructArray no nulos.</p>
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
    </button></h2><p>La sintaxis « <code translate="no">$[...]</code> » representa el valor escalar del elemento Struct actual. La compatibilidad con los predicados depende del tipo de subcampo escalar:</p>
<table>
<thead>
<tr><th>Tipo de subcampo</th><th>Compatibilidad con predicados a nivel de elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predicados escalares como <code translate="no">$[has_code] == true</code> o <code translate="no">!($[has_code] == true)</code>. Evite expresiones booleanas sin calificaciones como <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>comparaciones, rangos encadenados, <code translate="no">in</code>, <code translate="no">not in</code>, expresiones aritméticas con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> o <code translate="no">%</code> seguidas de una comparación, y combinaciones lógicas.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparación, rango encadenado, <code translate="no">in</code>, <code translate="no">not in</code>, expresiones aritméticas con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> o <code translate="no">/</code> seguidas de una comparación, y combinaciones lógicas. El operador <code translate="no">%</code> no es compatible con subcampos de punto flotante.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Comparación de cadenas, rango encadenado, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> y combinaciones lógicas.</td></tr>
<tr><td>Subcampos vectoriales</td><td>No son compatibles como entradas de predicados escalares de <code translate="no">$[...]</code>. En su lugar, utilice subcampos vectoriales mediante la búsqueda con EmbeddingList o la búsqueda vectorial a nivel de elemento.</td></tr>
</tbody>
</table>
<p>Los operadores lógicos como « <code translate="no">&amp;&amp;</code> », « <code translate="no">||</code> » y « <code translate="no">!</code> » se aplican a las expresiones de predicado. Por ejemplo, escribe « <code translate="no">!($[has_code] == true)</code> » en lugar de « <code translate="no">!$[has_code]</code> ».</p>
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
<li><p>La sintaxis de rutas JSON, <code translate="no">exists</code> sobre rutas JSON, o funciones JSON como <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code> o <code translate="no">json_contains_any</code>.</p></li>
<li><p>Funciones de contenedores de matrices como <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_length</code> en <code translate="no">$[subfield]</code>. Utilice estas funciones en una ruta de subcampo como <code translate="no">chunks[section]</code> en un predicado a nivel de fila.</p></li>
<li><p><code translate="no">$[subfield] is null</code> o <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Funciones de geometría/SIG.</p></li>
<li><p>Expresiones de marca de tiempo tz.</p></li>
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
    </button></h2><p>Sigue estas reglas sintácticas:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> Los nombres de los operadores no distinguen entre mayúsculas y minúsculas.</p></li>
<li><p>Utilice « <code translate="no">$[subfield]</code> » únicamente dentro de los predicados « <code translate="no">element_filter</code> » o « <code translate="no">MATCH_*</code> ». Por ejemplo, « <code translate="no">array_length($[section])</code> » no es válido.</p></li>
<li><p>No utilices « <code translate="no">$[subfield]</code> » como ruta JSON, contenedor de matriz o referencia de campo vectorial.</p></li>
<li><p>No anides <code translate="no">element_filter</code> ni <code translate="no">MATCH_*</code> dentro de otro operador StructArray.</p></li>
<li><p>Utilice « <code translate="no">threshold=N</code> » con nombre para « <code translate="no">MATCH_LEAST</code> », « <code translate="no">MATCH_MOST</code> » y « <code translate="no">MATCH_EXACT</code> ».</p></li>
<li><p>En las rutas posicionales, escribe la posición del elemento antes del nombre del subcampo: <code translate="no">chunks[0][section]</code>, no <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>Utilice <code translate="no">IS NULL</code> y <code translate="no">IS NOT NULL</code> únicamente en el campo StructArray completo, como por ejemplo <code translate="no">chunks is null</code>. No los utilice en una ruta de subcampo como <code translate="no">chunks[section]</code> ni en <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> En un StructArray vacío devuelve <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> En un StructArray vacío devuelve <code translate="no">true</code>.</p></li>
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
    </button></h2><p>Para obtener orientación relacionada, consulte:</p>
<ul>
<li><p><a href="/docs/es/filtered-search-with-structarray.md">Búsqueda filtrada con StructArray</a></p></li>
<li><p><a href="/docs/es/basic-vector-search-with-structarray.md">Búsqueda vectorial básica con StructArray</a></p></li>
<li><p><a href="/docs/es/index-structarray-fields.md">Indexar campos de StructArray</a></p></li>
<li><p><a href="/docs/es/structarray-limits.md">Límites de StructArray</a></p></li>
</ul>
