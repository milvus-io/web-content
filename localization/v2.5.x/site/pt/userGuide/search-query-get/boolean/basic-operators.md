---
id: basic-operators.md
summary: >-
  O Milvus fornece um conjunto rico de operadores básicos para o ajudar a
  filtrar e consultar dados de forma eficiente. Estes operadores permitem-lhe
  refinar as suas condições de pesquisa com base em campos escalares, cálculos
  numéricos, condições lógicas e muito mais. Compreender como utilizar estes
  operadores é crucial para construir consultas precisas e maximizar a
  eficiência das suas pesquisas.
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
    </button></h1><p>Milvus fornece um conjunto rico de operadores básicos para o ajudar a filtrar e consultar dados de forma eficiente. Estes operadores permitem-lhe refinar as suas condições de pesquisa com base em campos escalares, cálculos numéricos, condições lógicas, e muito mais. Compreender como usar estes operadores é crucial para construir consultas precisas e maximizar a eficiência das suas pesquisas.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Operadores de comparação<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores de comparação são utilizados para filtrar dados com base na igualdade, desigualdade ou tamanho. Eles são aplicáveis a campos numéricos, de texto e de data.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Operadores de comparação suportados.</h3><ul>
<li><p><code translate="no">==</code> (Igual a)</p></li>
<li><p><code translate="no">!=</code> (Não igual a)</p></li>
<li><p><code translate="no">&gt;</code> (Maior que)</p></li>
<li><p><code translate="no">&lt;</code> (Menor que)</p></li>
<li><p><code translate="no">&gt;=</code> (Maior que ou igual a)</p></li>
<li><p><code translate="no">&lt;=</code> (Menor ou igual a)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Exemplo 1: Filtragem com Maior que ou Igual a (<code translate="no">&gt;=</code>)</h3><p>Se você quiser encontrar todas as entidades com <code translate="no">rating</code> maior ou igual a 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Exemplo 2: Filtragem com Menor que ou Igual a (<code translate="no">&lt;=</code>)</h3><p>Para encontrar entidades com <code translate="no">discount</code> menor ou igual a 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Operadores de intervalo<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores de intervalo ajudam a filtrar dados com base em conjuntos específicos ou intervalos de valores.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Operadores de intervalo suportados.</h3><ul>
<li><p><code translate="no">IN</code>: Utilizados para fazer a correspondência de valores dentro de um conjunto ou intervalo específico.</p></li>
<li><p><code translate="no">LIKE</code>: Usado para corresponder a um padrão (principalmente para campos de texto).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Exemplo 1: Usando <code translate="no">IN</code> para corresponder a vários valores</h3><p>Se você quiser encontrar todas as entidades onde o <code translate="no">color</code> é &quot;vermelho&quot;, &quot;verde&quot; ou &quot;azul&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Isso é útil quando se deseja verificar a associação em uma lista de valores.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Exemplo 2: Usando <code translate="no">LIKE</code> para correspondência de padrão</h3><p>O operador <code translate="no">LIKE</code> é utilizado para correspondência de padrões em campos de cadeia de caracteres. Ele pode corresponder substrings em diferentes posições dentro do texto: como um <strong>prefixo</strong>, <strong>infixo</strong> ou <strong>sufixo</strong>. O operador <code translate="no">LIKE</code> utiliza o símbolo <code translate="no">%</code> como um wildcard, que pode corresponder a qualquer número de caracteres (incluindo zero).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Correspondência de prefixo (começa com)</h4><p>Para efetuar uma correspondência <strong>de prefixo</strong>, em que a cadeia de caracteres começa com um determinado padrão, pode colocar o padrão no início e utilizar <code translate="no">%</code> para corresponder a quaisquer caracteres a seguir. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> comece por &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Isto fará corresponder qualquer produto cujo nome comece por &quot;Prod&quot;, como &quot;Produto A&quot;, &quot;Produto B&quot;, etc.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Correspondência de sufixo (termina com)</h4><p>Para uma correspondência <strong>de sufixo</strong>, em que a cadeia de caracteres termina com um determinado padrão, coloque o símbolo <code translate="no">%</code> no início do padrão. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> termina com &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Isto corresponderá a qualquer produto cujo nome termine com &quot;XYZ&quot;, como &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, etc.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Correspondência de infixos (Contém)</h4><p>Para efetuar uma correspondência <strong>infixa</strong>, em que o padrão pode aparecer em qualquer parte da cadeia de caracteres, pode colocar o símbolo <code translate="no">%</code> no início e no fim do padrão. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> contenha a palavra &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Isso corresponderá a qualquer produto cujo nome contenha a substring &quot;Pro&quot;, como &quot;Product&quot;, &quot;ProLine&quot; ou &quot;SuperPro&quot;.</p>
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
    </button></h2><p>Os operadores aritméticos permitem-lhe criar condições com base em cálculos que envolvem campos numéricos.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Operadores aritméticos suportados.</h3><ul>
