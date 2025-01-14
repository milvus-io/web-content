---
id: milvus_backup_cli.md
summary: 學習如何透過 CLI 使用 Milvus 備份
title: 使用命令備份和還原資料
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">使用命令備份和還原資料<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup 提供資料備份和還原功能，以確保您的 Milvus 資料安全。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">取得 Milvus 備份<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以下載已編譯的二進位檔或從原始碼建立。</p>
<p>要下載編譯後的二進位檔，請前往<a href="https://github.com/zilliztech/milvus-backup/releases">發行版頁</a>面，在那裡您可以找到所有官方發行版。請記住，請務必使用標示為<strong>最新版本的</strong>二進位檔。</p>
<p>從原始碼編譯的步驟如下：</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">準備組態檔案<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>下載<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">範例組態檔案</a>，並依您的需求進行調整。</p>
<p>然後在已下載或已建立的 Milvus Backup 二進位檔旁邊建立一個資料夾，將資料夾名稱為<code translate="no">configs</code> ，並將設定檔放在<code translate="no">configs</code> 資料夾內。</p>
<p>您的資料夾結構應與以下相似：</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>由於 Milvus Backup 無法將您的資料備份至本機路徑，因此在調整組態檔時，請確保 Minio 設定正確。</p>
<div class="alert note">
<p>預設 Minio 資料桶的名稱會因您安裝 Milvus 的方式而異。變更 Minio 設定時，請務必參考下表。</p>
<table>
<thead>
<tr><th>欄位</th><th>Docker Compose</th><th>Helm / Milvus 操作員</th></tr>
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
    </button></h2><p>如果您在預設的連接埠執行一個空的本機 Milvus 實例，請使用範例 Python 腳本在您的實例中產生一些資料。請隨意對腳本進行必要的修改，以符合您的需求。</p>
<p>獲取<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">腳本</a>。然後執行腳本來產生資料。確保已安裝官方的 Milvus Python SDK<a href="https://pypi.org/project/pymilvus/">PyMilvus</a>。</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>此步驟是可選的。如果跳過此步驟，請確保您的 Milvus 實例中已經有一些資料。</p>
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
    </button></h2><p>請注意，針對 Milvus 實例執行 Milvus Backup 通常不會影響實例的執行。在備份或還原時，您的 Milvus 實例是完全正常的。</p>
<div class="tab-wrapper"></div>
<p>執行以下命令來建立備份。</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>命令執行後，您可以檢查 Minio 設定中指定的資料桶中的備份檔案。具體來說，您可以使用<strong>Minio 主控台</strong>或<strong>mc</strong>用戶端下載它們。</p>
<p>若要從 Minio<a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">主控台</a>下載，請登入 Minio 主控台，找到<code translate="no">minio.address</code> 中指定的資料桶，選擇資料桶中的檔案，然後按一下「<strong>下載」</strong>以下載它們。</p>
<p>如果您偏好<a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc 用戶端</a>，請執行下列步驟：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可以將備份檔案儲存至安全的地方，以便將來還原，或上傳至<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，以您的資料建立受管理的向量資料庫。詳情請參閱<a href="https://zilliz.com/doc/migrate_from_milvus-2x">從 Milvus 遷移到 Zilliz Cloud</a>。</p>
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
<p>您可以使用<code translate="no">-s</code> 標誌執行<code translate="no">restore</code> 指令，從備份中還原資料來建立新的集合：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> 標誌允許您為要建立的新集合設定後綴。上述命令將在您的<strong>Milvus</strong>實例中建立一個新的資料集，名稱為<strong>hello_milvus_recover</strong>。</p>
<p>如果您希望還原已備份的資料集而不更改其名稱，請在從備份還原資料集之前刪除該資料集。現在您可以執行以下指令，清理在<a href="#Prepare-data">準備資料</a>中產生的資料。</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>然後執行以下命令從備份還原資料。</p>
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
    </button></h2><p>還原完成後，您可以按以下方式為還原的資料集編製索引，以驗證還原的資料：</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>請注意，上述腳本假設您已執行<code translate="no">restore</code> 指令，並加上<code translate="no">-s</code> 標誌，且後綴設定為<code translate="no">-recover</code> 。請隨意對腳本進行必要的變更，以符合您的需求。</p>
