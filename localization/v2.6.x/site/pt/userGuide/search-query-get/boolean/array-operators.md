---
id: array-operators.md
title: Operadores de Matriz
summary: >-
  O Milvus disponibiliza operadores poderosos para consultar campos de matrizes,
  permitindo-lhe filtrar e recuperar entidades com base no conteúdo das
  matrizes.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operadores de Matriz<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus disponibiliza operadores poderosos para consultar campos de matriz, permitindo-lhe filtrar e recuperar entidades com base no conteúdo das matrizes.</p>
<div class="alert note">
<p>Todos os elementos de uma matriz devem ser do mesmo tipo, e as estruturas aninhadas dentro das matrizes são tratadas como cadeias de caracteres simples. Por conseguinte, ao trabalhar com campos ARRAY, é aconselhável evitar aninhamentos excessivamente profundos e garantir que as suas estruturas de dados sejam o mais planas possível, para um desempenho ideal.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Operadores ARRAY disponíveis<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores ARRAY permitem a consulta detalhada de campos de matriz no Milvus. Estes operadores são:</p>
<ul>
<li><p><a href="/docs/pt/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: verifica se um elemento específico existe num campo ARRAY.</p></li>
<li><p><a href="/docs/pt/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: garante que todos os elementos da lista especificada estão presentes no campo de matriz.</p></li>
<li><p><a href="/docs/pt/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: verifica se algum dos elementos da lista especificada está presente no campo de matriz.</p></li>
<li><p><a href="/docs/pt/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: devolve o número de elementos num campo de matriz e pode ser combinado com operadores de comparação para filtragem.</p></li>
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
    </button></h2><p>O operador ` <code translate="no">ARRAY_CONTAINS</code> ` verifica se um elemento específico existe num campo de matriz. É útil quando se pretende encontrar entidades em que um determinado elemento esteja presente na matriz.</p>
<p><strong>Exemplo</strong></p>
<p>Suponha que tem um campo de matriz <code translate="no">history_temperatures</code>, que contém as temperaturas mínimas registadas para diferentes anos. Para encontrar todas as entidades em que a matriz contenha o valor <code translate="no">23</code>, pode utilizar a seguinte expressão de filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá devolver todas as entidades em que a matriz ` <code translate="no">history_temperatures</code> ` contenha o valor ` <code translate="no">23</code>`.</p>
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
    </button></h2><p>O operador « <code translate="no">ARRAY_CONTAINS_ALL</code> » garante que todos os elementos da lista especificada estejam presentes no campo de matriz. Este operador é útil quando pretende encontrar entidades que contenham vários valores na matriz.</p>
<p><strong>Exemplo</strong></p>
<p>Se pretender encontrar todas as entidades em que a matriz ` <code translate="no">history_temperatures</code> ` contenha tanto ` <code translate="no">23</code> ` como ` <code translate="no">24</code>`, pode utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá devolver todas as entidades em que a matriz ` <code translate="no">history_temperatures</code> ` contenha ambos os valores especificados.</p>
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
    </button></h2><p>O operador <code translate="no">ARRAY_CONTAINS_ANY</code> verifica se algum dos elementos da lista especificada está presente no campo do array. Isto é útil quando se pretende encontrar entidades que contenham pelo menos um dos valores especificados no array.</p>
<p><strong>Exemplo</strong></p>
<p>Para encontrar todas as entidades em que a matriz ` <code translate="no">history_temperatures</code> ` contenha ` <code translate="no">23</code> ` ou ` <code translate="no">24</code>`, pode utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá devolver todas as entidades em que a matriz ` <code translate="no">history_temperatures</code> ` contenha pelo menos um dos valores ` <code translate="no">23</code> ` ou ` <code translate="no">24</code>`.</p>
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
    </button></h2><p>A função ` <code translate="no">ARRAY_LENGTH</code> ` devolve o comprimento (número de elementos) de um campo de matriz. Aceita exatamente um parâmetro: o identificador do campo de matriz.</p>
<p><strong>Exemplo</strong></p>
<p>Para encontrar todas as entidades em que a matriz « <code translate="no">history_temperatures</code> » tenha menos de 10 elementos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá devolver todas as entidades em que a matriz « <code translate="no">history_temperatures</code> » tenha menos de 10 elementos.</p>
