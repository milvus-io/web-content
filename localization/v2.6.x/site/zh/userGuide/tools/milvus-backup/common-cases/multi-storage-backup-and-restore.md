---
id: multi-storage-backup-and-restore.md
summary: 本主题详细介绍了从一个 Milvus 实例备份一个 Collections 并将其还原到另一个实例的过程
title: 在跨 S3 环境的实例间迁移
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">在跨 S3 环境的实例间迁移<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题详细介绍从一个 Milvus 实例备份 Collections 并将其还原到另一个实例（每个实例使用不同的对象存储）的过程。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>下图说明了使用不同对象存储的备份和还原过程。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>多存储备份和恢复.png</span> </span></p>
<p>假设我们有两个使用不同对象存储的 Milvus 实例<code translate="no">milvus_A</code> 和<code translate="no">milvus_B</code> 。在这个示例中，我们的目标是完成以下任务：</p>
<ol>
<li><p>为<code translate="no">milvus_A</code> 的对象存储<code translate="no">bucket_A</code> 中的 Collections<code translate="no">coll</code> 创建备份 (my_backup)。</p></li>
<li><p>将备份 my_backup 转移到<code translate="no">milvus_B</code> 对象存储的<code translate="no">bucket_B</code> 。</p></li>
</ol>
<p>在<code translate="no">bucket_B</code> 中，从备份中还原，并将还原后的 Collections 命名为 coll_bak。</p>
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
<li><p>确保已安装<strong>Milvus-backup</strong>工具。</p></li>
<li><p>熟悉配置 Milvus 对象存储设置。 有关详情，请参阅对象<a href="https://milvus.io/docs/deploy_s3.md">存储</a>。</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">从 milvus_A 备份 Collections<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">步骤 1：准备配置</h3><p>进入 milvus-backup 项目目录，创建名为 configs 的目录：</p>
<pre><code translate="no" class="language-shell">mkdir configs
cd configs
<button class="copy-code-btn"></button></code></pre>
<p>下载备份配置文件<code translate="no">backup.yaml</code> ：</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>文件结构如下：</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">第 2 步：编辑配置文件</h3><p>修改<code translate="no">backup.yaml</code> 文件，为 milvus_A 设置适当的配置：</p>
<ul>
<li><p>连接 configs</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>:milvus_A 服务器的 IP 地址或主机名。</p></li>
<li><p><code translate="no">milvus.port</code>:Milvus 服务器监听的 TCP 端口（默认 19530）。</p></li>
</ul></li>
<li><p>存储配置（MinIO/S3 设置）</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">minio_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>:用于在 milvus_A 中存储数据的存储桶名称。在本例中，设置为<code translate="no">bucket_A</code> 。</p></li>
<li><p><code translate="no">minio.rootPath</code>:存储 milvus_A 数据的存储桶根路径。在本例中，设置为<code translate="no">files</code> 。</p></li>
<li><p><code translate="no">minio.backupBucketName</code>:用于备份存储的存储桶名称。在本例中，设置为<code translate="no">bucket_A</code> 。</p></li>
<li><p><code translate="no">minio.backupRootPath</code>:指定用于在<code translate="no">milvus_B</code> 中存储备份文件的存储桶内的根路径。在此示例中，设置为<code translate="no">backup</code> 。</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">第 3 步：创建备份</h3><p>保存 backup.yaml 后，创建名为<code translate="no">my_backup</code> 的备份：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>此命令在<code translate="no">milvus_A</code> 的对象存储中创建备份<code translate="no">bucket_A/backup/my_backup</code> 。</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">手动将备份传输到 milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>由于<code translate="no">milvus_A</code> 和<code translate="no">milvus_B</code> 使用不同的对象存储空间，因此需要手动从 milvus_A 的存储空间下载备份，然后上传到<code translate="no">milvus_B</code> 的存储空间。</p>
<p><strong>使用 MinIO 控制台</strong></p>
<ol>
<li><p>登录 MinIO 控制台。</p></li>
<li><p>找到 minio.address 中为 milvus_A 指定的存储桶。</p></li>
<li><p>选择存储桶中的备份文件。</p></li>
<li><p>单击 "<strong>下载 "</strong>将文件下载到您的计算机。</p></li>
</ol>
<p><strong>使用 mc 客户端</strong></p>
<p>您也可以使用<a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc 客户端</a>下载备份文件：</p>
<ol>
<li>配置 MinIO 主机：</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>列出可用的备份桶：</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>递归下载备份桶：</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>下载备份文件后，可将其上传到<code translate="no">milvus_B</code> 使用的对象存储空间，以便将来还原。或者，您也可以将备份上传到<a href="https://cloud.zilliz.com/">Zilliz Cloud</a>，用数据创建受管向量数据库。详情请参阅<a href="https://zilliz.com/doc/migrate_from_milvus-2x">从 milvus 迁移到 Zilliz Cloud</a>。</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">从备份恢复到 milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">步骤 1：配置恢复设置</h3><p>重复步骤 2，修改配置以还原到<code translate="no">milvus_B</code> ，确保<code translate="no">minio.bucketName</code> 设置为<code translate="no">bucket_B</code> 。</p>
<p>下面是一个配置示例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">minio_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">第 2 步：从备份还原</h3><p>将备份还原到<code translate="no">milvus_B</code> ：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>此命令将备份还原到<code translate="no">milvus_B</code> 中名为 coll_bak 的新 Collections 中，数据存储在<code translate="no">milvus_B</code> 的对象存储中的<code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> 中。</p>
