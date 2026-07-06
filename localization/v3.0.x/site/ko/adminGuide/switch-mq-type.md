---
id: switch-mq-type.md
title: MQ 유형 변경
summary: 가동 중단 없이 기존 Milvus 배포 환경의 메시지 큐를 Woodpecker와 다른 메시지 큐 간에 전환합니다.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">MQ 유형 변경<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 기존 Milvus 배포 환경의 메시지 큐(MQ)를 <strong>Woodpecker와 다른 메시지 큐 간에</strong> 가동 중지 시간 없이 온라인 상태로 전환하는 방법을 설명합니다.</p>
<div class="alert warning">
<p>이 기능은 출시 예정이며 변경될 수 있습니다. 기능을 사용해 보시거나 궁금한 점이 있으시면 Milvus 지원팀에 문의해 주십시오.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><strong>MQ 전환 기능은 Milvus 3.0 이상 버전에서 사용할 수 있습니다.</strong> 이 기능을 사용하기 전에 Milvus 인스턴스를 Milvus 3.0 이상으로 업그레이드하십시오. 이전 버전에서는 이 기능을 사용할 수 없습니다.</li>
<li>인스턴스가 정상적으로 실행 중이어야 합니다.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">적용 범위<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 <strong>Woodpecker와 다른 메시지 큐 간의</strong> 전환에 대해서만 다룹니다. Pulsar와 Kafka 간의 직접적인 전환은 이 가이드의 범위에 포함되지 않습니다.</p>
<ul>
<li><a href="/docs/ko/switch-rocksmq-woodpecker.md">RocksMQ와 Woodpecker 간 전환</a> — Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/ko/switch-pulsar-woodpecker.md">Pulsar와 Woodpecker 간 전환</a> — Milvus 클러스터 (Helm / Milvus Operator)</li>
<li><a href="/docs/ko/switch-kafka-woodpecker.md">Kafka와 Woodpecker 간 전환</a> — Milvus 클러스터 (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">일반적인 워크플로우<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Milvus 인스턴스가 정상적으로 실행 중인지 확인하십시오.</li>
<li>소스 MQ 유형과 대상 MQ 유형을 확인합니다.</li>
<li><code translate="no">mqType</code> 값을 변경하지 <strong>않고</strong> 대상 MQ의 액세스 설정을 Milvus 구성에 반영합니다.</li>
<li>MixCoord에서 WAL alter API를 호출하여 전환을 트리거합니다.</li>
<li>로그를 모니터링하여 전환이 완료되었는지 확인합니다.</li>
</ol>
<div class="alert note">
<p>전환하기 전에, 대상 MQ에 현재 Milvus 인스턴스에서 사용하는 것과 동일한 이름의 토픽이 포함되어 있지 않은지 확인하십시오. 대상 MQ가 다른 Milvus 인스턴스에서 사용된 적이 있는 경우, 토픽 이름 충돌로 인해 예기치 않은 동작이 발생할 수 있으므로 이 점은 특히 중요합니다.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">지원 매트릭스<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>소스 MQ</th><th>대상 MQ</th><th>배포</th><th>상태</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (로컬/MinIO)</td><td>독립형 (Docker Compose)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Woodpecker (로컬/MinIO)</td><td>RocksMQ</td><td>독립형 (Docker Compose)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Pulsar (내장/외부)</td><td>Woodpecker (MinIO)</td><td>클러스터 (Helm / Operator)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (외부)</td><td>클러스터 (Helm / Operator)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Kafka (내장/외부)</td><td>Woodpecker (MinIO)</td><td>클러스터 (Helm / Operator)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>카프카 (외부)</td><td>클러스터 (Helm / Operator)</td><td><strong>지원됨</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker 로컬 (또는 그 반대)</td><td>어느 것이든</td><td><strong>지원되지 않음</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>MQ 유형을 반복적으로 전환하지 마십시오. 전환이 필요한 경우, 전환 전마다 관련 데이터를 반드시 정리하십시오. 잔여 데이터로 인해 예기치 않은 동작이 발생할 수 있습니다.</p>
</div>
