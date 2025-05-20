---
id: multi-vector-search.md
order: 2
summary: 이 가이드에서는 Milvus에서 하이브리드 검색을 수행하고 결과의 재순위를 이해하는 방법을 설명합니다.
title: 하이브리드 검색
---
<h1 id="Hybrid-Search" class="common-anchor-header">하이브리드 검색<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 2.4부터 다중 벡터 지원과 하이브리드 검색 프레임워크가 도입되어 사용자가 여러 개의 벡터 필드(최대 10개)를 하나의 컬렉션으로 가져올 수 있게 되었습니다. 서로 다른 열에 있는 이러한 벡터는 서로 다른 임베딩 모델에서 비롯되거나 서로 다른 처리 방법을 거친 데이터의 다양한 측면을 나타냅니다. 하이브리드 검색의 결과는 상호 순위 융합(RRF) 및 가중치 점수 등의 순위 재조정 전략을 사용해 통합됩니다. 순위 재조정 전략에 대해 자세히 알아보려면 순위 <a href="/docs/ko/v2.4.x/reranking.md">재조정을</a> 참조하세요.</p>
<p>이 기능은 사진, 음성, 지문 등과 같은 다양한 속성을 기반으로 벡터 라이브러리에서 가장 유사한 사람을 식별하는 등 포괄적인 검색 시나리오에서 특히 유용합니다.</p>
<p>이 튜토리얼에서는 그 방법을 배웁니다:</p>
<ul>
<li><p>서로 다른 벡터 필드에서 유사도 검색을 위한 여러 개의 <code translate="no">AnnSearchRequest</code> 인스턴스 만들기;</p></li>
<li><p>여러 <code translate="no">AnnSearchRequest</code> 인스턴스의 검색 결과를 결합하고 순위를 재조정하는 순위 재조정 전략을 구성합니다;</p></li>
<li><p>하이브리드 검색을 수행하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> 메서드를 사용하여 하이브리드 검색을 수행합니다.</p></li>
</ul>
<div class="alert note">
<p>이 페이지의 코드 스니펫은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM 모듈을</a> 사용하여 Milvus와 상호 작용합니다. 새로운 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK가</a> 포함된 코드 스니펫은 곧 제공될 예정입니다.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">준비 사항<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색을 시작하기 전에 여러 벡터 필드가 있는 컬렉션이 있는지 확인하세요. 현재 Milvus는 컬렉션당 4개의 벡터 필드를 기본값으로 제공하며, <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a> 구성을 수정하여 최대 10개까지 확장할 수 있습니다.</p>
<p>아래는 <code translate="no">filmVector</code> 과 <code translate="no">posterVector</code> 라는 두 개의 벡터 필드가 있는 <code translate="no">test_collection</code> 이라는 컬렉션을 만들고 여기에 임의의 엔티티를 삽입하는 예제입니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">1단계: 여러 개의 AnnSearchRequest 인스턴스 만들기<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색은 <code translate="no">hybrid_search()</code> API를 사용하여 한 번의 호출로 여러 개의 ANN 검색 요청을 수행합니다. 각 <code translate="no">AnnSearchRequest</code> 은 특정 벡터 필드에 대한 단일 검색 요청을 나타냅니다.</p>
<p>다음 예에서는 두 개의 벡터 필드에 대해 개별 유사도 검색을 수행하는 <code translate="no">AnnSearchRequest</code> 인스턴스 두 개를 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>매개변수</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(객체</em>)</p>
<p>ANN 검색 요청을 나타내는 클래스입니다. 각 하이브리드 검색에는 한 번에 1개에서 1,024개의 <code translate="no">ANNSearchRequest</code> 개체가 포함될 수 있습니다.</p></li>
<li><p><code translate="no">data</code> <em>(목록</em>)</p>
<p>단일 <code translate="no">AnnSearchRequest</code> 에서 검색할 쿼리 벡터입니다. 현재 이 매개변수는 단일 쿼리 벡터(예: <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>)만 포함된 목록을 허용합니다. 향후 이 매개변수는 여러 쿼리 벡터를 허용하도록 확장될 예정입니다.</p></li>
<li><p><code translate="no">anns_field</code> <em>(문자열</em>)</p>
<p>단일 <code translate="no">AnnSearchRequest</code> 에 사용할 벡터 필드의 이름입니다.</p></li>
<li><p><code translate="no">param</code> <em>(딕셔너리</em>)</p>
<p>단일 <code translate="no">AnnSearchRequest</code> 에 대한 검색 매개변수 딕셔너리입니다. 이러한 검색 매개변수는 단일 벡터 검색의 매개변수와 동일합니다. 자세한 내용은 <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">검색 매개변수를</a> 참조하세요.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>단일 <code translate="no">ANNSearchRequest</code> 에 포함할 검색 결과의 최대 개수입니다.</p>
<p>이 매개변수는 개별 <code translate="no">ANNSearchRequest</code> 내에서 반환할 검색 결과의 수에만 영향을 미치며 <code translate="no">hybrid_search</code> 호출에 대해 반환할 최종 결과는 결정하지 않습니다. 하이브리드 검색에서는 여러 <code translate="no">ANNSearchRequest</code> 인스턴스의 결과를 결합하고 순위를 재조정하여 최종 결과를 결정합니다.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">2단계: 재랭크 전략 구성하기<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AnnSearchRequest</code> 인스턴스를 만든 후 결과를 결합하고 순위를 재조정하는 재순위 전략을 구성합니다. 현재 <code translate="no">WeightedRanker</code> 과 <code translate="no">RRFRanker</code> 의 두 가지 옵션이 있습니다. 재랭크 전략에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/reranking.md">재랭크하기를</a> 참조하세요.</p>
<ul>
<li><p>가중 점수 사용</p>
<p><code translate="no">WeightedRanker</code> 은 지정된 가중치로 각 벡터 필드 검색 결과에 중요성을 할당하는 데 사용됩니다. 일부 벡터 필드를 다른 필드보다 우선순위를 지정하면 <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> 에서 이를 결합된 검색 결과에 반영할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">WeightedRanker</code> 을 사용할 때는 주의하세요:</p>
<ul>
<li>각 가중치 값은 0(가장 중요하지 않음)에서 1(가장 중요함)까지의 범위로 최종 집계 점수에 영향을 미칩니다.</li>
<li><code translate="no">WeightedRanker</code> 에 제공된 가중치 값의 총 개수는 생성한 <code translate="no">AnnSearchRequest</code> 인스턴스 수와 같아야 합니다.</li>
</ul></li>
<li><p>상호 순위 융합(RFF) 사용</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">3단계: 하이브리드 검색 수행<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AnnSearchRequest</code> 인스턴스와 순위 재조정 전략이 설정되면 <code translate="no">hybrid_search()</code> 방법을 사용하여 하이브리드 검색을 수행합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>매개변수</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(목록</em>)</p>
<p>검색 요청 목록으로, 각 요청은 <code translate="no">ANNSearchRequest</code> 객체입니다. 각 요청은 다른 벡터 필드와 다른 검색 매개변수 집합에 대응할 수 있습니다.</p></li>
<li><p><code translate="no">rerank</code> <em>(객체</em>)</p>
<p>하이브리드 검색에 사용할 재순위 전략입니다. 가능한 값: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> 및 <code translate="no">RRFRanker()</code>.</p>
<p>재랭크 전략에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/reranking.md">재랭크하기를</a> 참조하세요.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>하이브리드 검색에서 반환할 최종 결과의 최대 개수입니다.</p></li>
</ul>
<p>출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>일반적으로 각 컬렉션에는 기본적으로 최대 4개의 벡터 필드가 허용됩니다. 그러나 <code translate="no">proxy.maxVectorFieldNum</code> 구성을 조정하여 컬렉션의 최대 벡터 필드 수를 확장할 수 있는 옵션이 있으며, 컬렉션당 최대 10개의 벡터 필드로 제한됩니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">프록시 관련 구성을</a> 참조하세요.</p></li>
<li><p>컬렉션에서 부분적으로 인덱싱되거나 로드된 벡터 필드는 오류가 발생합니다.</p></li>
<li><p>현재 하이브리드 검색의 각 <code translate="no">AnnSearchRequest</code> 에는 하나의 쿼리 벡터만 포함할 수 있습니다.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>하이브리드 검색은 어떤 시나리오에서 권장되나요?</strong></p>
<p>하이브리드 검색은 높은 정확도가 요구되는 복잡한 상황, 특히 엔티티가 여러 개의 다양한 벡터로 표현될 수 있는 경우에 이상적입니다. 이는 문장과 같은 동일한 데이터가 서로 다른 임베딩 모델을 통해 처리되거나 개인의 이미지, 지문, 음성 등 복합적인 정보가 다양한 벡터 형식으로 변환되는 경우에 적용됩니다. 이러한 벡터에 가중치를 부여하면 그 영향력이 결합되어 기억력을 크게 향상시키고 검색 결과의 효율성을 높일 수 있습니다.</p></li>
<li><p><strong>가중치 랭킹러는 서로 다른 벡터 필드 간의 거리를 어떻게 정규화하나요?</strong></p>
<p>가중치 랭커는 각 필드에 할당된 가중치를 사용하여 벡터 필드 간의 거리를 정규화합니다. 가중치에 따라 각 벡터 필드의 중요도를 계산하여 가중치가 높은 필드의 우선순위를 지정합니다. 일관성을 보장하기 위해 ANN 검색 요청 전체에 동일한 메트릭 유형을 사용하는 것이 좋습니다. 이 방법을 사용하면 더 중요하다고 판단되는 벡터가 전체 순위에 더 큰 영향을 미치게 됩니다.</p></li>
<li><p><strong>코히어 랭커나 BGE 랭커와 같은 대체 랭커를 사용할 수 있나요?</strong></p>
<p>현재는 제공된 랭커만 지원됩니다. 향후 업데이트를 통해 추가 랭커를 포함할 계획이 진행 중입니다.</p></li>
<li><p><strong>여러 개의 하이브리드 검색 작업을 동시에 수행할 수 있나요?</strong></p>
<p>예, 여러 하이브리드 검색 연산의 동시 실행이 지원됩니다.</p></li>
<li><p><strong>하이브리드 검색을 수행하기 위해 여러 AnnSearchRequest 객체에서 동일한 벡터 필드를 사용할 수 있나요?</strong></p>
<p>예. 기술적으로 하이브리드 검색을 위해 여러 AnnSearchRequest 객체에서 동일한 벡터 필드를 사용할 수 있습니다. 하이브리드 검색을 위해 여러 개의 벡터 필드를 가질 필요는 없습니다.</p></li>
</ul>
