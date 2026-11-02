---
id: quickstart.md
summary: Milvus를 시작해 보세요.
title: 빠른 시작
---
<h1 id="Quickstart" class="common-anchor-header">빠른 시작<button data-href="#Quickstart" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>신경망 모델의 출력 데이터 형식인 벡터는 정보를 효과적으로 인코딩할 수 있으며, 지식 기반, 시맨틱 검색, RAG(Retrieval Augmented Generation) 등 다양한 AI 애플리케이션에서 핵심적인 역할을 수행합니다.</p>
<p>Milvus는 Jupyter 노트북에서 데모 챗봇을 실행하는 것부터 수십억 명의 사용자에게 서비스를 제공하는 웹 규모의 검색 시스템을 구축하는 것까지, 모든 규모의 AI 애플리케이션에 적합한 오픈소스 벡터 데이터베이스입니다. 이 가이드에서는 단 몇 분 만에 로컬에 Milvus를 설정하고, Python 클라이언트 라이브러리를 사용하여 벡터를 생성, 저장 및 검색하는 방법을 단계별로 안내해 드리겠습니다.</p>
<h2 id="Install-Milvus" class="common-anchor-header">Milvus 설치<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 중 한 가지 방법을 선택하세요: 로컬 예제를 위해 Milvus Lite를 사용하거나, 이미 배포한 Milvus 서버에 연결하세요. 두 방법 모두 아래의 컬렉션 및 쿼리 예제를 사용합니다.</p>
<h3 id="Use-a-local-database" class="common-anchor-header">로컬 데이터베이스 사용<button data-href="#Use-a-local-database" class="anchor-icon" translate="no">
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
    </button></h3><p>이 가이드에서는 로컬에서 실행되는 PyMilvus Python SDK의 선택적 종속성인 Milvus Lite를 사용합니다. 서버 배포에 대해서는 <a href="/docs/ko/install_standalone-docker.md">Docker</a> 또는 <a href="/docs/ko/install_cluster-milvusoperator.md">Kubernetes를</a> 참조하십시오.</p>
<p>macOS, Linux 또는 Windows에서 Python 3.10 이상을 사용하며, <code translate="no">faiss-cpu</code> 및 <code translate="no">pyarrow</code> 와 같은 Milvus Lite의 종속성에 대한 바이너리 휠을 사용할 수 있어야 합니다. 예제에서는 PyMilvus 3.0.2와 Milvus Lite 3.2.2를 사용합니다. 두 패키지를 명시적으로 설치하십시오:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows에서 pip는 PyMilvus 3.0.2의 <code translate="no">milvus-lite</code> 추가 구성 요소를 건너뜁니다. 위의 명령어에서는 <code translate="no">milvus-lite</code> 를 명시적으로 지정하므로, 해당 로컬 경로도 정상적으로 작동합니다. SDK 전용 설치 요건에 대해서는 <a href="/docs/ko/install-pymilvus.md">‘Milvus Python SDK 설치’를</a> 참조하십시오.</p>
<div class="alert note">
<blockquote>
<p>Google Colab을 사용하는 경우, 방금 설치한 종속성을 활성화하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다. (화면 상단의 “Runtime” 메뉴를 클릭하고 드롭다운 메뉴에서 “Restart session”을 선택하세요).</p>
</blockquote>
</div>
<h3 id="Use-an-existing-Milvus-server" class="common-anchor-header">기존 Milvus 서버 사용<button data-href="#Use-an-existing-Milvus-server" class="anchor-icon" translate="no">
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
    </button></h3><p>이미 Docker나 Kubernetes를 통해 Milvus를 설치했거나 Zilliz Cloud 엔드포인트를 보유하고 있는 경우, SDK만 설치하면 됩니다. PyMilvus 3.0.2는 Python 3.9 이상이 필요하며, 이 경로를 사용할 때는 로컬 Lite 종속성이 필요하지 않습니다:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">.db</code> 경로를 여는 대신 다음 섹션의 서버 연결 블록을 사용하십시오. SDK 버전이 사용 중인 서버와 호환되는지 확인하십시오. <a href="/docs/ko/release_notes.md">릴리스 노트를</a> 참조하십시오.</p>
