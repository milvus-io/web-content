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
    </button></h1><p>Milvus의 새로운 기능을 확인해 보세요! 이 페이지에서는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 내역을 요약하여 제공합니다. 업데이트 내용을 확인하려면 이 페이지를 정기적으로 방문하시기 바랍니다.</p>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>출시일: 2026년 9월 9일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th><th>Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>Milvus v3.0.1의 출시를 발표하게 되어 기쁩니다! 이번 릴리스에서는 REST v2 스냅샷 관리 기능, 확장된 재순위 지정 기능, Go 클라이언트 및 RESTful API에서의 TEXT 필드 지원이 추가되었으며, Storage V3, 데이터 일관성 및 보안 관련 성능 개선 및 버그 수정도 포함되었습니다.</p>
<h3 id="Features-improvements" class="common-anchor-header">기능 개선 사항<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>컬렉션 범위의 네이티브 스냅샷 관리 및 비동기 복원을 위한 REST v2 API 추가 (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>검색 및 쿼리 작업에서 Take 출력 경로 선택을 제어하기 위해 구성 가능한 결과 개수 임계값을 추가했습니다(<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Go 클라이언트 및 RESTful API에 TEXT 필드 지원 추가 (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>외부 테이블에 대해 구성 가능한 초기 및 최대 읽기 IOPS 속도를 추가했습니다(<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>).</li>
<li>데이터 게시를 지연시키지 않으면서 모든 세그먼트가 인덱싱될 때까지 기다린 후 완료를 보고하도록 외부 컬렉션 새로 고침 작업에 대한 옵트인 설정을 추가했습니다(<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>검색 함수 체인에 L1 재순위 지정 지원 추가 (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>FunctionScore, REST, 레거시 하이브리드 검색 및 Go 클라이언트 전반에 걸쳐 ANN 요청별 가중치를 선택적으로 적용할 수 있는 가중치 기반 RRF 재순위 지정 기능을 추가했습니다(<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">안정성 개선<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>지오메트리 RTree 인덱스 및 캐시의 메모리 안전성을 개선하고, 구문 분석할 수 없는 WKB 및 빈 지오메트리 쿼리 처리를 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>프로세스 전체의 일시적 메모리 할당량 관리 기능을 복원하고, 동시 Storage V2/V3 필드 로딩 및 스칼라 V3 인덱스 로딩에 대한 메모리 추정치를 수정하여 메모리 관리 기능을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>).</li>
<li>읽기 작업을 병렬화하고 원시 벡터 데이터를 디스크로 스트리밍하여 외부 컬렉션 인덱스 구축 중 발생하는 다운로드 병목 현상과 메모리 사용량을 줄였습니다(<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>).</li>
<li>클라이언트 추가 작업을 일괄 처리하고 동기화 설정을 노출하여 소규모 배치, 고동시성 워크로드에 대한 Woodpecker 처리량 향상 (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>스토리지 및 압축 경로 전반에 걸쳐 레코드 리더 소유권 및 수명 일관성, 빈 블롭 처리, 읽기 오류 보고 기능을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>).</li>
<li>4방향 인터리브 파이프라인과 충돌 및 재해시 경계에 대한 안전 장치를 통해 그룹화 해시 프로브 효율성을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>).</li>
<li>BM25 또는 MinHash 출력 필드가 없는 컬렉션에 대해 WAL 삽입 본문 구문 분석을 건너뛰어 삽입 처리 오버헤드를 줄였습니다 (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>실행 계층 전반에 걸쳐 일시적 및 영구적 오류 분류를 유지함으로써 스토리지 장애 보고 및 재시도 처리를 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>기본적으로 GIS 거친/정밀 분할 및 동일 열 술어 융합을 활성화하여 공간 쿼리 성능 향상 (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>공유 백로그 기반 입실 제어 및 교대 제출 우선순위를 통해 텍스트 인덱싱 및 JSON 분할 작업 스케줄링 개선 (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>전용 로딩 옵션 및 디스크 리소스 계산을 통해 씰된 세그먼트 오프셋 매핑에 대한 mmap 지원 추가 (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>요청 시 열별 청크 메모리 추정을 실행하여 Storage V2 데이터 로딩을 최적화했습니다 (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>새로운 함수 출력 필드에 바인딩된 인덱스에 대한 서버 측 AutoIndex 지원이 추가되어, add_function_field 요청 시 인덱스 매개변수를 생략하거나 AUTOINDEX를 지정할 수 있게 되었습니다 (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>전체 보고서 폴백을 통한 증분 보고 방식으로 QueryNode 분포 보고서 페이로드를 줄이고, 메트릭 수집 중 메모리 할당량을 줄였습니다(<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>bcrypt 비용을 4에서 10으로 높여 암호 해시 강도를 개선했으며, 기존 해시를 업그레이드하려면 자격 증명 교체(credential rotation)가 필요합니다 (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Parquet 가져오기 시 struct 배열 하위 필드에 대해 필요한 리프 열만 읽음으로써 중복 디코딩을 줄였습니다(<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>다중 라운드의 크기 기반 계획 기능을 통해 강제 병합 그룹화를 개선하고, 기존 계획 임계값 설정을 더 이상 사용하지 않도록 했습니다(<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>cgosymbolizer를 업그레이드하여 네이티브 오류 발생 후 PID 1로 실행되는 Milvus 프로세스가 멈춰 버리는 현상을 방지했습니다(<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>).</li>
<li>시맨틱 하이라이팅 입력에 대한 행 수 유효성 검증을 개선했습니다 (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>쓰기 재시도에 대해 구성 가능한 백오프를 통해 가져오기 재시도 제어 기능을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>오래된 통계 버전을 회수하고 터미널 상태를 영구 저장하여 분석 작업 수명 주기 관리를 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>).</li>
<li>잠금 시간 초과 후 세그먼트 해제를 기다림으로써 세그먼트 수명 주기 조정을 개선했습니다 (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>k-way 병합을 통한 데이터 압축을 위한 스토리지 정렬 개선 (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>청크 액세스, 표현식 평가 및 JSON 통계 전반에 걸쳐 압축된 마스크를 유지함으로써 null 허용 필드의 유효성 검사 버퍼 확장을 줄였습니다(<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>로그나 오류 메시지에 민감한 자격 증명, API 키, RBAC 암호 해시 및 외부 수집 소스 세부 정보가 노출되지 않도록 하여 보호 기능을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>).</li>
<li>낙관적 CAS 유효성 검사 및 적격 충돌에 대한 안전한 재시도를 통해 부분 업데이트 동시성 제어 개선 (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>증가하는 세그먼트 읽기 스냅샷의 안정성 및 스키마 스냅샷 수명 관리 개선 (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>백업 중 권한 부여 메타데이터에 대한 중복 스캔을 줄였습니다(<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>).</li>
<li>벡터 ID 매핑을 인덱스 계층으로 이동하고, 논리적 ID 처리를 통합하며, 씰된 인덱스에 대한 mmap 기반 매핑을 지원함으로써 null 허용 벡터 ID 매핑을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>).</li>
<li>CPU 및 GPU 빌드에서 Sonic JIT 컴파일과 Go 플러그인 로딩 간의 동기화 개선 (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>메타데이터 캐시를 통해 프록시 쓰기 경로 채널 해결을 개선하여 중복 코디네이터 RPC를 제거하고 오류 분류를 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>).</li>
<li>보고된 벤치마크에서 topk=100000일 때 리콜 계산 시간을 약 3.08초에서 18.5밀리초로 단축했습니다(<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>유효성 비트맵을 재사용하고, 중복된 null 오프셋 저장을 줄이며, 비트셋 복사 속도를 높임으로써 nullable 필드 필터링을 최적화했습니다(<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>고유 요소 수가 비트맵 카디널리티 한계에 도달할 때 STL_SORT를 사용하여 중첩된 구조체 하위 필드에 대한 하이브리드 스칼라 인덱스를 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>메타데이터 캐시에서 세그먼트 ID 필터링 효율을 개선했습니다(<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>해시 헬퍼 함수에서 메모리 할당량 감소 (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>비교별 맵 조회 제거를 통해 병합된 재순위 지정 결과의 정렬 최적화 (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>JSON 기본값 및 NUL로 끝나지 않는 문자열 뷰 처리 시 메모리 안전성 개선 (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>범위 지정 통합 컴파일, 컴파일러 캐싱 개선 및 중복 컴파일 작업 감소를 통해 C++ 빌드 시간 단축 (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>기존 메트릭 이름과 레이블을 유지하면서 스크랩 시점에 캐시된 파일 시스템에서 메트릭을 수집하여 파일 시스템 메트릭의 커버리지와 최신성을 개선했습니다 (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>단일 스레드 기본값을 유지하면서, 증가하는 세그먼트의 중간 인덱스 구축에 사용되는 스레드 수를 구성할 수 있도록 새로 고침 가능한 growingBuildThreadRate 설정을 추가했습니다(<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>).</li>
<li>백포트를 통해 3.0에 mmap 필드 데이터 쓰기 백업 지원을 추가하고, 기본적으로 비활성화된 queryNode.mmap.writeback 옵션을 제공했습니다 (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>JSON, ARRAY 및 TIMESTAMPTZ 쿼리에서 잘못된 결과 및 일관성 없는 술어 유효성 검증을 수정했습니다. 여기에는 혼합 유형 술어, 대수 비교 및 여러 배치에 걸친 필터링이 포함됩니다(<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>).</li>
<li>세그먼트의 소스 파일이 여러 태스크에 걸쳐 있는 경우, 병렬 외부 컬렉션 새로 고침 중에 새로 고침된 데이터가 일관되지 않게 나타나는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>).</li>
<li>요소 수준에서 작동하지 않는 술어를 허용하던 MATCH 표현식을 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>).</li>
<li>일치 항목이 없는 검색 시 ‘지원되지 않는 ID 유형’ 오류가 발생하던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>).</li>
<li>기본값이 10초인 구성 가능한 마이그레이션 타임아웃을 추가하여, 종료 중 독립형 Milvus가 응답하지 않는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>).</li>
<li>서빙 클러스터 간에 DataNode 워커가 공유될 때 외부 테이블 임베딩 요청에서 잘못된 클러스터 식별자를 사용하던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>TextEmbedding 함수에 대한 integration_id 및 model_deployment_id 업데이트가 불가능하던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>).</li>
<li>백필에 실패한 세그먼트에 대해 HTTP JSON 응답에서 명시적인 ok=false 상태가 생략되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>전송 또는 저속 타임아웃 후 재시도 시 HTTP 400 XAmzContentChecksumMismatch 오류로 인해 MinIO 객체 업로드가 실패하는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>).</li>
<li>스트리밍 서비스가 활성화된 상태에서 QueryNode 간 세그먼트 균형 조정이 중단되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>보존된 레코드를 재구성할 수 없을 때 믹스 압축 중에 발생하는 무증상 데이터 손실 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>스냅샷 복원 시 컬렉션 설정이 손실되고 예기치 않게 ‘강한 일관성(Strong consistency)’으로 기본 설정되던 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>스트리밍 삭제 시 새로 로드된 봉인된 세그먼트가 누락되어 삭제된 데이터를 계속 쿼리할 수 있던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>).</li>
<li>빈 데이터에 대해 중첩 인덱스가 올바르게 생성되지 않던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>스트리밍 서비스로 전환할 때 작업이 무기한 대기 상태에 빠지는 데드락 현상 수정 (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>압축 및 레코드 재구축 시 잘못된 지오메트리 기본값 문제와 Parquet 가져오기에서 기본값으로 채워진 지오메트리 값에 대한 잘못된 null 표시 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>DataCoord 재시작 후 압축 및 복구 과정에서 유효한 V3 세그먼트가 거부되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>구조체(struct)의 VARCHAR 배열 하위 필드에 하이브리드 스칼라 인덱스를 사용할 때 버전 메타데이터 누락 오류로 인한 세그먼트 로드 실패 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>업데이트된 매니페스트를 다시 열었을 때 외부 열이 새로 고쳐지지 않는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>시간 기반 조건이 포함된 검색에서 시간대 처리가 올바르지 않았던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>).</li>
<li>검색 요청에서 ArrayOfVector 입력에 대한 잘못된 처리를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>).</li>
<li>지원되는 크기 제한을 초과하는 행이 삽입 시 거부되지 않던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>).</li>
<li>구성된 대상 인덱스 버전을 무시하던 중간 인덱스 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>order_by를 사용하는 쿼리가 고밀도 벡터 출력 필드를 반환하지 않는 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>권한 그룹에서 제거된 후에도 취소된 권한이 계속 유효하게 유지되던 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>DataCoord 재시작 후 Storage V3 세그먼트에 대한 잘못된 binlog 파일 수 및 스토리지 형식 레이블 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>신뢰할 수 없는 워커 버전 확인 또는 지원되지 않는 워커에 대해 타임아웃이 발생할 때까지 반복적으로 재시도하여 외부 스냅샷 복원이 중단되던 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>3.0.0 버전의 레거시 STLSORT 파일이 포함된 구조체 배열 하위 필드에 대한 HYBRID 인덱스의 세그먼트 로딩 오류를 수정했으며, 재인덱싱이 필요하지 않습니다(<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>길이가 0인 Arrow C 데이터 버퍼를 처리할 때 발생하는 충돌을 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>매니페스트 오류 발생 후 Storage V3 세그먼트를 로드하거나 다시 열 때 오류 처리가 올바르지 않았던 문제를 수정하여, 안전한 재시도를 위해 기존 세그먼트 상태를 보존하도록 했습니다(<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>ARRAY 요소 필터가 뒤따르는 요소들보다 먼저 NULL 또는 빈 배열로만 구성된 전체 배치를 발견했을 때 발생하는 쿼리 오류를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>).</li>
<li>컬렉션 스키마가 변경된 후 백필 작업이 오래된 임베딩을 커밋하는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Storage V3 레코드에서 누락된 필드가 선언된 기본값 대신 NULL로 반환되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>IAM/OAuth 자격 증명을 사용하여 GCS에서 Storage V3 스냅샷 복원(5 GiB보다 큰 오브젝트 복사 포함)을 방해하던 서버 측 복사 오류를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>).</li>
<li>외부 프록시 포트에서 gRPC 스트리밍 호출을 통한 인증되지 않은 액세스 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>클러스터링 압축 후 데이터의 원래 커밋 타임스탬프가 손실되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>기존 Storage V2 세그먼트가 있는 컬렉션에 TEXT 필드를 추가한 후 반복되는 플러시 오류로 인해 발생하던 스트리밍 노드 충돌 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>).</li>
<li>Storage V3 세그먼트에서 만료된 행이 TTL 필드 기반 압축을 트리거하지 못하고, 다른 압축 조건이 충족될 때까지 저장되어 있던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>).</li>
<li>CDC 복제 가져오기 중 소스 및 대상 컬렉션 간에 자동 생성된 기본 키가 일관되지 않던 문제 수정 (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>WAL 백엔드 마이그레이션 중에 동시 쓰기 작업이 손실되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>카디널리티가 높은 데이터를 포함하는 재구축되거나 압축된 중첩 HYBRID 인덱스가 이전 버전으로 롤백된 후 읽을 수 없게 되는 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>모든 값이 null인 null 허용 행을 허용하고, 부분적으로 null인 행에 대한 구성 가능한 처리 방식을 추가하여 외부 고밀도 벡터 행의 null 요소 처리를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>스트리밍 노드 장애 조치 후 V3 세그먼트 행 수 계산 오류 및 반복되는 정렬 압축 실패 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>범위 조건과 OR 연산자를 결합한 쿼리에서 포괄적 하한값에 해당하는 레코드가 누락되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>).</li>
<li>기본 키를 사용한 검색 시 요청된 ID 순서가 유지되지 않던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Storage V3를 활성화한 후 TEXT 필드를 추가하면 기존 Storage V2 확장 세그먼트가 로드되지 않아 플러시, 정렬 및 인덱스 작업이 중단되던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>).</li>
<li>커밋되지 않은 Storage V3 세그먼트를 포함하는 스냅샷으로 인해 복원이 성공으로 보고되지만 복원된 세그먼트를 로드할 수 없던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>파일이 중첩된 작업 또는 버전 디렉터리에 저장된 경우 Storage V3 텍스트 인덱스가 로드되지 않던 문제를 수정했습니다(<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>출시일: 2026년 7월 29일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th><th>Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0이 공식 출시되었습니다! <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta에서</a> 도입된 레이크 네이티브 아키텍처를 기반으로, 이번 릴리스는 베타 버전에서 시작한 작업을 완성합니다. 외부 컬렉션(External Collection)은 더 많은 레이크하우스 워크플로우를 지원하며, 스키마는 온라인 추가/백필/삭제를 지원하고, 스파스 인덱스는 SINDI를 기반으로 재구축되었습니다. StructArray와 패싯 검색이 검색 엔진을 완성하며; FAISS 패스스루와 TEXT가 인덱스 및 모달리티 선택지를 확장하고; Woodpecker는 독립형 서비스로 실행됩니다.</p>
<p>Milvus 3.0에 대해 더 자세히 알아보고 핵심 유지보수 담당자들과의 AMA를 보려면 아래 동영상을 시청하세요:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>3.0 시리즈를 처음 접하시는 분들을 위해, 아래의 ‘Core 3.0 기능 요약’ 섹션에서는 3.0-베타에 도입된 기능을 간략히 정리해 두었으며, <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-베타 릴리스 노트에서</a> 자세한 내용을 확인하실 수 있습니다.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0의 새로운 기능 (3.0-beta 이후)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">외부 컬렉션: 더욱 완벽한 레이크하우스 워크플로우</h4><p>3.0-beta에서는 ‘외부 컬렉션(External Collection)’ 기능이 도입되어, 데이터를 Milvus로 복사하지 않고도 기존 위치의 레이크 파일을 참조하고, 인덱스를 생성하며, 검색할 수 있게 되었습니다. 이번 릴리스에서는 이를 확장하여 완전한 레이크하우스 검색 워크플로우를 지원합니다. 이제 외부 필드는 BM25 스파스 벡터, MinHash 시그니처, 텍스트 임베딩과 같은 함수 출력 필드에 데이터를 제공할 수 있으므로, 원본 테이블을 복사하지 않고도 Milvus 내에서 텍스트 및 모델 기반 검색 필드를 생성할 수 있습니다. Refresh는 또한 추가형 스키마 진화를 지원합니다. 외부 테이블에 새 열이 추가되면 Milvus는 컬렉션을 재구축하는 대신 영향을 받는 세그먼트만 패치합니다.</p>
<p>또한 이번 릴리스에서는 Milvus 스냅샷 메타데이터와 Storage V3 매니페스트를 외부 소스로 취급하는 ‘ <code translate="no">milvus-table</code> ’ 외부 형식이 추가되어, 컬렉션 스냅샷 자체가 외부 테이블로 제공될 수 있습니다. 이를 통해 배치 및 서빙 시스템은 동일한 데이터에 대한 매니페스트 기반의 공유 뷰를 확보할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/create-an-external-collection.md">‘외부 컬렉션</a> 및 <a href="/docs/ko/snapshots.md">스냅샷</a> 생성’을 참조하십시오.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">유연한 스키마: 온라인에서 열 추가, 백필 및 삭제</h4><p>프로덕션 환경에서 스키마는 정적이지 않습니다. 모델이 교체되고, 기능이 반복적으로 개선되며, 필드가 더 이상 사용되지 않게 되는데, 과거에는 이러한 변경으로 인해 다운타임이나 이중 쓰기가 발생하는 전체 컬렉션 재구축이 필요했습니다. 3.0.0 버전은 이 문제를 해결하여, 서비스 제공이 계속되는 동안에도 열을 추가, 백필 및 삭제할 수 있게 되었습니다.</p>
<p>백필은 양방향으로 작동합니다. 외부 백필은 Milvus 외부에서 계산된 값을 처리합니다. 열을 추가하고, 일관된 시작점으로 컬렉션의 스냅샷을 생성한 후, 오프라인에서 작업을 실행하고, 값을 다시 기록하면 Milvus가 새 열을 증분 방식으로 색인화합니다. 이를 통해 수억 행에 걸친 임베딩 모델 업그레이드가 다운타임 없이 원활하게 진행됩니다. 내부 백필(Inner backfill)은 커널에서 파생된 값을 처리합니다. 기존 컬렉션에 BM25 또는 MinHash 함수를 연결하면, 해당 출력 필드가 기존 데이터를 기반으로 자동으로 계산됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/add-fields-to-an-existing-collection.md">‘기존 컬렉션에 필드 추가’를</a> 참조하십시오.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">스파스 인덱스 전면 개편: SINDI, Block-Max WAND 및 Block-Max MaxScore</h4><p>Milvus 3.0은 스파스 벡터 인덱스를 전면적으로 업그레이드했습니다. <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND, Block-Max MaxScore와 같은 새로운 검색 알고리즘을 도입했으며, 역목록 압축, 구성 가능한 양자화, 워크로드별 검색 알고리즘 선택 기능도 함께 제공합니다. 또한 mmap 로딩, 직렬화 및 BM25 스코어링이 최적화되어 대규모 스파스 벡터 및 전체 텍스트 검색에 대한 인덱스 저장 공간과 로딩 오버헤드가 감소합니다. 내부 벤치마크 결과, 압축된 BM25 인덱스는 비슷한 리콜률에서 2.6 스파스 인덱스보다 크기가 약 3배 더 작으며, SINDI는 학습된 스파스 임베딩에서 MaxScore 대비 최대 약 10배의 QPS를 달성합니다. 새로운 인덱스 버전이 활성화되면(호환성 및 동작 관련 참고 사항 참조), SINDI는 스파스 IP 검색의 기본값이 되고, MaxScore는 BM25의 기본값이 됩니다.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray 지원 범위</h4><p>StructArray는 이제 null 값, 비트맵 인덱스, 활성 컬렉션에 대한 동적 필드 추가, upsert를 통한 구조체 필드의 부분 업데이트를 지원하며, 이에 상응하는 REST 및 대량 가져오기 기능도 지원합니다.</p>
<p>요소 수준 검색에는 엔티티별로 구성 가능한 집계(최대/합계/평균/상위 k개 변형)를 지원하는 벡터 하위 필드에 걸친 하이브리드 검색과, 범위 검색 및 그룹화 기능이 추가되었습니다. 중첩 필터링은 ` <code translate="no">element_filter</code> ` 술어, ` <code translate="no">MATCH_ANY</code> ` / ` <code translate="no">MATCH_ALL</code> ` / ` <code translate="no">MATCH_LEAST</code> ` / ` <code translate="no">MATCH_MOST</code> ` / ` <code translate="no">MATCH_EXACT</code> ` 수량자, ` <code translate="no">tags[0][name]</code>`과 같은 위치 기반 하위 필드 액세스, 그리고 구조체 열에 대한 ` <code translate="no">array_length()</code> `를 지원합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/array-of-structs.md">StructArray</a> 및 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">검색 집계 및 패싯 검색</h4><p>베타 버전의 쿼리 집계는 필터링된 데이터에 대해 정확한 통계를 계산하며, 3.0.0 버전에서는 검색 경로에 패싯 기능이 추가되었습니다. 검색 시 패싯 필드를 지정하면 Milvus는 상위 패싯 값을 반환하며, 각 값은 ANN 순위에서 가장 잘 일치하는 멤버로 표시되고 COUNT 및 AVG와 같은 집계 값이 주석으로 추가됩니다. — 클라이언트 측에서 과도하게 데이터를 가져와 집계하는 대신, 단 한 번의 요청으로 패싯 검색 사이드바(브랜드, 가격대, 속성)를 제공합니다.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">함수 체인 재순위 지정</h4><p>재순위는 이제 단일 검색 요청의 일부로 정렬되고 유형이 지정된 파이프라인을 실행하는 함수 체인(Function Chain) API를 통해 조합할 수 있습니다. 하나의 체인은 QueryNode에서의 초기 L0 재점수와 Proxy에서의 L2 사후 축소 재순위를 결합할 수 있으며, 클라이언트 측 오케스트레이션 없이 점수 변환 및 결합, 모델 기반 재순위 지정, 정렬, 후보 트리밍을 지원합니다. 또한 이번 릴리스에서는 FileResources로 등록된 UBJ 모델을 사용하는 L0 재순위를 위한 네이티브 XGBoost 스코어링과, 서버 관리형 텍스트 임베딩 및 문장 유사도 재순위를 위한 Hugging Face 추론 제공자가 추가되었습니다.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 장문 필드</h4><p>TEXT 필드는 저장소 측의 길이 제한을 제거하여 장문 텍스트를 1급 데이터로 취급합니다. 이 필드는 <code translate="no">text_match</code>, <code translate="no">phrase_match</code> 및 BM25를 지원합니다. 64KB 미만의 값은 인라인으로 저장되며, 그보다 큰 값은 Vortex 형식의 파티션 수준 LOB 파일로 이동하고, 해당 열에는 <code translate="no">(file_id, offset)</code> 참조만 저장됩니다. LOB 파일은 세그먼트 간에 공유되므로, 압축 시 텍스트를 다시 쓰지 않고 참조만 이동시킵니다. RAG의 경우, 이는 하나의 I/O로 동일한 저장소에서 벡터와 소스 텍스트를 모두 가져올 수 있음을 의미하며, 별도의 외부 BLOB 저장소를 운영할 필요가 없습니다.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS 인덱스 패스스루</h4><p>새로운 ` <code translate="no">FAISS</code> ` 인덱스 유형은 ` <code translate="no">faiss_index_name</code> ` 매개변수( <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> )를 통해 임의의 FAISS 인덱스 팩토리 문자열을 수용하며, 검색 매개변수가 함께 전달되므로 FAISS 레시피가 Milvus에서 직접 재현됩니다.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Vortex 및 Lance 형식 지원</h4><p>저장소 계층에 두 가지 오픈 컬럼형 형식이 추가되었습니다. 차세대 내부 형식인 Vortex(적응형 인코딩(사전, RLE, 비트 패킹, 부동 소수점 전용 압축), 제로 카피 압축 해제, 벡터와 스칼라 워크로드 혼합에 최적화됨)와, 오픈 생태계 간 교환을 위해 Parquet과 함께 지원되는 Lance입니다. Vortex는 기본 내부 형식으로 채택될 예정이며, 필터 푸시다운 및 로컬 변형도 로드맵에 포함되어 있습니다.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker 독립형 배포</h4><p>스트리밍 쓰기 경로의 핵심인 WAL인 Woodpecker는 이제 다른 노드에 내장되는 대신 독립적인 서비스로 배포될 수 있습니다. 다른 마이크로서비스와 마찬가지로 독립적인 확장성, 장애 격리 및 가시성을 제공합니다. 이는 대규모 클러스터와 쓰기 부하가 높은 워크로드에서 특히 중요합니다.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0 주요 기능 정리<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>아래 기능은 <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta에서</a> 도입되었으며 3.0.0에 포함됩니다. 자세한 내용은 베타 릴리스 노트를 참조하십시오.</p>
<ul>
<li><strong>외부 컬렉션</strong> — 레이크하우스 데이터(Parquet, Lance, Iceberg, Vortex)를 원위치에서 쿼리: 제로 카피, 읽기 전용, 증분 갱신을 통해 동기화됩니다.</li>
<li><strong>스냅샷</strong> — 세그먼트 참조를 통한 특정 시점의 읽기 전용 컬렉션 뷰로, 추가 저장 공간이 거의 필요하지 않습니다.</li>
<li><strong>스토리지 V3(Loon)</strong> — 오브젝트 스토리지에 기반한 매니페스트 방식의 컬럼형 스토리지; 스냅샷 및 외부 컬렉션의 기반이 됩니다.</li>
<li><strong>쿼리/검색 ORDER BY</strong> — 필드별 ASC/DESC를 지원하는 서버 측 다중 필드 정렬.</li>
<li><strong>쿼리 집계</strong> — 그룹화(group-by)를 지원하는 COUNT / SUM / AVG / MIN / MAX 연산으로, 서버 측에서 평가됩니다.</li>
<li><strong>EmbList + DiskANN</strong> — StructArray 임베딩 목록을 위한 디스크 기반 다중 벡터 인덱싱으로, Muvera 및 Lemur와 같은 가속 경로를 지원합니다.</li>
<li><strong>MinHash 함수(doc-in, doc-out)</strong> — 서버 측 MinHash 시그니처와 유사 중복 탐지를 위한 ' <code translate="no">MINHASH_LSH</code> ' 기능.</li>
<li><strong>Nullable 벡터</strong> — 6가지 벡터 유형 모두에서 NULL 지원; 검색 시 NULL 행은 건너뛰며, AddField가 벡터 필드로 확장됩니다.</li>
<li><strong>엔티티 TTL</strong> — TIMESTAMPTZ 필드에 의해 제어되는 행별 만료 기간.</li>
<li><strong>FileResource</strong> — 분석기, BM25 및 텍스트 매칭을 위한 클러스터 관리 사전, 동의어 목록 및 스톱워드 목록.</li>
<li><strong>강제 병합</strong> — 연산자에 의해 트리거되는 세그먼트 압축으로, 동기 또는 비동기 모드로 수행됩니다.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">호환성 및 동작 관련 참고 사항<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3(Loon)는 기본적으로 비활성화되어 있습니다.</strong> 스냅샷(Snapshot) 및 TEXT 필드와 같이 Storage V3에 의존하는 기능은 <code translate="no">common.storage.useLoonFFI</code> 를 통해 수동으로 활성화해야 합니다. Storage V3는 향후 릴리스에서 기본적으로 활성화될 예정입니다.</li>
<li><strong>2.6 → 3.0 간의 호환성 및 롤백은 보장됩니다</strong>. 즉, 3.0 배포 환경을 2.6으로 롤백할 수 있습니다. 그러나 직렬화된 데이터 형식을 변경하는 기능(예: Storage V3)을 활성화하거나 사용하면 더 이상 롤백이 불가능합니다.</li>
<li><strong>새로운 인덱스 버전은 현재 선택적 적용 방식입니다.</strong> 새로 도입된 인덱스 알고리즘은 적용되기 전에 대상 인덱스 버전을 수동으로 상향 조정해야 합니다(<code translate="no">dataCoord.targetVecIndexVersion</code> 를 10으로, <code translate="no">dataCoord.targetScalarIndexVersion</code> 를 4로). 향후 릴리스에서는 이러한 기능이 기본적으로 활성화될 예정입니다.</li>
<li><strong>GPU 이미지가 CUDA 12.9로 변경되었으며</strong>, 더 이상 Ubuntu 20.04와의 GPU 호환성을 유지하지 않습니다.</li>
</ul>
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
<p>Milvus 3.0-beta는 오픈 레이크 생태계와의 새로운 통합을 통해 Milvus 벡터 데이터베이스를 확장합니다. External Collection을 통해 Milvus는 제로 카피 방식으로 외부 레이크 테이블을 쿼리할 수 있으며, Spark는 Snapshot을 통해 Milvus 컬렉션을 직접 읽을 수 있습니다. 또한 이번 릴리스에서는 더욱 풍부한 검색 기능, 더 표현력이 풍부한 스키마, 더 심층적인 텍스트 검색 사용자 지정, 더 세밀한 데이터 및 모델 라이프사이클 제어, 그리고 더 많은 운영자 측 제어 기능을 제공합니다. Milvus 3.0은 Zilliz Lakebase의 핵심 커널로, 통합 서비스, 검색 및 배치 기능을 지원합니다.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">외부 컬렉션</h4><p>일반적인 AI 데이터 파이프라인에서 테라바이트 규모의 임베딩 및 메타데이터는 이미 Parquet, Lance 또는 Iceberg 테이블 형태로 오브젝트 스토리지에 저장되어 있습니다. 해당 데이터를 Milvus로 복사하면 스토리지 비용이 두 배로 증가하고, 지속적으로 동기화를 유지해야 하는 ETL 파이프라인이 추가되며, 데이터 거버넌스 권한이 고객 측에서 벗어나게 됩니다.</p>
<p>외부 컬렉션은 이러한 복사 과정을 제거합니다. Milvus 컬렉션은 파일이 이미 저장된 위치를 참조할 수 있으며, Milvus는 스키마, 인덱스 및 쿼리 실행만 관리합니다. 증분 갱신을 통해 컬렉션을 기본 파일에 맞춰 최신 상태로 유지합니다. 금융 및 의료 팀과 같이 데이터를 레이크 밖으로 반출할 수 없는 고객은 데이터가 저장된 위치에서 바로 벡터 검색을 실행할 수 있습니다. 또한 레이크에 상주하는 단일 데이터셋을 여러 Milvus 인스턴스에서 동시에 제공할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/create-an-external-collection.md">‘외부 컬렉션 생성</a>’을 참조하십시오.</p>
<h4 id="Snapshot" class="common-anchor-header">스냅샷</h4><p>서비스 제공과 일괄 검색은 종종 동일한 컬렉션을 동시에 필요로 합니다. A/B 모델 평가, 대규모 중복 제거, 백필 검증, 버전 롤백 등은 모두 쓰기 작업이 진행 중인 동안에도 컬렉션에 대한 안정적인 뷰를 필요로 합니다.</p>
<p>스냅샷은 데이터를 복사하는 대신 기존 세그먼트를 참조하여 컬렉션의 특정 시점, 읽기 전용 뷰를 생성하므로, 추가 저장 비용은 거의 제로에 가깝습니다. 라이브 컬렉션이 계속해서 쓰기 요청을 수락하는 동안, 배치 작업은 MVCC 방식의 격리 하에서 스냅샷을 읽을 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/snapshots.md">‘스냅샷’</a>, <a href="/docs/ko/manage-snapshots.md">‘스냅샷 관리</a>’ 및 <a href="/docs/ko/snapshot-use-cases.md">‘스냅샷 사용 사례’를</a> 참조하십시오.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">쿼리/검색 정렬</h4><p>이제 검색 및 쿼리에서 다중 필드 정렬을 지원하며, 정렬 처리는 Milvus 커널로 하향 처리되고 필드별로 ' <code translate="no">ASC</code> ' 및 ' <code translate="no">DESC</code> '을 설정할 수 있습니다. 이는 일반적인 운영상의 한계를 해소합니다. 즉, 가장 유사한 항목이 가장 저렴한 항목, 가장 최근의 항목 또는 가장 인기 있는 항목이 아닐 때, 거리 기준 Top-K만으로는 비즈니스 요구 사항을 충족하지 못하는 경우가 많았습니다.</p>
<p>이제 애플리케이션은 복합 순위를 산출하기 위해 결과를 과도하게 가져온 후 클라이언트 측에서 재정렬할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">‘스칼라 필드별 검색 결과 정렬’</a> 및 <a href="/docs/ko/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">‘쿼리 결과 정렬</a>’을 참조하십시오.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">쿼리 집계</h4><p>Milvus 컬렉션에서 테넌트 분포 통계, 필드 완성도 카운트 또는 버전 롤아웃 진행 상황을 생성하려면, 이전에는 일치하는 엔티티를 클라이언트로 다시 불러와 그곳에서 집계해야 했습니다. Milvus 3.0은 SQL 스타일의 스칼라 집계 기능을 커널로 통합했습니다. 쿼리 호출은 ` <code translate="no">group_by_fields</code> ` 및 ` <code translate="no">output_fields</code>` 형식의 집계 표현식을 지원하며, 여기에는 ` <code translate="no">count(*)</code>`, ` <code translate="no">count(&lt;field&gt;)</code>`, ` <code translate="no">sum(&lt;field&gt;)</code>`, ` <code translate="no">avg(&lt;field&gt;)</code>`, ` <code translate="no">min(&lt;field&gt;)</code>` 및 ` <code translate="no">max(&lt;field&gt;)</code>`이 포함됩니다. 집계는 필터링 후 서버 측에서 평가됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">‘쿼리 결과 집계</a>’를 참조하십시오.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null 벡터</h4><p>임베딩은 종종 비동기적으로 생성되므로, 엔티티가 해당 벡터보다 먼저 도착할 수 있습니다. 자막이 없는 동영상이나 이미지가 없는 제품과 같이, 다중 모달 데이터에도 자연스러운 공백이 존재합니다. 이전 버전에는 이에 대한 적절한 해결책이 없었습니다. 애플리케이션은 벡터가 준비될 때까지 쓰기를 지연시키거나 자리 표시자 벡터를 채워 넣는 방법밖에 없었는데, 두 가지 선택 모두 검색 품질에 악영향을 미쳤습니다.</p>
<p>Milvus 3.0은 6가지 벡터 유형 모두에서 벡터 필드에 대한 NULL을 지원합니다. 검색은 NULL 벡터를 자동으로 건너뛰며, 검색 품질에는 영향을 미치지 않고, NULL 벡터는 사실상 저장 공간을 차지하지 않습니다. 이 변경 사항에 따라 ‘ <code translate="no">AddField</code> ’도 벡터 필드로 확장됩니다. ` <code translate="no">nullable=True</code>`을 사용하면, 기존 컬렉션을 재구축하지 않고도 온라인으로 새로운 벡터 필드를 추가할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Nullable Fields</a>’를 참조하십시오.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">사용자 정의 사전 및 동의어 사전</h4><p>기본 제공 토큰화기는 항상 프로덕션 검색 품질 요구 사항을 충족하지는 않습니다. 중국어, 의학, 법학, 화학 등 특정 분야, 그리고 다국어 코퍼스는 사용자 정의 사전과 동의어 테이블을 통해 상당한 이점을 얻을 수 있습니다. 지금까지 이러한 리소스는 대부분 애플리케이션 측의 쿼리 재작성 형태로 구현되었습니다.</p>
<p>Milvus 3.0에는 사용자 정의 토큰화기 사전, 동의어 목록, 스톱워드 목록 및 복합어 분해 규칙을 등록하기 위한 FileResource 메커니즘이 추가되었습니다. 일단 등록된 리소스는 어떤 토큰화기나 필터에서든 참조할 수 있으며, BM25, 분석기, 텍스트 매치에 적용됩니다. 이제 사전과 동의어는 애플리케이션 코드 곳곳에 흩어져 있는 대신 버전 관리를 통해 중앙에서 일괄적으로 관리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/manage-file-resources.md">‘파일 리소스 관리</a>’를 참조하십시오.</p>
<h4 id="Entity-TTL" class="common-anchor-header">엔티티 TTL</h4><p>컬렉션 수준 및 파티션 수준의 TTL은 많은 수명 주기 및 규정 준수 시나리오에 비해 너무 거칠습니다. 동일한 컬렉션 내의 서로 다른 테넌트는 종종 서로 다른 보존 규칙을 가지며, 개별 엔티티는 컬렉션의 나머지 부분과 일치하지 않는 일정에 따라 만료되어야 할 수도 있습니다.</p>
<p>Milvus 3.0은 엔티티별 TTL을 지원합니다. 스키마에서 <code translate="no">TIMESTAMPTZ</code> 필드를 선언하고, 컬렉션 속성을 통해 이를 TTL 필드로 지정하면 Milvus가 만료된 엔티티를 자동으로 회수합니다. 이를 통해 애플리케이션 측에서 별도로 정리할 필요 없이 ‘잊혀질 권리’ 요청, 세션 데이터 만료, 제한된 대화 내역 등을 처리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">‘엔티티 수준 TTL 설정</a>’을 참조하십시오.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO(Doc-in, Doc-out)</h4><p>Milvus 2.6에서는 집합 기반 유사 중복 감지를 위한 <code translate="no">MINHASH_LSH</code> 인덱스가 추가되었지만, 애플리케이션은 여전히 Milvus에 데이터를 기록하기 전에 MinHash 서명을 계산해야 했습니다.</p>
<p>Milvus 3.0에서는 서버 측 MinHash 함수가 추가되었습니다. 스키마에서 <code translate="no">VARCHAR</code> 입력 필드와 <code translate="no">BINARY_VECTOR</code> 출력 필드를 선언하고, <code translate="no">FunctionType.MINHASH</code> 함수를 연결하면 Milvus가 삽입, 대량 삽입 및 검색 중에 서명을 계산합니다. <code translate="no">MINHASH_LSH</code> 와 함께 사용하면 Milvus 내에서 대규모 데이터셋에 대한 중복 제거 워크플로우, 지문 생성 및 표절 탐지를 지원합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하십시오.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>“하나의 엔티티 = 하나의 벡터”라는 가정은 더 이상 현대적인 검색 방식에 부합하지 않습니다. 긴 문서는 여러 청크로 분할되고, ColBERT와 같은 후기 상호작용 모델은 토큰당 하나의 벡터를 생성하며, 다중 모달 엔티티는 여러 뷰를 가질 수 있습니다.</p>
<p>EmbList는 엔티티당 가변 길이 벡터 목록을 저장하며, 디스크 상의 인덱스로는 <code translate="no">DISKANN</code> 를 사용합니다. 코퍼스가 메모리 한도를 초과할 경우, 디스크 경로를 통해 RAM 사용량을 효율적으로 관리할 수 있습니다. EmbList + <code translate="no">DISKANN</code> 는 이번 RC에서 소개되는 광범위한 StructList 계열의 첫 번째 변형입니다. StructList 필터링 및 Muvera/Lemur 다중 벡터 가속화를 포함한 나머지 패밀리 기능은 공식 3.0 릴리스에 포함될 예정입니다.</p>
<p>자세한 내용은 <a href="/docs/ko/search-with-embedding-lists.md">‘임베딩 리스트를 활용한 검색(Search with Embedding Lists</a>)’을 참조하십시오.</p>
<h4 id="Force-Merge" class="common-anchor-header">강제 병합</h4><p>프로덕션 워크로드는 시간이 지남에 따라 세그먼트 단편화가 누적되어 쿼리 지연 시간의 변동을 유발하고 스토리지 용량을 불필요하게 증가시킵니다.</p>
<p>Milvus 3.0에서는 동기 및 비동기 모드 모두에서 사용량이 적은 시간대에 세그먼트 압축을 명시적으로 트리거하는 기능이 추가되었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/force-merge.md">강제 병합 압축을</a> 참조하십시오.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0은 데이터와 메타데이터가 S3 호환 오브젝트 스토리지에 저장되는 매니페스트 기반의 컬럼형 스토리지 엔진인 Storage V3를 도입했습니다. 각 데이터셋 버전은 불변의 매니페스트 스냅샷으로 캡처되며, 이는 데이터셋을 구성하는 컬럼 그룹, 델타 로그 및 통계를 기록하는 Avro 인코딩 파일입니다.</p>
<p>매니페스트는 압축된 Avro 파일이며, 델타 로그는 데이터 파일을 다시 쓰지 않고 엔티티 수준의 삭제 내역을 기록합니다. 이를 통해 데이터셋이 커짐에 따라 메타데이터 오버헤드를 최소화할 수 있습니다. 또한 매니페스트는 메타데이터 추적을 쿼리 경로와 분리하므로, 컬렉션이 쿼리 성능 저하 없이 더 많은 세그먼트를 관리할 수 있습니다.</p>
<p>상태가 오브젝트 스토리지에 저장되므로 데이터셋은 자체 설명적입니다. 즉, 스토리지 경로에 액세스할 수 있는 모든 리더는 중앙 카탈로그 없이도 데이터셋을 발견하고 해석할 수 있습니다. 이 특성은 외부 컬렉션, 스냅샷 및 향후 레이크 통합의 기반이 됩니다.</p>
