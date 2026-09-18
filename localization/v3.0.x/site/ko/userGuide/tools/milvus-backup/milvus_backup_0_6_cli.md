---
id: milvus_backup_0_6_cli.md
summary: 'CLI를 사용하여 Milvus Backup 0.6.0을 구성하고, 백업을 생성한 다음, 복원된 데이터를 확인합니다.'
title: Milvus Backup 0.6.0 사용
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Milvus Backup 0.6.0 사용<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup을 사용하여 컬렉션을 백업하고, 동일한 Milvus 인스턴스나 다른 Milvus 인스턴스에서 복원할 수 있습니다. 이 가이드는 <strong>Milvus Backup 0.6.0을</strong> 다룹니다. Milvus 3.0에서의 백업 및 복원은 <strong>Milvus 3.0.1부터</strong> 공식적으로 지원됩니다. Backup 0.6.0은 지원되는 Milvus 2.x 버전에서 binlog 워크플로우도 지원합니다. <a href="/docs/ko/milvus_backup_overview.md#Compatibility-matrix">Milvus Backup 호환성을</a> 확인하십시오.</p>
<p>Backup 0.5.x 버전을 계속 사용 중이라면 <a href="/docs/ko/milvus_backup_cli.md">0.5.x CLI 가이드를</a> 참조하십시오. 업그레이드하는 경우, 먼저 <a href="/docs/ko/milvus_backup_upgrade.md">Milvus Backup 업그레이드 절차를</a> 따르십시오.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backup 구하기<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 릴리스에서</a> 사용 중인 운영 체제 및 아키텍처에 맞는 바이너리를 다운로드한 후 압축을 풀어주세요. 바이너리와 구성 예제는 동일한 릴리스 버전을 사용해야 합니다.</p>
<p>소스 코드에서 직접 빌드하려면 <strong>Go 1.26 이상을</strong> 설치한 후 다음 명령을 실행하십시오.</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>사전 빌드된 바이너리의 경우 Go가 필요하지 않습니다. 이후의 모든 셸 명령은 ` <code translate="no">milvus-backup</code>` 파일이 있는 디렉터리에서 실행하십시오.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">구성 파일 준비<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup은 Milvus gRPC 엔드포인트, 관리 엔드포인트, 인스턴스의 스토리지 및 백업 대상에 대한 액세스 권한이 필요합니다. 스냅샷 백업의 경우, Milvus 서버는 백업 스토리지에 대한 액세스 권한도 필요합니다.</p>
<p>구성 디렉터리를 생성합니다:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>이 MinIO 예제를 <code translate="no">configs/backup.yaml</code> 로 저장하십시오. 주소, 자격 증명, 버킷 및 루트 경로는 사용자의 배포 환경에 맞게 변경하십시오. <code translate="no">minioadmin</code> 의 자격 증명은 MinIO 테스트용 기본값입니다.</p>
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
<li><code translate="no">milvus.grpc</code> 백업 또는 복원 대상 인스턴스에 연결합니다. 인증이 활성화된 경우, <code translate="no">milvus.user</code> 및 <code translate="no">milvus.password</code> 도 설정하십시오.</li>
<li><code translate="no">milvus.management.endpoint</code> 백업 중 가비지 컬렉션 일시 중지/재개를 위해 사용됩니다.</li>
<li><code translate="no">milvus.storage</code> 인스턴스의 실제 오브젝트 스토리지와 일치해야 합니다. 여기에 버킷을 설정해도 Milvus 구성은 변경되지 않습니다.</li>
<li><code translate="no">backup.storage</code> 백업 위치를 식별합니다. 설정되지 않은 필드는 <code translate="no">milvus.storage</code> 에서 상속받으며, <code translate="no">rootPath</code> 는 예외로 기본값이 <code translate="no">backup</code> 로 설정됩니다.</li>
<li><code translate="no">transfer.mode: auto</code> 백엔드가 일치할 경우 스토리지 측 복사를 선택하고, 그렇지 않은 경우 Milvus Backup을 통한 스트리밍을 선택합니다. 이 설정은 백업 형식이 아닌 오브젝트 전송을 제어합니다.</li>
</ul>
<p>일반적인 스토리지 기본값은 다음과 같습니다. 사용하기 전에 실행 중인 배포 환경의 값을 확인하십시오.</p>
<table>
<thead>
<tr><th>설정</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>버킷</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>루트 경로</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Milvus 서버가 백업 저장소에 접속하기 위해 다른 주소를 사용하는 경우, ` <code translate="no">backup.storage.milvusAddress</code> ` 및 ` <code translate="no">milvusPort</code> `를 서버에서 접근 가능한 주소로 설정하십시오. 인증, TLS, 기타 스토리지 제공업체 및 추가 설정에 대해서는 <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 구성 예제를</a> 참조하십시오.</p>
<p>실제 값을 확인하고 연결 상태를 점검하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> 각 값의 출처를 보고하면서 비밀 값은 가려집니다. 연결 상태 확인 결과에는 <code translate="no">Success!</code> 이 표시되어야 합니다. 백업을 생성하기 전에 연결 또는 스토리지 오류를 해결하십시오.</p>
<p>기존 v1 구성에 대해서는 <a href="/docs/ko/milvus_backup_upgrade.md#Migrate-the-configuration">Milvus 백업 업그레이드를</a> 참조하십시오. 자동 구성 변환은 제거된 CLI 플래그를 대체하지 않습니다.</p>
<h2 id="Prepare-data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll</code> 라는 이름의 기존 컬렉션을 사용하고, <code translate="no">coll_bak</code> 가 존재하지 않는지 확인하십시오. 백업 전에 스키마, 엔티티 수, 대표적인 스칼라 및 벡터 값, 그리고 알려진 검색 결과를 기록해 두십시오. 복원된 사본과 비교할 때는 예제 데이터를 변경하지 않은 상태로 유지하십시오. 대신 소규모의 일회용 데이터셋을 생성하려면 <a href="/docs/ko/snapshot-backup-and-restore.md#Prepare-sample-data">‘샘플 데이터 준비’를</a> 참조하십시오.</p>
<h2 id="Back-up-data" class="common-anchor-header">데이터 백업<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll</code> 의 명명된 백업을 생성합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>create 명령어는 <code translate="no">create backup success</code> 을 반환해야 합니다. <code translate="no">get</code> 은 백업 메타데이터를 반환하므로, 예상되는 컬렉션이 포함되어 있는지 확인하십시오. <code translate="no">--filter</code> 을 생략하면 모든 적격 컬렉션이 백업됩니다. 외부 컬렉션은 건너뜁니다.</p>
<p><code translate="no">--filter</code> 쉼표로 구분된 이름을 지원합니다: 기본 데이터베이스의 <code translate="no">coll</code>, <code translate="no">db1.coll</code>, 또는 데이터베이스 내 모든 컬렉션을 위한 <code translate="no">'db1.*'</code>. 셸 확장을 방지하려면 <code translate="no">*</code> 가 포함된 패턴을 따옴표로 묶으십시오.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">백업 형식 또는 목적 선택<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>기본값인 <code translate="no">--format auto</code> 을 사용하면 Milvus 3.0은 스냅샷 백업을 사용하며, 지원되는 Milvus 2.x 서버는 바이너리 로그(binlog)를 사용합니다. 바이너리 로그 동작을 명시적으로 유지하려면 <code translate="no">--format binlog</code> 을 전달하십시오. <a href="/docs/ko/snapshot-backup-and-restore.md">스냅샷 예제에서는</a> <code translate="no">--format snapshot</code> 을 명시적으로 선택합니다.</p>
<p>다음과 같이 용도가 작업 흐름에 부합할 때 ` <code translate="no">--for</code> `를 사용하십시오:</p>
<table>
<thead>
<tr><th>목적</th><th>프리셋에서 적용되는 값</th><th>사용 목적</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>RBAC 백업을 활성화하며, 사용자가 선택한 형식과 전략을 유지합니다</td><td>데이터를 다른 인스턴스로 복사합니다. ‘ <code translate="no">auto</code> ’는 Milvus 3.0의 스냅샷을 사용합니다</td></tr>
<tr><td><code translate="no">archive</code></td><td><code translate="no">binlog</code> 을 강제 적용하고 RBAC 백업을 활성화합니다</td><td>나중에 복원할 수 있도록 빈로그(binlog) 형식의 백업을 유지합니다</td></tr>
<tr><td><code translate="no">secondary</code></td><td><code translate="no">binlog</code>, <code translate="no">bulk_flush</code>, RBAC 백업 및 인덱스 추가 메타데이터를 강제 적용</td><td>구성된 복제 토폴로지에서 보조 노드를 초기화합니다</td></tr>
</tbody>
</table>
<p>예:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>사전 설정은 해당 옵션에 대해 상충되는 값을 재정의합니다. 예를 들어, ` <code translate="no">--for archive --format snapshot</code> `는 바이너리 로그 백업을 생성합니다. RBAC 메타데이터를 백업한다고 해서 자동으로 복원되는 것은 아닙니다. 필요한 경우 `restore` 명령어의 ` <code translate="no">--rbac</code> ` 옵션을 사용하십시오.</p>
<p><code translate="no">secondary</code> 이는 일반적인 인스턴스 간 복원을 위한 지름길이 아닙니다. 또한 인덱스 메타데이터를 위해 소스 etcd에 대한 액세스 권한, 올바른 복제 클러스터 ID 및 채널, 그리고 새로운 세컨더리 대상이 필요합니다. 백업에는 ` <code translate="no">meta/full_meta.json</code>`을 포함한 완전한 메타데이터가 유지되어야 합니다. 복제 구성 및 장애 조치 수행은 이 가이드의 범위를 벗어납니다. 버전별 구현 및 요구 사항에 대해서는 <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0 소스</a> 코드 <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">및 참조</a> 문서를 참조하십시오.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">백업 전체 보존<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>백업은 <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code> 아래에 저장됩니다. 이 디렉터리의 모든 객체를 보존해야 합니다. 스냅샷 백업에는 내보낸 번들뿐만 아니라 메타데이터도 포함됩니다.</p>
<p>메타데이터 파일만 복사하거나 스냅샷 백업이 바이너리 로그 백업과 동일한 구조를 가지고 있다고 가정해서는 안 됩니다.</p>
<h2 id="Restore-data" class="common-anchor-header">데이터 복원<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll</code> 을 구성된 인스턴스의 <code translate="no">coll_bak</code> 으로 복원하십시오.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>CLI에서 <code translate="no">--filter</code> 은 <code translate="no">-s</code> 또는 <code translate="no">--rename</code> 이 적용된 <strong>후의</strong> 이름과 일치합니다. <code translate="no">--filter coll -s _bak</code> 이 포함된 명령어는 일치하는 항목이 없으므로 컬렉션을 복원하지 않고도 성공적으로 종료될 수 있습니다.</p>
<p>원래 이름을 사용하여 복원하려면 해당 컬렉션 이름이 존재하지 않는 대상을 선택하고, 구성을 해당 대상과 백업 위치로 지정한 다음 접미사를 생략하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>동일 인스턴스에 대한 전체 예제는 <a href="/docs/ko/snapshot-backup-and-restore.md">‘단일 인스턴스 내 스냅샷 백업 및 복원’을</a> 참조하십시오. 기존의 인스턴스 간 일반적인 사례 페이지에서는 Backup 0.5.16 및 v1 구성을 사용합니다. 해당 명령을 변경 없이 0.6.0에 적용하지 마십시오. 0.6.0 전송 구성에 대해서는 <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">버전별 전송 가이드를</a> 참조하십시오.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">복원된 데이터 확인<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll_bak</code> 가 존재하는지 확인하십시오. 복원 과정에서 벡터 인덱스가 재작성되지 않은 경우, 컬렉션을 로드하기 전에 스키마에 적합한 인덱스를 생성하십시오. 스키마, 엔티티 수, 스칼라 및 벡터 값, 알려진 검색 결과를 백업 전에 캡처된 기준선과 비교하십시오.</p>
<p>일회용 256개 엔티티 데이터셋의 경우, <a href="/docs/ko/snapshot-backup-and-restore.md#Verify-the-result">‘결과 확인’</a> 섹션에 있는 전체 점검 절차를 따르십시오. 명령어가 성공적으로 실행되었다고 해서 예상된 데이터가 복원되었다는 것을 보장하지는 않습니다.</p>
