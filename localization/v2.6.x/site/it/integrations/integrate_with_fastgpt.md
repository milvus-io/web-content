---
id: integrate_with_fastgpt.md
summary: >-
  Questa esercitazione vi guiderà su come distribuire rapidamente la vostra
  applicazione FastGPT esclusiva utilizzando [Milvus](https://milvus.io/).
title: Distribuzione di FastGPT con Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Distribuzione di FastGPT con Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> è un sistema di domande e risposte basato sulla conoscenza e costruito sul modello linguistico LLM, che offre funzionalità pronte all'uso per l'elaborazione dei dati e l'invocazione del modello. Inoltre, consente l'orchestrazione del flusso di lavoro attraverso la visualizzazione del flusso, facilitando così scenari complessi di domande e risposte. Questo tutorial vi guiderà su come distribuire rapidamente la vostra esclusiva applicazione FastGPT utilizzando <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">Scaricare docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Assicuratevi di aver già installato <a href="https://docs.docker.com/compose/">Docker Compose</a>.<br>
Eseguite il comando seguente per scaricare il file docker-compose.yml.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">milvus version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">zilliz version</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Se si utilizza la versione Zilliz, regolare i parametri <code translate="no">MILVUS_ADDRESS</code> e <code translate="no">MILVUS_TOKEN</code> link nel file docker-compose.yml, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> in <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Avviare il contenitore<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire nella stessa directory di docker-compose.yml. Assicurarsi che la versione di docker-compose sia idealmente superiore alla 2.17, poiché altrimenti alcuni comandi di automazione potrebbero non funzionare.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Launch the container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Wait <span class="hljs-keyword">for</span> 10s, OneAPI typically needs to restart a few <span class="hljs-built_in">times</span> to initially connect to Mysql</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sleep</span> 10</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display <span class="hljs-string">&#x27;channel not found&#x27;</span> <span class="hljs-keyword">if</span> not restarted, this can be temporarily resolved by manually restarting once, <span class="hljs-keyword">while</span> waiting <span class="hljs-keyword">for</span> the author<span class="hljs-string">&#x27;s fix)</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">docker restart oneapi</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Accedere a OneAPI per aggiungere i modelli<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>Si può accedere a OneAPI all'indirizzo <code translate="no">ip:3001</code>. Il nome utente predefinito è root e la password è 123456. È possibile modificare la password dopo l'accesso.<br>
Utilizzando il modello di OpenAI come esempio, fare clic sulla scheda "Canale" e selezionare il modello di chat e il modello di incorporamento in "Modelli".<br>
Inserire la <a href="https://platform.openai.com/docs/quickstart">chiave API OpenAI</a> nella sezione "Segreti".<br>
Per l'utilizzo di modelli diversi da OpenAI e per ulteriori informazioni, consultare <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Impostazione dei token<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Fare clic sulla scheda "Token". Per impostazione predefinita, è presente un token <code translate="no">Initial Root Token</code>. È anche possibile creare un nuovo token e impostare una quota per conto proprio.<br>
Fare clic su "Copia" del token, assicurandosi che il valore di questo token corrisponda al valore <code translate="no">CHAT_API_KEY</code> impostato nel file docker-compose.yml.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Accesso a FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Al momento è possibile accedere direttamente a FastGPT all'indirizzo <code translate="no">ip:3000</code> (attenzione al firewall). Il nome utente di accesso è root, con la password impostata su <code translate="no">DEFAULT_ROOT_PSW</code> nella variabile d'ambiente docker-compose.yml. Se si desidera accedere a un nome di dominio, è necessario installare e configurare <a href="https://nginx.org/en/">Nginx</a> per conto proprio.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Arresto del contenitore<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire il seguente comando per arrestare il contenitore.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
