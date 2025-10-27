---
id: decay-ranker-overview.md
title: 디케이 랭커 개요Compatible with Milvus 2.6.x
summary: >-
  기존의 벡터 검색에서는 순전히 벡터 유사도, 즉 벡터가 수학적 공간에서 얼마나 일치하는지에 따라 결과의 순위가 매겨집니다. 하지만 실제
  애플리케이션에서 콘텐츠의 진정한 연관성은 의미론적 유사성 이상의 요소에 의해 좌우되는 경우가 많습니다.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">디케이 랭커 개요<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>기존의 벡터 검색에서는 순전히 벡터 유사도, 즉 벡터가 수학적 공간에서 얼마나 가깝게 일치하는지에 따라 결과의 순위가 매겨집니다. 하지만 실제 애플리케이션에서 콘텐츠의 진정한 연관성은 의미론적 유사성 이상의 요소에 의해 좌우되는 경우가 많습니다.</p>
<p>다음과 같은 일상적인 시나리오를 생각해 보세요:</p>
<ul>
<li><p>3년 전의 유사한 기사보다 어제 기사가 더 높은 순위를 차지해야 하는 뉴스 검색</p></li>
<li><p>30분 거리에 있는 식당보다 5분 거리에 있는 식당을 우선시하는 식당 찾기 기능</p></li>
<li><p>검색어와 약간 덜 유사한 제품일지라도 인기 있는 제품의 순위를 높여주는 이커머스 플랫폼</p></li>
</ul>
<p>이러한 시나리오는 모두 벡터 유사성과 시간, 거리 또는 인기도와 같은 다른 수치적 요소의 균형을 맞추는 공통된 요구 사항을 공유합니다.</p>
<p>Milvus의 디케이 랭커는 숫자 필드 값을 기반으로 검색 순위를 조정하여 이러한 요구를 해결합니다. 이를 통해 벡터 유사도와 '최신성', '근접성' 또는 데이터의 다른 숫자 속성의 균형을 맞춰 보다 직관적이고 맥락에 맞는 검색 환경을 만들 수 있습니다.</p>
<h2 id="Usage-notes" class="common-anchor-header">사용 참고 사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>그룹 검색에는 감쇠 순위를 사용할 수 없습니다.</p></li>
<li><p>감쇠 순위에 사용되는 필드는 숫자(<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>)여야 합니다.</p></li>
<li><p>각 붕괴 순위는 하나의 숫자 필드만 사용할 수 있습니다.</p></li>
<li><p><strong>시간 단위 일관성</strong>: 시간 기반 감쇠 순위를 사용하는 경우 <code translate="no">origin</code>, <code translate="no">scale</code>, <code translate="no">offset</code> 매개변수의 단위는 수집 데이터에 사용된 단위와 일치해야 합니다:</p>
<ul>
<li><p>컬렉션에서 타임스탬프를 <strong>초</strong> 단위로 저장하는 경우 모든 매개변수에 초를 사용합니다.</p></li>
<li><p>컬렉션에서 타임스탬프를 <strong>밀리초</strong> 단위로 저장하는 경우 모든 매개변수에 밀리초를 사용합니다.</p></li>
<li><p>컬렉션이 타임스탬프를 <strong>마이크로초</strong> 단위로 저장하는 경우, 모든 매개변수에 마이크로초를 사용합니다.</p></li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 방식<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>디케이 랭킹은 시간이나 지리적 거리와 같은 숫자 요소를 랭킹 프로세스에 통합하여 기존의 벡터 검색을 향상시킵니다. 전체 프로세스는 다음 단계를 따릅니다:</p>
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
    </button></h3><p>먼저, Milvus는 일관된 비교를 위해 벡터 유사도 점수를 계산하고 정규화합니다:</p>
