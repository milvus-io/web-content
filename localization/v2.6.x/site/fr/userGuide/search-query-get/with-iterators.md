---
id: with-iterators.md
title: Itérateur de recherche
summary: >-
  La recherche ANN a une limite maximale sur le nombre d'entités qui peuvent
  être rappelées dans une seule requête, et l'utilisation simple de la recherche
  ANN de base peut ne pas répondre aux exigences de la recherche à grande
  échelle. Pour les requêtes de recherche ANN dont le topK dépasse 16 384, il
  est conseillé d'utiliser le SearchIterator. Cette section présente
  l'utilisation du SearchIterator et les considérations qui s'y rapportent.
---
<h1 id="Search-Iterator" class="common-anchor-header">Itérateur de recherche<button data-href="#Search-Iterator" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche ANN a une limite maximale sur le nombre d'entités qui peuvent être rappelées dans une seule requête, et l'utilisation simple de la recherche ANN de base peut ne pas répondre aux exigences de la recherche à grande échelle. Pour les requêtes de recherche ANN dont le topK dépasse 16 384, il est conseillé d'utiliser l'itérateur de recherche. Cette section présente l'utilisation du SearchIterator et les considérations qui s'y rapportent.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Une requête Search renvoie des résultats de recherche, tandis qu'un SearchIterator renvoie un itérateur. Vous pouvez appeler la méthode <strong>next()</strong> de cet itérateur pour obtenir les résultats de la recherche.</p>
<p>Plus précisément, vous pouvez utiliser les itérateurs de recherche de la manière suivante :</p>
<ol>
<li><p>Créez un SearchIterator et définissez le <strong>nombre d'entités à renvoyer par demande de recherche</strong> et le <strong>nombre total d'entités à renvoyer</strong>.</p></li>
<li><p>Appelez la méthode <strong>next()</strong> du SearchIterator dans une boucle pour obtenir les résultats de la recherche de manière paginée.</p></li>
<li><p>Appelez la méthode <strong>close()</strong> de l'itérateur pour terminer la boucle si la méthode <strong>next()</strong> renvoie un résultat vide.</p></li>
</ol>
<h2 id="Create-SearchIterator" class="common-anchor-header">Créer un SearchIterator<button data-href="#Create-SearchIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>L'extrait de code suivant montre comment créer un SearchIterator.</p>
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
<p>Dans les exemples ci-dessus, vous avez fixé le nombre d'entités à renvoyer par recherche<strong>(</strong><strong>batch_size/batchSize</strong>) à 50, et le nombre total d'entités à renvoyer<strong>(topK</strong>) à 20 000.</p>
<h2 id="Use-SearchIterator" class="common-anchor-header">Utiliser le SearchIterator<button data-href="#Use-SearchIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que le SearchIterator est prêt, vous pouvez appeler sa méthode next() pour obtenir les résultats de la recherche de manière paginée.</p>
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
<p>Dans les exemples de code ci-dessus, vous avez créé une boucle infinie et appelé la méthode <strong>next()</strong> dans la boucle pour stocker les résultats de la recherche dans une variable et fermer l'itérateur lorsque <strong>next()</strong> ne renvoie rien.</p>
