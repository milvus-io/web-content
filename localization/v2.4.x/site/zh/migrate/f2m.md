---
id: f2m.md
title: 来自 Faiss
related_key: 'Faiss, migrate, import'
summary: 了解如何将 Faiss 数据迁移到 Milvus。
---
<h1 id="From-Faiss" class="common-anchor-header">从 Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南为从 Faiss 迁移数据到 Milvus 2.x 提供了一个全面的、逐步的过程。通过遵循本指南，您将能够有效地转移数据，利用 Milvus 2.x 的高级功能和改进的性能。</p>
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
<li>源 Faiss</li>
<li>目标 Milvus: 2.x</li>
<li>有关安装详情，请参阅<a href="https://milvus.io/docs/install_standalone-docker.md">安装</a> <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Faiss</a>和<a href="https://milvus.io/docs/install_standalone-docker.md">安装 Milvus</a>。</li>
</ul></li>
<li><strong>所需工具</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。安装详情，请参阅<a href="/docs/zh/v2.4.x/milvusdm_install.md">安装迁移工具</a>。</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">配置迁移<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>将示例迁移配置文件保存为<code translate="no">migration.yaml</code> ，然后根据实际情况修改配置。你可以将配置文件放在任何本地目录下。</p>
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
<p>下表描述了示例配置文件中的参数。有关配置的完整列表，请参阅<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus 迁移：Faiss 到 Milvus 2.x</a>。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>参数</th><th>参数</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>转存线程的并发量。</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>迁移任务的运行模式。从 Faiss 索引迁移时设置为 faiss。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批从 Faiss 读取的缓冲区大小。单位：KB：KB。</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>每批次写入 Milvus 的缓冲区大小。单位：KB：KB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>加载器线程的并发量。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>指定读取源文件的位置。有效值：<br/>-<code translate="no">local</code> ：从本地磁盘读取文件。<br/>-<code translate="no">remote</code> ：从远程存储器读取文件。</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>源文件所在目录路径。例如：<code translate="no">/db/faiss.index</code> 。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>参数</th><th>参数</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Milvus 数据集的名称。</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>要在集合中创建的分片数量。有关碎片的更多信息，请参阅<a href="https://milvus.io/docs/glossary.md#Shard">术语表</a>。</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>向量场的维度。</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>用于衡量向量间相似性的度量类型。更多信息，请参阅<a href="https://milvus.io/docs/glossary.md#Metric-type">术语表</a>。</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>转储文件的存储位置。有效值：<br/>-<code translate="no">local</code>: 将转储文件存储在本地磁盘上。<br/>-<code translate="no">remote</code>: 将转储文件存储在对象存储上。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>云存储桶中的输出目录路径。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>云存储服务提供商。示例值：<code translate="no">aws</code>,<code translate="no">gcp</code>,<code translate="no">azure</code> 。</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Milvus 2.x 存储的端点。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>云存储区域。如果使用本地 MinIO，它可以是任何值。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>存储数据的桶名。该值必须与 Milvus 2.x 中的配置相同。更多信息，请参阅<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">系统配置</a>。</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>用于 Milvus 2.x 存储的访问密钥。</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.x 存储的密钥。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>是否使用 IAM 角色进行连接。</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>连接到 Milvus 2.x 时是否启用 SSL。更多信息，请参阅<a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">传输中加密</a>。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>是否检查对象存储中是否存在指定的存储桶。</td></tr>
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
    </button></h2><ol>
<li><p>使用以下命令启动迁移任务。将<code translate="no">{YourConfigFilePath}</code> 替换为配置文件<code translate="no">migration.yaml</code> 所在的本地目录。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上述命令将 Faiss 索引数据转换为 NumPy 文件，然后使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>操作将数据写入目标数据桶。</p></li>
<li><p>生成 NumPy 文件后，使用以下命令将这些文件导入 Milvus 2.x。将<code translate="no">{YourConfigFilePath}</code> 替换为配置文件<code translate="no">migration.yaml</code> 所在的本地目录。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>迁移任务执行后，你可以调用 API 或使用 Attu 查看已迁移实体的数量。有关详细信息，请参阅<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
