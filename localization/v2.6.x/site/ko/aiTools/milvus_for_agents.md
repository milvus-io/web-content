---
id: milvus_for_agents.md
title: AI 에이전트용 Milvus
summary: 'AI 에이전트가 Milvus를 RAG, 시맨틱 검색 및 장기 기억을 위한 벡터 데이터베이스로 사용하는 방법을 알아보세요.'
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">AI 에이전트용 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 AI 코딩 에이전트 및 자율 에이전트 시스템이 벡터 데이터베이스와 프로그래밍 방식으로 상호 작용할 수 있는 에이전트 친화적인 인터페이스를 제공합니다. RAG 파이프라인, 시맨틱 검색 또는 에이전트 메모리 시스템을 구축하든 Milvus는 에이전트가 연결하고 작동할 수 있는 다양한 방법을 제공합니다.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">LLM이 벡터 데이터베이스 작업을 위해 PyMilvus를 사용하도록 가르치는 Claude Code용 에이전트 스킬입니다.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 서버</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP 호환 에이전트가 Milvus와 직접 상호작용할 수 있는 모델 컨텍스트 프로토콜 서버입니다.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">클로드 컨텍스트 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">클로드 코드용으로 설계된 MCP 서버로, 컨텍스트 인식 Milvus 문서 액세스를 제공합니다.</p>
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
    </button></h2><p>AI 코딩 어시스턴트가 올바른 Milvus 코드를 작성하는 데 도움이 되는 선별된 프롬프트. 각 프롬프트는 가장 일반적인 실수를 방지하는 규칙과 패턴을 인코딩합니다.</p>
<p><strong>사용 방법:</strong></p>
<ol>
<li>프롬프트 페이지의 '전체 프롬프트' 섹션에서 프롬프트를<strong>복사합니다</strong>.</li>
<li>AI 도구가 예상하는 파일에<strong>저장합니다</strong> (아래 <a href="#use-in-different-environments">환경 표</a> 참조).</li>
<li>AI 어시스턴트가 Milvus 코드를 생성하거나 검토할 때 자동으로 규칙을 적용합니다.</li>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">모든 AI 코딩 에이전트에 대한 최상위 규칙입니다. 파일이 하나만 필요한 경우 여기에서 시작하세요.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">올바른 연결 패턴, MilvusClient 사용 및 ORM API 금지.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">중요 제약 조건 규칙을 사용한 ANN, 하이브리드 및 전체 텍스트 검색.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">색인 선택</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AUTOINDEX, HNSW, DiskANN 및 IVF_FLAT에 대한 의사 결정 트리.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ko/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 파이프라인</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Milvus를 사용한 엔드투엔드 검색 증강 생성 흐름.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">다양한 환경에서 사용<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>환경</th><th>프롬프트를 넣을 위치</th><th>지침</th></tr>
</thead>
<tbody>
<tr><td>커서</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">프로젝트 규칙 구성</a></td></tr>
<tr><td>GitHub 코파일럿</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">사용자 지정 지침</a></td></tr>
<tr><td>클로드 코드</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">클로드 코드 문서</a></td></tr>
<tr><td>JetBrains IDE</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">사용자 지정 지침</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 코드랩</a></td></tr>
<tr><td>VS 코드</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">.instructions.md 구성</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">지침.md 구성</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">에이전트를 위한 권장 배포<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>올바른 Milvus 배포를 선택하는 것은 개발 단계에 따라 다릅니다.</p>
<table>
<thead>
<tr><th>단계</th><th>배포</th><th>이유</th></tr>
</thead>
<tbody>
<tr><td>프로토타이핑</td><td><a href="/docs/ko/milvus_lite.md">Milvus Lite</a></td><td>제로 구성, 인프로세스 중. Python이 실행되는 모든 곳에서 실행되므로 신속한 에이전트 프로토타이핑에 이상적입니다.</td></tr>
<tr><td>개발</td><td><a href="/docs/ko/install_standalone-docker.md">Milvus 스탠드얼론</a></td><td>단일 노드 도커 배포. 현실적인 데이터 볼륨으로 로컬 개발 및 테스트에 적합합니다.</td></tr>
<tr><td>프로덕션</td><td><a href="https://cloud.zilliz.com/signup">질리즈 클라우드</a></td><td>완전 관리형 서버리스 Milvus. 관리할 인프라 없이 에이전트만 연결하고 운영하면 됩니다.</td></tr>
<tr><td>자체 호스팅 프로덕션</td><td><a href="/docs/ko/install_cluster-helm.md">Milvus 분산</a></td><td>인프라에 대한 완전한 제어가 필요한 팀을 위한 멀티노드 Kubernetes 배포.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>에이전트 워크로드의 경우 프로덕션용으로 <strong><a href="https://zilliz.com/cloud">Zilliz Cloud를</a></strong> 사용하는 것이 좋습니다. 에이전트는 일반적으로 인프라를 관리하지 않으므로 서버리스 배포는 운영 오버헤드를 없애고 자동 확장을 제공합니다.</p>
</div>
