---
id: milvus_backup_upgrade.md
summary: 'Milvus 백업을 0.5.x에서 0.6.0으로 업그레이드하고, 구성 및 명령어를 업데이트한 후, 백업 및 복원 기능을 검증합니다.'
title: Milvus Backup을 0.6.0으로 업그레이드하기
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Milvus Backup을 0.6.0으로 업그레이드하기<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Milvus Backup 도구를</strong> 0.5.x에서 0.6.0으로 업그레이드할 때는 이 가이드를 사용하십시오. 이 가이드는 Milvus 서버를 업그레이드하지 않습니다. 0.5.x 버전을 계속 사용하려면 <a href="/docs/ko/milvus_backup_cli.md">0.5.x CLI</a> 또는 <a href="/docs/ko/milvus_backup_api.md">API</a> 가이드를 계속 사용하십시오. 새로 설치하는 경우에는 <a href="/docs/ko/milvus_backup_0_6_cli.md">0.6.0 가이드를</a> 사용하십시오.</p>
<p>V1 YAML 구성은 여전히 자동 변환을 통해 로드됩니다. 그러나 0.6.0에서는 더 이상 사용되지 않는 CLI 플래그가 거부되며, Milvus 3.0에서는 기본 백업 형식이 변경됩니다. 예약된 작업이나 서비스를 전환하기 전에 구성 및 명령어를 모두 검토하십시오.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">시작점 확인<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>백업 버전, Milvus 소스 및 대상 버전, 구성 파일, 환경 변수 재정의, 백업 위치, 스크립트나 API 서비스에서 사용하는 명령어를 기록해 두십시오. 해당 서버 버전에 대한 <a href="/docs/ko/milvus_backup_overview.md#Compatibility-matrix">호환성 정보를</a> 확인하십시오.</p>
<p>새 설치를 검증하는 동안 원본 바이너리, 구성 및 기존 백업 디렉터리를 유지하십시오. <a href="/docs/ko/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">‘Milvus Backup 다운로드’를</a> 사용하여 0.6.0을 별도의 디렉터리에 다운로드하십시오. 아래의 모든 명령어는 해당 디렉터리에서 실행되며 0.6.0 바이너리를 호출합니다. v1 구성 파일의 사본을 <code translate="no">configs/backup-v1.yaml</code> 에 배치하십시오.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">구성 마이그레이션<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>v1 구성 파일은 0.6.0에서도 여전히 로드됩니다. Milvus Backup은 시작 시 이를 v2로 변환하고 경고 메시지를 표시합니다. 변환된 구성 파일을 별도의 파일에 저장하려면 다음 명령을 실행하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> 유효하지 않은 마이그레이션된 구성은 거부됩니다. <code translate="no">--output</code> 가 지정되지 않은 경우, 이 명령은 v2 YAML을 표준 출력으로 기록합니다. 해결된 설정을 확인한 후에만 새 파일을 검토하고 사용하십시오.</p>
<table>
<thead>
<tr><th>v1 설정</th><th>v2 설정</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>다음 아래의 소스 저장소 <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>백업 저장소 아래 <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>저장소 자격 증명</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, 명시적인 <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>구성 파일과 동일한 변경 사항에서 환경 변수를 검토하십시오. V2는 <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code> 와 같이 지원되는 자격 증명 관련 환경 변수만 허용합니다. 구버전 v1 이름은 v2 파일에 적용되지 않습니다. 버킷 이름 및 엔드포인트와 같은 자격 증명과 무관한 설정의 경우, YAML 또는 구성 키 재정의 기능을 사용하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> 비밀 값을 출력 파일에 복사하지 않고 영향을 받는 환경 변수만 보고합니다. <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">지원되는 v2 환경 변수를</a> 참조하십시오. ` <code translate="no">config show</code> `는 더 이상 사용되지 않는 ` <code translate="no">check config</code> ` 명령을 대체합니다.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">CLI 명령어 업데이트<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>0.5 버전에서 사용 중단된 플래그는 0.6.0 버전에서 거부됩니다. 바이너리를 업그레이드하기 전에 스크립트를 업데이트하십시오.</p>
<table>
<thead>
<tr><th>명령어</th><th>제거된 옵션</th><th>대체 명령어</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, 대상 이름을 사용하여</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>플래그를 제거하면, <code translate="no">get</code> 는 백업 정보를 반환합니다</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>이에 상응하는 컬렉션 필터 없음</td></tr>
</tbody>
</table>
<p>예를 들어, 다음 0.5.16 명령어는 소스 이름 <code translate="no">coll</code> 을 선택합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>0.6.0 버전에서 이를 대체하는 명령어는 복원을 위해 대상 이름을 사용합니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>일치하는 항목이 없는 복원 필터는 컬렉션을 생성하지 않고도 성공적으로 종료될 수 있습니다. 항상 대상 컬렉션과 해당 데이터를 확인하십시오. HTTP API의 ` <code translate="no">collection_names</code> `는 여전히 백업 내의 소스 이름을 선택합니다. <a href="/docs/ko/milvus_backup_0_6_api.md#Restore-data">0.6.0 API 가이드를</a> 참조하십시오.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">백업 동작 선택<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>지원되는 Milvus 2.x 서버에서 ` <code translate="no">auto</code> ` 형식은 binlog를 사용합니다. 백업 기능을 업그레이드하기 위해 Milvus 3.0으로 전환할 필요는 없습니다.</li>
<li>Milvus 3.0에서는 <code translate="no">auto</code> 가 스냅샷을 선택합니다. 공식 백업 및 복원 지원은 Milvus 3.0.1부터 시작됩니다. 백업을 생성할 때 binlog 동작을 유지하려면 <code translate="no">--format binlog</code> 를 전달하십시오.</li>
<li>V1 구성 호환성은 제거된 명령어 플래그를 보존하지 않으며, 새 형식의 기본값을 재정의하지도 않습니다.</li>
<li>목적 프리셋을 통해 형식 및 기타 옵션을 설정할 수 있습니다. 예를 들어, <code translate="no">--for archive</code> 는 <code translate="no">--format snapshot</code> 가 함께 지정된 경우에도 바이너리 로그를 강제 적용합니다. <a href="/docs/ko/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">형식 및 목적 선택을</a> 검토하십시오.</li>
<li>백업 중에는 외부 컬렉션이 건너뜁니다. 모든 컬렉션이 포함되었다는 증거로 작업 성공 여부를 간주하기보다는 백업 메타데이터를 확인하십시오.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">작업 전환 전 유효성 검사<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 binlog 형식을 유지하면서 새 컬렉션으로 복원합니다. ` <code translate="no">coll</code> `을 스키마, 개수, 스칼라 및 벡터 값, 검색 결과를 기록해 둔 컬렉션으로 대체하십시오. 새로운 백업 이름을 사용하고, 대상 이름 ` <code translate="no">coll_upgrade_check</code> `이 존재하지 않는지 확인하십시오.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>백업 목록에 <code translate="no">coll</code> 이 포함되어 있는지, 그리고 복원 후 <code translate="no">coll_upgrade_check</code> 이 존재하는지 확인하십시오. 필요한 경우 벡터 인덱스를 생성하고 로드한 다음, 복원된 데이터와 검색 결과를 기록해 둔 기준값과 비교하십시오. 이 테스트 동안 소스 데이터는 변경하지 마십시오.</p>
<p>또한 새로운 도구를 사용하여 백업을 활용하기 전에, 대표적인 기존 백업을 테스트하십시오. <code translate="no">coll</code> 을 포함하는 <code translate="no">legacy_backup</code> 이라는 이름의 0.5.16 백업의 경우, 별도의 대상 이름을 사용하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이러한 업그레이드 경로는 <strong>Milvus 2.6.11</strong>, 백업 <strong>0.5.16 → 0.6.0</strong> 및 MinIO의 binlog 백업을 사용하여 검증되었습니다. 새로 생성된 백업과 기존 백업 모두 일치하는 엔티티 값과 벡터 검색 결과로 복원되었습니다. 이는 모든 과거 백업이나 Milvus 2.x에서 3.0으로의 복원과의 호환성을 보장하는 것은 아닙니다. 또한 0.5.x가 0.6.0에서 생성된 백업을 읽을 수 있음을 보장하지도 않습니다.</p>
<p>검증이 성공하면, 새로운 바이너리, 확인된 구성, 환경 설정 및 교체 플래그를 함께 사용하도록 작업을 업데이트하십시오. API 배포의 경우, 확인된 구성으로 새 서비스를 시작하고 <a href="/docs/ko/milvus_backup_0_6_api.md">0.6.0 HTTP API를</a> 통해 작업 완료 여부를 확인하십시오. Milvus 3.0.1 이상에서 스냅샷을 적용하려면 <a href="/docs/ko/snapshot-backup-and-restore.md">‘단일 인스턴스에서의 스냅샷 백업 및 복원’을</a> 따르십시오.</p>
