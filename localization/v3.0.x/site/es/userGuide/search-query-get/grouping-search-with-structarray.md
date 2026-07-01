---
id: grouping-search-with-structarray.md
title: Agrupación de resultados de búsqueda con StructArray
summary: >-
  Utiliza esta página para agrupar los resultados de la búsqueda a nivel de
  elemento de StructArray por entidad principal. La búsqueda a nivel de elemento
  puede devolver varios resultados de la misma entidad cuando varios elementos
  de Struct coinciden con la consulta. La agrupación agrupa esos resultados de
  elementos de modo que cada entidad principal aparezca como máximo una vez.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Agrupación de resultados de búsqueda con StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza esta página para agrupar los resultados de búsqueda a nivel de elemento de StructArray por entidad principal. La búsqueda a nivel de elemento puede devolver varios resultados de la misma entidad cuando varios elementos de Struct coinciden con la consulta. La agrupación agrupa esos resultados de elementos de modo que cada entidad principal aparezca como máximo una vez.</p>
<p>Esta página utiliza la colección « <code translate="no">tech_articles</code> » de <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>». La colección tiene un campo StructArray denominado « <code translate="no">chunks</code> ». El subcampo vectorial « <code translate="no">chunks[emb]</code> » está indexado para la búsqueda a nivel de elemento con una métrica vectorial regular.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Cómo se aplica la agrupación a StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Modo de búsqueda</th><th>Comportamiento de la agrupación</th><th>Comportamiento de los resultados</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda en EmbeddingList</td><td>No es compatible.</td><td>No aplicable.</td></tr>
<tr><td>Búsqueda a nivel de elemento</td><td>Compatible mediante agrupación por clave primaria.</td><td>Devuelve como máximo un resultado por entidad principal. Se conservan los metadatos a nivel de elemento, por lo que se puede devolver el índice o el desplazamiento del elemento seleccionado cuando lo exponga la API o el SDK.</td></tr>
<tr><td>Búsqueda híbrida</td><td>Solo es compatible cuando todas las subbúsquedas se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo StructArray.</td><td>Las subbúsquedas a nivel de elemento se agrupan por clave primaria antes del procesamiento final de los resultados.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Utiliza la agrupación cuando la búsqueda a nivel de elemento sin agrupar devuelva demasiadas entidades principales duplicadas. Si deseas que cada elemento Struct coincidente aparezca como un resultado individual, utiliza <a href="/docs/es/basic-vector-search-with-structarray.md">la búsqueda vectorial básica con StructArray</a> sin la opción « <code translate="no">group_by_field</code> ».</p>
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
    </button></h2><p>Prepara la colección, los datos y los índices antes de ejecutar la búsqueda agrupada.</p>
