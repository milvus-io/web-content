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
    </button></h2><p>릴리스 날짜: 2025년 1월 23일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>PartitionKey 격리, DAAT MaxScore를 사용한 스파스 인덱스, 향상된 잠금 메커니즘 등 주요 성능 최적화 및 새로운 기능을 도입한 Milvus 2.5.4의 출시를 발표하게 되어 기쁘게 생각합니다. 이 버전은 또한 전반적인 안정성과 신뢰성을 개선하는 여러 버그도 해결했습니다. 이번 최신 버전을 업그레이드하거나 사용해 보시길 권장하며, Milvus를 지속적으로 개선하는 데 도움이 되는 여러분의 피드백을 기다리겠습니다!</p>
<h3 id="Features" class="common-anchor-header">특징</h3><ul>
<li>여러 개의 파티션 키로 성능을 개선하기 위해 PartitionKey 격리를 지원합니다<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). 자세한 내용은 <a href="/docs/ko/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</li>
<li>스파스 인덱스가 이제 DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015를</a> 지원합니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</li>
<li>표현식에 <code translate="no">is_null</code> 지원 추가<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>루트 권한을 사용자 지정할 수 있습니다<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><ul>
<li>쿼리 코디네이터를 가속화하기 위해 세그먼트의 델타 정보 캐시<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>수집 수준에서 메타데이터를 동시에 읽음으로써 장애 복구 속도 향상<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
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
<li>불필요한 복사본을 방지하여 루트코드에서 수집 정보를 가져오는 속도를 개선<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">버그 수정</h3><ul>
<li>다중 열 로드 중 거친 잠금 세분화로 인한 쿼리 속도 저하 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>별칭을 사용하면 반복기가 잘못된 데이터베이스를 트래버스할 수 있는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>).</li>
<li>인덱스가 있는 기본 키에 대한 검색 실패 수정<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>MixCoord를 재시작하고 동시에 플러시할 때 발생할 수 있는 잠재적인 데이터 손실 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>).</li>
<li>데이터베이스 변경 시 리소스 그룹 업데이트 실패 수정<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>릴리스 중에 탠티비 인덱스가 인덱스 파일을 삭제할 수 없는 산발적인 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>).</li>
<li>MixCoord 재시작 후 통계 작업과 L0 압축 간의 부적절한 동시성으로 인해 트리거되는 삭제 실패를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>).</li>
<li>너무 많은 스레드로 인한 느린 인덱싱을 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>).</li>
<li>대량 가져오기 중 디스크 할당량 검사를 건너뛰는 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>).</li>
<li>동시성을 제한하여 너무 많은 메시지 큐 소비자로 인해 발생하는 정지 문제를 해결했습니다<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>).</li>
<li>대규모 압축 중 MixCoord 재시작으로 인한 쿼리 시간 초과 문제를 수정했습니다<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>).</li>
<li>2.4에서 2.5로 업그레이드 시 스칼라 반전 인덱스 비호환성 수정<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>).</li>
<li>노드 다운타임으로 인한 채널 불균형 문제 수정<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
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
