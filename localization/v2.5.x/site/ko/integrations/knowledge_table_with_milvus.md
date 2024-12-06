---
id: knowledge_table_with_milvus.md
summary: >-
  기본적으로 지식 테이블은 Milvus 데이터베이스를 사용하여 추출된 데이터를 저장하고 검색합니다. 이를 통해 사용자는 Milvus의 강력한
  기능을 사용하여 데이터를 쉽게 검색, 필터링 및 분석할 수 있습니다. 이 튜토리얼에서는 지식 테이블과 Milvus를 시작하는 방법을
  보여드리겠습니다.
title: Milvus를 사용한 지식 테이블
---
<h1 id="Knowledge-Table-with-Milvus" class="common-anchor-header">Milvus를 사용한 지식 테이블<button data-href="#Knowledge-Table-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.whyhow.ai/">WhyHow AI에서</a> 개발한<a href="https://github.com/whyhow-ai/knowledge-table">Knowledge Table은</a> 비정형 문서에서 정형 데이터를 쉽게 추출하고 탐색할 수 있도록 설계된 오픈 소스 패키지입니다. 사용자에게 스프레드시트와 같은 인터페이스를 제공하며 자연어 쿼리 인터페이스를 통해 표와 그래프와 같은 지식 표현을 만들 수 있습니다. 이 패키지에는 사용자 정의 가능한 추출 규칙, 서식 지정 옵션, 출처를 통한 데이터 추적 기능이 포함되어 있어 다양한 애플리케이션에 적용할 수 있습니다. 사용자 친화적인 인터페이스가 필요한 비즈니스 사용자와 효율적인 문서 처리를 위한 유연한 백엔드가 필요한 개발자 모두를 만족시킬 수 있도록 RAG 워크플로우와의 원활한 통합을 지원합니다.</p>
<p>기본적으로 지식 테이블은 Milvus 데이터베이스를 사용하여 추출된 데이터를 저장하고 검색합니다. 이를 통해 사용자는 Milvus의 강력한 기능을 사용하여 데이터를 쉽게 검색, 필터링 및 분석할 수 있습니다. 이 튜토리얼에서는 지식창고와 Milvus를 시작하는 방법을 보여드리겠습니다.</p>
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
<li>Docker</li>
<li>도커 컴포즈</li>
</ul>
<h2 id="Cloning-the-project" class="common-anchor-header">프로젝트 복제<button data-href="#Cloning-the-project" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/whyhow-ai/knowledge-table.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-the-environment" class="common-anchor-header">환경 설정하기<button data-href="#Set-up-the-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>프로젝트 루트 디렉터리에서 <code translate="no">.env.example</code> 파일을 찾을 수 있습니다. 이 파일을 <code translate="no">.env</code> 에 복사하고 필요한 환경 변수를 입력합니다.</p>
<p>Milvus의 경우 <code translate="no">MILVUS_DB_URI</code> 및 <code translate="no">MILVUS_DB_TOKEN</code> 환경 변수를 설정해야 합니다. 다음은 몇 가지 팁입니다:</p>
<blockquote>
<ul>
<li><code translate="no">MILVUS_DB_URI</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에서</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "&lt;사용자 이름&gt;:&lt;사용자 비밀번호&gt;"를 사용하고, 그렇지 않은 경우 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">MILVUS_DB_URI</code> 와 <code translate="no">MILVUS_DB_TOKEN</code> 를 조정하세요.</li>
</ul>
</blockquote>
<p>Milvus 외에 다른 환경(예: <code translate="no">OPENAI_API_KEY</code>)도 설정해야 합니다. 각각 해당 웹사이트에서 받을 수 있습니다.</p>
<h2 id="Starting-the-app" class="common-anchor-header">앱 시작하기<button data-href="#Starting-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose up -d --build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Stopping-the-app" class="common-anchor-header">앱 중지<button data-href="#Stopping-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-the-project" class="common-anchor-header">프로젝트에 액세스하기<button data-href="#Accessing-the-project" class="anchor-icon" translate="no">
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
    </button></h2><p>프론트엔드는 <code translate="no">http://localhost:3000</code> 에서, 백엔드는 <code translate="no">http://localhost:8000</code> 에서 액세스할 수 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/knowlege_table.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>UI를 살펴보고 직접 문서를 작성해 볼 수 있습니다.</p>
<p>자세한 데모 사용법은 공식 <a href="https://github.com/whyhow-ai/knowledge-table/tree/main">지식 테이블 문서를</a> 참조하세요.</p>
