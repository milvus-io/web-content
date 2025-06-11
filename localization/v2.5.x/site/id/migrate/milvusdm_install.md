---
id: milvusdm_install.md
summary: Pelajari cara memasang Milvus-Migration untuk memigrasi data Anda.
title: Menginstal Alat Migrasi
---

<h1 id="Install-Migration-Tool" class="common-anchor-header">Menginstal Alat Migrasi<button data-href="#Install-Migration-Tool" class="anchor-icon" translate="no">
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
    </button></h1><p>Kami mendukung pengunduhan file biner yang dapat dieksekusi atau mengkompilasi alat migrasi Milvus dari sumbernya.</p>
<h2 id="Download-the-executable-binary" class="common-anchor-header">Unduh biner yang dapat dieksekusi<button data-href="#Download-the-executable-binary" class="anchor-icon" translate="no">
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
<li>Unduh rilis terbaru dari <a href="https://github.com/zilliztech/milvus-migration/tags">repositori GitHub Milvus-Migration</a>.</li>
<li>Ekstrak berkas yang diunduh untuk mendapatkan berkas biner yang dapat dieksekusi <code translate="no">milvus-migration</code>.</li>
</ol>
<h2 id="Compile-from-source" class="common-anchor-header">Kompilasi dari sumbernya<button data-href="#Compile-from-source" class="anchor-icon" translate="no">
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
    </button></h2><p>Atau, unduh dan kompilasi dari sumbernya untuk mendapatkan berkas biner yang dapat dieksekusi.</p>
<ol>
<li><p>Kloning repositori Milvus-Migration:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># clone the source project</span>
git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-migration.git
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Navigasikan ke direktori proyek:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cd</span> milvus-migration
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kompilasi proyek untuk mendapatkan berkas yang dapat dieksekusi:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># compile the project to obtain an executable file</span>
go get &amp; go build
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan menghasilkan file eksekusi <code translate="no">milvus-migration</code> di dalam direktori proyek.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah menginstal alat Milvus-migration, Anda dapat memigrasi data dari berbagai sumber:</p>
<ul>
<li><a href="/docs/id/v2.5.x/es2m.md">Dari Elasticsearch</a></li>
<li><a href="/docs/id/v2.5.x/f2m.md">Dari Faiss</a></li>
<li><a href="/docs/id/v2.5.x/m2m.md">Dari Milvus 1.x</a></li>
</ul>
