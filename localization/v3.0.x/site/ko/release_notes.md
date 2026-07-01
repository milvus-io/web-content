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
<p>Milvus v3.0-beta는 Milvus가 벡터 데이터베이스에서 시맨틱 네이티브 레이크 엔진으로 전환하는 첫걸음을 내딛습니다. 이제 Milvus 커널은 오픈 레이크 형식의 데이터를 직접 처리할 수 있으며, 검색, 스키마, 라이프사이클, 언어 및 운영에 걸쳐 Milvus의 핵심 기능이 확장되었습니다.</p>
<p>레이크 측면에서는 ‘외부 컬렉션(External Collection)’과 ‘스냅샷(Snapshot)’ 기능이 주요 추가 사항입니다. 또한, 이 커널은 Milvus 3.0을 기반으로 구축된 시맨틱 네이티브 데이터 플랫폼인 Zilliz Lakebase의 기반이 되기도 합니다.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">외부 컬렉션</h4><p>일반적인 AI 데이터 파이프라인에서는 테라바이트 규모의 임베딩 및 메타데이터가 이미 Parquet, Lance 또는 Iceberg 테이블 형태로 오브젝트 스토리지에 저장되어 있습니다. 해당 데이터를 Milvus로 복사하면 스토리지 비용이 두 배로 증가하고, 지속적으로 동기화를 유지해야 하는 ETL 파이프라인이 추가되며, 데이터 거버넌스 권한이 고객으로부터 멀어지게 됩니다.</p>
<p>외부 수집 기능은 이러한 복사 과정을 제거합니다. Milvus 컬렉션은 파일이 이미 저장된 위치를 참조할 수 있으며, Milvus는 스키마, 인덱스 및 쿼리 실행만 관리합니다. 증분 갱신 기능을 통해 컬렉션은 기본 파일에 항상 최신 상태로 유지됩니다. 금융 및 의료 팀과 같이 데이터를 레이크 외부로 반출할 수 없는 고객은 데이터가 저장된 위치에서 바로 벡터 검색을 실행할 수 있습니다. 또한 레이크에 상주하는 단일 데이터셋을 여러 Milvus 인스턴스에서 동시에 제공할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/create-an-external-collection.md">‘외부 컬렉션 생성</a>’을 참조하십시오.</p>
<h4 id="Snapshot" class="common-anchor-header">스냅샷</h4><p>서비스 제공과 일괄 탐색은 종종 동일한 컬렉션을 동시에 필요로 합니다. A/B 모델 평가, 대규모 중복 제거, 백필 검증, 버전 롤백 등은 모두 쓰기 작업이 진행 중인 동안에도 컬렉션에 대한 안정적인 뷰가 필요합니다.</p>
<p>스냅샷은 데이터를 복사하는 대신 기존 세그먼트를 참조하여 컬렉션의 특정 시점, 읽기 전용 뷰를 생성하므로 추가 저장소 비용은 거의 제로에 가깝습니다. 라이브 컬렉션이 계속 쓰기를 수락하는 동안 배치 작업은 MVCC 방식의 격리 하에서 스냅샷을 읽을 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/snapshots.md">‘스냅샷’</a>, <a href="/docs/ko/manage-snapshots.md">‘스냅샷 관리</a>’ 및 <a href="/docs/ko/snapshot-use-cases.md">‘스냅샷 사용 사례’를</a> 참조하십시오.</p>
<h4 id="External-Backfill" class="common-anchor-header">외부 백필</h4><p>기존 컬렉션에서 v1 임베딩을 v2 임베딩으로 전환하는 등 임베딩 모델을 업그레이드하려면 예전에는 처음부터 다시 구축해야 했습니다. 이로 인해 서비스 중단이 발생하거나 애플리케이션 측에서 이중 쓰기 로직을 적용해야만 했습니다.</p>
<p>Milvus 3.0은 이러한 업그레이드를 핫 워크플로우로 지원합니다. ` <code translate="no">AddCollectionField</code>`을 사용하여 새 벡터 필드를 추가하고, 스냅샷을 통해 일관된 시작점을 고정시킨 다음, 스냅샷을 대상으로 오프라인에서 임베딩 작업을 실행한 후, 일반 수집 경로를 통해 값을 다시 기록할 수 있습니다. 새 필드가 온라인으로 색인된 후에는 애플리케이션이 다운타임 없이 전환할 수 있습니다.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">쿼리/검색 정렬</h4><p>이제 검색 및 쿼리에서 다중 필드 정렬을 지원하며, 정렬 처리가 Milvus 커널로 하향 전달되고 필드별로 <code translate="no">ASC</code> 및 <code translate="no">DESC</code> 을 설정할 수 있습니다. 이는 일반적인 운영상의 한계를 해소합니다. 가장 유사한 항목이 가장 저렴한 항목, 가장 최근의 항목 또는 가장 인기 있는 항목이 아닐 때, 거리 기준 Top-K만으로는 비즈니스 요구 사항을 충족하지 못하는 경우가 많기 때문입니다.</p>
<p>이제 애플리케이션은 복합 순위를 산출하기 위해 결과를 과도하게 가져온 후 클라이언트 측에서 재정렬할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">‘스칼라 필드별 검색 결과 정렬’</a> 및 <a href="/docs/ko/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">‘쿼리 결과 정렬</a>’을 참조하십시오.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null 벡터</h4><p>임베딩은 종종 비동기적으로 생성되므로, 엔티티가 해당 벡터보다 먼저 도착할 수 있습니다. 다중 모달 데이터에도 자막이 없는 동영상이나 이미지가 없는 제품과 같은 자연스러운 공백이 존재합니다. 이전 버전에는 이에 대한 적절한 해결책이 없었습니다. 애플리케이션은 벡터가 준비될 때까지 쓰기를 지연시키거나 자리 표시자 벡터를 채워 넣어야 했으며, 두 선택 모두 검색 품질에 부정적인 영향을 미쳤습니다.</p>
<p>Milvus 3.0은 6가지 벡터 유형 모두에서 벡터 필드에 NULL을 지원합니다. 검색은 NULL 벡터를 자동으로 건너뛰며, 검색 품질에는 영향을 미치지 않고, NULL 벡터는 사실상 저장 공간을 차지하지 않습니다. 이 변경 사항에 따라 벡터 필드에 대한 ' <code translate="no">AddField</code> ' 기능도 확장됩니다. ` <code translate="no">nullable=True</code>`을 사용하면 기존 컬렉션을 재구축하지 않고도 온라인으로 새로운 벡터 필드를 추가할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Nullable Fields</a>’를 참조하십시오.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">사용자 정의 사전 및 동의어 사전</h4><p>기본 제공 토큰화기는 항상 프로덕션 검색 품질 요구 사항을 충족하지는 않습니다. 중국어, 의학, 법학, 화학 등 특정 분야 및 다국어 코퍼스에서는 사용자 정의 사전과 동의어 테이블을 활용하면 상당한 이점을 얻을 수 있습니다. 지금까지 이러한 리소스는 대부분 애플리케이션 측의 쿼리 재작성 형태로 구현되었습니다.</p>
<p>Milvus 3.0에는 사용자 정의 토큰화기 사전, 동의어 목록, 스톱워드 목록 및 복합어 분해 규칙을 등록하기 위한 FileResource 메커니즘이 추가되었습니다. 일단 등록된 리소스는 어떤 토큰화기나 필터에서든 참조할 수 있으며, BM25, 분석기, 텍스트 매치에 적용됩니다. 이제 사전과 동의어는 애플리케이션 코드 곳곳에 흩어져 있는 대신 버전 관리를 통해 중앙에서 일괄적으로 관리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-file-resources.md">‘파일 리소스 관리</a>’를 참조하십시오.</p>
<h4 id="Entity-TTL" class="common-anchor-header">엔티티 TTL</h4><p>컬렉션 수준 및 파티션 수준의 TTL은 많은 수명 주기 및 규정 준수 시나리오에 비해 너무 거칠습니다. 동일한 컬렉션 내의 서로 다른 테넌트는 종종 서로 다른 보존 규칙을 가지며, 개별 엔티티는 컬렉션의 나머지 부분과 일치하지 않는 일정에 따라 만료되어야 할 수도 있습니다.</p>
<p>Milvus 3.0은 엔티티별 TTL을 지원합니다. 스키마에서 ‘ <code translate="no">TIMESTAMPTZ</code> ’ 필드를 선언하고, 컬렉션 속성을 통해 이를 TTL 필드로 지정하면 Milvus가 만료된 엔티티를 자동으로 회수합니다. 이를 통해 애플리케이션 측에서 별도로 정리할 필요 없이 ‘잊혀질 권리’ 요청, 세션 데이터 만료, 제한된 대화 내역 등을 처리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">‘엔티티 수준 TTL 설정</a>’을 참조하십시오.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO(Doc-in, Doc-out)</h4><p>Milvus 2.6에서는 집합 기반 유사 중복 탐지를 위한 <code translate="no">MINHASH_LSH</code> 인덱스가 추가되었지만, 애플리케이션은 여전히 Milvus에 데이터를 기록하기 전에 MinHash 서명을 계산해야 했습니다.</p>
<p>Milvus 3.0에서는 서버 측 MinHash 함수가 추가되었습니다. 스키마에서 <code translate="no">VARCHAR</code> 입력 필드와 <code translate="no">BINARY_VECTOR</code> 출력 필드를 선언하고, <code translate="no">FunctionType.MINHASH</code> 함수를 연결하면 Milvus가 삽입, 대량 삽입 및 검색 중에 서명을 계산합니다. <code translate="no">MINHASH_LSH</code> 와 함께 사용하면 Milvus 내에서 대규모 데이터셋에 대한 중복 제거 워크플로우, 지문 생성 및 표절 탐지를 지원합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하십시오.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>“하나의 엔티티 = 하나의 벡터”라는 가정은 더 이상 현대적인 검색 방식에 부합하지 않습니다. 긴 문서는 여러 청크로 분할되고, ColBERT와 같은 후기 상호작용 모델은 토큰당 하나의 벡터를 생성하며, 다중 모달 엔티티는 여러 뷰를 가질 수 있습니다.</p>
<p>EmbList는 엔티티당 가변 길이 벡터 목록을 저장하며, 디스크 기반 인덱스로는 <code translate="no">DISKANN</code> 를 사용합니다. 코퍼스가 메모리 한도를 초과할 경우, 디스크 경로를 통해 RAM 사용량을 효과적으로 관리할 수 있습니다. EmbList + <code translate="no">DISKANN</code> 는 이번 RC에서 소개되는 광범위한 StructList 계열의 첫 번째 변형입니다. StructList 필터링 및 Muvera/Lemur 다중 벡터 가속화를 포함한 나머지 패밀리 기능들은 공식 3.0 릴리스에 포함될 예정입니다.</p>
<p>자세한 내용은 <a href="/docs/ko/search-with-embedding-lists.md">‘임베딩 리스트를 사용한 검색’을</a> 참조하십시오.</p>
<h4 id="Force-Merge" class="common-anchor-header">강제 병합</h4><p>프로덕션 워크로드는 시간이 지남에 따라 세그먼트 조각화가 누적되어 쿼리 지연 시간의 변동을 유발하고 스토리지 사용량을 증가시킵니다.</p>
<p>Milvus 3.0에서는 동기 및 비동기 모드 모두에서 사용량이 적은 시간대에 세그먼트 압축을 명시적으로 트리거하는 기능이 추가되었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/force-merge.md">강제 병합 압축을</a> 참조하십시오.</p>
