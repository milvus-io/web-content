---
id: consistency.md
summary: Milvus의 4가지 일관성 수준에 대해 알아보세요.
title: 일관성
---
<h1 id="Consistency" class="common-anchor-header">일관성<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus의 네 가지 일관성 수준과 그에 가장 적합한 시나리오를 소개합니다. Milvus에서 일관성을 보장하는 메커니즘도 이 주제에서 다룹니다.</p>
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
    </button></h2><p>분산 데이터베이스의 일관성이란 특정 시간에 데이터를 쓰거나 읽을 때 모든 노드 또는 복제본이 동일한 데이터 보기를 갖도록 보장하는 속성을 의미합니다.</p>
<p>Milvus는 네 가지 일관성 수준, 즉 강력, 경계가 있는 유효성 유지, 세션, 최종의 일관성 수준을 지원합니다. Milvus의 기본 일관성 수준은 제한적 무결성입니다. <a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a>, <a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a> 또는 <a href="/docs/ko/v2.4.x/get-and-scalar-query.md">쿼리를</a> 수행할 때 일관성 수준을 애플리케이션에 가장 적합하도록 쉽게 조정할 수 있습니다.</p>
<h2 id="Consistency-levels" class="common-anchor-header">일관성 수준<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a> 정리에 정의된 바와 같이, 분산 데이터베이스는 일관성, 가용성, 지연 시간 사이에서 균형을 맞춰야 합니다. 일관성이 높으면 정확도가 높지만 검색 대기 시간이 길어지고, 일관성이 낮으면 검색 속도는 빠르지만 데이터 가시성이 어느 정도 손실됩니다. 따라서 서로 다른 수준의 일관성은 서로 다른 시나리오에 적합합니다.</p>
<p>다음은 Milvus에서 지원하는 네 가지 일관성 수준의 차이점과 각 일관성 수준이 적합한 시나리오에 대해 설명합니다.</p>
<h3 id="Strong" class="common-anchor-header">강함</h3><p>강함은 가장 높고 엄격한 일관성 수준입니다. 사용자가 최신 버전의 데이터를 읽을 수 있도록 보장합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>강력한 일관성</span> </span></p>
<p>PACELC 정리에 따르면 일관성 수준을 강으로 설정하면 지연 시간이 증가합니다. 따라서 테스트 결과의 정확성을 보장하기 위해 기능 테스트 중에 강력한 일관성을 선택하는 것이 좋습니다. 강력한 일관성은 검색 속도를 희생하는 대신 데이터 일관성에 대한 엄격한 요구가 있는 애플리케이션에도 가장 적합합니다. 주문 결제 및 청구를 처리하는 온라인 금융 시스템을 예로 들 수 있습니다.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">바운드 스탤런트</h3><p>이름에서 알 수 있듯이 경계부실성은 특정 기간 동안 데이터 불일치를 허용합니다. 그러나 일반적으로 데이터는 해당 기간 외에는 항상 전 세계적으로 일관성을 유지합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>바운딩된 유효기간 일관성</span> </span></p>
<p>제한적 유효성 검사는 검색 지연 시간을 제어해야 하고 산발적인 데이터 비가시성을 허용할 수 있는 시나리오에 적합합니다. 예를 들어 동영상 추천 엔진과 같은 추천 시스템에서 데이터 비가시성은 전체 리콜률에 미치는 영향은 미미하지만 추천 시스템의 성능을 크게 향상시킬 수 있습니다.</p>
<h3 id="Session" class="common-anchor-header">세션</h3><p>세션은 모든 데이터 쓰기가 동일한 세션 동안 읽기에서 즉시 인식될 수 있도록 합니다. 즉, 하나의 클라이언트를 통해 데이터를 쓰면 새로 삽입된 데이터를 즉시 검색할 수 있게 됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>세션 일관성</span> </span></p>
<p>동일한 세션에서 데이터 일관성에 대한 요구가 높은 시나리오에서는 일관성 수준으로 세션을 선택하는 것이 좋습니다. 예를 들어 라이브러리 시스템에서 도서 항목의 데이터를 삭제하고 삭제를 확인한 후 페이지를 새로고침(다른 세션)하면 해당 도서가 더 이상 검색 결과에 표시되지 않아야 합니다.</p>
<h3 id="Eventually" class="common-anchor-header">결국</h3><p>읽기 및 쓰기 순서는 보장되지 않으며, 더 이상의 쓰기 작업이 수행되지 않으면 복제본은 결국 동일한 상태로 수렴합니다. &quot;결국&quot; 일관성에서는 복제본이 최신 업데이트된 값으로 읽기 요청에 대해 작업을 시작합니다. 최종 일관성은 네 가지 수준 중 가장 약한 수준입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>최종 일관성</span> </span></p>
<p>그러나 PACELC 정리에 따르면 일관성을 희생하면 검색 지연 시간을 엄청나게 단축할 수 있습니다. 따라서 최종 일관성은 데이터 일관성에 대한 요구가 높지 않지만 매우 빠른 검색 성능이 필요한 시나리오에 가장 적합합니다. 예를 들어 Amazon 제품의 리뷰 및 평점을 궁극적으로 일관된 수준으로 검색하는 경우를 들 수 있습니다.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">타임스탬프 보장<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Guarantee 타임스탬프</a> (GuaranteeTs)를 도입하여 다양한 일관성 수준을 실현합니다.</p>
<p>보장 타임스탬프는 쿼리 노드가 보장 타임스탬프 이전의 모든 데이터를 확인할 수 있을 때까지 검색 또는 쿼리 요청이 수행되지 않음을 쿼리 노드에 알리는 역할을 합니다. 일관성 수준을 지정하면 일관성 수준이 특정 GuaranteeTs 값에 매핑됩니다. 다른 GuaranteeTs 값은 다른 일관성 수준에 해당합니다:</p>
<ul>
<li><p><strong>강함</strong>: GuaranteeTs가 최신 시스템 타임스탬프와 동일하게 설정되며, 쿼리 노드는 검색 또는 쿼리 요청을 처리하기 전에 최신 시스템 타임스탬프 이전의 모든 데이터를 볼 수 있을 때까지 기다립니다.</p></li>
<li><p><strong>바운드 스탤런트</strong>: 보장 기간이 최신 시스템 타임스탬프보다 상대적으로 작게 설정되며 쿼리 노드는 허용 가능한, 업데이트가 덜 된 데이터 보기에서 검색합니다.</p></li>
<li><p><strong>세션</strong>: 클라이언트는 최신 쓰기 작업의 타임스탬프를 GuaranteeT로 사용하므로 각 클라이언트는 최소한 동일한 클라이언트가 삽입한 데이터를 검색할 수 있습니다.</p></li>
<li><p><strong>결국</strong> 일관성 검사를 건너뛰기 위해 GuaranteeTs를 매우 작은 값으로 설정합니다. 쿼리 노드는 기존 데이터 보기에서 즉시 검색합니다.</p></li>
</ul>
<p>Milvus에서 다양한 수준의 일관성을 보장하는 메커니즘에 대한 자세한 내용은 <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">GuaranteeTs의 작동 방식을</a> 참조하세요.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>일관성 수준을 조정하는 방법을 알아보세요:<ul>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색 수행</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색 수행</a></li>
<li><a href="/docs/ko/v2.4.x/get-and-scalar-query.md">스칼라 쿼리 수행</a></li>
</ul></li>
</ul>
