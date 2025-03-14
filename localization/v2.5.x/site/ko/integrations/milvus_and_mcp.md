---
id: milvus_and_mcp.md
summary: >-
  이 튜토리얼에서는 사용자 지정 데이터베이스 쿼리를 작성하지 않고도 AI 애플리케이션이 벡터 검색을 수행하고, 컬렉션을 관리하고, 자연어
  명령을 사용하여 데이터를 검색할 수 있도록 Milvus용 MCP 서버를 설정하는 방법을 안내합니다.
title: Milvus와 MindsDB 통합
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: AI와 벡터 데이터베이스의 연결<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">소개<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>MCP(모델 컨텍스트 프로토콜)</strong> 는 Claude 및 Cursor와 같은 AI 애플리케이션이 외부 데이터 소스 및 툴과 원활하게 상호 작용할 수 있도록 지원하는 개방형 프로토콜입니다. 맞춤형 AI 애플리케이션을 구축하든, AI 워크플로를 통합하든, 채팅 인터페이스를 개선하든, MCP는 대규모 언어 모델(LLM)을 관련 컨텍스트 데이터와 연결하는 표준화된 방법을 제공합니다.</p>
<p>이 튜토리얼에서는 사용자 지정 데이터베이스 쿼리를 작성하지 <strong>않고도</strong>AI 애플리케이션이 벡터 검색을 수행하고, 컬렉션을 관리하고, <strong>자연어 명령을</strong>사용하여 데이터를 검색할 수 있도록 <strong>Milvus용 MCP 서버를 설정하는</strong> 방법을 안내합니다.</p>
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
    </button></h2><p>MCP 서버를 설정하기 전에 다음이 필요합니다:</p>
