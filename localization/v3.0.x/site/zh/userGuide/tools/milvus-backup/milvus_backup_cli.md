---
id: milvus_backup_cli.md
summary: 了解如何通过命令行界面（CLI）使用 Milvus Backup
title: 使用命令行备份和恢复数据Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">使用命令行备份和恢复数据<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>有关当前工作流，请参阅<a href="/docs/zh/milvus_backup_0_6_cli.md">CLI 指南</a>或<a href="/docs/zh/milvus_backup_upgrade.md">从 0.5.x 版本升级</a>。请查看<a href="/docs/zh/milvus_backup_overview.md#Compatibility-matrix">兼容性矩阵</a>以了解受支持的 Milvus 服务器版本。</p>
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
<p>若要从源代码构建 0.5.16，请安装 Go 1.25 或更高版本，并运行：</p>
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
<p>您的文件夹结构应与以下示例类似：</p>
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
    </button></h2><p>如果您在默认端口上运行了一个空的本地 Milvus 实例，请使用示例 Python 脚本在实例中生成一些数据。您可以根据需要对脚本进行必要的修改。</p>
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
    </button></h2><p>请注意，对 Milvus 实例运行 Milvus Backup 通常不会影响实例的运行。在备份或恢复过程中，您的 Milvus 实例仍可正常运行。</p>
<div class="tab-wrapper"></div>
<p>运行以下命令创建备份。</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>命令执行完成后，您可以在 Minio 设置中指定的存储桶中查看备份文件。具体而言，您可以通过<strong>Minio 控制台或</strong> <strong>mc</strong>客户端下载这些文件。</p>
<p>若要通过<a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio 控制台下载</a>，请登录 Minio 控制台，定位到<code translate="no">minio.backupBucketName</code> 中指定的存储桶，选中该存储桶中的文件，然后点击<strong>“下载”</strong>进行下载。</p>
<p>如果您更倾向于<a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">使用 mc 客户端</a>，请按以下步骤操作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>现在，您可以将备份文件保存到安全位置以备将来恢复，或者将其上传到<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，利用您的数据创建一个托管向量数据库。详情请参阅《<a href="https://zilliz.com/doc/migrate_from_milvus-2x">从 Milvus 迁移到 Zilliz Cloud》</a>。</p>
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
<p>您可以运行<code translate="no">restore</code> 命令并添加<code translate="no">-s</code> 标志，通过从备份中恢复数据来创建新的 Collection：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> 标志允许您为将要创建的新Collection设置后缀。上述命令将在您的Milvus实例中创建一个名为<strong>hello_milvus_recover</strong>的新Collection。</p>
<p>如果您希望在不更改名称的情况下恢复已备份的 Collection，请在从备份中恢复之前先删除该 Collection。现在，您可以通过运行以下命令清理<a href="#Prepare-data">“准备数据</a>”阶段生成的数据。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>然后运行以下命令从备份中恢复数据。</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>对于上面创建的一次性示例数据，上游脚本会先对<code translate="no">hello_milvus_recover</code> 和<code translate="no">hello_milvus2_recover</code> 进行索引和查询，然后<strong>删除这两个已恢复的 Collections</strong>。请务必在使用 `<code translate="no">_recover</code>` 恢复两个示例 Collections 后，再运行该脚本。对于您自己的数据，请勿使用此清理脚本，而是将其与备份时的基线进行对比。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>请注意，上述脚本假设您已使用<code translate="no">-s</code> 标志运行了<code translate="no">restore</code> 命令，且后缀已设置为<code translate="no">_recover</code> 。您可以根据需要对脚本进行必要的修改。</p>
