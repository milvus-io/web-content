---
id: range-search-with-structarray.md
title: Búsqueda por rango con StructArray
summary: >-
  Utiliza esta página para realizar una búsqueda por rango en los subcampos
  vectoriales de StructArray. La búsqueda por rango devuelve resultados
  vectoriales cuya puntuación o distancia se encuentre dentro de un límite
  especificado. Para los campos StructArray, utiliza la búsqueda por rango junto
  con la búsqueda vectorial a nivel de elemento, en la que cada elemento de
  Struct se busca de forma independiente.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Búsqueda por rango con StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza esta página para realizar una búsqueda por rango en los subcampos vectoriales de StructArray. La búsqueda por rango devuelve resultados vectoriales cuya puntuación o distancia se encuentra dentro de un límite especificado. Para los campos StructArray, utiliza la búsqueda por rango junto con la búsqueda vectorial a nivel de elemento, en la que cada elemento de Struct se busca de forma independiente.</p>
<p>Esta página utiliza la colección « <code translate="no">tech_articles</code> » de <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>». La colección tiene un campo StructArray denominado « <code translate="no">chunks</code> ». El subcampo vectorial « <code translate="no">chunks[emb]</code> » está indexado para la búsqueda a nivel de elemento con una métrica vectorial habitual, como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » o « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Cómo se aplica la búsqueda por rango a StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Modo de búsqueda</th><th>Comportamiento de la búsqueda por rango</th><th>Granularidad de los resultados</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda en EmbeddingList</td><td>No compatible.</td><td>No aplicable.</td></tr>
<tr><td>Búsqueda a nivel de elemento</td><td>Utiliza una consulta vectorial normal con ` <code translate="no">radius</code> ` y, opcionalmente, ` <code translate="no">range_filter</code>`.</td><td>Nivel de elemento de estructura.</td></tr>
<tr><td>Búsqueda híbrida</td><td>Compatible cuando la solicitud de StructArray se dirige a un campo vectorial a nivel de elemento. Las solicitudes a nivel de EmbeddingList no admiten la búsqueda por rango.</td><td>Subbúsqueda a nivel de elemento, seguida de una reordenación híbrida.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Si solo necesitas los elementos Struct más cercanos, empieza con <a href="/docs/es/basic-vector-search-with-structarray.md">la búsqueda vectorial básica con StructArray</a>. Utiliza la búsqueda por rango cuando el resultado deba cumplir un límite de puntuación o distancia, en lugar de limitarse a una clasificación de los K primeros.</p>
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
    </button></h2><p>Prepara la colección, los datos y los índices antes de ejecutar la búsqueda por rango.</p>
