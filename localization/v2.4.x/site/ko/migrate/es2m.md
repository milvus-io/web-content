---
id: es2m.md
summary: 이 가이드는 Elasticsearch에서 Milvus 2.x로 데이터를 마이그레이션하기 위한 포괄적인 단계별 프로세스를 제공합니다.
title: Elasticsearch에서
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Elasticsearch에서<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Elasticsearch에서 Milvus 2.x로 데이터를 마이그레이션하기 위한 포괄적인 단계별 프로세스를 제공합니다. 이 가이드를 따르면 Milvus 2.x의 고급 기능과 향상된 성능을 활용하여 데이터를 효율적으로 전송할 수 있습니다.</p>
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
<li>소스 Elasticsearch: 7.x 또는 8.x</li>
<li>Milvus 대상: 2.x</li>
<li>설치에 대한 자세한 내용은 <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Elasticsearch 설치</a> 및 <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus 설치를</a> 참조하세요.</li>
</ul></li>
<li><strong>필요한 도구</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus 마이그레이션</a> 도구. 설치에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/milvusdm_install.md">마이그레이션 도구 설치를</a> 참조하세요.</li>
</ul></li>
<li><strong>마이그레이션에 지원되는 데이터 유형</strong>: 소스 Elasticsearch 인덱스에서 마이그레이션할 필드는 다음과 같은 유형입니다 - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">키워드</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">텍스트</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">정수</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. 여기에 나열되지 않은 데이터 유형은 현재 마이그레이션이 지원되지 않습니다. Milvus 컬렉션과 Elasticsearch 인덱스 간의 데이터 매핑에 대한 자세한 내용은 <a href="#field-mapping-reference">필드 매핑 참조를</a> 참조하세요.</li>
<li><strong>Elasticsearch 인덱스 요구 사항</strong>:<ul>
<li>소스 Elasticsearch 인덱스에는 <code translate="no">dense_vector</code> 유형의 벡터 필드가 포함되어야 합니다. 벡터 필드가 없으면 마이그레이션을 시작할 수 없습니다.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">마이그레이션 파일 구성<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>예제 마이그레이션 구성 파일을 <code translate="no">migration.yaml</code> 으로 저장하고 실제 조건에 따라 구성을 수정하세요. 구성 파일은 로컬 디렉터리에 자유롭게 저장할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음 표에서는 예제 구성 파일의 매개변수에 대해 설명합니다. 전체 구성 목록은 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus 마이그레이션을</a> 참조하세요 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">:</a> <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus 2.x로의 Elasticsearch</a> 마이그레이션을 참조하세요.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>마이그레이션 작업의 작동 모드입니다. Elasticsearch 인덱스에서 마이그레이션하는 경우 <code translate="no">elasticsearch</code> 로 설정합니다.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>각 배치에서 Elasticsearch에서 읽을 버퍼 크기입니다. 단위: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>메타 구성의 소스를 지정합니다. 현재 <code translate="no">config</code> 만 지원됩니다.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>데이터를 마이그레이션할 Elasticsearch 인덱스를 식별합니다.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>마이그레이션할 Elasticsearch 인덱스 내의 필드입니다.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Elasticsearch 필드의 이름입니다.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>필드의 최대 길이입니다. 이 매개 변수는 <code translate="no">meta.fields.type</code> 가 <code translate="no">keyword</code> 또는 <code translate="no">text</code> 인 경우에만 필요합니다.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>필드가 기본 키로 사용되는지 여부를 지정합니다.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Elasticsearch 필드의 데이터 유형. 현재 Elasticsearch에서 지원되는 데이터 유형은 다음과 같습니다: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">키워드</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">텍스트</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">정수</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>벡터 필드의 차원입니다. 이 매개 변수는 <code translate="no">meta.fields.type</code> 가 <code translate="no">dense_vector</code> 일 때만 필요합니다.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Milvus 2.x에서 컬렉션 생성에 특정한 설정입니다.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Milvus 컬렉션의 이름입니다. 지정하지 않으면 기본값은 Elasticsearch 인덱스 이름입니다.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>컬렉션에서 동적 필드를 비활성화할지 여부를 지정합니다. 기본값은 <code translate="no">false</code> 입니다. 동적 필드에 대한 자세한 내용은 <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">동적 필드 사용을</a> 참조하세요.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>컬렉션에 생성할 샤드 수입니다. 샤드에 대한 자세한 내용은 <a href="https://milvus.io/docs/glossary.md#Shard">용어를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Milvus에서 컬렉션의 일관성 수준. 자세한 내용은 <a href="https://milvus.io/docs/consistency.md">일관성을</a> 참조하세요.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>소스 Elasticsearch 서버에 대한 연결 구성입니다.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>소스 Elasticsearch 서버의 주소입니다.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Elasticsearch 서버의 사용자 이름입니다.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Elasticsearch 서버의 비밀번호입니다.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>덤프된 파일의 저장 위치. 유효한 값:<br/>- <code translate="no">local</code>: 덤프된 파일을 로컬 디스크에 저장합니다.<br/>- <code translate="no">remote</code>: 덤프된 파일을 오브젝트 스토리지에 저장합니다.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>클라우드 스토리지 버킷의 출력 디렉토리 경로.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>클라우드 스토리지 서비스 제공업체. 예시 값: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>클라우드 스토리지 지역. 로컬 MinIO를 사용하는 경우 어떤 값이라도 가능합니다.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>데이터를 저장할 버킷 이름. 이 값은 Milvus 2.x의 구성과 동일해야 합니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">시스템 구성을</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>연결에 IAM 역할을 사용할지 여부입니다.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>지정한 버킷이 오브젝트 스토리지에 존재하는지 확인할지 여부입니다.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>대상 Milvus 2.x 서버에 대한 연결 구성입니다.</td></tr>
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
    </button></h2><p>다음 명령으로 마이그레이션 작업을 시작합니다. <code translate="no">{YourConfigFilePath}</code> 을 구성 파일 <code translate="no">migration.yaml</code> 이 있는 로컬 디렉토리로 바꿉니다.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>다음은 성공적인 마이그레이션 로그 출력의 예입니다:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>마이그레이션 작업이 실행되면 API 호출을 하거나 Attu를 사용하여 마이그레이션된 엔티티의 수를 확인할 수 있습니다. 자세한 내용은 <a href="https://github.com/zilliztech/attu">Attu</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()를</a> 참조하세요.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">필드 매핑 참조<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 표를 검토하여 Elasticsearch 인덱스의 필드 유형이 Milvus 컬렉션의 필드 유형에 매핑되는 방식을 이해하세요.</p>
<p>Milvus에서 지원되는 데이터 유형에 대한 자세한 내용은 <a href="https://milvus.io/docs/schema.md#Supported-data-types">지원되는 데이터 유형을</a> 참조하세요.</p>
<table>
<thead>
<tr><th>Elasticsearch 필드 유형</th><th>Milvus 필드 유형</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>dense_vector</td><td>FloatVector</td><td>마이그레이션 중에 벡터 차원은 변경되지 않습니다.</td></tr>
<tr><td>keyword</td><td>VarChar</td><td>최대 길이(1~65,535)를 설정합니다. 제한을 초과하는 문자열은 마이그레이션 오류를 유발할 수 있습니다.</td></tr>
<tr><td>text</td><td>VarChar</td><td>최대 길이(1~65,535)를 설정합니다. 제한을 초과하는 문자열은 마이그레이션 오류를 유발할 수 있습니다.</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>정수</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Double</td><td>-</td></tr>
<tr><td>float</td><td>Float</td><td>-</td></tr>
<tr><td>부울</td><td>Bool</td><td>-</td></tr>
<tr><td>객체</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
