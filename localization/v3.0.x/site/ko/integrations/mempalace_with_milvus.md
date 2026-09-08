---
id: mempalace_with_milvus.md
summary: >-
  이 튜토리얼에서는 MemPalace CLI를 사용하여 공개된 Milvus 문서의 실제 일부를 추출하고 이를 Milvus에 저장해 보겠습니다.
  이 코퍼스에는 분석기, 토큰화기 및 토큰 필터에 관한 문서가 포함되어 있습니다. 서로 밀접하게 관련된 이 페이지들은 검색 예제를 의미 있게
  만들기에 충분한 방해 요소를 제공합니다.
title: Milvus와 함께하는 MemPalace
---
<h1 id="MemPalace-with-Milvus" class="common-anchor-header">Milvus와 함께하는 MemPalace<button data-href="#MemPalace-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MemPalace/mempalace">MemPalace는</a> 코딩 에이전트 및 장시간 실행되는 개발 워크플로우를 위한 메모리 레이어입니다. 이 도구는 프로젝트 지식을 '윙(wings)', '룸(rooms)', '서랍(drawers)'으로 체계화한 후, 세션을 넘나들며 원본 콘텐츠를 검색할 수 있게 해줍니다.</p>
<p>이 튜토리얼에서는 MemPalace CLI를 사용하여 공개된 <a href="https://github.com/milvus-io/milvus-docs">Milvus 문서의</a> 실제 하위 집합을 추출하고 이를 <a href="https://milvus.io/">Milvus에</a> 저장해 보겠습니다. 이 코퍼스에는 분석기(analyzers), 토큰화기(tokenizers), 토큰 필터(token filters)에 대한 문서가 포함되어 있습니다. 서로 밀접하게 연관된 이 페이지들은 검색 예제를 의미 있게 만들기에 충분한 방해 요소를 제공합니다.</p>
<p>이 예제에서는 Milvus Lite를 사용하므로 Docker나 별도의 데이터베이스 서버 없이 로컬에서 실행됩니다. 동일한 MemPalace 구성을 사용하여 공유 배포를 위해 Milvus 서버나 Zilliz Cloud를 지정할 수도 있습니다.</p>
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
    </button></h2><p>PyPI에서 MemPalace와 선택적 Milvus 종속성을 함께 설치하십시오. 이 명령어는 의도적으로 버전을 고정하지 않으므로, 새로 설치할 경우 사용 가능한 최신 릴리스가 적용됩니다.</p>
