---
id: tune_consistency.md
title: Livello di coerenza
summary: >-
  Come database vettoriale distribuito, Milvus offre diversi livelli di coerenza
  per garantire che ogni nodo o replica possa accedere agli stessi dati durante
  le operazioni di lettura e scrittura. Attualmente, i livelli di consistenza
  supportati sono Strong, Bounded, Eventually e Session, mentre Bounded è il
  livello di consistenza predefinito.
---
<h1 id="Consistency-Level" class="common-anchor-header">Livello di coerenza<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>Come database vettoriale distribuito, Milvus offre diversi livelli di consistenza per garantire che ogni nodo o replica possa accedere agli stessi dati durante le operazioni di lettura e scrittura. Attualmente i livelli di consistenza supportati sono <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> e <strong>Session</strong>, con <strong>Bounded</strong> come livello di consistenza predefinito.</p>
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
    </button></h2><p>Milvus è un sistema che separa l'archiviazione dal calcolo. In questo sistema, i <strong>DataNode</strong> sono responsabili della persistenza dei dati e li memorizzano in uno storage distribuito di oggetti, come MinIO/S3. I <strong>QueryNode</strong> gestiscono attività di calcolo come la ricerca. Queste attività comportano l'elaborazione di <strong>dati batch</strong> e di <strong>dati in streaming</strong>. In parole povere, i dati batch possono essere intesi come dati che sono già stati memorizzati nello storage a oggetti, mentre i dati in streaming si riferiscono a dati che non sono ancora stati memorizzati nello storage a oggetti. A causa della latenza di rete, i QueryNode spesso non dispongono dei dati di streaming più recenti. Senza ulteriori salvaguardie, l'esecuzione della ricerca direttamente sui dati in streaming può comportare la perdita di molti punti di dati non impegnati, compromettendo l'accuratezza dei risultati della ricerca.</p>
<p>Milvus Commercial Edition è un sistema che separa l'archiviazione dal calcolo. In questo sistema, i DataNodes sono responsabili della persistenza dei dati e li memorizzano in uno storage a oggetti distribuito, come MinIO/S3. I QueryNode gestiscono attività di calcolo come la ricerca. Queste attività comportano l'elaborazione di dati batch e di dati in streaming. In parole povere, i dati batch possono essere intesi come dati che sono già stati memorizzati nello storage a oggetti, mentre i dati in streaming si riferiscono a dati che non sono ancora stati memorizzati nello storage a oggetti. A causa della latenza di rete, i QueryNode spesso non dispongono dei dati di streaming più recenti. Senza ulteriori salvaguardie, l'esecuzione della ricerca direttamente sui dati in streaming può comportare la perdita di molti punti di dati non impegnati, compromettendo l'accuratezza dei risultati della ricerca.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/batch-data-and-streaming-data.png" alt="Batch Data And Streaming Data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Dati batch e dati in streaming</span> </span></p>
<p>Come mostrato nella figura precedente, i QueryNode possono ricevere simultaneamente dati in streaming e dati batch dopo aver ricevuto una richiesta di ricerca. Tuttavia, a causa della latenza della rete, i dati in streaming ottenuti dai QueryNodes possono essere incompleti.</p>
<p>Per ovviare a questo problema, Milvus marca il tempo di ogni record nella coda di dati e inserisce continuamente i timestamp di sincronizzazione nella coda di dati. Ogni volta che viene ricevuto un timestamp di sincronizzazione (syncTs), QueryNodes lo imposta come ServiceTime, il che significa che QueryNodes può vedere tutti i dati precedenti a quel Service Time. Sulla base del ServiceTime, Milvus può fornire timestamp di garanzia (GuaranteeTs) per soddisfare le diverse esigenze degli utenti in termini di coerenza e disponibilità. Gli utenti possono informare i QueryNodes della necessità di includere nell'ambito di ricerca i dati precedenti a un determinato momento specificando i GuaranteeT nelle loro richieste di ricerca.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" />
   </span> <span class="img-wrapper"> <span>Tempo di servizio e tempo di garanzia</span> </span></p>
