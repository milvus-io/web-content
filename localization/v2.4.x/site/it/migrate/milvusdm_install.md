---
id: milvusdm_install.md
summary: Scoprite come installare Milvus-Migration per migrare i vostri dati.
title: Installare lo strumento di migrazione
---
<h1 id="Install-Migration-Tool" class="common-anchor-header">Installare lo strumento di migrazione<button data-href="#Install-Migration-Tool" class="anchor-icon" translate="no">
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
    </button></h1><p>È possibile scaricare il file binario eseguibile o compilare lo strumento Milvus-migration dal sorgente.</p>
<h2 id="Download-the-executable-binary" class="common-anchor-header">Scaricare il file binario eseguibile<button data-href="#Download-the-executable-binary" class="anchor-icon" translate="no">
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
<li>Scaricare l'ultima versione dal <a href="https://github.com/zilliztech/milvus-migration/tags">repository GitHub di Milvus-Migration</a>.</li>
<li>Estrarre il file scaricato per ottenere il binario eseguibile <code translate="no">milvus-migration</code>.</li>
</ol>
<h2 id="Compile-from-source" class="common-anchor-header">Compilazione dal sorgente<button data-href="#Compile-from-source" class="anchor-icon" translate="no">
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
    </button></h2><p>In alternativa, scaricare e compilare il sorgente per ottenere un file binario eseguibile.</p>
<ol>
<li><p>Clonare il repository Milvus-Migration:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># clone the source project</span>
git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-migration.git
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Navigare nella directory del progetto:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cd</span> milvus-migration
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compilare il progetto per ottenere il file eseguibile:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># compile the project to obtain an executable file</span>
go get &amp; go build
<button class="copy-code-btn"></button></code></pre>
<p>Questo genererà l'eseguibile <code translate="no">milvus-migration</code> nella directory del progetto.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Avendo installato lo strumento Milvus-migration, è possibile migrare i dati da varie fonti:</p>
<ul>
<li><a href="/docs/it/v2.4.x/es2m.md">Da Elasticsearch</a></li>
<li><a href="/docs/it/v2.4.x/f2m.md">Da Faiss</a></li>
<li><a href="/docs/it/v2.4.x/m2m.md">Da Milvus 1.x</a></li>
</ul>
