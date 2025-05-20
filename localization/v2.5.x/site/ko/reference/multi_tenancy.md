---
id: multi_tenancy.md
title: 멀티 테넌시 구현
summary: Milvus에서 멀티테넌트란 여러 고객 또는 팀(테넌트라고 함)이 격리된 데이터 환경을 유지하면서 동일한 클러스터를 공유한다는 의미입니다.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">멀티 테넌시 구현<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 멀티 테넌트란 여러 고객 또는 팀( <strong>테넌트라고</strong>함) <strong>이</strong>격리된 데이터 환경을 유지하면서 동일한 클러스터를 공유하는 것을 의미합니다.</p>
<p>Milvus는 확장성, 데이터 격리, 유연성 사이에서 각각 다른 절충안을 제공하는 네 가지 멀티 테넌시 전략을 지원합니다. 이 가이드에서는 각 옵션에 대해 자세히 설명하여 사용 사례에 가장 적합한 전략을 선택할 수 있도록 도와드립니다.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">멀티 테넌시 전략<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 4가지 수준의 멀티 테넌시를 지원합니다: <strong>데이터베이스</strong>, <strong>컬렉션</strong>, <strong>파티션</strong> 및 <strong>파티션 키</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">데이터베이스 수준 멀티 테넌시</h3><p>데이터베이스 수준 멀티테넌시를 사용하면 각 테넌트는 하나 이상의 컬렉션이 포함된 해당 <a href="/docs/ko/manage_databases.md">데이터베이스를</a> 받게 됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>데이터베이스 수준 멀티 테넌시</span> </span></p>
<ul>
<li><p><strong>확장성</strong>: 데이터베이스 수준 멀티 테넌시 전략은 기본적으로 최대 64개의 테넌트를 지원합니다.</p></li>
<li><p><strong>데이터 격리</strong>: 각 데이터베이스의 데이터는 완전히 분리되어 있어 규제 환경이나 엄격한 규정 준수 요구 사항이 있는 고객에게 이상적인 엔터프라이즈급 데이터 격리를 제공합니다.</p></li>
<li><p><strong>유연성</strong>: 각 데이터베이스는 서로 다른 스키마를 가진 컬렉션을 가질 수 있어 매우 유연한 데이터 구성을 제공하고 각 테넌트가 고유한 데이터 스키마를 가질 수 있습니다.</p></li>
<li><p><strong>기타</strong>: 이 전략은 RBAC도 지원하므로 테넌트별 사용자 액세스를 세밀하게 제어할 수 있습니다. 또한 특정 테넌트에 대한 데이터를 유연하게 로드하거나 해제하여 핫 데이터와 콜드 데이터를 효과적으로 관리할 수 있습니다.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">컬렉션 수준 멀티 테넌시</h3><p>컬렉션 수준 멀티 테넌시를 사용하면 각 테넌트에 <a href="/docs/ko/manage-collections.md">컬렉션이</a> 할당되어 강력한 데이터 격리가 가능합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>컬렉션 수준 멀티 테넌시</span> </span></p>
<ul>
<li><p><strong>확장성</strong>: 클러스터는 기본적으로 최대 65,536개의 컬렉션을 보유할 수 있으므로, 이 전략은 클러스터 내에서 동일한 수의 테넌트를 수용할 수 있습니다.</p></li>
<li><p><strong>데이터 격리</strong>: 컬렉션은 물리적으로 서로 격리됩니다. 이 전략은 강력한 데이터 격리를 제공합니다.</p></li>
<li><p><strong>유연성</strong>: 이 전략을 사용하면 각 컬렉션이 자체 스키마를 가질 수 있으므로 서로 다른 데이터 스키마를 가진 테넌트를 수용할 수 있습니다.</p></li>
<li><p><strong>기타</strong>: 이 전략은 RBAC도 지원하므로 테넌트에 대한 세분화된 액세스 제어가 가능합니다. 또한 특정 테넌트에 대한 데이터를 유연하게 로드하거나 해제하여 핫 데이터와 콜드 데이터를 효과적으로 관리할 수 있습니다.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">파티션 수준 멀티 테넌시</h3><p>파티션 수준 멀티 테넌시에서는 각 테넌트가 공유 컬렉션 내에서 수동으로 생성된 <a href="/docs/ko/manage-partitions.md">파티션에</a> 할당됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>파티션 수준 멀티 테넌시</span> </span></p>
<ul>
<li><p><strong>확장성</strong>: 컬렉션당 최대 1,024개의 파티션을 보유할 수 있으므로 컬렉션 내에서 동일한 수의 테넌트를 보유할 수 있습니다.</p></li>
<li><p><strong>데이터 격리</strong>: 각 테넌트의 데이터는 파티션으로 물리적으로 분리됩니다.</p></li>
<li><p><strong>유연성</strong>: 이 전략을 사용하려면 모든 테넌트가 동일한 데이터 스키마를 공유해야 합니다. 그리고 파티션을 수동으로 만들어야 합니다.</p></li>
<li><p><strong>기타</strong>: 파티션 수준에서는 RBAC가 지원되지 않습니다. 테넌트를 개별적으로 또는 여러 파티션에 걸쳐 쿼리할 수 있으므로 이 접근 방식은 테넌트 세그먼트 전반에서 집계된 쿼리 또는 분석과 관련된 시나리오에 적합합니다. 또한 특정 테넌트에 대한 데이터를 유연하게 로드하거나 해제하여 핫 데이터와 콜드 데이터를 효과적으로 관리할 수 있습니다.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">키 수준 멀티테넌시 파티션</h3><p>이 전략을 사용하면 모든 테넌트가 단일 컬렉션과 스키마를 공유하지만, 각 테넌트의 데이터는 <a href="/docs/ko/use-partition-key.md">파티션 키</a> 값에 따라 물리적으로 격리된 16개의 파티션으로 자동 라우팅됩니다. 각 물리적 파티션에는 여러 테넌트가 포함될 수 있지만, 서로 다른 테넌트의 데이터는 논리적으로 분리된 상태로 유지됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>파티션 키 레벨 멀티 테넌시</span> </span></p>
<ul>
<li><p><strong>확장성</strong>: 파티션 키 수준 전략은 수백만 개의 테넌트를 지원하는 가장 확장성이 뛰어난 접근 방식을 제공합니다.</p></li>
<li><p><strong>데이터 격리</strong>: 이 전략은 여러 테넌트가 하나의 물리적 파티션을 공유할 수 있기 때문에 상대적으로 약한 데이터 격리를 제공합니다.</p></li>
<li><p><strong>유연성</strong>: 모든 테넌트가 동일한 데이터 스키마를 공유해야 하므로 이 전략은 데이터 유연성이 제한적입니다.</p></li>
<li><p><strong>기타</strong>: 파티션 키 수준에서는 RBAC가 지원되지 않습니다. 테넌트를 개별적으로 또는 여러 파티션에 걸쳐 쿼리할 수 있으므로 이 접근 방식은 테넌트 세그먼트 전반에서 집계된 쿼리 또는 분석과 관련된 시나리오에 적합합니다.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">올바른 멀티테넌시 전략 선택하기<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 표는 네 가지 수준의 멀티 테넌시 전략을 종합적으로 비교한 것입니다.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>데이터베이스 수준</strong></p></th>
     <th><p><strong>컬렉션 수준</strong></p></th>
     <th><p><strong>파티션 수준</strong></p></th>
     <th><p><strong>파티션 키 수준</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>데이터 격리</strong></p></td>
     <td><p>물리적</p></td>
     <td><p>물리적</p></td>
     <td><p>물리적</p></td>
     <td><p>물리적 + 논리적</p></td>
   </tr>
   <tr>
     <td><p><strong>최대 테넌트 수</strong></p></td>
     <td><p>기본적으로 64개입니다. Milvus.yaml 구성 파일에서 <code translate="no">maxDatabaseNum</code> 매개 변수를 수정하여 늘릴 수 있습니다. </p></td>
     <td><p>기본값은 65,536입니다. Milvus.yaml 구성 파일에서 <code translate="no">maxCollectionNum</code> 매개 변수를 수정하여 늘릴 수 있습니다.</p></td>
     <td><p>컬렉션당 최대 1,024개입니다. </p></td>
     <td><p>백만</p></td>
   </tr>
   <tr>
     <td><p><strong>데이터 스키마 유연성</strong></p></td>
     <td><p>높음</p></td>
     <td><p>중간</p></td>
     <td><p>낮음</p></td>
     <td><p>낮음</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC 지원</strong></p></td>
     <td><p>예</p></td>
     <td><p>예</p></td>
     <td><p>아니요</p></td>
     <td><p>아니요</p></td>
   </tr>
   <tr>
     <td><p><strong>검색 성능</strong></p></td>
     <td><p>강함</p></td>
     <td><p>강함</p></td>
     <td><p>보통</p></td>
     <td><p>보통</p></td>
   </tr>
   <tr>
     <td><p><strong>테넌트 간 검색 지원</strong></p></td>
     <td><p>아니요</p></td>
     <td><p>아니요</p></td>
     <td><p>예</p></td>
     <td><p>예</p></td>
   </tr>
   <tr>
     <td><p><strong>핫 데이터 및 콜드 데이터의 효과적인 처리 지원</strong></p></td>
     <td><p>예</p></td>
     <td><p>예</p></td>
     <td><p>예</p></td>
     <td><p>아니요 현재 파티션 키 수준 전략은 지원되지 않습니다.</p></td>
   </tr>
