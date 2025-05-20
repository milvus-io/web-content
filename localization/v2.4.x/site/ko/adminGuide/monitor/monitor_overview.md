---
id: monitor_overview.md
title: 모니터 개요
related_key: 'monitor, alert'
summary: Milvus에서 Prometheus와 Grafana가 모니터링 및 알림 서비스에 어떻게 사용되는지 알아보세요.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Milvus 모니터링 프레임워크 개요<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus가 Prometheus를 사용하여 메트릭을 모니터링하고 Grafana를 사용하여 메트릭을 시각화하고 경고를 생성하는 방법에 대해 설명합니다.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Milvus의 Prometheus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus는</a> Kubernetes 구현을 위한 오픈 소스 모니터링 및 알림 도구 키트입니다. 메트릭을 시계열 데이터로 수집하고 저장합니다. 즉, 메트릭은 기록될 때 타임스탬프와 함께 레이블이라고 하는 선택적 키-값 쌍과 함께 저장됩니다.</p>
<p>현재 Milvus는 Prometheus의 다음 구성 요소를 사용합니다:</p>
<ul>
<li>내보내기가 설정한 엔드포인트에서 데이터를 가져오는 Prometheus 엔드포인트.</li>
<li>Prometheus 모니터링 인스턴스를 효과적으로 관리하기 위한 Prometheus 운영자.</li>
<li>엔드투엔드 Kubernetes 클러스터 모니터링을 쉽게 운영할 수 있는 Kube-prometheus.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">메트릭 이름</h3><p>Prometheus의 유효한 메트릭 이름에는 네임스페이스, 서브시스템, 이름이라는 세 가지 요소가 포함됩니다. 이 세 가지 요소는 &quot;_&quot;로 연결됩니다.</p>
<p>Prometheus에서 모니터링하는 Milvus 메트릭의 네임스페이스는 &quot;milvus&quot;입니다. 메트릭이 속한 역할에 따라 하위 시스템은 다음 8가지 역할 중 하나에 속해야 합니다: &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>예를 들어 쿼리된 벡터의 총 수를 계산하는 Milvus 메트릭의 이름은 <code translate="no">milvus_proxy_search_vectors_count</code> 입니다.</p>
<h3 id="Metric-types" class="common-anchor-header">메트릭 유형</h3><p>Prometheus는 네 가지 유형의 메트릭을 지원합니다:</p>
<ul>
<li>카운터: 재시작 시에만 값이 증가하거나 0으로 초기화될 수 있는 누적 메트릭 유형입니다.</li>
<li>게이지: 값이 올라가거나 내려갈 수 있는 메트릭 유형입니다.</li>
<li>히스토그램: 구성 가능한 버킷을 기준으로 카운트되는 메트릭 유형입니다. 일반적인 예로는 요청 지속 시간이 있습니다.</li>
<li>요약: 히스토그램과 유사한 메트릭 유형으로 슬라이딩 시간 창에 대해 구성 가능한 사분위수를 계산합니다.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">메트릭 레이블</h3><p>Prometheus는 동일한 메트릭 이름을 가진 샘플에 레이블을 지정하여 구분합니다. 레이블은 메트릭의 특정 속성입니다. 이름이 같은 메트릭은 <code translate="no">variable_labels</code> 필드에 대해 동일한 값을 가져야 합니다. 다음 표에는 Milvus 메트릭의 일반적인 레이블의 이름과 의미가 나와 있습니다.</p>
<table>
<thead>
<tr><th>레이블 이름</th><th>정의</th><th>값</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>역할의 고유 ID.</td><td>밀버스에서 생성한 전 세계적으로 고유한 ID입니다.</td></tr>
<tr><td>"status"</td><td>처리된 작업 또는 요청의 상태입니다.</td><td>&quot;포기&quot;, &quot;성공&quot; 또는 &quot;실패&quot;.</td></tr>
<tr><td>"쿼리 유형"</td><td>읽기 요청의 유형입니다.</td><td>&quot;검색&quot; 또는 &quot;쿼리&quot;.</td></tr>
<tr><td>"msg_type"</td><td>메시지 유형입니다.</td><td>&quot;삽입&quot;, &quot;삭제&quot;, &quot;검색&quot; 또는 &quot;쿼리&quot;.</td></tr>
<tr><td>"세그먼트_상태"</td><td>세그먼트의 상태입니다.</td><td>&quot;봉인됨&quot;, &quot;성장 중&quot;, &quot;플러시됨&quot;, &quot;플러싱&quot;, &quot;삭제됨&quot; 또는 &quot;가져오기&quot;.</td></tr>
<tr><td>"캐시 상태"</td><td>캐시된 객체의 상태.</td><td>&quot;히트&quot; 또는 &quot;미스&quot;.</td></tr>
<tr><td>"캐시_이름"</td><td>캐시된 객체의 이름입니다. 이 레이블은 &quot;cache_state&quot; 레이블과 함께 사용됩니다.</td><td>예: &quot;CollectionID&quot;, &quot;스키마&quot; 등.</td></tr>
<tr><td>&quot;채널_이름&quot;</td><td>메시지 저장소의 물리적 토픽(Pulsar 또는 Kafka).</td><td>예: &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot; 등.</td></tr>
<tr><td>"function_name"</td><td>특정 요청을 처리하는 함수의 이름입니다.</td><td>예: &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot; 등.</td></tr>
<tr><td>"user_name"</td><td>인증에 사용되는 사용자 이름입니다.</td><td>원하는 사용자 이름입니다.</td></tr>
<tr><td>"index_task_status"</td><td>메타 저장소에 있는 인덱스 작업의 상태입니다.</td><td>&quot;미발급&quot;, &quot;진행 중&quot;, &quot;실패&quot;, &quot;완료&quot; 또는 &quot;재활용&quot;.</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Milvus의 Grafana<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana는</a> 모든 데이터 소스와 연결할 수 있는 오픈 소스 시각화 스택입니다. 메트릭을 가져와서 사용자가 방대한 데이터를 이해하고, 분석하고, 모니터링할 수 있도록 도와줍니다.</p>
<p>Milvus는 메트릭 시각화를 위해 Grafana의 사용자 정의 가능한 대시보드를 사용합니다.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>모니터링 및 알림의 기본 워크플로우에 대해 알아본 후 다음을 학습하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/monitor.md">모니터링 서비스 배포하기</a></li>
<li><a href="/docs/ko/v2.4.x/visualize.md">Milvus 메트릭 시각화하기</a></li>
<li><a href="/docs/ko/v2.4.x/alert.md">알림 만들기</a></li>
</ul>
