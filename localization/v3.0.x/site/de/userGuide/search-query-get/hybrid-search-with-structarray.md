---
id: hybrid-search-with-structarray.md
title: Hybridsuche mit StructArray
summary: >-
  Auf dieser Seite können Sie die StructArray-Vektorsuche mit anderen
  Vektorsuchen zu einer hybriden Suchanfrage kombinieren. Die
  StructArray-Hybridsuche kann je nach den kombinierten
  AnnSearchRequest-Objekten entweder Ergebnisse auf Entitätsebene oder auf
  Elementebene liefern.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Hybridsuche mit StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um die StructArray-Vektorsuche mit anderen Vektorsuchen in einer hybriden Suchanfrage zu kombinieren. Die StructArray-Hybridsuche kann je nach den von Ihnen kombinierten „ <code translate="no">AnnSearchRequest</code> “-Objekten entweder Ergebnisse auf Entitätsebene oder auf Elementebene liefern.</p>
<p>Diese Seite verwendet die „ <code translate="no">tech_articles</code> “-Sammlung aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung verfügt über ein Vektorfeld auf oberster Ebene namens „ <code translate="no">title_vector</code> “ und ein StructArray-Feld namens „ <code translate="no">chunks</code> “. Das Unterfeld „ <code translate="no">chunks[emb_list_vector]</code> “ ist für die EmbeddingList-Suche indiziert, und „ <code translate="no">chunks[emb]</code> “ ist für die Suche auf Elementebene indiziert.</p>
<p>Bevor Sie diese Beispiele ausführen, erstellen Sie die Sammlung, fügen Sie die Beispieldaten ein, erstellen Sie die erforderlichen Vektorindizes und laden Sie die Sammlung. Verwenden Sie für die hier gezeigten Felder vierdimensionale Vektoren. Jeder Codeblock geht von der Verbindung und den Variablen aus den vorangegangenen Beispielen in derselben Sprache aus, sofern diese nicht erneut definiert werden.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Anwendung der hybriden Suche auf StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> Kombination</th><th>Endgültiger Kandidatenbereich</th><th>Verhalten des Ergebnisses</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Vektorfeld auf Sammlungsebene + StructArray-Unterfeld „EmbeddingList“</td><td>Entitätsebene</td><td>Endgültige Kandidaten werden über den Primärschlüssel indiziert.</td><td>Nicht verwenden.</td></tr>
<tr><td>Vektorfeld auf Sammlungsebene + Unterfeld auf Elementebene von `StructArray`</td><td>Entitätsebene</td><td>Treffer auf Elementebene werden vor der hybriden Neureihenfolge auf Kandidaten auf Entitätsebene zusammengefasst.</td><td>Optionale Zusammenfassungskonfiguration auf der StructArray-Elementebene <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Mehrere Unterfelder auf Elementebene unter demselben StructArray-Feld</td><td>Elementebene</td><td>Endgültige Kandidaten werden anhand des Primärschlüssels plus Struct-Element-Offset indiziert.</td><td>Nicht verwenden.</td></tr>
<tr><td>Unterfelder auf Elementebene unter verschiedenen StructArray-Feldern</td><td>Entitätsebene</td><td>Element-Offsets haben keine gemeinsame Identität, daher wird jede StructArray- <code translate="no">AnnSearchRequest</code> auf Elementebene vor der Neuanordnung zusammengefasst.</td><td>Optionale Konfiguration zum Zusammenklappen für jedes „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Elementebene.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Warnung</p>
<p>Verwenden Sie „ <code translate="no">element_scope</code> “ ausschließlich zur Konfiguration des Zusammenklappens für StructArray-Objekte auf Elementebene <code translate="no">AnnSearchRequest</code> bei einer hybriden Suche auf Elementebene mit nicht identischen Strukturen. Verwenden Sie diese Option nicht für EmbeddingList-Anfragen, Vektor-Anfragen auf Sammlungsebene oder eine hybride Suche auf Elementebene mit identischen StructArray-Objekten.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Bereiten Sie die Sammlung, die Daten und die Indizes vor, bevor Sie die hybride Suche ausführen.</p>
<table>
<thead>
<tr><th>Voraussetzung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>StructArray-Feld</td><td>Die Sammlung enthält ein StructArray-Feld wie beispielsweise „ <code translate="no">chunks</code> “.</td></tr>
<tr><td>Vektor-Unterfelder</td><td>Verwenden Sie separate Vektor-Unterfelder für die Suche in der „EmbeddingList“ und die Suche auf Elementebene.</td></tr>
<tr><td>Indizes</td><td><code translate="no">chunks[emb_list_vector]</code> verwendet eine „ <code translate="no">MAX_SIM*</code> “-Metrik. „ <code translate="no">chunks[emb]</code> “ verwendet eine reguläre Vektormetrik wie beispielsweise „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “.</td></tr>
<tr><td>Reranker</td><td>Wählen Sie einen hybriden Reranker wie <code translate="no">RRFRanker</code> oder einen anderen von Ihrer Anwendung unterstützten Reranker.</td></tr>
</tbody>
</table>
<p>Informationen zur Indexeinrichtung finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index StructArray Fields</a>“.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Führen Sie eine hybride Suche mit einer „EmbeddingList“-Anfrage durch<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>Die „EmbeddingList“-Suche in einem StructArray-Vektor-Teilfeld erfolgt bei der hybriden Suche auf Entitätsebene. Sie verhält sich wie eine Vektorsuche auf Entitätsebene und gibt keinen Offset für ein übereinstimmendes Struct-Element zurück.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, MilvusClient, RRFRanker
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

