---
id: storage-v3.md
title: 儲存 V3Compatible with Milvus 3.0.x
summary: 了解哪些 Milvus 3.0 功能需要 Storage V3、如何啟用該功能，以及適用哪些相容性限制。
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">儲存 V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>AI 資料集在建立後往往會持續演進。隨著模型和工作流程的變更，團隊可能需要新增文字、為現有實體產生新的向量場，或使用儲存於 Milvus 外部的資料。要支援這些工作流程，需要一種能隨資料集演進而調整的儲存模型。</p>
<p>Storage V3 在 Milvus 3.0 中提供了此模型。它採用版本化儲存佈局，以整合隨時間新增或重寫的資料，同時應用程式仍可透過相同的 Milvus API 存取集合。</p>
<p>Storage V3 預設為停用狀態。當「<code translate="no">common.storage.useLoonFFI</code> 」生效後，新的寫入操作及壓縮輸出將採用 Storage V3。現有資料將維持在當前佈局中，直到符合條件的資料被背景壓縮程序重寫為止。在此過渡期間，Milvus 可讀取兩種佈局。啟用 Storage V3 是為了使用依賴此功能的特性，而非作為一般的效能優化措施。</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Storage V3 中的資料格式<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 採用清單（manifests）來描述集合資料，使其獨立於底層資料格式。這使得同一個儲存層既能處理由 Milvus 管理的資料，也能處理仍存於外部系統的資料。</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">受管集合的檔案格式<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>對於受管集合，<code translate="no">dataNode.storage.format</code> 會為新的 Storage V3 資料選取檔案格式。此設定支援以下值：</p>
<table>
<thead>
<tr><th>格式</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>預設值，一種廣泛採用的欄位式檔案格式，具備廣泛的生態系統相容性與成熟的工具集。Parquet 將資料組織為列群組，並支援按欄位編碼與壓縮，使 Milvus 能僅讀取所需的欄位，並高效處理大型順序掃描。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>一種可選的次世代列式檔案格式，建基於可擴展、可組合的編碼方式及豐富的統計資訊。在 Milvus 中，Vortex 支援欄位投影、範圍讀取及隨機存取讀取。這些功能可針對合適的工作負載，減少不必要的数据讀取。</td></tr>
</tbody>
</table>
<p>變更「<code translate="no">dataNode.storage.format</code> 」設定將影響新的 Storage V3 寫入作業。現有檔案將維持其現行格式，直至壓縮作業重寫對應的區段為止。除非具代表性的基準測試顯示<code translate="no">vortex</code> 更適合其資料與存取模式，否則多數部署應維持預設的<code translate="no">parquet</code> 格式。</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">外部集合與支援的來源格式<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>外部集合可讓 Milvus 使用儲存於外部檔案或資料表中的資料。Storage V3 支援以下外部來源格式：</p>
<table>
<thead>
<tr><th>格式</th><th>類別</th><th>預期來源</th><th>Storage V3 支援狀況</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>檔案格式</td><td>包含 Parquet 檔案的目錄或物件儲存前綴。</td><td>偵測檔案、讀取其元資料與列群組，並將其記錄於 Storage V3 清單中。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>檔案格式</td><td>包含 Vortex 檔案的目錄或物件儲存前綴。</td><td>偵測檔案，並利用 Vortex 佈局和統計資料進行投影、範圍讀取和隨機存取讀取。</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>表格格式</td><td>一個 Lance 資料集目錄。</td><td>讀取資料集的元資料，並將其片段映射至 Storage V3 清單。</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>表格格式</td><td>一個 Iceberg 元資料 JSON 檔案及其快照 ID。</td><td>解析指定的快照、規劃其資料檔案，並保留位置刪除元資料。不支援等值刪除，必須在刷新外部集合之前將其轉換為位置刪除。</td></tr>
</tbody>
</table>
<p>外部來源為唯讀。Storage V3 會自行建立並更新其清單，而不會修改或複製原始資料。隨後，Milvus 即可透過外部集合建立索引，並針對該資料執行搜尋與查詢。</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">雲端儲存與跨帳戶驗證</h4><p>下表僅說明外部集合如何存取儲存於其他雲端帳戶中的來源資料，並不說明用於 Milvus 管理資料的物件儲存。</p>
<table>
<thead>
<tr><th>雲端儲存</th><th>支援的外部格式</th><th>外部集合的跨帳戶驗證</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>上述四種格式皆支援。</td><td>請指定客戶自有的 IAM 角色 ARN。Storage V3 會使用 AWS STS<code translate="no">AssumeRole</code> 取得臨時憑證，並視需要進行更新。若角色的信任政策有此要求，您亦可提供外部識別碼。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>上述四種格式皆可。</td><td>請指定目標服務帳戶。Storage V3 會以該服務帳戶身分行事，使用其短效 OAuth 存取憑證存取來源儲存桶，並在憑證過期前進行更新。</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>、<code translate="no">vortex</code> 以及<code translate="no">lance-table</code> 。<code translate="no">iceberg-table</code> 目前不支援。</td><td>Milvus 會透過<code translate="no">milvus-tools</code> 私有 gRPC 服務請求短期有效的 SAS 憑證。Storage V3 會使用這些 SAS 憑證存取來源容器，並在憑證過期前進行更新。</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>上述四種格式皆支援。</td><td>Milvus 會透過<code translate="no">milvus-tools</code> 私人 gRPC 服務請求短期有效的 SAS 憑證。Storage V3 會使用這些 SAS 憑證存取來源容器，且憑證會在過期前自動更新。</td></tr>
<tr><td>阿里雲物件儲存服務 (OSS)</td><td>上述四種格式皆支援。</td><td>請指定客戶自有的 RAM 角色 ARN。Storage V3 會透過執行階段的工作負載身分或 ECS RAM 角色來承接該角色，然後使用臨時憑證存取來源儲存桶。</td></tr>
</tbody>
</table>
<p>有關外部收集的設定與使用說明，請參閱<a href="/docs/zh-hant/create-an-external-collection.md">《建立外部收集》</a>。</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">需要 Storage V3 的功能<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>功能</th><th>說明</th><th>所需設定</th></tr>
</thead>
<tbody>
<tr><td>Vortex 檔案格式</td><td>以 Vortex 檔案格式寫入新的受管集合資料。</td><td><ul><li><a href="/docs/zh-hant/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/zh-hant/text.md"><code translate="no">TEXT</code> 欄位</a></td><td>儲存長篇來源文字（例如段落、文件、票證或日誌），無需在集合架構中設定固定的最大長度。</td><td><a href="/docs/zh-hant/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">函式生成的向量欄位</a></td><td>將 BM25 或 MinHash 函數新增至現有集合，以便 Milvus 能從現有的<code translate="no">VARCHAR</code> 欄位生成新的向量欄位。Milvus 會透過背景壓縮，以非同步方式將生成的值填入現有實體中。</td><td><ul><li><a href="/docs/zh-hant/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/zh-hant/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/zh-hant/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/zh-hant/create-an-external-collection.md">外部集合</a></td><td>無需將資料複製到受管集合中，即可查詢儲存於 Milvus 外部的資料。當來源資料變更時，請刷新外部集合。若要公開額外的來源欄位，請參閱「<a href="/docs/zh-hant/alter-external-collection-schema.md">變更外部集合架構</a>」。</td><td><a href="/docs/zh-hant/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">啟用 Storage V3 之前<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>一旦 Milvus 將資料寫入 Storage V3，便不支援降級至無法讀取 Storage V3 的 Milvus 版本。日後停用 Storage V3 並不會立即轉換所有現有的 Storage V3 資料，也不會恢復與舊版本的相容性。</p>
</div>
<p>在啟用 Storage V3 之前，請考慮以下資料行為：</p>
<ul>
<li>由於「<code translate="no">dataCoord.compaction.storageVersion.enabled</code> 」預設為啟用狀態，符合條件的現有資料可透過背景壓縮逐步遷移至 Storage V3。</li>
<li>停用 Storage V3 會變更未來寫入操作及符合條件的壓縮輸出之目標儲存版本。此操作不會同步轉換所有現有的 Storage V3 資料，亦無法確保版本降級的安全性。</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">啟用 Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>請在您的 Milvus 配置中將 `<code translate="no">common.storage.useLoonFFI</code> ` 設定為 `<code translate="no">true</code> `：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 將此設定視為可刷新設定。請透過您的部署所支援的 configuration-update 工作流程套用此變更。僅編輯靜態設定檔並不能保證正在運行的部署已收到新值。</p>
<p>若您計劃將一個函數及其生成的向量場新增至現有集合中，也請啟用現有資料回填所需的兩項壓縮設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>針對現有實體的函式輸出，是透過背景壓縮以非同步方式生成的。即使模式更新成功，也不代表所有現有實體的資料回填都已完成。</p>
<h2 id="Related-documentation" class="common-anchor-header">相關文件<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/zh-hant/text.md">文字欄位</a></li>
<li><a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">變更集合模式</a></li>
<li><a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合</a></li>
<li><a href="/docs/zh-hant/install-overview.md">Milvus 部署選項概覽</a></li>
<li><a href="/docs/zh-hant/upgrade_milvus_standalone-helm.md">使用 Helm 圖表升級 Milvus 獨立版</a></li>
<li><a href="/docs/zh-hant/upgrade_milvus_cluster-helm.md">使用 Helm 圖表升級 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/configure_common.md">與 common 相關的設定</a></li>
<li><a href="/docs/zh-hant/configure_datacoord.md">與 dataCoord 相關的設定</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">為何我們打造 Loon：專為不斷變化的 AI 資料設計的儲存引擎</a>— 關於 Storage V3 設計動機的工程背景說明。</li>
</ul>