<ul>
<li><p><strong>L2</strong> 및 <strong>JACCARD</strong> 거리 메트릭(값이 낮을수록 유사성이 높음을 나타냄)의 경우:</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>거리를 0-1 사이의 유사도 점수로 변환하며, 점수가 높을수록 더 좋습니다.</p></li>
<li><p><strong>IP</strong>, <strong>COSINE</strong> 및 <strong>BM25</strong> 메트릭(점수가 높을수록 더 잘 일치함을 의미)의 경우: 점수는 정규화 없이 바로 사용됩니다.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">2단계: 부패 점수 계산하기<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>다음으로 Milvus는 선택한 감쇠 순위자를 사용하여 숫자 필드 값(예: 타임스탬프 또는 거리)을 기반으로 감쇠 점수를 계산합니다:</p>
<ul>
<li><p>각 감쇠 순위자는 원시 숫자 값을 0-1 사이의 정규화된 관련성 점수로 변환합니다.</p></li>
<li><p>감쇠 점수는 이상적인 지점과의 '거리'를 기준으로 항목이 얼마나 관련성이 있는지를 나타냅니다.</p></li>
</ul>
<p>구체적인 계산 공식은 감쇠 랭커 유형에 따라 다릅니다. 감쇠 점수를 계산하는 방법에 대한 자세한 내용은 <a href="/docs/ko/gaussian-decay.md#Formula">가우스 감쇠</a>, <a href="/docs/ko/exponential-decay.md#Formula">지수 감쇠</a>, <a href="/docs/ko/linear-decay.md#Formula">선형 감쇠</a> 전용 페이지를 참조하세요.</p>
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
    </button></h3><p>마지막으로 Milvus는 정규화된 유사도 점수와 감쇠 점수를 결합하여 최종 순위 점수를 산출합니다:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>하이브리드 검색(여러 벡터 필드를 결합)의 경우, Milvus는 검색 요청 중 정규화된 최대 유사도 점수를 취합니다:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>예를 들어, 하이브리드 검색에서 연구 논문이 벡터 유사성에서 0.82점, BM25 기반 텍스트 검색에서 0.91점을 받은 경우, Milvus는 0.91점을 기본 유사성 점수로 사용한 후 감쇠 계수를 적용합니다.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">실제 감쇠 순위<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>시간 기반 감쇠를 사용하여 <strong>'AI 연구 논문'을</strong> 검색하는 실제 시나리오에서 감쇠 순위가 어떻게 적용되는지 살펴봅시다:</p>
<div class="alert note">
<p>이 예에서 감쇠 점수는 시간이 지남에 따라 관련성이 감소하는 방식을 반영하며, 최신 논문은 1.0에 가까운 점수를 받고 오래된 논문은 더 낮은 점수를 받습니다. 이 값은 특정 감쇠 순위자를 사용하여 계산됩니다. 자세한 내용은 <a href="/docs/ko/decay-ranker-overview.md#Choose-the-right-decay-ranker">올바른 감쇠 순위 선택하기를</a> 참조하세요.</p>
</div>
<table>
   <tr>
     <th><p>논문</p></th>
     <th><p>벡터 유사도</p></th>
     <th><p>정규화된 유사도 점수</p></th>
     <th><p>게시 날짜</p></th>
     <th><p>감쇠 점수</p></th>
     <th><p>최종 점수</p></th>
     <th><p>최종 순위</p></th>
   </tr>
   <tr>
     <td><p>Paper A</p></td>
     <td><p>높음</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 주 전</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Paper B</p></td>
     <td><p>매우 높음</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 개월 전</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Paper C</p></td>
     <td><p>Medium</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 일 전</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>종이 D</p></td>
     <td><p>중간 높음</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3주 전</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>감쇠 재순위를 적용하지 않으면 순수 벡터 유사도(0.92)를 기준으로 문서 B가 가장 높은 순위를 차지합니다. 그러나 감쇠 재랭킹을 적용하면:</p>
