---
id: use_milvus_in_private_gpt.md
summary: >-
  In questa guida vi mostreremo come utilizzare Milvus come database vettoriale
  di backend per PrivateGPT.
title: Utilizzare Milvus in PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Utilizzare Milvus in PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> è un progetto di intelligenza artificiale pronto per la produzione che consente agli utenti di porre domande sui loro documenti utilizzando modelli linguistici di grandi dimensioni senza una connessione a Internet e garantendo il 100% di privacy. PrivateGPT offre un'API suddivisa in blocchi di alto livello e di basso livello. Fornisce inoltre un client UI Gradio e strumenti utili come gli script per il download massivo dei modelli e gli script di ingestione. Concettualmente, PrivateGPT avvolge una pipeline RAG ed espone le sue primitive, essendo pronto all'uso e fornendo un'implementazione completa dell'API e della pipeline RAG.</p>
<p>In questo tutorial vi mostreremo come utilizzare Milvus come database vettoriale di backend per PrivateGPT.</p>
<div class="alert note">
<p>Questo tutorial fa principalmente riferimento alla guida ufficiale all'installazione di <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>. Se vi accorgete che questo tutorial ha parti obsolete, potete seguire prioritariamente la guida ufficiale e creare un problema con noi.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Requisiti di base per l'esecuzione di PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Clonare il repository PrivateGPT</h3><p>Clonate il repository e navigate al suo interno:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Installare Poetry</h3><p>Installare <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> per la gestione delle dipendenze: Seguire le istruzioni sul sito ufficiale di Poetry per installarlo.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Opzionale) Installare make</h3><p>Per eseguire vari script, è necessario installare make.</p>
<p>macOS (usando Homebrew):</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (usando Chocolatey):</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Installare i moduli disponibili<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT consente di personalizzare la configurazione. È necessario specificare le impostazioni di alcuni moduli. In questa guida, utilizzeremo i seguenti moduli:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Archivi vettoriali</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Avviare il servizio Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Andare su <a href="https://ollama.com/">ollama.ai</a> e seguire le istruzioni per installare Ollama sul proprio computer.</p>
<p>Dopo l'installazione, assicurarsi che l'applicazione desktop Ollama sia chiusa.</p>
<p>A questo punto, avviare il servizio Ollama (avvierà un server di inferenza locale, che servirà sia l'LLM che gli Embeddings):</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>Installare i modelli da utilizzare; <code translate="no">settings-ollama.yaml</code> è configurato come utente llama3.1 8b LLM (~4GB) e nomic-embed-text Embeddings (~275MB).</p>
<p>Per impostazione predefinita, PrivateGPT preleva automaticamente i modelli quando necessario. Questo comportamento può essere cambiato modificando la proprietà <code translate="no">ollama.autopull_models</code>.</p>
<p>In ogni caso, se si desidera estrarre manualmente i modelli, eseguire i seguenti comandi:</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>È possibile modificare i modelli preferiti nel file <code translate="no">settings-ollama.yaml</code> ed estrarli manualmente.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Modifica delle impostazioni di Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>Nel file <code translate="no">settings-ollama.yaml</code>, impostare il vectorstore su milvus:</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>È anche possibile aggiungere una configurazione cumstom di Milvus per specificare le proprie impostazioni, ad esempio:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>Le opzioni di configurazione disponibili sono:</p>
<table>
<thead>
<tr><th>Campo Opzione</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>L'impostazione predefinita è "local_data/private_gpt/milvus/milvus_local.db" come file locale; è anche possibile impostare un server Milvus più performante su docker o k8s, ad esempio http://localhost:19530, come uri; per utilizzare Zilliz Cloud, regolare l'uri e il token su Endpoint e Api key in Zilliz Cloud.</td></tr>
<tr><td>token</td><td>Coppia con il server Milvus su docker o k8s o con la chiave api di Zilliz Cloud.</td></tr>
<tr><td>nome_raccolta</td><td>Il nome della raccolta, impostato come predefinito "milvus_db".</td></tr>
<tr><td>sovrascrivere</td><td>Sovrascrive i dati della raccolta, se già esistenti; l'impostazione predefinita è True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Avviare PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta eseguite tutte le impostazioni, è possibile avviare PrivateGPT con l'interfaccia utente gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>L'interfaccia utente sarà disponibile all'indirizzo<code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>È possibile giocare con l'interfaccia utente e porre domande sui propri documenti.</p>
