---
id: use_milvus_in_docsgpt.md
summary: >-
  In questo tutorial vi mostreremo come utilizzare Milvus come database
  vettoriale di backend per DocsGPT.
title: Utilizzare Milvus in DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Utilizzare Milvus in DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> è una soluzione open-source avanzata che semplifica la ricerca di informazioni nella documentazione di progetto integrando potenti modelli GPT. Consente agli sviluppatori di ottenere facilmente risposte precise alle loro domande su un progetto, eliminando le lunghe ricerche manuali.</p>
<p>In questo tutorial vi mostreremo come utilizzare Milvus come database vettoriale di backend per DocsGPT.</p>
<div class="alert note">
<p>Questa guida fa principalmente riferimento alla guida ufficiale all'installazione di <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. Se vi accorgete che questo tutorial ha parti obsolete, potete seguire prioritariamente la guida ufficiale e creare un problema con noi.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Requisiti<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Assicurarsi di avere installato <a href="https://docs.docker.com/engine/install/">Docker</a> </p>
<h2 id="Clone-the-repository" class="common-anchor-header">Clonare il repository<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clonare il repository e accedervi:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Aggiungi dipendenza<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Aggiungere la dipendenza <code translate="no">langchain-milvus</code> al file <code translate="no">requirements.txt</code> nella cartella <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Impostare le variabili d'ambiente<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Aggiungere <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> alle variabili d'ambiente per entrambi i servizi <code translate="no">backend</code> e <code translate="no">worker</code> nel file <code translate="no">docker-compose.yaml</code>, in questo modo:</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>Per i servizi <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code>, è possibile utilizzare il servizio <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(consigliato) completamente gestito o il servizio Milvus avviato manualmente.</p>
<ul>
<li><p>Per il servizio Zilliz Cloud completamente gestito: Si consiglia di utilizzare il servizio Zilliz Cloud. È possibile registrarsi per un account di prova gratuito su <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Successivamente, si otterranno <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">endpoint pubblico e alla chiave API</a>.</p></li>
<li><p>Per il servizio Milvus avviato manualmente: Se si desidera configurare un servizio Milvus, è possibile seguire la <a href="https://milvus.io/docs/install_standalone-docker-compose.md">documentazione ufficiale di Milvus</a> per configurare un server Milvus, quindi ottenere <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> dal server. <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> devono essere rispettivamente nel formato <code translate="no">http://&lt;your_server_ip&gt;:19530</code> e <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code>.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Avviare i servizi<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire: <code translate="no">./setup.sh</code></p>
<p>Quindi navigare su http://localhost:5173/.</p>
<p>È possibile giocare con l'interfaccia utente e porre domande sui documenti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>testo alt</span> </span></p>
<p>Se si desidera arrestare i servizi, eseguire:</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori dettagli e configurazioni più avanzate, consultare la documentazione ufficiale di <a href="https://github.com/arc53/DocsGPT">DocsGPT</a>.</p>
