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
    </button></h1><p>쇼핑객이 “일상적인 훈련용 검은색 러닝화”를 검색할 때, 근사 최인접 이웃(ANN) 검색은 벡터 유사도에 따라 제품을 순위 매기고 평면적인 상위 K개 목록을 반환합니다. 결과는 관련성이 높을 수 있지만 반복적일 수 있습니다. 아래 예시에서, 상위 6개 결과 중 4개는 나이키 제품인 반면, 아디다스와 푸마는 각각 한 번씩만 나타납니다.</p>
<p>단순한 목록만으로는 브랜드 수준의 다양성이나 통계를 직접적으로 제공할 수 없습니다. 애플리케이션에서는 각 브랜드당 최대 두 개의 대표 상품, 브랜드별 검색된 상품 수, 또는 브랜드별 평균 가격 등의 정보가 필요할 수 있습니다.</p>
<p>검색 집계(Search Aggregation)는 선택된 스칼라 필드를 기반으로 검색된 엔티티를 버킷으로 분류합니다. 이 예시에서 각 브랜드는 별도의 버킷이 됩니다. 그러면 Milvus는 각 버킷에 대해 독립적으로 통계를 계산하고 각 버킷의 대표 제품을 반환하여, 검색 결과를 더 쉽게 비교할 수 있고 더 다양하게 만들 수 있습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>단조로운 운동화 검색 결과가 비교 가능한 브랜드 버킷 집합으로 변환됩니다</span>
  
 </span></p>
<p>검색 집계는 컬렉션 내의 모든 엔티티가 아닌, 검색된 후보 항목들을 요약합니다. 따라서 버킷 수와 지표는 대략적인 값이며 벡터 관련성과 밀접하게 연관되어 있습니다.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="Three-stage Search Aggregation workflow from ANN retrieval to bucket results" class="doc-image" id="three-stage-search-aggregation-workflow-from-ann-retrieval-to-bucket-results" /> 
   <span>ANN 검색부터 버킷 결과에 이르는 3단계 검색 집계 워크플로우</span>
  
 </span></p>
<ol>
<li><p><strong>후보 검색.</strong> Milvus는 ANN 검색을 실행하여 쿼리 벡터와 가장 가까운 엔티티로 구성된 검색 풀을 생성합니다. 검색 집계는 컬렉션 내의 모든 엔티티가 아닌 이 풀을 대상으로 수행되므로, 풀이 버킷에 포함될 엔티티를 결정합니다.</p></li>
<li><p><strong>버킷 구축.</strong> <code translate="no">SearchAggregation.fields</code> 는 각 버킷 키를 구성하는 스칼라 필드를 지정합니다. 그림에서 <code translate="no">brand</code> 는 6개의 후보 엔티티를 Nike, Adidas, Puma 버킷에 배치합니다. 여러 필드를 지정할 경우, 엔티티는 필드-값 조합이 일치할 때만 동일한 버킷에 포함됩니다.</p></li>
<li><p><strong>결과 계산 및 반환.</strong> Milvus는 각 버킷에 대해 구성된 메트릭을 계산하고, 완성된 버킷을 정렬한 다음, ` <code translate="no">TopHits</code> `를 사용하여 대표적인 엔티티를 선택합니다. <code translate="no">result.agg_buckets</code> 의 각 버킷에는 키, 개수, 메트릭, 히트 수 및 선택적 하위 버킷이 포함됩니다.</p></li>
</ol>
<p><code translate="no">sub_aggregation</code> 를 사용하면 Milvus는 각 상위 버킷 내에서 2단계와 3단계를 반복합니다. 모든 단계가 ANN 검색 풀에서 수행되므로, 검색 리콜의 변화에 따라 버킷 수, 메트릭, 정렬 순서, 히트 수 및 중첩된 결과가 변경될 수 있습니다.</p>
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
<li><p><strong>중첩 집계:</strong> 하나의 요청에는 하나의 루트 <code translate="no">SearchAggregation</code> 와 최대 세 개의 중첩된 <code translate="no">sub_aggregation</code> 수준이 포함될 수 있으며, 총 4단계까지 가능합니다.</p></li>
<li><p><strong>버킷 키 생성에 사용되는 필드:</strong> <code translate="no">SearchAggregation.fields</code> 은 <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, vector, <code translate="no">JSON</code> 또는 동적 필드를 지원하지 않습니다.</p></li>
<li><p><strong>메트릭 및 정렬 필드:</strong> <code translate="no">metrics</code> 및 <code translate="no">TopHits.sort</code> 은 <code translate="no">JSON</code> 또는 동적 필드를 지원하지 않습니다.</p></li>
<li><p><strong>반복 필드:</strong> 동일한 필드는 두 개 이상의 <code translate="no">SearchAggregation.fields</code> 목록에 나타날 수 없습니다. 예를 들어, 루트 집계에서 <code translate="no">fields=[&quot;category&quot;]</code> 를 사용하는 경우, 중첩된 <code translate="no">sub_aggregation</code> 에서는 <code translate="no">fields=[&quot;category&quot;]</code> 를 함께 사용할 수 없습니다.</p></li>
<li><p><strong>지원되지 않는 조합:</strong> 검색 집계(Search Aggregation)는 검색 필터( <code translate="no">offset</code>), 검색 반복자(Search Iterators), 하이브리드 검색(Hybrid Search), 하이라이터(Highlighter), 검색 필터( <code translate="no">group_by_field</code>) 또는 중첩된 검색 필터( <code translate="no">group_by_fields</code>)와 함께 사용할 수 없습니다.</p></li>
<li><p><strong>반환되는 항목:</strong> 구성된 결과 항목의 최대 개수를 10,000개 이하로 유지하십시오. 이 최대값은 다음과 같이 계산합니다.</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>어떤 레벨에서도 <code translate="no">TopHits</code> 가 구성되지 않은 경우, 마지막 요소로 <code translate="no">1</code> 를 사용하십시오. 예를 들어, 쿼리 벡터 1개, 루트 버킷 10개, 루트 버킷당 자식 버킷 5개, 자식 버킷당 히트 2개인 경우, 구성된 최대값은 다음과 같습니다:</p>
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
    </button></h2><p>구성하려는 내용에 맞는 예제를 선택하십시오:</p>
