---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: Milvus의 Node.js SDK를 설치하는 방법을 알아보세요.
title: Milvus Nodejs SDK 설치
---
<h1 id="Install-Milvus-Nodejs-SDK" class="common-anchor-header">Milvus Nodejs SDK 설치하기<button data-href="#Install-Milvus-Nodejs-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus용 Milvus Node.js SDK를 설치하는 방법에 대해 설명합니다.</p>
<h2 id="Compatibility" class="common-anchor-header">호환성<button data-href="#Compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 컬렉션은 Milvus 버전과 권장 @zilliz/milvus2-sdk-node 버전을 보여줍니다:</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus 버전</th><th style="text-align:center">권장 @zilliz/milvus2-sdk-node 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.4.x</td><td style="text-align:center">2.4.x</td></tr>
<tr><td style="text-align:center">2.3.x</td><td style="text-align:center">2.3.x</td></tr>
<tr><td style="text-align:center">2.2.x</td><td style="text-align:center">2.2.x</td></tr>
<tr><td style="text-align:center">2.1.x</td><td style="text-align:center">2.1.x</td></tr>
<tr><td style="text-align:center">2.0.1</td><td style="text-align:center">2.0.0, 2.0.1</td></tr>
<tr><td style="text-align:center">2.0.0</td><td style="text-align:center">2.0.0</td></tr>
</tbody>
</table>
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
    </button></h2><p>Node.js v18+</p>
<h2 id="Installation" class="common-anchor-header">설치<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus node.js 클라이언트 사용을 시작하는 권장 방법은 npm(Node 패키지 관리자)을 사용하여 프로젝트에 종속성을 설치하는 것입니다.</p>
<pre><code translate="no" class="language-javascript">npm install @zilliz/milvus2-sdk-node
<span class="hljs-comment"># or ...</span>
yarn add @zilliz/milvus2-sdk-node
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Milvus node.js sdk가 다운로드되고 package.json 파일에 종속성 항목이 추가됩니다.</p>
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
    </button></h2><p>Milvus Node.js SDK를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus-sdk-node">Milvus Node.js SDK 빠른 시작</a> 보기</p></li>
<li><p>Milvus의 기본 동작을 학습합니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/insert-update-delete.md">삽입, 업서트 및 삭제</a></li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/api-reference/node/v2.4.x/About.md">Milvus Node.js API 참조</a> 살펴보기</p></li>
</ul>
