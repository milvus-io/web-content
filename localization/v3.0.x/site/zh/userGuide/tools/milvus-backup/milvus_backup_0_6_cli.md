---
id: milvus_backup_0_6_cli.md
summary: 配置 Milvus Backup 0.6.0，创建备份，并使用 CLI 验证恢复的数据。
title: 使用 Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">使用 Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>使用 Milvus Backup 备份 Collections，并在同一或另一个 Milvus 实例中恢复这些 Collections。 本指南适用于<strong>Milvus Backup 0.6.0</strong>。从<strong>Milvus 3.0.1</strong> 版本开始，官方正式支持在 Milvus 3.0 上进行备份和恢复。Backup 0.6.0 还支持受支持的 Milvus 2.x 版本上的二进制日志工作流；请查看<a href="/docs/zh/milvus_backup_overview.md#Compatibility-matrix">Milvus Backup 兼容性说明</a>。</p>
<p>如果您仍在使用 Backup 0.5.x，请参考<a href="/docs/zh/milvus_backup_cli.md">0.5.x CLI 指南</a>。如果您正在升级，请先参阅《<a href="/docs/zh/milvus_backup_upgrade.md">升级 Milvus Backup》</a>。</p>
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
    </button></h2><p>从<a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 发布版中</a>下载适用于您操作系统和架构的二进制文件，然后解压。请确保二进制文件和配置示例位于同一发布版本下。</p>
<p>若要从源代码编译，请安装<strong>Go 1.26 或更高版本</strong>，然后运行：</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>预编译二进制文件无需 Go 环境。请在包含 `<code translate="no">milvus-backup</code>` 的目录下运行后续所有 shell 命令。</p>
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
    </button></h2><p>Milvus Backup 需要访问 Milvus gRPC 端点、其管理端点、实例的存储以及备份目标。对于快照备份，Milvus 服务器还需要访问备份存储。</p>
<p>创建配置目录：</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>将此 MinIO 示例保存为<code translate="no">configs/backup.yaml</code> 。请将地址、凭据、存储桶和根路径替换为您的部署设置。<code translate="no">minioadmin</code> 凭据是 MinIO 的测试默认值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> 用于连接正在进行备份或恢复的实例。如果启用了身份验证，还需设置<code translate="no">milvus.user</code> 和<code translate="no">milvus.password</code> 。</li>
<li><code translate="no">milvus.management.endpoint</code> 用于在备份期间暂停/恢复垃圾回收。</li>
<li><code translate="no">milvus.storage</code> 必须与实例的实际对象存储相匹配。在此处设置存储桶不会更改 Milvus 的配置。</li>
<li><code translate="no">backup.storage</code> 用于标识备份位置。未设置的字段将继承自<code translate="no">milvus.storage</code> ，但<code translate="no">rootPath</code> 除外，其默认值为<code translate="no">backup</code> 。</li>
<li><code translate="no">transfer.mode: auto</code> 当后端匹配时选择存储端复制，否则通过 Milvus Backup 进行流式传输。此设置控制对象传输，而非备份格式。</li>
</ul>
<p>下文列出了典型的存储默认值。使用前请确认您当前运行部署中的实际值。</p>
<table>
<thead>
<tr><th>设置</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>存储桶</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>根路径</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>如果 Milvus 服务器使用其他地址访问备份存储，请将<code translate="no">backup.storage.milvusAddress</code> 和<code translate="no">milvusPort</code> 设置为服务器可访问的地址。有关身份验证、TLS、其他存储提供商以及其他设置，请参阅<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 配置示例</a>。</p>
<p>检查实际值并验证连通性：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> 该工具会屏蔽密钥值，并报告每个值的来源。连通性检查应显示<code translate="no">Success!</code> 。在创建备份前，请先解决连接或存储错误。</p>
<p>对于现有的 v1 配置，请参阅《<a href="/docs/zh/milvus_backup_upgrade.md#Migrate-the-configuration">升级 Milvus 备份</a>》。自动配置转换无法替代已被移除的 CLI 标志。</p>
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
    </button></h2><p>使用名为<code translate="no">coll</code> 的现有 Collection，并确保不存在<code translate="no">coll_bak</code> 。在备份前记录模式、实体数量、具有代表性的标量和向量值，以及已知的搜索结果。在比较恢复的副本时，请保持示例数据不变。若需创建一个小型的一次性数据集，请使用<a href="/docs/zh/snapshot-backup-and-restore.md#Prepare-sample-data">“准备样本数据”</a>。</p>
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
    </button></h2><p>为<code translate="no">coll</code> 创建命名备份：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>create 命令应报告<code translate="no">create backup success</code> 。执行<code translate="no">get</code> 可返回备份元数据；请检查预期 Collection 是否存在。省略<code translate="no">--filter</code> 将备份所有符合条件的 Collection。外部 Collection 将被跳过。</p>
