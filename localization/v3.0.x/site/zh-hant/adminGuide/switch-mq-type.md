---
id: switch-mq-type.md
title: 切換訊息佇列 (MQ) 類型
summary: 在不造成服務中斷的情況下，將現有 Milvus 部署的訊息佇列從 Woodpecker 切換至另一個訊息佇列。
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">切換訊息佇列 (MQ) 類型<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何將現有 Milvus 部署中的訊息佇列 (MQ)<strong>在 Woodpecker 與其他訊息佇列之間</strong>切換，且能在線上進行，無需停機。</p>
<div class="alert warning">
<p>此功能尚待發布，相關內容可能有所變更。若您想試用此功能或有任何疑問，請聯絡 Milvus 技術支援。</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>「切換訊息佇列」功能僅適用於 Milvus 3.0 及後續版本。</strong>使用前請將您的 Milvus 執行個體升級至 Milvus 3.0 或後續版本——此功能在較早版本中不可用。</li>
<li>該實例運作正常。</li>
</ul>
<h2 id="Scope" class="common-anchor-header">適用範圍<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南僅涵蓋<strong>在 Woodpecker 與其他訊息佇列之間</strong>切換的情況。Pulsar 與 Kafka 之間的直接切換不在本指南範圍內。</p>
<ul>
<li><a href="/docs/zh-hant/switch-rocksmq-woodpecker.md">在 RocksMQ 與 Woodpecker 之間切換</a>— Milvus 獨立部署 (Docker Compose)</li>
<li><a href="/docs/zh-hant/switch-pulsar-woodpecker.md">在 Pulsar 與 Woodpecker 之間切換</a>— Milvus 叢集（Helm / Milvus Operator）</li>
<li><a href="/docs/zh-hant/switch-kafka-woodpecker.md">在 Kafka 與 Woodpecker 之間切換</a>— Milvus 叢集（Helm / Milvus Operator）</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">一般工作流程<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
<li>確保 Milvus 實例運作正常。</li>
<li>確認來源 MQ 類型與目標 MQ 類型。</li>
<li>將目標 MQ 的存取設定套用至 Milvus 配置中，<strong>同時不</strong>變更 `<code translate="no">mqType</code> ` 的值。</li>
<li>透過在 MixCoord 上呼叫 WAL alter API 來觸發切換。</li>
<li>監控日誌以確認切換已完成。</li>
</ol>
<div class="alert note">
<p>切換前，請確保目標 MQ 中不包含與當前 Milvus 執行個體所使用名稱相同的話題。若目標 MQ 曾被其他 Milvus 執行個體使用過，此點尤為重要，因為話題名稱衝突可能導致預期之外的行為。</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">支援矩陣<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>來源 MQ</th><th>目標訊息佇列</th><th>部署</th><th>狀態</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker（本地／MinIO）</td><td>獨立部署 (Docker Compose)</td><td><strong>受支援</strong></td></tr>
<tr><td>Woodpecker（本地／MinIO）</td><td>RocksMQ</td><td>獨立模式（Docker Compose）</td><td><strong>受支援</strong></td></tr>
<tr><td>Pulsar（內建／外部）</td><td>Woodpecker（MinIO）</td><td>叢集 (Helm / Operator)</td><td><strong>已支援</strong></td></tr>
<tr><td>Woodpecker（MinIO）</td><td>Pulsar（外部）</td><td>叢集（Helm / Operator）</td><td><strong>已支援</strong></td></tr>
<tr><td>Kafka（內建／外部）</td><td>Woodpecker (MinIO)</td><td>叢集（Helm／Operator）</td><td><strong>已支援</strong></td></tr>
<tr><td>Woodpecker（MinIO）</td><td>Kafka（外部）</td><td>叢集（Helm / Operator）</td><td><strong>已支援</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker 本地（或反之）</td><td>任何</td><td><strong>不支援</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>請避免反覆切換訊息佇列類型。若確實需要切換，請務必在每次切換前清理相關資料——殘留資料可能會導致預期之外的行為。</p>
</div>
