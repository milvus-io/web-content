---
id: grouping-search.md
summary: >-
  Una ricerca per raggruppamento consente a Milvus di raggruppare i risultati
  della ricerca in base ai valori di un campo specifico per aggregare i dati a
  un livello superiore. Ad esempio, è possibile utilizzare una ricerca RNA di
  base per trovare libri simili a quello in questione, ma è possibile utilizzare
  una ricerca di raggruppamento per trovare le categorie di libri che possono
  riguardare gli argomenti trattati in quel libro. Questo argomento descrive
  come utilizzare la ricerca per raggruppamento e le considerazioni principali.
title: Ricerca per raggruppamento
---
<h1 id="Grouping-Search​" class="common-anchor-header">Ricerca per raggruppamento<button data-href="#Grouping-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Una ricerca per raggruppamento consente a Milvus di raggruppare i risultati della ricerca in base ai valori di un campo specifico per aggregare i dati a un livello superiore. Ad esempio, è possibile utilizzare una ricerca RNA di base per trovare libri simili a quello in questione, ma è possibile utilizzare una ricerca di raggruppamento per trovare le categorie di libri che possono riguardare gli argomenti trattati in quel libro. Questo argomento descrive come utilizzare la ricerca per raggruppamento e le considerazioni principali.</p>
<h2 id="Overview​" class="common-anchor-header">Panoramica<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando le entità nei risultati della ricerca condividono lo stesso valore in un campo scalare, ciò indica che sono simili in un particolare attributo, il che può avere un impatto negativo sui risultati della ricerca.</p>
<p>Si supponga che una collezione contenga più documenti (indicati da <strong>docId</strong>). Per conservare il maggior numero possibile di informazioni semantiche durante la conversione dei documenti in vettori, ogni documento viene suddiviso in paragrafi (o <strong>chunks</strong>) più piccoli e gestibili e memorizzato come entità separate. Anche se il documento è diviso in sezioni più piccole, gli utenti sono spesso interessati a identificare i documenti più rilevanti per le loro esigenze.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/ann-search.png" alt="ANN Search" class="doc-image" id="ann-search" />
   </span> <span class="img-wrapper"> <span>Ricerca ANN</span> </span></p>
<p>Quando si esegue una ricerca approssimativa dei vicini (ANN) su una raccolta di questo tipo, i risultati della ricerca possono includere diversi paragrafi dello stesso documento, facendo potenzialmente trascurare altri documenti, che potrebbero non essere in linea con il caso d'uso previsto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grouping-search.png" alt="Grouping Search" class="doc-image" id="grouping-search" />
   </span> <span class="img-wrapper"> <span>Raggruppamento della ricerca</span> </span></p>
<p>Per migliorare la varietà dei risultati della ricerca, è possibile aggiungere il parametro <code translate="no">group_by_field</code> nella richiesta di ricerca per attivare la ricerca per gruppi. Come mostrato nel diagramma, è possibile impostare <code translate="no">group_by_field</code> su <code translate="no">docId</code>. Quando riceve questa richiesta, Milvus.</p>
<ul>
<li><p>Esegue una ricerca ANN basata sul vettore di query fornito per trovare tutte le entità più simili alla query.</p></li>
<li><p>Raggruppa i risultati della ricerca in base a <code translate="no">group_by_field</code>, ad esempio <code translate="no">docId</code>.</p></li>
<li><p>Restituisce i primi risultati per ogni gruppo, come definito dal parametro <code translate="no">limit</code>, con l'entità più simile di ogni gruppo.</p></li>
</ul>
<div class="alert note">
<p>Per impostazione predefinita, la ricerca per gruppi restituisce solo un'entità per gruppo. Se si desidera aumentare il numero di risultati da restituire per gruppo, è possibile controllarlo con i parametri <code translate="no">group_size</code> e <code translate="no">strict_group_size</code>.</p>
</div>
<h2 id="Perform-Grouping-Search​" class="common-anchor-header">Esecuzione della ricerca per gruppi<button data-href="#Perform-Grouping-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce un esempio di codice per dimostrare l'uso della ricerca per gruppi. L'esempio seguente presuppone che l'insieme includa i campi <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">chunk</code> e <code translate="no">docId</code>.</p>
<pre><code translate="no" class="language-json">[​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">4</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
]​
​

<button class="copy-code-btn"></button></code></pre>
<p>Nella richiesta di ricerca, impostare sia <code translate="no">group_by_field</code> che <code translate="no">output_fields</code> su <code translate="no">docId</code>. Milvus raggrupperà i risultati in base al campo specificato e restituirà l'entità più simile di ogni gruppo, includendo il valore di <code translate="no">docId</code> per ogni entità restituita.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
query_vectors = [​
    [<span class="hljs-number">0.14529211512077012</span>, <span class="hljs-number">0.9147257273453546</span>, <span class="hljs-number">0.7965055218724449</span>, <span class="hljs-number">0.7009258593102812</span>, <span class="hljs-number">0.5605206522382088</span>]]​
​
<span class="hljs-comment"># Group search results​</span>
res = client.search(​
    collection_name=<span class="hljs-string">&quot;group_search_collection&quot;</span>,​
    data=query_vectors,​
    limit=<span class="hljs-number">3</span>,​
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]​
)​
​
<span class="hljs-comment"># Retrieve the values in the `docId` column​</span>
doc_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;docId&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;group_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// nolint​</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Search_grouping</span><span class="hljs-params">()</span></span> {​
    ctx, cancel := context.WithCancel(context.Background())​
    <span class="hljs-keyword">defer</span> cancel()​
​
    milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
    token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
    cli, err := client.New(ctx, &amp;client.ClientConfig{​
        Address: milvusAddr,​
        APIKey:  token,​
    })​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
    queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}​
