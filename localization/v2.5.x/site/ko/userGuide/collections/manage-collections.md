---
id: manage-collections.md
title: 컬렉션 설명
summary: >-
  Milvus에서는 여러 컬렉션을 만들어 데이터를 관리하고, 데이터를 컬렉션에 엔티티로 삽입할 수 있습니다. 컬렉션과 엔티티는 관계형
  데이터베이스의 테이블 및 레코드와 유사합니다. 이 페이지에서는 컬렉션 및 관련 개념에 대해 알아볼 수 있습니다.
---
<h1 id="Collection-Explained" class="common-anchor-header">컬렉션 설명<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서는 여러 컬렉션을 만들어 데이터를 관리하고, 데이터를 컬렉션에 엔티티로 삽입할 수 있습니다. 컬렉션과 엔티티는 관계형 데이터베이스의 테이블 및 레코드와 유사합니다. 이 페이지에서는 컬렉션 및 관련 개념에 대해 알아볼 수 있습니다.</p>
<h2 id="Collection" class="common-anchor-header">컬렉션<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션은 고정 열과 변형 행이 있는 2차원 테이블입니다. 각 열은 필드를 나타내고 각 행은 엔티티를 나타냅니다.</p>
<p>다음 차트는 8개의 열과 6개의 엔티티가 있는 컬렉션을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>컬렉션 설명</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">스키마 및 필드<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>개체를 설명할 때 보통 크기, 무게, 위치 등의 속성을 언급합니다. 이러한 속성을 컬렉션의 필드로 사용할 수 있습니다. 각 필드에는 데이터 유형 및 벡터 필드의 차원과 같은 다양한 제약 속성이 있습니다. 필드를 만들고 순서를 정의하여 컬렉션 스키마를 구성할 수 있습니다. 적용 가능한 데이터 유형은 <a href="/docs/ko/schema.md">스키마 설명을</a> 참조하세요.</p>
<p>삽입할 엔티티에 스키마로 정의된 모든 필드를 포함해야 합니다. 일부 필드를 선택 사항으로 만들려면 동적 필드를 활성화하는 것이 좋습니다. 자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">동적 필드를</a> 참조하세요.</p>
<ul>
<li><p><strong>필드를 무효화하거나 기본값 설정</strong></p>
<p>필드를 무효화하거나 기본값을 설정하는 방법에 대한 자세한 내용은 무효화 <a href="/docs/ko/nullable-and-default.md">및 기본값을</a> 참조하세요.</p></li>
<li><p><strong>동적 필드 활성화하기</strong></p>
<p>동적 필드를 활성화하고 사용하는 방법에 대한 자세한 내용은 동적 <a href="/docs/ko/enable-dynamic-field.md">필드를</a> 참조하세요.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">기본 키 및 자동 ID<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>관계형 데이터베이스의 기본 필드와 유사하게 컬렉션에는 엔티티를 다른 엔티티와 구별하는 기본 필드가 있습니다. 기본 필드의 각 값은 전 세계적으로 고유하며 하나의 특정 엔티티에 해당합니다.</p>
<p>위 차트에서 <strong>ID라는</strong> 필드가 기본 필드로 사용되며, 첫 번째 ID <strong>0은</strong> 제목이 ' <em>코로나바이러스의 사망률은 중요하지 않음</em>'인 엔티티에 해당합니다. 기본 필드가 0인 다른 엔티티는 없습니다.</p>
<p>기본 필드는 정수 또는 문자열만 허용합니다. 엔티티를 삽입할 때는 기본적으로 기본 필드 값을 포함해야 합니다. 그러나 컬렉션 생성 시 <strong>자동 ID를</strong> 활성화한 경우, 데이터 삽입 시 Milvus가 해당 값을 생성합니다. 이 경우 삽입할 엔티티에서 기본 필드 값을 제외하세요.</p>
<p>자세한 내용은 <a href="/docs/ko/primary-field.md">기본 필드 및 자동 ID를</a> 참조하세요.</p>
<h2 id="Index" class="common-anchor-header">인덱스<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 필드에 인덱스를 생성하면 검색 효율성이 향상됩니다. 서비스가 의존하는 모든 필드에 대한 인덱스를 생성하는 것이 좋으며, 그 중 벡터 필드에 대한 인덱스는 필수입니다.</p>
<h2 id="Entity" class="common-anchor-header">엔티티<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티는 컬렉션에서 동일한 필드 집합을 공유하는 데이터 레코드입니다. 같은 행의 모든 필드에 있는 값이 하나의 엔티티를 구성합니다.</p>
<p>컬렉션에 필요한 만큼의 엔티티를 삽입할 수 있습니다. 그러나 엔티티 수가 증가함에 따라 필요한 메모리 크기도 증가하여 검색 성능에 영향을 미칩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/schema.md">스키마 설명을</a> 참조하세요.</p>
<h2 id="Load-and-Release" class="common-anchor-header">로드 및 릴리스<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 로드는 컬렉션에서 유사도 검색 및 쿼리를 수행하기 위한 전제 조건입니다. 컬렉션을 로드하면 Milvus는 검색 및 쿼리에 빠르게 응답할 수 있도록 모든 인덱스 파일과 각 필드의 원시 데이터를 메모리에 로드합니다.</p>
<p>검색과 쿼리는 메모리 집약적인 작업입니다. 비용을 절약하려면 현재 사용하지 않는 컬렉션을 해제하는 것이 좋습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/load-and-release.md">로드 및 릴리스를</a> 참조하세요.</p>
<h2 id="Search-and-Query" class="common-anchor-header">검색 및 쿼리<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스를 생성하고 컬렉션을 로드한 후에는 하나 또는 여러 개의 쿼리 벡터를 공급하여 유사도 검색을 시작할 수 있습니다. 예를 들어, 검색 요청에 포함된 쿼리의 벡터 표현을 받을 때 Milvus는 지정된 메트릭 유형을 사용하여 쿼리 벡터와 대상 컬렉션의 벡터 간의 유사성을 측정한 후 쿼리와 의미적으로 유사한 벡터를 반환합니다.</p>
<p>검색 및 쿼리 내에 메타데이터 필터링을 포함시켜 결과의 관련성을 향상시킬 수도 있습니다. 메타데이터 필터링 조건은 쿼리에서는 필수이지만 검색에서는 선택 사항이라는 점에 유의하세요.</p>
<p>적용 가능한 메트릭 유형에 대한 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p>
<p>검색 및 쿼리에 대한 자세한 내용은 검색 및 재랭크 장의 문서를 참조하세요. 그 중 기본 기능은 다음과 같습니다:</p>
<ul>
<li><p><a href="/docs/ko/single-vector-search.md">기본 ANN 검색</a></p></li>
<li><p><a href="/docs/ko/filtered-search.md">필터 검색</a></p></li>
<li><p><a href="/docs/ko/range-search.md">범위 검색</a></p></li>
<li><p><a href="/docs/ko/grouping-search.md">그룹 검색</a></p></li>
<li><p><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></p></li>
<li><p><a href="/docs/ko/with-iterators.md">검색 이터레이터</a></p></li>
<li><p><a href="/docs/ko/get-and-scalar-query.md">쿼리</a></p></li>
<li><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a></p></li>
<li><p><a href="/docs/ko/keyword-match.md">텍스트 일치</a></p></li>
</ul>
<p>또한 Milvus는 검색 성능과 효율성을 개선하기 위한 향상된 기능도 제공합니다. 기본적으로 비활성화되어 있으며 서비스 요구 사항에 따라 활성화하여 사용할 수 있습니다. 다음과 같습니다.</p>
<ul>
<li><p><a href="/docs/ko/use-partition-key.md">파티션 키 사용</a></p></li>
<li><p><a href="/docs/ko/mmap.md">mmap 사용</a></p></li>
<li><p><a href="/docs/ko/clustering-compaction.md">클러스터링 압축</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">파티션<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션은 컬렉션의 하위 집합으로, 상위 컬렉션과 동일한 필드 집합을 공유하며 각각 엔티티의 하위 집합을 포함합니다.</p>
<p>엔티티를 서로 다른 파티션에 할당하여 엔티티 그룹을 만들 수 있습니다. 특정 파티션에서 검색 및 쿼리를 수행하여 Milvus가 다른 파티션의 엔티티를 무시하고 검색 효율성을 개선하도록 할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-partitions.md">파티션 관리를</a> 참조하세요.</p>
<h2 id="Shard" class="common-anchor-header">샤드<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>샤드는 컬렉션의 수평적 조각입니다. 각 샤드는 데이터 입력 채널에 해당합니다. 모든 컬렉션에는 기본적으로 샤드가 있습니다. 컬렉션을 만들 때 예상 처리량과 컬렉션에 삽입할 데이터의 양에 따라 적절한 샤드 수를 설정할 수 있습니다.</p>
<p>샤드 수를 설정하는 방법에 대한 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
<h2 id="Alias" class="common-anchor-header">별칭<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 별칭을 만들 수 있습니다. 컬렉션에는 여러 개의 별칭을 가질 수 있지만 컬렉션은 별칭을 공유할 수 없습니다. 컬렉션에 대한 요청을 받으면 Milvus는 제공된 이름을 기준으로 컬렉션을 찾습니다. 제공된 이름의 컬렉션이 존재하지 않는 경우 Milvus는 제공된 이름을 별칭으로 계속 찾습니다. 컬렉션 별칭을 사용하여 코드를 다양한 시나리오에 맞게 조정할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-aliases.md">별칭 관리를</a> 참조하세요.</p>
<h2 id="Function" class="common-anchor-header">함수<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 생성 시 Milvus가 필드를 파생하도록 함수를 설정할 수 있습니다. 예를 들어, 전체 텍스트 검색 기능은 사용자 정의 함수를 사용하여 특정 바차 필드에서 스파스 벡터 필드를 도출합니다. 전체 텍스트 검색에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h2 id="Consistency-Level" class="common-anchor-header">일관성 수준<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>분산 데이터베이스 시스템은 일반적으로 일관성 수준을 사용하여 데이터 노드와 복제본 간의 데이터 동일성을 정의합니다. 컬렉션을 만들거나 컬렉션 내에서 유사성 검색을 수행할 때 별도의 일관성 수준을 설정할 수 있습니다. 적용 가능한 일관성 수준은 <strong>강함</strong>, <strong>제한된 유효성</strong>, <strong>세션</strong> 및 <strong>최종입니다</strong>.</p>
<p>이러한 일관성 수준에 대한 자세한 내용은 <a href="/docs/ko/tune_consistency.md">일관성 수준을</a> 참조하세요.</p>
