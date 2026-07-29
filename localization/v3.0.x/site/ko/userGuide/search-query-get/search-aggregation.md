---
id: search-aggregation.md
title: 검색 집계Compatible with Milvus 3.0.x
summary: '벡터 검색 결과를 버킷별로 그룹화하고, 버킷별 지표를 계산하며, 버킷을 정렬한 후 대표적인 검색 결과를 반환합니다.'
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">검색 집계<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>쇼핑객이 “일상적인 훈련용 검은색 러닝화”를 검색할 때, 근사 최인접 이웃(ANN) 검색은 벡터 유사도에 따라 제품을 순위 매기고 평면적인 상위 K개 목록을 반환합니다. 결과는 관련성이 높을 수 있지만 반복적일 수 있습니다. 아래 예시에서, 상위 6개 결과 중 4개는 브랜드 A 제품인 반면, 브랜드 B와 브랜드 C는 각각 한 번씩만 나타납니다.</p>
<p>단순한 목록만으로는 버킷 중심의 요약 정보를 직접 제공할 수 없습니다. 애플리케이션에서는 유지된 후보 수나 평균 가격을 기준으로 브랜드를 비교하거나, 각 브랜드의 소수 대표 상품을 검토하거나, 결과를 여러 버킷 수준으로 구성해야 할 수도 있습니다.</p>
<p>검색 집계(Search Aggregation)는 선택된 스칼라 필드를 기반으로 유지된 ANN 후보들을 버킷으로 분류합니다. 이 예시에서 각 브랜드는 별도의 버킷이 됩니다. Milvus는 각 버킷에 대한 통계를 계산하고, 버킷을 순서대로 정렬하며, 대표 제품을 할당할 수 있습니다. 애플리케이션은 버킷 우선( <code translate="no">result.agg_buckets</code>) 방식을 통해 이 버킷 우선 응답을 활용합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>단순한 러닝화 검색 결과가 비교 가능한 브랜드 버킷 집합으로 변환됩니다</span>
  
 </span></p>
<p>검색 집계는 전체 컬렉션에 대한 정확한 집계를 수행하지 않습니다. 버킷의 존재 여부, 개수, 메트릭, 순서 및 대표 히트는 ANN 및 그룹화 단계에서 유지된 후보에 따라 달라집니다.</p>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>버킷 키별로 그룹화되고 개수, 메트릭 및 대표 히트와 함께 반환되는 ANN 후보</span>
  
 </span></p>
