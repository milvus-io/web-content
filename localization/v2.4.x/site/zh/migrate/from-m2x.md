---
id: from-m2x.md
summary: 本指南提供了从 Milvus 2.3.x 向 Milvus 2.3.x 或更高版本迁移数据的全面、逐步的过程。
title: 来自 Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">从 Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供了从 Milvus 2.3.x 向 Milvus 2.3.x 或更高版本迁移数据的全面、逐步过程。</p>
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
<li>源 Milvus： 2.3.0+ （该工具使用迭代器获取源采集数据，要求源 Milvus 为 2.3.0 或以上版本。）</li>
<li>目标 Milvus：2.3.0 以上</li>
</ul></li>
<li><strong>所需工具</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。有关安装细节，请参阅<a href="/docs/zh/v2.4.x/milvusdm_install.md">安装迁移工具</a>。</li>
</ul></li>
<li><strong>数据准备</strong>：<ul>
<li>确保源 Milvus 数据集已加载并准备好导出数据。</li>
<li>如果目标<a href="https://github.com/zilliztech/milvus-migration">Milvus</a>中没有与源数据集相对应的数据集，<a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a>工具会自动创建它。请注意，迁移后，目标数据集将不会被编入索引，之后必须手动为数据集编入索引。</li>
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
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>下表描述了示例配置文件中的参数。更多信息，请参阅<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus 迁移：Milvus2.x 到 Milvus2.x</a>。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>参数</th><th>参数</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>迁移任务的运行模式。从 Milvus 2.x 迁移时设置为 milvus2x。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批从 Milvus 2.x 读取的缓冲区大小。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>指定从何处读取元文件。设置为 config，表示可从该 migration.yaml 文件中获取元配置。</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>源 Milvus 版本。设置为 2.3.0 或更高版本。</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>源集合名称。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>源 Milvus 服务器地址。</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>源 Milvus 服务器的用户名。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/authenticate.md">启用身份验证</a>。</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>源 Milvus 服务器的密码。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。有关更多信息，请参阅<a href="/docs/zh/v2.4.x/authenticate.md">启用身份验证</a>。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>参数</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>目标 Milvus 服务器地址。</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>目标 Milvus 服务器的用户名。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/authenticate.md">启用身份验证</a>。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>目标 Milvus 服务器的密码。如果 Milvus 服务器启用了用户身份验证，则需要使用此参数。更多信息，请参阅<a href="/docs/zh/v2.4.x/authenticate.md">启用身份验证</a>。</td></tr>
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
    </button></h2><p>启动迁移任务有两个选项：使用 CLI 或提出 API 请求。请选择最适合您需要的选项。</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">选项 1：使用 CLI</h3><p>使用以下命令启动迁移任务。将<code translate="no">{YourConfigFilePath}</code> 替换为配置文件<code translate="no">migration.yaml</code> 所在的本地目录。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>监控日志更新进度。成功的迁移日志应包括以下条目：</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">方案 2：提出 API 请求</h3><p>您也可以使用还原 API 执行迁移。用以下命令启动 API 服务器：</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>服务器启动成功后，将<code translate="no">migration.yaml</code> 文件放到项目的<code translate="no">configs/</code> 目录中，然后使用以下命令启动迁移：</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
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
    </button></h2><p>迁移任务完成后，使用 Attu 查看已迁移实体的数量。此外，还可以在 Attu 中创建索引和加载集合。更多信息，请参阅<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">其他配置选项<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>除上述基本配置外，您还可以根据具体要求添加其他设置。</p>
<ul>
<li><p><strong>选择性字段迁移</strong>：如果只需要迁移集合中的特定字段而不是所有字段，请在<code translate="no">migration.yaml</code> 文件的<code translate="no">meta</code> 部分指定要迁移的字段。</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>自定义目标集合</strong>：要自定义目标集合的属性，请在<code translate="no">migration.yaml</code> 文件的<code translate="no">meta</code> 部分添加相关配置。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>详细信息请参阅<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus 迁移：Milvus2.x 到 Milvus2.x</a>。</p>
