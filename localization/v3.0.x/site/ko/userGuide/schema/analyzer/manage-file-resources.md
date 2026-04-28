---
id: manage-file-resources.md
title: 파일 리소스 관리
summary: Milvus 텍스트 분석기가 런타임에 로드할 수 있는 외부 사전 파일을 등록하고 관리하세요.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">파일 리소스 관리<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>파일 리소스는</strong> 텍스트 분석기가 런타임에 사용하는 외부 사전 파일에 대한 서버에 등록된 참조입니다. Milvus 3.0에서는 네 가지 분석기 구성 요소가 인라인 배열 대신 파일 리소스에서 사전을 로드할 수 있습니다:</p>
<table>
   <tr>
     <th><p><strong>분석기 구성 요소</strong></p></th>
     <th><p><strong>파일 리소스를 허용하는 매개변수</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/jieba-tokenizer.md">지에바 토큰화</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/stop-filter.md">필터 중지</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/decompounder-filter.md">디컴파운더 필터</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/synonym-filter.md">동의어 필터</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>파일 리소스는 인라인 사전 배열의 두 가지 실질적인 문제를 해결합니다:</p>
<ul>
<li><p>실제 사전은 방대합니다. 중국어 지에바 어휘는 수만 줄에 달할 수 있고 동의어 테이블은 일반적으로 수천 개의 규칙으로 구성되어 있습니다. 이를 분석기 구성에 인라인화하는 것은 비현실적입니다.</p></li>
<li><p>일반적으로 동일한 사전이 여러 컬렉션에서 공유됩니다. 한 번 등록한 다음 이름으로 참조하면 스키마가 작아지고 사전 업데이트가 한 번의 작업으로 이루어집니다.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">파일 리소스 유형<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 관리 책임이 서로 다른 두 가지 파일 리소스 유형을 지원합니다:</p>
<table>
   <tr>
     <th><p><strong>유형</strong></p></th>
     <th><p><strong>파일이 있는 위치</strong></p></th>
     <th><p><strong>파일을 관리하는 사람</strong></p></th>
     <th><p><strong>Fit</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>원격</strong></p></td>
     <td><p>Milvus 클러스터가 이미 사용하도록 구성된 오브젝트 저장소(MinIO/S3/GCS/Azure)에서</p></td>
     <td><p>Milvus, <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> 클라이언트 API를 통해</p></td>
     <td><p>대부분의 배포에 권장됩니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>로컬</strong></p></td>
     <td><p>모든 Milvus 구성 요소(데이터 노드, 쿼리 노드, 스트리밍 노드)의 로컬 파일 시스템에서 동일한 절대 경로에 있습니다.</p></td>
     <td><p>사용자 - 예를 들어 Kubernetes 볼륨을 통해 파일을 직접 마운트합니다.</p></td>
     <td><p>Milvus 외부에서 사전 파일을 관리하고자 하는 오픈 소스/자체 호스팅 시나리오.</p></td>
   </tr>
