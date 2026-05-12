---
id: snapshots.md
title: 快照Compatible with Milvus 3.0.x
summary: 使用快照來擷取時間點的收集狀態，以進行回溯、版本編輯及測試。
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">快照<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>快照是 Milvus 收集的時間點影像，是快速回滾、版本控制和測試的理想選擇。它擷取集合在特定時間戳的狀態，並只儲存元資料和艙單檔案，例如模式、索引和向量資料檔案 (binlog)，以便有效儲存和還原。</p>
<div class="alert note">
<p>快照是資料的快速、時間點映像，適用於快速回溯或測試<strong>（數天至數週</strong>）。與此同時，備份是獨立、完整的複本，可分開儲存，用於長期災難復原<strong>(數週至數年</strong>)，並能更好地保護儲存免受完全故障的影響。</p>
<p>要建立備份，請參考<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>。</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">快照解剖<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 實作了一個以艙單為基礎的快照架構，可在不複製實際向量資料的情況下，有效率地進行時間點擷取、儲存和資料還原。此架構將元資料管理與實體資料儲存分離，使輕量級快照能夠參考物件儲存中的現有段檔案。</p>
<p>當您為一個集合建立快照時，Milvus 會收集下列內容：</p>
<ul>
<li><p><strong>快照元資料</strong></p>
<p>提供建立快照的基本資訊，包括快照名稱和描述、目標集合 ID，以及建立快照的時間點。</p></li>
<li><p><strong>集合描述</strong></p>
<p>它包含目標集合的描述，包括其模式定義、分割資訊和屬性。</p></li>
<li><p><strong>索引資訊</strong></p>
<p>它儲存索引元資料和索引檔案的路徑。</p></li>
<li><p><strong>區段資料</strong></p>
<p>它擷取向量資料檔案 (binlogs)、刪除記錄 (deltalogs) 和索引檔案。</p></li>
</ul>
<p>在上述資訊中，Milvus 會為每個區段產生 Apache Avro 艙單檔，並將快照元資料、集合描述、索引資訊以及艙單檔的路徑儲存於 JSON 檔案中。下圖說明快照資料夾結構。</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>建立快照通常需要幾毫秒，還原快照則需要幾秒到幾分鐘，視資料量而定。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">儲存的影響與注意事項<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦 Milvus 在快照中引用了段或索引文件，除非您丟棄快照，否則它不會收集這些文件。快照消耗的儲存空間與目標集合的大小成正比，而物件儲存成本適用於快照保留。在極端情況下，單一快照甚至會使您的物件儲存成本加倍。建議您</p>
<ul>
<li>定期移除舊的快照，以節省儲存空間。</li>
<li>使用描述性的名稱和說明，以供日後參考。</li>
<li>經常驗證建立及還原快照的結果。</li>
<li>追蹤建立快照的時間戳記、儲存使用量和還原工作 ID，以便監控和疑難排解。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">限制和約束<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>快照在建立後即不可變更。</li>
<li>您只能將快照還原到與原始快照位於同一群集中的新集合。</li>
<li>還原的集合會保留相同的模式、分片數量和分割計數。</li>
<li>還原的歷史資料可能與 TTL 政策衝突。建議您在建立快照前停用 TTL 或調整 TTL 設定。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">進一步閱讀<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/zh-hant/manage-snapshots.md">管理</a>快照 - 建立、列出、還原及刪除快照。</li>
<li><a href="/docs/zh-hant/snapshot-use-cases.md">快照使用案例</a>- 常見的模式和工作流程。</li>
<li><a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>- 跨叢集的長期備份與還原。</li>
</ul>