</table>
<p>Milvus에서 멀티 테넌시 전략을 선택할 때 고려해야 할 몇 가지 요소가 있습니다.</p>
<ol>
<li><p><strong>확장성:</strong> 파티션 키 &gt; 파티션 &gt; 컬렉션 &gt; 데이터베이스</p>
<p>매우 많은 수의 테넌트(수백만 명 이상)를 지원해야 하는 경우 파티션 키 수준 전략을 사용하세요.</p></li>
<li><p><strong>강력한 데이터 격리 요구 사항</strong>: 데이터베이스 = 컬렉션 &gt; 파티션 &gt; 파티션 키</p>
<p>엄격한 물리적 데이터 격리 요구 사항이 있는 경우 데이터베이스, 컬렉션 또는 파티션 수준 전략을 선택하세요.</p></li>
<li><p><strong>각 테넌트의 데이터에 대한 유연한 데이터 스키마:</strong> 데이터베이스 &gt; 컬렉션 &gt; 파티션 = 파티션 키</p>
<p>데이터베이스 수준 및 컬렉션 수준 전략은 데이터 스키마에 완전한 유연성을 제공합니다. 테넌트의 데이터 구조가 서로 다른 경우 데이터베이스 수준 또는 컬렉션 수준의 멀티테넌시를 선택하세요.</p></li>
<li><p><strong>기타</strong></p>
<ol>
<li><p><strong>성능:</strong> 검색 성능은 인덱스, 검색 매개변수, 머신 구성 등 다양한 요인에 의해 결정됩니다. Milvus는 성능 튜닝도 지원합니다. 멀티 테넌시 전략을 선택하기 전에 실제 성능을 테스트하는 것이 좋습니다.</p></li>
<li><p><strong>핫 데이터와 콜드 데이터의 효과적인 처리</strong>: 현재 데이터베이스 수준, 컬렉션 수준, 파티션 수준 전략은 모두 핫 데이터 및 콜드 데이터 처리를 지원합니다.</p></li>
<li><p><strong>테넌트 간 검색</strong>: 파티션 수준 및 파티션 키 수준 전략만 테넌트 간 쿼리를 지원합니다.</p></li>
</ol></li>
</ol>