<h2 id="Set-Up-Vector-Database" class="common-anchor-header">벡터 데이터베이스 설정<button data-href="#Set-Up-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 연결 블록 중 정확히 하나를 선택하십시오.</p>
<h3 id="Local-Milvus-Lite" class="common-anchor-header">로컬 Milvus Lite<button data-href="#Local-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h3><p>로컬 Milvus 벡터 데이터베이스를 생성하려면 <code translate="no">milvus_demo.db</code> 와 같은 저장 경로를 지정하여 <code translate="no">MilvusClient</code> 를 인스턴스화하십시오. Milvus Lite 3.x는 경로 이름이 <code translate="no">.db</code> 로 끝나는 경우에도 이 경로에 디렉터리를 생성합니다.</p>
<p>Milvus Lite 2.x로 생성된 데이터베이스 파일이 있는 경우, 마이그레이션 전에 이전 버전으로 내보내십시오. 해당 파일을 Milvus Lite 3.x에서 직접 열지 마십시오. <a href="/docs/ko/milvus_lite.md#Migrating-data-from-Milvus-Lite">‘Milvus Lite에서 데이터 마이그레이션’을</a> 참조하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Existing-Milvus-server" class="common-anchor-header">기존 Milvus 서버<button data-href="#Existing-Milvus-server" class="anchor-icon" translate="no">
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
    </button></h3><p>로컬 Docker 배포의 경우, 서버 엔드포인트에 연결하십시오. Zilliz Cloud의 경우, URI를 클러스터 엔드포인트로, 토큰을 API 키로 대체하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>인증 정보를 변경한 경우, 설정된 인증 정보를 사용하십시오. 나머지 예제에서는 사용자가 선택한 <code translate="no">client</code> 를 사용하며, 별도의 로컬 Lite 데이터베이스는 필요하지 않습니다.</p>
<h2 id="Create-a-Collection" class="common-anchor-header">컬렉션 생성<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 벡터와 관련 메타데이터를 저장하기 위해 컬렉션이 필요합니다. 이를 기존 SQL 데이터베이스의 테이블로 생각하면 됩니다. 컬렉션을 생성할 때 스키마 및 인덱스 매개변수를 정의하여 차원, 인덱스 유형, 거리 메트릭과 같은 벡터 사양을 구성할 수 있습니다. 벡터 검색 성능을 위해 인덱스를 최적화하는 복잡한 개념들도 있습니다. 지금은 기본 사항에만 집중하고 가능한 한 모든 항목에 기본값을 사용하도록 하겠습니다. 최소한 컬렉션 이름과 컬렉션의 벡터 필드 차원만 설정하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> client.has_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>):
    client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">768</span>,  <span class="hljs-comment"># The vectors we will use in this demo have 768 dimensions</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 설정에서,</p>
<ul>
<li>주키(primary key)와 벡터 필드는 기본 이름(“id” 및 “vector”)을 사용합니다.</li>
<li>메트릭 유형(벡터 거리 정의)은 기본값(<a href="https://milvus.io/docs/metric.md#Cosine-Similarity">COSINE</a>)으로 설정됩니다.</li>
<li>기본 키 필드는 정수를 허용하며 자동으로 증가하지 않습니다(즉, <a href="https://milvus.io/docs/schema.md">auto-id 기능을</a> 사용하지 않음).
또는 이 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">지침에</a> 따라 컬렉션의 스키마를 공식적으로 정의할 수도 있습니다.</li>
</ul>
<h2 id="Prepare-Data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 벡터를 사용하여 텍스트에 대한 의미적 검색을 수행합니다. 임베딩 모델을 다운로드하여 텍스트에 대한 벡터를 생성해야 합니다. 이는 <code translate="no">pymilvus[model]</code> 라이브러리의 유틸리티 함수를 사용하여 쉽게 수행할 수 있습니다.</p>
<h2 id="Represent-text-with-vectors" class="common-anchor-header">텍스트를 벡터로 표현하기<button data-href="#Represent-text-with-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>먼저 모델 라이브러리를 설치합니다. 이 패키지에는 PyTorch와 같은 필수 ML 도구가 포함되어 있습니다. 로컬 환경에 PyTorch가 설치된 적이 없다면 패키지 다운로드에 다소 시간이 걸릴 수 있습니다.</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>기본 모델을 사용하여 벡터 임베딩을 생성합니다. Milvus는 데이터가 사전(dictionary) 목록 형태로 정리되어 입력되기를 기대하며, 각 사전은 ‘엔티티(entity)’라고 불리는 데이터 레코드를 나타냅니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># If connection to https://huggingface.co/ failed, uncomment the following path</span>
<span class="hljs-comment"># import os</span>
<span class="hljs-comment"># os.environ[&#x27;HF_ENDPOINT&#x27;] = &#x27;https://hf-mirror.com&#x27;</span>

<span class="hljs-comment"># This will download a small embedding model &quot;paraphrase-albert-small-v2&quot; (~50MB).</span>
embedding_fn = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = embedding_fn.encode_documents(docs)
<span class="hljs-comment"># The output vector has 768 dimensions, matching the collection that we just created.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, embedding_fn.dim, vectors[<span class="hljs-number">0</span>].shape)  <span class="hljs-comment"># Dim: 768 (768,)</span>

