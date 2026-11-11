---
id: milvus_backup_api.md
summary: 了解如何通过 API 使用 Milvus Backup
title: 使用 API 备份和恢复数据Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">使用 API 备份和恢复数据<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>有关当前工作流，请参阅<a href="/docs/zh/milvus_backup_0_6_api.md">HTTP API 指南或</a> <a href="/docs/zh/milvus_backup_upgrade.md">从 0.5.x 版本升级</a>。请查看<a href="/docs/zh/milvus_backup_overview.md#Compatibility-matrix">兼容性对照表</a>，了解受支持的 Milvus 服务器版本。</p>
<p>Milvus Backup 提供数据备份和恢复功能，以确保您的 Milvus 数据安全。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">获取 Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以下载预编译的二进制文件，或从源代码进行编译。</p>
<p>请从<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">0.5.16 版本中</a>下载适用于您操作系统和架构的二进制文件。请使用本页面上对应的 0.5.16 配置和示例。</p>
<p>若要从源代码构建 0.5.16 版本，请安装 Go 1.25 或更高版本，并运行：</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">准备配置文件<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>下载<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">示例配置文件</a>，并根据您的需求进行调整。</p>
<p>然后在已下载或已构建的 Milvus Backup 二进制文件旁创建一个文件夹，将该文件夹命名为 `<code translate="no">configs</code>`，并将配置文件放置在 `<code translate="no">configs</code> ` 文件夹内。</p>
<p>您的文件夹结构应类似于以下示例：</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>本示例使用 MinIO 作为备份存储。请将 `<code translate="no">minio.*</code> ` 设置为与您的 Milvus 存储和备份目标相匹配，包括地址、凭据、存储桶名称和根路径。</p>
<div class="alert note">
<p>默认 MinIO 存储桶的名称因 Milvus 的安装方式而异。在修改 MinIO 设置时，请参考下表。</p>
<table>
<thead>
<tr><th>字段</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>文件</td><td>文件</td></tr>
</tbody>
</table>
</div>
<h2 id="Start-up-the-API-server" class="common-anchor-header">启动 API 服务器<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>然后，您可以按以下方式启动 API 服务器：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>API 服务器默认监听 8080 端口。您可以通过添加<code translate="no">-p</code> 参数来更改监听端口。若要让 API 服务器监听 443 端口，请按以下步骤操作：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>您可以通过 http://localhost:<port>/api/v1/docs/index.html 访问 Swagger UI。</p>
<h2 id="Prepare-data" class="common-anchor-header">准备数据<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您运行了一个监听默认端口 19530 的空本地 Milvus 实例，请使用示例 Python 脚本在实例中生成一些数据。您可以根据需要自由修改这些脚本。</p>
<p>获取<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">脚本</a>后，运行脚本生成数据。请确保已安装<a href="https://pypi.org/project/pymilvus/">PyMilvus</a>（Milvus 官方 Python SDK）。</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>此步骤为可选。若跳过此步骤，请确保您的 Milvus 实例中已有数据。</p>
<h2 id="Back-up-data" class="common-anchor-header">备份数据<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
<p>请注意，对 Milvus 实例运行 Milvus Backup 通常不会影响实例的运行。在备份或恢复过程中，您的 Milvus 实例仍可正常运行。</p>
<p>运行以下命令创建备份。如有必要，请修改<code translate="no">collection_names</code> 和<code translate="no">backup_name</code> 。</p>
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
<p>创建请求是异步的。请使用返回的<code translate="no">requestId</code> 作为<code translate="no">backup_id</code> 来轮询<code translate="no">get_backup</code> ，并等待<code translate="no">data.state_code</code> 变为<code translate="no">2</code> 后再进行恢复。</p>
<p>您可以按以下方式列出 Minio 设置中指定存储桶中的备份：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>按以下方式检索备份元数据：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>请将<code translate="no">backup_id</code> 和<code translate="no">backup_name</code> 替换为您备份对应的值。该端点返回的是 JSON 元数据，而非备份文件。归档时，请从对象存储中复制完整的备份目录。</p>
<p>现在，您可以将备份文件保存到安全位置以备将来恢复，或将其上传至<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，利用您的数据创建托管向量数据库。详情请参阅《<a href="https://zilliz.com/doc/migrate_from_milvus-2x">从 Milvus 迁移至 Zilliz Cloud</a>》。</p>
<h2 id="Restore-data" class="common-anchor-header">恢复数据<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
<p>您可以调用恢复 API 命令并添加 `<code translate="no">collection_suffix</code> ` 选项，通过从备份中恢复数据来创建新的 Collection。如有必要，请修改 `<code translate="no">collection_names</code> ` 和 `<code translate="no">backup_name</code> `。</p>
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
<p><code translate="no">collection_suffix</code> 选项允许您为将要创建的新Collection设置后缀。上述命令将在您的Milvus实例中创建一个名为<strong>hello_milvus_recover</strong>的新Collection。</p>
<p>如果您希望在不更改名称的情况下恢复已备份的 Collection，请在从备份中恢复之前先删除该 Collection。现在，您可以通过运行以下命令清理<a href="#Prepare-data">“准备数据</a>”步骤中生成的数据。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>然后运行以下命令从备份中恢复数据。</p>
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
<p>根据待恢复数据的大小，恢复过程可能需要较长时间。因此，上述示例通过 `<code translate="no">&quot;async&quot;: true</code>` 请求异步执行。您可以通过运行以下命令查看恢复任务的状态：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>请务必将<code translate="no">test_restore_id</code> 替换为恢复API返回的<code translate="no">data.id</code> 。在验证数据之前，请等待<code translate="no">data.state_code</code> 变为<code translate="no">2</code> ；状态为<code translate="no">3</code> 表示失败，<code translate="no">4</code> 表示超时。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">验证恢复的数据<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>任务成功后，请确认<code translate="no">hello_milvus_recover</code> 是否存在。创建合适的索引，加载 Collection，并将实体数量、标量和向量值以及搜索结果与备份前捕获的源数据进行对比。若需进行原名恢复，请改用<code translate="no">hello_milvus</code> 。</p>
<p>CLI 指南中链接的示例<code translate="no">verify_data.py</code> 预期存在两个已还原的 Collection，并在最后将其删除。这不适用于本 API 示例，因为本示例仅选择<code translate="no">hello_milvus</code> 。</p>
