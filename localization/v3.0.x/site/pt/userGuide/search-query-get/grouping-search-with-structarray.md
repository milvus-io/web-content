---
id: grouping-search-with-structarray.md
title: Agrupamento de resultados de pesquisa com StructArray
summary: >-
  Utilize esta página para agrupar os resultados da pesquisa ao nível dos
  elementos do StructArray por entidade pai. A pesquisa ao nível dos elementos
  pode devolver vários resultados da mesma entidade quando vários elementos do
  Struct correspondem à consulta. O agrupamento agrupa esses resultados dos
  elementos, de modo a que cada entidade pai apareça, no máximo, uma vez.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Agrupamento de resultados de pesquisa com StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize esta página para agrupar os resultados da pesquisa ao nível dos elementos do StructArray por entidade pai. A pesquisa ao nível dos elementos pode devolver vários resultados da mesma entidade quando vários elementos Struct correspondem à consulta. O agrupamento agrupa esses resultados de elementos de forma a que cada entidade pai apareça, no máximo, uma vez.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». A coleção possui um campo StructArray denominado « <code translate="no">chunks</code> ». O subcampo vetorial « <code translate="no">chunks[emb]</code> » está indexado para pesquisa ao nível do elemento com uma métrica vetorial regular.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Como o agrupamento se aplica ao StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Modo de pesquisa</th><th>Comportamento do agrupamento</th><th>Comportamento dos resultados</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa EmbeddingList</td><td>Não suportado.</td><td>Não aplicável.</td></tr>
<tr><td>Pesquisa ao nível do elemento</td><td>Suportado através do agrupamento pela chave primária.</td><td>Retorna, no máximo, um resultado por entidade pai. Os metadados ao nível do elemento são preservados, pelo que o índice ou deslocamento do elemento selecionado pode ser devolvido quando exposto pela API ou pelo SDK.</td></tr>
<tr><td>Pesquisa híbrida</td><td>Suportada apenas quando todas as subpesquisas têm como alvo campos vetoriais ao nível do elemento no âmbito do mesmo campo StructArray.</td><td>As subpesquisas ao nível do elemento são agrupadas pela chave primária antes do tratamento do resultado final.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Utilize o agrupamento quando a pesquisa ao nível do elemento, sem agrupamento, devolver demasiadas entidades pai duplicadas. Se pretender que cada elemento Struct correspondente seja considerado um resultado individual, utilize <a href="/docs/pt/basic-vector-search-with-structarray.md">a Pesquisa Vetorial Básica com StructArray</a> sem a opção « <code translate="no">group_by_field</code> ».</p>
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
    </button></h2><p>Prepare a coleção, os dados e os índices antes de executar a pesquisa com agrupamento.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Subcampo vetorial ao nível do elemento</td><td>Utilize um subcampo vetorial StructArray, como <code translate="no">chunks[emb]</code>, indexado com uma métrica vetorial regular.</td></tr>
<tr><td>Consulta vetorial normal</td><td>Utilize um vetor de consulta regular, e não um <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>Agrupamento por chave primária</td><td>Utilize a chave primária da coleção como « <code translate="no">group_by_field</code> », tal como <code translate="no">doc_id</code>.</td></tr>
<tr><td>Sem parâmetros de intervalo</td><td>Não combine a pesquisa de agrupamento com parâmetros de pesquisa de intervalo, como <code translate="no">radius</code> ou <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Para a configuração do índice, consulte <a href="/docs/pt/index-structarray-fields.md">Campos StructArray do Índice</a>.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Executar pesquisa agrupada ao nível do elemento<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte pesquisa primeiro blocos individuais e, em seguida, agrupa os resultados dos elementos pela chave primária da entidade pai.</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Sem o agrupamento, o mesmo <code translate="no">doc_id</code> pode aparecer várias vezes se vários blocos corresponderem à consulta. Com <code translate="no">group_by_field=&quot;doc_id&quot;</code>, cada entidade pai aparece, no máximo, uma vez. O agrupamento preserva os metadados ao nível do elemento, pelo que o resultado agrupado pode ainda incluir o índice ou o deslocamento do elemento Struct selecionado, quando a API ou o SDK o expuserem.</p>
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
    </button></h2><p>Pode combinar a pesquisa agrupada com a filtragem escalar do `StructArray`. Utilize ` <code translate="no">element_filter</code> ` quando a condição escalar deva restringir quais os elementos `Struct` que participam na pesquisa vetorial ao nível do elemento.</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>O predicado de nível superior seleciona as entidades candidatas. O predicado « <code translate="no">element_filter</code> » restringe a pesquisa vetorial ao nível do elemento aos elementos Struct correspondentes. O agrupamento agrupa então os resultados dos elementos correspondentes pela chave primária.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Utilizar o agrupamento na pesquisa híbrida<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>O agrupamento híbrido com StructArray é uma funcionalidade ao nível do elemento. Só é suportado quando todas as subpesquisas têm como alvo campos vetoriais ao nível do elemento no âmbito do mesmo campo StructArray. Não utilize pedidos ao nível de EmbeddingList numa pesquisa híbrida agrupada de StructArray.</p>
