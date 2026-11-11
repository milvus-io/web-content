---
id: milvus_backup_api.md
summary: 了解如何透過 API 使用 Milvus Backup
title: 使用 API 備份與還原資料Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">使用 API 備份與還原資料<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>關於現行工作流程，請參閱<a href="/docs/zh-hant/milvus_backup_0_6_api.md">HTTP API 指南</a>，或<a href="/docs/zh-hant/milvus_backup_upgrade.md">從 0.5.x 版本進行升級</a>。請查閱<a href="/docs/zh-hant/milvus_backup_overview.md#Compatibility-matrix">相容性對照表</a>，以確認受支援的 Milvus 伺服器版本。</p>
<p>Milvus Backup 提供資料備份與還原功能，以確保您的 Milvus 資料安全。</p>
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
    </button></h2><p>您可以下載已編譯的二進位檔，或從原始碼自行編譯。</p>
<p>請從<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">0.5.16 發行版中</a>下載適用於您作業系統與架構的二進位檔。請使用本頁上對應的 0.5.16 配置檔與範例。</p>
<p>若要從原始碼編譯 0.5.16，請安裝 Go 1.25 或更新版本，並執行：</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>下載<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">範例設定檔</a>，並根據您的需求進行調整。</p>
<p>接著在已下載或編譯的 Milvus Backup 二進位檔旁建立一個資料夾，將資料夾命名為 `<code translate="no">configs</code>`，並將設定檔放置於 `<code translate="no">configs</code> ` 資料夾內。</p>
<p>您的資料夾結構應類似如下：</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>此範例使用 MinIO 作為備份儲存空間。請將 `<code translate="no">minio.*</code> ` 設定為與您的 Milvus 儲存空間及備份目的地相符，包括位址、憑證、儲存桶名稱及根目錄路徑。</p>
<div class="alert note">
<p>預設 MinIO 儲存桶的名稱會因您安裝 Milvus 的方式而異。在修改 MinIO 設定時，請務必參照下表。</p>
<table>
<thead>
<tr><th>欄位</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>檔案</td><td>檔案</td></tr>
</tbody>
</table>
</div>
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
    </button></h2><p>接著，您可以按照以下方式啟動 API 伺服器：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>API 伺服器預設監聽 8080 埠。您可以透過使用<code translate="no">-p</code> 參數來變更此設定。若要讓 API 伺服器監聽 443 埠，請依下列步驟操作：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>您可以透過 http://localhost 存取 Swagger UI：<port>/api/v1/docs/index.html。</p>
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
    </button></h2><p>若您執行的是在預設埠 19530 上聆聽的空本地 Milvus 實例，請使用範例 Python 腳本在您的實例中產生一些資料。您可以根據需求自由修改這些腳本。</p>
<p>取得<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">這些腳本</a>後，執行腳本以產生資料。請確保已安裝<a href="https://pypi.org/project/pymilvus/">PyMilvus</a>（Milvus 官方 Python SDK）。</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>此步驟為可選。若您跳過此步驟，請確保您的 Milvus 實例中已有一些資料。</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>請注意，對 Milvus 實例執行 Milvus Backup 通常不會影響該實例的運作。在備份或還原期間，您的 Milvus 實例仍可正常運作。</p>
<p>執行以下指令以建立備份。如有必要，請修改<code translate="no">collection_names</code> 和<code translate="no">backup_name</code> 。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>建立備份的請求為非同步操作。請使用回傳的<code translate="no">requestId</code> 作為<code translate="no">backup_id</code> 來輪詢<code translate="no">get_backup</code> ，並等待<code translate="no">data.state_code</code> 狀態變更為<code translate="no">2</code> 後，再進行還原。</p>
<p>您可以依照以下方式列出 Minio 設定中指定儲存桶內的備份：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>請依下列方式擷取備份元資料：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>請將<code translate="no">backup_id</code> 和<code translate="no">backup_name</code> 替換為您備份的對應值。此端點會傳回 JSON 格式的元資料，而非備份檔案。在歸檔時，請從物件儲存中複製完整的備份目錄。</p>
<p>現在，您可以將備份檔案儲存至安全位置，以便日後還原；或上傳至<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，以您的資料建立受管向量資料庫。詳細資訊請參閱《<a href="https://zilliz.com/doc/migrate_from_milvus-2x">從 Milvus 遷移至 Zilliz Cloud</a>》。</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>您可以透過呼叫還原 API 指令並指定 `<code translate="no">collection_suffix</code> ` 選項，從備份中還原資料以建立新的集合。如有需要，請將 `<code translate="no">collection_names</code> ` 和 `<code translate="no">backup_name</code> ` 替換為實際值。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">collection_suffix</code> 選項可讓您為將建立的新集合設定後綴。上述指令將在您的 Milvus 實例中建立一個名為<strong>hello_milvus_recover</strong>的新集合。</p>
<p>若您希望在不變更名稱的情況下還原備份的集合，請在從備份還原前先刪除該集合。現在您可以執行以下命令，清理「<a href="#Prepare-data">準備資料</a>」步驟中產生的資料。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>接著執行以下命令，從備份中還原資料。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>還原過程可能耗時，具體取決於待還原資料的大小。因此，上述範例使用 `<code translate="no">&quot;async&quot;: true</code>` 來請求異步執行。您可以執行以下指令來檢查還原任務的狀態：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>請務必將 `<code translate="no">test_restore_id</code> ` 替換為還原 API 所回傳的 `<code translate="no">data.id</code> `。在驗證資料之前，請等待 `<code translate="no">data.state_code</code> ` 狀態變為 `<code translate="no">2</code> `；`<code translate="no">3</code> ` 表示失敗，而 `<code translate="no">4</code> ` 則表示超時。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">驗證還原的資料<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>任務成功後，請確認<code translate="no">hello_milvus_recover</code> 是否存在。建立適當的索引、載入集合，並將實體數量、標量與向量值以及搜尋結果，與備份前擷取的原始資料進行比對。若要進行原始名稱還原，請改用<code translate="no">hello_milvus</code> 。</p>
<p>CLI 指南中連結的範例<code translate="no">verify_data.py</code> 預期會有兩個還原的集合，並在最後將其刪除。這不適用於此 API 範例，因為此範例僅選取<code translate="no">hello_milvus</code> 。</p>
