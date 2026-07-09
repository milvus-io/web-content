---
id: mqtype-overview.md
title: 訊息佇列概覽
summary: 概述 Milvus 支援的訊息佇列 (mqType) 選項，以及在獨立部署與分散式部署中應選用哪一種。
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">訊息佇列概覽<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 仰賴訊息佇列（預寫日誌，WAL）來管理近期變更的日誌、輸出串流日誌，並提供日誌訂閱功能。在 Milvus 3.x<strong>中，Woodpecker</strong>是預設的訊息佇列，無需額外的訊息傳遞基礎架構。Pulsar、Kafka 和 RocksMQ 仍針對特定情境提供支援。</p>
<h2 id="Supported-message-queues" class="common-anchor-header">支援的訊息佇列<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>訊息佇列</th><th style="text-align:center">Milvus 獨立執行模式</th><th style="text-align:center">Milvus 分散式（叢集）</th><th>預設於</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh-hant/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️（嵌入式）</td><td style="text-align:center">✔️（內嵌或服務）</td><td><strong>Milvus 3.x</strong>（兩種模式皆適用）</td><td>預設且推薦的選項。基於物件儲存的雲原生 WAL；無需外部服務。</td></tr>
<tr><td><a href="/docs/zh-hant/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x（叢集預設）</td><td>受支援，可選用外部服務或內建方案。</td></tr>
<tr><td><a href="/docs/zh-hant/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>受支援。僅限 Kafka 2.x 或 3.x。</td></tr>
<tr><td><a href="/docs/zh-hant/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x（獨立執行模式預設）</td><td><strong>僅</strong>支援<strong>獨立執行模式</strong>。</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>每個 Milvus 執行個體僅使用一個訊息佇列。</p></li>
<li><p><strong>訊息佇列限制</strong>：升級至 Milvus v3.0-beta 時，您必須維持當前的訊息佇列選擇。升級過程中不支援在不同的訊息佇列系統之間切換。未來版本將支援變更訊息佇列系統。</p></li>
<li><p>若要變更正在運行的實例所使用的訊息佇列，請參閱「<a href="/docs/zh-hant/switch-mq-type.md">切換 MQ 類型</a>」。「切換 MQ」功能僅在<strong>Milvus 3.0 及後續版本中</strong>提供 — 請先升級至 Milvus 3.0 或後續版本。</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">選擇訊息佇列<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>新部署（Milvus 3.x）：</strong>請使用<strong>Woodpecker</strong>（預設值）。獨立執行時會以嵌入式方式運行；對於分散式（叢集）環境，建議的預設方式是透過 Helm 部署專用<a href="/docs/zh-hant/woodpecker.md#Deployment-modes">服務</a>，同時也支援嵌入式模式。</li>
<li><strong>現有 Pulsar 或 Kafka 使用者：</strong>Pulsar 和 Kafka 仍獲得完整支援。您可以繼續使用，或<a href="/docs/zh-hant/switch-mq-type.md">切換至 Woodpecker</a>。</li>
<li><strong>RocksMQ：</strong>僅限獨立執行模式，且已由 Milvus 3.x 中的內嵌 Woodpecker 所取代。</li>
</ul>
