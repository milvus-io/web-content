---
id: NLWeb_with_milvus.md
summary: >-
  Microsoft NLWeb과 Milvus를 통합하여 웹사이트를 위한 강력한 자연어 인터페이스를 구축하는 방법을 알아보세요. 이
  튜토리얼에서는 Milvus의 벡터 데이터베이스 기능을 활용하여 NLWeb 애플리케이션에서 효율적인 시맨틱 검색, 임베딩 스토리지 및 컨텍스트
  검색을 수행하는 방법을 설명합니다.
title: Milvus와 함께 NLWeb 사용
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Milvus와 함께 NLWeb 사용<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">Microsoft의 NLWeb은</a> <a href="https://schema.org/">Schema.org</a>, RSS와 같은 형식 및 새로운 MCP 프로토콜을 사용하여 웹사이트를 위한 자연어 인터페이스를 가능하게 하는 제안된 프레임워크입니다.</p>
<p><a href="https://milvus.io/">Milvus는</a> 자연어 처리 애플리케이션을 위한 강력한 컨텍스트 검색을 가능하게 하는 임베딩 스토리지 및 효율적인 벡터 유사성 검색을 위해 NLWeb 내에서 벡터 데이터베이스 백엔드로 지원됩니다.</p>
<blockquote>
<p>이 문서는 주로 공식 <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">빠른 시작</a> 설명서를 기반으로 작성되었습니다. 오래되었거나 일관성이 없는 내용을 발견하면 공식 문서를 우선적으로 참조하시고 언제든지 문제를 제기해 주세요.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">사용법<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb은 Milvus를 검색 엔진으로 사용하도록 구성할 수 있습니다. 다음은 Milvus에서 NLWeb을 설정하고 사용하는 방법에 대한 가이드입니다.</p>
<h3 id="Installation" class="common-anchor-header">설치</h3><p>리포지토리를 복제하고 환경을 설정합니다:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Milvus 구성하기</h3><p><strong>Milvus를</strong> 사용하려면 구성을 업데이트하세요.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">다음에서 구성 파일을 업데이트합니다. <code translate="no">code/config</code></h4><p><code translate="no">config_retrieval.yaml</code> 파일을 열고 Milvus 구성을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">데이터 로드</h3><p>구성이 완료되면 RSS 피드를 사용하여 콘텐츠를 로드합니다.</p>
<p><code translate="no">code</code> 디렉토리에서:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Milvus 컬렉션에 콘텐츠가 수집되어 텍스트 데이터와 벡터 임베딩이 모두 저장됩니다.</p>
<h3 id="Running-the-Server" class="common-anchor-header">서버 실행하기</h3><p>NLWeb을 시작하려면 <code translate="no">code</code> 디렉토리에서 실행합니다:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>이제 웹 UI(http://localhost:8000/)를 사용하거나 MCP 호환 REST API를 통해 직접 자연어를 통해 콘텐츠를 쿼리할 수 있습니다.</p>
<h2 id="Further-Reading" class="common-anchor-header">추가 자료<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvus 문서</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWeb 소스</a></li>
<li>채팅 쿼리의 생활</li>
<li>프롬프트를 변경하여 동작 수정하기</li>
<li>제어 흐름 수정하기</li>
<li>사용자 인터페이스 수정하기</li>
</ul>
