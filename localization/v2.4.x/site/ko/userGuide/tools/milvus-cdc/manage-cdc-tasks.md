---
id: manage-cdc-tasks.md
order: 3
summary: 데이터 변경 캡처(CDC) 작업을 통해 소스 Milvus 인스턴스에서 대상 Milvus 인스턴스로 데이터를 동기화할 수 있습니다.
title: CDC 작업 관리
---
<h1 id="Manage-CDC-Tasks" class="common-anchor-header">CDC 작업 관리<button data-href="#Manage-CDC-Tasks" class="anchor-icon" translate="no">
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
    </button></h1><p>데이터 변경 캡처(CDC) 작업은 소스 Milvus 인스턴스에서 대상 Milvus 인스턴스로 데이터를 동기화할 수 있게 해줍니다. 소스에서 작업 로그를 모니터링하고 삽입, 삭제, 인덱스 작업과 같은 데이터 변경 사항을 실시간으로 대상에 복제합니다. 이를 통해 Milvus 배포 간에 실시간 재해 복구 또는 액티브-액티브 로드 밸런싱이 용이해집니다.</p>
<p>이 가이드에서는 HTTP 요청을 통한 생성, 일시 중지, 재개, 세부 정보 검색, 나열, 삭제 등 CDC 작업을 관리하는 방법에 대해 설명합니다.</p>
<h2 id="Create-a-task" class="common-anchor-header">작업 만들기<button data-href="#Create-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 작업을 만들면 소스 Milvus의 데이터 변경 작업을 대상 Milvus에 동기화할 수 있습니다.</p>
<p>CDC 작업을 만들려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-bash">curl -X POST http:_//localhost:8444/cdc \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;create&quot;,
  &quot;request_data&quot;: {
    &quot;milvus_connect_param&quot;: {
      &quot;uri&quot;: &quot;http://localhost:19530&quot;,
      &quot;token&quot;:&quot;root:Milvus&quot;,
      &quot;connect_timeout&quot;: 10
    },
    &quot;collection_infos&quot;: [
      {
        &quot;name&quot;: &quot;*&quot;
      }
    ]
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p><strong>매개변수</strong></p>
<ul>
<li><p><strong>milvus_connect_param</strong>: 대상 Milvus의 연결 매개변수입니다.</p>
<ul>
<li><p><strong>host</strong>: Milvus 서버의 호스트 이름 또는 IP 주소.</p></li>
<li><p><strong>port</strong>: 밀버스 서버가 수신 대기하는 포트 번호.</p></li>
<li><p><strong>사용자 이름</strong>: Milvus 서버 인증을 위한 사용자 이름입니다.</p></li>
<li><p><strong>비밀번호</strong>: Milvus 서버 인증을 위한 비밀번호입니다.</p></li>
<li><p><strong>enable_tls</strong>: 연결에 TLS/SSL 암호화를 사용할지 여부입니다.</p></li>
<li><p><strong>connect_timeout</strong>: 연결을 설정하기 위한 시간 제한 기간(초)입니다.</p></li>
</ul></li>
<li><p><strong>collection_infos</strong>: 동기화할 컬렉션. 현재 Milvus-CDC는 개별 컬렉션이 아닌 클러스터 수준에서 동기화하므로 별표<strong>(*)</strong>만 지원됩니다.</p></li>
</ul>
<p>예상 응답:</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;task_id&quot;</span>:<span class="hljs-string">&quot;xxxx&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-tasks" class="common-anchor-header">작업 나열<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>생성된 모든 CDC 작업을 나열합니다:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;list&quot;
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p>예상 응답:</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;tasks&quot;</span>: [
      {
        <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxxx&quot;</span>,
        <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
          <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
          <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>
        },
        <span class="hljs-string">&quot;collection_infos&quot;</span>: [
          {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
          }
        ],
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>
      }
    ]
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pause-a-task" class="common-anchor-header">작업 일시 중지<button data-href="#Pause-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 작업을 일시 중지하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;pause&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p><strong>매개변수</strong></p>
<ul>
<li><strong>task_id</strong>: 일시 중지할 CDC 작업의 ID입니다.</li>
</ul>
<p>예상 응답:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Resume-a-task" class="common-anchor-header">작업 재개<button data-href="#Resume-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>일시 중지된 CDC 작업을 다시 시작합니다:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;resume&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p><strong>매개변수</strong></p>
<ul>
<li><strong>task_id</strong>: 재개할 CDC 작업의 ID입니다.</li>
</ul>
<p>예상 응답:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-task-details" class="common-anchor-header">작업 세부 정보 검색<button data-href="#Retrieve-task-details" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 CDC 작업의 세부 정보를 검색합니다:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;get&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p><strong>매개변수</strong></p>
<ul>
<li><strong>task_id</strong>: 조회할 CDC 작업의 ID입니다.</li>
</ul>
<p>예상 응답:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;Task&quot;</span>: {
      <span class="hljs-string">&quot;collection_infos&quot;</span>: [
        {
          <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
        }
      ],
      <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
        <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>,
        <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      },
      <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>,
      <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxx&quot;</span>
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-task" class="common-anchor-header">작업 삭제<button data-href="#Delete-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 작업을 삭제합니다:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;delete&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;30d1e325df604ebb99e14c2a335a1421&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p><strong>localhost를</strong> 대상 Milvus 서버의 IP 주소로 바꿉니다.</p>
<p><strong>매개변수</strong></p>
<ul>
<li><strong>task_id</strong>: 삭제할 CDC 작업의 ID입니다.</li>
</ul>
<p>예상 응답:</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