query_list = EmbeddingList()
query_list.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query_list.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
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
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
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

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">queryList</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
queryList.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
queryList.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">titleReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">chunkListReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .vectors(Collections.singletonList(queryList))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(titleReq, chunkListReq))
        .ranker(RRFRanker.builder().k(<span class="hljs-number">60</span>).build())
        .limit(<span class="hljs-number">5</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
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

queryList := entity.FloatVectorArray{
    entity.FloatVector{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    entity.FloatVector{<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

titleReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">10</span>, queryVector)
chunkListReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-number">10</span>, queryList)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>,
    titleReq, chunkListReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Printf(<span class="hljs-string">&quot;hybrid search returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_list</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12f32</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18f32</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">title_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector.<span class="hljs-title function_ invoke__">clone</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">chunk_list_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query_list]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[title_req, chunk_list_req])
    .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">60</span>))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">hybrid_search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/HybridSearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/SubSearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/EmbeddingList.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

milvus::EmbeddingList query_list;
query_list.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>});
query_list.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

<span class="hljs-keyword">auto</span> title_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
title_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;title_vector&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
title_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

<span class="hljs-keyword">auto</span> chunk_list_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
chunk_list_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
chunk_list_req-&gt;<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query_list));

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(title_req)
       .<span class="hljs-built_in">AddSubRequest</span>(chunk_list_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>));
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>});

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> query_list = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> },
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-attr">data</span>: query_list, <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
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

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

<span class="hljs-keyword">var</span> queryList = <span class="hljs-keyword">new</span> EmbeddingList();
queryList.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
queryList.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

