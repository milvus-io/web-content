---
id: milvus_for_agents.md
title: AI 에이전트를 위한 Milvus
summary: 'AI 에이전트가 RAG, 시맨틱 검색 및 장기 기억을 위해 Milvus를 벡터 데이터베이스로 활용하는 방법을 알아보세요.'
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">AI 에이전트를 위한 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 AI 코딩 에이전트 및 자율 에이전트 시스템이 프로그래밍 방식으로 벡터 데이터베이스와 상호 작용할 수 있도록 지원하는 에이전트 친화적인 인터페이스를 제공합니다. RAG 파이프라인, 시맨틱 검색 또는 에이전트 메모리 시스템을 구축하든, Milvus는 에이전트가 연결하고 작동할 수 있는 다양한 방법을 제공합니다.</p>
<h2 id="Agent-tools" class="common-anchor-header">에이전트 도구<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus 스킬</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code용 에이전트 스킬로, LLM이 PyMilvus를 사용하여 벡터 데이터베이스 작업을 수행하도록 교육합니다.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 서버</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP(Model Context Protocol) 호환 에이전트가 Milvus와 직접 상호작용할 수 있도록 해주는 MCP 서버입니다.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude 컨텍스트 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code용으로 설계된 MCP 서버로, 컨텍스트를 인식하는 Milvus 문서 접근 기능을 제공합니다.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AI 프롬프트<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>AI 코딩 도우미가 올바른 Milvus 코드를 작성할 수 있도록 돕는 엄선된 프롬프트입니다. 각 프롬프트에는 가장 흔한 실수를 방지하는 규칙과 패턴이 반영되어 있습니다.</p>
<p><strong>사용 방법:</strong></p>
<ol>
<li>프롬프트 페이지의 “전체 프롬프트” 섹션에서 프롬프트를<strong>복사하세요</strong>.</li>
<li>AI 도구가 인식할 수 있는 파일 형식으로<strong>저장하세요</strong> (아래 <a href="#use-in-different-environments">환경 표</a> 참조).</li>
<li>AI 어시스턴트가 Milvus 코드를 생성하거나 검토할 때 해당 규칙을 자동으로 적용합니다.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">프롬프트 페이지<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ko/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">모든 AI 코딩 에이전트에 적용되는 최상위 규칙입니다. 파일을 하나만 사용하려는 경우 여기에서 시작하세요.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">올바른 연결 패턴, MilvusClient 사용법 및 ORM API 사용 금지 사항.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">스키마 설계</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">필드 유형, 기본 키, 스키마 불변성 및 BM25 구성.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ko/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">검색 패턴</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">중요한 제약 조건 규칙을 적용한 ANN, 하이브리드 및 전체 텍스트 검색.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">색인 선택</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AUTOINDEX, HNSW, DiskANN 및 IVF_FLAT을 위한 의사결정 트리.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 파이프라인</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Milvus를 활용한 종단간 검색 강화 생성 흐름.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ko/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MilvusClient 메서드 호출, 필드 정의, 응답 상태 확인 및 검색 결과 형식.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Go SDK v3 모듈 경로, 연결 타임아웃, 컬렉션 로딩 및 검색 결과 집합.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">v2 엔드포인트, camelCase 요청 필드, 응답 코드 확인 및 로드 상태 폴링.</p>
  </a>
