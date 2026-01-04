---
id: elasticsearch-queries-to-milvus.md
title: Milvus에 대한 Elasticsearch 쿼리
summary: >-
  Apache Lucene을 기반으로 구축된 Elasticsearch는 선도적인 오픈 소스 검색 엔진입니다. 그러나 높은 업데이트 비용, 낮은
  실시간 성능, 비효율적인 샤드 관리, 클라우드 네이티브가 아닌 설계, 과도한 리소스 요구 등 최신 AI 애플리케이션에서 직면하는 문제에
  직면해 있습니다. 클라우드 네이티브 벡터 데이터베이스인 Milvus는 분리된 스토리지 및 컴퓨팅, 고차원 데이터를 위한 효율적인 인덱싱,
  최신 인프라와의 원활한 통합을 통해 이러한 문제를 극복합니다. 또한 AI 워크로드를 위한 뛰어난 성능과 확장성을 제공합니다.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Milvus에 대한 Elasticsearch 쿼리<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Apache Lucene을 기반으로 구축된 Elasticsearch는 선도적인 오픈 소스 검색 엔진입니다. 그러나 높은 업데이트 비용, 낮은 실시간 성능, 비효율적인 샤드 관리, 클라우드 네이티브가 아닌 설계, 과도한 리소스 요구 등 최신 AI 애플리케이션에서 직면하고 있는 문제에 직면해 있습니다. 클라우드 네이티브 벡터 데이터베이스인 Milvus는 분리된 스토리지 및 컴퓨팅, 고차원 데이터를 위한 효율적인 인덱싱, 최신 인프라와의 원활한 통합을 통해 이러한 문제를 극복합니다. 또한 AI 워크로드를 위한 뛰어난 성능과 확장성을 제공합니다.</p>
<p>이 문서에서는 코드 기반을 Elasticsearch에서 Milvus로 쉽게 마이그레이션하는 것을 목표로 하며, 그 사이에 쿼리를 변환하는 다양한 예제를 제공합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch에서 쿼리 컨텍스트의 작업은 정확도 점수를 생성하지만 필터 컨텍스트의 작업은 정확도 점수를 생성하지 않습니다. 마찬가지로, Milvus 검색은 유사성 점수를 생성하지만 필터와 같은 쿼리는 생성하지 않습니다. 코드 기반을 Elasticsearch에서 Milvus로 마이그레이션할 때 핵심 원칙은 유사성 점수 생성이 가능하도록 Elasticsearch의 쿼리 컨텍스트에서 사용되는 필드를 벡터 필드로 변환하는 것입니다.</p>
<p>아래 표에는 몇 가지 Elasticsearch 쿼리 패턴과 그에 상응하는 Milvus의 해당 패턴이 요약되어 있습니다.</p>
<table>
   <tr>
     <th><p>Elasticsearch 쿼리</p></th>
     <th><p>Milvus 등가물</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>전체 텍스트 쿼리</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Match-query">일치 쿼리</a></p></td>
     <td><p>전체 텍스트 검색</p></td>
     <td><p>둘 다 비슷한 기능 세트를 제공합니다.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>학기 수준 쿼리</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> 연산자</p></td>
     <td rowspan="6"><p>둘 다 필터 컨텍스트에서 이러한 Elasticsearch 쿼리를 사용할 때 동일하거나 유사한 기능 집합을 제공합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Prefix-query">접두사 쿼리</a></p></td>
     <td><p><code translate="no">like</code> 연산자</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Range-query">범위 쿼리</a></p></td>
     <td><p><code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> 과 같은 비교 연산자 및 <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Term-query">용어 쿼리</a></p></td>
     <td><p>다음과 같은 비교 연산자 <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Terms-query">용어 쿼리</a></p></td>
     <td><p><code translate="no">in</code> 연산자</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Wildcard-query">와일드카드 쿼리</a></p></td>
     <td><p><code translate="no">like</code> 연산자</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Boolean-query">부울 쿼리</a></p></td>
     <td><p>다음과 같은 논리 연산자 <code translate="no">AND</code></p></td>
     <td><p>둘 다 필터 컨텍스트에서 사용할 때 유사한 기능 집합을 제공합니다.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>벡터 쿼리</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Knn-query">kNN 쿼리</a></p></td>
     <td><p>검색</p></td>
     <td><p>Milvus는 보다 고급 벡터 검색 기능을 제공합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">상호 순위 융합</a></p></td>
     <td><p>하이브리드 검색</p></td>
     <td><p>Milvus는 다양한 순위 재조정 전략을 지원합니다.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">전체 텍스트 쿼리<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch에서 전체 텍스트 쿼리를 사용하면 이메일 본문과 같이 분석된 텍스트 필드를 검색할 수 있습니다. 쿼리 문자열은 색인 중에 필드에 적용된 것과 동일한 분석기를 사용하여 처리됩니다.</p>