<span class="hljs-comment"># Each entity has id, vector representation, raw text, and a subject label that we use</span>
<span class="hljs-comment"># to demo metadata filtering later.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dim: <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alternatively-Use-fake-representation-with-random-vectors" class="common-anchor-header">[대안] 임의의 벡터를 사용한 가짜 표현 활용<button data-href="#Alternatively-Use-fake-representation-with-random-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>네트워크 문제로 인해 모델을 다운로드할 수 없는 경우, 임시 해결책으로 임의의 벡터를 사용하여 텍스트를 표현하고 예제를 완료할 수 있습니다. 단, 벡터가 가짜이므로 검색 결과에는 의미적 유사성이 반영되지 않는다는 점에 유의하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># Use fake representation with random vectors (768 dimension).</span>
<span class="hljs-comment"># Keep the same interface as the model-backed path so the remaining examples run.</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DemoEmbeddingFunction</span>:
    dim = <span class="hljs-number">768</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.rng = random.Random(<span class="hljs-number">42</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, texts</span>):
        <span class="hljs-keyword">return</span> [[<span class="hljs-variable language_">self</span>.rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> texts]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, texts</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.encode_documents(texts)

embedding_fn = DemoEmbeddingFunction()
vectors = embedding_fn.encode_documents(docs)
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-Data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 데이터를 삽입해 보겠습니다:</p>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{<span class="hljs-string">&#x27;insert_count&#x27;</span>: 3, <span class="hljs-string">&#x27;ids&#x27;</span>: [0, 1, 2], <span class="hljs-string">&#x27;cost&#x27;</span>: 0}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search" class="common-anchor-header">의미적 검색<button data-href="#Semantic-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 검색 쿼리 텍스트를 벡터로 표현하여 의미 기반 검색을 수행하고, Milvus에서 벡터 유사도 검색을 실행할 수 있습니다.</p>
<h3 id="Vector-search" class="common-anchor-header">벡터 검색<button data-href="#Vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 하나 또는 여러 개의 벡터 검색 요청을 동시에 처리할 수 있습니다. query_vectors 변수의 값은 벡터 목록이며, 각 벡터는 부동 소수점 숫자로 구성된 배열입니다.</p>
<pre><code translate="no" class="language-python">query_vectors = embedding_fn.encode_queries([<span class="hljs-string">&quot;Who is Alan Turing?&quot;</span>])
<span class="hljs-comment"># If you don&#x27;t have the embedding function you can use a fake vector to finish the demo:</span>
<span class="hljs-comment"># query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.5859944820404053, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.5118255615234375, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>출력은 결과 목록이며, 각 결과는 벡터 검색 쿼리와 매핑됩니다. 각 쿼리에는 결과 목록이 포함되어 있으며, 각 결과에는 엔티티의 기본 키, 쿼리 벡터와의 거리, 그리고 지정된 <code translate="no">output_fields</code> 에 따른 엔티티 세부 정보가 포함됩니다.</p>
<h2 id="Vector-Search-with-Metadata-Filtering" class="common-anchor-header">메타데이터 필터링을 활용한 벡터 검색<button data-href="#Vector-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>메타데이터의 값(Milvus에서는 ‘스칼라’ 필드라고 함. 스칼라는 벡터가 아닌 데이터를 의미함)을 고려하여 벡터 검색을 수행할 수도 있습니다. 이는 특정 기준을 지정하는 필터 표현식을 통해 이루어집니다. 다음 예제를 통해 <code translate="no">subject</code> 필드를 사용하여 검색하고 필터링하는 방법을 살펴보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert more docs in another subject.</span>
docs = [
    <span class="hljs-string">&quot;Machine learning has been used for drug design.&quot;</span>,
    <span class="hljs-string">&quot;Computational synthesis with AI algorithms predicts molecular properties.&quot;</span>,
    <span class="hljs-string">&quot;DDR1 is involved in cancers and fibrosis.&quot;</span>,
]
vectors = embedding_fn.encode_documents(docs)
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span> + i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;biology&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=embedding_fn.encode_queries([<span class="hljs-string">&quot;tell me AI related information&quot;</span>]),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.27030569314956665, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Computational synthesis with AI algorithms predicts molecular properties.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: 0.16425910592079163, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Machine learning has been used for drug design.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>기본적으로 스칼라 필드는 인덱싱되지 않습니다. 대규모 데이터셋에서 메타데이터 필터링 검색을 수행해야 하는 경우, 고정 스키마를 사용하고 <a href="https://milvus.io/docs/scalar_index.md">인덱스를</a> 활성화하여 검색 성능을 향상시킬 수 있습니다.</p>
<p>벡터 검색 외에도 다음과 같은 다른 유형의 검색을 수행할 수 있습니다:</p>
<h3 id="Query" class="common-anchor-header">쿼리<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h3><p>query()는 <a href="https://milvus.io/docs/boolean.md">필터 표현식</a> 이나 특정 ID 일치와 같은 기준에 부합하는 모든 엔티티를 검색하는 작업입니다.</p>
<p>예를 들어, 스칼라 필드의 값이 특정 값인 모든 엔티티를 검색하는 경우:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>기본 키를 사용하여 엔티티를 직접 검색하는 경우:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities" class="common-anchor-header">엔티티 삭제<button data-href="#Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 정리하려면 기본 키를 지정하여 엔티티를 삭제하거나, 특정 필터 표현식과 일치하는 모든 엔티티를 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete entities by primary key</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>])

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete entities by a filter expression</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[<span class="hljs-meta">0, 2</span>]
[<span class="hljs-meta">3, 4, 5</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Existing-Data" class="common-anchor-header">기존 데이터 불러오기<button data-href="#Load-Existing-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션은 로컬 Lite 경로에 적용됩니다. 서버 배포의 경우, 대신 동일한 서버 URI와 자격 증명을 사용하여 다시 연결하십시오.</p>
<p>Milvus Lite는 로컬 저장소 경로에 데이터를 저장합니다. 기존 컬렉션을 계속 사용하려면 클라이언트를 닫은 후 동일한 경로를 다시 열어주세요:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.close()
client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-the-collection" class="common-anchor-header">컬렉션 삭제<button data-href="#Drop-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 모든 데이터를 삭제하려면 다음 명령어를 사용하여 컬렉션을 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Drop collection</span>
client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Learn-More" class="common-anchor-header">자세히 알아보기<button data-href="#Learn-More" class="anchor-icon" translate="no">
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
    </button></h2><p>로컬 예제를 완료한 후 다음 단계를 선택하세요:</p>
<ul>
<li><a href="/docs/ko/build-rag-with-milvus.md">RAG(Retrieval Augmented Generation)</a>를 사용하여 애플리케이션을 구축하세요.</li>
<li><a href="/docs/ko/schema-hands-on.md">'검색용 데이터 모델 설계'를</a> 사용하여 자체 데이터에 대한 필드 및 필터를 설계하세요.</li>
<li><a href="/docs/ko/install-overview.md">Milvus 배포 옵션을</a> 통해 로컬 및 서버 요구 사항을 비교해 보세요.</li>
</ul>
<p>Milvus Lite는 로컬 Python 프로그램을 시작하기에 매우 적합합니다. 대규모 데이터를 보유하고 있거나 Milvus를 프로덕션 환경에서 사용하고자 하는 경우, <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> 및 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes에</a> Milvus를 배포하는 방법에 대해 알아볼 수 있습니다. Milvus의 모든 배포 모드는 동일한 API를 사용하므로, 다른 배포 모드로 전환하더라도 클라이언트 측 코드를 크게 변경할 필요가 없습니다. 어디에 배포된 Milvus 서버의 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md">URI와 토큰만</a> 지정하면 됩니다:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Lite에서 Docker 또는 Kubernetes에 배포된 Milvus로 데이터를 마이그레이션하려면 <a href="/docs/ko/milvus_lite.md#Migrating-data-from-Milvus-Lite">‘Milvus Lite에서 데이터 마이그레이션’을</a> 참조하십시오.</p>
<p>Milvus는 REST 및 gRPC API를 제공하며, <a href="https://milvus.io/docs/install-pymilvus.md">Python</a>, <a href="https://milvus.io/docs/install-java.md">Java</a>, <a href="https://milvus.io/docs/install-go.md">Go</a>, C#, <a href="https://milvus.io/docs/install-node.md">Node.js</a> 등의 언어로 작성된 클라이언트 라이브러리를 지원합니다.</p>
<p>스키마 설계와 관련하여 Milvus는 유연한 스키마 설계를 지원하며, 여기서 벡터 필드를 포함한 필드와 해당 데이터 유형을 정의할 수 있습니다. 또한 각 필드에 대한 인덱스 유형과 매개변수를 정의할 수도 있습니다. 자세한 내용은 <a href="https://milvus.io/docs/schema-hands-on.md">‘검색을 위한 데이터 모델 설계’를</a> 참조하십시오.</p>
<h2 id="Milvus-for-AI-Agents" class="common-anchor-header">AI 에이전트용 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Claude Code나 Cursor와 같은 AI 코딩 어시스턴트를 사용 중이라면, <a href="https://github.com/zilliztech/milvus-skill">Milvus Skill을</a> 설치하여 AI 도구가 올바른 Milvus 코드를 작성할 수 있도록 지원할 수 있습니다.</p>
<p>MCP 서버 및 선별된 프롬프트를 포함한 더 많은 에이전트 도구에 대해서는 <a href="/docs/ko/milvus_for_agents.md">‘AI 에이전트를 위한 Milvus’를</a> 참조하십시오.</p>
