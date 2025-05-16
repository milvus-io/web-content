---
id: single-vector-search.md
title: Einfache Vektorsuche
summary: >-
  Auf der Grundlage einer Indexdatei, in der die sortierte Reihenfolge der
  Vektoreinbettungen aufgezeichnet ist, findet die ANN-Suche (Approximate
  Nearest Neighbor) eine Untergruppe von Vektoreinbettungen auf der Grundlage
  des Abfragevektors in einer empfangenen Suchanfrage, vergleicht den
  Abfragevektor mit denen in der Untergruppe und liefert die ähnlichsten
  Ergebnisse. Mit der ANN-Suche bietet Milvus ein effizientes Sucherlebnis. Auf
  dieser Seite erfahren Sie, wie Sie grundlegende ANN-Suchen durchführen können.
---
<h1 id="Basic-Vector-Search" class="common-anchor-header">Einfache Vektorsuche<button data-href="#Basic-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf der Grundlage einer Indexdatei, in der die sortierte Reihenfolge der Vektoreinbettungen aufgezeichnet ist, findet die ANN-Suche (Approximate Nearest Neighbor) eine Untergruppe von Vektoreinbettungen auf der Grundlage des Abfragevektors in einer empfangenen Suchanfrage, vergleicht den Abfragevektor mit denen in der Untergruppe und liefert die ähnlichsten Ergebnisse. Mit der ANN-Suche bietet Milvus ein effizientes Sucherlebnis. Auf dieser Seite erfahren Sie, wie Sie grundlegende ANN-Suchen durchführen können.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Die ANN- und die k-Nächste-Nachbarn-Suche (kNN) sind die üblichen Methoden der Vektorähnlichkeitssuche. Bei einer kNN-Suche müssen Sie alle Vektoren in einem Vektorraum mit dem in der Suchanfrage enthaltenen Abfragevektor vergleichen, bevor Sie die ähnlichsten herausfinden, was zeit- und ressourcenaufwändig ist.</p>
<p>Im Gegensatz zur kNN-Suche wird bei einem ANN-Suchalgorithmus eine <strong>Indexdatei</strong> angefordert, die die sortierte Reihenfolge der Vektoreinbettungen aufzeichnet. Wenn eine Suchanfrage eingeht, können Sie die Indexdatei als Referenz verwenden, um schnell eine Untergruppe zu finden, die wahrscheinlich die Vektoreinbettungen enthält, die dem Abfragevektor am ähnlichsten sind. Dann können Sie den angegebenen <strong>metrischen Typ</strong> verwenden, um die Ähnlichkeit zwischen dem Abfragevektor und den Vektoren in der Untergruppe zu messen, die Gruppenmitglieder auf der Grundlage der Ähnlichkeit mit dem Abfragevektor zu sortieren und die <strong>Top-K-Gruppenmitglieder</strong> zu ermitteln.</p>
<p>ANN-Suchen hängen von vorgefertigten Indizes ab, und der Suchdurchsatz, die Speichernutzung und die Korrektheit der Suche können je nach den gewählten Indextypen variieren. Sie müssen ein Gleichgewicht zwischen Suchleistung und Korrektheit finden.</p>
<p>Um die Lernkurve zu reduzieren, bietet Milvus <strong>AUTOINDEX</strong>. Mit <strong>AUTOINDEX</strong> kann Milvus die Datenverteilung innerhalb Ihrer Sammlung analysieren, während der Index aufgebaut wird, und stellt die optimalsten Indexparameter auf der Grundlage der Analyse ein, um ein Gleichgewicht zwischen Suchleistung und Korrektheit herzustellen.</p>
<p>In diesem Abschnitt finden Sie detaillierte Informationen zu den folgenden Themen:</p>
<ul>
<li><p><a href="/docs/de/single-vector-search.md#Single-Vector-Search">Ein-Vektor-Suche</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Bulk-Vector-Search">Bulk-Vektor-Suche</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#ANN-Search-in-Partition">ANN-Suche in Partition</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Use-Output-Fields">Verwendung von Ausgabefeldern</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Use-Limit-and-Offset">Limit und Offset verwenden</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Use-Level">Level verwenden</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Get-Recall-Rate">Recall-Rate erhalten</a></p></li>
<li><p><a href="/docs/de/single-vector-search.md#Enhancing-ANN-Search">Verbessern der ANN-Suche</a></p></li>
</ul>
<h2 id="Single-Vector-Search" class="common-anchor-header">Ein-Vektor-Suche<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der ANN-Suche bezieht sich eine Ein-Vektor-Suche auf eine Suche, die nur einen Abfragevektor umfasst. Basierend auf dem vorgefertigten Index und dem metrischen Typ, der in der Suchanfrage enthalten ist, findet Milvus die Top-K Vektoren, die dem Abfragevektor am ähnlichsten sind.</p>
<p>In diesem Abschnitt erfahren Sie, wie Sie eine Ein-Vektor-Suche durchführen können. Die Suchanfrage enthält einen einzigen Abfragevektor und bittet Milvus, das Innere Produkt (IP) zu verwenden, um die Ähnlichkeit zwischen den Abfragevektoren und den Vektoren in der Sammlung zu berechnen und die drei ähnlichsten Vektoren zurückzugeben.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
    
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus ordnet die Suchergebnisse nach ihren Ähnlichkeitswerten zum Abfragevektor in absteigender Reihenfolge. Der Ähnlichkeitswert wird auch als Abstand zum Abfragevektor bezeichnet, und seine Wertebereiche variieren je nach den verwendeten metrischen Typen.</p>
<p>In der folgenden Tabelle sind die anwendbaren metrischen Typen und die entsprechenden Abstandsbereiche aufgeführt.</p>
<table>
   <tr>
     <th><p>Metrik Typ</p></th>
     <th><p>Merkmale</p></th>
     <th><p>Abstandsbereich</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Ein kleinerer Wert bedeutet eine höhere Ähnlichkeit.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Ein größerer Wert weist auf eine höhere Ähnlichkeit hin.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Ein größerer Wert deutet auf eine höhere Ähnlichkeit hin.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Ein kleinerer Wert weist auf eine höhere Ähnlichkeit hin.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Ein kleinerer Wert deutet auf eine größere Ähnlichkeit hin.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
