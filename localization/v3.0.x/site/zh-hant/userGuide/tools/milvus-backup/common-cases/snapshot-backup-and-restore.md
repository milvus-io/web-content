---
id: snapshot-backup-and-restore.md
summary: 備份一個收藏集，並在同一個 Milvus 實例中以新名稱還原該收藏集。
title: 在單一實例中進行快照備份與還原
---
<h1 id="Snapshot-Backup-and-Restore-in-One-Instance" class="common-anchor-header">在單一實例中進行快照備份與還原<button data-href="#Snapshot-Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
    </button></h1><p>在同一個 Milvus 實例中備份一個集合，並以新名稱還原該集合。本範例使用<strong>Milvus Backup 0.6.0</strong>建立<code translate="no">coll</code> 的快照，並在<strong>Milvus 3.0.1 或更新版本中</strong>將其還原為<code translate="no">coll_bak</code> 。若使用 Backup 0.5.x<a href="/docs/zh-hant/single-instance-backup-and-restore.md">，請參閱「單一實例中的備份與還原」</a>。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
<tr><th>位置</th><th>Milvus 實例</th><th>物件儲存庫</th><th>儲存桶</th><th>根路徑</th></tr>
</thead>
<tbody>
<tr><td>來源資料</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
<tr><td>由來源建立的備份</td><td>—</td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">backup/my_backup</code></td></tr>
<tr><td>還原資料</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
</tbody>
</table>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>請使用 Milvus Backup 0.6.0 及 Milvus 3.0.1 或更新版本。請依照<a href="/docs/zh-hant/milvus_backup_0_6_cli.md">《使用命令備份與還原資料》</a>中的說明安裝該工具。</li>
<li>請使用名為<code translate="no">coll</code> 的現有集合，或建立下方的可選範例集合。在比較來源與還原結果時，請保持其資料不變。</li>
<li>請確保 Milvus Backup 可存取 Milvus 的 gRPC 埠 (19530)、管理埠 (9091) 以及物件儲存空間。此外，Milvus 伺服器也必須能夠存取備份儲存空間，以便進行快照的匯出與匯入。</li>
<li>請將範例中的主機名稱、儲存桶名稱、根路徑及憑證，替換為您的部署設定。Milvus 儲存設定必須與正在運行的實例相符；變更備份配置並不會重新配置 Milvus。</li>
<li>請確保目標實例中不存在<code translate="no">coll_bak</code> 。</li>
</ul>
<p>有關 Milvus 儲存設定，請參閱「<a href="/docs/zh-hant/deploy_s3.md">物件儲存</a>」。關於現有的 v1 備份設定，請參閱「<a href="/docs/zh-hant/milvus_backup_upgrade.md#Migrate-the-configuration">升級 Milvus Backup</a>」。</p>
<h2 id="Prepare-sample-data" class="common-anchor-header">準備範例資料<button data-href="#Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>以下指令使用名為<code translate="no">coll</code> 的現有集合。您可透過一致地變更名稱，使用您自己的集合。</p>
<p>若要建立小型測試集合，請安裝 PyMilvus，並針對空的集合名稱執行以下指令。若 Milvus 並非本機運作，請替換 URI：</p>
<pre><code translate="no" class="language-shell">pip install pymilvus==3.0.0
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;coll&quot;</span>), <span class="hljs-string">&quot;Use an empty sample collection name&quot;</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;label&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
indexes = client.prepare_index_params()
indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
client.create_collection(<span class="hljs-string">&quot;coll&quot;</span>, schema=schema, index_params=indexes)

