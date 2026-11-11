---
id: milvus_backup_cli.md
summary: CLI를 통해 Milvus Backup을 사용하는 방법을 알아보세요
title: 명령을 사용하여 데이터 백업 및 복원Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">명령을 사용하여 데이터 백업 및 복원<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h2><p>컴파일된 바이너리를 다운로드하거나 소스 코드를 사용하여 빌드할 수 있습니다.</p>
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
<p>이 예제에서는 백업 저장소로 MinIO를 사용합니다. 주소, 인증 정보, 버킷 이름 및 루트 경로를 포함하여 Milvus 저장소 및 백업 대상에 맞게 <code translate="no">minio.*</code> 을 설정하십시오.</p>
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
    </button></h2><p>기본 포트에서 빈 로컬 Milvus 인스턴스를 실행하는 경우, 예제 Python 스크립트를 사용하여 인스턴스에 데이터를 생성하십시오. 필요에 따라 스크립트를 자유롭게 수정하여 사용하십시오.</p>
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
    </button></h2><p>Milvus 인스턴스에 대해 Milvus Backup을 실행해도 일반적으로 인스턴스 실행에는 영향을 미치지 않습니다. 백업 또는 복원 중에도 Milvus 인스턴스는 정상적으로 작동합니다.</p>
<div class="tab-wrapper"></div>
<p>다음 명령어를 실행하여 백업을 생성하십시오.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>명령이 실행되면 Minio 설정에 지정된 버킷에서 백업 파일을 확인할 수 있습니다. 구체적으로, <strong>Minio 콘솔이나</strong> <strong>mc</strong> 클라이언트를 사용하여 파일을 다운로드할 수 있습니다.</p>
<p><a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio 콘솔에서</a> 다운로드하려면, Minio 콘솔에 로그인하여 <code translate="no">minio.backupBucketName</code> 에 지정된 버킷을 찾은 다음, 버킷 내의 파일을 선택하고 <strong>‘다운로드(Download)’를</strong> 클릭하여 파일을 다운로드하십시오.</p>
<p><a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc 클라이언트를</a> 사용하려면 다음 단계를 따르세요.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>이제 백업 파일을 안전한 곳에 저장해 두었다가 나중에 복원하거나, <a href="https://cloud.zilliz.com">Zilliz</a> Cloud에 업로드하여 데이터가 포함된 관리형 벡터 데이터베이스를 생성할 수 있습니다. 자세한 내용은 <a href="https://zilliz.com/doc/migrate_from_milvus-2x">‘Milvus에서 Zilliz Cloud로 마이그레이션’을</a> 참조하십시오.</p>
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
<p>` <code translate="no">restore</code> ` 명령을 ` <code translate="no">-s</code> ` 플래그와 함께 실행하여 백업에서 데이터를 복원함으로써 새 컬렉션을 생성할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> 플래그를 사용하면 생성될 새 컬렉션의 접미사를 설정할 수 있습니다. 위 명령어를 실행하면 Milvus 인스턴스에 <strong>hello_milvus_recover라는</strong> 새 컬렉션이 생성됩니다.</p>
<p>백업된 컬렉션의 이름을 변경하지 않고 복원하려면, 백업에서 복원하기 전에 해당 컬렉션을 삭제하십시오. 이제 다음 명령어를 실행하여 <a href="#Prepare-data">'데이터 준비(Prepare data</a> )' 단계에서 생성된 데이터를 정리할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령어를 실행하여 백업에서 데이터를 복원하십시오.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>위에서 생성한 일회용 샘플 데이터의 경우, 업스트림 스크립트는 <code translate="no">hello_milvus_recover</code> 및 <code translate="no">hello_milvus2_recover</code> 에 인덱스를 생성하고 쿼리를 실행한 후, <strong>복원된 두 컬렉션을 모두 삭제합니다</strong>. 이 스크립트는 <code translate="no">_recover</code> 명령어로 두 샘플 컬렉션을 모두 복원한 후에만 실행하십시오. 실제 데이터의 경우, 이 정리 스크립트를 사용하지 않고 백업 시점의 기준값과 비교하십시오.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>위의 스크립트는 <code translate="no">restore</code> 명령을 <code translate="no">-s</code> 플래그와 함께 실행했으며, 접미사가 <code translate="no">_recover</code> 로 설정되어 있다고 가정합니다. 필요에 따라 스크립트를 자유롭게 수정하여 사용하십시오.</p>
