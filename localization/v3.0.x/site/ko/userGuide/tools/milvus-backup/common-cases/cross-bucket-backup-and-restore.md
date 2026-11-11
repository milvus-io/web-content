---
id: cross-bucket-backup-and-restore.md
summary: 이 주제에서는 한 Milvus 인스턴스에서 컬렉션을 백업하고 다른 Milvus 인스턴스로 복원하는 과정을 자세히 설명합니다.
title: 버킷 간 인스턴스 마이그레이션Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Migrate-Between-Instances-Across-Buckets" class="common-anchor-header">버킷 간 인스턴스 마이그레이션<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Migrate-Between-Instances-Across-Buckets" class="anchor-icon" translate="no">
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
    </button></h1><p>현재 워크플로우에 대해서는 <a href="/docs/ko/milvus_backup_0_6_cli.md">CLI 가이드를</a> 참조하거나 <a href="/docs/ko/milvus_backup_upgrade.md">0.5.x 버전에서 업그레이드하십시오</a>. 지원되는 Milvus 서버 버전은 <a href="/docs/ko/milvus_backup_overview.md#Compatibility-matrix">호환성 매트릭스를</a> 확인하십시오.</p>
<p>이 항목에서는 하나의
Milvus 인스턴스에서 컬렉션을 백업하고, 동일한 오브젝트 스토리지 내의
서로 다른 버킷을 사용하는 다른 인스턴스로 복원하는 과정을 자세히 설명합니다.</p>
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
    </button></h2><p>아래 다이어그램은 동일한 오브젝트 스토리지 내의
서로 다른 버킷을 사용하는 백업 및 복원 과정을 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cross-bucket-backup-and-restore.png" alt="cross-bucket-backup-and-restore.png" class="doc-image" id="cross-bucket-backup-and-restore.png" /> 
   <span>cross-bucket-backup-and-restore.png</span>
  
 </span></p>
