---
id: use_milvus_in_docsgpt.md
summary: 이 튜토리얼에서는 Milvus를 DocsGPT의 백엔드 벡터 데이터베이스로 사용하는 방법을 보여드리겠습니다.
title: DocsGPT에서 Milvus 사용
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">DocsGPT에서 Milvus 사용<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT는</a> 강력한 GPT 모델을 통합하여 프로젝트 문서에서 정보 검색을 간소화하는 고급 오픈 소스 솔루션입니다. 이를 통해 개발자는 프로젝트에 대한 질문에 대한 정확한 답변을 쉽게 얻을 수 있으므로 시간이 많이 걸리는 수동 검색을 하지 않아도 됩니다.</p>
<p>이 튜토리얼에서는 Milvus를 DocsGPT의 백엔드 벡터 데이터베이스로 사용하는 방법을 보여드리겠습니다.</p>
<div class="alert note">
<p>이 튜토리얼은 주로 <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a> 공식 설치 가이드를 참조합니다. 이 튜토리얼에 오래된 부분이 있는 경우 공식 가이드를 우선적으로 따르고 당사에 이슈를 생성할 수 있습니다.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">요구 사항<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.docker.com/engine/install/">Docker가</a> 설치되어 있는지 확인합니다.</p>
<h2 id="Clone-the-repository" class="common-anchor-header">리포지토리 복제<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>리포지토리를 복제하고 리포지토리로 이동합니다:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">종속성 추가<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">application</code> 폴더 아래의 <code translate="no">requirements.txt</code> 파일에 <code translate="no">langchain-milvus</code> 종속성을 추가합니다:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">환경 변수 설정<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">docker-compose.yaml</code> 파일의 <code translate="no">backend</code> 및 <code translate="no">worker</code> 서비스에 대한 환경 변수에 <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> 를 다음과 같이 추가합니다:</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MILVUS_URI</code>, <code translate="no">MILVUS_TOKEN</code> 의 경우, 완전 관리형 <a href="https://zilliz.com/cloud">질리즈 클라우드</a>(권장) 서비스를 사용하거나 수동으로 밀버스 서비스를 시작할 수 있습니다.</p>
<ul>
<li><p>완전 관리형 질리즈 클라우드 서비스의 경우: 질리즈 클라우드 서비스 사용을 권장합니다. <a href="https://zilliz.com/cloud">질리즈 클라우드에서</a> 무료 체험 계정을 신청할 수 있습니다. 그 후 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">MILVUS_URI</code> 및 <code translate="no">MILVUS_TOKEN</code> 을 받게 됩니다.</p></li>
<li><p>수동으로 Milvus 서비스를 시작하려면: 밀버스 서비스를 설정하려면 밀버스 <a href="https://milvus.io/docs/install_standalone-docker-compose.md">공식 문서에</a> 따라 밀버스 서버를 설정한 후 해당 서버에서 <code translate="no">MILVUS_URI</code> 및 <code translate="no">MILVUS_TOKEN</code> 을 받으면 됩니다. <code translate="no">MILVUS_URI</code> 및 <code translate="no">MILVUS_TOKEN</code> 은 각각 <code translate="no">http://&lt;your_server_ip&gt;:19530</code> 및 <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> 형식이어야 합니다.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">서비스 시작하기<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>실행을 클릭합니다: <code translate="no">./setup.sh</code></p>
<p>http://localhost:5173/ 으로 이동합니다.</p>
<p>UI를 살펴보고 문서에 대해 질문할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>대체 텍스트</span> </span></p>
<p>서비스를 중지하려면 실행을 클릭합니다:</p>
<pre><code translate="no" class="language-shell">$ docker-compose down
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용 및 고급 설정에 대한 자세한 내용은 <a href="https://github.com/arc53/DocsGPT">DocsGPT</a> 공식 문서를 참조하세요.</p>
