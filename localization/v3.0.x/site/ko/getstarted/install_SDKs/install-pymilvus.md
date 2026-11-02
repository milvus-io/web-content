---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: Milvus의 Python SDK를 설치하는 방법을 알아보세요.
title: Milvus Python SDK 설치
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Milvus Python SDK 설치<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Milvus용 Python SDK인 PyMilvus를 설치하고, 로컬 데이터베이스 또는 임베딩 모델을 위한 선택적 종속성을 선택하는 방법을 설명합니다.</p>
<h2 id="Requirements" class="common-anchor-header">필수 조건<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>PyMilvus 3.0.2는 원격 Milvus 서버에 연결하기 위해 Python 3.9 이상이 필요합니다.</li>
<li>로컬 Milvus Lite 3.2.2 예제를 <a href="/docs/ko/milvus_lite.md">실행하려면</a> Python 3.10 이상과 지원되는 플랫폼이 필요합니다. <a href="/docs/ko/milvus_lite.md">‘로컬에서 Milvus Lite 실행’을</a> 참조하십시오.</li>
<li><code translate="no">pip</code> 를 통해 종속성을 설치하십시오. PyMilvus 3.0.2를 사용하려면 <code translate="no">protobuf&gt;=5.27.2</code> 가 필요하며, <code translate="no">protobuf==3.20.0</code> 는 별도로 고정하지 마십시오. SDK를 사용하기 위해 <code translate="no">grpcio-tools</code> 는 필요하지 않습니다.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">pip를 통해 PyMilvus 설치<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus는 <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>에서 사용할 수 있습니다.</p>
<div class="alert note">
설치한 Milvus 서버의 버전과 일치하는 PyMilvus 버전을 설치하는 것이 좋습니다. 자세한 내용은 <a href="/docs/ko/release_notes.md">릴리스 노트를</a> 참조하십시오.
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 원격 Milvus 서버용 클라이언트가 설치됩니다. Milvus Lite나 임베딩 모델은 설치되지 않습니다.</p>
<p><a href="/docs/ko/quickstart.md">퀵스타트에서</a> 사용되는 로컬 데이터베이스를 사용하려면 <code translate="no">milvus-lite</code> 추가 구성 요소와 이에 맞는 Lite 패키지를 설치하십시오:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>임베딩 헬퍼를 사용하려면 별도의 <code translate="no">model</code> 추가 패키지를 설치하십시오:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows에서는 플랫폼 마커로 인해 pip가 PyMilvus 3.0.2의 <code translate="no">milvus-lite</code> 추가 구성 요소를 건너뜁니다. 위의 명령어는 <code translate="no">milvus-lite</code> 를 명시적으로 지정하므로, 사용 중인 Python 버전에 맞는 <code translate="no">faiss-cpu</code> 및 <code translate="no">pyarrow</code> 용 휠 파일이 존재하는 한 Windows에서도 설치됩니다.</p>
<h2 id="Verify-installation" class="common-anchor-header">설치 확인<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus가 올바르게 설치되었다면, 다음 명령을 실행했을 때 예외가 발생하지 않습니다.</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이는 서버 연결이 아닌 SDK 임포트를 확인하는 것입니다. <a href="/docs/ko/quickstart.md">퀵스타트(Quickstart</a> )를 따라 로컬 컬렉션을 생성하고, 데이터를 삽입한 후 검색을 실행해 보세요.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus를 설치한 후에는 다음을 수행할 수 있습니다:</p>
<ul>
<li><p>Milvus의 기본 작동 방식을 익히기:</p>
<ul>
<li><a href="/docs/ko/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/api-reference/pymilvus/v3.0.x/About.md">PyMilvus API 참조</a> 살펴보기</p></li>
</ul>
