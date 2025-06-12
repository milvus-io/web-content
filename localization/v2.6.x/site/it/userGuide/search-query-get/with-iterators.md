---
id: with-iterators.md
title: Iteratore di ricerca
summary: >-
  La ricerca ANN ha un limite massimo al numero di entità che possono essere
  richiamate in una singola query e il semplice utilizzo della ricerca ANN di
  base potrebbe non soddisfare le esigenze di un recupero su larga scala. Per le
  richieste di ricerca ANN in cui topK supera i 16.384, è consigliabile
  considerare l'uso del SearchIterator. Questa sezione illustra come utilizzare
  il SearchIterator e le relative considerazioni.
---
<h1 id="Search-Iterator" class="common-anchor-header">Iteratore di ricerca<button data-href="#Search-Iterator" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca ANN ha un limite massimo al numero di entità che possono essere richiamate in una singola query e il semplice utilizzo della ricerca ANN di base potrebbe non soddisfare le esigenze di un recupero su larga scala. Per le richieste di ricerca ANN in cui topK supera i 16.384, è consigliabile considerare l'uso del SearchIterator. Questa sezione presenta come utilizzare il SearchIterator e le relative considerazioni.</p>
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
    </button></h2><p>Una richiesta di ricerca restituisce i risultati della ricerca, mentre un SearchIterator restituisce un iteratore. È possibile chiamare il metodo <strong>next()</strong> di questo iteratore per ottenere i risultati della ricerca.</p>
<p>In particolare, si possono usare i SearchIterator come segue:</p>
<ol>
<li><p>Creare un SearchIterator e impostare <strong>il numero di entità da restituire per ogni richiesta di ricerca</strong> e il <strong>numero totale di entità da restituire</strong>.</p></li>
<li><p>Chiamare il metodo <strong>next()</strong> del SearchIterator in un ciclo per ottenere i risultati della ricerca in modo impaginato.</p></li>
<li><p>Chiamare il metodo <strong>close()</strong> dell'iteratore per terminare il ciclo se il metodo <strong>next()</strong> restituisce un risultato vuoto.</p></li>
</ol>
<h2 id="Create-SearchIterator" class="common-anchor-header">Creare un iteratore di ricerca<button data-href="#Create-SearchIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>Il seguente frammento di codice mostra come creare un SearchIterator.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection

connections.connect(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># create iterator</span>
query_vectors = [
    [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]]

collection = Collection(<span class="hljs-string">&quot;iterator_collection&quot;</span>)

iterator = collection.search_iterator(
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},
<span class="highlighted-wrapper-line">    batch_size=<span class="hljs-number">50</span>,</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>],
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">20000</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.orm.iterator.SearchIterator;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam.MetricType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchIterator</span> <span class="hljs-variable">searchIterator</span> <span class="hljs-operator">=</span> client.searchIterator(SearchIteratorReq.builder()
        .collectionName(<span class="hljs-string">&quot;iterator_collection&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .vectorFieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .batchSize(<span class="hljs-number">500L</span>)
        .outputFields(Lists.newArrayList(<span class="hljs-string">&quot;color&quot;</span>))
        .topK(<span class="hljs-number">20000</span>)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-keyword">const</span> queryVectors = [
[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],
];
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&#x27;iterator_collection&#x27;</span>;

<span class="hljs-keyword">const</span> iterator = milvusClient.<span class="hljs-title function_">searchIterator</span>({
    <span class="hljs-attr">collection_name</span>: collectionName,
    <span class="hljs-attr">vectors</span>: queryVectors,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;L2&#x27;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">16</span> } },
    <span class="hljs-attr">batch_size</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;color&#x27;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">20000</span>,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Negli esempi precedenti, si è impostato il numero di entità da restituire per ogni ricerca<strong>(</strong><strong>batch_size/batchSize</strong>) a 50 e il numero totale di entità da restituire<strong>(topK</strong>) a 20.000.</p>
<h2 id="Use-SearchIterator" class="common-anchor-header">Utilizzare SearchIterator<button data-href="#Use-SearchIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che il SearchIterator è pronto, si può chiamare il suo metodo next() per ottenere i risultati della ricerca in modo impaginato.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">results = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
<span class="highlighted-wrapper-line">    result = iterator.<span class="hljs-built_in">next</span>()</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:
<span class="highlighted-wrapper-line">        iterator.close()</span>
        <span class="hljs-keyword">break</span>
    
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        results.append(hit.to_dict())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    List&lt;QueryResultsWrapper.RowRecord&gt; res = searchIterator.next();
    <span class="hljs-keyword">if</span> (res.isEmpty()) {
        searchIterator.close();
        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">for</span> <span class="hljs-title function_">await</span> (<span class="hljs-keyword">const</span> result <span class="hljs-keyword">of</span> iterator) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Negli esempi di codice precedenti, si è creato un ciclo infinito e si è chiamato il metodo <strong>next()</strong> nel ciclo per memorizzare i risultati della ricerca in una variabile e chiudere l'iteratore quando <strong>next()</strong> non restituisce nulla.</p>