<table>
<thead>
<tr><th>목표</th><th>주요 설정</th><th>예시</th></tr>
</thead>
<tbody>
<tr><td>버킷 키 생성</td><td><code translate="no">fields</code>, <code translate="no">size</code></td><td><a href="#build-bucket-keys">버킷 키 생성</a></td></tr>
<tr><td>통계 계산 및 버킷 정렬</td><td><code translate="no">metrics</code>, <code translate="no">order</code></td><td><a href="#calculate-metrics-and-order-buckets">메트릭 계산 및 버킷 정렬</a></td></tr>
<tr><td>대표적인 히트 반환 및 정렬</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td><td><a href="#return-and-sort-representative-hits">대표 히트 반환 및 정렬</a></td></tr>
<tr><td>계층적 결과 생성</td><td><code translate="no">sub_aggregation</code></td><td><a href="#create-nested-buckets">중첩된 버킷 생성</a></td></tr>
</tbody>
</table>
<p>아래 예제에서는 브랜드, 카테고리, 색상, 가격 및 평점 필드가 포함된 제품 컬렉션을 사용합니다. 다음 섹션을 확장하여 컬렉션을 생성하고 공유 검색 변수를 정의하십시오.</p>
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
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Puma Velocity Nitro&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Puma&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Windrunner Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Own The Run Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Vomero 17&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike InfinityRN 4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.flush(collection_name)
client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>위의 설정은 벡터 인덱스와 검색 매개변수 모두에 대해 ‘ <code translate="no">COSINE</code> ’를 구성합니다. 따라서 이후 예제에서는 ‘ <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> ’를 사용하여 코사인 유사도가 더 높은 결과를 먼저 배치합니다. ‘ <code translate="no">L2</code> ’와 같은 거리 측정 기준의 경우 ‘ <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> ’를 사용하십시오.</p>
<h3 id="Build-bucket-keys" class="common-anchor-header">버킷 키 생성<button data-href="#Build-bucket-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저 <code translate="no">SearchAggregation</code> 객체를 생성합니다. 다음 구성은 서로 다른 <code translate="no">brand</code> 값마다 하나의 버킷을 생성하고, 반환할 버킷을 최대 3개까지 선택합니다:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span>
    size=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>일반적으로 사용되는 매개변수는 다음과 같습니다:</p>
