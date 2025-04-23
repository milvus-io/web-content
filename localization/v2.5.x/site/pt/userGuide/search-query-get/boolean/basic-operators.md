---
id: basic-operators.md
title: Operadores básicos
summary: >-
  O Milvus fornece um conjunto rico de operadores básicos para o ajudar a
  filtrar e consultar dados de forma eficiente. Estes operadores permitem-lhe
  refinar as suas condições de pesquisa com base em campos escalares, cálculos
  numéricos, condições lógicas e muito mais. Compreender como utilizar estes
  operadores é crucial para construir consultas precisas e maximizar a
  eficiência das suas pesquisas.
---
<h1 id="Basic-Operators" class="common-anchor-header">Operadores básicos<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
<h2 id="Comparison-operators" class="common-anchor-header">Operadores de comparação<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores de comparação são utilizados para filtrar dados com base na igualdade, desigualdade ou tamanho. Eles são aplicáveis a campos numéricos e de texto.</p>
<h3 id="Supported-Comparison-Operators" class="common-anchor-header">Operadores de comparação suportados:</h3><ul>
<li><p><code translate="no">==</code> (Igual a)</p></li>
<li><p><code translate="no">!=</code> (Não igual a)</p></li>
<li><p><code translate="no">&gt;</code> (Maior que)</p></li>
<li><p><code translate="no">&lt;</code> (Menor que)</p></li>
<li><p><code translate="no">&gt;=</code> (Maior que ou igual a)</p></li>
<li><p><code translate="no">&lt;=</code> (Menor ou igual a)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-" class="common-anchor-header">Exemplo 1: Filtragem com Equal To (<code translate="no">==</code>)</h3><p>Suponha que tem um campo chamado <code translate="no">status</code> e quer encontrar todas as entidades em que <code translate="no">status</code> está "ativo". Você pode usar o operador de igualdade <code translate="no">==</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-" class="common-anchor-header">Exemplo 2: Filtragem com Not Equal To (<code translate="no">!=</code>)</h3><p>Para encontrar entidades onde <code translate="no">status</code> não é "inativo":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-" class="common-anchor-header">Exemplo 3: Filtragem com Greater Than (<code translate="no">&gt;</code>)</h3><p>Se você quiser encontrar todas as entidades com um <code translate="no">age</code> maior que 30:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than" class="common-anchor-header">Exemplo 4: Filtragem com menos que</h3><p>Para encontrar entidades onde <code translate="no">price</code> é menor que 100:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-" class="common-anchor-header">Exemplo 5: Filtrando com Maior que ou Igual a (<code translate="no">&gt;=</code>)</h3><p>Se você quiser encontrar todas as entidades com <code translate="no">rating</code> maior ou igual a 4:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To" class="common-anchor-header">Exemplo 6: Filtragem com Menor que ou Igual a</h3><p>Para encontrar entidades com <code translate="no">discount</code> menor ou igual a 10%:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">Operadores de intervalo<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
<h3 id="Supported-Range-Operators" class="common-anchor-header">Operadores de intervalo suportados:</h3><ul>
<li><p><code translate="no">IN</code>: Utilizados para fazer a correspondência de valores dentro de um conjunto ou intervalo específico.</p></li>
<li><p><code translate="no">LIKE</code>: Usado para corresponder a um padrão (principalmente para campos de texto).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values" class="common-anchor-header">Exemplo 1: Usando <code translate="no">IN</code> para corresponder a vários valores</h3><p>Se você quiser encontrar todas as entidades onde o <code translate="no">color</code> é "vermelho", "verde" ou "azul":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isso é útil quando se deseja verificar a associação em uma lista de valores.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching" class="common-anchor-header">Exemplo 2: Usando <code translate="no">LIKE</code> para correspondência de padrão</h3><p>O operador <code translate="no">LIKE</code> é utilizado para correspondência de padrões em campos de cadeia de caracteres. Ele pode corresponder substrings em diferentes posições dentro do texto: como um <strong>prefixo</strong>, <strong>infixo</strong> ou <strong>sufixo</strong>. O operador <code translate="no">LIKE</code> utiliza o símbolo <code translate="no">%</code> como um wildcard, que pode corresponder a qualquer número de caracteres (incluindo zero).</p>
<h3 id="Prefix-Match-Starts-With" class="common-anchor-header">Correspondência de prefixo (começa com)</h3><p>Para efetuar uma correspondência <strong>de prefixo</strong>, em que a cadeia de caracteres começa com um determinado padrão, pode colocar o padrão no início e utilizar <code translate="no">%</code> para corresponder a quaisquer caracteres a seguir. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> comece por "Prod":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá corresponder a qualquer produto cujo nome comece por "Prod", como "Produto A", "Produto B", etc.</p>
<h3 id="Suffix-Match-Ends-With" class="common-anchor-header">Correspondência de sufixo (termina com)</h3><p>Para uma correspondência <strong>de sufixo</strong>, em que a cadeia de caracteres termina com um determinado padrão, coloque o símbolo <code translate="no">%</code> no início do padrão. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> termina com "XYZ":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto corresponderá a qualquer produto cujo nome termine com "XYZ", como "ProductXYZ", "SampleXYZ", etc.</p>
<h3 id="Infix-Match-Contains" class="common-anchor-header">Correspondência de infixos (Contém)</h3><p>Para efetuar uma correspondência <strong>infixa</strong>, em que o padrão pode aparecer em qualquer parte da cadeia de caracteres, pode colocar o símbolo <code translate="no">%</code> no início e no fim do padrão. Por exemplo, para encontrar todos os produtos cujo <code translate="no">name</code> contenha a palavra "Pro":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isso corresponderá a qualquer produto cujo nome contenha a substring "Pro", como "Product", "ProLine" ou "SuperPro".</p>
<h2 id="Arithmetic-Operators" class="common-anchor-header">Operadores aritméticos<button data-href="#Arithmetic-Operators" class="anchor-icon" translate="no">
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
<h3 id="Supported-Arithmetic-Operators" class="common-anchor-header">Operadores aritméticos suportados:</h3><ul>
<li><p><code translate="no">+</code> (Adição)</p></li>
<li><p><code translate="no">-</code> (Subtração)</p></li>
<li><p><code translate="no">*</code> (Multiplicação)</p></li>
<li><p><code translate="no">/</code> (Divisão)</p></li>
<li><p><code translate="no">%</code> (Módulo)</p></li>
<li><p><code translate="no">**</code> (Exponenciação)</p></li>
</ul>
<h3 id="Example-1-Using-Modulus-" class="common-anchor-header">Exemplo 1: Utilizar o módulo (<code translate="no">%</code>)</h3><p>Para encontrar entidades onde o <code translate="no">id</code> é um número par (i.e., divisível por 2):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Exponentiation-" class="common-anchor-header">Exemplo 2: Usando Exponenciação (<code translate="no">**</code>)</h3><p>Para encontrar entidades onde <code translate="no">price</code> elevado à potência de 2 é maior que 1000:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators" class="common-anchor-header">Operadores lógicos<button data-href="#Logical-Operators" class="anchor-icon" translate="no">
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
<h3 id="Supported-Logical-Operators" class="common-anchor-header">Operadores lógicos suportados:</h3><ul>
<li><p><code translate="no">AND</code>: Combina várias condições que devem ser todas verdadeiras.</p></li>
<li><p><code translate="no">OR</code>: Combina condições em que pelo menos uma deve ser verdadeira.</p></li>
<li><p><code translate="no">NOT</code>: Nega uma condição.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions" class="common-anchor-header">Exemplo 1: Usando <code translate="no">AND</code> para combinar condições</h3><p>Para encontrar todos os produtos em que <code translate="no">price</code> é maior que 100 e <code translate="no">stock</code> é maior que 50:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions" class="common-anchor-header">Exemplo 2: Usando <code translate="no">OR</code> para combinar condições</h3><p>Para encontrar todos os produtos em que <code translate="no">color</code> é "red" (vermelho) ou "blue" (azul):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition" class="common-anchor-header">Exemplo 3: Usando <code translate="no">NOT</code> para excluir uma condição</h3><p>Para encontrar todos os produtos em que <code translate="no">color</code> não é "verde":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">Operadores IS NULL e IS NOT NULL<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores <code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> são utilizados para filtrar campos com base no facto de conterem ou não um valor nulo (ausência de dados).</p>
<ul>
<li><p><code translate="no">IS NULL</code>: Identifica entidades em que um campo específico contém um valor nulo, ou seja, o valor está ausente ou indefinido.</p></li>
<li><p><code translate="no">IS NOT NULL</code>: Identifica entidades em que um campo específico contém qualquer valor diferente de nulo, o que significa que o campo tem um valor válido e definido.</p></li>
</ul>
<div class="alert note">
<p>Os operadores não diferenciam maiúsculas de minúsculas, portanto, você pode usar <code translate="no">IS NULL</code> ou <code translate="no">is null</code>, e <code translate="no">IS NOT NULL</code> ou <code translate="no">is not null</code>.</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">Campos escalares regulares com valores nulos</h3><p>O Milvus permite a filtragem de campos escalares regulares, como cadeias de caracteres ou números, com valores nulos.</p>
<div class="alert note">
<p>Uma cadeia de caracteres vazia <code translate="no">&quot;&quot;</code> não é tratada como um valor nulo para um campo <code translate="no">VARCHAR</code>.</p>
</div>
<p>Para recuperar entidades onde o campo <code translate="no">description</code> é nulo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para recuperar entidades em que o campo <code translate="no">description</code> não é nulo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para recuperar entidades em que o campo <code translate="no">description</code> não é nulo e o campo <code translate="no">price</code> é superior a 10:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">Campos JSON com valores nulos</h3><p>Milvus permite filtrar os campos JSON que contêm valores nulos. Um campo JSON é tratado como nulo das seguintes formas:</p>
<ul>
<li><p>Todo o objeto JSON é explicitamente definido como None (nulo), por exemplo, <code translate="no">{&quot;metadata&quot;: None}</code>.</p></li>
<li><p>O próprio campo JSON está completamente ausente da entidade.</p></li>
</ul>
<div class="alert note">
<p>Se alguns elementos de um objeto JSON forem nulos (por exemplo, chaves individuais), o campo continua a ser considerado não nulo. Por exemplo, <code translate="no">\{&quot;metadata&quot;: \{&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> não é tratado como nulo, mesmo que a chave <code translate="no">category</code> seja nula.</p>
</div>
<p>Para ilustrar melhor a forma como o Milvus trata os campos JSON com valores nulos, considere os seguintes dados de amostra com um campo JSON <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo 1: Recuperar entidades onde <code translate="no">metadata</code> é nulo</strong></p>
<p>Para encontrar entidades em que o campo <code translate="no">metadata</code> está em falta ou explicitamente definido como None:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo 2: Recuperar entidades em que <code translate="no">metadata</code> não é nulo</strong></p>
<p>Para encontrar entidades onde o campo <code translate="no">metadata</code> não é nulo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">Campos ARRAY com valores nulos</h3><p>Milvus permite filtrar os campos ARRAY que contêm valores nulos. Um campo ARRAY é tratado como nulo das seguintes formas:</p>
<ul>
<li><p>O campo ARRAY inteiro é explicitamente definido como Nenhum (nulo), por exemplo, <code translate="no">&quot;tags&quot;: None</code>.</p></li>
<li><p>O campo ARRAY está completamente ausente da entidade.</p></li>
</ul>
<div class="alert note">
<p>Um campo ARRAY não pode conter valores nulos parciais, pois todos os elementos em um campo ARRAY devem ter o mesmo tipo de dados. Para obter detalhes, consulte <a href="/docs/pt/array_data_type.md">Campo de matriz</a>.</p>
</div>
<p>Para ilustrar melhor como Milvus trata os campos ARRAY com valores nulos, considere os seguintes dados de amostra com um campo ARRAY <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo 1: Recuperar entidades onde <code translate="no">tags</code> é nulo</strong></p>
<p>Para recuperar entidades em que o campo <code translate="no">tags</code> está em falta ou explicitamente definido como <code translate="no">None</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo 2: Recuperar entidades onde <code translate="no">tags</code> não é nulo</strong></p>
<p>Para recuperar entidades onde o campo <code translate="no">tags</code> não é nulo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="common-anchor-header">Dicas sobre como usar operadores básicos com campos JSON e ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Enquanto os operadores básicos em Milvus são versáteis e podem ser aplicados a campos escalares, eles também podem ser efetivamente usados com as chaves e índices nos campos JSON e ARRAY.</p>
<p>Por exemplo, se tiver um campo <code translate="no">product</code> que contenha várias chaves como <code translate="no">price</code>, <code translate="no">model</code>, e <code translate="no">tags</code>, faça sempre referência à chave diretamente:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para encontrar registos em que a primeira temperatura de uma matriz de temperaturas registadas excede um determinado valor, utilize:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
