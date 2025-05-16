---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: Scoprite come installare l'SDK Node.js di Milvus.
title: Installare l'SDK Milvus Nodejs
---
<h1 id="Install-Milvus-Nodejs-SDK" class="common-anchor-header">Installare l'SDK Milvus Nodejs<button data-href="#Install-Milvus-Nodejs-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come installare l'SDK Milvus Node.js per Milvus.</p>
<h2 id="Compatibility" class="common-anchor-header">Compatibilità<button data-href="#Compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>La seguente raccolta mostra le versioni di Milvus e le versioni raccomandate di @zilliz/milvus2-sdk-node:</p>
<table>
<thead>
<tr><th style="text-align:center">Versione Milvus</th><th style="text-align:center">Versione @zilliz/milvus2-sdk-node raccomandata</th></tr>
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
<h2 id="Requirement" class="common-anchor-header">Requisiti<button data-href="#Requirement" class="anchor-icon" translate="no">
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
<h2 id="Installation" class="common-anchor-header">Installazione<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Il modo consigliato per iniziare a usare il client Milvus node.js è usare npm (Node package manager) per installare la dipendenza nel vostro progetto.</p>
<pre><code translate="no" class="language-javascript">npm install @zilliz/milvus2-sdk-node
<span class="hljs-comment"># or ...</span>
yarn add @zilliz/milvus2-sdk-node
<button class="copy-code-btn"></button></code></pre>
<p>Questo scaricherà l'sdk Milvus node.js e aggiungerà una voce di dipendenza nel file package.json.</p>
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
    </button></h2><p>Dopo aver installato l'SDK Milvus Node.js, è possibile:</p>
<ul>
<li><p>Visualizzare l'<a href="https://github.com/milvus-io/milvus-sdk-node">avvio rapido dell'SDK Milvus node.js</a></p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/v2.4.x/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/v2.4.x/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/v2.4.x/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/v2.4.x/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/v2.4.x/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p>Esplora le <a href="/api-reference/node/v2.4.x/About.md">API di riferimento di Milvus Node.js</a></p></li>
</ul>
