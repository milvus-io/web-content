---
id: basic_memory_with_milvus.md
summary: >-
  이 튜토리얼에서는 애플리케이션 팀을 위한 간단한 메모리 프로젝트를 구축해 보겠습니다. 캐싱, 인증, 배포, 백업에 관한 메모를 기록한 다음,
  시맨틱 검색과 하이브리드 검색을 통해 필요한 메모를 찾아볼 것입니다.
title: Basic Memory와 Milvus를 활용한 시맨틱 프로젝트 메모리 구축
---
<h1 id="Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="common-anchor-header">Basic Memory와 Milvus를 활용한 시맨틱 프로젝트 메모리 구축<button data-href="#Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/basicmachines-co/basic-memory">Basic Memory는</a> 프로젝트 지식을 일반 마크다운 파일에 저장하고, CLI 및 MCP 서버를 통해 이를 이용할 수 있게 해줍니다. 이를 통해 코딩 에이전트는 단일 대화의 범위를 넘어 지속되어야 하는 결정 사항, 실행 매뉴얼, 교훈 등을 기억할 수 있는 안정적인 공간을 확보하게 됩니다.</p>
<p>이 튜토리얼에서는 애플리케이션 팀을 위한 소규모 메모리 프로젝트를 구축해 보겠습니다. 캐싱, 인증, 배포, 백업에 관한 노트를 기록한 다음, 시맨틱 및 하이브리드 검색을 통해 적절한 노트를 찾아볼 것입니다.</p>
<p><a href="https://milvus.io/">Milvus는</a> 벡터를 저장하고 유사도 검색을 수행합니다. Basic Memory는 PostgreSQL에서 마크다운 노트, 프로젝트 메타데이터, 전체 텍스트 검색 및 벡터 매니페스트를 계속 관리합니다.</p>
<pre><code translate="no" class="language-text">Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
<button class="copy-code-btn"></button></code></pre>
<p>이 튜토리얼에서는 사용자의 컴퓨터 내 특정 경로에서 로컬로 실행되는 Milvus Lite를 사용합니다. 동일한 Basic Memory 구성을 나중에 Milvus Standalone, Milvus Distributed 또는 Zilliz Cloud로 연결할 수도 있습니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>다음이 필요합니다:</p>
<ul>
<li>Python 3.12 이상</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>PostgreSQL 데이터베이스 및 해당 <code translate="no">postgresql+asyncpg://...</code> 연결 URL</li>
<li>OpenAI API 키</li>
</ul>
<p>PyPI에서 Basic Memory와 Milvus 선택적 종속성을 함께 설치하십시오:</p>
<pre><code translate="no" class="language-bash">uv tool install --python 3.12 <span class="hljs-string">&quot;basic-memory[milvus]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Basic-Memory" class="common-anchor-header">Basic Memory 구성<button data-href="#Configure-Basic-Memory" class="anchor-icon" translate="no">
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
    </button></h2><p>튜토리얼용 작업 공간을 생성합니다. Basic Memory 구성과 Milvus Lite 데이터를 이곳에 보관하면 나중에 예제를 쉽게 확인하고 제거할 수 있습니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> -p basic-memory-milvus-demo/notes
<span class="hljs-built_in">cd</span> basic-memory-milvus-demo

<span class="hljs-built_in">export</span> BASIC_MEMORY_CONFIG_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/.basic-memory&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>PostgreSQL을 기본 데이터베이스로, OpenAI를 임베딩 제공자로, Milvus를 벡터 인덱스로 구성합니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_BACKEND=postgres
<span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_URL=<span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/basic-memory-vectors.db&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
<span class="hljs-built_in">export</span> OPENAI_API_KEY=<span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>여기서 <code translate="no">BASIC_MEMORY_MILVUS_URI</code> 는 로컬 경로이므로, PyMilvus가 Milvus Lite를 자동으로 시작합니다. 별도의 Milvus 서버는 필요하지 않습니다.</p>
<p>Basic Memory 전체에서 Milvus는 선택 사항이지만, 이 튜토리얼에서는 Milvus가 벡터 백엔드로 선택되었습니다. 이 선택 사항은 현재 기본 데이터베이스 백엔드가 PostgreSQL인 경우에만 적용됩니다. SQLite 기반 Basic Memory 프로젝트의 경우 대신 <code translate="no">sqlite-vec</code> 를 사용합니다.</p>
<h2 id="Create-a-memory-project" class="common-anchor-header">메모리 프로젝트 생성<button data-href="#Create-a-memory-project" class="anchor-icon" translate="no">
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
    </button></h2><p>Basic Memory 프로젝트는 이름을 Markdown 노트 디렉터리에 매핑합니다. 튜토리얼 디렉터리를 프로젝트로 추가하고 이를 기본값으로 설정하세요:</p>
