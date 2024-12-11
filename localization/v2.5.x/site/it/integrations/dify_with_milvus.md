---
id: dify_with_milvus.md
summary: >-
  In questo tutorial, vi mostreremo come implementare Dify con Milvus, per
  consentire un reperimento efficiente e un motore RAG.
title: Distribuzione di Dify con Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Distribuzione di Dify con Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> è una piattaforma open-source progettata per semplificare la creazione di applicazioni AI combinando Backend-as-a-Service con LLMOps. Supporta i principali LLM, offre un'interfaccia di orchestrazione immediata e intuitiva, motori RAG di alta qualità e un framework di agenti AI flessibile. Grazie ai flussi di lavoro low-code, alle interfacce e alle API facili da usare, Dify consente agli sviluppatori e agli utenti non tecnici di concentrarsi sulla creazione di soluzioni AI innovative e reali senza dover affrontare la complessità.</p>
<p>In questo tutorial vi mostreremo come implementare Dify con Milvus, per abilitare un efficiente motore di recupero e RAG.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">Clonare il repository<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clonare il codice sorgente di Dify sulla propria macchina locale:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Impostare le variabili d'ambiente<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Navigare nella directory Docker del codice sorgente di Dify.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copiare il file di configurazione dell'ambiente</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cambiare il valore <code translate="no">VECTOR_STORE</code> nel file <code translate="no">.env</code> </p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Modificare la configurazione di Milvus nel file <code translate="no">.env</code>.</p>
<pre><code translate="no">MILVUS_URI=xxx
MILVUS_TOKEN=xxx
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione, utilizzare l'URI esterno del server, ad esempio<code translate="no">http://172.16.16.16:19530</code>, come <code translate="no">MILVUS_URI</code>.</p>
<p>Per il file <code translate="no">MILVUS_TOKEN</code>, se non è stato impostato un token per il server Milvus, è possibile impostarlo su una stringa vuota come <code translate="no">MILVUS_TOKEN=</code>, altrimenti è necessario impostarlo sul proprio token Milvus. Per ulteriori informazioni su come impostare il token in Milvus, si può fare riferimento alla <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">pagina authenticate</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Avviare i contenitori Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegliere il comando appropriato per avviare i contenitori in base alla versione di Docker Compose presente sul sistema. È possibile utilizzare il comando <code translate="no">$ docker compose version</code> per verificare la versione e fare riferimento alla documentazione di Docker per ulteriori informazioni:</p>
<p>Se si dispone di Docker Compose V2, utilizzare il seguente comando:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Se si dispone di Docker Compose V1, utilizzare il seguente comando:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Accedere a Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Aprire il browser e accedere alla pagina di installazione di Dify; è possibile impostare l'account di amministrazione qui:<code translate="no">http://localhost/install</code>, quindi accedere alla pagina principale di Dify per ulteriori utilizzi.</p>
<p>Per ulteriori informazioni e indicazioni, consultare la <a href="https://docs.dify.ai/">documentazione di Dify</a>.</p>
