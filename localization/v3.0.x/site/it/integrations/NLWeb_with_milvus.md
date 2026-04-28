---
id: NLWeb_with_milvus.md
summary: >-
  Scoprite come integrare Microsoft NLWeb con Milvus per creare potenti
  interfacce in linguaggio naturale per i siti web. Questo tutorial mostra come
  sfruttare le capacità del database vettoriale di Milvus per una ricerca
  semantica efficiente, per la memorizzazione degli embedding e per il recupero
  del contesto nelle applicazioni NLWeb.
title: Utilizzare NLWeb con Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Utilizzare NLWeb con Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb di Microsoft</a> è un framework proposto che consente di creare interfacce in linguaggio naturale per i siti web, utilizzando <a href="https://schema.org/">Schema.org</a>, formati come RSS e l'emergente protocollo MCP.</p>
<p><a href="https://milvus.io/">Milvus</a> è supportato come backend di database vettoriale all'interno di NLWeb per incorporare la memorizzazione e l'efficiente ricerca di similarità vettoriale, consentendo un potente recupero del contesto per le applicazioni di elaborazione del linguaggio naturale.</p>
<blockquote>
<p>Questa documentazione si basa principalmente sulla documentazione ufficiale <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">di avvio rapido</a>. Se trovate contenuti obsoleti o incoerenti, date priorità alla documentazione ufficiale e non esitate a segnalarci un problema.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Utilizzo<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb può essere configurato per utilizzare Milvus come motore di recupero. Di seguito è riportata una guida su come configurare e utilizzare NLWeb con Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Installazione</h3><p>Clonare il repo e configurare l'ambiente:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Configurazione di Milvus</h3><p>Per utilizzare <strong>Milvus</strong>, aggiornare la configurazione.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Aggiornare i file di configurazione in <code translate="no">code/config</code></h4><p>Aprire il file <code translate="no">config_retrieval.yaml</code> e aggiungere la configurazione di Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Caricare i dati</h3><p>Una volta configurato, caricare i contenuti utilizzando i feed RSS.</p>
<p>Dalla cartella <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo il contenuto verrà inserito nella raccolta Milvus, memorizzando sia i dati testuali che le incorporazioni vettoriali.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Esecuzione del server</h3><p>Per avviare NLWeb, dalla directory <code translate="no">code</code>, eseguire:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Ora è possibile interrogare i contenuti in linguaggio naturale utilizzando l'interfaccia web di http://localhost:8000/ o direttamente l'API REST compatibile con MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">Ulteriori letture<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs">Documentazione Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Fonte NLWeb</a></li>
<li>Vita di una query di chat</li>
<li>Modificare il comportamento cambiando le richieste</li>
<li>Modificare il flusso di controllo</li>
<li>Modificare l'interfaccia utente</li>
</ul>
