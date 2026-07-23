---
id: hybrid-search-with-structarray.md
title: Búsqueda híbrida con StructArray
summary: >-
  Utiliza esta página para combinar la búsqueda vectorial de StructArray con
  otras búsquedas vectoriales en una única solicitud de búsqueda híbrida. La
  búsqueda híbrida de StructArray puede generar resultados a nivel de entidad o
  a nivel de elemento, dependiendo de los objetos AnnSearchRequest que se
  combinen.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Búsqueda híbrida con StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza esta página para combinar la búsqueda vectorial de StructArray con otras búsquedas vectoriales en una única solicitud de búsqueda híbrida. La búsqueda híbrida de StructArray puede generar resultados a nivel de entidad o a nivel de elemento, dependiendo de los objetos de <code translate="no">AnnSearchRequest</code> que se combinen.</p>
<p>Esta página utiliza la colección « <code translate="no">tech_articles</code> » de <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>». La colección tiene un campo vectorial de nivel superior denominado « <code translate="no">title_vector</code> » y un campo StructArray denominado « <code translate="no">chunks</code> ». El subcampo « <code translate="no">chunks[emb_list_vector]</code> » está indexado para la búsqueda EmbeddingList, y « <code translate="no">chunks[emb]</code> » está indexado para la búsqueda a nivel de elemento.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Cómo se aplica la búsqueda híbrida a StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> combinación</th><th>Ámbito de candidatos final</th><th>Comportamiento del resultado</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Campo vectorial a nivel de colección + subcampo «EmbeddingList» de StructArray</td><td>Nivel de entidad</td><td>Los candidatos finales se identifican mediante la clave primaria.</td><td>No utilizar.</td></tr>
<tr><td>Campo vectorial a nivel de colección + subcampo a nivel de elemento de StructArray</td><td>Nivel de entidad</td><td>Los resultados a nivel de elemento se agrupan en candidatos a nivel de entidad antes de la reordenación híbrida.</td><td>Configuración opcional de agrupación en el campo de nivel de elemento de StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Varios subcampos a nivel de elemento bajo el mismo campo StructArray</td><td>Nivel de elemento</td><td>Los candidatos finales se identifican mediante la clave primaria más el desplazamiento del elemento Struct.</td><td>No utilizar.</td></tr>
<tr><td>Subcampos a nivel de elemento bajo diferentes campos StructArray</td><td>Nivel de entidad</td><td>Los desplazamientos de los elementos no comparten identidad, por lo que cada <code translate="no">AnnSearchRequest</code> a nivel de elemento de StructArray se colapsa antes de volver a clasificar.</td><td>Configuración opcional de colapso en cada « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Advertencia</p>
<p>Utiliza « <code translate="no">element_scope</code> » únicamente para configurar el colapso de objetos de nivel de elemento de StructArray <code translate="no">AnnSearchRequest</code> en una búsqueda híbrida a nivel de elemento que no sea de la misma estructura. No lo utilices para solicitudes de EmbeddingList, solicitudes vectoriales a nivel de colección ni búsquedas híbridas a nivel de elemento de la misma StructArray.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepara la colección, los datos y los índices antes de ejecutar la búsqueda híbrida.</p>
<table>
<thead>
<tr><th>Requisitos</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>La colección contiene un campo StructArray, como <code translate="no">chunks</code>.</td></tr>
<tr><td>Subcampos vectoriales</td><td>Utilice subcampos vectoriales independientes para la búsqueda en EmbeddingList y la búsqueda a nivel de elemento.</td></tr>
<tr><td>Índices</td><td><code translate="no">chunks[emb_list_vector]</code> utiliza una métrica de tipo « <code translate="no">MAX_SIM*</code> ». « <code translate="no">chunks[emb]</code> » utiliza una métrica vectorial estándar, como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » o « <code translate="no">L2</code> ».</td></tr>
<tr><td>Reordenador</td><td>Elige un reordenador híbrido, como <code translate="no">RRFRanker</code> u otro reordenador compatible con tu aplicación.</td></tr>
</tbody>
</table>
<p>Para la configuración del índice, consulta <a href="/docs/es/index-structarray-fields.md">«Campos de StructArray del índice</a>».</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Ejecutar una búsqueda híbrida con una solicitud EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>La búsqueda con EmbeddingList en un subcampo vectorial de StructArray se realiza a nivel de entidad en la búsqueda híbrida. Se comporta como una solicitud de búsqueda vectorial a nivel de entidad y no devuelve un único desplazamiento de elemento Struct coincidente.</p>
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
<p>En este ejemplo, ambos objetos ` <code translate="no">AnnSearchRequest</code> ` generan candidatos a nivel de entidad. El resultado final se identifica mediante la clave primaria de la entidad principal. No añadas ` <code translate="no">element_scope</code> ` a la solicitud `EmbeddingList`.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Ejecutar una búsqueda híbrida a nivel de elemento con el mismo StructArray<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando todos los objetos ` <code translate="no">AnnSearchRequest</code> ` se dirigen a subcampos vectoriales a nivel de elemento dentro del mismo campo `StructArray`, la búsqueda híbrida puede conservar los candidatos a nivel de elemento mediante una nueva clasificación. Este es el único modo híbrido de `StructArray` en el que los resultados finales se mantienen a nivel de elemento.</p>
<p>El siguiente ejemplo supone que el campo StructArray de <code translate="no">chunks</code> tiene dos subcampos vectoriales a nivel de elemento, <code translate="no">chunks[emb]</code> y <code translate="no">chunks[code_emb]</code>, y que ambos utilizan métricas vectoriales normales.</p>
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
<p>Ambos objetos « <code translate="no">AnnSearchRequest</code> » buscan subcampos vectoriales en « <code translate="no">chunks</code> ». El mismo desplazamiento con base en cero hace referencia al mismo elemento de Struct, por lo que el reordenador híbrido puede clasificar directamente los candidatos a nivel de elemento. No establezca « <code translate="no">element_scope</code> » en este modo, ya que no se realiza ninguna agrupación a nivel de entidad.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Agrupar resultados a nivel de elemento para la búsqueda híbrida a nivel de entidad<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Si una búsqueda híbrida combina un « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray con una solicitud vectorial a nivel de colección, una solicitud «EmbeddingList» o una solicitud a nivel de elemento en un campo diferente de StructArray, el ámbito final de los candidatos es a nivel de entidad. En este caso, cada « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray se agrupa en candidatos a nivel de entidad antes de la reordenación híbrida.</p>
<p>Utiliza « <code translate="no">element_scope</code> » dentro de « <code translate="no">params</code> » de la solicitud de nivel de elemento « <code translate="no">AnnSearchRequest</code> » de StructArray cuando necesites controlar cómo se agrupan varios elementos coincidentes de la misma entidad.</p>
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
<p>En este ejemplo, « <code translate="no">title_req</code> » es a nivel de entidad, por lo que el resultado híbrido final también es a nivel de entidad. La solicitud « <code translate="no">chunk_req</code> » devuelve primero los resultados de los elementos de « <code translate="no">chunks[emb]</code> » y, a continuación, agrupa los elementos devueltos de la misma entidad sumando las tres mejores puntuaciones de los elementos. Si se omite « <code translate="no">element_scope</code> » cuando se necesita una agrupación a nivel de entidad, la estrategia de agrupación por defecto es « <code translate="no">max</code> ».</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Elegir una estrategia de agrupación<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Estrategia</th><th>Comportamiento</th><th><code translate="no">topk</code></th><th>Requisito de métrica</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Conservar la mejor puntuación del elemento devuelto para la entidad.</td><td>No permitido.</td><td>Cualquier métrica vectorial regular compatible.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Suma todas las puntuaciones de los elementos devueltos para la entidad.</td><td>No permitido.</td><td>Solo métricas de correlación positiva, como <code translate="no">IP</code> o <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Calcular la media de todas las puntuaciones de los elementos devueltos para la entidad.</td><td>No permitido.</td><td>Cualquier métrica vectorial regular admitida.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Suma de las mejores puntuaciones de los elementos devueltos por « <code translate="no">K</code> » para la entidad.</td><td>Es obligatorio y debe ser positivo.</td><td>Solo métricas de correlación positiva, como « <code translate="no">IP</code> » o « <code translate="no">COSINE</code> ».</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Calcular la media de las mejores puntuaciones de los elementos devueltos por « <code translate="no">K</code> » para la entidad.</td><td>Es obligatorio y debe ser positivo.</td><td>Cualquier métrica vectorial regular compatible.</td></tr>
</tbody>
</table>
<p>La función «Collapse» utiliza únicamente los resultados de los elementos devueltos por ese « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray. No analiza todos los elementos de Struct de la entidad tras la búsqueda ANN. Establece el valor de « <code translate="no">limit</code> » de la solicitud lo suficientemente alto como para que los elementos que deseas estén disponibles para la función «Collapse».</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Añadir filtros, búsqueda por rango y agrupación<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede asociar un « <code translate="no">element_filter</code> » a un « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray cuando deban aplicarse condiciones escalares a los mismos elementos de Struct que participan en la búsqueda vectorial. También puede utilizar un « <code translate="no">filter</code> » de nivel superior en « <code translate="no">hybrid_search()</code> » para condiciones de la entidad principal.</p>
<p>Los campos vectoriales a nivel de elemento de StructArray admiten la búsqueda por rango en la búsqueda híbrida. Añade <code translate="no">radius</code> y, opcionalmente, <code translate="no">range_filter</code> a la <code translate="no">AnnSearchRequest</code> a nivel de elemento. Las solicitudes de StructArray a nivel de EmbeddingList no admiten la búsqueda por rango.</p>
<p>La agrupación híbrida a nivel de elemento solo es compatible cuando todos los objetos ` <code translate="no">AnnSearchRequest</code> ` se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo `StructArray`, y ` <code translate="no">group_by_field</code> ` debe ser la clave principal. La agrupación híbrida no es compatible cuando la solicitud mezcla campos vectoriales a nivel de colección, diferentes campos `StructArray` o solicitudes a nivel de `EmbeddingList`. No combine la búsqueda por rango con la agrupación.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Interpretación de los resultados híbridos<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Ámbito de candidatos final</th><th>Clave del resultado</th><th>Comportamiento del desplazamiento</th><th>Cuándo se produce</th></tr>
</thead>
<tbody>
<tr><td>Nivel de entidad</td><td>Clave primaria.</td><td>No hay desplazamiento de elementos en el resultado final.</td><td>La solicitud híbrida incluye un campo vectorial a nivel de colección, una solicitud EmbeddingList o solicitudes a nivel de elemento en distintos campos StructArray.</td></tr>
<tr><td>Nivel de elemento</td><td>Clave primaria más el campo StructArray padre más el desplazamiento del elemento.</td><td>El desplazamiento del elemento seleccionado puede devolverse cuando lo exponga la API o el SDK.</td><td>Todos los objetos « <code translate="no">AnnSearchRequest</code> » son a nivel de elemento y se encuentran bajo el mismo campo «StructArray».</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitaciones<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Utiliza « <code translate="no">element_scope</code> » únicamente para objetos « <code translate="no">AnnSearchRequest</code> » a nivel de elemento de StructArray que deban reducirse a candidatos a nivel de entidad en la búsqueda híbrida.</p></li>
<li><p>No utilice « <code translate="no">element_scope</code> » para solicitudes de EmbeddingList, solicitudes vectoriales a nivel de colección ni búsquedas híbridas a nivel de elemento del mismo StructArray.</p></li>
<li><p><code translate="no">sum</code> Las estrategias de reducción « <code translate="no">topk_sum</code> » y «and» requieren métricas de correlación positiva, como « <code translate="no">IP</code> » o « <code translate="no">COSINE</code> ». No las utilices con « <code translate="no">L2</code> ».</p></li>
<li><p><code translate="no">topk_sum</code> y <code translate="no">topk_avg</code> requieren un valor positivo de <code translate="no">topk</code>. Las demás estrategias de colapso no deben incluir <code translate="no">topk</code>.</p></li>
<li><p>Las solicitudes de StructArray a nivel de EmbeddingList no admiten la búsqueda por rango ni la agrupación.</p></li>
<li><p>La agrupación híbrida solo es compatible con la búsqueda híbrida a nivel de elemento del mismo StructArray y únicamente mediante la clave primaria.</p></li>
<li><p>No se debe combinar la búsqueda por rango con la agrupación.</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">Errores comunes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Añadir « <code translate="no">element_scope</code> » a una solicitud híbrida a nivel de elemento del mismo StructArray. Esa solicitud sigue siendo a nivel de elemento y no realiza la agrupación a nivel de entidad.</p></li>
<li><p>Añadir « <code translate="no">element_scope</code> » a « <code translate="no">chunks[emb_list_vector]</code> ». La búsqueda de «EmbeddingList» ya se realiza a nivel de entidad.</p></li>
<li><p>Suponer que dos campos de StructArray comparten desplazamientos de elementos. El desplazamiento « <code translate="no">3</code> » en « <code translate="no">chunks</code> » y el desplazamiento « <code translate="no">3</code> » en otro campo de StructArray corresponden a elementos diferentes, por lo que la solicitud híbrida pasa a ser a nivel de entidad.</p></li>
<li><p>Utilizando <code translate="no">topk_sum</code> con <code translate="no">L2</code>. Utiliza <code translate="no">max</code>, <code translate="no">avg</code> o <code translate="no">topk_avg</code> para métricas de distancia negativas.</p></li>
<li><p>Se espera que los resultados híbridos a nivel de entidad incluyan el desplazamiento del elemento Struct seleccionado tras el colapso.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos pasos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Para conocer los dos modos básicos de búsqueda vectorial con StructArray, consulta <a href="/docs/es/basic-vector-search-with-structarray.md">«Búsqueda vectorial básica con StructArray</a>».</p></li>
<li><p>Para añadir filtros escalares a la búsqueda híbrida, consulta <a href="/docs/es/filtered-search-with-structarray.md">«Búsqueda filtrada con StructArray</a>».</p></li>
<li><p>Para utilizar límites de puntuación o distancia en la búsqueda híbrida, consulta <a href="/docs/es/range-search-with-structarray.md">«Búsqueda por rango con StructArray</a>».</p></li>
<li><p>Para agrupar los resultados híbridos a nivel de elemento por entidad principal, consulta <a href="/docs/es/grouping-search-with-structarray.md">«Búsqueda agrupada con StructArray</a>».</p></li>
<li><p>Para consultar los límites de búsqueda de StructArray, lee <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
