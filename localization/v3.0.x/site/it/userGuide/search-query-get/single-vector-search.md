---
id: single-vector-search.md
title: Ricerca vettoriale di base
summary: >-
  Eseguire ricerche di base con reti neurali artificiali (ANN) in Milvus
  utilizzando vettori di query, campi di output, filtri, intervalli e iteratori.
---
<h1 id="Basic-Vector-Search" class="common-anchor-header">Ricerca vettoriale di base<button data-href="#Basic-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Basandosi su un file di indice che registra l'ordine ordinato delle rappresentazioni vettoriali, la ricerca ANN (Approximate Nearest Neighbor) individua un sottoinsieme di rappresentazioni vettoriali in base al vettore di query contenuto in una richiesta di ricerca ricevuta, confronta il vettore di query con quelli del sottoinsieme e restituisce i risultati più simili. Grazie alla ricerca ANN, Milvus offre un'esperienza di ricerca efficiente. Questa pagina ti aiuta a imparare come eseguire ricerche ANN di base.</p>
<div class="alert note">
<p>Se si aggiungono nuovi campi dopo la creazione della raccolta, le ricerche che includono tali campi restituiscono i valori predefiniti o " <code translate="no">NULL</code> " per le entità che non hanno valori impostati esplicitamente. Per ulteriori dettagli, consultare <a href="/docs/it/add-fields-to-an-existing-collection.md">Modifica dello schema della raccolta</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca ANN e quella k-Nearest Neighbors (kNN) sono i metodi più comuni nelle ricerche di similarità vettoriale. In una ricerca kNN, è necessario confrontare tutti i vettori in uno spazio vettoriale con il vettore di query contenuto nella richiesta di ricerca prima di individuare quelli più simili, il che richiede tempo e risorse.</p>
<p>A differenza delle ricerche kNN, un algoritmo di ricerca ANN richiede un file <strong>di indice</strong> che registri l’ordine di classificazione degli embedding vettoriali. Quando arriva una richiesta di ricerca, è possibile utilizzare il file di indice come riferimento per individuare rapidamente un sottogruppo che probabilmente contiene gli embedding vettoriali più simili al vettore di query. Successivamente, è possibile utilizzare il <strong>tipo di metrica</strong> specificato per misurare la somiglianza tra il vettore di query e quelli presenti nel sottogruppo, ordinare i membri del gruppo in base alla somiglianza con il vettore di query e individuare i <strong>primi K</strong> membri del gruppo.</p>
<p>Le ricerche ANN si basano su indici predefiniti e la velocità di elaborazione, l’utilizzo della memoria e l’accuratezza della ricerca possono variare a seconda dei tipi di indice scelti. È necessario trovare un equilibrio tra prestazioni e accuratezza della ricerca.</p>
<p>Per ridurre la curva di apprendimento, Milvus mette a disposizione <strong>AUTOINDEX</strong>. Grazie ad <strong>AUTOINDEX</strong>, Milvus è in grado di analizzare la distribuzione dei dati all’interno della propria collezione durante la creazione dell’indice e di impostare i parametri di indicizzazione più ottimizzati sulla base dell’analisi, al fine di raggiungere un equilibrio tra prestazioni di ricerca e accuratezza.</p>
<p>In questa sezione troverete informazioni dettagliate sui seguenti argomenti:</p>
<ul>
<li><p><a href="/docs/it/single-vector-search.md#Single-Vector-Search">Ricerca su singolo vettore</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Bulk-Vector-Search">Ricerca su vettori in blocco</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#ANN-Search-in-Partition">Ricerca ANN nelle partizioni</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Use-Output-Fields">Utilizzo dei campi di output</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Use-Limit-and-Offset">Utilizzo di limit e offset</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Use-Level">Utilizzo del livello</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Get-Recall-Rate">Ottenere il tasso di richiamo</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Enhancing-ANN-Search">Miglioramento della ricerca ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search" class="common-anchor-header">Ricerca a vettore singolo<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nelle ricerche ANN, una ricerca a vettore singolo si riferisce a una ricerca che coinvolge un solo vettore di query. Sulla base dell’indice predefinito e del tipo di metrica specificata nella richiesta di ricerca, Milvus individuerà i primi K vettori più simili al vettore di query.</p>
<p>In questa sezione imparerai come eseguire una ricerca a vettore singolo. La richiesta di ricerca contiene un unico vettore di query e chiede a Milvus di utilizzare il prodotto interno (IP) per calcolare la somiglianza tra i vettori di query e quelli presenti nella collezione, restituendo i tre più simili.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<p>Milvus ordina i risultati della ricerca in ordine decrescente in base ai punteggi di similarità rispetto al vettore di query. Il punteggio di similarità è anche definito come distanza dal vettore di query e i suoi intervalli di valori variano a seconda dei tipi di metrica utilizzati.</p>
<p>La tabella seguente elenca i tipi di metrica applicabili e gli intervalli di distanza corrispondenti.</p>
<table>
   <tr>
     <th><p>Tipo di metrica</p></th>
     <th><p>Caratteristiche</p></th>
     <th><p>Intervallo di distanza</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Un valore più piccolo indica una maggiore somiglianza.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Un valore maggiore indica una maggiore somiglianza.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Un valore maggiore indica una maggiore somiglianza.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Un valore più piccolo indica una maggiore somiglianza.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Un valore più piccolo indica una maggiore somiglianza.</p></td>
     <td><p>[0, dim(vettore)]</p></td>
   </tr>