<ul>
<li>Python 3.10 이상</li>
<li>실행 중인 <a href="https://milvus.io/">Milvus</a> 인스턴스</li>
<li><a href="https://github.com/astral-sh/uv">UV</a> (서버 실행에 권장)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">시작하기<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>이 MCP 서버를 사용하는 권장 방법은 설치 없이 uv로 직접 실행하는 것입니다. 아래 예제에서 Claude 데스크톱과 커서가 이 서버를 사용하도록 구성한 방식입니다.</p>
<p>리포지토리를 복제하려는 경우:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>서버를 직접 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">지원되는 애플리케이션<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>이 MCP 서버는 다음과 같이 모델 컨텍스트 프로토콜을 지원하는 다양한 AI 애플리케이션과 함께 사용할 수 있습니다:</p>
<ul>
<li><strong>클로드 데스크톱</strong>: 클로드용 앤트로픽의 데스크톱 애플리케이션</li>
<li><strong>커서</strong>: 컴포저 기능에서 MCP를 지원하는 AI 기반 코드 편집기</li>
<li><strong>기타 커스텀 MCP 클라이언트</strong> MCP 클라이언트 사양을 구현하는 모든 애플리케이션</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Claude Desktop에서 MCP 사용<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><a href="https://claude.ai/download">Claude Desktop을</a> 설치합니다.</li>
<li>Claude 구성 파일을 엽니다:<ul>
<li>macOS의 경우: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>다음 구성을 추가합니다:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Claude Desktop을 재시작하여 변경 사항을 적용합니다.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Cursor에서 MCP 사용<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor는</a> Composer의 에이전트 기능을 통해 MCP 도구도 지원합니다. 두 가지 방법으로 Milvus MCP 서버를 Cursor에 추가할 수 있습니다:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">옵션 1: 커서 설정 UI 사용</h3><ol>
<li><code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code> 을 엽니다.</li>
<li><code translate="no">+ Add New MCP Server</code> 을 클릭합니다.</li>
<li>입력합니다:<ul>
<li>유형: <code translate="no">stdio</code></li>
<li>이름: <code translate="no">milvus</code></li>
<li>Command:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ 팁: 잠재적인 DNS 확인 문제를 방지하려면 <code translate="no">localhost</code> 대신 <code translate="no">127.0.0.1</code> 을 사용하세요.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">옵션 2: 프로젝트별 구성 사용(권장)</h3><ol>
<li><strong>프로젝트 루트 디렉터리에</strong> <code translate="no">.cursor/mcp.json</code> 파일을 만듭니다:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>커서를 다시 시작하여 구성을 적용합니다.</li>
</ol>
<p>서버를 추가한 후 MCP 설정에서 새로 고침 버튼을 눌러 도구 목록을 채워야 할 수 있습니다. 컴포저 에이전트는 쿼리와 관련된 경우 자동으로 Milvus 도구를 사용합니다.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">연동 확인<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>MCP 서버가 올바르게 설정되었는지 확인합니다:</p>
<h3 id="For-Cursor" class="common-anchor-header">커서의 경우</h3><ol>
<li><code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code> 로 이동합니다.</li>
<li>MCP 서버 목록에 <code translate="no">&quot;Milvus&quot;</code> 이 표시되는지 확인합니다.</li>
<li>Milvus 도구(예: <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>)가 나열되어 있는지 확인합니다.</li>
<li>오류가 나타나면 아래의 <strong>문제 해결</strong> 섹션을 참조하세요.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Milvus용 MCP 서버 도구<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>이 MCP 서버는 <strong>Milvus에서 벡터 데이터를 검색, 쿼리 및 관리하기</strong> 위한 여러 도구를 제공합니다. 자세한 내용은 <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a> 문서를 참조하세요.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 검색 및 쿼리 도구</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → 전체 텍스트 검색으로 문서를 검색합니다.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → 컬렉션에서 벡터 유사도 검색을 수행합니다.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → 벡터 유사도 검색과 속성 필터링을 결합한 하이브리드 검색을 수행합니다.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → 여러 쿼리 벡터로 벡터 유사도 검색 수행하기.</li>
<li><strong><code translate="no">milvus-query</code></strong> → 필터 표현식을 사용하여 컬렉션 쿼리하기.</li>
<li><strong><code translate="no">milvus-count</code></strong> → 컬렉션의 엔티티 개수 계산하기.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 컬렉션 관리</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → 데이터베이스에 있는 모든 컬렉션을 나열합니다.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → 컬렉션에 대한 상세 정보를 조회합니다.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → 컬렉션에 대한 통계 가져오기.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → 지정된 스키마로 새 컬렉션 만들기.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → 검색 및 쿼리를 위해 컬렉션을 메모리에 로드합니다.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → 메모리에서 컬렉션 해제하기.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → 쿼리 세그먼트에 대한 정보 조회하기.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → 컬렉션의 로딩 진행률 조회하기.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 데이터 작업</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → 컬렉션에 데이터를 삽입합니다.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → 성능 향상을 위해 데이터를 일괄적으로 삽입합니다.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → 컬렉션에 데이터를 삽입합니다(있는 경우 삽입 또는 업데이트).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → 필터 표현식에 따라 컬렉션에서 엔티티를 삭제합니다.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → 기존 컬렉션에 동적 필드를 추가합니다.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ 인덱스 관리</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → 벡터 필드에 인덱스를 생성합니다.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → 컬렉션의 인덱스에 대한 정보를 가져옵니다.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">환경 변수<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → Milvus 서버 URI( <code translate="no">--milvus-uri</code> 대신 설정 가능).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → 인증 토큰(선택 사항).</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → 데이터베이스 이름(기본값은 "기본값").</li>
</ul>
<h2 id="Development" class="common-anchor-header">개발<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>서버를 직접 실행합니다:</p>
<pre><code translate="no" class="language-bash">uv run server.<span class="hljs-property">py</span> --milvus-uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">예시<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Claude 데스크톱 사용</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">예제 1: 컬렉션 나열하기</h4><pre><code translate="no">What are the collections I have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 Claude는 MCP를 사용하여 Milvus DB에서 이 정보를 확인합니다.</p>
<pre><code translate="no">I&#x27;ll check what collections are available in your Milvus database.