<pre><code translate="no" class="language-bash">bm project add app-memory <span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/notes&quot;</span> --default
<button class="copy-code-btn"></button></code></pre>
<p>이제 애플리케이션 팀은 영구적인 메모리 공간을 확보했습니다. 이 공간을 소규모의 다양한 카탈로그로 채워보겠습니다. 일부 노트는 나중에 나올 문제와 관련이 있는 반면, 다른 노트는 현실적인 오답 예시를 제공할 것입니다.</p>
<h2 id="Record-project-memories" class="common-anchor-header">프로젝트 메모리 기록<button data-href="#Record-project-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>애플리케이션의 캐싱 결정부터 시작해 봅시다:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Caching Strategy&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Caching Strategy</span>

The application caches read-heavy product responses <span class="hljs-keyword">in</span> Redis <span class="hljs-keyword">for</span> five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>인증 토큰이 어떻게 처리되는지 기록합니다:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Authentication Tokens&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Authentication Tokens</span>

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign <span class="hljs-keyword">in</span> again.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>운영 런북 두 개를 추가하세요:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Deployment Reliability&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Deployment Reliability</span>

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Database Backups&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Database Backups</span>

PostgreSQL uses daily snapshots and continuous write-ahead <span class="hljs-built_in">log</span> archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>마지막으로, 서로 관련 없는 제품 메모 두 개를 추가하세요. 이렇게 하면 모든 문서가 관련 있는 카탈로그보다 검색 연습이 더 현실적인 상황을 반영하게 됩니다:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;UI Accessibility&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># UI Accessibility</span>

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels <span class="hljs-keyword">for</span> screen readers.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Content Planning&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Content Planning</span>

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates <span class="hljs-keyword">for</span> the next product release.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>모든 노트는 여전히 <code translate="no">notes/</code> 아래에 있는 일반적인 마크다운 파일입니다. Basic Memory는 파일 시스템에 대한 소유권을 침해하지 않으면서 검색 가능한 구조를 추가합니다.</p>
<h2 id="Build-the-search-indexes" class="common-anchor-header">검색 인덱스 구축<button data-href="#Build-the-search-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>노트 그룹을 추가하거나 대폭 변경한 후 전체 재색인 작업을 실행합니다:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<p>이 단계에서 Basic Memory는:</p>
<ol>
<li>마크다운 노트를 읽어와 청크로 분할합니다.</li>
<li>PostgreSQL 전체 텍스트 인덱스를 생성합니다.</li>
<li>구성된 OpenAI 임베딩 모델로 청크를 전송합니다.</li>
<li>결과 벡터를 프로젝트별 Milvus 컬렉션에 저장합니다.</li>
<li>성공적으로 저장된 청크를 PostgreSQL 벡터 매니페스트에서 '준비됨' 상태로 표시합니다.</li>
</ol>
<p>Basic Memory는 각 프로젝트마다 결정론적인 Milvus 컬렉션을 사용합니다. 사용자가 직접 컬렉션을 생성하거나 이름을 지정할 필요는 없습니다.</p>
<h2 id="Retrieve-a-memory-by-meaning" class="common-anchor-header">의미를 기반으로 메모리 검색<button data-href="#Retrieve-a-memory-by-meaning" class="anchor-icon" translate="no">
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
    </button></h2><p>새로운 엔지니어가 애플리케이션에 반복 요청을 위한 최적화 기능이 있다는 사실은 기억하지만, 팀이 이를 '캐싱 전략'이라고 불렀다는 사실은 기억하지 못한다고 가정해 봅시다.</p>
