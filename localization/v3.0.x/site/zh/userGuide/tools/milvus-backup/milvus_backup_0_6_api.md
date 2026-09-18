---
id: milvus_backup_0_6_api.md
summary: 通过 HTTP API 创建和监控 Milvus Backup 0.6.0 的备份和还原任务。
title: 使用 Milvus Backup 0.6.0 HTTP API
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">使用 Milvus Backup 0.6.0 HTTP API<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>使用 Milvus Backup HTTP API 创建备份、还原 Collections 以及监控异步任务。下面的快照示例基于<strong>Milvus Backup 0.6.0</strong>与<strong>Milvus 3.0.1 或更高版本</strong>。若使用 Backup 0.5.x，请参阅<a href="/docs/zh/milvus_backup_api.md">0.5.x API 指南</a>。 对于现有安装，请参阅《<a href="/docs/zh/milvus_backup_upgrade.md">升级 Milvus Backup》</a>。</p>
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
    </button></h2><p>从<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 版本中</a>下载并解压相应的二进制文件。若要从源代码编译，请参<a href="/docs/zh/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">阅“获取 Milvus Backup”</a>；编译需要 Go 1.26 或更高版本。</p>
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
    </button></h2><p>请参考<a href="/docs/zh/milvus_backup_0_6_cli.md#Prepare-configuration-file">“准备配置文件</a>”中的 v2 示例创建 `<code translate="no">configs/backup.yaml</code> `<a href="/docs/zh/milvus_backup_0_6_cli.md#Prepare-configuration-file">文件</a>。配置对 Milvus、实例存储以及备份目标的访问权限。Milvus 服务器还必须能够访问备份存储以执行快照操作。</p>
<p>如果您已有 v1 配置文件，该文件仍可加载。在更改其 Schema 或环境变量之前，请参阅<a href="/docs/zh/milvus_backup_upgrade.md#Migrate-the-configuration">《迁移配置》</a>。</p>
<p>在包含二进制文件的目录下，检查配置并验证连接性：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>当连接性检查报告<code translate="no">Success!</code> 时，请继续操作。</p>
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
    </button></h2><p>使用您已验证的配置启动服务：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>默认端口为 8080。若要选择其他端口，请使用<code translate="no">-p</code> ：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>对于给定的服务，仅需运行其中一条命令。下面的示例使用端口 8080；如果您选择了其他端口，请修改其 URL。Swagger UI 可通过<code translate="no">http://localhost:8080/api/v1/docs/index.html</code> 访问。</p>
<p>在轮询任务期间请保持服务运行。任务 ID 和实时进度属于服务进程；进程停止后，持久化的备份仍保留在对象存储中。</p>
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
    </button></h2><p>使用名为<code translate="no">coll</code> 的现有 Collection，或从<a href="/docs/zh/snapshot-backup-and-restore.md#Prepare-sample-data">“准备示例数据</a>”中创建包含 256 个实体的测试 Collection。若使用自有数据，请在请求中修改 Collection 名称。验证结果时请保持测试数据不变。</p>
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
    </button></h2><p>提交一个异步备份请求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>响应中包含一个<code translate="no">requestId</code> 。提交请求并不意味着备份已完成。将该值复制到<code translate="no">backup_id</code> 并进行轮询：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>等待<code translate="no">data.state_code</code> 变为<code translate="no">2</code> 。该 API 使用以下任务状态：</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>含义</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>初始</td></tr>
<tr><td><code translate="no">1</code></td><td>执行中</td></tr>
<tr><td><code translate="no">2</code></td><td>成功</td></tr>
<tr><td><code translate="no">3</code></td><td>失败</td></tr>
<tr><td><code translate="no">4</code></td><td>超时</td></tr>
</tbody>
</table>
<p>请同时检查响应和任务状态。仅凭 HTTP 200 状态码是不够的：非零的响应<code translate="no">code</code> 表示出现错误。成功的响应可以省略<code translate="no">code</code> ，因为其值为零。如果任务失败或超时，请在从该备份恢复之前检查响应详情和服务器日志。</p>
<p>列出已存储的备份，并按名称检查已完成的备份：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> 该命令返回包含<code translate="no">collection_backups</code> 的 JSON 元数据；它<strong>不会</strong>下载备份文件。对于由其他进程创建的备份，仅按名称查询会返回元数据，但不包含实时任务进度。监控正在进行的备份时，请使用当前服务创建响应中的任务 ID。</p>
<p>默认格式为<code translate="no">auto</code> ，这在 Milvus 3.0 上会选择快照。若要显式请求二进制日志，请在 create 请求主体中添加<code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> 。CLI 中的<code translate="no">--for</code> 预设并非 HTTP 请求字段。</p>
<p>若要保留或迁移备份，请将对象存储中的整个目录复制出来。请参阅<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">0.6.0</a> 版本的<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">传输指南</a>。</p>
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
    </button></h2><p>请确保<code translate="no">coll_bak</code> 尚未存在。提交包含后缀的恢复请求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>HTTP<code translate="no">collection_names</code> 字段在应用后缀之前用于选择<strong>备份中的</strong>名称。此请求将选择<code translate="no">coll</code> 并创建<code translate="no">coll_bak</code> 。而 CLI 的<code translate="no">--filter</code> 则匹配重命名后的目标名称；请勿将<code translate="no">coll_bak</code> 替换到此 HTTP 字段中。</p>
<p>从恢复响应中复制<code translate="no">data.id</code> ，并轮询该任务：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>等待<code translate="no">data.state_code: 2</code> 状态更新，并访问<code translate="no">collection_restore_tasks</code> 检查目标 Collection 是否如预期。已提交的任务并不代表恢复操作已通过验证。</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">使用原始名称进行恢复<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>请使用一个不存在<code translate="no">coll</code> 的目标实例。启动一个单独的备份 API 服务，该服务需针对该目标和已完成的备份位置进行配置，然后向目标服务发送此请求：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>使用返回的任务 ID 在同一服务上轮询<code translate="no">get_restore</code> 。为还原目标配置<code translate="no">milvus.*</code> ，并为现有备份配置<code translate="no">backup.storage</code> 。请参阅<a href="/docs/zh/milvus_backup_0_6_cli.md#Prepare-configuration-file">《准备配置文件</a>》。</p>
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
    </button></h2><p>恢复任务成功后，连接到目标 Milvus 实例，并验证预期 Collection 和数据是否存在。对于包含 256 个实体的测试 Collection，请<a href="/docs/zh/snapshot-backup-and-restore.md#Verify-the-result">按照“验证结果</a>”中的说明执行完整的标量、向量和搜索检查。</p>
<p>若使用原始名称进行恢复，请将<code translate="no">coll_bak</code> 更改为<code translate="no">coll</code> 。验证代码会读取恢复后的数据，但不会将其删除。对于生产数据，请与备份时捕获的基线进行对比。</p>
