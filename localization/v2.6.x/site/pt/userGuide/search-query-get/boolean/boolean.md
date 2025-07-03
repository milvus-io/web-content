---
id: boolean.md
title: Explicação da filtragem
summary: >-
  Milvus fornece capacidades de filtragem poderosas que permitem uma consulta
  precisa dos seus dados. As expressões de filtragem permitem-lhe direcionar
  campos escalares específicos e refinar os resultados da pesquisa com
  diferentes condições. Este guia explica como utilizar as expressões de
  filtragem no Milvus, com exemplos centrados nas operações de consulta. Também
  pode aplicar estes filtros em pedidos de pesquisa e eliminação.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Explicação da filtragem<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fornece poderosas capacidades de filtragem que permitem uma consulta precisa dos seus dados. As expressões de filtragem permitem-lhe direcionar campos escalares específicos e refinar os resultados da pesquisa com diferentes condições. Este guia explica como utilizar expressões de filtragem no Milvus, com exemplos focados em operações de consulta. Também pode aplicar estes filtros em pedidos de pesquisa e eliminação.</p>
<h2 id="Basic-operators" class="common-anchor-header">Operadores básicos<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta vários operadores básicos para filtrar dados:</p>
<ul>
<li><p><strong>Operadores de comparação</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, e <code translate="no">&lt;=</code> permitem filtrar com base em campos numéricos ou de texto.</p></li>
<li><p><strong>Filtros de intervalo</strong>: <code translate="no">IN</code> e <code translate="no">LIKE</code> ajudam a corresponder a intervalos ou conjuntos de valores específicos.</p></li>
<li><p><strong>Operadores aritméticos</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code>, e <code translate="no">**</code> são utilizados para cálculos que envolvem campos numéricos.</p></li>
<li><p><strong>Operadores lógicos</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, e <code translate="no">NOT</code> combinam várias condições em expressões complexas.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Exemplo: Filtragem por cor</h3><p>Para encontrar entidades com cores primárias (vermelho, verde ou azul) em um campo escalar <code translate="no">color</code>, use a seguinte expressão de filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Exemplo: Filtragem de campos JSON</h3><p>Milvus permite referenciar chaves em campos JSON. Por exemplo, se tiver um campo JSON <code translate="no">product</code> com as chaves <code translate="no">price</code> e <code translate="no">model</code>, e quiser encontrar produtos com um modelo específico e um preço inferior a 1.850, utilize esta expressão de filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Exemplo: Filtragem de campos de matriz</h3><p>Se tiver um campo de matriz <code translate="no">history_temperatures</code> que contenha os registos das temperaturas médias comunicadas pelos observatórios desde o ano 2000 e pretender encontrar observatórios em que a temperatura em 2009 (o 10.º registo) seja superior a 23°C, utilize esta expressão:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre estes operadores básicos, consulte <a href="/docs/pt/basic-operators.md">Operadores básicos</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Modelos de expressão de filtro<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao filtrar utilizando caracteres CJK, o processamento pode ser mais complexo devido aos seus conjuntos de caracteres maiores e às diferenças de codificação. Isto pode resultar num desempenho mais lento, especialmente com o operador <code translate="no">IN</code>.</p>
<p>O Milvus introduz modelos de expressão de filtro para otimizar o desempenho quando se trabalha com caracteres CJK. Ao separar os valores dinâmicos da expressão de filtro, o motor de consulta lida com a inserção de parâmetros de forma mais eficiente.</p>
<h3 id="Example" class="common-anchor-header">Exemplo</h3><p>Para encontrar indivíduos com mais de 25 anos que vivem em "北京" (Pequim) ou "上海" (Xangai), use a seguinte expressão de modelo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para melhorar o desempenho, use esta variação com parâmetros:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Esta abordagem reduz a sobrecarga de análise e melhora a velocidade de consulta. Para obter mais informações, consulte <a href="/docs/pt/filtering-templating.md">Modelo de filtro</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Operadores específicos de tipo de dados<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus fornece operadores de filtragem avançados para tipos de dados específicos, como campos JSON, ARRAY e VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Operadores específicos do campo JSON</h3><p>O Milvus oferece operadores avançados para consulta de campos JSON, permitindo uma filtragem precisa dentro de estruturas JSON complexas:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Verifica se existe uma expressão JSON no campo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Assegura que todos os elementos da expressão JSON estão presentes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filtra as entidades em que pelo menos um elemento existe na expressão JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais detalhes sobre os operadores JSON, consulte <a href="/docs/pt/json-operators.md">Operadores JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Operadores específicos do campo ARRAY</h3><p>O Milvus fornece operadores de filtragem avançados para campos de matriz, tais como <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, e <code translate="no">ARRAY_LENGTH</code>, que permitem um controlo fino sobre os dados da matriz:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtra entidades que contêm um elemento específico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtra entidades onde todos os elementos de uma lista estão presentes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtra entidades contendo qualquer elemento da lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtra com base no comprimento da matriz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais detalhes sobre os operadores de matriz, consulte <a href="/docs/pt/array-operators.md">Operadores</a> de matriz.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Operadores específicos do campo VARCHAR</h3><p>Milvus fornece operadores especializados para pesquisas precisas baseadas em texto em campos VARCHAR:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> operador</h4><p>O operador <code translate="no">TEXT_MATCH</code> permite a recuperação precisa de documentos com base em termos de consulta específicos. É particularmente útil para pesquisas filtradas que combinam filtros escalares com pesquisas de semelhança vetorial. Ao contrário das pesquisas semânticas, a correspondência de texto centra-se nas ocorrências exactas de termos.</p>
<p>O Milvus utiliza o Tantivy para suportar a indexação invertida e a pesquisa de texto baseada em termos. O processo envolve:</p>
<ol>
<li><p><strong>Analisador</strong>: Tokeniza e processa o texto de entrada.</p></li>
<li><p><strong>Indexação</strong>: Cria um índice invertido mapeando tokens únicos para documentos.</p></li>
</ol>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/keyword-match.md">Correspondência de texto</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> operador<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>O operador <strong>PHRASE_MATCH</strong> permite a recuperação precisa de documentos com base em correspondências exactas de frases, considerando tanto a ordem como a adjacência dos termos de consulta.</p>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/phrase-match.md">Correspondência de frases</a>.</p>
