---
id: monitor_overview.md
title: 모니터 개요
related_key: 'monitor, alert'
summary: Milvus에서 모니터링 및 알림 서비스를 위해 Prometheus와 Grafana가 어떻게 활용되는지 알아보세요.
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
    </button></h1><p>이 항목에서는 Milvus가 Prometheus를 사용하여 메트릭을 모니터링하고, Grafana를 사용하여 메트릭을 시각화하며 경보를 생성하는 방법을 설명합니다.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus는</a> Kubernetes 환경을 위한 오픈소스 모니터링 및 알림 툴킷입니다. 이 툴킷은 메트릭을 시계열 데이터로 수집하고 저장합니다. 즉, 메트릭은 기록 시 타임스탬프와 함께, ‘라벨(label)’이라고 하는 선택적 키-값 쌍과 함께 저장됩니다.</p>
<p>현재 Milvus는 Prometheus의 다음 구성 요소를 사용합니다:</p>
<ul>
<li>익스포터가 설정한 엔드포인트에서 데이터를 가져오기 위한 Prometheus 엔드포인트.</li>
<li>Prometheus 모니터링 인스턴스를 효율적으로 관리하기 위한 Prometheus 오퍼레이터.</li>
<li>Kube-prometheus: 운영이 간편한 종단 간 쿠버네티스 클러스터 모니터링을 제공합니다.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">메트릭 이름<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus에서 유효한 메트릭 이름은 네임스페이스, 서브시스템, 이름의 세 가지 요소로 구성됩니다. 이 세 요소는 "_"로 연결됩니다.</p>
<p>Prometheus가 모니터링하는 Milvus 메트릭의 네임스페이스는 "milvus"입니다. 메트릭의 서브시스템은 “cdc”, “cgo”, “datacoord”, “datanode”, “indexnode”, “logging”, “meta”, “msg_queue”, “msgstream”, "proxy", "querycoord", "querynode", "rootcoord", "storage", "streaming", "streamingcoord", "streamingnode", "wal"입니다. <code translate="no">milvus_build_info</code> 및 <code translate="no">milvus_num_node</code> 와 같은 일부 메트릭에는 서브시스템이 없습니다.</p>
<p>예를 들어, 쿼리된 벡터의 총 개수를 계산하는 Milvus 메트릭의 이름은 <code translate="no">milvus_proxy_search_vectors_count</code> 입니다.</p>
<h3 id="Metric-types" class="common-anchor-header">메트릭 유형<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus는 네 가지 유형의 메트릭을 지원합니다:</p>
<ul>
<li>카운터(Counter): 값이 증가할 수만 있거나 재시작 시 0으로 재설정되는 누적형 메트릭 유형입니다.</li>
<li>게이지(Gauge): 값이 증가하거나 감소할 수 있는 메트릭 유형입니다.</li>
<li>히스토그램(Histogram): 구성 가능한 버킷을 기반으로 집계되는 메트릭 유형입니다. 일반적인 예로는 요청 소요 시간이 있습니다.</li>
<li>서머리(Summary): 히스토그램과 유사한 메트릭 유형으로, 슬라이딩 시간 창을 기준으로 구성 가능한 사분위를 계산합니다.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">메트릭 레이블<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus는 동일한 메트릭 이름을 가진 샘플을 라벨을 통해 구분합니다. 라벨은 메트릭의 특정 속성입니다. 동일한 이름을 가진 메트릭은 ` <code translate="no">variable_labels</code> ` 필드의 값이 동일해야 합니다. 다음 표에는 Milvus 메트릭의 일반적인 라벨 이름과 그 의미가 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>라벨 이름</th><th>정의</th><th>값</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>역할의 고유 식별자.</td><td>Milvus에서 생성된 전역 고유 ID입니다.</td></tr>
<tr><td>“status”</td><td>처리된 작업 또는 요청의 상태입니다.</td><td>"abandon", "success" 또는 "fail".</td></tr>
<tr><td>“query_type”</td><td>읽기 요청의 유형입니다.</td><td>“search” 또는 “query”.</td></tr>
<tr><td>“msg_type”</td><td>메시지의 유형입니다.</td><td>"insert", "delete", "search" 또는 "query".</td></tr>
<tr><td>“segment_state”</td><td>세그먼트의 상태.</td><td>"Sealed", "Growing", "Flushed", "Flushing", "Dropped" 또는 "Importing".</td></tr>
<tr><td>“cache_state”</td><td>캐시된 객체의 상태.</td><td>“hit” 또는 “miss”.</td></tr>
<tr><td>“cache_name”</td><td>캐시된 객체의 이름입니다. 이 레이블은 "cache_state" 레이블과 함께 사용됩니다.</td><td>예: “CollectionID”, “Schema” 등.</td></tr>
<tr><td>“channel_name”</td><td>메시지 저장소(Pulsar 또는 Kafka) 내의 물리적 토픽입니다.</td><td>예: "by-dev-rootcoord-dml_0", "by-dev-rootcoord-dml_255" 등</td></tr>
<tr><td>“function_name”</td><td>특정 요청을 처리하는 함수의 이름입니다.</td><td>예: "CreateCollection", "CreatePartition", "CreateIndex" 등.</td></tr>
<tr><td>“user_name”</td><td>인증에 사용되는 사용자 이름입니다.</td><td>원하는 사용자 이름을 지정합니다.</td></tr>
<tr><td>“index_task_status”</td><td>메타 스토리지 내 인덱스 작업의 상태입니다.</td><td>"unissued", "in-progress", "failed", "finished" 또는 "recycled".</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana는</a> 모든 데이터 소스와 연동할 수 있는 오픈소스 시각화 스택입니다. 메트릭을 불러와 사용자가 방대한 데이터를 이해하고, 분석하며, 모니터링할 수 있도록 지원합니다.</p>
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
    </button></h2><p>모니터링 및 알림의 기본 워크플로우에 대해 알아본 후, 다음 내용을 학습해 보세요:</p>
<ul>
<li><a href="/docs/ko/monitor.md">모니터링 서비스 배포</a></li>
<li><a href="/docs/ko/visualize.md">Milvus 메트릭 시각화</a></li>
<li><a href="/docs/ko/alert.md">알림 생성</a></li>
</ul>
