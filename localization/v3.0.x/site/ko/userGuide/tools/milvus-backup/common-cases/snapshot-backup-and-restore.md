---
id: snapshot-backup-and-restore.md
summary: '컬렉션을 백업한 후, 동일한 Milvus 인스턴스에서 새로운 이름으로 복원합니다.'
title: 단일 인스턴스에서의 스냅샷 백업 및 복원
---
<h1 id="Snapshot-Backup-and-Restore-in-One-Instance" class="common-anchor-header">단일 인스턴스에서의 스냅샷 백업 및 복원<button data-href="#Snapshot-Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
    </button></h1><p>컬렉션을 백업한 후 동일한 Milvus 인스턴스에서 새 이름으로 복원합니다. 이 예제에서는 <strong>Milvus Backup 0.6.0을</strong> 사용하여 <code translate="no">coll</code> 의 스냅샷을 생성하고, <strong>Milvus 3.0.1 이상에서</strong> <code translate="no">coll_bak</code> 으로 복원하는 방법을 설명합니다. Backup 0.5.x의 경우, <a href="/docs/ko/single-instance-backup-and-restore.md">‘단일 인스턴스 내 백업 및 복원’을</a> 참조하십시오.</p>
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
    </button></h2><table>
<thead>
<tr><th>위치</th><th>Milvus 인스턴스</th><th>오브젝트 스토어</th><th>버킷</th><th>루트 경로</th></tr>
</thead>
<tbody>
<tr><td>소스 데이터</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
<tr><td>소스에서 생성된 백업</td><td>—</td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">backup/my_backup</code></td></tr>
<tr><td>복원된 데이터</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
</tbody>
</table>
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
<li>Milvus Backup 0.6.0 및 Milvus 3.0.1 이상 <a href="/docs/ko/milvus_backup_0_6_cli.md">버전을</a> 사용하십시오. <a href="/docs/ko/milvus_backup_0_6_cli.md">‘명령을 사용하여 데이터 백업 및</a> 복원’에 설명된 대로 도구를 설치하십시오.</li>
<li><code translate="no">coll</code> 라는 이름의 기존 컬렉션을 사용하거나, 아래의 선택적 샘플 컬렉션을 생성하십시오. 소스 결과와 복원된 결과를 비교할 때는 해당 컬렉션의 데이터를 변경하지 마십시오.</li>
<li>Milvus Backup에서 Milvus gRPC 포트(19530), 관리 포트(9091) 및 오브젝트 스토리지에 접근할 수 있도록 설정하십시오. 또한 Milvus 서버는 스냅샷 내보내기 및 가져오기를 위해 백업 스토리지에 접근할 수 있어야 합니다.</li>
<li>예시에 나와 있는 호스트 이름, 버킷 이름, 루트 경로 및 자격 증명을 사용자의 배포 설정으로 대체하십시오. Milvus 스토리지 설정은 실행 중인 인스턴스와 일치해야 하며, 백업 구성을 변경한다고 해서 Milvus가 재구성되지는 않습니다.</li>
<li>대상 인스턴스에 <code translate="no">coll_bak</code> 가 존재하지 않는지 확인하십시오.</li>
</ul>
<p>Milvus 스토리지 설정에 대해서는 <a href="/docs/ko/deploy_s3.md">‘객체 스토리지’를</a> 참조하십시오. 기존 v1 백업 구성에 대해서는 <a href="/docs/ko/milvus_backup_upgrade.md#Migrate-the-configuration">‘Milvus Backup 업그레이드’를</a> 참조하십시오.</p>
<h2 id="Prepare-sample-data" class="common-anchor-header">샘플 데이터 준비<button data-href="#Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 명령어는 <code translate="no">coll</code> 라는 기존 컬렉션을 사용합니다. 이름을 일관되게 변경하여 사용자만의 컬렉션을 사용할 수 있습니다.</p>
<p>소규모 테스트 컬렉션의 경우, PyMilvus를 설치하고 빈 컬렉션 이름을 대상으로 다음 명령을 실행하십시오. Milvus가 로컬에 없는 경우 URI를 변경하십시오:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus==3.0.0
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;coll&quot;</span>), <span class="hljs-string">&quot;Use an empty sample collection name&quot;</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;label&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
indexes = client.prepare_index_params()
indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
client.create_collection(<span class="hljs-string">&quot;coll&quot;</span>, schema=schema, index_params=indexes)