</table>
<h2 id="Bulk-Vector-Search" class="common-anchor-header">Ricerca vettoriale in blocco<button data-href="#Bulk-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Allo stesso modo, è possibile includere più vettori di query in una richiesta di ricerca. Milvus effettuerà ricerche ANN per i vettori di query in parallelo e restituirà due insiemi di risultati.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<h2 id="Primary-Key-Search--Milvus-269+" class="common-anchor-header">Ricerca per chiave primaria<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search--Milvus-269+" class="anchor-icon" translate="no">
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
    </button></h2><p>Invece di impostare i vettori di query, è possibile utilizzare le chiavi primarie se i vettori di query esistono già nella collezione di destinazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition" class="common-anchor-header">Ricerca ANN in partizione<button data-href="#ANN-Search-in-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Supponiamo di aver creato più partizioni in una collezione e di poter restringere l'ambito della ricerca a un numero specifico di partizioni. In tal caso, è possibile includere i nomi delle partizioni di destinazione nella richiesta di ricerca per limitare l'ambito della ricerca alle partizioni specificate. Riducendo il numero di partizioni coinvolte nella ricerca si migliorano le prestazioni della ricerca.</p>
<p>Il seguente frammento di codice presuppone l’esistenza di una partizione denominata <strong>PartitionA</strong> nella propria collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
<span class="highlighted-wrapper-line">    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
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
<span class="highlighted-wrapper-line">    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<h2 id="Use-Output-Fields" class="common-anchor-header">Utilizzo dei campi di output<button data-href="#Use-Output-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>In un risultato di ricerca, Milvus include per impostazione predefinita i valori dei campi primari e le distanze/punteggi di similarità delle entità che contengono i primi K vettori di embedding. È possibile includere i nomi dei campi di destinazione, compresi sia i campi vettoriali che quelli scalari, in una richiesta di ricerca come campi di output, in modo che i risultati della ricerca riportino i valori provenienti da altri campi presenti in tali entità.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]</span>
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
<span class="highlighted-wrapper-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>]</span>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<h2 id="Sort-Search-Results-by-Scalar-Fields--Milvus-30x" class="common-anchor-header">Ordinare i risultati di ricerca in base ai campi scalari<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Sort-Search-Results-by-Scalar-Fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Per impostazione predefinita, Milvus ordina i risultati di ricerca in base al loro punteggio di similarità rispetto al vettore di query. Se si desidera che le entità restituite seguano un ordine basato sui campi scalari, aggiungere <code translate="no">order_by_fields</code> alla richiesta di ricerca.</p>
<p>Ogni voce in ` <code translate="no">order_by_fields</code> ` specifica un campo scalare e una direzione di ordinamento. Utilizzare ` <code translate="no">&quot;asc&quot;</code> ` per l’ordine crescente o ` <code translate="no">&quot;desc&quot;</code> ` per l’ordine decrescente. Se si omette ` <code translate="no">order</code>`, Milvus ordina il campo in ordine crescente.</p>
<p>L’esempio seguente ordina i risultati della ricerca in base a <code translate="no">price</code> dal valore più basso a quello più alto. Includere il campo di ordinamento in <code translate="no">output_fields</code> se si desidera esaminare il valore del campo nella risposta.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">20</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
<span class="highlighted-comment-line">    order_by_fields=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>}</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile ordinare in base a più campi scalari. Milvus applica i campi nell’ordine specificato. Nell’esempio seguente, Milvus ordina i risultati in ordine crescente in base a <code translate="no">price</code>. Per le entità con lo stesso <code translate="no">price</code>, Milvus ordina quindi in ordine decrescente in base a <code translate="no">rating</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">20</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
<span class="highlighted-comment-line">    order_by_fields=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per le entità con valori identici in tutti i campi specificati per l’ordinamento, Milvus mantiene l’ordine originale in base al punteggio di similarità.</p>
<h2 id="Use-Limit-and-Offset" class="common-anchor-header">Utilizzo di Limit e Offset<button data-href="#Use-Limit-and-Offset" class="anchor-icon" translate="no">
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
    </button></h2><p>Si noterà che il parametro <code translate="no">limit</code>, incluso nelle richieste di ricerca, determina il numero di entità da includere nei risultati della ricerca. Questo parametro specifica il numero massimo di entità da restituire in una singola ricerca ed è solitamente denominato <strong>top-K</strong>.</p>
