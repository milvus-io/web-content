---
id: milvus_backup_0_6_cli.md
summary: 透過 CLI 設定 Milvus Backup 0.6.0、建立備份，並驗證還原的資料。
title: 使用 Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">使用 Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>使用 Milvus Backup 備份集合，並將其還原至同一或另一個 Milvus 實例。 本指南適用於<strong>Milvus Backup 0.6.0</strong>。Milvus 3.0 上的備份與還原功能自<strong>Milvus 3.0.1</strong> 起獲得官方支援。Backup 0.6.0 亦支援相容的 Milvus 2.x 版本上的二進位日誌工作流程；請參閱<a href="/docs/zh-hant/milvus_backup_overview.md#Compatibility-matrix">Milvus Backup 相容性說明</a>。</p>
<p>若您仍在使用 Backup 0.5.x 版本，請參閱<a href="/docs/zh-hant/milvus_backup_cli.md">0.5.x 命令列介面 (CLI) 指南</a>。若您正在進行升級，請先參閱《<a href="/docs/zh-hant/milvus_backup_upgrade.md">升級 Milvus Backup</a>》。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">取得 Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>請從<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 發行版中</a>下載適用於您作業系統與架構的二進位檔，並將其解壓縮。請將二進位檔與設定範例保留在同一個發行版中。</p>
<p>若要從原始碼編譯，請先安裝<strong>Go 1.26 或更新版本</strong>，然後執行：</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>預編譯二進位檔無需 Go 環境。請從包含 `<code translate="no">milvus-backup</code>` 的目錄中執行後續所有 shell 指令。</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">準備設定檔<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup 需要存取 Milvus 的 gRPC 端點、其管理端點、實例的儲存空間以及備份目的地。若進行快照備份，Milvus 伺服器還需存取備份儲存空間。</p>
<p>建立配置目錄：</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>將此 MinIO 範例儲存為 `<code translate="no">configs/backup.yaml</code>`。請將網址、憑證、儲存桶及根目錄路徑替換為您部署環境的設定。<code translate="no">minioadmin</code> 憑證為 MinIO 測試預設值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> 用於連線至正在備份或還原的實例。若已啟用驗證，請同時設定<code translate="no">milvus.user</code> 和<code translate="no">milvus.password</code> 。</li>
<li><code translate="no">milvus.management.endpoint</code> 用於在備份期間暫停／恢復垃圾回收。</li>
<li><code translate="no">milvus.storage</code> 必須與實例的實際物件儲存位置相符。在此設定儲存桶不會變更 Milvus 的配置。</li>
<li><code translate="no">backup.storage</code> 用於識別備份位置。未設定的欄位將繼承自<code translate="no">milvus.storage</code> ，惟<code translate="no">rootPath</code> 除外，其預設值為<code translate="no">backup</code> 。</li>
<li><code translate="no">transfer.mode: auto</code> 當後端相同時，此設定會選擇儲存端複製；否則則透過 Milvus Backup 進行串流傳輸。此設定控制物件傳輸方式，而非備份格式。</li>
</ul>
<p>以下列出常見的儲存預設值。使用前請先確認您正在運行的部署中的數值。</p>
<table>
<thead>
<tr><th>設定</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>儲存桶</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>根目錄路徑</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>若 Milvus 伺服器使用不同的位址來存取備份儲存庫，請將 `<code translate="no">backup.storage.milvusAddress</code> ` 和 `<code translate="no">milvusPort</code> ` 設定為伺服器可存取的位址。有關驗證、TLS、其他儲存供應商及額外設定，請參閱<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 版配置範例</a>。</p>
<p>檢查實際值並驗證連線狀態：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> 會遮罩機密值，並報告各值的來源。連線性檢查應顯示<code translate="no">Success!</code> 。在建立備份前，請先解決連線或儲存相關的錯誤。</p>
<p>關於現有的 v1 設定，請參閱《<a href="/docs/zh-hant/milvus_backup_upgrade.md#Migrate-the-configuration">升級 Milvus 備份</a>》。自動設定轉換功能無法取代已被移除的 CLI 參數。</p>
<h2 id="Prepare-data" class="common-anchor-header">準備資料<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>請使用名為<code translate="no">coll</code> 的現有集合，並確保不存在<code translate="no">coll_bak</code> 。在備份前，請記錄資料結構、實體數量、具代表性的標量與向量值，以及已知的搜尋結果。在比對還原副本時，請保持範例資料不變。若要建立小型一次性資料集，請參閱「<a href="/docs/zh-hant/snapshot-backup-and-restore.md#Prepare-sample-data">準備範例資料</a>」。</p>
<h2 id="Back-up-data" class="common-anchor-header">備份資料<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>建立名為<code translate="no">coll</code> 的備份：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>建立指令應回報<code translate="no">create backup success</code> 。執行<code translate="no">get</code> 可檢視備份元資料；請確認預期中的集合確實存在。若省略<code translate="no">--filter</code> ，系統將備份所有符合條件的集合。外部集合將被跳過。</p>
<p><code translate="no">--filter</code> 接受以逗號分隔的名稱：<code translate="no">coll</code> （位於預設資料庫中）、<code translate="no">db1.coll</code> ，或<code translate="no">'db1.*'</code> （備份資料庫中的所有集合）。若要防止 shell 擴展，請將包含<code translate="no">*</code> 的模式用引號括起來。</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">選擇備份格式或目的<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>使用預設的<code translate="no">--format auto</code> 時，Milvus 3.0 會採用快照備份；受支援的 Milvus 2.x 伺服器則使用二進位日誌（binlog）。若要明確保留二進位日誌的運作行為，請傳入<code translate="no">--format binlog</code> 。此<a href="/docs/zh-hant/snapshot-backup-and-restore.md">快照範例明確</a>選用了<code translate="no">--format snapshot</code> 。</p>
<p>當備份目的符合您的工作流程時，請使用 `<code translate="no">--for</code> `：</p>
<table>
<thead>
<tr><th>用途</th><th>預設值所套用的參數</th><th>預期用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>啟用 RBAC 備份；保留您的格式與策略選擇</td><td>將資料複製至另一實例；<code translate="no">auto</code> 會於 Milvus 3.0 上使用快照功能</td></tr>
<tr><td><code translate="no">archive</code></td><td>強制使用<code translate="no">binlog</code> 並啟用 RBAC 備份</td><td>保留二進位日誌格式備份，以便日後還原</td></tr>
<tr><td><code translate="no">secondary</code></td><td>強制啟用<code translate="no">binlog</code> 、<code translate="no">bulk_flush</code> 、RBAC 備份，以及索引額外元資料</td><td>在已配置的複製拓撲中初始化次要節點</td></tr>
</tbody>
</table>
<p>例如：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>預設值會覆寫其所修訂選項中的衝突值。例如，<code translate="no">--for archive --format snapshot</code> 會產生二進位日誌備份。備份 RBAC 元資料並不會自動還原該資料；如有需要，請使用 restore 指令的<code translate="no">--rbac</code> 選項。</p>
<p><code translate="no">secondary</code> 並非一般跨實例還原的捷徑。此操作還需存取來源 etcd 以取得索引元資料、正確的複製叢集 ID 與通道，以及一個全新的次要目標。備份必須保留完整的元資料，包括 `<code translate="no">meta/full_meta.json</code>`。複製設定與故障轉移的操作不在本指南範圍內。 有關特定版本的實作與需求，請參閱<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0 的原始碼與參考文件</a>。</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">完整保留備份<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>備份儲存於<code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code> 目錄下。請完整保留此目錄中的所有物件。快照備份包含已匯出的套件以及元資料。</p>
<p>請勿僅複製元資料檔案，亦勿假設快照備份與二進位日誌備份具有相同的結構。</p>
<h2 id="Restore-data" class="common-anchor-header">還原資料<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>將 `<code translate="no">coll</code> ` 還原至已配置實例中的 `<code translate="no">coll_bak</code> `：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>在 CLI 中，<code translate="no">--filter</code> 會與在套用<code translate="no">-s</code> 或<code translate="no">--rename</code> <strong>之後的名稱</strong>相符。包含<code translate="no">--filter coll -s _bak</code> 的指令將無法找到任何匹配項目，並可在不還原任何集合的情況下成功退出。</p>
<p>若要使用原始名稱還原，請選擇一個該集合名稱不存在的目標位置，將設定指向該目標位置及備份位置，並省略後綴：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>有關完整的同一實例範例，請參閱《<a href="/docs/zh-hant/snapshot-backup-and-restore.md">單一實例中的快照備份與還原</a>》。 現有的跨實例通用案例頁面採用 Backup 0.5.16 及 v1 配置；請勿將其命令直接套用至 0.6.0 版本。有關 0.6.0 的轉移配置，請<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">參閱各版本的轉移指南</a>。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">驗證還原資料<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>確認 `<code translate="no">coll_bak</code> ` 是否存在。若還原過程未重新建立其向量索引，請在載入集合前，根據您的模式建立適當的索引。將其模式、實體數量、標量與向量值，以及已知的搜尋結果，與備份前擷取的基準資料進行比對。</p>
<p>對於可拋棄的 256 個實體資料集，請使用「<a href="/docs/zh-hant/snapshot-backup-and-restore.md#Verify-the-result">驗證結果</a>」中的完整檢查步驟。僅憑命令執行成功，並不能證明已還原預期中的資料。</p>