<ul>
<li><p>C 문서가 매우 최근(어제 게시됨)이기 때문에 중간 정도의 유사성에도 불구하고 1위로 올라갑니다.</p></li>
<li><p>논문 B는 상대적으로 오래되었기 때문에 우수한 유사성에도 불구하고 3위로 떨어집니다.</p></li>
<li><p>문서 D는 L2 거리(낮을수록 좋음)를 사용하므로 감쇠를 적용하기 전에 점수가 1.2에서 0.76으로 정규화됩니다.</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">올바른 감쇠 랭커 선택<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 각각 특정 사용 사례에 맞게 설계된 <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code> 등 다양한 디케이 랭커를 제공합니다:</p>
<table>
   <tr>
     <th><p>디케이 랭커</p></th>
     <th><p>특성</p></th>
     <th><p>이상적인 사용 사례</p></th>
     <th><p>예시 시나리오</p></th>
   </tr>
   <tr>
     <td><p>가우시안 (<code translate="no">gauss</code>)</p></td>
     <td><p>적당히 확장되는 자연스러운 느낌의 점진적 감쇠</p></td>
     <td><ul><li><p>균형 잡힌 결과가 필요한 일반 검색</p></li><li><p>사용자가 직관적으로 거리감을 느낄 수 있는 애플리케이션</p></li><li><p>적당한 거리가 결과에 심각한 불이익을 주지 않아야 하는 경우</p></li></ul></td>
     <td><p>레스토랑 검색에서 3km 떨어진 양질의 장소는 인근 옵션보다 순위가 낮지만 여전히 검색할 수 있습니다.</p></td>
   </tr>
   <tr>
     <td><p>지수 (<code translate="no">exp</code>)</p></td>
     <td><p>처음에는 급격히 감소하지만 긴 꼬리를 유지합니다.</p></td>
     <td><ul><li><p>최신성이 중요한 뉴스 피드</p></li><li><p>신선한 콘텐츠가 지배적이어야 하는 소셜 미디어</p></li><li><p>가까운 항목을 선호하지만 예외적으로 먼 항목도 계속 표시되어야 하는 경우</p></li></ul></td>
     <td><p>뉴스 앱에서 어제 기사의 순위는 일주일 전 콘텐츠보다 훨씬 높지만, 관련성이 높은 오래된 기사가 여전히 표시될 수 있습니다.</p></td>
   </tr>
   <tr>
     <td><p>선형 (<code translate="no">linear</code>)</p></td>
     <td><p>명확한 컷오프를 통한 일관되고 예측 가능한 감소</p></td>
     <td><ul><li><p>자연스러운 경계가 있는 애플리케이션</p></li><li><p>거리 제한이 있는 서비스</p></li><li><p>만료일 또는 명확한 임계값이 있는 콘텐츠</p></li></ul></td>
     <td><p>이벤트 파인더에서 2주 후 이후의 이벤트는 전혀 표시되지 않습니다.</p></td>
   </tr>
</table>
<p>각 감쇠 랭커가 점수를 계산하는 방법과 구체적인 감쇠 패턴에 대한 자세한 내용은 전용 문서를 참조하세요:</p>
<ul>
<li><p><a href="/docs/ko/gaussian-decay.md">가우스 감쇠</a></p></li>
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
    </button></h2><p>디케이 랭커는 Milvus의 표준 벡터 검색과 하이브리드 검색 작업 모두에 적용할 수 있습니다. 다음은 이 기능을 구현하기 위한 주요 코드 스니펫입니다.</p>
