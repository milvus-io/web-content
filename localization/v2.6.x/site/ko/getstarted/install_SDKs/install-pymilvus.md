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
    </button></h1><p>이 문서에서는 Milvus용 Python SDK인 pymilvus를 설치하는 방법을 설명합니다.</p>
<p>현재 버전의 Milvus는 Python, Node.js, Go 및 Java용 SDK를 지원합니다.</p>
<h2 id="Requirements" class="common-anchor-header">필수 사항<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>Python 3.7 이상이 필요합니다.</li>
<li>Google protobuf가 설치되어 있어야 합니다. ` <code translate="no">pip3 install protobuf==3.20.0</code>` 명령어를 사용하여 설치할 수 있습니다.</li>
<li>grpcio-tools가 설치되어 있어야 합니다. ` <code translate="no">pip3 install grpcio-tools</code>` 명령어를 사용하여 설치할 수 있습니다.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">pip을 통해 PyMilvus 설치<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus는 <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>에서 구할 수 있습니다.</p>
<div class="alert note">
설치한 Milvus 서버의 버전과 일치하는 PyMilvus 버전을 설치하는 것이 좋습니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/release_notes.md">릴리스 노트를</a> 참조하십시오.
</div>
<pre><code translate="no"><span class="hljs-variable">$ </span>python3 -m pip install pymilvus==<span class="hljs-number">2.6</span>.<span class="hljs-number">14</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>PyMilvus가 올바르게 설치되었다면, 다음 명령어를 실행했을 때 예외가 발생하지 않습니다.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>python3 -c <span class="hljs-string">&quot;from pymilvus import Collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Milvus의 기본 작동 방식을 익힐 수 있습니다:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.6.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.6.x/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/v2.6.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.6.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/api-reference/pymilvus/v2.4.x/About.md">PyMilvus API 참조</a> 살펴보기</p></li>
</ul>