<p>Come mostrato nella figura precedente, se GuaranteeTs è inferiore a ServiceTime, significa che tutti i dati precedenti al momento specificato sono stati completamente scritti su disco, consentendo ai QueryNodes di eseguire immediatamente l'operazione di ricerca. Quando GuaranteeTs è maggiore di ServiceTime, i QueryNodes devono aspettare che ServiceTime superi GuaranteeTs prima di poter eseguire l'operazione di ricerca.</p>
<p>Gli utenti devono trovare un compromesso tra l'accuratezza della query e la sua latenza. Se gli utenti hanno elevati requisiti di coerenza e non sono sensibili alla latenza delle query, possono impostare GuaranteeTs su un valore il più grande possibile; se gli utenti desiderano ricevere rapidamente i risultati della ricerca e sono più tolleranti nei confronti dell'accuratezza delle query, allora GuaranteeTs può essere impostato su un valore inferiore.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" />
   </span> <span class="img-wrapper"> <span>Livello di coerenza illustrato</span> </span></p>
<p>Milvus offre quattro tipi di livelli di consistenza con differenti GuaranteeT.</p>
<ul>
<li><p><strong>Forte</strong></p>
<p>L'ultimo timestamp viene utilizzato come GuaranteeTs e i QueryNodes devono attendere che il ServiceTime soddisfi il GuaranteeTs prima di eseguire le richieste di ricerca.</p></li>
<li><p><strong>Eventuale</strong></p>
<p>Il GuaranteeTs è impostato su un valore estremamente basso, ad esempio 1, per evitare i controlli di coerenza, in modo che i QueryNode possano eseguire immediatamente le richieste di ricerca su tutti i dati del batch.</p></li>
<li><p><strong>Stallo limitato</strong></p>
<p>GuranteeTs è impostato su un punto precedente all'ultimo timestamp per far sì che i QueryNodes eseguano ricerche con una certa tolleranza di perdita di dati.</p></li>
<li><p><strong>Sessione</strong></p>
<p>L'ultimo momento in cui il client inserisce i dati viene utilizzato come GuaranteeTs in modo che i QueryNodes possano eseguire ricerche su tutti i dati inseriti dal client.</p></li>
</ul>
<p>Milvus utilizza Bounded Staleness come livello di consistenza predefinito. Se il livello di garanzia non è specificato, viene utilizzato come livello di garanzia l'ultimo ServiceTime.</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">Impostazione del livello di consistenza<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile impostare diversi livelli di consistenza quando si crea una raccolta e quando si eseguono ricerche e query.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">Impostazione del livello di consistenza alla creazione di una raccolta</h3><p>Quando si crea una raccolta, è possibile impostare il livello di consistenza per le ricerche e le query all'interno della raccolta. L'esempio di codice seguente imposta il livello di coerenza su <strong>Strong</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.STRONG)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>I valori possibili per il parametro <code translate="no">consistency_level</code> sono <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> e <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">Impostare il livello di consistenza nella ricerca</h3><p>È sempre possibile modificare il livello di coerenza per una ricerca specifica. L'esempio di codice seguente riporta il livello di consistenza a <strong>Bounded</strong>. La modifica si applica solo alla richiesta di ricerca corrente.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#plaintext">plaintext</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-plaintext">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    &quot;my_collection&quot;, // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(&quot;vector&quot;))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo parametro è disponibile anche nelle ricerche ibride e nell'iteratore di ricerca. I valori possibili per il parametro <code translate="no">consistency_level</code> sono <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> e <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">Impostare il livello di consistenza nella query</h3><p>È sempre possibile modificare il livello di coerenza per una ricerca specifica. Il seguente esempio di codice imposta il livello di coerenza su <strong>Eventualmente</strong>. L'impostazione si applica solo alla richiesta di ricerca corrente.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#plaintext">plaintext</a></div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-plaintext">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(&quot;my_collection&quot;).
    WithFilter(&quot;color like \&quot;red%\&quot;&quot;).
    WithOutputFields(&quot;vector&quot;, &quot;color&quot;).
    WithLimit(3).
    WithConsistencyLevel(entity.ClEventually))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
<button class="copy-code-btn"></button></code></pre>
<p>Questo parametro è disponibile anche nell'iteratore della query. I valori possibili per il parametro <code translate="no">consistency_level</code> sono <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> e <code translate="no">Session</code>.</p>
