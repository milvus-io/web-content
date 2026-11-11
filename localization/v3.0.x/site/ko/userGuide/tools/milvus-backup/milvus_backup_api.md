---
id: milvus_backup_api.md
summary: API를 통해 Milvus Backup을 사용하는 방법을 알아보세요
title: API를 사용하여 데이터 백업 및 복원Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">API를 사용하여 데이터 백업 및 복원<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>현재 워크플로우에 대해서는 <a href="/docs/ko/milvus_backup_0_6_api.md">HTTP API 가이드를</a> 참조하거나 <a href="/docs/ko/milvus_backup_upgrade.md">0.5.x 버전에서 업그레이드하십시오</a>. 지원되는 Milvus 서버 버전은 <a href="/docs/ko/milvus_backup_overview.md#Compatibility-matrix">호환성 매트릭스를</a> 확인하십시오.</p>
<p>Milvus Backup은 Milvus 데이터의 보안을 보장하기 위한 데이터 백업 및 복원 기능을 제공합니다.</p>
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
    </button></h2><p>컴파일된 바이너리를 다운로드하거나 소스 코드를 사용하여 직접 빌드할 수 있습니다.</p>
<p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">0.5.16 릴리스에서</a> 사용 중인 운영 체제 및 아키텍처에 맞는 바이너리를 다운로드하십시오. 이 페이지에 있는 해당 0.5.16 구성 및 예제를 사용하십시오.</p>
<p>소스 코드에서 0.5.16을 빌드하려면 Go 1.25 이상을 설치한 후 다음 명령을 실행하십시오:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">예제 구성 파일을</a> 다운로드하여 필요에 맞게 수정하십시오.</p>
<p>그런 다음 다운로드하거나 빌드한 Milvus Backup 바이너리 옆에 폴더를 생성하고, 폴더 이름을 ‘ <code translate="no">configs</code> ’로 지정한 후, ‘ <code translate="no">configs</code> ’ 폴더 안에 구성 파일을 넣어주세요.</p>
<p>폴더 구조는 다음과 같아야 합니다:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>이 예제에서는 백업 저장소로 MinIO를 사용합니다. 주소, 인증 정보, 버킷 이름 및 루트 경로를 포함하여 Milvus 저장소 및 백업 대상에 맞게 ` <code translate="no">minio.*</code> `을 설정하십시오.</p>
<div class="alert note">
<p>기본 MinIO 버킷 이름은 Milvus 설치 방식에 따라 다릅니다. MinIO 설정을 변경할 때는 다음 표를 참조하십시오.</p>
<table>
<thead>
<tr><th>필드</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>파일</td><td>파일</td></tr>
</tbody>
</table>
</div>
<h2 id="Start-up-the-API-server" class="common-anchor-header">API 서버 시작<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>그런 다음 다음과 같이 API 서버를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>API 서버는 기본적으로 8080번 포트에서 연결을 수신 대기합니다. ` <code translate="no">-p</code> ` 플래그를 사용하여 이 설정을 변경할 수 있습니다. API 서버가 443번 포트에서 연결을 수신 대기하도록 하려면 다음과 같이 하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>http://localhost을 사용하여 Swagger UI에 접속할 수 있습니다:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>기본 포트인 19530에서 수신 대기 중인 빈 로컬 Milvus 인스턴스를 실행하는 경우, 예제 Python 스크립트를 사용하여 인스턴스에 데이터를 생성하십시오. 필요에 따라 스크립트를 자유롭게 수정하여 사용하십시오.</p>
<p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">스크립트를</a> 다운로드한 후, 스크립트를 실행하여 데이터를 생성하십시오. Milvus의 공식 Python SDK인 <a href="https://pypi.org/project/pymilvus/">PyMilvus가</a> 설치되어 있는지 확인하십시오.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>이 단계는 선택 사항입니다. 이 단계를 건너뛰는 경우, Milvus 인스턴스에 이미 데이터가 일부 존재하는지 확인하십시오.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Milvus 인스턴스에 대해 Milvus Backup을 실행해도 일반적으로 인스턴스 실행에는 영향을 미치지 않습니다. 백업 또는 복원 중에도 Milvus 인스턴스는 정상적으로 작동합니다.</p>
<p>다음 명령어를 실행하여 백업을 생성하십시오. 필요한 경우 <code translate="no">collection_names</code> 및 <code translate="no">backup_name</code> 을 변경하십시오.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>생성 요청은 비동기식으로 처리됩니다. 반환된 <code translate="no">requestId</code> 을 <code translate="no">backup_id</code> 로 설정하여 <code translate="no">get_backup</code> 을 폴링하고, <code translate="no">data.state_code</code> 이 <code translate="no">2</code> 상태가 될 때까지 기다린 후 복원하십시오.</p>
<p>Minio 설정에 지정된 버킷의 백업 목록은 다음과 같이 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 백업 메타데이터를 조회할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">backup_id</code> 및 <code translate="no">backup_name</code> 을 사용자의 백업 값으로 대체하십시오. 이 엔드포인트는 백업 파일이 아닌 JSON 메타데이터를 반환합니다. 백업을 아카이빙할 때 오브젝트 스토리지에서 전체 백업 디렉터리를 복사하십시오.</p>
<p>이제 백업 파일을 안전한 곳에 저장하여 나중에 복원하거나, <a href="https://cloud.zilliz.com">Zilliz</a> Cloud에 업로드하여 데이터로 구성된 관리형 벡터 데이터베이스를 생성할 수 있습니다. 자세한 내용은 <a href="https://zilliz.com/doc/migrate_from_milvus-2x">‘Milvus에서 Zilliz Cloud로 마이그레이션’을</a> 참조하십시오.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p><code translate="no">collection_suffix</code> 옵션을 사용하여 복원 API 명령을 호출하면 백업에서 데이터를 복원하여 새 컬렉션을 생성할 수 있습니다. 필요한 경우 <code translate="no">collection_names</code> 및 <code translate="no">backup_name</code> 을 변경하십시오.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">collection_suffix</code> 옵션을 사용하면 생성될 새 컬렉션의 접미사를 설정할 수 있습니다. 위의 명령어를 실행하면 Milvus 인스턴스에 <strong>hello_milvus_recover라는</strong> 새 컬렉션이 생성됩니다.</p>
<p>백업된 컬렉션의 이름을 변경하지 않고 복원하려면, 백업에서 복원하기 전에 해당 컬렉션을 삭제하십시오. 이제 다음 명령을 실행하여 <a href="#Prepare-data">‘데이터 준비(Prepare data</a> )’ 단계에서 생성된 데이터를 정리할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령어를 실행하여 백업에서 데이터를 복원하십시오.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>복원할 데이터의 크기에 따라 복원 과정에 시간이 오래 걸릴 수 있습니다. 따라서 위의 예제에서는 ` <code translate="no">&quot;async&quot;: true</code>`을 사용하여 비동기 실행을 요청합니다. 다음 명령어를 실행하여 복원 작업의 상태를 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">test_restore_id</code> 을 복원 API에서 반환한 <code translate="no">data.id</code> 으로 변경해야 합니다. 데이터를 확인하기 전에 <code translate="no">data.state_code</code> 이 <code translate="no">2</code> 상태가 될 때까지 기다리십시오. <code translate="no">3</code> 은 실패를, <code translate="no">4</code> 은 타임아웃을 나타냅니다.</p>
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
    </button></h2><p>작업이 성공한 후, <code translate="no">hello_milvus_recover</code> 가 존재하는지 확인하십시오. 적절한 인덱스를 생성하고 컬렉션을 로드한 다음, 엔티티 수, 스칼라 및 벡터 값, 검색 결과를 백업 전에 캡처한 원본 데이터와 비교하십시오. 원본 이름 복원의 경우, 대신 <code translate="no">hello_milvus</code> 를 사용하십시오.</p>
<p>CLI 가이드에 링크된 <code translate="no">verify_data.py</code> 예제는 두 개의 복원된 컬렉션을 예상하며, 마지막에 이를 삭제합니다. 이는 <code translate="no">hello_milvus</code> 만을 선택하는 이 API 예제에는 적합하지 않습니다.</p>
