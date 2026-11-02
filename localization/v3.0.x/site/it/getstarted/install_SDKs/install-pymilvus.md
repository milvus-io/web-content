---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: Scopri come installare l'SDK Python di Milvus.
title: Installazione dell'SDK Python di Milvus
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Installazione dell'SDK Python di Milvus<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina descrive come installare PyMilvus, l'SDK Python per Milvus, e come scegliere le dipendenze opzionali per i database locali o l'integrazione dei modelli.</p>
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
    </button></h2><ul>
<li>PyMilvus 3.0.2 richiede Python 3.9 o versioni successive per connettersi a un server Milvus remoto.</li>
<li>Gli esempi locali di Milvus Lite 3.2.2 richiedono Python 3.10 o versioni successive e una piattaforma supportata. Vedere <a href="/docs/it/milvus_lite.md">Eseguire Milvus Lite localmente</a>.</li>
<li>Installare le dipendenze tramite <code translate="no">pip</code>. PyMilvus 3.0.2 richiede <code translate="no">protobuf&gt;=5.27.2</code>; non specificare separatamente <code translate="no">protobuf==3.20.0</code>. Non è necessario <code translate="no">grpcio-tools</code> per utilizzare l'SDK.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">Installare PyMilvus tramite pip<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus è disponibile nel <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>.</p>
<div class="alert note">
Si consiglia di installare una versione di PyMilvus compatibile con quella del server Milvus installato. Per ulteriori informazioni, consultare <a href="/docs/it/release_notes.md">le Note di rilascio</a>.
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo si installa il client per un server Milvus remoto. Non vengono installati né Milvus Lite né un modello di integrazione.</p>
<p>Per il database locale utilizzato nella <a href="/docs/it/quickstart.md">Guida rapida</a>, installare l’extra <code translate="no">milvus-lite</code> e il pacchetto Lite corrispondente:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per gli helper di embedding, installare l’extra separato <code translate="no">model</code>:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Su Windows, pip ignora l’extra “ <code translate="no">milvus-lite</code> ” di PyMilvus 3.0.2 a causa del suo marcatore di piattaforma. Il comando sopra riportato specifica esplicitamente “ <code translate="no">milvus-lite</code> ”, quindi l’installazione su Windows avviene a condizione che siano disponibili i file wheel per <code translate="no">faiss-cpu</code> e <code translate="no">pyarrow</code> per la versione di Python in uso.</p>
<h2 id="Verify-installation" class="common-anchor-header">Verifica dell’installazione<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Se PyMilvus è installato correttamente, non verrà generata alcuna eccezione quando si esegue il comando seguente.</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo comando verifica l’importazione dell’SDK, non la connessione al server. Segui <a href="/docs/it/quickstart.md">la Guida rapida</a> per creare una raccolta locale, inserire dati ed eseguire una ricerca.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta installato PyMilvus, potrai:</p>
<ul>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserire, aggiornare o eliminare</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca su singolo vettore</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p>Esplora <a href="/api-reference/pymilvus/v3.0.x/About.md">la documentazione di riferimento dell'API di PyMilvus</a></p></li>
</ul>
