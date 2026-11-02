---
id: filtered-search-with-structarray.md
title: Gefilterte Suche mit StructArray
summary: >-
  Auf dieser Seite können Sie die Vektorsuche für StructArray-Felder um eine
  skalare Filterung erweitern. Die Filterung von StructArrays erfolgt auf zwei
  Ebenen: Filter auf Zeilenebene wählen übergeordnete Entitäten aus, während
  Filter auf Elementebene festlegen, welche Struct-Elemente an der Vektorsuche
  auf Elementebene teilnehmen.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Gefilterte Suche mit StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um die Vektorsuche in StructArray-Feldern um eine skalare Filterung zu erweitern. Die StructArray-Filterung erfolgt auf zwei Ebenen: Filter auf Zeilenebene wählen übergeordnete Entitäten aus, während Filter auf Elementebene festlegen, welche Struct-Elemente an der Vektorsuche auf Elementebene teilnehmen.</p>
<p>Diese Seite verwendet die Sammlung „ <code translate="no">tech_articles</code> “ aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein StructArray-Feld namens „ <code translate="no">chunks</code> “ mit skalaren Unterfeldern wie „ <code translate="no">section</code> “, „ <code translate="no">page</code> “, „ <code translate="no">quality_score</code> “ und „ <code translate="no">has_code</code> “ sowie Vektor-Unterfeldern für die Suche.</p>
<p>Bevor Sie diese Beispiele ausführen, erstellen Sie die Sammlung, fügen Sie die Beispieldaten ein, erstellen Sie die erforderlichen Vektorindizes und laden Sie die Sammlung. Verwenden Sie für die hier gezeigten Felder vierdimensionale Vektoren. Jeder Codeblock geht von der Verbindung und den Variablen aus den vorangegangenen Beispielen in derselben Sprache aus, sofern diese nicht erneut definiert werden.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Wählen Sie einen Filtertyp<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Ziel</th><th>Verwendung</th><th>Verhalten des Ergebnisses</th></tr>
</thead>
<tbody>
<tr><td>Filtern nach einem skalaren Feld der obersten Ebene, z. B. „ <code translate="no">category</code> “.</td><td>Regulärer Filterausdruck.</td><td>Wählt übergeordnete Entitäten vor oder während der Suche aus.</td></tr>
<tr><td>Beschränkt die Vektorsuche auf Elementebene auf Struct-Elemente, die den skalaren Bedingungen entsprechen.</td><td><code translate="no">element_filter</code>.</td><td>Durchsucht nur übereinstimmende Struct-Elemente und kann Offsets der übereinstimmenden Elemente zurückgeben.</td></tr>
<tr><td>Wählt Entitäten danach aus, ob einige, alle oder eine bestimmte Anzahl von Struct-Elementen einem Prädikat entsprechen.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> oder <code translate="no">MATCH_EXACT</code>.</td><td>Filterung auf Zeilenebene. Diese Operatoren geben von sich aus keine Offsets zurück.</td></tr>
<tr><td>Prüfen Sie die Position eines Elements, zählen Sie Struct-Elemente oder überprüfen Sie Unterfeldwerte über Elemente hinweg ohne „ <code translate="no">$[...]</code> “.</td><td>StructArray-Pfade auf Zeilenebene, wie z. B. „ <code translate="no">chunks[0][section]</code> “, „ <code translate="no">array_length(chunks)</code> “ oder „ <code translate="no">array_contains(chunks[section], ...)</code> “.</td><td>Filterung auf Zeilenebene. Informationen zur Syntax finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Auf dieser Seite wird erläutert, wie StructArray-Filter in Such-Workflows verwendet werden. Die vollständigen Syntaxregeln, unterstützte Prädikattypen und die Liste der nicht unterstützten Prädikate finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Filtern nach Feldern der obersten Ebene<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie reguläre Filterausdrücke, wenn die Bedingung zur übergeordneten Entität gehört und nicht zu einem einzelnen Struct-Element. Dies funktioniert sowohl bei der „EmbeddingList“-Suche als auch bei der Suche auf Elementebene.</p>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(query))
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