<div class="alert note">
<p>감쇠 함수를 사용하기 전에 먼저 감쇠 계산에 사용할 적절한 숫자 필드(타임스탬프, 거리 등)가 포함된 컬렉션을 만들어야 합니다. 컬렉션 설정, 스키마 정의 및 데이터 삽입을 포함한 전체 작업 예제는 <a href="/docs/ko/tutorial-implement-a-time-based-ranking-in-milvus.md">튜토리얼을</a> 참조하세요: <a href="/docs/ko/tutorial-implement-a-time-based-ranking-in-milvus.md">밀버스에서 시간 기반 랭킹 구현하기를</a> 참조하세요.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">감쇠 순위 생성하기<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>감쇠 랭킹을 구현하려면 먼저 적절한 구성으로 <code translate="no">Function</code> 객체를 정의합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
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

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().toEpochMilli())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> decayRanker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).<span class="hljs-title function_">getTime</span>(),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>필수?</p></th>
     <th><p>설명</p></th>
     <th><p>값/예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>예</p></td>
     <td><p>검색을 실행할 때 사용되는 함수의 식별자입니다. 사용 사례와 관련된 설명이 포함된 이름을 선택하세요.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>예</p></td>
     <td><p>감점 점수 계산을 위한 숫자 필드입니다. 부패도 계산에 사용할 데이터 속성을 결정합니다(예: 시간 기반 부패도의 경우 타임스탬프, 위치 기반 부패도의 경우 좌표). </p><p>컬렉션에 관련 숫자 값이 포함된 필드여야 합니다. INT8/16/32/64, FLOAT, DOUBLE을 지원합니다.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>예</p></td>
     <td><p>생성되는 함수 유형을 지정합니다.</p><p>모든 디케이 랭커에 대해 <code translate="no">RERANK</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>사용할 리랭크 방법을 지정합니다.</p><p>부패 순위 기능을 사용하려면 <code translate="no">"decay"</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Yes</p></td>
     <td><p>적용할 수학적 감쇠 순위자를 지정합니다. 관련성 감소의 곡선 모양을 결정합니다.</p><p>적절한 기능을 선택하는 방법에 대한 지침은 <a href="/docs/ko/decay-ranker-overview.md#Choose-the-right-decay-ranker">올바른 감쇠 순위 선택</a> 섹션을 참조하세요.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, 또는 <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>예</p></td>
     <td><p>감쇠 점수를 계산하는 기준점입니다. 이 값에 있는 항목은 최대 연관성 점수를 받습니다.</p><p>시간 기반 감쇠의 경우 시간 단위가 수집 데이터와 일치해야 합니다.</p></td>
     <td><ul><li><p>타임스탬프의 경우: 현재 시간(예: <code translate="no">int(time.time())</code>)</p></li><li><p>지리적 위치의 경우: 사용자의 현재 좌표</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>예</p></td>
     <td><p>관련성이 <code translate="no">decay</code> 값으로 떨어지는 거리 또는 시간. 관련성 감소 속도를 제어합니다.</p><p>시간 기반 쇠퇴의 경우 시간 단위가 수집 데이터와 일치해야 합니다.</p><p>값이 클수록 관련성이 점진적으로 감소하고 값이 작을수록 가파르게 감소합니다.</p></td>
     <td><ul><li><p>시간의 경우: 기간(초)(예: 7일 동안 <code translate="no">7 * 24 * 60 * 60</code> )</p></li><li><p>거리의 경우: 미터(예: 5km의 경우 <code translate="no">5000</code> )</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>No</p></td>
     <td><p>항목이 만점을 유지하는 <code translate="no">origin</code> 주위에 "감쇠 없음 영역"을 만듭니다(감쇠 점수 = 1.0).</p><p>시간 기반 감쇠의 경우 시간 단위가 수집 데이터와 일치해야 합니다.</p><p>이 범위( <code translate="no">origin</code> ) 내의 항목은 최대 관련성을 유지합니다.</p></td>
     <td><ul><li><p>시간의 경우: 기간(초)(예: 1일의 경우 <code translate="no">24 * 60 * 60</code> )</p></li><li><p>거리의 경우: 미터(예: 500m의 경우 <code translate="no">500</code> )</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>아니요</p></td>
     <td><p><code translate="no">scale</code> 거리의 점수 값으로 커브의 가파른 정도를 제어합니다. 값이 낮을수록 가파른 감소 곡선을 만들고 값이 높을수록 완만한 감소 곡선을 만듭니다.</p><p>0에서 1 사이여야 합니다.</p></td>
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
    </button></h3><p>감쇠 순위자를 정의한 후 <code translate="no">ranker</code> 파라미터에 전달하여 검색 작업 중에 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">하이브리드 검색에 적용<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>여러 벡터 필드를 결합하는 하이브리드 검색 작업에도 디케이 랭커를 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[your_query_vector_1], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[your_query_vector_2], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding)))
        .limit(<span class="hljs-number">20</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .limit(<span class="hljs-number">20</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> denseRequest = {
  <span class="hljs-attr">data</span>: [your_query_vector_1], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">20</span>,
};

<span class="hljs-keyword">const</span> sparseRequest = {
  <span class="hljs-attr">data</span>: [your_query_vector_2], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">20</span>,
};

<span class="hljs-keyword">const</span> hybridResults = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">hybrid_search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [denseRequest, sparseRequest],
  <span class="hljs-attr">ranker</span>: decayRanker,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>하이브리드 검색에서 Milvus는 먼저 모든 벡터 필드에서 최대 유사성 점수를 찾은 다음 해당 점수에 감쇠 계수를 적용합니다.</p>
