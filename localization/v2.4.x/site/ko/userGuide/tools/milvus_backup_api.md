---
id: milvus_backup_api.md
summary: API를 통한 Milvus 백업 사용 방법 알아보기
title: API를 사용하여 데이터 백업 및 복원
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">API를 사용한 데이터 백업 및 복원<button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>밀버스 백업은 데이터 백업 및 복원 기능을 제공하여 밀버스 데이터의 보안을 보장합니다.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus 백업 받기<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>컴파일된 바이너리를 다운로드하거나 소스에서 빌드할 수 있습니다.</p>
<p>컴파일된 바이너리를 다운로드하려면 모든 공식 릴리스를 찾을 수 있는 <a href="https://github.com/zilliztech/milvus-backup/releases">릴리스</a> 페이지로 이동하세요. 항상 <strong>최신으로</strong> 표시된 릴리즈의 바이너리를 사용하세요.</p>
<p>소스에서 컴파일하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">예제 구성 파일을</a> 다운로드하여 필요에 맞게 조정합니다.</p>
<p>그런 다음 다운로드하거나 빌드한 Milvus Backup 바이너리 옆에 폴더를 만들고 폴더 이름을 <code translate="no">configs</code> 으로 지정한 다음 <code translate="no">configs</code> 폴더 안에 구성 파일을 넣습니다.</p>
<p>폴더 구조는 다음과 비슷해야 합니다:</p>
<pre>
작업 공간 ├── milvus-backup └── configs └── backup.yaml</pre>
<p>Milvus 백업은 데이터를 로컬 경로에 백업할 수 없으므로 구성 파일을 조정할 때 Minio 설정이 올바른지 확인하세요.</p>
<div class="alert note">
<p>기본 Minio 버킷의 이름은 Milvus 설치 방식에 따라 다릅니다. Minio 설정을 변경할 때는 다음 표를 참조하세요.</p>
<table>
<thead>
<tr><th>필드</th><th>도커 컴포즈</th><th>헬름/밀버스 오퍼레이터</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>밀버스-버킷</td></tr>
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
<p>API 서버는 기본적으로 포트 8080에서 수신 대기합니다. <code translate="no">-p</code> 플래그를 사용하여 실행하여 변경할 수 있습니다. 포트 443에서 수신 대기 중인 API 서버를 시작하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>http://localhost:<port>/api/v1/docs/index.html을 사용하여 Swagger UI에 액세스할 수 있습니다.</p>
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
    </button></h2><p>기본 포트 19530에서 수신 대기 중인 빈 로컬 Milvus 인스턴스를 실행하는 경우, 예제 Python 스크립트를 사용하여 인스턴스에서 일부 데이터를 생성하세요. 필요에 따라 스크립트를 자유롭게 변경할 수 있습니다.</p>
<p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">스크립트를</a> 받습니다. 그런 다음 스크립트를 실행하여 데이터를 생성합니다. 공식 Milvus Python SDK인 <a href="https://pypi.org/project/pymilvus/">PyMilvus가</a> 설치되어 있는지 확인합니다.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>이 단계는 선택 사항입니다. 이 단계를 건너뛰는 경우 Milvus 인스턴스에 이미 일부 데이터가 있는지 확인하세요.</p>
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
<p>Milvus 인스턴스에 대해 Milvus 백업을 실행해도 일반적으로 인스턴스 실행에는 영향을 미치지 않습니다. 백업 또는 복원 중에는 Milvus 인스턴스가 완전히 작동합니다.</p>
<p>다음 명령을 실행하여 백업을 생성합니다. 필요한 경우 <code translate="no">collection_names</code> 및 <code translate="no">backup_name</code> 을 변경합니다.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/create&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>명령이 실행되면 Minio 설정에서 지정한 버킷에 다음과 같이 백업을 나열할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/list&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 다음과 같이 백업 파일을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 명령을 실행하는 동안 <code translate="no">backup_id</code> 및 <code translate="no">backup_name</code> 을 목록 API에서 반환한 것으로 변경합니다.</p>
<p>이제 백업 파일을 안전한 곳에 저장하여 나중에 복원할 수 있도록 하거나 <a href="https://cloud.zilliz.com">질리즈 클라우드에</a> 업로드하여 데이터로 관리형 벡터 데이터베이스를 생성할 수 있습니다. 자세한 내용은 <a href="https://zilliz.com/doc/migrate_from_milvus-2x">밀버스에서 질리즈 클라우드로 마이그레이션하기를</a> 참조하세요.</p>
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
<p><code translate="no">collection_suffix</code> 옵션으로 복원 API 명령을 호출하여 백업에서 데이터를 복원하여 새 컬렉션을 만들 수 있습니다. 필요한 경우 <code translate="no">collection_names</code> 및 <code translate="no">backup_name</code> 을 변경합니다.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">collection_suffix</code> 옵션을 사용하면 새로 생성할 컬렉션의 접미사를 설정할 수 있습니다. 위의 명령은 Milvus 인스턴스에 <strong>hello_milvus_recover라는</strong> 새 컬렉션을 만듭니다.</p>
<p>백업된 컬렉션의 이름을 변경하지 않고 복원하려면 백업에서 복원하기 전에 컬렉션을 삭제하세요. 이제 다음 명령을 실행하여 <a href="#Prepare-data">데이터 준비에서</a> 생성된 데이터를 정리할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령을 실행하여 백업에서 데이터를 복원합니다.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>복원 프로세스는 복원할 데이터의 크기에 따라 시간이 오래 걸릴 수 있습니다. 따라서 모든 복원 작업은 비동기적으로 실행됩니다. 복원 작업을 실행하여 복원 작업의 상태를 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">test_restore_id</code> 을 복원 API에 의해 복원된 주소로 변경해야 합니다.</p>
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
    </button></h2><p>복원이 완료되면 다음과 같이 복원된 컬렉션을 인덱싱하여 복원된 데이터를 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>위 스크립트는 <code translate="no">-s</code> 플래그와 함께 <code translate="no">restore</code> 명령을 실행하고 접미사가 <code translate="no">-recover</code> 로 설정되어 있다고 가정합니다. 필요에 따라 스크립트를 자유롭게 변경할 수 있습니다.</p>
