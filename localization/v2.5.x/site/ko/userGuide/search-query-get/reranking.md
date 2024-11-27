---
id: reranking.md
summary: 이 주제에서는 순위 재조정 프로세스를 다루며 그 중요성과 두 가지 순위 재조정 방법의 구현에 대해 설명합니다.
title: 리랭크
---
<h1 id="Reranking" class="common-anchor-header">리랭크<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 여러 <code translate="no">AnnSearchRequest</code> 인스턴스에서 검색 결과를 구체화하기 위해 정교한 재랭크 전략을 통합하는 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a> API를 사용하여 하이브리드 검색 기능을 지원합니다. 이 주제에서는 재랭크 프로세스를 다루며, 그 중요성과 Milvus에서 다양한 재랭크 전략의 구현에 대해 설명합니다.</p>
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
    </button></h2><p>다음 그림은 Milvus에서 하이브리드 검색을 실행하는 과정을 보여주며, 이 과정에서 재랭크의 역할을 강조합니다.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>하이브리드 검색에서 재랭크는 여러 벡터 필드의 결과를 통합하여 최종 결과의 관련성과 정확한 우선순위를 보장하는 중요한 단계입니다. 현재 Milvus는 다음과 같은 리랭크 전략을 제공합니다:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: 이 접근 방식은 서로 다른 벡터 검색의 점수(또는 벡터 거리)의 가중 평균을 계산하여 결과를 병합합니다. 각 벡터 필드의 중요도에 따라 가중치를 할당합니다.</p></li>
<li><p><code translate="no">RRFRanker</code>: 이 전략은 서로 다른 벡터 열의 순위에 따라 결과를 결합합니다.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">가중 점수(가중 순위)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">WeightedRanker</code> 전략은 각 벡터 필드의 중요도에 따라 각 벡터 검색 경로의 결과에 서로 다른 가중치를 할당합니다. 이 순위 재조정 전략은 각 벡터 필드의 중요도가 다를 때 적용되며, 특정 벡터 필드에 더 높은 가중치를 할당하여 다른 벡터 필드보다 강조할 수 있습니다. 예를 들어, 다중 모드 검색에서는 이미지의 색상 분포보다 텍스트 설명이 더 중요하게 고려될 수 있습니다.</p>
<p>가중치랭커의 기본 프로세스는 다음과 같습니다:</p>
<ul>
<li><p><strong>검색 중에 점수를 수집합니다</strong>: 다양한 벡터 검색 경로에서 결과와 그 점수를 수집합니다.</p></li>
<li><p><strong>점수 정규화</strong>: 각 경로의 점수를 [0,1] 범위로 정규화하며, 1에 가까운 값일수록 관련성이 높음을 나타냅니다. 이 정규화는 메트릭 유형에 따라 점수 분포가 달라지기 때문에 매우 중요합니다. 예를 들어, IP의 거리는 [-∞,+∞]의 범위인 반면, L2의 거리는 [0,+∞]의 범위입니다. Milvus는 <code translate="no">arctan</code> 함수를 사용하여 값을 [0,1] 범위로 변환하여 다양한 메트릭 유형에 대한 표준화된 기준을 제공합니다.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>가중치 할당</strong>: 각 벡터 검색 경로에 가중치 <code translate="no">w𝑖</code> 를 할당합니다. 사용자는 데이터 소스의 신뢰성, 정확성 또는 기타 관련 메트릭을 반영하는 가중치를 지정합니다. 각 가중치의 범위는 [0,1]입니다.</p></li>
<li><p><strong>점수 융합</strong>: 정규화된 점수의 가중 평균을 계산하여 최종 점수를 도출합니다. 그런 다음 이 최고 점수부터 최저 점수를 기준으로 순위를 매겨 최종 정렬된 결과를 생성합니다.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>가중치 재순위</span> </span></p>
<p>이 전략을 사용하려면 <code translate="no">WeightedRanker</code> 인스턴스를 적용하고 다양한 숫자 인수를 전달하여 가중치 값을 설정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>참고하세요:</p>
<ul>
<li><p>각 가중치 값의 범위는 0(가장 중요하지 않음)에서 1(가장 중요함)까지이며 최종 집계 점수에 영향을 미칩니다.</p></li>
<li><p><code translate="no">WeightedRanker</code> 에 제공된 가중치 값의 총 개수는 앞서 생성한 <code translate="no">AnnSearchRequest</code> 인스턴스 수와 같아야 합니다.</p></li>
<li><p>서로 다른 메트릭 유형의 측정값이 다르기 때문에 리콜 결과의 거리가 [0,1] 간격에 위치하도록 정규화하며, 여기서 0은 다르다는 의미이고 1은 비슷하다는 의미입니다. 최종 점수는 가중치 값과 거리의 합이 됩니다.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">상호 순위 융합(RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF는 순위의 역순에 따라 순위 목록을 결합하는 데이터 융합 방법입니다. 특히 중요도의 우선순위가 명확하지 않은 경우 각 벡터 필드의 영향력의 균형을 맞추는 데 효과적인 방법입니다. 이 전략은 일반적으로 모든 벡터 필드를 동등하게 고려하거나 각 필드의 상대적 중요도에 대해 불확실성이 있을 때 사용됩니다.</p>
<p>RRF의 기본 프로세스는 다음과 같습니다:</p>
<ul>
<li><p><strong>검색 중에 순위를 수집합니다</strong>: 여러 벡터 필드에 걸친 검색기가 결과를 검색하고 정렬합니다.</p></li>
<li><p><strong>순위 융합</strong>: RRF 알고리즘은 각 리트리버의 순위를 가중치를 부여하고 결합합니다. 공식은 다음과 같습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>여기서 𝑁는 서로 다른 검색 경로의 수를 나타내고, rank𝑖(𝑑)는 𝑖번째 리트리버가 검색한 문서 𝑑의 순위 위치이며, 𝑘은 평활화 매개변수로 일반적으로 60으로 설정됩니다.</p></li>
<li><p><strong>종합 순위</strong>: 합산된 점수를 기준으로 검색된 결과의 순위를 다시 매겨 최종 결과를 생성합니다.</p></li>
</ul>
<p>이 전략을 사용하려면 <code translate="no">RRFRanker</code> 인스턴스를 적용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF를 사용하면 명시적인 가중치를 지정하지 않고도 필드 간의 영향력을 균형 있게 조정할 수 있습니다. 여러 필드에서 합의된 상위 일치 항목이 최종 순위에서 우선순위를 갖습니다.</p>
