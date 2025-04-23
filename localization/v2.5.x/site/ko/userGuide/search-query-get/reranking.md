---
id: reranking.md
title: 재랭크
summary: >-
  하이브리드 검색은 여러 개의 동시 ANN 검색을 통해 보다 정확한 검색 결과를 얻을 수 있습니다. 여러 검색은 여러 세트의 결과를 반환하며,
  이러한 결과를 병합하고 순서를 변경하여 단일 결과 세트를 반환하는 데 도움이 되는 재랭크 전략이 필요합니다. 이 가이드에서는 Milvus에서
  지원하는 리랭크 전략을 소개하고 적절한 리랭크 전략을 선택하기 위한 팁을 제공합니다.
---
<h1 id="Reranking" class="common-anchor-header">재랭크<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>하이브리드 검색은 여러 개의 동시 ANN 검색을 통해 보다 정확한 검색 결과를 얻을 수 있습니다. 다중 검색은 여러 세트의 결과를 반환하며, 결과를 병합 및 재정렬하고 단일 결과 세트를 반환하는 데 도움이 되는 리랭크 전략이 필요합니다. 이 가이드에서는 Milvus에서 지원하는 리랭크 전략을 소개하고 적절한 리랭크 전략을 선택하기 위한 팁을 제공합니다.</p>
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
    </button></h2><p>다음 다이어그램은 다중 모드 검색 애플리케이션에서 하이브리드 검색을 수행하는 주요 워크플로우를 보여줍니다. 이 다이어그램에서 한 경로는 텍스트에 대한 기본 ANN 검색이고 다른 경로는 이미지에 대한 기본 ANN 검색입니다. 각 경로는 각각 텍스트 및 이미지 유사성 점수를 기반으로 결과 집합을 생성합니다<strong>(제한 1</strong> 및 <strong>제한 2</strong>). 그런 다음 재랭크 전략이 적용되어 통합된 기준에 따라 두 결과 세트의 순위를 재조정하고 궁극적으로 두 결과 세트를 최종 검색 결과 세트인 <strong>Limit(final)</strong>으로 병합합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>다중 벡터 재랭크</span> </span></p>
<p>하이브리드 검색에서 재랭크는 여러 벡터 검색의 결과를 통합하여 최종 결과가 가장 관련성이 높고 정확한지 확인하는 중요한 단계입니다. 현재 Milvus는 다음 두 가지 재랭크 전략을 지원합니다:</p>
<ul>
<li><p><strong><a href="/docs/ko/reranking.md#WeightedRanker">가중랭커</a></strong>: 이 전략은 서로 다른 벡터 검색의 점수(또는 거리)의 가중치를 계산하여 결과를 병합합니다. 각 벡터 필드의 중요도에 따라 가중치가 할당되므로 특정 사용 사례의 우선순위에 따라 사용자 지정할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/reranking.md#RRFRanker">RRFRanker</a> (상호 순위 융합 랭킹)</strong>: 이 전략은 순위에 따라 결과를 결합합니다. 서로 다른 검색 결과의 순위를 균형 있게 조정하는 방법을 사용하여 다양한 데이터 유형 또는 양식을 보다 공정하고 효과적으로 통합하는 경우가 많습니다.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">가중랭커<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>가중랭커 전략은 중요도에 따라 각 벡터 검색 경로의 결과에 서로 다른 가중치를 할당합니다.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">웨이트 랭커의 메커니즘</h3><p>웨이트 랭커 전략의 주요 워크플로는 다음과 같습니다:</p>
<ol>
<li><p><strong>검색 점수를 수집합니다</strong>: 벡터 검색의 각 경로(score_1, score_2)에서 결과와 점수를 수집합니다.</p></li>
<li><p><strong>점수 정규화</strong>: 각 검색은 서로 다른 유사성 메트릭을 사용할 수 있으므로 점수 분포가 달라질 수 있습니다. 예를 들어, 유사도 유형으로 내적 곱(IP)을 사용하면 [-∞,+∞] 범위의 점수가 나올 수 있고, 유클리드 거리(L2)를 사용하면 [0,+∞] 범위의 점수가 나올 수 있습니다. 검색 방식에 따라 점수 범위가 다르고 직접 비교할 수 없으므로 각 검색 경로의 점수를 정규화해야 합니다. 일반적으로 <code translate="no">arctan</code> 함수를 적용하여 점수를 [0, 1] 사이의 범위로 변환합니다(score_1_normalized, score_2_normalized). 점수가 1에 가까울수록 유사성이 높음을 나타냅니다.</p></li>
<li><p><strong>가중치를 할당합니다</strong>: 서로 다른 벡터 필드에 할당된 중요도에 따라 가중치<strong>(wi)</strong>가 정규화된 점수(score_1_normalized, score_2_normalized)에 할당됩니다. 각 경로의 가중치는 [0,1] 범위여야 합니다. 결과 가중치 점수는 score_1_weighted 및 score_2_weighted입니다.</p></li>
<li><p><strong>점수 병합</strong>: 가중치 점수(score_1_weighted, score_2_weighted)를 가장 높은 점수부터 가장 낮은 점수까지 순위를 매겨 최종 점수 세트(score_final)를 생성합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>가중 순위 변경</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">가중 랭킹 예시</h3><p>이 예는 이미지와 텍스트가 포함된 멀티모달 하이브리드 검색(topK=5)을 보여 주며, WeightedRanker 전략이 두 개의 ANN 검색 결과를 어떻게 재순위화하는지를 보여줍니다.</p>
<ul>
<li>이미지에 대한 ANN 검색 결과(topK=5): 다음과 같습니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>점수(이미지)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>텍스트에 대한 ANN 검색 결과(topK=5)：： 다음과 같습니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>점수(텍스트)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>가중치랭커를 사용하여 이미지 및 텍스트 검색 결과에 가중치를 할당합니다. 이미지 ANN 검색의 가중치는 0.6이고 텍스트 검색의 가중치는 0.4라고 가정합니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>점수(이미지)</strong></p></th>
     <th><p><strong>점수(텍스트)</strong></p></th>
     <th><p><strong>가중치 점수</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>이미지에 없음</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>이미지에 없음</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>재랭크 후 최종 결과(상위 K=5): 다음과 같습니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>Rank</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>최종 점수</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">가중랭커 사용</h3><p>웨이트 랭커 전략을 사용할 때는 가중치 값을 입력해야 합니다. 입력할 가중치 값의 개수는 하이브리드 검색의 기본 ANN 검색 요청 수와 일치해야 합니다. 입력 가중치 값은 [0,1] 범위에 속해야 하며, 1에 가까운 값일수록 중요도가 높음을 나타냅니다.</p>
