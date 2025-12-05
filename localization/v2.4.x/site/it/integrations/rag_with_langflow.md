---
id: rag_with_langflow.md
summary: >-
  Questa guida mostra come utilizzare Langflow per costruire una pipeline di
  generazione aumentata del reperimento (RAG) con Milvus.
title: Costruire un sistema RAG usando Langflow con Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Costruire un sistema RAG usando Langflow con Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida mostra come utilizzare <a href="https://www.langflow.org/">Langflow</a> per costruire una pipeline di Retrieval-Augmented Generation (RAG) con <a href="https://milvus.io/">Milvus</a>.</p>
<p>Il sistema RAG migliora la generazione del testo recuperando prima i documenti rilevanti da una base di conoscenza e poi generando nuove risposte basate su questo contesto. Milvus viene utilizzato per memorizzare e recuperare le incorporazioni di testo, mentre Langflow facilita l'integrazione del reperimento e della generazione in un flusso di lavoro visivo.</p>
<p>Langflow consente di costruire facilmente pipeline RAG, in cui pezzi di testo vengono incorporati, memorizzati in Milvus e recuperati quando vengono effettuate interrogazioni pertinenti. Questo permette al modello linguistico di generare risposte contestualmente informate.</p>
<p>Milvus funge da database vettoriale scalabile che trova rapidamente testi semanticamente simili, mentre Langflow consente di gestire il modo in cui la pipeline gestisce il recupero del testo e la generazione delle risposte. Insieme, forniscono un modo efficiente per costruire una robusta pipeline RAG per applicazioni avanzate basate sul testo.</p>
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
    </button></h2><p>Prima di eseguire questo notebook, assicurarsi di aver installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutorial<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta installate tutte le dipendenze, avviare una dashboard di Langflow digitando il seguente comando:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Verrà quindi visualizzata una dashboard come mostrato di seguito: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Vogliamo creare un progetto <strong>Vector Store</strong>, quindi per prima cosa dobbiamo fare clic sul pulsante <strong>Nuovo progetto</strong>. Si aprirà un pannello e sceglieremo l'opzione <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Una volta creato il progetto Vector Store Rag, il vector store predefinito è AstraDB, mentre noi vogliamo usare Milvus. Dobbiamo quindi sostituire i due moduli astraDB con Milvus per poter usare Milvus come archivio vettoriale. <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Passi per sostituire astraDB con Milvus:</h3><ol>
<li>Rimuovere le schede esistenti di Vector Store. Fare clic su due schede di astraDB contrassegnate in rosso nell'immagine precedente e premere <strong>backspace</strong> per eliminarle.</li>
<li>Fare clic sull'opzione <strong>Vector Store</strong> nella barra laterale, scegliere Milvus e trascinarlo nell'area di disegno. Eseguire questa operazione due volte, poiché sono necessarie due schede Milvus, una per memorizzare il flusso di lavoro di elaborazione dei file e una per il flusso di lavoro di ricerca.</li>
<li>Collegare i moduli Milvus al resto dei componenti. Vedere l'immagine sottostante come riferimento.</li>
<li>Configurare le credenziali Milvus per entrambi i moduli Milvus. Il modo più semplice è usare Milvus Lite, impostando l'URI di connessione su milvus_demo.db. Se si dispone di un server Milvus distribuito autonomamente o su Zilliz Cloud, impostare l'URI di connessione sull'endpoint del server e la password di connessione sul token (per Milvus è la concatenazione di &quot;<username>:<password>&quot;, per Zilliz Cloud è la chiave API). Vedere l'immagine sottostante come riferimento:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Dimostrazione della struttura di Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Inserire le conoscenze nel sistema RAG</h3><ol>
<li>Caricare un file come base di conoscenza di LLM attraverso il modulo file in basso a sinistra. Qui abbiamo caricato un file contenente una breve introduzione a Milvus.</li>
<li>Eseguire il flusso di lavoro di inserimento premendo il pulsante di esecuzione sul modulo Milvus in basso a destra. In questo modo si inserisce la conoscenza nell'archivio vettoriale di Milvus.</li>
<li>Verificare se le conoscenze sono in memoria. Aprire l'area di gioco e chiedere qualsiasi cosa relativa al file caricato.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>perché Milvus</span> </span></p>
