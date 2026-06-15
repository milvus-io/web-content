---
id: release_notes.md
summary: Milvus 릴리스 노트
title: 릴리스 노트
---
<h1 id="Release-Notes" class="common-anchor-header">릴리스 노트<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 새로운 기능을 확인해 보세요! 이 페이지에서는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항을 요약하여 제공합니다. 업데이트 내용을 확인하려면 이 페이지를 정기적으로 방문하시기 바랍니다.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>출시일: 2026년 5월 9일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta는 오픈 레이크 생태계와의 새로운 통합을 통해 Milvus 벡터 데이터베이스를 확장합니다. External Collection을 통해 Milvus는 제로 카피 방식으로 외부 레이크 테이블을 쿼리할 수 있으며, Spark는 Snapshot을 통해 Milvus 컬렉션을 직접 읽을 수 있습니다. 또한 이번 릴리스에서는 더욱 풍부한 검색 기능, 더 표현력 있는 스키마, 심화된 텍스트 검색 사용자 지정, 세밀한 데이터 및 모델 라이프사이클 제어, 그리고 더 많은 운영자 측 제어 기능을 제공합니다. Milvus 3.0은 Zilliz Lakebase의 핵심 커널로, 통합 서비스, 검색 및 배치 기능을 지원합니다.</p>
<p>아래 영상을 시청하여 Milvus 3.0에 대해 자세히 알아보고 핵심 개발자들과의 AMA 세션을 확인해 보세요:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">주요 기능<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">외부 컬렉션</h4><p>일반적인 AI 데이터 파이프라인에서는 테라바이트 규모의 임베딩 및 메타데이터가 이미 Parquet, Lance 또는 Iceberg 테이블 형태로 오브젝트 스토리지에 저장되어 있습니다. 해당 데이터를 Milvus로 복사하면 스토리지 비용이 두 배로 증가하고, 동기화를 유지해야 하는 ETL 파이프라인이 추가되며, 데이터 거버넌스 권한이 고객으로부터 멀어지게 됩니다.</p>
<p>외부 컬렉션은 이러한 복사 과정을 제거합니다. Milvus 컬렉션은 파일이 이미 저장된 위치를 참조할 수 있으며, Milvus는 스키마, 인덱스 및 쿼리 실행만 관리합니다. 증분 갱신 기능을 통해 컬렉션은 기본 파일에 항상 최신 상태로 유지됩니다. 금융 및 의료 팀과 같이 데이터를 레이크 외부로 반출할 수 없는 고객은 데이터가 저장된 위치에서 바로 벡터 검색을 실행할 수 있습니다. 또한 레이크에 상주하는 단일 데이터셋을 여러 Milvus 인스턴스에서 동시에 제공할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/create-an-external-collection.md">'외부 컬렉션 생성</a>'을 참조하십시오.</p>
<h4 id="Snapshot" class="common-anchor-header">스냅샷</h4><p>서비스 제공과 일괄 검색은 종종 동일한 컬렉션을 동시에 필요로 합니다. A/B 모델 평가, 대규모 중복 제거, 백필 검증, 버전 롤백 등은 모두 쓰기 작업이 진행 중인 동안에도 컬렉션에 대한 안정적인 뷰가 필요합니다.</p>
<p>스냅샷은 데이터를 복사하는 대신 기존 세그먼트를 참조하여 컬렉션의 특정 시점, 읽기 전용 뷰를 생성하므로 추가 스토리지 비용은 거의 제로에 가깝습니다. 라이브 컬렉션이 계속 쓰기를 수락하는 동안 배치 작업은 MVCC 방식의 격리 하에서 스냅샷을 읽을 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/snapshots.md">스냅샷</a>, <a href="/docs/ko/manage-snapshots.md">스냅샷 관리</a> 및 <a href="/docs/ko/snapshot-use-cases.md">스냅샷 사용 사례를</a> 참조하십시오.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">쿼리/검색 Order By</h4><p>검색 및 쿼리는 이제 다중 필드 정렬을 지원하며, 정렬 처리가 Milvus 커널로 하향 전달되고 필드별로 ' <code translate="no">ASC</code> ' 및 ' <code translate="no">DESC</code> '을 설정할 수 있습니다. 이는 일반적인 프로덕션 환경의 한계를 해소합니다. 즉, 가장 유사한 항목이 가장 저렴한 항목, 가장 최근의 항목 또는 가장 인기 있는 항목이 아닐 때, 거리 기준 Top-K만으로는 비즈니스 요구 사항을 충족하지 못하는 경우가 많았습니다.</p>
<p>이제 애플리케이션은 복합 순위를 표현하기 위해 결과를 과도하게 가져와 클라이언트 측에서 재정렬할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">스칼라 필드별 검색 결과 정렬</a> 및 <a href="/docs/ko/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">쿼리 결과 정렬을</a> 참조하십시오.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">쿼리 집계</h4><p>Milvus 컬렉션에서 테넌트 분포 통계, 필드 완성도 카운트 또는 버전 롤아웃 진행 상황을 생성하려면, 일치하는 엔티티를 클라이언트로 다시 가져와 그곳에서 집계해야 했습니다. Milvus 3.0은 SQL 스타일의 스칼라 집계 기능을 커널로 통합했습니다. 쿼리 호출은 ` <code translate="no">group_by_fields</code> ` 및 ` <code translate="no">output_fields</code>`의 집계 표현식을 지원하며, 여기에는 ` <code translate="no">count(*)</code>`, ` <code translate="no">count(&lt;field&gt;)</code>`, ` <code translate="no">sum(&lt;field&gt;)</code>`, ` <code translate="no">avg(&lt;field&gt;)</code>`, ` <code translate="no">min(&lt;field&gt;)</code>` 및 ` <code translate="no">max(&lt;field&gt;)</code>`이 포함됩니다. 집계는 필터링 후 서버 측에서 평가됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">집계 쿼리 결과를</a> 참조하십시오.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null 벡터</h4><p>임베딩은 종종 비동기적으로 생성되므로, 엔티티가 벡터보다 먼저 도착할 수 있습니다. 자막이 없는 동영상이나 이미지가 없는 제품과 같이 다중 모드 데이터에도 자연스러운 공백이 존재합니다. 이전 버전에는 이에 대한 적절한 해결책이 없었습니다. 애플리케이션은 벡터가 준비될 때까지 쓰기를 지연하거나 자리 표시자 벡터를 채워 넣었는데, 두 선택 모두 검색 품질을 저하시켰습니다.</p>
<p>Milvus 3.0은 6가지 벡터 유형 모두에서 벡터 필드에 NULL을 지원합니다. 검색은 NULL 벡터를 자동으로 건너뛰며, 검색 품질에는 영향을 미치지 않고, NULL 벡터는 사실상 저장 공간을 차지하지 않습니다. 이 변경 사항에 따라 벡터 필드에도 ' <code translate="no">AddField</code> ' 기능이 확장됩니다. ' <code translate="no">nullable=True</code>'을 사용하면 기존 컬렉션을 재구축하지 않고도 온라인에서 새로운 벡터 필드를 추가할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Nullable Fields를</a> 참조하십시오.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">사용자 정의 사전 및 동의어 사전</h4><p>기본 제공 토큰화기는 항상 프로덕션 검색 품질 요구 사항을 충족하지는 않습니다. 중국어, 의학, 법학, 화학 같은 전문 분야 및 다국어 코퍼스는 사용자 정의 사전과 동의어 테이블을 통해 상당한 이점을 얻을 수 있습니다. 지금까지 이러한 리소스는 대부분 애플리케이션 측 쿼리 재작성 형태로 존재했습니다.</p>
<p>Milvus 3.0에는 사용자 정의 토큰화기 사전, 동의어 목록, 스톱워드 목록 및 복합어 분해 규칙을 등록하기 위한 FileResource 메커니즘이 추가되었습니다. 일단 등록된 리소스는 모든 토큰화기나 필터에서 참조할 수 있으며, BM25, 분석기, 텍스트 매치에 적용됩니다. 이제 사전과 동의어는 애플리케이션 코드 곳곳에 흩어져 있는 대신 버전 관리를 통해 중앙에서 일괄적으로 관리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-file-resources.md">파일 리소스 관리를</a> 참조하십시오.</p>
<h4 id="Entity-TTL" class="common-anchor-header">엔티티 TTL</h4><p>컬렉션 수준 및 파티션 수준의 TTL은 많은 수명 주기 및 규정 준수 시나리오에 비해 너무 거칠습니다. 동일한 컬렉션 내의 서로 다른 테넌트는 종종 서로 다른 보존 규칙을 가지며, 개별 엔티티는 컬렉션의 나머지 부분과 일치하지 않는 일정에 따라 만료되어야 할 수도 있습니다.</p>
<p>Milvus 3.0은 엔티티별 TTL을 지원합니다. 스키마에서 ' <code translate="no">TIMESTAMPTZ</code> ' 필드를 선언하고 컬렉션 속성을 통해 이를 TTL 필드로 지정하면, Milvus가 만료된 엔티티를 자동으로 회수합니다. 이를 통해 애플리케이션 측에서 별도로 정리할 필요 없이 '잊혀질 권리' 요청, 만료되는 세션 데이터, 제한된 대화 내역을 처리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">엔티티 수준 TTL 설정을</a> 참조하십시오.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO(Doc-in, Doc-out)</h4><p>Milvus 2.6에서는 집합 기반 유사 중복 감지를 위한 <code translate="no">MINHASH_LSH</code> 인덱스가 추가되었지만, 애플리케이션은 여전히 Milvus에 데이터를 쓰기 전에 MinHash 서명을 계산해야 했습니다.</p>
<p>Milvus 3.0에는 서버 측 MinHash 함수가 추가되었습니다. 스키마에서 <code translate="no">VARCHAR</code> 입력 필드와 <code translate="no">BINARY_VECTOR</code> 출력 필드를 선언하고 <code translate="no">FunctionType.MINHASH</code> 함수를 연결하면, Milvus가 삽입, 대량 삽입 및 검색 중에 서명을 계산합니다. <code translate="no">MINHASH_LSH</code> 와 함께 사용하면 Milvus 내에서 대규모 데이터 세트의 중복 제거 워크플로, 지문 생성 및 표절 감지를 지원합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하십시오.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>"하나의 엔티티 = 하나의 벡터"라는 가정은 더 이상 현대적인 검색에 적합하지 않습니다. 긴 문서는 여러 청크로 분할되고, ColBERT와 같은 후기 상호작용 모델은 토큰당 하나의 벡터를 생성하며, 다중 모달 엔티티는 여러 뷰를 가질 수 있습니다.</p>
<p>EmbList는 엔티티당 가변 길이 벡터 목록을 저장하며, 디스크 상의 인덱스로는 구조화된 목록( <code translate="no">DISKANN</code> )을 사용합니다. 코퍼스가 메모리 용량을 초과할 경우 디스크 경로를 통해 RAM 사용량을 효과적으로 관리할 수 있습니다. EmbList + 구조화된 목록( <code translate="no">DISKANN</code> )은 이번 RC에서 더 광범위한 StructList 계열의 첫 번째 변형입니다. StructList 필터링 및 Muvera/Lemur 다중 벡터 가속화를 포함한 나머지 패밀리 기능은 공식 3.0 릴리스에 포함될 예정입니다.</p>
<p>자세한 내용은 <a href="/docs/ko/search-with-embedding-lists.md">'임베딩 리스트를 사용한 검색'을</a> 참조하십시오.</p>
<h4 id="Force-Merge" class="common-anchor-header">강제 병합</h4><p>프로덕션 워크로드는 시간이 지남에 따라 세그먼트 조각화가 누적되어 쿼리 지연 시간의 변동과 스토리지 용량 증가를 초래합니다.</p>
<p>Milvus 3.0에서는 동기 및 비동기 모드 모두에서 사용량이 적은 시간대에 세그먼트 압축을 명시적으로 트리거하는 기능이 추가되었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/force-merge.md">강제 병합 압축을</a> 참조하십시오.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0은 데이터와 메타데이터가 S3 호환 오브젝트 스토리지에 저장되는 매니페스트 기반 컬럼형 스토리지 엔진인 스토리지 V3를 도입했습니다. 각 데이터셋 버전은 불변 매니페스트 스냅샷으로 캡처되며, 이는 데이터셋을 구성하는 컬럼 그룹, 델타 로그 및 통계를 기록하는 Avro 인코딩 파일입니다.</p>
<p>매니페스트는 압축된 Avro 파일이며, 델타 로그는 데이터 파일을 다시 쓰지 않고 엔티티 수준의 삭제 내역을 기록합니다. 이를 통해 데이터셋이 커짐에 따라 메타데이터 오버헤드를 최소화할 수 있습니다. 또한 매니페스트는 메타데이터 추적을 쿼리 경로와 분리하여, 컬렉션이 쿼리 성능 저하 없이 더 많은 세그먼트를 관리할 수 있도록 합니다.</p>
<p>상태가 오브젝트 스토리지에 저장되므로 데이터셋은 자체 설명적입니다. 즉, 스토리지 경로에 액세스할 수 있는 모든 리더는 중앙 카탈로그 없이도 데이터셋을 발견하고 해석할 수 있습니다. 이 특성은 External Collection, Snapshot 및 향후 레이크 통합의 기반이 됩니다.</p>
