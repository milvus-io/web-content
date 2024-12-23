---
id: json-operators.md
summary: >-
  Milvus suporta operadores avançados para consulta e filtragem de campos JSON,
  tornando-os perfeitos para a gestão de dados complexos e estruturados. Estes
  operadores permitem uma consulta altamente eficaz de documentos JSON,
  permitindo-lhe recuperar entidades com base em elementos específicos, valores
  ou condições dentro dos campos JSON. Esta secção irá guiá-lo através da
  utilização de operadores específicos de JSON no Milvus, fornecendo exemplos
  práticos para ilustrar a sua funcionalidade.
title: Operadores JSON
---
<h1 id="JSON-Operators​" class="common-anchor-header">Operadores JSON<button data-href="#JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus suporta operadores avançados para consulta e filtragem de campos JSON, tornando-os perfeitos para a gestão de dados complexos e estruturados. Estes operadores permitem uma consulta altamente eficaz de documentos JSON, permitindo-lhe recuperar entidades com base em elementos específicos, valores ou condições dentro dos campos JSON. Esta secção irá guiá-lo através da utilização de operadores específicos de JSON no Milvus, fornecendo exemplos práticos para ilustrar a sua funcionalidade.</p>
<div class="alert note">
<p>Os campos JSON não podem lidar com estruturas complexas e aninhadas e tratam todas as estruturas aninhadas como strings simples. Por conseguinte, ao trabalhar com campos JSON, é aconselhável evitar aninhamentos excessivamente profundos e garantir que as suas estruturas de dados são tão planas quanto possível para um desempenho ótimo.</p>
</div>
<h2 id="Available-JSON-Operators​" class="common-anchor-header">Operadores JSON disponíveis<button data-href="#Available-JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fornece vários operadores JSON poderosos que ajudam a filtrar e consultar dados JSON, e esses operadores são.</p>
<ul>
<li><p><a href="#JSON_CONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Filtra entidades onde a expressão JSON especificada é encontrada dentro do campo.</p></li>
<li><p><a href="#JSON_CONTAINS_ALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: Garante que todos os elementos da expressão JSON especificada estão presentes no campo.</p></li>
<li><p><a href="#JSON_CONTAINS_ANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: Filtra entidades onde pelo menos um membro da expressão JSON existe dentro do campo.</p></li>
</ul>
<p>Vamos explorar esses operadores com exemplos para ver como eles podem ser aplicados em cenários do mundo real.</p>
<h2 id="JSONCONTAINS​" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">json_contains</code> verifica se um elemento específico ou uma submatriz existe num campo JSON. É útil quando se pretende garantir que uma matriz ou objeto JSON contém um determinado valor.</p>
<p><strong>Exemplo</strong></p>
<p>Imagine que você tem uma coleção de produtos, cada um com um campo <code translate="no">tags</code> que contém uma matriz JSON de cadeias de caracteres, como <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Pretende filtrar os produtos que têm a etiqueta <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, o Milvus devolverá todos os produtos em que o campo <code translate="no">tags</code> contém o elemento <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL​" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">json_contains_all</code> garante que todos os elementos de uma expressão JSON especificada estão presentes no campo de destino. É particularmente útil quando é necessário fazer corresponder vários valores numa matriz JSON.</p>
<p><strong>Exemplo</strong></p>
<p>Continuando com o cenário das etiquetas de produto, se pretender encontrar todos os produtos que tenham as etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, e <code translate="no">&quot;new&quot;</code>, pode utilizar o operador <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Essa consulta retornará todos os produtos em que a matriz <code translate="no">tags</code> contém os três elementos especificados: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, e <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCOTAINSANY​" class="common-anchor-header">JSON_COTAINS_ANY<button data-href="#JSONCOTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">json_contains_any</code> filtra entidades em que pelo menos um membro da expressão JSON existe no campo. Isto é útil quando se pretende fazer corresponder entidades com base em qualquer um de vários valores possíveis.</p>
<p><strong>Exemplo</strong></p>
<p>Digamos que pretende filtrar produtos que tenham pelo menos uma das etiquetas <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, ou <code translate="no">&quot;new&quot;</code>. Pode utilizar o operador <code translate="no">json_contains_any</code> para o conseguir.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Neste caso, o Milvus devolverá todos os produtos que tenham pelo menos uma das etiquetas da lista <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Mesmo que um produto tenha apenas uma destas etiquetas, será incluído no resultado.</p>