rng = random.Random(<span class="hljs-number">601</span>)
rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
client.insert(<span class="hljs-string">&quot;coll&quot;</span>, rows)
client.flush(<span class="hljs-string">&quot;coll&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>這將建立 256 個實體。在執行後續步驟時，請保持此測試資料不變。</p>
<h2 id="Back-up-the-collection" class="common-anchor-header">備份集合<button data-href="#Back-up-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">步驟 1：準備設定<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>在包含<code translate="no">milvus-backup</code> 二進位檔的目錄中執行以下指令。執行後續指令時請保留此工作目錄：</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>將以下內容儲存為<code translate="no">configs/backup-source.yaml</code> 。此範例使用 MinIO 的預設測試憑證；請將其替換為您所使用物件儲存庫的憑證。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">milvus-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://milvus-a:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">minio-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.storage</code> 描述來源實例的資料。<code translate="no">backup.storage</code> 描述備份目標。未設定的備份儲存空間欄位將繼承自<code translate="no">milvus.storage</code> ，唯獨<code translate="no">rootPath</code> 除外，其預設值為<code translate="no">backup</code> 。</p>
<p>若 Milvus 與 Milvus Backup 使用不同的位址連線至同一物件儲存庫，請將 `<code translate="no">backup.storage.milvusAddress</code> ` 和 `<code translate="no">milvusPort</code> ` 設定為 Milvus 伺服器可連線到的位址。請參閱<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 版本的配置範例</a>。</p>
<h3 id="Step-2-Check-connectivity-and-create-a-backup" class="common-anchor-header">步驟 2：檢查連線狀態並建立備份<button data-href="#Step-2-Check-connectivity-and-create-a-backup" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>連線性檢查應顯示<code translate="no">Success!</code> 。建立指令應顯示<code translate="no">create backup success</code> ，且備份資訊應列出<code translate="no">coll</code> 。</p>
<p>明示的<code translate="no">--format snapshot</code> 會選擇快照工作流程。在 Milvus 3.0 中，預設的<code translate="no">auto</code> 同樣會選擇快照。備份內容包含元資料，以及位於<code translate="no">bucket-a/backup/my_backup</code> 下的匯出快照封裝檔。請完整保留該目錄。</p>
<h2 id="Restore-within-the-same-instance" class="common-anchor-header">在同一實例內還原<button data-href="#Restore-within-the-same-instance" class="anchor-icon" translate="no">
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
    </button></h2><p>使用相同的設定，並加上後綴來還原備份：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>CLI 指令<code translate="no">--filter</code> 會將目標名稱與<code translate="no">-s</code> 或<code translate="no">--rename</code><strong>後綴進行比對</strong>。在此還原指令中，請使用<code translate="no">coll_bak</code> ，而非<code translate="no">coll</code> 。若篩選條件未匹配任何項目，系統將成功退出而不建立集合。</p>
<p>還原後的集合會使用目標實例所設定的儲存空間。Milvus 負責管理快照匯入以及隨之產生的資料佈局。</p>
<h2 id="Verify-the-result" class="common-anchor-header">驗證結果<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>針對上述可選的 256 個實體樣本資料，請在還原目標上執行此指令。將<code translate="no">localhost:19530</code> 替換為用於準備資料的相同 Milvus 端點。此指令會驗證實體數量、每個標量與向量值，以及向量搜尋結果，且不會刪除資料：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> client.has_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.list_indexes(<span class="hljs-string">&quot;coll_bak&quot;</span>):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
    client.create_index(<span class="hljs-string">&quot;coll_bak&quot;</span>, indexes)
client.load_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)

rng = random.Random(<span class="hljs-number">601</span>)
expected = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
count = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;count(*)&quot;</span>]
actual = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,
                      output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>], limit=<span class="hljs-number">512</span>,
                      consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> count == <span class="hljs-number">256</span>
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">sorted</span>(actual, key=<span class="hljs-keyword">lambda</span> row: row[<span class="hljs-string">&quot;id&quot;</span>]) == expected
hits = client.search(<span class="hljs-string">&quot;coll_bak&quot;</span>, data=[expected[<span class="hljs-number">7</span>][<span class="hljs-string">&quot;vector&quot;</span>]], limit=<span class="hljs-number">1</span>,
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> hits[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>] == <span class="hljs-number">7</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Backup and restore verified&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於其他資料，請與您自身的備份時點基準進行比對。若還原後的集合尚未建立向量索引，請在載入前建立適當的向量索引。僅憑指令執行成功，並不能證明預期資料已成功還原。</p>