<table>
<thead>
<tr><th>Requisitos</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>La colección contiene un campo StructArray, como por ejemplo <code translate="no">chunks</code>.</td></tr>
<tr><td>Subcampo vectorial a nivel de elemento</td><td>El subcampo vectorial de destino es <code translate="no">chunks[emb]</code>, no <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Métrica de indexación</td><td>El subcampo vectorial se indexa con una métrica vectorial regular, como <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Datos de la consulta</td><td>La consulta es un vector normal, no un <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Para la configuración del índice, consulta <a href="/docs/es/index-structarray-fields.md">«Campos StructArray del índice</a>».</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Utilice «radius» y «range_filter»<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Establezca ` <code translate="no">radius</code> ` para definir el límite de búsqueda. Establezca ` <code translate="no">range_filter</code> ` cuando también necesite un límite interior. La dirección depende de si es mejor una distancia menor o una puntuación de similitud mayor.</p>
<table>
<thead>
<tr><th>Tipo de métrica</th><th>¿Es mejor una puntuación más alta?</th><th>Condición de rango cuando se utiliza « <code translate="no">range_filter</code> »</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>No. Es mejor una distancia menor.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Sí. Cuanto mayor sea la puntuación, mejor.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Cuando solo se establece « <code translate="no">radius</code> », la búsqueda por rango devuelve resultados que cumplen el límite exterior de la métrica. Elige los valores según la escala de puntuación o distancia de tus incrustaciones.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Realizar una búsqueda por rango a nivel de elemento<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo busca fragmentos individuales cuyos vectores de « <code translate="no">chunks[emb]</code> » sean lo suficientemente similares al vector de consulta. Cada resultado encontrado representa un elemento Struct coincidente.</p>
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
<p>En este ejemplo, « <code translate="no">COSINE</code> » es una métrica de tipo similitud, por lo que el rango de resultados es mayor que <code translate="no">radius</code> y menor o igual que <code translate="no">range_filter</code>. El valor « <code translate="no">offset</code> » identifica el elemento Struct coincidente en la matriz « <code translate="no">chunks</code> » cuando se devuelve.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Añadir filtros escalares<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede combinar la búsqueda de rango a nivel de elemento con el filtrado escalar de StructArray. Utilice un predicado de nivel superior para los campos de la entidad principal y utilice <code translate="no">element_filter</code> para restringir qué elementos Struct participan en la búsqueda de rango vectorial.</p>
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
<p>El predicado de nivel superior selecciona las entidades candidatas. El predicado « <code translate="no">element_filter</code> » restringe la búsqueda de rango vectorial a los elementos Struct coincidentes. Para ver más ejemplos de filtrado, consulta <a href="/docs/es/filtered-search-with-structarray.md">«Búsqueda filtrada con StructArray</a>».</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Utilizar la búsqueda por rango en la búsqueda híbrida<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Los campos vectoriales a nivel de elemento de StructArray admiten la búsqueda por rango en la búsqueda híbrida. Añade « <code translate="no">radius</code> » y, opcionalmente, « <code translate="no">range_filter</code> » a la solicitud « <code translate="no">AnnSearchRequest</code> » dirigida al campo vectorial a nivel de elemento de StructArray.</p>
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
<p>En este ejemplo, solo la subpetición « <code translate="no">chunks[emb]</code> » utiliza parámetros de búsqueda por rango. La petición de StructArray sigue respetando la semántica a nivel de elemento: el límite del rango se aplica a los resultados del elemento Struct antes de que la búsqueda híbrida combine y vuelva a clasificar los resultados.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Interpretar los resultados del rango<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><th>Elemento de resultado</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Clave primaria de la entidad que contiene el elemento Struct coincidente.</td></tr>
<tr><td><code translate="no">distance</code> o puntuación</td><td>La puntuación o distancia entre el vector de consulta y el vector del elemento Struct coincidente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posición, contada a partir de cero, del elemento Struct coincidente en el campo StructArray al devolverse.</td></tr>
<tr><td>Claves primarias repetidas</td><td>Posible. Más de un elemento Struct de la misma entidad puede estar dentro del rango especificado.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Se aplica a las coincidencias de elementos, no a entidades padre únicas.</td></tr>
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
<li><p>No utilices una consulta « <code translate="no">EmbeddingList</code> » ni una métrica « <code translate="no">MAX_SIM*</code> » para la búsqueda por rango en los subcampos vectoriales de StructArray. La búsqueda a nivel de EmbeddingList no admite la búsqueda por rango.</p></li>
<li><p>No combines la búsqueda por rango con la búsqueda por agrupación. Si necesitas un resultado por cada entidad principal, ejecuta una búsqueda a nivel de elemento sin parámetros de rango y utiliza la agrupación cuando sea compatible.</p></li>
<li><p>La búsqueda por rango híbrida es compatible con los campos vectoriales a nivel de elemento de StructArray. No es compatible con las solicitudes de StructArray a nivel de EmbeddingList.</p></li>
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
<li><p>Realizar una búsqueda por rango en ` <code translate="no">chunks[emb_list_vector]</code>`, que está pensada para la búsqueda en `EmbeddingList`.</p></li>
<li><p>Utilizar ` <code translate="no">MAX_SIM_COSINE</code> ` en lugar de una métrica habitual, como ` <code translate="no">COSINE</code> `, para la búsqueda por rango a nivel de elemento.</p></li>
<li><p>Utilizar una consulta de « <code translate="no">EmbeddingList</code> » en lugar de una consulta vectorial normal.</p></li>
<li><p>Esperar que los resultados de la búsqueda por rango sean únicos por entidad principal. La búsqueda por rango devuelve resultados que coinciden con elementos de Struct.</p></li>
<li><p>Utilizar <code translate="no">chunks.emb</code> en lugar de la sintaxis de ruta de subcampo requerida <code translate="no">chunks[emb]</code>.</p></li>
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
<li><p>Para añadir filtros escalares a la búsqueda por rango, consulta <a href="/docs/es/filtered-search-with-structarray.md">«Búsqueda filtrada con StructArray</a>».</p></li>
<li><p>Para obtener como máximo un resultado por entidad principal cuando sea compatible, consulta <a href="/docs/es/grouping-search-with-structarray.md">«Búsqueda agrupada con StructArray</a>».</p></li>
<li><p>Para consultar los límites de búsqueda específicos de cada versión, lea <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
