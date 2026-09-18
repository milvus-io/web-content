---
id: milvus_backup_upgrade.md
summary: 將 Milvus Backup 從 0.5.x 升級至 0.6.0，更新設定與指令，並驗證備份與還原功能。
title: 將 Milvus Backup 升級至 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">將 Milvus Backup 升級至 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>若要將<strong>Milvus Backup 工具從</strong>0.5.x 升級至 0.6.0，請參閱本指南。本指南不會升級您的 Milvus 伺服器。若您仍使用 0.5.x 版本，請繼續參閱<a href="/docs/zh-hant/milvus_backup_cli.md">0.5.x</a>的<a href="/docs/zh-hant/milvus_backup_cli.md">CLI</a>或<a href="/docs/zh-hant/milvus_backup_api.md">API</a>指南。若為新安裝，請使用<a href="/docs/zh-hant/milvus_backup_0_6_cli.md">0.6.0 指南</a>。</p>
<p>V1 YAML 設定檔仍可透過自動轉換載入。然而，在 0.6.0 版本中，已廢棄的 CLI 參數將不被接受，且 Milvus 3.0 的預設備份格式亦有所變更。在切換排程工作或服務之前，請務必檢視設定檔與指令。</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">檢查起始點<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>請記錄您的 Backup 版本、Milvus 來源與目標版本、設定檔、環境變數覆寫設定、備份位置，以及腳本或 API 服務所使用的指令。請查閱這些伺服器版本的<a href="/docs/zh-hant/milvus_backup_overview.md#Compatibility-matrix">相容性資訊</a>。</p>
<p>在驗證新安裝時，請保留原始的二進位檔、設定檔及現有備份目錄。請透過<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">「取得 Milvus Backup</a>」將 0.6.0 下載至獨立目錄。以下所有指令均從該目錄執行，並呼叫 0.6.0 版本的二進位檔。請將您的 v1 設定檔副本放置於<code translate="no">configs/backup-v1.yaml</code> 。</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">遷移設定<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>v1 配置檔在 0.6.0 中仍可載入。Milvus Backup 會在啟動時將其轉換為 v2 格式，並輸出警告訊息。若要將轉換後的配置檔儲存至獨立檔案：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> 會拒絕無效的遷移後設定檔。若未指定 `<code translate="no">--output</code>`，該命令會將 v2 YAML 寫入標準輸出。請務必在確認設定已正確轉換後，才檢視並使用新檔案。</p>
<table>
<thead>
<tr><th>v1 設定</th><th>v2 設定</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>,<code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>,<code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>來源儲存位置位於<code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>備份儲存位於<code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>儲存憑證</td><td><code translate="no">milvus.storage.auth.*</code> /<code translate="no">backup.storage.auth.*</code> ，並以顯式方式<code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>請在與配置檔案相同的變更中檢視環境變數。V2 僅接受受支援的憑證相關環境變數，例如<code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code> 。舊版 v1 的名稱不會套用至 v2 檔案。對於非憑證設定（例如儲存桶名稱和端點），請使用 YAML 或配置金鑰覆寫：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> 會回報受影響的環境變數，但不會將其機密值複製到輸出檔案中。請參閱<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">受支援的 v2 環境變數</a>。<code translate="no">config show</code> 取代了已廢棄的<code translate="no">check config</code> 指令。</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">更新 CLI 指令<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>在 0.5 版本中已廢棄的旗標，在 0.6.0 版本中將被拒絕。請在升級二進位檔前更新腳本。</p>
<table>
<thead>
<tr><th>指令</th><th>已移除的選項</th><th>替代命令</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> /<code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code>，使用目標名稱</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> /<code translate="no">-d</code></td><td>移除該標誌；<code translate="no">get</code> 將回傳備份資訊</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> /<code translate="no">-c</code></td><td>沒有等效的集合篩選器</td></tr>
</tbody>
</table>
<p>例如，以下 0.5.16 版本的指令會選取來源名稱<code translate="no">coll</code> ：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>其 0.6.0 版本的替代命令則使用目標名稱進行還原：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>若還原篩選器未匹配任何項目，系統仍可能成功退出而不建立集合。請務必檢查目標集合及其資料。HTTP API 的 `<code translate="no">collection_names</code> ` 仍會根據備份中的來源名稱進行篩選；請參閱<a href="/docs/zh-hant/milvus_backup_0_6_api.md#Restore-data">0.6.0 API 指南</a>。</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">選擇備份行為<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>在受支援的 Milvus 2.x 伺服器上，<code translate="no">auto</code> 格式使用二進位日誌。升級備份功能無需遷移至 Milvus 3.0。</li>
<li>在 Milvus 3.0 上，<code translate="no">auto</code> 會選用快照格式。官方的備份與還原支援自 Milvus 3.0.1 起提供。若要在建立備份時保留二進位日誌行為，請傳入<code translate="no">--format binlog</code> 參數。</li>
<li>V1 配置的相容性並不會保留已移除的命令標誌，也不會覆寫新格式的預設值。</li>
<li>用途預設值可設定格式及其他選項。例如，<code translate="no">--for archive</code> 會強制使用二進位日誌，即使同時傳入<code translate="no">--format snapshot</code> 參數亦然。請檢視<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">格式與用途的設定</a>。</li>
<li>備份過程中會跳過外部集合。請檢查備份元資料，而非僅將任務成功視為所有集合均已包含的證明。</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">切換工作前請先驗證<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例保留二進位日誌格式，並還原至新的集合中。請將 `<code translate="no">coll</code> ` 替換為您已記錄其架構、數量、標量與向量值以及搜尋結果的集合。請使用新的備份名稱，並確保目標名稱 `<code translate="no">coll_upgrade_check</code> ` 不存在。</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>確認備份中列有<code translate="no">coll</code> ，且還原後<code translate="no">coll_upgrade_check</code> 確實存在。如有需要，請建立其向量索引、載入該索引，並將還原的資料與搜尋結果與記錄的基準值進行比對。在此測試期間，請保持來源資料不變。</p>
<p>在使用新工具依賴某個現有備份之前，也請先測試一個具代表性的現有備份。以名為<code translate="no">legacy_backup</code> 且包含<code translate="no">coll</code> 的 0.5.16 版備份為例，請使用獨立的目標名稱：</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>這些升級路徑已透過<strong>Milvus 2.6.11</strong>、Backup<strong>0.5.16 → 0.6.0</strong> 以及 MinIO 中的二進位日誌備份進行驗證。無論是新建立的備份還是現有備份，還原後的實體值與向量搜尋結果均與原始資料相符。 這並不代表所有歷史備份或 Milvus 2.x 至 3.0 的還原操作皆具相容性，亦不表示 0.5.x 版本能讀取由 0.6.0 版本所建立的備份。</p>
<p>驗證成功後，請更新工作任務，使其同時使用新的二進位檔、已驗證的設定、環境設定以及替換標誌。 對於 API 部署，請使用已驗證的配置啟動新服務，並透過<a href="/docs/zh-hant/milvus_backup_0_6_api.md">0.6.0 HTTP API</a> 驗證任務是否完成。若要在 Milvus 3.0.1 或更新版本中採用快照，請參閱<a href="/docs/zh-hant/snapshot-backup-and-restore.md">《單一實例中的快照備份與還原》</a>。</p>
