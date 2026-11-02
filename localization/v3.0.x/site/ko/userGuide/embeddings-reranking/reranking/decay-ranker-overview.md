---
id: decay-ranker-overview.md
title: Decay Ranker 개요Compatible with Milvus 2.6.x
summary: >-
  전통적인 벡터 검색에서는 결과가 순전히 벡터 유사도, 즉 수학적 공간에서 벡터들이 얼마나 잘 일치하는지에 따라 순위가 매겨집니다. 하지만
  실제 응용 분야에서는 콘텐츠의 관련성을 결정하는 요소가 단순히 의미적 유사성 이상의 요소에 달려 있는 경우가 많습니다.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Decay Ranker 개요<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>기존의 벡터 검색에서는 결과가 순전히 벡터 유사도, 즉 수학적 공간에서 벡터들이 얼마나 잘 일치하는지에 따라 순위가 매겨집니다. 하지만 실제 응용 분야에서는 콘텐츠의 관련성을 결정하는 요소가 단순히 의미적 유사성 이상의 요소에 달려 있는 경우가 많습니다.</p>
<p>다음과 같은 일상적인 상황을 생각해 보십시오:</p>
<ul>
<li><p>어제 게시된 기사가 3년 전의 유사한 기사보다 더 높은 순위에 표시되어야 하는 뉴스 검색</p></li>
<li><p>30분 운전이 필요한 식당보다 5분 거리에 있는 식당을 우선순위로 보여주는 식당 검색 서비스</p></li>
<li><p>검색어와의 유사도가 약간 낮더라도 인기 상품을 상위에 노출하는 전자상거래 플랫폼</p></li>
</ul>
<p>이러한 시나리오들은 모두 벡터 유사성과 시간, 거리, 인기 같은 다른 수치적 요소 간의 균형을 맞추어야 한다는 공통된 필요성을 공유합니다.</p>
<p>Milvus의 감쇠 순위 지정기(Decay rankers)는 수치 필드 값을 기반으로 검색 순위를 조정하여 이러한 요구를 해결합니다. 이를 통해 벡터 유사도와 “신선도”, “근접도” 또는 데이터의 기타 수치적 속성 간의 균형을 맞추고, 더 직관적이고 맥락에 맞는 검색 경험을 제공할 수 있습니다.</p>
<h2 id="Usage-notes" class="common-anchor-header">사용 시 유의사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>감쇠 순위 지정 기능은 그룹화 검색과 함께 사용할 수 없습니다.</p></li>
<li><p>감쇠 순위 지정에는 숫자형 필드(<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> 또는 <code translate="no">DOUBLE</code>)만 사용할 수 있습니다.</p></li>
<li><p>각 감쇠 순위 지정기는 하나의 숫자형 필드만 사용할 수 있습니다.</p></li>
<li><p><strong>시간 단위 일관성</strong>: 시간 기반 감쇠 순위를 사용할 경우, ` <code translate="no">origin</code>`, ` <code translate="no">scale</code>` 및 ` <code translate="no">offset</code> ` 매개변수의 단위는 컬렉션 데이터에서 사용되는 단위와 일치해야 합니다:</p>
<ul>
<li><p>컬렉션이 타임스탬프를 <strong>초</strong> 단위로 저장하는 경우, 모든 매개변수에 초 단위를 사용해야 합니다.</p></li>
<li><p>컬렉션이 타임스탬프를 <strong>밀리초</strong> 단위로 저장하는 경우, 모든 매개변수에 밀리초를 사용하십시오</p></li>
<li><p>컬렉션이 타임스탬프를 <strong>마이크로초</strong> 단위로 저장하는 경우, 모든 매개변수에 마이크로초 단위를 사용하십시오</p></li>
</ul></li>
</ul>
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
    </button></h2><p>감쇠 순위 지정(Decay ranking)은 시간이나 지리적 거리와 같은 수치적 요소를 순위 지정 과정에 반영함으로써 기존의 벡터 검색 기능을 강화합니다. 전체 과정은 다음 단계를 따릅니다:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">1단계: 정규화된 유사도 점수 계산<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저, Milvus는 일관된 비교를 보장하기 위해 벡터 유사도 점수를 계산하고 정규화합니다:</p>
