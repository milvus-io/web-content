---
id: multi-storage-backup-and-restore.md
summary: 이 주제에서는 한 Milvus 인스턴스에서 컬렉션을 백업하고 다른 인스턴스로 복원하는 프로세스에 대해 자세히 설명합니다.
title: S3 환경 전반의 인스턴스 간 마이그레이션
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">S3 환경 전반의 인스턴스 간 마이그레이션<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 각 인스턴스가 서로 다른 오브젝트 스토리지를 사용하여 한 Milvus 인스턴스에서 컬렉션을 백업하고 다른 인스턴스로 복원하는 프로세스에 대해 자세히 설명합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 다이어그램은 서로 다른 오브젝트 스토리지를 사용하는 백업 및 복원 프로세스를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>다중 스토리지 백업 및 복원.png</span> </span></p>
<p>서로 다른 오브젝트 스토리지를 사용하는 <code translate="no">milvus_A</code> 및 <code translate="no">milvus_B</code> 이라는 두 개의 Milvus 인스턴스가 있다고 가정합니다. 이 예제에서는 다음 작업을 완료하는 것이 목표입니다:</p>
<ol>
<li><p><code translate="no">milvus_A</code> 의 오브젝트 스토리지 <code translate="no">bucket_A</code> 에 <code translate="no">coll</code> 컬렉션에 대한 백업(my_backup)을 생성합니다.</p></li>
<li><p><code translate="no">milvus_B</code> 의 오브젝트 스토리지에 있는 <code translate="no">bucket_B</code> 으로 백업 my_backup 을 전송합니다.</p></li>
</ol>
<p><code translate="no">bucket_B</code> 에서 백업에서 복원하고 복원된 컬렉션의 이름을 coll_bak으로 지정합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><strong>밀버스 백업</strong> 도구가 설치되어 있는지 확인합니다.</p></li>
<li><p>Milvus 개체 스토리지 설정 구성에 익숙해집니다. 자세한 내용은 <a href="https://milvus.io/docs/deploy_s3.md">개체 스토리지를</a> 참조하세요.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">milvus_A에서 컬렉션 백업하기<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">1단계: 구성 준비</h3><p>milvus-backup 프로젝트의 디렉토리로 이동하여 configs라는 이름의 디렉토리를 만듭니다:</p>
<pre><code translate="no" class="language-shell">mkdir configs
cd configs
<button class="copy-code-btn"></button></code></pre>
<p>백업 구성 파일을 다운로드합니다 <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>파일 구조는 다음과 같습니다:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">2단계: 구성 파일 편집</h3><p><code translate="no">backup.yaml</code> 파일을 수정하여 milvus_A에 적합한 구성을 설정합니다:</p>
<ul>
<li><p>연결 구성</p>
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
<li><p><code translate="no">milvus.address</code>: milvus_A 서버의 IP 주소 또는 호스트 이름.</p></li>
<li><p><code translate="no">milvus.port</code>: Milvus 서버가 수신 대기 중인 TCP 포트(기본값 19530).</p></li>
</ul></li>
<li><p>스토리지 구성(MinIO/S3 설정)</p>
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
<li><p><code translate="no">minio.bucketName</code>: 밀버스_A에서 데이터 저장에 사용되는 버킷의 이름입니다. 이 예제에서는 <code translate="no">bucket_A</code> 로 설정합니다.</p></li>
<li><p><code translate="no">minio.rootPath</code>: milvus_A의 데이터가 저장되는 버킷 내 루트 경로입니다. 이 예에서는 <code translate="no">files</code> 로 설정합니다.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: 백업 스토리지에 사용되는 버킷의 이름입니다. 이 예에서는 <code translate="no">bucket_A</code> 로 설정합니다.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: 백업 파일을 저장하기 위해 지정된 버킷 내 루트 경로 <code translate="no">milvus_B</code>. 이 예에서는 <code translate="no">backup</code> 으로 설정합니다.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">3단계: 백업 만들기</h3><p>backup.yaml이 저장되면 <code translate="no">my_backup</code> 이라는 이름의 백업을 만듭니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>이 명령은 <code translate="no">milvus_A</code> 의 오브젝트 스토리지에 <code translate="no">bucket_A/backup/my_backup</code> 백업을 생성합니다.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">백업을 milvus_B로 수동으로 전송합니다.<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus_A</code> 와 <code translate="no">milvus_B</code> 는 서로 다른 오브젝트 스토리지를 사용하므로, milvus_A 의 스토리지에서 백업을 수동으로 다운로드하여<code translate="no">milvus_B</code> 의 스토리지에 업로드해야 합니다.</p>
<p><strong>MinIO 콘솔 사용</strong></p>
<ol>
<li><p>MinIO 콘솔에 로그인합니다.</p></li>
<li><p>milvus_A의 minio.address에 지정된 버킷을 찾습니다.</p></li>
<li><p>버킷에서 백업 파일을 선택합니다.</p></li>
<li><p><strong>다운로드를</strong> 클릭하여 파일을 컴퓨터로 다운로드합니다.</p></li>
</ol>
<p><strong>mc 클라이언트 사용</strong></p>
<p>또는 <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc 클라이언트를</a> 사용하여 백업 파일을 다운로드할 수 있습니다:</p>
<ol>
<li>MinIO 호스트를 구성합니다:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>사용 가능한 버킷을 나열합니다:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>버킷을 반복적으로 다운로드합니다:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>백업 파일이 다운로드되면 나중에 복원을 위해 <code translate="no">milvus_B</code> 에서 사용하는 객체 스토리지에 업로드할 수 있습니다. 또는 <a href="https://cloud.zilliz.com/">Zilliz Cloud에</a> 백업을 업로드하여 데이터로 관리형 벡터 데이터베이스를 생성할 수 있습니다. 자세한 내용은 <a href="https://zilliz.com/doc/migrate_from_milvus-2x">밀버스에서 질리즈 클라우드로 마이그레이션하기를</a> 참조하세요.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">백업에서 milvus_B로 복원하기<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">1단계: 복원 설정 구성</h3><p>2단계를 반복하여 <code translate="no">milvus_B</code> 로 복원하기 위한 구성을 수정하고 <code translate="no">minio.bucketName</code> 이 <code translate="no">bucket_B</code> 로 설정되었는지 확인합니다.</p>
<p>다음은 샘플 구성입니다:</p>
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
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">2단계: 백업에서 복원</h3><p>백업을 <code translate="no">milvus_B</code> 으로 복원합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>이 명령은 백업을<code translate="no">milvus_B</code> 의 coll_bak이라는 새 컬렉션으로 복원하고 <code translate="no">milvus_B</code> 의 오브젝트 스토리지 내 <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> 에 데이터를 저장합니다.</p>