<span class="hljs-keyword">var</span> titleReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;title_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-keyword">var</span> chunkListReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { queryList },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = <span class="hljs-keyword">new</span>[] { titleReq, chunkListReq },
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">60</span>),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
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
            &quot;limit&quot;: 10
        },
        {
            &quot;data&quot;: [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
            &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
            &quot;limit&quot;: 10
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel liefern beide „ <code translate="no">AnnSearchRequest</code> “-Objekte Kandidaten auf Entitätsebene. Das Endergebnis wird anhand des Primärschlüssels der übergeordneten Entität indiziert. Fügen Sie der „EmbeddingList“-Anfrage keinen „ <code translate="no">element_scope</code> “ hinzu.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Führen Sie eine hybride Suche auf Elementebene mit demselben `StructArray` durch<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn alle „ <code translate="no">AnnSearchRequest</code> “-Objekte auf Vektor-Unterfelder auf Elementebene unter demselben „StructArray“-Feld abzielen, kann die hybride Suche durch eine Neugewichtung Kandidaten auf Elementebene beibehalten. Dies ist der einzige hybride „StructArray“-Modus, bei dem die Endergebnisse auf Elementebene verbleiben.</p>
<p>Das folgende Beispiel geht davon aus, dass das „ <code translate="no">chunks</code> “-StructArray-Feld zwei Vektor-Unterfelder auf Elementebene enthält, „ <code translate="no">chunks[emb]</code> “ und „ <code translate="no">chunks[code_emb]</code> “, und dass beide „ <code translate="no">COSINE</code> “ verwenden. Definieren und füllen Sie das zusätzliche vierdimensionale Unterfeld „ <code translate="no">code_emb</code> “ beim Erstellen der Sammlung; es ist nicht im oben verlinkten Basisschema enthalten.</p>
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
code_query_vector = [<span class="hljs-number">0.20</span>, <span class="hljs-number">0.25</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.38</span>]

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    param={},
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    param={},
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
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
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
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
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">codeQueryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.20f</span>, <span class="hljs-number">0.25f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.38f</span>));

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">indexChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">codeChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
        .vectors(Collections.singletonList(codeQueryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(indexChunkReq, codeChunkReq))
        .ranker(RRFRanker.builder().k(<span class="hljs-number">60</span>).build())
        .limit(<span class="hljs-number">5</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
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
codeQueryVector := entity.FloatVector{<span class="hljs-number">0.20</span>, <span class="hljs-number">0.25</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.38</span>}

indexChunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-number">10</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
codeChunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>, <span class="hljs-number">10</span>, codeQueryVector).
    WithFilter(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>,
    indexChunkReq, codeChunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Printf(<span class="hljs-string">&quot;hybrid search returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];
<span class="hljs-keyword">let</span> <span class="hljs-variable">code_query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.20f32</span>, <span class="hljs-number">0.25</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.38</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">code_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[code_query_vector]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[index_chunk_req, code_chunk_req])
    .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">60</span>))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
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
std::vector&lt;<span class="hljs-type">float</span>&gt; code_query_vector = {<span class="hljs-number">0.20f</span>, <span class="hljs-number">0.25f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.38f</span>};

<span class="hljs-keyword">auto</span> index_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
index_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
index_chunk_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>);
index_chunk_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

<span class="hljs-keyword">auto</span> code_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
code_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
code_chunk_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>);
code_chunk_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(code_query_vector);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(index_chunk_req)
       .<span class="hljs-built_in">AddSubRequest</span>(code_chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>));
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];
<span class="hljs-keyword">const</span> code_query_vector = [<span class="hljs-number">0.20</span>, <span class="hljs-number">0.25</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.38</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-attr">data</span>: query_vector, <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span> },
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[code_emb]&quot;</span>, <span class="hljs-attr">data</span>: code_query_vector, <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span> },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });
<span class="hljs-keyword">var</span> codeQueryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.20f</span>, <span class="hljs-number">0.25f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.38f</span> });

<span class="hljs-keyword">var</span> indexChunkReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>
};