rng = random.Random(<span class="hljs-number">601</span>)
rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
client.insert(<span class="hljs-string">&quot;coll&quot;</span>, rows)
client.flush(<span class="hljs-string">&quot;coll&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 256개의 엔티티가 생성됩니다. 나머지 단계를 진행하는 동안 이 테스트 데이터는 변경하지 마십시오.</p>
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
    </button></h3><p><code translate="no">milvus-backup</code> 바이너리가 있는 디렉터리에서 다음 명령을 실행하십시오. 나머지 명령을 실행할 때도 이 작업 디렉터리를 유지하십시오:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>다음 내용을 <code translate="no">configs/backup-source.yaml</code> 파일로 저장하십시오. 이 예제에서는 MinIO의 기본 테스트 자격 증명을 사용하므로, 사용자의 오브젝트 스토어에 맞는 자격 증명로 대체하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">milvus-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://milvus-a:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">minio-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.storage</code> 는 소스 인스턴스의 데이터를 설명합니다. ` <code translate="no">backup.storage</code> `는 백업 대상을 설명합니다. 설정되지 않은 백업 스토리지 필드는 ` <code translate="no">milvus.storage</code>`에서 상속받으며, ` <code translate="no">rootPath</code>`는 예외로 기본값이 ` <code translate="no">backup</code>`입니다.</p>
<p>Milvus와 Milvus Backup이 동일한 오브젝트 스토어에 접속하기 위해 서로 다른 주소를 사용하는 경우, <code translate="no">backup.storage.milvusAddress</code> 및 <code translate="no">milvusPort</code> 를 Milvus 서버에서 접속 가능한 주소로 구성하십시오. <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 구성 예제를</a> 참조하십시오.</p>
<h3 id="Step-2-Check-connectivity-and-create-a-backup" class="common-anchor-header">2단계: 연결 상태 확인 및 백업 생성<button data-href="#Step-2-Check-connectivity-and-create-a-backup" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>연결성 확인 결과 <code translate="no">Success!</code> 이 표시되어야 합니다. create 명령어 실행 시 <code translate="no">create backup success</code> 이 표시되어야 하며, 백업 정보에는 <code translate="no">coll</code> 이 나열되어야 합니다.</p>
<p><code translate="no">--format snapshot</code> 을 명시적으로 지정하면 스냅샷 워크플로가 선택됩니다. Milvus 3.0에서는 기본값인 <code translate="no">auto</code> 도 스냅샷을 선택합니다. 백업에는 메타데이터와 <code translate="no">bucket-a/backup/my_backup</code> 아래에 있는 내보낸 스냅샷 번들이 포함됩니다. 디렉터리 전체를 보존하십시오.</p>
<h2 id="Restore-within-the-same-instance" class="common-anchor-header">동일한 인스턴스 내에서 복원<button data-href="#Restore-within-the-same-instance" class="anchor-icon" translate="no">
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
    </button></h2><p>동일한 구성을 사용하여 접미사를 붙여 백업을 복원하십시오:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>CLI 명령어 ` <code translate="no">--filter</code> `는 ` <code translate="no">-s</code> ` 또는 ` <code translate="no">--rename</code>`를 적용한 <strong>후</strong> 대상 이름과 일치합니다. 이 복원 명령어에서는 ` <code translate="no">coll</code>` 대신 ` <code translate="no">coll_bak</code>`를 사용하십시오. 아무것도 일치하지 않는 필터는 컬렉션을 생성하지 않고 성공적으로 종료될 수 있습니다.</p>
<p>복원된 컬렉션은 대상 인스턴스에 구성된 스토리지를 사용합니다. Milvus는 스냅샷 가져오기 및 그 결과로 생성된 데이터 레이아웃을 관리합니다.</p>
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
    </button></h2><p>위의 선택적 256개 엔티티 샘플 데이터의 경우, 복원 대상에 대해 다음 명령을 실행하십시오. <code translate="no">localhost:19530</code> 을 데이터 준비에 사용된 것과 동일한 Milvus 엔드포인트로 대체하십시오. 이 명령은 데이터를 삭제하지 않은 상태에서 개수, 모든 스칼라 및 벡터 값, 벡터 검색 결과를 확인합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> client.has_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.list_indexes(<span class="hljs-string">&quot;coll_bak&quot;</span>):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
    client.create_index(<span class="hljs-string">&quot;coll_bak&quot;</span>, indexes)
client.load_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)

rng = random.Random(<span class="hljs-number">601</span>)
expected = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
count = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;count(*)&quot;</span>]
actual = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,
                      output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>], limit=<span class="hljs-number">512</span>,
                      consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> count == <span class="hljs-number">256</span>
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">sorted</span>(actual, key=<span class="hljs-keyword">lambda</span> row: row[<span class="hljs-string">&quot;id&quot;</span>]) == expected
hits = client.search(<span class="hljs-string">&quot;coll_bak&quot;</span>, data=[expected[<span class="hljs-number">7</span>][<span class="hljs-string">&quot;vector&quot;</span>]], limit=<span class="hljs-number">1</span>,
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> hits[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>] == <span class="hljs-number">7</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Backup and restore verified&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>다른 데이터의 경우, 백업 시점의 기준값과 비교하십시오. 복원된 컬렉션에 벡터 인덱스가 없는 경우, 데이터를 로드하기 전에 적절한 벡터 인덱스를 생성하십시오. 명령어가 성공적으로 실행되었다고 해서 예상된 데이터가 복원되었다고 단정할 수는 없습니다.</p>