<table>
<thead>
<tr><th>매개변수</th><th>이 예제의 값</th><th>용도</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td><code translate="no">[&quot;brand&quot;]</code></td><td>버킷 키를 구성하는 스칼라 필드의 비어 있지 않은 목록입니다. 필드 하나가 1부분 키를 생성합니다.</td></tr>
<tr><td><code translate="no">size</code></td><td><code translate="no">3</code></td><td>이 집계 수준에서 반환되는 버킷의 최대 개수입니다.</td></tr>
</tbody>
</table>
<p>이 객체를 ` <code translate="no">MilvusClient.search()</code>`의 ` <code translate="no">search_aggregation</code> ` 매개변수에 전달합니다:</p>
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
<p><details></p>
<p><summary>버킷 출력 예시 보기</summary></p>
<p>다음 출력은 위 요청에서 캡처한 것으로, 가독성을 위해 JSON으로 직렬화되었습니다. PyMilvus는 JSON 대신 <code translate="no">AggregationBucket</code> 객체를 반환합니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Puma&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>이 가이드의 단일 쿼리 벡터의 경우, <code translate="no">result.agg_buckets[0]</code> 에서 반환된 최상위 버킷을 확인하십시오. 각 버킷은 <code translate="no">key</code>, 검색 풀 엔티티 <code translate="no">count</code>, 계산된 값 <code translate="no">metrics</code>, 대표값 <code translate="no">hits</code> 및 <code translate="no">sub_groups</code> 에 포함된 중첩 버킷을 노출합니다.</p>
<p>다음 섹션에서는 다른 사용 사례를 위해 <code translate="no">aggregation</code> 을 재정의합니다. 업데이트된 객체를 동일한 <code translate="no">search_aggregation</code> 매개변수에 전달하고 검색 호출을 다시 실행하십시오.</p>
<p><code translate="no">search_aggregation</code> 가 설정된 경우 Milvus는 <code translate="no">limit</code> 를 무시합니다. 최상위 버킷의 수를 제어하려면 루트 <code translate="no">SearchAggregation.size</code> 값을 사용하십시오.</p>
<p>복합 버킷 키를 생성하려면 동일한 목록에 여러 필드 이름을 전달하십시오:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성을 통해 <code translate="no">(Nike, black)</code>, <code translate="no">(Nike, blue)</code>, <code translate="no">(Adidas, white)</code> 와 같은 키가 생성될 수 있습니다. 두 엔티티는 두 값이 모두 일치할 때만 동일한 버킷을 공유합니다. Milvus는 목록 순서를 유지하므로 <code translate="no">brand</code> 가 첫 번째 키 구성 요소이고 <code translate="no">color</code> 가 두 번째 키 구성 요소입니다. 중첩된 목록은 지원되지 않으므로 여러 문자열을 하나의 평면 목록으로 전달하십시오.</p>
<p><code translate="no">size=6</code> 는 이 집계 수준에서 반환되는 복합 버킷의 최대 개수입니다. 예제 데이터에는 5개의 서로 다른 브랜드-색상 조합이 포함되어 있으므로, 5개 모두 반환될 수 있습니다. <a href="#limits">반환 항목 제한에서</a>, 이 요청은 <code translate="no">1 query vector × 6 buckets × 1 = 6</code> 로 구성된 결과 항목을 기여합니다.</p>
<h3 id="Calculate-metrics-and-order-buckets" class="common-anchor-header">메트릭 계산 및 버킷 정렬<button data-href="#Calculate-metrics-and-order-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>버킷 통계 및 결정론적 버킷 순서가 필요한 경우 <code translate="no">metrics</code> 및 <code translate="no">order</code> 를 추가하십시오:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
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
<p><strong>버킷 메트릭을 정의합니다.</strong></p>
<p>각 <code translate="no">SearchAggregation.metrics</code> 항목은 사용자 정의 별칭을 <code translate="no">{operation: source}</code> 에 매핑합니다:</p>
<table>
<thead>
<tr><th>별칭</th><th>작업</th><th>소스</th><th>결과</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">product_count</code></td><td><code translate="no">count</code></td><td><code translate="no">&quot;*&quot;</code></td><td>버킷에 할당된 모든 검색 풀 엔티티를 집계합니다.</td></tr>
<tr><td><code translate="no">avg_price</code></td><td><code translate="no">avg</code></td><td><code translate="no">price</code></td><td><code translate="no">price</code> 값 중 null이 아닌 값들의 평균을 계산합니다.</td></tr>
<tr><td><code translate="no">min_price</code></td><td><code translate="no">min</code></td><td><code translate="no">price</code></td><td><code translate="no">price</code> 값 중 가장 낮은 null이 아닌 값을 반환합니다.</td></tr>
</tbody>
</table>
<p>검색 집계는 다음과 같은 메트릭 연산을 지원합니다:</p>
<ul>
<li><code translate="no">count</code> 특수 소스 <code translate="no">&quot;*&quot;</code> 를 받아 버킷 내의 모든 엔티티를 집계하거나, 필드 이름을 받아 해당 필드 값이 <code translate="no">NULL</code> 가 아닌 엔티티를 집계합니다. 예를 들어, 버킷에 10개의 엔티티가 있고 그중 두 개의 <code translate="no">price</code> 가 <code translate="no">NULL</code> 로 설정된 경우, 소스가 <code translate="no">&quot;*&quot;</code> 인 <code translate="no">count</code> 메트릭은 10을 반환하는 반면, 소스가 <code translate="no">&quot;price&quot;</code> 인 메트릭은 8을 반환합니다.</li>
<li><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code> 및 <code translate="no">max</code> 는 지원되는 숫자형 필드 또는 ANN 유사도 또는 거리를 나타내는 내장 소스 <code translate="no">_score</code> 를 허용합니다. 이러한 연산은 <code translate="no">NULL</code> 값을 건너뜁니다.</li>
</ul>
<p><code translate="no">_score</code> 에서 파생된 값을 기준으로 버킷을 정렬하려면, <code translate="no">_score</code> 을 기반으로 메트릭 별칭을 정의한 다음, 해당 별칭을 <code translate="no">order</code> 에서 사용하십시오. <code translate="no">_score</code> 은 직접적인 버킷 정렬 키가 아닙니다. 예를 들어, 이 가이드에서는 <code translate="no">COSINE</code> 을 사용하므로, <code translate="no">metrics</code> 에서 <code translate="no">&quot;max_score&quot;: {&quot;max&quot;: &quot;_score&quot;}</code> 을 정의한 다음, <code translate="no">order</code> 에서 <code translate="no">{&quot;max_score&quot;: &quot;desc&quot;}</code> 을 사용하십시오. 이렇게 하면 가장 잘 일치하는 엔티티의 유사도 점수가 더 높은 버킷이 먼저 배치됩니다.</p>
<p><strong>버킷 정렬.</strong></p>
<p><code translate="no">SearchAggregation.order</code> 반환되는 버킷의 순서를 제어합니다. 각 항목은 정렬 키를 <code translate="no">&quot;asc&quot;</code> 또는 <code translate="no">&quot;desc&quot;</code> 에 매핑합니다. Milvus는 첫 번째 항목부터 마지막 항목까지 여러 항목을 순차적으로 평가합니다.</p>
<p>정렬 키는 다음과 같을 수 있습니다:</p>
<ul>
<li><code translate="no">metrics</code> 에서 동일한 집계 수준으로 정의된 메트릭 별칭(예: <code translate="no">avg_price</code>);</li>
<li>버킷 내 검색 풀 엔티티의 수를 나타내는 내장 <code translate="no">_count</code> 키; 또는</li>
<li><code translate="no">_key</code> 라는 컬렉션 필드가 아닌 버킷 키를 나타내는 내장 <code translate="no">_key</code> 키.</li>
</ul>
<p><code translate="no">order</code> 를 생략하면 Milvus는 검색 풀의 버킷 검색 순서를 유지합니다. 버킷이 메트릭, 개수 또는 키를 따라야 하는 경우 <code translate="no">order</code> 를 설정하십시오.</p>
<p>이 예시에서:</p>
<table>
<thead>
<tr><th>항목</th><th>효과</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">{&quot;avg_price&quot;: &quot;desc&quot;}</code></td><td><code translate="no">avg_price</code> 값이 가장 높은 버킷부터 가장 낮은 버킷 순으로 정렬합니다.</td></tr>
<tr><td><code translate="no">{&quot;_key&quot;: &quot;asc&quot;}</code></td><td>동점인 경우 버킷 키의 오름차순으로 순위를 결정합니다. <code translate="no">fields=[&quot;brand&quot;]</code> 를 사용하면 가격이 동일한 버킷은 사전순으로 정렬됩니다: <code translate="no">Adidas</code>, <code translate="no">Nike</code>, <code translate="no">Puma</code> 순입니다. <code translate="no">avg_price</code> 값이 다른 버킷은 영향을 받지 않습니다. <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> 를 사용하면 Milvus는 먼저 <code translate="no">brand</code> 를 비교하고, 브랜드 값이 동일한 경우에만 <code translate="no">color</code> 를 비교합니다.</td></tr>
</tbody>
</table>
<h3 id="Return-and-sort-representative-hits" class="common-anchor-header">대표 히트 반환 및 정렬<button data-href="#Return-and-sort-representative-hits" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TopHits</code> 를 사용하여 선택한 각 버킷에서 대표적인 엔티티를 반환하고 정렬합니다:</p>
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
<p>다음 Nike 버킷은 위 요청에서 캡처된 것으로, 가독성을 위해 JSON으로 직렬화되었습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997663497924805</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997047781944275</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span><span class="hljs-punctuation">,</span>
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
<tr><td><code translate="no">top_hits</code></td><td>선택 사항. 이 집계 수준에 대한 대표 엔티티를 구성합니다. 생략하더라도 Milvus는 버킷 키, 개수, 메트릭 및 하위 버킷을 반환하지만, ` <code translate="no">bucket.hits</code> `는 비어 있습니다.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>선택된 각 버킷에서 최대 두 개의 대표 엔티티를 반환합니다.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>나열된 기준을 사용하여 각 버킷 내의 엔티티를 정렬합니다.</td></tr>
</tbody>
</table>
<p>애플리케이션에서 각 버킷의 대표 엔티티가 필요한 경우에만 ` <code translate="no">top_hits</code> `를 설정하십시오.</p>
<p><code translate="no">SearchAggregation.order</code> <code translate="no">TopHits.sort</code> 는 각 버킷 내의 엔티티를 정렬하는 반면, `sorts`는 버킷을 정렬합니다. ` `는 지원되는 스칼라 필드 이름과 ANN 유사도 또는 거리를 나타내는 내장 필드 ` `를 허용합니다. Milvus는 ` ` 항목을 첫 번째부터 마지막까지 평가합니다. 이 예제에서는 에 따라 제품을 가장 높은 점수에서 가장 낮은 점수 순으로 정렬하며, 두 제품의 평점이 동일한 경우에만 를 사용합니다. 이 설정에서는 를 사용하므로, 내림차순 을 적용하면 더 유사한 제품이 먼저 표시됩니다. <code translate="no">TopHits.sort</code> <code translate="no">_score</code> <code translate="no">sort</code> <code translate="no">rating</code> <code translate="no">_score</code> <code translate="no">COSINE</code> <code translate="no">_score</code> </p>
<p><code translate="no">TopHits.sort</code> 에서 사용하는 필드는 <code translate="no">output_fields</code> 에 반드시 포함될 필요는 없습니다. 그러나 <code translate="no">output_fields</code> 에 있는 필드만 반환된 각 검색 결과의 <code translate="no">fields</code> 매핑에 포함됩니다.</p>
<p>반환된 각 <code translate="no">AggregationHit</code> 는 <code translate="no">pk</code> 에 기본 키를, <code translate="no">score</code> 에 벡터 점수를, <code translate="no">fields</code> 에 요청된 출력 필드를 노출합니다.</p>
<h3 id="Create-nested-buckets" class="common-anchor-header">중첩된 버킷 생성<button data-href="#Create-nested-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">sub_aggregation</code> 를 사용하여 각 상위 버킷 내에서 또 다른 집계 작업을 실행할 수 있습니다. 하위 집계는 해당 상위 버킷에 할당된 엔티티만 수신합니다. 다음 구성은 먼저 제품을 카테고리별로 그룹화한 다음, 각 카테고리 내의 제품을 브랜드별로 그룹화합니다:</p>
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
<p><summary>중첩 버킷 결과 보기</summary></p>
<p>다음 직렬화된 발췌문은 <code translate="no">running_shoes</code> 부모 버킷과 그 자식 버킷인 Adidas를 보여줍니다. 간결성을 위해 Nike 및 Puma 자식 버킷은 생략되었습니다.</p>
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
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
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
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.999454140663147</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span><span class="hljs-punctuation">,</span>
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
<p>Milvus는 먼저 ‘ <code translate="no">product_count</code> ’ 순서로 정렬된 최대 두 개의 카테고리 버킷을 선택합니다. 그런 다음 선택된 각 카테고리 내에서 ‘ <code translate="no">sub_aggregation</code> ’을 독립적으로 실행하고, ‘ <code translate="no">avg_rating</code> ’ 순서로 정렬된 최대 세 개의 브랜드 버킷을 반환합니다.</p>
<p>위의 출력 결과에서:</p>
<ul>
<li>루트 <code translate="no">running_shoes</code> 버킷에는 4개의 검색 풀 엔티티가 포함되어 있습니다. 이 버킷의 <code translate="no">metrics</code> 에는 루트 레벨의 <code translate="no">avg_price</code> 및 <code translate="no">product_count</code> 값이 포함되어 있습니다.</li>
<li>루트 버킷의 <code translate="no">sub_groups</code> 목록에는 하위 브랜드 버킷들이 포함되어 있습니다. 표시된 Adidas 버킷에는 하나의 엔티티와 해당 버킷의 <code translate="no">avg_rating</code> 및 <code translate="no">brand_count</code> 값이 포함되어 있습니다.</li>
<li>루트 버킷의 <code translate="no">hits</code> 목록은 루트 집계에서 <code translate="no">top_hits</code> 를 구성하지 않았기 때문에 비어 있습니다. Adidas 하위 버킷에는 <code translate="no">top_hits</code> 가 <code translate="no">sub_aggregation</code> 에서 구성되어 있으므로 대표 히트가 포함되어 있습니다.</li>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">버킷 개수 및 메트릭의 정확도는 어느 정도인가요?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 집계(Search Aggregation)는 ANN 검색 풀을 요약합니다. 전체 컬렉션에 대한 집계를 실행하지는 않습니다.</p>
<p>예를 들어, 컬렉션에 5,000개의 나이키(Nike) 제품이 포함되어 있지만, 특정 쿼리에 대한 검색 풀에는 35개의 나이키 제품만 포함되어 있다고 가정해 보겠습니다. 나이키 버킷의 ‘ <code translate="no">product_count</code> ’ 메트릭은 검색된 35개의 제품을 나타냅니다. 5,000개는 보고하지 않습니다.</p>
<p><code translate="no">order</code> 가 메트릭 별칭을 사용할 때 근사값이 가장 중요합니다. 검색 리콜의 변화는 메트릭 값을 변경할 수 있으며, 결과적으로 <code translate="no">SearchAggregation.size</code> 에 포함되는 버킷을 변경할 수 있습니다. 중첩 집계는 각 자식 레벨이 부모 버킷에 있는 엔티티를 대상으로 작동하기 때문에 이러한 효과를 증폭시킬 수 있습니다.</p>
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
    </button></h3><p>결과 다양성을 높이고 각 그룹이 반환하는 엔티티 수를 제어하는 것이 목표라면 <a href="/docs/ko/grouping-search.md">그룹화 검색을</a> 사용하십시오.</p>
<p>복합 키, 버킷별 메트릭, 버킷 정렬, 독립적으로 정렬된 대표 히트 또는 중첩된 버킷과 같은 구조화된 버킷 결과가 필요한 경우 검색 집계(Search Aggregation)를 사용하십시오. 검색 집계는 별도의 API를 사용하며 <code translate="no">result.agg_buckets</code> 를 통해 결과를 반환합니다.</p>
<p>동일한 요청에서 <code translate="no">search_aggregation</code> 을 <code translate="no">group_by_field</code> 또는 <code translate="no">group_by_fields</code> 과 함께 사용하지 마십시오.</p>
