---
id: milvus_backup_0_6_api.md
summary: 透過 HTTP API 建立並監控 Milvus Backup 0.6.0 的備份與還原任務。
title: 使用 Milvus Backup 0.6.0 HTTP API
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">使用 Milvus Backup 0.6.0 HTTP API<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>使用 Milvus Backup HTTP API 來建立備份、還原集合，以及監控非同步任務。以下快照範例使用<strong>Milvus Backup 0.6.0</strong>搭配<strong>Milvus 3.0.1 或更新版本</strong>。若使用 Backup 0.5.x 版本，請參閱<a href="/docs/zh-hant/milvus_backup_api.md">0.5.x API 指南</a>。 若為現有安裝環境，請參閱《<a href="/docs/zh-hant/milvus_backup_upgrade.md">升級 Milvus Backup》</a>。</p>
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
    </button></h2><p>從<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 發行版</a>下載並解壓縮適當的二進位檔。若要從原始碼編譯，請參閱「<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">取得 Milvus Backup</a>」；編譯需使用 Go 1.26 或更新版本。</p>
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
    </button></h2><p>請參照「<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Prepare-configuration-file">準備配置檔案</a>」中的 v2 範例，建立<code translate="no">configs/backup.yaml</code> <a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Prepare-configuration-file">檔案</a>。設定對 Milvus、實例儲存空間及備份目的地的存取權限。此外，Milvus 伺服器必須能夠存取備份儲存空間，以便執行快照操作。</p>
<p>若您已有 v1 格式的設定檔，該檔案仍可載入。在變更其資料結構或環境變數之前，請參閱<a href="/docs/zh-hant/milvus_backup_upgrade.md#Migrate-the-configuration">《遷移設定》</a>。</p>
<p>從包含二進位檔的目錄中，檢視設定並檢查連線狀態：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>當連線檢查回報「<code translate="no">Success!</code> 」時，即可繼續。</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">啟動 API 伺服器<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>使用您已檢查過的設定啟動服務：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>預設埠號為 8080。若要選擇其他埠號，請使用<code translate="no">-p</code> ：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>針對特定服務，僅需執行其中一個指令。以下範例使用 8080 埠；若您選擇了其他埠，請修改其 URL。Swagger UI 可透過<code translate="no">http://localhost:8080/api/v1/docs/index.html</code> 存取。</p>
<p>在輪詢任務期間，請保持服務持續運行。任務 ID 和即時進度屬於服務程序；程序停止後，持久化的備份仍會保留在物件儲存中。</p>
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
    </button></h2><p>請使用名為<code translate="no">coll</code> 的現有集合，或依照「<a href="/docs/zh-hant/snapshot-backup-and-restore.md#Prepare-sample-data">準備範例資料</a>」中的說明建立包含 256 個實體的測試集合。若使用您自己的資料，請在請求中修改集合名稱。驗證結果時，請保持測試資料不變。</p>
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
    </button></h2><p>提交一個非同步備份請求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>回應中包含一個<code translate="no">requestId</code> 。提交請求並不代表備份已完成。將該值複製到<code translate="no">backup_id</code> 並進行輪詢：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>等待<code translate="no">data.state_code</code> 變為<code translate="no">2</code> 。此 API 使用以下任務狀態：</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>含義</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>初始</td></tr>
<tr><td><code translate="no">1</code></td><td>執行中</td></tr>
<tr><td><code translate="no">2</code></td><td>成功</td></tr>
<tr><td><code translate="no">3</code></td><td>失敗</td></tr>
<tr><td><code translate="no">4</code></td><td>超時</td></tr>
</tbody>
</table>
<p>請同時檢查回應內容與任務狀態。僅有 HTTP 200 狀態碼並不足夠：若回應中的 `<code translate="no">code</code> ` 值不為零，即表示發生錯誤。成功回應可省略 `<code translate="no">code</code> `，因其值為零。若任務失敗或超時，請在從該備份還原前，先檢查回應詳情與伺服器日誌。</p>
<p>列出儲存的備份，並按名稱檢查已完成的備份：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> 此操作會返回包含<code translate="no">collection_backups</code> 的 JSON 元資料；<strong>不會</strong>下載備份檔案。對於由其他程序所建立的備份，僅查詢名稱可能會返回不含即時任務進度的元資料。監控正在進行的備份時，請使用當前服務的建立回應中所提供的任務 ID。</p>
<p>預設格式為<code translate="no">auto</code> ，此格式在 Milvus 3.0 上會選取快照。若要明確請求二進位日誌，請在 create 請求主體中加入<code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> 。CLI 中的<code translate="no">--for</code> 預設值並非 HTTP 請求欄位。</p>
<p>若要保留或移動備份，請將整個目錄複製至物件儲存中。請參閱<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">0.6.0</a> 版本<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">的傳輸指南</a>。</p>
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
    </button></h2><p>請確保<code translate="no">coll_bak</code> 尚未存在。提交包含後綴的還原請求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>HTTP<code translate="no">collection_names</code> 欄位會在套用後綴<strong>前，從備份中</strong>選取名稱。此請求會選取<code translate="no">coll</code> 並建立<code translate="no">coll_bak</code> 。CLI 的<code translate="no">--filter</code> 則是在重新命名後匹配目標名稱；請勿將<code translate="no">coll_bak</code> 代入此 HTTP 欄位。</p>
<p>從還原回應中複製<code translate="no">data.id</code> ，並查詢該任務：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>等待<code translate="no">data.state_code: 2</code> 完成，並前往<code translate="no">collection_restore_tasks</code> 確認是否出現預期的目標集合。已提交的任務並不代表還原已通過驗證。</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">以原始名稱進行還原<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>請選用一個不存在<code translate="no">coll</code> 的目標實例。啟動一個針對該目標及已完成備份位置所配置的獨立備份 API 服務，然後向該目標服務傳送此請求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>使用回傳的任務 ID 在同一服務上查詢<code translate="no">get_restore</code> 。為還原目標設定<code translate="no">milvus.*</code> ，並為現有備份設定<code translate="no">backup.storage</code> 。請參閱<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Prepare-configuration-file">「準備設定檔</a>」。</p>
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
    </button></h2><p>還原任務成功後，請連線至目標 Milvus 執行個體，並驗證預期的集合與資料是否存在。針對 256 個實體的測試集合，請參照<a href="/docs/zh-hant/snapshot-backup-and-restore.md#Verify-the-result">「驗證結果</a>」中的完整標量、向量及搜尋檢查步驟。</p>
<p>若以原始名稱進行還原，請將<code translate="no">coll_bak</code> 改為<code translate="no">coll</code> 。驗證程式碼會讀取還原後的資料，但不會刪除該資料。對於生產環境資料，請與備份時擷取的基準資料進行比對。</p>
