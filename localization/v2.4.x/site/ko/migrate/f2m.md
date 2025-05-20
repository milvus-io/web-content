---
id: f2m.md
title: Faiss에서
related_key: 'Faiss, migrate, import'
summary: Faiss 데이터를 Milvus로 마이그레이션하는 방법을 알아보세요.
---
<h1 id="From-Faiss" class="common-anchor-header">Faiss에서<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Faiss에서 Milvus 2.x로 데이터를 마이그레이션하는 포괄적인 단계별 프로세스를 제공합니다. 이 가이드를 따르면 Milvus 2.x의 고급 기능과 향상된 성능을 활용하여 데이터를 효율적으로 전송할 수 있습니다.</p>
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
<li><strong>소프트웨어 버전</strong>:<ul>
<li>소스 Faiss</li>
<li>대상 Milvus: 2.x</li>
<li>설치에 대한 자세한 내용은 <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Faiss 설치</a> 및 <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus 설치를</a> 참조하세요.</li>
</ul></li>
<li><strong>필수 도구</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus 마이그레이션</a> 도구. 설치에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/milvusdm_install.md">마이그레이션 도구 설치를</a> 참조하세요.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">마이그레이션 구성<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>예제 마이그레이션 구성 파일을 <code translate="no">migration.yaml</code> 으로 저장하고 실제 조건에 따라 구성을 수정합니다. 구성 파일은 로컬 디렉터리에 자유롭게 저장할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>다음 표에서는 예제 구성 파일의 매개변수에 대해 설명합니다. 전체 구성 목록은 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus 마이그레이션을</a> 참조하세요 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">:</a> <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Faiss에서 Milvus 2.x로</a> 마이그레이션하기를 참조하세요.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>덤퍼 스레드의 동시성입니다.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>마이그레이션 작업의 작동 모드입니다. Faiss 인덱스에서 마이그레이션할 때 faiss로 설정합니다.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>각 배치에서 Faiss에서 읽을 버퍼 크기입니다. 단위: 단위: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>각 배치에서 Milvus에 쓸 버퍼 크기입니다. 단위: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>로더 스레드의 동시성입니다.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>소스 파일을 읽을 위치를 지정합니다. 유효한 값:<br/>- <code translate="no">local</code>: 로컬 디스크에서 파일을 읽습니다.<br/>- <code translate="no">remote</code>: 원격 스토리지에서 파일을 읽습니다.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>소스 파일이 있는 디렉터리 경로입니다. 예: <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Milvus 컬렉션의 이름입니다.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>컬렉션에 생성할 샤드 수입니다. 샤드에 대한 자세한 내용은 <a href="https://milvus.io/docs/glossary.md#Shard">용어를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>벡터 필드의 차원입니다.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>벡터 간의 유사성을 측정하는 데 사용되는 메트릭 유형입니다. 자세한 내용은 <a href="https://milvus.io/docs/glossary.md#Metric-type">용어를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>덤프된 파일의 저장 위치. 유효한 값:<br/>- <code translate="no">local</code>: 덤프된 파일을 로컬 디스크에 저장합니다.<br/>- <code translate="no">remote</code>: 덤프된 파일을 오브젝트 스토리지에 저장합니다.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>클라우드 스토리지 버킷의 출력 디렉토리 경로.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>클라우드 스토리지 서비스 제공업체. 예시 값: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Milvus 2.x 스토리지의 엔드포인트.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>클라우드 스토리지 지역. 로컬 MinIO를 사용하는 경우 어떤 값이라도 가능합니다.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>데이터를 저장할 버킷 이름. 이 값은 Milvus 2.x의 구성과 동일해야 합니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">시스템 구성을</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Milvus 2.x 스토리지의 액세스 키입니다.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.x 스토리지의 비밀 키입니다.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>연결에 IAM 역할을 사용할지 여부.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Milvus 2.x 연결 시 SSL 활성화 여부. 자세한 내용은 <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">전송 중 암호화를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>지정한 버킷이 오브젝트 스토리지에 존재하는지 확인할지 여부입니다.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>대상 Milvus 서버의 주소입니다.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus 2.x 서버의 사용자 이름입니다. Milvus 서버에 사용자 인증이 활성화된 경우 이 매개변수는 필수입니다. 자세한 내용은 <a href="https://milvus.io/docs/authenticate.md">인증 활성화를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Milvus 2.x 서버의 비밀번호. Milvus 서버에 사용자 인증이 활성화된 경우 이 파라미터가 필요합니다. 자세한 내용은 <a href="https://milvus.io/docs/authenticate.md">인증 활성화를</a> 참조하세요.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">마이그레이션 작업 시작<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>다음 명령으로 마이그레이션 작업을 시작합니다. <code translate="no">{YourConfigFilePath}</code> 을 구성 파일 <code translate="no">migration.yaml</code> 이 있는 로컬 디렉토리로 바꿉니다.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>위의 명령은 Faiss 인덱스 데이터를 NumPy 파일로 변환한 다음 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> 작업을 사용하여 대상 버킷에 데이터를 씁니다.</p></li>
<li><p>NumPy 파일이 생성되면 다음 명령을 사용하여 이 파일을 Milvus 2.x로 가져옵니다. <code translate="no">{YourConfigFilePath}</code> 을 구성 파일 <code translate="no">migration.yaml</code> 이 있는 로컬 디렉토리로 바꿉니다.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">결과 확인<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>마이그레이션 작업이 실행되면 API 호출을 수행하거나 Attu를 사용하여 마이그레이션된 엔티티 수를 확인할 수 있습니다. 자세한 내용은 <a href="https://github.com/zilliztech/attu">Attu</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()를</a> 참조하세요.</p>