<p>Se si desidera eseguire query impaginate, è possibile utilizzare un ciclo per inviare più richieste di ricerca, includendo i parametri <strong>Limit</strong> e <strong>Offset</strong> in ciascuna richiesta. Nello specifico, è possibile impostare il parametro <strong>Limit</strong> sul numero di entità che si desidera includere nei risultati della query corrente e impostare <strong>Offset</strong> sul numero totale di entità già restituite.</p>
<p>La tabella seguente illustra come impostare i parametri <strong>Limit</strong> e <strong>Offset</strong> per le query paginate quando si restituiscono 100 entità alla volta.</p>
<table>
   <tr>
     <th><p>Query</p></th>
     <th><p>Entità da restituire per query</p></th>
     <th><p>Totale delle entità già restituite</p></th>
   </tr>
   <tr>
     <td><p>La <strong>prima</strong> query</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p>La <strong>seconda</strong> query</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p>La <strong>terza</strong> query</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p>L'<strong>n-esima</strong> query</p></td>
     <td><p>100</p></td>
     <td><p>100 × (n-1)</p></td>
   </tr>
</table>
<p>Si noti che la somma di <code translate="no">limit</code> e <code translate="no">offset</code> in una singola ricerca ANN deve essere inferiore a 16.384.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip</span></span>
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
<span class="highlighted-wrapper-line">    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.</span></span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<h2 id="Temporarily-set-a-timezone-for-a-search" class="common-anchor-header">Impostare temporaneamente un fuso orario per una ricerca<button data-href="#Temporarily-set-a-timezone-for-a-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Se la collezione dispone di un campo ` <code translate="no">TIMESTAMPTZ</code> `, è possibile sovrascrivere temporaneamente il fuso orario predefinito del database o della collezione per una singola operazione impostando il parametro ` <code translate="no">timezone</code> ` nella chiamata di ricerca. Ciò determina la modalità di visualizzazione e confronto dei valori ` <code translate="no">TIMESTAMPTZ</code> ` durante l'operazione.</p>
<p>Il valore di ` <code translate="no">timezone</code> ` deve essere un <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">identificatore di fuso orario IANA</a> valido (ad esempio, <strong>`Asia/Shanghai`</strong>, <strong>`America/Chicago</strong>` o <strong>`UTC`</strong>). Per ulteriori dettagli su come utilizzare il campo ` <code translate="no">TIMESTAMPTZ</code> `, consultare <a href="/docs/it/timestamptz-field.md">il campo `TIMESTAMPTZ</a>`.</p>
<p>L'esempio seguente mostra come impostare temporaneamente un fuso orario per un'operazione di ricerca:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
<span class="highlighted-wrapper-line">    timezone=<span class="hljs-string">&quot;America/Havana&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> QUERY_VECTOR=<span class="hljs-string">&#x27;[0.1, 0.2, 0.3, 0.4]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;annsField&quot;: &quot;vector&quot;,
  &quot;data&quot;: [&#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span><span class="hljs-string">&#x27;],
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;IP&quot;,
    &quot;timezone&quot;: &quot;America/Havana&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search" class="common-anchor-header">Ottimizzazione della ricerca ANN<button data-href="#Enhancing-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX semplifica notevolmente l’apprendimento delle ricerche ANN. Tuttavia, i risultati della ricerca potrebbero non essere sempre corretti all’aumentare del top-K. Riducendo l’ambito di ricerca, migliorando la pertinenza dei risultati e diversificando i risultati stessi, Milvus offre i seguenti miglioramenti alla ricerca.</p>
<ul>
<li><p>Ricerca filtrata</p>
<p>È possibile includere condizioni di filtraggio in una richiesta di ricerca in modo che Milvus esegua il filtraggio dei metadati prima di effettuare le ricerche ANN, riducendo l’ambito di ricerca dall’intera raccolta alle sole entità che corrispondono alle condizioni di filtraggio specificate.</p>
<p>Per ulteriori informazioni sul filtraggio dei metadati e sulle condizioni di filtraggio, consultare <a href="/docs/it/filtered-search.md">Ricerca filtrata</a>, <a href="/docs/it/boolean.md">Spiegazione del filtraggio</a> e argomenti correlati.</p></li>
<li><p>Ricerca per intervallo</p>
<p>È possibile migliorare la pertinenza dei risultati di ricerca limitando la distanza o il punteggio delle entità restituite entro un intervallo specifico. In Milvus, una ricerca per intervallo consiste nel tracciare due cerchi concentrici con al centro il vettore di embedding più simile al vettore della query. La richiesta di ricerca specifica il raggio di entrambi i cerchi e Milvus restituisce tutti i vettori di embedding che rientrano nel cerchio esterno ma non in quello interno.</p>
<p>Per ulteriori informazioni sulla ricerca per intervallo, consultare <a href="/docs/it/range-search.md">Ricerca per intervallo</a>.</p></li>
<li><p>Ricerca per raggruppamento</p>
<p>Se le entità restituite presentano lo stesso valore in un campo specifico, i risultati della ricerca potrebbero non rappresentare la distribuzione di tutte le rappresentazioni vettoriali nello spazio vettoriale. Per diversificare i risultati della ricerca, si consiglia di utilizzare la ricerca per raggruppamento.</p>
<p>Per ulteriori informazioni sulla ricerca per raggruppamento, consultare <a href="/docs/it/grouping-search.md">Ricerca</a> per <a href="/docs/it/grouping-search.md">raggruppamento</a>,</p></li>
<li><p>Ricerca ibrida</p>
<p>Una raccolta può includere più campi vettoriali per salvare le rappresentazioni vettoriali generate utilizzando diversi modelli di embedding. In questo modo, è possibile utilizzare una ricerca ibrida per riorganizzare i risultati di ricerca provenienti da questi campi vettoriali, migliorando il tasso di richiamo.</p>
<p>Per ulteriori informazioni sulla ricerca ibrida, consultare <a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a>.</p></li>
<li><p>Iteratore di ricerca</p>
<p>Una singola ricerca ANN restituisce un massimo di 16.384 entità. Si consiglia di utilizzare gli iteratori di ricerca se è necessario ottenere un numero maggiore di entità in un'unica ricerca.</p>
<p>Per i dettagli sugli iteratori di ricerca, consultare <a href="/docs/it/with-iterators.md">Iteratore</a> di <a href="/docs/it/with-iterators.md">ricerca</a>.</p></li>
<li><p>Ricerca full-text</p>
<p>La ricerca full-text è una funzionalità che recupera documenti contenenti termini o frasi specifici all'interno di set di dati testuali, classificando poi i risultati in base alla rilevanza. Questa funzionalità supera i limiti della ricerca semantica, che potrebbe trascurare termini precisi, garantendo risultati più accurati e contestualmente rilevanti. Inoltre, semplifica le ricerche vettoriali accettando l’input di testo grezzo e convertendo automaticamente i dati di testo in embedding sparsi, senza la necessità di generare manualmente gli embedding vettoriali.</p>
<p>Per ulteriori dettagli sulla ricerca full-text, consultare <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p></li>
<li><p>Corrispondenza testuale</p>
<p>La corrispondenza per parole chiave in Milvus consente il recupero preciso dei documenti in base a termini specifici. Questa funzionalità viene utilizzata principalmente per la ricerca filtrata al fine di soddisfare condizioni specifiche e può incorporare il filtraggio scalare per affinare i risultati della query, consentendo ricerche di similarità all’interno di vettori che soddisfano criteri scalari.</p>
<p>Per ulteriori dettagli sulla corrispondenza per parola chiave, consultare la sezione " <a href="/docs/it/keyword-match.md">Corrispondenza per parola chiave</a>".</p></li>
<li><p>Utilizzo della chiave di partizione</p>
<p>Il coinvolgimento di più campi scalari nel filtraggio dei metadati e l’utilizzo di una condizione di filtraggio piuttosto complessa possono influire sull’efficienza della ricerca. Una volta impostato un campo scalare come chiave di partizione e utilizzata una condizione di filtraggio che coinvolga la chiave di partizione nella richiesta di ricerca, è possibile limitare l’ambito della ricerca alle partizioni corrispondenti ai valori specificati della chiave di partizione.</p>
<p>Per ulteriori dettagli sulla chiave di partizione, consultare <a href="/docs/it/use-partition-key.md">Utilizzo</a> della <a href="/docs/it/use-partition-key.md">chiave di partizione</a>.</p></li>
<li><p>Utilizzo di mmap</p>
<p>Per ulteriori dettagli sulle impostazioni di mmap, consultare la sezione " <a href="/docs/it/mmap.md">Utilizzo di mmap</a>".</p></li>
<li><p>Compattazione in cluster</p>
<p>Per ulteriori dettagli sulle compattazioni con clustering, consultare " <a href="/docs/it/clustering-compaction.md">Compattazione</a> con <a href="/docs/it/clustering-compaction.md">clustering</a>".</p></li>
<li><p>Utilizzo del reranking</p>
<p>Per ulteriori dettagli sull'utilizzo dei ranker per migliorare la pertinenza dei risultati di ricerca, consultare <a href="/docs/it/decay-ranker-overview.md">Panoramica</a> su <a href="/docs/it/decay-ranker-overview.md">Decay Ranker</a> e <a href="/docs/it/model-ranker-overview.md">Panoramica su Model Ranker</a>.</p></li>
</ul>
