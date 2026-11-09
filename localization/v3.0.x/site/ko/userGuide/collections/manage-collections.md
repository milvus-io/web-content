---
id: manage-collections.md
title: 컬렉션 설명
summary: >-
  Milvus에서는 데이터를 관리하기 위해 여러 컬렉션을 생성할 수 있으며, 데이터를 엔티티 형태로 컬렉션에 삽입할 수 있습니다. 컬렉션과
  엔티티는 관계형 데이터베이스의 테이블과 레코드와 유사합니다. 이 페이지는 컬렉션 및 관련 개념에 대해 알아보는 데 도움이 됩니다.
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
    </button></h1><p>Milvus에서는 데이터를 관리하기 위해 여러 컬렉션을 생성할 수 있으며, 데이터를 엔티티 형태로 컬렉션에 삽입할 수 있습니다. 컬렉션과 엔티티는 관계형 데이터베이스의 테이블과 레코드와 유사합니다. 이 페이지는 컬렉션 및 관련 개념에 대해 이해하는 데 도움을 드립니다.</p>
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
    </button></h2><p>컬렉션은 고정된 열과 가변적인 행으로 구성된 2차원 테이블입니다. 각 열은 필드를 나타내고, 각 행은 엔티티를 나타냅니다.</p>
<p>다음 차트는 8개의 열과 6개의 엔티티로 구성된 컬렉션을 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>컬렉션 설명</span>
  
 </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">스키마와 필드<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>객체를 설명할 때 우리는 보통 크기, 무게, 위치와 같은 속성을 언급합니다. 이러한 속성을 컬렉션의 필드로 사용할 수 있습니다. 각 필드에는 데이터 유형이나 벡터 필드의 차원 수와 같은 다양한 제약 조건이 있습니다. 필드를 생성하고 순서를 정의하여 컬렉션 스키마를 구성할 수 있습니다. 적용 가능한 데이터 유형에 대해서는 <a href="/docs/ko/schema.md">‘스키마 설명</a>’을 참조하십시오.</p>
<p>삽입할 엔티티에는 스키마에 정의된 모든 필드를 포함해야 합니다. 일부 필드를 선택 사항으로 만들려면 동적 필드 기능을 활성화하는 것을 고려해 보십시오. 자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">‘동적 필드’를</a> 참조하십시오.</p>
<ul>
<li><p><strong>필드를 null 허용으로 설정하거나 기본값 지정</strong></p>
<p>필드를 null 허용 가능하게 설정하거나 기본값을 설정하는 방법에 대한 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Null 허용 및 기본값’을</a> 참조하십시오.</p></li>
<li><p><strong>동적 필드 활성화</strong></p>
<p>동적 필드를 활성화하고 사용하는 방법에 대한 자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">‘동적 필드’를</a> 참조하십시오.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">기본 키 및 AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>관계형 데이터베이스의 기본 필드와 마찬가지로, 컬렉션에도 엔티티를 다른 엔티티와 구별하기 위한 기본 필드가 있습니다. 기본 필드의 각 값은 전역적으로 고유하며 하나의 특정 엔티티에 대응합니다.</p>
<p>위 차트에서 볼 수 있듯이, <strong>id라는</strong> 필드가 기본 필드 역할을 하며, 첫 번째 ID인 <strong>0은</strong> <em>‘코로나바이러스의 사망률은 중요하지 않다’라는</em> 제목의 엔티티에 해당합니다. 기본 필드 값이 0인 다른 엔티티는 존재하지 않습니다.</p>
<p>주 키 필드는 정수 또는 문자열만 허용합니다. 엔티티를 삽입할 때는 기본적으로 주 키 필드 값을 포함해야 합니다. 그러나 컬렉션 생성 시 <strong>AutoId를</strong> 활성화한 경우, Milvus는 데이터 삽입 시 해당 값을 자동으로 생성합니다. 이 경우, 삽입할 엔티티에서 주 키 필드 값을 제외하십시오.</p>
<p>자세한 내용은 <a href="/docs/ko/primary-field.md">‘주키장 및 AutoId</a>’를 참조하십시오.</p>
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
    </button></h2><p>특정 필드에 인덱스를 생성하면 검색 효율이 향상됩니다. 서비스가 의존하는 모든 필드에 대해 인덱스를 생성하는 것이 권장되며, 그중 벡터 필드에 대한 인덱스는 필수입니다.</p>
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
    </button></h2><p>엔티티는 컬렉션 내에서 동일한 필드 집합을 공유하는 데이터 레코드입니다. 동일한 행에 있는 모든 필드의 값이 모여 하나의 엔티티를 구성합니다.</p>
<p>컬렉션에는 필요한 만큼 엔티티를 삽입할 수 있습니다. 그러나 엔티티 수가 늘어날수록 차지하는 메모리 용량도 증가하여 검색 성능에 영향을 미칩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/schema.md">‘스키마 설명</a>’을 참조하십시오.</p>
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
    </button></h2><p>컬렉션을 로드하는 것은 컬렉션 내에서 유사도 검색 및 쿼리를 수행하기 위한 필수 조건입니다. 컬렉션을 로드하면 Milvus는 검색 및 쿼리에 빠르게 응답하기 위해 모든 인덱스 파일과 각 필드의 원시 데이터를 메모리에 로드합니다.</p>