<ol>
<li><p><strong>후보 항목 검색.</strong> Milvus는 ANN 검색을 실행하여 쿼리 벡터와 가장 가까운 엔티티를 찾습니다. 그런 다음 그룹화 단계에서 각 전체 복합 키에 대해 제한된 수의 후보 항목을 유지합니다. 이 키별 후보 항목 할당량은 집계 트리 내 어디서나 <code translate="no">TopHits.size</code> 중 가장 큰 값이거나, <code translate="no">top_hits</code> 를 구성하는 레벨이 없을 경우 <code translate="no">1</code> 입니다.</p></li>
<li><p><strong>버킷 생성.</strong> <code translate="no">SearchAggregation.fields</code> 는 버킷 키를 정의합니다. 필드 값의 각 고유한 조합은 별도의 키를 생성합니다. 그림에서 <code translate="no">fields=[&quot;brand&quot;]</code> 는 <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, <code translate="no">(Brand C)</code> 버킷 키를 생성합니다. 동일한 키를 가진 유지된 후보들은 동일한 버킷에 속하며 해당 버킷의 <code translate="no">count</code> 에 기여합니다. <code translate="no">SearchAggregation.size</code> 는 Milvus가 반환하는 버킷의 수를 제한합니다.</p></li>
<li><p><strong>결과를 계산하고 반환합니다.</strong> 반환된 각 버킷에는 해당 키와 유지된 후보 개수가 포함됩니다. Milvus는 또한 구성된 메트릭을 계산하고, 버킷을 정렬하며, 대표적인 엔티티를 반환하고, 하위 버킷을 생성할 수도 있습니다. <code translate="no">result.agg_buckets</code> 내의 각 <code translate="no">AggregationBucket</code> 는 <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> 및 <code translate="no">sub_groups</code> 를 노출합니다. 검색 집계(Search Aggregation)가 활성화되면 일반 검색 적중 목록은 비어 있습니다.</p></li>
</ol>
<p>도표에서 <code translate="no">TopHits.size=4</code> 는 키당 4개의 후보 예산을 제공하므로, 유지된 4개의 브랜드 A 후보가 <code translate="no">count: 4</code> 를 생성합니다. 완성된 브랜드 A 카드는 도표를 간결하게 유지하기 위해 반환된 4개의 대표 검색 결과 중 2개만 표시합니다.</p>
<p><code translate="no">sub_aggregation</code> 를 사용하면 Milvus는 각 상위 버킷 내에서 2단계와 3단계를 반복합니다. ANN 리콜률이나 키별 후보 예산의 변경은 버킷 수, 메트릭, 정렬 순서, 검색 결과 및 중첩된 결과를 변경할 수 있습니다.</p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 집계(Search Aggregation)를 사용하기 전에 다음 제한 사항을 확인하십시오.</p>
<ul>
<li><p><strong>중첩 집계:</strong> 하나의 요청에는 하나의 루트 <code translate="no">SearchAggregation</code> 와 최대 3개의 중첩된 <code translate="no">sub_aggregation</code> 수준이 포함될 수 있으며, 총 4개 수준까지 가능합니다.</p></li>
<li><p><strong>버킷 키 생성에 사용되는 필드:</strong> <code translate="no">SearchAggregation.fields</code> 은 Boolean, integer, <code translate="no">VARCHAR</code> 및 <code translate="no">TIMESTAMPTZ</code> 필드를 지원합니다. <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, <code translate="no">TEXT</code>, vector 또는 dynamic 필드는 지원하지 않습니다.</p></li>
<li><p><strong>메트릭 필드:</strong> <code translate="no">count</code> 는 <code translate="no">&quot;*&quot;</code> 또는<code translate="no">JSON</code> 가 아니며 동적이지 않은 모든 필드를 허용하며, 필드가 지정된 경우 <code translate="no">NULL</code> 값은 건너뜁니다. <code translate="no">sum</code> 및 <code translate="no">avg</code> 는 정수 및 부동 소수점 필드를 허용합니다. <code translate="no">min</code> 및 <code translate="no">max</code> 는 추가로 문자열 및 <code translate="no">TIMESTAMPTZ</code> 필드를 허용합니다.</p></li>
<li><p><strong>Top Hits 정렬 필드:</strong> <code translate="no">TopHits.sort</code> 는 비교 가능한 부울, 정수, 부동 소수점, 문자열 및 <code translate="no">TIMESTAMPTZ</code> 필드와 <code translate="no">_score</code> 를 허용합니다. <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, 벡터 또는 동적 필드는 지원하지 않습니다.</p></li>
<li><p><strong>후보 예산:</strong> 집계 트리 내 어디에서든 가장 큰 <code translate="no">TopHits.size</code> 값은 전체 복합 키당 유지되는 후보의 수와 동일합니다. 어떤 레벨에서도 <code translate="no">top_hits</code> 가 구성되지 않은 경우, Milvus는 키당 하나의 후보를 유지합니다. 버킷 <code translate="no">count</code> 및 메트릭은 이러한 유지된 후보를 기반으로 계산되므로, <code translate="no">TopHits.size</code> 를 변경하면 해당 값도 변경될 수 있습니다.</p></li>
<li><p><strong>Null 허용 버킷 필드:</strong> <code translate="no">NULL</code> 값은 자체 버킷 키를 형성합니다. null 버킷을 제외하려면 검색 요청에 <code translate="no">brand is not null</code> 와 같은 필터를 추가하십시오.</p></li>
<li><p><strong>반복되는 필드:</strong> 동일한 필드는 두 개 이상의 <code translate="no">SearchAggregation.fields</code> 목록에 동시에 나타날 수 없습니다. 예를 들어, 루트 집계에서 <code translate="no">fields=[&quot;category&quot;]</code> 를 사용하는 경우, 중첩된 <code translate="no">sub_aggregation</code> 에서는 <code translate="no">fields=[&quot;category&quot;]</code> 를 함께 사용할 수 없습니다.</p></li>
<li><p><strong>지원되지 않는 조합:</strong> 검색 집계(Search Aggregation)는 검색 필터( <code translate="no">offset</code>), 검색 반복자(Search Iterators), 하이브리드 검색(Hybrid Search), 하이라이터(Highlighter) 또는 그룹화 검색(Grouping Search)과 결합할 수 없습니다.</p></li>
<li><p><strong>반환되는 항목:</strong> 구성된 결과 항목의 최대 개수를 10,000개 이하로 유지하십시오. 이 최대값은 다음과 같이 계산합니다.</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p><code translate="no">TopHits</code> 가 구성되지 않은 레벨이 없는 경우, 마지막 요소로 <code translate="no">1</code> 를 사용하십시오. 예를 들어, 쿼리 벡터 1개, 루트 버킷 10개, 루트 버킷당 자식 버킷 5개, 자식 버킷당 히트 2개인 경우, 구성된 최대값은 다음과 같습니다:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">검색 집계 사용<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>달성하고자 하는 목표에 따라 예제를 선택하십시오:</p>
<table>
<thead>
<tr><th>다음으로 이동하십시오</th><th>설명</th><th>주요 설정</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">버킷 비교 및 정렬</a></td><td>버킷별 통계를 계산하여 버킷을 비교한 다음, 반환된 버킷을 메트릭, 개수 또는 키 기준으로 정렬합니다.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">각 버킷의 대표적인 결과 표시</a></td><td>각 버킷에서 제한된 수의 엔티티를 반환하고, 해당 엔티티를 스칼라 필드 또는 벡터 점수에 따라 개별적으로 정렬합니다.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">여러 수준에서 결과 그룹화</a></td><td>결과를 상위 및 하위 버킷 수준으로 구성하여 여러 차원을 순차적으로 분석합니다.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>아래 예제에서는 브랜드, 카테고리, 색상, 가격 및 평점 필드가 포함된 제품 컬렉션을 사용합니다. 모든 브랜드 이름, 제품 이름, 가격, 평점 및 검색 결과는 합성된 예제 데이터입니다. 다음 섹션을 확장하여 컬렉션을 생성하고 공유 검색 변수를 정의하십시오.</p>
<p><details></p>
<p><summary>예제 컬렉션 설정</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>위의 설정은 벡터 인덱스와 검색 매개변수 모두에 대해 <code translate="no">COSINE</code> 를 구성합니다. 따라서 이후 예제에서는 <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> 를 사용하여 코사인 유사도가 높은 결과를 먼저 표시합니다. <code translate="no">L2</code> 와 같은 거리 측정 기준의 경우 <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> 를 사용하십시오.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">버킷 비교 및 정렬<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>계산된 통계를 사용하여 검색된 엔티티 그룹을 비교하고 버킷이 반환되는 순서를 제어해야 할 때 이 패턴을 사용합니다. 이 예제에서 Milvus는 <code translate="no">brand</code> 에 따라 검색된 제품을 그룹화하고, 각 브랜드 버킷에 대한 가격 지표를 계산한 다음, 평균 가격 순으로 버킷을 정렬합니다.</p>
<p>필드 값당 하나 이상의 엔티티를 반환하여 결과의 다양성만을 높이는 것이 목표라면, 대신 <a href="/docs/ko/grouping-search.md">‘그룹화 검색(Grouping Search)’을</a> 사용하십시오.</p>
<p>다음 구성은 최대 세 개의 브랜드 버킷을 생성하고, 각 버킷에 대한 메트릭을 계산한 후, 평균 가격 순으로 버킷을 정렬합니다:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MilvusClient.search()</code> 의 <code translate="no">search_aggregation</code> 매개변수에 객체를 전달합니다:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">search_aggregation</code> 가 설정되면, PyMilvus는 <code translate="no">result[0]</code> 에서 일반 엔티티 히트를 반환하지 않습니다. 대신 <code translate="no">result.agg_buckets[0]</code> 에서 버킷 응답을 읽어오십시오. <code translate="no">output_fields</code> 매개변수는 반환된 각 <code translate="no">AggregationHit.fields</code> 매핑에 어떤 스칼라 필드가 표시될지 제어합니다. Milvus는 <code translate="no">output_fields</code> 에 나열되지 않은 메트릭 소스 및 정렬 필드도 여전히 사용할 수 있습니다.</p>
<p><details></p>
<p><summary>버킷 출력 예시 보기</summary></p>
<p>다음 출력은 위의 요청에서 캡처한 것으로, 가독성을 위해 JSON 형식으로 직렬화되었습니다. PyMilvus는 JSON 대신 <code translate="no">AggregationBucket</code> 객체를 반환합니다. <code translate="no">key</code> 값은 <code translate="no">fields</code> 에 필드가 하나만 포함되어 있는 경우에도 항상 정렬된 키 구성 요소 목록입니다. 이를 통해 복합 키의 필드 순서가 유지됩니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>이 가이드에 소개된 단일 쿼리 벡터의 경우, <code translate="no">result.agg_buckets[0]</code> 에서 반환된 최상위 버킷을 확인하십시오. 각 버킷은 정렬된 키 구성 요소, retained-candidate <code translate="no">count</code>, 계산된 <code translate="no">metrics</code>, 대표 <code translate="no">hits</code> 및 <code translate="no">sub_groups</code> 에 포함된 중첩 버킷을 노출합니다.</p>
<p>다음과 같이 구성을 읽어옵니다:</p>
<table>
<thead>
<tr><th>설정</th><th>제어 대상</th><th>이 예시에서</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Milvus가 버킷 키를 생성하는 방식</td><td><code translate="no">brand</code> 의 고유한 값마다 버킷을 하나씩 생성합니다.</td></tr>
<tr><td><code translate="no">size</code></td><td>반환되는 버킷의 최대 개수</td><td>최대 3개의 브랜드 버킷을 반환합니다.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>각 버킷에 대해 계산되는 통계</td><td>상품 수, 평균 가격, 최저 가격을 계산합니다.</td></tr>
<tr><td><code translate="no">order</code></td><td>Milvus가 반환된 버킷을 정렬하는 방법</td><td>평균 가격 순으로 정렬한 후, 동점 시 버킷 키를 사용하여 순위를 결정합니다.</td></tr>
</tbody>
</table>
<p><code translate="no">search_aggregation</code> 가 설정된 경우 Milvus는 <code translate="no">limit</code> 를 무시합니다. 최상위 버킷의 수를 제어하려면 루트 <code translate="no">SearchAggregation.size</code> 값을 사용하십시오.</p>
<p>이러한 설정으로 Milvus는 <code translate="no">avg_price</code> 순서대로 내림차순으로 브랜드 B, 브랜드 A, 브랜드 C 버킷을 반환합니다. <code translate="no">_key</code> 기준은 버킷의 평균 가격이 동일한 경우에만 적용됩니다. 이 구성에서는 <code translate="no">top_hits</code> 가 정의되어 있지 않으므로, 모든 버킷의 <code translate="no">hits</code> 목록은 비어 있으며 키별 후보 예산은 <code translate="no">1</code> 입니다. 따라서 표시된 개수 및 메트릭은 브랜드당 하나의 유지된 후보를 나타냅니다. 집계 시 키별 메트릭 창을 더 넓게 설정해야 하는 경우, <code translate="no">top_hits</code> 를 더 큰 <code translate="no">TopHits.size</code> 로 구성하십시오.</p>
<p><details></p>
<p><summary>메트릭 및 정렬 규칙</summary></p>
<p>각 <code translate="no">SearchAggregation.metrics</code> 항목은 사용자 정의 별칭을 <code translate="no">{operation: source}</code> 에 매핑합니다:</p>
<table>
<thead>
<tr><th>소스</th><th>지원되는 작업</th><th>동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">JSON</code> 가 아니며 동적이지 않은 모든 필드</td><td><code translate="no">count</code></td><td><code translate="no">NULL</code> 가 아닌 소스 필드를 가진 후보를 집계합니다.</td></tr>
<tr><td>정수형 또는 실수형 필드</td><td><code translate="no">sum</code>, ` <code translate="no">avg</code>`, ` <code translate="no">min</code>`, <code translate="no">max</code></td><td>null이 아닌 유지된 값을 기준으로 계산합니다.</td></tr>
<tr><td>문자열 또는 <code translate="no">TIMESTAMPTZ</code> 필드</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>null이 아닌 유지된 값 중 최소값 또는 최대값을 선택합니다.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>버킷 내의 모든 유지된 후보를 집계합니다. 결과는 <code translate="no">bucket.count</code> 과 일치합니다.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>유지된 후보에 대한 ANN 유사도 또는 거리 값을 집계합니다.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> 다음 키를 허용합니다:</p>
<table>
<thead>
<tr><th>순서 키</th><th>의미</th></tr>
</thead>
<tbody>
<tr><td>메트릭 별칭</td><td><code translate="no">avg_price</code> 와 같이, <code translate="no">metrics</code> 에서 동일한 집계 수준에서 계산된 값을 기준으로 정렬합니다.</td></tr>
<tr><td><code translate="no">_count</code></td><td>각 버킷에 보존된 후보의 수에 따라 정렬합니다.</td></tr>
<tr><td><code translate="no">_key</code></td><td><code translate="no">_key</code> 라는 컬렉션 필드가 아닌 버킷 키를 기준으로 정렬합니다.</td></tr>
</tbody>
</table>
<p>각 <code translate="no">order</code> 항목은 키를 <code translate="no">&quot;asc&quot;</code> 또는 <code translate="no">&quot;desc&quot;</code> 에 매핑합니다. Milvus는 첫 번째 항목부터 마지막 항목까지 여러 항목을 평가합니다. <code translate="no">order</code> 를 생략하면 Milvus는 유지된 후보 집합의 버킷 검색 순서를 그대로 유지합니다.</p>
<p>벡터 일치 품질에 따라 버킷을 정렬하려면, 먼저 <code translate="no">_score</code> 에서 버킷 수준 메트릭을 계산한 다음, <code translate="no">order</code> 에서 해당 메트릭 별칭을 사용해야 합니다. 각 버킷에는 여러 엔티티 점수가 포함될 수 있으므로, <code translate="no">_score</code> 를 버킷 정렬 키로 직접 사용할 수는 없습니다. 예를 들어, <code translate="no">COSINE</code> 또는 <code translate="no">IP</code> 의 경우:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">L2</code> 를 사용하여 <code translate="no">_score</code> 의 최소값을 계산하고, 거리 값이 가장 작은 버킷이 먼저 오도록 메트릭 별칭을 오름차순으로 정렬합니다.</p>
<p></details></p>
<p><details></p>
<p><summary>복합 버킷 키 생성</summary></p>
<p>복합 버킷 키를 생성하려면 동일한 목록에 여러 필드 이름을 전달합니다:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성을 사용하면 <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code>, <code translate="no">(Brand B, white)</code> 과 같은 키가 생성될 수 있습니다. 두 엔티티는 두 값이 모두 일치할 때만 동일한 버킷을 공유합니다. Milvus는 목록의 순서를 유지하므로 <code translate="no">brand</code> 가 첫 번째 키 구성 요소이고 <code translate="no">color</code> 가 두 번째 키 구성 요소입니다. <code translate="no">order</code> 에서 <code translate="no">_key</code> 가 사용될 경우, Milvus는 복합 키 구성 요소를 동일한 순서로 비교합니다. 중첩된 목록은 지원되지 않으므로, 여러 문자열을 하나의 평면 목록으로 전달하십시오.</p>
<p><code translate="no">size=6</code> 는 이 집계 수준에서 반환되는 복합 버킷의 최대 개수입니다. 예제 데이터에는 5개의 서로 다른 브랜드-색상 조합이 포함되어 있으므로, 5개 모두 반환될 수 있습니다. <a href="#Limits">반환 항목 제한에서</a> 이 요청은 <code translate="no">1 query vector × 6 buckets × 1 = 6</code> 에 구성된 결과 항목을 기여합니다.</p>
<p><code translate="no">SearchAggregation.fields</code> 목록에 여러 필드가 포함되면 해당 집계 수준에서 복합 버킷 키가 생성됩니다. 부모-자식 버킷 계층 구조를 생성하려면 <a href="#Group-results-at-multiple-levels">중첩 집계를</a> 사용하십시오.</p>
<p></details></p>
<p>다음 예제에서는 ` <code translate="no">aggregation</code>`를 재정의합니다. 업데이트된 객체를 동일한 ` <code translate="no">search_aggregation</code> ` 매개변수에 전달하고 검색 호출을 다시 실행하십시오.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">각 버킷의 대표적인 결과 표시<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>애플리케이션에서 각 버킷의 실제 제품을 표시해야 하는 경우 대표적인 엔티티를 포함하십시오. 이 예제에서 Milvus는 각 브랜드 버킷에서 최대 두 개의 제품을 반환하며, 평점 순서대로 정렬한 다음 벡터 점수 순서대로 정렬합니다.</p>
<p><code translate="no">TopHits</code> 를 다음과 같이 구성하십시오:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>대표적인 검색 결과를 포함한 버킷 보기</summary></p>
<p>다음은 위 요청에서 추출한 브랜드 A 버킷으로, 가독성을 높이기 위해 JSON 형식으로 직렬화되었습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>매개변수</th><th>목적</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>선택 사항입니다. 이 집계 수준에 대한 대표 엔티티를 구성합니다. 생략할 경우, ` <code translate="no">bucket.hits</code> `는 비어 있으며 키별 후보 예산은 기본적으로 1로 설정됩니다.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>선택된 각 버킷에서 최대 두 개의 대표 엔티티를 반환하고, 전체 집계 트리에 대해 키별 후보 예산을 2로 설정합니다.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>나열된 기준을 사용하여 각 버킷 내의 엔티티를 정렬합니다.</td></tr>
</tbody>
</table>
<p>애플리케이션에 대표 엔티티가 필요하거나, 카운트 및 메트릭에 더 넓은 키별 후보 창이 필요한 경우 ` <code translate="no">top_hits</code> `를 구성하십시오. ` <code translate="no">TopHits.size</code> ` 값이 클수록 <a href="#Limits">`Limits</a>`에서 후보 예산과 반환되는 최대 항목 수 계산값이 모두 증가합니다.</p>
<p><code translate="no">SearchAggregation.order</code> <code translate="no">TopHits.sort</code> 는 각 버킷 내의 엔티티를 정렬하는 반면, 는 버킷을 정렬합니다. 정렬 순서는 및 메트릭을 위해 유지된 후보 항목에 영향을 미치지 않습니다. 는 지원되는 비교 가능한 스칼라 필드 이름과 ANN 유사도 또는 거리를 나타내는 내장 필드를 허용합니다. Milvus는 항목을 첫 번째부터 마지막까지 평가합니다. 이 예제에서는 에 따라 제품을 가장 높은 값에서 가장 낮은 값 순으로 정렬하며, 두 평점이 동일한 경우에만 를 사용합니다. 설정에서 를 사용하므로, 내림차순 을 적용하면 더 유사한 제품이 먼저 표시됩니다. <code translate="no">count</code> <code translate="no">TopHits.sort</code> <code translate="no">_score</code> <code translate="no">sort</code> <code translate="no">rating</code> <code translate="no">_score</code> <code translate="no">COSINE</code> <code translate="no">_score</code> </p>
<p><code translate="no">metrics</code> 또는 <code translate="no">TopHits.sort</code> 에서 사용하는 필드는 <code translate="no">output_fields</code> 에 반드시 포함될 필요는 없습니다. Milvus는 내부적으로 해당 필드를 가져오지만, <code translate="no">output_fields</code> 에 명시적으로 나열된 필드만 반환된 각 히트의 <code translate="no">fields</code> 매핑에 포함됩니다. 기본 키와 벡터 점수는 <code translate="no">AggregationHit.pk</code> 및 <code translate="no">AggregationHit.score</code> 를 통해 계속 사용할 수 있습니다.</p>
<p>반환된 각 <code translate="no">AggregationHit</code> 는 <code translate="no">pk</code> 에서 기본 키를, <code translate="no">score</code> 에서 벡터 점수를, <code translate="no">fields</code> 에서 요청된 출력 필드를 노출합니다.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">여러 수준에서 결과 그룹화<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>한 수준 내의 버킷이 다른 수준 내에 포함되어야 할 때는 중첩 집계(nested aggregation)를 사용합니다. 이 예시에서 Milvus는 먼저 카테고리 버킷을 생성한 다음, 각 카테고리 내에 브랜드 버킷을 생성합니다.</p>
<p>자식 집계는 부모 버킷에 할당된 엔티티만 수신합니다. <code translate="no">fields</code> 는 각 집계 수준에서 버킷 키를 제어하며, <code translate="no">sub_aggregation</code> 는 부모-자식 계층 구조를 생성합니다.</p>
<p>아래 구성은 키가 <code translate="no">(running_shoes)</code> 인 카테고리 버킷을 생성합니다. 해당 상위 버킷 내에서 자식 집계는 <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, <code translate="no">(Brand C)</code> 과 같은 키를 가진 별도의 브랜드 버킷을 생성합니다.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>각 레벨은 여러 필드를 독립적으로 사용할 수 있습니다. 예를 들어, 자식 집계에서 <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> 을 사용하면 <code translate="no">(Brand A, black)</code> 과 같은 복합 자식 키가 생성됩니다.</p>
<p>다음 구성은 이 계층 구조를 구현합니다:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>중첩된 버킷 결과 보기</summary></p>
<p>다음 직렬화된 발췌문은 <code translate="no">running_shoes</code> 상위 버킷과 그 하위 버킷인 Brand B를 보여줍니다. 간결성을 위해 Brand A 및 Brand C 하위 버킷은 생략되었습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>표시된 결과는 단일 복합 버킷 키인 <code translate="no">(running_shoes, Brand B)</code> 이 아니라 버킷 경로 <code translate="no">(running_shoes) → (Brand B)</code> 을 나타냅니다.</p>
<p>Milvus는 먼저 <code translate="no">product_count</code> 순서로 정렬된 최대 두 개의 카테고리 버킷을 선택합니다. 그런 다음 선택된 각 카테고리 내에서 <code translate="no">sub_aggregation</code> 을 독립적으로 실행하고, <code translate="no">avg_rating</code> 순서로 정렬된 최대 세 개의 브랜드 버킷을 반환합니다.</p>
<p>위의 출력 결과에서:</p>
<ul>
<li>루트 <code translate="no">running_shoes</code> 버킷은 하위 복합 키에 걸쳐 4개의 유지된 후보를 포함합니다. 해당 <code translate="no">metrics</code> 에는 루트 수준의 <code translate="no">avg_price</code> 및 <code translate="no">product_count</code> 값이 포함됩니다.</li>
<li>루트 버킷의 <code translate="no">sub_groups</code> 목록에는 하위 브랜드 버킷들이 포함되어 있습니다. 표시된 Brand B 버킷에는 유지된 후보 1개와 해당 버킷 자체의 <code translate="no">avg_rating</code> 및 <code translate="no">brand_count</code> 값이 포함되어 있습니다.</li>
<li>루트 버킷의 <code translate="no">hits</code> 목록은 루트 집계에서 <code translate="no">top_hits</code> 가 구성되지 않았기 때문에 비어 있습니다. 브랜드 B 하위 버킷에는 <code translate="no">sub_aggregation</code> 에서 <code translate="no">top_hits</code> 가 구성되어 있으므로 대표적인 히트가 포함되어 있습니다.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">버킷 카운트 및 메트릭의 정확도는 어느 정도인가요?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 집계는 유지된 ANN 후보를 요약합니다. 전체 컬렉션에 대한 집계를 실행하지는 않습니다.</p>
<p>후보 유지에는 두 단계의 근사화 과정이 있습니다. ANN 검색은 관련 컬렉션 엔티티를 생략할 수 있으며, 그룹화 단계에서는 각 전체 복합 키에 대해 최대 <code translate="no">TopHits.size</code> 개의 후보만 유지합니다. 어떤 레벨에서도 <code translate="no">top_hits</code> 가 구성되지 않은 경우, 키당 제한은 1개입니다.</p>
<p>예를 들어, 컬렉션에 브랜드 A 제품이 5,000개 포함되어 있고 그중 다수가 벡터 쿼리와 관련이 있다고 가정해 보겠습니다. 집계에서 ` <code translate="no">TopHits(size=4)</code>`를 사용하는 경우, 브랜드 A 버킷은 전체 복합 키에 대해 최대 4개의 후보만 유지할 수 있습니다. 이 버킷의 ` <code translate="no">count</code> ` 및 메트릭은 유지된 후보들을 설명하며, 모든 관련 브랜드 A 제품이나 5,000개의 컬렉션 엔티티 전체를 설명하는 것은 아닙니다.</p>
<p><code translate="no">order</code> 가 메트릭 별칭을 사용할 때 근사치의 중요성이 가장 큽니다. 검색 리콜의 변화는 메트릭 값을 변경할 수 있으며, 결과적으로 <code translate="no">SearchAggregation.size</code> 내에 포함되는 버킷을 변경할 수 있습니다. 중첩 집계는 각 자식 레벨이 부모 버킷에 있는 엔티티를 대상으로 작동하기 때문에 이러한 효과를 증폭시킬 수 있습니다.</p>
<p>일치하는 모든 엔티티에 대한 정확한 통계가 필요한 경우, 검색 집계 대신 정확한 쿼리 집계 워크플로를 사용하십시오.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">검색 집계는 그룹화 검색과 어떻게 다른가요?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>애플리케이션의 주요 결과 형식에 따라 선택하십시오:</p>
<table>
<thead>
<tr><th>주요 요구 사항</th><th>권장</th><th>활용할 결과 형식</th></tr>
</thead>
<tbody>
<tr><td>그룹화 필드에서 중복 값이 적은 표준 순위 엔티티 목록을 반환</td><td><a href="/docs/ko/grouping-search.md">그룹화 검색</a></td><td>각 쿼리 벡터에 대한 플랫 검색 결과</td></tr>
<tr><td>키, 개수, 메트릭, 정렬 순서, 대표 검색 결과 또는 하위 버킷을 사용하여 그룹을 버킷으로 검사하거나 비교</td><td>검색 집계</td><td><code translate="no">AggregationBucket</code> 내의 객체 <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>검색 집계에서 ` <code translate="no">top_hits</code>`를 구성하더라도, 주요 응답은 여전히 버킷 트리입니다. 애플리케이션이 이미 일반 검색 결과를 처리하고 있으며 주로 결과의 다양성을 원하는 경우, 그룹화 검색은 여전히 유용합니다.</p>
<p>이 API들은 상호 배타적입니다. PyMilvus는 동일한 요청에서 <code translate="no">search_aggregation</code> 가 <code translate="no">group_by_field</code> 또는 <code translate="no">group_by_fields</code> 와 결합될 경우 <code translate="no">ParamError</code> 를 발생시킵니다.</p>