<ul>
<li><p><strong>L2</strong> 및 <strong>JACCARD</strong> 거리 측정 기준의 경우(값이 낮을수록 유사성이 높음):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>이를 통해 거리는 0~1 사이의 유사도 점수로 변환되며, 점수가 높을수록 더 좋은 결과를 나타냅니다.</p></li>
<li><p><strong>IP</strong>, <strong>COSINE</strong> 및 <strong>BM25</strong> 거리 측정 기준의 경우(점수가 높을수록 일치도가 더 높음을 나타냄): 점수는 정규화 없이 직접 사용됩니다.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">2단계: 감쇠 점수 계산<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>다음으로, Milvus는 사용자가 선택한 감쇠 순위 지정기를 사용하여 숫자형 필드 값(타임스탬프나 거리 등)을 기반으로 감쇠 점수를 계산합니다:</p>
<ul>
<li><p>각 감쇠 랭커는 원시 수치 값을 0~1 사이의 정규화된 관련성 점수로 변환합니다.</p></li>
<li><p>감쇠 점수는 이상적인 지점과의 “거리”를 기준으로 항목의 관련성을 나타냅니다.</p></li>
</ul>
<p>구체적인 계산 공식은 감쇠 랭커 유형에 따라 다릅니다. 감쇠 점수 계산 방법에 대한 자세한 내용은 <a href="/docs/ko/gaussian-decay.md#Formula">가우시안 감쇠</a>, <a href="/docs/ko/exponential-decay.md#Formula">지수 감쇠</a>, <a href="/docs/ko/linear-decay.md#Formula">선형 감쇠에</a> 대한 전용 페이지를 참조하십시오.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">3단계: 최종 점수 계산<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>마지막으로, Milvus는 정규화된 유사도 점수와 감쇠 점수를 결합하여 최종 순위 점수를 산출합니다:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>하이브리드 검색(여러 벡터 필드를 결합하는 경우)의 경우, Milvus는 검색 요청 중 가장 높은 정규화된 유사도 점수를 채택합니다:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>예를 들어, 하이브리드 검색에서 특정 연구 논문이 벡터 유사도에서 0.82, BM25 기반 텍스트 검색에서 0.91의 점수를 받은 경우, Milvus는 감쇠 계수를 적용하기 전에 0.91을 기본 유사도 점수로 사용합니다.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">감쇠 순위 적용 사례<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>시간 기반 감쇠를 적용하여 <strong>“AI 연구 논문”</strong> 을 검색하는 실제 시나리오에서 감쇠 순위를 살펴보겠습니다:</p>
<div class="alert note">
<p>이 예시에서 감쇠 점수는 시간이 지남에 따라 관련성이 어떻게 감소하는지를 반영합니다. 즉, 최신 논문일수록 1.0에 가까운 점수를 받고, 오래된 논문일수록 낮은 점수를 받습니다. 이러한 값은 특정 감쇠 랭커를 사용하여 계산됩니다. 자세한 내용은 <a href="/docs/ko/decay-ranker-overview.md#Choose-the-right-decay-ranker">‘적절한 감쇠 랭커 선택’을</a> 참조하십시오.</p>
</div>
<table>
   <tr>
     <th><p>논문</p></th>
     <th><p>벡터 유사도</p></th>
     <th><p>정규화된 유사도 점수</p></th>
     <th><p>발행일</p></th>
     <th><p>감쇠 점수</p></th>
     <th><p>최종 점수</p></th>
     <th><p>최종 순위</p></th>
   </tr>
   <tr>
     <td><p>논문 A</p></td>
     <td><p>높음</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2주 전</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>B형</p></td>
     <td><p>매우 높음</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6개월 전</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>논문 C</p></td>
     <td><p>중간</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1일 전</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>논문 D</p></td>
     <td><p>중상</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3주 전</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>3</td>
   </tr>
