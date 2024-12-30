---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Milvus의 멀티테넌시.
title: 멀티테넌시 전략
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">멀티테넌시 전략<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>많은 사용 사례에서 개발자는 하나의 Milvus 클러스터를 실행하여 두 개의 제품 팀 또는 수백만 명의 최종 사용자와 같은 여러 테넌트에게 서비스를 제공하고자 합니다. 이 가이드에서는 Milvus에서 멀티테넌시를 달성하기 위한 몇 가지 전략을 설명합니다.</p>
<p>Milvus는 데이터베이스, 컬렉션 또는 파티션 수준에서 멀티테넌시를 지원하도록 설계되었습니다. 멀티테넌시의 목적은 데이터와 리소스를 서로 분리하는 것입니다. 서로 다른 수준에서 멀티테넌시를 구현하면 서로 다른 수준의 격리를 달성할 수 있지만 오버헤드도 달라집니다. 여기에서는 이러한 장단점에 대해 설명합니다.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">데이터베이스 중심의 멀티테넌시<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 버전 2.2.9부터는 단일 Milvus 클러스터에 여러 데이터베이스를 만들 수 있습니다. 이 기능을 사용하면 각 테넌트마다 데이터베이스를 할당하여 자체 컬렉션을 만들 수 있는 데이터베이스 지향 멀티테넌시를 구현할 수 있습니다. 이 접근 방식은 테넌트에게 최상의 데이터 및 리소스 격리를 제공하지만 하나의 클러스터에 최대 64개의 데이터베이스로 제한됩니다.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">컬렉션 지향 멀티테넌시<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 지향 멀티테넌시를 달성하는 방법에는 두 가지가 있습니다.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">모든 테넌트를 위한 하나의 컬렉션</h3><p>테넌트를 구분하기 위해 테넌트 필드를 추가하여 단일 컬렉션을 사용하여 멀티테넌트를 구현하는 것은 간단한 옵션입니다. 특정 테넌트에 대한 ANN 검색을 수행할 때 필터 표현식을 추가하여 다른 테넌트에 속한 모든 엔티티를 걸러내면 됩니다. 이것은 멀티테넌시를 달성하는 가장 간단한 방법입니다. 하지만 필터의 성능이 ANN 검색의 병목 현상이 될 수 있다는 점에 유의하세요. 검색 성능을 개선하려면 아래 파티션 중심의 멀티테넌시로 최적화할 수 있습니다.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">테넌트당 하나의 컬렉션</h3><p>또 다른 접근 방식은 모든 테넌트의 데이터를 단일 컬렉션에 저장하는 대신 각 테넌트가 자체 데이터를 저장할 수 있는 컬렉션을 만드는 것입니다. 이렇게 하면 데이터 격리 및 쿼리 성능이 향상됩니다. 하지만 이 접근 방식은 스케줄링에 더 많은 리소스가 필요하고 클러스터에서 최대 10,000개의 컬렉션으로 제한된다는 점에 유의하세요.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">파티션 중심 멀티테넌시<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션 지향 멀티테넌시를 달성하는 방법에는 두 가지가 있습니다:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">테넌트당 하나의 파티션</h3><p>단일 컬렉션을 관리하는 것이 여러 컬렉션을 관리하는 것보다 훨씬 쉽습니다. 여러 컬렉션을 만드는 대신 각 테넌트에 파티션을 할당하여 유연한 데이터 격리 및 메모리 관리를 달성하는 것이 좋습니다. 파티션 중심 멀티테넌시의 검색 성능은 컬렉션 중심 멀티테넌시보다 훨씬 우수합니다. 하지만 컬렉션의 테넌트 수가 컬렉션이 보유할 수 있는 최대 파티션 수를 초과해서는 안 된다는 점에 유의하세요.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">파티션 키 기반 멀티테넌시</h3><p>Milvus 2.2.9에는 파티션 키라는 새로운 기능이 도입되었습니다. 컬렉션을 만들 때 테넌트 필드를 지정하고 이를 파티션 키 필드로 지정하세요. Milvus는 파티션 키 필드의 해시 값에 따라 엔티티를 파티션에 저장합니다. ANN 검색을 수행할 때 Milvus는 파티션 키가 포함된 파티션만 검색합니다. 이렇게 하면 검색 범위가 크게 줄어들어 파티션 키가 없을 때보다 더 나은 성능을 얻을 수 있습니다.</p>
</div>
<p>이 전략은 Milvus 컬렉션이 지원할 수 있는 최대 테넌트 수에 대한 제한을 해제하고 Milvus가 자동으로 파티션을 관리하므로 리소스 관리를 크게 간소화합니다.</p>
<p>요약하자면, 위의 멀티테넌시 전략 중 하나 또는 일부를 사용하여 자신만의 솔루션을 구성할 수 있습니다. 다음 표에서는 데이터 격리, 검색 성능, 최대 테넌트 수 측면에서 이러한 전략들을 비교하고 있습니다.</p>
<table>
<thead>
<tr><th></th><th>데이터 격리</th><th>검색 성능</th><th>최대 테넌트 수</th><th>추천 시나리오</th></tr>
</thead>
<tbody>
<tr><td>데이터베이스 중심</td><td>강함</td><td>Strong</td><td>64</td><td>프로젝트에 따라 컬렉션이 달라져야 하는 경우, 특히 조직 내 부서 간에 데이터를 격리하는 데 적합합니다.</td></tr>
<tr><td>모두를 위한 하나의 컬렉션</td><td>약함</td><td>보통</td><td>N/A</td><td>리소스가 제한되어 있고 데이터 격리에 민감하지 않은 경우.</td></tr>
<tr><td>테넌트당 하나의 컬렉션</td><td>강함</td><td>강력</td><td>10,000명 미만</td><td>클러스터당 테넌트 수가 10,000명 미만인 경우.</td></tr>
<tr><td>테넌트당 하나의 파티션</td><td>중간</td><td>강함</td><td>4,096</td><td>컬렉션당 테넌트 수가 4,096명 미만인 경우에 적합합니다.</td></tr>
<tr><td>파티션 키 기반</td><td>중간</td><td>Strong</td><td>10,000,000+</td><td>테넌트가 수백만 명으로 빠르게 증가할 것으로 예상되는 경우에 적합합니다.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/ko/manage_databases.md">데이터베이스</a><a href="/docs/ko/schema.md">스키마</a><a href="/docs/ko/manage_databases.md">관리</a></p>