<p><code translate="no">milvus_A</code> 와 <code translate="no">milvus_B</code> 라는 두 개의 Milvus 인스턴스가 있으며, 둘 다
오브젝트 스토리지에 기본 MinIO 스토리지 엔진을 사용한다고 가정합니다. 이
인스턴스들은 동일한
오브젝트 스토리지 내에서 서로 다른 버킷인 bucket_A와 <code translate="no">bucket_B</code> 를 사용합니다. 이 예제에서 우리의 목표는 다음
작업들을 완료하는 것입니다:</p>
<ol>
<li><p><code translate="no">bucket_A</code> 내의 <code translate="no">coll</code> 컬렉션에 대한 백업(<code translate="no">my_backup</code>)을 생성하고, 해당 백업을 <code translate="no">bucket_B</code> 에 저장합니다.</p></li>
<li><p><code translate="no">bucket_B</code> 에서 백업 파일을 복원하고, 복원된 컬렉션의 이름을 <code translate="no">coll_bak</code> 로 지정합니다.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ko/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x CLI 가이드를</a> 사용하여 <strong>Milvus Backup 0.5.16을</strong> 설치하십시오.</p></li>
<li><p>Milvus 오브젝트 스토리지 설정 구성 방법을 숙지하십시오.
자세한 내용은 <a href="https://milvus.io/docs/deploy_s3.md">오브젝트
스토리지</a> 섹션을 참조하십시오.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">milvus_A에서 컬렉션을 백업합니다.<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">1단계: 구성 준비<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>milvus-backup 프로젝트 디렉터리로 이동하여 <code translate="no">configs</code> 라는 디렉터리를 생성합니다. <code translate="no">milvus-backup</code> 파일이 있는 디렉터리에서 다음 명령어를 실행합니다:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>백업 구성 파일 <code translate="no">backup.yaml</code> 을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell">wget -O configs/backup.yaml https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>파일 구조는 다음과 같습니다:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">2단계: 구성 파일 편집<button data-href="#Step-2-Edit-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>아래 YAML은 다운로드한 v1 파일에서 편집해야 할 필드를 보여줍니다. 다른 필수 설정은 그대로 유지하십시오. <code translate="no">milvus.address</code> 및 <code translate="no">milvus.port</code> 을 백업하거나 복원할 인스턴스로 지정하십시오. <code translate="no">minio.backupAddress</code>, <code translate="no">minio.backupPort</code> 및 <code translate="no">minio.backupStorageType</code> 을 백업 대상으로 설정하고, <code translate="no">backup.gcPause.address</code> 을 소스 Milvus 관리 엔드포인트(기본값: 포트 9091)로 설정하십시오. 예시에 나온 모든 주소, 버킷 이름, 경로 및 자격 증명을 실제 배포 환경의 설정으로 대체하십시오.</p>
<p>backup.yaml 파일을 수정하여
<code translate="no">milvus_A</code> 에 대한 적절한 구성을 설정하십시오:</p>
<ul>
<li><p>연결 설정</p>
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
<li><p><code translate="no">milvus.address</code>: <code translate="no">milvus_A</code> 서버의 IP 주소 또는 호스트 이름.</p></li>
<li><p><code translate="no">milvus.port</code>: Milvus 서버가 수신 대기 중인 TCP 포트(기본값
19530).</p></li>
</ul></li>
<li><p>저장소 구성(MinIO/S3 설정)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: <code translate="no">milvus_A</code> 에서 데이터 저장에 사용되는 버킷의 이름입니다. 이 예제에서는 <code translate="no">bucket_A</code> 로 설정합니다.</p></li>
<li><p><code translate="no">minio.rootPath</code>: <code translate="no">milvus_A</code> 의 데이터가 저장되는 버킷 내의 루트 경로입니다. 이 예제에서는 <code translate="no">files</code> 로 설정합니다.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>:
<code translate="no">milvus_B</code> 에서 백업 저장에 사용되는 버킷의 이름입니다. 이 예제에서는 <code translate="no">milvus_A</code> 과 <code translate="no">milvus_B</code> 이 서로 다른 버킷을 사용합니다. 따라서 <code translate="no">bucket_B</code> 으로 설정하십시오.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: <code translate="no">milvus_B</code> 에서 백업 파일 저장을 위해 지정된 버킷 내의 루트 경로입니다. 이 예시에서는 <code translate="no">backup</code> 로 설정합니다.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">3단계: 백업 생성<button data-href="#Step-3-Create-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>backup.yaml 파일을 저장한 후, <code translate="no">my_backup</code> 라는 이름의 백업을 생성합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이 명령어는 coll 컬렉션에 대한 객체
스토리지에 <code translate="no">bucket_B/backup/my_backup</code> 백업을 생성합니다.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">백업을 milvus_B로 복원<button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">1단계: 복원 설정 구성<button data-href="#Step-1-Configure-restoration-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>2단계를 반복하여 <code translate="no">milvus_B</code> 으로 복원할 수 있도록 구성을 수정하고, <code translate="no">minio.bucketName</code> 이 <code translate="no">bucket_B</code> 로 설정되어 있는지 확인하십시오.</p>
<p>다음은 구성 예시입니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
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
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">2단계: 백업 복원<button data-href="#Step-2-Restore-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>백업을 <code translate="no">milvus_B</code> 에 복원합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이 명령은 대상 인스턴스의 구성된 스토리지 루트인 <code translate="no">bucket_B/files</code> 을 사용하여, <code translate="no">milvus_B</code> 내에 <code translate="no">coll_bak</code> 이라는 새 컬렉션으로 백업을 복원합니다.</p>
<p>Backup 0.5.16에서는 더 이상 사용되지 않는 <code translate="no">-c</code> 옵션이 <code translate="no">_bak</code> 이 적용되기 전에 백업 내의 컬렉션 이름을 선택합니다. 0.6.0 버전의 <code translate="no">--filter</code> 대체 옵션은 대신 대상 이름을 사용합니다. 자세한 내용은 <a href="/docs/ko/milvus_backup_upgrade.md#Update-CLI-commands">CLI 명령어 업데이트를</a> 참조하십시오.</p>
<p>복원 후, ` <code translate="no">coll_bak</code> `가 존재하는지 확인하고, 필요한 경우 적절한 벡터 인덱스를 생성한 다음, 해당 엔티티 수, 대표값 및 검색 결과를 백업 전에 캡처한 기준값과 비교하십시오. 명령어가 성공적으로 실행되었다고 해서 데이터가 검증된 것은 아닙니다.</p>