</table>
<h2 id="Bulk-Vector-Search" class="common-anchor-header">Bulk-Vektor-Suche<button data-href="#Bulk-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>In ähnlicher Weise können Sie mehrere Abfragevektoren in eine Suchanfrage aufnehmen. Milvus führt dann parallel ANN-Suchen nach den Abfragevektoren durch und gibt zwei Ergebnismengen zurück.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Search with multiple vectors</span>
<span class="hljs-comment"># 7.1. Prepare query vectors</span>
query_vectors = [
    [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>],
    [<span class="hljs-number">0.0039737443</span>, <span class="hljs-number">0.003020432</span>, -<span class="hljs-number">0.0006188639</span>, <span class="hljs-number">0.03913546</span>, -<span class="hljs-number">0.00089768134</span>]
]

<span class="hljs-comment"># 7.2. Start search</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=query_vectors,
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 730,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 333,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 232,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

List&lt;BaseVector&gt; queryVectors = Arrays.asList(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.041732933f</span>, <span class="hljs-number">0.013779674f</span>, -<span class="hljs-number">0.027564144f</span>, -<span class="hljs-number">0.013061441f</span>, <span class="hljs-number">0.009748648f</span>}),
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0039737443f</span>, <span class="hljs-number">0.003020432f</span>, -<span class="hljs-number">0.0006188639f</span>, <span class="hljs-number">0.03913546f</span>, -<span class="hljs-number">0.00089768134f</span>})
);
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(queryVectors)
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.320147, id=3)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVectors := []entity.Vector{
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}),
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>}),
}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    queryVectors,
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with multiple vectors</span>
<span class="hljs-keyword">const</span> query_vectors = [
    [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], 
    [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">vectors</span>: query_vectors,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//     { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//     { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.04431751370429993, id: &#x27;730&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04231833666563034, id: &#x27;333&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04221535101532936, id: &#x27;232&#x27; },</span>
<span class="hljs-comment">//   ]</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#               &quot;id&quot;: 551</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#               &quot;id&quot;: 296</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#               &quot;id&quot;: 43</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#               &quot;id&quot;: 730</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#               &quot;id&quot;: 333</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#               &quot;id&quot;: 232</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#        ]</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition" class="common-anchor-header">ANN-Suche in Partition<button data-href="#ANN-Search-in-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Angenommen, Sie haben mehrere Partitionen in einer Sammlung erstellt und können den Suchbereich auf eine bestimmte Anzahl von Partitionen einschränken. In diesem Fall können Sie die Namen der Zielpartitionen in die Suchanfrage aufnehmen, um den Suchbereich auf die angegebenen Partitionen zu beschränken. Die Verringerung der Anzahl der an der Suche beteiligten Partitionen verbessert die Suchleistung.</p>
<p>Das folgende Codeschnipsel geht von einer Partition namens <strong>PartitionA</strong> in Ihrer Sammlung aus.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-comment"># highlight-next-line</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithPartitions(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Output-Fields" class="common-anchor-header">Ausgabefelder verwenden<button data-href="#Use-Output-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>In einem Suchergebnis enthält Milvus standardmäßig die Werte der Primärfelder und die Ähnlichkeitsdistanzen/-bewertungen der Entitäten, die die Top-K-Vektoreinbettungen enthalten. Sie können die Namen der Zielfelder, einschließlich der Vektor- und Skalarfelder, als Ausgabefelder in eine Suchanfrage aufnehmen, damit die Suchergebnisse die Werte anderer Felder in diesen Entitäten enthalten.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
    <span class="hljs-comment"># highlight-next-line</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27;, entity: {&quot;color&quot;: &quot;orange_6781&quot;}},</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; entity: {&quot;color&quot;: &quot;red_4794&quot;}},</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; entity: {&quot;color&quot;: &quot;grey_8510&quot;}}</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Limit-and-Offset" class="common-anchor-header">Limit und Offset verwenden<button data-href="#Use-Limit-and-Offset" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie werden feststellen, dass der Parameter <code translate="no">limit</code>, der in den Suchanfragen enthalten ist, die Anzahl der Entitäten bestimmt, die in die Suchergebnisse aufgenommen werden. Dieser Parameter gibt die maximale Anzahl der Entitäten an, die in einer einzelnen Suche zurückgegeben werden sollen, und wird normalerweise als <strong>Top-K</strong> bezeichnet.</p>
<p>Wenn Sie paginierte Suchanfragen durchführen möchten, können Sie eine Schleife verwenden, um mehrere Suchanfragen zu senden, wobei die Parameter <strong>Limit</strong> und <strong>Offset</strong> in jeder Suchanfrage enthalten sind. Insbesondere können Sie den Parameter <strong>Limit</strong> auf die Anzahl der Entitäten setzen, die Sie in die aktuellen Abfrageergebnisse aufnehmen möchten, und den Parameter <strong>Offset</strong> auf die Gesamtzahl der Entitäten, die bereits zurückgegeben wurden.</p>
<p>Die folgende Tabelle zeigt, wie Sie die Parameter <strong>Limit</strong> und <strong>Offset</strong> für paginierte Abfragen einstellen, wenn 100 Entitäten auf einmal zurückgegeben werden.</p>
<table>
   <tr>
     <th><p>Abfragen</p></th>
     <th><p>Zurückzugebende Entitäten pro Abfrage</p></th>
     <th><p>Bereits zurückgegebene Einträge insgesamt</p></th>
   </tr>
   <tr>
     <td><p>Die <strong>1.</strong> Abfrage</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p>Die <strong>2.</strong> Abfrage</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p>Die <strong>3.</strong> Abfrage</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p>Die <strong>n-te</strong> Abfrage</p></td>
     <td><p>100</p></td>
     <td><p>100 x (n-1)</p></td>
   </tr>
</table>
<p>Beachten Sie, dass die Summe von <code translate="no">limit</code> und <code translate="no">offset</code> in einer einzigen ANN-Suche weniger als 16.384 betragen sollte.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
        <span class="hljs-comment"># highlight-next-line</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .offset(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOffset(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return,</span>
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;offset&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search" class="common-anchor-header">Verbessern der ANN-Suche<button data-href="#Enhancing-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX flacht die Lernkurve der ANN-Suche erheblich ab. Allerdings sind die Suchergebnisse nicht immer korrekt, wenn der Top-K-Wert steigt. Durch die Reduzierung des Suchumfangs, die Verbesserung der Relevanz der Suchergebnisse und die Diversifizierung der Suchergebnisse arbeitet Milvus die folgenden Suchverbesserungen aus.</p>
<ul>
<li><p>Gefilterte Suche</p>
<p>Sie können Filterbedingungen in eine Suchanfrage aufnehmen, so dass Milvus vor der Durchführung von ANN-Suchen eine Metadatenfilterung durchführt und den Suchbereich von der gesamten Sammlung auf die Entitäten reduziert, die den angegebenen Filterbedingungen entsprechen.</p>
<p>Weitere Informationen über Metadatenfilterung und Filterbedingungen finden Sie unter <a href="/docs/de/filtered-search.md">Gefilterte Suche</a>, <a href="/docs/de/boolean.md">Filterung erklärt</a> und verwandte Themen.</p></li>
<li><p>Bereichssuche</p>
<p>Sie können die Relevanz der Suchergebnisse verbessern, indem Sie den Abstand oder die Punktzahl der zurückgegebenen Entitäten innerhalb eines bestimmten Bereichs einschränken. In Milvus beinhaltet eine Bereichssuche das Zeichnen von zwei konzentrischen Kreisen mit der Vektoreinbettung, die dem Abfragevektor am ähnlichsten ist, als Zentrum. Die Suchanfrage gibt den Radius der beiden Kreise an, und Milvus gibt alle Vektoreinbettungen zurück, die in den äußeren Kreis, aber nicht in den inneren Kreis fallen.</p>
<p>Weitere Informationen zur Bereichssuche finden Sie unter <a href="/docs/de/range-search.md">Bereichssuche</a>.</p></li>
<li><p>Gruppierungssuche</p>
<p>Wenn die zurückgegebenen Entitäten in einem bestimmten Feld denselben Wert haben, repräsentieren die Suchergebnisse möglicherweise nicht die Verteilung aller Vektoreinbettungen im Vektorraum. Um die Suchergebnisse zu diversifizieren, sollten Sie die gruppierende Suche verwenden.</p>
<p>Weitere Informationen zur Gruppierungssuche finden Sie unter <a href="/docs/de/grouping-search.md">Gruppierungssuche</a>,</p></li>
<li><p>Hybride Suche</p>
<p>Eine Sammlung kann bis zu vier Vektorfelder enthalten, um die Vektoreinbettungen zu speichern, die mit verschiedenen Einbettungsmodellen erzeugt wurden. Auf diese Weise können Sie eine hybride Suche verwenden, um die Suchergebnisse aus diesen Vektorfeldern neu zu ordnen und so die Auffindungsrate zu verbessern.</p>
<p>Weitere Informationen zur hybriden Suche finden Sie unter <a href="/docs/de/multi-vector-search.md">Hybride Suche</a>.</p></li>
<li><p>Such-Iterator</p>
<p>Eine einzelne ANN-Suche liefert maximal 16.384 Entitäten. Ziehen Sie die Verwendung von Such-Iteratoren in Betracht, wenn Sie mehr Entitäten in einer einzigen Suche zurückgeben möchten.</p>
<p>Details zu Such-Iteratoren finden Sie unter <a href="/docs/de/with-iterators.md">Such-Iterator</a>.</p></li>
<li><p>Volltextsuche</p>
<p>Die Volltextsuche ist eine Funktion, die Dokumente abruft, die bestimmte Begriffe oder Phrasen in Textdatensätzen enthalten, und dann die Ergebnisse nach Relevanz einstuft. Diese Funktion überwindet die Einschränkungen der semantischen Suche, bei der präzise Begriffe übersehen werden können, und stellt sicher, dass Sie die genauesten und kontextrelevanten Ergebnisse erhalten. Darüber hinaus vereinfacht sie die Vektorsuche, indem sie Rohtexteingaben akzeptiert und Ihre Textdaten automatisch in spärliche Einbettungen konvertiert, ohne dass Sie manuell Vektoreinbettungen erstellen müssen.</p>
<p>Einzelheiten zur Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
<li><p>Schlüsselwort-Abgleich</p>
<p>Der Schlüsselwortabgleich in Milvus ermöglicht die präzise Suche nach Dokumenten auf der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für die gefilterte Suche nach bestimmten Bedingungen verwendet und kann skalare Filter zur Verfeinerung der Abfrageergebnisse einbeziehen, so dass Ähnlichkeitssuchen innerhalb von Vektoren, die skalare Kriterien erfüllen, möglich sind.</p>
<p>Weitere Informationen zur Schlüsselwortsuche finden Sie unter <a href="/docs/de/keyword-match.md">Schlüsselwortsuche</a>.</p></li>
<li><p>Partitionsschlüssel verwenden</p>
<p>Die Einbeziehung mehrerer skalarer Felder in die Metadatenfilterung und die Verwendung einer recht komplizierten Filterbedingung können die Sucheffizienz beeinträchtigen. Wenn Sie ein skalares Feld als Partitionsschlüssel festlegen und eine Filterbedingung verwenden, die den Partitionsschlüssel in der Suchanfrage einbezieht, kann dies dazu beitragen, den Suchbereich auf die Partitionen zu beschränken, die den angegebenen Partitionsschlüsselwerten entsprechen.</p>
<p>Einzelheiten zum Partitionsschlüssel finden Sie unter <a href="/docs/de/use-partition-key.md">Partitionsschlüssel verwenden</a>.</p></li>
<li><p>mmap verwenden</p>
<p>Details zu den mmap-Einstellungen finden Sie unter <a href="/docs/de/mmap.md">mmap verwenden</a>.</p></li>
<li><p>Clustering-Verdichtung</p>
<p>Einzelheiten zur Clustering-Kompaktierung finden Sie unter <a href="/docs/de/clustering-compaction.md">Clustering-Kompaktierung</a>.</p></li>
</ul>
