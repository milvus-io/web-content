---
id: milvus_backup_cli.md
summary: 了解如何通过 CLI 使用 Milvus 备份
title: 使用命令备份和还原数据
---

<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">使用命令备份和恢复数据<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 备份提供数据备份和恢复功能，以确保您的 Milvus 数据安全。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">获取 Milvus 备份<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以下载编译后的二进制文件，也可以从源代码构建。</p>
<p>要下载编译后<a href="https://github.com/zilliztech/milvus-backup/releases">的</a>二进制文件，请访问<a href="https://github.com/zilliztech/milvus-backup/releases">发布页面</a>，在那里可以找到所有正式发布的版本。记住，一定要使用标记为<strong>最新的</strong>版本中的二进制文件。</p>
<p>从源代码编译的步骤如下：</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p>下载<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">示例配置文件</a>，并根据自己的需要进行调整。</p>
<p>然后在下载或构建的 Milvus Backup 二进制文件旁创建一个文件夹，将文件夹命名为<code translate="no">configs</code> ，并将配置文件放在<code translate="no">configs</code> 文件夹中。</p>
<p>你的文件夹结构应与下面相似：</p>
<pre>
工作区 ├── milvus-backup └── configs └── backup.yaml</pre>
<p>由于 Milvus Backup 无法将数据备份到本地路径，因此在定制配置文件时要确保 Minio 设置正确。</p>
<div class="alert note">
<p>默认 Minio 存储桶的名称因安装 Milvus 的方式而异。更改 Minio 设置时，请参阅下表。</p>
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
    </button></h2><p>如果在默认端口运行一个空的本地 Milvus 实例，请使用 Python 脚本示例在实例中生成一些数据。请根据自己的需要对脚本进行必要的修改。</p>
<p>获取<a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">脚本</a>。然后运行脚本生成数据。确保已安装 Milvus 官方<a href="https://pypi.org/project/pymilvus/">Python</a> SDK<a href="https://pypi.org/project/pymilvus/">PyMilvus</a>。</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>这一步是可选的。如果跳过这一步，请确保您的 Milvus 实例中已经有一些数据。</p>
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
    </button></h2><p>请注意，针对 Milvus 实例运行 Milvus 备份通常不会影响实例的运行。在备份或还原期间，你的 Milvus 实例是完全正常的。</p>
<div class="tab-wrapper"></div>
<p>运行以下命令创建备份。</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>执行命令后，您可以在 Minio 设置中指定的存储桶中检查备份文件。具体来说，您可以使用<strong>Minio 控制台</strong>或<strong>mc</strong>客户端下载它们。</p>
<p>要从<a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio 控制台</a>下载，请登录 Minio 控制台，找到<code translate="no">minio.address</code> 中指定的备份桶，选择备份桶中的文件，然后单击 "<strong>下载 "</strong>进行下载。</p>
<p>如果您喜欢<a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">使用 mc 客户端</a>，请按以下步骤操作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>

<p>现在，您可以将备份文件保存到安全的地方以便将来还原，或者将它们上传到<a href="https://cloud.zilliz.com">Zilliz Cloud</a>，以创建一个包含您的数据的受管向量数据库。有关详情，请参阅<a href="https://zilliz.com/doc/migrate_from_milvus-2x">从 Milvus 迁移到 Zilliz Cloud</a>。</p>
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
<p>您可以运行带有<code translate="no">-s</code> 标志的<code translate="no">restore</code> 命令，通过从备份中恢复数据来创建新的集合：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> 标志允许您为要创建的新集合设置后缀。上述命令将在 Milvus 实例中创建一个名为<strong>hello_milvus_recover</strong>的新数据集。</p>
<p>如果你希望在不更改名称的情况下恢复备份的数据集，请在从备份恢复之前删除该数据集。现在，您可以运行以下命令清理在 "<a href="#Prepare-data">准备数据</a>"中生成的数据。</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>然后运行以下命令从备份中还原数据。</p>
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
    </button></h2><p>还原完成后，您可以按如下方法为已还原的数据集编制索引，以验证已还原的数据：</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>请注意，上述脚本假定您已运行带有<code translate="no">-s</code> 标志的<code translate="no">restore</code> 命令，且后缀设置为<code translate="no">-recover</code> 。请根据需要对脚本进行必要的修改。</p>