query := entity.FloatVectorArray{
    entity.FloatVector{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    entity.FloatVector{<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">3</span>, []entity.Vector{query}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12f32</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18f32</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/EmbeddingList.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>});
request.<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query));

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Filter wählt nur Entitäten aus, deren Feld „ <code translate="no">category</code> “ auf oberster Ebene den Wert „ <code translate="no">&quot;search&quot;</code> “ hat. Er identifiziert kein einzelnes übereinstimmendes Struct-Element.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Filter für die Vektorsuche auf Elementebene<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">element_filter(structArrayField, predicate)</code> “, wenn die skalaren Bedingungen für dasselbe Struct-Element gelten müssen, das an der Vektorsuche auf Elementebene beteiligt ist. Verwenden Sie innerhalb des Prädikats „ <code translate="no">$[subfield]</code> “, um auf skalare Unterfelder des aktuellen Struct-Elements zu verweisen.</p>
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

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>));

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .filter(filterExpr)
        .limit(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : results.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + hit.getId() + <span class="hljs-string">&quot;, distance: &quot;</span> + hit.getScore()
                + <span class="hljs-string">&quot;, offset: &quot;</span> + hit.getElementOffset() + <span class="hljs-string">&quot;, entity: &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>, []entity.Vector{queryVector}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithFilter(filterExpr).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>});
request.<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&#x27;</span>;

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

<span class="hljs-keyword">var</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;element_filter(chunks, &quot;</span> +
    <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[quality_score] &gt; 0.9 &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[has_code] == true)&quot;</span>;

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[page]&quot;, &quot;chunks[quality_score]&quot;, &quot;chunks[has_code]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel wählt das Prädikat oberster Ebene „ <code translate="no">category == &quot;search&quot;</code> “ Kandidatenentitäten aus, und „ <code translate="no">element_filter</code> “ beschränkt die Vektorsuche auf Elementebene auf Blöcke, in denen „ <code translate="no">section</code> “, „ <code translate="no">quality_score</code> “ und „ <code translate="no">has_code</code> “ alle im selben Struct-Element übereinstimmen.</p>
<div class="alert note">
<p>Warnung</p>
<p>Wenn Sie ein Prädikat der obersten Ebene mit „ <code translate="no">element_filter</code> “ kombinieren, platzieren Sie „ <code translate="no">element_filter</code> “ am Ende des Ausdrucks. Ein Filterausdruck darf nur ein „ <code translate="no">element_filter</code> “ enthalten, und Sie können „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen „StructArray“-Operators verschachteln.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Entitäten mit MATCH-Operatoren filtern<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">MATCH_*</code> “-Operatoren, wenn der Filter anhand der Struct-Elemente entscheiden soll, ob eine übergeordnete Entität die Bedingungen erfüllt. Diese Operatoren sind Filter auf Zeilenebene: Sie wählen Entitäten aus, geben jedoch selbst keine Element-Offsets zurück.</p>
<table>
<thead>
<tr><th>Operator</th><th>Verwenden Sie ihn, wenn</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Mindestens ein „Struct“-Element muss das Prädikat erfüllen.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Alle Struct-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Mindestens <code translate="no">N</code> -Struktur-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Höchstens <code translate="no">N</code> e Struct-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Genau <code translate="no">N</code> „Struct“-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

filter_expr = (
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(query))
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .filter(filterExpr)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

query := entity.FloatVectorArray{
    entity.FloatVector{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    entity.FloatVector{<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">3</span>, []entity.Vector{query}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).
    WithFilter(filterExpr).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12f32</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18f32</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/EmbeddingList.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});
request.<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query));

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>;

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

<span class="hljs-keyword">var</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie hier „ <code translate="no">MATCH_ANY</code> “, da das Suchergebnis von „EmbeddingList“ auf Entitätsebene erfolgt. Der Filter erfordert, dass mindestens ein Chunk in der Entität ein „ <code translate="no">&quot;index&quot;</code> “-Chunk von hoher Qualität ist, aber das Suchergebnis selbst repräsentiert weiterhin die übergeordnete Entität.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Filter in der hybriden Suche verwenden<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenden Sie in der hybriden Suche StructArray-Filter dort an, wo die Bedingung wirksam werden soll. Wenden Sie eine Bedingung für die übergeordnete Entität auf jede Unteranfrage an, die diese erfüllen muss. Fügen Sie „ <code translate="no">element_filter</code> “ erst nach der Bedingung für die übergeordnete Entität nur der StructArray-Anfrage auf Elementebene hinzu, die Einschränkungen auf Elementebene benötigt.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>));

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">titleReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">chunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(titleReq, chunkReq))
        .ranker(RRFRanker.builder().k(<span class="hljs-number">60</span>).build())
        .limit(<span class="hljs-number">5</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

titleReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">10</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
chunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-number">10</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>,
    titleReq, chunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">title_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector.<span class="hljs-title function_ invoke__">clone</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[title_req, chunk_req])
    .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">60</span>))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">hybrid_search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/HybridSearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/SubSearchRequest.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

<span class="hljs-keyword">auto</span> title_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
title_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;title_vector&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
title_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>);
title_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

