---
id: from-m2x.md
summary: 이 가이드는 Milvus 2.3.x에서 Milvus 2.3.x 이상으로 데이터를 마이그레이션하기 위한 포괄적인 단계별 프로세스를 제공합니다.
title: Milvus 2.3.x부터
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Milvus 2.3.x에서<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Milvus 2.3.x에서 Milvus 2.3.x 이상으로 데이터를 마이그레이션하기 위한 포괄적인 단계별 프로세스를 제공합니다.</p>
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
<li>소스 Milvus: 2.3.0 이상(이 도구는 반복기를 사용하여 소스 수집 데이터를 가져오므로 소스 Milvus 버전이 2.3.0 이상이어야 합니다).</li>
<li>대상 Milvus: 2.3.0 이상</li>
</ul></li>
<li><strong>필수 도구</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus 마이그레이션</a> 도구. 설치에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/milvusdm_install.md">마이그레이션 도구 설치를</a> 참조하세요.</li>
</ul></li>
<li><strong>데이터 준비</strong>:<ul>
<li>소스 Milvus 컬렉션이 로드되어 있고 데이터를 내보낼 준비가 되어 있는지 확인합니다.</li>
<li>대상 Milvus에 소스 컬렉션에 해당하는 컬렉션이 포함되어 있지 않은 경우, <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> 도구가 자동으로 해당 컬렉션을 생성합니다. 마이그레이션 후에는 대상 컬렉션이 색인되지 않으므로 나중에 수동으로 컬렉션을 색인해야 합니다.</li>
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
    </button></h2><p>예제 마이그레이션 구성 파일을 <code translate="no">migration.yaml</code> 으로 저장하고 실제 조건에 따라 구성을 수정합니다. 구성 파일은 로컬 디렉터리에 자유롭게 저장할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>다음 표에서는 예제 구성 파일의 매개 변수에 대해 설명합니다. 자세한 내용은 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus 마이그레이션을</a> 참조하세요 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">:</a> <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus2.x에서 Milvus2.x로</a> 마이그레이션을 참조하세요.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>마이그레이션 작업의 작동 모드입니다. Milvus 2.x에서 마이그레이션하는 경우 milvus2x로 설정합니다.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>각 배치에서 Milvus 2.x에서 읽을 버퍼 크기입니다.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>메타 파일을 읽을 위치를 지정합니다. config로 설정하면 이 migration.yaml 파일에서 메타 구성을 가져올 수 있음을 나타냅니다.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>소스 Milvus 버전. 2.3.0 이상으로 설정합니다.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>소스 컬렉션 이름입니다.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>소스 Milvus 서버의 주소입니다.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>소스 Milvus 서버의 사용자 이름입니다. 이 매개변수는 Milvus 서버에 대해 사용자 인증이 활성화된 경우 필요합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">인증 활성화를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>소스 Milvus 서버의 비밀번호입니다. Milvus 서버에 사용자 인증이 활성화된 경우 이 파라미터가 필요합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">인증 활성화를</a> 참조하십시오.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>대상 Milvus 서버의 주소입니다.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>대상 Milvus 서버의 사용자 이름입니다. 이 매개변수는 Milvus 서버에 사용자 인증이 활성화된 경우 필요합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">인증 활성화를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>대상 Milvus 서버의 비밀번호입니다. Milvus 서버에 사용자 인증이 활성화된 경우 이 파라미터가 필요합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">인증 활성화를</a> 참조하세요.</td></tr>
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
    </button></h2><p>마이그레이션 작업을 시작하는 데는 CLI를 사용하거나 API 요청을 하는 두 가지 옵션이 있습니다. 필요에 가장 적합한 옵션을 선택하세요.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">옵션 1: CLI 사용</h3><p>다음 명령어로 마이그레이션 작업을 시작합니다. <code translate="no">{YourConfigFilePath}</code> 을 구성 파일 <code translate="no">migration.yaml</code> 이 있는 로컬 디렉터리로 바꿉니다.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>로그를 모니터링하여 진행 상황 업데이트를 확인합니다. 성공적인 마이그레이션 로그에는 다음과 같은 항목이 포함되어야 합니다:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">옵션 2: API 요청하기</h3><p>Restful API를 사용하여 마이그레이션을 실행할 수도 있습니다. 다음으로 API 서버를 시작합니다:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>서버가 성공적으로 시작되면 프로젝트의 <code translate="no">configs/</code> 디렉터리에 <code translate="no">migration.yaml</code> 파일을 배치하고 다음을 사용하여 마이그레이션을 시작합니다:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
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
    </button></h2><p>마이그레이션 작업이 완료되면 Attu를 사용하여 마이그레이션된 엔티티의 수를 확인합니다. 또한 Attu에서 인덱스를 생성하고 컬렉션을 로드할 수 있습니다. 자세한 내용은 <a href="https://github.com/zilliztech/attu">Attu</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()를</a> 참조하세요.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">추가 구성 옵션<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>위에서 언급한 기본 구성 외에도 특정 요구 사항에 따라 추가 설정을 추가할 수도 있습니다.</p>
<ul>
<li><p><strong>선택적 필드 마이그레이션</strong>: 모든 필드가 아닌 컬렉션의 특정 필드만 마이그레이션해야 하는 경우 <code translate="no">migration.yaml</code> 파일의 <code translate="no">meta</code> 섹션에서 마이그레이션할 필드를 지정하세요.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>사용자 지정 대상 컬렉션</strong>: 대상 컬렉션의 속성을 사용자 지정하려면 <code translate="no">migration.yaml</code> 파일의 <code translate="no">meta</code> 섹션에 관련 구성을 추가합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>자세한 내용은 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus 마이그레이션을</a> 참조하세요 <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">:</a> <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus2.x에서 Milvus2.x로</a> 마이그레이션하기를 참조하세요.</p>