</table>
<p>이 페이지의 나머지 부분에서는 보다 일반적인 원격 유형부터 시작하여 두 가지 유형을 모두 살펴봅니다.</p>
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
<li><p><strong>원격</strong> 파일 리소스의 경우 Milvus 배포에 개체 저장소가 구성되어 있어야 합니다. 대부분의 배포는 이미 구성되었으므로 <code translate="no">milvus.yaml</code> (또는 이에 상응하는 헬름 차트 값)의 <code translate="no">minio:</code> 섹션을 확인한다. <code translate="no">bucketName</code> 및 <code translate="no">rootPath</code> 값은 파일 리소스를 등록할 때 필요하다.</p></li>
<li><p><strong>로컬</strong> 파일 리소스의 경우, 모든 밀버스 파드/컨테이너에 동일한 절대 경로에 파일을 배치할 수 있어야 한다. 이를 수행하는 방법은 배포(바인드 마운트, 컨피그맵 지원 볼륨, 컨테이너 초기화 등)에 따라 다릅니다.</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">원격 파일 리소스 등록하기<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>원격 파일 리소스 등록은 파일을 오브젝트 스토리지에 <strong>업로드하고</strong>, 선택한 이름으로 Milvus에 <strong>등록한</strong> 다음, 필요한 모든 분석기에서 <strong>참조하는</strong> 3단계 워크플로로 이루어집니다.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">1단계. 오브젝트 스토리지에 사전 파일 업로드<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>자체 도구(<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, 또는 S3 호환 클라이언트)를 사용하여 Milvus가 사용하도록 구성된 버킷에 파일을 넣습니다.</p>
<p>예를 들어 <code translate="no">milvus.yaml</code> 에 포함된 경우</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">rootPath</code> 을 접두사로 사용하여 <code translate="no">chinese_terms.txt</code> 이라는 이름의 파일을 업로드하면 <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code> 에 오브젝트가 배치됩니다.</p>
<p>2단계에서 <code translate="no">add_file_resource</code> 에 전달할 <code translate="no">path</code> 인수는 <strong>rootPath 접두사를 포함한 전체 오브젝트 키입니다</strong> (위 예의 경우 <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>). 접두사가 없는 경로(예: <code translate="no">&quot;chinese_terms.txt&quot;</code>)는 <code translate="no">file resource path not exist</code> 오류와 함께 거부됩니다.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">2단계. 파일을 등록합니다. <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> 는 동기적으로 유효성을 검사합니다. Milvus가 구성된 객체 저장소에 객체가 <code translate="no">path</code> 에 있는지 확인한 후에만 호출이 반환됩니다. 객체가 없는 경우 <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - 파일을 먼저 업로드한 다음 다시 시도합니다.</p>
<p>호출이 무효화됩니다. 동일한 <code translate="no">name</code> 및 <code translate="no">path</code> 으로 <code translate="no">add_file_resource</code> 을 두 번 호출해도 중복이 생성되지 않습니다.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">3단계. 분석기에서 파일 리소스 참조하기<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>분석기 매개변수가 파일 참조(<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>)를 허용하는 경우 표준 원격 양식을 사용하세요:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>네 개의 분석기 매개변수 모두 동일한 형태를 사용하며, 주변 분석기 키만 다릅니다. 분석기별 구체적인 예는 Jieba 토큰화 도구, 중지 필터, 분해기 필터 및 동의어 필터를 참조하세요.</p>
<p>매개변수 이름은 <code translate="no">name</code> 와 <code translate="no">file</code> 가 아닌 <code translate="no">resource_name</code> 와 <code translate="no">file_name</code> 입니다. <code translate="no">name</code> / <code translate="no">file</code> (또는 <code translate="no">&quot;type&quot;: &quot;remote&quot;</code> 대신 <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> )을 사용하면 분석기 생성 시 <code translate="no">resource name of remote file ... must be set</code> 과 같은 메시지와 함께 <code translate="no">MilvusException</code> 가 발생합니다.</p>
<h2 id="List-file-resources" class="common-anchor-header">파일 리소스 목록<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> 는 <code translate="no">.name</code> 및 <code translate="no">.path</code> 속성을 가진 <code translate="no">FileResourceInfo</code> 개체 목록을 반환합니다. 빈 클러스터는 <code translate="no">[]</code> 을 반환합니다. 리소스별 <code translate="no">get</code> 은 없으며, <code translate="no">list_file_resources</code> 은 유일한 읽기 API입니다.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">파일 리소스 제거<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> 는 무효입니다. 존재하지 않는 이름으로 호출하면 발생하지 않고 <code translate="no">None</code> 가 반환됩니다.</p>
<p>파일 리소스를 제거하기 전에 분석기 구성이 이를 참조하는 컬렉션을 삭제하거나 변경하세요. 의존하는 컬렉션이 없을 때까지 파일 리소스를 유지하면 리소스가 사라진 후 분석기 조회가 실패할 위험을 피할 수 있습니다.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">로컬 파일 리소스 사용<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>로컬</strong> 파일 리소스는 각 Milvus 구성 요소의 로컬 파일 시스템 경로를 직접 가리킵니다. <code translate="no">add_file_resource</code> 호출이 없습니다. Milvus는 로컬 리소스를 추적하지 않습니다. 모든 관련 포드 또는 컨테이너의 동일한 절대 경로에 파일을 직접 배치한 다음 경로로 참조합니다:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>로컬 파일 리소스는 데이터 노드, 쿼리 노드 및 스트리밍 노드의 파일 시스템을 제어하는 배포(일반적으로 베어메탈에서 자체 호스팅된 Milvus 또는 볼륨 마운트를 추가할 수 있는 Kubernetes 클러스터)에서만 유효합니다. 파일은 모든 구성 요소에서 정확히 동일한 절대 경로에 존재해야 하며, 그렇지 않으면 분석기를 로드할 때 일부 노드가 실패합니다.</p>
<p>파일은 분석기가 처음 생성될 때 열립니다. 그 시점에 경로가 존재하지 않으면 <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code> 으로 분석기 생성이 실패합니다.</p>
<h2 id="Considerations" class="common-anchor-header">고려 사항<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>클러스터 전체 가용성은 즉각적으로 제공되지 않습니다.</strong> <code translate="no">add_file_resource</code> 이 반환되면 Milvus는 파일을 필요로 하는 모든 구성 요소에 파일을 동기화합니다. 이 짧은 기간 동안, 아직 동기화되지 않은 노드에서는 리소스를 참조하는 컬렉션이 생성되지 않을 수 있습니다. 일반적인 해결 방법은 몇 초 후에 만들기 호출을 다시 시도하는 것입니다.</p></li>
<li><p><strong>리소스에 종속된 컬렉션이 없는 경우에만 제거하세요.</strong> <code translate="no">remove_file_resource</code> 을 호출하기 전에 분석기 구성이 리소스를 참조하는 모든 컬렉션을 삭제하거나 변경하여 파일을 찾지 못하는 분석기 조회를 방지하세요.</p></li>
<li><p><code translate="no">list_file_resources()</code> 은 <code translate="no">name</code> 및 <code translate="no">path</code> 을 반환하며 크기, 체크섬, 업로드 시간 또는 기타<strong>메타데이터가</strong> 없습니다. 필요한 경우 고유한 명명 규칙을 사용하여 사전 버전을 추적하세요.</p></li>
</ul>