<p><code translate="no">--filter</code> 支持以逗号分隔的名称：默认数据库中的<code translate="no">coll</code> 、<code translate="no">db1.coll</code> ，或<code translate="no">'db1.*'</code> （用于备份数据库中的所有 Collections）。若模式中包含<code translate="no">*</code> ，请用引号括起来以防止 shell 展开。</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">选择备份格式或目的<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>使用默认的<code translate="no">--format auto</code> 时，Milvus 3.0 采用快照备份；受支持的 Milvus 2.x 服务器则使用二进制日志（binlog）。若要明确保留二进制日志行为，请传入<code translate="no">--format binlog</code> 。<a href="/docs/zh/snapshot-backup-and-restore.md">快照示例中</a>明确选择了<code translate="no">--format snapshot</code> 。</p>
<p>当备份目的与您的工作流相匹配时，请使用<code translate="no">--for</code> ：</p>
<table>
<thead>
<tr><th>用途</th><th>预设应用的值</th><th>预期用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>启用 RBAC 备份；保留您的格式和策略选择</td><td>将数据复制到另一台实例；<code translate="no">auto</code> 在 Milvus 3.0 上使用快照</td></tr>
<tr><td><code translate="no">archive</code></td><td>强制使用<code translate="no">binlog</code> 并启用RBAC备份</td><td>保留一份二进制日志格式的备份，以便日后恢复</td></tr>
<tr><td><code translate="no">secondary</code></td><td>强制启用<code translate="no">binlog</code> 、<code translate="no">bulk_flush</code> 、RBAC备份以及索引额外元数据</td><td>在已配置的复制拓扑中初始化一个从节点</td></tr>
</tbody>
</table>
<p>例如：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>预设会覆盖其所修复选项中的冲突值。例如，<code translate="no">--for archive --format snapshot</code> 会生成二进制日志备份。备份 RBAC 元数据并不意味着会自动还原该数据；如有需要，请使用 restore 命令的<code translate="no">--rbac</code> 选项。</p>
<p><code translate="no">secondary</code> 并非普通跨实例恢复的快捷方式。它还要求能够访问源 etcd 以获取索引元数据、正确的复制集群 ID 和通道，以及一个全新的从节点目标。备份必须保留完整的元数据，包括 `<code translate="no">meta/full_meta.json</code>`。配置复制和执行故障转移超出本指南的范围。 有关特定版本的实现和要求，请参阅<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0 源代码和参考文档</a>。</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">保留完整的备份<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>备份存储在<code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code> 目录下。请保留该目录中的所有对象。快照备份包含导出的数据包以及元数据。</p>
<p>请勿仅复制元数据文件，也请勿假设快照备份与二进制日志备份具有相同的布局。</p>
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
    </button></h2><p>将 `<code translate="no">coll</code> ` 还原到配置实例中的 `<code translate="no">coll_bak</code> `：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>在 CLI 中，<code translate="no">--filter</code> 会在应用<code translate="no">-s</code> 或<code translate="no">--rename</code> <strong>之后</strong>匹配名称。包含<code translate="no">--filter coll -s _bak</code> 的命令不会匹配任何内容，且可在不恢复 Collection 的情况下成功退出。</p>
<p>若要使用原始名称进行还原，请选择一个不存在该Collection名称的目标位置，将配置指向该目标位置和备份位置，并省略后缀：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>有关完整的同一实例示例，请参阅《<a href="/docs/zh/snapshot-backup-and-restore.md">单实例中的快照备份与还原</a>》。 现有的跨实例通用示例页面使用 Backup 0.5.16 和 v1 配置；请勿将这些命令原样应用于 0.6.0。有关 0.6.0 的传输配置，请参阅<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">带版本号的传输指南</a>。</p>
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
    </button></h2><p>确认<code translate="no">coll_bak</code> 是否存在。如果还原操作未重建其向量索引，请在加载Collection之前创建与您的Schema相匹配的索引。将其Schema、实体数量、标量和向量值以及已知的搜索结果与备份前捕获的基线进行对比。</p>
<p>对于可丢弃的 256 个实体的数据集，请使用<a href="/docs/zh/snapshot-backup-and-restore.md#Verify-the-result">“验证结果</a>”部分中的完整检查步骤。仅凭命令执行成功，并不能证明预期数据已成功恢复。</p>
