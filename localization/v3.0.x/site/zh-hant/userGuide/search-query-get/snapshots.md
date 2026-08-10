---
id: snapshots.md
title: 快照Compatible with Milvus 3.0.x
summary: 使用快照來擷取特定時間點的資料集狀態，以供回滾、版本控制及測試之用。
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
    </button></h1><p>快照是 Milvus 集合在特定時間點的影像，非常適合用於快速回滾、版本控制和測試。它會擷取集合在特定時間戳記下的狀態，並僅儲存元資料和清單檔案（例如模式、索引和向量資料檔案（二進位日誌）），以實現高效的儲存與還原。</p>
<p>快照是資料的快速、特定時間點影像，適用於快速回滾或測試（<strong>數天至數週</strong>）。與此同時，備份則是獨立且完整的副本，會另行儲存以供長期災難復原（<strong>數週至數年</strong>），並能更好地防範儲存系統完全故障。</p>
<p>若要建立備份，請參閱《<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份》</a>。</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">快照結構解析<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 採用基於清單的快照架構，可在不重複實際向量資料的情況下，高效地進行資料的特定時間點擷取、儲存與還原。此架構將元資料管理與實體資料儲存分離，從而實現輕量級快照，這些快照會參照物件儲存中現有的區段檔案。</p>
<p>當您為某個集合建立快照時，Milvus 會收集以下資訊：</p>
<ul>
<li><p><strong>快照元資料</strong></p>
<p>此部分提供建立快照所需的基本資訊，包括快照名稱與描述、目標集合 ID，以及建立快照的時間點。</p></li>
<li><p><strong>集合描述</strong></p>
<p>包含目標集合的描述，包括其資料結構定義、分區資訊及屬性。</p></li>
<li><p><strong>索引資訊</strong></p>
<p>此處儲存索引元資料以及索引檔案的路徑。</p></li>
<li><p><strong>區段資料</strong></p>
<p>此處包含向量資料檔案（binlogs）、刪除日誌（deltalogs）以及索引檔案。</p></li>
</ul>
<p>在上述資訊中，Milvus 會為每個區段產生一個 Apache Avro 清單檔案，並將快照元資料、集合描述、索引資訊以及清單檔案的路徑儲存於 JSON 檔案中。下圖說明了快照的資料夾結構。</p>
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
<p>建立快照通常只需數毫秒，而還原快照則需數秒至數分鐘，具體時間取決於資料量。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">儲存空間的影響與考量<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦 Milvus 引用快照中的某個區段或索引檔案，除非您刪除該快照，否則系統不會對這些檔案進行垃圾回收。快照所佔用的儲存空間與目標集合的大小成正比，且快照保留期間會產生物件儲存成本。在極端情況下，單一快照甚至可能使您的物件儲存成本增加一倍。建議您</p>
<ul>
<li>定期刪除舊快照以節省儲存空間。</li>
<li>使用具描述性的名稱和說明，以便日後參考。</li>
<li>務必驗證快照建立與還原的結果。</li>
<li>追蹤快照的建立時間戳記與儲存空間使用狀況，以利監控與疑難排解。</li>
<li>儲存還原工作 ID，以便進行監控與疑難排解。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">限制與規範<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>快照在建立後即成為不可變更的。</li>
<li>您只能將快照還原至與原始快照位於同一叢集內的新集合中。</li>
<li>還原後的集合將保留相同的資料結構、分片數及區隔數。</li>
<li>還原的歷史資料可能會與 TTL 政策產生衝突。建議您在建立快照前停用 TTL 或調整 TTL 設定。</li>
<li>若要將快照用作「<code translate="no">milvus-table</code> 」的外部來源，該來源快照必須來自標準的 StorageV3 Milvus 集合。外部集合的快照不支援作為「<code translate="no">milvus-table</code> 」的來源。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">延伸閱讀<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/zh-hant/manage-snapshots.md">管理快照</a>— 建立、列出、描述、固定、還原及刪除快照。</li>
<li><a href="/docs/zh-hant/snapshot-use-cases.md">快照使用案例</a>— 常見模式與工作流程。</li>
<li><a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>— 跨叢集的長期備份與還原。</li>
</ul>
