---
id: json-operators.md
title: Operadores JSON
summary: >-
  O Milvus suporta operadores avançados para consultar e filtrar campos JSON,
  tornando-os ideais para a gestão de dados complexos e estruturados. Estes
  operadores permitem uma consulta altamente eficaz de documentos JSON,
  permitindo-lhe recuperar entidades com base em elementos, valores ou condições
  específicos dentro dos campos JSON. Esta secção irá orientá-lo na utilização
  de operadores específicos para JSON no Milvus, fornecendo exemplos práticos
  para ilustrar a sua funcionalidade.
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
    </button></h1><p>O Milvus suporta operadores avançados para consultar e filtrar campos JSON, tornando-os perfeitos para a gestão de dados complexos e estruturados. Estes operadores permitem uma consulta altamente eficaz de documentos JSON, permitindo-lhe recuperar entidades com base em elementos, valores ou condições específicos dentro dos campos JSON. Esta secção irá guiá-lo na utilização de operadores específicos para JSON no Milvus, fornecendo exemplos práticos para ilustrar a sua funcionalidade.</p>
<div class="alert note">
<p>Os campos JSON não suportam estruturas complexas e aninhadas, tratando todas as estruturas aninhadas como cadeias de caracteres simples. Por conseguinte, ao trabalhar com campos JSON, é aconselhável evitar aninhamentos excessivamente profundos e garantir que as suas estruturas de dados sejam o mais planas possível, para um desempenho ideal.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">Operadores JSON disponíveis<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus disponibiliza vários operadores JSON poderosos que ajudam a filtrar e consultar dados JSON, sendo que esses operadores são:</p>
<ul>
<li><p><a href="#JSONCONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Filtra as entidades em que a expressão JSON especificada se encontra dentro do campo.</p></li>
<li><p><a href="#JSONCONTAINSALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: Garante que todos os elementos da expressão JSON especificada estejam presentes no campo.</p></li>
<li><p><a href="#JSONCONTAINSANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: Filtra as entidades em que pelo menos um membro da expressão JSON exista no campo.</p></li>
</ul>
<p>Vamos explorar estes operadores com exemplos para ver como podem ser aplicados em cenários reais.</p>
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
    </button></h2><p>O operador <code translate="no">json_contains</code> verifica se um elemento específico ou submatriz existe num campo JSON. É útil quando se pretende garantir que uma matriz ou objeto JSON contém um valor específico.</p>
<p><strong>Exemplo</strong></p>
<p>Imagine que tem uma coleção de produtos, cada um com um campo « <code translate="no">tags</code> » que contém uma matriz JSON de cadeias de caracteres, como <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Pretende filtrar os produtos que tenham a etiqueta <code translate="no">&quot;sale&quot;</code>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, o Milvus irá devolver todos os produtos em que o campo « <code translate="no">tags</code> » contenha o elemento « <code translate="no">&quot;sale&quot;</code> ».</p>
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
    </button></h2><p>O operador <code translate="no">json_contains_all</code> garante que todos os elementos de uma expressão JSON especificada estejam presentes no campo de destino. É particularmente útil quando é necessário corresponder vários valores dentro de um array JSON.</p>
<p><strong>Exemplo</strong></p>
<p>Continuando com o cenário das etiquetas de produtos, se pretender encontrar todos os produtos que tenham as etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> e <code translate="no">&quot;new&quot;</code>, pode utilizar o operador <code translate="no">json_contains_all</code>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esta consulta irá devolver todos os produtos em que a matriz ` <code translate="no">tags</code> ` contenha os três elementos especificados: ` <code translate="no">&quot;electronics&quot;</code>`, ` <code translate="no">&quot;sale&quot;</code>` e ` <code translate="no">&quot;new&quot;</code>`.</p>
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
    </button></h2><p>O operador <code translate="no">json_contains_any</code> filtra as entidades em que pelo menos um membro da expressão JSON exista no campo. Isto é útil quando se pretende corresponder entidades com base em qualquer um de vários valores possíveis.</p>
<p><strong>Exemplo</strong></p>
<p>Suponhamos que pretenda filtrar produtos que tenham pelo menos uma das etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> ou <code translate="no">&quot;new&quot;</code>. Pode utilizar o operador <code translate="no">json_contains_any</code> para o fazer.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neste caso, o Milvus irá devolver todos os produtos que tenham pelo menos uma das etiquetas da lista <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Mesmo que um produto tenha apenas uma destas etiquetas, será incluído no resultado.</p>
