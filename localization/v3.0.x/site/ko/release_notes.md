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
    </button></h1><p>Milvus의 새로운 기능을 알아보세요! 이 페이지에는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항이 요약되어 있습니다. 이 페이지를 정기적으로 방문하여 업데이트에 대해 알아보는 것이 좋습니다.</p>
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
    </button></h2><p>릴리스 날짜: 2026년 5월 9일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta는 Milvus가 벡터 데이터베이스에서 시맨틱 네이티브 레이크 엔진으로의 전환을 시작합니다. 이제 Milvus 커널은 오픈 레이크 형식의 데이터에서 직접 작동할 수 있으며, 검색, 스키마, 수명 주기, 언어 및 운영 전반에 걸쳐 Milvus의 핵심 기능이 확장되었습니다.</p>
<p>외부 수집과 스냅샷은 레이크 쪽에 추가된 주요 기능입니다. 또한 동일한 커널이 Milvus 3.0에 구축된 시맨틱 네이티브 데이터 플랫폼인 Zilliz Lakebase를 구동합니다.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">외부 수집</h4><p>일반적인 AI 데이터 파이프라인에서는 테라바이트 단위의 임베딩과 메타데이터가 이미 Parquet, Lance 또는 Iceberg 테이블로 오브젝트 스토리지에 저장되어 있습니다. 이러한 데이터를 Milvus로 복사하면 스토리지 비용이 두 배로 증가하고, 동기화 상태를 유지해야 하는 ETL 파이프라인이 추가되며, 데이터 거버넌스가 고객으로부터 멀어지게 됩니다.</p>
<p>외부 컬렉션은 복사본을 제거합니다. Milvus 컬렉션은 이미 있는 파일을 참조할 수 있으며, Milvus는 스키마, 인덱스, 쿼리 실행만 관리합니다. 증분 새로 고침은 컬렉션을 기본 파일과 정렬된 상태로 유지합니다. 재무 및 의료 팀과 같이 데이터를 레이크에서 떠날 수 없는 고객은 데이터가 있는 곳에서 해당 데이터에 대해 벡터 검색을 실행할 수 있습니다. 단일 레이크 상주 데이터 세트는 여러 Milvus 인스턴스에서 한 번에 제공될 수도 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/create-an-external-collection.md">외부 컬렉션 만들기를</a> 참조하세요.</p>
<h4 id="Snapshot" class="common-anchor-header">스냅샷</h4><p>서빙과 일괄 검색에는 동일한 컬렉션이 동시에 필요한 경우가 많습니다. A/B 모델 평가, 대규모 중복 제거, 백필 유효성 검사 및 버전 롤백은 모두 쓰기가 계속 진행되는 동안 컬렉션을 안정적으로 볼 수 있어야 합니다.</p>
<p>스냅샷은 데이터를 복사하는 대신 기존 세그먼트를 참조하여 컬렉션의 특정 시점, 읽기 전용 보기를 생성하므로 한계 스토리지 비용이 거의 0에 가깝습니다. 배치 작업은 라이브 컬렉션이 계속 쓰기를 허용하는 동안 MVCC 스타일의 격리 상태에서 스냅샷에서 읽을 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/snapshots.md">스냅샷</a>, <a href="/docs/ko/manage-snapshots.md">스냅샷 관리</a> 및 <a href="/docs/ko/snapshot-use-cases.md">스냅샷 사용 사례를</a> 참조하세요.</p>
<h4 id="External-Backfill" class="common-anchor-header">외부 백필</h4><p>기존 컬렉션에서 v1 임베딩에서 v2 임베딩으로 이동하는 등 임베딩 모델을 업그레이드하는 것은 처음부터 다시 구축하는 것을 의미했습니다. 이로 인해 서비스 다운타임이 발생하거나 애플리케이션 측에서 이중 쓰기 로직이 발생했습니다.</p>
<p>Milvus 3.0은 핫 워크플로우로 업그레이드를 지원합니다. <code translate="no">AddCollectionField</code> 로 새 벡터 필드를 추가하고, 스냅샷을 사용하여 일관된 시작점을 고정하고, 스냅샷에 대해 임베딩 작업을 오프라인으로 실행한 다음, 일반 수집 경로를 통해 값을 다시 쓸 수 있습니다. 새 필드가 온라인으로 색인된 후에는 애플리케이션이 다운타임 없이 전환할 수 있습니다.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">쿼리/검색 주문 기준</h4><p>이제 검색 및 쿼리에서 다중 필드 순서를 허용하며, 정렬은 Milvus 커널로 푸시되고 <code translate="no">ASC</code> / <code translate="no">DESC</code> 필드별로 설정할 수 있습니다. 이로써 일반적인 생산 격차가 해소됩니다: 가장 유사한 품목이 가장 저렴하거나 가장 최신이거나 가장 인기 있는 품목이 아닐 때 거리별 상위-K만으로는 비즈니스 요구사항에 부합하지 않는 경우가 많습니다.</p>
<p>애플리케이션은 더 이상 결과를 과도하게 가져와 클라이언트에서 다시 정렬하여 종합 순위를 표시할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">스칼라 필드로 검색 결과 정렬하기</a> 및 <a href="/docs/ko/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">쿼리 결과 정렬하기를</a> 참조하세요.</p>
<h4 id="Null-Vector" class="common-anchor-header">널 벡터</h4><p>임베딩은 종종 비동기적으로 생성되므로 엔티티가 벡터보다 먼저 도착할 수 있습니다. 캡션이 없는 동영상이나 이미지가 없는 제품 등, 멀티모달 데이터에도 자연스러운 간격이 존재합니다. 이전 버전에서는 애플리케이션이 벡터가 준비될 때까지 쓰기를 지연시키거나 플레이스홀더 벡터를 채웠는데, 두 가지 방법 모두 검색 품질을 떨어뜨릴 수 있는 해결책이 없었습니다.</p>
<p>Milvus 3.0은 6가지 벡터 유형 모두에 걸쳐 벡터 필드에서 NULL을 지원합니다. 검색은 NULL 벡터를 자동으로 건너뛰고 검색 품질에는 영향을 미치지 않으며 NULL 벡터는 사실상 저장 공간을 차지하지 않습니다. <code translate="no">AddField</code> 이 변경에 따라 벡터 필드에도 확장됩니다. <code translate="no">nullable=True</code> 을 사용하면 기존 컬렉션에서 리빌드 없이 온라인으로 새 벡터 필드를 늘릴 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 필드를</a> 참조하세요.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">사용자 정의 사전 및 동의어 사전</h4><p>기본 제공 토큰화기가 항상 프로덕션 검색 품질 요구 사항을 충족하는 것은 아닙니다. 중국어, 의학, 법률, 화학 등의 수직적 도메인, 다국어 말뭉치 등은 사용자 정의 사전과 동의어 표를 통해 상당한 이점을 얻을 수 있습니다. 지금까지 이러한 리소스는 대부분 애플리케이션 측 쿼리 재작성 형태로 존재했습니다.</p>
<p>Milvus 3.0에는 사용자 지정 토큰화 사전, 동의어 목록, 중지 단어 목록, 분해기 규칙을 등록할 수 있는 FileResource 메커니즘이 추가되었습니다. 등록한 리소스는 모든 토큰화기나 필터에서 참조할 수 있으며 BM25, 분석기, 텍스트 매치에서 적용됩니다. 이제 사전과 동의어를 애플리케이션 코드에 흩어져 있지 않고 중앙에서 버전 관리 및 관리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-file-resources.md">파일 리소스 관리를</a> 참조하세요.</p>
<h4 id="Entity-TTL" class="common-anchor-header">엔티티 TTL</h4><p>컬렉션 수준 및 파티션 수준 TTL은 많은 수명 주기 및 규정 준수 시나리오에 비해 너무 거칠습니다. 동일한 컬렉션 내의 테넌트마다 보존 규칙이 다른 경우가 많으며, 개별 엔티티는 나머지 컬렉션과 일치하지 않는 일정에 따라 만료되어야 할 수도 있습니다.</p>
<p>Milvus 3.0은 엔티티별 TTL을 지원합니다. 스키마에 <code translate="no">TIMESTAMPTZ</code> 필드를 선언하고 컬렉션 속성을 통해 이를 TTL 필드로 표시하면 Milvus가 만료된 엔티티를 자동으로 회수합니다. 여기에는 애플리케이션 측의 정리 없이도 잊혀질 권리 요청, 만료되는 세션 데이터 및 제한된 대화 기록이 포함됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">엔티티 수준 TTL 설정을</a> 참조하세요.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO(Doc-in, Doc-out)</h4><p>Milvus 2.6은 세트 기반의 거의 중복 탐지를 위해 <code translate="no">MINHASH_LSH</code> 인덱스를 추가했지만, 애플리케이션은 여전히 Milvus에 데이터를 쓰기 전에 MinHash 서명을 계산해야 했습니다.</p>
<p>Milvus 3.0에는 서버 측 MinHash 함수가 추가되었습니다. 스키마에 <code translate="no">VARCHAR</code> 입력 필드와 <code translate="no">BINARY_VECTOR</code> 출력 필드를 선언하고 <code translate="no">FunctionType.MINHASH</code> 함수를 첨부하면 삽입, 일괄 삽입, 검색 중에 Milvus가 서명을 계산합니다. 이는 <code translate="no">MINHASH_LSH</code> 과 함께 Milvus 내에서 대규모 데이터 세트, 핑거프린팅 및 표절 감지를 위한 중복 제거 워크플로우를 지원합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하세요.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>"하나의 엔티티 = 하나의 벡터"라는 가정은 더 이상 최신 검색에 맞지 않습니다. 긴 문서는 여러 개의 청크로 분할되고, 콜버트와 같은 후기 상호작용 모델은 토큰당 하나의 벡터를 방출하며, 멀티모달 엔티티는 여러 개의 보기를 가질 수 있습니다.</p>
<p>EmbList는 엔티티당 가변 길이의 벡터 목록을 저장하며, <code translate="no">DISKANN</code> 을 온디스크 인덱스로 사용합니다. 디스크 경로는 말뭉치가 메모리 예산을 초과할 때 RAM 사용량을 제어합니다. EmbList + <code translate="no">DISKANN</code> 는 이 RC에서 더 광범위한 StructList 제품군의 첫 번째 변형입니다. StructList 필터링과 Muvera/Lemur 다중 벡터 가속을 포함한 나머지 제품군은 공식 3.0 릴리스를 목표로 하고 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/search-with-embedding-lists.md">임베딩 리스트를 사용한 검색을</a> 참조하세요.</p>
<h4 id="Force-Merge" class="common-anchor-header">강제 병합</h4><p>프로덕션 워크로드는 시간이 지남에 따라 세그먼트 조각화가 누적되어 쿼리 지연 지터와 스토리지 증가를 유발합니다.</p>
<p>Milvus 3.0에서는 동기 및 비동기 모드 모두에서 사용량이 많지 않은 기간 동안 세그먼트 압축을 명시적으로 트리거하는 기능이 추가되었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/force-merge.md">강제 병합 압축을</a> 참조하세요.</p>
