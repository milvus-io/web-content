---
id: range-search-with-structarray.md
title: Pesquisa por intervalo com StructArray
summary: >-
  Utilize esta página para efetuar uma pesquisa por intervalo nos subcampos
  vetoriais do StructArray. A pesquisa por intervalo devolve resultados
  vetoriais cuja pontuação ou distância se situa dentro de um intervalo
  especificado. Para os campos StructArray, utilize a pesquisa por intervalo em
  conjunto com a pesquisa vetorial ao nível dos elementos, em que cada elemento
  Struct é pesquisado de forma independente.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Pesquisa por intervalo com StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize esta página para efetuar uma pesquisa por intervalo nos subcampos vetoriais do StructArray. A pesquisa por intervalo devolve resultados vetoriais cuja pontuação ou distância se situa dentro de um limite especificado. Para campos StructArray, utilize a pesquisa por intervalo com pesquisa vetorial ao nível do elemento, em que cada elemento Struct é pesquisado de forma independente.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». A coleção possui um campo StructArray denominado « <code translate="no">chunks</code> ». O subcampo vetorial « <code translate="no">chunks[emb]</code> » está indexado para pesquisa ao nível do elemento com uma métrica vetorial regular, tal como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » ou « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Como a pesquisa por intervalo se aplica ao StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Modo de pesquisa</th><th>Comportamento da pesquisa por intervalo</th><th>Granularidade dos resultados</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa na EmbeddingList</td><td>Não suportado.</td><td>Não aplicável.</td></tr>
