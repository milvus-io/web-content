---
id: mqtype-overview.md
title: 메시지 큐 개요
summary: 'Milvus가 지원하는 메시지 큐(mqType) 옵션에 대한 개요와, 독립형 배포와 분산형 배포 시 각각 어떤 옵션을 사용해야 하는지.'
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">메시지 큐 개요<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 메시지 큐(사전 기록 로그, WAL)를 활용하여 최근 변경 내역 로그와 출력 스트림 로그를 관리하고, 로그 구독 기능을 제공합니다. Milvus 3.x에서는 <strong>Woodpecker가</strong> 기본 메시지 큐로 사용되며, 별도의 메시징 인프라가 필요하지 않습니다. 특정 시나리오의 경우 Pulsar, Kafka 및 RocksMQ도 계속 지원됩니다.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">지원되는 메시지 큐<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>메시지 큐</th><th style="text-align:center">Milvus 독립형</th><th style="text-align:center">Milvus 분산형(클러스터)</th><th>기본값</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ko/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (임베디드)</td><td style="text-align:center">✔️ (내장형 또는 서비스)</td><td><strong>Milvus 3.x</strong> (두 모드 모두)</td><td>기본값이자 권장 설정입니다. 오브젝트 스토리지에 저장되는 클라우드 네이티브 WAL; 외부 서비스가 필요하지 않습니다.</td></tr>
<tr><td><a href="/docs/ko/mq_pulsar.md">펄사</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (클러스터 기본값)</td><td>지원됨(외부 또는 번들).</td></tr>
<tr><td><a href="/docs/ko/mq_kafka.md">카프카</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>지원됨. Kafka 2.x 또는 3.x만 지원됩니다.</td></tr>
<tr><td><a href="/docs/ko/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (독립 실행형 기본값)</td><td><strong>스탠드얼론</strong> 환경 <strong>에서만</strong> 지원됩니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>각 Milvus 인스턴스는 정확히 하나의 메시지 큐를 사용합니다.</p></li>
<li><p><strong>메시지 큐 제한 사항</strong>: Milvus v3.0-beta로 업그레이드할 때는 현재 선택한 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경 기능은 향후 버전에서 제공될 예정입니다.</p></li>
<li><p>실행 중인 인스턴스의 메시지 큐를 변경하려면 <a href="/docs/ko/switch-mq-type.md">‘MQ 유형 전환’을</a> 참조하십시오. MQ 전환 기능은 <strong>Milvus 3.0 이상에서</strong> 사용할 수 있으므로, 먼저 Milvus 3.0 이상으로 업그레이드해야 합니다.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">메시지 큐 선택<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>새 배포(Milvus 3.x):</strong> <strong>Woodpecker</strong> (기본값) <strong>를</strong> 사용하십시오. 독립 실행형(Standalone)의 경우 내장형으로 실행되며, 분산형(클러스터)의 경우 Helm으로 배포된 전용 <a href="/docs/ko/woodpecker.md#Deployment-modes">서비스를</a> 기본값으로 권장하지만, 내장형도 지원됩니다.</li>
<li><strong>기존 Pulsar 또는 Kafka 사용자:</strong> Pulsar와 Kafka는 계속해서 완전히 지원됩니다. 기존 설정을 유지하거나 <a href="/docs/ko/switch-mq-type.md">Woodpecker로 전환하십시오</a>.</li>
<li><strong>RocksMQ:</strong> 독립형 환경에서만 사용 가능하며, Milvus 3.x에서는 내장형 Woodpecker로 대체되었습니다.</li>
</ul>
