---
id: m2m.md
summary: 本指南提供了從 Milvus 1.x（包括 0.9.x 及以上版本）遷移資料到 Milvus 2.x 的全面、逐步的過程。
title: 從 Milvus 1.x
---

<h1 id="From-Milvus-1x" class="common-anchor-header">從 Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供了從 Milvus 1.x (包括 0.9.x 及以上) 遷移數據到 Milvus 2.x 的全面的、逐步的過程。按照本指南，您將能夠有效地傳輸您的數據，利用 Milvus 2.x 先進的功能和改進的性能。</p>
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
<li><strong>軟體版本</strong>：<ul>
<li>源 Milvus: 0.9.x 至 1.x</li>
<li>目標 Milvus: 2.x</li>
</ul></li>
<li><strong>所需的工具</strong>：<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。安裝細節請參考<a href="/docs/zh-hant/v2.5.x/milvusdm_install.md">安裝遷移工具</a>。</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">匯出來源 Milvus 安裝的元資料<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>為了準備Milvus 0.9.x到1.x的遷移數據，停止源Milvus或至少停止在源Milvus中執行任何DML操作。</p>
<ol>
<li><p>匯出源 Milvus 安裝的 metadata 到<code translate="no">meta.json</code> 。</p>
<ul>
<li>對於使用 MySQL 作為後端的安裝，執行</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>對於使用 SQLite 作為後端的安裝，執行</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>複製 Milvus 安裝的<code translate="no">tables</code> 資料夾，然後將<code translate="no">meta.json</code> 和<code translate="no">tables</code> 資料夾移至一個空的資料夾。</p>
<p>這一步驟完成後，空資料夾的結構應該是這樣的：</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>將前一步準備好的資料夾上傳到 S3 區塊儲存桶，或在下一節直接使用此本機資料夾。</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">設定轉移檔案<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>將範例移轉設定檔案儲存為<code translate="no">migration.yaml</code> ，並根據您的實際情況修改設定。您可以將配置檔案放在任何本機目錄中。</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>下表描述了示例配置文件中的參數。如需完整的配置清單，請參考<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration：Milvus1.x 到 Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>轉移線程數。</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>遷移工作的運作模式。從 Milvus 1.x 遷移時設定為<code translate="no">milvus1x</code> 。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批從 Milvus 1.x 讀取的緩衝區大小。單位：KB：單位：KB。</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>每批寫入 Milvus 2.x 的緩衝區大小。單位：KB：單位：KB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>載入器線程數。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>指定讀取 meta.json 元檔案的位置。有效值：<code translate="no">local</code>,<code translate="no">remote</code>,<code translate="no">mysql</code>,<code translate="no">sqlite</code> 。</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td><code translate="no">meta.json</code> 檔案所在的本機目錄路徑。此設定僅在<code translate="no">meta.mode</code> 設定為<code translate="no">local</code> 時使用。有關其他 meta 配置，請參閱<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>指定讀取來源檔案的位置。有效值：<br/>-<code translate="no">local</code>: 從本機磁碟讀取檔案。<br/>-<code translate="no">remote</code>: 從遠端儲存讀取檔案。</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>來源檔案所在的目錄路徑。例如，<code translate="no">/db/tables/</code> 。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>轉儲檔案的儲存位置。有效值：<br/>-<code translate="no">local</code>: 在本機磁碟上儲存轉儲檔案。<br/>-<code translate="no">remote</code>: 在物件儲存空間上儲存轉儲檔案。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>雲端儲存桶中的輸出目錄路徑。</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Milvus 2.x 儲存的存取金鑰。</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.x 儲存的密匙。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>雲端儲存服務供應商。範例值：<code translate="no">aws</code>,<code translate="no">gcp</code>,<code translate="no">azure</code> 。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>雲端儲存區域。如果您使用本機 MinIO，它可以是任何值。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>儲存資料的 Bucket 名稱。該值必須與 Milvus 2.x 中的配置相同。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">系統配置</a>。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>是否使用 IAM 角色進行連接。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>是否檢查指定的資料桶是否存在於物件儲存空間。</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>目標 Milvus 伺服器的位址。</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus 2.x 伺服器的使用者名稱。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需詳細資訊，請參閱<a href="https://milvus.io/docs/authenticate.md">啟用驗證</a>。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Milvus 2.x 伺服器的密碼。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需更多資訊，請參閱<a href="https://milvus.io/docs/authenticate.md">啟用驗證</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">啟動遷移工作<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>使用以下命令啟動遷移工作。將<code translate="no">{YourConfigFilePath}</code> 改為配置檔案<code translate="no">migration.yaml</code> 所在的本機目錄。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上面的命令將 Milvus 1.x 中的源資料轉換成 NumPy 檔案，然後使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>操作將資料寫入目標資料桶。</p></li>
<li><p>生成 NumPy 檔案後，使用下列指令將這些檔案匯入 Milvus 2.x。將<code translate="no">{YourConfigFilePath}</code> 改為配置檔案<code translate="no">migration.yaml</code> 所在的本機目錄。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>一旦執行轉移任務，您可以呼叫 API 或使用 Attu 檢視轉移的實體數量。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