<li><p><code translate="no">+</code> (Adição)</p></li>
<li><p><code translate="no">-</code> (Subtração)</p></li>
<li><p><code translate="no">*</code> (Multiplicação)</p></li>
<li><p><code translate="no">/</code> (Divisão)</p></li>
<li><p><code translate="no">%</code> (Módulo)</p></li>
<li><p><code translate="no">**</code> (Exponenciação)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Exemplo 1: Utilizar a adição (<code translate="no">+</code>)</h3><p>Para encontrar entidades onde o preço <code translate="no">total</code> é a soma de <code translate="no">base_price</code> e <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Exemplo 2: Usando Subtração (<code translate="no">-</code>)</h3><p>Para encontrar entidades onde <code translate="no">quantity</code> é maior que 50 e <code translate="no">quantity_sold</code> é menor que 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Exemplo 3: Usando Multiplicação (<code translate="no">*</code>)</h3><p>Para encontrar entidades onde <code translate="no">price</code> é maior que 100 e <code translate="no">quantity</code> é maior que 10, multiplicado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Exemplo 4: Utilizar a divisão (<code translate="no">/</code>)</h3><p>Para encontrar produtos em que <code translate="no">total_price</code> dividido por <code translate="no">quantity</code> é menor que 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Exemplo 5: Usando Modulus (<code translate="no">%</code>)</h3><p>Para encontrar entidades onde o <code translate="no">id</code> é um número par (ou seja, divisível por 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Exemplo 6: Usando Exponenciação (<code translate="no">**</code>)</h3><p>Para encontrar entidades onde <code translate="no">price</code> elevado à potência de 2 é maior que 1000.</p>
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
    </button></h2><p>Os operadores lógicos são usados para combinar várias condições em uma expressão de filtro mais complexa. Estes incluem <code translate="no">AND</code>, <code translate="no">OR</code>, e <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Operadores lógicos suportados.</h3><ul>
<li><p><code translate="no">AND</code>: Combina várias condições que devem ser todas verdadeiras.</p></li>
<li><p><code translate="no">OR</code>: Combina condições em que pelo menos uma deve ser verdadeira.</p></li>
<li><p><code translate="no">NOT</code>: Nega uma condição.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Exemplo 1: Usando <code translate="no">AND</code> para combinar condições</h3><p>Para encontrar todos os produtos em que <code translate="no">price</code> é maior que 100 e <code translate="no">stock</code> é maior que 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Exemplo 2: Usando <code translate="no">OR</code> para combinar condições</h3><p>Para encontrar todos os produtos em que <code translate="no">color</code> é &quot;red&quot; (vermelho) ou &quot;blue&quot; (azul).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Exemplo 3: Usando <code translate="no">NOT</code> para excluir uma condição</h3><p>Para encontrar todos os produtos em que <code translate="no">color</code> não seja &quot;verde&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Dicas sobre como usar operadores básicos com campos JSON e ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Embora os operadores básicos do Milvus sejam versáteis e possam ser aplicados a campos escalares, eles também podem ser usados de forma eficaz com as chaves e índices nos campos JSON e ARRAY.</p>
<p>Por exemplo, se tiver um campo <code translate="no">product</code> que contenha várias chaves como <code translate="no">price</code>, <code translate="no">model</code>, e <code translate="no">tags</code>, faça sempre referência à chave diretamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Para encontrar registos em que a primeira temperatura de uma matriz de temperaturas registadas excede um determinado valor, utilize.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Conclusão<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus oferece uma gama de operadores básicos que lhe dão flexibilidade na filtragem e consulta dos seus dados. Ao combinar operadores de comparação, de intervalo, aritméticos e lógicos, pode criar expressões de filtragem poderosas para restringir os resultados da pesquisa e obter os dados de que necessita de forma eficiente.</p>