<p>검색 및 쿼리는 메모리 집약적인 작업입니다. 리소스 소모를 줄이려면 현재 사용하지 않는 컬렉션은 해제하는 것이 좋습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/load-and-release.md">‘로드 및 해제</a>’를 참조하십시오.</p>
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
    </button></h2><p>인덱스를 생성하고 컬렉션을 로드하면, 하나 또는 여러 개의 쿼리 벡터를 입력하여 유사도 검색을 시작할 수 있습니다. 예를 들어, 검색 요청에 포함된 쿼리의 벡터 표현을 수신하면 Milvus는 지정된 메트릭 유형을 사용하여 쿼리 벡터와 대상 컬렉션 내 벡터 간의 유사도를 측정한 후, 쿼리와 의미적으로 유사한 항목을 반환합니다.</p>
<p>또한 검색 및 쿼리에 메타데이터 필터링을 포함하여 결과의 관련성을 높일 수도 있습니다. 메타데이터 필터링 조건은 쿼리에서는 필수이지만, 검색에서는 선택 사항입니다.</p>
<p>적용 가능한 메트릭 유형에 대한 자세한 내용은 <a href="/docs/ko/metric.md">‘메트릭 유형’을</a> 참조하십시오.</p>
<p>검색 및 쿼리에 대한 자세한 내용은 ‘검색 및 재순위 지정(Search &amp; Rerank)’ 장의 문서를 참조하십시오. 이 장에서 다루는 기본 기능은 다음과 같습니다:</p>
<ul>
<li><p><a href="/docs/ko/single-vector-search.md">기본 ANN 검색</a></p></li>
<li><p><a href="/docs/ko/filtered-search.md">필터링된 검색</a></p></li>
<li><p><a href="/docs/ko/range-search.md">범위 검색</a></p></li>
<li><p><a href="/docs/ko/grouping-search.md">그룹화 검색</a></p></li>
<li><p><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></p></li>
<li><p><a href="/docs/ko/with-iterators.md">검색 반복자</a></p></li>
<li><p><a href="/docs/ko/get-and-scalar-query.md">쿼리</a></p></li>
<li><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a></p></li>
<li><p><a href="/docs/ko/keyword-match.md">텍스트 일치</a></p></li>
</ul>
<p>또한 Milvus는 검색 성능과 효율성을 향상시키기 위한 기능도 제공합니다. 이러한 기능은 기본적으로 비활성화되어 있으며, 서비스 요구 사항에 따라 활성화하여 사용할 수 있습니다. 해당 기능은 다음과 같습니다.</p>
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
    </button></h2><p>파티션은 컬렉션의 하위 집합으로, 상위 컬렉션과 동일한 필드 세트를 공유하며 각각 엔티티의 하위 집합을 포함합니다.</p>
<p>엔티티를 서로 다른 파티션에 할당하여 엔티티 그룹을 생성할 수 있습니다. 특정 파티션에서 검색 및 쿼리를 수행하여 Milvus가 다른 파티션의 엔티티를 무시하도록 하고, 검색 효율을 높일 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-partitions.md">파티션 관리를</a> 참조하십시오.</p>
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
    </button></h2><p>샤드는 컬렉션을 수평적으로 분할한 부분입니다. 각 샤드는 하나의 데이터 입력 채널에 해당합니다. 모든 컬렉션에는 기본적으로 하나의 샤드가 있습니다. 컬렉션을 생성할 때 예상 처리량과 컬렉션에 삽입할 데이터의 양을 고려하여 적절한 샤드 수를 설정할 수 있습니다.</p>
<p>샤드 수 설정 방법에 대한 자세한 내용은 <a href="/docs/ko/create-collection.md">‘컬렉션</a> 생성’을 참조하십시오.</p>
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
    </button></h2><p>컬렉션에 대한 별칭을 생성할 수 있습니다. 컬렉션은 여러 개의 별칭을 가질 수 있지만, 컬렉션 간에 별칭을 공유할 수는 없습니다. 컬렉션에 대한 요청을 수신하면 Milvus는 제공된 이름을 기반으로 컬렉션을 찾습니다. 제공된 이름의 컬렉션이 존재하지 않으면, Milvus는 제공된 이름을 별칭으로 간주하여 계속 검색합니다. 컬렉션 별칭을 사용하여 다양한 시나리오에 맞게 코드를 조정할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-aliases.md">‘별칭 관리</a>’를 참조하십시오.</p>
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
    </button></h2><p>컬렉션 생성 시 Milvus가 필드를 도출하도록 함수를 설정할 수 있습니다. 예를 들어, 전체 텍스트 검색 기능은 사용자 정의 함수를 사용하여 특정 varchar 필드에서 스파스 벡터 필드를 도출합니다. 전체 텍스트 검색에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하십시오.</p>
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
    </button></h2><p>분산 데이터베이스 시스템은 일반적으로 일관성 수준을 사용하여 데이터 노드와 복제본 간의 데이터 동일성을 정의합니다. 컬렉션을 생성하거나 컬렉션 내에서 유사도 검색을 수행할 때 별도의 일관성 수준을 설정할 수 있습니다. 적용 가능한 일관성 수준은 <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> 및 <strong>Eventually입니다.</strong></p>
<p>이러한 일관성 수준에 대한 자세한 내용은 <a href="/docs/ko/tune_consistency.md">‘일관성 수준’을</a> 참조하십시오.</p>
