---
id: primary-key-search.md
title: Ricerca per chiave primariaCompatible with Milvus 2.6.9+
summary: >-
  Quando si eseguono ricerche di similarità, viene sempre richiesto di fornire
  uno o più vettori di query, anche se questi sono già presenti nella raccolta
  di destinazione. Per evitare di recuperare i vettori prima della ricerca, è
  possibile utilizzare invece le chiavi primarie.
beta: Milvus 2.6.9+
---
<h1 id="Primary-Key-Search" class="common-anchor-header">Ricerca per chiave primaria<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando si eseguono ricerche per similarità, viene sempre richiesto di fornire uno o più vettori di query, anche se questi sono già presenti nella raccolta di destinazione. Per evitare di recuperare i vettori prima della ricerca, è possibile utilizzare invece le chiavi primarie.</p>
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
    </button></h2><p>Sulle piattaforme di e-commerce, gli utenti possono inserire una parola chiave per recuperare i prodotti corrispondenti. Una volta che l'utente visualizza la pagina dei dettagli di un prodotto, la piattaforma mostra anche un elenco di prodotti simili nella parte inferiore della pagina per gli utenti che desiderano confrontarli.</p>
<p>I suggerimenti sono ordinati in base alla loro somiglianza con la parola chiave o con il prodotto corrente. Per ottenere questo risultato, gli sviluppatori della piattaforma devono recuperare da Milvus la rappresentazione vettoriale della parola chiave o del prodotto corrente prima della ricerca di somiglianza vera e propria; ciò aumenta il numero di scambi tra la piattaforma e Milvus e comporta la trasmissione attraverso la rete di un gran numero di valori in virgola mobile ad alta dimensionalità.</p>
<p>Per semplificare la logica di interazione tra le vostre applicazioni e Milvus, ridurre il numero di scambi e evitare la trasmissione di grandi quantità di valori in virgola mobile ad alta dimensionalità attraverso la rete, prendete in considerazione l’utilizzo delle ricerche per chiave primaria.</p>
<p>In una ricerca per chiave primaria, non è necessario fornire alcun vettore di query. Vi verrà invece richiesto di fornire le chiavi primarie (<code translate="no">ids</code>) delle entità che contengono i vettori di query.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Limiti e restrizioni<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
<li><p>Le ricerche che utilizzano le chiavi primarie si applicano a tutti i tipi di dati vettoriali, ad eccezione dei campi vettoriali sparsi derivati da campi VarChar, come nelle funzioni BM25.</p></li>
<li><p>È possibile utilizzare le chiavi primarie al posto dei vettori di query nelle ricerche filtrate, per intervallo e di raggruppamento, con l'opzione di abilitare l'impaginazione. Tuttavia, questa funzionalità non si applica alle ricerche ibride e agli iteratori di ricerca.</p></li>
<li><p>Per le ricerche di similarità che coinvolgono elenchi di embedding, è comunque necessario recuperare i vettori di query, organizzarli in elenchi di embedding ed eseguire le ricerche.</p></li>
<li><p>Non è possibile utilizzare le chiavi primarie al posto dei vettori di query nelle API RESTful.</p></li>
<li><p>Per eventuali chiavi primarie inesistenti o in formato errato, Milvus segnalerà degli errori.</p></li>
<li><p>Le chiavi primarie e i vettori di query si escludono a vicenda. Fornire entrambi comporta anch’esso la generazione di errori.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli esempi seguenti presuppongono che tutti gli ID Int64 forniti siano disponibili nella collezione di destinazione.</p>
<div class="alert note">
<p>Le chiavi primarie non vengono utilizzate per il filtraggio, ma solo per il recupero dei vettori.</p>
</div>
<h3 id="Example-1-Basic-primary-key-search" class="common-anchor-header">Esempio 1: Ricerca di base con chiave primaria<button data-href="#Example-1-Basic-primary-key-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Per eseguire una ricerca di base con chiave primaria, è sufficiente sostituire i vettori di query con le chiavi primarie.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment"># a list of primary keys</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .metricType(IndexParam.MetricType.IP)
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">// a list of primary keys</span></span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>}) <span class="hljs-comment">// a list of primary keys</span></span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                         .<span class="hljs-built_in">WithMetricType</span>(milvus::MetricType::IP);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtered-search-using-primary-keys" class="common-anchor-header">Esempio 2: Ricerca filtrata tramite chiavi primarie<button data-href="#Example-2-Filtered-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>L’esempio seguente presuppone che «color» e «likes» siano due campi definiti dallo schema nella collezione di destinazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">#</span></span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithFilter(<span class="hljs-string">`color like &quot;red%&quot; and likes &gt; 50`</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;filter&quot;: &quot;color like \\&quot;red%\\&quot; and likes &gt; 50&quot;,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;],
    &quot;limit&quot;: 3
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> colors = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::VarCharFieldData&gt;(<span class="hljs-string">&quot;color&quot;</span>);
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> likes = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;likes&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, color=&quot;</span> &lt;&lt; colors-&gt;<span class="hljs-built_in">Data</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, likes=&quot;</span> &lt;&lt; likes-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-search-using-primary-keys" class="common-anchor-header">Esempio 3: Ricerca per intervallo utilizzando le chiavi primarie<button data-href="#Example-3-Range-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);
params.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-string">&quot;0.6&quot;</span>);

List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .searchParams(params)
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">params</span>: {
<span class="highlighted-comment-line">        <span class="hljs-attr">radius</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.6</span>,</span>
    },
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annParam := index.NewCustomAnnParam()
<span class="highlighted-comment-line">annParam.WithRadius(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">annParam.WithRangeFilter(<span class="hljs-number">0.6</span>)</span>

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {
      &quot;params&quot;: {
        &quot;radius&quot;: 0.4,
        &quot;range_filter&quot;: 0.6
      }
    }
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.6</span>)</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Grouping-search-using-primary-keys" class="common-anchor-header">Esempio 4: Ricerca per raggruppamento utilizzando le chiavi primarie<button data-href="#Example-4-Grouping-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>L'esempio seguente presuppone ch <code translate="no">docId</code> i siano campi definiti dallo schema nella collezione di destinazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;docId&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;docId: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;docId&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;groupingField&quot;: &quot;docId&quot;,
    &quot;outputFields&quot;: [&quot;docId&quot;]
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;docId&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;docId&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> docIds = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;docId&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, docId=&quot;</span> &lt;&lt; docIds-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
