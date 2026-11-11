---
id: single-instance-backup-and-restore.md
summary: 이 항목에서는 동일한 Milvus 인스턴스 내에서 컬렉션을 백업하고 백업본에서 복원하는 과정을 자세히 설명합니다.
title: 단일 인스턴스에서의 백업 및 복원Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Backup-and-Restore-in-One-Instance" class="common-anchor-header">단일 인스턴스에서의 백업 및 복원<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
<p>이 항목에서는 동일한 Milvus 인스턴스 내에서 컬렉션을 백업하고
백업본에서 복원하는 과정을 자세히 설명합니다.</p>
<p>Milvus 3.0.1 이상에서 0.6.0 스냅샷 워크플로우를 사용하는 경우, <a href="/docs/ko/snapshot-backup-and-restore.md">‘단일 인스턴스 내 스냅샷 백업 및 복원’을</a> 참조하십시오.</p>
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
    </button></h2><p>아래 다이어그램은 단일 Milvus 인스턴스 내에서 이루어지는
백업 및 복원 과정을 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/single-instance-backup-and-restore.png" alt="single-instance-backup-and-restore.png" class="doc-image" id="single-instance-backup-and-restore.png" /> 
   <span>single-instance-backup-and-restore.png</span>
  
 </span></p>
<p>Milvus 인스턴스 <code translate="no">milvus_A</code> 이 있으며, 데이터 저장을 위해<code translate="no">bucket_A</code> 라는 버킷을 사용하고 있다고 가정합니다. 이 예제에서는
다음 작업을 완료하는 것을 목표로 합니다.</p>
<ol>
<li><p><code translate="no">bucket_A</code> 에 있는 coll 컬렉션에 대한 백업(<code translate="no">my_backup</code>)을 생성합니다.</p></li>
<li><p>백업에서 복원하고, 복원된 컬렉션의 이름을 <code translate="no">coll_bak</code> 으로 지정합니다.</p></li>
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
<li><p>Milvus 객체 스토리지 설정 구성 방법을 숙지하십시오.
자세한 내용은 <a href="https://milvus.io/docs/deploy_s3.md">‘객체
스토리지’를</a> 참조하십시오.</p></li>
</ul>
<h2 id="Back-up-the-collection" class="common-anchor-header">컬렉션 백업<button data-href="#Back-up-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>milvus-backup 프로젝트 디렉터리로 이동하여 <code translate="no">configs</code> 라는 디렉터리를 생성합니다:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>백업 구성 파일인 backup.yaml을 다운로드합니다:</p>
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
<code translate="no">milvus_A</code> 에 대한 적절한 구성을 설정하십시오. 다음은 스토리지 구성 예시입니다:</p>
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
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
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
<p>이 명령어는 <code translate="no">milvus_A</code> 의 오브젝트
스토리지에 <code translate="no">bucket_A/backup/my_backup</code> 백업을 생성합니다.</p>
<h2 id="Restore-from-the-backup-within-milvusA" class="common-anchor-header">milvus_A 내에서 백업 복원<button data-href="#Restore-from-the-backup-within-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><p>백업이 생성되면 다음 명령어를 사용하여 백업에서 복원할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이 명령어는 백업에서 복원하고, 인스턴스에 구성된 스토리지 루트 <code translate="no">bucket_A/files</code> 를 사용하여 <code translate="no">milvus_A</code> 내에 coll_bak이라는 새 컬렉션을 생성합니다.</p>
<p>Backup 0.5.16에서는 더 이상 사용되지 않는 <code translate="no">-c</code> 옵션이 <code translate="no">_bak</code> 이 적용되기 전에 백업 내의 컬렉션 이름을 선택합니다. 0.6.0의 <code translate="no">--filter</code> 대체 옵션은 대신 대상 이름을 사용합니다. <a href="/docs/ko/milvus_backup_upgrade.md#Update-CLI-commands">CLI 명령어 업데이트를</a> 참조하십시오.</p>
<p>복원 후, ` <code translate="no">coll_bak</code> `가 존재하는지 확인하고, 필요한 경우 적절한 벡터 인덱스를 생성한 다음, 해당 엔티티 수, 대표값 및 검색 결과를 백업 전에 캡처한 기준값과 비교하십시오. 명령어가 성공적으로 실행되었다고 해서 데이터가 검증된 것은 아닙니다.</p>
