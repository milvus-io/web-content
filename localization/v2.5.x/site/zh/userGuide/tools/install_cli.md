---
id: install_cli.md
summary: 了解如何安装 Milvus_CLI。
title: 安装 Milvus_CLI
---
<h1 id="Install-MilvusCLI" class="common-anchor-header">安装 Milvus_CLI<button data-href="#Install-MilvusCLI" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何安装 Milvus_CLI。</p>
<h2 id="Install-from-PyPI" class="common-anchor-header">从 PyPI 安装<button data-href="#Install-from-PyPI" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以从<a href="https://pypi.org/project/milvus-cli/">PyPI</a> 安装 Milvus_CLI。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><ul>
<li>安装<a href="https://www.python.org/downloads/release/python-385/">Python 3.8.5</a>或更高版本</li>
<li>安装<a href="https://pip.pypa.io/en/stable/installation/">pip</a></li>
</ul>
<h3 id="Install-via-pip" class="common-anchor-header">通过 pip 安装</h3><p>运行以下命令安装 Milvus_CLI。</p>
<pre><code translate="no" class="language-shell">pip install milvus-cli
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-with-Docker" class="common-anchor-header">使用 Docker 安装<button data-href="#Install-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以使用 docker 安装 Milvus_CLI。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><p>需要 Docker 19.03 或更高版本。</p>
<h3 id="Install-based-on-Docker-image" class="common-anchor-header">根据 Docker 映像安装</h3><pre><code translate="no" class="language-shell">$ docker run -it zilliz/milvus_cli:latest
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-from-source-code" class="common-anchor-header">从源代码安装<button data-href="#Install-from-source-code" class="anchor-icon" translate="no">
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
<li>运行以下命令下载<code translate="no">milvus_cli</code> 代码库。</li>
</ol>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus_cli.git
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>运行以下命令进入<code translate="no">milvus_cli</code> 文件夹。</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> milvus_cli
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>运行以下命令安装 Milvus_CLI。</li>
</ol>
<pre><code translate="no" class="language-shell">python -m pip install --editable .
<button class="copy-code-btn"></button></code></pre>
<p>或者，你也可以从压缩包（<code translate="no">.tar.gz</code> 文件）中安装 Milvus_CLI。下载<a href="https://github.com/zilliztech/milvus_cli/releases">压缩包</a>并运行<code translate="no">python -m pip install milvus_cli-&lt;version&gt;.tar.gz</code> 。</p>
<h3 id="Install-from-an-exe-file" class="common-anchor-header">从 .exe 文件安装</h3><div class="alert note">此安装方法仅适用于 Windows。 </div>
<p>从<a href="https://github.com/zilliztech/milvus_cli/releases">GitHub</a>下载 .exe 文件并运行，安装 Milvus_CLI。如果安装成功，<code translate="no">milvus_cli-&lt;version&gt;.exe</code> ，如下图所示。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_cli_exe.png" alt="Milvus_CLI" class="doc-image" id="milvus_cli" />
   </span> <span class="img-wrapper"> <span>Milvus_CLI</span> </span></p>