<tr><td>Pesquisa ao nível do elemento</td><td>Utilize uma consulta vetorial normal com ` <code translate="no">radius</code> ` e, opcionalmente, ` <code translate="no">range_filter</code>`.</td><td>Nível de elemento da estrutura.</td></tr>
<tr><td>Pesquisa híbrida</td><td>Suportada quando o pedido StructArray tem como alvo um campo vetorial ao nível do elemento. Os pedidos ao nível de EmbeddingList não suportam a pesquisa por intervalo.</td><td>Subpesquisa ao nível do elemento, seguida de reclassificação híbrida.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Se precisar apenas dos elementos Struct mais próximos, comece com <a href="/docs/pt/basic-vector-search-with-structarray.md">a Pesquisa Vetorial Básica com StructArray</a>. Utilize a pesquisa por intervalo quando o resultado tiver de satisfazer um limite de pontuação ou distância, em vez de apenas uma classificação dos K primeiros.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de começar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepare a coleção, os dados e os índices antes de executar a pesquisa por intervalo.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>A coleção contém um campo StructArray, como, por exemplo, <code translate="no">chunks</code>.</td></tr>
<tr><td>Subcampo vetorial ao nível do elemento</td><td>O subcampo vetorial de destino é <code translate="no">chunks[emb]</code>, e não <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Métrica de indexação</td><td>O subcampo vetorial é indexado com uma métrica vetorial regular, como <code translate="no">COSINE</code>, <code translate="no">IP</code> ou <code translate="no">L2</code>.</td></tr>
<tr><td>Dados da consulta</td><td>A consulta é um vetor normal, não um <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Para a configuração do índice, consulte <a href="/docs/pt/index-structarray-fields.md">«Index StructArray Fields</a>».</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Utilize «radius» e «range_filter»<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Defina ` <code translate="no">radius</code> ` para definir o limite de pesquisa. Defina ` <code translate="no">range_filter</code> ` quando também precisar de um limite interno. A direção depende de se é melhor uma distância menor ou uma pontuação de similaridade maior.</p>
<table>
<thead>
<tr><th>Tipo de métrica</th><th>Uma pontuação mais elevada é melhor?</th><th>Condição de intervalo quando se utiliza « <code translate="no">range_filter</code> »</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Não. Uma distância menor é melhor.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Sim. Quanto maior for a pontuação, melhor.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Quando apenas « <code translate="no">radius</code> » está definido, a pesquisa de intervalo devolve resultados que satisfazem o limite exterior da métrica. Escolha valores de acordo com a escala de pontuação ou distância das suas incorporações.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Executar pesquisa de intervalo ao nível do elemento<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte pesquisa blocos individuais cujos vetores de « <code translate="no">chunks[emb]</code> » sejam suficientemente semelhantes ao vetor de consulta. Cada resultado correspondente representa um elemento Struct correspondente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, « <code translate="no">COSINE</code> » é uma métrica do tipo «similaridade», pelo que o intervalo de resultados é superior a <code translate="no">radius</code> e inferior ou igual a <code translate="no">range_filter</code>. O valor « <code translate="no">offset</code> » identifica o elemento «Struct» correspondente na matriz « <code translate="no">chunks</code> » quando devolvido.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Adicionar filtros escalares<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode combinar a pesquisa de intervalo ao nível do elemento com a filtragem escalar do StructArray. Utilize um predicado de nível superior para os campos da entidade pai e utilize <code translate="no">element_filter</code> para restringir quais os elementos Struct que participam na pesquisa de intervalo vetorial.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>O predicado de nível superior seleciona as entidades candidatas. O predicado « <code translate="no">element_filter</code> » restringe a pesquisa de intervalo vetorial aos elementos Struct correspondentes. Para mais exemplos de filtragem, consulte <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Utilizar a pesquisa por intervalo na pesquisa híbrida<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Os campos vetoriais ao nível do elemento do StructArray suportam a pesquisa por intervalo na pesquisa híbrida. Adicione « <code translate="no">radius</code> » e, opcionalmente, « <code translate="no">range_filter</code> » à « <code translate="no">AnnSearchRequest</code> » que tem como alvo o campo vetorial ao nível do elemento do StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, apenas a sub-solicitação « <code translate="no">chunks[emb]</code> » utiliza parâmetros de pesquisa por intervalo. A solicitação StructArray continua a seguir a semântica ao nível do elemento: o limite do intervalo aplica-se aos resultados do elemento Struct antes de a pesquisa híbrida combinar e reclassificar os resultados.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Interpretar resultados de intervalo<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Item de resultado</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Chave primária da entidade que contém o elemento Struct correspondente.</td></tr>
<tr><td><code translate="no">distance</code> ou pontuação</td><td>A pontuação ou distância entre o vetor de consulta e o vetor do elemento Struct correspondente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posição, com início em zero, do elemento Struct correspondente no campo StructArray quando devolvido.</td></tr>
<tr><td>Chaves primárias repetidas</td><td>Possível. Mais do que um elemento Struct na mesma entidade pode estar dentro do intervalo especificado.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Aplica-se a ocorrências de elementos, não a entidades-pai únicas.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitações<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Não utilize uma consulta « <code translate="no">EmbeddingList</code> » nem uma métrica « <code translate="no">MAX_SIM*</code> » para a pesquisa por intervalo nos subcampos vetoriais do «StructArray». A pesquisa ao nível da «EmbeddingList» não suporta a pesquisa por intervalo.</p></li>
<li><p>Não combine a pesquisa por intervalo com a pesquisa por agrupamento. Se precisar de um resultado por entidade pai, execute uma pesquisa ao nível do elemento sem parâmetros de intervalo e utilize o agrupamento sempre que for suportado.</p></li>
<li><p>A pesquisa de intervalo híbrida é suportada para campos vetoriais ao nível do elemento do StructArray. Não é suportada para pedidos do StructArray ao nível da EmbeddingList.</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">Erros comuns<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Executar a pesquisa por intervalo em ` <code translate="no">chunks[emb_list_vector]</code>`, que se destina à pesquisa ao nível de `EmbeddingList`.</p></li>
<li><p>Utilizar ` <code translate="no">MAX_SIM_COSINE</code> ` em vez de uma métrica normal, como ` <code translate="no">COSINE</code> `, para a pesquisa por intervalo ao nível do elemento.</p></li>
<li><p>Utilizar uma consulta « <code translate="no">EmbeddingList</code> » em vez de uma consulta vetorial normal.</p></li>
<li><p>Esperar que os resultados da pesquisa por intervalo sejam únicos por entidade pai. A pesquisa por intervalo devolve resultados correspondentes a elementos Struct.</p></li>
<li><p>Utilizar <code translate="no">chunks.emb</code> em vez da sintaxe de caminho de subcampo exigida <code translate="no">chunks[emb]</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos passos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Para conhecer os dois modos básicos de pesquisa vetorial <a href="/docs/pt/basic-vector-search-with-structarray.md">com</a> StructArray, leia <a href="/docs/pt/basic-vector-search-with-structarray.md">«Pesquisa vetorial básica com StructArray</a>».</p></li>
<li><p>Para adicionar filtros escalares à pesquisa por intervalo, leia <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p></li>
<li><p>Para devolver, no máximo, um resultado por entidade pai, quando suportado, leia <a href="/docs/pt/grouping-search-with-structarray.md">«Pesquisa agrupada com StructArray</a>».</p></li>
<li><p>Para verificar os limites de pesquisa específicos de cada versão, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
