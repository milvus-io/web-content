---
id: milvus_backup_upgrade.md
summary: 将 Milvus Backup 从 0.5.x 升级至 0.6.0，更新配置和命令，并验证备份和恢复功能。
title: 将 Milvus Backup 升级至 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">将 Milvus Backup 升级至 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>当您需要将<strong>Milvus Backup 工具从</strong>0.5.x 升级至 0.6.0 时，请参考本指南。本指南不会升级您的 Milvus 服务器。如果您仍使用 0.5.x 版本，请继续参考<a href="/docs/zh/milvus_backup_cli.md">0.5.x</a>版本的<a href="/docs/zh/milvus_backup_cli.md">CLI</a>或<a href="/docs/zh/milvus_backup_api.md">API</a>指南。如果是新安装，请使用<a href="/docs/zh/milvus_backup_0_6_cli.md">0.6.0 版本的指南</a>。</p>
<p>V1 YAML 配置仍可通过自动转换加载。但 0.6.0 版本将拒绝已弃用的 CLI 参数，且 Milvus 3.0 中的默认备份格式已发生变更。在切换计划任务或服务之前，请务必检查配置和命令。</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">检查起点<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>记录您的 Backup 版本、Milvus 源版本和目标版本、配置文件、环境变量覆盖设置、备份位置，以及脚本或 API 服务使用的命令。请查阅这些服务器版本的<a href="/docs/zh/milvus_backup_overview.md#Compatibility-matrix">兼容性信息</a>。</p>
<p>在验证新安装时，请保留原始二进制文件、配置文件和现有备份目录。请<a href="/docs/zh/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">通过“获取 Milvus Backup”</a>将 0.6.0 下载到一个单独的目录中。以下所有命令均从该目录运行，并调用 0.6.0 二进制文件。请将您的 v1 配置文件副本放置在<code translate="no">configs/backup-v1.yaml</code> 路径下。</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">迁移配置<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>v1 配置文件在 0.6.0 中仍可加载。Milvus Backup 会在启动时将其转换为 v2 格式，并显示一条警告。若要将转换后的配置保存到单独的文件中：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> 会拒绝无效的迁移配置。若未指定<code translate="no">--output</code> ，该命令将 v2 YAML 写入标准输出。请务必先检查新文件中各项设置是否已正确转换，再进行审查和使用。</p>
<table>
<thead>
<tr><th>v1 设置</th><th>v2 设置</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>,<code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>,<code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>源存储位于<code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>备份存储位于<code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>存储凭据</td><td><code translate="no">milvus.storage.auth.*</code> /<code translate="no">backup.storage.auth.*</code> ，并显式<code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>请在与配置文件相同的变更中审查环境变量。V2 仅接受受支持的凭据相关环境变量，例如<code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code> 。旧版 v1 的名称不适用于 v2 文件。对于非凭据设置（如存储桶名称和端点），请使用 YAML 或配置键覆盖：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> 该命令会报告受影响的环境变量，但不会将其机密值复制到输出文件中。请参阅<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">支持的 v2 环境变量</a>。<code translate="no">config show</code> 取代了已弃用的<code translate="no">check config</code> 命令。</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">更新 CLI 命令<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>在 0.5 版本中已弃用的标志在 0.6.0 版本中将被拒绝。请在升级二进制文件前更新脚本。</p>
<table>
<thead>
<tr><th>命令</th><th>已移除的选项</th><th>替代方案</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> /<code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code>，使用目标名称</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> /<code translate="no">-d</code></td><td>移除该标志；<code translate="no">get</code> 将返回备份信息</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> /<code translate="no">-c</code></td><td>没有等效的Collection过滤器</td></tr>
</tbody>
</table>
<p>例如，以下 0.5.16 版本的命令会选择源名称<code translate="no">coll</code> ：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>其 0.6.0 版本的替代命令则使用目标名称进行恢复：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>如果恢复过滤器未匹配任何内容，则可成功退出而无需创建 Collection。请务必检查目标 Collection 及其数据。HTTP API 中的<code translate="no">collection_names</code> 仍会根据备份中的源名称进行筛选；请参阅<a href="/docs/zh/milvus_backup_0_6_api.md#Restore-data">0.6.0 API 指南</a>。</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">选择备份行为<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>在受支持的 Milvus 2.x 服务器上，<code translate="no">auto</code> 格式使用二进制日志。升级备份功能无需迁移至 Milvus 3.0。</li>
<li>在 Milvus 3.0 上，<code translate="no">auto</code> 会选择快照模式。官方对备份和恢复的支持从 Milvus 3.0.1 开始。在创建备份时，传递<code translate="no">--format binlog</code> 参数可保留二进制日志行为。</li>
<li>V1 配置兼容性不会保留已移除的命令标志，也不会覆盖新格式的默认设置。</li>
<li>用途预设可设置格式及其他选项。例如，<code translate="no">--for archive</code> 会强制使用二进制日志，即使同时提供了<code translate="no">--format snapshot</code> 参数也是如此。请仔细审查<a href="/docs/zh/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">格式和用途的选择</a>。</li>
<li>备份过程中会跳过外部Collection。请检查备份元数据，而非仅将任务成功视为所有Collection均已包含的证明。</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">切换作业前请进行验证<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例保留二进制日志格式，并将数据恢复到一个新的 Collection 中。请将 `<code translate="no">coll</code> ` 替换为一个您已记录其 Schema、数量、标量和向量值以及搜索结果的 Collection。使用新的备份名称，并确保目标名称<code translate="no">coll_upgrade_check</code> 不存在。</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>确认备份中包含<code translate="no">coll</code> ，并确认还原后<code translate="no">coll_upgrade_check</code> 已存在。如有必要，请创建其向量索引，加载该索引，并将还原后的数据和搜索结果与记录的基线进行对比。在此测试期间，请保持源数据不变。</p>
<p>在使用新工具依赖某个现有备份之前，请先对其进行测试。对于名为<code translate="no">legacy_backup</code> 的 0.5.16 版本备份（其中包含<code translate="no">coll</code> ），请使用独立的目标名称：</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>这些升级路径已在<strong>Milvus 2.6.11</strong>、备份版本<strong>0.5.16 → 0.6.0</strong> 以及 MinIO 中的二进制日志备份中经过验证。无论是新创建的备份还是现有备份，恢复后的实体值和向量搜索结果均与原始数据一致。 这并不意味着所有历史备份或 Milvus 2.x 到 3.0 的恢复操作均兼容。也不意味着 0.5.x 版本能够读取由 0.6.0 创建的备份。</p>
<p>验证成功后，请更新任务，使之同时采用新的二进制文件、已验证的配置、环境设置以及替换标志。 对于 API 部署，请使用经过验证的配置启动新服务，并通过<a href="/docs/zh/milvus_backup_0_6_api.md">0.6.0 HTTP API</a> 验证任务完成情况。若要在 Milvus 3.0.1 或更高版本中采用快照，请参阅《<a href="/docs/zh/snapshot-backup-and-restore.md">单实例中的快照备份与恢复》</a>。</p>
