---
id: install_cli.md
summary: Milvus_CLI 설치 방법을 알아보세요.
title: Milvus_CLI 설치
---
<h1 id="Install-MilvusCLI" class="common-anchor-header">Milvus_CLI 설치<button data-href="#Install-MilvusCLI" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus_CLI를 설치하는 방법을 설명합니다.</p>
<h2 id="Install-from-PyPI" class="common-anchor-header">PyPI에서 설치하기<button data-href="#Install-from-PyPI" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://pypi.org/project/milvus-cli/">PyPI에서</a> Milvus_CLI를 설치할 수 있습니다.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><ul>
<li><a href="https://www.python.org/downloads/release/python-385/">Python 3.8.5</a> 이상 설치</li>
<li><a href="https://pip.pypa.io/en/stable/installation/">pip</a> 설치</li>
</ul>
<h3 id="Install-via-pip" class="common-anchor-header">pip를 통해 설치</h3><p>다음 명령을 실행하여 Milvus_CLI를 설치합니다.</p>
<pre><code translate="no" class="language-shell">pip install milvus-cli
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-with-Docker" class="common-anchor-header">도커로 설치<button data-href="#Install-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus_CLI는 도커로 설치할 수 있습니다.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><p>Docker 19.03 이상이 필요합니다.</p>
<h3 id="Install-based-on-Docker-image" class="common-anchor-header">도커 이미지를 기반으로 설치</h3><pre><code translate="no" class="language-shell">$ docker run -it zilliz/milvus_cli:latest
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-from-source-code" class="common-anchor-header">소스 코드에서 설치<button data-href="#Install-from-source-code" class="anchor-icon" translate="no">
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
<li>다음 명령을 실행하여 <code translate="no">milvus_cli</code> 리포지토리를 다운로드합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus_cli.git
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>다음 명령을 실행하여 <code translate="no">milvus_cli</code> 폴더에 들어갑니다.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> milvus_cli
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>다음 명령어를 실행하여 Milvus_CLI를 설치합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">python -m pip install --editable .
<button class="copy-code-btn"></button></code></pre>
<p>또는 압축된 타르볼(<code translate="no">.tar.gz</code> 파일)에서 Milvus_CLI를 설치할 수도 있습니다. <a href="https://github.com/zilliztech/milvus_cli/releases">타르볼을</a> 다운로드하고 <code translate="no">python -m pip install milvus_cli-&lt;version&gt;.tar.gz</code> 을 실행합니다.</p>
<h3 id="Install-from-an-exe-file" class="common-anchor-header">.exe 파일에서 설치하기</h3><div class="alert note"> 이 설치 방법은 Windows에만 적용됩니다. </div>
<p><a href="https://github.com/zilliztech/milvus_cli/releases">GitHub에서</a>.exe 파일을 다운로드하고 실행하여 Milvus_CLI를 설치합니다. 성공하면 다음 그림과 같이 <code translate="no">milvus_cli-&lt;version&gt;.exe</code> 가 나타납니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_cli_exe.png" alt="Milvus_CLI" class="doc-image" id="milvus_cli" />
   </span> <span class="img-wrapper"> <span>Milvus_CLI</span> </span></p>
