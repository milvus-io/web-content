---
id: milvus_backup_overview.md
summary: Milvus Backup 提供了用于备份和恢复 Milvus 数据的 CLI 和 HTTP API 工作流。
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup 可备份 Milvus Collections，并将其恢复到同一实例或另一个实例中。它提供了命令行界面 (CLI) 和 HTTP API。</p>
<p>Milvus Backup<strong>0.6.0</strong>为 Milvus 3.0 增加了快照备份功能、带版本控制的 v2 Schema，以及用于创建备份的预设用途。对 Milvus 3.0 的官方备份和恢复支持从<strong>Milvus 3.0.1</strong> 版本开始。</p>
<h2 id="Choose-your-guide" class="common-anchor-header">选择您的指南<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup 拥有独立于 Milvus 服务器版本的发布版本。当前指南涵盖 0.6.x 系列；“Backup 0.5.x”章节保留了早期的工作流。页面标题标签标明了适用的 Backup 系列。安装说明和示例均基于特定的经过验证的发布版本。请分别检查源端和目标端 Milvus 服务器的兼容性。</p>
<table>
<thead>
<tr><th>您的任务</th><th>指南</th></tr>
</thead>
<tbody>
<tr><td>继续使用 Backup 0.5.x</td><td><a href="/docs/zh/milvus_backup_cli.md">0.5.x 命令和</a> <a href="/docs/zh/milvus_backup_api.md">HTTP API</a>，示例基于 0.5.16 版本</td></tr>
<tr><td>升级现有的 Backup 安装</td><td><a href="/docs/zh/milvus_backup_upgrade.md">从 0.5.x 升级到 0.6.x</a></td></tr>
<tr><td>安装并使用 Backup 0.6.x</td><td><a href="/docs/zh/milvus_backup_0_6_cli.md">命令和配置</a>，或<a href="/docs/zh/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>在 Milvus 3.0.1 或更高版本上备份和还原快照</td><td><a href="/docs/zh/snapshot-backup-and-restore.md">单实例中的快照备份与恢复</a></td></tr>
</tbody>
</table>
<p>现有的<a href="/docs/zh/single-instance-backup-and-restore.md">“同一实例”</a>、<a href="/docs/zh/shared-bucket-backup-and-restore.md">“共享存储桶”</a>、<a href="/docs/zh/cross-bucket-backup-and-restore.md">“跨存储桶”</a>和<a href="/docs/zh/multi-storage-backup-and-restore.md">“跨存储”</a>指南仍保留 0.5.16 版本的配置和命令。当发布新的 Backup 版本时，这些指南中的示例不会随之更新。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>请使用来自同一版本的 Backup 二进制文件和配置示例。<a href="/docs/zh/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x 版指南锁定为</a>0.5.16 版本；<a href="/docs/zh/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">本指南锁定为</a>0.6.0<a href="/docs/zh/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">版本</a>。</li>
<li>确保 Milvus、其存储以及备份目标之间具有网络访问权限。快照操作还要求 Milvus 服务器能够访问备份存储。</li>
<li>请检查下方的服务器兼容性。仅在从源代码构建时才需要 Go：Backup 0.5.16 需要 1.25 或更高版本，0.6.0 需要 1.26 或更高版本。</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">架构<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Milvus Backup 组件</span>
  
 </span></p>
<p>Milvus Backup 负责协调 Milvus 实例与备份存储之间 Collection 元数据及数据备份的传输。在 Backup 0.6.0 中，所选格式决定了 Collection 数据的导出和恢复方式：</p>
<table>
<thead>
<tr><th>格式</th><th>备份与恢复行为</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus 导出 Collection 快照包。Milvus Backup 记录该包的信息，还原时通过 Milvus 导入该包。服务器负责管理生成的数据布局。</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup 会复制 Collection 数据文件和元数据，然后在还原过程中重新创建 Collections 并导入备份数据。</td></tr>
<tr><td><code translate="no">auto</code></td><td>请根据服务器支持的功能选择格式。在 Milvus 3.0 中，系统将自动选择快照格式。</td></tr>
</tbody>
</table>
<p>备份目录包含元数据及其格式所需的文件。归档或移动该目录时，请保留完整目录。请勿假设快照备份使用二进制日志（binlog）目录布局。</p>
<p>在 0.6.0 版本中，<code translate="no">create --for</code> 的预设配置了针对特定用途的选项：<code translate="no">clone</code> 保留所选格式，而<code translate="no">archive</code> 和<code translate="no">secondary</code> 则需要 binlog。辅助节点还需配置复制拓扑；实例之间的常规迁移则不需要辅助节点。请参阅<a href="/docs/zh/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">“选择备份格式或用途”</a>。</p>
<p>Backup 0.6.0 在备份过程中会跳过外部 Collections。任务成功并不意味着已包含外部 Collections 数据。</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">兼容性对照表<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 并不要求将每个 Milvus 安装都升级到 3.0 版本。</strong>它支持在受支持的 Milvus 2.x 版本上运行二进制日志工作流<strong>。</strong>对 Milvus 3.0 系列的官方备份和还原支持从<strong>Milvus 3.0.1</strong> 开始；快照示例即基于该系列。</p>
<p><a href="/docs/zh/milvus_backup_upgrade.md">本升级指南</a>已在 Milvus 2.6.11 环境中使用 Backup 0.5.16 和 0.6.0 进行了验证，包括使用 0.6.0 还原 0.5.16 的备份。此测试组合并未扩展下方的兼容性矩阵。</p>
<p>源端和目标端的 Milvus 版本必须构成受支持的组合。仅目标版本较新并不能保证兼容性。以下兼容性矩阵涵盖 Milvus 2.x 版本，该矩阵自 Milvus Backup 0.5.7 起有相关文档记录；但该矩阵并不保证 2.x 到 3.0 的迁移兼容性。</p>
<table>
<thead>
<tr><th>备份来源 ↓ / 还原目标 →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>无</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.3.x</td><td>否</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.4.x</td><td>否</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.5.x</td><td>否</td><td>否</td><td>否</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.6.x</td><td>否</td><td>否</td><td>否</td><td>否</td><td>是</td></tr>
</tbody>
</table>
<p>在进行跨版本迁移之前，请对照《<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">备份发布文档</a>》核对源版本、目标版本和备份格式。这些指南并未将旧版兼容性矩阵扩展至未列出的组合。</p>
<h2 id="Release-notes" class="common-anchor-header">发行说明<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
