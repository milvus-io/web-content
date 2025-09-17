---
id: boost-ranker.md
title: 부스트 랭커Compatible with Milvus v2.6.2+
summary: >-
  부스트 랭커를 사용하면 벡터 거리를 기반으로 계산된 의미적 유사성에만 의존하는 대신 의미 있는 방식으로 검색 결과에 영향을 줄 수 있습니다.
  메타데이터 필터링을 사용해 검색 결과를 빠르게 조정하는 데 이상적입니다.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">부스트 랭커<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>부스트 랭커를 사용하면 벡터 거리를 기반으로 계산된 의미적 유사성에만 의존하는 대신 의미 있는 방식으로 검색 결과에 영향을 줄 수 있습니다. 메타데이터 필터링을 사용하여 검색 결과를 빠르게 조정하는 데 이상적입니다.</p>
<p>검색 요청에 부스트 랭커 기능이 포함된 경우, Milvus는 기능 내의 선택적 필터링 조건을 사용하여 검색 결과 후보 중에서 일치하는 항목을 찾고 지정된 가중치를 적용하여 일치하는 항목의 점수를 높여 최종 결과에서 일치하는 항목의 순위를 올리거나 내릴 수 있도록 도와줍니다.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">부스트 랭커를 사용하는 경우<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>크로스 인코더 모델이나 융합 알고리즘에 의존하는 다른 랭커와 달리, 부스트 랭커는 메타데이터 기반 규칙을 직접 랭킹 프로세스에 삽입하므로 다음과 같은 시나리오에 더 적합합니다.</p>
<table>
   <tr>
     <th><p>사용 사례</p></th>
     <th><p>예시</p></th>
     <th><p>부스트 랭커가 잘 작동하는 이유</p></th>
   </tr>
   <tr>
     <td><p>비즈니스 중심 콘텐츠 우선순위 지정</p></td>
     <td><ul><li><p>이커머스 검색 결과에서 프리미엄 제품 강조 표시</p></li><li><p>사용자 참여 지표(조회수, 좋아요, 공유 등)가 높은 콘텐츠의 가시성 향상</p></li><li><p>시간에 민감한 검색 애플리케이션에서 최신 콘텐츠의 우선 순위 높이기</p></li><li><p>검증되거나 신뢰할 수 있는 출처의 콘텐츠 우선 순위 지정</p></li><li><p>정확한 구문 또는 관련성이 높은 키워드와 일치하는 결과 향상</p></li></ul></td>
     <td rowspan="2"><p>인덱스를 재구축하거나 벡터 임베딩 모델을 수정할 필요 없이, 시간이 많이 소요되는 작업인 선택적 메타데이터 필터를 실시간으로 적용하여 검색 결과에서 특정 항목을 즉시 승격하거나 강등할 수 있습니다. 이 메커니즘을 통해 진화하는 비즈니스 요구사항에 쉽게 적응할 수 있는 유연하고 동적인 검색 순위가 가능합니다.</p></td>
   </tr>
   <tr>
     <td><p>전략적 콘텐츠 순위 하향 조정</p></td>
     <td><ul><li><p>인벤토리가 낮은 항목의 순위를 완전히 제거하지 않고 눈에 잘 띄지 않게 하기</p></li><li><p>검열 없이 불쾌감을 줄 수 있는 용어가 포함된 콘텐츠의 순위를 낮추기</p></li><li><p>기술 검색에서는 계속 액세스할 수 있도록 하면서 오래된 문서의 등급을 낮추기</p></li><li><p>마켓플레이스 검색에서 경쟁사 제품의 가시성을 미묘하게 낮추기</p></li><li><p>품질이 낮은 콘텐츠의 관련성 감소(서식 문제, 짧은 길이 등)</p></li></ul></td>
   </tr>