&gt; View result from milvus-list-collections from milvus (local)

Here are the collections in your Milvus database:

1. rag_demo
2. test
3. chat_messages
4. text_collection
5. image_collection
6. customized_setup
7. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">예 2: 문서 검색</h4><pre><code translate="no"><span class="hljs-title class_">Find</span> documents <span class="hljs-keyword">in</span> my text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude는 Milvus의 전체 텍스트 검색 기능을 사용하여 관련 문서를 찾습니다:</p>
<pre><code translate="no">I&#x27;ll search for documents about machine learning in your text_collection.

&gt; View result from milvus-text-search from milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based on your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">커서 사용</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">예시: 컬렉션 만들기</h4><p>커서의 작곡기에서 요청할 수 있습니다:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>커서는 MCP 서버를 사용하여 이 작업을 실행합니다:</p>
<pre><code translate="no">I<span class="hljs-string">&#x27;ll create a new collection called &#x27;</span>articles<span class="hljs-string">&#x27; with the specified fields.

&gt; View result from milvus-create-collection from milvus (local)

Collection &#x27;</span>articles<span class="hljs-string">&#x27; has been created successfully with the following schema:
- title: string
- content: string
- vector: float vector[128]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">문제 해결<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">일반적인 문제</h3><h4 id="Connection-Errors" class="common-anchor-header">연결 오류</h4><p>&quot;Milvus 서버에 연결하지 못했습니다&quot;와 같은 오류가 표시되는 경우:</p>
<ol>
<li>Milvus 인스턴스가 실행 중인지 확인합니다: <code translate="no">docker ps</code> (Docker를 사용하는 경우).</li>
<li>구성에서 URI가 올바른지 확인합니다.</li>
<li>연결을 차단하는 방화벽 규칙이 없는지 확인합니다.</li>
<li>URI에 <code translate="no">localhost</code> 대신 <code translate="no">127.0.0.1</code> 을 사용해보세요.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">인증 문제</h4><p>인증 오류가 표시되는 경우</p>
<ol>
<li><code translate="no">MILVUS_TOKEN</code> 이 올바른지 확인합니다.</li>
<li>Milvus 인스턴스에 인증이 필요한지 확인합니다.</li>
<li>수행하려는 작업에 대한 올바른 권한이 있는지 확인합니다.</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">도구를 찾을 수 없음</h4><p>MCP 도구가 클로드 데스크톱 또는 커서에 나타나지 않는 경우:</p>
<ol>
<li>애플리케이션을 다시 시작하세요.</li>
<li>서버 로그에서 오류를 확인합니다.</li>
<li>MCP 서버가 올바르게 실행되고 있는지 확인합니다.</li>
<li>MCP 설정에서 새로고침 버튼을 누릅니다(커서의 경우).</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">도움말 받기</h3><p>문제가 계속 발생하는 경우</p>
<ol>
<li><a href="https://github.com/zilliztech/mcp-server-milvus/issues">깃허브 이슈에서</a> 비슷한 문제가 있는지 확인하세요.</li>
<li><a href="https://discord.gg/zilliz">질리즈 커뮤니티 디스코드에</a> 가입하여 지원 받기</li>
<li>문제에 대한 자세한 정보와 함께 새 이슈를 제출하세요.</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>이 튜토리얼을 따라하면 이제 밀버스에서 인공지능 기반 벡터 검색이 가능한 <strong>MCP 서버를</strong> 실행할 수 있습니다. 이제 <strong>클로드 데스크톱을</strong> 사용하든 <strong>커서를</strong> 사용하든 데이터베이스 코드를 작성하지 <strong>않고도 자연어 명령을</strong>사용하여 Milvus 데이터베이스를 쿼리, 관리 및 검색할 수 있습니다!</p>
