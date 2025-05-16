---
id: install-java.md
label: Install Java SDK
related_key: SDK
summary: Milvus의 Java SDK를 설치하는 방법을 알아보세요.
title: Milvus Java SDK 설치
---
<h1 id="Install-Milvus-Java-SDK" class="common-anchor-header">Milvus Java SDK 설치<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus용 Milvus Java SDK를 설치하는 방법을 설명합니다.</p>
<p>현재 Milvus 버전은 Python, Node.js, GO, Java의 SDK를 지원합니다.</p>
<h2 id="Requirement" class="common-anchor-header">요구 사항<button data-href="#Requirement" class="anchor-icon" translate="no">
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
<li>Java(8 이상)</li>
<li>Apache Maven 또는 Gradle/Grails</li>
</ul>
<h2 id="Install-Milvus-Java-SDK" class="common-anchor-header">Milvus Java SDK 설치<button data-href="#Install-Milvus-Java-SDK" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 Milvus Java SDK를 설치합니다.</p>
<ul>
<li>Apache Maven</li>
</ul>
<pre><code translate="no" class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;io.milvus&lt;/groupId&gt;
    &lt;artifactId&gt;milvus-sdk-java&lt;/artifactId&gt;
    &lt;version&gt;2.4.10&lt;/version&gt;
&lt;/dependency&gt;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Gradle/Grails</li>
</ul>
<pre><code translate="no">implementation <span class="hljs-string">&#x27;io.milvus:milvus-sdk-java:2.4.10&#x27;</span>
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
    </button></h2><p>Milvus Java SDK를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p>Milvus의 기본 작업을 학습합니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/api-reference/java/v2.4.x/About.md">Milvus Java API 참조</a> 살펴보기</p></li>
</ul>
