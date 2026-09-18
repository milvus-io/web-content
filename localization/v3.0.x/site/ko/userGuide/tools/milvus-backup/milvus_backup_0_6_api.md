---
id: milvus_backup_0_6_api.md
summary: HTTP API를 통해 Milvus Backup 0.6.0의 백업 및 복원 작업을 생성하고 모니터링합니다.
title: Milvus Backup 0.6.0 HTTP API 사용
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Milvus Backup 0.6.0 HTTP API 사용<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup HTTP API를 사용하여 백업을 생성하고, 컬렉션을 복원하며, 비동기 작업을 모니터링할 수 있습니다. 아래의 스냅샷 예제는 <strong>Milvus 3.0.1 이상 버전과</strong> <strong>Milvus Backup 0.6.0을</strong> 함께 사용하는 경우를 다룹니다. Backup 0.5.x 버전의 경우, <a href="/docs/ko/milvus_backup_api.md">0.5.x API 가이드를</a> 참조하십시오. 기존 설치 환경의 경우, <a href="/docs/ko/milvus_backup_upgrade.md">‘Milvus Backup 업그레이드’를</a> 참조하십시오.</p>
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 릴리스에서</a> 적절한 바이너리를 다운로드하여 압축을 해제하십시오. 소스 코드에서 직접 빌드하려면 <a href="/docs/ko/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">‘Milvus Backup 구하기’를</a> 따르십시오. 빌드에는 Go 1.26 이상이 필요합니다.</p>
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
    </button></h2><p><a href="/docs/ko/milvus_backup_0_6_cli.md#Prepare-configuration-file">'구성 파일 준비'의</a> v2 예제를 사용하여 ` <code translate="no">configs/backup.yaml</code> ` <a href="/docs/ko/milvus_backup_0_6_cli.md#Prepare-configuration-file">파일을</a> 생성하십시오. Milvus, 인스턴스의 스토리지 및 백업 대상에 대한 액세스를 구성하십시오. 또한 Milvus 서버는 스냅샷 작업을 위해 백업 스토리지에 액세스할 수 있어야 합니다.</p>
<p>v1 파일이 있는 경우, 해당 파일은 계속 불러올 수 있습니다. 스키마나 환경 변수를 변경하기 전에 <a href="/docs/ko/milvus_backup_upgrade.md#Migrate-the-configuration">‘구성 마이그레이션’을</a> 참조하십시오.</p>
<p>바이너리가 포함된 디렉터리에서 구성을 확인하고 연결 상태를 점검하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>연결성 검사 결과 " <code translate="no">Success!</code>"가 표시되면 다음 단계로 진행하십시오.</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">API 서버를 시작하십시오<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>확인한 구성으로 서비스를 시작하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>기본 포트는 8080입니다. 다른 포트를 선택하려면 ` <code translate="no">-p</code>`을 사용하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>특정 서비스에 대해서는 이 명령어 중 하나만 실행하십시오. 아래 예제에서는 포트 8080을 사용합니다. 다른 포트를 선택한 경우 URL을 변경하십시오. Swagger UI는 <code translate="no">http://localhost:8080/api/v1/docs/index.html</code> 에서 이용할 수 있습니다.</p>
<p>태스크를 폴링하는 동안 서비스를 계속 실행 상태로 유지하십시오. 태스크 ID와 실시간 진행 상황은 서비스 프로세스에 속하며, 프로세스가 중지된 후에도 영구 저장된 백업은 객체 스토리지에 남아 있습니다.</p>
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
    </button></h2><p><code translate="no">coll</code> 라는 이름의 기존 컬렉션을 사용하거나, <a href="/docs/ko/snapshot-backup-and-restore.md#Prepare-sample-data">'샘플 데이터 준비'에서</a> 256개 엔티티로 구성된 테스트 컬렉션을 생성하십시오. 자체 데이터를 사용하는 경우 요청 내의 컬렉션 이름을 변경하십시오. 결과를 확인하는 동안 테스트 데이터는 변경하지 마십시오.</p>
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
    </button></h2><p>비동기 백업 요청을 제출합니다.</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>응답에는 ` <code translate="no">requestId</code>` 값이 포함됩니다. 요청을 제출했다고 해서 백업이 완료된 것은 아닙니다. 해당 값을 ` <code translate="no">backup_id</code> `에 복사한 후 주기적으로 확인하십시오:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">data.state_code</code> 가 <code translate="no">2</code> 로 변경될 때까지 기다리십시오. API는 다음과 같은 작업 상태를 사용합니다:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>의미</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>초기</td></tr>
