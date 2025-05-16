---
id: es2m.md
summary: 本指南提供了将数据从 Elasticsearch 迁移到 Milvus 2.x 的全面、循序渐进的过程。
title: 来自 Elasticsearch
---

<h1 id="From-Elasticsearch" class="common-anchor-header">从 Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供了将数据从 Elasticsearch 迁移到 Milvus 2.x 的全面、循序渐进的过程。按照本指南，你将能够有效地传输数据，利用 Milvus 2.x 的高级功能和改进的性能。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>软件版本</strong>：<ul>
<li>源 Elasticsearch：7.x 或 8.x</li>
<li>目标 Milvus：2.x</li>
<li>有关安装详情，请参阅<a href="https://milvus.io/docs/install_standalone-docker.md">安装</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Elasticsearch</a>和<a href="https://milvus.io/docs/install_standalone-docker.md">安装 Milvus</a>。</li>
</ul></li>
<li><strong>所需工具</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。有关安装详情，请参阅<a href="/docs/zh/v2.4.x/milvusdm_install.md">安装迁移工具</a>。</li>
</ul></li>
<li><strong>支持迁移的数据类型</strong>：要从源 Elasticsearch 索引中迁移的<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">字</a>段属于以下类型 -<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">keyword</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">text</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">integer</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>。此处未列出的数据类型目前不支持迁移。有关 Milvus 集合与 Elasticsearch<a href="#field-mapping-reference">索引</a>之间数据<a href="#field-mapping-reference">映射的</a>详细信息，请参阅<a href="#field-mapping-reference">字段</a>映射<a href="#field-mapping-reference">参考</a>。</li>
<li><strong>Elasticsearch 索引要求</strong>：<ul>
<li>源 Elasticsearch 索引必须包含<code translate="no">dense_vector</code> 类型的向量字段。如果没有向量字段，迁移将无法启动。</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">配置迁移文件<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>将示例迁移配置文件保存为<code translate="no">migration.yaml</code> ，然后根据实际情况修改配置。您可以将配置文件放在任何本地目录下。</p>
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
<p>下表描述了示例配置文件中的参数。有关配置的完整列表，请参阅《<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus 迁移》：Elasticsearch 到 Milvus 2.x</a>。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>参数</th><th>参数</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>迁移任务的运行模式。从 Elasticsearch 索引迁移时设置为<code translate="no">elasticsearch</code> 。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批从 Elasticsearch 中读取的缓冲区大小。单位：KB：KB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>指定元配置的来源。目前仅支持<code translate="no">config</code> 。</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>确定要迁移数据的 Elasticsearch 索引。</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>要迁移的 Elasticsearch 索引中的字段。</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Elasticsearch 字段的名称。</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>字段的最大长度。只有当<code translate="no">meta.fields.type</code> 为<code translate="no">keyword</code> 或<code translate="no">text</code> 时才需要此参数。</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>指定字段是否作为主键。</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Elasticsearch 字段的数据类型。目前，Elasticsearch 支持以下数据类型：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">keyword</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">text</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">integer</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">float</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>。</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>向量字段的尺寸。只有在<code translate="no">meta.fields.type</code> 是<code translate="no">dense_vector</code> 时才需要此参数。</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>在 Milvus 2.x 中创建集合的特定配置。</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Milvus 集合的名称。如果未指定，默认为 Elasticsearch 索引名称。</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>指定是否禁用集合中的Dynamic Field。默认为<code translate="no">false</code> 。有关Dynamic Field的更多信息，请参阅<a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">启用Dynamic Field</a>。</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>要在集合中创建的分片数量。有关分片的更多信息，请参阅<a href="https://milvus.io/docs/glossary.md#Shard">术语</a>。</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>集合在 Milvus 中的一致性级别。有关更多信息，请参阅<a href="https://milvus.io/docs/consistency.md">一致性</a>。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>参数</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>源 Elasticsearch 服务器的连接配置。</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>源 Elasticsearch 服务器的地址。</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Elasticsearch 服务器的用户名。</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Elasticsearch 服务器的密码。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>转储文件的存储位置。有效值：<br/>-<code translate="no">local</code>: 将转储文件存储在本地磁盘上。<br/>-<code translate="no">remote</code>: 将转储文件存储在对象存储上。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>云存储桶中的输出目录路径。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>云存储服务提供商。示例值：<code translate="no">aws</code>,<code translate="no">gcp</code>,<code translate="no">azure</code> 。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>云存储区域。如果使用本地 MinIO，可以是任何值。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>用于存储数据的存储桶名称。该值必须与 Milvus 2.x 中的配置相同。更多信息，请参阅<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">系统配置</a>。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>是否使用 IAM 角色进行连接。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>是否检查对象存储中是否存在指定的存储桶。</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>目标 Milvus 2.x 服务器的连接配置。</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>目标 Milvus 服务器地址。</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus 2.x 服务器的用户名。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。有关详细信息，请参阅<a href="https://milvus.io/docs/authenticate.md">启用身份验证</a>。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Milvus 2.x 服务器的密码。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。有关详细信息，请参阅<a href="https://milvus.io/docs/authenticate.md">启用身份验证</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">启动迁移任务<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>使用以下命令启动迁移任务。将<code translate="no">{YourConfigFilePath}</code> 替换为配置文件<code translate="no">migration.yaml</code> 所在的本地目录。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>以下是迁移日志输出成功的示例：</p>
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
<h2 id="Verify-the-result" class="common-anchor-header">验证结果<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>执行迁移任务后，可以调用 API 或使用 Attu 查看已迁移实体的数量。有关详细信息，请参阅<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">字段映射参考<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>查看下表，了解 Elasticsearch 索引中的字段类型如何映射到 Milvus 集合中的字段类型。</p>
<p>有关 Milvus 支持<a href="https://milvus.io/docs/schema.md#Supported-data-types">的</a>数据类型的更多信息，请参阅<a href="https://milvus.io/docs/schema.md#Supported-data-types">支持的数据类型</a>。</p>
<table>
<thead>
<tr><th>Elasticsearch 字段类型</th><th>Milvus 字段类型</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>密集向量</td><td>浮点向量</td><td>向量尺寸在迁移过程中保持不变。</td></tr>
<tr><td>关键字</td><td>变量</td><td>设置最大长度（1 至 65,535）。超过限制的字符串会引发迁移错误。</td></tr>
<tr><td>文本</td><td>字符串</td><td>设置最大长度（1 至 65,535）。超过限制的字符串会触发迁移错误。</td></tr>
<tr><td>长</td><td>Int64</td><td>-</td></tr>
<tr><td>整数</td><td>Int32</td><td>-</td></tr>
<tr><td>双</td><td>双</td><td>-</td></tr>
<tr><td>浮点数</td><td>浮点数</td><td>-</td></tr>
<tr><td>布尔</td><td>布尔</td><td>-</td></tr>
<tr><td>对象</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
