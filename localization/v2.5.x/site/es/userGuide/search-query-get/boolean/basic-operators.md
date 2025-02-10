---
id: basic-operators.md
summary: >-
  Milvus proporciona un rico conjunto de operadores básicos para ayudarle a
  filtrar y consultar datos de forma eficiente. Estos operadores le permiten
  refinar sus condiciones de búsqueda basándose en campos escalares, cálculos
  numéricos, condiciones lógicas y mucho más. Entender cómo utilizar estos
  operadores es crucial para construir consultas precisas y maximizar la
  eficiencia de sus búsquedas.
title: Operadores básicos
---
<h1 id="Basic-Operators​" class="common-anchor-header">Operadores básicos<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus proporciona un amplio conjunto de operadores básicos para ayudarle a filtrar y consultar datos de forma eficiente. Estos operadores le permiten refinar sus condiciones de búsqueda basándose en campos escalares, cálculos numéricos, condiciones lógicas y mucho más. Entender cómo utilizar estos operadores es crucial para construir consultas precisas y maximizar la eficiencia de sus búsquedas.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Operadores de comparación<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los operadores de comparación se utilizan para filtrar datos en función de la igualdad, la desigualdad o el tamaño. Son aplicables a campos numéricos, de texto y de fecha.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Operadores de comparación admitidos.</h3><ul>
<li><p><code translate="no">==</code> (Igual a)</p></li>
<li><p><code translate="no">!=</code> (No igual a)</p></li>
<li><p><code translate="no">&gt;</code> (Mayor que)</p></li>
<li><p><code translate="no">&lt;</code> (Menor que)</p></li>
<li><p><code translate="no">&gt;=</code> (Mayor o igual que)</p></li>
<li><p><code translate="no">&lt;=</code> (Menor o igual que)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Ejemplo 1: Filtrado con mayor o igual que (<code translate="no">&gt;=</code>)</h3><p>Si desea encontrar todas las entidades con <code translate="no">rating</code> mayor o igual a 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Ejemplo 2: Filtrado con menor o igual que (<code translate="no">&lt;=</code>)</h3><p>Para encontrar entidades con <code translate="no">discount</code> menor o igual a 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Operadores de rango<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los operadores de rango ayudan a filtrar datos basándose en conjuntos o rangos de valores específicos.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Operadores de rango admitidos.</h3><ul>
<li><p><code translate="no">IN</code>: Se utilizan para buscar valores dentro de un conjunto o rango específico.</p></li>
<li><p><code translate="no">LIKE</code>: Se utiliza para coincidir con un patrón (principalmente para campos de texto).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Ejemplo 1: Uso de <code translate="no">IN</code> para buscar varios valores</h3><p>Si desea encontrar todas las entidades en las que <code translate="no">color</code> es &quot;rojo&quot;, &quot;verde&quot; o &quot;azul&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Esto es útil cuando se quiere comprobar la pertenencia a una lista de valores.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Ejemplo 2: Utilización de <code translate="no">LIKE</code> para la búsqueda de patrones</h3><p>El operador <code translate="no">LIKE</code> se utiliza para la comparación de patrones en campos de cadena. Puede coincidir con subcadenas en distintas posiciones dentro del texto: como <strong>prefijo</strong>, <strong>infijo</strong> o <strong>sufijo</strong>. El operador <code translate="no">LIKE</code> utiliza el símbolo <code translate="no">%</code> como comodín, que puede coincidir con cualquier número de caracteres (incluido el cero).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Coincidencia de prefijo (empieza por)</h4><p>Para realizar una coincidencia de <strong>prefijo</strong>, en la que la cadena comienza con un patrón determinado, puede colocar el patrón al principio y utilizar <code translate="no">%</code> para que coincida con los caracteres que le siguen. Por ejemplo, para buscar todos los productos cuyo <code translate="no">name</code> empiece por &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Esto coincidirá con cualquier producto cuyo nombre empiece por &quot;Prod&quot;, como &quot;Producto A&quot;, &quot;Producto B&quot;, etc.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Coincidencia de sufijo (termina con)</h4><p>Para una coincidencia de <strong>sufijo</strong>, en la que la cadena termina con un patrón dado, coloque el símbolo <code translate="no">%</code> al principio del patrón. Por ejemplo, para buscar todos los productos cuyo <code translate="no">name</code> termine en &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Esto coincidirá con cualquier producto cuyo nombre termine en &quot;XYZ&quot;, como &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, etc.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Coincidencia infija (contiene)</h4><p>Para realizar una coincidencia <strong>infija</strong>, en la que el patrón puede aparecer en cualquier lugar de la cadena, puede colocar el símbolo <code translate="no">%</code> tanto al principio como al final del patrón. Por ejemplo, para buscar todos los productos cuyo <code translate="no">name</code> contenga la palabra &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Esto coincidirá con cualquier producto cuyo nombre contenga la subcadena &quot;Pro&quot;, como &quot;Product&quot;, &quot;ProLine&quot; o &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Operadores aritméticos<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los operadores aritméticos le permiten crear condiciones basadas en cálculos que implican campos numéricos.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Operadores aritméticos admitidos.</h3><ul>
<li><p><code translate="no">+</code> (Suma)</p></li>
<li><p><code translate="no">-</code> (Resta)</p></li>
<li><p><code translate="no">*</code> (Multiplicación)</p></li>
<li><p><code translate="no">/</code> (División)</p></li>
<li><p><code translate="no">%</code> (Módulo)</p></li>
<li><p><code translate="no">**</code> (Exponenciación)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Ejemplo 1: Utilización de la suma (<code translate="no">+</code>)</h3><p>Para encontrar entidades en las que el precio <code translate="no">total</code> es la suma de <code translate="no">base_price</code> y <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Ejemplo 2: Sustracción (<code translate="no">-</code>)</h3><p>Para encontrar entidades donde <code translate="no">quantity</code> es mayor que 50 y <code translate="no">quantity_sold</code> es menor que 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Ejemplo 3: Multiplicación (<code translate="no">*</code>)</h3><p>Para encontrar entidades donde <code translate="no">price</code> es mayor que 100 y <code translate="no">quantity</code> es mayor que 10, multiplicado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Ejemplo 4: Uso de la división (<code translate="no">/</code>)</h3><p>Para encontrar productos donde <code translate="no">total_price</code> dividido por <code translate="no">quantity</code> es menor que 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Ejemplo 5: Uso del módulo (<code translate="no">%</code>)</h3><p>Para encontrar entidades donde <code translate="no">id</code> es un número par (es decir, divisible por 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Ejemplo 6: Uso de la exponenciación (<code translate="no">**</code>)</h3><p>Para encontrar entidades donde <code translate="no">price</code> elevado a la potencia de 2 es mayor que 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Operadores lógicos<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los operadores lógicos se utilizan para combinar varias condiciones en una expresión de filtro más compleja. Entre ellos se incluyen <code translate="no">AND</code>, <code translate="no">OR</code> y <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Operadores lógicos admitidos.</h3><ul>
<li><p><code translate="no">AND</code>: Combina varias condiciones que deben ser todas verdaderas.</p></li>
<li><p><code translate="no">OR</code>: Combina condiciones donde al menos una debe ser verdadera.</p></li>
<li><p><code translate="no">NOT</code>: Niega una condición.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Ejemplo 1: Uso de <code translate="no">AND</code> para combinar condiciones</h3><p>Para encontrar todos los productos donde <code translate="no">price</code> es mayor que 100 y <code translate="no">stock</code> es mayor que 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Ejemplo 2: Uso de <code translate="no">OR</code> para combinar condiciones</h3><p>Para encontrar todos los productos donde <code translate="no">color</code> es &quot;rojo&quot; o &quot;azul&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Ejemplo 3: Uso de <code translate="no">NOT</code> para excluir una condición</h3><p>Para encontrar todos los productos donde <code translate="no">color</code> no es &quot;verde&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Consejos sobre el uso de operadores básicos con campos JSON y ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Aunque los operadores básicos de Milvus son versátiles y pueden aplicarse a campos escalares, también pueden utilizarse eficazmente con las claves y los índices de los campos JSON y ARRAY.</p>
<p>Por ejemplo, si tiene un campo <code translate="no">product</code> que contiene múltiples claves como <code translate="no">price</code>, <code translate="no">model</code>, y <code translate="no">tags</code>, siempre haga referencia a la clave directamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para buscar registros en los que la primera temperatura de una matriz de temperaturas registradas supere un valor determinado, utilice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Conclusión<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ofrece una serie de operadores básicos que le proporcionan flexibilidad a la hora de filtrar y consultar sus datos. Combinando operadores de comparación, de rango, aritméticos y lógicos, puede crear potentes expresiones de filtrado para acotar los resultados de búsqueda y recuperar los datos que necesita de forma eficiente.</p>
