---
id: kotaemon_with_milvus.md
summary: >-
  Questa esercitazione vi guiderà su come personalizzare la vostra applicazione
  kotaemon utilizzando Milvus.
title: Kotaemon RAG con Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG con Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> è un'interfaccia RAG open-source pulita e personalizzabile per chattare con i documenti. Costruita pensando sia agli utenti finali che agli sviluppatori.</p>
<p>Kotaemon fornisce un'interfaccia web di QA dei documenti personalizzabile e multiutente che supporta LLM locali e basati su API. Offre una pipeline RAG ibrida con recupero full-text e vettoriale, QA multimodale per documenti con figure e tabelle e citazioni avanzate con anteprime dei documenti. Supporta metodi di ragionamento complessi come ReAct e ReWOO e fornisce impostazioni configurabili per il reperimento e la generazione.</p>
<p>Questo tutorial vi guiderà su come personalizzare la vostra applicazione kotaemon utilizzando <a href="https://milvus.io/">Milvus</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Installazione</h3><p>Si consiglia di installare kotaemon in questo modo:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">optional (setup <span class="hljs-built_in">env</span>)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git clone https://github.com/Cinnamon/kotaemon
cd kotaemon

pip install -e &quot;libs/kotaemon[all]&quot;
pip install -e &quot;libs/ktem&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Oltre a questo modo, esistono altri modi per installare kotaemon. Per maggiori dettagli, consultare la <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">documentazione ufficiale</a>.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Impostare Milvus come archivio vettoriale predefinito</h3><p>Per cambiare l'archiviazione vettoriale predefinita in Milvus, è necessario modificare il file <code translate="no">flowsettings.py</code> passando da <code translate="no">KH_VECTORSTORE</code> a:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Imposta variabili d'ambiente</h3><p>è possibile configurare i modelli tramite il file <code translate="no">.env</code> con le informazioni necessarie per connettersi ai LLM e ai modelli di embedding, ad esempio OpenAI, Azure, Ollama, ecc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Eseguire Kotaemon</h3><p>Dopo aver impostato le variabili d'ambiente e modificato la memorizzazione dei vettori, è possibile eseguire kotaemon con il seguente comando:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Il nome utente e la password predefiniti sono: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Avviare RAG con kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Aggiungere i modelli di intelligenza artificiale</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Nella scheda <code translate="no">Resources</code> è possibile aggiungere e impostare i modelli LLM e di incorporazione. È possibile aggiungere più modelli e impostarli come attivi o inattivi. È sufficiente fornirne almeno uno. È anche possibile fornire più modelli per consentire il passaggio da uno all'altro.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Caricare i documenti</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Per poter eseguire l'AQ sui documenti, è necessario caricarli nell'applicazione. Accedendo alla scheda <code translate="no">File Index</code>, è possibile caricare e gestire i documenti personalizzati.</p>
<p>Per impostazione predefinita, tutti i dati dell'applicazione sono memorizzati nella cartella <code translate="no">./ktem_app_data</code>. I dati del database Milvus sono memorizzati in <code translate="no">./ktem_app_data/user_data/vectorstore</code>. È possibile eseguire il backup o copiare questa cartella per spostare l'installazione su un nuovo computer.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Conversare con i documenti</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Tornate ora alla scheda <code translate="no">Chat</code>. La scheda Chat è composta da 3 aree: il pannello delle impostazioni di conversazione, dove si gestiscono le conversazioni e i riferimenti ai file; il pannello della chat per interagire con il chatbot; il pannello delle informazioni, che visualizza le prove di supporto, i punteggi di confidenza e le valutazioni di pertinenza delle risposte.</p>
<p>È possibile selezionare i documenti nel pannello delle impostazioni delle conversazioni. Quindi è sufficiente avviare RAG con i documenti digitando un messaggio nella casella di input e inviarlo al chatbot.</p>
<p>Se si desidera approfondire l'uso di kotaemon, è possibile ottenere una guida completa dalla <a href="https://cinnamon.github.io/kotaemon/usage/">documentazione ufficiale</a>.</p>
