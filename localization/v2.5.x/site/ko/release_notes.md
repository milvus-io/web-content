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
    </button></h1><p>Milvus의 새로운 기능을 알아보세요! 이 페이지에는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항이 요약되어 있습니다. 이 섹션에서 v2.5.0 이후 출시된 각 버전에 대한 릴리스 노트를 확인할 수 있습니다. 이 페이지를 정기적으로 방문하여 업데이트에 대해 알아보는 것이 좋습니다.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Milvus 2.5.11의 출시를 발표하게 되어 기쁩니다! 이번 버전에는 다중 분석기 기능과 확장된 토큰화 도구 지원(Jieba, Lindera, ICU, 언어 식별자)과 같은 강력한 새 기능이 도입되었습니다. 또한 동적 세그먼트 로딩 스레드 풀 업데이트와 빈로그 가져오기 중 최적화된 삭제 필터링 등 몇 가지 개선 사항도 있었습니다. 주요 버그 수정은 잠재적인 세그먼트 드롭 문제, BM25 검색 실패, JSON 통계 필터링 오류를 해결합니다.</p>
<p>2.5.11로 업그레이드하여 이러한 개선 사항과 수정 사항을 활용하시기 바랍니다!</p>
<h3 id="Features" class="common-anchor-header">주요 기능</h3><ul>
<li>다국어 지원을 위해 여러 분석기(토큰화기)를 구성하고 입력 데이터의 지시에 따라 적절한 분석기를 선택할 수 있는 기능이 추가되었습니다<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>BM25 분석기 기능 개선<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>토큰화 결과를 분석하는 데 도움이 되는 드라이런용 <code translate="no">run_analyzer</code> API를 도입했습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md">분석기 개요를</a> 참조하세요.</li>
<li>토큰화 도구<ul>
<li>Jieba 토큰화 매개변수 사용자 지정에 대한 지원이 추가되었습니다.</li>
<li>린데라 토큰화 도구에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/lindera-tokenizer.md">린데라를</a> 참조하세요.</li>
<li>ICU 토큰화기에 대한 지원이 추가되었습니다. 자세한 내용은 <a href="/docs/ko/icu-tokenizer.md">ICU를</a> 참조하세요.</li>
<li>언어 감지를 위한 언어 식별자 토큰라이저를 추가했습니다.</li>
</ul></li>
<li>필터<ul>
<li>기본 제공 중지 단어 필터의 지원 언어가 확장되었습니다. 자세한 내용은 <a href="/docs/ko/stop-filter.md">중지를</a> 참조하세요.</li>
<li>문장 부호를 제거하는 <code translate="no">remove_punct</code> 필터를 추가했습니다. 자세한 내용은 <a href="/docs/ko/removepunct-filter.md">구두점 제거하기를</a> 참조하세요.</li>
<li>패턴 기반 텍스트 필터링을 위한 <code translate="no">regex</code> 필터를 추가했습니다. 자세한 내용은 <a href="/docs/ko/regex-filter.md">정규식을</a> 참조하세요.</li>
</ul></li>
</ul></li>
<li>배열 필드의 최대 용량 수정을 위한 지원이 추가되었습니다<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>JSON 경로 인덱스에서 이진 범위 표현식에 대한 지원이 추가되었습니다<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>JSON 통계에서 접미사 및 접미사 일치 유형에 대한 지원이 추가되었습니다<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>세그먼트 로딩 스레드 풀의 크기를 동적으로 업데이트할 수 있게 되었습니다<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>빈로그 가져오기 중 삭제 필터링이 가속화되었습니다<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>표현식 필터 비율에 대한 모니터링 매개변수 추가<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>인덱스를 최신 버전으로 강제로 재구축하는 구성 옵션이 추가되었습니다<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>목록 정책에 대한 오류 로그 메시지를 개선했습니다<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>gRPC 메타데이터 헤더의 하이픈 처리를 조정했습니다<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>)를 해결하기 위해 Go 버전을 1.24.1로 업그레이드했습니다.</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>파티션을 삭제할 때 세그먼트가 제대로 삭제되지 않을 수 있는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>스키마의 필드 목록 대신 함수 실행기의 입력 필드 목록을 사용하도록 대량 삽입을 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li><code translate="no">avgdl</code> (평균 문서 길이)가 NaN일 때 발생하는 BM25 검색 실패를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>쿼리 노드 메트릭의 부정확한 레이블을 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>데이터에 빈 맵이 포함된 경우 JSON 통계 인덱스 생성이 실패할 수 있는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>수정 타임스탬프를 올바르게 저장하도록 <code translate="no">AlterCollection</code> API를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li><code translate="no">ConjunctExpr</code> 에서 JSON 통계의 간헐적인 필터링 오류를 수정하고 작업 슬롯 계산 로직을 개선하여 JSON 통계 작성 속도를 높였습니다<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>BM25 통계 계산에서 IDF 오라클 누수를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>샤드 번호 유효성 검사 중에 미리 생성된 토픽이 먼저 확인되도록 했습니다<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>단위 테스트에서 발생하는 잘못된 교착 상태 보고를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 4월 21일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10은 향상된 검색 및 로드 성능, 향상된 메트릭 보고 기능, 가속화된 메트릭 계산을 위한 확장된 SVE 지원을 제공합니다. 이 릴리스에는 안정성과 정확성을 높이는 여러 버그 수정도 포함되어 있습니다. 업그레이드하거나 사용해 보시기 바랍니다. 여러분의 피드백은 Milvus를 더욱 개선하는 데 큰 도움이 됩니다!</p>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>존재하지 않는 인덱스에 대한 보고 인덱스 메트릭 무시<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>반전된 인덱스가 존재할 때에도 좋아요에 스캔 모드 사용<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>LIKE 식의 성능 최적화<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>로드 성능 향상을 위한 인덱스 형식 최적화<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: 기본 타임아웃을 구성할 수 있게 함<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>).</li>
<li>FP16 / NY 함수에서 L2 메트릭 계산을 위한 SVE 지원 활성화<a href="https://github.com/zilliztech/knowhere/pull/1134">(#1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>문자열 필터에서 JSON 인덱스가 작동하지 않는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>사전 검사에서 벡터가 아닌 필드에 대한 차원 검사 건너뛰기<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>컬렉션 변경이 이제 스키마를 올바르게 업데이트합니다<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>).</li>
<li>macOS 빌드 수정을 위한 knowhere 버전 업데이트<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>세그먼트 인덱스 초기화가 완료되기 전에 인덱스를 나열할 때 패닉 방지<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>).</li>
<li>로그 레벨을 변경하여 성능 회귀 문제 해결<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>워커 클라이언트를 제거하기 전에 클라이언트 닫기<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 4월 11일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>JSON 주요 통계에 대한 향상된 성능, 향상된 인덱싱 기능, 안정성과 데이터 처리를 강화하는 몇 가지 중요한 버그 수정을 제공하는 Milvus 2.5.9를 발표하게 되어 기쁘게 생각합니다. 이 버전을 업그레이드하거나 사용해 보시기를 권장하며, 언제나 그렇듯이 Milvus를 계속 개선해 나가는 과정에서 여러분의 피드백을 보내주시면 대단히 감사하겠습니다.</p>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>가중 재순위에 대한 점수 정규화 건너뛰기 지원<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>문서를 일괄 추가하여 JSON 키 통계 구축의 성능 개선<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li><code translate="no">int8</code>/<code translate="no">int16</code> 요소 유형에 대한 배열 인덱스 생성 시 <code translate="no">int32</code> 사용<a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>무차별 대입 검색 결과를 <code translate="no">exists</code> 표현식에 대한 JSON 인덱스 동작과 정렬<a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>클라이언트가 traceID를 전송한 경우 traceID가 혼동되는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>).</li>
<li><code translate="no">noexcept</code> 의 잘못된 사용으로 인해 잠재적인 충돌이 발생하여 IO 실패로 이어질 수 있는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>).</li>
<li>잔액 일시 정지 후 트리거되는 무한 일반 잔액 루프를 해결했습니다<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>).</li>
<li>컬렉션 표시가 이제 사용자 지정 권한 그룹에 부여된 개체를 지원합니다<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>).</li>
<li>리플리케이트 채널 위치 검색 실패를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>).</li>
<li>RESTful 시간 초과로 인한 잠재적인 스레드 누수 수정<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>일괄 건너뛰기 모드에 대한 명확한 비트맵 추가<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>).</li>
<li>로컬 모드 원격 저장소에서 인덱스 유형 제거가 실패하는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>).</li>
<li>배열 <code translate="no">isNull</code> 연산자에 <code translate="no">element_type</code> 사용<a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>정확한 보고를 위해 메트릭 재설정 제거<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li><code translate="no">null</code> 표현식으로 <code translate="no">null</code> 데이터를 필터링할 수 없는 버그 수정<a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>봉인 정책의 시작 위치가 없는 성장하는 세그먼트 무시<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>재시도 중 원본 검색/쿼리 요청 업데이트 방지<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li><code translate="no">LoadArrowReaderFromRemote</code> 이 예외 경로에서 실행되는 경우 세그먼트 오류 수정<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>수동 잔액 및 잔액 확인 문제 해결<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>지연된 <code translate="no">DescribeCollection</code> 을 사용하는 JSON 통계에 대해 유효성 검사된 스키마가 <code translate="no">nil</code> 가 아님<a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>).</li>
<li>두 열을 비교할 때 커서 이동 버그 수정<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>성장하는 mmap이 열려 있는 상태에서 <code translate="no">null</code> 및 null이 아닌 배열을 모두 삽입할 때 발생하는 충돌을 해결했습니다<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>).</li>
<li>arm64 컴파일 문제 수정<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>인덱스 증가로 인한 삽입/로드 작업 차단을 방지하기 위해 바이패스 스레드 풀 모드 추가<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>).</li>
<li>JSON 형식 오류 수정<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li><code translate="no">http.enablepprof</code> 이 거짓일 때 WebUI에서 404 오류 수정<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>).</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 4월 1일</p>
<table>
<thead>
<tr><th>밀버스 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>JSON 표현식, UTF-8 유효성 검사, 메모리 사용량, 밸런싱 로직이 개선된 Milvus 2.5.8을 출시하게 되어 기쁘게 생각합니다. 이 버전에는 동시성 및 데이터 처리를 개선하기 위한 여러 가지 중요한 버그 수정 사항도 포함되어 있습니다. 업그레이드하거나 사용해 보시기 바라며, 언제나 그렇듯이 여러분의 피드백은 Milvus를 지속적으로 개선하는 데 큰 도움이 됩니다!</p>
<h3 id="Features" class="common-anchor-header">특징</h3><ul>
<li>JSON <code translate="no">null</code>/<code translate="no">exists</code> 표현식 지원<a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>대량 삽입에서 Parquet 구조의 스파스 벡터 구문 분석 지원<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>가장 큰 행 수부터 컬렉션 밸런스 조정<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>가져오기 중 UTF-8 문자열 유효성 검사 지원<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>모든 VARCHAR 필드에 UTF-8 유효성 검사 추가<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>하이브리드 검색에서 PK만 출력 필드로 요청하는 경우 재질의 방지<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>메모리 사용량 최적화를 위해 배열 보기 개선<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>자동 밸런싱을 위한 트리거 간격 구성 추가<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>여러 OR 표현식을 IN 표현식으로 변환<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>세부적인 수동 압축 기준 지원<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>감사 로깅을 위한 원시 토큰 유지<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>DataCoord 메타 뮤텍스 사용 최적화<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li><code translate="no">MsgDispatcher</code> 에 일괄 구독 도입<a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>널링 가능한 입력 및 증가하는 mmap 데이터 유형과 관련된 크래시 수정<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>중복된 빈로그 ID<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)로 인한 삭제 작업의 잠재적 데이터 손실 수정</li>
<li>컬렉션 생성 중 삽입 시 잠재적인 패닉을 방지하기 위해 <code translate="no">GetSegmentsIndexStates</code> 에 대한 필드 인덱스 잠금 추가<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>).</li>
<li>Rocksmq 소비자 등록의 동시성 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>).</li>
<li>세그먼트 로딩을 위해 모든 하위 델타 로그 검색<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li><code translate="no">iterative_filter</code> 을 지정할 때 JSON 인덱스 사용으로 인한 잘못된 결과 수정<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>).</li>
<li><code translate="no">exists</code> 작업에 대해 더 높은 우선 순위 보장<a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>축소 중 <code translate="no">WithGroupSize</code> 수정<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>세그먼트 크기가 커짐에 따라 비례적으로 슬롯 수 증가<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>큐에 대기하기 전에 작업 큐 시간 설정<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>데이터 노드의 채널 불균형 수정<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>작업 슬롯에 대한 올바른 기본 구성 설정<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: 행 기반 삽입을 위해 FieldSchema에 따라 null 가능 플래그 설정<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 3월 21일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>새로 도입된 JSON 경로 인덱스 기능이 특징인 Milvus 2.5.7의 출시를 발표하게 되어 기쁘게 생각합니다. 이 기능을 사용하면 동적 또는 JSON 열에 역 인덱스를 구축하여 쿼리 성능을 크게 향상시킬 수 있습니다. 이 새로운 기능과 함께 안정성 향상, 보다 정교한 오류 처리, 사용성 개선을 위해 수많은 개선 사항과 버그 수정이 이루어졌습니다. 업그레이드하거나 사용해 보시기를 권장하며, 언제나 그렇듯이 Milvus를 계속 개선해 나가는 과정에서 여러분의 피드백을 기다리겠습니다!</p>
<h3 id="Features" class="common-anchor-header">특징</h3><ul>
<li><strong>JSON 경로 색인</strong>: 동적 스키마에 대한 사용자의 요구를 해결하기 위해 Milvus 2.5.7에는 동적 열과 JSON 열에 인덱스를 구축하는 기능이 도입되었습니다. 이 기능을 사용하면 특정 동적 열 또는 JSON 경로에 대한 역 인덱스를 생성하여 느린 JSON 로드 프로세스를 효과적으로 우회하고 쿼리 성능을 크게 향상시킬 수 있습니다. 자세한 내용은 <a href="/docs/ko/use-json-fields.md">JSON 필드를</a> 참조하세요.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>접속 표현식에 대한 하위 표현식 재정렬<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li><code translate="no">interimindex</code> 에 더 많은 구성 옵션을 추가하여 세분화된 모드 지원<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>전체 WA 계산에 올바른 카운터 메트릭 사용<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>세그먼트 프루닝 구성을 새로 고칠 수 있도록 설정<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>L0 차단에 기반한 채널 봉인 정책 추가<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>키 수준 잠금으로 작업 메타데이터 구체화<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>메트릭에서 불필요한 수집 및 파티션 레이블 제거<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>가져오기 오류 메시지 개선<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li><code translate="no">httpserver</code> 에서 본문 바이트 조각을 문자열로 변환하지 않기<a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>).</li>
<li>삭제 메시지의 시작 위치 기록<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>새로운 <code translate="no">GetSegmentsInfo</code> 인터페이스로 세그먼트 빈로그 검색 지원<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>빈로그 파일을 가져올 때 <code translate="no">newInsertDataWithFunctionOutputField</code> 사용<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>컬렉션을 만들 때 mmap 속성을 적용하지 못하는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>샘플링에 실패할 때 centroids 파일을 삭제하지 말고 GC를 기다리도록 수정<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>).</li>
<li>탐색 중 메시지 손실 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>메인 디스패처 이후의 지연 타겟 제거<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>모든 배치 루프에 대한 명확한 비트맵 입력 추가<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>).</li>
<li>RLock으로 <code translate="no">GetSegmentIndexes</code> 보호<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>빈 벡터 데이터 세트 검색으로 인한 분할 오류 방지<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>).</li>
<li>JSON 인덱스 "같지 않음" 필터 수정<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>반전된 인덱스에서 널 오프셋 로딩 수정<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>).</li>
<li><code translate="no">jsonKey</code> 통계의 가비지 클린업 로직 수정 및 JSON 키 통계 필터 개선<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>).</li>
<li>유효하지 않은 JSON 포인터 오류 발견<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>).</li>
<li>이제 정책을 나열할 때 RBAC 스타 권한이 비어 있는 상태로 반환됩니다<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>).</li>
<li>쿼리 노드에서 스키마에 필드가 존재하지 않을 때 패닉을 방지<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>).</li>
<li>검색/쿼리에 대한 참조 컬렉션 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>스파스 벡터의 빈 행 처리<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>컬렉션 생성 시 중복된 타입/인덱스 매개변수 검사 추가<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>).</li>
<li>데이터 경합을 피하기 위해 <code translate="no">metaHeader</code> 을 클라이언트로 옮겼습니다<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>).</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 3월 10일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>도구 체인, 로깅, 메트릭, 배열 처리에 대한 중요한 개선 사항과 안정성과 성능 향상을 위한 여러 버그 수정이 포함된 Milvus 2.5.6의 출시를 발표하게 되어 기쁘게 생각합니다. 이 업데이트에는 개선된 동시성 처리, 더욱 강력한 압축 작업 및 기타 주요 개선 사항이 포함되어 있습니다. 업그레이드하거나 사용해 보시기를 권장하며, 언제나 그렇듯이 Milvus를 지속적으로 개선하는 데 도움이 되는 여러분의 피드백을 환영합니다!</p>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>Go 툴체인을 1.22.7로 업그레이드<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Rust 버전을 1.83으로 업그레이드<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Etcd 버전을 3.5.18로 범프<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>null이 아닌 배열에 대해서만 요소 유형 확인<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>리소스 그룹 핸들러(v2)에서 디버그 로그 제거<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>gRPC 리졸버에 대한 로깅 개선<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>비동기 CGO 구성 요소에 대한 더 많은 메트릭 추가<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>).</li>
<li>컬렉션이 릴리스된 후 샤드 위치 캐시 정리<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>유효성 무시로 인한 배열 손상 수정<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>JSON 필드에 대해 <code translate="no">null</code> 표현식이 작동하지 않는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>).</li>
<li>널 가능 필드가 있는 Tantivy 빌드 시 잘못된 오프셋을 저장하는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>).</li>
<li>0 세그먼트에 대한 통계 실행 건너뛰기<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>배열의 메모리 크기 추정을 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>).</li>
<li>다중 압축을 피하기 위해 배낭 포인터 전달<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>대량 삽입 관련 크래시 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>메인 디스패처를 올바르게 종료하여 메시지 스트림 누수 방지<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>).</li>
<li><code translate="no">null</code> 오프셋의 동시성 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li><code translate="no">import end ts</code> 구문 분석 수정<a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li><code translate="no">InitMetaCache</code> 함수에 대한 오류 처리 및 단위 테스트 개선<a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li><code translate="no">CreateIndex</code> 에 대한 중복 매개변수 검사 추가<a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>크기가 최대 제한을 초과했을 때 압축 작업을 방해하는 문제 해결<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>보이지 않는 세그먼트에 대한 스트림의 중복 소비를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>).</li>
<li>CMake 변수가 <code translate="no">knowhere-cuvs</code> 로 전환되도록 변경<a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>).</li>
<li>RESTful을 통한 DB 속성 삭제가 실패하는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li><code translate="no">OperatePrivilegeV2</code> API에 다른 메시지 유형 사용<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>작업 델타 캐시에서 데이터 경합 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>중복된 작업 ID로 인한 작업 델타 캐시 누수 문제 해결<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜 2월 26일, 2025</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5는 단일 클러스터가 지원할 수 있는 컬렉션과 파티션의 수를 크게 개선했습니다. 이제 10,000개의 컬렉션과 100,000개의 파티션으로 Milvus를 실행하는 것이 완전히 가능해졌습니다. 또한 이번 릴리스에서는 일치 통계 누락과 다단계 쿼리에서의 교착 상태 문제를 비롯한 몇 가지 중요한 버그가 해결되었습니다. 또한, 수많은 통합 가시성 및 보안 개선 사항도 포함되어 있습니다. Milvus 2.5.x를 실행 중인 모든 사용자는 가능한 한 빨리 업그레이드할 것을 강력히 권장합니다.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">종속성 업그레이드</h3><p>ETCD 3.5.18로 업그레이드하여 몇 가지 CVE를 수정했습니다.</p>
<ul>
<li>[2.5] 래프트를 CUV로 업데이트<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221)</a></li>
<li>[2.5] Knowhere 버전 업데이트<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">중요 버그</h3><ul>
<li>[2.5] 텍스트매치인덱스 널 오프셋 파일에 <code translate="no">text_log</code> 접두사 사용<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] 교착 상태를 피하기 위해 다단계 작업에 대한 하위 작업 풀 추가<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>[2.5] 작업 스케줄러 데드락 수정<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] 여러 개의 동일한 인덱스가 생성되는 경합 조건 수정<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] 이름이 중복된 컬렉션이 생성될 수 있는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>널 표현식의 검색 실패 수정<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] 접두사에 와일드카드가 있을 때 접두사 매칭이 실패하던 버그 수정<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>HTTP 요청 시간 초과 시 하위 컨텍스트 캐스케이드 취소<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] 작업 감소 시 작업 델타 캐시 누수 수정<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] 코너 케이스에서 쿼리코드 패닉 수정<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] 견적 쌍을 올바르게 계산하기 위해 향상된 이밸런스 기능<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] 압축 작업 실행시 음수 -1 수정<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] 세그먼트가 밀봉에서 플러싱으로 전송되지 않는 버그 수정<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>pk 인덱스 로드 시 기본 키 인덱스 생성 생략<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] 정렬 후 세그먼트가 0일 때 텍스트 인덱스 생성 생략<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] 가장 빠른 위치를 찾지 못하는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>하이브리드 검색에서 무시된 성장 옵션 손실<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] 일관성 수준을 수정할 수없는 변경 컬렉션 수정<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>행 수 0으로 인한 가져오기 실패 수정<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] 긴 유형에 대한 잘못된 모듈 결과 수정<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] 압축 트리거에 대한 수명 컨텍스트 추가 및 사용<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] 타깃 검사 전 컬렉션 릴리스 확인<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>루트코드 그레이스풀 스톱 실패 및 CI 리소스 제한 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] 로드 필드 및 스키마 열 크기 검사 제거<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] 인덱스 생성 시 타입 매개변수에서 mmap.enable 매개변수 제거<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] 속성 삭제 시 인덱스 이름을 전달하지 않음<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] 세그먼트가 성장하는 결과와 봉인된 결과를 모두 반환했습니다<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>).</li>
<li>[2.5] 동시 맵 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] QC 작업 테스트에서 충돌 해결<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] 압축 또는 GC가 발생한 경우 수집로드가 멈추는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] 태스크 델타 캐시 누수 실행으로 인한 고르지 않은 분포 수정<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] 로드 pk 인덱스 건너뛰기 시 조기 반환<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] <code translate="no">common.security.rootShouldBindRole</code> 가 설정되어 있어도 루트 사용자가 모든 컬렉션을 나열할 수 있는 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] 플로우그래프 누수 수정<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] 파라미터 항목 포매터를 사용하여 setconfig 오버레이 방지<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] 메타스토어 권한 이름이 권한 이름 "모두"로 확인<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] RESTful v1에 대한 속도 제한기 추가<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] RESTful 핸들러에서 하드코딩된 파티션 번호 제거<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><h4 id="Observability" class="common-anchor-header">관찰 가능성</h4><ul>
<li>원시 데이터 검색을 위한 모니터 메트릭 추가<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>).</li>
<li>[2.5] get 벡터 지연 시간 메트릭 추가 및 요청 제한 오류 메시지 개선<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>).</li>
<li>[2.5] 프록시 대기열에 대한 메트릭 추가<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>더 많은 메트릭 데이터 노출<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] 구문 분석 표현식에 대한 메트릭 추가<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] 하이브리드 검색을 위한 DSL 로그 필드 추가<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] 인덱스가 삭제된 경우 인덱스 메트릭 업데이트 생략<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] 구성 요소 중지 진행 시간 초과 시 pprof 정보 덤프<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] 쿼리코드 잔액 상태 확인을 위한 관리 API 추가<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">통계/압축/인덱스 작업 스케줄러 최적화</h4><ul>
<li>인덱스 작업 스케줄러 정책 개선<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] 통계 작업 생성 속도 제한<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>압축 일정에 대한 구성 추가<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] 스테이팅 시 동일한 채널에서만 L0 압축 확인<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] 중간 인덱스에 대한 세그먼트 로더의 메모리 예상치 조정<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] 수명 정책에 따라 봉인 세그먼트에 대한 시작 위치 사용<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>작업이 더 이상 필요하지 않을 때 작업 메타 제거<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] 빈로그 가져오기 중 객체 나열 가속화<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>설명이 있는 컬렉션 생성 지원<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] 구성에서 내보낸 인덱스 요청 시간 초과 간격<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] proxy.maxTaskNum 기본값을 1024로 동기화<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>덤프 스냅샷 제한을 10w에서 1w로 줄임<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>).</li>
<li>[2.5] 배치 pk에 대한 슬라이스 바이트 복사 문자열이 존재하지 않도록 방지<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>인덱스 설명 시 구성 가능한 속성 반환 지원<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>특정 지점에 대한 표현식 성능 최적화<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] getQueryNodeDistribution의 결과 형식 최적화<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] 쓰기 증폭 관찰 활성화<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] RESTful v2에서 검색 시 상위-k 결과 반환<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] withEnableMatch 구문 설탕 추가<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] 중간 인덱스가 다른 인덱스 유형 및 더 많은 데이터 유형(FP16/BF16)을 지원함<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>).</li>
<li>[GoSDK][2.5] 마스터 브랜치에서 동기화된 GoSDK 커밋<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>브로드캐스터의 메모리와 메타의 일관성 유지<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>이벤트 기반 알림으로 브로드캐스트<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] 스키마 및 인덱스 검사에 대한 오류 메시지 개선<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] 스칼라에 대한 기본 자동 인덱스 유형 재설정<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] 사전 검사 실패 시 L0 압축 작업 다시 대기열에 추가<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리즈 날짜: 2025년 1월 23일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>PartitionKey 격리, DAAT MaxScore를 사용한 스파스 인덱스, 향상된 잠금 메커니즘 등 주요 성능 최적화 및 새로운 기능을 도입한 Milvus 2.5.4의 출시를 발표하게 되어 기쁘게 생각합니다. 이번 릴리스의 가장 큰 특징은 10,000개의 컬렉션과 1백만 개의 파티션을 지원하여 멀티테넌트 사용 사례에 있어 중요한 이정표를 세웠다는 점입니다. 이 버전은 또한 전반적인 안정성과 신뢰성을 향상시키는 여러 버그들을 해결했으며, 그 중 두 가지 중요한 버그는 데이터 손실을 유발할 수 있습니다. 이 최신 버전을 업그레이드하거나 사용해 보시기를 권장하며, Milvus를 지속적으로 개선하는 데 도움이 되는 여러분의 피드백을 기다리겠습니다!</p>
<h3 id="Features" class="common-anchor-header">특징</h3><ul>
<li>여러 개의 파티션 키로 성능을 개선하기 위해 PartitionKey 격리를 지원합니다<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). 자세한 내용은 <a href="/docs/ko/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</li>
<li>스파스 인덱스가 이제 DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015를</a> 지원합니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</li>
<li>표현식에 <code translate="no">is_null</code> 지원 추가<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>루트 권한을 사용자 지정할 수 있습니다<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>하나의 클러스터에서 10K 컬렉션 및 1백만 개의 파티션 지원<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>쿼리 코디네이터를 가속화하기 위해 세그먼트의 델타 정보 캐시<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>컬렉션 수준에서 메타데이터를 동시에 읽어 장애 복구 속도 향상<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>쿼리 노드의 잠금 세분성 개선<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>CStatus를 사용하여 뉴컬렉션 CGO 호출을 처리하는 통합 스타일<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>파티션이 설정되지 않은 경우 파티션 리미터 생성을 건너뛰었습니다<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>).</li>
<li>RESTful API 지원 추가<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>메모리 사용량 절감을 위해 쿼리노드 및 데이터노드에서 불필요한 블룸 필터 제거<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>).</li>
<li>쿼리코드에서 작업 생성, 스케줄링 및 실행을 가속화하여 데이터 로딩 속도 향상<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>).</li>
<li>로드 및 삽입 작업 속도를 높이기 위해 DataCoord의 잠금을 줄임<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>).</li>
<li><code translate="no">SearchResult</code> 및 <code translate="no">QueryResults</code> 에 기본 필드 이름 추가<a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>디스크 할당량 조절 표준으로 빈로그 크기와 인덱스 크기를 모두 사용<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>).</li>
<li>전체 텍스트 검색을 위한 메모리 사용량 최적화(#1011)</li>
<li>스칼라 인덱스에 대한 버전 제어 추가<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236)</a></li>
<li>불필요한 복사본을 방지하여 루트코드에서 수집 정보를 가져오는 속도를 개선했습니다<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>).</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">중요 버그 수정</h3><ul>
<li>인덱스가 있는 기본 키에 대한 검색 실패 수정<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>MixCoord를 재시작하고 동시에 플러시할 때 발생할 수 있는 데이터 손실 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>).</li>
<li>MixCoord 재시작 후 통계 작업과 L0 압축 간의 부적절한 동시성으로 인해 트리거되는 삭제 실패 수정<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>).</li>
<li>2.4에서 2.5로 업그레이드할 때 스칼라 반전 인덱스 비호환성 수정<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>다중 열 로드 중 거친 잠금 단위로 인한 쿼리 속도 저하 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>).</li>
<li>별칭을 사용하면 반복기가 잘못된 데이터베이스를 트래버스할 수 있는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>).</li>
<li>데이터베이스 변경 시 리소스 그룹 업데이트 실패를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>).</li>
<li>릴리스 중에 탠티비 인덱스가 인덱스 파일을 삭제할 수 없는 산발적인 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>).</li>
<li>너무 많은 스레드로 인한 느린 인덱싱 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>대량 가져오기 중 디스크 할당량 검사를 건너뛰는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>).</li>
<li>동시성을 제한하여 너무 많은 메시지 큐 소비자로 인해 발생하는 정지 문제를 해결했습니다<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>).</li>
<li>대규모 압축 중 MixCoord 재시작으로 인한 쿼리 시간 초과 문제 수정<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>).</li>
<li>노드 다운타임으로 인한 채널 불균형 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>).</li>
<li>채널 밸런스가 고착될 수 있는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>RBAC 사용자 지정 그룹 권한 수준 확인이 비효율적이던 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>).</li>
<li>빈 인덱스에서 행 수를 검색하지 못하는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>).</li>
<li>작은 세그먼트에 대한 잘못된 메모리 추정 수정<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 1월 13일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3은 전반적인 안정성, 신뢰성 및 사용성을 개선하기 위해 중요한 버그 수정 및 성능 향상을 제공합니다. 이 버전은 동시성 처리를 개선하고, 데이터 인덱싱 및 검색을 강화하며, 보다 강력한 사용자 환경을 위해 몇 가지 주요 구성 요소를 업데이트합니다.</p>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li><code translate="no">VARCHAR</code> 기본 키에 <code translate="no">IN</code> 필터를 사용하면 빈 결과가 반환될 수 있는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>잘못된 결과로 이어질 수 있는 쿼리 작업과 삭제 작업 간의 동시성 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>쿼리 요청에서 <code translate="no">expr</code> 이 비어 있을 때 반복 필터링으로 인해 발생하는 오류를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>구성 업데이트 중 디스크 오류로 인해 기본 구성 설정이 사용되던 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>클러스터링 압축으로 인해 삭제된 데이터가 손실될 수 있는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>증가하는 데이터 세그먼트에서 텍스트 일치 쿼리가 깨지는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>인덱스가 스파스 벡터의 원본 데이터를 포함하지 않아서 발생하는 검색 실패를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>동시 쿼리 및 데이터 로딩으로 인해 발생할 수 있는 열 필드 경쟁 조건을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>nullable 또는 default_value 필드가 데이터에 포함되지 않은 경우 대량 삽입 실패를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>RESTful 인터페이스용 리소스 그룹 API를 추가했습니다.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>비트셋 SIMD 메서드를 활용하여 검색 성능을 최적화했습니다.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>지정 시 MVCC 타임스탬프를 보증 타임스탬프로 사용.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>누락된 삭제 메트릭을 추가했습니다.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Etcd를 버전 v3.5.16으로 업데이트했습니다.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>프로토 관리를 위한 새로운 Go 패키지 생성.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 1월 3일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2는 VARCHAR 열의 최대 길이 수정을 지원하며 가져오기 중 동시성, 파티션 드롭, BM25 통계 처리와 관련된 몇 가지 중요한 문제를 해결합니다. 안정성과 성능 향상을 위해 이 버전으로 업그레이드하실 것을 적극 권장합니다.</p>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>지정된 경로가 존재하지 않는 경우에만 디스크 사용 로그를 생성합니다.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>최대 VARCHAR 길이를 조정하기 위한 매개변수를 추가하고 제한을 65,535로 복원했습니다.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>).</li>
<li>표현식에 대한 매개변수 유형 변환을 지원합니다.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>동시성 시나리오에서 잠재적인 교착 상태를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>null 값을 지원하는 필드에 대해서만 index_null_offset 파일을 생성했습니다.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>축소 단계에서 무료 이후 검색 계획 사용을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>대문자로 AND 및 OR이 포함된 표현식을 인식했습니다.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>로딩에 실패하더라도 파티션 삭제에 성공할 수 있도록 수정.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>가져오기 중 BM25 통계 파일 등록 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2024년 12월 26일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1은 메모리 로딩, RBAC 목록, 쿼리 노드 밸런싱, 봉인된 세그먼트 인덱싱을 다루는 일련의 버그 수정에 중점을 두고 있으며, 웹 UI와 인터셉터도 개선되었습니다. 향상된 안정성과 신뢰성을 위해 2.5.1로 업그레이드하실 것을 적극 권장합니다.</p>
<h3 id="Improvement" class="common-anchor-header">개선 사항</h3><ul>
<li>웹 UI 수집 및 쿼리 페이지 업데이트.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>예상 로딩에 메모리 계수를 추가하여 OOM 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>루트코드에 정책을 나열할 때 권한 그룹 확장을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>권한 그룹 및 컬렉션 나열 관련 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>동일한 쿼리 노드에 반복적으로 과부하가 걸리지 않도록 밸런서를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>쿼리코드 재시작 후 예기치 않은 밸런스 작업이 트리거되는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>로드 구성 업데이트가 컬렉션 로딩에 적용되지 않는 문제를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>데이터 가져오기 중 읽기 횟수 0을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>표현식의 JSON 키에 대한 유니코드 디코딩을 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>2.5에서 alterCollectionField의 인터셉터 DB 이름을 수정했습니다. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>BM25 무차별 대입 검색을 사용할 때 봉인된 세그먼트에 대한 빈 인덱스 매개변수를 수정했습니다.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2024년 12월 23일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0은 벡터 검색과 대규모 데이터 관리를 다루는 사용자들을 위해 사용성, 확장성, 성능을 향상시키는 중요한 발전을 가져왔습니다. 이번 릴리스에서는 용어 기반 검색, 쿼리 최적화를 위한 클러스터 압축, 희소 및 고밀도 벡터 검색 방법에 대한 다양한 지원과 같은 강력한 새 기능이 통합되었습니다. 클러스터 관리, 인덱싱, 데이터 처리 기능이 향상되어 새로운 수준의 유연성과 사용 편의성이 도입되어 Milvus는 더욱 강력하고 사용자 친화적인 벡터 데이터베이스가 되었습니다.</p>
<h3 id="Key-Features" class="common-anchor-header">주요 기능</h3><h4 id="Full-Text-Search" class="common-anchor-header">전체 텍스트 검색</h4><p>Milvus 2.5는 Sparse-BM25로 구현된 전체 텍스트 검색을 지원합니다! 이 기능은 특히 희귀한 단어나 전문 용어가 포함된 시나리오에서 Milvus의 강력한 시맨틱 검색 기능을 보완하는 중요한 기능입니다. 이전 버전에서 Milvus는 키워드 검색 시나리오를 지원하기 위해 스파스 벡터를 지원했습니다. 이러한 희소 벡터는 SPLADEv2/BGE-M3와 같은 신경 모델이나 BM25 알고리즘과 같은 통계 모델에 의해 Milvus 외부에서 생성되었습니다.</p>
<p><a href="https://github.com/quickwit-oss/tantivy">Tantivy를</a> 기반으로 하는 Milvus 2.5는 분석기와 스파스 벡터 추출 기능이 내장되어 있어, 벡터를 입력으로만 받던 API를 텍스트를 직접 받을 수 있도록 확장했습니다. BM25 통계 정보는 데이터가 입력되는 대로 실시간으로 업데이트되어 사용성과 정확성이 향상되었습니다. 또한 근사 근사 이웃(ANN) 알고리즘을 기반으로 하는 희소 벡터는 표준 키워드 검색 시스템보다 더 강력한 성능을 제공합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/analyzer-overview.md">분석기 개요</a> 및 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">클러스터 관리 웹UI(베타)</h4><p>대규모 데이터와 풍부한 기능을 보다 효과적으로 지원하기 위해 Milvus의 정교한 설계에는 다양한 종속성, 수많은 노드 역할, 복잡한 데이터 구조 등이 포함되어 있습니다. 이러한 측면은 사용 및 유지 관리에 어려움을 초래할 수 있습니다.</p>
<p>Milvus 2.5는 빌트인 클러스터 관리 웹UI를 도입하여 Milvus의 복잡한 런타임 환경 정보를 시각화함으로써 시스템 유지 관리의 어려움을 줄여줍니다. 여기에는 데이터베이스 및 컬렉션, 세그먼트, 채널, 종속성, 노드 상태, 작업 정보, 느린 쿼리 등에 대한 세부 정보가 포함됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 참조하세요.</p>
<h4 id="Text-Match" class="common-anchor-header">텍스트 일치</h4><p>Milvus 2.5는 텍스트 전처리 및 인덱스 구축을 위해 <a href="https://github.com/quickwit-oss/tantivy">Tantivy의</a> 분석기와 인덱싱을 활용하여 특정 용어를 기반으로 텍스트 데이터의 정확한 자연어 매칭을 지원합니다. 이 기능은 주로 특정 조건을 충족하는 필터링 검색에 사용되며, 스칼라 필터링을 통합하여 쿼리 결과를 구체화함으로써 스칼라 기준을 충족하는 벡터 내에서 유사성 검색을 할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/analyzer-overview.md">분석기 개요</a> 및 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하세요.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">비트맵 인덱스</h4><p>새로운 스칼라 데이터 인덱스가 Milvus 제품군에 추가되었습니다. 비트맵 인덱스는 행 수와 동일한 길이의 비트 배열을 사용하여 값의 존재를 나타내고 검색을 가속화합니다.</p>
<p>비트맵 인덱스는 일반적으로 고유 값의 수가 적은 낮은 카디널리티 필드(예: 남성, 여성 두 가지 값만 있는 성별 정보가 포함된 열)에 효과적이었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/bitmap.md">비트맵 인덱스를</a> 참조하세요.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">널 가능 및 기본값</h4><p>Milvus는 이제 기본 키 필드 이외의 스칼라 필드에 대해 널 가능 속성 및 기본값 설정을 지원합니다. <code translate="no">nullable=True</code> 로 표시된 스칼라 필드의 경우 사용자는 데이터를 삽입할 때 해당 필드를 생략할 수 있으며, 시스템에서는 오류를 발생시키지 않고 해당 필드를 널 값 또는 기본값(설정된 경우)으로 처리합니다.</p>
<p>기본값과 널 가능 속성은 Milvus에 더 큰 유연성을 제공합니다. 사용자는 컬렉션을 만들 때 값이 불확실한 필드에 이 기능을 활용할 수 있습니다. 또한 다른 데이터베이스 시스템에서 Milvus로 데이터 마이그레이션을 간소화하여 원래의 기본값 설정을 유지하면서 null 값이 포함된 데이터 세트를 처리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">Faiss 기반 HNSW SQ/PQ/PRQ</h4><p>Faiss 커뮤니티와의 긴밀한 협력을 통해 Faiss의 HNSW 알고리즘은 기능과 성능 모두에서 상당한 개선을 이루었습니다. 안정성과 유지보수성을 고려하여 Milvus 2.5는 HNSW에 대한 지원을 hnswlib에서 Faiss로 공식적으로 마이그레이션했습니다.</p>
<p>Milvus 2.5는 Faiss를 기반으로 다양한 시나리오의 요구 사항을 충족하기 위해 HNSW에서 여러 양자화 방법을 지원합니다: SQ(스칼라 퀀타이저), PQ(제품 퀀타이저), PRQ(제품 잔여 퀀타이저)가 그것입니다. SQ와 PQ가 더 일반적으로 사용되는데, SQ는 쿼리 성능과 빌드 속도가 우수하고, PQ는 동일한 압축률에서 더 나은 리콜을 제공합니다. 많은 벡터 데이터베이스는 일반적으로 SQ 양자화의 간단한 형태인 이진 양자화를 사용합니다.</p>
<p>PRQ는 PQ와 AQ(애디티브 퀀타이저)의 융합입니다. PQ와 비교했을 때, 특히 높은 압축률에서 더 나은 리콜을 제공하기 위해 더 긴 빌드 시간이 필요하며, 이진 압축이라고 합니다.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">클러스터링 압축(베타)</h4><p>Milvus 2.5에는 대규모 컬렉션에서 검색을 가속화하고 비용을 절감하기 위해 클러스터링 압축이 도입되었습니다. 스칼라 필드를 클러스터링 키로 지정하면 데이터를 범위별로 재분배하여 저장과 검색을 최적화할 수 있습니다. 글로벌 인덱스처럼 작동하는 이 기능은 클러스터링 메타데이터를 기반으로 쿼리 중에 데이터를 효율적으로 정리하여 스칼라 필터를 적용할 때 검색 성능을 향상시킬 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/clustering-compaction.md">클러스터링 압축을</a> 참조하세요.</p>
<h3 id="Other-Features" class="common-anchor-header">기타 기능</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">스트리밍 노드(베타)</h4><p>Milvus 2.5에는 미리 쓰기 로깅(WAL) 서비스를 제공하는 스트리밍 노드라는 새로운 구성 요소가 도입되었습니다. 이를 통해 Milvus는 채널 읽기 및 쓰기 전후에 합의를 달성하여 새로운 특징, 기능 및 최적화를 실현할 수 있습니다. 이 기능은 Milvus 2.5에서는 기본적으로 비활성화되어 있으며 3.0 버전에서 공식적으로 제공될 예정입니다.</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6 지원</h4><p>Milvus는 이제 IPv6를 지원하여 네트워크 연결성과 호환성을 확장합니다.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV 일괄 가져오기</h4><p>이제 Milvus는 JSON 및 Parquet 형식 외에도 CSV 형식의 데이터를 직접 대량으로 가져올 수 있습니다.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">쿼리 가속화를 위한 표현식 템플릿</h4><p>Milvus는 이제 표현식 템플릿을 지원하여 특히 복잡한 표현식이 있는 시나리오에서 표현식 구문 분석의 효율성을 향상시킵니다.</p>
<p>자세한 내용은 <a href="/docs/ko/filtering-templating.md">필터 템플릿을</a> 참조하세요.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">그룹별 개선 사항</h4><ul>
<li><strong>사용자 정의 가능한 그룹 크기</strong>: 각 그룹에 대해 반환되는 항목 수를 지정할 수 있는 기능이 추가되었습니다.</li>
<li><strong>하이브리드 그룹별 검색</strong>: 여러 벡터 열을 기반으로 하는 하이브리드 그룹별 검색을 지원합니다.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">이터레이터 개선 사항</h4><ul>
<li><strong>MVCC 지원</strong>: 이제 다중 버전 동시성 제어(MVCC) 덕분에 사용자는 삽입 및 삭제와 같은 후속 데이터 변경의 영향을 받지 않고 반복기를 사용할 수 있습니다.</li>
<li><strong>퍼시스턴트 커서</strong>: 이제 Milvus는 쿼리이터레이터에 영구 커서를 지원하여 사용자가 전체 반복 프로세스를 다시 시작할 필요 없이 Milvus 재시작 후 마지막 위치에서 반복을 재개할 수 있습니다.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><h4 id="Deletion-Optimization" class="common-anchor-header">삭제 최적화</h4><p>잠금 사용량과 메모리 관리를 최적화하여 대규모 삭제 시 속도를 개선하고 메모리 사용량을 줄였습니다.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">종속성 업그레이드</h4><p>ETCD 3.5.16 및 Pulsar 3.0.7 LTS로 업그레이드하여 기존 CVE를 수정하고 보안을 강화했습니다. 참고: Pulsar 3.x로의 업그레이드는 이전 2.x 버전과 호환되지 않습니다.</p>
<p>이미 작동 중인 Milvus 배포가 있는 사용자의 경우, 새로운 기능을 사용하려면 먼저 ETCD 및 Pulsar 구성 요소를 업그레이드해야 합니다. 자세한 내용은 <a href="/docs/ko/upgrade-pulsar-v3.md">Pulsar를 2.x에서 3.x로 업그레이드하기를</a> 참조하세요.</p>
<h4 id="Local-Storage-V2" class="common-anchor-header">로컬 스토리지 V2</h4><p>Milvus 2.5에 새로운 로컬 파일 형식이 도입되어 스칼라 데이터의 로딩 및 쿼리 효율성이 향상되고 메모리 오버헤드가 줄어들며 향후 최적화를 위한 토대가 마련되었습니다.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">표현식 구문 분석 최적화</h4><p>반복 표현식에 대한 캐싱을 구현하고, ANTLR을 업그레이드하고, <code translate="no">NOT IN</code> 절의 성능을 최적화하여 표현식 구문 분석이 개선되었습니다.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">DDL 동시성 성능 개선</h4><p>데이터 정의 언어(DDL) 작업의 동시성 성능을 최적화했습니다.</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 기능 조정</h4><p>일관성을 위해 RESTful API의 기능을 다른 SDK와 정렬했습니다.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">보안 및 구성 업데이트</h4><p>보다 복잡한 환경이나 엔터프라이즈 환경에서 노드 간 통신을 보호하기 위해 TLS를 지원합니다. 자세한 내용은 <a href="/docs/ko/tls.md">보안 구성을</a> 참조하세요.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">압축 성능 개선</h4><p>혼합 압축에서 최대 세그먼트 제한을 제거하고 이제 작은 세그먼트부터 우선순위를 지정하여 효율성이 향상되고 대규모 또는 조각화된 데이터 세트의 쿼리 속도가 빨라졌습니다.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">점수 기반 채널 밸런싱</h4><p>채널 간 부하를 동적으로 분산하는 정책을 도입하여 대규모 배포에서 리소스 활용률과 전반적인 안정성을 향상시켰습니다.</p>
