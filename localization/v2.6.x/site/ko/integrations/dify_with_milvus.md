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
<div class="alert note">
<p>이 문서는 주로 공식 <a href="https://docs.dify.ai/">Dify 문서를</a> 기반으로 합니다. 오래되었거나 일관성이 없는 내용을 발견하면 공식 문서를 우선적으로 참조하시고 언제든지 문제를 제기해 주세요.</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">리포지토리 복제</h3><p>Dify 소스 코드를 로컬 머신에 복제합니다:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">환경 구성 준비</h3><p>Dify 소스 코드의 Docker 디렉토리로 이동합니다.</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>환경 구성 파일을 복사합니다.</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">배포 옵션<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>두 가지 접근 방식을 사용하여 Milvus와 함께 Dify를 배포할 수 있습니다. 필요에 가장 적합한 방법을 선택하세요:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">옵션 1: Docker와 함께 Milvus 사용<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>이 옵션은 Docker Compose를 사용하여 로컬 머신에서 Dify와 함께 Milvus 컨테이너를 실행합니다.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">환경 변수 구성</h3><p><code translate="no">.env</code> 파일을 다음 Milvus 구성으로 편집합니다:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> 은 <code translate="no">host.docker.internal:19530</code> 을 사용하여 Docker 컨테이너가 Docker의 내부 네트워크를 통해 호스트 머신에서 실행 중인 Milvus에 액세스할 수 있도록 합니다.</li>
<li><code translate="no">MILVUS_TOKEN</code> 는 로컬 Milvus 배포를 위해 비워둘 수 있습니다.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Docker 컨테이너 시작</h3><p>Milvus 서비스를 포함하도록 <code translate="no">milvus</code> 프로필로 컨테이너를 시작합니다:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>이 명령은 <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code>, <code translate="no">minio</code> 컨테이너와 함께 Dify 서비스를 시작합니다.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">옵션 2: Zilliz Cloud 사용<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>이 옵션은 Dify를 Zilliz Cloud의 관리형 Milvus 서비스에 연결합니다.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">환경 변수 구성</h3><p><code translate="no">.env</code> 파일을 질리즈 클라우드 연결 정보로 수정합니다:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> 을 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트로</a> 바꿉니다.</li>
<li><code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> 을 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">API 키로</a> 바꿉니다.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Docker 컨테이너 시작</h3><p>Milvus 프로파일 없이 Dify 컨테이너만 시작합니다:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Dify 접속하기<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Dify에 로그인합니다.</h3><p>브라우저를 열고 Dify 설치 페이지로 이동하여 관리자 계정을 설정합니다:<code translate="no">http://localhost/install</code>, 이후 Dify 메인 페이지에 로그인하여 사용하세요.</p>
<p>자세한 사용법과 안내는 <a href="https://docs.dify.ai/">Dify 문서를</a> 참조하세요.</p>
