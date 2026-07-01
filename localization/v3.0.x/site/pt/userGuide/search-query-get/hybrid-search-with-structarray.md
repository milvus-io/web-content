---
id: hybrid-search-with-structarray.md
title: Pesquisa híbrida com StructArray
summary: >-
  Utilize esta página para combinar a pesquisa de vetores StructArray com outras
  pesquisas de vetores numa única solicitação de pesquisa híbrida. A pesquisa
  híbrida StructArray pode produzir resultados ao nível da entidade ou ao nível
  do elemento, dependendo dos objetos AnnSearchRequest que combinar.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Pesquisa híbrida com StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize esta página para combinar a pesquisa vetorial do StructArray com outras pesquisas vetoriais numa única solicitação de pesquisa híbrida. A pesquisa híbrida do StructArray pode produzir resultados ao nível da entidade ou ao nível do elemento, dependendo dos objetos <code translate="no">AnnSearchRequest</code> que combinar.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». A coleção possui um campo vetorial de nível superior denominado « <code translate="no">title_vector</code> » e um campo StructArray denominado « <code translate="no">chunks</code> ». O subcampo « <code translate="no">chunks[emb_list_vector]</code> » está indexado para a pesquisa «EmbeddingList», e « <code translate="no">chunks[emb]</code> » está indexado para a pesquisa ao nível do elemento.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Como a pesquisa híbrida se aplica ao StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> combinação</th><th>Âmbito final dos candidatos</th><th>Comportamento do resultado</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Campo vetorial ao nível da coleção + subcampo EmbeddingList do StructArray</td><td>Nível da entidade</td><td>Os candidatos finais são indexados pela chave primária.</td><td>Não utilizar.</td></tr>
<tr><td>Campo vetorial ao nível da coleção + subcampo ao nível do elemento de StructArray</td><td>Nível da entidade</td><td>Os resultados ao nível do elemento são agrupados em candidatos ao nível da entidade antes da reclassificação híbrida.</td><td>Configuração opcional de agrupamento no nível do elemento StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Vários subcampos ao nível do elemento no âmbito do mesmo campo StructArray</td><td>Nível de elemento</td><td>Os candidatos finais são identificados pela chave primária mais o deslocamento do elemento Struct.</td><td>Não utilizar.</td></tr>
<tr><td>Subcampos ao nível do elemento em diferentes campos StructArray</td><td>Nível da entidade</td><td>Os deslocamentos dos elementos não partilham identidade, pelo que cada <code translate="no">AnnSearchRequest</code> ao nível do elemento StructArray é recolhido antes da reclassificação.</td><td>Configuração opcional de recolhimento em cada <code translate="no">AnnSearchRequest</code> de nível de elemento do StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Aviso</p>
<p>Utilize o parâmetro « <code translate="no">element_scope</code> » apenas para configurar a recolha de objetos « <code translate="no">AnnSearchRequest</code> » ao nível do elemento do StructArray numa pesquisa híbrida ao nível do elemento que não seja da mesma estrutura. Não o utilize para pedidos «EmbeddingList», pedidos de vetores ao nível da coleção ou pesquisa híbrida ao nível do elemento do StructArray da mesma estrutura.</p>
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
    </button></h2><p>Prepare a coleção, os dados e os índices antes de executar a pesquisa híbrida.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>A coleção contém um campo StructArray, como, por exemplo, <code translate="no">chunks</code>.</td></tr>
