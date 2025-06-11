---
id: f2m.md
title: 從 Faiss
related_key: "Faiss, migrate, import"
summary: 了解如何將 Faiss 資料遷移至 Milvus。
---

<h1 id="From-Faiss" class="common-anchor-header">從 Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供了從 Faiss 遷移數據到 Milvus 2.x 的全面、逐步的過程。按照本指南，您將能夠有效地傳輸您的數據，利用 Milvus 2.x 先進的功能和改進的性能。</p>
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
<li>源 Faiss</li>
<li>目標 Milvus: 2.x</li>
<li>安裝細節，請參閱<a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">安裝 Faiss</a>和<a href="https://milvus.io/docs/install_standalone-docker.md">安裝 Milvus</a>。</li>
</ul></li>
<li><strong>所需的工具</strong>：<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。安裝詳情請參閱<a href="/docs/zh-hant/v2.5.x/milvusdm_install.md">安裝遷移工具</a>。</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">設定遷移<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>將遷移配置範例檔保存為<code translate="no">migration.yaml</code> ，並根據實際情況修改配置。你可以自由地把配置文件放在本地的任何目錄下。</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
create:
collection:
name: test1w
shardsNums: 2
dim: 256
metricType: L2

mode: remote
remote:
outputDir: testfiles/output/
cloud: aws
endpoint: 0.0.0.0:9000
region: ap-southeast-1
bucket: a-bucket
ak: minioadmin
sk: minioadmin
useIAM: <span class="hljs-literal">false</span>
useSSL: <span class="hljs-literal">false</span>
checkBucket: <span class="hljs-literal">true</span>
milvus2x:
endpoint: localhost:19530
username: xxxxx
password: xxxxx

<button class="copy-code-btn"></button></code></pre>

<p>下表描述了示例配置文件中的参数。如需完整的配置清單，請參考<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration：Faiss 到 Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>轉移線程數。</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>遷移工作的運作模式。從 Faiss 索引遷移時設定為 faiss。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批從 Faiss 讀取的緩衝區大小。單位：KB：單位：KB。</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>每批寫入 Milvus 的緩衝區大小。單位：KB：單位：KB。</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>指定讀取來源檔案的位置。有效值：<br/>-<code translate="no">local</code>: 從本機磁碟讀取檔案。<br/>-<code translate="no">remote</code>: 從遠端儲存讀取檔案。</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>來源檔案所在的目錄路徑。例如，<code translate="no">/db/faiss.index</code> 。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Milvus 集合的名稱。</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>要在集合中建立的分片數量。有關分片的詳細資訊，請參閱「<a href="https://milvus.io/docs/glossary.md#Shard">術語」</a>。</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>向量領域的尺寸。</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>用來衡量向量之間相似性的度量類型。如需詳細資訊，請參閱「<a href="https://milvus.io/docs/glossary.md#Metric-type">術語」</a>。</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>轉儲檔案的儲存位置。有效值：<br/>-<code translate="no">local</code>: 在本機磁碟上儲存轉儲檔案。<br/>-<code translate="no">remote</code>: 在物件儲存上儲存轉儲檔案。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>雲端儲存桶中的輸出目錄路徑。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>雲端儲存服務提供商。範例值：<code translate="no">aws</code>,<code translate="no">gcp</code>,<code translate="no">azure</code> 。</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Milvus 2.x 儲存的端點。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>雲端儲存區域。如果您使用本機 MinIO，它可以是任何值。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>儲存資料的 Bucket 名稱。該值必須與 Milvus 2.x 中的 config 相同。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">系統組態</a>。</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Milvus 2.x 儲存的存取金鑰。</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.x 儲存的保密金鑰。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>是否使用 IAM 角色進行連接。</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>連線至 Milvus 2.x 時是否啟用 SSL。如需詳細資訊，請參閱<a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">傳輸中加密</a>。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>是否檢查指定的儲存桶是否存在於物件儲存空間。</td></tr>
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
<p>上述命令會將 Faiss 索引資料轉換成 NumPy 檔案，然後使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>作業將資料寫入目標資料桶。</p></li>
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