</table>
<p>감쇠 재순위를 적용하지 않는다면, 논문 B는 순수한 벡터 유사도(0.92) 기준으로 가장 높은 순위를 차지할 것입니다. 그러나 감쇠 재순위를 적용하면:</p>
<ul>
<li><p>논문 C는 유사도가 중간 수준임에도 불구하고, 매우 최근(어제 발표됨)에 발표된 논문이기 때문에 1위로 뛰어올랐습니다.</p></li>
<li><p>논문 B는 유사도가 매우 높음에도 불구하고 비교적 오래된 논문이기 때문에 4위로 떨어집니다</p></li>
<li><p>논문 D는 COSINE 유사도를 사용하므로, 감쇠를 적용하기 전에 0.76이라는 점수가 그대로 사용됩니다</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">적절한 감쇠 재순위 지정 알고리즘 선택하기<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 각각 특정 사용 사례에 맞게 설계된 다음과 같은 다양한 감쇠 재순위 지정 기능을 제공합니다: <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>:</p>
<table>
   <tr>
     <th><p>감쇠 랭커</p></th>
     <th><p>특징</p></th>
     <th><p>적합한 사용 사례</p></th>
     <th><p>예시 시나리오</p></th>
   </tr>
   <tr>
     <td><p>가우시안 (<code translate="no">gauss</code>)</p></td>
     <td><p>적당히 확장되는 자연스러운 점진적 감소</p></td>
     <td><ul><li><p>균형 잡힌 결과가 필요한 일반적인 검색</p></li><li><p>사용자가 거리에 대한 직관적인 감각을 가지고 있는 애플리케이션</p></li><li><p>적당한 거리가 결과에 심각한 불이익을 주어서는 안 되는 경우</p></li></ul></td>
     <td><p>식당 검색 시, 3km 떨어진 양질의 식당도 인근 옵션보다 순위는 낮지만 여전히 검색 결과에 노출됩니다</p></td>
   </tr>
   <tr>
     <td><p>지수형 (<code translate="no">exp</code>)</p></td>
     <td><p>초기에는 급격히 감소하지만 롱테일 현상을 유지함</p></td>
     <td><ul><li><p>최신성이 중요한 뉴스 피드</p></li><li><p>최신 콘텐츠가 주를 이루어야 하는 소셜 미디어</p></li><li><p>근접성이 매우 중요하지만, 예외적으로 우수한 원거리 항목은 계속 노출되어야 할 때</p></li></ul></td>
     <td><p>뉴스 앱에서는 어제 게시된 기사가 일주일 전 콘텐츠보다 훨씬 높은 순위를 차지하지만, 관련성이 매우 높은 오래된 기사도 여전히 표시될 수 있습니다</p></td>
   </tr>
   <tr>
     <td><p>선형형 (<code translate="no">linear</code>)</p></td>
     <td><p>명확한 기준점을 둔 일관되고 예측 가능한 감소</p></td>
     <td><ul><li><p>자연스러운 경계가 있는 애플리케이션</p></li><li><p>거리 제한이 있는 서비스</p></li><li><p>만료일이나 명확한 기준이 있는 콘텐츠</p></li></ul></td>
     <td><p>이벤트 검색기에서는 향후 2주 이상의 기간이 남은 이벤트는 아예 표시되지 않습니다</p></td>
   </tr>