<tr><td>Subcampos de vetor</td><td>Utilize subcampos de vetor separados para a pesquisa na EmbeddingList e para a pesquisa ao nível dos elementos.</td></tr>
<tr><td>Índices</td><td><code translate="no">chunks[emb_list_vector]</code> utiliza uma métrica do tipo « <code translate="no">MAX_SIM*</code> ». O « <code translate="no">chunks[emb]</code> » utiliza uma métrica vetorial normal, como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » ou « <code translate="no">L2</code> ».</td></tr>
<tr><td>Reclassificador</td><td>Escolha um reclassificador híbrido, como <code translate="no">RRFRanker</code> ou outro reclassificador suportado pela sua aplicação.</td></tr>
</tbody>
</table>
<p>Para a configuração do índice, consulte <a href="/docs/pt/index-structarray-fields.md">Campos do StructArray do índice</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Executar uma pesquisa híbrida com um pedido EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>A pesquisa EmbeddingList num subcampo vetorial StructArray é ao nível da entidade na pesquisa híbrida. Comporta-se como uma solicitação de pesquisa vetorial ao nível da entidade e não devolve um único deslocamento de elemento Struct correspondente.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, ambos os objetos ` <code translate="no">AnnSearchRequest</code> ` produzem candidatos ao nível da entidade. O resultado final é indexado pela chave primária da entidade pai. Não adicione ` <code translate="no">element_scope</code> ` à solicitação `EmbeddingList`.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Executar pesquisa híbrida ao nível do elemento no mesmo StructArray<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando todos os objetos ` <code translate="no">AnnSearchRequest</code> ` têm como alvo subcampos vetoriais ao nível do elemento no âmbito do mesmo campo `StructArray`, a pesquisa híbrida pode manter os candidatos ao nível do elemento através de uma reclassificação. Este é o único modo híbrido do `StructArray` em que os resultados finais permanecem ao nível do elemento.</p>
<p>O exemplo seguinte pressupõe que o campo StructArray « <code translate="no">chunks</code> » tem dois subcampos vetoriais ao nível do elemento, « <code translate="no">chunks[emb]</code> » e « <code translate="no">chunks[code_emb]</code> », e que ambos utilizam métricas vetoriais regulares.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Ambos os objetos « <code translate="no">AnnSearchRequest</code> » pesquisam subcampos vetoriais em « <code translate="no">chunks</code> ». O mesmo deslocamento com base zero refere-se ao mesmo elemento Struct, pelo que o reclassificador híbrido pode classificar diretamente os candidatos ao nível do elemento. Não defina « <code translate="no">element_scope</code> » neste modo, uma vez que não é realizada qualquer consolidação ao nível da entidade.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Agrupar resultados ao nível do elemento para pesquisa híbrida ao nível da entidade<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Se uma pesquisa híbrida combinar um <code translate="no">AnnSearchRequest</code> ao nível do elemento StructArray com um pedido de vetor ao nível da coleção, um pedido EmbeddingList ou um pedido ao nível do elemento num campo StructArray diferente, o âmbito final dos candidatos é ao nível da entidade. Neste caso, cada <code translate="no">AnnSearchRequest</code> ao nível do elemento StructArray é agrupado em candidatos ao nível da entidade antes da reclassificação híbrida.</p>
<p>Utilize « <code translate="no">element_scope</code> » dentro do « <code translate="no">params</code> » do « <code translate="no">AnnSearchRequest</code> » ao nível do elemento StructArray quando precisar de controlar a forma como vários elementos correspondentes da mesma entidade são agrupados.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>Neste exemplo, « <code translate="no">title_req</code> » é ao nível da entidade, pelo que o resultado híbrido final também é ao nível da entidade. O pedido « <code translate="no">chunk_req</code> » devolve primeiro os resultados dos elementos do « <code translate="no">chunks[emb]</code> » e, em seguida, agrupa os elementos devolvidos da mesma entidade somando as três melhores pontuações dos elementos. Se « <code translate="no">element_scope</code> » for omitido quando for necessário um agrupamento ao nível da entidade, a estratégia de agrupamento assume por predefinição o valor « <code translate="no">max</code> ».</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Escolher uma estratégia de agrupamento<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Estratégia</th><th>Comportamento</th><th><code translate="no">topk</code></th><th>Requisito métrico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Manter a melhor pontuação do elemento devolvido para a entidade.</td><td>Não permitido.</td><td>Qualquer métrica vetorial regular suportada.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Somar todas as pontuações dos elementos devolvidos para a entidade.</td><td>Não permitido.</td><td>Apenas métricas de correlação positiva, tais como <code translate="no">IP</code> ou <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Calcular a média de todas as pontuações dos elementos devolvidos para a entidade.</td><td>Não permitido.</td><td>Qualquer métrica vetorial regular suportada.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Some as melhores pontuações dos elementos devolvidos por <code translate="no">K</code> para a entidade.</td><td>Obrigatório e deve ser positivo.</td><td>Apenas métricas de correlação positiva, tais como « <code translate="no">IP</code> » ou « <code translate="no">COSINE</code> ».</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Calcular a média das melhores pontuações dos elementos devolvidos pelo « <code translate="no">K</code> » para a entidade.</td><td>Obrigatório e deve ser positivo.</td><td>Qualquer métrica vetorial regular suportada.</td></tr>
</tbody>
</table>
<p>A função «Collapse» utiliza apenas os resultados dos elementos devolvidos por essa « <code translate="no">AnnSearchRequest</code> » ao nível do elemento do StructArray. Não analisa todos os elementos Struct da entidade após a pesquisa ANN. Defina a « <code translate="no">limit</code> » do pedido num valor suficientemente elevado para disponibilizar os elementos que pretende para a função «Collapse».</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Adicionar filtros, pesquisa por intervalo e agrupamento<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode associar um « <code translate="no">element_filter</code> » a um « <code translate="no">AnnSearchRequest</code> » ao nível do elemento do StructArray quando forem necessárias condições escalares aplicáveis aos mesmos elementos Struct que participam na pesquisa vetorial. Também pode utilizar um « <code translate="no">filter</code> » de nível superior em « <code translate="no">hybrid_search()</code> » para condições relativas à entidade pai.</p>
<p>Os campos vetoriais ao nível do elemento StructArray suportam a pesquisa por intervalo na pesquisa híbrida. Adicione <code translate="no">radius</code> e, opcionalmente, <code translate="no">range_filter</code> ao <code translate="no">AnnSearchRequest</code> ao nível do elemento. Os pedidos StructArray ao nível da EmbeddingList não suportam a pesquisa por intervalo.</p>
<p>O agrupamento híbrido ao nível do elemento só é suportado quando todos os objetos « <code translate="no">AnnSearchRequest</code> » têm como alvo campos vetoriais ao nível do elemento no âmbito do mesmo campo «StructArray», e « <code translate="no">group_by_field</code> » deve ser a chave primária. O agrupamento híbrido não é suportado quando a solicitação mistura campos vetoriais ao nível da coleção, diferentes campos «StructArray» ou solicitações ao nível de «EmbeddingList». Não combine a pesquisa por intervalo com o agrupamento.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Interpretar resultados híbridos<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Âmbito final dos candidatos</th><th>Chave do resultado</th><th>Comportamento do deslocamento</th><th>Quando ocorre</th></tr>
</thead>
<tbody>
<tr><td>Nível da entidade</td><td>Chave primária.</td><td>Sem deslocamento de elementos no resultado final.</td><td>A solicitação híbrida inclui um campo vetorial ao nível da coleção, uma solicitação EmbeddingList ou solicitações ao nível do elemento em diferentes campos StructArray.</td></tr>
<tr><td>Nível do elemento</td><td>Chave primária mais o campo StructArray pai mais o deslocamento do elemento.</td><td>O deslocamento do elemento selecionado pode ser devolvido quando exposto pela API ou pelo SDK.</td><td>Todos os objetos « <code translate="no">AnnSearchRequest</code> » estão ao nível do elemento e no mesmo campo «StructArray».</td></tr>
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
<li><p>Utilize o ` <code translate="no">element_scope</code> ` apenas para objetos ` <code translate="no">AnnSearchRequest</code> ` ao nível do elemento do `StructArray` que devam ser reduzidos a candidatos ao nível da entidade numa pesquisa híbrida.</p></li>
<li><p>Não utilize o ` <code translate="no">element_scope</code> ` para pedidos `EmbeddingList`, pedidos de vetores ao nível da coleção ou pesquisa híbrida ao nível do elemento do mesmo `StructArray`.</p></li>
<li><p><code translate="no">sum</code> As estratégias de redução « <code translate="no">topk_sum</code> » requerem métricas de correlação positiva, tais como « <code translate="no">IP</code> » ou « <code translate="no">COSINE</code> ». Não as utilize com « <code translate="no">L2</code> ».</p></li>
<li><p><code translate="no">topk_sum</code> e <code translate="no">topk_avg</code> requerem um valor positivo de <code translate="no">topk</code>. Outras estratégias de colapso não devem incluir <code translate="no">topk</code>.</p></li>
<li><p>Os pedidos de StructArray ao nível da EmbeddingList não suportam pesquisa por intervalo nem agrupamento.</p></li>
<li><p>A agrupamento híbrido é suportada apenas para pesquisas híbridas ao nível do elemento do mesmo StructArray e apenas por chave primária.</p></li>
<li><p>Não combine a pesquisa por intervalo com a agrupamento por.</p></li>
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
<li><p>Adicionar « <code translate="no">element_scope</code> » a uma solicitação híbrida ao nível do elemento do mesmo StructArray. Essa solicitação permanece ao nível do elemento e não realiza a compactação ao nível da entidade.</p></li>
<li><p>Adicionar « <code translate="no">element_scope</code> » a « <code translate="no">chunks[emb_list_vector]</code> ». A pesquisa «EmbeddingList» já é ao nível da entidade.</p></li>
<li><p>Presumir que dois campos StructArray partilham os deslocamentos dos elementos. O deslocamento <code translate="no">3</code> em <code translate="no">chunks</code> e o deslocamento <code translate="no">3</code> noutro campo StructArray correspondem a elementos diferentes, pelo que a solicitação híbrida passa a ser ao nível da entidade.</p></li>
<li><p>Utilizando <code translate="no">topk_sum</code> com <code translate="no">L2</code>. Utilize <code translate="no">max</code>, <code translate="no">avg</code> ou <code translate="no">topk_avg</code> para métricas de distância negativas.</p></li>
<li><p>Espera-se que os resultados híbridos ao nível da entidade incluam o deslocamento do elemento Struct selecionado após a recolha.</p></li>
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
<li><p>Para adicionar filtros escalares à pesquisa híbrida, leia <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p></li>
<li><p>Para utilizar limites de pontuação ou distância na pesquisa híbrida, leia <a href="/docs/pt/range-search-with-structarray.md">«Pesquisa por intervalo com StructArray</a>».</p></li>
<li><p>Para agrupar resultados híbridos ao nível do elemento por entidade pai, leia <a href="/docs/pt/grouping-search-with-structarray.md">«Pesquisa de agrupamento com StructArray</a>».</p></li>
<li><p>Para verificar os limites de pesquisa do StructArray, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