<span class="hljs-keyword">var</span> codeChunkReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { codeQueryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = <span class="hljs-keyword">new</span>[] { indexChunkReq, codeChunkReq },
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">60</span>),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
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
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;
        },
        {
            &quot;data&quot;: [[0.20, 0.25, 0.31, 0.38]],
            &quot;annsField&quot;: &quot;chunks[code_emb]&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[has_code] == true)&quot;
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Beide „ <code translate="no">AnnSearchRequest</code> “-Objekte durchsuchen Vektor-Unterfelder unter <code translate="no">chunks</code>. Derselbe nullbasierte Offset bezieht sich auf dasselbe Struct-Element, sodass der Hybrid-Reranker Elementkandidaten direkt bewerten kann. Setzen Sie in diesem Modus <code translate="no">element_scope</code> nicht, da keine Zusammenfassung auf Entitätsebene durchgeführt wird.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Zusammenfassung von Treffern auf Elementebene für die hybride Suche auf Entitätsebene<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn eine hybride Suche ein „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene mit einer Vektorabfrage auf Sammlungsebene, einer „EmbeddingList“-Abfrage oder einer Abfrage auf Elementebene unter einem anderen StructArray-Feld kombiniert, liegt der endgültige Kandidatenbereich auf Entitätsebene. In diesem Fall wird jedes „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene vor der hybriden Neureihenfolge auf Kandidaten auf Entitätsebene zusammengefasst.</p>
<p>Verwenden Sie „ <code translate="no">element_scope</code> “ innerhalb des „ <code translate="no">params</code> “ des StructArray-Element-Level-„ <code translate="no">AnnSearchRequest</code> “, wenn Sie steuern möchten, wie mehrere übereinstimmende Elemente derselben Entität zusammengefasst werden.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: <span class="hljs-number">3</span>,
                },
            },
        },
    },
    limit=<span class="hljs-number">30</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
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
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">chunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">30</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[quality_score] &gt; 0.8)&quot;</span>)
        .params(<span class="hljs-string">&quot;{\&quot;element_scope\&quot;: {\&quot;collapse\&quot;: {\&quot;strategy\&quot;: \&quot;topk_sum\&quot;, \&quot;topk\&quot;: 3}}}&quot;</span>)
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

titleReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">10</span>, queryVector)

chunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-number">30</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;element_filter(chunks, $[quality_score] &gt; 0.8)&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;params&quot;</span>, <span class="hljs-string">&quot;{\&quot;element_scope\&quot;: {\&quot;collapse\&quot;: {\&quot;strategy\&quot;: \&quot;topk_sum\&quot;, \&quot;topk\&quot;: 3}}}&quot;</span>)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>,
    titleReq, chunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Printf(<span class="hljs-string">&quot;hybrid search returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> },
    {
      <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
      <span class="hljs-attr">data</span>: query_vector,
      <span class="hljs-attr">limit</span>: <span class="hljs-number">30</span>,
      <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;element_filter(chunks, $[quality_score] &gt; 0.8)&quot;</span>,
      <span class="hljs-attr">params</span>: { <span class="hljs-attr">element_scope</span>: { <span class="hljs-attr">collapse</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>, <span class="hljs-attr">topk</span>: <span class="hljs-number">3</span> } } },
    },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
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
            &quot;limit&quot;: 10
        },
        {
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;limit&quot;: 30,
            &quot;filter&quot;: &quot;element_filter(chunks, $[quality_score] &gt; 0.8)&quot;,
            &quot;params&quot;: {
                &quot;element_scope&quot;: {
                    &quot;collapse&quot;: { &quot;strategy&quot;: &quot;topk_sum&quot;, &quot;topk&quot;: 3 }
                }
            }
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die SDK-Builder für C++ und Rust 3.0.2 sowie das C# 3.0.0 SDK kodieren das in diesem Beispiel verwendete verschachtelte ` <code translate="no">element_scope</code> `-Objekt nicht über ihre auf Zeichenfolgen basierenden Extra-Parameter-Schnittstellen. Verwenden Sie eines der oben aufgeführten SDKs oder die REST-API, um diese Zusammenfassungsstrategie zu konfigurieren.</p>
<p>In diesem Beispiel erfolgt die Zusammenfassung auf Entitätsebene ( <code translate="no">title_req</code> ), sodass das endgültige Hybrid-Ergebnis ebenfalls auf Entitätsebene vorliegt. Die Anfrage „ <code translate="no">chunk_req</code> “ gibt zunächst Elementtreffer aus „ <code translate="no">chunks[emb]</code> “ zurück und fasst anschließend die zurückgegebenen Elemente derselben Entität zusammen, indem die drei besten Element-Scores summiert werden. Wird „ <code translate="no">element_scope</code> “ weggelassen, obwohl eine Zusammenfassung auf Entitätsebene erforderlich ist, wird standardmäßig die Zusammenfassungsstrategie „ <code translate="no">max</code> “ verwendet.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Wählen Sie eine Zusammenfassungsstrategie<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Strategie</th><th>Verhalten</th><th><code translate="no">topk</code></th><th>Metrik-Anforderung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Beibehaltung der besten Punktzahl der zurückgegebenen Elemente für die Entität.</td><td>Nicht zulässig.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Summe aller zurückgegebenen Elementwerte für die Entität.</td><td>Nicht zulässig.</td><td>Nur Metriken mit positiver Korrelation, wie z. B. „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Durchschnitt aller zurückgegebenen Elementwerte für die Entität.</td><td>Nicht zulässig.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Summe der besten „ <code translate="no">K</code> “-Bewertungen der zurückgegebenen Elemente für die Entität.</td><td>Erforderlich und muss positiv sein.</td><td>Nur Metriken mit positiver Korrelation, wie z. B. „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Berechne den Durchschnitt der besten von „ <code translate="no">K</code> “ zurückgegebenen Elementbewertungen für die Entität.</td><td>Erforderlich und muss positiv sein.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
</tbody>
</table>
<p>„Collapse“ verwendet ausschließlich die Elementtreffer, die von der „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene zurückgegeben werden. Es werden nach der ANN-Suche nicht alle Struct-Elemente in der Entität durchsucht. Stellen Sie den Wert für „ <code translate="no">limit</code> “ in der Anfrage hoch genug ein, um die Elemente bereitzustellen, die Sie für „Collapse“ nutzen möchten.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Filter, Bereichssuche und Gruppierung hinzufügen<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können „ <code translate="no">element_filter</code> “ an eine „StructArray“-Elementebene-„ <code translate="no">AnnSearchRequest</code> “ anhängen, wenn skalare Bedingungen für dieselben „Struct“-Elemente gelten sollen, die an der Vektorsuche beteiligt sind. Wenden Sie eine Bedingung der übergeordneten Entität auf jede Unteranfrage an, die diese erfüllen muss; verlassen Sie sich nicht darauf, dass ein „ <code translate="no">filter</code> “-Argument auf oberster Ebene diese Bedingung auf jede Anfrage überträgt.</p>
<p>Vektorfelder auf StructArray-Ebene unterstützen die Bereichssuche bei der hybriden Suche. Fügen Sie „ <code translate="no">radius</code> “ und optional „ <code translate="no">range_filter</code> “ zum „ <code translate="no">AnnSearchRequest</code> “ auf Elementebene hinzu. StructArray-Anfragen auf „EmbeddingList“-Ebene unterstützen keine Bereichssuche.</p>
<p>Die hybride Gruppierung auf Elementebene wird nur unterstützt, wenn alle „ <code translate="no">AnnSearchRequest</code> “-Objekte auf Vektorfelder auf Elementebene unter demselben „StructArray“-Feld abzielen und „ <code translate="no">group_by_field</code> “ der Primärschlüssel sein muss. Die hybride Gruppierung wird nicht unterstützt, wenn die Abfrage Vektorfelder auf Sammlungsebene, verschiedene „StructArray“-Felder oder Abfragen auf „EmbeddingList“-Ebene mischt. Kombinieren Sie die Bereichssuche nicht mit der Gruppierung.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Hybride Ergebnisse interpretieren<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Endgültiger Kandidatenbereich</th><th>Ergebnisschlüssel</th><th>Offset-Verhalten</th><th>Wann dies auftritt</th></tr>
</thead>
<tbody>
<tr><td>Entitätsebene</td><td>Primärschlüssel.</td><td>Kein Element-Offset im Endergebnis.</td><td>Die Hybridanfrage enthält ein Vektorfeld auf Sammlungsebene, eine „EmbeddingList“-Anfrage oder Anfragen auf Elementebene unter verschiedenen „StructArray“-Feldern.</td></tr>
<tr><td>Ebene der Elemente</td><td>Primärschlüssel plus übergeordnetes StructArray-Feld plus Element-Offset.</td><td>Der ausgewählte Element-Offset kann zurückgegeben werden, wenn er von der API oder dem SDK bereitgestellt wird.</td><td>Alle „ <code translate="no">AnnSearchRequest</code> “-Objekte befinden sich auf Elementebene und unter demselben „StructArray“-Feld.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Einschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Verwenden Sie „ <code translate="no">element_scope</code> “ ausschließlich für „ <code translate="no">AnnSearchRequest</code> “-Objekte auf StructArray-Ebene, die bei der hybriden Suche auf Kandidaten auf Entitätsebene reduziert werden müssen.</p></li>
<li><p>Verwenden Sie „ <code translate="no">element_scope</code> “ nicht für „EmbeddingList“-Anfragen, Vektorabfragen auf Sammlungsebene oder die hybride Suche auf Elementebene innerhalb desselben „StructArray“.</p></li>
<li><p><code translate="no">sum</code> Die Zusammenfassungsstrategien „ <code translate="no">topk_sum</code> “ und „ “ erfordern Metriken mit positiver Korrelation, wie beispielsweise „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “. Verwenden Sie diese nicht zusammen mit „ <code translate="no">L2</code> “.</p></li>
<li><p><code translate="no">topk_sum</code> und „ <code translate="no">topk_avg</code> “ erfordern einen positiven Wert für „ <code translate="no">topk</code> “. Andere Zusammenfassungsstrategien dürfen „ <code translate="no">topk</code> “ nicht enthalten.</p></li>
<li><p>StructArray-Anfragen auf „EmbeddingList“-Ebene unterstützen weder die Bereichssuche noch „group-by“.</p></li>
<li><p>Hybride „group-by“-Anweisungen werden nur für hybride Suchvorgänge auf Elementebene desselben „StructArray“ und ausschließlich anhand des Primärschlüssels unterstützt.</p></li>
<li><p>Kombinieren Sie die Bereichssuche nicht mit „group-by“.</p></li>
</ul>
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
<li><p>Hinzufügen von „ <code translate="no">element_scope</code> “ zu einer hybriden Abfrage auf StructArray-Ebene mit identischen Elementen. Diese Abfrage bleibt auf Elementebene und führt keine Zusammenfassung auf Entitätsebene durch.</p></li>
<li><p>Hinzufügen von „ <code translate="no">element_scope</code> “ zu „ <code translate="no">chunks[emb_list_vector]</code> “. Die „EmbeddingList“-Suche erfolgt bereits auf Entitätsebene.</p></li>
<li><p>Annahme, dass zwei StructArray-Felder Element-Offsets gemeinsam nutzen. „ <code translate="no">3</code> “ mit Offset in „ <code translate="no">chunks</code> “ und „ <code translate="no">3</code> “ mit Offset in einem anderen StructArray-Feld sind unterschiedliche Elemente, sodass die Hybridanfrage auf Entitätsebene erfolgt.</p></li>
<li><p>Verwenden Sie „ <code translate="no">topk_sum</code> “ mit „ <code translate="no">L2</code> “. Verwenden Sie „ <code translate="no">max</code> “, „ <code translate="no">avg</code> “ oder „ <code translate="no">topk_avg</code> “ für negative Abstandsmetriken.</p></li>
<li><p>Es wird erwartet, dass hybride Ergebnisse auf Entitätsebene den ausgewählten Struct-Element-Offset nach dem Zusammenklappen enthalten.</p></li>
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
<li><p>Um die beiden grundlegenden Vektorsuchmodi von StructArray kennenzulernen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Um der hybriden Suche skalare Filter hinzuzufügen, lesen Sie <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zur Verwendung von Score- oder Distanzgrenzen bei der hybriden Suche finden Sie unter <a href="/docs/de/range-search-with-structarray.md">„Bereichssuche mit StructArray</a>“.</p></li>
<li><p>Um hybride Ergebnisse auf Elementebene nach übergeordneter Entität zu gruppieren, lesen Sie <a href="/docs/de/grouping-search-with-structarray.md">„Gruppierte Suche mit StructArray</a>“.</p></li>
<li><p>Um die Suchgrenzen von StructArray zu überprüfen, lesen Sie <a href="/docs/de/structarray-limits.md">„StructArray-Grenzen</a>“.</p></li>
</ol>