<h3 id="Match-query" class="common-anchor-header">일치 쿼리<button data-href="#Match-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서 일치 쿼리는 제공된 텍스트, 숫자, 날짜 또는 부울 값과 일치하는 문서를 반환합니다. 제공된 텍스트는 일치하기 전에 분석됩니다.</p>
<p>다음은 일치 쿼리를 사용한 Elasticsearch 검색 요청의 예시입니다.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 전체 텍스트 검색 기능을 통해 동일한 기능을 제공합니다. 위의 Elasticsearch 쿼리는 다음과 같이 Milvus로 변환할 수 있습니다:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 예에서 <code translate="no">message_sparse</code> 는 <code translate="no">message</code> 이라는 이름의 VarChar 필드에서 파생된 스파스 벡터 필드입니다. Milvus는 BM25 임베딩 모델을 사용하여 <code translate="no">message</code> 필드의 값을 스파스 벡터 임베딩으로 변환하고 <code translate="no">message_sparse</code> 필드에 저장합니다. 검색 요청을 받으면 Milvus는 동일한 BM25 모델을 사용하여 일반 텍스트 쿼리 페이로드를 임베딩하고 스파스 벡터 검색을 수행하여 <code translate="no">output_fields</code> 파라미터에 지정된 <code translate="no">id</code> 및 <code translate="no">message</code> 필드를 해당 유사도 점수와 함께 반환합니다.</p>
<p>이 기능을 사용하려면 <code translate="no">message</code> 필드에서 분석기를 활성화하고 이 필드에서 <code translate="no">message_sparse</code> 필드를 도출하는 함수를 정의해야 합니다. 분석기를 활성화하고 Milvus에서 파생 함수를 만드는 방법에 대한 자세한 지침은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h2 id="Term-level-queries" class="common-anchor-header">용어 수준 쿼리<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch에서 용어 수준 쿼리는 날짜 범위, IP 주소, 가격 또는 제품 ID와 같은 구조화된 데이터의 정확한 값을 기반으로 문서를 찾는 데 사용됩니다. 이 섹션에서는 Milvus에서 일부 Elasticsearch 용어 수준 쿼리의 가능한 등가물에 대해 간략하게 설명합니다. 이 섹션의 모든 예제는 Milvus의 기능에 맞게 필터 컨텍스트 내에서 작동하도록 조정되었습니다.</p>
<h3 id="IDs" class="common-anchor-header">ID<button data-href="#IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 필터 컨텍스트에서 ID를 기준으로 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus에서는 다음과 같이 ID를 기준으로 엔티티를 찾을 수도 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 쿼리 및 가져오기 요청과 필터 표현식에 대한 자세한 내용은 <a href="/docs/ko/get-and-scalar-query.md">쿼리</a> 및 <a href="/docs/ko/filtering">필터링을</a> 참조하세요.</p>
<h3 id="Prefix-query" class="common-anchor-header">접두사 쿼리<button data-href="#Prefix-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 필터 컨텍스트에서 제공된 필드에 특정 접두사가 포함된 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus에서는 다음과 같이 값이 지정된 접두사로 시작하는 엔티티를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 <code translate="no">like</code> 연산자에 대한 자세한 내용은<a href="/docs/ko/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> 패턴 매칭에</a><code translate="no">LIKE</code><a href="/docs/ko/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"></a> <a href="/docs/ko/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">사용하기를 </a> 참조하세요.</p>
<h3 id="Range-query" class="common-anchor-header">범위 쿼리<button data-href="#Range-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 제공된 범위 내의 용어가 포함된 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus에서는 다음과 같이 특정 필드의 값이 제공된 범위 내에 있는 엔티티를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 비교 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md#Comparison-operators">비교 연산자를</a> 참조하세요.</p>
<h3 id="Term-query" class="common-anchor-header">용어 쿼리<button data-href="#Term-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 제공된 필드에 <strong>정확한</strong> 용어가 포함된 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus에서는 다음과 같이 지정된 필드의 값이 정확히 지정된 용어와 일치하는 엔티티를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 비교 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md#Comparison-operators">비교 연산자를</a> 참조하세요.</p>
<h3 id="Terms-query" class="common-anchor-header">용어 쿼리<button data-href="#Terms-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 제공된 필드에 하나 이상의 <strong>정확한</strong> 용어가 포함된 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus에는 이와 완전히 등가되는 용어가 없습니다. 그러나 다음과 같이 지정된 필드의 값이 지정된 용어 중 하나인 엔티티를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 범위 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md#Range-operators">범위 연산자를</a> 참조하세요.</p>
<h3 id="Wildcard-query" class="common-anchor-header">와일드카드 쿼리<button data-href="#Wildcard-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch에서는 다음과 같이 와일드카드 패턴과 일치하는 용어가 포함된 문서를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 필터링 조건에서 와일드카드를 지원하지 않습니다. 그러나 <code translate="no">like</code> 연산자를 사용하면 다음과 같이 유사한 효과를 얻을 수 있습니다:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">이 페이지에서</a> Elasticsearch 예제를 찾을 수 있습니다. Milvus의 범위 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md#Range-operators">범위 연산자를</a> 참조하세요.</p>
<h2 id="Boolean-query" class="common-anchor-header">부울 쿼리<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch에서 부울 쿼리는 다른 쿼리의 부울 조합과 일치하는 문서를 일치시키는 쿼리입니다.</p>
<p>다음 예는 <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">이 페이지의</a> Elasticsearch 설명서에 있는 예제에서 수정한 것입니다. 이 쿼리는 이름에 <code translate="no">production</code> 태그가 있는 <code translate="no">kimchy</code> 사용자를 반환합니다.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus에서는 다음과 같이 비슷한 작업을 수행할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 예에서는 대상 컬렉션에 <strong>VarChar</strong> 유형의 <code translate="no">user</code> 필드와 <strong>Array</strong> 유형의 <code translate="no">tags</code> 필드가 있다고 가정합니다. 이 쿼리는 이름에 <code translate="no">production</code> 태그가 있는 <code translate="no">kimchy</code> 사용자를 반환합니다.</p>
<h2 id="Vector-queries" class="common-anchor-header">벡터 쿼리<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch에서 벡터 쿼리는 시맨틱 검색을 효율적으로 수행하기 위해 벡터 필드에서 작동하는 특수 쿼리입니다.</p>
<h3 id="Knn-query" class="common-anchor-header">Knn 쿼리<button data-href="#Knn-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch는 대략적인 kNN 쿼리와 정확한 무차별 대입 kNN 쿼리를 모두 지원합니다. 다음과 같이 유사도 메트릭으로 측정된 쿼리 벡터에 가장 가까운 <em>k개의</em> 벡터를 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>전문 벡터 데이터베이스인 Milvus는 인덱스 유형을 사용해 벡터 검색을 최적화합니다. 일반적으로 고차원 벡터 데이터에 대해 근사 근사 이웃(ANN) 검색을 우선시합니다. FLAT 인덱스 유형을 사용한 무차별 kNN 검색은 정확한 결과를 제공하지만, 시간과 리소스를 많이 소모합니다. 반면, AUTOINDEX 또는 다른 인덱스 유형을 사용하는 ANN 검색은 속도와 정확도의 균형을 유지하여 kNN보다 훨씬 빠르고 리소스 효율적인 성능을 제공합니다.</p>
<p>위의 벡터 쿼리를 Mlivus에서 이와 유사하게 표현하면 다음과 같습니다:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">이 페이지에서</a> Elasticsearch 예제를 확인할 수 있습니다. Milvus의 ANN 검색에 대한 자세한 내용은 <a href="/docs/ko/single-vector-search.md">기본 ANN 검색을</a> 참조하세요.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">상호 순위 융합<button data-href="#Reciprocal-Rank-Fusion" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch는 서로 다른 정확도 지표를 가진 여러 결과 세트를 하나의 순위가 매겨진 결과 세트로 결합하기 위해 상호 순위 퓨전(RRF)을 제공합니다.</p>
<p>다음 예는 검색 정확도를 개선하기 위해 기존의 용어 기반 검색과 k-NN(k-근접 이웃) 벡터 검색을 결합하는 방법을 보여줍니다:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예에서 RRF는 두 검색기의 결과를 결합합니다:</p>
<ul>
<li><p><code translate="no">text</code> 필드에 <code translate="no">&quot;shoes&quot;</code> 이라는 용어가 포함된 문서에 대한 표준 용어 기반 검색.</p></li>
<li><p>제공된 쿼리 벡터를 사용하여 <code translate="no">vector</code> 필드에 대한 kNN 검색.</p></li>
</ul>
<p>각 리트리버는 최대 50개의 상위 일치 항목을 제공하며, RRF에 의해 순위가 재조정되고 최종 상위 10개 결과가 반환됩니다.</p>
<p>Milvus에서는 여러 벡터 필드에서 검색을 결합하고, 재랭크 전략을 적용하고, 결합된 목록에서 상위 K 결과를 검색하여 유사한 하이브리드 검색을 수행할 수 있습니다. Milvus는 RRF와 가중치 재랭커 전략을 모두 지원합니다. 자세한 내용은 <a href="/docs/ko/weighted-ranker.md">재랭크하기를</a> 참조하세요.</p>
<p>다음은 위의 Elasticsearch 예제를 Milvus에서 엄격하게 동일시하지 않은 예제입니다.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예는 Milvus의 하이브리드 검색을 결합한 것입니다:</p>
<ol>
<li><p><strong>고밀도 벡터 검색</strong>: <code translate="no">vector</code> 필드에 대한 근사 근사 이웃(ANN) 검색을 위해 <code translate="no">nprobe</code> 을 10으로 설정하여 내부 곱(IP) 메트릭을 사용합니다.</p></li>
<li><p><strong>희소 벡터 검색</strong>: <code translate="no">text_sparse</code> 필드에서 BM25 유사성 메트릭을 사용합니다.</p></li>
</ol>
<p>이러한 검색의 결과는 개별적으로 실행되고, 결합되며, 상호 순위 융합(RRF) 순위 매기기를 사용하여 다시 순위가 매겨집니다. 하이브리드 검색은 순위가 재조정된 목록에서 상위 10개 엔티티를 반환합니다.</p>
<p>표준 텍스트 기반 쿼리와 kNN 검색의 결과를 병합하는 Elasticsearch의 RRF 순위와는 달리, Milvus는 스파스 및 고밀도 벡터 검색의 결과를 결합하여 멀티모달 데이터에 최적화된 고유한 하이브리드 검색 기능을 제공합니다.</p>
<h2 id="Recap" class="common-anchor-header">요약<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>이 문서에서는 용어 수준 쿼리, 부울 쿼리, 전체 텍스트 쿼리, 벡터 쿼리 등 일반적인 Elasticsearch 쿼리를 Milvus에 상응하는 쿼리로 변환하는 방법을 다루었습니다. 다른 Elasticsearch 쿼리 변환에 대해 더 궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