<span class="hljs-keyword">auto</span> chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
chunk_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>);
chunk_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(title_req)
       .<span class="hljs-built_in">AddSubRequest</span>(chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>));
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span> },
    {
      <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
      <span class="hljs-attr">data</span>: query_vector,
      <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
    },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

<span class="hljs-keyword">var</span> titleReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;title_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>
};

<span class="hljs-keyword">var</span> chunkReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = <span class="hljs-keyword">new</span>[] { titleReq, chunkReq },
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">60</span>),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;annsField&quot;: &quot;title_vector&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;category == \&quot;search\&quot;&quot;
        },
        {
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Beide Unteranfragen wenden „ <code translate="no">category == &quot;search&quot;</code> “ an. Der Ausdruck „ <code translate="no">chunk_req</code> “ schränkt zudem die Struct-Elemente ein, die an der Vektorsuche beteiligt sind. Informationen zu unterstützten hybriden Suchkombinationen und versionsspezifischen Einschränkungen finden Sie unter <a href="/docs/de/hybrid-search-with-structarray.md">„Hybride Suche mit StructArray</a> “ und <a href="/docs/de/structarray-limits.md">„StructArray-Einschränkungen</a>“.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Zusammenfassung der Prädikatunterstützung<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie skalare Unterfelder in StructArray-Prädikaten. Vektor-Unterfelder sind keine Eingaben für skalare Prädikate.</p>
<table>
<thead>
<tr><th>Unterfeldtyp</th><th>Typische Prädikatbeispiele</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Ganzzahltypen</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Vektor-Unterfelder</td><td>Werden nicht als skalare Prädikate für „ <code translate="no">$[...]</code> “ unterstützt. Verwenden Sie stattdessen Vektor-Teilfelder über die Vektorsuche.</td></tr>
</tbody>
</table>
<p>Für nicht unterstützte Fälle wie JSON-Pfade, Array-Container-Funktionen, Textabgleichsfunktionen, Null-Prädikate auf „ <code translate="no">$[...]</code> “, Geometrie-Funktionen, „Timestamptz“-Ausdrücke und generische Funktionsaufrufe siehe <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
<h2 id="Common-mistakes" class="common-anchor-header">Häufige Fehler<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Verwendung von „ <code translate="no">$[subfield]</code> “ außerhalb von „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “.</p></li>
<li><p>Verwendung von „ <code translate="no">chunks.section</code> “ anstelle der StructArray-Operatorsyntax wie z. B. „ <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> “.</p></li>
<li><p>Verwendung von „ <code translate="no">element_filter</code> “, wenn nur eine Filterung auf Zeilenebene erforderlich ist. Verwenden Sie stattdessen „ <code translate="no">MATCH_ANY</code> “, wenn Sie lediglich Entitäten auswählen müssen.</p></li>
<li><p>Die Erwartung, dass ` <code translate="no">MATCH_*</code> ` Element-Offsets zurückgibt. Diese Operatoren wählen Entitäten aus und identifizieren selbst kein einzelnes übereinstimmendes Element.</p></li>
<li><p>Das Schreiben von einfachen booleschen Prädikaten wie „ <code translate="no">$[has_code]</code> “. Verwenden Sie explizite Vergleiche wie „ <code translate="no">$[has_code] == true</code> “.</p></li>
<li><p>„ <code translate="no">element_filter</code> “ vor einem Prädikat der obersten Ebene im selben Filterausdruck platzieren.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Um die vollständige StructArray-Filtersyntax nachzulesen, lesen Sie <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p></li>
<li><p>Um zunächst ungefilterte Vektorsuchen durchzuführen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Informationen zum Erstellen von Skalarindizes für häufig verwendete StructArray-Filter finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Informationen zu versionsspezifischen Filter- und Suchbeschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p></li>
</ol>