<table>
<thead>
<tr><th>Requisitos</th><th>Detalles</th></tr>
</thead>
<tbody>
<tr><td>Subcampo vectorial a nivel de elemento</td><td>Utilice un subcampo vectorial StructArray, como <code translate="no">chunks[emb]</code>, indexado con una métrica vectorial regular.</td></tr>
<tr><td>Consulta vectorial normal</td><td>Utilice un vector de consulta regular, no un ` <code translate="no">EmbeddingList</code>`.</td></tr>
<tr><td>Agrupación por clave primaria</td><td>Utilice la clave primaria de la colección como ` <code translate="no">group_by_field</code>`, por ejemplo, ` <code translate="no">doc_id</code>`.</td></tr>
<tr><td>Sin parámetros de rango</td><td>No combine la búsqueda por agrupación con parámetros de búsqueda por rango, como <code translate="no">radius</code> o <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Para la configuración del índice, consulta <a href="/docs/es/index-structarray-fields.md">«Campos StructArray del índice</a>».</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Ejecutar una búsqueda agrupada a nivel de elemento<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo busca primero en fragmentos individuales y, a continuación, agrupa los resultados de los elementos según la clave primaria de la entidad principal.</p>
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
<p>Sin agrupación, el mismo <code translate="no">doc_id</code> puede aparecer varias veces si varios fragmentos coinciden con la consulta. Con <code translate="no">group_by_field=&quot;doc_id&quot;</code>, cada entidad principal aparece como máximo una vez. La agrupación conserva los metadatos a nivel de elemento, por lo que el resultado agrupado puede seguir incluyendo el índice o el desplazamiento del elemento Struct seleccionado cuando la API o el SDK lo expongan.</p>
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
    </button></h2><p>Puedes combinar la búsqueda agrupada con el filtrado escalar de StructArray. Utiliza « <code translate="no">element_filter</code> » cuando la condición escalar deba restringir qué elementos Struct participan en la búsqueda vectorial a nivel de elemento.</p>
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
<p>El predicado de nivel superior selecciona las entidades candidatas. El predicado « <code translate="no">element_filter</code> » restringe la búsqueda vectorial a nivel de elemento a los elementos de Struct que coincidan. A continuación, la agrupación agrupa los resultados de elementos coincidentes por la clave primaria.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Utilice la agrupación en la búsqueda híbrida<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>La agrupación híbrida con StructArray es una característica a nivel de elemento. Solo es compatible cuando todas las subbúsquedas se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo StructArray. No utilices solicitudes a nivel de EmbeddingList en una búsqueda híbrida agrupada de StructArray.</p>
<p>El siguiente ejemplo parte de la base de que el campo StructArray « <code translate="no">chunks</code> » tiene dos subcampos vectoriales a nivel de elemento, « <code translate="no">chunks[emb]</code> » y « <code translate="no">chunks[code_emb]</code> », y que ambos están indexados con métricas vectoriales normales.</p>
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
<p>En este ejemplo, ambas subconsultas se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo StructArray, <code translate="no">chunks</code>. Una búsqueda híbrida no admite la agrupación a nivel de elemento si mezcla campos vectoriales normales, diferentes campos StructArray o consultas a nivel de EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Interpretar los resultados agrupados<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><th>Elemento del resultado</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Clave primaria de la entidad principal agrupada.</td></tr>
<tr><td><code translate="no">distance</code> o puntuación</td><td>Puntuación o distancia del elemento Struct seleccionado para esa entidad principal.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posición, contada a partir de cero, del elemento Struct seleccionado al devolverse.</td></tr>
<tr><td>Claves primarias repetidas</td><td>No se esperan al agrupar por la clave primaria.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Se aplica a los resultados agrupados de la entidad principal.</td></tr>
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
<li><p>La búsqueda por agrupación solo se aplica a la búsqueda vectorial de StructArray a nivel de elemento. La búsqueda en EmbeddingList y la búsqueda híbrida a nivel de EmbeddingList no admiten la agrupación.</p></li>
<li><p>Utiliza la clave primaria como « <code translate="no">group_by_field</code> ». La agrupación a nivel de elemento de StructArray no es una agrupación de uso general sobre campos escalares arbitrarios.</p></li>
<li><p>No combine la búsqueda agrupada con la búsqueda por rango.</p></li>
<li><p>No utilices una consulta « <code translate="no">EmbeddingList</code> » ni una métrica « <code translate="no">MAX_SIM*</code> » para la búsqueda agrupada.</p></li>
<li><p>La agrupación híbrida solo es compatible cuando todas las subbúsquedas se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo StructArray.</p></li>
<li><p>La agrupación híbrida no es compatible cuando la búsqueda híbrida combina un campo vectorial normal, un campo StructArray diferente o una solicitud a nivel de EmbeddingList.</p></li>
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
<li><p>Utilizar la agrupación con ` <code translate="no">chunks[emb_list_vector]</code>`, que está pensada para la búsqueda en `EmbeddingList`.</p></li>
<li><p>Agrupar por un campo escalar que no sea la clave primaria.</p></li>
<li><p>Agrupación por varios campos. La agrupación de StructArray a nivel de elemento solo admite la agrupación por clave primaria.</p></li>
<li><p>Esperar que los resultados agrupados representen todos los elementos Struct coincidentes. La agrupación devuelve como máximo un resultado por entidad principal.</p></li>
<li><p>Suponer que la búsqueda agrupada a nivel de elemento vuelve a calcular una puntuación de tipo « <code translate="no">MAX_SIM*</code> » al estilo de EmbeddingList. La agrupación agrupa los resultados a nivel de elemento; no cambia el modelo de puntuación.</p></li>
<li><p>Combinación de « <code translate="no">group_by_field</code> » con « <code translate="no">radius</code> » o « <code translate="no">range_filter</code> ».</p></li>
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
<li><p>Para aprender primero la búsqueda a nivel de elemento sin agrupar, lee <a href="/docs/es/basic-vector-search-with-structarray.md">«Búsqueda vectorial básica con StructArray</a>».</p></li>
<li><p>Para añadir filtros escalares a la búsqueda agrupada, lee <a href="/docs/es/filtered-search-with-structarray.md">«Búsqueda filtrada con StructArray</a>».</p></li>
<li><p>Para utilizar límites de puntuación o distancia en lugar de agrupaciones, consulta <a href="/docs/es/range-search-with-structarray.md">«Búsqueda por rango con StructArray</a>».</p></li>
<li><p>Para consultar los límites de búsqueda de StructArray, lee <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
