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
<div class="alert note">
<p>Questa documentazione si basa principalmente sulla <a href="https://docs.dify.ai/">documentazione</a> ufficiale <a href="https://docs.dify.ai/">di Dify</a>. Se trovate contenuti obsoleti o incoerenti, date priorità alla documentazione ufficiale e non esitate a segnalarci un problema.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Clonare il repository</h3><p>Clonare il codice sorgente di Dify sul proprio computer locale:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Preparare la configurazione dell'ambiente</h3><p>Navigare nella directory Docker del codice sorgente di Dify.</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copiare il file di configurazione dell'ambiente</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Opzioni di distribuzione<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile distribuire Dify con Milvus utilizzando due approcci diversi. Scegliete quello più adatto alle vostre esigenze:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Opzione 1: Utilizzo di Milvus con Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa opzione esegue i contenitori Milvus insieme a Dify sulla macchina locale utilizzando Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurare le variabili d'ambiente</h3><p>Modificare il file <code translate="no">.env</code> con la seguente configurazione di Milvus:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> utilizza <code translate="no">host.docker.internal:19530</code> che consente ai contenitori Docker di accedere a Milvus in esecuzione sulla macchina host attraverso la rete interna di Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> può essere lasciato vuoto per le distribuzioni locali di Milvus.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Avviare i contenitori Docker</h3><p>Avviare i contenitori con il profilo <code translate="no">milvus</code> per includere i servizi Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Questo comando avvierà il servizio Dify insieme ai contenitori <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code> e <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Opzione 2: Utilizzo di Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa opzione collega Dify a un servizio Milvus gestito su Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurare le variabili d'ambiente</h3><p>Modificare il file <code translate="no">.env</code> con i dettagli della connessione a Zilliz Cloud:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Sostituire <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> con l'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico</a> di Zilliz Cloud.</li>
<li>Sostituire <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> con la <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chiave API</a> di Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Avviare i contenitori Docker</h3><p>Avviare solo i contenitori Dify senza il profilo Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Accesso a Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Accedere a Dify</h3><p>Aprire il browser e andare alla pagina di installazione di Dify; è possibile impostare l'account di amministrazione qui:<code translate="no">http://localhost/install</code>, quindi accedere alla pagina principale di Dify per ulteriori utilizzi.</p>
<p>Per ulteriori informazioni e indicazioni, consultare la <a href="https://docs.dify.ai/">documentazione di Dify</a>.</p>