<p>벡터 검색을 사용하여 자연어로 질문을 던져보세요:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;How does the application make repeated requests faster?&quot;</span> \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Caching Strategy</code> 쿼리에 노트 제목을 반복할 필요는 없더라도 이 결과가 최상위에 표시되어야 합니다. 벡터 검색은 질문을 임베딩하여 Milvus에 저장된 청크 중 가장 근접한 결과를 요청합니다.</p>
<p>정확한 점수와 낮은 순위의 결과는 임베딩 모델과 프로젝트의 내용에 따라 달라질 수 있습니다.</p>
<h2 id="Combine-semantic-and-keyword-signals" class="common-anchor-header">의미적 신호와 키워드 신호를 결합하기<button data-href="#Combine-semantic-and-keyword-signals" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 보안 사고에 대응하는 상황을 상상해 보세요. 쿼리에는 ‘ <code translate="no">JWT</code> ’와 같은 정확한 용어가 포함되어 있지만, 토큰 취소나 재로그인과 같은 개념적으로 관련된 표현도 함께 포함되기를 원합니다.</p>
<p>하이브리드 검색을 사용하세요:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;JWT rotation after suspicious activity&quot;</span> \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Authentication Tokens</code> 이 결과가 최상위 결과로 표시되어야 합니다. ‘기본 메모리(Basic Memory)’는 PostgreSQL의 전체 텍스트 검색과 Milvus의 벡터 검색을 결합하여, 두 경로 중 어느 한쪽에서든 우수한 콘텐츠를 우선적으로 선정하며, 특히 두 경로 모두에서 발견된 콘텐츠를 우대합니다.</p>
<p>세 가지 검색 모드는 각기 다른 장점을 가지고 있습니다:</p>
<table>
<thead>
<tr><th>모드</th><th>명령어 플래그</th><th>최적의 사용처</th></tr>
</thead>
<tbody>
<tr><td>전체 텍스트</td><td>모드 플래그 없음</td><td>정확한 용어, 구문 및 부울 키워드 쿼리</td></tr>
<tr><td>벡터</td><td><code translate="no">--vector</code></td><td>의역, 개념 및 탐색적 질문</td></tr>
<tr><td>하이브리드</td><td><code translate="no">--hybrid</code></td><td>키워드 및 의미적 신호를 모두 활용한 범용 검색</td></tr>
</tbody>
</table>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">다른 Milvus 배포 환경 사용<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite의 용량을 초과하더라도 애플리케이션 코드와 Basic Memory 명령어는 변경되지 않습니다. URI를 변경하고, 필요한 경우 토큰을 제공하십시오.</p>
<p>Milvus 서버의 경우:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Zilliz Cloud의 경우:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;https://YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;YOUR_API_KEY&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>기존 프로젝트를 벡터 백엔드 간에 전환하기 전에 새로운 대상 컬렉션을 생성하거나 Basic Memory의 벡터 스토어 마이그레이션 절차를 따르십시오. 그런 다음 벡터를 재구축하십시오:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-same-memory-through-MCP" class="common-anchor-header">MCP를 통해 동일한 메모리 사용<button data-href="#Use-the-same-memory-through-MCP" class="anchor-icon" translate="no">
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
    </button></h2><p>CLI는 설정, 유지 관리, 스크립팅 및 데이터 흐름 파악에 유용합니다. 일상 업무에서는 MCP 클라이언트를 사용하여 동일한 Basic Memory 서비스를 시작하고, <code translate="no">write_note</code>, <code translate="no">search_notes</code>, <code translate="no">build_context</code> 와 같은 도구를 직접 호출할 수 있습니다.</p>
<p>예를 들어, Codex MCP 구성에서는 <code translate="no">uv tool</code> 를 통해 설치된 명령을 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[mcp_servers.basic-memory]</span>
<span class="hljs-attr">command</span> = <span class="hljs-string">&quot;basic-memory&quot;</span>
<span class="hljs-attr">args</span> = [<span class="hljs-string">&quot;mcp&quot;</span>]

<span class="hljs-section">[mcp_servers.basic-memory.env]</span>
<span class="hljs-attr">BASIC_MEMORY_CONFIG_DIR</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_BACKEND</span> = <span class="hljs-string">&quot;postgres&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_URL</span> = <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED</span> = <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_VECTOR_INDEX</span> = <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_MILVUS_URI</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER</span> = <span class="hljs-string">&quot;openai&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
<span class="hljs-attr">OPENAI_API_KEY</span> = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>다른 MCP 클라이언트는 동일한 실행 파일과 JSON 형식의 인수를 사용합니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;basic-memory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basic-memory&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;mcp&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_CONFIG_DIR&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_BACKEND&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgres&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_VECTOR_INDEX&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_MILVUS_URI&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openai&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text-embedding-3-small&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OPENAI_API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk-***********&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>가능한 경우 데이터베이스 비밀번호와 API 키는 클라이언트의 비밀 관리 시스템이나 실행 환경에 보관하십시오. 중요한 요구 사항은 MCP 프로세스가 CLI에서 사용하는 것과 동일한 Basic Memory 구성을 수신해야 한다는 점입니다.</p>
<h2 id="What-each-storage-layer-owns" class="common-anchor-header">각 스토리지 계층이 담당하는 역할<button data-href="#What-each-storage-layer-owns" class="anchor-icon" translate="no">
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
    </button></h2><p>이 튜토리얼의 마지막 단계에서는 책임 범위가 의도적으로 분리됩니다:</p>
<ul>
<li>프로젝트 디렉터리는 원본 마크다운 노트를 관리합니다.</li>
<li>PostgreSQL은 Basic Memory의 프로젝트, 엔티티, 메타데이터, 전체 텍스트 인덱스 및 권위 있는 벡터 매니페스트를 관리합니다.</li>
<li>OpenAI는 노트 청크와 검색 질문을 임베딩으로 변환합니다.</li>
<li>Milvus는 벡터 저장 및 최인접 이웃 검색을 담당합니다.</li>
<li>Basic Memory는 각 계층을 조정하며 단일 CLI 및 MCP 환경을 제공합니다.</li>
</ul>
<p>따라서 이 통합 환경에서 Milvus는 PostgreSQL을 대체하지 않습니다. Milvus는 벡터 저장 및 유사도 검색을 위한 PostgreSQL의 ` <code translate="no">pgvector</code> ` 경로를 대체할 뿐이며, Basic Memory의 나머지 관계형 및 전체 텍스트 기능은 PostgreSQL에 그대로 유지됩니다.</p>
