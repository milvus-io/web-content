---
id: filtered-search-with-structarray.md
title: Pesquisa filtrada com StructArray
summary: >-
  Utilize esta página para adicionar filtragem escalar à pesquisa vetorial nos
  campos do StructArray. A filtragem do StructArray tem dois níveis: os filtros
  ao nível da linha selecionam as entidades pai, enquanto os filtros ao nível do
  elemento restringem quais os elementos do Struct que participam na pesquisa
  vetorial ao nível do elemento.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Pesquisa filtrada com StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize esta página para adicionar filtragem escalar à pesquisa vetorial em campos StructArray. A filtragem do StructArray tem dois níveis: os filtros ao nível da linha selecionam entidades pai, enquanto os filtros ao nível do elemento restringem quais os elementos Struct que participam na pesquisa vetorial ao nível do elemento.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». A coleção possui um campo StructArray denominado « <code translate="no">chunks</code> », com subcampos escalares como « <code translate="no">section</code> », « <code translate="no">page</code> », « <code translate="no">quality_score</code> » e « <code translate="no">has_code</code> », além de subcampos vetoriais para pesquisa.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Escolha um tipo de filtro<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Objetivo</th><th>Utilização</th><th>Comportamento do resultado</th></tr>
</thead>
<tbody>
<tr><td>Filtrar por um campo escalar de nível superior, como <code translate="no">category</code>.</td><td>Expressão de filtro regular.</td><td>Seleciona entidades pai antes ou durante a pesquisa.</td></tr>
<tr><td>Restringe a pesquisa vetorial ao nível do elemento aos elementos Struct que correspondam às condições escalares.</td><td><code translate="no">element_filter</code>.</td><td>Pesquisa apenas os elementos Struct correspondentes e pode devolver os deslocamentos dos elementos correspondentes.</td></tr>
<tr><td>Seleciona entidades consoante se algum, todos ou um número específico de elementos Struct correspondam a um predicado.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code>.</td><td>Filtragem ao nível da linha. Estes operadores não devolvem deslocamentos por si próprios.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Esta página explica como utilizar filtros StructArray em fluxos de trabalho de pesquisa. Para conhecer as regras sintáticas completas, os tipos de predicados suportados e a matriz de predicados não suportados, consulte <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Filtrar por campos de nível superior<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize expressões de filtro normais quando a condição pertencer à entidade pai, e não a um elemento Struct individual. Isto funciona tanto com a pesquisa EmbeddingList como com a pesquisa ao nível do elemento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>O filtro acima seleciona apenas entidades cujo campo de nível superior « <code translate="no">category</code> » seja « <code translate="no">&quot;search&quot;</code> ». Não identifica um único elemento Struct correspondente.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Filtrar a pesquisa vetorial ao nível do elemento<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize ` <code translate="no">element_filter(structArrayField, predicate)</code> ` quando as condições escalares se aplicarem ao mesmo elemento `Struct` que participa na pesquisa vetorial ao nível do elemento. Dentro do predicado, utilize ` <code translate="no">$[subfield]</code> ` para se referir a subcampos escalares do elemento `Struct` atual.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>Neste exemplo, o predicado de nível superior <code translate="no">category == &quot;search&quot;</code> seleciona entidades candidatas, e <code translate="no">element_filter</code> restringe a pesquisa vetorial ao nível do elemento a blocos em que <code translate="no">section</code>, <code translate="no">quality_score</code> e <code translate="no">has_code</code> coincidem todos no mesmo elemento Struct.</p>
<div class="alert note">
<p>Aviso</p>
<p>Quando combinar um predicado de nível superior com <code translate="no">element_filter</code>, coloque <code translate="no">element_filter</code> no final da expressão. Uma expressão de filtro só pode conter um <code translate="no">element_filter</code>, e não é possível aninhar <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> dentro de outro operador StructArray.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Filtrar entidades com operadores MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize os operadores « <code translate="no">MATCH_*</code> » quando o filtro tiver de determinar se uma entidade pai é elegível com base nos seus elementos «Struct». Estes operadores são filtros ao nível da linha: selecionam entidades, mas não devolvem, por si só, os deslocamentos dos elementos.</p>
<table>
<thead>
<tr><th>Operador</th><th>Utilize-o quando</th><th>Exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Pelo menos um elemento Struct deve satisfazer o predicado.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Todos os elementos Struct devem satisfazer o predicado.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Pelo menos <code translate="no">N</code> elementos da estrutura devem satisfazer o predicado.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>No máximo, <code translate="no">N</code> elementos da Struct devem satisfazer o predicado.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Exatamente <code translate="no">N</code> elementos Struct devem satisfazer o predicado.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>Utilize « <code translate="no">MATCH_ANY</code> » aqui porque o resultado da pesquisa da EmbeddingList é ao nível da entidade. O filtro exige que, pelo menos, um fragmento na entidade seja um fragmento « <code translate="no">&quot;index&quot;</code> » de alta qualidade, mas o próprio resultado da pesquisa continua a representar a entidade pai.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Utilizar filtros na pesquisa híbrida<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Na pesquisa híbrida, aplique filtros StructArray onde a condição deva ter efeito. Um filtro de nível superior pode ser partilhado por toda a pesquisa híbrida. Um <code translate="no">element_filter</code> deve ser anexado ao pedido ao nível do elemento StructArray que necessite de restrições ao nível do elemento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>O argumento « <code translate="no">filter</code> » aplica a condição da entidade de nível superior, enquanto o « <code translate="no">expr</code> » em « <code translate="no">chunk_req</code> » restringe apenas a solicitação do vetor ao nível do elemento do StructArray. Para combinações de pesquisa híbrida suportadas e limites específicos da versão, consulte <a href="/docs/pt/hybrid-search-with-structarray.md">«Pesquisa híbrida com StructArray</a> » e <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Resumo do suporte a predicados<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize subcampos escalares nos predicados StructArray. Os subcampos vetoriais não são entradas de predicados escalares.</p>
<table>
<thead>
<tr><th>Tipo de subcampo</th><th>Exemplos típicos de predicados</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Tipos inteiros</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Subcampos vetoriais</td><td>Não são suportados como entradas de predicados escalares d <code translate="no">$[...]</code>. Em vez disso, utilize subcampos vetoriais através da pesquisa vetorial.</td></tr>
</tbody>
</table>
<p>Para casos não suportados, tais como percursos JSON, funções de contentores de matrizes, funções de correspondência de texto, predicados nulos em <code translate="no">$[...]</code>, funções de geometria, expressões Timestamptz e chamadas a funções genéricas, consulte <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</p>
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
<li><p>Utilizar ` <code translate="no">$[subfield]</code> ` fora de ` <code translate="no">element_filter</code> ` ou ` <code translate="no">MATCH_*</code>`.</p></li>
<li><p>Utilizar ` <code translate="no">chunks.section</code> ` em vez da sintaxe do operador `StructArray`, como ` <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>`.</p></li>
<li><p>Utilizar ` <code translate="no">element_filter</code> ` quando apenas é necessária uma filtragem ao nível da linha. Utilize ` <code translate="no">MATCH_ANY</code> ` em vez disso, se apenas precisar de selecionar entidades.</p></li>
<li><p>Esperar que ` <code translate="no">MATCH_*</code> ` devolva índices de elementos. Estes operadores selecionam entidades e não identificam, por si só, um elemento correspondente.</p></li>
<li><p>Escrever predicados booleanos simples, como <code translate="no">$[has_code]</code>. Utilize comparações explícitas, como <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>Colocar « <code translate="no">element_filter</code> » antes de um predicado de nível superior na mesma expressão de filtro.</p></li>
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
<li><p>Para rever a sintaxe completa do filtro StructArray, leia <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</p></li>
<li><p>Para executar primeiro pesquisas vetoriais não filtradas, leia <a href="/docs/pt/basic-vector-search-with-structarray.md">«Pesquisa vetorial básica com StructArray</a>».</p></li>
<li><p>Para criar índices escalares para filtros StructArray utilizados com frequência, leia <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para verificar os limites de filtragem e pesquisa específicos de cada versão, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
