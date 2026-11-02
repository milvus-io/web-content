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
<p>Los ejemplos utilizan el tamaño de grupo predeterminado, que es uno.</p>
<p>Antes de ejecutar estos ejemplos, crea la colección, inserta los datos de ejemplo, crea los índices vectoriales necesarios y carga la colección. Utiliza vectores de 4 dimensiones para los campos que se muestran aquí. Cada bloque de código da por hecho que se dispone de la conexión y las variables de los ejemplos anteriores en el mismo lenguaje, a menos que se vuelvan a definir.</p>
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
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outputFields(Arrays.asList(
                <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>,
                <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + result.getId()
                + <span class="hljs-string">&quot;, distance: &quot;</span> + result.getScore()
                + <span class="hljs-string">&quot;, offset: &quot;</span> + result.getElementOffset()
                + <span class="hljs-string">&quot;, entity: &quot;</span> + result.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithGroupByField(<span class="hljs-string">&quot;doc_id&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;doc_id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;doc_id&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> res.<span class="hljs-property">results</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;doc_id:&quot;</span>, hit.<span class="hljs-property">doc_id</span>, <span class="hljs-string">&quot;distance:&quot;</span>, hit.<span class="hljs-property">score</span>, <span class="hljs-string">&quot;offset:&quot;</span>, hit.<span class="hljs-property">offset</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});

<span class="hljs-keyword">foreach</span> (<span class="hljs-built_in">long</span> id <span class="hljs-keyword">in</span> results.Ids.LongIds ?? [])
{
    Console.WriteLine(<span class="hljs-string">$&quot;doc_id: <span class="hljs-subst">{id}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[page]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sin agrupación, el mismo ` <code translate="no">doc_id</code> ` puede aparecer varias veces si varios fragmentos coinciden con la consulta. Con ` <code translate="no">group_by_field=&quot;doc_id&quot;</code>`, cada entidad principal aparece como máximo una vez. La agrupación conserva los metadatos a nivel de elemento, por lo que el resultado agrupado puede seguir incluyendo el índice o el desplazamiento del elemento Struct seleccionado cuando la API o el SDK lo expongan.</p>
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
    </button></h2><p>Puedes combinar la búsqueda por agrupación con el filtrado escalar de StructArray. Utiliza <code translate="no">element_filter</code> cuando la condición escalar deba restringir qué elementos Struct participan en la búsqueda vectorial a nivel de elemento.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span>
        + <span class="hljs-string">&quot;element_filter(chunks, &quot;</span>
        + <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span>
        + <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .filter(filterExpr)
        .topK(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outputFields(Arrays.asList(
                <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>,
                <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;element_filter(chunks, &quot;</span> +
    <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithFilter(filterExpr).
    WithGroupByField(<span class="hljs-string">&quot;doc_id&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;doc_id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;doc_id&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
        .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

std::string filter_expr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span>
                          <span class="hljs-string">&quot;element_filter(chunks, &quot;</span>
                          <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span>
                          <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>;

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
       .<span class="hljs-built_in">WithFilter</span>(filter_expr)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];

<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;,
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>El predicado de nivel superior selecciona las entidades candidatas. El predicado « <code translate="no">element_filter</code> » restringe la búsqueda vectorial a nivel de elemento a los elementos de Struct que coincidan. A continuación, la agrupación agrupa los resultados de los elementos coincidentes según la clave primaria.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Uso de la agrupación en la búsqueda híbrida<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
<p>El siguiente ejemplo parte de la base de que el campo StructArray « <code translate="no">chunks</code> » tiene dos subcampos vectoriales a nivel de elemento, « <code translate="no">chunks[emb]</code> » y « <code translate="no">chunks[code_emb]</code> », y que ambos están indexados con « <code translate="no">COSINE</code> ». Define y rellena el subcampo adicional de 4 dimensiones « <code translate="no">code_emb</code> » al crear la colección; no está incluido en el esquema base enlazado anteriormente.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]
code_query_vector = [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">codeQueryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">indexChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">codeChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
        .vectors(Collections.singletonList(codeQueryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(indexChunkReq, codeChunkReq))
        .ranker(RRFRanker.builder().build())
        .limit(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">code_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">hybrid_search</span>(
    HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[index_chunk_req, code_chunk_req])
        .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>())
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};
std::vector&lt;<span class="hljs-type">float</span>&gt; code_query_vector = {<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>};

<span class="hljs-keyword">auto</span> index_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
index_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
                .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

<span class="hljs-keyword">auto</span> code_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
code_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
               .<span class="hljs-built_in">AddFloatVector</span>(code_query_vector)
               .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
               .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(index_chunk_req)
       .<span class="hljs-built_in">AddSubRequest</span>(code_chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>))
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>);

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];
<span class="hljs-built_in">float</span>[] codeQueryVector = [<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>];

AnnSearchReq indexChunkReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>
};

AnnSearchReq codeChunkReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    Vectors = [codeQueryVector],
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>
};

SearchResp results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = [indexChunkReq, codeChunkReq],
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;search&quot;: [
        {
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;
        },
        {
            &quot;annsField&quot;: &quot;chunks[code_emb]&quot;,
            &quot;data&quot;: [[0.18, 0.23, 0.29, 0.36]],
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[has_code] == true)&quot;
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {} },
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>El código fuente del cliente Go incluido con Milvus 3.0.2 no expone la agrupación híbrida final a través de <code translate="no">NewHybridSearchOption</code>. Establecer <code translate="no">WithGroupByField</code> en cada sub-solicitud no configura la agrupación híbrida final. NodeJS 3.0.6 también omite el nivel superior <code translate="no">group_by_field</code> de los parámetros de clasificación híbrida. Utiliza una de las API mostradas anteriormente para este ejemplo.</p>
<p>En este ejemplo, ambas sub-solicitudes se dirigen a campos vectoriales a nivel de elemento dentro del mismo campo StructArray, <code translate="no">chunks</code>. Una búsqueda híbrida no admite la agrupación a nivel de elemento si mezcla campos vectoriales normales, campos StructArray diferentes o solicitudes a nivel de EmbeddingList.</p>
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
<tr><td>Clave primaria (<code translate="no">doc_id</code> en estos ejemplos)</td><td>Clave primaria de la entidad principal agrupada.</td></tr>
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
<li><p>No combines la búsqueda agrupada con la búsqueda por rango.</p></li>
<li><p>No utilice una consulta « <code translate="no">EmbeddingList</code> » ni una métrica « <code translate="no">MAX_SIM*</code> » para la búsqueda agrupada.</p></li>
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
<li><p>Para utilizar límites de puntuación o distancia en lugar de agrupaciones, lee <a href="/docs/es/range-search-with-structarray.md">«Búsqueda por rango con StructArray</a>».</p></li>
<li><p>Para consultar los límites de búsqueda de StructArray, lee <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
