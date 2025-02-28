---
id: install_cli.md
summary: Pelajari cara menginstal Milvus_CLI.
title: Menginstal Milvus_CLI
---
<h1 id="Install-MilvusCLI" class="common-anchor-header">Menginstal Milvus_CLI<button data-href="#Install-MilvusCLI" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara menginstal Milvus_CLI.</p>
<h2 id="Install-from-PyPI" class="common-anchor-header">Menginstal dari PyPI<button data-href="#Install-from-PyPI" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menginstal Milvus_CLI dari <a href="https://pypi.org/project/milvus-cli/">PyPI</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><ul>
<li>Instal <a href="https://www.python.org/downloads/release/python-385/">Python 3.8.5</a> atau yang lebih baru</li>
<li>Instal <a href="https://pip.pypa.io/en/stable/installation/">pip</a></li>
</ul>
<h3 id="Install-via-pip" class="common-anchor-header">Menginstal melalui pip</h3><p>Jalankan perintah berikut untuk menginstal Milvus_CLI.</p>
<pre><code translate="no" class="language-shell">pip install milvus-cli
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-with-Docker" class="common-anchor-header">Menginstal dengan Docker<button data-href="#Install-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menginstal Milvus_CLI dengan docker.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><p>Docker 19.03 atau yang lebih baru diperlukan.</p>
<h3 id="Install-based-on-Docker-image" class="common-anchor-header">Instal berdasarkan citra Docker</h3><pre><code translate="no" class="language-shell">$ docker run -it zilliz/milvus_cli:latest
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-from-source-code" class="common-anchor-header">Menginstal dari kode sumber<button data-href="#Install-from-source-code" class="anchor-icon" translate="no">
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
<li>Jalankan perintah berikut untuk mengunduh repositori <code translate="no">milvus_cli</code>.</li>
</ol>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus_cli.git
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Jalankan perintah berikut untuk masuk ke folder <code translate="no">milvus_cli</code>.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> milvus_cli
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Jalankan perintah berikut untuk menginstal Milvus_CLI.</li>
</ol>
<pre><code translate="no" class="language-shell">python -m pip install --editable .
<button class="copy-code-btn"></button></code></pre>
<p>Sebagai alternatif, Anda dapat menginstal Milvus_CLI dari tarball terkompresi (file<code translate="no">.tar.gz</code> ). Unduh <a href="https://github.com/zilliztech/milvus_cli/releases">tarball</a> dan jalankan <code translate="no">python -m pip install milvus_cli-&lt;version&gt;.tar.gz</code>.</p>