</table>
<p>여러 개의 부스트 랭커를 결합하여 보다 역동적이고 강력한 가중치 기반 순위 전략을 구현할 수도 있습니다.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">부스트 랭커의 메커니즘<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 다이어그램은 부스트 랭커의 주요 워크플로우를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>부스트 랭커 메커니즘</span> </span></p>
<p>사용자가 데이터를 입력하면 Milvus는 데이터를 세그먼트에 분산시킵니다. 검색이 진행되는 동안 각 세그먼트는 후보 세트를 반환하고, Milvus는 모든 세그먼트에서 이러한 후보의 순위를 매겨 최종 결과를 생성합니다. 검색 요청에 부스트 랭커가 포함된 경우, Milvus는 각 세그먼트의 후보 결과에 이를 적용하여 잠재적인 정확도 손실을 방지하고 리콜률을 향상시킵니다.</p>
<p>결과를 최종 확정하기 전에 Milvus는 다음과 같이 부스트 랭커로 이러한 후보를 처리합니다:</p>
<ol>
<li><p>부스트 랭커에 지정된 선택적 필터링 표현식을 적용하여 표현식과 일치하는 엔티티를 식별합니다.</p></li>
<li><p>부스트 랭커에 지정된 가중치를 적용하여 식별된 엔티티의 점수를 부스트합니다.</p></li>
</ol>
<div class="alert note">
<p>멀티벡터 하이브리드 검색에서는 부스트 랭커를 순위 결정자로 사용할 수 없습니다. 그러나 하위 요청(<code translate="no">AnnSearchRequest</code>)에서 순위 결정자로 사용할 수 있습니다.</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">부스트 랭커의 예<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예는 가장 관련성이 높은 상위 5개 엔티티를 반환하고 추상 문서 유형의 엔티티 점수에 가중치를 추가해야 하는 단일 벡터 검색에서 부스트 랭커를 사용하는 방법을 설명합니다.</p>
<ol>
<li><p><strong>검색 결과 후보를 세그먼트 단위로 수집합니다.</strong></p>
<p>다음 표에서는 Milvus가 엔티티를 두 개의 세그먼트<strong>(0001</strong> 및 <strong>0002</strong>)로 분배하고 각 세그먼트에서 5개의 후보를 반환한다고 가정합니다.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>문서 유형</p></th>
<th><p>점수</p></th>
<th><p>순위</p></th>
<th><p>세그먼트</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstract</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstract</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>body</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>title</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>body</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>body</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstract</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstract</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstract</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>부스트 랭커(</strong><code translate="no">doctype='abstract'</code><strong>)에 지정된 필터링 표현식을 적용합니다</strong>.</p>
<p>다음 표의 <code translate="no">DocType</code> 필드에 표시된 대로 Milvus는 추가 처리를 위해 <code translate="no">doctype</code> 을 <code translate="no">abstract</code> 로 설정한 모든 엔티티를 표시합니다.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Score</p></th>
<th><p>Rank</p></th>
<th><p>세그먼트</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>body</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>title</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>body</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>body</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>부스트 랭커(</strong><code translate="no">weight=0.5</code><strong>)에 지정된 가중치를 적용합니다</strong>.</p>
<p>이전 단계에서 식별된 모든 엔티티에 부스트 랭커에 지정된 가중치가 곱해져 순위가 변경됩니다.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>문서 유형</p></th>
<th><p>점수</p></th>
<th><p>가중 점수 </p><p>(= 점수 x 가중치)</p></th>
<th><p>순위</p></th>
<th><p>세그먼트</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>body</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>title</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>body</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>body</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>가중치는 사용자가 선택한 부동 소수점 숫자여야 합니다. 위의 예와 같이 점수가 작을수록 관련성이 높은 경우에는 <strong>1보다</strong> 작은 가중치를 사용하고, 그렇지 않은 경우에는 <strong>1보다</strong> 큰 가중치를 사용합니다.</p>
<p></div></p></li>
<li><p><strong>가중치를 적용한 점수를 기준으로 모든 세그먼트의 후보를 집계하여 결과를 최종 확정합니다.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>문서 유형</p></th>
<th><p>점수</p></th>
<th><p>가중 점수</p></th>
<th><p>순위</p></th>
<th><p>세그먼트</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstract</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">부스트 랭커 사용법<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 부스트 랭커를 사용하여 단일 벡터 검색 결과에 영향을 미치는 방법에 대한 예시를 보여드립니다.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">부스트 랭커 생성하기<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>부스트 랭커를 검색 요청의 재랭커로 전달하기 전에 다음과 같이 부스트 랭커를 재랭크 함수로 올바르게 정의해야 합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
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
     <td><p>이 함수의 고유 식별자</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>예</p></td>
     <td><p>함수를 적용할 벡터 필드 목록(RRF 랭커의 경우 비어 있어야 함).</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Yes</p></td>
     <td><p>호출할 함수의 유형( <code translate="no">RERANK</code> 을 사용하여 재랭킹 전략을 지정합니다.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>재랭커의 유형을 지정합니다.</p><p>부스트 랭커를 사용하려면 <code translate="no">boost</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Yes</p></td>
     <td><p>원시 검색 결과에서 일치하는 엔티티의 점수에 곱할 가중치를 지정합니다.</p><p>값은 부동 소수점 숫자여야 합니다. </p><ul><li><p>일치하는 엔티티의 중요성을 강조하려면 점수를 높이는 값으로 설정하세요.</p></li><li><p>일치하는 엔티티의 점수를 낮추려면 이 매개변수에 점수를 낮추는 값을 지정합니다.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>검색 결과 엔티티 중 엔티티를 일치시키는 데 사용할 필터 표현식을 지정합니다. <a href="/docs/ko/boolean.md">필터링 설명</a>에 언급된 모든 유효한 기본 필터 표현식을 사용할 수 있습니다.</p><p><strong>참고</strong>: <code translate="no">==</code>, <code translate="no">&gt;</code> 또는 <code translate="no">&lt;</code> 과 같은 기본 연산자만 사용하세요. <code translate="no">text_match</code> 또는 <code translate="no">phrase_match</code> 과 같은 고급 연산자를 사용하면 검색 성능이 저하됩니다.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">0</code> ~ <code translate="no">1</code> 사이의 값을 임의로 생성하는 임의 함수를 지정합니다. 다음 두 가지 선택적 인수가 있습니다:</p><ul><li><p><code translate="no">seed</code> (숫자) 의사 난수 생성기(PRNG)를 시작하는 데 사용되는 초기 값을 지정합니다.</p></li><li><p><code translate="no">field</code> (문자열) 난수를 생성할 때 임의의 요소로 사용될 값의 필드 이름을 지정합니다. 고유한 값을 가진 필드로 충분합니다.</p><p>동일한 시드 및 필드 값을 사용하여 여러 세대에 걸쳐 일관성을 유지하려면 <code translate="no">seed</code> 및 <code translate="no">field</code> 을 모두 설정하는 것이 좋습니다.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">단일 부스트 랭커로 검색하기<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>부스트 랭커 기능이 준비되면 검색 요청에서 이를 참조할 수 있습니다. 다음 예제에서는 <strong>id</strong>, <strong>벡터</strong>, <strong>doctype</strong> 필드가 있는 컬렉션을 이미 생성했다고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">여러 부스트 랭커로 검색하기<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>하나의 검색에 여러 부스트 랭커를 결합하여 검색 결과에 영향을 줄 수 있습니다. 이렇게 하려면 여러 개의 부스트 랭커를 생성하고, 이를 <strong>FunctionScore</strong> 인스턴스에서 참조한 다음, 검색 요청에서 해당 <strong>FunctionScore</strong> 인스턴스를 랭커로 사용합니다.</p>
<p>다음 예는 <strong>0.8에서</strong> <strong>1.2</strong> 사이의 가중치를 적용하여 식별된 모든 엔티티의 점수를 수정하는 방법을 보여줍니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>구체적으로 두 개의 부스트 랭커가 있는데, 하나는 발견된 모든 엔티티에 고정 가중치를 적용하고 다른 하나는 무작위 가중치를 할당합니다. 그런 다음 이 두 랭커를 <strong>FunctionScore에서</strong> 참조하여 가중치가 발견된 엔티티의 점수에 영향을 미치는 방식을 정의합니다.</p>
<p>다음 표에는 <strong>FunctionScore</strong> 인스턴스를 만드는 데 필요한 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>필수?</p></th>
     <th><p>설명</p></th>
     <th><p>값/예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>예</p></td>
     <td><p>목록에 있는 대상 랭커의 이름을 지정합니다.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>아니요</p></td>
     <td><p>지정된 가중치가 일치하는 엔티티의 점수에 영향을 미치는 방식을 지정합니다.</p><p>가능한 값은 다음과 같습니다:</p><ul><li><p><code translate="no">Multiple</code></p><p>가중치 값이 일치하는 엔티티의 원래 점수에 지정된 가중치를 곱한 값과 같음을 나타냅니다. </p><p>이것이 기본값입니다.</p></li><li><p><code translate="no">Sum</code></p><p>가중값이 일치하는 엔티티의 원래 점수와 지정된 가중치의 합과 같음을 나타냅니다.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>아니요</p></td>
     <td><p>다양한 부스트 랭커의 가중치가 처리되는 방식을 지정합니다.</p><p>가능한 값은 다음과 같습니다:</p><ul><li><p><code translate="no">Multiplify</code></p><p>일치하는 엔티티의 최종 점수가 모든 부스트 랭커의 가중치를 곱한 값과 같음을 나타냅니다.</p><p>이것이 기본값입니다.</p></li><li><p><code translate="no">Sum</code></p><p>일치하는 엔티티의 최종 점수가 모든 부스트 랭커의 가중치 합과 같음을 나타냅니다.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