<p>O exemplo seguinte pressupõe que o campo StructArray « <code translate="no">chunks</code> » tem dois subcampos vetoriais ao nível do elemento, « <code translate="no">chunks[emb]</code> » e « <code translate="no">chunks[code_emb]</code> », e que ambos estão indexados com métricas vetoriais regulares.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, ambas as sub-solicitações têm como alvo campos vetoriais ao nível do elemento no âmbito do mesmo campo StructArray, <code translate="no">chunks</code>. Uma pesquisa híbrida não suporta o agrupamento ao nível do elemento se misturar campos vetoriais normais, campos StructArray diferentes ou solicitações ao nível da EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Interpretar resultados agrupados<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Chave primária da entidade pai agrupada.</td></tr>
<tr><td><code translate="no">distance</code> ou pontuação</td><td>Pontuação ou distância do elemento Struct selecionado para essa entidade pai.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posição, com início em zero, do elemento Struct selecionado quando devolvido.</td></tr>
<tr><td>Chaves primárias repetidas</td><td>Não esperadas ao agrupar pela chave primária.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Aplica-se a resultados agrupados da entidade pai.</td></tr>
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
<li><p>A pesquisa de agrupamento aplica-se apenas à pesquisa de vetores StructArray ao nível do elemento. A pesquisa EmbeddingList e a pesquisa híbrida ao nível de EmbeddingList não suportam o agrupamento.</p></li>
<li><p>Utilize a chave primária como ` <code translate="no">group_by_field</code>`. O agrupamento ao nível do elemento StructArray não é um agrupamento de uso geral sobre campos escalares arbitrários.</p></li>
<li><p>Não combine a pesquisa de agrupamento com a pesquisa por intervalo.</p></li>
<li><p>Não utilize uma consulta « <code translate="no">EmbeddingList</code> » nem uma métrica « <code translate="no">MAX_SIM*</code> » para a pesquisa agrupada.</p></li>
<li><p>O agrupamento híbrido só é suportado quando todas as sub-pesquisas têm como alvo campos vetoriais ao nível do elemento no âmbito do mesmo campo StructArray.</p></li>
<li><p>O agrupamento híbrido não é suportado quando a pesquisa híbrida mistura um campo vetorial normal, um campo StructArray diferente ou um pedido ao nível de EmbeddingList.</p></li>
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
<li><p>Utilizar o agrupamento com ` <code translate="no">chunks[emb_list_vector]</code>`, que se destina à pesquisa EmbeddingList.</p></li>
<li><p>Agrupamento por um campo escalar que não seja a chave primária.</p></li>
<li><p>Agrupamento por vários campos. O agrupamento de StructArray ao nível do elemento suporta apenas o agrupamento por chave primária.</p></li>
<li><p>Esperar que os resultados agrupados representem todos os elementos Struct correspondentes. O agrupamento devolve, no máximo, um resultado por entidade pai.</p></li>
<li><p>Presumir que a pesquisa agrupada ao nível do elemento recalcula uma pontuação de tipo « <code translate="no">MAX_SIM*</code> » no estilo «EmbeddingList». O agrupamento agrupa os resultados ao nível do elemento; não altera o modelo de pontuação.</p></li>
<li><p>Combinação de « <code translate="no">group_by_field</code> » com « <code translate="no">radius</code> » ou « <code translate="no">range_filter</code> ».</p></li>
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
<li><p>Para aprender primeiro a pesquisa ao nível do elemento sem agrupamento, leia <a href="/docs/pt/basic-vector-search-with-structarray.md">«Pesquisa vetorial básica com StructArray</a>».</p></li>
<li><p>Para adicionar filtros escalares à pesquisa agrupada, leia <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p></li>
<li><p>Para utilizar limites de pontuação ou distância em vez de agrupamento, leia <a href="/docs/pt/range-search-with-structarray.md">«Pesquisa por intervalo com StructArray</a>».</p></li>
<li><p>Para verificar os limites de pesquisa do StructArray, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