<p>예를 들어, 하이브리드 검색에 텍스트 검색과 이미지 검색이라는 두 가지 기본 ANN 검색 요청이 있다고 가정해 보겠습니다. 텍스트 검색이 더 중요하다고 판단되면 더 큰 가중치를 할당해야 합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>상호 순위 융합(RRF)은 순위의 역순에 따라 순위 목록을 결합하는 데이터 융합 방법입니다. 이 순위 재조정 전략은 벡터 검색의 각 경로의 중요도를 효과적으로 균형 있게 조정합니다.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">RRFRanker의 메커니즘</h3><p>RRFRanker 전략의 주요 워크플로는 다음과 같습니다:</p>
<ol>
<li><p><strong>검색 랭킹을 수집합니다</strong>: 벡터 검색의 각 경로(rank_1, rank_2)에서 결과의 순위를 수집합니다.</p></li>
<li><p><strong>순위 병합</strong>: 공식에 따라 각 경로(rank_rrf_1, rank_rrf_2)의 순위를 변환합니다.</p>
<p>계산 공식에는 검색 횟수를 나타내는 <em>N이</em> 포함되며, <em>ranki</em><em>(d</em>)는 <em>i(세 번째)</em> 리트리버가 생성한 문서 <em>d의</em> 순위 위치이고, <em>k는</em> 일반적으로 60으로 설정되는 평활화 매개변수입니다.</p></li>
<li><p><strong>집계 순위</strong>: 합산된 순위를 기준으로 검색 결과의 순위를 다시 매겨 최종 결과를 생성합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF 리랭커</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">RRFRanker의 예</h3><p>이 예는 희소 밀도 벡터에 대한 하이브리드 검색(topK=5)을 보여 주며, RRFRanker 전략이 두 개의 ANN 검색 결과를 어떻게 재랭크하는지를 보여줍니다.</p>
<ul>
<li>텍스트의 희소 벡터에 대한 ANN 검색 결과(topK=5)： 다음과 같습니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>순위(스파스)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>텍스트 밀집 벡터에 대한 ANN 검색 결과(topK=5)：： 텍스트 밀집 벡터에 대한 ANN 검색 결과</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>순위(밀도)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>RRF를 사용하여 두 검색 결과 세트의 순위를 재정렬합니다. 평활화 매개변수 <code translate="no">k</code> 가 60으로 설정되어 있다고 가정합니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>점수(스파스)</strong></p></th>
     <th><p><strong>점수(밀도)</strong></p></th>
     <th><p><strong>최종 점수</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>재랭크 후 최종 결과(상위 K=5): 다음과 같습니다.</li>
</ul>
<table>
   <tr>
     <th><p><strong>Rank</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>최종 점수</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">RRFRanker 사용</h3><p>RRF 재랭크 전략을 사용할 때는 <code translate="no">k</code> 매개변수를 구성해야 합니다. 이 매개변수는 전체 텍스트 검색과 벡터 검색의 상대적 가중치를 효과적으로 변경할 수 있는 평활화 매개변수입니다. 이 매개변수의 기본값은 60이며, (0, 16384) 범위 내에서 조정할 수 있습니다. 값은 부동 소수점 숫자여야 합니다. 권장 값은 [10, 100] 사이입니다. <code translate="no">k=60</code> 값이 일반적으로 사용되지만, 최적의 <code translate="no">k</code> 값은 특정 애플리케이션과 데이터 세트에 따라 달라질 수 있습니다. 최상의 성능을 얻으려면 특정 사용 사례에 따라 이 매개변수를 테스트하고 조정하는 것이 좋습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">올바른 리랭크 전략 선택<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>재랭크 전략을 선택할 때 고려해야 할 한 가지는 벡터 필드에서 하나 이상의 기본 ANN 검색에 중점을 둘 것인지 여부입니다.</p>
<ul>
<li><p><strong>가중치랭커</strong>: 이 전략은 특정 벡터 필드를 강조하는 결과가 필요한 경우에 권장됩니다. 가중랭커를 사용하면 특정 벡터 필드에 더 높은 가중치를 할당하여 해당 필드를 더 강조할 수 있습니다. 예를 들어, 다중 모드 검색에서는 이미지의 텍스트 설명이 이미지의 색상보다 더 중요하게 고려될 수 있습니다.</p></li>
<li><p><strong>상호 순위 퓨전 랭킹(RRFRanker</strong>): 이 전략은 특별히 강조할 부분이 없을 때 권장됩니다. RRF는 각 벡터 필드의 중요도 간의 균형을 효과적으로 맞출 수 있습니다.</p></li>
</ul>