</div>
</div>
<p>AGENTS.md 및 네 가지 주제 프롬프트에 대한 카드는 Python 버전을 실행합니다. 또한 각각 Node.js, Go, RESTful API v2 버전도 제공합니다:</p>
<table>
<thead>
<tr><th>프롬프트</th><th>파이썬</th><th>Node.js</th><th>Go</th><th>RESTful API v2</th></tr>
</thead>
<tbody>
<tr><td>AGENTS.md</td><td><a href="/docs/ko/agents_overview.md">Python</a></td><td><a href="/docs/ko/agents_overview_nodejs.md">Node.js</a></td><td><a href="/docs/ko/agents_overview_go.md">Go</a></td><td><a href="/docs/ko/agents_overview_restful.md">RESTful API v2</a></td></tr>
<tr><td>스키마 설계</td><td><a href="/docs/ko/schema_design.md">파이썬</a></td><td><a href="/docs/ko/schema_design_nodejs.md">Node.js</a></td><td><a href="/docs/ko/schema_design_go.md">Go</a></td><td><a href="/docs/ko/schema_design_restful.md">RESTful API v2</a></td></tr>
<tr><td>검색 패턴</td><td><a href="/docs/ko/search_patterns.md">파이썬</a></td><td><a href="/docs/ko/search_patterns_nodejs.md">Node.js</a></td><td><a href="/docs/ko/search_patterns_go.md">Go</a></td><td><a href="/docs/ko/search_patterns_restful.md">RESTful API v2</a></td></tr>
<tr><td>인덱스 선택</td><td><a href="/docs/ko/index_selection.md">파이썬</a></td><td><a href="/docs/ko/index_selection_nodejs.md">Node.js</a></td><td><a href="/docs/ko/index_selection_go.md">Go</a></td><td><a href="/docs/ko/index_selection_restful.md">RESTful API v2</a></td></tr>
<tr><td>RAG 파이프라인</td><td><a href="/docs/ko/rag_pipeline.md">Python</a></td><td><a href="/docs/ko/rag_pipeline_nodejs.md">Node.js</a></td><td><a href="/docs/ko/rag_pipeline_go.md">Go</a></td><td><a href="/docs/ko/rag_pipeline_restful.md">RESTful API v2</a></td></tr>
</tbody>
</table>
<h3 id="Use-in-different-environments" class="common-anchor-header">다양한 환경에서의 사용<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>환경</th><th>프롬프트 배치 위치</th><th>사용 방법</th></tr>
</thead>
<tbody>
<tr><td>커서</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">프로젝트 규칙 구성</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">사용자 지정 지침</a></td></tr>
<tr><td>Claude 코드</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code 문서</a></td></tr>
<tr><td>JetBrains IDE</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">가이드라인 사용자 지정</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 코드 랩</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">.instructions.md 구성</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">guidelines.md 구성</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">에이전트에 권장되는 배포 방식<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>적절한 Milvus 배포 방식을 선택하는 것은 개발 단계에 따라 달라집니다.</p>
<table>
<thead>
<tr><th>단계</th><th>배포</th><th>이유</th></tr>
</thead>
<tbody>
<tr><td>프로토타이핑</td><td><a href="/docs/ko/milvus_lite.md">Milvus Lite</a></td><td>설정 불필요, 인-프로세스 방식. 파이썬이 실행되는 곳이라면 어디서나 실행 가능 — 신속한 에이전트 프로토타이핑에 이상적입니다.</td></tr>
<tr><td>개발</td><td><a href="/docs/ko/install_standalone-docker.md">Milvus Standalone</a></td><td>단일 노드 Docker 배포. 실제와 유사한 데이터 양을 활용한 로컬 개발 및 테스트에 적합합니다.</td></tr>
<tr><td>프로덕션</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>완전 관리형, 서버리스 Milvus. 관리해야 할 인프라가 없으며, 에이전트가 자동으로 연결되어 작동합니다.</td></tr>
<tr><td>자체 호스팅 프로덕션</td><td><a href="/docs/ko/install_cluster-helm.md">Milvus 분산형</a></td><td>인프라에 대한 완전한 제어가 필요한 팀을 위한 다중 노드 쿠버네티스 배포 환경입니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>에이전트 워크로드의 경우, 프로덕션 환경에서는 <strong><a href="https://zilliz.com/cloud">Zilliz Cloud를</a></strong> 권장합니다. 에이전트는 일반적으로 인프라를 관리하지 않으므로, 서버리스 배포를 통해 운영 부담을 줄이고 자동 스케일링을 제공합니다.</p>
</div>
