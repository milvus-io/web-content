---
id: array-operators.md
title: Operadores de ARRAY
summary: >-
  O Milvus disponibiliza operadores ARRAY para filtrar campos ARRAY e atualizar
  parcialmente os valores dos campos ARRAY.
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
    </button></h1><p>O Milvus disponibiliza operadores ARRAY para filtrar campos ARRAY e atualizar parcialmente os valores dos campos ARRAY.</p>
<div class="alert note">
<p>Todos os elementos de um ARRAY devem ser do mesmo tipo, e as estruturas aninhadas dentro dos ARRAYs são tratadas como cadeias de caracteres simples. Por conseguinte, ao trabalhar com campos ARRAY, é aconselhável evitar aninhamentos excessivamente profundos e garantir que as suas estruturas de dados sejam o mais planas possível, para um desempenho ideal.</p>
</div>
<p>Os operadores ARRAY no Milvus abrangem dois cenários de utilização:</p>
<ul>
<li><p>Expressões de filtragem para consultas e pesquisas.</p></li>
<li><p>Atualizações parciais em pedidos « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Operadores ARRAY disponíveis<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte lista os operadores ARRAY disponíveis no Milvus.</p>
<table>
<thead>
<tr><th>Operador</th><th>Utilização em</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(identificador, expressão)</a></td><td>Expressão de filtragem</td><td>Verifica se um elemento específico existe num campo ARRAY.</td></tr>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identificador, expressão)</a></td><td>Expressão de filtro</td><td>Verifica se todos os elementos de uma lista especificada existem num campo ARRAY.</td></tr>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identificador, expressão)</a></td><td>Expressão de filtro</td><td>Verifica se algum elemento de uma lista especificada existe num campo ARRAY.</td></tr>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(identificador)</a></td><td>Expressão de filtragem</td><td>Devolve o número de elementos num campo ARRAY e pode ser combinada com operadores de comparação para fins de filtragem.</td></tr>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> com <code translate="no">field_ops</code></td><td>Acrescenta elementos de carga útil a um campo ARRAY existente. Disponível no Milvus v2.6.17 e versões posteriores.</td></tr>
<tr><td><a href="/docs/pt/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> com <code translate="no">field_ops</code></td><td>Remove todos os elementos de um campo ARRAY existente que correspondam a um valor na carga útil do pedido. Disponível no Milvus v2.6.17 e versões posteriores.</td></tr>
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
    </button></h2><p>O operador « <code translate="no">ARRAY_CONTAINS</code> » verifica se um elemento específico existe num campo «array». É útil quando se pretende encontrar entidades em que um determinado elemento esteja presente no «array».</p>
<p><strong>Exemplo</strong></p>
<p>Suponha que tem um campo de matriz <code translate="no">history_temperatures</code>, que contém as temperaturas mínimas registadas em diferentes anos. Para encontrar todas as entidades em que a matriz contenha o valor <code translate="no">23</code>, pode utilizar a seguinte expressão de filtro:</p>
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
    </button></h2><p>O operador « <code translate="no">ARRAY_CONTAINS_ALL</code> » garante que todos os elementos da lista especificada estão presentes no campo de matriz. Este operador é útil quando pretende encontrar entidades que contenham vários valores na matriz.</p>
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
<p>Para encontrar todas as entidades em que o array ` <code translate="no">history_temperatures</code> ` contenha ` <code translate="no">23</code> ` ou ` <code translate="no">24</code>`, pode utilizar:</p>
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
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">ARRAY_APPEND</code> acrescenta elementos de carga útil a um campo ARRAY existente durante um pedido <code translate="no">upsert</code>. Não se trata de uma expressão de filtro. Utilize-o quando pretender adicionar valores a um array sem primeiro consultar o valor atual do array.</p>
<p>O exemplo Python seguinte acrescenta ` <code translate="no">&quot;premium&quot;</code> ` ao campo `ARRAY` de ` <code translate="no">tags</code> ` da entidade cuja chave primária é ` <code translate="no">1</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>A adição de <code translate="no">ARRAY_APPEND</code> a um campo através de <code translate="no">field_ops</code> permite a semântica de atualização parcial para esse campo. Para conhecer o fluxo de trabalho completo, os tipos de elementos suportados e os limites, consulte <a href="/docs/pt/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">Campos ARRAY de «Upsert» no modo de fusão</a>.</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador « <code translate="no">ARRAY_REMOVE</code> » remove todos os elementos de um campo «ARRAY» existente que correspondam a um valor na carga útil do pedido durante um pedido « <code translate="no">upsert</code> ». Não se trata de uma expressão de filtro. Utilize-o quando pretender remover valores correspondentes de um array sem primeiro consultar o valor atual do array.</p>
<p>O exemplo Python seguinte remove « <code translate="no">&quot;trial&quot;</code> » do campo ARRAY « <code translate="no">tags</code> » da entidade cuja chave primária é « <code translate="no">1</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Atribuir « <code translate="no">ARRAY_REMOVE</code> » a um campo através de « <code translate="no">field_ops</code> » permite a semântica de atualização parcial para esse campo. Para conhecer o fluxo de trabalho completo, os tipos de elementos suportados e os limites, consulte <a href="/docs/pt/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">«Campos ARRAY de Upsert no modo de fusão</a>».</p>