<pre><code translate="no" class="language-shell">uv tool install &quot;mempalace[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>또한 문서 코퍼스를 다운로드하려면 Git이 필요합니다.</p>
<p>이 튜토리얼은 MemPalace의 로컬 MiniLM 임베딩 모델을 사용하므로, 외부 모델 API 키가 필요하지 않습니다. 첫 번째 마이닝 또는 검색 명령을 실행하면 소규모 ONNX 임베딩 모델이 다운로드될 수 있습니다.</p>
<h2 id="Configure-the-workspace" class="common-anchor-header">작업 공간 구성<button data-href="#Configure-the-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>문서용과 MemPalace용 디렉터리가 분리된 작업 공간을 생성합니다:</p>
<pre><code translate="no" class="language-shell">mkdir -p mempalace-milvus-demo
cd mempalace-milvus-demo

export PALACE_DIR=&quot;$PWD/palace&quot;
export DOCS_REPO=&quot;$PWD/milvus-docs&quot;
export PROJECT_DIR=&quot;$PWD/milvus-analyzer-docs&quot;
export MEMPALACE_EMBEDDING_MODEL=&quot;minilm&quot;
export MEMPALACE_EMBEDDING_DEVICE=&quot;cpu&quot;
export MEMPALACE_EMBEDDING_THREADS=&quot;2&quot;
<button class="copy-code-btn"></button></code></pre>
<p>아래 MemPalace 명령어에 <code translate="no">--backend milvus</code> 를 전달합니다. 원격 Milvus URI가 구성되지 않았으므로, MemPalace는 <code translate="no">$PALACE_DIR/milvus.db</code> 에 로컬 Milvus Lite 데이터베이스를 생성합니다.</p>
<blockquote>
<p>백엔드에서 사용하는 <code translate="no">MilvusClient</code> 인자에 대해서는 다음과 같습니다:</p>
<ul>
<li><code translate="no">uri</code> 를 <code translate="no">./milvus.db</code> 와 같은 로컬 경로로 설정하는 것이 가장 편리한 방법입니다. 이렇게 하면 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 사용하여 데이터를 로컬에 저장합니다.</li>
<li>더 큰 규모의 배포 환경에서는 <a href="https://milvus.io/docs/quickstart.md">Milvus 서버를</a> 사용하고 URI를 <code translate="no">http://localhost:19530</code> 와 같은 해당 서버의 엔드포인트로 설정할 수 있습니다.</li>
<li><a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 사용하려면 URI와 토큰을 클러스터의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">공개 엔드포인트와 API 키</a>로 설정하십시오.</li>
</ul>
</blockquote>
<h2 id="Download-the-Milvus-documentation-corpus" class="common-anchor-header">Milvus 문서 코퍼스 다운로드<button data-href="#Download-the-Milvus-documentation-corpus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 문서 저장소는 이 예제에서 필요한 것보다 훨씬 방대합니다. Git 스파스 체크아웃을 사용하여 <code translate="no">v3.0.x</code> 브랜치에서 Analyzer 문서 디렉토리만 다운로드하세요:</p>
<pre><code translate="no" class="language-shell">git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  --branch v3.0.x \
  https://github.com/milvus-io/milvus-docs.git \
  &quot;$DOCS_REPO&quot;

git -C &quot;$DOCS_REPO&quot; sparse-checkout set \
  site/en/userGuide/schema/analyzer

cp -R \
  &quot;$DOCS_REPO/site/en/userGuide/schema/analyzer&quot; \
  &quot;$PROJECT_DIR&quot;
<button class="copy-code-btn"></button></code></pre>
<p>이 글을 작성하는 시점에서 이 디렉토리에는 31개의 마크다운 페이지가 포함되어 있습니다. 여기에는 일반적인 Analyzer 가이드와 밀접하게 관련된 세 그룹의 페이지가 포함되어 있습니다:</p>
<pre><code translate="no" class="language-text">milvus-analyzer-docs/
├── analyzer/       # Built-in language analyzers
├── filter/         # Token filters
├── tokenizer/      # Tokenizers
└── *.md            # Analyzer overviews and selection guides
<button class="copy-code-btn"></button></code></pre>
<p>소스 페이지 수 확인:</p>
<pre><code translate="no" class="language-shell">find &quot;$PROJECT_DIR&quot; -type f -name &quot;*.md&quot; | wc -l
<button class="copy-code-btn"></button></code></pre>
<p>참조 출력:</p>
<pre><code translate="no" class="language-text">31
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 문서 브랜치가 업데이트됨에 따라 정확한 개수는 변경될 수 있습니다.</p>
<h2 id="Define-the-MemPalace-rooms" class="common-anchor-header">MemPalace 룸 정의<button data-href="#Define-the-MemPalace-rooms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace는 ` <code translate="no">mempalace init</code>` 과정에서 룸을 감지할 수 있지만, 초기화 흐름에서는 프로젝트 전체에 걸친 휴리스틱 엔티티 분류를 수행하고 승인된 결과를 엔티티 레지스트리에 기록합니다. 이 문서 코퍼스를 정의하는 데는 해당 분류 단계가 필요하지 않으므로, 소규모 분류 체계를 직접 제공합니다. 마이닝 과정에서 MemPalace는 여전히 결정론적 휴리스틱 엔티티 메타데이터를 연결하고 내부 복도 링크를 구축할 수 있습니다. 이러한 연관성은 파일이 어느 룸으로 전달될지를 결정하지 않으며, 아래의 룸 단위 검색 결과에도 영향을 미치지 않습니다.</p>
<p>다음 내용을 포함하여 ` <code translate="no">$PROJECT_DIR/mempalace.yaml</code> ` 파일을 생성하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">wing:</span> <span class="hljs-string">milvus_analyzer_docs</span>
<span class="hljs-attr">rooms:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">analyzer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Built-in</span> <span class="hljs-string">language</span> <span class="hljs-string">analyzers</span> <span class="hljs-string">and</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">selection</span> <span class="hljs-string">guides</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">analyzer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">filter</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Token</span> <span class="hljs-string">filters</span> <span class="hljs-string">used</span> <span class="hljs-string">in</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">pipelines</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">filter</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">tokenizer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Tokenizers</span> <span class="hljs-string">and</span> <span class="hljs-string">language</span> <span class="hljs-string">identification</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">tokenizer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">general</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Analyzer</span> <span class="hljs-string">documentation</span> <span class="hljs-string">that</span> <span class="hljs-string">does</span> <span class="hljs-string">not</span> <span class="hljs-string">fit</span> <span class="hljs-string">another</span> <span class="hljs-string">room</span>
    <span class="hljs-attr">keywords:</span> []
<button class="copy-code-btn"></button></code></pre>
<p>'wing'은 전체 문서 코퍼스를 나타냅니다. 'room'은 주제 영역을 나타냅니다. MemPalace는 파일을 라우팅할 때 먼저 디렉터리를 확인한 다음, 파일 이름을 확인하고, 마지막으로 파일 내용의 룸 키워드를 확인합니다. 예를 들어, <code translate="no">filter/</code> 아래에 있는 파일은 <code translate="no">filter</code> 룸으로 직접 이동합니다.</p>
<p>그런 다음 각 파일은 서로 겹치는 텍스트 청크로 분할됩니다. 모든 청크는 원문 그대로의 마크다운과 <code translate="no">wing</code>, <code translate="no">room</code>, <code translate="no">source_file</code>, <code translate="no">chunk_index</code>, 소스 줄 번호와 같은 메타데이터를 포함하는 ‘서랍(drawer)’이 됩니다. 룸과 서랍은 MemPalace의 Milvus 컬렉션 내에서 논리적 메타데이터로 유지되며, MemPalace는 룸마다 별도의 Milvus 컬렉션을 생성하지 않습니다.</p>
<h2 id="Mine-the-documentation-into-Milvus" class="common-anchor-header">문서를 Milvus로 마이닝하기<button data-href="#Mine-the-documentation-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 백엔드를 사용하여 프로젝트 마이닝:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  mine &quot;$PROJECT_DIR&quot; \
  --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>검증된 문서 스냅샷의 출력 참조:</p>
<pre><code translate="no" class="language-text">=======================================================
  Done.
  Files processed: 31
  Files skipped (already filed or other): 0
  Drawers filed: 473

  By room:
    filter               16 files
    analyzer              8 files
    tokenizer             7 files
=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>MemPalace는 마크다운을 요약하거나 재작성하지 않고 그대로 읽어들이며, 로컬 임베딩을 계산하고 서랍을 Milvus에 저장합니다. 테스트된 문서 스냅샷에서 31개의 파일이 473개의 서랍을 생성했습니다.</p>
<p>결과로 생성된 룸과 서랍 수를 확인하세요:</p>
<pre><code translate="no" class="language-shell">mempalace --palace &quot;$PALACE_DIR&quot; status --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>참조 출력:</p>
<pre><code translate="no" class="language-text">=======================================================
  MemPalace Status -- 473 drawers
=======================================================

  WING: milvus_analyzer_docs
    ROOM: analyzer               212 drawers
    ROOM: filter                 156 drawers
    ROOM: tokenizer              105 drawers

=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>업스트림 문서가 변경되면 더 긴 페이지는 더 많은 청크를 생성하므로 정확한 드로어 수는 달라질 수 있습니다.</p>
<h2 id="Semantic-search" class="common-anchor-header">의미 기반 검색<button data-href="#Semantic-search" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">mempalace search</code> 를 사용하여 의미에 따라 문서를 검색할 수 있습니다. 다음 질문은 특정 파일이나 Analyzer 기능을 명시하지 않습니다:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How should I analyze documents that mix several languages?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>참조 출력 (점수는 다를 수 있음):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How should I analyze documents that mix several languages?&quot;
Wing: milvus_analyzer_docs

[1] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
    Match: cosine_sim=0.334 bm25=2.469
[2] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
[3] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
<button class="copy-code-btn"></button></code></pre>
<p>검증된 실행 결과에서, 코퍼스에는 개별 언어 분석기, 토큰화기 및 필터에 대한 페이지도 포함되어 있었음에도 불구하고 세 결과 모두 <code translate="no">multi-language-analyzers.md</code> 에서 나왔습니다.</p>
<h2 id="Search-within-a-room" class="common-anchor-header">룸 내 검색<button data-href="#Search-within-a-room" class="anchor-icon" translate="no">
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
    </button></h2><p>관련 개념이 코퍼스 전반에 걸쳐 나타나는 경우, 룸 필터를 사용하면 유용합니다. 다음 쿼리는 <code translate="no">filter</code> 룸에서만 동등한 용어가 일치하도록 하는 방법을 검색합니다:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How can equivalent terms such as USA and United States match one another?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room filter \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>참조 결과(점수는 달라질 수 있음):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How can equivalent terms such as USA and United States match one another?&quot;
Wing: milvus_analyzer_docs
Room: filter

[1] milvus_analyzer_docs / filter
    Source: synonym-filter.md
    Match: cosine_sim=0.765 bm25=2.573
[2] milvus_analyzer_docs / filter
    Source: stemmer-filter.md
[3] milvus_analyzer_docs / filter
    Source: stop-filter.md
<button class="copy-code-btn"></button></code></pre>
<p>최상위 결과는 <code translate="no">synonym-filter.md</code> 에서 나와야 합니다. 룸 제약 조건은 벡터 검색 전에 드로어 메타데이터를 통해 적용되므로, 토큰화기 및 언어 분석기 드로어는 이 검색에서 제외됩니다.</p>
<h2 id="Search-for-exact-terms" class="common-anchor-header">정확한 용어 검색<button data-href="#Search-for-exact-terms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace CLI는 벡터 검색 후보를 순위 매길 때 의미적 유사성과 BM25 신호를 결합합니다. 따라서 정확한 구성 이름과 기능 이름을 사용하면 별도의 CLI 검색 모드로 전환하지 않고도 순위를 향상시킬 수 있습니다.</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;language_identifier tokenizer&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room tokenizer \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>참조 출력 (점수는 달라질 수 있음):</p>
<pre><code translate="no" class="language-text">Results for: &quot;language_identifier tokenizer&quot;
Wing: milvus_analyzer_docs
Room: tokenizer

[1] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
    Match: cosine_sim=0.420 bm25=0.969
[2] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
[3] milvus_analyzer_docs / tokenizer
    Source: lindera-tokenizer.md
<button class="copy-code-btn"></button></code></pre>
<p>결과에서는 <code translate="no">language-identifier.md</code> 가 우선적으로 표시되어야 하며, 이 문서에는 감지된 언어를 기반으로 분석기를 선택하는 데 사용되는 <code translate="no">language_identifier</code> 토큰화기가 설명되어 있습니다.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">Milvus 컬렉션 확인<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace는 Milvus 스키마를 자동으로 관리합니다. 저장된 내용을 확인하려면 다음 스크립트를 <code translate="no">inspect_milvus.py</code> 로 저장하십시오. 이 스크립트는 동일한 Milvus Lite 데이터베이스를 열고, 컬렉션을 검사하며, 방별 서랍 수를 집계합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


client = MilvusClient(uri=os.environ[<span class="hljs-string">&quot;MEMPALACE_MILVUS_LITE_PATH&quot;</span>])

<span class="hljs-keyword">for</span> collection_name <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(client.list_collections()):
    stats = client.get_collection_stats(collection_name)
    schema = client.describe_collection(collection_name)
    fields = [field[<span class="hljs-string">&quot;name&quot;</span>] <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> schema[<span class="hljs-string">&quot;fields&quot;</span>]]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{collection_name}</span>: rows=<span class="hljs-subst">{stats[<span class="hljs-string">&#x27;row_count&#x27;</span>]}</span>, fields=<span class="hljs-subst">{fields}</span>&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;mempalace_drawers&quot;</span>)
rows = client.query(
    collection_name=<span class="hljs-string">&quot;mempalace_drawers&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;metadata[&quot;wing&quot;] == &quot;milvus_analyzer_docs&quot;&#x27;</span>,
    limit=<span class="hljs-number">2000</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
)
room_counts = Counter(row[<span class="hljs-string">&quot;metadata&quot;</span>][<span class="hljs-string">&quot;room&quot;</span>] <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Drawers by room:&quot;</span>, <span class="hljs-built_in">dict</span>(<span class="hljs-built_in">sorted</span>(room_counts.items())))
<button class="copy-code-btn"></button></code></pre>
<p>CLI에서 사용하는 것과 동일한 선택적 종속성 세트를 사용하여 스크립트를 실행하십시오:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_LITE_PATH=&quot;$PALACE_DIR/milvus.db&quot;
uv run --with &quot;mempalace[milvus]&quot; inspect_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>참조 출력:</p>
<pre><code translate="no" class="language-text">mempalace_closets: rows=74, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
mempalace_drawers: rows=473, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
Drawers by room: {&#x27;analyzer&#x27;: 212, &#x27;filter&#x27;: 156, &#x27;tokenizer&#x27;: 105}
<button class="copy-code-btn"></button></code></pre>
<p>테스트된 문서 스냅샷의 경우, ` <code translate="no">mempalace_drawers</code> `에는 473개의 행이 포함되어 있었고 ` <code translate="no">mempalace_closets</code> `에는 74개의 내부 탐색 레코드가 포함되어 있었습니다. 옷장과 서랍의 개수가 일치할 필요는 없습니다. 서랍 메타데이터에 따르면 ` <code translate="no">analyzer</code>`에는 212개의 서랍, ` <code translate="no">filter</code>`에는 156개, ` <code translate="no">tokenizer</code>`에는 105개가 표시되었습니다.</p>
<p>이 검사는 새로운 프로세스에서 실행되며 CLI가 생성한 데이터베이스를 다시 열게 되는데, 이는 명령어 간에도 데이터가 유지됨을 확인해 줍니다.</p>
<h2 id="Optional-use-Milvus-server-or-Zilliz-Cloud" class="common-anchor-header">선택 사항: Milvus 서버 또는 Zilliz Cloud 사용<button data-href="#Optional-use-Milvus-server-or-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>공유 배포 환경에서는 동일한 MemPalace CLI 명령을 실행하기 전에 Milvus 연결 환경 변수를 설정하십시오. 위에서 보여준 로컬 Milvus Lite 데이터베이스를 사용하려면 해당 변수를 설정하지 마십시오.</p>
<p>Milvus 서버의 경우:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;http://localhost:19530&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Zilliz Cloud의 경우:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;https://your-cluster.api.region.zillizcloud.com&quot;
export MEMPALACE_MILVUS_TOKEN=&quot;your-api-key&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>이 튜토리얼에 소개된 전체 명령어 흐름은 Milvus Lite를 사용하여 검증되었습니다. 위의 서버 및 클라우드 설정은 선택적 배포 구성이며, 로컬 검증에는 필요하지 않았습니다.</p>
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
    </button></h2><p>MemPalace는 에이전트가 프로젝트 지식을 체계적으로 보존할 수 있는 방법을 제공합니다. ‘윙(wing)’은 코퍼스를 구분하고, ‘룸(room)’은 주제 수준의 범위를 제공하며, ‘서랍(drawer)’은 원본 소스 텍스트를 보관합니다. 이 예시에서, 밀접하게 관련된 31개의 Milvus 문서 페이지는 소수의 수기 기록이 아닌 수백 개의 검색 가능한 서랍으로 변환됩니다. Milvus는 이러한 구조의 기반이 되는 벡터, 스파스, 텍스트 및 메타데이터를 지속적으로 저장합니다.</p>
