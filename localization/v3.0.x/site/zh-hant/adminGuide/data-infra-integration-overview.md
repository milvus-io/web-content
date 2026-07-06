---
id: data-infra-integration-overview.md
title: 資料基礎架構與整合
summary: Milvus 整合的第三方基礎架構概覽——元資料、物件儲存及訊息佇列。
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">資料基礎架構與整合<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 以其核心依賴項為基礎，建構於開放式資料基礎架構之上。本章將介紹您可以插入並進行設定的元件：</p>
<ul>
<li><strong><a href="/docs/zh-hant/etcd.md">元資料</a></strong>— Milvus 將元資料（集合模式、節點狀態、消耗檢查點）儲存於 etcd 中。</li>
<li><strong><a href="/docs/zh-hant/object-storage.md">物件儲存</a></strong>— Milvus 將索引檔案和二進位日誌儲存於 MinIO、AWS S3 或其他相容於 S3 的雲端物件儲存系統中。</li>
<li><strong><a href="/docs/zh-hant/mqtype-overview.md">訊息佇列</a></strong>— Milvus 使用預寫日誌（WAL）：Woodpecker（預設）、Pulsar、Kafka 或 RocksMQ。</li>
</ul>
<p>預設情況下，新的 Milvus 3.x 部署會以<strong>Woodpecker</strong>作為訊息佇列、<strong>etcd</strong>作為元資料儲存，以及<strong>MinIO</strong>作為物件儲存 — 無需額外的訊息傳遞基礎架構。</p>