</table>
<p>각 감쇠 랭커가 점수를 계산하는 방식과 구체적인 감소 패턴에 대한 자세한 내용은 전용 문서를 참조하십시오:</p>
<ul>
<li><p><a href="/docs/ko/gaussian-decay.md">가우시안 감쇠</a></p></li>
<li><p><a href="/docs/ko/exponential-decay.md">지수 감쇠</a></p></li>
<li><p><a href="/docs/ko/linear-decay.md">선형 감쇠</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">구현 예시<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>감쇠 랭커는 Milvus의 표준 벡터 검색 및 하이브리드 검색 작업 모두에 적용할 수 있습니다. 다음은 이 기능을 구현하기 위한 주요 코드 예시입니다.</p>
<div class="alert note">
<p>감쇠 함수를 사용하기 전에, 먼저 감쇠 계산에 사용될 적절한 수치형 필드(타임스탬프, 거리 등)를 포함하는 컬렉션을 생성해야 합니다. 컬렉션 설정, 스키마 정의 및 데이터 삽입을 포함한 완전한 작동 예제는 <a href="/docs/ko/tutorial-implement-a-time-based-ranking-in-milvus.md">‘튜토리얼: Milvus에서 시간 기반 랭킹 구현’을</a> 참조하십시오.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">감쇠 랭커 생성<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>감쇠 랭킹을 구현하려면 먼저 적절한 구성으로 ` <code translate="no">Function</code> ` 객체를 정의합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>필수?</p></th>
     <th><p>설명</p></th>
     <th><p>값/예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>예</p></td>
     <td><p>검색을 실행할 때 사용되는 함수의 식별자입니다. 사용 사례와 관련된 설명적인 이름을 선택하십시오.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>예</p></td>
     <td><p>감쇠 점수 계산을 위한 숫자형 필드입니다. 감쇠 계산에 사용될 데이터 속성을 결정합니다(예: 시간 기반 감쇠의 경우 타임스탬프, 위치 기반 감쇠의 경우 좌표). </p><p>컬렉션 내에 관련 수치 값을 포함하는 필드여야 합니다. INT8/16/32/64, FLOAT, DOUBLE을 지원합니다.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>예</p></td>
     <td><p>생성되는 함수의 유형을 지정합니다.</p><p>모든 감쇠 랭커의 경우 반드시 ` <code translate="no">RERANK</code> `로 설정해야 합니다.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>예</p></td>
     <td><p>사용할 재순위 지정 방법을 지정합니다.</p><p>감쇠 순위 지정 기능을 활성화하려면 <code translate="no">"decay"</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>예</p></td>
     <td><p>적용할 수학적 감쇠 랭커를 지정합니다. 관련성 감소 곡선의 모양을 결정합니다.</p><p><a href="/docs/ko/decay-ranker-overview.md#Choose-the-right-decay-ranker">적절한 함수를 선택하는</a> 방법에 대한 지침은 ‘적절한 <a href="/docs/ko/decay-ranker-overview.md#Choose-the-right-decay-ranker">감쇠 순위 결정기 선택’</a> 섹션을 참조하십시오.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code> 또는 <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>예</p></td>
     <td><p>감쇠 점수가 계산되는 기준점입니다. 이 값을 가진 항목은 최대 관련성 점수를 받습니다.</p><p>시간 기반 감쇠의 경우, 시간 단위는 컬렉션 데이터와 일치해야 합니다.</p></td>
     <td><ul><li><p>타임스탬프의 경우: 현재 시간(예: <code translate="no">int(time.time())</code>)</p></li><li><p>지리적 위치의 경우: 사용자의 현재 좌표</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>예</p></td>
     <td><p>관련성이 <code translate="no">decay</code> 값으로 떨어지는 거리 또는 시간입니다. 관련성이 얼마나 빠르게 감소하는지 제어합니다.</p><p>시간 기반 감쇠의 경우, 시간 단위는 수집 데이터와 일치해야 합니다.</p><p>값이 클수록 관련성이 더 서서히 감소하고, 값이 작을수록 더 가파르게 감소합니다.</p></td>
     <td><ul><li><p>시간의 경우: 초 단위의 기간(예: 7일 동안 <code translate="no">7 * 24 * 60 * 60</code> )</p></li><li><p>거리의 경우: 미터(예: 5km의 <code translate="no">5000</code> )</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>아니요</p></td>
     <td><p><code translate="no">origin</code> 주변에 "감쇠 없음 구역"을 생성하여, 해당 구역 내의 항목은 전체 점수(감쇠 점수 = 1.0)를 유지합니다.</p><p>시간 기반 감쇠의 경우, 시간 단위는 수집 데이터와 일치해야 합니다.</p><p><code translate="no">origin</code> 에서 이 범위 내의 항목은 최대 관련성을 유지합니다.</p></td>
     <td><ul><li><p>시간의 경우: 초 단위의 기간(예: <code translate="no">24 * 60 * 60</code> for 1 day)</p></li><li><p>거리의 경우: 미터 (예: <code translate="no">500</code> 500m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>아니요</p></td>
     <td><p><code translate="no">scale</code> 거리에서의 점수 값으로, 곡선의 가파름을 제어합니다. 값이 낮을수록 하강 곡선이 더 가파르고, 값이 높을수록 하강 곡선이 더 완만해집니다.</p><p>0에서 1 사이여야 합니다.</p></td>
     <td><p><code translate="no">0.5</code> (기본값)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">표준 벡터 검색에 적용<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>감쇠 랭커를 정의한 후에는 ` <code translate="no">ranker</code> ` 매개변수에 전달하여 검색 작업 중에 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
