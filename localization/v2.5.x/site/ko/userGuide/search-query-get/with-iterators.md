---
id: with-iterators.md
order: 4
summary: Milvus는 대량의 엔터티로 결과를 반복할 수 있는 검색 및 쿼리 반복기를 제공합니다.
title: 이터레이터 사용
---
<h1 id="Search-Iterator​" class="common-anchor-header">검색 이터레이터<button data-href="#Search-Iterator​" class="anchor-icon" translate="no">
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
    </button></h1><p>ANN 검색은 단일 쿼리에서 불러올 수 있는 엔티티 수에 최대 제한이 있으며, 기본 ANN 검색만으로는 대규모 검색 수요를 충족하지 못할 수 있습니다. topK가 16,384개를 초과하는 ANN 검색 요청의 경우 SearchIterator 사용을 고려하는 것이 좋습니다. 이 섹션에서는 SearchIterator를 사용하는 방법과 관련 고려 사항을 소개합니다.</p>
<h2 id="Overview​" class="common-anchor-header">개요<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Search 요청은 검색 결과를 반환하는 반면 SearchIterator는 반복자를 반환합니다. 이 이터레이터의 <strong>다음()</strong> 메서드를 호출하여 검색 결과를 가져올 수 있습니다.</p>
<p>구체적으로 SearchIterator를 다음과 같이 사용할 수 있습니다.</p>
<ol>
<li><p>SearchIterator를 생성하고 <strong>검색 요청당 반환할 엔티티 수와</strong> <strong>반환할 총 엔티티 수를</strong> 설정합니다.</p></li>
<li><p>SearchIterator의 <strong>next()</strong> 메서드를 루프에서 호출하여 페이지 매김 방식으로 검색 결과를 가져옵니다.</p></li>
<li><p><strong>다음()</strong> 메서드가 빈 결과를 반환하면 이터레이터의 <strong>close()</strong> 메서드를 호출하여 루프를 종료합니다.</p></li>
</ol>
<h2 id="Create-SearchIterator​" class="common-anchor-header">SearchIterator 만들기<button data-href="#Create-SearchIterator​" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 SearchIterator를 만드는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus import connections, Collection​
​
connections.connect(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-meta"># create iterator​</span>
query_vectors = [​
    [<span class="hljs-meta">0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592</span>]]​
​
collection = Collection(<span class="hljs-string">&quot;iterator_collection&quot;</span>)​
​
iterator = collection.search_iterator(​
    data=query_vectors,​
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,​
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    batch_size=<span class="hljs-number">50</span>,​
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>],​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    limit=<span class="hljs-number">20000</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.orm.iterator.SearchIterator;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam.MetricType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchIterator</span> <span class="hljs-variable">searchIterator</span> <span class="hljs-operator">=</span> client.searchIterator(SearchIteratorReq.builder()​
        .collectionName(<span class="hljs-string">&quot;iterator_collection&quot;</span>)​
        .vectors(Collections.singletonList(queryVector))​
        .vectorFieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .batchSize(<span class="hljs-number">500L</span>)​
        .outputFields(Lists.newArrayList(<span class="hljs-string">&quot;color&quot;</span>))​
        .topK(<span class="hljs-number">20000</span>)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<p>위의 예제에서는 검색당 반환할 엔티티 수<strong>(</strong><strong>batch_size/batchSize</strong>)를 50으로, 반환할 총 엔티티 수<strong>(topK</strong>)를 20,000으로 설정했습니다.</p>
<h2 id="Use-SearchIterator​" class="common-anchor-header">SearchIterator 사용<button data-href="#Use-SearchIterator​" class="anchor-icon" translate="no">
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
    </button></h2><p>SearchIterator가 준비되면 다음() 메서드를 호출하여 페이지 매김 방식으로 검색 결과를 가져올 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python">results = []​
​
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:​
    <span class="hljs-comment"># highlight-next-line​</span>
    result = iterator.<span class="hljs-built_in">next</span>()​
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:​
        <span class="hljs-comment"># highlight-next-line​</span>
        iterator.close()​
        <span class="hljs-keyword">break</span>​
    ​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:​
        results.append(hit.to_dict())​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;​
​
while (<span class="hljs-literal">true</span>) {​
    List&lt;QueryResultsWrapper.RowRecord&gt; res = searchIterator.next();​
    <span class="hljs-keyword">if</span> (res.isEmpty()) {​
        searchIterator.<span class="hljs-built_in">close</span>();​
        <span class="hljs-keyword">break</span>;​
    }​
​
    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord record : res) {​
        System.out.<span class="hljs-built_in">println</span>(record);​
    }​
}​

<button class="copy-code-btn"></button></code></pre>
<p>위의 코드 예제에서는 무한 루프를 생성하고 루프에서 <strong>다음()</strong> 메서드를 호출하여 검색 결과를 변수에 저장하고 <strong>다음()</strong> 이 아무것도 반환하지 않으면 반복기를 닫았습니다.</p>
