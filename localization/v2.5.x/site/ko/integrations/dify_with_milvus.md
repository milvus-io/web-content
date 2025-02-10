---
id: dify_with_milvus.md
summary: 이 튜토리얼에서는 효율적인 검색과 RAG 엔진을 활성화하기 위해 Milvus와 함께 Dify를 배포하는 방법을 보여드리겠습니다.
title: Milvus로 Dify 배포하기
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Milvus로 Dify 배포하기<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify는</a> 서비스형 백엔드와 LLMOps를 결합하여 AI 애플리케이션 구축을 간소화하도록 설계된 오픈 소스 플랫폼입니다. 주요 LLM을 지원하고, 직관적인 프롬프트 오케스트레이션 인터페이스, 고품질 RAG 엔진, 유연한 AI 에이전트 프레임워크를 제공합니다. 로우코드 워크플로, 사용하기 쉬운 인터페이스 및 API를 통해 개발자와 비기술자 모두 복잡한 문제를 처리하지 않고도 혁신적인 실제 AI 솔루션을 만드는 데 집중할 수 있습니다.</p>
<p>이 튜토리얼에서는 Milvus와 함께 Dify를 배포하여 효율적인 검색 및 RAG 엔진을 활성화하는 방법을 보여드립니다.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">리포지토리 복제<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Dify 소스 코드를 로컬 머신에 복제합니다:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">환경 변수 설정<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Dify 소스 코드의 Docker 디렉토리로 이동합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>환경 구성 파일을 복사합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">.env</code> 파일에서 <code translate="no">VECTOR_STORE</code> 값을 변경합니다.</p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">.env</code> 파일의 Milvus 구성에 다음 줄이 있는지 확인합니다:</p>
<pre><code translate="no"><span class="hljs-variable constant_">MILVUS_URI</span>=<span class="hljs-attr">http</span>:<span class="hljs-comment">//host.docker.internal:19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">VECTOR_STORE=milvus</code> 을 지정하면 Dify가 Docker에서 Milvus 독립형 서버를 불러옵니다. <code translate="no">http://localhost:19530</code> 을 통해 도커 외부에서 서버에 접속할 수 있지만, 다른 Dify 컨테이너가 도커 환경 내에서 서버와 통신하려면 특수 DNS 이름 <code translate="no">host.docker.internal</code> 에 연결해야 합니다. 따라서 <code translate="no">http://host.docker.internal:19530</code> 을 <code translate="no">MILVUS_URI</code> 으로 설정했습니다.</p>
<p>프로덕션 배포의 경우 인증을 사용자 지정할 수 있습니다. Milvus에서 토큰 또는 사용자 이름과 비밀번호를 설정하는 방법에 대한 자세한 내용은 <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">인증 페이지를</a> 참조하세요.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Docker 컨테이너 시작<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>사용 중인 시스템의 Docker Compose 버전에 따라 적절한 명령을 선택하여 컨테이너를 시작합니다. <code translate="no">$ docker compose version</code> 명령어를 사용하여 버전을 확인할 수 있으며, 자세한 내용은 Docker 설명서를 참조하세요:</p>
<p>Docker Compose V2를 사용하는 경우 다음 명령을 사용합니다:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose V1을 사용하는 경우 다음 명령을 사용합니다:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Dify에 로그인합니다.<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>브라우저를 열고 Dify 설치 페이지로 이동한 다음 여기에서 관리자 계정을 설정할 수 있습니다:<code translate="no">http://localhost/install</code>, 그런 다음 기본 Dify 페이지에 로그인하여 추가 사용법을 알아보세요.</p>
<p>자세한 사용법과 안내는 <a href="https://docs.dify.ai/">Dify 설명서를</a> 참조하세요.</p>
