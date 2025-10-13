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
    </button></h1><p>Milvus의 새로운 기능을 알아보세요! 이 페이지에는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항이 요약되어 있습니다. 이 섹션에서 v2.6.0 이후 출시된 각 버전에 대한 릴리스 노트를 확인할 수 있습니다. 이 페이지를 정기적으로 방문하여 업데이트에 대해 알아보는 것이 좋습니다.</p>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 10월 11일</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 버전</th><th style="text-align:left">Python SDK 버전</th><th style="text-align:left">Node.js SDK 버전</th><th style="text-align:left">Java SDK 버전</th><th style="text-align:left">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>다양하고 흥미로운 새 기능, 개선 사항 및 중요한 버그 수정이 포함된 Milvus 2.6.3의 출시를 발표하게 되어 기쁘게 생각합니다. 이 버전은 시스템 성능을 향상시키고 기능을 확장하며 주요 문제를 수정하여 모든 사용자에게 보다 안정적인 환경을 제공합니다. 이번 릴리스의 주요 기능은 다음과 같습니다:</p>
<h3 id="New-Features" class="common-anchor-header">새로운 기능<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>자동 ID가 활성화된 기본 키: 이제 <code translate="no">autoid</code> 이 활성화된 경우 사용자가 기본 키 필드를 작성할 수 있습니다.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>L0 세그먼트에 대한 수동 압축: L0 세그먼트 수동 압축에 대한 지원이 추가되었습니다.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>AutoID에서 클러스터 ID 인코딩: 이제 자동 생성된 ID에 클러스터 ID가 포함됩니다.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>gRPC 토큰화 지원: 쿼리 유연성 향상을 위한 gRPC 토큰화 기능 통합.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>우선순위 대기열을 구현하여 잔액 검사기를 개선하여 작업 분배를 개선했습니다.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>봉인된 세그먼트에 대한 BM25 통계를 미리 로드하고 직렬화를 최적화했습니다.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>이제 BM25 함수에 대한 입력으로 Null 가능 필드를 사용할 수 있습니다.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>우드페커에서 Azure Blob 저장소에 대한 지원이 추가되었습니다.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>우드펙커 세그먼트 압축 직후 작은 파일을 제거했습니다.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>쿼리 부스팅을 위한 무작위 점수 기능을 활성화했습니다.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>자동 색인에서 <code translate="no">int8</code> 벡터 유형에 대한 새로운 구성 옵션.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>하이브리드 검색 요청 정책을 제어하기 위한 매개변수 항목을 추가했습니다.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>함수 출력 필드 삽입 제어를 위한 지원이 추가되었습니다.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>이제 감쇠 함수가 더 나은 성능을 위해 구성 가능한 점수 병합을 지원합니다.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>문자열에서 이진 검색의 성능을 개선했습니다.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>쿼리에서 스파스 필터를 지원합니다. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>계층형 인덱스 기능 향상을 위한 다양한 업데이트.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>스칼라 및 벡터 검색을 위한 저장 공간 리소스 사용량 추적이 추가되었습니다.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>삭제/삽입/보존에 대한 저장소 사용량 추가<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li><code translate="no">flushall</code> 작업에 대한 세분화된 플러시 타겟을 활성화했습니다.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>데이터노드는 이제 더 나은 리소스 관리를 위해 비싱글톤 파일 시스템을 사용합니다.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>메타데이터에서 일괄 처리를 위한 구성 옵션이 추가되었습니다. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>이제 오류 메시지에 데이터베이스 이름이 포함되어 더 명확해졌습니다.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>더 나은 모듈화를 위해 추적 테스트를 <code translate="no">milvus-common</code> 리포지토리로 이동했습니다.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>더 나은 정리를 위해 C API 단위 테스트 파일을 <code translate="no">src</code> 디렉터리로 옮겼습니다.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>이제 <code translate="no">autoid</code> 이 활성화된 경우 Go SDK에서 사용자가 기본 키 데이터를 삽입할 수 있습니다.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>CVE-2020-25576 및 WS-2023-0223 취약점을 해결했습니다.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>스트리밍 노드에서 쿼터 센터의 메트릭에 논리적 리소스가 사용되는 문제가 수정되었습니다.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>대기 활성화 시 <code translate="no">activatefunc</code> 에서 <code translate="no">mixcoord</code> 을 설정.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>스토리지 V2 구성 요소의 중복 초기화를 제거했습니다. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>실행기 루프 종료로 인한 압축 작업 차단을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li><code translate="no">insert/deleterecord</code> 소멸자에서 로드된 리소스 사용량을 환불했습니다.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>리플리케이터를 중지할 수 없는 문제를 수정하고 리플리케이션 구성 유효성 검사기를 개선했습니다.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>mmap이 비활성화되면 <code translate="no">mmap_file_raii_</code> 을 <code translate="no">nullptr</code> 으로 설정합니다.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li><code translate="no">diskfilemanager</code> 에서 컨텍스트에서 파일 시스템을 사용하도록 했습니다.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>스토리지 V2에서 OSS 및 COS에 대한 강제 가상 호스트.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>호환성을 위해 <code translate="no">extrainfo</code> 이 <code translate="no">nil</code> 이 아닌 경우 <code translate="no">report_value</code> 기본값을 설정.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>루트코드에서 컬렉션을 삭제한 후 컬렉션 메트릭을 정리했습니다.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>중복 필드 <code translate="no">mmap.enable</code> 속성으로 인한 세그먼트 로딩 실패를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>동적 복제본에 대한 로드 구성 구문 분석 오류를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Go SDK에서 동적 열에 대한 행 대 열 입력을 처리했습니다.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 9월 19일</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 버전</th><th style="text-align:left">Python SDK 버전</th><th style="text-align:left">Node.js SDK 버전</th><th style="text-align:left">Java SDK 버전</th><th style="text-align:left">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.2의 출시를 발표하게 되어 기쁩니다! 이번 업데이트에는 강력한 새 기능, 대폭적인 성능 향상, 중요한 수정 사항이 포함되어 있어 시스템을 더욱 안정적이고 프로덕션에 바로 사용할 수 있습니다. 주요 기능으로는 업서트를 통한 부분 필드 업데이트, 동적 필드 필터링을 가속화하기 위한 JSON 파쇄, 더 빠른 좋아요 쿼리를 위한 NGram 인덱싱, 기존 컬렉션의 보다 유연한 스키마 진화 등이 있습니다. 커뮤니티 피드백을 바탕으로 구축된 이번 릴리스는 실제 배포를 위한 더욱 강력한 기반을 제공하며, 모든 사용자가 이러한 개선 사항을 활용할 수 있도록 업그레이드할 것을 권장합니다.</p>
<h3 id="Features" class="common-anchor-header">주요 기능<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>동적 필드 필터링을 가속화하기 위해 JSON 파쇄에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/json-shredding.md">JSON 파쇄를</a> 참조하세요.</li>
<li>유사 작업 가속화를 위해 NGRAM 인덱스에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/ngram.md">NGRAM을</a> 참조하세요.</li>
<li>업서트 API로 부분 필드 업데이트에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/upsert-entities.md">업서트 엔티티를</a> 참조하세요.</li>
<li>부스트 기능에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/boost-ranker.md">부스트 랭커를</a> 참고하세요.</li>
<li>JSON 필드 및 동적 필드별 그룹화 지원 추가<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>기존 컬렉션에서 동적 스키마 활성화 지원 추가<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>컬렉션을 해제하지 않고 인덱스를 삭제하는 기능 지원 추가<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] 로그 파일 크기를 압축된 크기로 변경<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>).</li>
<li>[StorageV2] 로드 정보에 자식 필드 추가<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] 시스템 그룹에 파티션 및 클러스터링 키 포함 지원 추가<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>압축 작업 시간 초과 제거<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Azure로 빌드 활성화<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] 로직 사용량 추정을 위해 그룹 정보 활용<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] 사용량 추정을 위해 그룹 분할 정보 활용<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] 저장된 컬럼 그룹으로 인한 압축 결과<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] 크기 기반 분할 정책에 대한 구성 추가<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] 스키마 기반 및 크기 기반 분할 정책에 대한 지원 추가<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>).</li>
<li>[StorageV2] 구성 가능한 분할 정책 추가<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] 더 많은 메트릭 및 구성 추가<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>세그먼트를 로드하기 전에 모든 인덱스가 준비될 때까지 기다리는 지원 추가<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>).</li>
<li>리스코어 노드에 대한 내부 코어 지연 메트릭 추가<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>).</li>
<li>KV 매개변수 인쇄 시 최적화된 액세스 로그 형식<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>덤프 스냅샷 배치 크기를 수정하는 구성 추가<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>).</li>
<li>압축 작업 정리 간격 단축<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>여러 필드를 지원하도록 병합 정렬 개선<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>계층형 인덱스에 대한 로드 리소스 추정 추가<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>중복 제거 사례에 대한 자동 인덱스 구성 추가<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>이름에 사용자 정의 문자를 허용하는 구성 추가(<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>스트리밍 서비스용 cchannel 지원 추가<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>동시 삭제를 방지하기 위한 뮤텍스 및 범위 검사 추가<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>무차별 대입과 인덱스 간에 존재하는 표현식의 동작을 정렬했습니다<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>).</li>
<li>삭제된 컬렉션으로 이름 변경 시 발생하는 오류 수정<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] 자식 필드 길이 확인<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] 기본적으로 Azure 켜기<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>풀링 데이터노드에서 L0 압축의 업로드 경로 수정<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>데이터베이스 암호화가 활성화된 경우 이름 변경이 허용되지 않음<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>dynamicfield.enable 속성 삭제를 허용하지 않음<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>).</li>
<li>사전 할당된 ID가 유효하지 않은 경우 작업을 실패로 표시<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>PK 비교 표현식에서 MVCC 검사 생략<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>통계에 대한 json_contains 버그 수정<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>).</li>
<li>쿼리 노드 및 스트리밍 노드에 대한 초기화 파일 시스템 검사 추가<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>).</li>
<li>세그먼트 가비지 수집 시 빈 압축 대상 수정<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>).</li>
<li>타임스탬프 인덱스 초기화 시 경합 조건 수정<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>).</li>
<li>패닉을 방지하기 위해 arraydata가 nil인지 확인<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>).</li>
<li>중첩된 객체에 대한 빌드 JSON 통계 버그 수정<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>).</li>
<li>여러 JSON 필드에 의한 mmap 재작성 방지<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>유효한 데이터 형식 통합<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>웹 UI에서 임베딩/랭크 재조정 공급자의 자격 증명 숨기기<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>풀링 데이터노드에서 통계 로그 경로 수정<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>IDF 오라클 경로 수정<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>복구 중인 v채널이 없는 경우 복구 스냅샷 체크포인트 사용<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>JSON 통계의 제한된 열 번호<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>로드 리소스 카운트 n-그램 인덱스<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>비어 있지 않은 검색 결과에서 메트릭 유형 추론<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>다중 세그먼트 쓰기가 하나의 세그먼트만 쓰도록 수정<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>범위를 벗어난 병합 정렬 수정<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>BM25 함수 실행 전 UTF-8 검사 추가<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>이전 세션이 존재할 경우 재시도<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>데이터노드 OOM을 방지하기 위해 Kafka 버퍼 크기 제한 추가<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>).</li>
<li>잠금 가드 범위 확장을 통한 패닉 수정<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>스키마 변경 시 증가하는 세그먼트가 플러시되지 않는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] IO 오류 처리<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>탄티비 인덱스 경로가 존재하지 않는 경우 패닉 방지<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 9월 3일</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 버전</th><th style="text-align:left">Python SDK 버전</th><th style="text-align:left">Node.js SDK 버전</th><th style="text-align:left">Java SDK 버전</th><th style="text-align:left">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.1의 출시를 발표하게 되어 기쁩니다! 이 버전은 이전 릴리스의 주요 아키텍처 개선 사항을 기반으로 제작 안정성, 성능 및 운영 견고성에 중점을 둔 중요한 개선 사항을 제공합니다. 이번 릴리스는 주요 커뮤니티 피드백을 반영하고 대규모 배포를 위한 시스템을 강화했습니다. 모든 사용자가 업그레이드하여 더욱 안정적이고 성능이 뛰어나며 신뢰할 수 있는 시스템의 혜택을 누리시기 바랍니다.</p>
<h3 id="Improvements" class="common-anchor-header">개선 사항<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>원격 저장소를 위한 POSIX 호환 파일 시스템 지원<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>모델 기반 재랭커 도입<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>기본 키 필드에 대한 비교 표현식의 성능 최적화<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>텍스트 일치 속도를 높이기 위해 게시 목록에서 직접 doc_id를 수집<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>).</li>
<li>여러 개의 != 조건을 하나의 NOT IN 절로 변환하여 쿼리 성능 최적화<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>세그먼트 로딩 중 캐싱 계층의 리소스 관리 개선<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>데이터 로드 중 중간 인덱스에 대한 메모리 추정 개선<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>중간 인덱스의 빌드 비율을 구성 가능하게 함<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>).</li>
<li>디스크 쓰기기에 구성 가능한 쓰기 속도 제한을 추가합니다<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>).</li>
<li>이제 Milvus 서비스를 다시 시작하지 않고도 SegCore 매개변수를 동적으로 업데이트할 수 있습니다<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>).</li>
<li>통합 gRPC 지연 시간 메트릭을 추가하여 통합 가시성 향상<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>).</li>
<li>디버깅을 간소화하기 위해 클라이언트 요청 타임스탬프를 gRPC 헤더에 포함<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>).</li>
<li>세그코어에 대한 추적 로그 수준 지원<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>가용성 향상을 위해 일관성 보장을 조정하는 구성 가능한 스위치 추가<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>).</li>
<li>etcd 연결 실패를 처리하기 위한 강력한 재감시 메커니즘 구현<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>).</li>
<li>내부 노드 상태 확인 로직 개선<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>컬렉션을 나열할 때 메타데이터 액세스 최적화<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Pulsar 클라이언트를 v0.15.1 공식 버전으로 업그레이드하고 더 많은 로깅 추가<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>aws-sdk를 1.9.234에서 1.11.352로 업그레이드<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>).</li>
<li>티커 구성 요소에 대한 동적 간격 업데이트 지원<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>비트 세트 연산을 위한 ARM SVE 명령어 세트의 자동 감지 기능 개선<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>텍스트 또는 구문 일치 실패 시 오류 메시지 개선<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>벡터 차원 불일치에 대한 오류 메시지 개선<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>객체 저장소를 사용할 수 없을 때 추가 시간 초과에 대한 오류 보고를 개선합니다<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>).</li>
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
<li>Parquet 파일 임포트 중 잠재적인 메모리 부족(OOM) 문제 수정<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>대기 노드의 임대가 만료된 경우 복구할 수 없는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>).</li>
<li>압축 재시도 상태를 올바르게 처리합니다<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>).</li>
<li>인덱스 로딩을 방해할 수 있는 연속 읽기 요청과 인덱스 로딩 사이의 잠재적인 교착 상태 수정<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>).</li>
<li>동시성이 높은 시나리오에서 데이터 삭제가 실패할 수 있는 버그를 수정합니다<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>).</li>
<li>텍스트 및 JSON 인덱스 로드 시 잠재적인 경쟁 조건 수정<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>).</li>
<li>쿼리코드 재시작 후 발생할 수 있는 노드 상태 불일치 문제 수정<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>).</li>
<li>재시작 후 "더티" 쿼리 노드가 제대로 정리되도록 합니다<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>).</li>
<li>페이로드가 비어 있지 않은 요청에 대해 재시도 상태가 올바르게 처리되지 않던 문제 수정<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>).</li>
<li>벌크 라이터 v2가 올바른 버킷 이름을 사용하지 않는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>).</li>
<li>RESTful get_configs 엔드포인트에서 민감한 항목을 숨겨 보안을 강화<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>).</li>
<li>시간 초과 재시도 중 딱따구리에 대한 오브젝트 업로드가 무효화되도록 보장<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>).</li>
<li>Parquet 파일에서 배열 필드의 null 요소를 가져오는 것을 허용하지 않음<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>).</li>
<li>컬렉션 별칭을 생성한 후 프록시 캐시가 무효화되지 않는 버그 수정<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>).</li>
<li>스트리밍 노드에 대한 내부 서비스 검색 메커니즘 개선<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>).</li>
<li>리소스 그룹 로직이 스트리밍 노드를 올바르게 필터링하도록 수정<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>).</li>
<li>다중 데이터베이스 환경에서 이름 충돌을 방지하기 위해 메트릭에 databaseName 레이블을 추가합니다<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>).</li>
<li>내부 작업 상태 처리의 논리 오류 수정<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>잠재적인 패닉을 방지하기 위해 내부 메트릭의 초기화 타이밍을 최적화<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>).</li>
<li>내부 HTTP 서버에서 드물게 발생할 수 있는 잠재적 충돌 수정<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 8월 6일</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 버전</th><th style="text-align:left">Python SDK 버전</th><th style="text-align:left">Node.js SDK 버전</th><th style="text-align:left">Java SDK 버전</th><th style="text-align:left">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0이 공식 출시되었습니다! <a href="#v260-rc1">2.6.0-rc1에서</a> 구축된 아키텍처 기반을 기반으로 하는 이 프로덕션 준비 버전은 수많은 안정성 및 성능 문제를 해결하는 동시에 스토리지 포맷 V2, 고급 JSON 처리, 향상된 검색 기능 등 강력한 새 기능을 도입했습니다. RC 단계에서 커뮤니티 피드백을 바탕으로 광범위한 버그 수정과 최적화가 이루어진 Milvus 2.6.0은 이제 바로 사용하실 수 있습니다.</p>
<div class="alert warning">
<p>아키텍처 변경으로 인해 2.6.0 이전 버전에서 직접 업그레이드는 지원되지 않습니다. <a href="/docs/ko/upgrade_milvus_cluster-operator.md">업그레이드 가이드를</a> 참조하세요.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">2.6.0의 새로운 기능(RC 이후)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">최적화된 스토리지 형식 v2</h4><p>혼합 스칼라 및 벡터 데이터 저장, 특히 비정형 데이터의 포인트 조회 문제를 해결하기 위해 Milvus 2.6에서는 저장 형식 V2를 도입했습니다. 이 새로운 적응형 컬럼형 저장 포맷은 "좁은 컬럼 병합 + 넓은 컬럼 독립" 레이아웃 전략을 채택하여 벡터 데이터베이스에서 포인트 조회와 소량 검색을 처리할 때 발생하는 성능 병목 현상을 근본적으로 해결합니다.</p>
<p>이제 새로운 포맷은 I/O 증폭 없이 효율적인 랜덤 액세스를 지원하며 이전에 채택된 바닐라 Parquet 포맷에 비해 최대 100배의 성능 향상을 달성하여 분석 처리와 정밀한 벡터 검색을 모두 필요로 하는 AI 워크로드에 이상적입니다. 또한 일반적인 워크로드의 경우 파일 수를 최대 98%까지 줄일 수 있습니다. 주요 압축을 위한 메모리 소비는 300%까지 줄어들고, 읽기 작업은 최대 80%, 쓰기 작업은 600% 이상 최적화됩니다.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON 플랫 인덱스(베타)</h4><p>Milvus 2.6은 매우 동적인 JSON 스키마를 처리하기 위해 JSON 플랫 인덱스를 도입했습니다. 특정 경로와 예상 유형을 미리 선언해야 하는 JSON 경로 인덱스와 달리, JSON 플랫 인덱스는 주어진 경로 아래 중첩된 모든 구조를 자동으로 찾아서 색인합니다. JSON 필드를 색인할 때, 전체 하위 트리를 재귀적으로 평탄화하여 깊이나 유형에 관계없이 발생하는 모든 경로-값 쌍에 대해 반전된 색인 항목을 생성합니다. 이러한 자동 평탄화 기능은 새로운 필드가 경고 없이 나타나는 진화하는 스키마에 이상적인 JSON 플랫 인덱스를 만들어 줍니다. 예를 들어, '메타데이터' 필드를 색인하는 경우, 시스템은 새로운 색인 구성 없이도 들어오는 데이터에 나타나는 'metadata.version2.features.experimental'과 같은 새로운 중첩 필드를 자동으로 처리합니다.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">핵심 2.6.0 기능 리콜<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>2.6.0-RC에 도입된 아키텍처 변경 사항 및 기능에 대한 자세한 내용은 <a href="#v260-rc1">2.6.0-rc1 릴리즈 노트를</a> 참조하세요.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">아키텍처 간소화</h4><ul>
<li>스트리밍 노드(GA) - 중앙 집중식 WAL 관리</li>
<li>우드페커가 포함된 네이티브 WAL - Kafka/Pulsar 종속성 제거</li>
<li>통합 코디네이터(MixCoord); 병합된 IndexNode와 DataNode - 구성 요소 복잡성 감소</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">검색 및 분석</h4><ul>
<li>높은 리콜률을 갖춘 RaBitQ 1비트 양자화</li>
<li>구문 매칭</li>
<li>중복 제거를 위한 MinHash LSH</li>
<li>시간 인식 랭킹 기능</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">개발자 경험</h4><ul>
<li>"데이터 인, 데이터 아웃" 워크플로우를 위한 임베딩 기능</li>
<li>온라인 스키마 진화</li>
<li>INT8 벡터 지원</li>
<li>글로벌 언어 지원을 위한 향상된 토큰화 도구</li>
<li>지연 로딩을 지원하는 캐시 레이어 - 메모리보다 큰 데이터 세트 처리</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>출시일: 2025년 6월 18일</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus 버전</th><th style="text-align:center">Python SDK 버전</th><th style="text-align:center">Node.js SDK 버전</th><th style="text-align:center">Java SDK 버전</th><th style="text-align:center">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1은 배포 복잡성을 줄여 운영 효율성, 리소스 활용도, 총 소유 비용을 개선하도록 설계된 단순화된 클라우드 네이티브 아키텍처를 도입합니다. 이번 릴리스에는 성능, 검색, 개발에 중점을 둔 새로운 기능이 추가되었습니다. 주요 기능으로는 성능 향상을 위한 고정밀 1비트 양자화(RaBitQ) 및 동적 캐시 계층, MinHash를 통한 거의 중복 없는 탐지 및 고급 검색을 위한 정밀한 구문 매칭, 개발자의 경험을 향상시키는 온라인 스키마 수정을 통한 자동 임베딩 기능 등이 있습니다.</p>
<div class="alert note">
<p>이 버전은 Milvus 2.6.0의 사전 릴리스 버전입니다. 최신 기능을 사용해 보려면 이 버전을 새로 배포하여 설치하세요. Milvus v2.5.x 이하에서 2.6.0-rc1로 업그레이드하는 것은 지원되지 않습니다.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">아키텍처 변경 사항<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>2.6부터 Milvus는 성능, 확장성 및 사용 편의성을 개선하기 위한 중요한 아키텍처 변경 사항을 도입했습니다. 자세한 내용은 <a href="/docs/ko/architecture_overview.md">Milvus 아키텍처 개요를</a> 참조하세요.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">스트리밍 노드(GA)</h4><p>이전 버전에서는 스트리밍 데이터가 프록시에 의해 WAL에 쓰여지고 쿼리노드와 데이터노드에 의해 읽혀졌습니다. 이 아키텍처는 쓰기 측에서 합의를 달성하기 어려웠고 읽기 측에서 복잡한 로직이 필요했습니다. 또한 쿼리 위임자가 쿼리 노드에 위치하여 확장성을 저해했습니다. Milvus 2.5.0에서는 2.6.0 버전에서 GA가 되는 스트리밍 노드가 도입되었습니다. 이 구성 요소는 이제 모든 샤드 수준의 WAL 읽기/쓰기 작업을 담당하며 쿼리 위임자 역할도 수행하여 앞서 언급한 문제를 해결하고 새로운 최적화를 가능하게 합니다.</p>
<p><strong>중요 업그레이드 공지</strong>: 스트리밍 노드는 아키텍처가 크게 변경되었으므로 이전 버전에서 Milvus 2.6.0-rc1로 직접 업그레이드하는 것은 지원되지 않습니다.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">딱따구리 네이티브 WAL</h4><p>Milvus는 이전에 WAL을 위해 Kafka 또는 Pulsar와 같은 외부 시스템에 의존했습니다. 이러한 시스템은 기능적으로는 훌륭했지만, 특히 중소규모 배포의 경우 상당한 운영 복잡성과 리소스 오버헤드를 추가했습니다. Milvus 2.6에서는 이러한 시스템이 특수 목적의 클라우드 네이티브 WAL 시스템인 Woodpecker로 대체됩니다. 우드페커는 오브젝트 스토리지용으로 설계되어 로컬 및 오브젝트 스토리지 기반 제로 디스크 모드를 모두 지원하며, 운영을 간소화하는 동시에 성능과 확장성을 개선합니다.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">데이터노드와 인덱스노드 병합</h4><p>Milvus 2.6에서는 압축, 대량 가져오기, 통계 수집, 인덱스 구축과 같은 작업이 이제 통합된 스케줄러로 관리됩니다. 이전에 데이터 노드에서 처리하던 데이터 지속성 기능이 스트리밍 노드로 옮겨졌습니다. 배포와 유지 관리를 간소화하기 위해 IndexNode와 DataNode가 단일 DataNode 구성 요소로 병합되었습니다. 이제 이 통합 노드가 이러한 모든 중요한 작업을 실행하여 운영 복잡성을 줄이고 리소스 활용을 최적화합니다.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">코디네이터를 MixCoord로 병합</h4><p>별도의 RootCoord, QueryCoord, DataCoord 모듈을 사용한 이전 설계에서는 모듈 간 통신에 복잡성이 발생했습니다. 시스템 설계를 단순화하기 위해 이러한 구성 요소는 MixCoord라는 단일 통합 코디네이터로 병합되었습니다. 이러한 통합은 네트워크 기반 통신을 내부 함수 호출로 대체하여 분산 프로그래밍의 복잡성을 줄여 시스템 운영의 효율성을 높이고 개발 및 유지보수를 간소화합니다.</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1비트 양자화</h4><p>대규모 데이터 세트를 처리하기 위해 1비트 양자화는 리소스 활용률과 검색 성능을 향상시키는 데 효과적인 기술입니다. 하지만 기존 방식은 회상률에 부정적인 영향을 미칠 수 있습니다. Milvus 2.6에서는 원 연구 저자와의 협력을 통해 1비트 압축의 리소스 및 성능 이점을 제공하면서 높은 검색 정확도를 유지하는 1비트 양자화 솔루션인 RaBitQ를 도입했습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/ivf-rabitq.md">IVF_RABITQ를</a> 참조하세요.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON 기능 향상</h4><p>Milvus 2.6은 다음과 같은 개선 사항으로 JSON 데이터 유형에 대한 지원을 강화했습니다:</p>
<ul>
<li><strong>성능</strong>: 이제 JSON 경로 인덱싱이 공식적으로 지원되어 JSON 객체 내의 특정 경로(예: <code translate="no">meta.user.location</code>)에 반전된 인덱스를 생성할 수 있습니다. 이렇게 하면 전체 개체 스캔을 피하고 복잡한 필터를 사용한 쿼리의 지연 시간을 개선할 수 있습니다.</li>
<li><strong>기능</strong>: 이번 릴리즈에서는 보다 복잡한 필터링 로직을 지원하기 위해 <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, <code translate="no">CAST</code> 함수에 대한 지원이 추가되었습니다. 앞으로도 JSON 지원에 대한 작업은 계속될 것입니다. 곧 출시될 공식 릴리즈에서는 고도로 중첩된 JSON 데이터의 성능을 획기적으로 개선하도록 설계된 JSON <strong>파쇄</strong> 및 <strong>JSON FLAT 인덱스와</strong> 같은 더욱 강력한 기능을 미리 선보이게 되어 기대가 큽니다.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">분석기/토큰라이저 기능 향상</h4><p>이번 릴리즈에서는 분석기와 토큰화 도구에 대한 몇 가지 업데이트를 통해 텍스트 처리 기능이 크게 향상되었습니다:</p>
<ul>
<li>새로운 분석기 <a href="/docs/ko/analyzer-overview.md#Example-use">실행</a> 구문을 사용해 토큰화기 구성을 검증할 수 있습니다.</li>
<li>일본어와 한국어 등 아시아 언어에 대한 지원이 향상되도록 <a href="/docs/ko/lindera-tokenizer.md">Lindera 토큰화기가</a> 통합되었습니다.</li>
<li>이제 행 수준 토큰화기 선택이 지원되며, 다국어 시나리오를 위한 대체품으로 범용 <a href="/docs/ko/icu-tokenizer.md">ICU 토큰화기를</a> 사용할 수 있습니다.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">임베딩 함수를 사용한 데이터 인, 데이터 아웃</h4><p>Milvus 2.6에는 타사 임베딩 모델(예: OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face)과 직접 통합하여 AI 애플리케이션 개발을 간소화하는 '데이터 인, 데이터 아웃' 기능이 도입되었습니다. 이제 사용자는 원시 텍스트 데이터를 사용하여 삽입 및 쿼리할 수 있으며, Milvus는 지정된 모델 서비스를 자동으로 호출하여 텍스트를 실시간으로 벡터로 변환합니다. 따라서 별도의 벡터 변환 파이프라인이 필요하지 않습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/embedding-function-overview.md">임베딩 기능 개요를</a> 참조하세요.</p>
<h4 id="Phrase-Match" class="common-anchor-header">구문 검색</h4><p>구문 일치는 쿼리의 정확한 단어 순서가 문서 내에서 올바른 순서로 연속적으로 나타날 때만 결과를 반환하는 텍스트 검색 기능입니다.</p>
<p><strong>주요 특징</strong></p>
<ul>
<li>순서에 민감합니다: 단어가 쿼리와 동일한 순서로 나타나야 합니다.</li>
<li>연속 일치: 슬로프 값을 사용하지 않는 한 단어가 서로 바로 옆에 나타나야 합니다.</li>
<li>슬로프(선택 사항): 조정 가능한 매개변수로, 적은 수의 중간 단어를 허용하여 퍼지 구문 일치를 가능하게 합니다.</li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/phrase-match.md">구문 일치를</a> 참조하세요.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH 인덱스(베타)</h4><p>모델 훈련에서 데이터 중복 제거의 필요성을 해결하기 위해 Milvus 2.6에서는 MINHASH_LSH 인덱스에 대한 지원이 추가되었습니다. 이 기능은 중복에 가까운 문서를 식별하기 위해 문서 간의 Jaccard 유사성을 추정하는 계산 효율적이고 확장 가능한 방법을 제공합니다. 사용자는 전처리 과정에서 텍스트 문서에 대한 MinHash 서명을 생성하고 Milvus의 MINHASH_LSH 인덱스를 사용하여 대규모 데이터 세트에서 유사한 콘텐츠를 효율적으로 찾아 데이터 정리 및 모델 품질을 개선할 수 있습니다.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">시간 인식 감쇠 함수</h4><p>Milvus 2.6은 시간이 지남에 따라 정보 값이 변하는 시나리오를 해결하기 위해 시간 인식 감쇠 함수를 도입했습니다. 결과 순위 재조정 중에 사용자는 타임스탬프 필드를 기반으로 지수, 가우스 또는 선형 감쇠 함수를 적용하여 문서의 관련성 점수를 조정할 수 있습니다. 이렇게 하면 뉴스 피드, 이커머스, AI 에이전트의 메모리와 같은 애플리케이션에서 중요한 최신 콘텐츠에 우선순위를 부여할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/decay-ranker-overview.md">감쇠 랭커 개요를</a> 참조하세요.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">온라인 스키마 진화를 위한 필드 추가</h4><p>스키마 유연성을 높이기 위해 Milvus 2.6은 이제 온라인에서 기존 컬렉션의 스키마에 새로운 스칼라 필드를 추가할 수 있도록 지원합니다. 이렇게 하면 애플리케이션 요구 사항이 변경될 때 새 컬렉션을 생성하고 중단 없는 데이터 마이그레이션을 수행할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/add-fields-to-an-existing-collection.md">기존 컬렉션에 필드 추가를</a> 참조하세요.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 벡터 지원</h4><p>8비트 정수 임베딩을 생성하는 양자화된 모델의 사용이 증가함에 따라 Milvus 2.6에서는 INT8 벡터에 대한 기본 데이터 유형 지원이 추가되었습니다. 이를 통해 사용자는 양자화 해제 없이 이러한 벡터를 직접 수집할 수 있어 계산, 네트워크 대역폭, 스토리지 비용을 절감할 수 있습니다. 이 기능은 처음에 HNSW 계열 인덱스에 대해 지원됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/dense-vector.md">고밀도 벡터를</a> 참조하세요.</p>
