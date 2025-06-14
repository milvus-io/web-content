---
id: es2m.md
summary: 本指南提供從 Elasticsearch 遷移資料至 Milvus 2.x 的全面性、逐步式流程。
title: 從 Elasticsearch
---

<h1 id="From-Elasticsearch" class="common-anchor-header">從 Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供了從 Elasticsearch 遷移資料到 Milvus 2.x 的全面、逐步的過程。按照本指南，您將能夠有效地傳輸資料，並利用 Milvus 2.x 的先進功能和改進的性能。</p>
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
<li>源 Elasticsearch：7.x 或 8.x</li>
<li>目標 Milvus：2.x</li>
<li>如需安裝細節，請參閱<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">安裝 Elasticsearch</a>和<a href="https://milvus.io/docs/install_standalone-docker.md">安裝 Milvus</a>。</li>
</ul></li>
<li><strong>所需的工具</strong>：<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。安裝細節請參閱<a href="/docs/zh-hant/v2.5.x/milvusdm_install.md">安裝遷移工具</a>。</li>
</ul></li>
<li><strong>支援遷移的資料類型</strong>：要從來源 Elasticsearch 索引遷移的欄位屬於下列類型 -<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">關鍵字</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">文字</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">長</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">整數</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">雙數</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">浮點</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">數</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">布林</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">物件</a>。此處未列出的資料類型目前不支援遷移。有關 Milvus 集合與 Elasticsearch 索引之間資料對應的詳細資訊，請參閱<a href="#field-mapping-reference">欄位</a>對應<a href="#field-mapping-reference">參考</a>。</li>
<li><strong>Elasticsearch 索引要求</strong>：<ul>
<li>來源 Elasticsearch 索引必須包含<code translate="no">dense_vector</code> 類型的向量欄位。沒有向量欄位就無法開始遷移。</li>
</ul></li>
</ul>
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
    </button></h2><p>將範例的轉移設定檔儲存為<code translate="no">migration.yaml</code> ，然後根據您的實際情況修改設定。您可以將配置檔案放在任何本機目錄中。</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>下表描述了示例配置文件中的參數。如需完整的配置清單，請參考<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration：Elasticsearch 到 Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>遷移工作的運作模式。從 Elasticsearch 索引遷移時設定為<code translate="no">elasticsearch</code> 。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批從 Elasticsearch 讀取的緩衝區大小。單位：KB：KB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>指定元組態的來源。目前僅支援<code translate="no">config</code> 。</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>指定要遷移資料的 Elasticsearch 索引。</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>要遷移的 Elasticsearch 索引中的欄位。</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Elasticsearch 欄位的名稱。</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>欄位的最大長度。此參數僅在<code translate="no">meta.fields.type</code> 為<code translate="no">keyword</code> 或<code translate="no">text</code> 時才需要。</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>指定欄位是否作為主索引鍵。</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Elasticsearch 欄位的資料類型。目前，Elasticsearch 支援下列資料類型：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>。</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>向量欄位的尺寸。這個參數只有在<code translate="no">meta.fields.type</code> 是<code translate="no">dense_vector</code> 時才需要。</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>在 Milvus 2.x 中建立集合的特定組態。</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Milvus 集合的名稱。如果未指定，則預設為 Elasticsearch 索引名稱。</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>指定是否停用資料集中的動態欄位。預設為<code translate="no">false</code> 。如需關於動態欄位的詳細資訊，請參閱<a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">啟用動態欄位</a>。</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>要在集合中建立的分塊數量。有關分片的詳細資訊，請參閱<a href="https://milvus.io/docs/glossary.md#Shard">名詞</a>。</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>在 Milvus 中集合的一致性層級。如需更多資訊，請參閱<a href="https://milvus.io/docs/consistency.md">一致性</a>。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>來源 Elasticsearch 伺服器的連線設定。</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>來源 Elasticsearch 伺服器的位址。</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Elasticsearch 伺服器的使用者名稱。</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Elasticsearch 伺服器的密碼。</td></tr>
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
<tr><td><code translate="no">target.remote.cloud</code></td><td>雲端儲存服務提供商。範例值：<code translate="no">aws</code>,<code translate="no">gcp</code>,<code translate="no">azure</code> 。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>雲端儲存區域。如果使用本機 MinIO，則可以是任何值。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>儲存資料的 Bucket 名稱。該值必須與 Milvus 2.x 中的配置相同。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">系統配置</a>。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>是否使用 IAM 角色進行連接。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>是否檢查指定的資料桶是否存在於物件儲存空間。</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>目標 Milvus 2.x 伺服器的連線設定。</td></tr>
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
    </button></h2><p>使用以下命令啟動遷移工作。將<code translate="no">{YourConfigFilePath}</code> 改為配置檔案<code translate="no">migration.yaml</code> 所在的本機目錄。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>以下是成功的遷移日誌輸出範例：</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>執行遷移工作後，您可以進行 API 呼叫或使用 Attu 檢視已遷移實體的數量。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">欄位對應參考<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>檢視下表以瞭解 Elasticsearch 索引中的欄位類型如何對應至 Milvus 集合中的欄位類型。</p>
<p>有關 Milvus 支援的資料類型的詳細資訊，請參閱支援<a href="https://milvus.io/docs/schema.md#Supported-data-types">的資料類型</a>。</p>
<table>
<thead>
<tr><th>Elasticsearch 欄位類型</th><th>Milvus 欄位類型</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>密集向量</td><td>浮動向量</td><td>向量尺寸在遷移時保持不變。</td></tr>
<tr><td>關鍵字</td><td>VarChar</td><td>設定最大長度 (1 到 65,535).超過限制的字串會觸發遷移錯誤。</td></tr>
<tr><td>文字</td><td>VarChar</td><td>設定最大長度（1 至 65,535）。超過限制的字串可能會觸發移轉錯誤。</td></tr>
<tr><td>長</td><td>Int64</td><td>-</td></tr>
<tr><td>整數</td><td>Int32</td><td>-</td></tr>
<tr><td>雙</td><td>雙倍</td><td>-</td></tr>
<tr><td>浮點數</td><td>浮動</td><td>-</td></tr>
<tr><td>布林</td><td>整數</td><td>-</td></tr>
<tr><td>物件</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