<tr><td><code translate="no">1</code></td><td>실행 중</td></tr>
<tr><td><code translate="no">2</code></td><td>성공</td></tr>
<tr><td><code translate="no">3</code></td><td>실패</td></tr>
<tr><td><code translate="no">4</code></td><td>시간 초과</td></tr>
</tbody>
</table>
<p>응답과 작업 상태를 모두 확인하십시오. HTTP 200 상태 코드만으로는 충분하지 않습니다. 0이 아닌 응답 <code translate="no">code</code> 는 오류를 나타냅니다. 성공적인 응답의 경우 <code translate="no">code</code> 는 값이 0이므로 생략될 수 있습니다. 작업이 실패하거나 시간 초과된 경우, 해당 백업에서 복원하기 전에 응답 세부 정보와 서버 로그를 확인하십시오.</p>
<p>저장된 백업 목록을 확인하고 이름으로 완료된 백업을 조사하세요:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> <code translate="no">collection_backups</code> 을 포함한 JSON 메타데이터를 반환하며, 백업 파일은 <strong>다운로드하지 않습니다</strong>. 다른 프로세스에서 생성된 백업의 경우, 이름만 지정하여 쿼리하면 실시간 작업 진행 상황 없이 메타데이터만 반환될 수 있습니다. 진행 중인 백업을 모니터링할 때는 현재 서비스의 생성 응답에서 제공된 작업 ID를 사용하십시오.</p>
<p>기본 형식은 <code translate="no">auto</code> 이며, 이는 Milvus 3.0에서 스냅샷을 선택합니다. 바이너리 로그를 명시적으로 요청하려면 create 본문에 <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> 를 추가하십시오. CLI의 <code translate="no">--for</code> 사전 설정은 HTTP 요청 필드가 아닙니다.</p>
<p>백업을 보존하거나 이동하려면 오브젝트 스토리지의 전체 디렉터리를 복사하십시오. <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">0.6.0 전송 가이드를</a> 참조하십시오.</p>
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
    </button></h2><p><code translate="no">coll_bak</code> 이 이미 존재하지 않는지 확인하십시오. 접미사를 포함하여 복원 요청을 제출하십시오:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>HTTP의 <code translate="no">collection_names</code> 필드는 접미사가 적용되기 전 <strong>백업 내의</strong> 이름을 선택합니다. 이 요청은 <code translate="no">coll</code> 을 선택하여 <code translate="no">coll_bak</code> 을 생성합니다. 반면 CLI의 <code translate="no">--filter</code> 은 이름 변경 후 대상 이름을 일치시킵니다. 이 HTTP 필드에 <code translate="no">coll_bak</code> 을 대입하지 마십시오.</p>
<p>복원 응답에서 <code translate="no">data.id</code> 를 복사한 후 작업 상태를 확인하십시오:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">data.state_code: 2</code> 가 표시될 때까지 기다린 후, <code translate="no">collection_restore_tasks</code> 에서 예상되는 대상 컬렉션을 확인하십시오. 제출된 작업이 곧바로 검증된 복원을 의미하는 것은 아닙니다.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">원본 이름으로 복원<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">coll</code> 가 존재하지 않는 대상 인스턴스를 사용하십시오. 해당 대상 및 완료된 백업 위치에 대해 구성된 별도의 백업 API 서비스를 시작한 다음, 대상 서비스에 다음 요청을 전송하십시오:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>반환된 작업 ID를 사용하여 동일한 서비스에서 <code translate="no">get_restore</code> 를 폴링하십시오. 복원 대상에 대해 <code translate="no">milvus.*</code> 를, 기존 백업에 대해 <code translate="no">backup.storage</code> 를 구성하십시오. <a href="/docs/ko/milvus_backup_0_6_cli.md#Prepare-configuration-file">‘구성 파일 준비’를</a> 참조하십시오.</p>
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
    </button></h2><p>복원 작업이 성공한 후, 대상 Milvus 인스턴스에 연결하여 예상된 컬렉션과 데이터가 존재하는지 확인하십시오. 256개 엔티티로 구성된 테스트 컬렉션의 경우, <a href="/docs/ko/snapshot-backup-and-restore.md#Verify-the-result">'결과 확인'</a> 섹션에 있는 스칼라, 벡터 및 검색에 대한 전체 검사를 수행하십시오.</p>
<p>원본 이름으로 복원할 경우 <code translate="no">coll_bak</code> 을 <code translate="no">coll</code> 로 변경하십시오. 검증 코드는 복원된 데이터를 삭제하지 않고 읽어들입니다. 운영 환경 데이터의 경우, 백업 시점에 캡처된 기준 데이터와 비교하십시오.</p>