​
    resultSets, err := cli.Search(ctx, client.NewSearchOption(​
        <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName​</span>
        <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit​</span>
        []entity.Vector{entity.FloatVector(queryVector)},​
    ).WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>))​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {​
        log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)​
        log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)​
    }​
    <span class="hljs-comment">// Output:​</span>
    <span class="hljs-comment">// IDs:​</span>
    <span class="hljs-comment">// Scores:​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>​
    <span class="hljs-comment">// highlight-end​</span>
})​
​
<span class="hljs-comment">// Retrieve the values in the `docId` column​</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;group_search_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;groupingField&quot;: &quot;docId&quot;,​
    &quot;outputFields&quot;: [&quot;docId&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Nella richiesta qui sopra, <code translate="no">limit=3</code> indica che il sistema restituirà i risultati della ricerca da tre gruppi, con ogni gruppo contenente la singola entità più simile al vettore della query.</p>
<h2 id="Configure-group-size​" class="common-anchor-header">Configurare la dimensione dei gruppi<button data-href="#Configure-group-size​" class="anchor-icon" translate="no">
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
    </button></h2><p>Per impostazione predefinita, la ricerca per gruppi restituisce solo un'entità per gruppo. Se si desiderano più risultati per gruppo, regolare i parametri <code translate="no">group_size</code> e <code translate="no">strict_group_size</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Group search results​</span>
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;group_search_collection&quot;</span>, ​
    data=query_vectors, <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Top K results​ to return​</span>
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>, <span class="hljs-comment"># Group by docId​</span>
    group_size=<span class="hljs-number">2</span>, <span class="hljs-comment"># Return 2 entities per group​</span>
    strict_group_size=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Ensure each group has 2 entities​</span>
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;group_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">5</span>)​
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)​
        .groupSize(<span class="hljs-number">2</span>)​
        .strictGroupSize(<span class="hljs-literal">true</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=-0.49148706, id=8)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.38515577, id=2)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.19556211, id=4)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">group_size</span>: <span class="hljs-number">2</span>,​
    <span class="hljs-attr">strict_group_size</span>: <span class="hljs-literal">true</span>​
    <span class="hljs-comment">// highlight-end​</span>
})​
​
<span class="hljs-comment">// Retrieve the values in the `docId` column​</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;group_search_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;groupingField&quot;: &quot;docId&quot;,​
    &quot;groupSize&quot;:2,​
    &quot;strictGroupSize&quot;:true,​
    &quot;outputFields&quot;: [&quot;docId&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente.</p>
<ul>
<li><p><code translate="no">group_size</code>: Specifica il numero desiderato di entità da restituire per gruppo. Per esempio, impostando <code translate="no">group_size=2</code> si intende che ogni gruppo (o ogni <code translate="no">docId</code>) dovrebbe idealmente restituire due dei paragrafi (o <strong>pezzi)</strong> più simili. Se <code translate="no">group_size</code> non è impostato, il sistema restituisce per default un risultato per gruppo.</p></li>
<li><p><code translate="no">strict_group_size</code>: Questo parametro booleano controlla se il sistema deve applicare rigorosamente il conteggio impostato da <code translate="no">group_size</code>. Se <code translate="no">strict_group_size=True</code>, il sistema cercherà di includere il numero esatto di entità specificato da <code translate="no">group_size</code> in ogni gruppo (ad esempio, due paragrafi), a meno che non ci siano abbastanza dati in quel gruppo. Per impostazione predefinita (<code translate="no">strict_group_size=False</code>), il sistema dà la priorità al raggiungimento del numero di gruppi specificato dal parametro <code translate="no">limit</code>, piuttosto che assicurarsi che ogni gruppo contenga le entità di <code translate="no">group_size</code>. Questo approccio è generalmente più efficiente nei casi in cui la distribuzione dei dati non è uniforme.</p></li>
</ul>
<p>Per ulteriori dettagli sui parametri, fare riferimento a <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a>.</p>
<h2 id="Considerations​" class="common-anchor-header">Considerazioni<button data-href="#Considerations​" class="anchor-icon" translate="no">
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
<li><p><strong>Numero di gruppi</strong>: Il parametro <code translate="no">limit</code> controlla il numero di gruppi da cui vengono restituiti i risultati della ricerca, piuttosto che il numero specifico di entità all'interno di ciascun gruppo. L'impostazione di un <code translate="no">limit</code> appropriato aiuta a controllare la diversità della ricerca e le prestazioni della query. Ridurre <code translate="no">limit</code> può ridurre i costi di calcolo se i dati sono distribuiti densamente o se le prestazioni sono un problema.</p></li>
<li><p><strong>Entità per gruppo</strong>: Il parametro <code translate="no">group_size</code> controlla il numero di entità restituite per gruppo. La regolazione di <code translate="no">group_size</code> in base al caso d'uso può aumentare la ricchezza dei risultati della ricerca. Tuttavia, se i dati sono distribuiti in modo non uniforme, alcuni gruppi potrebbero restituire un numero di entità inferiore a quello specificato da <code translate="no">group_size</code>, in particolare in scenari di dati limitati.</p></li>
<li><p><strong>Dimensione rigida del gruppo</strong>: Quando si utilizza <code translate="no">strict_group_size=True</code>, il sistema cercherà di restituire il numero di entità specificato (<code translate="no">group_size</code>) per ogni gruppo, a meno che non ci siano abbastanza dati in quel gruppo. Questa impostazione garantisce un conteggio coerente delle entità per gruppo, ma può comportare un calo delle prestazioni in caso di distribuzione non uniforme dei dati o di risorse limitate. Se non è necessario un numero rigido di entità, l'impostazione di <code translate="no">strict_group_size=False</code> può migliorare la velocità delle query.</p></li>
</ul>
