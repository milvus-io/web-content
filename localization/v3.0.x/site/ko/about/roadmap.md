---
id: roadmap.md
title: Milvus 로드맵
related_key: Milvus roadmap
summary: '3.0 및 3.1 릴리스에 걸친 검색, 분석, 스키마 진화, 데이터 레이크 통합 및 성능에 대한 Milvus 로드맵을 살펴보세요.'
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 로드맵<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 3.0은 다중 벡터 검색, SQL 스타일 쿼리, 유연한 스키마, 데이터 레이크 저장소 내 데이터 접근 기능을 통합합니다. 다음 단계에서는 이러한 기반을 바탕으로 더욱 풍부한 쿼리, 확장된 데이터 모델, 성능 및 확장성 향상을 실현할 예정입니다. 이 로드맵은 오픈소스 Milvus의 우선순위를 개괄적으로 설명합니다.</p>
<p>Milvus 3.0 <strong>은 v3.0.1부터</strong> 정식 출시되었습니다. 아래에 소개된 출시된 기능들은 <strong>v3.0.0에서</strong> 도입되었으며, 미리보기 기능 및 선택적 적용 기능은 해당 항목에서 별도로 명시되어 있습니다. <strong>3.0.x</strong> 시리즈는 이러한 기능을 확장하며, <strong>3.1</strong> 버전은 <strong>2026년 12월 출시를 목표로 하고 있습니다</strong>. 계획된 기능 및 목표 일정은 개발 진행 상황에 따라 변경될 수 있습니다.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">검색 및 결과 추출<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 결과 추출 로드맵은 텍스트 매칭 및 다중 벡터 표현부터 재순위 지정 및 검색 결과 패싯에 이르기까지, Milvus 내에서 더 많은 관련성 신호를 결합하는 데 중점을 둡니다.</p>
<p><strong>3.0에서 사용 가능</strong></p>
<ul>
<li><strong>다중 벡터 검색:</strong> StructArray 검색은 Muvera 및 Lemur를 지원하며, 요소 수준 필터링을 위한 <code translate="no">element_filter</code> 를 제공합니다. 일치 정책에는 <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 및 <code translate="no">MATCH_EXACT</code> 가 포함됩니다.</li>
<li><strong>텍스트 매칭 및 유사도:</strong> 사용자 정의 사전과 동의어를 통해 애플리케이션 요구 사항에 맞게 텍스트 검색을 조정할 수 있습니다. 정규식(Regex) 필터링은 패턴 매칭을 지원하며, MinHash는 준중복 감지를 지원합니다.</li>
<li><strong>재순위 지정 및 추론:</strong> Milvus 3.0은 Hugging Face 추론 제공자와 함께 초기 기능 체인(Function Chain) 재순위 지정 기능 세트를 도입합니다. 나머지 기능 체인 기능은 3.0.x 버전에서 제공될 예정입니다.</li>
<li><strong>검색 집계:</strong> 검색 집계는 검색 결과에 대한 패싯 기능을 제공합니다.</li>
</ul>
<p><strong>3.0.x 버전에서 예정된 기능</strong></p>
<p>3.0.x 시리즈에서는 퍼지 매칭 및 전역 통계 기능을 추가하고, Function Chain 지원을 완료할 예정입니다.</p>
<p><strong>3.1 버전에서 계획된 기능</strong></p>
<p>Grep 기반 검색, 근사 최인접 이웃(ANN) 검색과 ANN-필터 융합을 통한 필터링의 긴밀한 통합, 스파스 검색 개선 등이 계획되어 있습니다.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">분석 및 SQL 스타일 쿼리<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 애플리케이션이 검색과 함께 데이터를 정렬하고 집계할 수 있도록 쿼리 엔진을 확장하고 있습니다. 다음 단계에서는 조인, 물질화된 뷰 및 사용자 정의 계산 기능이 추가될 예정입니다.</p>
<p><strong>3.0에서 제공</strong></p>
<p>쿼리 및 검색 기능은 ` <code translate="no">ORDER BY</code>`을 통한 정렬을 지원합니다. 쿼리 집계(Query Aggregation) 기능에는 그룹별 통계를 계산하기 위한 ` <code translate="no">GROUP BY</code> `이 추가됩니다.</p>
<p><strong>3.1 버전 계획</strong></p>
<ul>
<li><strong>더 풍부한 쿼리:</strong> 세미 조인(semi-joins)을 시작으로 조인 기능과 물화 뷰 컬렉션(Materialized View Collections)을 도입합니다.</li>
<li><strong>데이터 업데이트 및 무결성:</strong> 인플레이스 업데이트와 데이터 수집 시 기본 키 중복 제거를 지원합니다.</li>
<li><strong>쿼리 반복 및 JSON 의미론:</strong> 상태 저장 쿼리 반복기, JSON <code translate="no">GROUP BY</code> 및 SQL/JSON NULL 의미론을 추가합니다.</li>
<li><strong>사용자 정의 계산:</strong> Python 사용자 정의 함수(UDF)를 지원합니다.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">유연한 스키마 및 데이터 유형<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마 작업은 기존 컬렉션을 발전시키고 더 광범위한 데이터를 표현하는 데 중점을 둡니다. 여기에는 필드 변경, 다중 벡터 구조, 긴 텍스트 및 엔티티 만료 기간이 포함됩니다.</p>
<p><strong>3.0에서 사용 가능</strong></p>
<ul>
<li><strong>온라인 스키마 변경:</strong> 기존 컬렉션은 벡터 및 <code translate="no">Array&lt;Struct&gt;</code> 필드를 포함한 온라인 필드 추가를 지원합니다. 필드 삭제는 <strong>미리 보기</strong> 버전으로 제공되며 일부 제한 사항이 있을 수 있습니다.</li>
<li><strong>기존 데이터에 대한 백필(backfill):</strong> 외부 백필은 Spark 커넥터를 사용합니다. 내부 백필은 컬렉션에 BM25 또는 MinHash 함수를 적용하여 기존 데이터에 대해 출력을 계산합니다.</li>
<li><strong>텍스트 및 다중 벡터 데이터:</strong> ` <code translate="no">TEXT</code> ` 유형은 긴 텍스트를 저장하며, `StructArray`는 ` <code translate="no">MAX_SIM</code>`을 통해 지연 상호작용 검색을 지원합니다. ` <code translate="no">TEXT</code> `는 Storage V3를 선택적으로 활성화해야 합니다.</li>
<li><strong>NULL 값 및 만료:</strong> 벡터 필드는 NULL 값을 허용하며, 엔티티 수준의 유효 기간(TTL)이 만료를 제어합니다.</li>
</ul>
<p><strong>3.0.x 버전에서 계획된 사항</strong></p>
<p>계획된 스키마 개선 사항에는 타입, NULL 값, 필드 추가 및 제거에 대한 StructArray 지원 확장이 포함됩니다. 또한 분자식 지원과 벡터 필드에 대한 <code translate="no">IS NULL</code> / <code translate="no">IS NOT NULL</code> 필터가 추가됩니다.</p>
<p><strong>3.1 버전 계획</strong></p>
<p>다음 데이터 모델 확장 기능에는 중첩된 JSON 및 Struct, 복합 기본 키, 벡터 필드가 없는 컬렉션, StructList 내의 스파스 벡터가 포함됩니다.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">레이크 통합 및 데이터 버전 관리<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 레이크 스토리지 및 배치 처리와의 긴밀한 통합을 개발 중입니다. 외부 컬렉션을 통해 데이터가 저장된 위치에서 직접 액세스할 수 있으며, 스냅샷은 데이터 버전 관리의 기반을 제공합니다.</p>
<p><strong>3.0에서 사용 가능</strong></p>
<ul>
<li><strong>외부 데이터 액세스:</strong> 외부 컬렉션은 Lance, Parquet 및 Iceberg 데이터를 지원합니다.</li>
<li><strong>스냅샷 및 배치 통합:</strong> 스냅샷은 컬렉션 데이터의 특정 버전을 캡처하며, Spark 커넥터는 배치 워크플로를 지원합니다.</li>
<li><strong>스토리지 기반:</strong> 스토리지 V3(Loon)는 선택적 Vortex 및 Lance 지원을 제공합니다. 이 기능은 기본적으로 비활성화되어 있으며, ` <code translate="no">common.storage.useLoonFFI</code>`를 통해 활성화할 수 있습니다. 스냅샷과 <code translate="no">TEXT</code> 모두 이 기능에 의존합니다.</li>
</ul>
<p><strong>3.0.x 버전에서 계획된 기능</strong></p>
<p>계획된 개선 사항을 통해 Milvus 수집 스냅샷을 외부 수집으로 활용할 수 있게 됩니다. 또한 외부 테이블 지원이 JSON 분할, 함수 필드 추가 및 필드 제거로 확대됩니다.</p>
<p><strong>3.1 버전 계획</strong></p>
<p>S3 기반의 스파스(sparse) 및 스칼라(scalar) 인덱스와, 가져오기(import)를 통한 삭제 기능이 계획되어 있습니다.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">성능, 인덱싱 및 확장성<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>성능 로드맵은 검색 인덱스, 쿼리 실행 및 클러스터 확장을 다룹니다. 또한 복구 및 오브젝트 스토리지에서 데이터를 읽어야 하는 쿼리에 대해서도 다루고 있습니다.</p>
<p><strong>3.0에서 제공</strong></p>
<ul>
<li><strong>스파스 인덱싱:</strong> 스파스 인덱스 개편을 통해 SINDI가 도입됩니다.</li>
<li><strong>인덱스 선택:</strong> <code translate="no">FAISS</code> 패스스루 인덱스는 Faiss 인덱스 팩토리 문자열을 수용하며, SVS, Panorama, PQ, IVFPQ 및 ScaNN 등의 옵션을 제공합니다. 임베딩 목록(EmbList)의 경우 DiskANN 인덱싱도 사용할 수 있습니다.</li>
<li><strong>압축:</strong> Force Merge는 세그먼트 병합을 명시적으로 제어할 수 있게 해줍니다.</li>
</ul>
<p><strong>3.1 버전에서 예정된 기능</strong></p>
<ul>
<li><strong>스토리지 인식 쿼리:</strong> 페이지 수준 프루닝 및 스킵 인덱스를 포함하여 Vortex에 술어 푸시다운을 추가합니다.</li>
<li><strong>클러스터 확장 및 테넌시:</strong> 샤드 분할, 사용자 정의 샤딩 키 및 멀티 테넌시 최적화를 지원합니다.</li>
<li><strong>쿼리 실행 및 인덱싱:</strong> QueryView를 개발하고, 광범위한 컬렉션에 대한 지원을 개선하며, 스트림 결과 축소 기능을 강화하고, 다중 인덱스를 지원합니다.</li>
<li><strong>쓰기 안정성:</strong> 항등적 쓰기를 지원합니다.</li>
<li><strong>오브젝트 스토리지 캐싱:</strong> Talon을 S3 캐시로 사용하여 장애 복구 및 콜드 쿼리 성능을 개선합니다.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">3.1 이후<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>장기적인 작업으로는 타임 트래블 및 스냅샷 롤백이 포함됩니다. 해당 기능의 범위와 출시 시기는 아직 확정되지 않았습니다.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">로드맵 수립에 기여해 주세요<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/discussions">GitHub 토론</a>에서 애플리케이션에 중요한 워크로드, 제한 사항 및 기능 요청을 공유해 주세요. <a href="https://github.com/milvus-io/milvus/issues">GitHub 이슈를</a> 통해 버그를 보고해 주세요.</p>
<p>코드나 문서를 기여하려면 <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">기여자 가이드</a>부터 시작하세요.</p>
