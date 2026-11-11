---
id: milvus_backup_cli.md
summary: 了解如何透過命令列介面 (CLI) 使用 Milvus Backup
title: 使用指令備份與還原資料Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">使用指令備份與還原資料<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>有關當前工作流程，請參閱<a href="/docs/zh-hant/milvus_backup_0_6_cli.md">CLI 指南</a>或<a href="/docs/zh-hant/milvus_backup_upgrade.md">從 0.5.x 版本升級</a>。請查閱<a href="/docs/zh-hant/milvus_backup_overview.md#Compatibility-matrix">相容性對照表</a>，以確認受支援的 Milvus 伺服器版本。</p>
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
<p>請從<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">0.5.16 版本中</a>下載適用於您作業系統與架構的二進位檔。請使用本頁上對應的 0.5.16 配置與範例。</p>
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
    </button></h2><p>若您在預設埠上執行一個空的本地 Milvus 實例，請使用範例 Python 腳本在您的實例中產生一些資料。請隨意對腳本進行必要的修改，以符合您的需求。</p>
<p>取得<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">這些腳本</a>後，執行腳本以產生資料。請確保已安裝<a href="https://pypi.org/project/pymilvus/">PyMilvus</a>（Milvus 官方 Python SDK）。</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>此步驟為可選。若您跳過此步驟，請確保您的 Milvus 實例中已存在一些資料。</p>
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
    </button></h2><p>請注意，對 Milvus 實例執行 Milvus Backup 通常不會影響該實例的運作。在備份或還原期間，您的 Milvus 實例仍可正常運作。</p>
<div class="tab-wrapper"></div>
<p>執行以下指令以建立備份。</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>執行命令後，您可以在 Minio 設定中指定的儲存桶中檢查備份檔案。具體而言，您可以透過<strong>Minio 控制台</strong>或<strong>mc</strong>客戶端下載這些檔案。</p>
<p>若要從<a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio 控制台</a>下載，請登入 Minio 控制台，找到在<code translate="no">minio.backupBucketName</code> 中指定的儲存桶，選取儲存桶內的檔案，然後點擊<strong>「下載」</strong>以完成下載。</p>
<p>若您偏好<a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">使用 mc 客戶端</a>，請依下列步驟操作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可以將備份檔案儲存至安全位置，以便日後還原；或將其上傳至<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，以您的資料建立受管理的向量資料庫。詳細資訊請參閱《<a href="https://zilliz.com/doc/migrate_from_milvus-2x">從 Milvus 遷移至 Zilliz Cloud》</a>。</p>
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
<p>您可以執行<code translate="no">restore</code> 指令並搭配<code translate="no">-s</code> 參數，透過還原備份資料來建立新的集合：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> 標誌可讓您為將要建立的新集合設定後綴。上述指令將在您的 Milvus 實例中建立一個名為<strong>hello_milvus_recover</strong>的新集合。</p>
<p>若您希望在不變更名稱的情況下還原已備份的集合，請在從備份還原之前先刪除該集合。現在您可以執行以下命令，清理「<a href="#Prepare-data">準備資料</a>」階段所產生的資料。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>接著執行以下指令，從備份中還原資料。</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>針對上述建立的一次性範例資料，上游腳本會對<code translate="no">hello_milvus_recover</code> 和<code translate="no">hello_milvus2_recover</code> 進行索引建立與查詢，隨後<strong>刪除兩個已還原的集合</strong>。請務必在透過<code translate="no">_recover</code> 還原兩個範例集合後，才執行此腳本。若為您自己的資料，請勿使用此清理腳本，而是直接與備份時的基準資料進行比對。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>請注意，上述腳本假設您已執行<code translate="no">restore</code> 指令，並附加<code translate="no">-s</code> 旗標，且後綴設定為<code translate="no">_recover</code> 。您可以根據需求自由修改此腳本。</p>
